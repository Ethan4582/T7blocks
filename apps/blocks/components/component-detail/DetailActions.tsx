"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Eye, Bookmark } from "lucide-react";
import { useToast } from "@/components/common/toast-provider";

interface CopyPromptDropdownProps {
  componentName: string;
}

export function CopyPromptDropdown({ componentName }: CopyPromptDropdownProps) {
  const { showToast } = useToast();
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const prompts = {
    v0: `I want to implement a ${componentName} component in my Next.js project. Can you help me build a high-performance version similar to the one at T7blocks?`,
    lovable: `Create a premium ${componentName} component for my React application. Focus on smooth animations and minimalist design aesthetics inspired by T7blocks.`,
    bolt: `Generate a robust ${componentName} component using Tailwind CSS and Framer Motion. Ensure it follows the clean, professional style seen on T7blocks.`
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleCopyPrompt = (type: keyof typeof prompts) => {
    navigator.clipboard.writeText(prompts[type]);
    showToast(`Prompt copied for ${type === 'v0' ? 'V0' : type.charAt(0).toUpperCase() + type.slice(1)}`);
    setShowDropdown(false);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div 
      className="relative z-[150]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1.5 group cursor-pointer border-none bg-transparent p-0 outline-none">
        <Copy className="w-3.5 h-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
        <span className="text-muted-foreground group-hover:text-foreground text-[14px] font-medium tracking-tight transition-colors">
          Copy Prompt
        </span>
      </button>

      {showDropdown && (
        <>
          {/* Transparent bridge to expand hover area */}
          <div className="absolute bottom-full right-0 w-full h-8 bg-transparent" />
          
          <div className="absolute bottom-full right-0 mb-3 w-[120px] bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 rounded-xl z-[150] p-1 animate-in fade-in slide-in-from-bottom-1 pointer-events-auto shadow-none shadow-transparent ring-0">
            <div className="space-y-0.5">
              <button
                onClick={() => handleCopyPrompt("v0")}
                className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-[11px] text-foreground/80 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/5 transition-all text-left pointer-events-auto"
              >
                <img src="/SVG/v0.png" className="w-[12px] h-[12px] rounded-sm dark:brightness-100 brightness-[0.2]" alt="" />
                <span>V0</span>
              </button>
              <button
                onClick={() => handleCopyPrompt("lovable")}
                className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-[11px] text-foreground/80 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/5 transition-all text-left pointer-events-auto"
              >
                <img src="/SVG/lovable.png" className="w-[12px] h-[12px] rounded-sm" alt="" />
                <span>Lovable</span>
              </button>
              <button
                onClick={() => handleCopyPrompt("bolt")}
                className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-[11px] text-foreground/80 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/5 transition-all text-left pointer-events-auto"
              >
                <img src="/SVG/bolt.jpg" className="w-[12px] h-[12px] rounded-sm dark:brightness-100 brightness-[0.2]" alt="" />
                <span>Bolt</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface SidebarActionsProps {
  demoUrl?: string;
}

export function SidebarActions({ demoUrl }: SidebarActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="flex items-center gap-2 mb-6">
      {/* Preview Button */}
      <a
        href={demoUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 hover:bg-black/[0.08] dark:hover:bg-white/10 transition-all group no-underline"
      >
        <Eye className="w-3.5 h-3.5 text-[#f84131]" />
        <span className="text-[#f84131] text-[12px] font-bold tracking-tight">Preview</span>
      </a>

      {/* Blog */}
      <a
        href="/waitlist"
        target="_blank"
        className="flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 hover:bg-black/[0.08] dark:hover:bg-white/10 transition-all group"
        title="Blog"
      >
        <img src="/SVG/blog.svg" className="w-4 h-4" alt="Blog" />
      </a>

      {/* Bookmark */}
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
