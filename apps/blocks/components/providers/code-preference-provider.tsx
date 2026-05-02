"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type CodePreference = "jsx" | "tsx";

interface CodePreferenceContextType {
  preference: CodePreference;
  setPreference: (pref: CodePreference) => void;
}

const CodePreferenceContext = createContext<CodePreferenceContextType | undefined>(undefined);

export function CodePreferenceProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<CodePreference>("jsx");

  useEffect(() => {
    const saved = localStorage.getItem("code-preference") as CodePreference;
    if (saved && (saved === "jsx" || saved === "tsx")) {
      setPreference(saved);
    }
  }, []);

  const handleSetPreference = (pref: CodePreference) => {
    setPreference(pref);
    localStorage.setItem("code-preference", pref);
  };

  return (
    <CodePreferenceContext.Provider value={{ preference, setPreference: handleSetPreference }}>
      {children}
    </CodePreferenceContext.Provider>
  );
}

export function useCodePreference() {
  const context = useContext(CodePreferenceContext);
  if (context === undefined) {
    throw new Error("useCodePreference must be used within a CodePreferenceProvider");
  }
  return context;
}
