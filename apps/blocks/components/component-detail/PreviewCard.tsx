"use client";

import { useRef, useEffect, useState } from "react";
import { ComponentItem } from "@/lib/componentData";

interface PreviewCardProps {
  component: ComponentItem;
}

export function PreviewCard({ component }: PreviewCardProps) {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-border bg-card p-1.5"
    >
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted/10 dark:bg-[#0e0e0e]">
        {component.video ? (
          <video
            src={component.video}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
          />
        ) : (
          component.image && (
            <img 
              src={component.image} 
              alt={component.name} 
              className="w-full h-full object-cover" 
            />
          )
        )}
      </div>
    </div>
  );
}
