import { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
    title: "Trash",
    description: "",
  };

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            {children}
        </section>
    );
}