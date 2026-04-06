export const codeBlock = `// Hero 1 Placeholder
import { Button1 } from '@t7blocks/ui';

export default function HeroNature() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Hero Nature Example</h1>
      <Button1 label="Get Started" />
    </div>
  );
}`;

export const propsTable = [
  { name: "theme", type: "string", default: '"light"', description: "Controls the visual background theme" }
];
