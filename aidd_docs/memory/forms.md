# Forms

How forms are built and validated across the UI.

## Approach

- Static-friendly contact form on `/contact` via Web3Forms: native POST to `https://api.web3forms.com/submit` with a `redirect` field rebuilt as absolute from `location.origin` (Web3Forms ignores relative URLs). The success flag `?sent=1` is read **client-side** (the site is fully static, so `Astro.url.searchParams` is empty at build time).
- Spam protection: honeypot field (`botcheck`) always on; hCaptcha widget rendered only when `PUBLIC_HCAPTCHA_SITE_KEY` is set (script `https://js.hcaptcha.com/1/api.js`).

## Conventions

- **No key in the repo**: `PUBLIC_WEB3FORMS_ACCESS_KEY` and `PUBLIC_HCAPTCHA_SITE_KEY` are inlined at build time from the environment only — local `.env` (git-ignored) in dev, GitHub Actions secrets in prod. When missing, no `access_key` field / no captcha widget is rendered and a notice is shown instead.
- The hCaptcha **secret** key is never needed client-side: Web3Forms verifies the token server-side with the access key. Never commit it.
- Required fields: red asterisk (`--error`) in the label + `required`/`aria-required` + `requiredHint` line. Labels are FLOATING (pure CSS: `placeholder=" "` + `:focus`/`:not(:placeholder-shown)` shrink the label onto the input's top border). The GitHub/LinkedIn/CV links block sits above the form, under a `linksTitle` heading.

## Accepted risk: public Web3Forms access key (CWE-798)

- The access key is inlined into the public HTML at build time. On a fully static site there is no backend to proxy the form, so the key is public **by design** (Sunfire review run `20261120-080726-35a27a`, finding 3, low; issue #7).
- Abuse surface is bounded out-of-repo: in the Web3Forms dashboard (app.web3forms.com), the key's allowed domains are restricted to `emonin.dev` (and `localhost` for dev), so a key scraped from the page cannot be reused from any other origin.
- In-repo mitigations stay on: honeypot (`botcheck`) + Web3Forms zero-config hCaptcha (`data-captcha="true"` + `web3forms.com/client/script.js`, allowlisted in the CSP meta) + Web3Forms server-side rate limiting.
- The CSP (`base-layout.astro`) additionally contains the third-party form script: `script-src` allowlists `web3forms.com` / `js.hcaptcha.com` and `form-action` only allows `api.web3forms.com`.
