# JSX/TSX Source Display Toggle Plan

## Scope
- `apps/blocks` only
- No changes to `packages/ui`, `packages/cli`, or `apps/demo`
- CLI ships TypeScript only, nothing changes there

---

## What changes

### 1. `apps/blocks/lib/readSource.ts`

Current: reads raw file content and returns it as-is.

Add a second exported function `getComponentSourceAsJsx(relativePath)` that:
- Reads the file the same way as `getComponentSource`
- Passes the content through a transform function that strips TypeScript syntax
- Returns the cleaned JavaScript string

The transform must handle:
- Interface and type declarations (`interface Foo {}`, `type Foo = ...`)
- Type annotations on props (`prop: string` → `prop`)
- Generic type parameters on functions (`function Foo<T>` → `function Foo`)
- Import type statements (`import type { X }` → remove entire line)
- Type assertions (`value as string` → `value`)
- Return type annotations (`: JSX.Element` → remove)
- The `satisfies` operator if used

Use the `sucrase` package for this transform — it is designed exactly for stripping TypeScript syntax to produce valid JavaScript. It is lightweight, fast, and handles all edge cases above correctly. Do not write a regex-based stripper — it will break on complex components.

```bash
pnpm add sucrase --filter blocks
```

Sucrase's `transform` function with `transforms: ['typescript', 'jsx']` produces clean JSX output from TSX source.

### 2. `apps/blocks/lib/readSource.ts` — updated shape

```ts
// existing - unchanged
export function getComponentSource(relativePath: string): string

// new
export function getComponentSourceAsJsx(relativePath: string): string
```

Both functions resolve the file path the same way. `getComponentSourceAsJsx` just passes the result through sucrase before returning.

---

### 3. Component showcase pages

Every individual component page that currently renders a code block gets a tab switcher UI above the code block.

Default tab: **JavaScript** (JSX)
Second tab: **TypeScript** (TSX)

The page fetches both versions at build time since it is a server component:

```ts
const tsxSource = getComponentSource(path)
const jsxSource = getComponentSourceAsJsx(path)
```

Both strings are passed as props to the code block component. The tab switcher is a `"use client"` component that toggles which string is displayed. No additional server calls on tab switch — both strings are already in the page.

Only the **source code block** changes on tab switch. These do not change:
- Install command
- Usage snippet (`<Button text="hello" />`)
- Props table
- CLI command
- Demo link

---

### 4. `apps/blocks/components/ui/CodeBlock.tsx`

Update to accept `jsxCode` and `tsxCode` as separate props instead of a single `code` prop. Renders the tab switcher internally. The switcher is minimal — two buttons, active state styling. No external tab library needed.

---

### 5. Hero section pages

Hero sections have two files — TSX and CSS. The CSS file has no TypeScript so it does not need a toggle. Only the TSX tab gets the JSX/TSX switcher. The CSS tab is always the same.

---

## What does not change

- `getComponentSource` function signature and behaviour
- CLI — ships `.tsx` only, no detection, no changes
- Props table data
- Usage snippet code blocks
- Demo links and video previews
- Any page structure or layout
- `packages/ui` source files

---

## Implementation order

1. Install sucrase in `apps/blocks`
2. Add `getComponentSourceAsJsx` to `source.ts`
3. Test the transform locally on one complex component to verify it produces valid JS
4. Update `CodeBlock.tsx` to accept both strings and render the tab switcher
5. Update component pages to pass both strings
6. Update hero pages for the TSX file tab only