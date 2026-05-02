'use client';

import { useState, useEffect } from "react";
import { toComponentItem, registry } from "@/lib/registry";
import { MetadataSidebar, DocumentationSection, PreviewCard, RelatedResources, CopyPromptDropdown, SidebarActions } from "@/components/features/component-detail";
import { ComponentDetailData } from "@/lib/componentData";
import { trackComponentView } from "@/lib/analytics/analytics";

interface DetailViewProps { entry: any; allContent: any; }

export function DetailView({ entry, allContent }: DetailViewProps) {
  const [activeSection, setActiveSection] = useState("install");
  const [docMode, setDocMode] = useState<"CLI" | "Code">("CLI");

  const codeBlocks: { label: string; code: string; jsxCode?: string }[] = [];
  const setupBlocks: { label: string; code: string; jsxCode?: string }[] = [];

  for (let i = 1; i <= 10; i++) {
    const code = allContent[`Code${i}`];
    const jsxCode = allContent[`Code${i}Jsx`];
    const fileName = allContent[`Code${i}FileName`];
    if (code) codeBlocks.push({ label: fileName || (i === 1 ? "Component" : `Module ${i}`), code, jsxCode });
  }

  if (codeBlocks.length === 0) {
    const legacyCode = allContent.codeBlock || allContent.heroTsxSource || allContent.componentCode || "";
    const legacyJsxCode = allContent.codeBlockJsx || "";
    if (legacyCode) codeBlocks.push({ label: "Component", code: legacyCode, jsxCode: legacyJsxCode });
    const legacyCss = allContent.heroCssSource || allContent.cssSource;
    if (legacyCss) codeBlocks.push({ label: "CSS", code: legacyCss });
  }

  for (let i = 1; i <= 10; i++) {
    const code = allContent[`setupCode${i}`];
    const jsxCode = allContent[`setupCode${i}Jsx`];
    const fileName = allContent[`setupCode${i}FileName`];
    if (code) setupBlocks.push({ label: fileName || `Step ${i}`, code, jsxCode });
  }

  const detail: ComponentDetailData = {
    slug: entry.name,
    dependencies: entry.cliCommand ? (typeof entry.cliCommand === 'string' ? entry.cliCommand.replace('npm install ', '').split(' ') : []) : [],
    codeBlocks,
    setupBlocks,
    props: allContent.props || "",
    propsTable: allContent.propsTable || "",
    installCommand: allContent.installCommand || entry.installCommand || null,
    T7blocksCliCommand: allContent.T7blocksCliCommand || entry.cliCommand || null
  };

  const componentItem = toComponentItem(entry);

  useEffect(() => { trackComponentView(entry.name, entry.category || "ui"); }, [entry.name, entry.category]);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [docMode]);

  const relatedItems = registry.filter(item => item.name !== entry.name && (item.type === entry.type || item.category === entry.category)).slice(0, 2);
  const hasCLI = !!detail.T7blocksCliCommand;
  const hasInstall = !!detail.installCommand;
  const hasCode = (detail.codeBlocks?.length ?? 0) > 0;
  const hasUsage = (detail.setupBlocks?.length ?? 0) > 0;
  const hasProps = !!(detail.props || detail.propsTable);

  const availableSections = docMode === "CLI"
    ? [
      ...(hasCLI ? [{ id: "install", name: "CLI" }] : []),
      ...(hasUsage ? [{ id: "usage", name: "Usage" }] : []),
      ...(hasProps ? [{ id: "props", name: "Props" }] : [])
    ]
    : [
      ...(hasInstall ? [{ id: "install", name: "Install" }] : []),
      ...(hasCode ? [{ id: "code", name: "Code" }] : []),
      ...(hasUsage ? [{ id: "usage", name: "Usage" }] : []),
      ...(hasProps ? [{ id: "props", name: "Props" }] : [])
    ];

  return (
    <div className="w-full h-[calc(100vh-64px)] lg:h-[calc(100vh-72px)] overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full items-start gap-x-12">
        <article className="flex-1 w-full h-full overflow-y-auto no-scrollbar pt-6 pb-2 px-1 lg:px-4">
          <div className="max-w-5xl space-y-10">
            <header className="space-y-1.5">
              <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-foreground font-serif leading-[1.1]">
                {entry.displayName}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <p className="text-[#404040] dark:text-muted-foreground/60 text-[16px] max-w-2xl leading-relaxed font-medium">
                  {entry.description}
                </p>
                <div className="shrink-0 md:pb-1">
                  <CopyPromptDropdown componentName={entry.displayName} files={[...codeBlocks, ...setupBlocks]} />
                </div>
              </div>
            </header>

            <div className="-mt-2">
              <PreviewCard component={componentItem} />
            </div>

            <div className="space-y-24">
              <DocumentationSection detail={detail} component={componentItem} onModeChange={setDocMode} />
              
              <div className="space-y-12">
                {entry.credits && (
                  <div id="inspiration" className="space-y-4">
                    <h3 className="text-[28px] md:text-[32px] font-medium tracking-tight text-foreground font-serif">Inspiration</h3>
                    <div className="text-[15px] text-muted-foreground/80 font-medium">
                      This component is inspired by{" "}
                      {entry.credits.blockUrl ? (
                        <a href={entry.credits.blockUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline text-foreground hover:text-accent transition-colors">
                          {entry.credits.blockName}
                        </a>
                      ) : (
                        <span className="font-bold text-foreground">{entry.credits.blockName}</span>
                      )}
                      {" "}by{" "}
                      {entry.credits.creatorUrl || entry.credits.blockUrl ? (
                        <a href={entry.credits.creatorUrl || entry.credits.blockUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline text-foreground hover:text-accent transition-colors">
                          {entry.credits.creatorName}
                        </a>
                      ) : (
                        <span className="font-bold text-foreground">{entry.credits.creatorName}</span>
                      )}
                    </div>
                  </div>
                )}

                {relatedItems.length > 0 && (
                  <section className="space-y-10 pt-4 border-t border-white/5" aria-label="Related resources">
                    <h2 className="text-[28px] md:text-[32px] font-medium tracking-tight text-foreground font-serif">Related resources</h2>
                    <RelatedResources items={relatedItems} />
                  </section>
                )}
              </div>
            </div>
          </div>
        </article>

        <aside className="hidden lg:block w-[280px] h-full overflow-y-auto no-scrollbar shrink-0 pt-6 pr-4">
          <section className="mb-4" aria-label="Component actions">
            <SidebarActions demoUrl={entry.demoUrl} />
          </section>
          <MetadataSidebar component={componentItem} activeSection={activeSection} availableSections={availableSections} />
        </aside>
      </div>
    </div>
  );
}
