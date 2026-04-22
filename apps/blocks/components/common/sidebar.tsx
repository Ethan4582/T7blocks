"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
} from "lucide-react";
import { useSidebar } from "@/components/common/sidebar-provider";
import { NAVIGATION_DATA } from "@/lib/sidebar/navigation";
import { trackNavIntent } from "@/lib/analytics/analytics";

import { NavItem } from "@/lib/sidebar/navigation";

function SidebarItem({ 
  item, 
  depth = 0,
  parentTitle
}: { 
  item: NavItem; 
  depth?: number;
  parentTitle?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpen: setSidebarOpen } = useSidebar();
  
  const itemId = item.title;
  const storageKey = `sidebar-state-${itemId}`;
  
  // Default to true for depth 0 (main sections) to avoid collapse flash
  const [internalIsOpen, setInternalIsOpen] = useState(depth === 0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem(storageKey);
      if (savedState !== null) {
        setInternalIsOpen(savedState === "true");
      }
    }
  }, [storageKey, depth]);
  
  const isCurrentlyOpen = internalIsOpen;

  const hasChildren = item.items && item.items.length > 0;
  
  const isSelected = pathname === item.href;

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      const newState = !internalIsOpen;
      setInternalIsOpen(newState);
      localStorage.setItem(storageKey, newState ? "true" : "false");
    }
    
    if (item.href) {
      trackNavIntent("sidebar", item.title, parentTitle);
      
      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
      
      if (!hasChildren && typeof window !== "undefined" && window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    }
  };

  return (
    <div className="space-y-0.5">
      <div className="group relative">
        <button
          onClick={handleClick}
          className={`
            w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200
            ${isSelected
              ? "bg-sidebar-hover text-sidebar-foreground shadow-sm"
              : "text-[#525252] dark:text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-hover/50"}
          `}
        >
          <div className="flex items-center gap-2.5">
            {item.icon && (
              <img 
                src={item.icon} 
                alt="" 
                className={`
                  w-[15px] h-[15px] shrink-0 transition-all 
                  dark:invert
                  ${isSelected ? "opacity-100 scale-110" : "opacity-70 group-hover:opacity-100 group-hover:scale-105"}
                `} 
              />
            )}
            <span className="flex-1 truncate">{item.title}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            {item.badge && (
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold text-white bg-[#f84131] tracking-wide leading-none">
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 opacity-40 ${isCurrentlyOpen ? "rotate-0" : "-rotate-90"}`}
              />
            )}
          </div>
        </button>
      </div>
      
      {isCurrentlyOpen && hasChildren && item.items && (
        <div className="relative ml-[19px] mt-1 mb-1 space-y-0.5 border-l-[1.5px] border-muted-foreground/40 pl-4">
          {item.items.map((subItem, idx) => (
            <SidebarItem 
              key={`${subItem.title}-${idx}`} 
              item={subItem} 
              depth={depth + 1} 
              parentTitle={item.title}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const { isOpen, isCollapsed, toggleCollapsed, setOpen } = useSidebar();
  const pathname = usePathname();

  if (!isOpen) return null;


  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-[200] flex flex-col
          bg-sidebar border-r border-border/40 
          rounded-none
          transition-all duration-375 ease-in-out
          w-[250px]
          ${(isOpen && !isCollapsed) ? "translate-x-0" : "-translate-x-full"}
        `}
      >
     
        <div className="pl-5 pr-4 pt-4 pb-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 active:scale-95 transition-transform group" onClick={() => setOpen(false)}>
            <div className="relative">
              <img
                src="/assets/logo.png"
                alt="T7"
                className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105 rounded-[8px] border border-border/10"
              />
            </div>
            <span 
              className="font-display font-medium text-[22px] tracking-tight text-sidebar-foreground uppercase pt-0.5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Blocks
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleCollapsed}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-hover transition-colors"
              title="Collapse sidebar"
            >
                <img src="/SVG/sidebar.svg" className="w-[18px] h-[18px] dark:invert opacity-60" alt="Toggle" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-hover transition-colors"
            >
              <img src="/SVG/X1.svg" className="w-[12px] h-[12px] dark:invert opacity-60" alt="Close" />
            </button>
          </div>
        </div>

       
        <div className="flex-1 overflow-y-auto px-1 space-y-7 pb-10 scrollbar-none">
          {NAVIGATION_DATA.map((section, sIdx) => (
            <div key={section.title || `section-${sIdx}`} className="space-y-2.5">
            
              {section.title && (
                <h4 className="px-4 text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#404040] dark:text-white">
                  {section.title}
                </h4>
              )}

         
              <div className="px-1 space-y-0.5">
                {section.items.map((item, iIdx) => (
                  <SidebarItem 
                    key={`${item.title}-${iIdx}`} 
                    item={item} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
