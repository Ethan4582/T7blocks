# Skill: Static Content Organization

Follow these instructions to keep dynamic data and documentation content well-organized.

## Principles

1.  **Categorical Separation**: Large static strings and metadata must be separated by category: `components`, `background`, and `hero`.
2.  **File Naming**: All content files must be named after their corresponding registry entry's name (kebab-case) and live inside their category and type folders.
    *   `lib/content/components/[type]/[name].ts`
    *   `lib/content/background/[type]/[name].ts`
    *   `lib/content/hero/[type]/[name].ts`
3.  **Standard Exports**: Every content file must export the same object structure for consistency:
    *   `codeBlock`: string containing the example usage.
    *   `installCommand`: string with the exact peer deps install instructions.
    *   `propsTable`: array of prop objects `{ name, type, default, description }`.

## Actionable Rules

- When adding a new component, first add an entry to `lib/registry.ts`.
- Then create the corresponding file in `lib/content/[category]/[type]/[name].ts`.
- Ensure the export names in this file match the expected interface used by the detail pages.
- Never put this content directly into the code of a `.tsx` file inside `app/`.
