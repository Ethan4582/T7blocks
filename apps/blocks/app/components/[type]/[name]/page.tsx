import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { DetailView } from "@/components/component-detail/DetailView";

type Props = { params: Promise<{ type: string; name: string }> };

export function generateStaticParams() {
  return registry
    .filter((c) => c.category === "components")
    .map((c) => ({ type: c.type, name: c.name }));
}

export default async function ComponentDetailPage({ params }: Props) {
  const { type, name } = await params;

  const entry = registry.find(
    (c) => c.category === "components" && c.type === type && c.name === name
  );
  if (!entry) return notFound();

  // Import MUST be here at the page level — Next.js traces this for static export.
  // A variable dynamic import inside a shared component (DetailView) is NOT resolved
  // by the bundler and causes 404 in production.
  let allContent: any;
  try {
    allContent = await import(`@/lib/content/components/${type}/${name}`);
  } catch {
    return notFound();
  }

  return <DetailView entry={entry} allContent={allContent} />;
}
