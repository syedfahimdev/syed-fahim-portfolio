import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Syed Fahim — AI Customer Success Command Center",
  description:
    "Syed Fahim is a customer success leader and full-stack AI automation builder helping technical teams scale onboarding, retention, reporting, and customer operations.",
  metadataBase: new URL("https://syed-fahim-portfolio.vercel.app"),
  openGraph: {
    title: "Syed Fahim — AI Customer Success Command Center",
    description:
      "Interactive portfolio for a technical Customer Success leader building AI systems for SaaS teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
