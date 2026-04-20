'use client';

import { useState, useEffect, useRef } from "react";
import { toComponentItem, registry } from "@/lib/registry";
import { MetadataSidebar, DocumentationSection, PreviewCard, RelatedResources } from "@/components/component-detail";
import { ComponentDetailData } from "@/lib/componentData";

interface DetailViewProps {
  entry: any;
  allContent: any;
}

export function DetailView({ entry, allContent }: DetailViewProps) {
  const [activeSection, setActiveSection] = useState("install");
  const [docMode, setDocMode] = useState<"CLI" | "Code">("CLI");
  
  const codeBlocks: { label: string; code: string }[] = [];
  const setupBlocks: { label: string; code: string }[] = [];

  for (let i = 1; i <= 10; i++) {
    const code = allContent[`Code${i}`];
    const fileName = allContent[`Code${i}FileName`];
    if (code) codeBlocks.push({ label: fileName || (i === 1 ? "Component" : `Module ${i}`), code });
  }

  if (codeBlocks.length === 0) {
    const legacyCode = allContent.codeBlock || allContent.heroTsxSource || allContent.componentCode || "";
    if (legacyCode) codeBlocks.push({ label: "Component", code: legacyCode });
    const legacyCss = allContent.heroCssSource || allContent.cssSource;
    if (legacyCss) codeBlocks.push({ label: "CSS", code: legacyCss });
  }

  for (let i = 1; i <= 10; i++) {
    const code = allContent[`setupCode${i}`];
    const fileName = allContent[`setupCode${i}FileName`];
    if (code) setupBlocks.push({ label: fileName || `Step ${i}`, code });
  }

  const detail: ComponentDetailData = {
    slug: entry.name,
    dependencies: entry.cliCommand
      ? (typeof entry.cliCommand === 'string' ? entry.cliCommand.replace('npm install ', '').split(' ') : [])
      : [],
    codeBlocks,
    setupBlocks,
    props: allContent.props || "",
    propsTable: allContent.propsTable || "",
    installCommand: allContent.installCommand || entry.installCommand || null,
    T7blocksCliCommand: allContent.T7blocksCliCommand || entry.cliCommand || null
  };

  const componentItem = toComponentItem(entry);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [docMode]); // Re-observe when mode changes as sections might appear/disappear

  const relatedItems = registry
    .filter(item => item.name !== entry.name && (item.type === entry.type || item.category === entry.category))
    .slice(0, 2)
    .map(toComponentItem);

  const availableSections = docMode === "CLI" 
    ? [{ id: "install", name: "CLI" }]
    : [
        { id: "install", name: "Install" },
        ...(detail.setupBlocks?.length && detail.setupBlocks.length > 0 ? [{ id: "usage", name: "Usage" }] : []),
        ...(detail.codeBlocks?.length && detail.codeBlocks.length > 0 ? [{ id: "code", name: "Code" }] : []),
        ...((detail.props || detail.propsTable) ? [{ id: "props", name: "Props" }] : [])
      ];

  return (
    <div className="py-6 w-full px-0 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row items-start gap-x-12">
        {/* ─── Left Content ─── */}
        <div className="flex-1 min-w-0 max-w-5xl space-y-16">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-7xl font-medium tracking-tight text-foreground font-serif leading-[1.1]">
              {entry.displayName}
            </h1>
            <p className="text-muted-foreground text-[18px] max-w-2xl leading-relaxed font-medium opacity-60">
              {entry.description}
            </p>
          </div>

          <PreviewCard component={componentItem} />

          <div className="space-y-32">
            <DocumentationSection 
               detail={detail} 
               component={componentItem} 
               onModeChange={setDocMode}
            />
            
            {relatedItems.length > 0 && (
              <div className="space-y-12">
                 <h2 className="text-[24px] font-medium tracking-tight text-foreground font-serif">Related resources</h2>
                 <RelatedResources 
                    items={relatedItems} 
                    bookmarks={[]} 
                    onToggleBookmark={() => {}} 
                 />
              </div>
            )}
          </div>
        </div>

        {/* ─── Right Sidebar ─── */}
        <div className="w-full lg:w-[280px] lg:shrink-0 ml-auto pt-4 relative">
          <div className="lg:sticky lg:top-24">
            <MetadataSidebar
              component={componentItem}
              activeSection={activeSection}
              availableSections={availableSections}
              bugReportUrl="https://github.com/t7labs/t7blocks/issues"
              featureRequestUrl="https://github.com/t7labs/t7blocks/issues"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
