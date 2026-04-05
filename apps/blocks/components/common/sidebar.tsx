"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, 
  X,
  SquareTerminal,
} from "lucide-react";
import { useSidebar } from "@/components/common/sidebar-provider";
import { useTheme } from "@/components/common/theme-provider";
import { NAVIGATION_DATA } from "@/lib/sidebar/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, isCollapsed, toggleCollapsed, setOpen } = useSidebar();
  const { theme } = useTheme();
  
  const [openAccordions, setOpenAccordions] = useState<string[]>(["Component", "Hero", "Background"]);

  const toggleAccordion = (title: string) => {
    setOpenAccordions((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      <aside 
        className={`
          fixed left-3 top-3 bottom-3 z-[60] flex flex-col
          bg-sidebar border border-border/40 rounded-2xl
          transition-all duration-375 ease-in-out
          w-[260px]
          ${isOpen && !isCollapsed ? "translate-x-0" : "-translate-x-[calc(100%+24px)]"}
          shadow-xl
        `}
      >
        {/* Logo + Close */}
        <div className="pl-3.5 pr-5 pt-6 pb-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 active:scale-95 transition-transform group">
            <img 
              src="/assets/logo.png" 
              alt="T7" 
              className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <span className="font-bold text-[17px] tracking-tight text-sidebar-foreground">
              Block
            </span>
          </Link>
          
          <div className="flex items-center gap-1.5">
            <button 
              onClick={toggleCollapsed}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-hover transition-colors"
              title="Collapse sidebar"
            >
              <img src="/SVG/sidebar.svg" className="w-[18px] h-[18px] dark:invert opacity-70" alt="Toggle" />
            </button>
            <button 
              onClick={() => setOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-hover transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto pl-2 pr-3 custom-scrollbar space-y-5 pb-6">
          {NAVIGATION_DATA.map((section) => (
            <div key={section.title || "library"}>
              {/* Section label */}
              {section.title && (
                <h4 className="px-3 mb-2 text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/60">
                  {section.title}
                </h4>
              )}

              {/* Items */}
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <div key={item.title}>
                    {"href" in item ? (
                      /* Direct Link Item */
                      <Link
                        href={item.href}
                        className={`
                          flex items-center gap-3 pl-2 pr-3 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-150
                          ${pathname === item.href 
                            ? "bg-sidebar-hover text-sidebar-foreground shadow-sm" 
                            : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-hover/40"}
                        `}
                      >
                        {item.icon === "SquareTerminal" ? (
                          <SquareTerminal className={`w-[16px] h-[16px] shrink-0 ${pathname === item.href ? "opacity-100" : "opacity-60"}`} />
                        ) : (
                          item.icon && <img src={item.icon} alt="" className={`w-[16px] h-[16px] shrink-0 dark:invert ${pathname === item.href ? "opacity-100" : "opacity-60"}`} />
                        )}
                        <span className="flex-1 truncate">{item.title}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold text-white bg-[#f84131] tracking-wide leading-none">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ) : (
                      /* Accordion Item */
                      <div className="space-y-0.5">
                        <button
                          onClick={() => toggleAccordion(item.title)}
                          className={`
                            w-full flex items-center justify-between pl-2 pr-3 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-150
                            text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-hover/40
                          `}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && <img src={item.icon} alt="" className="w-[16px] h-[16px] opacity-60 dark:invert" />}
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown 
                            size={14}
                            className={`transition-transform duration-200 opacity-50 ${
                              openAccordions.includes(item.title) ? "rotate-0" : "-rotate-90"
                            }`} 
                          />
                        </button>
                        {openAccordions.includes(item.title) && (
                          <div className="relative pl-[18px] mt-1 mb-2 space-y-0.5">
                            <div className="absolute left-[22px] top-0 bottom-2 w-px bg-border/60" aria-hidden="true" />
                            {item.items.map((subItem: any) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className={`
                                  flex items-center pl-5 pr-3 py-[7px] text-[13px] rounded-lg transition-colors duration-150
                                  ${pathname === subItem.href 
                                    ? "text-sidebar-foreground font-medium bg-sidebar-hover/50" 
                                    : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-hover/30"}
                                `}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(128, 128, 128, 0.12);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(128, 128, 128, 0.25);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </>
  );
}
