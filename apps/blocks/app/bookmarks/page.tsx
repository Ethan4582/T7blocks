"use client";

import { Bookmark, Search } from "lucide-react";
import Link from "next/link";
import { useBookmarks } from "@/components/common/bookmarks-context";
import { registry } from "@/lib/registry";
import { VaultCard } from "@/components/common/VaultCard";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  const bookmarkedItems = registry.filter(item => bookmarks.includes(item.name));

  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">My Bookmarks</h1>
        <p className="text-muted-foreground text-lg opacity-60">
          Your saved components and sections for quick access.
        </p>
      </div>

      {bookmarkedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border/30 rounded-3xl bg-muted/20">
          <Bookmark className="w-12 h-12 mb-4 opacity-20" />
          <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
          <p className="text-muted-foreground mb-8 max-w-[300px]">
            Add items to your bookmarks to keep them accessible.
          </p>
          <Link
            href="/gallery"
            className="px-6 py-2.5 bg-foreground text-background rounded-full font-medium text-sm transition-opacity hover:opacity-90"
          >
            Browse Gallery
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedItems.map((item) => (
            <VaultCard key={item.name} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
