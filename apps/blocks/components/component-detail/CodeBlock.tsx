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
    
    let toastLabel = activeFile.label.toLowerCase();
    if (toastLabel.includes('command')) {
       showToast("Install command copied");
    } else {
       showToast("Command copied");
    }

    setTimeout(() => setCopied(false), 2000);

    const isBash = activeFile.language === 'bash' || activeFile.label.toLowerCase().includes('pnpm') || activeFile.label.toLowerCase().includes('npm');
    trackCopy(isBash ? "cli" : "manual", componentId);
  };

  const isCLI = ['bash', 'sh', 'terminal'].includes(activeFile.language || language) || activeFile.label.toLowerCase().includes('npm') || activeFile.label.toLowerCase().includes('pnpm');
  const lineCount = activeFile.code.split('\n').length;
  const isLarge = lineCount > 10 || activeFile.code.length > 500;
  const showScrollbars = isLarge && !isCLI;

  return (
    <div className="rounded-xl overflow-hidden shadow-sm transition-all bg-[var(--code-header)] border border-[var(--code-border)]">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--code-header)] border-b border-[var(--code-border)]">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pr-4">
          {currentFiles.map((file, idx) => (
            <button
               key={idx}
               onClick={() => setActiveFileIndex(idx)}
               className={`flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold rounded-md transition-all whitespace-nowrap ${
                 activeFileIndex === idx 
                   ? "bg-[var(--code-bg)] text-foreground border border-[var(--code-border)] shadow-sm" 
                   : "text-muted-foreground/50 hover:text-foreground/70"
               }`}
            >
              {file.icon && <img src={file.icon} alt="" className="w-3.5 h-3.5 opacity-80" />}
              <span>{file.label.split(' ')[0].toLowerCase()}</span>
            </button>
          ))}
        </div>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-[11px] transition-all hover:opacity-100 opacity-60 group shrink-0 px-2.5 py-1.5 hover:bg-black/[0.04] dark:hover:bg-white/5 rounded-md"
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

      <div className="p-1.5 bg-[var(--code-header)]">
        <div className={`relative p-6 overflow-auto max-h-[500px] overscroll-y-auto rounded-lg border border-[var(--code-border)] bg-[var(--code-bg)] ${showScrollbars ? 'scrollbar-minimal' : 'no-scrollbar'}`}>
          <pre className="text-[13.5px] leading-[1.8] font-mono whitespace-pre select-text text-[var(--code-text)]">
            <code
              dangerouslySetInnerHTML={{ __html: highlightCode(activeFile.code, activeFile.language || (activeFile.label.endsWith('.css') ? 'css' : language)) }}
              className="block whitespace-pre"
            />
          </pre>
        </div>
      </div>
    </div>
  );
}
