import { MetadataRoute } from 'next';
export const dynamic = 'force-static';
import { registry } from '@/lib/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://t7blocks.xyz";

  const staticRoutes = [
    { url: "", priority: 1 },
    { url: "/components", priority: 0.9 },
    { url: "/hero", priority: 0.9 },
    { url: "/gallery", priority: 0.9 },
    { url: "/waitlist", priority: 0.7 },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route.priority,
  }));

  const dynamicRoutes = registry.map((entry) => {
    const path = entry.category === "hero" 
      ? `/hero/${entry.type}/${entry.name}`
      : `/components/${entry.type}/${entry.name}`;
      
    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: entry.isPremium ? 0.6 : 0.8,
    };
  });

  return [...staticRoutes, ...dynamicRoutes];
}
