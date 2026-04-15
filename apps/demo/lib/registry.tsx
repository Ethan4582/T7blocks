import { Dotlaunchbutton, PopHero, ScrollimagePass, StickyScroll } from "@t7blocks/ui";
import { launchButtonSchema } from "./prop-schemas/components/button/Launch-Button";
import { scrollImagePassSchema } from "./prop-schemas/components/scroll/ScrollimagePass";
import { stickyScrollSchema } from "./prop-schemas/components/scroll/StickyScrol";

export const registry: Record<string, {
  component: React.ComponentType<any>;
  schema: any;
}> = {
  "Launch-Button": {
    component: Dotlaunchbutton,
    schema: launchButtonSchema,
  },
  "Pop-Hero": {
    component: PopHero,
    schema: {},
  },
  "Scroll-Image-Pass": {
    component: ScrollimagePass,
    schema: scrollImagePassSchema,
  },
  "Sticky-Scroll": {
    component: StickyScroll,
    schema: stickyScrollSchema,
  },
};
