"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { highlightCode } from "@/lib/syntax-highlighter";
import { useToast } from "@/components/common/toast-provider";
import { trackCopy } from "@/lib/analytics/analytics";

interface CodeBlockProps {
  files?: Array<{ label: string; code: string; language?: string; icon?: string }>;
  code?: string;
  label?: string;
  language?: string;
  componentId?: string;
}

export function CodeBlock({ files, code, label, language = "html", componentId = "unknown" }: CodeBlockProps) {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const currentFiles = files || [{ label: label || "code", code: code || "", language }];
  const activeFile = currentFiles[activeFileIndex];

  const copyToClipboard = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    
    // Simplified toast messages as requested
    let toastLabel = activeFile.label.toLowerCase();
    if (toastLabel.includes('command')) {
       showToast("Install command copied");
    } else {
       showToast("Command copied");
    }

    setTimeout(() => setCopied(false), 2000);

    // Track event
    const isBash = activeFile.language === 'bash' || activeFile.label.toLowerCase().includes('pnpm') || activeFile.label.toLowerCase().includes('npm');
    trackCopy(isBash ? "cli" : "manual", componentId);
  };

  return (
    <div
      className="rounded-xl overflow-hidden shadow-sm transition-all bg-[#F9F9F9] dark:bg-[#0A0A0A] border border-black/5 dark:border-white/5"
    >
     
      <div
        className="flex items-center justify-between px-3 py-1.5 bg-white dark:bg-[#0D0D0D] border-b border-black/5 dark:border-white/5"
      >
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pr-4">
          {currentFiles.map((file, idx) => (
            <button
               key={idx}
               onClick={() => setActiveFileIndex(idx)}
               className={`flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all whitespace-nowrap ${
                 activeFileIndex === idx 
                   ? "bg-black/[0.04] dark:bg-white/5 text-foreground shadow-sm" 
                   : "text-muted-foreground/40 hover:text-foreground/60 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
               }`}
            >
              {file.icon && <img src={file.icon} alt="" className="w-3.5 h-3.5 opacity-80" />}
              <span>{file.label.split(' ')[0].toLowerCase()}</span>
            </button>
          ))}
        </div>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-[11px] transition-all hover:opacity-100 opacity-60 group shrink-0 px-2 py-1 hover:bg-black/[0.04] dark:hover:bg-white/5 rounded-md"
          style={{ color: "var(--code-copy)" }}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-[#A1FF62]" />
          ) : (
            <Copy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          )}
          <span className="font-bold text-[10px] uppercase tracking-wider">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

     
      <div 
        className="relative p-6 overflow-auto max-h-[450px] overscroll-y-auto scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/20 scrollbar-track-transparent 
                   [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 
                   [&::-webkit-scrollbar-thumb]:bg-black/[0.08] dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full 
                   hover:[&::-webkit-scrollbar-thumb]:bg-black/[0.12] dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/20 
                   [&::-webkit-scrollbar-track]:bg-transparent"
      >
        <pre
          className="text-[13.5px] leading-[1.8] font-mono whitespace-pre select-all text-foreground/90"
        >
          <code
            dangerouslySetInnerHTML={{ __html: highlightCode(activeFile.code, activeFile.language || language) }}
            className="block whitespace-pre"
          />
        </pre>
      </div>
    </div>
  );
}
