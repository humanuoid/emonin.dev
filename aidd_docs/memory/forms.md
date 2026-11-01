# Forms

How forms are built and validated across the UI.

## Approach

- Static-friendly contact form on `/contact` via Web3Forms: native POST to `https://api.web3forms.com/submit` with a `redirect` field rebuilt as absolute from `location.origin` (Web3Forms ignores relative URLs). The success flag `?sent=1` is read **client-side** (the site is fully static, so `Astro.url.searchParams` is empty at build time).
- Spam protection: honeypot field (`botcheck`) always on; hCaptcha widget rendered only when `PUBLIC_HCAPTCHA_SITE_KEY` is set (script `https://js.hcaptcha.com/1/api.js`).

## Conventions

- **No key in the repo**: `PUBLIC_WEB3FORMS_ACCESS_KEY` and `PUBLIC_HCAPTCHA_SITE_KEY` are inlined at build time from the environment only — local `.env` (git-ignored) in dev, GitHub Actions secrets in prod. When missing, no `access_key` field / no captcha widget is rendered and a notice is shown instead.
- The hCaptcha **secret** key is never needed client-side: Web3Forms verifies the token server-side with the access key. Never commit it.
- Required fields: red asterisk (`--error`) in the label + `required`/`aria-required` + `requiredHint` line. Labels are FLOATING (pure CSS: `placeholder=" "` + `:focus`/`:not(:placeholder-shown)` shrink the label onto the input's top border). The GitHub/LinkedIn/CV links block sits above the form, under a `linksTitle` heading.
