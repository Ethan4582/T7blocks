"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface BookmarksContextType {
  bookmarks: string[];
  toggleBookmark: (id: string, e?: React.MouseEvent) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("t7-bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse bookmarks", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save bookmarks to localStorage whenever they change, but only after initialization
  useEffect(() => {
    if (!isInitialized) return;
    
    if (bookmarks.length > 0) {
      localStorage.setItem("t7-bookmarks", JSON.stringify(bookmarks));
    } else {
      localStorage.removeItem("t7-bookmarks");
    }
  }, [bookmarks, isInitialized]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  return (
    <BookmarksContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
}
