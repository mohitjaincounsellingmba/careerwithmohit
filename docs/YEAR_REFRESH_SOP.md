# Standard Operating Procedure (SOP): Safe Year-Refresh & Content Updates

> **OBJECTIVE**: Keep admissions and exam guides fresh for future intake years (e.g. 2027, 2028, 2029) **without destroying search engine rankings, backlinks, or indexing signals**.

---

## The Golden Rule of Technical SEO
> **NEVER CHANGE THE SLUG OR URL OF AN ESTABLISHED RANKING PAGE.**

Changing a slug drops the URL from Google’s primary index tier, breaks incoming backlinks, resets PageRank to zero, and forces search engines to treat the new URL as an unranked, unverified document.

---

## 1. How to Refresh an Existing Guide for a New Admission Cycle

### Step 1: Keep the Exact Same Filename and URL
- File stays: `posts/fee-refund-policy-aicte-ugc-2026.md`
- Live URL stays: `https://careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2026/`

### Step 2: Update Visible Titles, Headings, and Content
Update the frontmatter and markdown body:
```markdown
---
title: 'Fee Refund Policy: AICTE & UGC Guidelines (Updated for 2027 Admissions)'
date: '2026-03-14'
lastUpdated: '2027-01-10'
description: 'Latest official AICTE and UGC college fee refund rules, deadlines, cancellation penalties, and recovery process updated for the 2027 admission session.'
---

# Fee Refund Policy: AICTE & UGC Guidelines (Updated for 2027 Admissions)

> 📅 **Last Verified & Updated**: January 10, 2027 by Mohit Jain
```

### Step 3: Maintain Schema Dates
- `datePublished`: Kept as the original creation date (e.g. `2026-03-14`).
- `dateModified`: Set to the real revision date (`2027-01-10`).
- Google displays the updated `dateModified` in search snippets and rewards the content freshness, while keeping 100% of the historical backlink equity intact.

---

## 2. When a Brand-New URL is Genuinely Needed
If an exam or college changes completely such that an entirely new article is required:
1. **Create the new post on a brand-new slug**: e.g. `posts/cat-2028-complete-blueprint.md`.
2. **Keep the old post live**: The old post (`cat-2026-...`) remains active, serving 200 OK. Add an internal link inside the old post pointing to the new guide.
3. **Never apply a 301 redirect immediately**: Wait until Google has fully crawled, indexed, and ranked the new URL before considering any retirement or consolidation.

---

## 3. Build & Commit Guard Enforcement
All code changes are automatically validated against `scripts/verify-seo-lock.mjs`. Any commit attempting to delete or rename more than 5 slugs or redirect a protected URL will fail immediately.
