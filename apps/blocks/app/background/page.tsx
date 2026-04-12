"use client";

import { registry } from "@/lib/registry";
import { VaultCard } from "@/components/common/VaultCard";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BackgroundGallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  const backgrounds = registry.filter((c) => c.category === "background");

  const totalPages = Math.ceil(backgrounds.length / itemsPerPage);
  const displayedItems = backgrounds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Background Images</h1>
        <p className="text-muted-foreground text-lg opacity-60">
          Add style to any section with our custom-styled background collection.
        </p>
      </div>

      {displayedItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((c) => (
              <VaultCard key={c.name} item={c} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-end font-medium">
              <div className="flex bg-[#111113] border border-border/40 p-1.5 rounded-xl gap-2 shadow-sm">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-4 py-2 flex items-center gap-1.5 rounded-lg transition-all disabled:opacity-30 hover:bg-[#1c1c1f] text-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <div className="flex items-center px-4 text-sm font-bold bg-[#fafafa] text-[#09090b] rounded-md min-w-[32px] justify-center">
                  {currentPage}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-4 py-2 flex items-center gap-1.5 rounded-lg transition-all disabled:opacity-30 hover:bg-[#1c1c1f] text-sm"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="py-24 text-center border border-dashed border-border/30 rounded-3xl bg-[#111113]/50">
          <p className="text-muted-foreground italic opacity-50">
            No background images available yet. Coming soon!
          </p>
        </div>
      )}
    </div>
  );
}
