import { Dotlaunchbutton, PopHero } from "@t7blocks/ui";
import { launchButtonSchema } from "./prop-schemas/components/button/Launch-Button";

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
};
