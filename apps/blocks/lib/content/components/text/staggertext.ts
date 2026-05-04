export const T7blocksCliCommand = {
    pnpmCommand: "pnpm dlx @t7blocks/cli add stagger-text",
    npmCommand: "npx @t7blocks/cli add stagger-text",
    yarnCommand: "yarn dlx @t7blocks/cli add stagger-text",
    bunCommand: "bunx @t7blocks/cli add stagger-text",
};

export const Code1FileName="Staggertext.tsx";



export const setupCode1FileName="page.tsx";

export const setupCode1=`import { StaggerText } from "@/components/T7blocks/StaggerText";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <StaggerText 
       text="Hover over me"
       fontSize="5rem"
       fontWeight={700}
       offsetIncrement={0.015}
      />
    </div>
  );
}`

export const propsTable= `
| Property          | Type             | Default   | Description                                            |
|----------------   |------------------|-----------|--------------------------------------------------------|
| text              | string           | "Hover me"| Text to display                                        |
| tag               | ElementType      | "span"    | HTML tag to render (e.g., 'h1', 'p', 'span')           |
| color             | string           | "#131313" | Text color                                             |
| fontSize          | string           | "1em"     | Font size (e.g., "1em", "2.5rem", "72px")            |
| fontWeight        | string           | 400       | Font weight                                            |
| offsetIncrement   | number           | 0.01      | Delay increment between characters (in seconds)        |
| transitionDuration| string           | "0.6s"    | Duration of the animation (e.g., "0.6s", "1200ms")   |
| transitionEasing  | string           | "cubic-bezier(0.625, 0.05, 0, 1)" | Easing function for the animation |
| className         | string           | ""        | Additional CSS classes                                 |
`



