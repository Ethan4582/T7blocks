"use client";

import { useEffect, useRef, useState } from "react";

const RING_LABELS = ["Webflow", "Components", "HTML", "Icons", "Easings", "t7blocks"];

export function PlayReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoHovered, setVideoHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
      style={{ minHeight: "100vh", paddingBottom: "8rem" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.2,
        }}
      />

      {/* Decorative concentric rings behind the video */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{ transform: "translate(-50%, -45%)" }}
      >
        {[320, 480, 640, 800].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border border-border/30"
            style={{
              width: size,
              height: size,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0.35 - i * 0.06,
            }}
          />
        ))}

        {/* Ring label dots */}
        {RING_LABELS.map((label, i) => {
          const angle = (i / RING_LABELS.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 360;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={label}
              className="absolute type-caption-sm text-muted-foreground/40"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-20">
        {/* Eyebrow / scrolled-in card strip at very top — purely decorative overflow cards */}
        <div
          className="w-full flex justify-between px-8 mb-20 select-none pointer-events-none overflow-hidden"
          style={{ height: "100px" }}
        >
          {/* left edge card peek */}
          <div
            className="rounded-xl overflow-hidden opacity-60"
            style={{
              width: 170,
              height: 120,
              marginTop: -20,
              background: "#1a1a1a",
              transform: "rotate(-8deg) translateX(-30px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              flexShrink: 0,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=80"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 10,
                color: "#fff",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: 1,
                opacity: 0.7,
              }}
            >
              Flick Cards Slider
            </div>
          </div>

          {/* right edge card peek */}
          <div
            className="rounded-xl overflow-hidden opacity-55"
            style={{
              width: 170,
              height: 120,
              marginTop: -20,
              background: "#0f2040",
              transform: "rotate(9deg) translateX(30px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=400&q=80"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 10,
                color: "#fff",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: 1,
                opacity: 0.7,
              }}
            >
              Falling 3D Objects
            </div>
          </div>
        </div>

        {/* Big copy */}
        <p
          className="text-center text-foreground leading-snug max-w-2xl"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: 400,
            letterSpacing: "-1px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          T7blocks is an ever-growing platform with Webflow &amp; HTML
          resources. Get exclusive access to the elements, techniques and code
          behind award-winning work.
        </p>

        {/* Play Reel row */}
        <div
          className="flex items-center justify-center gap-8 mt-16 w-full"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          {/* "Play" word */}
          <span
            className="text-muted-foreground/40 select-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 80px)",
              fontWeight: 400,
              letterSpacing: "-2px",
            }}
          >
            Play
          </span>

          {/* Video card */}
          <div
            onMouseEnter={() => setVideoHovered(true)}
            onMouseLeave={() => setVideoHovered(false)}
            style={{
              width: "clamp(180px, 20vw, 230px)",
              height: "clamp(120px, 13vw, 155px)",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              boxShadow: videoHovered
                ? "0 20px 60px rgba(0,0,0,0.35)"
                : "0 8px 32px rgba(0,0,0,0.25)",
              transform: videoHovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              border: "1px solid rgba(255,255,255,0.08)",
              flexShrink: 0,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80"
              alt="Reel preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* dark overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.45)",
              }}
            />
            {/* label + timer row */}
            <div
              className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2"
              style={{ pointerEvents: "none" }}
            >
              <span
                style={{ color: "#fff", fontSize: 11, letterSpacing: 0.5, opacity: 0.85 }}
              >
                t7blocks in use
              </span>
              <span
                className="rounded px-1.5 py-0.5"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: 11,
                  letterSpacing: 0.5,
                }}
              >
                00:48
              </span>
            </div>
          </div>

          {/* "Reel" word */}
          <span
            className="text-muted-foreground/40 select-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 80px)",
              fontWeight: 400,
              letterSpacing: "-2px",
            }}
          >
            Reel
          </span>
        </div>

        {/* "See what it can do!" annotation */}
        <div
          className="flex items-center gap-2 mt-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
          }}
        >
          {/* Curved arrow SVG */}
          <svg
            width="36"
            height="28"
            viewBox="0 0 36 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: "60px" }}
          >
            <path
              d="M2 2C10 2 18 8 22 18M22 18L17 13M22 18L26 13"
              stroke="#e05a5a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontFamily: "cursive, var(--font-display)",
              fontSize: "13px",
              color: "#e05a5a",
              letterSpacing: "0.2px",
              fontStyle: "italic",
            }}
          >
            See what it can do!
          </span>
        </div>
      </div>
    </section>
  );
}
