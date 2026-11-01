# Parcours page + real content — v2 content

## Target

A visitor of emonin.dev reaches three pages — `/`, `/parcours`, `/contact` — from one menu. `/parcours` replaces `/competences` and presents Emmanuel's skills and professional experience, all drawn from his public CV and LinkedIn. All repeatable and singleton content lives as typed Markdown in `src/content/`; components receive content through props only (no hardcoded text, no `mailto:` anywhere).

## Hard constraints

- Exactly three routes: `/`, `/parcours`, `/contact`. The menu reads exactly: Accueil, Parcours, Contact. This supersedes the v1 spec (`/competences`, label Compétences) — user decision of 2026-11-01.
- No `mailto:` link anywhere in the built site, and no email address in any source or content file. Contact goes through the Web3Forms form (already wired, key via `PUBLIC_WEB3FORMS_ACCESS_KEY` env var) plus social links and `/cv.pdf`.
- The `profile` site entry schema is `.strict()` and has no email field: a stray email fails the build.
- All content (singletons and repeatable) is Markdown under `src/content/`, served by typed Content Collections. No `src/data/` TS files.
- Components are presentational: pages query collections and inject data as props. Components hold markup only; CSS stays centralized, one BEM file per component, mirroring the component folders.
- `src/components/` is reorganized by role: `layout/`, `sections/`, `cards/`, `forms/`, `ui/`; `src/styles/components/` mirrors the same folders.
- English identifiers, French site content, kebab-case component names, slugs without accents or spaces.
- `npm run build` must pass; `npx astro check` must report no errors.
- No secret in the repo; the form key never committed.

## Non-goals

- Blog section, about page, hosted form, new routes beyond the three.
- Dropping `public/cv.pdf` (Emmanuel does it separately; the link 404s until then — flagged, not blocked).
- Supplying the Web3Forms access key (secret; local `.env` + GitHub Actions secret).

## Done-when

- `/`, `/parcours`, `/contact` serve 200 in the production build and local preview; the menu shows Accueil / Parcours / Contact with the current page marked.
- `/` shows hero + preview fed by `site/home.md`; `/parcours` shows skills (10 groups), experience timeline (3 jobs + 2 educations), 4 real project cards and values/hobbies; `/contact` shows the form, social links and the CV link.
- No `exemple-projet-*` file remains; no `mailto:` and no email address appears in the built HTML.
- `npx astro check` and `npm run build` pass.
- `aidd_docs/design-spec.md` lists the new component/CSS layout.

## Context

- Source: Emmanuel's public CV + LinkedIn export (provided 2026-11-01), user decisions: `/parcours` replaces `/competences`, no email exposure, all content in Markdown under `src/content/`.
- Builds on `aidd_docs/tasks/2026_10/2026_10_31_structure-site-v1/` (v1 structure, Web3Forms contact, projects collection).
- Visual contract: `aidd_docs/design-spec.md`.
