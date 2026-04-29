export const T7blocksCliCommand= {
    pnpmCommand: `pnpm dlx @t7blocks/cli add bouncy-button`,
    npmCommand: `npx @t7blocks/cli add bouncy-button`,
    yarnCommand: `yarn dlx @t7blocks/cli add bouncy-button`,
    bunCommand: `bunx @t7blocks/cli add bouncy-button`,
};

export const Code1FileName = 'BouncyButton.tsx';

export const installCommand = `pnpm add framer-motion`;

export const setupCode1FileName="page.tsx";

export const setupCode1=`import { BouncyButton } from "@/components/T7blocks/BouncyButton";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <BouncyButton />
    </div>
  );
}`

export const propsTable= `
| Property          | Type        | Default        | Description                                             |
|----------------   |-------------|----------------|---------------------------------------------------------|
| text             | string      | "Join Discord"  | Text label displayed on the button                      |
| onClick           | () => void  | undefined      | Click event handler                                     |
| primaryColor      | string      | "#4c2c99ff"    | Background color of the button                          |
| icon              | ReactNode   | undefined      | Icon to be displayed on the button                      |
| width             | number      | "168px"        | Width of the button                                     |
| height            | number      | 52             | Height of the button                                    |
| roundness         | string      | "26px"         | Border-radius for the button                            |
| className         | string      | ""             | Additional CSS classes                                  |
`