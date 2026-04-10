export const codeBlock = `import { Dotlaunchbutton } from '@t7blocks/ui';

export default function Example() {
  return (
    <Dotlaunchbutton
      label="Get started"
      accentColor="#18db38"
      btnColor="#111111"
      animationSpeed={155}
    />
  );
}`;

export const installCommand = `pnpm add @t7blocks/ui framer-motion`;

export const propsTable = [
  {
    name: "label",
    type: "string",
    default: '"Get started"',
    description: "The text label to display on the button",
  },
  {
    name: "accentColor",
    type: "string",
    default: '"#18db38"',
    description: "The primary color of the grid and arrow animation",
  },
  {
    name: "btnColor",
    type: "string",
    default: '"#111111"',
    description: "The background color of the button",
  },
  {
    name: "animationSpeed",
    type: "number",
    default: "155",
    description: "The interval in milliseconds between animation steps",
  },
 
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Additional CSS classes for custom styling",
  },
];
