"use client";

import { useState } from "react";
import DemoCanvas from "./DemoCanvas";
import PropControlCard from "./PropControlCard";
import { registry } from "@/lib/registry";
import { components } from "@/lib/gallery";

export default function ComponentDemoClient({ 
  id, 
  blockUrl 
}: { 
  id: string; 
  blockUrl?: string;
}) {
  const componentData = components.find(c => c.id === id);
  const entry = registry[id];
  if (!entry) return <div>Component not found</div>;

  const { component: Component, schema } = entry;

  const initialProps = Object.keys(schema).reduce((acc: any, key: string) => {
    acc[key] = schema[key].default;
    return acc;
  }, {});

  const [props, setProps] = useState<Record<string, any>>(initialProps);

  return (
    <>
      <DemoCanvas 
        blockUrl={blockUrl} 
        canvasConfig={componentData?.canvas}
      >
        <Component {...props} />
      </DemoCanvas>
      <PropControlCard
        schema={schema}
        values={props}
        onChange={(key, value) =>
          setProps((prev) => ({ ...prev, [key]: value }))
        }
      />
    </>
  );
}
