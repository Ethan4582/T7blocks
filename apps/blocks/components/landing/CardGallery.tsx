"use client";

import { useEffect, useRef } from "react";

const CARDS = [
  {
    id: 1,
    title: "Momentum Based Hover (Inertia)",
    category: "Interaction",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    accent: "#2a2727",
    rotate: -22,
    tx: -520,
    ty: 80,
    z: 1,
  },
  {
    id: 2,
    title: "Pixelate Render",
    subtitle: "Pixelate Image Render Effect",
    category: "Effect",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
    accent: "#1a3a6e",
    rotate: -10,
    tx: -200,
    ty: 30,
    z: 2,
  },
  {
    id: 3,
    title: "Directional List Hover",
    category: "UI",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    accent: "#6b2a1a",
    rotate: 4,
    tx: 100,
    ty: 30,
    z: 3,
  },
  {
    id: 4,
    title: "Flick Cards Slider",
    category: "Animation",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    accent: "#3b2a1a",
    rotate: 18,
    tx: 400,
    ty: 80,
    z: 2,
  },
  {
    id: 5,
    title: "Cycle Text Loop",
    category: "Typography",
    imageUrl:
      "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=600&q=80",
    accent: "#1a2a4a",
    rotate: 30,
    tx: 660,
    ty: 160,
    z: 1,
  },
];

export function CardGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".fan-card");
    if (!cards) return;

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      // progress: 0 when top hits bottom of viewport → 1 when section is fully visible
      const progress = Math.min(
        1,
        Math.max(0, (viewH - rect.top) / (viewH + rect.height * 0.5))
      );

      cards.forEach((card, i) => {
        const baseRotate = parseFloat(card.dataset.rotate ?? "0");
        const baseTx = parseFloat(card.dataset.tx ?? "0");
        const baseTy = parseFloat(card.dataset.ty ?? "0");
        // cards start stacked (0,0) and fan out as progress → 1
        const r = baseRotate * progress;
        const x = baseTx * progress;
        const y = baseTy * progress;
        card.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${r}deg)`;
        card.style.opacity = String(0.4 + 0.6 * progress);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
      style={{ minHeight: "100vh", paddingTop: "8rem" }}
    >
      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.25,
        }}
      />

      {/* Section headline */}
      <div className="relative z-10 text-center px-6">
        <p className="type-caption text-muted-foreground mb-4 tracking-widest">
          Component Library
        </p>
        <h2
          className="type-h1 text-foreground mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Dev Toolkit{" "}
          <span
            className="inline-block text-accent"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ✦
          </span>{" "}
          Built to Flex
        </h2>
        <p className="type-body text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Platform packed with{" "}
          <span className="px-2 py-0.5 rounded bg-card border border-border text-foreground text-sm font-medium">
            Webflow
          </span>{" "}
          &amp;{" "}
          <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/30 text-accent text-sm font-medium">
            HTML
          </span>{" "}
          resources, icons, easings and interactive components — crafted by
          t7labs.
        </p>
      </div>

      {/* Fan card stage */}
      <div
        className="relative z-10 flex items-end justify-center"
        style={{ height: "480px", marginTop: "6rem" }}
      >
        <div ref={cardsRef} className="relative" style={{ width: 0, height: 0 }}>
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="fan-card absolute"
              data-rotate={card.rotate}
              data-tx={card.tx}
              data-ty={card.ty}
              style={{
                width: "220px",
                height: "160px",
                bottom: 0,
                left: "-110px",
                transformOrigin: "bottom center",
                transform: `translateX(0px) translateY(0px) rotate(0deg)`,
                opacity: 0.4,
                transition: "transform 0.05s linear, opacity 0.05s linear",
                zIndex: card.z,
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)",
                cursor: "pointer",
              }}
            >
              {/* Card image */}
              <img
                src={card.imageUrl}
                alt={card.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Overlay gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 40%, transparent 100%)",
                }}
              />

              {/* Card label */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  right: "12px",
                }}
              >
                <div
                  className="type-caption-sm"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "9px",
                    marginBottom: "2px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {card.category}
                </div>
                <div
                  style={{
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 600,
                    lineHeight: 1.3,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {card.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />
    </section>
  );
}
