"use client";

import { useState, useEffect } from "react";
import { ComponentDetailData, ComponentItem } from "@/lib/componentData";
import { CodeBlock } from "./CodeBlock";
import { PropsTable } from "./PropsTable";

interface DocumentationSectionProps {
  detail: ComponentDetailData;
  component: ComponentItem;
  onModeChange?: (mode: "CLI" | "Code") => void;
}

export function DocumentationSection({ detail, component, onModeChange }: DocumentationSectionProps) {
  const [activeMode, setActiveMode] = useState<"CLI" | "Code">("CLI");

  useEffect(() => {
    onModeChange?.(activeMode);
  }, [activeMode, onModeChange]);
  
  const pmIcons = {
    pnpm: "/SVG/pnpm.svg",
    npm: "/SVG/npm_icon.svg",
    yarn: "/SVG/yarn.svg",
    bun: "/SVG/bun.svg"
  };

  const formatPMFiles = (source: any) => {
    if (!source) return [];
    if (typeof source === 'object' && source.pnpm) {
      return (["pnpm", "npm", "yarn", "bun"] as const).map(pm => ({
        label: `${pm}`,
        code: source[pm],
        icon: pmIcons[pm],
        language: "bash"
      }));
    }
    if (typeof source === 'object' && source.pnpmCommand) {
      return (["pnpm", "npm", "yarn", "bun"] as const).map(pm => ({
        label: `${pm}`,
        code: source[`${pm}Command`],
        icon: pmIcons[pm],
        language: "bash"
      }));
    }
    const base = typeof source === "string" ? source : "";
    return (["pnpm", "npm", "yarn", "bun"] as const).map(pm => ({
        label: `${pm}`,
        code: pm === 'pnpm' ? base : (pm === 'npm' ? base.replace('pnpm add', 'npm install').replace('pnpm dlx', 'npx') : base.replace('pnpm', pm)),
        icon: pmIcons[pm],
        language: "bash"
    }));
  };

  const cliFiles = formatPMFiles(detail.T7blocksCliCommand);
  const installFiles = formatPMFiles(detail.installCommand);

  const hasCLI = cliFiles.length > 0;
  const hasInstall = installFiles.length > 0;
  const hasUsage = detail.setupBlocks && detail.setupBlocks.length > 0;
  const hasCode = detail.codeBlocks && detail.codeBlocks.length > 0;
  const hasProps = !!(detail.props || detail.propsTable);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-black/5 dark:border-white/5 pb-8">
        <div className="space-y-1">
           <h2 className="text-[34px] font-medium tracking-tight text-[#262626] dark:text-foreground font-serif">Documentation</h2>
        </div>

        <div className="flex items-center p-1 border border-black/[0.08] dark:border-white/[0.08] rounded-xl bg-black/[0.02] dark:bg-white/[0.02] w-fit">
          {["CLI", "Code"].map((mode) => {
            const isActive = activeMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setActiveMode(mode as any)}
                className={`relative px-8 py-2 text-[12px] font-medium transition-all duration-300 rounded-lg flex items-center gap-2 ${
                  isActive
                    ? "bg-white dark:bg-[#2a2a2a] text-[#262626] dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] border border-black/[0.05] dark:border-white/[0.05]"
                    : "text-[#737373] dark:text-muted-foreground/50 hover:text-[#262626] dark:hover:text-foreground/80"
                }`}
              >
                {mode === "CLI" && (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                  </svg>
                )}
                {mode === "Code" && (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                )}
                <span>{mode}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        
        {activeMode === "CLI" && (
           <div className="space-y-10" id="install" data-section>
              {hasCLI && (
                <div className="space-y-6">
                  <CodeBlock files={cliFiles} componentId={component.name} />
                  <div className="p-6 rounded-[22px] bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5">
                    <p className="text-[#404040] dark:text-muted-foreground/60 text-[14px] leading-relaxed max-w-3xl font-medium">
                       The T7Blocks CLI allows you to automatically add this component and its dependencies to your project directory. 
                       It handles file creation, dependency management, and style configuration automatically.
                    </p>
                  </div>
                </div>
              )}
           </div>
        )}

        {activeMode === "Code" && (
           <div className="space-y-12">
              
              {hasInstall && (
                <div className="space-y-6 -mt-2" id="install" data-section>
                  <h3 className="text-[14px] font-bold text-[#737373] dark:text-white tracking-[0.25em] uppercase px-1">Install</h3>
                  <CodeBlock files={installFiles} componentId={component.name} />
                </div>
              )}

              {hasCode && (
                <div className="space-y-6" id="code" data-section>
                  <h3 className="text-[14px] font-bold text-[#737373] dark:text-white tracking-[0.25em] uppercase px-1">Implementation</h3>
                  <CodeBlock 
                    files={detail.codeBlocks.map(b => ({ 
                      ...b, 
                      label: b.label.toLowerCase(),
                      language: b.label.toLowerCase().endsWith('.css') ? 'css' : 'typescript'
                    }))} 
                    componentId={component.name}
                  />
                </div>
              )}

              {hasUsage && (
                <div className="space-y-6" id="usage" data-section>
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-[14px] font-bold text-[#737373] dark:text-white tracking-[0.25em] uppercase">Usage</h3>
                    {detail.dependencies && detail.dependencies.length > 0 && (
                      <div className="flex items-center gap-2">
                         {detail.dependencies.map((dep) => (
                           <span key={dep} className="text-[10px] px-2.5 py-1 rounded-lg bg-black/[0.04] dark:bg-white/5 text-[#737373] dark:text-muted-foreground/60 font-mono border border-black/5 dark:border-white/5">{dep}</span>
                         ))}
                      </div>
                    )}
                  </div>
                  <CodeBlock 
                    files={detail.setupBlocks?.map(b => ({ ...b, label: b.label.toLowerCase() }))} 
                    componentId={component.name}
                  />
                </div>
              )}
           </div>
        )}

        {hasProps && (
          <div className="space-y-6" id="props" data-section>
            <h3 className="text-[14px] font-bold text-[#737373] dark:text-white tracking-[0.25em] uppercase px-1">Properties</h3>
            <PropsTable content={detail.propsTable || detail.props || ""} />
          </div>
        )}
      </div>
    </div>
  );
}
