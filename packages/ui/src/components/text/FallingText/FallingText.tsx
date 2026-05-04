"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import Physics2DPlugin from "gsap/Physics2DPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, Physics2DPlugin);

interface FallingTextRow {
  lines: [string?, string?];
  accentImage?: {
    src: string;
    alt?: string;
    className?: string;
  };
}

interface FallingTextProps {
  rows: FallingTextRow[];
  textColor?: string;
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const heightMap: Record<number, string> = {
  1: "min-h-[100vh]",
  2: "min-h-[200vh]",
  3: "min-h-[300vh]",
  4: "min-h-[400vh]",
};

export  function FallingText({ rows, textColor = "#121213ff" }: FallingTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const headings = wrapperRef.current.querySelectorAll<HTMLElement>(
      "[data-shatter-heading]"
    );

    const contexts: ReturnType<typeof gsap.context>[] = [];

    headings.forEach((heading) => {
      const split = new SplitText(heading, {
        type: "lines,chars",
        autoSplit: true,
        linesClass: "shatter-line",
        onSplit(self) {
          const ctx = gsap.context(() => {
            self.lines.forEach((lineEl) => {
              const chars = Array.from(lineEl.children) as HTMLElement[];

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: lineEl,
                  start: "top top-=15",
                  once: true,
                },
              });

              tl.to(chars, {
                duration: rand(1.6, 2.8),
                physics2D: {
                  velocity: rand(450, 950),
                  angle: rand(85, 95),
                  gravity: rand(2800, 3200),
                },
                rotation: () => rand(-100, 100),
                ease: "none",
                stagger: { each: 0.012, from: "random" },
              });

              tl.to(chars, { autoAlpha: 0, duration: 0.25 }, "-=0.25");
            });
          });

          contexts.push(ctx);
          return ctx;
        },
      });

      (heading as any).__split = split;
    });

    return () => {
      contexts.forEach((c) => c.revert());
      headings.forEach((h) => (h as any).__split?.revert());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const wrapperHeight = heightMap[rows.length] ?? "min-h-[300vh]";

return (
  <div className="relative">
    
  
    <div
      className="fixed inset-0 -z-10 pointer-events-none bg-center bg-no-repeat bg-cover"
    />

    
    <div
      ref={wrapperRef}
      className={`relative w-full overflow-hidden ${wrapperHeight}`}
    >
      {rows?.map((row, i) => (
        <section
          key={i}
          className="flex h-screen w-full items-center justify-center"
        >
          <h2
            data-shatter-heading=""
            className="mx-auto max-w-[38rem] px-4 text-center text-5xl font-semibold tracking-tight md:text-6xl leading-snug"
style={{ color: textColor }}
          >
            {row.lines?.[0] || (typeof row === 'string' ? row : '')}

            {row.accentImage && (
              <span
                className={[
                  "inline-block relative z-10 w-[1.1em] align-middle",
                  row.accentImage.className ?? "",
                ].join(" ")}
              >
                <img
                  src={row.accentImage.src}
                  alt={row.accentImage.alt ?? ""}
                  className="w-full max-w-full"
                />
              </span>
            )}

            {row.lines?.[0] && row.lines?.[1] && <br />}
            {row.lines?.[1]}
          </h2>
        </section>
      ))}
    </div>
  </div>
);
}