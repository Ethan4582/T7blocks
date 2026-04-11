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
  title: {
    default: "T7Blocks | High-Performance UI Components",
    template: "%s | T7Blocks",
  },
  description: "Handcrafted, high-performance UI components and interactive demos by T7Blocks.",
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://demo.t7blocks.xyz",
    siteName: "T7Blocks Gallery",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
