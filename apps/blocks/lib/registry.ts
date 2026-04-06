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

export const registry: ComponentEntry[] = [
  {
    id: 1,
    name: "number-odometer",
    displayName: "Number Odometer",
    category: "components",
    type: "button", // Mapping to existing types if possible
    isPremium: false,
    imageUrl: "https://pub-30f77b34698b4af9acb780d4dfe7ee4d.r2.dev/good_one/good_assets/art1.png",
    videoUrl: "https://cdn.sanity.io/files/3fq51aaa/production/42faf2223c5cc654c81761c9b1256659549b6aba.mp4",
    demoUrl: "",
    cliCommand: "npx @t7blocks/cli add number-odometer",
    description: "Animated number odometer for statistics and counters.",
    tags: ["number", "animation", "stats", "counter"],
  },
  
 
];