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
    name: "launch-button",
    displayName: "Launch Button",
    category: "components",
    type: "button",
    isPremium: false,
  
    videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/launch_button.mp4",
    demoUrl: "https://demo.t7blocks.xyz/components/button/Launch-Button",
    // cliCommand: {
    //   pnpmCommand: `pnpm dlx @t7blocks/cli add launch-button`,
    //   npmCommand: `npm  @t7blocks/cli add launch-button`,
    //   yarnCommand: `yarn dlx @t7blocks/cli add launch-button`,
    //   bunCommand: `bun  @t7blocks/cli add launch-button`,
    // },  
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
    // cliCommand: {
    //   pnpmCommand: `pnpm dlx @t7blocks/cli add pop-hero`,
    //   npmCommand: `npm  @t7blocks/cli add pop-hero`,
    //   yarnCommand: `yarn dlx @t7blocks/cli add pop-hero`,
    //   bunCommand: `bun  @t7blocks/cli add pop-hero`,
    // },
    description: "GSAP animated hero section with pop-up animation to set up your hero section.",
    tags: [ "hero", "gsap", "nature", "minimal" ,"framer motion" , "framer"  ],
  },
  {
    id: 3,
    name: "scroll-image-pass",
    displayName: "Scroll Image Pass",
    category: "components",
    type: "scroll",
    isPremium: false,
    videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/scroll-image-pass.mp4",
    demoUrl: "https://demo.t7blocks.xyz/components/scroll/Scroll-Image-Pass",
    // cliCommand: {
    //   pnpmCommand: `pnpm dlx @t7blocks/cli add scroll-image-pass`,
    //   npmCommand: `npm  @t7blocks/cli add scroll-image-pass`,
    //   yarnCommand: `yarn dlx @t7blocks/cli add scroll-image-pass`,
    //   bunCommand: `bun  @t7blocks/cli add scroll-image-pass`,
    // },
    description: "Staggered vertical image scroll with GSAP ScrollTrigger.",
    tags: [ "scroll", "gsap", "images", "work" ,"framer motion" , "framer"  ],
  },{
    id:4,
    name:"sticky-scroll",
    displayName:"Sticky Scroll",
    category:"components",
    type:"scroll",
    isPremium:false,
    videoUrl:"https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/blog_demo/scroll_trigger_demo_compress.mp4",
    demoUrl:"https://demo.t7blocks.xyz/components/scroll/Sticky-Scroll",
    // cliCommand:{
    //   pnpmCommand: `pnpm dlx @t7blocks/cli add sticky-scroll`,
    //   npmCommand: `npm  @t7blocks/cli add sticky-scroll`,
    //   yarnCommand: `yarn dlx @t7blocks/cli add sticky-scroll`,
    //   bunCommand: `bun  @t7blocks/cli add sticky-scroll`,
    // },
    description: "Sticky scroll with GSAP ScrollTrigger.",
    tags: [ "scroll", "ScrollTrigger","gsap", "images", "work" ,"framer motion" , "framer"  ],
  },{
    id:5,
    name:"pull-switch",
    displayName:"Pull Switch",
    category:"components",
    type:"misc",
    isPremium:false,
    videoUrl:"https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/pullswitch.mp4",
    demoUrl:"https://demo.t7blocks.xyz/components/misc/pull-switch",
    // cliCommand:{
    //   pnpmCommand: `pnpm dlx @t7blocks/cli add pullswitch`,
    //   npmCommand: `npm  @t7blocks/cli add pullswitch`,
    //   yarnCommand: `yarn dlx @t7blocks/cli add pullswitch`,
    //   bunCommand: `bun  @t7blocks/cli add pullswitch`,
    // },
    description: "Interactive pull-cord switch to toggle light and dark mode",
    tags: [ "misc","gsap", "button" ,"Canvas", "Animation", "Theme", "Dark Mode", "Interaction"],
  },{
    id:6,
    name:"knob-toggle",
    displayName:"Knob Toggle",
    category:"components",
    type:"button",
    isPremium:false,
    videoUrl:"https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/KnobButton.mp4",
    demoUrl:"https://demo.t7blocks.xyz/components/button/knob-toggle",
   
    description: "A knob toggle to switch between light and dark mode with sound effect",
    tags: [ "button" ,"Animation", "Theme", "Dark Mode", "Interaction","sound"],
  }
  
];
