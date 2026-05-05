export const T7blocksCliCommand = {
  pnpmCommand: `pnpm dlx @t7blocks/cli add staggerbutton`,
  npmCommand: `npx @t7blocks/cli add staggerbutton`,
  yarnCommand: `yarn dlx @t7blocks/cli add staggerbutton`,
  bunCommand: `bunx @t7blocks/cli add staggerbutton`,
};

export const Code1FileName = 'StaggerButton.tsx';

export const propsTable =`
| Property       | Type    | Default        | Description                                                           |
|----------------|---------|----------------|-----------------------------------------------------------------------|
| className      | string  | ""             | Additional CSS classes for the button                                 |
| defaultChecked | boolean | false          | Initial checked state of the toggle                                   |
| primaryColor   | string  | "#0037ffff"  | The color of the toggle when checked                                  |
| soundSrc       | string  | undefined      | URL to an audio file to play when toggled                             |
`

// usage of the component 
export const setupCode1 = `import { StaggerButton } from "@/components/T7blocks/StaggerButton";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <StaggerButton
          text="Staggering Button"
          href="https://t7blocks.xyz/gallery"
          fontSize="25px"/>
    </div>
  );
}
`