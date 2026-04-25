"use client";

import Link from "next/link";

interface DocsInstallationCardProps {
  title: string;
  light: string;
  dark: string;
  url: string;
}

export function DocsInstallationCard({ title, light, dark, url }: DocsInstallationCardProps) {
  return (
    <Link 
      href={url}
      className="group relative flex flex-col items-center justify-center p-6 bg-card border border-border/40 rounded-2xl hover:bg-neutral-50 dark:hover:bg-white/[0.06] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden"
    >
      <div className="relative w-12 h-12 mb-4 flex items-center justify-center">
        <img 
          src={light} 
          alt={title} 
          className="w-full h-full object-contain dark:hidden group-hover:scale-110 transition-transform" 
        />
        <img 
          src={dark} 
          alt={title} 
          className="w-full h-full object-contain hidden dark:block group-hover:scale-110 transition-transform" 
        />
      </div>
      <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Link>
  );
}
