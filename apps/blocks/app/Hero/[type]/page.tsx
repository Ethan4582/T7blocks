import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  const dynamicTypes = registry
    .filter((c) => c.category === "hero")
    .map((c) => c.type);
  
  const staticTypes = ["classic", "modern", "bento", "split"];
  const allTypes = Array.from(new Set([...dynamicTypes, ...staticTypes]));
  
  return allTypes.map((t) => ({ type: t }));
}

export default async function HeroGallery({ params }: Props) {
  const { type } = await params;

  const filteredItems = registry.filter(
    (c) => c.category === "hero" && c.type === type
  );

  const staticTypes = ["classic", "modern", "bento", "split"];
  if (filteredItems.length === 0 && !staticTypes.includes(type)) {
    notFound();
  }

  return (
    <GalleryGrid 
      items={filteredItems}
      title={`${type} Heroes`}
      description={`Impactful ${type} hero sections designed for conversion.`}
    />
  );
}
