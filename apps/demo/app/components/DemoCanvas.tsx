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
      className={`relative flex items-center justify-center overflow-hidden transition-all duration-500 ${className}`}
      style={{ 
        backgroundColor: background,
        minHeight: height,
        width: width,
      }}
    >
      {blockUrl && (
        <div className="absolute top-8 right-8 z-50">
          <Link
            href={blockUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white/90 transition-all hover:bg-black/80 hover:border-white/20 hover:scale-[1.02] active:scale-95 shadow-2xl"
          >
            <span>View Code</span>
            <svg 
              className="h-3 w-3 opacity-40 transition-transform group-hover:translate-x-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}

      {/* Info Card - Bottom Right (Matches Customizer Theme) */}
      {canvasConfig?.infoCard && (
        <div className="absolute bottom-8 right-8 z-50 w-[240px] rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl transition-all hover:border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]">
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