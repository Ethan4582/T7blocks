
    export const T7blocksCliCommand = {
   pnpmCommand: `pnpm dlx @t7blocks/cli add dot-launch`,
    npmCommand: `npx @t7blocks/cli add dot-launch`,
    yarnCommand: `yarn dlx @t7blocks/cli add dot-launch`,
    bunCommand: `bunx @t7blocks/cli add dot-launch`
};

export const Code1FileName="Dotlaunchbutton.tsx";
export const Code1 = `"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Helper functions for the animation
function arrowAt(tipCol: number): Set<number> {
  const cells = new Set<number>();
  if (tipCol >= 0 && tipCol <= 4) cells.add(2 * 5 + tipCol);
  if (tipCol - 1 >= 0 && tipCol - 1 <= 4) cells.add(1 * 5 + (tipCol - 1));
  if (tipCol - 2 >= 0 && tipCol - 2 <= 4) cells.add(0 * 5 + (tipCol - 2));
  if (tipCol - 1 >= 0 && tipCol - 1 <= 4) cells.add(3 * 5 + (tipCol - 1));
  if (tipCol - 2 >= 0 && tipCol - 2 <= 4) cells.add(4 * 5 + (tipCol - 2));
  for (let c = Math.max(0, tipCol - 4); c < tipCol && c <= 4; c++) cells.add(2 * 5 + c);
  return cells;
}

function lightTint(hex: string, amount: number): string {
  if (!hex.startsWith("#")) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const tr = Math.round(r + (255 - r) * (1 - amount));
  const tg = Math.round(g + (255 - g) * (1 - amount));
  const tb = Math.round(b + (255 - b) * (1 - amount));
  return \`rgb(\${tr},\${tg},\${tb})\`;
}

const TIP_SEQUENCE = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7];
const DOT_COUNT = 25;
const GRID_SIZE = 41;
const GAP = 3;
const DOT_SIZE = (GRID_SIZE - GAP * 4) / 5;

interface DotlaunchbuttonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  accentColor?: string;
  btnColor?: string;
  animationSpeed?: number;
}

export function Dotlaunchbutton({
  label = "Get started",
  onClick,
  className = "",
  accentColor = "#18db38",
  btnColor = "#111111",
  animationSpeed = 155,
}: DotlaunchbuttonProps) {
  const [seqIndex, setSeqIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeqIndex((prev) => (prev + 1) % TIP_SEQUENCE.length);
    }, animationSpeed);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [animationSpeed]);

  const activeSet = arrowAt(TIP_SEQUENCE[seqIndex]);
  const inactiveDotColor = lightTint(accentColor, 0.65);

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className=\`group relative inline-flex items-center rounded-[14px] border border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.65)] cursor-pointer select-none \${className}\`
      style={{
        padding: "8px 28px 8px 8px",
        backgroundColor: btnColor
      }}
    >
      {/* Accent icon box */}
      <div
        className="relative flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{
          width: 58,
          height: 58,
          borderRadius: 10,
          backgroundColor: accentColor,
          marginRight: 18,
          boxShadow: "inset 0 -2px 5px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ position: "relative", width: GRID_SIZE, height: GRID_SIZE }}>
          {Array.from({ length: DOT_COUNT }).map((_, i) => {
            const row = Math.floor(i / 5);
            const col = i % 5;
            const isActive = activeSet.has(i);
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  backgroundColor: isActive ? "#ffffff" : inactiveDotColor,
                  opacity: isActive ? 1 : 0.72,
                }}
                transition={{ duration: 0.08 }}
                style={{
                  position: "absolute",
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  left: col * (DOT_SIZE + GAP),
                  top: row * (DOT_SIZE + GAP),
                  borderRadius: 0,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Button Text */}
      <span
        className="text-white whitespace-nowrap"
        style={{ fontSize: 17, fontWeight: 400, letterSpacing: "-0.2px" }}
      >
        {label}
      </span>

      {/* Surface overlays */}
      <div className="pointer-events-none absolute inset-0 rounded-[14px] bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-[0.5px] rounded-[14px] border-t border-white/5 pointer-events-none" />
    </motion.button>
  );
}
`;

export const installCommand = `pnpm add framer-motion`;

export const setupCode1FileName="page.tsx";
export const setupCode1=`import { Dotlaunchbutton } from '@t7blocks/ui';

export default function Home() {
  return (
    <Dotlaunchbutton
      label="Get started"
      accentColor="#18db38"
      btnColor="#111111"
      animationSpeed={155}
    />
  );
}`

export const propsTable= `
| Property       | Type    | Default          | Description                                                           |
|----------------|---------|------------------|-----------------------------------------------------------------------|
| className      | string  | ""               | Additional CSS classes for the button                                 |
| label          | string  | "Get started"    | The text label to display on the button                                |
| accentColor    | string  | "#18db38"      | The primary color of the grid and arrow animation                      |
| btnColor       | string  | "#111111"      | The background color of the button                                     |
| animationSpeed | number  | 155              | The interval in milliseconds between animation steps                  |
  
`