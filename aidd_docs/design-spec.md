# Design Spec

The visual contract of emonin.dev. Minimal and elegant, inspired by ngandu.dev (not copied): white / very light gray backgrounds, thin lines, one vivid accent color.

## Tokens

Defined in `src/styles/tokens.css`. Light theme by default; dark theme comes from the system (`prefers-color-scheme`) unless the header toggle sets an explicit `[data-theme]` on `<html>` (persisted in `localStorage`, applied before first paint by an inline script to avoid any flash).

| Token | Light | Dark |
| ----- | ----- | ---- |
| `--bg` | `#fcfcfc` | `#000000` (pure black, max contrast) |
| `--surface` | `#ffffff` | `#1b1b21` (a notch above `--bg` so buttons/cards stand out) |
| `--text` | `#1c1c1e` | `#ffffff` (max contrast on dark) |
| `--muted` | `#6b7280` | `#a8a8b3` |
| `--border` | `#e8e8ea` | `#2e2e33` |
| `--accent` | `#6266bc` softened mauve (PHP `#777bb4` hue, less vivid) | `#a78bfa` bright electric violet |
| `--accent-hover` | `#5559a3` | `#c4b5fd` |
| `--accent-contrast` | `#ffffff` | `#2e1065` |
| `--mistral` | `#fa520f` | `#ff8205` |
| `--mistral-hover` | `#e04a0c` | `#ffa94d` |
| `--radius` | `0.5rem` | same |
| `--radius-lg` | `0.9rem` (buttons) | same |
| `--max-width` | `56rem` | same |
| `--font-sans` | Inter (Google Fonts), system-ui fallback | same |
| `--header-shadow`, `--shadow-btn*`, `--shadow-ghost*` | subtle light shadows | `none` — the dark theme is flat |

The accent is a vivid mauve inspired by PHP's `#777bb4` in light, and a bright electric violet in dark (on a pure black background, for maximum contrast): a nod to the language, distinct from GitHub green and LinkedIn blue. `--mistral` keeps the Mistral brand orange for the footer credit only, independent from `--accent`.

## CSS architecture

All CSS is centralized in `src/styles/`, imported once by `src/layouts/base-layout.astro` through `global.css`:

```
src/styles/
  tokens.css            design tokens (light + dark + [data-theme])
  base.css              reset + base element styles
  global.css            @import of everything
  components/
    buttons.css         BEM block "btn"
    icon-button.css     BEM block "icon-button" (shared circular icon button)
    header.css          BEM block "header"
    theme-toggle.css    BEM block "theme-toggle" (switch built on .icon-button)
    hero.css            BEM block "hero"
    page-header.css     BEM block "page-header"
    preview-section.css BEM block "preview"
    skills-section.css  BEM block "skills"
    project-card.css    BEM blocks "projects" and "project-card"
    contact-form.css    BEM blocks "contact" and "contact-form"
    footer.css          BEM block "footer"
```

- Naming: BEM. Block = component (`header`, `hero`, `footer`, `btn`), element = `block__element`, modifier = `block--modifier` (e.g. `btn--primary`, `btn--ghost`).
- Astro components in `src/components/` contain markup only, no `<style>`. Add a component's styles as one file in `src/styles/components/` and import it in `global.css`.
- No CSS framework, no utility library: plain CSS with custom properties, mobile-first, relative units.

## Components

| Component | File | BEM classes |
| --------- | ---- | ----------- |
| Site header | `site-header.astro` | `header`, `header__nav`, `header__brand`, `header__brand-dot`, `header__right`, `header__links` (+`--animated`), `header__pill-li`, `header__pill` (+`--hover`), `header__link`, `header__link--active` |
| Theme switch | `theme-toggle.astro` | `theme-toggle icon-button`, `theme-toggle__knob`, `theme-toggle__icon--sun`, `theme-toggle__icon--moon` |
| Icon button | in `icon-button.css` | `icon-button` (also used by `footer__social-link`) |
| Hero | `hero-section.astro` | `hero`, `hero__eyebrow`, `hero__title`, `hero__subtitle`, `hero__actions` |
| Buttons | in `buttons.css` | `btn`, `btn--sm`, `btn--lg`, `btn--primary`, `btn--ghost` |
| Page header | `page-header.astro` | `page-header`, `page-header__title`, `page-header__intro` |
| Preview section | `preview-section.astro` | `preview`, `preview__title`, `preview__list`, `preview__item`, `preview__cta` |
| Skills section | `skills-section.astro` | `skills`, `skills__title`, `skills__groups`, `skills__group`, `skills__group-title`, `skills__tags`, `skills__tag` |
| Project card | `project-card.astro` | `projects`, `projects__title`, `projects__grid`, `project-card`, `project-card__title`, `project-card__description`, `project-card__tags`, `project-card__tag`, `project-card__links`, `project-card__link` |
| Contact form | `contact-form.astro` | `contact`, `contact__success`, `contact__links`, `contact__link`, `contact-form`, `contact-form__honeypot`, `contact-form__field`, `contact-form__label`, `contact-form__input`, `contact-form__input--area`, `contact-form__submit` |
| Site footer | `site-footer.astro` | `footer`, `footer__inner`, `footer__copyright`, `footer__credit`, `footer__socials`, `footer__social-link` |
| Icon | `icon.astro` | inline SVG, no class |

