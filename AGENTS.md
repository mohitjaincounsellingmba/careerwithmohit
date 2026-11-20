# Antigravity Agent Guidelines — Strict Technical SEO & URL Immutability Policy

> **CRITICAL DIRECTIVE**: You are strictly forbidden from altering the URL architecture, slugs, canonicals, or redirects of this website without explicit, written user approval.

## 1. Absolute URL & Slug Immutability
- **Never rename or delete a published slug**: Slugs in `posts/` and `colleges/` represent accumulated organic search rankings and Google Search Console index records.
- **Never bulk-replace years**: Under no circumstances should scripts or agents perform find-and-replace on years (e.g. 2026 -> 2027/2028/2029) across file names, slugs, or titles.
- **Year Freshness Procedure**: To update content for new admission or exam cycles:
  - Keep the **SAME URL / slug**.
  - Update the visible "Last updated" date in frontmatter (`lastUpdated: YYYY-MM-DD`).
  - Update `dateModified` in JSON-LD schema.
  - Update the body text, cutoff tables, and fee figures.
  - Never modify the URL path.

## 2. Redirect & Edge Policy
- **No artificial redirects**: Never redirect historical ranking URLs away from their original paths.
- **No mass 410 or doorway filters**: Never add regex blocks that return 410 Gone or blanket redirects to `/blog/`.
- **Single-hop guarantee**: In the rare case a legitimate alias redirect is required, it must resolve to a 200 OK canonical destination in exactly 1 hop (<1ms).

## 3. Automated Guard Enforcement
- Every build and commit automatically executes `scripts/verify-seo-lock.mjs`.
- If any URL in `seo-recovery/PROTECTED_URLS.json` returns 404, 410, or redirects, or if more than 5 slugs change in one commit, the build hard-fails.
