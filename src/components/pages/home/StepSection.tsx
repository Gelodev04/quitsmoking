import Image from "next/image";
import React from "react";

export const StepSection = () => {
  const stepsData = [
    {
      number: 1,
      title: "Make the Commitment",
      description:
        "Declare to yourself that you’re ready to quit smoking—this isn’t another attempt; it’s your final decision. If you truly need one last cigarette, have it now—but remember, it will be the last you ever smoke. Then seal the commitment: toss $29.99 straight into the trash as your first financial penalty.",
    },
    {
      number: 2,
      title: "Set Your Punishment Rules",
      description:
        "If you slip and buy a pack—breaking your oath—smoke a single cigarette, then toss the rest of the pack in the trash along with a $10 bill (or any amount that hurts) to drive the financial penalty home.",
    },
    {
      number: 3,
      title: "Make the ComExecute the Planmitment",
      description:
        "If you slip and smoke, enforce the punishment on the spot—no exceptions. Make the financial hit real and immediate, and as you hand over the money, deliberately tie it to the frustration and shame of breaking your promise so the negative emotion reinforces the lesson.",
    },
    {
      number: 4,
      title: "Monitor your lapses",
      description:
        "If you’ve enforced Step 2 and step 3 every time you slipped, you will quit—there’s no alternative. You do not need to log every lapse, but if you’d like a clear visual cue, we’ll log every lapse so you can watch the tally shrink.",
    },
  ];

  return (
    <section className="px-4 py-[2rem] ">
      <h1 className="text-center text-[20px] md:text-[30px] font-bold text-[#2D2D2D]">
        The Step-by-Step process
      </h1>
      <div className="max-w-[1000px] mx-auto mt-[2rem]">
        <div className="space-y-6">
          {stepsData.map((step) => (
            <div
              key={step.number}
              className="bg-[#F8F8F8] p-4 md:px-[20px]  rounded-[8px] flex items-center gap-4 min-h-[65px] md:h-[148px] "
            >
              <div className="flex items-start gap-4 leading-tight">
                <div className="flex items-center justify-center px-[4] md:px-[6] py-[3] rounded-full bg-[#00B894] text-color1 font-bold text-[10px] md:text-[16px]">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold text-color1 text-[16px] md:text-[20px]">
                    {step.title}
                  </h3>
                  <p className="text-[12px] md:text-[16px] text-color1 mt-2">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[#EF5050] bg-[#FFEBEE] text-[11px] md:text-[16px] px-4 py-[14] rounded-lg mt-5 flex items-center gap-2">
          <span>
            <Image
              className="md:w-[24px] w-[40px]"
              src="/images/danger.png"
              alt="danger icon"
              width={20}
              height={20}
            />
          </span>
          <p>
            Important: This method works because of real financial consequences.
            Don't cheat yourself by skipping the punishment - it's essential for
            rewiring your brain's response to smoking.
          </p>
        </div>
      </div>
    </section>
  );
};
