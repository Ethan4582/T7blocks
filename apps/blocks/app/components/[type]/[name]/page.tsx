import { registry, toComponentItem } from "@/lib/registry";
import { notFound } from "next/navigation";
import { MetadataSidebar, DocumentationSection, PreviewCard } from "@/components/component-detail";
import { ComponentDetailData } from "@/lib/componentData";

type Props = { params: Promise<{ type: string; name: string }> };

export function generateStaticParams() {
  return registry
    .filter((c) => c.category === "components")
    .map((c) => ({
      type: c.type,
      name: c.name,
    }));
}

export default async function ComponentPage({ params }: Props) {
  const { type, name } = await params;
  
  const entry = registry.find(
    (c) => c.type === type && c.name === name
  );

  if (!entry) return notFound();

  let allContent;
  try {
    allContent = await import(`@/lib/content/components/${type}/${name}`);
  } catch (err) {
    return notFound();
  }

  const detail: ComponentDetailData = {
    slug: entry.name,
    setupInstructions: true,
    dependencies: entry.cliCommand 
      ? (typeof entry.cliCommand === 'string' 
          ? entry.cliCommand.replace('npm install ', '').split(' ') 
          : []) 
      : [],
    codeBlocks: [
      { 
        label: "Component", 
        code: allContent.codeBlock || allContent.componentCode || allContent.heroTsxSource || "" 
      },
      ...((allContent.heroCssSource || allContent.cssSource) ? [{
        label: "CSS",
        code: allContent.heroCssSource || allContent.cssSource
      }] : [])
    ]
  };

  const componentItem = toComponentItem(entry);

  return (
    <div className="py-10 max-w-[1400px] mx-auto w-full">
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
