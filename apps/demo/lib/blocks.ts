import { ComponentData } from "./types";

export const components: ComponentData[] = [
  {
    id: "Launch-Button",
    name: "Launch Button",
    shortDescription: "Sleek button with fluid square arrow animation.",
    longDescription: "A high-fidelity interactive button designed with Framer Motion. Features a unique grid-based arrow animation that activates on hover. Fully customizable props for colors, speed, and labels make it perfect for any landing page launch action.",
    image: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_img/arrow_img.png",
    video: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/arrow_button_demo.mp4",
    category: "button",
    date: "2026-04-11",
    tags: ["Framer Motion", "Button", "Micro-interaction", "Next.js"],
    block_url: "https://github.com/Ethan4582/T7blocks/blob/main/packages/ui/src/components/button/launch-button/index.tsx",
    canvas: {
      background: "#EBEBEB",
      height: "100vh",
    }
  },
  {
    id: "Pop-Hero",
    name: "Pop Hero",
    shortDescription: "Cinematic hero with fluid GSAP pop-up animation.",
    longDescription: "A GSAP-powered hero section featuring fluid pop-up transitions, fullscreen video background, and immersive typography. Designed for modern landing pages, it delivers smooth animations, premium visuals, and high-impact user engagement.",

    video: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/pop_hero.mp4",
    category: "hero",
    date: "2026-04-11",
    tags: ["GSAP", "Hero", "Animation", "Next.js"],
    block_url: "https://github.com/Ethan4582/T7blocks/blob/main/packages/ui/src/hero/PopHero/PopHero.tsx",
    canvas: {
      background: "#000000",
      height: "100vh",
    }
  },
];
