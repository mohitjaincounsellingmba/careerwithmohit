---
description: Strict technical SEO URL immutability and anti-rename policy
---

# Technical SEO Immutability Rule

1. **Never change a URL, slug, canonical, or redirect without explicit written approval.**
2. **Never bulk-replace years (2026/2027/2028/2029).**
3. **Updating freshness is done ONLY by editing the visible "Last updated" text, `dateModified` in schema, and the content — never the slug.**
4. **Never delete any post, page, or college markdown file.**
5. **Every build enforces `scripts/verify-seo-lock.mjs`. Any missing protected URL or redirect chain immediately fails the build.**
