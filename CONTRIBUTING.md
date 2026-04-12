# Contributing to T7blocks

T7blocks is a high-end animated component library — the kind of motion quality you see on premium Framer templates and agency landing pages.



## What we accept

- Animated components using GSAP or Framer Motion
- Hero sections with cinematic motion
- Background effects — particles, gradients, canvas animations
- Landing page blocks

**We do not accept** static components, generic UI widgets, or anything that duplicates what's already in the library. If you're unsure whether your idea fits, open a [GitHub Discussion](https://github.com/Ethan4582/T7blocks/discussions) before building.



## How to contribute

Your only job is to build the component and prove it works. The maintainer handles documentation, npm publishing, CLI updates, and deployment.

### Step 1 — Fork and set up

```bash
git clone https://github.com/Ethan4582/T7blocks
cd T7blocks
pnpm install
git checkout -b feat/your-component-name
```

Requirements: Node.js 20+, pnpm

### Step 2 — Build your component

Create your component inside `packages/ui/src/components/[category]/[name]/`

```
packages/ui/src/components/
└── button/
    └── button-1/
        ├── Button1.tsx   ← your component
        └── index.ts      ← export
```

`index.ts`:
```ts
export { Button1 } from './Button1';
```

Then add it to `packages/ui/src/index.ts`:
```ts
export { Button1 } from './components/button/button-1';
```

**Component rules — non-negotiable:**
- TypeScript strict — no `any`, all props typed
- Every prop must have a default value
- No hardcoded colours
- No global CSS — styles scoped to the component only
- Animation libs (`framer-motion`, `gsap`) must be peer deps, not bundled

### Step 3 — Test it locally

```bash
pnpm turbo build --filter=@t7blocks/ui
```

Build must pass with zero TypeScript errors.

### Step 4 — Open a pull request

**PR title:**
```
feat(ui): add Button1 magnetic spring button
```

**PR description must include:**
- A screen recording (Loom, GIF, or MP4) showing the animation
- List of peer dependencies your component needs
- Any props worth knowing about

That's it. The maintainer takes it from there.



## What the maintainer does after merge

- Writes the documentation page on the showcase site
- Adds the interactive demo with prop controls
- Publishes the updated `@t7blocks/ui` to npm
- Adds your component to the CLI
- Deploys everything

You do not need to touch any of that.



## Quality bar

Your component will be rejected if:
- The animation uses linear easing or feels generic
- Props are not typed or are missing defaults
- It doesn't work in Next.js and Vite
- There is no screen recording in the PR


## License

By submitting a PR, you agree your contribution is licensed under the [T7blocks License](LICENSE). Free components allow personal and commercial use. Redistribution as a standalone library is not permitted.