import ComponentDetailPage from "@/app/components/[type]/[name]/page";
import { registry } from "@/lib/registry";


interface Props {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  return registry
    .filter(e => e.noSubsection)
    .map(e => ({ name: e.name }));
}

export default async function Page({ params }: Props) {
  const { name } = await params;

  const item = registry.find(e => e.name === name);

  if (!item) return null;

  return <ComponentDetailPage item={item} />;
}