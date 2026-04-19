"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Lock, Eye, Bookmark, ChevronRight } from "lucide-react";
import { ComponentEntry } from "@/lib/registry";
import { useBookmarks } from "@/components/common/bookmarks-context";

export function VaultCard({ item }: { item: ComponentEntry }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    if (!videoRef.current) return;

    if (!item.imageUrl && item.videoUrl) {
      videoRef.current.play().catch(() => { });
      return;
    }

    if (isHovered && item.videoUrl) {
      videoRef.current.play().catch(() => { });
    }
    else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, item.videoUrl, item.imageUrl]);

  const href = `/${item.category === "components" ? "components" : item.category}/${item.type}/${item.name}`;
  const bookmarked = isBookmarked(item.name);

  return (
    <Link href={href}>
      <div
        className="group flex flex-col bg-[#211e1e] hover:bg-[#2d2d2d] border border-border/10 rounded-[10px] transition-all duration-300 shadow-sm cursor-pointer p-1 hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full aspect-[1.7] overflow-hidden bg-muted/20 rounded-[10px] border border-border/10">
          {item.isPremium && (
            <div className="absolute top-3 left-3 z-20">
              <div className="flex items-center gap-1.5 bg-background/80 border border-border/30 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                <Lock className="w-3 h-3 text-green-500" />
                <span className="text-[10px] font-bold text-foreground/90 tracking-wider">Locked</span>
              </div>
            </div>
          )}

          {!item.isPremium && (
            <div className={`absolute top-3 right-3 z-20 flex gap-2 transition-all duration-500 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
              <a
                href={item.demoUrl ?? undefined}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-8 h-8 rounded-full bg-background/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-accent shadow-xl hover:bg-background/80 transition-all hover:scale-110"
                title="Open Live Preview"
              >
                <Eye className="w-3.5 h-3.5" color="red" />
              </a>
              <button
                onClick={(e) => toggleBookmark(item.name, e)}
                className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shadow-xl transition-all ${bookmarked ? "bg-accent text-accent-foreground" : "bg-background/60 backdrop-blur-md text-foreground/70"}`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
              </button>
            </div>
          )}

          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.displayName}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out 
                ${isHovered && item.videoUrl ? "opacity-0" : "opacity-100"}`}
            />
          )}

          {item.videoUrl && (
            <video
              ref={videoRef}
              src={item.videoUrl}
              className={`absolute inset-0 w-full h-full object-cover rounded-md transition-opacity duration-700 
                ${!item.imageUrl || isHovered ? "opacity-100" : "opacity-0"}`}
              muted
              playsInline
              loop
              preload="metadata"
            />
          )}
        </div>

        <div className="px-1.5 pt-4 pb-1.5 flex justify-between items-center bg-transparent mt-1">
          <h3 className="text-[14px] font-medium tracking-wide text-foreground/80 group-hover:text-foreground transition-colors truncate">
            {item.displayName}
          </h3>
          <div className={`w-6 h-6 rounded-full bg-sidebar-hover flex items-center justify-center text-foreground transition-all duration-375 ease-in-out ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}
