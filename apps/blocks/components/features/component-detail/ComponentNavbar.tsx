"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search, Lock, Command, Bookmark, Bug, Heart, Menu, X
} from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useSidebar } from "@/components/providers/sidebar-provider";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics/analytics";
import { KnobToggle } from "@/components/ui/button/KnobToggle";
import Image from "next/image";
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
      <header className="flex justify-between items-center px-2.5 md:px-8 py-2.5 sticky top-0 bg-background/80 backdrop-blur-md z-[100] border-b border-border/40">
        <div className="flex items-center gap-3 flex-1 max-w-[280px]">
          {isCollapsed && (
            <button
              onClick={toggleCollapsed}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 group/toggle"
              aria-label="Expand Sidebar"
            >
              <img 
                src="/logo.png" 
                alt="Menu" 
                className="w-[20px] h-[20px] transition-transform duration-500 group-hover/toggle:rotate-[360deg] object-contain" 
              />
            </button>
          )}

          <div
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, metaKey: true }));
            }}
            className="flex-1 max-w-[210px] cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-muted-foreground">
                <Search className="w-3.5 h-3.5" />
              </div>
              <div className="w-full bg-muted/50 border border-border/40 rounded-lg py-2 pl-8 pr-10 text-[13px] text-muted-foreground/40 transition-all select-none">
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
            className="flex items-center gap-2.5 px-3 h-9 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted transition-all shrink-0 group"
          >
            <img src="/SVG/github.svg" alt="GitHub" className="w-4 h-4 dark:invert opacity-80 group-hover:opacity-100 transition-opacity" />
            {stars !== null && (
              <span className="text-[13px] font-bold text-foreground dark:text-[#A1FF62]">
                {stars > 999 ? (stars / 1000).toFixed(1) + "K" : stars}
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
            <div className="w-9 h-9  rounded-lg flex items-center justify-center bg-muted/20 text-muted-foreground group-hover:bg-muted group-hover:text-foreground transition-all overflow-hidden">
              <Image width={24} height={24} src="/assets/profile.png" alt="User" className="w-6 h-6 dark:invert" />
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
            target="_blank"
            onClick={() => trackEvent(ANALYTICS_EVENTS.UPGRADE_CLICKED, { location: "navbar" })}
            className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-[11px] font-bold transition-all hover:opacity-90 active:scale-[0.98] shrink-0"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Claim Your Spot</span>
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
          <Link href="/waitlist" target="_blank" className="block py-3 text-foreground font-bold text-[#A1FF62]" onClick={() => setMobileMenuOpen(false)}>Claim Your Spot</Link>
        </div>
      )}
    </>
  );
}
