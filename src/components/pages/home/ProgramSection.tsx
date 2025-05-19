"use client";

import { PaypalButton } from "@/components/buttons/paypal";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const Program = () => {
  const {
    user,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithLinkedIn,
  } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
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

  const loginOptions = [
    {
      label: "Sign in with Google",
      icon: (
        <svg
          className="size-4 md:size-[20px]"
          viewBox="-3 0 262 262"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g>
            <path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="#4285F4"
            ></path>
            <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="#34A853"
            ></path>
            <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="#FBBC05"
            ></path>
            <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="#EB4335"
            ></path>
          </g>
        </svg>
      ),
      onClick: signInWithGoogle,
    },
    {
      label: "Sign in with Facebook",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          className="size-[20px] md:size-[24px]"
          viewBox="0 0 48 48"
        >
          <path
            fill="#039be5"
            d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
          ></path>
          <path
            fill="#fff"
            d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
          ></path>
        </svg>
      ),
      onClick: signInWithFacebook,
    },
    {
      label: "Sign in with Twitter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          className="size-[20px] md:size-[24px]"
          viewBox="0 0 48 48"
        >
          <path
            fill="#03A9F4"
            d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
          ></path>
        </svg>
      ),
      onClick: signInWithTwitter,
    },
    {
      label: "Sign in with LinkedIn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          className="size-5 md:size-[24px]"
          viewBox="0 0 48 48"
        >
          <path
            fill="#0288D1"
            d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
          ></path>
          <path
            fill="#FFF"
            d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
          ></path>
        </svg>
      ),
      onClick: signInWithLinkedIn,
    },
  ];

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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center">
          <div className="bg-white w-[90%] mx-auto max-w-sm rounded-xl shadow-xl p-6 relative slide-fade mt-20">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-[26px] font-bold mb-4 text-start">
              Please sign in to continue 👋
            </h2>
            <div className="space-y-4">
              {loginOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    option.onClick();
                    setShowLoginModal(false);
                  }}
                  className="relative w-full px-4 py-3 border border-[#D0D5DD] rounded-md text-[14px] text-[#344054] hover:bg-gray-200 cursor-pointer"
                >
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    {option.icon}
                  </span>
                  <span className="block text-center w-full font-[550] font-inter">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
