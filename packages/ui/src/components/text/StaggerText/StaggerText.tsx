"use client";

import { CSSProperties, ElementType } from "react";

interface StaggerTextProps {
  text: string;
  tag?: ElementType;
  color?: string;
  fontSize?: string;
  fontWeight?: string | number;
  offsetIncrement?: number;
  transitionDuration?: string;
  transitionEasing?: string;
  className?: string;
}

export  function StaggerText({
  text = "Hover me",
  tag: Tag = "span",
  color = "#131313",
  fontSize = "1em",
  fontWeight = 400,
  offsetIncrement = 0.01,
  transitionDuration = "0.6s",
  transitionEasing = "cubic-bezier(0.625, 0.05, 0, 1)",
   className="font-[Instrument_Serif_Regular]"
}: StaggerTextProps) {
  const transition = `${transitionDuration} ${transitionEasing}`;

  return (
    <Tag
      className={className}
      style={{
        color,
        fontSize,
        fontWeight,
        display: "inline-block",
        overflow: "hidden",
        cursor: "default",
        lineHeight: 1.3,
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget
          .querySelectorAll<HTMLElement>(".stagger-text-char")
          .forEach((s) => (s.style.transform = "translateY(-1.3em) rotate(0.001deg)"));
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget
          .querySelectorAll<HTMLElement>(".stagger-text-char")
          .forEach((s) => (s.style.transform = "translateY(0em) rotate(0.001deg)"));
      }}
    >
      {[...text].map((char, i) => (
        <span
          key={i}
          className="stagger-text-char"
          style={{
            display: "inline-block",
            position: "relative",
            textShadow: "0px 1.3em currentColor",
            transform: "translateY(0em) rotate(0.001deg)",
            transition: `transform ${transition}`,
            transitionDelay: `${i * offsetIncrement}s`,
            whiteSpace: char === " " ? "pre" : undefined,
          } as CSSProperties}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
}