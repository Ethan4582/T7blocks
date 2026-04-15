"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Search, Lock, Command, Bookmark, Bug, Heart, User, Menu, X,
} from "lucide-react";
import { registry } from "@/lib/registry";
import { useTheme } from "@/components/common/theme-provider";
import { useSidebar } from "@/components/common/sidebar-provider";

interface ComponentNavbarProps {
  bugReportUrl?: string;
}

export function ComponentNavbar({ bugReportUrl = "https://github.com/t7labs/t7blocks/issues" }: ComponentNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { isCollapsed, toggleCollapsed } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
    fetch("https://api.github.com/repos/t7labs/t7blocks")
      .then((r) => r.json())
      .then((d) => { if (d.stargazers_count !== undefined) setStars(d.stargazers_count); })
      .catch(() => setStars(24));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const searchResults = searchQuery.length > 1
    ? registry.filter(c =>
        c.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  return (
    <>
      <header className="flex justify-between items-center px-6 md:px-10 lg:px-12 py-3 sticky top-0 bg-background z-30 border-b border-border/40">
        <div className="flex items-center gap-3 flex-1 max-w-[320px]">
          {isCollapsed && (
            <button 
              onClick={toggleCollapsed}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
              aria-label="Expand Sidebar"
            >
              <img src="/SVG/sidebar.svg" alt="Menu" className="w-5 h-5 dark:invert opacity-70" />
            </button>
          )}

          <div className="relative flex-1 max-w-[240px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-muted-foreground">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              className="w-full bg-muted/50 border border-border/40 rounded-lg py-1.5 pl-8 pr-10 text-[13px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring/40 transition-all placeholder:text-muted-foreground/40"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <kbd className="inline-flex items-center gap-0.5 rounded bg-muted/60 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground/60 border border-border/30">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </div>
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                {searchResults.map((r) => (
                  <Link 
                    key={r.name} 
                    href={`/${r.category === 'components' ? 'components' : r.category}/${r.type}/${r.name}`} 
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted transition-colors border-b border-border/20 last:border-0"
                  >
                    <img src={r.imageUrl || "/assets/preview.png"} alt={r.displayName} className="w-9 h-6 rounded object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-foreground truncate">{r.displayName}</p>
                      <p className="text-[11px] text-muted-foreground uppercase">{r.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link 
            href="https://github.com/t7labs/t7blocks" 
            target="_blank" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-muted/20 hover:bg-muted text-[12px] font-medium transition-all"
          >
            <img src="/SVG/github.svg" alt="Github" className="w-3.5 h-3.5 text-muted-foreground" />
            
            {stars !== null && (
              <span className="flex items-center gap-1 pl-1.5 ml-1 border-l border-border/40 text-muted-foreground text-[11px] font-semibold">
                ★ {stars > 999 ? (stars / 1000).toFixed(1) + "k" : stars}
              </span>
            )}
          </Link>

          {mounted && (
            <button 
              onClick={toggleTheme} 
              className={`relative w-9 h-[22px] rounded-full flex items-center px-0.5 transition-colors duration-300 ${isDark ? "bg-accent/70" : "bg-border"}`}
            >
              <div className={`w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all duration-300 ${isDark ? "translate-x-[14px]" : "translate-x-0"}`} />
            </button>
          )}

          <div className="relative group cursor-pointer">
            <div className="w-7 h-7 rounded-full border border-border/50 flex items-center justify-center bg-muted/20 text-muted-foreground hover:text-foreground transition-all">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="absolute top-full right-0 mt-2 w-44 bg-card border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right scale-95 group-hover:scale-100 z-50">
              <div className="p-1 space-y-0.5">
                <Link href="/bookmarks" className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium text-foreground hover:bg-muted rounded-lg transition-colors">
                  <Bookmark className="w-3.5 h-3.5" /><span>Bookmarks</span>
                </Link>
                <a href={bugReportUrl} target="_blank" className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium text-foreground hover:bg-muted rounded-lg transition-colors">
                  <Bug className="w-3.5 h-3.5" /><span>Report bug</span>
                </a>
                <a href="https://github.com/sponsors/Ethan4582" target="_blank" className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium text-foreground hover:bg-muted rounded-lg transition-colors">
                  <Heart className="w-3.5 h-3.5 text-pink-500" /><span>Sponsor</span>
                </a>
              </div>
            </div>
          </div>

          <Link 
            href="/waitlist" 
            className="flex items-center gap-1.5 bg-foreground text-background px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
          >
            <Lock className="w-3.5 h-3.5" /><span>Get All-Access</span>
          </Link>
        </div>

        <button className="md:hidden p-1.5" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[49px] bg-background z-40 p-6 space-y-3 border-t border-border overflow-y-auto">
          <Link href="/gallery" className="block py-3 text-foreground font-medium border-b border-border/30" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <Link href="/bookmarks" className="block py-3 text-foreground font-medium border-b border-border/30" onClick={() => setMobileMenuOpen(false)}>Bookmarks</Link>
          <a href={bugReportUrl} target="_blank" className="block py-3 text-foreground font-medium border-b border-border/30">Report Bug</a>
          <a href="https://github.com/sponsors/Ethan4582" target="_blank" className="block py-3 text-foreground font-medium border-b border-border/30">Sponsor</a>
          <Link href="/waitlist" className="block py-3 text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>Get All-Access</Link>
        </div>
      )}
    </>
  );
}
