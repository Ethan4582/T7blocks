import { registry } from "@/lib/registry";

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  external?: boolean;
}

export interface NavAccordion {
  title: string;
  icon?: string;
  href?: string; // Optional: navigate when toggling
  items: NavItem[];
}

export interface NavSection {
  title?: string;
  items: (NavItem | NavAccordion)[];
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
        title: "Installation",
        icon: "/SVG/installation.svg",
        href: "/installation",
      },
      {
        title: "Templates",
        icon: "/SVG/folder.svg",
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
    title: "Components",
    items: [
      {
        title: "Buttons",
        href: "/components/button",
        items: getItemsByType("button"),
      },
      // {
      //   title: "Scroll Animations",
      //   href: "/components/scroll",
      //   items: getItemsByType("scroll"),
      // },
      // {
      //   title: "Loader",
      //   href: "/components/loader",
      //   items: getItemsByType("loader"),
      // },
      // {
      //   title: "Page Transitions",
      //   items: [],
      // },
    ],
  },
  {
    items: [
      {
        title: "Hero",
        href: "/hero",
      },
    ],
  },
  {
    items: [
      {
        title: "Background",
        href: "/background",
      },
    ],
  }
];
