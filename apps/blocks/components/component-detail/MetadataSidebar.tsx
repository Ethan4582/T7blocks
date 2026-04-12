"use client";

import { Bug, Heart,  ExternalLink } from "lucide-react";
import { ComponentItem } from "@/lib/componentData";

interface MetadataSidebarProps {
  component: ComponentItem;
  bugReportUrl: string;
  featureRequestUrl: string;
}

export function MetadataSidebar({
  component,
  bugReportUrl,
  featureRequestUrl,
}: MetadataSidebarProps) {
  return (
    <div className="space-y-7 lg:sticky lg:top-10 lg:self-start min-w-0">
      {/* ─── Resource Details ─── */}
      <div className="space-y-4">
        <h3 className="text-[16px] font-bold text-foreground uppercase tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Resource details
        </h3>
        <div className="space-y-3.5 text-[14px]">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Published</span>
            <span className="text-foreground font-semibold">{component.publishedDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Category</span>
            <span className="text-foreground font-semibold">{component.isPremium ? "Premium" : "Free"}</span>
          </div>
        </div>
      </div>

      {/* ─── Action Links (Task: Fixed Grey Bg, No Hover) ─── */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <a 
            href={bugReportUrl} 
            target="_blank" 
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border/40 bg-muted text-[13px] font-medium text-foreground hover:bg-muted/80 transition-colors shadow-sm cursor-pointer"
          >
            <Bug className="w-3.5 h-3.5 text-red-500" />
            <span>Report Bug</span>
          </a>
          <a 
            href={featureRequestUrl} 
            target="_blank" 
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border/40 bg-muted text-[13px] font-medium text-foreground hover:bg-muted/80 transition-colors shadow-sm cursor-pointer"
          >
            <img src="/SVG/github.svg" className="w-3.5 h-3.5 dark:invert opacity-70" alt="GitHub" />
            <span>Contribute</span>
          </a>
        </div>
        <div className="flex justify-center">
          <a 
            href="https://github.com/sponsors/t7labs" 
            target="_blank" 
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border/40 bg-muted text-[13px] font-medium text-foreground hover:bg-muted/80 transition-colors w-fit shadow-sm cursor-pointer"
          >
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500/10" />
            <span>Sponsor T7 Block</span>
          </a>
        </div>
      </div>

      {/* Divider below sponsor button */}
      <div className="border-b border-border/50 my-1" />

      {/* ─── Tags (Task: Fixed Grey Bg, No Hover, fit text width, left-aligned) ─── */}
      {component.tags.length > 0 && (
        <div className="flex flex-wrap justify-start gap-1.5 pt-1">
          {component.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[10px] font-medium rounded-md border border-border/40 bg-muted text-muted-foreground cursor-default w-fit"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ─── Creator Credit (Task: Image & Name Same Row, Centered) ─── */}
      <div className="flex items-center justify-center gap-2.5 pt-2">
        <img
          src={component.creator.image}
          alt={component.creator.name}
          className="w-5 h-5 rounded-full object-cover border border-border/50"
        />
        <div className="relative group/creator-name">
          <span 
            className="text-[13px] font-medium text-foreground cursor-default"
            style={{ letterSpacing: "0.04em" }}
          >
            {component.creator.name}
          </span>
          
          {/* Hover tooltip — Only on name hover */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-3.5 rounded-xl bg-card border border-border/60 shadow-2xl z-50 text-left opacity-0 invisible group-hover/creator-name:opacity-100 group-hover/creator-name:visible transition-all duration-200 w-[260px] pointer-events-none group-hover/creator-name:pointer-events-auto">
            <h4 className="text-[12px] font-bold text-foreground mb-1.5" style={{ letterSpacing: "0.04em" }}>Creator Credits</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed" style={{ letterSpacing: "0.03em" }}>
              We always strive to credit creators as accurately as possible. While similar concepts might appear online, we aim to provide proper and respectful attribution.
            </p>
            {component.creator.url && (
              <a
                href={component.creator.url}
                target="_blank"
                className="mt-2.5 flex items-center gap-1.5 text-[11px] text-accent hover:text-accent/80 transition-colors"
                style={{ letterSpacing: "0.03em" }}
              >
                <ExternalLink className="w-3 h-3" />
                <span className="truncate">{component.creator.url}</span>
              </a>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
