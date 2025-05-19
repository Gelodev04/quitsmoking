"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PaypalButtonProps {
  amount: number;
  onSuccess?: () => void;
  showLoginModal?: () => void;
  onError?: (error: string) => void;
  paymentType?: "initial_commitment" | "additional_payment";
}

interface PaymentTrackingRecord {
  total_amount: number;
  initial_payment_paid: boolean;
}

export const PaypalButton = ({
  amount,
  onSuccess,
  showLoginModal,
  onError,
  paymentType = "initial_commitment",
}: PaypalButtonProps) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (data: any) => {
    if (!user) {
      showLoginModal?.();
      return;
    }

    setIsProcessing(true);
    try {
      // Ensure amount is a valid number and has at most 2 decimal places
      const paymentAmount = Number(amount.toFixed(2));

      if (isNaN(paymentAmount) || paymentAmount <= 0) {
        throw new Error("Invalid payment amount");
      }

      // First, get the current payment tracking record
      const { data: currentRecord, error: fetchError } = await supabase
        .from("payment_tracking")
        .select("total_amount, initial_payment_paid")
        .eq("user_id", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        // PGRST116 is "no rows returned"
        console.error("Error fetching current payment record:", fetchError);
        throw new Error("Failed to fetch payment record");
      }

      const currentData = currentRecord as PaymentTrackingRecord | null;

      // Calculate new total amount
      const currentTotal = currentData?.total_amount || 0;
      const newTotal = currentTotal + paymentAmount;

      // Update or insert payment tracking
      const { error: updateError } = await supabase
        .from("payment_tracking")
        .upsert(
          {
            user_id: user.id,
            initial_payment_paid:
              paymentType === "initial_commitment"
                ? true
                : currentData?.initial_payment_paid || false,
            total_amount: newTotal,
          },
          {
            onConflict: "user_id",
          }
        );

      if (updateError) {
        console.error("Error updating payment tracking:", updateError);
        throw new Error(
          `Failed to update payment tracking: ${updateError.message}`
        );
      }

      console.log("Payment processed successfully");
      onSuccess?.();
    } catch (error: any) {
      console.error("Payment error:", {
        error,
        amount,
        paymentType,
        userId: user?.id,
      });
      onError?.(error.message || "An error occurred during payment");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return (
      <button
        onClick={() => showLoginModal?.()}
        className="bg-[#00B894] hover:bg-[hsl(168,100%,41%)] active:bg-[hsl(168,100%,41%)] 
          text-black text-[9px] md:text-[16px] w-full py-2 font-semibold rounded-lg mt-3 
          flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Sign in to Continue</span>
      </button>
    );
  }

  if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
    return (
      <button
        disabled
        className="bg-gray-300 text-gray-500 text-[9px] md:text-[16px] w-full py-2 font-semibold rounded-lg mt-3 
          flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <span>Payment System Unavailable</span>
      </button>
    );
  }

  // Ensure amount is a valid number and has at most 2 decimal places
  const formattedAmount = Number(amount.toFixed(2));

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{
          layout: "horizontal",
          color: "gold",
          shape: "rect",
          label: "pay",
        }}
        disabled={
          isProcessing || isNaN(formattedAmount) || formattedAmount <= 0
        }
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  value: formattedAmount.toString(),
                  currency_code: "USD",
                },
              },
            ],
          });
        }}
        onError={(err: { message?: string }) => {
          console.error("PayPal error:", err);
          onError?.(err.message || "An error occurred with PayPal");
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            try {
              const order = await actions.order.capture();
              await handlePayment({
                orderID: order.id || data.orderID,
              });
            } catch (error: any) {
              console.error("Order capture error:", error);
              onError?.(error.message || "Failed to capture payment");
            }
          }
        }}
      />
    </PayPalScriptProvider>
  );
};
