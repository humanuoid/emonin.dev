# Project Brief

What this project is, the problem it solves, and its domain language. The non-derivable "why", not the "how".

## What it is

- Personal portfolio of Emmanuel Monin (`emonin.dev`): a static site built with Astro, content written in Markdown.

## Why it exists

- Publish Emmanuel's bio, projects, and blog articles on the web, with no backend to operate.

## Domain language

The terms a contributor must know to read the code.

| Term | Meaning |
| ---- | ------- |
| Content Collections | Astro mechanism that turns Markdown files in `src/content/` into typed, queryable content |
| Article | a blog post, one `.md` file in `src/content/blog/` with frontmatter (`title`, `description`, `date`, optional `tags`) |
| Component | a self-contained UI block in `src/components/`, one responsibility, scoped style |

## Key features

- Static pages rendered from `src/pages/`
- Design system documented in `aidd_docs/design-spec.md`: tokens (light/dark via `prefers-color-scheme`), centralized BEM CSS in `src/styles/`, inline SVG icons
- Blog articles from Markdown via Content Collections
- Syntax highlighting with Shiki (built into Astro)
- Automatic deployment to GitHub Pages on push to `main` (planned, not wired yet)
