import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { MetadataSidebar, DocumentationSection, PreviewCard } from "@/components/component-detail";

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

  // Dynamically import the content
  let allContent;
  try {
    allContent = await import(`@/lib/content/components/${type}/${name}`);
  } catch (err) {
    console.error("Failed to load content:", err);
    return notFound();
  }

  // Construct detail object for DocumentationSection
  const detail = {
    slug: entry.name,
    dependencies: entry.cliCommand ? entry.cliCommand.replace('npm install ', '').split(' ') : [],
    codeBlocks: [
      { label: "Component", code: allContent.codeBlock }
    ],
    propsTable: allContent.propsTable || []
  };

  // Map registry entry to ComponentItem type expected by detail components
  const componentItem = {
    id: 0,
    name: entry.displayName,
    image: entry.imageUrl || "",
    video: entry.videoUrl || "",
    slug: entry.name,
    category: entry.category,
    description: entry.description || "",
    publishedDate: "Recent",
    isPremium: entry.isPremium,
    tags: entry.tags || [],
    creator: {
      name: "T7 Labs",
      image: "/assets/logo.png"
    },
    demoUrl: entry.demoUrl ?? undefined
  };

  return (
    <div className="py-10 max-w-[1400px] mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area (Column 1-8) */}
        <div className="lg:col-span-8 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {entry.displayName}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {entry.description}
            </p>
          </div>

          {/* Preview */}
          <PreviewCard component={componentItem} />

          {/* Documentation Section */}
          <DocumentationSection detail={detail as any} component={componentItem} />
        </div>

        {/* Sidebar (Column 9-12) */}
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
