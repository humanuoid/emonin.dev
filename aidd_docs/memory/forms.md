# Forms

How forms are built and validated across the UI.

## Approach

- Static-friendly contact form on `/contact` via Web3Forms: native POST to `https://api.web3forms.com/submit` with a `redirect` field rebuilt as absolute from `location.origin` (Web3Forms ignores relative URLs). The success flag `?sent=1` is read **client-side** (the site is fully static, so `Astro.url.searchParams` is empty at build time).
- Spam protection: honeypot field (`botcheck`) always on; hCaptcha via the Web3Forms zero-config widget (`<div class="h-captcha" data-captcha="true">` + `https://web3forms.com/client/script.js`). A custom sitekey is only verifiable server-side by Web3Forms on paid plans, so it is not used (debug trace: `aidd_docs/tasks/2026_11/2026_11_03_debug-contact-hcaptcha/`).

## Conventions

- **No key in the repo**: `PUBLIC_WEB3FORMS_ACCESS_KEY` is inlined at build time from the environment only — local `.env` (git-ignored) in dev, GitHub Actions variable in prod. When missing, no form is rendered and a notice is shown instead. (`PUBLIC_HCAPTCHA_SITE_KEY` is no longer read since the switch to the zero-config captcha.)
- Required fields: red asterisk (`--error`) in the label + `required`/`aria-required` + `requiredHint` line. Labels are FLOATING (pure CSS: `placeholder=" "` + `:focus`/`:not(:placeholder-shown)` shrink the label onto the input's top border). The GitHub/LinkedIn/CV links block sits above the form, under a `linksTitle` heading.

## Security notes

- Spam/abuse protection for the form relies on the honeypot (`botcheck`), the zero-config hCaptcha, and Web3Forms server-side rate limiting.
- The CSP meta (`base-layout.astro`) allowlists the form's third-party origins (`web3forms.com`, hCaptcha) in `script-src`/`style-src` and sets `form-action 'self' https://api.web3forms.com`. The policy ships in the public HTML, so documenting it here adds no exposure.
