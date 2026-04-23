export const installCommand = `pnpm add framer-motion gsap`;

export const Code1FileName = "PopHero.tsx";
export const Code2FileName = "PopHero.css";


export const T7blocksCliCommand = {
  pnpmCommand: `pnpm dlx @t7blocks/cli add pop-hero`,
  npmCommand: `npx @t7blocks/cli add pop-hero`,
  yarnCommand: `yarn dlx @t7blocks/cli add pop-hero`,
  bunCommand: `bunx @t7blocks/cli add pop-hero`,
};


export const setupCode1FileName="page.tsx";
export const setupCode1=`import { PopHero } from '@t7blocks/ui';

export default function Home() {
  return (
    <PopHero />
  );
}
`



export const propsTable = `
| Property        | Type    | Default   | Description                                                        |
|-----------------|---------|-----------|--------------------------------------------------------------------|
| className       | string  | ""        | Additional CSS classes for the component                         |
| mediaContent    | Image   | undefined | Array of content objects for media sections                        |
| content         | Content | undefined | Main content object with hero section and features                 |
`