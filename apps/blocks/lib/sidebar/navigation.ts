import { registry } from "@/lib/registry";

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface NavAccordion {
  title: string;
  icon?: string;
  items: NavItem[];
}

export interface NavSection {
  title: string;
  items: (NavItem | NavAccordion)[];
}

// Transform registry entries into navigation items
const componentItems = registry
  .filter((c) => c.category === "components")
  .map((c) => ({
    title: c.displayName,
    href: `/components/${c.type}/${c.name}`,
  }));

const heroItems = registry
  .filter((c) => c.category === "hero")
  .map((c) => ({
    title: c.displayName,
    href: `/hero/${c.type}/${c.name}`,
  }));

const backgroundItems = registry
  .filter((c) => c.category === "background")
  .map((c) => ({
    title: c.displayName,
    href: `/background/${c.type}/${c.name}`,
  }));

export const NAVIGATION_DATA: NavSection[] = [
  {
    title: "",
    items: [
      { title: "Templates", href: "/templates", icon: "/SVG/installation.svg" },
      { title: "Gallery", href: "/components", icon: "/SVG/folder.svg" },
    ],
  },
  {
    title: "CATEGORIES",
    items: [
      {
        title: "Components",
        icon: "/SVG/categories.svg",
        items: componentItems,
      },
      {
        title: "Hero",
        icon: "/SVG/svg-65.svg",
        items: heroItems,
      },
      {
        title: "Background",
        icon: "/SVG/mirror-rectangular.svg",
        items: backgroundItems,
      },
    ],
  },
];
