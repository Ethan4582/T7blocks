import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  const dynamicTypes = registry
    .filter((c) => c.category === "background")
    .map((c) => c.type);
  
  const staticTypes = ["animated", "gradient", "mesh", "grid"];
  const allTypes = Array.from(new Set([...dynamicTypes, ...staticTypes]));
  
  return allTypes.map((t) => ({ type: t }));
}

export default async function BackgroundGallery({ params }: Props) {
  const { type } = await params;

  const filteredItems = registry.filter(
    (c) => c.category === "background" && c.type === type
  );

  const staticTypes = ["animated", "gradient", "mesh", "grid"];
  if (filteredItems.length === 0 && !staticTypes.includes(type)) {
    notFound();
  }

  return (
    <GalleryGrid 
      items={filteredItems}
      title={`${type} Backgrounds`}
      description={`Premium ${type} background sections with smooth interactions.`}
    />
  );
}
