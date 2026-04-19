"use client";

import { useEffect, useState } from "react";
import { KnobToggle } from "@t7blocks/ui";


export default function KnobToggleDemo(props: any) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
  
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const background = isDark ? '#09090b' : '#f8fafc';

  return (
    <div 
      className="relative w-full h-full min-h-screen flex flex-col items-center justify-center transition-colors duration-500"
      style={{ backgroundColor: background }}
    >
      <div className="relative z-10 scale-75 md:scale-100">
        <KnobToggle {...props} />
      </div>
      
      <div className="absolute bottom-12 text-center pointer-events-none select-none">
        <p className={`text-xs font-medium tracking-widest uppercase opacity-20 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>
          Switch theme
        </p>
      </div>
    </div>
  );
}
