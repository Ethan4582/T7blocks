import type { Metadata } from "next";
import "./globals.css";
import {
  Instrument_Serif,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Libre_Caslon_Text,
} from "next/font/google";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
  weight: ["400", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-libre-caslon",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://t7blocks.xyz"),
  title: {
    default: "T7BLOCKS — Premium Component Library",
    template: "%s | T7BLOCKS"
  },
  description: "High-end components for modern web applications. Motion quality of premium Framer templates and agency landing pages.",
  keywords: ["react", "nextjs", "framer motion", "gsap", "animations", "components", "ui library", "motion design"],
  authors: [{ name: "t7labs" }],
  creator: "t7labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://t7blocks.xyz",
    title: "T7BLOCKS — Premium  Component Library",
    description: "High-end animated components for modern web applications.",
    siteName: "T7BLOCKS",
    images: [{
      url: "/logo.png",
      width: 1200,
      height: 630,
      alt: "T7BLOCKS"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "T7BLOCKS — Premium  Component Library",
    description: "High-end animated components for modern web applications.",
    images: ["/logo.png"],
    creator: "@t7labs",
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "48x48" },
      { url: "/logo.png", sizes: "192x192" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180" },
    ],
  },
};

import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { BookmarksProvider } from "@/components/providers/bookmarks-context";
import { ToastProvider } from "@/components/providers/toast-provider";
import { CodePreferenceProvider } from "@/components/providers/code-preference-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scrollbar-hide ${instrumentSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} ${libreCaslon.variable} bg-background`}
    >
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="eba86b33-bfb7-4084-850e-76db8408fef4"></script>
      </head>
      <body className="antialiased bg-background text-foreground scrollbar-hide">
        <ThemeProvider>
          <ToastProvider>
            <CodePreferenceProvider>
              <BookmarksProvider>
                <SidebarProvider>
                  <div className="flex w-full min-h-screen bg-background">
                    <LayoutWrapper>{children}</LayoutWrapper>
                  </div>
                </SidebarProvider>
              </BookmarksProvider>
            </CodePreferenceProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}