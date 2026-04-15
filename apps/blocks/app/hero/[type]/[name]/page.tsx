import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { DetailView } from "@/components/component-detail/DetailView";

type Props = { params: Promise<{ type: string; name: string }> };

export function generateStaticParams() {
  return registry
    .filter((c) => c.category === "hero")
    .map((c) => ({ type: c.type, name: c.name }));
}

export default async function HeroDetailPage({ params }: Props) {
  const { type, name } = await params;

  const entry = registry.find(
    (c) => 
      c.category.toLowerCase() === "hero" && 
      c.type.toLowerCase() === type.toLowerCase() && 
      c.name.toLowerCase() === name.toLowerCase()
  );
  if (!entry) return notFound();

  let allContent: any;
  try {
    // Restoring original dynamic import logic
    allContent = await import(`@/lib/content/components/${type}/${name}`);
  } catch (err) {
    console.error(`[HeroDetail] Failed to load component: ${type}/${name}`, err);
    return notFound();
  }

  return <DetailView entry={entry} allContent={allContent} />;
}
