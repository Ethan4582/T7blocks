export type ComponentEntry = {
  name: string;
  displayName: string;
  category: "components" | "hero" | "background";
  type: string;
  id?: string;
  isPremium: boolean;
  demoUrl: string | null;
  videoUrl: string | null;
  cliCommand: string | null;
  dependencies?: string[];
  description?: string;
};

export const registry: ComponentEntry[] = [
  {
  name: "button-1",
  displayName: "Button 1",
  category: "components",
  type: "button",
  isPremium: false,
  demoUrl: "https://demo.t7blocks.com/components/button/button-1",
  videoUrl: null,
  cliCommand: "npx @t7blocks/ui add button-1",
  dependencies: ["framer-motion"],
  description: "A smooth spring-animated button with primary and outline variants.",
},
{
  name: "nature-1",
  displayName: "Nature 1",
  category: "background",
  type: "nature",
  isPremium: false,
  demoUrl: null,
  videoUrl: null,
  cliCommand: null,
  description: "A placeholder nature background.",
},
];