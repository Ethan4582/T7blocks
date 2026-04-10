import React from "react";
import { Info, Check, Copy } from "lucide-react";

export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pl-9 space-y-14 before:absolute before:left-[13px] before:top-3 before:bottom-3 before:w-[2px] before:bg-border/40 ml-1 [counter-reset:step]">
      {children}
    </div>
  );
}

export function Step({ children, title }: { children: React.ReactNode, title?: string }) {
  return (
    <div className="relative [counter-increment:step]">
      {/* Circle with number */}
      <div className="absolute -left-[45px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#141212] bg-[#211e1e] text-[12px] font-bold text-foreground/90 shadow-sm z-10 before:content-[counter(step)] ring-1 ring-border/50">
      </div>
      
      {title && (
        <h3 className="text-xl font-bold mb-5 tracking-tight text-foreground/90 flex items-center gap-3">
          {title}
        </h3>
      )}
      
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
}

export function Callout({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative p-5 py-4 rounded-xl border border-blue-500/20 bg-blue-500/5 my-8 text-[14.5px] leading-relaxed text-foreground/80 flex gap-3.5 items-start ${className}`}>
      <div className="flex-shrink-0 mt-0.5">
        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
          <Info className="w-3 h-3 text-white fill-white/10" strokeWidth={3} />
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
