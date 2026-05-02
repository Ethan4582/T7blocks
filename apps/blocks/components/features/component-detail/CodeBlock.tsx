"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { highlightCode } from "@/lib/utils/syntax-highlighter";
import { useToast } from "@/components/providers/toast-provider";
import { useCodePreference } from "@/components/providers/code-preference-provider";
import { trackCopy } from "@/lib/analytics/analytics";

interface CodeBlockProps {
  files?: Array<{ 
    label: string; 
    code: string; 
    jsxCode?: string;
    language?: string; 
    icon?: string 
  }>;
  code?: string;
  jsxCode?: string;
  label?: string;
  language?: string;
  componentId?: string;
}

export function CodeBlock({ files, code, jsxCode, label, language = "html", componentId = "unknown" }: CodeBlockProps) {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { preference } = useCodePreference();
  const [showTsx, setShowTsx] = useState(preference === "tsx");
  const { showToast } = useToast();

  useEffect(() => {
    setShowTsx(preference === "tsx");
  }, [preference]);

  const currentFiles = files || [{ label: label || "code", code: code || "", jsxCode: jsxCode, language }];
  const activeFile = currentFiles[activeFileIndex];

  // Determine if we should show the TSX/JSX toggle for the current file
  const isTypeScript = activeFile.jsxCode && (
    activeFile.jsxCode !== activeFile.code || 
    activeFile.label.toLowerCase().endsWith('.tsx') || 
    activeFile.label.toLowerCase().endsWith('.ts')
  );
  
  const displayCode = (showTsx || !isTypeScript) ? activeFile.code : (activeFile.jsxCode || activeFile.code);

  const copyToClipboard = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(displayCode);
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
  const lineCount = displayCode.split('\n').length;
  const isLarge = lineCount > 10 || displayCode.length > 500;
  const showScrollbars = isLarge && !isCLI;

  return (
    <div className="rounded-xl overflow-hidden bg-[#fafafa] dark:bg-[#171515] border border-black/[0.05] dark:border-white/[0.05]">
      <div className="flex items-center justify-between px-3 py-2 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/[0.05] dark:border-white/[0.05]">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center p-1 bg-black/[0.03] dark:bg-white/[0.03] rounded-lg gap-0.5">
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

      <div className="p-1 relative">
        {isTypeScript && (
          <div className="absolute top-4 right-6 flex items-center p-1 bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-lg gap-0.5 z-[60] shadow-xl border border-black/10 dark:border-white/10">
            <button
              onClick={() => setShowTsx(false)}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${!showTsx
                ? "bg-white dark:bg-[#171515] text-[#262626] dark:text-white shadow-sm border border-black/[0.05] dark:border-white/[0.05]"
                : "text-[#737373] dark:text-muted-foreground/40 hover:text-[#262626] dark:hover:text-foreground/80"
                }`}
            >
              JSX
            </button>
            <button
              onClick={() => setShowTsx(true)}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${showTsx
                ? "bg-white dark:bg-[#171515] text-[#262626] dark:text-white shadow-sm border border-black/[0.05] dark:border-white/[0.05]"
                : "text-[#737373] dark:text-muted-foreground/40 hover:text-[#262626] dark:hover:text-foreground/80"
                }`}
            >
              TSX
            </button>
          </div>
        )}
        <div className={`relative group/code p-3.5 overflow-auto max-h-[500px] overscroll-y-auto rounded-lg border border-black/[0.05] dark:border-white/[0.05] bg-white dark:bg-[#171515] ${showScrollbars ? 'scrollbar-minimal' : 'no-scrollbar'}`}>
          <pre className="text-[13.5px] leading-[1.8] font-mono whitespace-pre select-text no-underline decoration-none">
            <code
              dangerouslySetInnerHTML={{
                __html: highlightCode(
                  displayCode,
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
