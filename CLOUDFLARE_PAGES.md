# Cloudflare Pages deployment

This repository exports a static site to `out/` and keeps its small dynamic
features in Cloudflare Pages Functions under `functions/api/`.

In the Cloudflare Pages project, use these build settings:

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `out`
- Node version: `22`

Add these production and preview secrets in **Settings → Environment
variables** before publishing:

- `ACTIVEPIECES_GENERAL_WEBHOOK` — the existing calculator/resource webhook
- `ACTIVEPIECES_INQUIRY_WEBHOOK` — the existing inquiry webhook
- `RESEND_API_KEY` — optional; enables the backlink request email

The two Activepieces values are intentionally no longer embedded in browser
or repository code. Without them, form submissions return a clear `503`
instead of silently losing a lead.

For a direct deploy after signing in to Cloudflare:

```sh
npm run build
npx wrangler pages deploy out --project-name YOUR_PAGES_PROJECT_NAME
```

Use a preview branch first if the project has a production site already:

```sh
npx wrangler pages deploy out --project-name YOUR_PAGES_PROJECT_NAME --branch migration-preview
```

`public/_redirects` preserves legacy URL redirects and `public/_headers`
preserves the original security headers.
