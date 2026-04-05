# Complete Walkthrough — Adding `button-1`

---

## STEP 1 — Build the component in packages/ui

### 1.1 Create the folder

```bash
mkdir -p packages/ui/src/components/button/button-1
```

### 1.2 Install the component's dependency into packages/ui

```bash
# always from root
pnpm add framer-motion --filter @t7blocks/ui
```

Wait — `framer-motion` is a **peer dependency**, not a direct one. So instead:

```bash
# add it to peerDependencies manually in packages/ui/package.json
# then install it as a devDependency so you can develop locally
pnpm add -D framer-motion --filter @t7blocks/ui
```

In `packages/ui/package.json`, make sure it appears in `peerDependencies`:
```json
"peerDependencies": {
  "react": "^18.0.0",
  "framer-motion": "^11.0.0"
}
```

### 1.3 Write the component

Create `packages/ui/src/components/button/button-1/Button1.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface Button1Props {
  label?: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function Button1({
  label = "Click me",
  variant = "primary",
  size = "md",
  onClick,
}: Button1Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const sizeMap = {
    sm: { padding: "8px 20px", fontSize: "13px" },
    md: { padding: "12px 28px", fontSize: "15px" },
    lg: { padding: "16px 36px", fontSize: "17px" },
  };

  const isPrimary = variant === "primary";

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{
        ...sizeMap[size],
        background: isPrimary ? "#000" : "transparent",
        color: isPrimary ? "#fff" : "#000",
        border: "1.5px solid #000",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 500,
        letterSpacing: "-0.01em",
      }}
    >
      {label}
    </motion.button>
  );
}
```

### 1.4 Create the index file

Create `packages/ui/src/components/button/button-1/index.ts`:

```ts
export { Button1 } from './Button1';
```

### 1.5 Add to the barrel export

Update `packages/ui/src/index.ts`:

```ts
export { Button1 } from './components/button/button-1';
```

### 1.6 Build and verify

```bash
# from root
pnpm turbo build --filter=@t7blocks/ui
```

Check `packages/ui/dist/` — `index.d.ts` should include `Button1`.

---

## STEP 2 — Add to blocks (showcase page)

### 2.1 Add to registry

Update `apps/blocks/lib/registry.ts` — add this entry to the `registry` array:

```ts
{
  name: "button-1",
  displayName: "Button 1",
  category: "components",
  type: "button",
  isPremium: false,
  demoUrl: "https://demo.t7blocks.com/components/button/button-1",
  videoUrl: null,
  cliCommand: "npx @t7blocks/cli add button-1",
  dependencies: ["framer-motion"],
  description: "A smooth spring-animated button with primary and outline variants.",
},
```

### 2.2 Create the content file

Create `apps/blocks/lib/content/button-1.ts`:

```ts
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
```

### 2.3 The page is already handled dynamically

Because `apps/blocks` uses `[type]/[name]` dynamic routing, the page at
`/components/button/button-1` already exists — it reads from registry and renders based on the entry.

You only need to make sure the dynamic page file at
`app/components/[type]/[name]/page.tsx` reads the registry and the content file properly:

```tsx
import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import * as allContent from "@/lib/content/button-1"; // in real implementation: dynamic import by name

type Props = { params: { type: string; name: string } };

export default function ComponentPage({ params }: Props) {
  const entry = registry.find(
    (c) => c.type === params.type && c.name === params.name
  );

  if (!entry) return notFound();

  if (entry.isPremium) {
    return (
      <div>
        <span>PRO</span>
        <h1>{entry.displayName}</h1>
        {entry.videoUrl && <video src={entry.videoUrl} autoPlay muted loop />}
        <a href="https://pro.t7blocks.com">Get Pro →</a>
      </div>
    );
  }

  // free component
  return (
    <div>
      <h1>{entry.displayName}</h1>
      <p>{entry.description}</p>

      {/* dependency install */}
      <pre>{entry.cliCommand}</pre>

      {/* code block — content imported from lib/content/ */}
      <pre>{allContent.codeBlock}</pre>

      {/* props table */}
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          {allContent.propsTable.map((p) => (
            <tr key={p.name}>
              <td>{p.name}</td><td>{p.type}</td><td>{p.default}</td><td>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* demo link */}
      {entry.demoUrl && (
        <a href={entry.demoUrl} target="_blank" rel="noopener noreferrer">
          Live Demo →
        </a>
      )}
    </div>
  );
}
```

> In a real implementation the content import is dynamic based on `params.name`.
> A clean way: use `generateStaticParams` + a content map object in `lib/content/index.ts` that maps name → content module.

### 2.4 Test blocks locally

```bash
pnpm turbo dev --filter=blocks
```

Open `http://localhost:3000/components/button/button-1` — you should see:
- Component name and description
- Install command
- Code block
- Props table
- Live Demo link

---

## STEP 3 — Add to demo

### 3.1 Install framer-motion in the demo app

```bash
# from root
pnpm add framer-motion --filter demo
```

### 3.2 Create the prop schema

Create `apps/demo/lib/prop-schemas/components/button-1.ts`:

```ts
export const button1Schema = {
  label: {
    type: "select" as const,
    label: "Label",
    options: ["Click me", "Get started", "Learn more", "Submit"],
    default: "Click me",
  },
  variant: {
    type: "select" as const,
    label: "Variant",
    options: ["primary", "outline"],
    default: "primary",
  },
  size: {
    type: "select" as const,
    label: "Size",
    options: ["sm", "md", "lg"],
    default: "md",
  },
};
```

### 3.3 Create the demo page

Create `apps/demo/app/components/button/button-1/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Button1 } from "@t7blocks/ui";
import DemoCanvas from "@/components/DemoCanvas";
import PropControlCard from "@/components/PropControlCard";
import { button1Schema } from "@/lib/prop-schemas/components/button-1";

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
```

