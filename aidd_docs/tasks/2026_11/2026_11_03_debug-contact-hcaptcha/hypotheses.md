---
name: debug-contact-hcaptcha
description: Root-cause tracking for the Web3Forms error "Could not validate hCaptcha. Please try later" on /contact submission (skill 08-debug, action 02-debug, 2026-11-03).
---

# Task [debug-contact-hcaptcha]

Symptom: native POST of the contact form to `https://api.web3forms.com/submit` ends on the Web3Forms error page "Form submission failed! Could not validate hCaptcha. Please try later".

Relevant files: `src/components/forms/contact-form.astro` (custom `data-sitekey` + `js.hcaptcha.com/1/api.js` inline script), `src/pages/contact.astro`, `.github/workflows/deploy.yml` (keys inlined from GitHub vars at build time).

## Hypotheses

- [x] **H1 — Custom hCaptcha sitekey not verifiable by Web3Forms (free plan). VALIDATED.** Evidence: prod `https://emonin.dev/contact` inlines a custom `data-sitekey` and loads `js.hcaptcha.com/1/api.js` (no `web3forms.com/client/script.js`). Per docs.web3forms.com (hCaptcha page, fetched 2026-11-03): custom site key + secret can only be set on **paid** plans; on free plans Web3Forms can only verify its own zero-config captcha (`data-captcha="true"` + client script) or the shared sitekey `50b2fe65-b00b-4b9e-ad62-3ba471098be2`. Server-side siteverify therefore fails → exactly this error. Confidence 9/10.
- [ ] **H2 — hCaptcha dashboard hostname whitelist missing the submitting origin** (e.g. sitekey registered only for `emonin.dev`, form tested on `localhost:4321`). Would produce the same Web3Forms error via `bad-hostname`. Cannot be confirmed without hCaptcha dashboard access. Confidence 5/10.
- [ ] **H3 — Web3Forms dashboard "Block Spam" set to hCaptcha but custom keys not linked** (dashboard-side variant of H1; requires paid plan to link keys). Confidence 4/10, subsumed by H1.
- [ ] **H4 — Token missing/empty at submit** (widget not solved). Invalidated as primary cause: the wording "could not validate" means a token was submitted and rejected, not absent. Confidence 2/10.
- [ ] **H5 — `js.hcaptcha.com` script blocked client-side** (adblock/network) → no token. Invalidated as primary cause for the same reason as H4. Confidence 2/10.

## Root cause (one line)

The form loads hCaptcha directly with the project's own sitekey, but on a free Web3Forms plan only Web3Forms' own captcha keys are verifiable server-side, so every token fails siteverify and the API returns "Could not validate hCaptcha".

## Next steps (awaiting user validation)

1. ~~Recommended: switch to Web3Forms zero-config captcha~~ **DONE 2026-11-03** on branch `fix/contact-form-web3forms-captcha`: `<div class="h-captcha" data-captcha="true">` + `https://web3forms.com/client/script.js`, `PUBLIC_HCAPTCHA_SITE_KEY` and `js.hcaptcha.com` removed from the component and from `.github/workflows/deploy.yml`. User still needs to enable hCaptcha as "Block Spam" in the Web3Forms dashboard (app.web3forms.com) for the form.
2. Alternative: keep the custom hCaptcha — requires a paid Web3Forms plan with sitekey + secret registered in the dashboard, plus the submitting domain whitelisted in the hCaptcha dashboard (covers H2).
3. ~~Optional hardening from Web3Forms docs: client-side submit guard~~ **DONE**: submit is blocked while `h-captcha-response` is empty.
4. After the fix: update `aidd_docs/memory/forms.md` (the "verified with the access key" note is inaccurate — verification uses the secret registered in the dashboard).

## Fix validation (2026-11-03)

- `npx astro check`: 0 errors.
- Build with dummy `PUBLIC_WEB3FORMS_ACCESS_KEY`: dist contains `data-captcha="true"` + `web3forms.com/client/script.js`, zero `js.hcaptcha.com` / `data-sitekey`.
- `astro preview` + browser: hCaptcha checkbox widget renders (302×84 px div, hcaptcha assets loaded; the "localhost detected" console warning is expected off-domain and absent on emonin.dev).
- Clean build without keys: passes, the "form not configured" notice fallback still renders.
- End-to-end submit NOT tested: needs the real access key and the dashboard "Block Spam" = hCaptcha setting.
