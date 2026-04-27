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
      href: c.noSubsection ? `/${category}/${c.name}` : `/${category}/${c.type}/${c.name}`,
    }));
};

export const NAVIGATION_DATA: NavSection[] = [
  {
    items: [
      {
        title: "Follow for updates",
        icon: "/SVG/x2.png",
        href: "https://twitter.com/ashirwadsingh_",
        external: true,
      },
      {
        title: "Gallery",
        icon: "/SVG/gallery1.png",
        href: "/gallery",
      },
    ],
  },
  {
    title: "Blocks",
    items: [
      {
        title: "Popular",
        icon: "/SVG/fire.png",
        href: "/gallery/popular",
      },
      {
        title: "Components",
        icon: "/SVG/components.svg",
        href: "/gallery/components",
        items: [
          {
            title: "Buttons",
            href: "/gallery/button",

          },
        ],
      },
      {
        title: "Interactions",
        icon: "/SVG/interaction.svg",
        href: "/gallery/interactions",
        items: [
           {
            title: "Scroll",
            href: "/gallery/scroll",
            items: getItemsByType("scroll"),
          },
        ]
      },
      {
        title: "Sections",
        icon: "/SVG/section.svg",
        href: "/gallery/sections",
        items:[
          {
            title: "Hero",
            href: "/gallery/hero",
            items: getItemsByType("hero"),
          },
        ]
      },
      // {
      //   title:"Utilities",
      //   icon:"/SVG/utility.svg",
      //   href:"/gallery/utilities",
      //  items:[
      //   {
      //     title:"Loader",
      //     href:"/gallery/utilities/loader",
      //   },{
      //     title:"Cursor",
      //     href:"/gallery/utilities/cursor",
      //   },
      //   {
      //     title:"Notifications",
      //     href:"/gallery/utilities/notifications",
      //   }
      //  ]
      // },
      {
        title: "Misc",
        icon: "/SVG/misc.svg",
        href: "/gallery/misc",
        items: getItemsByType("misc", "misc"),
      },
      {
        title: "Background",
        icon: "/SVG/background.png",
        href: "/gallery/background",
        items: getItemsByType("background", "background"),
      },
    ],
  },
];
