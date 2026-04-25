"use client";

import { ComponentEntry } from "@/lib/registry";
import { VaultCard } from "@/components/ui/card/VaultCard";

interface RelatedResourcesProps {
  items: ComponentEntry[];
}

export function RelatedResources({ items }: RelatedResourcesProps) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
      {items.map((item) => (
        <VaultCard
          key={item.name}
          item={item}
        />
      ))}
    </div>
  );
}
