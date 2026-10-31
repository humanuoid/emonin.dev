# Testing

How the project is tested: the layers, the tools, and the conventions. Where tests live and how to run them.

## Strategy

- No unit test layer yet (static site, no logic). The gate is the production build.

## Tools

- `astro check` for type checking; `astro build` / `astro preview` for build verification.

## Conventions

- `npm run build` must pass before committing new content.

## Run

- `npm run build` — build the site into `dist/`
- `npm run preview` — serve the build locally
- `npx astro check` — type check

## Browser QA

- Entry: `npm run dev`, then `http://localhost:4321`
- Auth: none (public site)
- State: none (static site)
