import { toComponentItem } from "@/lib/registry";
import { MetadataSidebar, DocumentationSection, PreviewCard } from "@/components/component-detail";
import { ComponentDetailData } from "@/lib/componentData";
import { ChevronRight } from "lucide-react";

interface DetailViewProps {
  entry: any;
  allContent: any;
}

export function DetailView({ entry, allContent }: DetailViewProps) {
  const detail: ComponentDetailData = {
    slug: entry.name,
    dependencies: entry.cliCommand
      ? (typeof entry.cliCommand === 'string'
          ? entry.cliCommand.replace('npm install ', '').split(' ')
          : [])
      : [],
    codeBlocks: [
      {
        label: "Component",
        code: allContent.codeBlock || allContent.heroTsxSource || allContent.componentCode || ""
      },
      ...((allContent.heroCssSource || allContent.cssSource) ? [{
        label: "CSS",
        code: allContent.heroCssSource || allContent.cssSource
      }] : [])
    ]
  };

  const componentItem = toComponentItem(entry);

  return (
    <div className="py-6 w-full px-0 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row items-start gap-x-12">
        {/* ─── Left Content (Constrained & Shifted Left) ─── */}
        <div className="flex-1 min-w-0 max-w-5xl space-y-10">
      
         

          <div className="space-y-1.5">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground font-serif">
              {entry.displayName}
            </h1>
            <p className="text-muted-foreground text-[15px] max-w-2xl leading-relaxed font-medium opacity-50">
              {entry.description}
            </p>
          </div>

          <PreviewCard component={componentItem} />

          <DocumentationSection detail={detail} component={componentItem} />
        </div>

        {/* ─── Right Sidebar (Docks to Window Edge) ─── */}
        <div className="w-full lg:w-[240px] lg:shrink-0 ml-auto pr-0 pt-4">
          <MetadataSidebar
            component={componentItem}
            bugReportUrl="https://github.com/t7labs/t7blocks/issues"
            featureRequestUrl="https://github.com/t7labs/t7blocks/issues"
          />
        </div>
      </div>
    </div>
  );
}
