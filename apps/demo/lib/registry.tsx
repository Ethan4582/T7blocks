import { Dotlaunchbutton, PopHero, ScrollimagePass, StickyScroll, PullSwitch } from "@t7blocks/ui";
import PullSwitchDemo from "@/app/components/canvas/PullSwitchDemo";
import { launchButtonSchema } from "./prop-schemas/components/button/Launch-Button";
import { scrollImagePassSchema } from "./prop-schemas/components/scroll/ScrollimagePass";
import { stickyScrollSchema } from "./prop-schemas/components/scroll/StickyScroll";
import { pullSwitchSchema } from "./prop-schemas/components/misc/PullSwitch";

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
  "pull-switch": {
    component: PullSwitchDemo,
    schema: pullSwitchSchema,
  },
};

