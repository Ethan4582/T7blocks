import { Metadata } from "next";
import { components } from "@/lib/gallery";
import ComponentDemoClient from "@/canvas/ComponentDemoClient";

type Props = {
  params: Promise<{ type: string; slug: string }>;
};

export async function generateStaticParams() {
  return components
    .filter((c) => c.noSubsection)
    .map((c) => ({
      type: c.type,
      slug: c.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const componentData = components.find((c) => c.id === slug);

  if (!componentData) return { title: "Demo Not Found" };

  return {
    title: `${componentData.name} Demo | T7BLOCKS`,
    description: componentData.longDescription || componentData.shortDescription,
    keywords: [...(componentData.tags || []), "interactive demo", "prop controls", "ui showcase"],
  };
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;
  const componentData = components.find((c) => c.id === slug);

  if (!componentData) {
    return <div>Component Not Found</div>;
  }

  return (
    <div className="relative">
      <ComponentDemoClient
        id={slug}
        blockUrl={componentData.block_url}
      />
    </div>
  );
}
