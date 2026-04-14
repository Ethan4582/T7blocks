// Static content map — variable dynamic imports fail with `output: 'export'`
// because webpack cannot statically analyze which files to bundle.
// Every component content file MUST be explicitly imported here.

import type { ComponentEntry } from "@/lib/registry";

// ---  Add a new entry here whenever you add a new component content file ---
const contentMap: Record<string, () => Promise<any>> = {
  // components/button
  "launch-button": () => import("./components/button/launch-button"),

  // components/section (hero)
  "pop-hero": () => import("./components/section/pop-hero"),

  // components/scroll
  "scroll-image-pass": () => import("./components/scroll/scroll-image-pass"),
};

/**
 * Resolves component content for a given registry entry.
 * Uses an explicit static map so webpack can bundle all content files
 * correctly during `output: 'export'` static site generation.
 */
export async function resolveContent(entry: ComponentEntry): Promise<any> {
  const loader = contentMap[entry.name];
  if (!loader) {
    throw new Error(
      `[resolveContent] No content registered for "${entry.name}". ` +
      `Add it to the contentMap in lib/content/index.ts`
    );
  }
  return loader();
}
