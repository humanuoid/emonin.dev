---
objective: "Replace /competences with /parcours fed by CV content: skills, experience, real projects, values — all content in typed Markdown collections under src/content/, components reorganized by role and fully prop-driven, no mailto anywhere."
status: done
---

# Plan: Parcours page + real content

Source: aidd_docs/tasks/2026_11/2026_11_01_parcours-contenu-cv/spec.md

## Phases

| # | Phase | Scope | Depends on |
| --- | ----- | ----- | ---------- |
| 1 | Content collections + content files | `content.config.ts` schemas (`site`, `skills`, `experience`, updated `projects`); Markdown entries in `src/content/site/`, `skills/`, `experience/`, `projects/` | none |
| 2 | Component + style reorganization | move `src/components/` into `layout/ sections/ cards/ forms/ ui/`; mirror in `src/styles/components/`; update `global.css`; prop-driven header/footer/hero/preview/skills/project-card; new experience-section, experience-card, projects-section, values-section | 1 |
| 3 | Pages | rewrite `index.astro` and `contact.astro`, add `parcours.astro`, delete `competences.astro` | 2 |
| 4 | Design contract | update `aidd_docs/design-spec.md` component table and CSS tree | 2 |
| 5 | Validate | `npx astro check`, `npm run build`, `npm run preview` + browser check of the three routes; grep built HTML for `mailto:` and any email | 3 |

## Decisions

| Decision | Why |
| -------- | --- |
| Route `/parcours`, menu label Parcours | user decision 2026-11-01, supersedes v1 spec |
| Singletons as one-Markdown-file entries in a `site` collection discriminated by `kind` | user rule: all content in Markdown under `src/content/`; zod discriminated union keeps one schema per kind |
| `profile` schema `.strict()` with no email field | email must never be exposed; a stray field fails the build |
| Projects keep the v1 collection, examples replaced by the 4 real missions, links optional | v1 schema already; client projects have no public URL |
| Components take data via props; pages query collections | SOLID: components presentational, content swappable without touching markup |
| Components grouped by role (layout/sections/cards/forms/ui), styles mirror | future-proof against new pages; one CSS file per component preserved |

## Rules

| Rule | Why it applies |
| ---- | -------------- |
| English identifiers, French site content, kebab-case names, slugs without accents | AGENTS.md code rules |
| Components markup-only; CSS centralized BEM, mobile-first | design contract `aidd_docs/design-spec.md` |
| No mailto, no email in repo or built HTML | spec hard constraint + security rule |
| `npm run build` passes before commit; `npx astro check` clean | coding-assertions.md |
| No secret in the repo | form key via env var only |
| Commits atomic, English imperative, on `feat/parcours-contenu-cv` only | vcs.md |
