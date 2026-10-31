# Codebase Map

The macro layout: the top-level areas and what each holds. A map to navigate, not the full tree.

```mermaid
flowchart TD
    src["src/"] --> pages["pages/ routes (.astro, .md)"]
    src --> content["content/ Markdown collections (planned)"]
    src --> components["components/ standalone UI blocks (planned)"]
    public["public/ static assets"]
    config["astro.config.mjs, tsconfig.json, package.json"]
    docs["aidd_docs/ AI memory bank"]
```

## Areas

- `src/pages/`: routes; each file maps to a URL.
- `src/content/`: Markdown content (blog articles), planned via Content Collections.
- `src/components/`: reusable Astro components with scoped styles, planned.
- `public/`: static assets served as-is (favicons today).
- `aidd_docs/`: the AI memory bank and project AI docs.

## Entry points

- `src/pages/index.astro` is the only page so far; `npm run dev` serves the site on `http://localhost:4321`.
