
## PLAN A — Adding a Brand New Component

Example: adding `button-1` of type `button`.

### Step 1 — Build the component in packages/ui

```bash
mkdir -p packages/ui/src/components/button/button-1
```

Create `packages/ui/src/components/button/button-1/Button1.tsx` — write the component with typed props and sensible defaults.

Create `packages/ui/src/components/button/button-1/index.ts`:
```ts
export { Button1 } from './Button1';
```

Add to `packages/ui/src/index.ts`:
```ts
export { Button1 } from './components/button/button-1';
```

If the component needs a peer dependency (e.g. framer-motion):
```bash
# add as devDep for local development
pnpm add -D framer-motion --filter @t7blocks/ui

# also add to peerDependencies manually in packages/ui/package.json
"peerDependencies": {
  "react": "^18.0.0",
  "framer-motion": "^11.0.0"
}
```

Build and verify:
```bash
pnpm turbo build --filter=@t7blocks/ui
# confirm dist/ has index.js, index.mjs, index.d.ts
```

---

### Step 2 — Add to apps/blocks (showcase site)

**Add registry entry** in `apps/blocks/lib/registry.ts`:
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
}
```

**Create content file** at `apps/blocks/lib/content/button-1.ts`:
```ts
export const codeBlock = `import { Button1 } from '@t7blocks/ui';

export default function Example() {
  return <Button1 label="Click me" variant="primary" size="md" />;
}`;

export const installCommand = `pnpm add @t7blocks/ui framer-motion`;

