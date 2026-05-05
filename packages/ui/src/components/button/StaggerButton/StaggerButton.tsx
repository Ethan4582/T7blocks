"use client";

import { CSSProperties } from "react";

interface StaggerButtonProps {
  text: string;
  href?: string;
  color?: string;
  backgroundColor?: string;
  hoverBackgroundInset?: string;
  fontSize?: string;
  borderRadius?: string;
  offsetIncrement?: number;
  transitionDuration?: string;
  transitionEasing?: string;
  onClick?: () => void;
  className?: string;
}

export function StaggerButton({
  text = "Staggering Button",
  href = "#",
  color = "#fafafa",
  backgroundColor = "#303030",
  hoverBackgroundInset = "0.125em",
  fontSize = "2em",
  borderRadius = "0.4em",
  offsetIncrement = 0.01,
  transitionDuration = "0.6s",
  transitionEasing = "cubic-bezier(0.625, 0.05, 0, 1)",
  onClick,
  className =  "font-[instrument-serif]",
}: StaggerButtonProps) {
  const transition = `${transitionDuration} ${transitionEasing}`;

  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={text}
      className={className}
      style={{
        color,
        fontSize,
        cursor: "pointer",
        borderRadius,
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "12em",
        padding: "1em",
        lineHeight: 1,
        textDecoration: "none",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        const bg = e.currentTarget.querySelector<HTMLElement>(".stagger-btn-bg");
        const spans = e.currentTarget.querySelectorAll<HTMLElement>(".stagger-btn-char");
        if (bg) bg.style.inset = hoverBackgroundInset;
        spans.forEach((s) => (s.style.transform = "translateY(-1.3em) rotate(0.001deg)"));
      }}
      onMouseLeave={(e) => {
        const bg = e.currentTarget.querySelector<HTMLElement>(".stagger-btn-bg");
        const spans = e.currentTarget.querySelectorAll<HTMLElement>(".stagger-btn-char");
        if (bg) bg.style.inset = "0";
        spans.forEach((s) => (s.style.transform = "translateY(0em) rotate(0.001deg)"));
      }}
    >
      {/* Background */}
      <div
        className="stagger-btn-bg"
        style={{
          backgroundColor,
          borderRadius,
          position: "absolute",
          inset: 0,
          transition: `inset ${transition}`,
        }}
      />

      {/* Text */}
      <span style={{ whiteSpace: "nowrap", lineHeight: 1.3, overflow: "hidden", position: "relative", display: "inline-block" }}>
        {[...text].map((char, i) => (
          <span
            key={i}
            className="stagger-btn-char"
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
      </span>
    </a>
  );
}