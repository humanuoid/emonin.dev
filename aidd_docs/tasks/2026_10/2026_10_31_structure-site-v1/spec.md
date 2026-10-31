# Structure du site — v1

## Target

A visitor of emonin.dev can reach three pages — home, skills, contact — from one menu, and each page delivers its content on a fully static site with no backend.

## Hard constraints

- Exactly three routes in v1: `/`, `/competences`, `/contact`.
- The home page keeps the existing hero and adds one preview section (key skills or a featured project).
- The skills page mixes skills and projects; its content is drawn from Emmanuel's CV and LinkedIn profile.
- No blog and no dedicated about page in v1; the personal introduction lives on the home page.
- No `mailto:` link anywhere: contact goes through a free external form service with spam protection, alongside social links (GitHub, LinkedIn) and a public CV in PDF stripped of phone number and email address.
- The site menu reads exactly: Accueil, Compétences, Contact.
- No secret in the repository; everything pushed is public.
- The site stays static: content is Markdown, no backend of our own.

## Non-goals

- Blog section and articles.
- Dedicated about page.
- A contact form hosted by ourselves.
- Manual light/dark theme toggle.

## Done-when

- All three routes serve their page in the production build and in the local preview.
- The menu shows exactly Accueil / Compétences / Contact on every page, and the current page is identifiable.
- The home page shows the hero plus the preview section; the skills page shows skills and projects; the contact page shows the form, the social links and the CV link.
- No `mailto:` link appears anywhere in the built site.
- The production build completes without error and type checking reports no errors.

## Open Questions

- None.

## Context

- Decisions from the brainstorming session of 2026-10-31 (three pages, skills page fed by CV + LinkedIn, contact without mailto).
- Visual contract: `aidd_docs/design-spec.md`.
