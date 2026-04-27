export const T7blocksCliCommand = {
    pnpmCommand: `pnpm dlx @t7blocks/cli add wave-button`,
    npmCommand: `npx @t7blocks/cli add wave-button`,
    yarnCommand: `yarn dlx @t7blocks/cli add wave-button`,
    bunCommand: `bunx @t7blocks/cli add wave-button`,
};

export const Code1FileName = 'WaveButton.tsx';

export const installCommand = `pnpm add framer-motion`;

export const setupCode1FileName="page.tsx";

export const setupCode1=`import { WaveButton } from "@/components/T7blocks/WaveButton";
export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <WaveButton />
    </div>
  );
}`

export const propsTable= `
| Property          | Type        | Default        | Description                                             |
|----------------   |-------------|----------------|---------------------------------------------------------|
| label             | string      | "Get Started"  | Text label displayed on the button                      |
| onClick           | () => void  | undefined      | Click event handler                                     |
| bgColor           | string      | "#ffffff"    | Background color of the button                          |
| animationDuration | number      | 500            | Duration of the animation in milliseconds               |
| width             | number      | "168px"        | Width of the button                                     |
| height            | number      | 52             | Height of the button                                    |
| roundness         | string      | "26px"         | Border-radius for the button                            |
| className         | string      | ""             | Additional CSS classes                                  |
`
