export interface CanvasConfig {
  background?: string;
  width?: string;
  height?: string;
  className?: string;
  infoCard?: string;
  fontClassName?: string;
}

export interface ComponentData {
  id: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  image?: string;
  video: string;
  type: string;
  subsection?: string;
  noSubsection?: boolean;
  category: string;
  date: string;
  tags: string[];
  block_url: string;
  canvas?: CanvasConfig;
}
