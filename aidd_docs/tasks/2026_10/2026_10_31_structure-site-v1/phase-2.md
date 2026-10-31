---
status: pending
---

# Instruction: Skills page content

## Architecture projection

```txt
.
├── src/
│   ├── components/
│   │   ✅ skills-section.astro
│   │   ✅ project-card.astro
│   ├── content/
│   │   └── projects/
│   │       ✅ exemple-projet-alpha.md
│   │       ✅ exemple-projet-beta.md
│   │       ✅ exemple-projet-gamma.md
│   ├── content.config.ts
│   │   ✅ (file at this path)
│   ├── pages/
│   │   ✏️ competences.astro
│   └── styles/
│       ✏️ global.css
│       └── components/
│           ✅ skills-section.css
│           ✅ project-card.css
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | npm run build, then npm run preview | build exits 0, preview serves the built site | cli |
| Happy path | GET /competences | the page shows the skills groups and one card per project in the collection | browser |
| Edge case | project Markdown file with a missing required frontmatter field | astro check reports the schema error and the build fails loudly | cli |
| Teardown | stop the preview server | the process stops, baseline restored | cli |

## Wireframe

```txt
┌──────────────────────────────────────────┐
│ (1) Header                               │
├──────────────────────────────────────────┤
│ (2) Page header: "Compétences" + intro   │
├──────────────────────────────────────────┤
│ (3) Skills: grouped list (3 groups,      │
│     each a title and a row of tags)      │
├──────────────────────────────────────────┤
│ (4) Projects: grid of cards, each with   │
│     title, description, tech tags, links │
├──────────────────────────────────────────┤
│ (5) Footer                               │
└──────────────────────────────────────────┘
```

1. Header: shared, from phase 1.
2. Page header: shared, from phase 1.
3. Skills: three groups (languages, data, product), each a heading and a wrap of tag-like items.
4. Projects: responsive grid of project cards read from the Markdown collection.
5. Footer: unchanged.

## Tasks to do

### `1)` Define the projects content collection

> Each project is one typed Markdown entry.

1. Create src/content.config.ts defining a projects collection with frontmatter: title, description, tags, links (demo, code), order.
2. Content lives in src/content/projects/*.md.

### `2)` Add sample project entries

> The page must show projects now; real content comes from Emmanuel's CV and LinkedIn.

1. Create three Markdown entries named exemple-projet-alpha/beta/gamma.md, each clearly marked in its body as an example to replace.
2. Keep slugs without accents or spaces.

### `3)` Build the skills section component

> Skills are grouped data rendered by one component; the data lives in the page.

1. Create src/components/skills-section.astro taking a groups prop (title + items) and rendering the grouped list.
2. Create src/styles/components/skills-section.css, import it in global.css.

### `4)` Build the project card and fill the page

> /competences queries the collection and composes the bricks.

1. Create src/components/project-card.astro taking one project entry and rendering title, description, tags, links with the arrow-up-right icon.
2. Create src/styles/components/project-card.css, import it in global.css.
3. Rewrite src/pages/competences.astro: define the skills groups as data, pass them to SkillsSection, query the projects collection, sort by order, render the grid of ProjectCards.

### `5)` Replace examples with real content

> The samples are placeholders; the real projects come from the CV and LinkedIn.

1. Emmanuel provides the real project entries; replace the three exemple-* files with them.
2. Acceptance: no file in src/content/projects/ still carries the example marker.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | -------------------- |
| 1 | astro check passes with the collection schema enforced; a bad entry fails the build |
| 2 | Each sample entry is visibly marked as an example to replace |
| 3 | /competences renders the three skill groups with their items |
| 4 | /competences renders one card per collection entry, sorted by order, each card linking to demo/code when present |
| 5 | No example marker remains in the projects content |
