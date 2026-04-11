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
  creator: {
    name: string;
    image: string;
    url?: string;
  };
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
  }>;
}
