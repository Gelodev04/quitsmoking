import { HeroSection } from "@/components/pages/home/HeroSection";
import { Program } from "@/components/pages/home/ProgramSection";
import { ScienceSection } from "@/components/pages/home/ScienceSection";
import { StepSection } from "@/components/pages/home/StepSection";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <ScienceSection />
      <StepSection />
      <Program />
    </main>
  );
}
