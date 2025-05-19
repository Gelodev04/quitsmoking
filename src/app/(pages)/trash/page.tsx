"use client";

import Image from "next/image";
import { PaypalButton } from "@/components/buttons/paypal";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export default function TrashPage() {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [customAmount, setCustomAmount] = useState<number>(10);
  const [paymentStatus, setPaymentStatus] = useState<{
    initialPaymentPaid: boolean;
    totalAmount: number;
  }>({ initialPaymentPaid: false, totalAmount: 0 });

  const fetchPaymentStatus = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("payment_tracking")
        .select("initial_payment_paid, total_amount")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching payment status:", error);
        return;
      }

      if (data) {
        setPaymentStatus({
          initialPaymentPaid: data.initial_payment_paid,
          totalAmount: data.total_amount || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching payment status:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPaymentStatus();
  }, [fetchPaymentStatus]);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setCustomAmount(Number(value.toFixed(2)));
    }
  };

  // Get user's first name or display name, fallback to "there" if not available
  const userName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.user_metadata?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";

  if (isLoading) {
    return (
      <main>
        <section className="background px-3 py-[3rem] md:py-[5rem] min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <p className="text-white text-lg">Loading...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="background px-3 py-[3rem] md:py-[5rem]">
        <h2 className="text-[24px] md:text-[50px] text-white font-bold text-center ">
          Hello, {userName} 👋
        </h2>
        <div className="bg-white rounded-[10px] md:rounded-[20px] p-[12px] md:max-w-[640px] max-w-[500px] mx-auto md:pb-[1.8rem] mt-5">
          {/* User Greeting */}
          <div className="text-center mb-6">
            {/* <p className="text-[14px] md:text-[16px] text-[#2D2D2DDD] mt-2">
              Welcome to your personal trash tracking page
            </p> */}
          </div>

          <Image
            className="w-[120px] h-[120px] md:w-[196px] md:h-[197px] mx-auto object-contain"
            src="/images/Vector.png"
            alt="trash can"
            width={200}
            height={200}
          />
          <div className="text-center mt-6 space-y-2 md:px-5">
            <h3 className="text-[20px] md:text-[30px] text-[#2D2D2D] font-[700]">
              Ready to Make the Change?
            </h3>
            <p className="text-[12px] md:text-[16px] text-[#2D2D2DDD]">
              Get instant access to our complete guide, tracking tools, and
              community support to help you implement this proven method.
            </p>
          </div>

          {/* Payment Status */}
          {paymentStatus.initialPaymentPaid && (
            <div className="mt-4 text-center">
              <p className="text-[14px] md:text-[16px] text-[#00B894]">
                Total Amount Paid: ${paymentStatus.totalAmount.toFixed(2)}
              </p>
            </div>
          )}

          {/* PAYMENT */}
          <div className="mt-1 text-center py-5 rounded md:px-5">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            {!paymentStatus.initialPaymentPaid ? (
              <>
                <div className="flex justify-center items-center">
                  <span className="text-[20px] md:text-[24px] text-[#00B894]">
                    $29.99
                  </span>
                </div>
                <p className="text-[11px] md:text-[16px] text-black mt-2">
                  Initial payment for lifetime access
                </p>
                {isProcessingPayment ? (
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00B894]"></div>
                    <p className="text-sm text-gray-600">
                      Processing payment...
                    </p>
                  </div>
                ) : (
                  <PaypalButton
                    amount={29.99}
                    onError={(error) => {
                      setError(error);
                      setIsProcessingPayment(false);
                    }}
                    paymentType="initial_commitment"
                    onSuccess={() => {
                      setIsProcessingPayment(true);
                      setTimeout(() => {
                        setPaymentStatus((prev) => ({
                          ...prev,
                          initialPaymentPaid: true,
                        }));
                        setIsProcessingPayment(false);
                      }, 1500);
                    }}
                  />
                )}
              </>
            ) : (
              <>
                <div className="flex justify-center items-center mb-5">
                  <span className="text-[20px] md:text-[24px] text-[#00B894]">
                    $10 or your amount
                  </span>
                  <div className="relative w-[100px] ml-2">
                    <input
                      type="number"
                      min={1}
                      step="0.01"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="pl-5 border border-[#808080] rounded-[8px] py-1 w-full"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none">
                      $
                    </div>
                  </div>
                </div>
                {/* <p className="text-[11px] md:text-[16px] text-black mt-2 mb-5">
                  Additional contribution (minimum $1.00)
                </p> */}
                {isProcessingPayment ? (
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00B894]"></div>
                    <p className="text-sm text-gray-600">
                      Processing payment...
                    </p>
                  </div>
                ) : (
                  <PaypalButton
                    amount={customAmount}
                    onError={(error) => {
                      setError(error);
                      setIsProcessingPayment(false);
                    }}
                    paymentType="additional_payment"
                    onSuccess={() => {
                      setIsProcessingPayment(true);
                      setTimeout(() => {
                        fetchPaymentStatus();
                        setIsProcessingPayment(false);
                      }, 1500);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
