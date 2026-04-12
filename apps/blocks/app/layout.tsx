import type { Metadata } from "next";
import "./globals.css";
import {
  Instrument_Serif,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import { LayoutWrapper } from "@/components/common/layout-wrapper";
import { ThemeProvider } from "@/components/common/theme-provider";

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

export const metadata: Metadata = {
  title: "T7BLOCK — Component Library by t7labs",
  description:
    "A premium, modular component library for modern web applications. Built by t7labs.",
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  openGraph: {
    title: "T7block — Component Library",
    description:
      "A premium, modular component library for modern web applications. Built by t7labs.",
    images: ["/assets/logo.png"],
  },
};

import { SidebarProvider } from "@/components/common/sidebar-provider";
import { BookmarksProvider } from "@/lib/bookmarks-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark scrollbar-hide ${instrumentSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-background text-foreground scrollbar-hide">
        <ThemeProvider>
          <BookmarksProvider>
            <SidebarProvider>
              <div className="flex w-full min-h-screen">
                <LayoutWrapper>{children}</LayoutWrapper>
              </div>
            </SidebarProvider>
          </BookmarksProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}