import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CalcHub — Free Construction & Home Improvement Calculators",
    template: "%s | CalcHub",
  },
  description:
    "Free online calculators for concrete, roofing, lumber, mulch, gravel, paint, tile, decking, fencing, and more. Get instant material estimates for your next project.",
  keywords: [
    "construction calculator",
    "concrete calculator",
    "roofing calculator",
    "lumber calculator",
    "mulch calculator",
    "gravel calculator",
    "material estimator",
    "home improvement calculator",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
