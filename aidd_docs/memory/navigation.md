# Navigation

How the user moves through the app: routing and the page structure.

## Routing

- File-based routing of Astro: each file in `src/pages/` is a route named after the file.
- No client-side router; every navigation is a full page load (static site).

## Structure

```mermaid
flowchart LR
    index["/ (index.astro)"]
```

- One page so far: the home page. Blog and project sections come as content grows.
