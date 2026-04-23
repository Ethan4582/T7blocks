export const T7blocksCliCommand = {
  pnpmCommand: `pnpm dlx @t7blocks/cli add knob-toggle`,
  npmCommand: `npx @t7blocks/cli add knob-toggle`,
  yarnCommand: `yarn dlx @t7blocks/cli add knob-toggle`,
  bunCommand: `bunx @t7blocks/cli add knob-toggle`,
};

export const Code1FileName = 'KnobToggle.tsx';



export const propsTable =`
| Property       | Type    | Default        | Description                                                           |
|----------------|---------|----------------|-----------------------------------------------------------------------|
| className      | string  | ""             | Additional CSS classes for the button                                 |
| defaultChecked | boolean | false          | Initial checked state of the toggle                                   |
| primaryColor   | string  | "#0037ffff"  | The color of the toggle when checked                                  |
| soundSrc       | string  | undefined      | URL to an audio file to play when toggled                             |
`

// usage of the component 
export const setupCode1 =`export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=\`$\{geistSans.variable} $\{geistMono.variable} antialiased\`
      >
        {children}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <KnobToggle />
        </div>
      </body>
    </html>
  );
}
`

export const setupCode1FileName="layout.tsx";
export const setupCode2FileName="global.css";
export const setupCode2 =`
:root {
  --background: #ffffff;
  --foreground: #171717;
}

:root.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}
`
