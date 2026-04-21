import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SecretTrigger from "@/components/SecretTrigger";
import dynamic from "next/dynamic";

const ConstellationBackground = dynamic(() => import("@/components/ConstellationBackground"), { ssr: false });


const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vipin VK / Business and Startup Consultant",
  description: "Official portfolio of Vipin VK, a leading Technologist, Startup Mentor, and Business Consultant specialized in scaling operations and precision execution across India and the Middle East.",
  keywords: ["Vipin VK", "Startup Mentor", "Business Consultant", "Technologist", "Business Strategy", "Execution Partner", "Startup Growth"],
  authors: [{ name: "Vipin VK" }],
  openGraph: {
    title: "Vipin VK / Business and Startup Consultant",
    description: "Clarify your direction, execute with precision, and scale your business sustainably with Vipin VK.",
    type: "website",
    url: "https://drvipinvk.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vipin VK / Business and Startup Consultant",
    description: "Clarify your direction, execute with precision, and scale your business sustainably.",
  },
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
        <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
