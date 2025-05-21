"use client";

import { PaypalButton } from "@/components/buttons/paypal";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function GetStartedPage() {
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{
    initialPaymentPaid: boolean;
    totalAmount: number;
  }>({ initialPaymentPaid: false, totalAmount: 0 });

  useEffect(() => {
    const fetchPaymentStatus = async () => {
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
    };

    fetchPaymentStatus();
  }, [user]);

  // Get user's first name or display name, fallback to "there" if not available
  const userName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.user_metadata?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";

  if (isLoading) {
    return (
      <section className="background px-3 py-10 md:py-[4rem] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="background px-3 py-10 md:py-[4rem]">
      <div className="md:max-w-[700px] max-w-[500px] mx-auto">
        <div className="text-center text-white">
          {/* HELLO USER */}
          <h1 className="text-[30px] md:text-[50px] ">Hello {userName} 👋</h1>
          <p className="text-[14px] md:text-[18px] mt-2">
            Now you Know how it works. Let's follow through
          </p>
        </div>
        {/* STEP 1 */}
        <div className="bg-white rounded-[10px] px-3 md:px-4 py-3 md:py-5 mt-8 md:mt-10">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h6 className="font-bold text-[18px] md:text-[30px]">Step 1</h6>
              <div className="h-[24px]">
                {paymentStatus.initialPaymentPaid && (
                  <div className="flex items-center gap-2 text-[#00B894]">
                    <Image
                      src="/images/check.png"
                      alt="completed"
                      width={20}
                      height={20}
                      className="size-5"
                    />
                    <span className="text-[14px] md:text-[16px]">
                      Completed
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="font-bold text-[14px] md:text-[20px]">
              Make the Commitment
            </p>
            <p className="text-[12px] text-[#808080] md:text-[14px]">
              Declare to yourself that you're ready to quit smoking—this isn't
              another attempt; it's your final decision. If you truly need one
              last cigarette, have it now—but remember, it will be the last you
              ever smoke. Then seal the commitment: toss $29.99 straight into
              the trash as your first financial penalty.
            </p>
          </div>
          <div className="mt-5 text-center bg-[#EEEEEE] py-5 px-4 rounded md:pb-[1.5rem]">
            {!paymentStatus.initialPaymentPaid && (
              <>
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <span className="text-[20px] md:text-[24px] text-[black]">
                  $29.99
                </span>
                <p className="text-[11px] md:text-[16px] text-black">
                  Feel the sting; lock that negative emotion in.
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
            )}
          </div>
        </div>
        {/* STEP2 */}
        <div className="bg-white rounded-[10px] px-3 md:px-4 py-3 md:py-5 mt-8 md:mt-10">
          <div className="space-y-3">
            <h6 className=" font-bold text-[18px] md:text-[30px]">Step 2</h6>
            <p className="font-bold text-[14px] md:text-[20px]">
              Execute the Plan
            </p>
            <p className="text-[12px] text-[#808080] md:text-[14px]">
              If you slip and buy a pack—breaking your oath—smoke single
              cigarette, then toss the rest of the pack and a $10 bill (or
              whatever amount stings) into the trash. No exceptions. Make the
              financial hit real and immediate, and as you drop the money, tie
              it to the frustration and shame of breaking your promise so the
              negative emotion cements the lesson.
            </p>
          </div>
          <div className="mt-5 text-center bg-[#EEEEEE] py-5 px-4 rounded md:pb-[1.5rem] ">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div className="flex justify-center items-center">
              <span className="text-[20px] md:text-[24px] text-[#00B894]">
                $10 or your amount
              </span>
              <div className="relative w-[100px] ml-2">
                <input
                  type="number"
                  min={0}
                  className="pl-5 border border-[#808080] rounded-[8px] py-1 w-full"
                />
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none text-[#00B894]">
                  $
                </div>
              </div>
            </div>
            <p className="text-[11px] md:text-[16px] text-black mb-5">
              Let the sting sink in and cement that negative feeling.
            </p>
            {isProcessingPayment ? (
              <div className="mt-4 flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00B894]"></div>
                <p className="text-sm text-gray-600">Processing payment...</p>
              </div>
            ) : (
              <PaypalButton
                amount={10.0}
                onError={(error) => {
                  setError(error);
                  setIsProcessingPayment(false);
                }}
                onSuccess={() => {
                  setIsProcessingPayment(true);
                  setTimeout(() => {
                    setIsProcessingPayment(false);
                  }, 1500);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
