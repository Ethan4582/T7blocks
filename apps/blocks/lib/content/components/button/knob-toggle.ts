export const componentCode=`"use client";

import { useEffect, useRef, useState } from "react";

type SwitchToggleProps = {
  className?: string;
  defaultChecked?: boolean;
  primaryColor?: string;
  soundSrc?: string;
  onChange?: (state: boolean) => void;
};

export default function KnobToggle({
  className = "",
  defaultChecked = false,
  primaryColor = "#0037ffff",
  soundSrc,
  onChange,
}: SwitchToggleProps) {
  const [isOn, setIsOn] = useState(defaultChecked);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Sync with initial theme
    const isDark = document.documentElement.classList.contains("dark");
    setIsOn(isDark);
    
    if (soundSrc) audioRef.current = new Audio(soundSrc);
  }, [soundSrc]);

  const toggle = () => {
    const next = !isOn;
    setIsOn(next);
    
    // Toggle dark mode
    document.documentElement.classList.toggle("dark", next);
    
    onChange?.(next);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <button
      onClick={toggle}
       className={\`relative w-28 h-14 rounded-full transition-all duration-300 shadow-inner \${className}\`}
      style={{
        background: isOn ? primaryColor : "#d4d4d4",
      }}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
        style={{
          left: isOn ? "32px" : "calc(100% - 46px)", 
        }}
      >
        {isOn ? (
          <div className="w-[3px] h-6 bg-white rounded" />
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-white/60" />
        )}
      </div>

    
      <div
        className="absolute w-12 h-12 rounded-full bg-gray-200 shadow-md transition-all duration-300"
        style={{
          top: "4px",
          left: isOn ? "calc(100% - 52px)" : "4px",
        }}
      />
    </button>
  );
}
`

export const propsTable =`
| Property       | Type    | Default        | Description                                                           |
|----------------|---------|----------------|-----------------------------------------------------------------------|
| className      | string  | ""             | Additional CSS classes for the button                                 |
| defaultChecked | boolean | false          | Initial checked state of the toggle                                   |
| primaryColor   | string  | "#0037ffff"  | The color of the toggle when checked                                  |
| soundSrc       | string  | undefined      | URL to an audio file to play when toggled                             |
`


export const instructions=`
1. Add the KnobToggle component to your layout.tsx file.
2. update the bgLight and bgDark props to your desired colors.
3. add root and root.dark class to your global.css file.
`
export const setupCode1 =`
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=\`$\{geistSans.variable} $\{geistMono.variable} antialiased\`
      >
        {children}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <KnobToggle />
        </div>
      </body>
    </html>
  );
}
`

export const setupCode2 =`
:root {
  --background: #ffffff;
  --foreground: #171717;
}

:root.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}
`
