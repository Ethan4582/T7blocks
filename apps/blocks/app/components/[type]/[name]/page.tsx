import { registry } from "@/lib/registry";
import { DetailView } from "@/components/component-detail/DetailView";

type Props = { params: Promise<{ type: string; name: string }> };

export function generateStaticParams() {
  return registry
    .filter((c) => c.category === "components")
    .map((c) => ({
      type: c.type,
      name: c.name,
    }));
}

export default async function ComponentDetailPage({ params }: Props) {
  const { type, name } = await params;
  return <DetailView category="components" type={type} name={name} />;
}
