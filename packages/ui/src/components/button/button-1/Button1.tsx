"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface Button1Props {
  label?: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function Button1({
  label = "Click me",
  variant = "primary",
  size = "md",
  onClick,
}: Button1Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const sizeMap = {
    sm: { padding: "8px 20px", fontSize: "13px" },
    md: { padding: "12px 28px", fontSize: "15px" },
    lg: { padding: "16px 36px", fontSize: "17px" },
  };

  const isPrimary = variant === "primary";

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{
        ...sizeMap[size],
        background: isPrimary ? "#000" : "transparent",
        color: isPrimary ? "#fff" : "#000",
        border: "1.5px solid #000",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 500,
        letterSpacing: "-0.01em",
      }}
    >
      {label}
    </motion.button>
  );
}