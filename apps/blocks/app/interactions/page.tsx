import { registry } from "@/lib/registry";
import Link from "next/link";

export default function ComponentsGallery() {
  const interactions = registry.filter((c) => c.category === "interactions");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Interactions Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interactions.map((c) => (
          <Link
            key={c.name}
            href={`/interactions/${c.type}/${c.name}`}
            className="block p-6 rounded-xl border border-zinc-200 hover:border-zinc-500 transition-colors bg-white dark:bg-black dark:border-zinc-800"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{c.displayName}</h2>
              {c.isPremium && (
                <span className="px-2 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded">
                  PRO
                </span>
              )}
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2">
              {c.description}
            </p>
            <div className="mt-4 text-sm text-zinc-400">
              Type: <code className="bg-zinc-100 dark:bg-zinc-900 px-1 rounded">{c.type}</code>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}