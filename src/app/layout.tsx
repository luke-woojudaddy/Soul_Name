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
  title: "My Korean Soul Name Generator | AI Name Analysis",
  description: "Discover your perfect Korean name based on your birth year and vibe. Get your Hangul name with meaning and pronunciation.",
  keywords: ["Korean name generator", "Hangul name", "Korean name meaning", "K-pop name", "Korea travel", "Your name in Korean"],
  openGraph: {
    title: "What is your Korean Soul Name?",
    description: "I found my Korean Soul Name! Find yours here based on your Zodiac & Vibe.",
    url: "https://soulname.lumiverselab.com",
    siteName: "Soul Name",
    images: [
      {
        url: "https://soulname.lumiverselab.com/og-image.png",
        width: 1200,
        height: 630,
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is your Korean Soul Name?",
    description: "I found my Korean Soul Name! Find yours here based on your Zodiac & Vibe.",
  },
  alternates: {
    canonical: "https://soulname.lumiverselab.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
