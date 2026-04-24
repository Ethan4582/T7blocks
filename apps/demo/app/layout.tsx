import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://demo.t7blocks.xyz"),
  title: {
    default: "T7BLOCKS Demos | Interactive Component Showcase",
    template: "%s | T7BLOCKS Demo",
  },
  description: "Live interactive demos and prop controls for T7BLOCKS animated components.",
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://demo.t7blocks.xyz",
    siteName: "T7BLOCKS Demos",
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
      className={`${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-[#010101] text-white">
        <script defer src="https://cloud.umami.is/script.js" data-website-id="eba86b33-bfb7-4084-850e-76db8408fef4"></script>
        {children}
      </body>
    </html>
  );
}
