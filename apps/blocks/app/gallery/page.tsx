"use client";

import { registry } from "@/lib/registry";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export default function GalleryPage() {
  return (
    <GalleryGrid 
      items={registry} 
      title="Component Vault" 
      description="Discover high-performance components for your next project."
    />
  );
}
