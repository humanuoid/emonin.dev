# AGENTS.md

## Project context

Personal portfolio of Emmanuel Monin: **emonin.dev**. A static site built with **Astro**, content in Markdown, deployed to **GitHub Pages** via GitHub Actions.

### Stack

- **Generator**: Astro (latest stable), `.astro` pages, content in `src/content/` via Content Collections.
- **Content**: Markdown with YAML frontmatter. Blog articles in `src/content/blog/`.
- **Syntax highlighting**: Shiki (native to Astro), theme configured in `astro.config.mjs`. No extra JS library for highlighting.
- **Deployment**: GitHub Actions (official Astro workflow), branch `main`, `CNAME` file at the root (`emonin.dev`).

### Commands

```bash
npm install        # install dependencies
npm run dev        # dev server on http://localhost:4321
npm run build      # production build into dist/
npm run preview    # preview the build (always check before a push)
npx astro check    # type checking
```

## Workflow — AIDD framework (mandatory)

- **Before every new feature: start a new worktree and run the `01-sdlc` skill.** Never implement a feature directly on `main`. Create a dedicated worktree (e.g. `git worktree add ../emonin.dev-<feature>` or the OpenCode worktree tooling) and let `01-sdlc` drive framing → delivery → check → draft PR inside it.
- **Branch naming (strict)**: the worktree branch must follow the VCS convention `<type>/<short-name>` — `feat/…`, `fix/…`, `chore/…` (see `aidd_docs/memory/vcs.md`). If the tooling creates a placeholder branch (e.g. `openchamber/*`), rename it immediately with `git branch -m feat/<name>`. Never keep or push a placeholder name.
- **Automatic skill routing**: every new request (design, content, code, review) is routed automatically to the matching AIDD skill from the catalog below, without having to name it — e.g. a design rework goes through `01-sdlc`.

### Tools present (AIDD skills in `~/.config/opencode/skills/`, agents in `~/.config/opencode/agents/`)

| Group | Skills |
| ----- | ------ |
| Orchestration (`aidd-orchestrator`) | `00-async-dev`, `01-sdlc`, `02-backlog` |
| Product management (`aidd-pm`) | `01-ticket-info`, `02-user-stories`, `03-prd`, `04-spec`, `05-spike`, `06-product-brief`, `07-epic`, `08-three-amigos`, `09-defect`, `10-task` |
| Dev (`aidd-dev`) | `01-plan`, `02-implement`, `03-assert`, `04-audit`, `05-review`, `06-test`, `07-refactor`, `08-debug`, `09-for-sure`, `10-batch` |
| Context (`aidd-context`) | `00-onboard`, `01-bootstrap`, `02-project-memory`, `03-context-generate`, `04-skill-generate`, `05-rule-generate`, `06-agent-generate`, `07-command-generate`, `08-hook-generate`, `09-mermaid`, `10-learn`, `11-explore`, `12-cook` |
| Refine (`aidd-refine`) | `01-brainstorm`, `02-challenge`, `03-shadow-areas`, `04-fact-check`, `05-improve` |
| QA (`aidd-qa`) | `01-acceptance-qa` |
| VCS (`aidd-vcs`) | `00-repo-init`, `01-commit`, `02-pull-request`, `03-release-tag`, `04-issue-create`, `05-resolve-conflict` |
| Telemetry (`aidd-telemetry`) | `00-init`, `01-usage` |
| UI (`aidd-ui`) | `01-hello` |

Agents: `aidd-dev-checker`, `aidd-dev-executor` (in `~/.config/opencode/agents/`). MCP server: JetBrains DataGrip (`datagrip`).

## Code rules

- **Identifiers in English**: variables, functions, components, code file names (kebab-case for Astro components, camelCase for JS).
- **Comments and documentation in plain English**, easy for a novice to understand: short sentences, no unnecessary jargon.
- **Site content in French** (page and article text), except standard technical English terms.
- **Article slugs without accents or spaces** (e.g. `2026-11-30-pipeline-bdpm.md`), ISO dates in the frontmatter.
- **Simple but rigorous CSS**: follow current best practices (custom properties for design tokens, relative units, no uncontrolled global styles).
- **Mobile-first, always**: base styles target small screens; wider layouts only via `@media (min-width: …)`. Fluid widths capped by `--max-width`. Never write desktop-first CSS with `max-width` overrides.
- **Component-oriented design**: each UI block (header, project card, article list, footer) is a standalone Astro component in `src/components/`, reusable, markup only — its style lives in one BEM file in `src/styles/components/`, imported via `src/styles/global.css`. One component = one responsibility. Pages compose these blocks instead of defining their own style.
- Basic accessibility: semantic HTML, sufficient contrast, `alt` on images.
- Performance: aim for Lighthouse ~100 without extraordinary effort — static site, optimized images in `public/`.

## Adding content

- One article = one `.md` file in `src/content/blog/`, mandatory frontmatter: `title`, `description`, `date` (ISO), optional `tags`.
- Do not modify an article published more than 48 h ago without adding an `updated` frontmatter field or an in-text note.
- `npm run build` must pass before committing new content.

## Deployment

- Deployment is automatic on push to `main`: never push to `main` without a passing local `npm run build`.
- Do not touch `.github/workflows/` without checking the local build first, then the deployment after push.
- The `CNAME` file (`emonin.dev`) must never be deleted or moved.

## Security — strict

- **No secret in the repo**: no API key, token, username or password. The site is public: everything pushed is readable by all.
- No personal data beyond what Emmanuel chooses to expose publicly (bio, professional links).

## Contribution style

- Atomic commits, short imperative messages in English (`add blog post on bdpm pipeline`). Commits happen only when explicitly asked.
- No dependency without justification; no package for what three lines of CSS can do.
- When in doubt about a structuring choice (new site section, theme change, SEO), ask rather than decide unilaterally.

## Project memory

Project docs, memory, specs, and plans live in `aidd_docs/` (visual contract: `aidd_docs/design-spec.md`). The files in `aidd_docs/memory/` are the project memory, loaded every session through the block below — refreshed automatically by the memory hook, do not edit them by hand.

Read only task-relevant context and linked memory files; complete required reads.

<!-- aidd_project_memory:start -->
- `aidd_docs/memory/architecture.md`
- `aidd_docs/memory/codebase-map.md`
- `aidd_docs/memory/coding-assertions.md`
- `aidd_docs/memory/design.md`
- `aidd_docs/memory/ecosystem.md`
- `aidd_docs/memory/forms.md`
- `aidd_docs/memory/navigation.md`
- `aidd_docs/memory/project-brief.md`
- `aidd_docs/memory/testing.md`
- `aidd_docs/memory/vcs.md`
<!-- aidd_project_memory:end -->

- Load `aidd_docs/memory/external/*` only when asked.
- Load `aidd_docs/memory/internal/*` when relevant.
