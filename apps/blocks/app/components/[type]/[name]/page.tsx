import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { DetailView } from "@/components/component-detail/DetailView";
import { resolveContent } from "@/lib/content";

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

  let allContent: any;
  try {
    allContent = await resolveContent(entry);
  } catch {
    return notFound();
  }

  return <DetailView entry={entry} allContent={allContent} />;
}
