"use client";

import { Info, Lightbulb, SquarePen, Heart, Menu } from "lucide-react";
import { ComponentItem } from "@/lib/componentData";
import { trackNavIntent, trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics/analytics";

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
  const sections =
    availableSections.length > 0
      ? availableSections
      : [
          { id: "install", name: "Install" },
          { id: "usage", name: "Usage" },
          { id: "code", name: "Code" },
          { id: "props", name: "Props" },
        ];

  return (
    <div className="space-y-6 lg:sticky lg:top-12 lg:self-start w-full min-w-[100px] pb-8">
      {sections.length > 0 && (
        <div className="px-1">
          <div className="flex items-center gap-2 text-[#404040] dark:text-foreground/90 mb-3 font-medium">
            <Menu className="w-3 h-3" />
            <span className="text-[11px] tracking-[0.15em] uppercase font-bold">
              On this page
            </span>
          </div>

          <div className="border-l border-black/5 dark:border-white/5 ml-1.5 space-y-0.5">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block py-1.5 px-4 transition-all duration-200 -ml-px border-l-2 ${
                    isActive
                      ? "border-[#A1FF62] text-[#A1FF62] font-semibold text-[13px]"
                      : "border-transparent text-[#666666] dark:text-muted-foreground hover:text-foreground text-[13px]"
                  }`}
                >
                  {section.name}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {component.tags && component.tags.length > 0 && (
        <div className="px-1 space-y-2.5">
          <h3 className="text-[11px] font-bold text-[#404040] dark:text-foreground/90 tracking-[0.15em] uppercase ml-px">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5 ml-px">
            {component.tags.map((tag) => (
              <a
                key={tag}
                href={`/category/${tag.toLowerCase()}`}
                onClick={() => trackNavIntent("tag", tag)}
                className="px-2.5 py-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[11px] text-[#666666] dark:text-muted-foreground hover:text-foreground hover:bg-black/[0.08] dark:hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="px-1 space-y-2">
        <h3 className="text-[11px] font-bold text-foreground/65 dark:text-foreground/90 tracking-[0.15em] uppercase ml-px">
          Contribute
        </h3>
        <div className="space-y-1 ml-px">
          <a
            href={bugReportUrl}
            target="_blank"
            className="flex items-center gap-3 text-[#5a5a5a] dark:text-[#bdbdbd] hover:text-foreground transition-all duration-200"
          >
            <Info className="w-3.5 h-3.5 text-rose-500/70" />
            <span className="text-[13px] font-medium tracking-tight">
              Report an issue
            </span>
          </a>
          <a
            href={featureRequestUrl}
            target="_blank"
            className="flex items-center gap-3 text-[#5a5a5a] dark:text-[#bdbdbd] hover:text-foreground transition-all duration-200"
          >
            <Lightbulb className="w-3.5 h-3.5 text-yellow-500/70" />
            <span className="text-[13px] font-medium tracking-tight">
              Request a feature
            </span>
          </a>
          <a
            href={editUrl}
            target="_blank"
            className="flex items-center gap-3 text-[#5a5a5a] dark:text-[#bdbdbd] hover:text-foreground transition-all duration-200"
          >
            <SquarePen className="w-3.5 h-3.5 text-blue-400/70" />
            <span className="text-[13px] font-medium tracking-tight">
              Edit this page
            </span>
          </a>
        </div>
      </div>

      <div className="px-1 mt-2 mb-1">
        <div className="border-t border-black/10 dark:border-white/15" />
      </div>

      <div className="px-1 mt-0">
        <a
          href="https://github.com/sponsors/t7labs"
          target="_blank"
          onClick={() => trackEvent(ANALYTICS_EVENTS.SOCIAL_CLICKED, { platform: "sponsor", location: "metadata_sidebar" })}
          className="flex items-center justify-center gap-2 w-full h-10 bg-black/[0.05] hover:bg-black/[0.08] dark:bg-white/5 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 rounded-[8px] transition-all duration-300 group shadow-sm text-foreground no-underline"
        >
          <Heart className="w-3.5 h-3.5 text-[#A1FF62] fill-[#A1FF62] group-hover:scale-110 transition-transform duration-300" />
          <span className="text-[13px] font-semibold tracking-tight">
            Sponsor
          </span>
        </a>
      </div>
    </div>
  );
}