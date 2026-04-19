"use client";

import { useParams } from "next/navigation";
import { registry } from "@/lib/registry";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export default function TagPage() {
  const { tag } = useParams();
  const normalizedTag = typeof tag === 'string' ? tag.toLowerCase() : '';
  
  // Filter registry based on tag
  const filteredItems = registry.filter(item => 
    item.tags?.some(t => t.toLowerCase() === normalizedTag)
  );

  const displayTag = typeof tag === 'string' 
    ? tag.charAt(0).toUpperCase() + tag.slice(1) 
    : '';

  return (
    <GalleryGrid 
      items={filteredItems} 
      title={`${displayTag} Vault`}
      description={`Discover high-performance components tagged with ${displayTag}.`}
    />
  );
}
