import { notFound } from "next/navigation";
import { getInstallationData } from "@/lib/Installation/loader";
import { Steps, Step, Callout } from "@/components/common/installation-ui";
import { CodeBlock } from "@/components/component-detail/CodeBlock";
import { InstallationHeader } from "@/components/common/InstallationHeader";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import fs from "fs/promises";
import path from "path";

export async function generateStaticParams() {
  const dirPath = path.join(process.cwd(), "lib/Installation");
  const files = await fs.readdir(dirPath);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({
      slug: f.replace(".md", ""),
    }));
}

export default async function InstallationFrameworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getInstallationData(slug);

  if (!data) {
    return notFound();
  }

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Home link from reference image */}
     

      {/* Background Pattern - Subtle dots instead of heavy grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} 
        />
      </div>

      <div className="relative z-10 pt-10 pb-24 pl-10 pr-6 lg:pl-16 w-full">
        {/* Breadcrumbs - tighter spacing */}
        <nav className="flex items-center gap-2 text-[12px] text-muted-foreground/30 mb-8 font-medium">
          <Link 
            href="/" 
            className="hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <Home className="w-3 h-3" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-2.5 h-2.5 opacity-20" />
          <Link 
            href="/installation" 
            className="hover:text-foreground transition-colors"
          >
            Installation
          </Link>
          <ChevronRight className="w-2.5 h-2.5 opacity-20" />
          <span className="text-foreground/60">{data.title}</span>
        </nav>

        {/* Header Section */}
        <div className="max-w-[850px]">
          <InstallationHeader title={data.title} description={data.description} />
        </div>

        {/* Dynamic Steps Renderer */}
        <div className="max-w-[850px]">
          <Steps>
            {data.steps.map((step, i) => (
              <Step key={i} title={step.title}>
                {step.items.map((item, idx) => {
                  if (item.type === "text") {
                    return (
                      <div key={idx} className="text-muted-foreground/70 leading-relaxed text-[15px] font-medium antialiased">
                        {item.content.split("\n").map((line, lIdx) => (
                          <p key={lIdx} className={lIdx > 0 ? "mt-4" : ""}>{line}</p>
                        ))}
                      </div>
                    );
                  }
                  if (item.type === "code") {
                    return (
                      <div key={idx} className="my-6">
                        <CodeBlock 
                          code={item.code} 
                          label={item.label} 
                          language={item.language} 
                        />
                      </div>
                    );
                  }
                  if (item.type === "callout") {
                    return (
                      <Callout key={idx} className={item.className}>
                        <div className="prose-sm leading-relaxed opacity-90">
                          {item.content}
                        </div>
                      </Callout>
                    );
                  }
                  return null;
                })}
              </Step>
            ))}
          </Steps>
        </div>
      </div>
    </div>
  );
}

