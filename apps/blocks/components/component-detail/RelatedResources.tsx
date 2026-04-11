"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Eye, Bookmark, Lock as LockIcon, ChevronRight } from "lucide-react";
import { ComponentItem } from "@/lib/componentData";

interface RelatedResourcesProps {
  items: ComponentItem[];
  bookmarks: number[];
  onToggleBookmark: (id: number) => void;
}

export function RelatedResources({ items, bookmarks, onToggleBookmark }: RelatedResourcesProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-5 border-t border-border pt-8">
      <h2
        className="text-lg font-semibold text-foreground uppercase tracking-tight"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.03em" }}
      >
        Related resources
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <RelatedCard
            key={item.id}
            item={item}
            isBookmarked={bookmarks.includes(item.id)}
            onToggleBookmark={() => onToggleBookmark(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

function RelatedCard({
  item,
  isBookmarked,
  onToggleBookmark,
}: {
  item: ComponentItem;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (hovered && item.video) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [hovered, item.video]);

  return (
    <Link href={`/component/${item.slug}`}>
      <div
        className="group/card flex flex-col bg-card dark:bg-[#1c1c1c] hover:bg-[#e4e4e7] dark:hover:bg-[#2a2a2a] border border-border/60 rounded-xl transition-all duration-300 shadow-sm cursor-pointer p-1.5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative w-full aspect-[1.45] overflow-hidden bg-muted/20 dark:bg-[#111] rounded-lg border border-border/10">
          {item.isPremium && (
            <div className="absolute top-3 left-3 z-20">
              <div className="flex items-center gap-1.5 bg-background border border-border backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                <LockIcon className="w-3 h-3 text-accent" />
                <span className="text-[11px] font-semibold text-foreground tracking-wider">Locked</span>
              </div>
            </div>
          )}
          {!item.isPremium && (
            <div className={`absolute z-20 top-3 right-3 flex items-center gap-2 transition-all duration-300 ${hovered ? "opacity-100" : "opacity-0 translate-y-[-4px]"}`}>
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-accent hover:bg-background hover:scale-105 transition-all shadow-sm"
                title="Preview"
                onClick={(e) => { e.stopPropagation(); }}
              >
                <Eye className="w-[15px] h-[15px]" />
              </a>
              <button
                className="w-8 h-8 rounded-lg bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground hover:bg-background hover:scale-105 transition-all shadow-sm"
                title="Bookmark"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleBookmark(); }}
              >
                <Bookmark className={`w-[15px] h-[15px] ${isBookmarked ? "fill-foreground" : ""}`} />
              </button>
            </div>
          )}
          {item.video ? (
            <>
              <img src={item.image} alt={item.name} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"}`} />
              <video ref={videoRef} src={item.video} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`} muted playsInline loop preload="auto" />
            </>
          ) : (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          )}
        </div>

        <div className="px-2 pt-3.5 pb-2 flex justify-between items-center bg-transparent mt-1">
          <h3 className="text-[15px] font-semibold tracking-wide text-foreground/85 group-hover:text-foreground transition-colors truncate">
            {item.name}
          </h3>
          {!item.isPremium && (
            <div className={`w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-foreground/80 transition-all duration-300 ${hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
