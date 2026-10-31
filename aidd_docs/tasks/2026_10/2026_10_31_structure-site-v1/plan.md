---
objective: "Ship the v1 site structure: three routes (/, /competences, /contact) behind one menu with active state, a preview section on the home page, and no mailto anywhere."
status: pending
---

# Plan: Structure du site — v1

Source: aidd_docs/tasks/2026_10/2026_10_31_structure-site-v1/spec.md

## Phases

| # | Phase | File | Depends on |
| --- | ----- | ---- | ---------- |
| 1 | Navigation and page skeletons | [`phase-1.md`](./phase-1.md) | none |
| 2 | Skills page content | [`phase-2.md`](./phase-2.md) | 1 |
| 3 | Contact page | [`phase-3.md`](./phase-3.md) | 1 |

## External sources

| URL | What it settled |
| --- | --------------- |
| https://docs.astro.build/en/guides/content-collections/ | Typed Markdown collection for projects |
| https://docs.astro.build/en/guides/environment-variables/ | PUBLIC_ env vars are inlined at build; .env stays out of git (already ignored) |
| https://web3forms.com/ | Free static form endpoint with built-in spam protection; access key is public by design, still passed via env var |

## Impact

| Category | Verdict and evidence | Handled in |
| -------- | -------------------- | ---------- |
| runtime | unverified — the contact form depends on an external service reachable at submit time | 3 |
| regression | low — header links and home page change; no test suite exists, the production build plus preview is the gate; phase 1 locks the three routes before content lands | 1 |
| architecture | adds one Markdown content collection for projects and composes new UI bricks from standalone components, consistent with aidd_docs/memory/architecture.md | 1, 2, 3 |
| documentation | aidd_docs/memory/*.md are refreshed automatically by the project memory hook, never by hand; the design-spec component table is updated in phase 1 | 1 |

## Rules

| Rule | Why it applies |
| ---- | -------------- |
| English identifiers, French site content | AGENTS.md code rules |
| Components hold markup only; CSS centralized in src/styles/components with BEM | design contract in aidd_docs/design-spec.md |
| npm run build must pass before any commit | aidd_docs/memory/coding-assertions.md |
| No secret in the repo | the form key is public by design and still goes through an env var |
| kebab-case component names, one responsibility each | AGENTS.md |

## Decisions

| Decision | Why |
| -------- | --- |
| Route /competences labelled Compétences | user decision from the brainstorming session |
| Contact through an external form service instead of mailto | spam protection, user decision |
| Projects as a typed Markdown collection | same mechanism as the planned blog, typed and queryable |
