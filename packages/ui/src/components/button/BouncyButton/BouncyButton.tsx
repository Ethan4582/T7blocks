"use client";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type BouncyButtonProps = {
  text?: string;
  primaryColor?: string;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  width?: number | string;
  height?: number;
  roundness?: number | string;
};

export function BouncyButton({
  text = "Join Discord",
  primaryColor = "#4c2c99ff",
  className = "",
  icon,
  onClick,
  width,
  height = 64,
  roundness = 999,
}: BouncyButtonProps) {
  const [hovered, setHovered] = useState(false);

  const radius =
    typeof roundness === "number" ? `${roundness}px` : roundness;

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={false}
      animate={{ rotate: hovered ? -4 : 0 }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 18,
      }}
      className={`relative inline-flex items-center outline-none ${className}`}
      style={{
        width,
        height,
        paddingLeft: height,
        paddingRight: height,
      }}
    >
   
      <CircleSlot
        show={!hovered}
        side="left"
        primaryColor={primaryColor}
        icon={icon}
        size={height}
      />

     
      <motion.div
        initial={false}
        animate={{ x: hovered ? -1 : 0 }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 18,
        }}
        className="inline-flex h-full items-center justify-center whitespace-nowrap px-6 font-bold text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
        style={{
          backgroundColor: primaryColor,
          borderRadius: radius,
          width: "100%", 
        }}
      >
        <span className="text-[1.5rem] leading-none">{text}</span>
      </motion.div>
      <CircleSlot
        show={hovered}
        side="right"
        primaryColor={primaryColor}
        icon={icon}
        size={height}
      />
    </motion.button>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M10 7h7v7" />
    </svg>
  );
}

function CircleSlot({
  show,
  side,
  primaryColor,
  icon,
  size,
}: {
  show: boolean;
  side: "left" | "right";
  primaryColor: string;
  icon?: ReactNode;
  size: number;
}) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          key={side}
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            [side]: 0,
            width: size,
            height: size,
          }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 16,
            mass: 1.1,
          }}
        >
          <div
            className="flex h-full w-full items-center justify-center rounded-full text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
            style={{ backgroundColor: primaryColor }}
          >
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 14,
              }}
              className="flex items-center justify-center"
            >
              {icon ?? <ArrowIcon />}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}