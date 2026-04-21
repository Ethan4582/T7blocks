"use client";

import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme | undefined;
  toggleTheme: () => void;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="t7-theme"
    >
      <ThemeContent>{children}</ThemeContent>
    </NextThemesProvider>
  );
}

function ThemeContent({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    const currentTheme = theme === "system" ? resolvedTheme : theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }, [theme, resolvedTheme, setTheme]);

  // Use resolvedTheme when 'system' is active to keep components in sync
  const currentTheme = (mounted ? (theme === "system" ? resolvedTheme : theme) : "dark") as Theme;

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
