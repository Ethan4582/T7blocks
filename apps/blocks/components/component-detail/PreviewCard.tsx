"use client";

import { useRef, useEffect, useState } from "react";
import { ComponentItem } from "@/lib/componentData";

interface PreviewCardProps {
  component: ComponentItem;
}

export function PreviewCard({ component }: PreviewCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-border bg-card p-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted/10 dark:bg-[#0e0e0e]">
        {component.video ? (
          <>
            <img
              src={component.image}
              alt={component.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}
            />
            <video
              ref={videoRef}
              src={component.video}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
              muted playsInline loop
            />
          </>
        ) : (
          <img src={component.image} alt={component.name} className="w-full h-full object-cover" />
        )}
      </div>
    </div>
  );
}
