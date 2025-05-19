import { LearnmoreButton } from "@/components/buttons/learnmore";

export default function HowItWorksPage() {
  return (
   <main>
    {/* HERO SECTION */}
    <section className="background px-3 py-10 md:py-[4rem]">
      <div className="rounded-[20px] p-[20px]  bg-white text-black text-[12px] md:text-[18px] flex flex-col items-center max-w-[707px] mx-auto">
        <h1 className="text-[20px] md:text-[30px] font-bold text-[#2D2D2D] mb-[30px]">My story</h1>
        <p>I used to smoke a pack of cigarettes a day—sometimes two. Over 20 years I tried every quitting aid—nicotine gum, patches, e‑cigs—nothing stuck, and I was running out of chances before the health bill came due. <br /> <br />

Then I noticed something. People who buy quitting aids often stick with them partly because they have “skin in the game”: they’ve spent money and don’t want to waste it. Behavioral economists call this loss aversion—the pain of losing feels roughly twice as strong as the pleasure of an equivalent gain (Kahneman & Tversky’s prospect theory). I decided to turn that bias into a weapon against my habit. <br /><br />

Here’s the deal I made with myself. Starting the next morning, whenever I caved and lit a cigarette, I would: <br /><br />

Throw away the unfinished pack. <br /> <br />

Toss an extra ten‑dollar bill into the trash. <br /> <br />

By linking every relapse to an immediate, visible financial loss, I created a personal commitment device. The psychology doing the heavy lifting: <br /><br />

Loss aversion: Losing real cash hurts far more than the abstract “future health” cost of smoking, so the brain scrambles to avoid it. <br /><br />

Present bias / hyperbolic discounting: We discount distant risks (lung cancer in 20 years) but not instant pain (watching money land in the trash). <br /><br />

Operant conditioning: Each cigarette triggers a punishing consequence, weakening the behavior through negative reinforcement. <br /><br />

Emotional salience (“pain of paying”): The act of physically discarding money makes the loss tangible and memorable, strengthening the aversion. <br /><br />

All these factors combined created a powerful, lasting deterrent.

<br /><br />

 Picture this: ten days from now your ashtray is cold, your pockets are still full, and every craving that bubbles up is met by the sharp memory of cash crumpling into the bin. With each cigarette you refuse, you’re not just saving your breath—you’re reclaiming time, money, and control. The habit that once ran your mornings will soon be nothing more than a faint, forgettable echo.

<br /><br />

Make this your final attempt and succeed once and for all.</p>
<LearnmoreButton text="Start now"/>
      </div>
      
    </section>
   </main> 
  );
}
