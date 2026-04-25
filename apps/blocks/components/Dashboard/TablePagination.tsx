import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({ currentPage, totalPages, onPageChange }: TablePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-white/[0.01]">
      <div className="text-xs text-white/40">
        Page <span className="text-white/80 font-medium">{currentPage + 1}</span> of <span className="text-white/80 font-medium">{totalPages}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
        >
          <ChevronLeft className="w-4 h-4 text-white group-hover:text-[#FF8B21] transition-colors" />
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
        >
          <ChevronRight className="w-4 h-4 text-white group-hover:text-[#FF8B21] transition-colors" />
        </button>
      </div>
    </div>
  );
}
