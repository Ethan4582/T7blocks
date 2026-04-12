export type ComponentEntry = {
  name: string;
  slug?: string;
  displayName: string;
  category: string; // broadened from literal types
  type: string;
  id?: number;
  isPremium: boolean;
  demoUrl: string | null;
  videoUrl: string | null;
  imageUrl?: string | null;
  cliCommand: string | null;
  dependencies?: string[];
  description?: string;
  tags?: string[];
};

export type HeroEntry = {
  name: string;
  slug?: string;
  displayName: string;
  category: string; // broadened from literal types
  type: string;
  id?: number;
  isPremium: boolean;
  demoUrl: string | null;
  videoUrl: string | null;
  imageUrl?: string | null;
  cliCommand: string | null;
  dependencies?: string[];
  description?: string;
  tags?: string[];
};

export const registry: ComponentEntry[] = [
  {
    id: 1,
    name: "launch-button",
    displayName: "Launch Button",
    category: "components",
    type: "button", // Mapping to existing types if possible
    isPremium: false,
    imageUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_img/arrow_img.png",
    videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/arrow_button_demo.mp4",
    demoUrl: "https://demo.t7blocks.xyz/components/button/Launch-Button",
    cliCommand: "npx @t7blocks/cli add launch-button",
    description: "A minimalist, premium button featuring a grid-based arrow animation",
    tags: ["Button", "Animation", "framer Motion" , "minimal" , "framer "],
  },
{
  id: 2,
  name: "pop-hero",
  displayName: "Pop Hero",
  category: "hero",
  type: "section",
  isPremium: false,
  videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/pop_hero.mp4",
  demoUrl: "https://demo.t7blocks.xyz/components/hero/Pop-Hero",
  cliCommand: "npx @t7blocks/cli add pop-hero",
description: "GSAP animated hero section with pop-up animation to set up your hero section.",
  tags: [ "hero", "gsap", "nature", "minimal" ,"framer motion" , "framer"  ],
}
];

