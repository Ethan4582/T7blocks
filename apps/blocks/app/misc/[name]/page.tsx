import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { readSourceFile, readSourceFileAsJsx } from "@/lib/readSource";
import { Metadata } from "next";
import { DetailView } from "@/components/features/component-detail/DetailView";

type Props = { params: Promise<{ name: string }> };

export function generateStaticParams() {
  return registry
    .filter((c) => c.noSubsection)
    .map((c) => ({ name: c.name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const entry = registry.find(
    (c) =>
      c.noSubsection &&
      c.name.toLowerCase() === name.toLowerCase()
  );

  if (!entry) return { title: "Component Not Found" };

  const fullUrl = `https://t7blocks.xyz/misc/${name}`;

  return {
    title: entry.displayName,
    description: entry.description,
    keywords: entry.tags,
    alternates: { canonical: fullUrl },
    openGraph: {
      title: `${entry.displayName} | T7BLOCKS`,
      description: entry.description,
      url: fullUrl,
      images: [{ url: entry.imageUrl || "/assets/logo.png" }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${entry.displayName} | T7BLOCKS`,
      description: entry.description,
      images: [entry.imageUrl || "/assets/logo.png"],
    }
  };
}

export default async function ComponentDetailPage({ params }: Props) {
  const { name } = await params;

  const entry = registry.find(
    (c) =>
      c.noSubsection &&
      c.name.toLowerCase() === name.toLowerCase()
  );
  if (!entry) return notFound();

  let allContent: any;
  try {
    // Misc components are structured directly under lib/content/misc
    allContent = await import(`@/lib/content/misc/${name}`);
  } catch (err) {
    console.error(`[ComponentDetail] Failed to load component: misc/${name}`, err);
    return notFound();
  }

  const serializableContent = { ...allContent };

  // Hydrate raw source code
  for (let i = 1; i <= 10; i++) {
    const fileNameKey = `Code${i}FileName`;
    const codeKey = `Code${i}`;
    if (serializableContent[fileNameKey] && !serializableContent[codeKey]) {
      try {
        serializableContent[codeKey] = readSourceFile(entry.category, entry.type, serializableContent[fileNameKey]);
        serializableContent[`${codeKey}Jsx`] = readSourceFileAsJsx(entry.category, entry.type, serializableContent[fileNameKey]);
      } catch (err) {
        console.error(`[ComponentDetail] Failed to read source for ${fileNameKey}:`, err);
      }
    }
  }

  if (serializableContent.codeBlockFileName && !serializableContent.codeBlock) {
    try {
      serializableContent.codeBlock = readSourceFile(entry.category, entry.type, serializableContent.codeBlockFileName);
      serializableContent.codeBlockJsx = readSourceFileAsJsx(entry.category, entry.type, serializableContent.codeBlockFileName);
    } catch (err) {
      console.error(`[ComponentDetail] Failed to read source for codeBlockFileName:`, err);
    }
  }

  return <DetailView entry={entry} allContent={serializableContent} />;
}