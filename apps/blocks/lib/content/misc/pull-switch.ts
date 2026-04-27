export const installCommand = `pnpm add gsap`;

export const Code1FileName = "PullSwitch.tsx";

export const T7blocksCliCommand = {
  pnpmCommand: `pnpm dlx @t7blocks/cli add pull-switch`,
  npmCommand: `npx @t7blocks/cli add pull-switch`,
  yarnCommand: `yarn dlx @t7blocks/cli add pull-switch`,
  bunCommand: `bunx @t7blocks/cli add pull-switch`,
};

export const propsTable = `
| Parameter           | Type    | Default            | Description                                      |
|---------------------|---------|--------------------|--------------------------------------------------|
| width               | number  | 100                | Width of the canvas in pixels                    |
| height              | number  | 100                | Height of the canvas in pixels                   |
| className           | string  | ""                 | Additional CSS classes to apply to the component |
| buttonlightColor    | string  | "#00bcd4"        | Color of the button in light mode                |
| buttondarkColor     | string  | "#ff5900ff"      | Color of the button in dark mode                 |
| bgLight             | string  | "#f5f5f5"        | Background color of the page in light mode       |
| bgDark              | string  | "#1a1a1a"        | Background color of the page in dark mode        |
`  

export const usageInstructions = `
1. Add the PullSwitch component to your layout.tsx file.
2. Update the bgLight and bgDark props to your desired colors.
`
export const setupCode1FileName = "layout.tsx";
export const setupCode1 = `import PullSwitch from "@/components/T7blocks/PullSwitch";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <div className="fixed top-0 right-12">
          <PullSwitch bgLight="#ffffff" bgDark="#000000" />
        </div>
      </body>
    </html>
  );
}
`