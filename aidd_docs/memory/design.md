# Design

The visual language: the design system, tokens, and UI conventions. What it looks like, not how it is coded.

## System

- No design library: plain CSS in scoped Astro component styles.
- Styling method: scoped `<style>` per component, design tokens as CSS custom properties.

## Tokens

- Colors, spacing, and typography as custom properties (design tokens), mobile-first, relative units.

## Components

- One component = one responsibility, in `src/components/`, kebab-case file names (`project-card.astro`).

## Accessibility

- Semantic HTML, sufficient contrast, `alt` on every image. Target: Lighthouse ~100 on a static site, images optimized in `public/`.
