export const installCommand = `pnpm add @t7blocks/ui gsap`;

export const componentCode = `"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./StickyScroll.css"; 
import { Instrument_Serif } from "next/font/google";

export const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
});
gsap.registerPlugin(ScrollTrigger);

const DEFAULT_IMAGES = [
  { url: "https://picsum.photos/id/1069/900/1200" },
  { url: "https://picsum.photos/id/1071/900/1200" },
  { url: "https://picsum.photos/id/1076/900/1200" },
  { url: "https://picsum.photos/id/1079/900/1200" },
  { url: "https://picsum.photos/id/1068/900/1200" },
  { url: "https://picsum.photos/id/1067/900/1200" },
  { url: "https://picsum.photos/id/1050/900/1200" },
  { url: "https://picsum.photos/id/1065/900/1200" },
];

type StickyImage = {
  url: string;
};

export type StickyScrollProps = {
  images?: StickyImage[];
  enableScale?: boolean;
  title?: string;
  fontClassName?: string;
};

export function StickyScroll({
  images = DEFAULT_IMAGES,
  enableScale = false,
  title = "ScrollTrigger",
  fontClassName = instrument.className, 
}: StickyScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const safeImages = images.length > 0 ? images : DEFAULT_IMAGES;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const lastCard = containerRef.current!.querySelector(
        \`.stickyScroll_scroll\`
      ) as HTMLElement;

      const pinnedSections = gsap.utils.toArray<HTMLElement>(
        \`.stickyScroll_pinned\`
      );

      pinnedSections.forEach((section, index, sections) => {
        const img = section.querySelector(
          \`.stickyScroll_img\`
        ) as HTMLElement;

        const nextSection = sections[index + 1] || lastCard;

        const endScalePoint = \`top+=\${nextSection.offsetTop - section.offsetTop} top\`;

        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              index === sections.length - 1
                ? \`+=\${lastCard.offsetHeight}\`
                : \`+=\${document.body.offsetHeight}\`,
            pin: true,
            pinSpacing: false,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        if (enableScale && img) {
          gsap.fromTo(
            img,
            { scale: 1 },
            {
              scale: 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: endScalePoint,
                scrub: 1,
              },
            }
          );
        }
      });

      const heroH1 = containerRef.current!.querySelector(
        \`.stickyScroll_hero h1\`
      ) as HTMLElement | null;

      if (heroH1) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=400vh",
          scrub: 1,
          onUpdate: (self) => {
            heroH1.style.opacity = \`\${1 - self.progress}\`;
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [enableScale, safeImages]);

  return (
    <div
      ref={containerRef}
      className="stickyScroll_container"
      style={{
        backgroundImage:
          "url(https://pub-30f77b34698b4af9acb780d4dfe7ee4d.r2.dev/good_bg/black_glass.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* HERO */}
      <section className="stickyScroll_section stickyScroll_hero stickyScroll_pinned">
        <div className="stickyScroll_img" />
        <h1 className={fontClassName}>{title}</h1>
      </section>

      {/* CARDS */}
      {safeImages.slice(0, -1).map((item, i) => (
        <section
          key={i}
          className="stickyScroll_section stickyScroll_card stickyScroll_pinned"
        >
          <div className="stickyScroll_img">
            <img src={item.url} alt={\`img-\${i}\`} />
          </div>
        </section>
      ))}

      {/* LAST */}
      <section className="stickyScroll_section stickyScroll_card stickyScroll_scroll">
        <div className="stickyScroll_img">
          <img src={safeImages[safeImages.length - 1].url} alt="last" />
        </div>
      </section>
    </div>
  );
}
`;

export const componentCodecss = `.stickyScroll_container {
  width: 100%;
}

.stickyScroll_section {
  width: 100%;
  height: 100vh;
  position: relative;
}

.stickyScroll_hero h1 {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: 400;
  font-size: 200px;
  color: #fff;
  letter-spacing: -8px;
  line-height: 90%;
  z-index: 2;
}

.stickyScroll_img {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 1000px;
  height: 700px;
}

.stickyScroll_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .stickyScroll_hero h1 {
    font-size: 120px;
    letter-spacing: -4px;
  }

  .stickyScroll_img {
    width: 80vw;
    height: 55vh;
  }
}

@media (max-width: 768px) {
  .stickyScroll_hero h1 {
    font-size: 64px;
    letter-spacing: -2px;
    padding: 0 12px;
  }

  .stickyScroll_img {
    width: 90vw;
    height: 50vh;
  }
}

@media (max-width: 480px) {
  .stickyScroll_hero h1 {
    font-size: 42px;
  }

  .stickyScroll_img {
    width: 92vw;
    height: 45vh;
  }
}
`;