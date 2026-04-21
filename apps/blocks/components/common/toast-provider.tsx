"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Toast {
  id: number;
  message: string;
}

interface ToastContextType {
  showToast: (message: string) => void;
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

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => removeToast(id), 2500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="flex items-center bg-[#1a1a1a] dark:bg-[#121212] border border-white/5 rounded-2xl p-3 min-w-[280px] shadow-2xl pointer-events-auto"
            >
              <div className="flex items-center justify-center pl-1 pr-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#A1FF62]">
                  <Check className="w-3.5 h-3.5 text-[#A1FF62]" strokeWidth={3} />
                </div>
              </div>

              <div className="w-[1px] h-8 bg-white/10" />

              <div className="flex-1 pl-6 pr-4">
                <p className="text-[13px] font-medium text-white tracking-tight">
                  {toast.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
