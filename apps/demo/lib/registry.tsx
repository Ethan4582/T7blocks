import { Dotlaunchbutton, PopHero, ScrollimagePass, StickyScroll, PullSwitch, KnobToggle, WaveButton } from "@t7blocks/ui";
import PullSwitchDemo from "@/app/components/canvas/PullSwitchDemo";
import KnobToggleDemo from "@/app/components/canvas/KnobToggleDemo";
import { launchButtonSchema } from "./prop-schemas/components/button/Launch-Button";
import { scrollImagePassSchema } from "./prop-schemas/interactions/scroll/ScrollimagePass";
import { stickyScrollSchema } from "./prop-schemas/interactions/scroll/StickyScroll";
import { pullSwitchSchema } from "./prop-schemas/misc/PullSwitch";
import { knobToggleSchema } from "./prop-schemas/components/button/KnobToggle";
import { waveButtonSchema } from "./prop-schemas/components/button/WaveButton";

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
    "wave-button": {
    component: WaveButton,
    schema: waveButtonSchema,
  },
};


