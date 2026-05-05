export const T7blocksCliCommand = {
  pnpmCommand: `pnpm dlx @t7blocks/cli add stagger-button`,
  npmCommand: `npx @t7blocks/cli add stagger-button`,
  yarnCommand: `yarn dlx @t7blocks/cli add stagger-button`,
  bunCommand: `bunx @t7blocks/cli add stagger-button`,
};

export const Code1FileName = 'StaggerButton.tsx';

export const propsTable =`| Property             | Type            | Default       | Description     |
|----------------------|-----------------|---------------|-----------------|
| text                 | string          | "Staggering Button" | The text to display on the button |
| href                 | string          | "#"           | The URL the button links to |
| color                | string          | "#fafafa"     | The text color |
| backgroundColor      | string          | "#303030"     | The background color of the button |
| hoverBackgroundInset | string          | "0.125em"     | The inset for the background on hover |
| fontSize             | string          | "2em"         | The font size of the text |
| borderRadius         | string          | "0.4em"       | The border radius of the button |
| offsetIncrement      | number          | 0.01          | The delay between each character animation |
| transitionDuration   | string          | "0.6s"        | The duration of the transition |
| transitionEasing     | string          | "cubic-bezier(0.625, 0.05, 0, 1)" | The easing function for the transition |
| onClick              | () => void      | undefined       | The click handler function |
| className            | string          | "font-[instrument-serif]" | Additional CSS classes for the button |
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