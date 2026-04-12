# Skill: Code Modularity

Follow these instructions to ensure high code modularity in T7blocks.

## Principles

1.  **Single Responsibility**: Each component should do one thing. If a component grows beyond 100 lines, extract its logic into smaller sub-components.
2.  **Separate UI from Content**: Never inline large static content (code blocks, prop tables) in UI components or pages. Use `lib/content/` for this.
3.  **UI Component Location**: Reusable UI components for the site (documentation UI) belong in `app/components/`. They should be small and single-purpose (e.g., `CodeBlock`, `ComponentCard`, `ProBadge`).
4.  **Prop passing**: Components should clearly define their props and avoid over-abstraction. Use standard TypeScript types for props.

## Actionable Rules

- If you find a pattern being used more than twice, extract it into a component in `app/components/`.
- If a page file contains complex logic or large JSX blocks, move them into standalone components within the same directory or `app/components/`.
- Use Tailwind utility classes directly. Only use CSS modules if complex animations require them (unlikely for this site's UI).
