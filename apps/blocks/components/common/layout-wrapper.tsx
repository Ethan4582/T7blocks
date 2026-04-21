"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/common/sidebar";
import { useSidebar } from "@/components/common/sidebar-provider";
import { ComponentNavbar } from "@/components/component-detail/ComponentNavbar";
import { SearchModal } from "@/components/common/search-modal";
import React from "react";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();
  
  const isStandalone = pathname === "/" || pathname === "/templates";

  if (isStandalone) {
    return (
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto text-foreground transition-colors duration-300">
        {children}
      </main>
    );
  }

  const offset = !isCollapsed ? "md:ml-[250px]" : "ml-0";

  const segments = pathname.split('/').filter(Boolean);
  const isComponentDetail = 
    pathname.startsWith("/components/") || 
    (pathname.startsWith("/hero/") && segments.length > 2);
  

  return (
    <>
      <Sidebar />
      <SearchModal />
      <main 
        className={`
          flex-1 flex flex-col transition-all duration-375 ease-in-out
          ${offset}
          ${isComponentDetail ? "h-screen overflow-hidden" : "min-h-screen"}
          text-foreground min-w-0
        `}
      >
        <ComponentNavbar />

        <div className="flex-1 flex flex-col px-6 md:px-10 lg:pl-[72px] lg:pr-[12px]">
          {children}
        </div>
      </main>
    </>
  );
}
