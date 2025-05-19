"use client";

import { PaypalButton } from "@/components/buttons/paypal";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLoginModal } from "@/contexts/LoginModalContext";

export const Program = () => {
  const { user } = useAuth();
  const { setShowLoginModal } = useLoginModal();
  const [hasPaidInitial, setHasPaidInitial] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!user) {
        setHasPaidInitial(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("payment_tracking")
          .select("initial_payment_paid")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Error checking payment status:", error);
          setHasPaidInitial(false);
          return;
        }

        setHasPaidInitial(data?.initial_payment_paid || false);
      } catch (error) {
        console.error("Error checking payment status:", error);
        setHasPaidInitial(false);
      }
    };

    checkPaymentStatus();
  }, [user]);

  const handlePaymentSuccess = () => {
    setHasPaidInitial(true);
    router.push("/trash");
  };

  // If we're still loading the payment status, don't show anything
  if (hasPaidInitial === null) {
    return null;
  }

  // If user has paid initial amount, don't show the section
  if (hasPaidInitial) {
    return null;
  }

  return (
    <section className="px-4 pb-[3rem]">
      <div className="flex flex-col items-center max-w-[1000px] mx-auto">
        <h1 className="text-center text-[20px] md:text-[30px] font-bold text-[#2D2D2D] mt-[2rem]">
          Join the Program
        </h1>
        <div className="mt-[2rem] flex flex-col items-center bg-[#F8F8F8] py-[2.5rem] px-4 w-full rounded-lg max-w-[380px] md:max-w-[768px]">
          <Image
            className="max-w-[80px] h-[90px] md:max-w-[175px] md:h-[200px]"
            src="/images/trash.png"
            alt="trashcan"
            width={400}
            height={400}
          />
          <div className="max-w-[500px] mx-auto">
            <h3 className="text-[22px] md:text-[25px] text-center font-bold text-color1 mt-[2rem]">
              Ready to commit?
            </h3>
            <p className="text-[12px] md:text-[16px] text-[#2D2D2DDD] opacity-[86] text-center mt-2 leading-tight">
              Start by tossing $29.99 straight into the trash—your first
              financial penalty. Feel the sting; lock that negative emotion in.
            </p>

            {/* PAYPAL */}
            <div className="mt-10 text-center bg-white py-5 px-4 rounded">
              <span className="text-[20px] md:text-[24px] text-[black]">
                $29.99
              </span>
              <p className="text-[11px] md:text-[16px] text-black">
                This will lead you to the step 2.
              </p>
              <PaypalButton
                amount={29.99}
                onSuccess={handlePaymentSuccess}
                showLoginModal={() => setShowLoginModal(true)}
              />
            </div>
          </div>
        </div>

        {/* IMPORTANT */}
        <div className="text-[#558B2F] bg-[#F1F8E9] text-[10.5px] md:text-[16px] px-4 py-[14] rounded-lg mt-5 flex items-center gap-2">
          <Image
            className="size-5 md:size-5"
            src="/images/check.png"
            alt="check icon"
            width={20}
            height={20}
          />
          <p>
            "This method saved me thousands of dollars in the long run. The
            initial losses hurt, but they were exactly what I needed to finally
            quit." - Michael S., Smoke-free for 2 years
          </p>
        </div>
      </div>
    </section>
  );
};
