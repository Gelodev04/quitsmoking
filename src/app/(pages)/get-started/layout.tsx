import "../../globals.css"
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Get started",
    description: "Set your pledge in two quick steps",
  };


export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            {children}
        </section>
    );
}