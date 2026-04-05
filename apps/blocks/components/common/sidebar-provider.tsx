"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sync state or persist it if needed
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
