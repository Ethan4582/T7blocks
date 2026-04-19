"use client";

import { usePathname } from "next/navigation";
import { ComponentEntry } from "@/lib/registry";
import { VaultCard } from "@/components/common/VaultCard";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface GalleryGridProps {
  items: ComponentEntry[];
  title?: string;
  description?: string;
}

export function GalleryGrid({ items, title, description }: GalleryGridProps) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 18;

  const getDynamicTitle = () => {
    if (pathname === "/gallery") return "Vault";
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    if (lastSegment) {
      const formattedSegment = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
      return `${formattedSegment} Vault`;
    }
    
    return "Component Vault";
  };

  const dynamicTitle = getDynamicTitle();

  const filteredItems = items.filter(item =>
    item.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const displayedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, items]);

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-x-hidden transition-colors duration-300">
      <section className="flex flex-col items-center justify-center pt-20 pb-16 px-4">
        <div className="flex flex-col items-center space-y-3 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight flex items-center justify-center gap-3">
             Discover the <span className="animate-wave text-4xl">👋</span> {dynamicTitle}
          </h1>
          
          <div className="relative w-full max-w-sm mt-8 group mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-muted-foreground/30">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${items.length}+ resources...`}
              className="w-full bg-[#211e1e] rounded-full py-3 pl-12 pr-6 text-[15px] text-foreground focus:outline-none transition-all shadow-sm placeholder:text-muted-foreground/20"
            />
          </div>
        </div>
      </section>

      <section className="flex-1 pb-20 w-full">
        {displayedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground border border-dashed border-border/30 rounded-2xl bg-muted/5">
            <Search className="w-12 h-12 mb-4 opacity-10" />
            <p className="text-lg font-medium">No results found for &quot;{searchQuery}&quot;</p>
            <p className="text-sm opacity-60 mt-1">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item) => (
              <VaultCard key={item.name} item={item} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center font-medium">
            <div className="flex bg-[#111111] border border-border/10 p-1.5 rounded-lg gap-1 shadow-sm">
               <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="px-4 py-2 flex items-center gap-1.5 rounded-lg transition-all disabled:opacity-20 hover:text-foreground text-muted-foreground text-[13px]"
              >
                Previous
              </button>
              
              <div className="flex items-center px-3.5 text-[13px] font-bold bg-white text-black rounded-md min-w-[32px] justify-center mx-1">
                {currentPage}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-4 py-2 flex items-center gap-1.5 rounded-lg transition-all disabled:opacity-20 hover:text-foreground text-muted-foreground text-[13px]"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      <style jsx global>{`
        .animate-wave {
          display: inline-block;
          transform-origin: 70% 70%;
          animation: wave 3s infinite ease-in-out;
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
        }
      `}</style>
    </div>
  );
}
