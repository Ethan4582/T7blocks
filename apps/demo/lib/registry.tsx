import { Dotlaunchbutton, PopHero, ScrollimagePass, StickyScroll, PullSwitch, KnobToggle, WaveButton, BouncyButton, StaggerText, FallingText } from "@t7blocks/ui";
import PullSwitchDemo from "@/app/canvas/PullSwitchDemo";
import KnobToggleDemo from "@/app/canvas/KnobToggleDemo";
import { launchButtonSchema } from "./prop-schemas/components/button/Launch-Button";
import { scrollImagePassSchema } from "./prop-schemas/interactions/scroll/ScrollimagePass";
import { stickyScrollSchema } from "./prop-schemas/interactions/scroll/StickyScroll";
import { pullSwitchSchema } from "./prop-schemas/misc/PullSwitch";
import { knobToggleSchema } from "./prop-schemas/components/button/KnobToggle";
import { waveButtonSchema } from "./prop-schemas/components/button/WaveButton";
import { BouncyButtonSchema } from "./prop-schemas/components/button/BouncyButton";
import { staggertextSchema } from "./prop-schemas/components/text/staggertext";
import { fallingtextSchema } from "./prop-schemas/components/text/fallingtext";

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
  "bouncy-button": {
    component: BouncyButton,
    schema: BouncyButtonSchema,
  },
  "stagger-text": {
    component: StaggerText,
    schema: staggertextSchema,
  },
  "falling-text": {
    component: FallingText,
    schema: fallingtextSchema,
  },
};


