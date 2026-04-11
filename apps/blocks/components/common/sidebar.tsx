"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  X,
  SquareTerminal,
  Lock,
} from "lucide-react";
import { useSidebar } from "@/components/common/sidebar-provider";
import { useTheme } from "@/components/common/theme-provider";
import { NAVIGATION_DATA } from "@/lib/sidebar/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, isCollapsed, toggleCollapsed, setOpen } = useSidebar();
  const { theme } = useTheme();

  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  // Initialize accordions based on current path
  useEffect(() => {
    const activeAccordions: string[] = [];
    NAVIGATION_DATA.forEach(section => {
      section.items.forEach((item: any) => {
        if (!item.href && item.items) {
          const isChildActive = item.items.some((sub: any) => pathname === sub.href);
          if (isChildActive || (item.href && pathname === item.href)) {
            activeAccordions.push(item.title);
          }
        }
      });
    });
    if (activeAccordions.length > 0) {
      setOpenAccordions(prev => Array.from(new Set([...prev, ...activeAccordions])));
    }
  }, [pathname]);

  const handleAccordionClick = (item: any) => {
    // Toggle accordion
    setOpenAccordions((prev) =>
      prev.includes(item.title) ? prev.filter((t) => t !== item.title) : [...prev, item.title]
    );

    // Route if href is provided
    if (item.href && !item.isLocked) {
      router.push(item.href);
    }
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
          bg-sidebar border border-border/40 
          rounded-[10px]
          transition-all duration-375 ease-in-out
          w-[260px]
          ${isOpen && !isCollapsed ? "translate-x-0" : "-translate-x-[calc(100%+24px)]"}
          shadow-xl
        `}
      >
        {/* Logo + Close */}
        <div className="pl-4 pr-4 pt-6 pb-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 active:scale-95 transition-transform group" onClick={() => setOpen(false)}>
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
        <div className="flex-1 overflow-y-auto pl-1 pr-2 space-y-5 pb-8 scrollbar-none">
          {NAVIGATION_DATA.map((section, sIdx) => (
            <div key={section.title || `section-${sIdx}`} className="pt-2">
              {/* Section label */}
              {section.title && (
                <h4 className="px-3 mb-3 text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/60">
                  {section.title}
                </h4>
              )}

              {/* Items */}
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <div key={item.title}>
                    {"href" in item && !("items" in item) ? (
                      /* Direct Link Item */
                      <Link
                        href={item.href}
                        target={(item as any).external ? "_blank" : undefined}
                        rel={(item as any).external ? "noopener noreferrer" : undefined}
                        onClick={() => {
                          if (!(item as any).external) {
                            if (typeof window !== "undefined" && window.innerWidth < 768) {
                              setOpen(false);
                            }
                          }
                        }}
                        className={`
                          flex items-center gap-3 pl-2 pr-3 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-150
                          ${pathname === item.href
                            ? "bg-sidebar-hover text-sidebar-foreground shadow-sm"
                            : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-hover/40"}
                        `}
                      >
                        {item.icon && <img src={item.icon} alt="" className={`w-[16px] h-[16px] shrink-0 dark:invert ${pathname === item.href ? "opacity-100" : "opacity-60"}`} />}
                        <span className="flex-1 truncate">{item.title}</span>
                        {(item as any).badge && (
                          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold text-white bg-[#f84131] tracking-wide leading-none">
                            {(item as any).badge}
                          </span>
                        )}
                      </Link>
                    ) : (
                      /* Accordion Item */
                      <div className="space-y-0.5">
                        <button
                          onClick={() => handleAccordionClick(item)}
                          className={`
                            w-full flex items-center justify-between pl-2 pr-3 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-150
                            ${(item as any).href && pathname === (item as any).href
                              ? "bg-sidebar-hover text-sidebar-foreground shadow-sm"
                              : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-hover/40"}
                          `}
                        >
                          <div className="flex items-center gap-3">
                            {(item as any).icon && <img src={(item as any).icon} alt="" className={`w-[16px] h-[16px] dark:invert ${openAccordions.includes(item.title) ? "opacity-100" : "opacity-60"}`} />}
                            <span>{item.title}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ChevronDown
                              size={14}
                              className={`transition-transform duration-200 opacity-50 ${openAccordions.includes(item.title) ? "rotate-0" : "-rotate-90"
                                }`}
                            />
                          </div>
                        </button>
                        {openAccordions.includes(item.title) && (item as any).items?.length > 0 && (
                          <div className="relative pl-[18px] mt-1 mb-2 space-y-0.5">
                            <div className="absolute left-[22px] top-0 bottom-2 w-px bg-border/60" aria-hidden="true" />
                            {(item as any).items.map((subItem: any) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                target={subItem.external ? "_blank" : undefined}
                                rel={subItem.external ? "noopener noreferrer" : undefined}
                                onClick={() => {
                                  if (!subItem.external) {
                                    if (typeof window !== "undefined" && window.innerWidth < 768) {
                                      setOpen(false);
                                    }
                                  }
                                }}
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
    </>
  );
}
