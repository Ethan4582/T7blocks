"use client";

import { Info, Lightbulb, SquarePen, Heart, Menu } from "lucide-react";
import { ComponentItem } from "@/lib/componentData";

interface MetadataSidebarProps {
  component: ComponentItem;
  bugReportUrl: string;
  featureRequestUrl: string;
  editUrl?: string;
  activeSection?: string;
  availableSections?: { id: string; name: string }[];
}

export function MetadataSidebar({
  component,
  bugReportUrl,
  featureRequestUrl,
  editUrl = "#",
  activeSection = "install",
  availableSections = [],
}: MetadataSidebarProps) {
  const sections = availableSections.length > 0 
    ? availableSections 
    : [
        { id: "install", name: "Install" },
        { id: "usage", name: "Usage" },
        { id: "code", name: "Code" },
        { id: "props", name: "Props" }
      ];

  return (
    <div className="space-y-10 lg:sticky lg:top-12 lg:self-start w-full min-w-[100px] pb-10">
      {/* ─── Navigation Header ─── */}
      {sections.length > 0 && (
        <div className="px-1 animate-in fade-in slide-in-from-right-2 duration-500">
          <div className="flex items-center gap-2 text-muted-foreground/40 mb-4 font-medium">
            <Menu className="w-3.5 h-3.5" />
            <span className="text-[12px] tracking-tight uppercase">On this page</span>
          </div>

          {/* ─── Dynamic Section List ─── */}
          <div className="border-l border-white/5 ml-1.5 space-y-0.5">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block py-1.5 px-4 transition-all duration-300 -ml-px border-l-2 ${
                    isActive 
                      ? "border-[#A1FF62] text-foreground font-bold text-[13px]" 
                      : "border-transparent text-muted-foreground/40 hover:text-foreground/80 text-[13px]"
                  }`}
                >
                  {section.name}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Tags Section ─── */}
      {component.tags && component.tags.length > 0 && (
        <div className="px-1 space-y-3">
          <h3 className="text-[14px] font-bold text-foreground/90 tracking-tight ml-px">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5 ml-px">
            {component.tags.map((tag) => (
              <a 
                key={tag}
                href={`/category/${tag.toLowerCase()}`}
                className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[11px] text-muted-foreground/60 hover:text-foreground hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ─── Contribute Section ─── */}
      <div className="px-1 space-y-4">
        <h3 className="text-[14px] font-bold text-foreground/90 tracking-tight ml-px">
          Contribute
        </h3>
        <div className="space-y-1 ml-px">
          <a 
            href={bugReportUrl} 
            target="_blank" 
            className="flex items-center gap-3 text-muted-foreground/50 hover:text-foreground transition-colors group"
          >
            <Info className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-rose-500 transition-colors" />
            <span className="text-[13px] font-medium tracking-tight">Report an issue</span>
          </a>
          <a 
            href={featureRequestUrl} 
            target="_blank" 
            className="flex items-center gap-3 text-muted-foreground/50 hover:text-foreground transition-colors group"
          >
            <Lightbulb className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-yellow-500 transition-colors" />
            <span className="text-[13px] font-medium tracking-tight">Request a feature</span>
          </a>
          <a 
            href={editUrl} 
            target="_blank" 
            className="flex items-center gap-3 text-muted-foreground/50 hover:text-foreground transition-colors group"
          >
            <SquarePen className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-blue-400 transition-colors" />
            <span className="text-[13px] font-medium tracking-tight">Edit this page</span>
          </a>
        </div>
      </div>

      {/* ─── Sponsor Button ─── */}
      <div className="px-1 pt-1">
        <a 
          href="https://github.com/sponsors/t7labs" 
          target="_blank"
          className="flex items-center justify-center gap-2 w-full h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 group shadow-md text-foreground no-underline"
        >
          <Heart className="w-3.5 h-3.5 text-green-500 fill-green-500 scale-110 group-hover:scale-125 transition-transform duration-300" />
          <span className="text-[13px] font-bold tracking-tight">Sponsor</span>
        </a>
      </div>
    </div>
  );
}


