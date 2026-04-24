import { Metadata } from "next";
import { components } from "@/lib/gallery";
import ComponentDemoClient from "@/app/components/canvas/ComponentDemoClient";

type Props = {
  params: Promise<{ category: string; id: string }>;
};

export async function generateStaticParams() {
  return components.map((component) => ({
    category: component.category,
    id: component.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const componentData = components.find(c => c.id === id);

  if (!componentData) return { title: "Demo Not Found" };

  return {
    title: `${componentData.name} Demo | T7BLOCKS`,
    description: `Live interactive demo and prop controls for ${componentData.name}. Explore high-fidelity animations and premium motion design.`,
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
