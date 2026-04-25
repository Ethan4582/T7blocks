"use client";

import { useEffect } from "react";
import { trackNavIntent } from "@/lib/analytics/analytics";

export function CategoryTracker({ tag }: { tag: string }) {
  useEffect(() => {
    trackNavIntent("tag", tag);
  }, [tag]);

  return null;
}
