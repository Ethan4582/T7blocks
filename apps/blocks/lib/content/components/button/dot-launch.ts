
    export const T7blocksCliCommand = {
   pnpmCommand: `pnpm dlx @t7blocks/cli add dot-launch`,
    npmCommand: `npx @t7blocks/cli add dot-launch`,
    yarnCommand: `yarn dlx @t7blocks/cli add dot-launch`,
    bunCommand: `bunx @t7blocks/cli add dot-launch`
};

export const Code1FileName="Dotlaunchbutton.tsx";


export const installCommand = `pnpm add framer-motion`;

export const setupCode1FileName="page.tsx";
export const setupCode1=`import { Dotlaunchbutton } from '@t7blocks/ui';

export default function Home() {
  return (
    <Dotlaunchbutton
      label="Get started"
      accentColor="#18db38"
      btnColor="#111111"
      animationSpeed={155}
    />
  );
}`

export const propsTable= `
| Property       | Type    | Default          | Description                                                           |
|----------------|---------|------------------|-----------------------------------------------------------------------|
| className      | string  | ""               | Additional CSS classes for the button                                 |
| label          | string  | "Get started"    | The text label to display on the button                                |
| accentColor    | string  | "#18db38"      | The primary color of the grid and arrow animation                      |
| btnColor       | string  | "#111111"      | The background color of the button                                     |
| animationSpeed | number  | 155              | The interval in milliseconds between animation steps                  |
  
`