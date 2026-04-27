import { Metadata } from "next";
import { components } from "@/lib/gallery";
import ComponentDemoClient from "@/app/components/canvas/ComponentDemoClient";

type Props = {
  params: Promise<{ type: string; slug: string; id: string }>;
};

export async function generateStaticParams() {
  return components
    .filter((c) => !c.noSubsection)
    .map((c) => ({
      type: c.type,
      slug: c.subsection,
      id: c.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const componentData = components.find((c) => c.id === id);

  if (!componentData) return { title: "Demo Not Found" };

  return {
    title: `${componentData.name} Demo | T7BLOCKS`,
    description: componentData.longDescription || componentData.shortDescription,
    keywords: [...(componentData.tags || []), "interactive demo", "prop controls", "ui showcase"],
  };
}

export default async function ComponentPage({ params }: Props) {
  const { id } = await params;
  const componentData = components.find((c) => c.id === id);

  if (!componentData) {
    return <div>Component Not Found</div>;
  }

  return (
    <div className="relative">
      <ComponentDemoClient
        id={id}
        blockUrl={componentData.block_url}
      />
    </div>
  );
}
