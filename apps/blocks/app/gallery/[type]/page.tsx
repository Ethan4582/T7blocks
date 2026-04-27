import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  const categories = Array.from(new Set(registry.map((c) => c.category)));
  const types = Array.from(new Set(registry.map((c) => c.type)));
  
  const explicitTypes = ["popular", "sections", "utilities", "components", "misc", "background" ];
  
  const allParams = Array.from(new Set([...categories, ...types, ...explicitTypes]))
    .filter(Boolean)
    .map((t) => ({ type: t }));
  
  return allParams;
}

export default async function GalleryTypePage({ params }: Props) {
  const { type } = await params;

  const filteredItems = type.toLowerCase() === "popular"
    ? registry.filter((c) => c.isPopular)
    : registry.filter(
        (c) => 
          c.category.toLowerCase() === type.toLowerCase() || 
          c.type.toLowerCase() === type.toLowerCase() ||
          c.tags?.some(tag => tag.toLowerCase() === type.toLowerCase())
      );

  const displayTitle = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <GalleryGrid 
      items={filteredItems}
      title={`${displayTitle} Vault`}
      description={`Explore our collection of high-performance ${type} resources.`}
    />
  );
}