### 3.4 Test demo locally

```bash
pnpm turbo dev --filter=demo
```

Open `http://localhost:3001/components/button/button-1` — you should see:
- The button centered on a dark canvas
- A prop control card with Label, Variant, Size selects
- Changing any control updates the button live

---

## STEP 4 — Publish packages/ui to npm

Do this only once you have at least one real working component.

### 4.1 Create an npm account if you don't have one

```
https://www.npmjs.com/signup
```

### 4.2 Login to npm

```bash
npm login
# enter your username, password, email, OTP if 2FA enabled
```

### 4.3 Make sure version is correct

In `packages/ui/package.json`:
```json
"version": "0.0.1"
```

This is your first publish. Increment for every subsequent publish.

### 4.4 Build before publishing

```bash
pnpm turbo build --filter=@t7blocks/ui
```

Confirm `dist/` has all three files: `index.js`, `index.mjs`, `index.d.ts`.

### 4.5 Publish

```bash
pnpm publish --filter=@t7blocks/ui --access public --no-git-checks
```

- `--access public` — required for scoped packages (`@t7blocks/`) on free npm accounts
- `--no-git-checks` — skips git clean check (remove this flag once you have proper git workflow)

### 4.6 Verify it is live

```
https://www.npmjs.com/package/@t7blocks/ui
```

You should see version `0.0.1` listed.

---

## STEP 5 — Get the npm and pnpm install commands

Once published, users install with:

```bash
# npm
npm install @t7blocks/ui framer-motion

# pnpm
pnpm add @t7blocks/ui framer-motion

# yarn
yarn add @t7blocks/ui framer-motion
```

The `framer-motion` is listed separately because it is a peer dependency — the user must install it alongside `@t7blocks/ui`.

Show both commands on the blocks component page so users can copy whichever they prefer.

---

## STEP 6 — Publish packages/cli to npm

### 6.1 Make sure the component file is live on GitHub main branch first

The CLI fetches from raw GitHub URLs. If `Button1.tsx` is not on `main` yet, push it:

```bash
git add .
git commit -m "feat: add button-1 component"
git push origin main
```

### 6.2 Update registry.json with the real GitHub username

In `packages/cli/src/registry.json`, replace `YOUR_USERNAME`:

```json
{
  "button-1": {
    "isPremium": false,
    "files": [
      {
        "name": "Button1.tsx",
        "url": "https://raw.githubusercontent.com/YOUR_ACTUAL_USERNAME/T7blocks/main/packages/ui/src/components/button/button-1/Button1.tsx"
      }
    ],
    "dependencies": ["framer-motion"]
  }
}
```

### 6.3 Build the CLI

```bash
pnpm turbo build --filter=@t7blocks/cli
```

### 6.4 Publish the CLI

```bash
pnpm publish --filter=@t7blocks/cli --access public --no-git-checks
```

### 6.5 Verify

```
https://www.npmjs.com/package/@t7blocks/cli
```

---

## STEP 7 — Test the CLI as a random user would

Open a completely separate folder outside your monorepo:

```bash
cd ~/Desktop
mkdir test-cli-user
cd test-cli-user

# create a dummy package.json so it's a valid project
npm init -y
```

Now test the CLI without installing it:

```bash
# Using npx (no install needed)
npx @t7blocks/cli list
```

Expected output:
```
T7blocks components

Free
  button-1
```

Now add the component:

```bash
npx @t7blocks/cli add button-1
```

Expected output:
```
✔ Added button-1

Don't forget to install dependencies:
  pnpm add framer-motion
```

Check the file was created:

```bash
ls components/ui/
# Button1.tsx  ✅
```

Open `components/ui/Button1.tsx` — it should be the exact source from GitHub.

Install the peer dep and the package itself:

```bash
npm install @t7blocks/ui framer-motion
```

Create a quick test file `test.mjs`:

```js
import { Button1 } from "@t7blocks/ui";
console.log(typeof Button1); // "function"
```

```bash
node test.mjs
# function  ✅
```

---

## STEP 8 — Adding the Next Component (Pattern to Repeat)

For every new free component, the checklist is:

```
1. [ ] Create folder in packages/ui/src/components/[type]/[name]/
2. [ ] Write [ComponentName].tsx with typed props
3. [ ] Create index.ts in that folder
4. [ ] Export from packages/ui/src/index.ts
5. [ ] Add peer dep to packages/ui/package.json if needed
6. [ ] Build packages/ui — confirm dist updates
7. [ ] Add entry to apps/blocks/lib/registry.ts
8. [ ] Create apps/blocks/lib/content/[name].ts
9. [ ] Add framer-motion (or other dep) to apps/demo if not already there
10. [ ] Create apps/demo/lib/prop-schemas/components/[name].ts
11. [ ] Create apps/demo/app/components/[type]/[name]/page.tsx
12. [ ] Test blocks page at localhost:3000/components/[type]/[name]
13. [ ] Test demo page at localhost:3001/components/[type]/[name]
14. [ ] Push to main on GitHub
15. [ ] Bump version in packages/ui/package.json
16. [ ] pnpm turbo build --filter=@t7blocks/ui
17. [ ] pnpm publish --filter=@t7blocks/ui --access public
18. [ ] Add entry to packages/cli/src/registry.json with raw GitHub URL
19. [ ] pnpm turbo build --filter=@t7blocks/cli
20. [ ] Bump version in packages/cli/package.json
21. [ ] pnpm publish --filter=@t7blocks/cli --access public
22. [ ] Test with npx @t7blocks/cli add [name] in a fresh folder
```