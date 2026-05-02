# @t7blocks/cli

The official CLI for [T7blocks](https://t7blocks.xyz). Drop premium-quality animated components — hero sections, backgrounds, landing page blocks — directly into your project as editable source files.

[![npm version](https://img.shields.io/npm/v/@t7blocks/cli?style=flat-square)](https://www.npmjs.com/package/@t7blocks/cli)
[![npm downloads](https://img.shields.io/npm/dm/@t7blocks/cli?style=flat-square)](https://www.npmjs.com/package/@t7blocks/cli)
[![license](https://img.shields.io/badge/license-Custom-blue?style=flat-square)](https://github.com/Ethan4582/t7blocks/blob/master/LICENSE)

---

## Usage

No installation required:

```bash
npx @t7blocks/cli add button-1
```

Or install globally and use the short command:

```bash
npm install -g @t7blocks/cli
t7blocks add button-1
```

---

## Commands

### Add a component

```bash
npx @t7blocks/cli add <component-name>
```

Downloads the component source into `./components/ui/` in your project.

### List available components

```bash
npx @t7blocks/cli list
```

---

## Example

```bash
npx @t7blocks/cli add button-1

✔ Added button-1

Don't forget to install dependencies:
  npm install framer-motion
```

The file is written to `./components/ui/Button1.tsx`. It belongs to your project — edit it however you like.

---

## How it works

The CLI fetches component source files from the [T7blocks repository](https://github.com/Ethan4582/t7blocks) and writes them into your project. No compilation, no wrappers — just the raw `.tsx` file.

This is intentionally similar to how [shadcn/ui](https://ui.shadcn.com) works.

---

## Prefer importing from a package?

If you'd rather use an import than own the source:

```bash
npm install @t7blocks/ui
```

```tsx
import { Button1 } from '@t7blocks/ui'
```

See [@t7blocks/ui](https://www.npmjs.com/package/@t7blocks/ui) for the full list of available imports.

---

## Requirements

- Node.js 18+

---

## License

Copyright © 2025 Ashirwad Singh.

Read the full license → [LICENSE](https://github.com/Ethan4582/t7blocks/blob/master/LICENSE)