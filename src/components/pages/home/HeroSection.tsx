"use client";
import React from "react";
import { LearnmoreButton } from "@/components/buttons/learnmore";

export const HeroSection = () => {
  return (
    <section className="relative w-full md:h-[calc(100vh-64px)] overflow-hidden h-[430px]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/vids/Revision.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/*  overlay or hero content */}
      <div className="relative z-10 flex flex-col items-center justify-between  h-full text-white text-center text-[13px] px-3 max-w-[350px] md:max-w-[1000px] mx-auto py-4 md:py-8 pb-[1.7rem]">
        <div>
          <h1 className="font-[700] md:text-[36px] text-[20px] tracking-wide">
            Quit Smoking through Smart Financial Punishment
          </h1>
          <p className="lg:text-[20px] text-[12px] mt-[7px] ">
            A proven method that helped me quit smoking 15 years ago
          </p>
        </div>

        <div className="flex flex-col items-center ">
          <div className="text-left md:text-[18px] text-[12px] bg-white/20 rounded-[8px] px-3 md:p-6 py-[8px] text-white leading-tight ">
            <p>
              I discovered a powerful way to quit smoking: by making it
              financially painful. Every time I slipped and bought a pack, I
              would smoke one cigarette and then throw away the rest - along
              with an extra $10 bill. The pain of losing money became stronger
              than the urge to smoke.
            </p>
            <br />
            <p>
              This method worked so well that I haven't touched a cigarette in
              15 years. Now, I want to share this life-changing technique with
              you.
            </p>
          </div>
          <LearnmoreButton text="Learn More" />
        </div>
      </div>

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />
    </section>
  );
};
