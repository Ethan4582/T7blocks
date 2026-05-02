"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { componentsData } from "@/lib/allData";

/* ─── Orbiting cards data ─── */
const ORBIT_CARDS = componentsData.slice(0, 6).map((c) => ({
  id: c.id,
  title: c.name,
  image: c.image,
  video: c.video,
  slug: c.slug,
}));

export function Hero() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const animRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Circular orbit animation
  useEffect(() => {
    if (!mounted) return;

    const speed = 0.0008; // radians per frame
    const rx = 440; // orbit X radius
    const ry = 180; // orbit Y radius (elliptical)

    const animate = () => {
      angleRef.current += speed;
      const cards = orbitRef.current?.querySelectorAll<HTMLElement>(".orbit-card");
      if (!cards) return;

      cards.forEach((card, i) => {
        const offset = (i / ORBIT_CARDS.length) * Math.PI * 2;
        const a = angleRef.current + offset;
        const x = Math.cos(a) * rx;
        const y = Math.sin(a) * ry;
        const scale = 0.7 + 0.3 * ((Math.sin(a) + 1) / 2); // front=1, back=0.7
        const z = Math.sin(a); // for z-ordering
        const rotate = Math.sin(a) * 8; // slight tilt

        card.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`;
        card.style.zIndex = String(Math.round((z + 1) * 10));
        card.style.opacity = String(0.5 + 0.5 * ((z + 1) / 2));
        card.style.filter = z < -0.3 ? `blur(${Math.abs(z) * 2}px)` : "none";
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [mounted]);

  // Play/pause videos on hover
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([idStr, el]) => {
      if (!el) return;
      if (hoveredId === Number(idStr)) {
        el.play().catch(() => {});
      } else {
        el.pause();
        el.currentTime = 0;
      }
    });
  }, [hoveredId]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-hidden">
      {/* ─── Rich Ambient Background ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                              linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Primary glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(161,255,98,0.08)_0%,rgba(161,255,98,0.02)_40%,transparent_70%)]" />

        {/* Accent orbs */}
        <div
          className="absolute top-[15%] left-[10%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-accent/10 via-accent/3 to-transparent blur-[100px]"
          style={mounted ? { animation: "hero-float 20s ease-in-out infinite" } : {}}
        />
        <div
          className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-tl from-purple-500/8 via-blue-500/4 to-transparent blur-[100px]"
          style={mounted ? { animation: "hero-float 25s ease-in-out infinite reverse" } : {}}
        />

        {/* Concentric orbit rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[300, 500, 700, 900].map((size, i) => (
            <div
              key={size}
              className="absolute rounded-full border border-border/15 dark:border-border/20"
              style={{
                width: size,
                height: size * 0.45,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.4 - i * 0.08,
              }}
            />
          ))}
        </div>

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.012] dark:opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hero-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(25px, -15px) scale(1.03); }
          66% { transform: translate(-15px, 20px) scale(0.97); }
        }
      `}} />

      {/* ─── Hero Content ─── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[900px] px-6" style={{ gap: "0" }}>
        {/* Pill badge */}
        <div className="mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/40 dark:bg-card/30 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(161,255,98,0.4)]" />
            <span className="text-[12px] font-medium text-muted-foreground" style={{ letterSpacing: "0.06em" }}>
              Open-source component library
            </span>
          </div>
        </div>

        {/* Logo + Title — tight spacing */}
        <div className="flex items-center gap-3 mb-3">
          <Image
            src="/assets/logo.png"
            alt="T7block logo"
            width={56}
            height={56}
            className="rounded-xl shadow-lg"
          />
          <h1
            className="text-5xl md:text-7xl font-semibold text-foreground"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
          >
            block
          </h1>
        </div>

        {/* Subtitle — tight to logo */}
        <h2
          className="text-2xl md:text-4xl text-foreground/90 leading-tight mb-4"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
        >
          Premium components,<br />
          <span className="italic text-accent/80">ready to ship.</span>
        </h2>

        <p className="text-[15px] text-muted-foreground max-w-[520px] leading-relaxed mb-8" style={{ letterSpacing: "0.03em" }}>
          A modular, open-source UI library built for modern web applications.
          Drop-in animations, scroll effects, and interactive elements — crafted by t7labs.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-3 flex-col sm:flex-row">
          <Link
            href="/gallery"
            className="group flex items-center gap-2 px-8 py-3.5 bg-foreground text-background rounded-full font-semibold text-[15px] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] transition-all"
            style={{ letterSpacing: "0.02em" }}
          >
            Browse Components
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="https://github.com/Ethan4582/t7blocks"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 bg-transparent text-foreground border border-border hover:border-foreground/30 rounded-full font-semibold text-[15px] hover:bg-foreground/5 transition-all"
            style={{ letterSpacing: "0.02em" }}
          >
            View on GitHub
          </a>
        </div>
      </div>

      {/* ─── Orbiting Cards with Videos ─── */}
      <div
        ref={orbitRef}
        className="absolute top-1/2 left-1/2"
        style={{ transform: "translate(-50%, -50%)", width: 0, height: 0 }}
      >
        {ORBIT_CARDS.map((card) => (
          <div
            key={card.id}
            className="orbit-card absolute"
            style={{
              width: "200px",
              height: "140px",
              top: "-70px",
              left: "-100px",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 12px 40px rgba(0,0,0,0.25), 0 2px 10px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "filter 0.3s ease",
            }}
            onMouseEnter={() => setHoveredId(card.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Static image (default) */}
            <img
              src={card.image}
              alt={card.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hoveredId === card.id ? "opacity-0" : "opacity-100"}`}
            />

            {/* Video (on hover) */}
            {card.video && (
              <video
                ref={(el) => { videoRefs.current[card.id] = el; }}
                src={card.video}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hoveredId === card.id ? "opacity-100" : "opacity-0"}`}
                muted
                playsInline
                loop
                preload="auto"
              />
            )}

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 30%, transparent 100%)" }}
            />

            {/* Label */}
            <div className="absolute bottom-2.5 left-3 right-3">
              <div
                style={{
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  letterSpacing: "0.04em",
                }}
              >
                {card.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/40" style={mounted ? { animation: "scroll-dot 2s ease-in-out infinite" } : {}} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}} />
    </section>
  );
}
