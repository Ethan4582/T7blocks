"use client";

import { useState } from "react";
import { SquareTerminal, Code2 } from "lucide-react";
import { ComponentDetailData, ComponentItem } from "@/lib/componentData";
import { CodeBlock } from "./CodeBlock";

interface DocumentationSectionProps {
  detail: ComponentDetailData;
  component: ComponentItem;
}

export function DocumentationSection({ detail, component }: DocumentationSectionProps) {
  const [activeTab, setActiveTab] = useState("Code");

  const tabs = ["CLI", "Code"];

  return (
    <div className="space-y-8 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/5 pb-6">
        <h2
          className="text-2xl md:text-3xl font-medium text-foreground tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Documentation
        </h2>

        <div className="flex items-center gap-1 p-1 border border-white/5 rounded-xl bg-[#0A0A0A] w-fit shadow-2xl">
          {tabs.map((tab) => {
            const isCLI = tab === "CLI";
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2 text-[13px] font-bold transition-all duration-300 rounded-lg flex items-center gap-2 ${
                  isActive
                    ? "bg-[#1A1A1A] text-foreground shadow-[0_0_20px_rgba(0,0,0,0.4)] border border-white/5"
                    : "text-muted-foreground hover:text-foreground/80 hover:bg-white/[0.02]"
                }`}
              >
                {isCLI ? <SquareTerminal className="w-4 h-4 opacity-70" /> : <Code2 className="w-4 h-4 opacity-70" />}
                {tab}
                {isCLI && (
                  <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-[#A1FF62] px-1.5 py-0.5 rounded-full border border-[#0A0A0A] shadow-[0_2px_10px_rgba(161,255,98,0.3)] scale-[0.75] z-10">
                    <div className="w-1 h-1 rounded-full bg-[#0A0A0A] animate-pulse" />
                    <span className="text-[10px] font-black text-[#0A0A0A] leading-none tracking-tighter">SOON</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-10">
        {activeTab === "CLI" && (
          <div className="relative rounded-3xl border border-white/5 overflow-hidden bg-[#0A0A0A]/40 opacity-50 select-none grayscale pointer-events-none transition-all duration-500">
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 p-8 backdrop-blur-[2px]">
              <div className="text-center space-y-2">
                <p className="text-[16px] font-bold text-foreground/80 tracking-tight">Coming Soon</p>
                <p className="text-[13px] text-muted-foreground/50 max-w-[240px] mx-auto leading-relaxed">
                  The T7Blocks CLI is currently in active development to help you ship faster.
                </p>
              </div>
            </div>
            
            <CodeBlock 
              label="Terminal" 
              code={`npx t7blocks add ${detail.slug}\n# Initializing development environment...\n# Fetching component assets...`} 
            />
          </div>
        )}

        {activeTab === "Code" && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {detail.setupInstructions && (
              <div className="space-y-5">
                <h3 className="text-[13px] font-bold text-foreground/40 tracking-[0.15em] uppercase">
                  Step 1: Environment Setup
                </h3>
                {detail.dependencies && detail.dependencies.length > 0 && (
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest border border-white/5 px-2 py-1 rounded bg-white/[0.02]">Dependencies</span>
                    {detail.dependencies.map((dep) => (
                      <span key={dep} className="text-[11px] px-3 py-1 rounded-full bg-blue-500/5 text-blue-400 font-mono border border-blue-500/10 shadow-sm">{dep}</span>
                    ))}
                  </div>
                )}
                
                {detail.codeBlocks.filter(b => b.label.toLowerCase().includes("script") || b.label === "HTML").slice(0, 1).map((block, idx) => (
                   <div key={`setup-container-${idx}`} className="space-y-4">
                     <CodeBlock key={`setup-${idx}`} label={block.label} code={block.code} language="html" />
                     <p className="text-[14px] text-muted-foreground/70 leading-relaxed font-medium">
                       Ensure the required scripts are properly integrated into your project structure before proceeding with the main implementation.
                     </p>
                   </div>
                ))}
              </div>
            )}

            <div className="space-y-12">
              {detail.codeBlocks.filter(b => !b.label.toLowerCase().includes("script") && b.label !== "HTML").map((block, idx) => (
                <div key={idx} className="space-y-5">
                  {(detail.setupInstructions || idx > 0) && (
                    <h3 className="text-[13px] font-bold text-foreground/40 tracking-[0.15em] uppercase">
                      {`Step ${idx + (detail.setupInstructions ? 2 : 1)}: ${block.label || "Implementation"}`}
                    </h3>
                  )}
                  <CodeBlock 
                    label={block.label || "Component"} 
                    code={block.code} 
                    language={block.label.toLowerCase().includes("js") || block.label.toLowerCase().includes("react") ? "typescript" : "html"} 
                  />
                  <div className="pt-2">
                    <p className="text-[14px] text-muted-foreground/60 leading-relaxed font-medium max-w-3xl">
                      This {block.label ? block.label.toLowerCase() : "component"} structure provides a high-performance foundation tailored for seamless integration into modern web architectures.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

