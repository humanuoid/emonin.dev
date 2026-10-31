# Design Spec

The visual contract of emonin.dev. Minimal and elegant, inspired by ngandu.dev (not copied): white / very light gray backgrounds, thin lines, one vivid accent color.

## Tokens

Defined in `src/styles/tokens.css`. Light theme by default, dark via `prefers-color-scheme` (no JS toggle).

| Token | Light | Dark |
| ----- | ----- | ---- |
| `--bg` | `#fcfcfc` | `#0a0a0b` |
| `--surface` | `#ffffff` | `#131315` |
| `--text` | `#1c1c1e` | `#ededed` |
| `--muted` | `#6b7280` | `#9ca3af` |
| `--border` | `#e8e8ea` | `#26262a` |
| `--accent` | `#0891b2` glacier cyan | `#22d3ee` |
| `--accent-hover` | `#0e7490` | `#67e8f9` |
| `--accent-contrast` | `#ffffff` | `#083344` |
| `--radius` | `0.5rem` | same |
| `--max-width` | `56rem` | same |
| `--font-sans` | Inter (Google Fonts), system-ui fallback | same |

The accent is a glacier cyan: evokes data engineering and architecture, clearly distinct from GitHub green and LinkedIn blue.

## CSS architecture

All CSS is centralized in `src/styles/`, imported once by `src/layouts/base-layout.astro` through `global.css`:

```
src/styles/
  tokens.css            design tokens (light + dark)
  base.css              reset + base element styles
  global.css            @import of everything
  components/
    header.css          BEM block "header"
    hero.css            BEM blocks "hero" and "btn"
    footer.css          BEM block "footer"
```

- Naming: BEM. Block = component (`header`, `hero`, `footer`, `btn`), element = `block__element`, modifier = `block--modifier` (e.g. `btn--primary`, `btn--ghost`).
- Astro components in `src/components/` contain markup only, no `<style>`. Add a component's styles as one file in `src/styles/components/` and import it in `global.css`.
- No CSS framework, no utility library: plain CSS with custom properties, mobile-first, relative units.

## Components

| Component | File | BEM classes |
| --------- | ---- | ----------- |
| Site header | `site-header.astro` | `header`, `header__nav`, `header__brand`, `header__brand-dot`, `header__links`, `header__link` |
| Hero | `hero-section.astro` | `hero`, `hero__eyebrow`, `hero__title`, `hero__subtitle`, `hero__actions` |
| Buttons | in `hero.css` | `btn`, `btn--primary`, `btn--ghost` |
| Site footer | `site-footer.astro` | `footer`, `footer__inner`, `footer__copyright`, `footer__credit`, `footer__socials`, `footer__social-link` |
| Icon | `icon.astro` | inline SVG, no class |

## Buttons

Neutral shadows only (no tinted glow), with a two-state interaction:

- Shadows are deliberately very light and near-identical across states; the 1px lift is the main hover cue.
- Rest: `0 1px 2px rgb(0 0 0 / 0.05)` (+ `inset 0 1px 0 rgb(255 255 255 / 0.15)` highlight on primary).
- Hover: `translateY(-1px)`, `0 1px 3px rgb(0 0 0 / 0.07)`.
- Active (click): `translateY(0)`, `0 1px 1px rgb(0 0 0 / 0.04)`.
- `btn--primary`: accent background, `--accent-contrast` text. `btn--ghost`: `--surface` background, 1px `--border`.

## Links

Text links (everything except `.btn`, `.header__brand`, `.footer__social-link`) get an animated underline: a 1px line in `currentColor` that grows from left (`background-size: 0% → 100%`, 0.25s) on hover. Color still switches to `--accent-hover` on hover.

## Icons

Inline SVG through `src/components/icon.astro` (props: `name`, `size`), colored with `currentColor`. No icon library dependency.

- Brand logos: filled, paths from Simple Icons (`github`, `linkedin`, `mistral`).
- UI icons: stroked 1.5px round caps, paths from Lucide (`mail`, `arrow-up-right`).

## Footer credit

The footer states the site was designed with the help of Mistral AI, with the Mistral AI icon next to the link (https://mistral.ai).

## Accessibility and performance

Semantic HTML, sufficient contrast, `alt` on images, `aria-label` on icon-only links. Static site, target Lighthouse ~100.
