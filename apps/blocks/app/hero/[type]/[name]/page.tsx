import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { DetailView } from "@/components/component-detail/DetailView";
import { readSourceFile } from "@/lib/readSource";

import { Metadata } from "next";

type Props = { params: Promise<{ type: string; name: string }> };

export function generateStaticParams() {
  return registry
    .filter((c) => c.category === "hero")
    .map((c) => ({ type: c.type, name: c.name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, name } = await params;
  const entry = registry.find(
    (c) => 
      c.category.toLowerCase() === "hero" && 
      c.type.toLowerCase() === type.toLowerCase() && 
      c.name.toLowerCase() === name.toLowerCase()
  );

  if (!entry) return { title: "Hero Not Found" };

  const fullUrl = `https://t7blocks.xyz/hero/${type}/${name}`;

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

export default async function HeroDetailPage({ params }: Props) {
  const { type, name } = await params;

  const entry = registry.find(
    (c) => 
      c.category.toLowerCase() === "hero" && 
      c.type.toLowerCase() === type.toLowerCase() && 
      c.name.toLowerCase() === name.toLowerCase()
  );
  if (!entry) return notFound();

  let allContent: any
  try {
  
    allContent = await import(`@/lib/content/components/${type}/${name}`);
  } catch (err) {
    console.error(`[HeroDetail] Failed to load component: ${type}/${name}`, err);
    return notFound();
  }

 
  const serializableContent = { ...allContent };

  
  for (let i = 1; i <= 10; i++) {
    const fileNameKey = `Code${i}FileName`;
    const codeKey = `Code${i}`;
    if (serializableContent[fileNameKey] && !serializableContent[codeKey]) {
      try {
        serializableContent[codeKey] = readSourceFile(entry.category, type, serializableContent[fileNameKey]);
      } catch (err) {
        console.error(`[HeroDetail] Failed to read source for ${fileNameKey}:`, err);
      }
    }
  }
  
 
  if (serializableContent.codeBlockFileName && !serializableContent.codeBlock) {
    try {
      serializableContent.codeBlock = readSourceFile(entry.category, type, serializableContent.codeBlockFileName);
    } catch (err) {
      console.error(`[HeroDetail] Failed to read source for codeBlockFileName:`, err);
    }
  }

  return <DetailView entry={entry} allContent={serializableContent} />;
}
