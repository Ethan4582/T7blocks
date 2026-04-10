"use client";

import { useState } from "react";
import { Copy, ChevronDown, Check } from "lucide-react";

interface InstallationHeaderProps {
  title: string;
  description: string;
}

export function InstallationHeader({ title, description }: InstallationHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // This is just a mock for now, but we could copy the MD content if passed
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-16">
      <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-8 text-white">
        {title}
      </h1>
      <p className="text-muted-foreground text-[19px] leading-relaxed mb-10 max-w-[650px] font-medium opacity-80">
        {description}
      </p>
      
   
    </div>
  );
}
