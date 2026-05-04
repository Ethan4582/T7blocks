export const T7blocksCliCommand ={
    pnpmCommand: "pnpm dlx @t7blocks/cli add lottie-text",
    npmCommand: "npx @t7blocks/cli add lottie-text",
    yarnCommand: "yarn dlx @t7blocks/cli add lottie-text",
    bunCommand: "bunx @t7blocks/cli add lottie-text",
};

export const Code1FileName="LottieText.tsx";

export const installCommand="pnpm add @lottiefiles/dotlottie-react@latest"

export const setupCode1FileName="page.tsx";

export const setupCode1=`import { LottieText } from "@/components/T7blocks/LottieText";

export default function Home() {
  return (
  <div className="min-h-screen flex items-center justify-center bg-white">
      <LottieText 
        textSize="text-4xl md:text-5xl lg:text-6xl"
        lines={[
        [
          { type: "text", value: "Say" },
          {
            type: "lottie",
            config: {
              src: "https://lottie.host/0e894037-15ba-4e1a-b9e2-fdc7fc93957d/eElHfFEFHx.lottie",
              size: 70,
              y: -10,
              scale: 1.1,
            },
          },
          { type: "text", value: "goodbye" },
        ],
        [
      { type: "text", value: "to" },
      {
        type: "lottie",
        config: {
          src: "https://lottie.host/08e8c28b-c406-412c-a685-b41c63cdf7b1/Nr5WCCYllE.lottie",
          size: 80,
          y: 6,
        },
      },
      { type: "text", value: "boring" },
      {
        type: "lottie",
        config: {
          src: "https://lottie.host/2627aac4-8163-458f-b778-4897e6e0e220/5Yat4Cj4Kf.lottie",
          size: 60,
          y: 4,
          scale: 1.7,
        },
      },
      { type: "text", value: "text" },
    ],
  ]}
      /> 
      </div>
  );
}
`;


export const propsTable=`

| Prop             | Type    | Default   | Description                             |
|------------------|---------|-----------|-----------------------------------------|
| lines            | LottieLine[] | required | Array of text/lottie elements           |
| textSize         | string  | ""        | Tailwind text size class                |
| textColor        | string  | "black" | Text color                               |
| animationDelay   | number  | 1000      | Delay between lines in ms               |
| animationDuration| number  | 600       | Animation duration in ms                |
`;