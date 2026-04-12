"use client";

import { useState } from "react";
import { SquareTerminal } from "lucide-react";
import { ComponentDetailData, ComponentItem } from "@/lib/componentData";
import { CodeBlock } from "./CodeBlock";

interface DocumentationSectionProps {
  detail: ComponentDetailData;
  component: ComponentItem;
}

export function DocumentationSection({ detail, component }: DocumentationSectionProps) {
  const [activeTab, setActiveTab] = useState(detail.defaultTab || "Code");

  const tabs = ["Code", "CLI"];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
        <h2
          className="text-xl md:text-2xl font-semibold text-foreground tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Documentation
        </h2>

        <div className="flex items-center gap-1.5 p-1 border border-border/40 rounded-xl bg-card/60 w-fit">
          {tabs.map((tab) => {
            const isCLI = tab === "CLI";
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-1.5 text-[13px] font-medium transition-all rounded-lg flex items-center gap-2 ${
                  activeTab === tab
                    ? "bg-foreground text-background shadow-lg scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {isCLI && <SquareTerminal className="w-3.5 h-3.5" />}
                {tab}
                {isCLI && (
                  <div className="absolute -top-1.5 -right-1.5 flex items-center gap-1 bg-accent px-1.5 py-0.5 rounded-full border border-background shadow-[0_2px_10px_rgba(161,255,98,0.3)] scale-[0.8] z-10 animate-in zoom-in duration-300">
                    <div className="w-1 h-1 rounded-full bg-background animate-pulse" />
                    <span className="text-[9px] font-black text-background leading-none tracking-tighter">SOON</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-8">
        {activeTab === "CLI" && (
          <div className="relative rounded-2xl border border-border/10 overflow-hidden bg-card/40 opacity-40 select-none grayscale pointer-events-none">
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/5 p-6 backdrop-blur-[1px]">
              <div className="text-center">
                <p className="text-[14px] font-medium text-foreground/60 mb-1">Coming Soon</p>
                <p className="text-[12px] text-muted-foreground/40">CLI is currently in active development.</p>
              </div>
            </div>
            
            <CodeBlock 
              label="Terminal" 
              code={`npx t7blocks add ${detail.slug}\n# Initializing...\n# Fetching assets...`} 
            />
          </div>
        )}

        {activeTab === "Code" && (
          <div className="space-y-8 transform transition-all animate-in fade-in slide-in-from-bottom-1 duration-500">
            {detail.setupInstructions && (
              <div className="space-y-4">
                <h3 className="text-[14px] font-semibold text-foreground/80 tracking-wide uppercase">
                  Setup: External Scripts
                </h3>
                {detail.dependencies && detail.dependencies.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="text-[11px] text-muted-foreground uppercase tracking-widest border-r border-border pr-2">Deps</span>
                    {detail.dependencies.map((dep) => (
                      <span key={dep} className="text-[11px] px-2 py-0.5 rounded bg-accent/5 text-accent font-mono border border-accent/20">{dep}</span>
                    ))}
                  </div>
                )}
                
                {detail.codeBlocks.filter(b => b.label.toLowerCase().includes("script") || b.label === "HTML").slice(0, 1).map((block, idx) => (
                   <div key={`setup-container-${idx}`} className="space-y-3">
                     <CodeBlock key={`setup-${idx}`} label={block.label} code={block.code} language="html" />
                     <p className="text-[14px] text-muted-foreground/80 leading-relaxed pt-1">
                       Ensure the required scripts and dependencies are included in your project for optimal functionality of the {component.name}.
                     </p>
                   </div>
                ))}
              </div>
            )}

            <div className="space-y-6">
              {detail.codeBlocks.filter(b => !b.label.toLowerCase().includes("script") && b.label !== "HTML").map((block, idx) => (
                <div key={idx} className="space-y-3">
                  {block.label && (
                    <h3 className="text-[14px] font-semibold text-foreground/80 tracking-wide uppercase">
                      {`Step ${idx + 1}: ${block.label}`}
                    </h3>
                  )}
                  <CodeBlock 
                    label={block.label || "Component"} 
                    code={block.code} 
                    language={block.label.toLowerCase().includes("js") || block.label.toLowerCase().includes("react") ? "typescript" : "html"} 
                  />
                  <div className="pt-2 pb-6">
                    <p className="text-[14px] text-muted-foreground leading-relaxed transition-colors">
                      {component.description} This {block.label ? block.label.toLowerCase() : "component"} implementation provides a robust foundation for building interactive and high-performance user interfaces.
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
