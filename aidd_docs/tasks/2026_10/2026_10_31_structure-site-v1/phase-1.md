---
status: pending
---

# Instruction: Navigation and page skeletons

## Architecture projection

```txt
.
├── aidd_docs/
│   ✏️ design-spec.md
├── src/
│   ├── components/
│   │   ✏️ site-header.astro
│   │   ✏️ hero-section.astro
│   │   ✅ page-header.astro
│   │   ✅ preview-section.astro
│   ├── pages/
│   │   ✏️ index.astro
│   │   ✅ competences.astro
│   │   ✅ contact.astro
│   └── styles/
│       ✏️ global.css
│       └── components/
│           ✏️ header.css
│           ✅ page-header.css
│           ✅ preview-section.css
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | npm run build, then npm run preview | build exits 0, preview serves the built site | cli |
| Happy path | GET /, /competences, /contact in the preview | each route returns 200 and shows the menu Accueil / Compétences / Contact | browser |
| Edge case | follow every link in the header and the hero from every page | no link points to a route that does not exist; the current menu entry is marked | browser |
| Teardown | stop the preview server | the process stops, baseline restored | cli |

## Wireframe

```txt
┌──────────────────────────────────────────┐
│ (1) Header: brand · Accueil Compétences   │
│     Contact (current one marked)         │
├──────────────────────────────────────────┤
│ (2) Hero: eyebrow, name, subtitle,       │
│     buttons to /competences and /contact │
├──────────────────────────────────────────┤
│ (3) Preview: three key skills + ghost    │
│     button "Voir mes compétences"        │
├──────────────────────────────────────────┤
│ (4) Footer: copyright · socials          │
└──────────────────────────────────────────┘
```

1. Header: brand on the left, the three menu links on the right, the current page link marked.
2. Hero: existing eyebrow, title and subtitle untouched; the two buttons now target existing v1 routes.
3. Preview: a short list of three key skills plus a ghost button linking to /competences.
4. Footer: unchanged.

## Tasks to do

### `1)` Update the header menu

> The menu reads exactly Accueil / Compétences / Contact and marks the current page.

1. Replace the links array in src/components/site-header.astro with /, /competences, /contact.
2. Mark the current link with aria-current="page" and a header__link--active class based on Astro.url.pathname.
3. Add the active-link style to src/styles/components/header.css.

### `2)` Finalize the shared page-header component

> Inner pages share one title + intro block.

1. src/components/page-header.astro already exists as a skeleton taking title and intro props; keep it.
2. Create src/styles/components/page-header.css and import it in src/styles/global.css.

### `3)` Fix the hero links and the home description

> No link may point to a route that does not exist in v1.

1. In src/components/hero-section.astro, retarget the primary button to /competences and the ghost button to /contact.
2. In src/pages/index.astro, drop the mention of articles from the description meta.

### `4)` Create the home preview section

> The home page shows a taste of the skills plus a call to action.

1. Create src/components/preview-section.astro with three key skills and a ghost button to /competences.
2. Insert it in src/pages/index.astro between the hero and the footer.
3. Create src/styles/components/preview-section.css and import it in src/styles/global.css.

### `5)` Update the design contract

> The visual contract lists every component and CSS file.

1. Add page-header, preview-section and their CSS files to the component table and CSS tree of aidd_docs/design-spec.md.
2. Do not edit aidd_docs/memory/*.md by hand; the project memory hook refreshes them.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | -------------------- |
| 1 | On all three routes the menu shows exactly Accueil, Compétences, Contact and the current page link carries aria-current="page" |
| 2 | /competences and /contact render the shared page header with their own title and intro |
| 3 | Every href on the home page targets an existing v1 route; no /projets, /blog or /a-propos link remains |
| 4 | The home page shows the preview section under the hero, with a working link to /competences |
| 5 | design-spec.md lists the new components and CSS files; the production build passes and all three routes return 200 in the preview |
