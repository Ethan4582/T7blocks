"use client";

import { useState, useRef, useEffect } from "react";
import { Copy } from "lucide-react";
import { useToast } from "@/components/common/toast-provider";

interface CopyPromptDropdownProps {
  componentName: string;
  files: Array<{ label: string; code: string }>;
}

export function CopyPromptDropdown({ componentName, files }: CopyPromptDropdownProps) {
  const { showToast } = useToast();
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generatePrompt = () => {
    let basePrompt = `You are given a task to integrate a React component into your codebase. 
Please verify your project has the following setup:
- shadcn/ui project structure
- Tailwind CSS v4.0
- TypeScript

If any of these are missing, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder.

Copy-paste this component to your project:

`;

    files.forEach((file) => {
      basePrompt += `File location: components/ui/${file.label.toLowerCase()}\n\nFile content:\n${file.code}\n\n`;
    });

    return basePrompt;
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

  const handleCopyPrompt = (type: string) => {
    const fullPrompt = generatePrompt();
    navigator.clipboard.writeText(fullPrompt);
    showToast(`Prompt copied for ${type}`);
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
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all group cursor-pointer border border-transparent hover:bg-black/[0.04] dark:hover:bg-[#171515] hover:border-black/5 dark:hover:border-white/5 outline-none">
        <Copy className="w-3.5 h-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
        <span className="text-muted-foreground group-hover:text-foreground text-[14px] font-bold tracking-tight transition-colors">
          Copy Prompt
        </span>
      </button>

      {showDropdown && (
        <>
          <div className="absolute top-full right-0 w-full h-4 bg-transparent" />
          <div className="absolute top-full right-0 mt-2 w-[125px] bg-white dark:bg-[#171515] border border-black/10 dark:border-white/10 rounded-lg z-[150] p-1 animate-in fade-in slide-in-from-top-1 pointer-events-auto shadow-xl ring-0">
            <div className="space-y-0">
              {[
                { id: "v0", label: "V0", icon: "/SVG/v0.png", bright: true },
                { id: "lovable", label: "Lovable", icon: "/SVG/lovable.png" },
                { id: "bolt", label: "Bolt", icon: "/SVG/bolt.jpg", bright: true }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCopyPrompt(item.label)}
                  className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded-md text-[12px] font-bold text-foreground/80 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/5 transition-all text-left pointer-events-auto"
                >
                  <img 
                    src={item.icon} 
                    className={`w-4 h-4 rounded-sm ${item.bright ? 'dark:brightness-100 brightness-[0.2]' : ''}`} 
                    alt="" 
                  />
                  <span className="font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
