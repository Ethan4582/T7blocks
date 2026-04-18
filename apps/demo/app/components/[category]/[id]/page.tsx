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

  return {
    title: componentData?.name || "Component Demo",
    description: componentData?.longDescription || componentData?.shortDescription,
    keywords: componentData?.tags,
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
