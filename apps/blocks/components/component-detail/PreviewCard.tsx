"use client";

import { ComponentItem } from "@/lib/componentData";

interface PreviewCardProps {
  component: ComponentItem;
}

export function PreviewCard({ component }: PreviewCardProps) {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-black/5 dark:border-white/5 bg-white dark:bg-[#141212] p-1.5 shadow-2xl"
    >
      <div className="relative rounded-lg overflow-hidden bg-black/[0.02] dark:bg-[#0e0e0e] w-full group">
        {component.video ? (
          <video
            src={component.video}
            className="w-full h-auto block object-contain"
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
              className="w-full h-auto block object-contain" 
            />
          )
        )}
      </div>
    </div>
  );
}
