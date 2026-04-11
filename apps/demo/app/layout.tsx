import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "T7Blocks | Premium UI Components",
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
      className={`${instrumentSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-[#010101] text-white">
        {/* Global Persistent Logo */}
        <div className="fixed left-6 top-6 z-50 sm:left-8 sm:top-8">
          <Link href="/" className="group block h-12 w-12 relative overflow-hidden p-1.5 shadow-2xl">
            <Image
              src="/assets/logo.png"
              alt="T7 Labs Logo"
              fill
              className="object-contain p-1.5 rounded-xl "
              priority
            />
          </Link>
        </div>
        
        {children}
      </body>
    </html>
  );
}
