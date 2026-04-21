"use client";

import { useEffect, useState } from "react";

type SwitchToggleProps = {
  className?: string;
  defaultChecked?: boolean;
  primaryColor?: string;
  onChange?: (state: boolean) => void;
};

export function KnobToggle({
  className = "",
  defaultChecked = false,
  primaryColor = "#A1FF62",
  onChange,
}: SwitchToggleProps) {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const toggle = () => {
    const next = !isOn;
    setIsOn(next);
    onChange?.(next);
  };

  return (
    <button
      onClick={toggle}
      className={`relative w-[48px] h-[24px] rounded-full transition-all duration-300 shadow-inner group ${className}`}
      style={{
        background: isOn ? primaryColor : "#2a2a2a",
      }}
    >
      {/* Track Inner Detail */}
      <div
      >
        {isOn ? (
          <div className="w-[1.5px] h-3 bg-black/40 rounded transition-opacity group-hover:opacity-100" />
        ) : (
          <div className="w-2.5 h-2.5 rounded-full border border-white/20" />
        )}
      </div>

      {/* Main Knob - More substantial capsule shape */}
      <div
        className="absolute w-[20px] h-[20px] rounded-full bg-white shadow-md transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
        style={{
          top: "2px",
          left: isOn ? "calc(100% - 22px)" : "2px",
        }}
      />
    </button>
  );
}