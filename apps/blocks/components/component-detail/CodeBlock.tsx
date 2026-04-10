"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { highlightCode } from "@/lib/syntax-highlighter";

interface CodeBlockProps {
  code: string;
  label: string;
  language?: string;
}

export function CodeBlock({ code, label, language = "html" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-xl overflow-hidden shadow-sm transition-all"
      style={{
        background: "var(--code-bg)",
        border: "1px solid var(--code-border)",
      }}
    >
      {/* Code Header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          background: "var(--code-header)",
          borderBottom: "1px solid var(--code-border)",
        }}
      >
        <span
          className="text-[11px] font-medium font-mono uppercase tracking-wider"
          style={{ color: "var(--code-label)" }}
        >
          {label}
        </span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-[11px] transition-all hover:opacity-100 opacity-70 group"
          style={{ color: "var(--code-copy)" }}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-accent" />
          ) : (
            <Copy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          )}
          <span className="font-medium">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Code Content */}
      <div className="relative p-5 overflow-x-auto">
        <pre
          className="text-[13.5px] leading-[1.8] font-mono whitespace-pre select-all"
          style={{ color: "var(--code-text)" }}
        >
          <code
            dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
            className="block whitespace-pre"
          />
        </pre>
      </div>
    </div>
  );
}
