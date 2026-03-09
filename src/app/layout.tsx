import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Agriculture Insight Builder",
  description:
    "Get comprehensive agricultural data, market insights, farmer reports, and AI-powered analysis for your crops.",
  keywords: [
    "agriculture",
    "farming",
    "AI",
    "crop analysis",
    "market data",
    "farming insights",
  ],
  authors: [{ name: "AI Agriculture" }],
  openGraph: {
    title: "AI Agriculture Insight Builder",
    description:
      "Get comprehensive agricultural data and AI-powered analysis for your crops.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
