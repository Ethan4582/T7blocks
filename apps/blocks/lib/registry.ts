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
  credits?: {
    creatorName:string;
    creatorUrl?:string;
    blockName:string;
    blockUrl?:string;
  }
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
  demoUrl: entry.demoUrl ?? undefined,
  credits: entry.credits
});

export const registry: ComponentEntry[] = [
   {
    id: 1,
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
    tags: ["Scroll", "GSAP", "Images", "Work", "Framer Motion"],
  }, {
    id: 2,
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
    tags: ["Scroll", "ScrollTrigger", "GSAP", "Images", "Work", "Framer Motion"],
    credits: {
      creatorName: "MadeByKing",
      blockName: "Sticky Scroll",
      blockUrl:"https://madebykin.co.uk/web",
    }
  }, 
  {
    id: 3,
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
    tags: ["Button", "Animation", "Framer Motion", "Minimal"],
    credits:{
      creatorName:"Praveen Kumar",
      blockName:"Launch Button",
      blockUrl:"https://x.com/praveenisomer/status/2040029044666745100",
      creatorUrl:"https://x.com/praveenisomer"
    }
  },
 {
    id: 4,
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
    tags: ["Misc", "GSAP", "Button", "Canvas", "Theme", "Dark Mode", "Interaction"],
  }, {
    id: 5,
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
    tags: ["Button", "Interaction", "Theme", "Dark Mode", "Sound"],
  },{
    id: 6,
    name: "stagger-button",
    displayName: "Stagger Button",
    category: "components",
    type: "button",
    isPremium: false,
    relatedCategories: ["text"],
  isPopular: false,
    videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/staggerbutton.mp4",
    demoUrl: "https://demo.t7blocks.xyz/components/button/stagger-button",
    description: "A button with a stagger animation on hover",
    tags: ["Button", "Text" , "Hover", "Animation"],
  },
  {
    id:7,
    name:"wave-button",
    displayName:"Wave Button",
    category:"components",
    type:"button",
    isPremium:false,
    relatedCategories:[],
    isPopular:false,
    videoUrl:"https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/wavebutton.mp4",
    demoUrl:"https://demo.t7blocks.xyz/components/button/WaveButton",
    description:"A button with a wave animation on hover",
    tags:["Button","Interaction" ,"Framer Motion"],
    credits:{
      creatorName:"Imesh Dilshan",
      blockName:"Icon Slide In Button",
      blockUrl:"https://www.framer.com/marketplace/components/icon-slide-in-button/",
      creatorUrl:"https://x.com/imeshdilshan102"
    }
  },
  {
    id: 8,
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
    tags: ["Hero", "GSAP", "Nature", "Minimal", "Framer Motion"],
  },{
    id:9,
    name:"bouncy-button",
    displayName:"Bouncy Button",
    category:"components",
    type:"button",
    isPremium:false,
    relatedCategories:[],
    isPopular:false,
    videoUrl:"https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/bouncybutton.mp4",
    demoUrl:"https://demo.t7blocks.xyz/components/button/bouncy-button",
    description:"A button with a bouncy animation on hover",
    tags:["Button","Interaction" ,"Framer Motion"],
    credits:{
      creatorName:"Soyeb",
      blockName:"Bouncy Button",
      blockUrl:"https://www.framer.com/marketplace/components/shift-button/",
      creatorUrl:"https://x.com/sekhsoyebali"
    }
  },
  {
    id: 10,
    name: "staggertext",
    displayName: "Stagger Text",
    category: "components",
    type: "text",
    isPremium: false,
    relatedCategories: ["hover"],
    isPopular: false,
    videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/staggertext.mp4",
    demoUrl: "https://demo.t7blocks.xyz/components/text/stagger-text",
    description: "A text with a stagger animation on hover",
    tags: ["Text", "Animation", "Hover", "Interactive", "Typography"],
  },
  {
    id: 11,
    name: "fallingtext",
    displayName: "Falling Text",
    category: "components",
    type: "text",
    isPremium: false,
    relatedCategories: ["scroll"],
    isPopular: false,
    videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/fallingtext.mp4",
    demoUrl: "https://demo.t7blocks.xyz/components/text/falling-text",
    description: "A text with a falling animation when scrolled",
    tags: ["Text", "Animation", "ScrollTrigger", "GSAP" , "Scroll "],
  },
  {
    id: 12,
    name: "lottietext",
    displayName: "Lottie Text",
    category: "components",
    type: "text",
    isPremium: false,
    relatedCategories: [],
    isPopular: false,
    videoUrl: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_demo/lottietext.mp4",
    demoUrl: "https://demo.t7blocks.xyz/components/text/lottie-text",
    description: "A text with a lottie animation ",
    tags: ["Text", "Animation", "Lottie"],
  }
];
