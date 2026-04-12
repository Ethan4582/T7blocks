import { registry } from "@/lib/registry";

export interface NavItem {
  title: string;
  href?: string;
  icon?: string;
  badge?: string;
  external?: boolean;
  items?: (NavItem)[]; // Allow nesting
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

// Transform registry entries into navigation items
const getItemsByType = (type: string, category: string = "components") => {
  return registry
    .filter((c) => c.category === category && c.type === type)
    .map((c) => ({
      title: c.displayName,
      href: `/${category}/${c.type}/${c.name}`,
    }));
};

export const NAVIGATION_DATA: NavSection[] = [
  {
    items: [
      {
        title: "Follow for updates",
        icon: "/SVG/x.svg",
        href: "https://twitter.com/ashirwadsingh_",
        external: true,
      },
      {
        title: "Gallery",
        icon: "/SVG/gallery.png",
        href: "/gallery",
      },
    ],
  },
  {
    title: "Blocks",
    items: [
      {
        title: "Components",
        icon: "/SVG/components.svg",
        href: "/gallery/components",
        items: [
          {
            title: "Buttons",
            href: "/gallery/button",
            items: getItemsByType("button"),
          },
        ],
      },
      {
        title: "Hero",
        icon: "/SVG/svg-65.svg",
        href: "/gallery/hero",
      },
      {
        title: "Background",
        icon: "/SVG/image.svg",
        href: "/gallery/background",
      },
    ],
  },
];
