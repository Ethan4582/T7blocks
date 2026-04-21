"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search, X, ChevronRight, Hash, FileText, LayoutGrid } from "lucide-react";
import { registry, ComponentEntry } from "@/lib/registry";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics/analytics";

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredResults = query.trim() === "" 
    ? [] 
    : registry.filter(item => 
        item.displayName.toLowerCase().includes(query.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);

  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleModal();
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggleModal]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleSelect = (item: ComponentEntry) => {
    const href = `/${item.category === 'components' ? 'components' : item.category}/${item.type}/${item.name}`;
    trackEvent(ANALYTICS_EVENTS.SEARCH_USED, { query, selected: item.name });
    router.push(href);
    setIsOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(filteredResults.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === "Enter") {
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
     
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

    
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0F0F0F] border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center px-4 py-4 border-b border-black/5 dark:border-white/5">
          <Search className="w-5 h-5 text-[#737373] dark:text-muted-foreground/50 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-[15px] text-foreground placeholder:text-[#8c8c8c] dark:placeholder:text-muted-foreground/30"
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:flex items-center gap-1 rounded bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/50 h-5">
              ESC
            </kbd>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-black/[0.03] dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4 text-[#737373] dark:text-muted-foreground/50" />
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
          {filteredResults.length === 0 ? (
            query === "" ? (
              <div className="py-2">
                <div className="px-4 py-2">
                  <p className="text-[11px] font-semibold text-[#404040] dark:text-muted-foreground/30 uppercase tracking-wider">Follow for updates</p>
                </div>
                <div className="px-2 space-y-0.5">
                  <a 
                    href="https://twitter.com/ashirwadsingh_" 
                    target="_blank"
                    onClick={() => trackEvent(ANALYTICS_EVENTS.SOCIAL_CLICKED, { platform: "twitter", location: "search_modal" })}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.03] text-[13px] text-[#262626] dark:text-muted-foreground/70 transition-colors group"
                  >
                    <X className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span>Twitter @ashirwadsingh_</span>
                  </a>
                </div>

                <div className="px-4 py-2 mt-4">
                  <p className="text-[11px] font-semibold text-[#404040] dark:text-muted-foreground/30 uppercase tracking-wider">Gallery</p>
                </div>
                <div className="px-2 space-y-0.5">
                  <Link 
                    href="/gallery" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.03] text-[13px] text-[#262626] dark:text-muted-foreground/70 transition-colors group"
                  >
                    <LayoutGrid className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span>Browse Gallery</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-[14px] text-muted-foreground/40">No components found for &quot;{query}&quot;</p>
              </div>
            )
          ) : (
            <div className="py-2">
               <div className="px-4 py-2">
                  <p className="text-[11px] font-semibold text-[#404040] dark:text-muted-foreground/30 uppercase tracking-wider">Sections and Blocks</p>
                </div>
              <div className="px-2 space-y-1">
                {filteredResults.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all
                      ${selectedIndex === index ? "bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/5 translate-x-1" : "bg-transparent border border-transparent"}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center border transition-colors
                        ${selectedIndex === index ? "bg-black/[0.08] dark:bg-white/10 dark:border-white/20 border-black/10" : "bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5"}
                      `}>
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="w-full h-full object-cover rounded-lg opacity-80" />
                        ) : (
                          item.category === 'hero' ? <FileText className="w-4 h-4 opacity-40" /> : <Hash className="w-4 h-4 opacity-40" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className={`text-[13px] font-medium transition-colors ${selectedIndex === index ? "text-foreground" : "text-muted-foreground/70"}`}>
                          {item.displayName}
                        </p>
                        <p className="text-[10px] text-[#525252] dark:text-muted-foreground/30 uppercase tracking-wider font-semibold">
                          {item.category} • {item.type}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-all ${selectedIndex === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {filteredResults.length > 0 && (
          <div className="px-4 py-3 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-muted-foreground/40 font-medium">
             <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 px-1 inline-flex items-center justify-center min-w-[16px] h-4">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 px-1 inline-flex items-center justify-center min-w-[32px] h-4">ENTER</kbd>
                  Select
                </span>
             </div>
             <div className="flex items-center gap-1">
                Found {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
