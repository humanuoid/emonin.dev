# AGENTS.md

## Projet

Portfolio personnel d'Emmanuel Monin : **emonin.dev**.
Site statique construit avec **Astro**, contenu en Markdown, déployé sur **GitHub Pages** via GitHub Actions.

## Stack

- **Générateur** : Astro (dernière version stable), pages `.astro`, contenu dans `src/content/` via Content Collections.
- **Contenu** : Markdown avec frontmatter YAML. Articles de blog dans `src/content/blog/`.
- **Coloration syntaxique** : Shiki (natif Astro), thème configuré dans `astro.config.mjs`. Pas de lib JS supplémentaire pour du syntax highlighting.
- **Déploiement** : GitHub Actions (workflow officiel Astro), branche `main`, fichier `CNAME` à la racine (`emonin.dev`).

## Commandes

```bash
npm install        # install dependencies
npm run dev        # dev server on http://localhost:4321
npm run build      # production build into dist/
npm run preview    # preview the build (always check before a push)
npx astro check    # type checking
```

## Règles de code

- **Identifiants en anglais** : variables, fonctions, composants, noms de fichiers de code (kebab-case pour les composants Astro, camelCase pour le JS).
- **Commentaires et documentation en anglais simple**, facile à comprendre pour un novice : phrases courtes, pas de jargon inutile.
- **Contenu du site en français** (textes des pages et des articles), sauf termes techniques anglais standards.
- **Slugs d'articles sans accents ni espaces** (ex. `2026-11-30-pipeline-bdpm.md`), dates ISO dans le frontmatter.
- **CSS simple mais rigoureux** : respecter les bonnes pratiques en vigueur (custom properties pour les tokens de design, mobile-first, unités relatives, pas de styles globaux non maîtrisés).
- **Conception orientée composants** : chaque brique d'UI (header, carte de projet, liste d'articles, footer) est un composant Astro autonome dans `src/components/`, réutilisable, avec son style scopé. Un composant = une responsabilité. Les pages composent ces briques plutôt que de définir leur propre style.
- Accessibilité de base : HTML sémantique, contrastes, `alt` sur les images.
- Performance : viser Lighthouse ~100 sans effort extraordinaire — site statique, images optimisées dans `public/`.

## Ajout de contenu

- Un article = un fichier `.md` dans `src/content/blog/`, frontmatter obligatoire : `title`, `description`, `date` (ISO), éventuellement `tags`.
- Ne pas modifier un article publié depuis plus de 48 h sans ajouter un champ `updated` au frontmatter ou une mention dans le texte.
- Vérifier que `npm run build` passe avant de committer du nouveau contenu.

## Déploiement

- Le déploiement est automatique sur push vers `main` : ne jamais pousser sur `main` sans avoir lancé `npm run build` localement.
- Ne pas toucher à `.github/workflows/` sans vérifier le build en local puis le déploiement après push.
- Le fichier `CNAME` (`emonin.dev`) ne doit jamais être supprimé ni déplacé.

## Sécurité — strict

- **Aucun secret dans le dépôt** : pas de clé API, token, identifiant ni mot de passe. Le site est public : tout ce qui est poussé est lisible par tous.
- Pas de données personnelles au-delà de ce qu'Emmanuel choisit d'exposer publiquement (bio, liens pro).

## Style de contribution

- Commits atomiques, messages courts à l'impératif en anglais (`add blog post on bdpm pipeline`).
- Pas de dépendance ajoutée sans justification ; pas de package pour ce que trois lignes de CSS font.
- En cas de doute sur un choix structurant (nouvelle section du site, changement de thème, SEO), demander plutôt que décider unilatéralement.

## Memory Management

Project docs, memory, specs, and plans live in `aidd_docs/`.

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
