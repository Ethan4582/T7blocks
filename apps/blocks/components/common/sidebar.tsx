"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  X,
} from "lucide-react";
import { useSidebar } from "@/components/common/sidebar-provider";
import { NAVIGATION_DATA } from "@/lib/sidebar/navigation";

function SidebarItem({ 
  item, 
  depth = 0, 
  openId, 
  setOpenId 
}: { 
  item: any; 
  depth?: number;
  openId?: string | null;
  setOpenId?: (id: string | null) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpen: setSidebarOpen } = useSidebar();
  
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const itemId = item.title;
  
  // If setOpenId is provided (usually level 0), use that for exclusivity
  // Otherwise use internal state (for nested dropdowns)
  const isCurrentlyOpen = setOpenId && openId !== undefined ? openId === itemId : internalIsOpen;

  // Auto-open if a child is active
  useEffect(() => {
    const isAnyChildActive = (items: any[]): boolean => {
      return items?.some((sub: any) => 
        pathname === sub.href || (sub.items && isAnyChildActive(sub.items))
      );
    };
    
    if (item.items && isAnyChildActive(item.items)) {
      if (setOpenId) setOpenId(itemId);
      else setInternalIsOpen(true);
    }
  }, [pathname, item.items, itemId, setOpenId]);

  const hasChildren = item.items && item.items.length > 0;
  
  // Strict active check - only one item should be highlighted at a time
  const isSelected = pathname === item.href;

  const handleClick = (e: React.MouseEvent) => {
    // Toggle dropdown if children exist
    if (hasChildren) {
      if (setOpenId) {
        setOpenId(isCurrentlyOpen ? null : itemId);
      } else {
        setInternalIsOpen(!internalIsOpen);
      }
    }
    
    // Navigate if href exists
    if (item.href && !item.isLocked) {
      router.push(item.href);
      
      // Close sidebar on mobile
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
              : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-hover/50"}
          `}
        >
          <div className="flex items-center gap-2.5">
            {item.icon && (
              <img 
                src={item.icon} 
                alt="" 
                className={`
                  w-[15px] h-[15px] shrink-0 transition-all 
                  dark:brightness-0 dark:invert
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
      
      {isCurrentlyOpen && hasChildren && (
        <div className="relative ml-[19px] mt-1 mb-1 space-y-0.5 border-l-[1.5px] border-muted-foreground/40 pl-4">
          {item.items.map((subItem: any, idx: number) => (
            <SidebarItem 
              key={`${subItem.title}-${idx}`} 
              item={subItem} 
              depth={depth + 1} 
              // Don't pass openId/setOpenId down to let children manage their own state
              // This fixes the issue where nested items couldn't expand.
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const { isOpen, toggleCollapsed, setOpen } = useSidebar();
  const [openId, setOpenId] = useState<string | null>(null);

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
          rounded-[12px]
          transition-all duration-375 ease-in-out
          w-[250px]
          ${isOpen ? "translate-x-0" : "-translate-x-[calc(100%+24px)]"}
        `}
      >
        {/* Logo + Close */}
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
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-1 group space-y-7 pb-10 scrollbar-none">
          {NAVIGATION_DATA.map((section, sIdx) => (
            <div key={section.title || `section-${sIdx}`} className="space-y-2.5">
              {/* Section label */}
              {section.title && (
                <h4 className="px-4 text-[10px] font-extrabold tracking-[0.2em] uppercase text-white">
                  {section.title}
                </h4>
              )}

              {/* Items */}
              <div className="px-1 space-y-0.5">
                {section.items.map((item, iIdx) => (
                  <SidebarItem 
                    key={`${item.title}-${iIdx}`} 
                    item={item} 
                    openId={openId}
                    setOpenId={setOpenId}
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
