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
        className="group/card space-y-4 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative w-full aspect-[1.7] overflow-hidden bg-[#0D0D0D] rounded-2xl border border-white/5 transition-all duration-500 group-hover/card:border-white/10 shadow-2xl">
          {/* Play status icon */}
          <div className="absolute top-4 left-4 z-20">
             <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" />
             </div>
          </div>

          {item.isPremium && (
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-black/40 border border-white/10 backdrop-blur-xl px-3 py-1 rounded-full">
                <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">Premium</span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

          {item.video ? (
            <>
              {item.image && (
                 <img 
                    src={item.image} 
                    alt={item.name} 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hovered ? "opacity-0 scale-105" : "opacity-100 scale-100"}`} 
                 />
              )}
              <video 
                ref={videoRef} 
                src={item.video} 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${(!item.image || hovered) ? "opacity-100 scale-100 placeholder-black" : "opacity-0 scale-105"}`} 
                muted 
                playsInline 
                loop 
                autoPlay={!item.image}
              />
            </>
          ) : (
            <img 
               src={item.image} 
               alt={item.name} 
               className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110" 
            />
          )}
        </div>

        <div className="px-1 flex justify-between items-center transition-all duration-300">
          <div>
            <h3 className="text-[17px] font-medium tracking-tight text-foreground transition-colors">
              {item.name}
            </h3>
            {item.category && (
               <p className="text-[12px] text-muted-foreground/40 font-medium uppercase tracking-widest mt-1">
                 {item.category}
               </p>
            )}
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-foreground/40 group-hover/card:bg-[#A1FF62]/10 group-hover/card:text-[#A1FF62] transition-all">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
