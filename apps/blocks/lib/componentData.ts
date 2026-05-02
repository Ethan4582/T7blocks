export interface ComponentItem {
  id: number;
  name: string;
  image: string;
  video: string;
  slug: string;
  category: string;
  description: string;
  publishedDate: string;
  isPremium: boolean;
  tags: string[];
  demoUrl?: string;
}

export interface ComponentDetailData {
  slug: string;
  defaultTab?: string;
  setupInstructions?: boolean;
  dependencies?: string[];
  codeBlocks: Array<{
    label: string;
    code: string;
    jsxCode?: string;
  }>;
  setupBlocks?: Array<{
    label: string;
    code: string;
    jsxCode?: string;
  }>;
  props?: string;
  propsTable?: string;
  installCommand?: string | {
    npm: string;
    pnpm: string;
    yarn: string;
    bun: string;
  } | null;
    T7blocksCliCommand: string | {
    pnpmCommand: string;
    npmCommand: string;
    yarnCommand: string;
    bunCommand: string;
  };
}
