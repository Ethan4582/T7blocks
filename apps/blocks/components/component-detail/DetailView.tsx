import { registry, toComponentItem } from "@/lib/registry";
import { notFound } from "next/navigation";
import { MetadataSidebar, DocumentationSection, PreviewCard } from "@/components/component-detail";
import { ComponentDetailData } from "@/lib/componentData";

interface DetailViewProps {
  category: string;
  type: string;
  name: string;
}

export async function DetailView({ category, type, name }: DetailViewProps) {
  const entry = registry.find(
    (c) => c.category === category && c.type === type && c.name === name
  );

  if (!entry) return notFound();

  let allContent;
  try {
    // Both hero and components now pull from lib/content/components
    allContent = await import(`@/lib/content/components/${type}/${name}`);
  } catch (err) {
    return notFound();
  }

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
    <div className="py-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {entry.displayName}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {entry.description}
            </p>
          </div>

          <PreviewCard component={componentItem} />

          <DocumentationSection detail={detail} component={componentItem} />
        </div>

        <div className="lg:col-span-4">
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
