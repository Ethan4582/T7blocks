"use client";

import { useState } from "react";
import { Eye, Bookmark } from "lucide-react";

interface SidebarActionsProps {
  demoUrl?: string;
}

export function SidebarActions({ demoUrl }: SidebarActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="flex items-center gap-2 mb-6">
      <a
        href={demoUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 hover:bg-black/[0.08] dark:hover:bg-white/10 transition-all group no-underline"
      >
        <Eye className="w-3.5 h-3.5 text-[#f84131]" />
        <span className="text-[#f84131] text-[12px] font-bold tracking-tight">Preview</span>
      </a>

      <a
        href="/waitlist"
        target="_blank"
        className="flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 hover:bg-black/[0.08] dark:hover:bg-white/10 transition-all group"
        title="Blog"
      >
        <img src="/SVG/introduction.svg" className="w-4 h-4" alt="Blog" />
      </a>

      <button
        onClick={() => setIsBookmarked(!isBookmarked)}
        className="flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 hover:bg-black/[0.08] dark:hover:bg-white/10 transition-all group"
      >
        <Bookmark 
          className={`w-3.5 h-3.5 transition-all ${
            isBookmarked 
              ? "text-[#A1FF62] fill-[#A1FF62]" 
              : "text-muted-foreground dark:text-white/60 group-hover:text-foreground dark:group-hover:text-white transition-colors"
          }`} 
        />
      </button>
    </div>
  );
}
