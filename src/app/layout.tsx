import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoginModalProvider } from "@/contexts/LoginModalContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Burn my pack",
  description: "Quit Smoking through Smart Financial Punishment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased ${inter.className}`}>
        <AuthProvider>
          <LoginModalProvider>
            <Navbar />
            {children}
            <Footer />
          </LoginModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
