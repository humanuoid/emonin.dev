---
status: pending
---

# Instruction: Contact page

## Architecture projection

```txt
.
├── public/
│   ✅ cv.pdf
├── src/
│   ├── components/
│   │   ✏️ icon.astro
│   │   ✅ contact-form.astro
│   ├── pages/
│   │   ✏️ contact.astro
│   └── styles/
│       ✏️ global.css
│       └── components/
│           ✅ contact-form.css
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | npm run build, then npm run preview | build exits 0, preview serves the built site | cli |
| Happy path | GET /contact | the page shows the form (name, email, message, submit), the social links and the CV link | browser |
| Edge case | inspect the built HTML for mailto: | no mailto: href appears anywhere in the built site | cli |
| Edge case | submit the form empty | the browser blocks submission on the required fields | browser |
| Teardown | stop the preview server | the process stops, baseline restored | cli |

## Wireframe

```txt
┌──────────────────────────────────────────┐
│ (1) Header                               │
├──────────────────────────────────────────┤
│ (2) Page header: "Contact" + intro       │
├──────────────────────────────────────────┤
│ (3) Form: name, email, message fields,   │
│     submit button, hidden honeypot       │
├──────────────────────────────────────────┤
│ (4) Links row: GitHub, LinkedIn, CV PDF  │
├──────────────────────────────────────────┤
│ (5) Footer                               │
└──────────────────────────────────────────┘
```

1. Header: shared, from phase 1.
2. Page header: shared, from phase 1.
3. Form: three labelled fields plus submit, posted to the external form service with a hidden honeypot anti-spam field; success via the service redirect back to /contact.
4. Links: GitHub, LinkedIn and the public CV PDF (no phone, no email in it).
5. Footer: unchanged.

## Tasks to do

### `1)` Create the contact form component

> A static-friendly form with no mailto and built-in spam protection.

1. Create src/components/contact-form.astro: a native form posting to the external form service endpoint with access_key read from import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY, a hidden honeypot field, a redirect back to /contact, and French labels for name, email, message.
2. Fields are required; no client-side framework, no custom backend.
3. Create src/styles/components/contact-form.css, import it in global.css.

### `2)` Add the needed icons

> The CV link and submit button need icons.

1. Add download and send stroked icons (Lucide paths) to src/components/icon.astro.

### `3)` Fill the contact page

> /contact composes the form and the links.

1. Rewrite src/pages/contact.astro to render PageHeader, ContactForm, and a links row: GitHub, LinkedIn, and /cv.pdf with the download icon.
2. Show a success message when the URL carries the redirect success parameter.

### `4)` Provide the CV slot

> The page links to /cv.pdf; Emmanuel drops the sanitized PDF there before merge.

1. The link targets /cv.pdf in public/; until the real PDF is dropped in, the link 404s — flagged to Emmanuel, not blocked.
2. The form key never lives in the repo: in dev it comes from the local .env (git-ignored, placeholder comment only); in prod from a GitHub Actions secret named PUBLIC_WEB3FORMS_ACCESS_KEY (Settings → Secrets and variables → Actions), inlined at build time by Astro from the workflow environment.
3. When the variable is missing at build time, the component renders no access_key field and shows a "form not configured" notice instead of the form; no placeholder key value may ever be committed.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | -------------------- |
| 1 | The built /contact HTML contains the form with honeypot and no mailto: anywhere in the built site |
| 2 | icon.astro exposes download and send and renders valid inline SVG |
| 3 | /contact renders the form, the GitHub/LinkedIn links and the /cv.pdf link; success message appears with the redirect success parameter |
| 4 | Production build and astro check pass |
