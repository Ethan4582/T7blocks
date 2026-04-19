"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Check, Info } from "lucide-react";

interface Toast {
  id: number;
  message: string;
  type?: "success" | "info";
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: "success" | "info" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-4 px-5 py-3.5 bg-[#0D0D0D] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-right-10 fade-in duration-500 pointer-events-auto min-w-[240px] backdrop-blur-xl"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${toast.type === 'success' ? 'bg-[#A1FF62]/10' : 'bg-blue-500/10'}`}>
              {toast.type === 'success' ? (
                <Check className="w-4 h-4 text-[#A1FF62]" />
              ) : (
                <Info className="w-4 h-4 text-theme-accent" />
              )}
            </div>
            <div className="flex flex-col gap-0.5">
               <p className="text-[14px] font-semibold text-foreground leading-tight tracking-tight">
                 {toast.message}
               </p>
               <p className="text-[11px] text-[#A1FF62] font-black uppercase tracking-[0.05em] opacity-80">
                 Copied to clipboard
               </p>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
