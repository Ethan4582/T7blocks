import { registry } from "@/lib/registry";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

// Required for static export
export async function generateStaticParams() {
  const tags = new Set<string>();
  registry.forEach(item => {
    item.tags?.forEach(tag => tags.add(tag.toLowerCase()));
  });

  return Array.from(tags).map((tag) => ({
    tag: tag.toLowerCase(),
  }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const resolvedParams = await params;
  const tag = resolvedParams?.tag;
  
  if (!tag) {
    return null;
  }
  
  const normalizedTag = tag.toLowerCase();
  
  // Filter registry based on tag
  const filteredItems = registry.filter(item => 
    item.tags?.some(t => t.toLowerCase() === normalizedTag)
  );

  const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return (
    <GalleryGrid 
      items={filteredItems} 
      title={`${displayTag} Vault`}
      description={`Discover high-performance components built with ${displayTag}.`}
    />
  );
}
