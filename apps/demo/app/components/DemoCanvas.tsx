import Link from "next/link";

export default function DemoCanvas({ 
  children, 
  blockUrl 
}: { 
  children: React.ReactNode;
  blockUrl?: string;
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      {blockUrl && (
        <div className="absolute top-8 right-8 z-50">
          <Link
            href={blockUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white/70 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <span>View Code</span>
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </div>
      )}
      {children}
    </div>
  );
}