export const propsTable = [
  { name: "label", type: "string", default: '"Click me"', description: "Button text" },
  { name: "variant", type: '"primary" | "outline"', default: '"primary"', description: "Visual style" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size" },
];
```

Test blocks locally:
```bash
pnpm turbo dev --filter=blocks
# open http://localhost:3000/components/button/button-1
```

---j

### Step 3 — Add to apps/demo (interactive demo)

Install the peer dep in demo if not already there:
```bash
pnpm add framer-motion --filter demo
```

**Create prop schema** at `apps/demo/lib/prop-schemas/components/button-1.ts`:
```ts
export const button1Schema = {
  label: { type: "select" as const, label: "Label", options: ["Click me", "Get started"], default: "Click me" },
  variant: { type: "select" as const, label: "Variant", options: ["primary", "outline"], default: "primary" },
  size: { type: "select" as const, label: "Size", options: ["sm", "md", "lg"], default: "md" },
};
```

**Create demo page** at `apps/demo/app/components/button/button-1/page.tsx`:
```tsx
"use client";
import { useState } from "react";
import { Button1 } from "@t7blocks/ui";
import DemoCanvas from "@/components/DemoCanvas";
import PropControlCard from "@/components/PropControlCard";
import { button1Schema } from "@/lib/prop-schemas/components/button-1";

export default function Button1Demo() {
  const [props, setProps] = useState({
    label: button1Schema.label.default,
    variant: button1Schema.variant.default as "primary" | "outline",
    size: button1Schema.size.default as "sm" | "md" | "lg",
  });

  return (
    <>
      <DemoCanvas><Button1 {...props} /></DemoCanvas>
      <PropControlCard
        schema={button1Schema}
        values={props}
        onChange={(key, value) => setProps((prev) => ({ ...prev, [key]: value }))}
      />
    </>
  );
}
```

Test demo locally:
```bash
pnpm turbo dev --filter=demo
# open http://localhost:3001/components/button/button-1
```

---

### Step 4 — Push to GitHub

This must happen before CLI publish. The raw GitHub URL must resolve.

```bash
git add .
git commit -m "feat: add button-1 component"
git push origin master
```

Verify the raw URL works in browser:
```
https://raw.githubusercontent.com/Ethan4582/T7blocks/master/packages/ui/src/components/button/button-1/Button1.tsx
```

It must return the raw file content — not a 404.

---

### Step 5 — Publish @t7blocks/ui to npm

Bump version in `packages/ui/package.json`:
```json
"version": "0.0.2"
```

Build:
```bash
pnpm turbo build --filter=@t7blocks/ui
```

Publish:
```bash
pnpm publish --filter=@t7blocks/ui --access public --no-git-checks
```

Verify:
```
https://www.npmjs.com/package/@t7blocks/ui
```
New version number must be visible.

---

### Step 6 — Add to CLI registry and publish @t7blocks/cli

**Add entry to `packages/cli/src/registry.json`:**
```json
{
  "button-1": {
    "isPremium": false,
    "files": [
      {
        "name": "Button1.tsx",
        "url": "https://raw.githubusercontent.com/Ethan4582/T7blocks/master/packages/ui/src/components/button/button-1/Button1.tsx"
      }
    ],
    "dependencies": ["framer-motion"]
  }
}
```

If the component also has a `.css` file, add it as a second entry in `files`:
```json
{
  "name": "Button1.css",
  "url": "https://raw.githubusercontent.com/Ethan4582/T7blocks/master/packages/ui/src/components/button/button-1/Button1.css"
}
```

Bump version in `packages/cli/package.json`:
```json
"version": "0.0.2"
also in readme file for both cli and package 
```

Build:
```bash
pnpm turbo build --filter=@t7blocks/cli
```

Publish:
```bash
pnpm publish --filter=@t7blocks/cli --access public --no-git-checks
```

Verify:
```
https://www.npmjs.com/package/@t7blocks/cli
```

---

### Step 7 — Test as a real user

Go to a completely separate folder outside the monorepo:

```bash
cd ~/Desktop
mkdir test-user && cd test-user
npm init -y

# test list command
npx @t7blocks/cli list

# test add command
npx @t7blocks/cli add button-1

# verify file was created
cat components/ui/Button1.tsx

# install deps and test the import
npm install @t7blocks/ui framer-motion
```

All steps must pass before the component is considered shipped.

---

## PLAN B — Updating an Existing Component

Use this when you fix a bug, change a prop, or improve an existing component.

### Step 1 — Make the change in packages/ui

Edit the component file at `packages/ui/src/components/[type]/[name]/[ComponentName].tsx`.

If you added or removed a prop:
- Update the content file at `apps/blocks/lib/content/[name].ts` (propsTable, codeBlock)
- Update the prop schema at `apps/demo/lib/prop-schemas/components/[name].ts`
- Update the demo page at `apps/demo/app/components/[type]/[name]/page.tsx`
- Update the registry entry at `apps/blocks/lib/registry.ts` if description changed

Build and test locally:
```bash
pnpm turbo build --filter=@t7blocks/ui
pnpm turbo dev --filter=blocks
pnpm turbo dev --filter=demo
```

---

### Step 2 — Push to GitHub master

```bash
git add .
git commit -m "fix: update button-1 [describe what changed]"
git push origin master
```

Verify the raw URL still resolves correctly in browser.

---

### Step 3 — Decide which packages need a version bump

| What changed | Bump @t7blocks/ui | Bump @t7blocks/cli |
|---|---|---|
| Component logic / styling only | ✅ Yes | ✅ Yes (raw URL content changed) |
| Added a new prop | ✅ Yes | ✅ Yes |
| Removed or renamed a prop (breaking) | ✅ Major bump | ✅ Yes |
| Only blocks/demo site changed | ❌ No | ❌ No |
| Only registry.json URL fixed | ❌ No | ✅ Yes |
| Added a new component | ✅ Yes | ✅ Yes |

**Version bump rules:**
```
Patch x.x.1  → bug fix, style tweak, no API change
Minor x.1.0  → new component added, new prop added (non-breaking)
Major 1.0.0  → prop removed, prop renamed, breaking change
```

---

### Step 4 — Publish @t7blocks/ui (if needed)

```bash
# bump version in packages/ui/package.json first
pnpm turbo build --filter=@t7blocks/ui
pnpm publish --filter=@t7blocks/ui --access public --no-git-checks
```

---

### Step 5 — Publish @t7blocks/cli (if needed)

```bash
# bump version in packages/cli/package.json first
pnpm turbo build --filter=@t7blocks/cli
pnpm publish --filter=@t7blocks/cli --access public --no-git-checks
```

---

### Step 6 — Test the update

```bash
cd ~/Desktop/test-user

# force npx to use the latest version (clear cache)
npx --yes @t7blocks/cli@latest add button-1
```

Confirm the downloaded file matches your update.

---

## QUICK REFERENCE — All Publish Commands

```bash
# Build UI package
pnpm turbo build --filter=@t7blocks/ui

# Publish UI package
pnpm publish --filter=@t7blocks/ui --access public --no-git-checks

# Build CLI
pnpm turbo build --filter=@t7blocks/cli

# Publish CLI
pnpm publish --filter=@t7blocks/cli --access public --no-git-checks

# Test CLI as user (clears npx cache with @latest)
npx @t7blocks/cli@latest add button-1
npx @t7blocks/cli@latest list
```

---

## QUICK REFERENCE — Install Commands for Users

**Import workflow (use the npm package):**
```bash
pnpm add @t7blocks/ui framer-motion
```
```ts
import { Button1 } from "@t7blocks/ui"
```

**Source ownership workflow (use the CLI):**
```bash
# one-off, downloads file into ./components/ui/
npx @t7blocks/cli add button-1

# then install peer deps
pnpm add framer-motion
```

**List available components:**
```bash
npx @t7blocks/cli list
```

---

## CHECKLIST — Before Every Publish

```
[ ] Component builds cleanly: pnpm turbo build --filter=@t7blocks/ui
[ ] No TypeScript errors
[ ] Tested locally on blocks site
[ ] Tested locally on demo site
[ ] Pushed to GitHub master branch
[ ] Raw GitHub URL resolves in browser (not 404)
[ ] Version bumped in packages/ui/package.json
[ ] Version bumped in packages/cli/package.json (if CLI changed)
[ ] registry.json URL uses master branch (not main)
[ ] Tested with npx @t7blocks/cli@latest in a fresh folder outside monorepo
```