"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type LottieItem = {
  src: string;
  size?: number;      // width/height
  x?: number;         // px offset X
  y?: number;         // px offset Y
  scale?: number;     // zoom
};

type Segment =
  | { type: "text"; value: string }
  | { type: "lottie"; config: LottieItem };

type Props = {
  lines: Segment[][]; // fully controlled layout
  textColor?: string;
  textSize?: string;
  maxWidthClassName?: string;
};

export  function LottieText({
  lines,
  textColor = "#1f2937",
  textSize = "text-3xl md:text-4xl lg:text-5xl",
  maxWidthClassName = "max-w-3xl",
}: Props) {
  return (
    <div className="w-full flex items-center justify-center px-6">
      <div className={`flex flex-col items-center text-center ${maxWidthClassName}`}>
        {lines.map((line, i) => (
          <div
            key={i}
            className={`flex flex-wrap items-center justify-center gap-2 font-semibold leading-tight tracking-tight ${textSize}`}
            style={{ color: textColor }}
          >
            {line.map((item, index) => {
              if (item.type === "text") {
                return (
                  <span key={index} className="whitespace-nowrap">
                    {item.value}
                  </span>
                );
              }

              const { src, size = 48, x = 0, y = 0, scale = 1 } =
                item.config;

              return (
                <span
                  key={index}
                  className="inline-flex items-center justify-center"
                  style={{
                    width: size,
                    height: size,
                    transform: `translate(${x}px, ${y}px) scale(${scale})`,
                  }}
                >
                  <DotLottieReact src={src} loop autoplay />
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}