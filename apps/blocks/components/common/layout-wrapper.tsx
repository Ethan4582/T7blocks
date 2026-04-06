"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/common/sidebar";
import { useSidebar } from "@/components/common/sidebar-provider";
import { ComponentNavbar } from "@/components/component-detail/ComponentNavbar";
import React from "react";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();
  
  // Standalone pages that don't need the sidebar or header (e.g. landing page or focused templates)
  const isStandalone = pathname === "/" || pathname === "/templates";

  if (isStandalone) {
    return (
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-background text-foreground transition-colors duration-300">
        {children}
      </main>
    );
  }

  // Width of sidebar is 260px. Edge-to-edge transition handled by LayoutWrapper.
  const offset = !isCollapsed ? "md:ml-[260px]" : "ml-0";

  return (
    <>
      <Sidebar />
      <main 
        className={`
          flex-1 w-full md:w-auto flex flex-col transition-all duration-375 ease-in-out
          ${offset}
          min-h-screen bg-background text-foreground
        `}
      >
        {/* Centralized High-Fidelity Navbar */}
        <ComponentNavbar />

        {/* Content area: Clean, fluid layout with standard scroll */}
        <div className="flex-1 flex flex-col bg-background">
          {children}
        </div>
      </main>
    </>
  );
}
