# VCS

The version-control conventions this project follows: branches, commits, and the platform.

## Setup

- Main branch: `main`
- Platform: GitHub (`github.com/humanuoid/emonin.dev`)
- Tickets: none for now
- Hooks: none installed

## Branches

- Format: default `main`; feature branches as needed
- Types in use: `feat`, `fix`, `chore` (conventional)

## Commits

- Convention: conventional commits
- Format: `<type>: <description>`
- Rules: atomic commits, short imperative messages in English (`add blog post on bdpm pipeline`)

## Pull requests

- Language: French — PR titles and descriptions are written in French. This is the only French surface of the workflow: code, comments, commit messages, and branch names stay in English.

## Releases

- Every push to `main` is followed by a new GitHub release: semver tag + release notes, cut with the `03-release-tag` skill (version lives in `package.json`).
- Current release: `v1.0.0` (2026-11-03, "Première mise en ligne d'emonin.dev").
- Deployment to GitHub Pages (`deploy.yml`) and the release both trigger from `main` — never push to `main` without a passing local `npm run build`.

## Commit Strategy

AI should auto commit: `never` — commits happen only when explicitly asked.
