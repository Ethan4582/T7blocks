# Contributing to T7BLOCKS

Thank you for your interest in contributing to **T7BLOCKS**. We are building a high-end, premium component library for developers who demand $1000-level Framer design and motion quality within their React applications.

To maintain our standard of excellence, we have established a specific workflow and set of quality bars for all contributions.

## 🏗 Project Structure

T7BLOCKS is a **Turborepo** monorepo designed for high-performance development and deployment.

- **`packages/ui`**: The source of truth for all components (`@t7blocks/ui`).
- **`apps/blocks`**: The documentation and showcase site (deployed on Cloudflare Pages).
- **`apps/demo`**: The interactive playground for live testing components.
- **`packages/cli`**: The CLI tool for adding components to user projects via `npx`.

---

## 🎨 Quality Standards

We do not accept "basic" or "standard" UI components. Every submission must feel like it was crafted by a top-tier design agency.

### 1. Motion & Physics
- Use **Framer Motion** or **GSAP**.
- Animations must be buttery smooth .
- Use custom easing or spring physics; avoid linear browser defaults.

### 2. Aesthetic Excellence
- **Typography:** Precise weights and tight letter-spacing.
- **Modern Effects:** Glassmorphism, subtle gradients, and perfectly calculated shadows.
- **Responsiveness:** Components must be fluid across all breakpoints.

### 3. Code Integrity
- **TypeScript:** Strict typing is mandatory. No `any`.
- **Tailwind CSS:** Use Tailwind for all styling.
- **Isolation:** Components must be self-contained and not rely on global CSS or external assets beyond standard peer dependencies (`framer-motion`, `lucide-react`, etc.).

---

## 🚀 Contributor Workflow

As a contributor, your goal is to build the component, document it, and prove it works. The maintainer will handle the final NPM publishing and CLI synchronization.

### Step 1: Local Development
Ensure you have `pnpm` installed. Fork the repository and set up your environment:
```bash
git clone https://github.com/YOUR_USERNAME/T7blocks.git
cd T7blocks
pnpm install
```

### Step 2: Build the Component
Create your component in `packages/ui`.
- **Path:** `packages/ui/src/components/[category]/[name]/`
- **Structure:**
  - `[Name].tsx`: The component implementation.
  - `index.ts`: The entry point (exports the component).
- **Export:** Add your export to `packages/ui/src/index.ts`.

### Step 3: Register in Documentation (`apps/blocks`)
Your component needs to live on the showcase site.
1. **Registry:** Add an entry to `apps/blocks/lib/registry.ts`.
2. **Content:** Create `apps/blocks/lib/content/[name].ts`. This file should export the `codeBlock` string, `installCommand`, and `propsTable` data.

### Step 4: Add to Playground (`apps/demo`)
This is where users can interactively change props.
1. **Schema:** Create a prop schema in `apps/demo/lib/prop-schemas/components/[name].ts`.
2. **Page:** Create a dynamic page at `apps/demo/app/components/[category]/[name]/page.tsx`.

### Step 5: Verification
Run the dev servers to verify both the documentation and the demo:
```bash
pnpm turbo dev --filter=blocks --filter=demo
```
- Showcase: `http://localhost:3000`
- Demo: `http://localhost:3001`

---

## 🗳 Submission Checklist

Before opening a Pull Request, ensure you have:

- [ ] Cleaned up all console logs and debugging code.
- [ ] Strictly typed all component props.
- [ ] Provided a **High-Quality Screen Recording** (Loom, GIF, or MP4) in the PR description demonstrating the motion.
- [ ] Verified that the component renders correctly in both light and dark modes (if applicable).
- [ ] Confirmed the PR follows the [Conventional Commits](https://www.conventionalcommits.org/) format.

---

## 📄 Licensing

By contributing, you agree that your code will be licensed under the project's [MIT + Commons Clause License](LICENSE.md).

**Thank you for helping us push the boundaries of web UI!** 🧱✨