import type { Metadata } from "next";
import { Instrument_Sans, Poppins, Barlow } from "next/font/google";
import { Footer } from "@/components/Footer";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const logoFont = Poppins({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-logo",
});

export const barlowFont = Barlow({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "DigiLink — Premium Digital Tools at Unbeatable Prices",
  description: "Shop premium AI tools, design software, and digital subscriptions with instant delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.className} ${logoFont.variable} ${barlowFont.variable} text-[15px] font-medium antialiased`} suppressHydrationWarning>
        {children}
        <Footer />
      </body>
    </html>
  );
}
