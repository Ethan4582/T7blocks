export const installCommand = `pnpm add gsap`;

export const Code1FileName = "StickyScroll.tsx";
export const Code2FileName = "StickyScroll.css";

export const T7blocksCliCommand = {
  pnpmCommand: `pnpm dlx @t7blocks/cli add sticky-scroll`,
  npmCommand: `npx @t7blocks/cli add sticky-scroll`,
  yarnCommand: `yarn dlx @t7blocks/cli add sticky-scroll`,
  bunCommand: `bunx @t7blocks/cli add sticky-scroll`,
};

export const propsTable = `
| Property        | Type            | Default          | Description                                           |
|-----------------|-----------------|------------------|-------------------------------------------------------|
| images          | StickyImage[]   | DEFAULT_IMAGES   | Array of images to display in the sticky sections     |
| enableScale     | boolean         | false            | Whether to enable scaling animation on the images      |
| title           | string          | "ScrollTrigger"  | Title text for the hero section                       |
| fontClassName   | string          | instrument.className | Custom font class for the title                   |
`

export const setupCode1FileName = "page.tsx";
export const setupCode1 = `
import { StickyScroll } from "@t7blocks/ui";

export default function Home() {
  return (
    <main>
      <StickyScroll />
    </main>
  );
}
`