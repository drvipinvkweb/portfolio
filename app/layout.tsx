import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ConstellationBackground from "@/components/ConstellationBackground";
import SecretTrigger from "@/components/SecretTrigger";
import SocialSidebar from "@/components/SocialSidebar";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vipin VK | Technologist & Startup Mentor",
  description: "Personal brand website for Vipin VK (Founder & CEO of STEM Cadets, Startup Mentor, STEM Consultant, Technologist)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SecretTrigger />
        <ConstellationBackground />
        <Navbar />
        <SocialSidebar />
        <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
