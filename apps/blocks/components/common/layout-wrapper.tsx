"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/common/sidebar";
import { useSidebar } from "@/components/common/sidebar-provider";
import { Menu } from "lucide-react";
import React from "react";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isOpen, isCollapsed, setOpen } = useSidebar();
  const isStandalone = pathname === "/" || pathname === "/waitlist" || pathname === "/templates";

  if (isStandalone) {
    return (
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {children}
      </main>
    );
  }

  // Restore sidebar offset from previous design (260px width)
  // With the new floating sidebar (left-3), we need to shift the main content by 260 + 24 (edge spacing)
  const offset = isOpen && !isCollapsed ? "md:ml-[284px]" : "ml-0";

  return (
    <>
      <Sidebar />
      <main 
        className={`
          flex-1 w-full md:w-auto flex flex-col transition-all duration-375 ease-in-out
          ${offset}
          min-h-screen
        `}
      >
        {/* Mobile Header Trigger */}
        <header className="flex md:hidden items-center px-4 h-14 border-b border-border bg-background sticky top-0 z-50">
          <button 
            onClick={() => setOpen(true)}
            className="p-2 -ml-2 text-muted-foreground"
          >
            <Menu size={20} />
          </button>
          <span className="ml-2 font-bold text-sm tracking-tight text-foreground">T7block</span>
        </header>

        {/* Content area: original edge-to-edge layout restored (Task: Roll back page-level padding) */}
        <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
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
      `}</style>
    </>
  );
}
