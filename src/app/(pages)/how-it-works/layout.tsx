import { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
    title: "How it works",
    description: "Re‑wire your brain with the science of loss aversion and stop smoking—permanently",
  };

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            {children}
        </section>
    );
}