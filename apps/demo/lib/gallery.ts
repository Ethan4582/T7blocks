export interface CanvasConfig {
   background?: string;
   width?: string;
   height?: string;
   className?: string; // Additional Tailwind styling
   infoCard?: string;  // Optional text for a card in the right corner
}

export interface ComponentData {
   id: string;
   name: string;
   shortDescription: string;
   longDescription: string;
   image: string;
   video: string;
   category: string;
   date: string;
   tags: string[];
   block_url: string;
   canvas?: CanvasConfig;
}

export const components: ComponentData[] = [
   {
      id: "Launch-Button",
      name: "Launch Button",
      shortDescription: "Sleek button with fluid square arrow animation.",
      longDescription: "A high-fidelity interactive button designed with Framer Motion. Features a unique grid-based arrow animation that activates on hover. Fully customizable props for colors, speed, and labels make it perfect for any landing page launch action.",
      image:"https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/main_T7_labs_agency/demo.png",
      video: "",
      category: "button",
      date: "2026-04-11",
      tags: ["Framer Motion", "Button", "Micro-interaction", "Next.js"],
      block_url: "https://github.com/Ethan4582/T7blocks/blob/main/packages/ui/src/components/button/launch-button/index.tsx",
      canvas: {
         background: "#EBEBEB", // Default as per request
         height: "100vh",
         
      }
   },
];
