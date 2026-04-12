export const codeBlock = `import { Button1 } from '@t7blocks/ui';

export default function Example() {
  return (
    <Button1
      label="Click me"
      variant="primary"
      size="md"
    />
  );
}`;

export const installCommand = `pnpm add @t7blocks/ui framer-motion`;

export const propsTable = [
  {
    name: "label",
    type: "string",
    default: '"Click me"',
    description: "Text shown inside the button",
  },
  {
    name: "variant",
    type: '"primary" | "outline"',
    default: '"primary"',
    description: "Visual style of the button",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Controls padding and font size",
  },
  {
    name: "onClick",
    type: "() => void",
    default: "undefined",
    description: "Click handler",
  },
];
