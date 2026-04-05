# Skill: Avoid Code Duplication

Follow these instructions to keep the T7blocks codebase DRY (Don't Repeat Yourself).

## Principles

1.  **Extract Shared Icons**: Use a common set of icons (from `lucide-react` or similar) and keep their configuration (size, strokeWidth) consistent via a shared set of icons or styles.
2.  **Reusable Types**: Define shared types in `lib/registry.ts` or a global types file if many components use them.
3.  **Registry-Driven UI**: Let the registry (`lib/registry.ts`) drive the display. Do not hardcode component metadata like titles or descriptions in page files. Always read from the registry.
4.  **Static Content Import Pattern**: Always use the dynamic import pattern for content from `lib/content/` to avoid manual copy-pasting of static content across multiple pages or components.

## Actionable Rules

- Check `lib/registry.ts` before adding a new component to see if a similar name or type already exists.
- If you catch yourself copy-pasting a function or a block of JSX, move it to a shared helper or component.
- Ensure only one instance of `generateStaticParams` exists for each dynamic route pattern to keep building parameters centralized.
