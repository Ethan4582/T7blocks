"use client";

import { useEffect, useState } from "react";

interface KnobToggleProps {
  defaultChecked?: boolean;
  onChange?: (state: boolean) => void;
  primaryColor?: string;
  className?: string;
}

export function KnobToggle({ 
  defaultChecked = true, 
  onChange, 
  primaryColor = "#22C55E", 
  className = "" 
}: KnobToggleProps) {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const handleToggle = () => {
    const next = !isOn;
    setIsOn(next);
    onChange?.(next);
  };

  return (
    <button
      onClick={handleToggle}
      className={`group relative w-[48px] h-[24px] rounded-full transition-all duration-300 ease-in-out outline-none shrink-0 shadow-inner ${className}`}
      style={{ 
        backgroundColor: isOn ? primaryColor : "#d4d4d4"
      }}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
        style={{
          left: isOn ? "12px" : "calc(100% - 20px)",
        }}
      >
        {isOn ? (
          <div className="w-[1.5px] h-3 bg-white/80 rounded" />
        ) : (
          <div className="w-2.5 h-2.5 rounded-full border border-white" />
        )}
      </div>

      <div
        className="absolute w-[20px] h-[20px] rounded-full bg-gray-100 shadow-md transition-all duration-300 ease-in-out pointer-events-none"
        style={{
          top: "2px",
          left: isOn ? "calc(100% - 22px)" : "2px",
        }}
      />
    </button>
  );
}