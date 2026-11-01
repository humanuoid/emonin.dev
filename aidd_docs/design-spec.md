# Design Spec

The visual contract of emonin.dev. Minimal and elegant, inspired by ngandu.dev (not copied): white / very light gray backgrounds, thin lines, one vivid accent color.

## Tokens

Defined in `src/styles/tokens.css`. Light theme by default; dark theme comes from the system (`prefers-color-scheme`) unless the header toggle sets an explicit `[data-theme]` on `<html>` (persisted in `localStorage`, applied before first paint by an inline script to avoid any flash).

| Token | Light | Dark |
| ----- | ----- | ---- |
| `--bg` | `#fbfbfb` (very light neutral gray) | `#0e0e0e` (near-black, not pure black) |
| `--surface` | `#ffffff` | `#161616` (a notch above `--bg` so buttons/cards stand out) |
| `--text` | `#1c1c1e` | `#f2f5f3` (near-white, strong contrast) |
| `--muted` | `#4b5563` | `#d4d9d6` |
| `--border` | `#e8e8ea` | `#262626` |
| `--accent` | `#059669` emerald (primary: modern, simple, environment) | `#34d399` light emerald |
| `--accent-hover` | `#047857` (darkest site green) | `#6ee7b7` — also the shared "active surface" (TOC active link, toggle knob) |
| `--accent-soft` | `#34d399` (lightest site green; logo inner layer) | `#a7f3d0` |
| `--accent-contrast` | `#ffffff` | `#06251a` |
| `--warning`, `--warning-hover` | `#d97706`, `#b45309` | `#fbbf24`, `#fcd34d` (amber, for warning accents: callout liseret, form notice) |
| `--error` | `#dc2626` (required markers) | `#f87171` |
| `--mistral` | `#fa520f` | `#ff8205` |
| `--mistral-hover` | `#e04a0c` | `#ffa94d` |
| `--radius`, `--radius-lg` | `0` — squared corners everywhere | same |
| `--nav-underline` | `3px` — header border, nav indicator, nav-link underline, page-load loader | same |
| `--inset` | `0.1rem` — shared inner inset (theme-toggle knob offset, page-TOC block padding) | same |
| `--band-bg` | section band background on inner pages = accent desaturated 10% toward muted, 3.6% over `--bg` (also the logo's center layer) | same (recomputed from dark tokens) |
| `--max-width` | `56rem` | same |
| `--font-sans` | Inter (Google Fonts), system-ui fallback | same |
| `--header-shadow`, `--shadow-btn*`, `--shadow-ghost*` | subtle light shadows | `none` — the dark theme is flat |

The accent is emerald in light (`#059669`), a lighter emerald in dark (`#34d399` on a near-black background): modern, simple, environment. `--mistral` keeps the Mistral brand orange for the footer credit only, independent from `--accent`.

**Logo**: no mark in the header (text-only brand: full name + role). The 3-layer hexagon exists only as `public/favicon.svg`.

## CSS architecture

All CSS is centralized in `src/styles/`, imported once by `src/layouts/base-layout.astro` through `global.css`:

```
src/styles/
  tokens.css            design tokens (light + dark + [data-theme])
  base.css              reset + base element styles
  global.css            @import of everything
  components/           mirrors src/components/ subfolders
    ui/
      buttons.css         BEM block "btn"
      icon-button.css     BEM block "icon-button" (shared circular icon button)
      theme-toggle.css    BEM block "theme-toggle" (switch built on .icon-button)
      tooltip.css         [data-hint]::after tooltip (hover + focus), used by tech tags
    layout/
      header.css          BEM block "header"
      page-header.css     BEM block "page-header"
      footer.css          BEM block "footer"
    sections/
      hero.css            BEM block "hero"
      preview-section.css BEM block "preview"
      skills-section.css  BEM block "skills"
      experience-section.css  BEM block "experience"
      projects-section.css    BEM block "projects"
      values-section.css      BEM block "values"
    cards/
      project-card.css    BEM block "project-card"
      experience-card.css BEM block "experience-card"
    forms/
      contact-form.css    BEM blocks "contact" and "contact-form"
```

- Naming: BEM. Block = component (`header`, `hero`, `footer`, `btn`), element = `block__element`, modifier = `block--modifier` (e.g. `btn--primary`, `btn--ghost`).
- Astro components in `src/components/` contain markup only, no `<style>`, and no hardcoded text: pages pass content from `src/content/` collections as props. Components are grouped by role — `layout/` (page chrome), `sections/` (page sections), `cards/` (list items), `forms/`, `ui/` (primitives). Add a component's styles as one file in the matching `src/styles/components/` subfolder and import it in `global.css`.
- No CSS framework, no utility library: plain CSS with custom properties, mobile-first, relative units.

## Components

| Component | File | BEM classes |
| --------- | ---- | ----------- |
| Site header | `layout/site-header.astro` (prop: `nav`) | `header`, `header__nav`, `header__brand`, `header__brand-dot`, `header__right`, `header__links` (+`--animated`), `header__pill-li`, `header__pill` (+`--hover`), `header__link`, `header__link--active` |
| Theme switch | `ui/theme-toggle.astro` | `theme-toggle icon-button`, `theme-toggle__knob`, `theme-toggle__icon--sun`, `theme-toggle__icon--moon` |
| Icon button | in `ui/icon-button.css` | `icon-button` (also used by `footer__social-link`) |
| Hero | `sections/hero-section.astro` (prop: `hero`, h1 icon + CTAs with icons) | `hero`, `hero__eyebrow`, `hero__title`, `hero__title-icon`, `hero__subtitle`, `hero__location`, `hero__actions` |
| Buttons | in `ui/buttons.css` | `btn`, `btn--sm`, `btn--lg`, `btn--primary`, `btn--ghost` |
| Page header | `layout/page-header.astro` (props: `icon?`, `title`, `intro`) | `page-header`, `page-header__title`, `page-header__title-icon`, `page-header__intro` |
| Preview section | `sections/preview-section.astro` (prop: `preview`, highlight cards) | `preview`, `preview__title`, `preview__grid`, `preview__highlight`, `preview__icon`, `preview__highlight-title`, `preview__highlight-text`, `preview__cta` |
| Skills section | `sections/skills-section.astro` (props: `title`, `groups`; group icon + neutral title, masonry columns, tags get `data-hint` from the glossary) | `skills`, `skills__title`, `skills__groups`, `skills__group`, `skills__group-title`, `skills__group-icon`, `skills__group-description`, `skills__tags`, `skills__tag` |
| Experience section | `sections/experience-section.astro` (props: `title`, `educationTitle`, `entries`) | `experience`, `experience__title`, `experience__subtitle`, `experience__list` |
| Experience card | `cards/experience-card.astro` (prop: `entry`) | `experience-card`, `experience-card__period`, `experience-card__body`, `experience-card__role`, `experience-card__meta`, `experience-card__summary`, `experience-card__highlights` |
| Projects section | `sections/projects-section.astro` (props: `title`, `projects`) | `projects`, `projects__title`, `projects__grid` |
| Project card | `cards/project-card.astro` (props: `project`, `linkLabels`; tags carry `data-hint` tooltips) | `project-card`, `project-card__heading`, `project-card__title`, `project-card__period`, `project-card__description`, `project-card__tags`, `project-card__tag`, `project-card__links`, `project-card__link` |
| Values section | `sections/values-section.astro` (props: `title`, `values`, `hobbies`; each tag has an icon) | `values`, `values__title`, `values__groups`, `values__group`, `values__group-title`, `values__tags`, `values__tag` |
| Contact form | `forms/contact-form.astro` | `contact`, `contact__success`, `contact__links`, `contact__link`, `contact-form`, `contact-form__honeypot`, `contact-form__field`, `contact-form__label`, `contact-form__input`, `contact-form__input--area`, `contact-form__submit` |
| Site footer | `layout/site-footer.astro` (prop: `socials`) | `footer`, `footer__inner`, `footer__copyright`, `footer__credit`, `footer__socials`, `footer__social-link` |
| Icon | `ui/icon.astro` | inline SVG, no class |

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
- UI icons: stroked 1.5px round caps, paths from Lucide (`mail`, `arrow-up-right`, `arrow-right`, `download`, `send`, `layers`, `database`, `shield-check`, `target`, `lightbulb`, `users`, `zap`, `footprints`, `mountain`, `trees`, `gamepad-2`, `utensils-crossed`, `code`, `monitor`, `flask-conical`, `sparkles`, `server`, `user`, `compass`, `map-pin`, `file-text`, `x`, `briefcase`, `folder`, `heart`).

## Tooltips on tech tags

- Any element with a `data-hint` attribute gets a pure-CSS tooltip (`ui/tooltip.css`): shown on `:hover` and `:focus` (tags are `tabindex="0"`, so a tap on mobile shows it too), inverted colors (`--text` on `--bg`) so it reads in both themes, `prefers-reduced-motion` disables the fade. The hint text lives in the content (`hint` field of skill/project tags), never in the markup.

## Highlighted terms in prose

- Prose fields in `src/content/` can mark a technical word with `[[term]]` (hint from the glossary) or `[[term|custom hint]]` (override). The helper `src/lib/terms.ts` (`withTerms()` + `getGlossary()`) escapes the text, then turns each marker into `<span class="term" tabindex="0" data-hint="hint">term</span>`, rendered with `set:html`. A term missing from the glossary renders as plain text.
- **Glossary** (`src/content/site/glossary.md`, one `terms:` list): ONE definition per technical term, shared by inline `[[term]]` markers AND tech tags (skill items, project tags resolve their hint via `hintFor()`). Lookup is case- and whitespace-insensitive, so `RBAC/ABAC` and `RBAC / ABAC` are the same entry. The `.term` class (in `ui/tooltip.css`) is a discreet dotted underline in accent (45% opacity) and reuses the `data-hint` tooltip on hover/focus.
- **h1 icons**: page titles (hero, page-header) can carry a colored accent icon next to the text (`icon` field in the site content, optional on the hero).
- **Skills section**: 3 independent columns (a grid of flex columns, groups split into chunks by the component so mobile stacking keeps the reading order). Each column has its own height, so the horizontal alignment is broken — true masonry. Do NOT use CSS multicol (`columns`) here: it fragments overflowing content, which clips absolutely-positioned tooltips. Each group has a colored accent icon and a neutral (`--text`) title; tags are small pills (0.75rem).
- **Section separation on inner pages**: sections alternate with a full-width `.band` (accent tint at 5% over `--bg`, in `base.css`). All sections share the same internal padding (`3rem 1.5rem`), and `.band` adds none, so banded and plain sections have identical top/bottom margins. Each section title carries a colored accent icon (`sectionIcons` in the parcours content).
- **Icon sizing**: `icon.astro` takes `size` in `em` (default `1`), so an icon always matches the text it accompanies — h1 icons 0.75em, section titles 0.85em, inline icons 1em, small tag icons 1.2em.
- **Project cards**: the period is always on its own line above the title (fixed format whatever the title length).
- **Callout**: `sections/callout.astro` renders an optional `callout` field of a site page (e.g. the warning "PHP & Symfony aujourd'hui, sans on-dit" note on the home page, under the preview cards) as a left-border box (`accent` or `warning` variant); paragraphs split on empty lines; same container rhythm as sections. Terms in it use the glossary tooltips.
- **CV lite-preview modal**: a CTA with `modal: {...}` renders as a button opening a native `<dialog class="cv-modal">`. pdf.js is lazy-loaded from the CDN only on first open (same pattern as the Google Fonts link) and renders each PDF page into a canvas inside `.cv-modal__pages` — the modal's ONLY scrollable area (dialog is `overflow: hidden`, page behind locked via `html.cv-modal-open`). Closed via ✕, Esc or backdrop click; a "open in a tab" link (labels from content) is the no-network fallback. No `download` attribute. Styles in `hero.css`.
- Small icons also accompany the hero location (`train`) and the experience card locations (`map-pin`).
- **Availability badge**: content from the `availability` field of `profile.md` (status `available`/`training` drives the dot color: green/amber, gentle pulse, disabled by `prefers-reduced-motion`). Two placements via the `variant` prop of `ui/availability-badge.astro`: `inline` in the hero on the home page, `floating` (fixed bottom-right, rendered by `base-layout.astro` only on non-home pages) on inner pages. Floating variant collapses to the dot alone below 40rem; the inline one always shows its text. Styles in `ui/availability-badge.css` (base rules before the media query — later rules win the cascade).

## Footer credit

The footer states the site was designed with the help of Mistral AI, with the Mistral AI icon next to the link (https://mistral.ai). The credit keeps the Mistral brand orange via the dedicated `--mistral` / `--mistral-hover` tokens, independent from `--accent`.

## Accessibility and performance

Semantic HTML, sufficient contrast, `alt` on images, `aria-label` on icon-only links. Static site, target Lighthouse ~100.
