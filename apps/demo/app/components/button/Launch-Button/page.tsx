"use client";

import { useState } from "react";
import { Dotlaunchbutton } from "@t7blocks/ui";
import DemoCanvas from "@/components/DemoCanvas";
import PropControlCard from "@/components/PropControlCard";
import { launchButtonSchema } from "@/lib/prop-schemas/components/button/Launch-Button";

type Props = {
  label: string;
  accentColor: string;
  btnColor: string;
  animationSpeed: number;
};

const defaults: Props = {
  label: launchButtonSchema.label.default as string,
  accentColor: launchButtonSchema.accentColor.default as string,
  btnColor: launchButtonSchema.btnColor.default as string,
  animationSpeed: launchButtonSchema.animationSpeed.default as number,
};

export default function LaunchButtonDemo() {
  const [props, setProps] = useState<Props>(defaults);

  return (
    <>
      <DemoCanvas>
        <Dotlaunchbutton {...props} />
      </DemoCanvas>
      <PropControlCard
        schema={launchButtonSchema}
        values={props}
        onChange={(key, value) =>
          setProps((prev) => ({ ...prev, [key]: value }))
        }
      />
    </>
  );
}
