import { Dotlaunchbutton, PopHero, ScrollimagePass, StickyScroll, PullSwitch, KnobToggle } from "@t7blocks/ui";
import PullSwitchDemo from "@/app/components/canvas/PullSwitchDemo";
import KnobToggleDemo from "@/app/components/canvas/KnobToggleDemo";
import { launchButtonSchema } from "./prop-schemas/components/button/Launch-Button";
import { scrollImagePassSchema } from "./prop-schemas/components/scroll/ScrollimagePass";
import { stickyScrollSchema } from "./prop-schemas/components/scroll/StickyScroll";
import { pullSwitchSchema } from "./prop-schemas/components/misc/PullSwitch";
import { knobToggleSchema } from "./prop-schemas/components/button/KnobToggle";

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
  "knob-toggle": {
    component: KnobToggleDemo,
    schema: knobToggleSchema,
  },
};


