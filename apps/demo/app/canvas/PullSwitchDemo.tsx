"use client";

import { useEffect, useState } from "react";
import { PullSwitch } from "@t7blocks/ui";

export default function PullSwitchDemo(props: any) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Sync local state with global theme class
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  // Use values from props (synced with the Prop Card) or fall back to theme defaults
  const background = isDark 
    ? (props.bgDark || '#1a1a1a') 
    : (props.bgLight || '#f5f5f5');

  const textColor = isDark ? '#ffffff' : '#7b0808ff';
 
  return (
    <div 
      className="relative w-full h-full min-h-screen flex flex-col items-center justify-center transition-colors duration-1000"
      style={{ backgroundColor: background }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h2 
          className="instrument-serif text-4xl md:text-8xl font-black tracking-tighter transition-all duration-1000 italic"
          style={{ 
            color: textColor,
          }}
        >
          PULL TO SWITCH
        </h2>
      </div>

      <div className="absolute top-0 right-0 z-20">
        <PullSwitch 
          {...props}
          className={`!relative pointer-events-auto ${props.className || ""}`}
        />
      </div>
    </div>
  );
}




