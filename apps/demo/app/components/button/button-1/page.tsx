"use client";

import { useState } from "react";
import { Button1 } from "@t7blocks/ui";
import DemoCanvas from "@/components/DemoCanvas";
import PropControlCard from "@/components/PropControlCard";
import { button1Schema } from "@/lib/prop-schemas/components/button/button-1";

type Props = {
  label: string;
  variant: "primary" | "outline";
  size: "sm" | "md" | "lg";
};

const defaults: Props = {
  label: button1Schema.label.default as string,
  variant: button1Schema.variant.default as "primary" | "outline",
  size: button1Schema.size.default as "sm" | "md" | "lg",
};

export default function Button1Demo() {
  const [props, setProps] = useState<Props>(defaults);

  return (
    <>
      <DemoCanvas>
        <Button1 {...props} />
      </DemoCanvas>
      <PropControlCard
        schema={button1Schema}
        values={props}
        onChange={(key, value) =>
          setProps((prev) => ({ ...prev, [key]: value }))
        }
      />
    </>
  );
}