"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SidebarContextValue {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleOpen: () => void;
  toggleCollapsed: () => void;
  setOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = pathname === "/" || pathname === "/templates";
  const [isOpen, setIsOpen] = useState(!isStandalone);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sync state on route change
  useEffect(() => {
    const isStandalone = pathname === "/" || pathname === "/templates";
    if (isStandalone) {
      setIsOpen(false);
    } else if (typeof window !== "undefined" && window.innerWidth >= 768) {
      // Auto-open on desktop when moving to a component page
      setIsOpen(true);
    }
  }, [pathname]);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const toggleCollapsed = () => setIsCollapsed((prev) => !prev);
  const setOpen = (val: boolean) => setIsOpen(val);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isCollapsed,
        toggleOpen,
        toggleCollapsed,
        setOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
