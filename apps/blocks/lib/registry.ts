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
};

export const registry: ComponentEntry[] = [
  {
    name: "magnetic-button",
    displayName: "Magnetic Button",
    category: "components",
    type: "button",
    isPremium: false,
    demoUrl: "https://demo.t7blocks.com/components/button/magnetic-button",
    videoUrl: null,
    cliCommand: "npx @t7blocks/cli add magnetic-button",
  },
  {
    name: "gradient-hero",
    displayName: "Gradient Split Hero",
    category: "hero",
    type: "split",
    isPremium: true,
    demoUrl: "https://demo.t7blocks.com/hero/split/gradient-hero",
    videoUrl: null,
    cliCommand: null,
  },
  {
    name: "particles-001",
    displayName: "Floating Particles",
    category: "background",
    type: "particles",
    id: "001",
    isPremium: false,
    demoUrl: "https://demo.t7blocks.com/components/background/particles-001",
    videoUrl: null,
    cliCommand: "npx @t7blocks/cli add bg-particles-001",
  },
];