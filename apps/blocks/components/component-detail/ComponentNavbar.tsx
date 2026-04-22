"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search, Lock, Command, Bookmark, Bug, Heart, User, Menu, X
} from "lucide-react";
import { useTheme } from "@/components/common/theme-provider";
import { useSidebar } from "@/components/common/sidebar-provider";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics/analytics";
import { KnobToggle } from "@/components/common/KnobToggle";

interface ComponentNavbarProps {
  bugReportUrl?: string;
}

export function ComponentNavbar({ bugReportUrl = "https://github.com/Ethan4582/T7blocks/issues" }: ComponentNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { isCollapsed, toggleCollapsed } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
    fetch("https://api.github.com/repos/Ethan4582/T7blocks")
      .then((r) => r.json())
      .then((d) => { if (d.stargazers_count !== undefined) setStars(d.stargazers_count); })
      .catch(() => setStars(24));
  }, []);

  return (
    <>
      <header className="flex justify-between items-center px-4 md:px-10 py-3 sticky top-0 bg-background/80 backdrop-blur-md z-[100] border-b border-border/40">
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

          <div
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, metaKey: true }));
            }}
            className="flex-1 max-w-[240px] cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-muted-foreground">
                <Search className="w-3.5 h-3.5" />
              </div>
              <div className="w-full bg-muted/50 border border-border/40 rounded-lg py-1.5 pl-8 pr-10 text-[13px] text-muted-foreground/40 transition-all select-none">
                Search...
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <kbd className="inline-flex items-center gap-0.5 rounded bg-muted/60 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground/60 border border-border/30">
                  <Command className="w-2.5 h-2.5" />K
                </kbd>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href="https://github.com/Ethan4582/T7blocks"
            target="_blank"
            onClick={() => trackEvent(ANALYTICS_EVENTS.SOCIAL_CLICKED, { platform: "github", location: "navbar" })}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-muted/20 hover:bg-muted text-muted-foreground hover:text-foreground transition-all group relative shrink-0"
            title={`GitHub Repository${stars ? ` (${stars})` : ''}`}
          >
            <img src="/SVG/github.svg" alt="GitHub" className="w-4 h-4 transition-colors" />
            {stars !== null && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#A1FF62] text-black text-[9px] font-black px-1.5 rounded-full border border-white dark:border-black py-0.5 scale-90 group-hover:scale-100 transition-transform">
                {stars > 999 ? (stars / 1000).toFixed(1) + "k" : stars}
              </span>
            )}
          </Link>

          {mounted && (
            <KnobToggle 
              defaultChecked={isDark} 
              onChange={toggleTheme}
              primaryColor="#A1FF62"
              className="shrink-0 scale-[0.9]"
            />
          )}

          <div className="relative group cursor-pointer h-9 px-1 flex items-center shrink-0">
            <div className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center bg-muted/20 text-muted-foreground group-hover:bg-muted group-hover:text-foreground group-hover:border-border transition-all overflow-hidden">
               <User className="w-4 h-4" />
            </div>
            <div className="absolute top-[calc(100%+4px)] right-0 w-44 bg-card border border-border/60 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 origin-top-right scale-95 group-hover:scale-100 z-50 overflow-hidden">
              <div className="p-1 space-y-0">
                <Link href="/bookmarks" className="flex items-center gap-2.5 px-3 py-1.5 text-[12px] font-medium text-foreground hover:bg-muted rounded transition-all">
                  <Bookmark className="w-3.5 h-3.5 text-theme-accent" />
                  <span>Bookmarks</span>
                </Link>
                <a href={bugReportUrl} target="_blank" className="flex items-center gap-2.5 px-3 py-1.5 text-[12px] font-medium text-foreground hover:bg-muted rounded transition-all">
                  <Bug className="w-3.5 h-3.5 text-rose-500" />
                  <span>Report bug</span>
                </a>
                <div className="mx-2 my-1 h-px bg-border/30" />
                <a href="https://github.com/sponsors/Ethan4582" target="_blank"
                  onClick={() => trackEvent(ANALYTICS_EVENTS.SOCIAL_CLICKED, { platform: "sponsor", location: "navbar" })}
                  className="flex items-center gap-2.5 px-3 py-1.5 text-[12px] font-medium text-foreground hover:bg-muted rounded transition-all">
                  <Heart className="w-3.5 h-3.5 text-pink-500" />
                  <span>Support Project</span>
                </a>
              </div>
            </div>
          </div>

          <Link
            href="/waitlist"
            onClick={() => trackEvent(ANALYTICS_EVENTS.UPGRADE_CLICKED, { location: "navbar" })}
            className="flex items-center gap-2 bg-foreground text-background px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all hover:opacity-90 active:scale-[0.98] shrink-0"
          >
            <Lock className="w-3 h-3" />
            <span>Get All-Access</span>
          </Link>
        </div>

        <button className="md:hidden p-1.5" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-background z-40 p-6 space-y-3 border-t border-border overflow-y-auto animate-in slide-in-from-top-5 duration-300">
          <Link href="/gallery" className="block py-3 text-foreground font-medium border-b border-border/30" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <Link href="/bookmarks" className="block py-3 text-foreground font-medium border-b border-border/30" onClick={() => setMobileMenuOpen(false)}>Bookmarks</Link>
          <a href={bugReportUrl} target="_blank" className="block py-3 text-foreground font-medium border-b border-border/30">Report Bug</a>
          <a href="https://github.com/sponsors/Ethan4582" target="_blank" className="block py-3 text-foreground font-medium border-b border-border/30">Sponsor</a>
          <Link href="/waitlist" className="block py-3 text-foreground font-bold text-[#A1FF62]" onClick={() => setMobileMenuOpen(false)}>Get All-Access</Link>
        </div>
      )}
    </>
  );
}
