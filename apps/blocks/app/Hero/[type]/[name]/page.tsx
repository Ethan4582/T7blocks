import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ type: string; name: string }> };

export function generateStaticParams() {
  return registry
    .filter((c) => c.category === "hero")
    .map((c) => ({
      type: c.type,
      name: c.name,
    }));
}

export default async function HeroPage({ params }: Props) {
  const { type, name } = await params;
  
  const entry = registry.find(
    (c) => c.category === "hero" && c.type === type && c.name === name
  );

  if (!entry) return notFound();

  // Dynamically import the content based on type and name
  // This expects lib/content/hero/[type]/[name].ts to exist
  let allContent;
  try {
    allContent = await import(`@/lib/content/hero/${type}/${name}`);
  } catch (err) {
    console.error("Failed to load content:", err);
    return notFound();
  }

  if (entry.isPremium) {
    return (
      <div className="p-8 max-w-5xl mx-auto space-y-10">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] font-black bg-accent text-accent-foreground rounded uppercase tracking-widest">PRO</span>
          <h1 className="text-4xl font-bold">{entry.displayName}</h1>
        </div>
        {entry.videoUrl && (
          <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-border">
             <video src={entry.videoUrl} autoPlay muted loop className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-8 bg-card border border-border rounded-2xl flex items-center justify-between shadow-sm">
           <p className="text-muted-foreground italic">Connect your account to access premium source code.</p>
           <a href="https://pro.t7blocks.com" className="px-6 py-2.5 bg-sidebar-foreground text-sidebar rounded-xl font-medium hover:opacity-90 active:scale-95 transition-all">Get Pro Access →</a>
        </div>
      </div>
    );
  }

  // free component
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight">{entry.displayName}</h1>
        <p className="text-muted-foreground text-xl max-w-2xl">{entry.description || "A clean, efficient hero section for your web application."}</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <h2 className="text-2xl font-semibold">Installation</h2>
          <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground uppercase">{entry.type}</code>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-sidebar hover:bg-sidebar-hover transition-colors border border-border rounded-2xl shadow-sm space-y-3">
             <span className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest">Manual Setup</span>
             <pre className="text-sm font-mono p-4 bg-muted/40 rounded-xl overflow-x-auto">{entry.cliCommand || "Pending CLI support"}</pre>
          </div>
          <div className="p-6 bg-sidebar hover:bg-sidebar-hover transition-colors border border-border rounded-2xl shadow-sm space-y-3">
             <span className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest">Required Props</span>
             <div className="space-y-2">
               {allContent.propsTable?.length > 0 ? (
                 allContent.propsTable.map((p: any) => (
                    <div key={p.name} className="flex items-center justify-between text-xs py-1.5 border-b border-border/20 last:border-0">
                      <span className="font-mono text-sidebar-foreground font-semibold">{p.name}</span>
                      <span className="text-muted-foreground">{p.type}</span>
                    </div>
                 ))
               ) : (
                  <p className="text-xs text-muted-foreground italic">Standard hero props apply.</p>
               )}
             </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
         <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <h2 className="text-2xl font-semibold">Implementation</h2>
          <div className="flex gap-2">
             <button className="text-[11px] font-bold px-3 py-1 bg-muted rounded-md opacity-60">Source</button>
             <button className="text-[11px] font-bold px-3 py-1 bg-muted rounded-md opacity-60">Component</button>
          </div>
        </div>
        <pre className="text-sm font-mono p-6 bg-black text-zinc-300 rounded-3xl overflow-x-auto shadow-xl ring-1 ring-white/5">{allContent.codeBlock}</pre>
      </div>
    </div>
  );
}
