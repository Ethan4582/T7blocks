"use client";

import { useMemo, useState } from "react";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  bgColor?: string;
  hoverBgColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  arrowColor?: string;
  arrowSize?: number;
  animationDuration?: number;
  width?: number | string;
  height?: number | string;
  roundness?: number | string;
  className?: string;
}

function toCssSize(value: number | string | undefined, fallback: string) {
  if (value === undefined || value === null) return fallback;
  return typeof value === "number" ? `${value}px` : value;
}

export function WaveButton({
  label = "Get Started",
  onClick,
  bgColor = "#ffffff",
  hoverBgColor = "#f30c0cff",
  textColor = "#000000",
  hoverTextColor = "#ffffff",
  arrowColor,
  arrowSize = 20,
  animationDuration = 500,
  width = "168px",
  height = 52,
  roundness = "26px",
  className = "",
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);

  const resolvedArrowColor = arrowColor ?? "#ffffff";

  const ease = "cubic-bezier(0.4,0,0.2,1)";
  const dur = `${animationDuration}ms`;

  const buttonWidth = useMemo(() => toCssSize(width, "auto"), [width]);
  const buttonHeight = useMemo(() => toCssSize(height, "52px"), [height]);
  const buttonRoundness = useMemo(
    () => toCssSize(roundness, "999px"),
    [roundness],
  );

  const verticalPadding = "0"; 
  const horizontalPaddingLeft = "1.75rem";
  const horizontalPaddingRight = hovered
    ? `${arrowSize + 24}px`
    : "1.75rem";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex items-center justify-center overflow-hidden border border-black/20 font-medium tracking-wide ${className}`}
      style={{
        width: buttonWidth,
        height: buttonHeight,
        borderRadius: buttonRoundness,
        color: hovered ? hoverTextColor : textColor,
        background: "transparent",
        paddingTop: verticalPadding,
        paddingBottom: verticalPadding,
        paddingLeft: horizontalPaddingLeft,
        paddingRight: horizontalPaddingRight,
        transition: `padding-right ${dur} ${ease}, color ${dur} ${ease}`,
      }}
    >
   
      <span
        className="absolute inset-0 -z-10"
        style={{
          background: bgColor,
          borderRadius: buttonRoundness,
        }}
      />

    
      <span
        className="absolute bottom-0 left-1/2 rounded-full"
        style={{
          backgroundColor: hoverBgColor,
          width: 4,
          height: 4,
          transform: `translate(-50%, 50%) scale(${hovered ? 80 : 0})`,
          transition: `transform ${animationDuration}ms cubic-bezier(0.2,0,0.2,1)`,
        }}
      />

  
      <span className="relative z-10 whitespace-nowrap">{label}</span>

      <span
        className="absolute z-10 flex items-center"
        style={{
          right: "0.75rem",
          transform: hovered
            ? "translateX(0)"
            : `translateX(${arrowSize + 24}px)`,
          transition: `transform ${dur} ${ease}`,
        }}
      >
        <svg
          width={arrowSize}
          height={arrowSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke={resolvedArrowColor}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="13 6 19 12 13 18" />
        </svg>
      </span>
    </button>
  );
}