export const T7blocksCliCommand={
    pnpmCommand: "pnpm dlx @t7blocks/cli add falling-text",
    npmCommand: "npx @t7blocks/cli add falling-text",
    yarnCommand: "yarn dlx @t7blocks/cli add falling-text",
    bunCommand: "bunx @t7blocks/cli add falling-text",
}

export const installCommand = `pnpm add gsap`;

export const Code1FileName="FallingText.tsx";

export const setupCode1FileName="page.tsx";

export const setupCode1=`import { FallingText } from "@/components/T7blocks/FallingText";

export default function Home() {
  return (
    <div>
    <FallingText
        rows={[
           {lines: ["Scroll down ", "watch them fall"], },
          { lines: ["Gravity always", "wins in the end"],
            accentImage: {
              src: "https://pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev/blocks_img/logo.png",alt: "", className: "-rotate-[20deg] translate-x-[0.15em] -translate-y-[0.2em]  " , },
          },
          { lines: ["Words crumble", "when you look away"], },
          { lines: ["The Animation Ends"],},
      />  
    </div>
  );
}
`

export const propsTable=`
| Property          | Type             | Default   | Description                                            |
|-----------------|------------------|-----------|--------------------------------------------------------|
| rows            | FallingTextRow[] | -         | Array of rows, each containing lines  |
| textColor       | string           | "#121213ff" | Text color for the main lines                             |
| accentImage     | {src: string, alt: string, className?: string} | undefined | Optional accent image for each row |
`
