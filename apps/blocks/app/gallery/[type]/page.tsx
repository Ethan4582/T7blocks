import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  // Generate params for both categories and types found in registry
  // Plus any explicitly defined sections from navigation data
  const categories = Array.from(new Set(registry.map((c) => c.category)));
  const types = Array.from(new Set(registry.map((c) => c.type)));
  
  // Explicitly add those we know we want routes for
  const explicitTypes = ["components", "button", "hero", "background", "loader", "transition", "navigation", "text"];
  
  const allParams = Array.from(new Set([...categories, ...types, ...explicitTypes]))
    .filter(Boolean)
    .map((t) => ({ type: t }));
  
  return allParams;
}

export default async function GalleryTypePage({ params }: Props) {
  const { type } = await params;

  // Filter items that match either the category or the type
  const filteredItems = registry.filter(
    (c) => c.category === type || c.type === type
  );

  // Capitalize title
  const displayTitle = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <GalleryGrid 
      items={filteredItems}
      title={`${displayTitle} Vault`}
      description={`Explore our collection of high-performance ${type} resources.`}
    />
  );
}
