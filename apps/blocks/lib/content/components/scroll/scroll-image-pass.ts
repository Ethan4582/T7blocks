export const installCommand = `pnpm add gsap`;

export const Code1FileName = "ScrollimagePass.tsx";

export const T7blocksCliCommand = {
  pnpmCommand: `pnpm dlx @t7blocks/cli add scroll-image-pass`,
  npmCommand: `npx @t7blocks/cli add scroll-image-pass`,
  yarnCommand: `yarn dlx @t7blocks/cli add scroll-image-pass`,
  bunCommand: `bunx @t7blocks/cli add scroll-image-pass`,
};

export const propsTable = `
| Parameter       | Type    | Default             | Description                                      |
|-----------------|---------|---------------------|--------------------------------------------------|
| passDuration    | number  | 2.5                 | Duration of the image pass animation             |
| fontClassName   | string  | "Instrument_Serif"  | Custom font class name                           |
`

export const setupCode1FileName = "page.tsx";
export const setupCode1 = `
import { ScrollimagePass } from "@t7blocks/ui";

export default function Home() {
  return (
    <main>
      <ScrollimagePass />
    </main>
  );
}
`
