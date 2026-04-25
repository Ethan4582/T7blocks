"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { highlightCode } from "@/lib/utils/syntax-highlighter";
import { useToast } from "@/components/providers/toast-provider";
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
      showToast("Code copied to clipboard");
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
    <div className="rounded-xl overflow-hidden bg-[#fafafa] dark:bg-[#171515] border border-black/[0.05] dark:border-white/[0.05]">
      <div className="flex items-center justify-between px-3 py-2 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/[0.05] dark:border-white/[0.05]">
        <div className="flex items-center p-1 bg-black/[0.03] dark:bg-white/[0.03] rounded-lg gap-0.5 overflow-x-auto no-scrollbar">
          {currentFiles.map((file, idx) => {
            const fileName = file.label.split(' ')[0].toLowerCase();
            return (
              <button
                key={idx}
                onClick={() => setActiveFileIndex(idx)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-medium rounded-md transition-all whitespace-nowrap ${activeFileIndex === idx
                  ? "bg-white dark:bg-[#222222] text-[#262626] dark:text-white shadow-sm border border-black/[0.05] dark:border-white/[0.05]"
                  : "text-[#737373] dark:text-muted-foreground/40 hover:text-[#262626] dark:hover:text-foreground/80"
                  }`}
              >
                {file.icon && <img src={file.icon} alt="" className="w-3.5 h-3.5 opacity-80" />}
                <span>
                  {fileName}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 text-[11px] font-medium transition-all rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/5 group active:scale-95"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-[#A1FF62]" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-[#737373] dark:text-muted-foreground/40 group-hover:text-foreground transition-colors" />
          )}
          <span className={`uppercase tracking-widest text-[10px] ${copied ? 'text-[#A1FF62]' : 'text-[#737373] dark:text-muted-foreground/40 group-hover:text-foreground'}`}>
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </div>

      <div className="p-1">
        <div className={`relative p-3.5 overflow-auto max-h-[500px] overscroll-y-auto rounded-lg border border-black/[0.05] dark:border-white/[0.05] bg-white dark:bg-[#171515] ${showScrollbars ? 'scrollbar-minimal' : 'no-scrollbar'}`}>
          <pre className="text-[13.5px] leading-[1.8] font-mono whitespace-pre select-text no-underline decoration-none">
            <code
              dangerouslySetInnerHTML={{
                __html: highlightCode(
                  activeFile.code,
                  activeFile.language ||
                  (activeFile.label.toLowerCase().endsWith('.css') ? 'css' :
                    activeFile.label.toLowerCase().endsWith('.tsx') ||
                      activeFile.label.toLowerCase().endsWith('.ts') ||
                      activeFile.label.toLowerCase().endsWith('.js') ||
                      activeFile.label.toLowerCase().endsWith('.jsx') ? 'typescript' :
                      language)
                )
              }}
              className="block whitespace-pre no-underline decoration-none"
            />
          </pre>
        </div>
      </div>
    </div>
  );
}
