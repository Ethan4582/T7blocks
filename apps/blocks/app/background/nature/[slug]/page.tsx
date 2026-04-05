import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";

// Since it's Next.js 16 (from package.json), params is likely a Promise.
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // Filter for backgrounds of type 'nature'
  return registry
    .filter((c) => c.category === "background" && c.type === "nature")
    .map((c) => ({
      slug: c.name,
    }));
}

export default async function BackgroundPage({ params }: Props) {
  const { slug } = await params;

  const entry = registry.find(
    (c) => c.category === "background" && c.type === "nature" && c.name === slug
  );

  if (!entry) return notFound();

  return (
    <div className="p-8">
      <h1>{entry.displayName}</h1>
      <p>{entry.description}</p>
      {/* Dynamic content rendering if exists in lib/content */}
      <div className="mt-8 border rounded p-4">
        Placeholder for background component: {slug}
      </div>
    </div>
  );
}