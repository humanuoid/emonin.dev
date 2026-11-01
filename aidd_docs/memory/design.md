# Design

The visual language: the design system, tokens, and UI conventions. What it looks like, not how it is coded.

## System

- No design library: plain CSS, centralized in `src/styles/` (tokens, base, one BEM file per component), imported once via `global.css`. Astro components hold markup only.
- Naming: BEM (`block__element`, `block--modifier`).
- Full visual contract: `aidd_docs/design-spec.md`.

## Tokens

- Colors, spacing, and typography as custom properties (design tokens), mobile-first, relative units.
- Accent scale (all tokens): `--accent` `#059669` (primary, light) / `#34d399` (dark), `--accent-hover` `#047857` (darkest site green, light) / `#6ee7b7`, `--accent-soft` `#34d399` (lightest, light) / `#a7f3d0`. Backgrounds: `#fbfbfb` light, `#0e0e0e` dark. Section bands: `--band-bg` token (accent desaturated 10% toward muted, 3.6% over `--bg`) — also the logo center layer.
- Shared inner inset token `--inset: 0.1rem` (theme-toggle knob offset AND page-TOC block padding — one spec).
- One shared "active surface": `--accent-hover` is the background of the ACTIVE state everywhere (page-TOC active link, theme-toggle knob).
- **Squared corners everywhere**: `--radius`/`--radius-lg` are `0`, including the theme toggle (squared gray track, squared 1.45rem accent-hover knob over the active icon; icons 0.75em at the 25%/75% marks — more padding inside the knob, tighter against the track).
- Header bottom border, nav indicator, nav-link hover underline and page-load loader share `--nav-underline: 3px`. The footer mirrors the header: surface background + 3px top border.
- `--error` token (red) for required markers.

## Logo

- No logo mark in the header: the brand is text only ("Emmanuel Monin" + role). The 3-layer hexagon lives only as `public/favicon.svg` (tab icon).

## Components

- One component = one responsibility, in `src/components/`, kebab-case file names (`project-card.astro`).

## Accessibility

- Semantic HTML, sufficient contrast, `alt` on every image. Target: Lighthouse ~100 on a static site, images optimized in `public/`.
