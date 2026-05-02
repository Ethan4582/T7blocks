"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-hidden px-6 pt-24 pb-16">
      {/* ─── Ambient Background ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                              linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Brand Orb / Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-[100%] bg-[var(--brand-gradient-subtle)] opacity-60 dark:opacity-40 blur-[80px]" />
      </div>

      {/* ─── Hero Content ─── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full mx-auto space-y-6">
       

        {/* Logo & Headline */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Image
              src="/logo.png"
              alt="T7block logo"
              width={48}
              height={48}
              className="rounded-xl shadow-sm dark:invert"
            />
            <h1
              className="text-4xl md:text-6xl font-medium tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              T7Blocks
            </h1>
          </div>
          <h2
            className="text-3xl md:text-5xl font-light text-foreground/90 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Premium components, <span className="italic text-accent">ready to ship.</span>
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          A minimalist, highly-polished UI component library built for modern web apps. 
          Drop in premium animations, interactive elements, and flawless responsive layouts instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link
            href="/gallery"
            className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all text-white shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] hover:-translate-y-0.5"
            style={{ background: "var(--btn-primary-bg)" }}
          >
            Browse Components
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://github.com/Ethan4582/t7blocks"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full font-medium text-sm border border-border text-foreground bg-transparent hover:bg-muted/50 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
