import Link from "next/link";
import { CanvasConfig } from "@/lib/gallery";

const DEFAULT_BG = "#EBEBEB";

export default function DemoCanvas({ 
  children, 
  blockUrl,
  canvasConfig
}: { 
  children: React.ReactNode;
  blockUrl?: string;
  canvasConfig?: CanvasConfig;
}) {
  const { 
    background = DEFAULT_BG, 
    width = "100%", 
    height = "100vh", 
    className = "" 
  } = canvasConfig || {};

  return (
    <div 
      className={`relative flex items-center justify-center overflow-hidden transition-all duration-500 font-sans ${className}`}
      style={{ 
        backgroundColor: background,
        minHeight: height,
        width: width,
      }}
    >
      <div className="absolute top-8 left-8 z-50">
        <Link
          href="/gallery"
          className="glass-button flex items-center gap-2 rounded-xl px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white/90 shadow-2xl"
        >
          <span>Gallery</span>
        </Link>
      </div>

      {blockUrl && (
        <div className="absolute top-8 right-8 z-50">
          <Link
            href={blockUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button flex items-center gap-2 rounded-xl px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white/90 shadow-2xl"
          >
            <span>View Code</span>
          </Link>
        </div>
      )}

      {canvasConfig?.infoCard && (
        <div className="absolute bottom-8 right-8 z-50 w-[240px] rounded-2xl p-4 glass-panel">
          <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">Technical Highlights</h4>
          <p className="text-[11px] leading-relaxed text-white/60 font-mono">
            {canvasConfig.infoCard}
          </p>
        </div>
      )}
      
      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}