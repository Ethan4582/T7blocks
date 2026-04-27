import { ComponentItem } from "./componentData";

export type ComponentEntry = {
  name: string;
  slug?: string;
  displayName: string;
  category: string;
  type: string;
  id?: number;
  isPremium: boolean;
  demoUrl: string | null;
  videoUrl: string | null;
  imageUrl?: string | null;
  dependencies?: string[];
  description?: string;
  tags?: string[];
  relatedCategories: string[];
  isPopular: boolean;
  noSubsection?: boolean;
};

export const toComponentItem = (entry: ComponentEntry): ComponentItem => ({
  id: entry.id || 0,
  name: entry.displayName,
  image: entry.imageUrl || "",
  video: entry.videoUrl || "",
  slug: entry.name,
  category: entry.category,
  description: entry.description || "",
  publishedDate: "Recent",
  isPremium: entry.isPremium,
  tags: entry.tags || [],
  demoUrl: entry.demoUrl ?? undefined

});

export const registry: ComponentEntry[] = [
  {
    id: 1,
    name: "dot-launch",
    displayName: "Dot Launch Button",
    category: "components",
    type: "button",
    isPremium: false,
    relatedCategories: [],
  isPopular: false,
    videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/launch_button.mp4",
    demoUrl: "https://demo.t7blocks.xyz/components/button/Launch-Button", 
    description: "A minimalist, premium button featuring a grid-based arrow animation",
    tags: ["Button", "Animation", "framer Motion", "minimal"],
  },
  {
    id: 2,
    name: "pop-hero",
    displayName: "Pop Hero",
    category: "sections",
    type: "hero",
    isPremium: false,
    videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/pop_hero.mp4",
    demoUrl: "https://demo.t7blocks.xyz/sections/hero/Pop-Hero",
    relatedCategories: [],
  isPopular: false,
    description: "GSAP animated hero section with pop-up animation to set up your hero section.",
    tags: ["hero", "gsap", "nature", "minimal", "framer motion"],
  },
  {
    id: 3,
    name: "scroll-image-pass",
    displayName: "Scroll Image Pass",
    category: "interactions",
    type: "scroll",
    isPremium: false,
    relatedCategories: [],
   isPopular: true,
    videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/scroll-image-pass.mp4",
    demoUrl: "https://demo.t7blocks.xyz/interactions/scroll/Scroll-Image-Pass",
   
    description: "Staggered vertical image scroll with GSAP ScrollTrigger.",
    tags: ["scroll", "gsap", "images", "work", "framer motion"],
  }, {
    id: 4,
    name: "sticky-scroll",
    displayName: "Sticky Scroll",
    category: "interactions",
    type: "scroll",
    isPremium: false,
    relatedCategories: [],
  isPopular: true,
    videoUrl: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/blog_demo/scroll_trigger_demo_compress.mp4",
    demoUrl: "https://demo.t7blocks.xyz/interactions/scroll/Sticky-Scroll",
   
    description: "Sticky scroll with GSAP ScrollTrigger.",
    tags: ["scroll", "ScrollTrigger", "gsap", "images", "work", "framer motion"],
  }, {
    id: 5,
    name: "pull-switch",
    displayName: "Pull Switch",
    category: "misc",
    type: "misc",
    isPremium: false,
     noSubsection: true,
     relatedCategories: ["button"],
  isPopular: false,
    videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/pullswitch.mp4",
    demoUrl: "https://demo.t7blocks.xyz/misc/pull-switch",
    description: "Interactive pull-cord switch to toggle light and dark mode",
    tags: ["misc", "gsap", "button", "Canvas", "Animation", "Theme", "Dark Mode", "Interaction"],
  }, {
    id: 6,
    name: "knob-toggle",
    displayName: "Knob Toggle",
    category: "components",
    type: "button",
    isPremium: false,
     relatedCategories: [],
  isPopular: false,
    videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/KnobButton.mp4",
    demoUrl: "https://demo.t7blocks.xyz/components/button/knob-toggle",
    description: "A knob toggle to switch between light and dark mode with sound effect",
    tags: ["button", "Animation", "Theme", "Dark Mode", "Interaction", "sound"],
  }

];
