"use client";

import { useState } from "react";
import DemoCanvas from "./DemoCanvas";
import PropControlCard from "./PropControlCard";
import { registry } from "@/lib/registry";

export default function ComponentDemoClient({ 
  id, 
  blockUrl 
}: { 
  id: string; 
  blockUrl?: string;
}) {
  const entry = registry[id];
  if (!entry) return <div>Component not found</div>;

  const { component: Component, schema } = entry;

  // Initialize props with defaults from schema
  const initialProps = Object.keys(schema).reduce((acc: any, key: string) => {
    acc[key] = schema[key].default;
    return acc;
  }, {});

  const [props, setProps] = useState(initialProps);

  return (
    <>
      <DemoCanvas blockUrl={blockUrl}>
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
