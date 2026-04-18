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
    block_url: "https://t7blocks.xyz/components/button/launch-button",
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
    block_url: "https://t7blocks.xyz/hero/section/pop-hero",
    canvas: {
      background: "#000000",
      height: "100vh",
    }
  },
  {
    id: "Scroll-Image-Pass",
    name: "Scroll Image Pass",
    shortDescription: "Staggered vertical image scroll with GSAP transition",
    longDescription: "GSAP-powered pinned scroll section with staggered vertical image passes, dynamic title scaling, and a final image-driven layout transition.",

    video: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/scroll-image-pass.mp4",
    category: "scroll",
    date: "2026-04-11",
    tags: ["GSAP", "Scroll", "Animation", "Gallery", "Image"],
    block_url: "https://t7blocks.xyz/components/scroll/scroll-image-pass",
    canvas: {
      background: "#FFFFFF",
      height: "100vh",
      width: "100vw",
      className: "!block !p-0 !m-0 "
    }
  },
  {
    id: "Sticky-Scroll",
    name: "Sticky Scroll",
    shortDescription: "Staggered vertical image scroll with GSAP transition",
    longDescription: "GSAP-powered pinned scroll section with staggered vertical image passes, dynamic title scaling, and a final image-driven layout transition.",

    video: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/blog_demo/scroll_trigger_demo_compress.mp4",
    category: "scroll",
    date: "2026-04-11",
    tags: ["GSAP", "Scroll", "Animation", "Gallery", "Image"],
    block_url: "https://t7blocks.xyz/components/scroll/sticky-scroll",
    canvas: {
      background: "#FFFFFF"
    }
  },
 {
  id: "pull-switch",
  name: "Pull Switch",
  shortDescription: "Interactive pull-cord switch to toggle light and dark mode",
  longDescription: "A canvas-based pull-cord switch component with physics-driven rope interaction. Users can drag and pull the cord to toggle between light and dark themes, with smooth motion, realistic constraints, and animated color transitions.",
  
  video: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/pullswitch.mp4",
  category: "misc",
  date: "2026-04-11",
  tags: ["Canvas", "Animation", "Theme", "Dark Mode", "Interaction"],
  block_url: "https://t7blocks.xyz/components/misc/pull-switch",
  canvas: {
    background: "transparent", // Handled by PullSwitchDemo wrapper for reactivity
    height: "100vh",
    width: "100vw",
    className: "!block !p-0 !m-0 !overflow-hidden",
  }

}
];