## Theme

- Default: the system preference (`prefers-color-scheme`), no user action needed.
- The header control (`theme-toggle.astro`) is a **switch** (`role="switch"`, `aria-checked`): a pill track with a knob that slides left/right (`transition: left 0.2s ease`) and swaps moon/sun icon. It flips light/dark explicitly: sets `data-theme` on `<html>` and persists the choice in `localStorage`. An inline script in `base-layout.astro` applies the saved theme before first paint (no flash) and keeps `aria-checked` in sync; without JS, the site stays on the system preference.
- Tokens, the switch state and the icon switch on `:root[data-theme='dark']` and, for the system default, on `@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) { … } }`. `color-scheme` follows the same rules so scrollbars and form controls match.
- **Dark theme is flat**: all elevation shadows (`--header-shadow`, `--shadow-btn*`, `--shadow-ghost*`) are `none` in dark; they only exist in light.

## Header

- Surface background, 1px bottom border, and a very subtle shadow (`--header-shadow`, light only) to set it apart from the page.
- Mobile-first layout: on small screens the brand is on its own row and the nav links + theme switch share a second row; from `40rem` up (`@media (min-width: 40rem)`) everything is on one row.
- Nav links: shared sliding pill (see Links), padding `0.4rem 0.75rem`.

## Buttons

Rounded rectangle (`border-radius: var(--radius-lg)`, 0.9rem), three sizes (`btn--sm`, default md, `btn--lg`), two variants:

- `btn--primary`: accent gradient (`linear-gradient(135deg, var(--accent), var(--accent-hover))`) with the tokenized shadow `--shadow-btn` (neutral black shadow + inner top highlight in light, `none` in dark). Hover: `translateY(-1px)` and `--shadow-btn-hover`; active: pressed back down with `--shadow-btn-active`.
- `btn--ghost`: `--surface` background (a notch above `--bg` in dark so it stands out), 1px `--border`, `--shadow-ghost*` tokens, same lift on hover.

## Links

Text links (everything except `.btn`, `.header__brand`, `.header__link`, `.footer__social-link`) get an animated underline: a 1px line in `currentColor` that grows from left (`background-size: 0% → 100%`, 0.25s) on hover. Color still switches to `--accent-hover` on hover.

Nav links in the header do NOT use the underline. They share a single sliding pill (`.header__pill`, absolutely positioned in `.header__links`): on hover/focus it slides to the hovered link (`left`/`width` transition, `0.25s cubic-bezier(0.4, 0, 0.2, 1)`) with a neutral tint (`color-mix(in srgb, var(--muted) 14%, transparent)`), and rests on the active link with an accent tint (`color-mix(in srgb, var(--accent) 15%, transparent)`) plus accent text, weight 600. The pill is driven by a small inline script in `base-layout.astro`; without JS each link falls back to its own static `:hover` pill. `prefers-reduced-motion` disables the slide.

## Icons

Inline SVG through `src/components/icon.astro` (props: `name`, `size`), colored with `currentColor`. No icon library dependency.

- Brand logos: filled, paths from Simple Icons (`github`, `linkedin`, `mistral`).
- UI icons: stroked 1.5px round caps, paths from Lucide (`mail`, `arrow-up-right`, `download`, `send`).

## Footer credit

The footer states the site was designed with the help of Mistral AI, with the Mistral AI icon next to the link (https://mistral.ai). The credit keeps the Mistral brand orange via the dedicated `--mistral` / `--mistral-hover` tokens, independent from `--accent`.

## Accessibility and performance

Semantic HTML, sufficient contrast, `alt` on images, `aria-label` on icon-only links. Static site, target Lighthouse ~100.
