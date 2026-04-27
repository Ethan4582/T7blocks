import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  const dynamicTypes = registry
    .filter((c) => c.category === "sections")
    .map((c) => c.type);
  
  const staticTypes = ["hero"];
  const allTypes = Array.from(new Set([...dynamicTypes, ...staticTypes]));
  
  return allTypes.map((t) => ({ type: t }));
}

export default async function TypeGallery({ params }: Props) {
  const { type } = await params;

  const filteredItems = registry.filter(
    (c) => c.category === "sections" && c.type === type
  );

  if (filteredItems.length === 0) {
    notFound();
  }

  return (
    <GalleryGrid 
      items={filteredItems}
      title={`${type}s`}
      description={`Explore our collection of high-performance ${type} components.`}
    />
  );
}
