"use client";

export function MarqueeSection() {
  // SEO-optimized text — better than generic "Ready. Set. Ship."
  const text = "Build. Preview. Deploy. ";
  const repeatedText = text.repeat(12);

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-background border-t border-border/20">
      {/* Gradient fade edges — works in both light & dark */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <div className="animate-marquee flex whitespace-nowrap">
        <span
          className="text-[clamp(48px,8vw,96px)] font-normal select-none pr-4"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--foreground)",
            opacity: 0.06,
          }}
        >
          {repeatedText}
        </span>
        <span
          className="text-[clamp(48px,8vw,96px)] font-normal select-none pr-4"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--foreground)",
            opacity: 0.06,
          }}
        >
          {repeatedText}
        </span>
      </div>
    </section>
  );
}
