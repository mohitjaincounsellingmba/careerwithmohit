# Comprehensive Technical SEO & URL Recovery Audit
**Site**: `careerwithmohit.online`  
**Date**: October 28, 2026  
**Author**: Senior Next.js + Technical SEO Engineering Team  
**Branch**: `seo-url-recovery`  

---

## 1. Executive Summary & Root Cause Analysis

Between early September and late September 2026, `careerwithmohit.online` experienced a ~97% drop in Google organic search traffic (from ~7,000 daily impressions down to ~250).

### Key Root Causes Identified:

1. **Mass Slug Rename Disruption (Commit `f77326dc7` on 2026-09-30)**:
   - 823 blog posts in `posts/` were renamed from evergreen or ranking `-2026` / `-2025` slugs to `-2027-29` slugs using a bulk script (`scripts/update-mba-pgdm-2027-29.mjs`).
   - For example, `/blog/fee-refund-policy-aicte-ugc-2026/` was redirected to `/blog/fee-refund-policy-aicte-ugc-2027-29/`.
   - While the slug changed to `2027-29`, the post titles, H1s, body copy, and metadata still referenced 2026 guidelines, creating a severe relevance mismatch.
   - Google Search Console flagged old ranking URLs as "Page with redirect", resetting accumulated page rank, backlinks, and indexation trust.

2. **Accidental Deletion of High-Ranking Content**:
   - `posts/cat-2026-whatsapp-group-links-top-coaching.md` was deleted in commit `1a2e07320` without a redirect, producing immediate 404 errors for an established ranking asset.

3. **Chained & Inconsistent Redirects**:
   - The site is configured with `trailingSlash: true` in `next.config.ts`.
   - However, internal navigation links, related post links, and blog listing cards referenced URLs **without** trailing slashes (e.g. `/blog/${slug}` instead of `/blog/${slug}/`).
   - Furthermore, `public/llms.txt` and `public/llms-full.txt` advertised `https://www.careerwithmohit.online` (with `www.` and no trailing slashes).
   - This forced Googlebot and AI crawlers through multi-hop redirect chains:
     - Hop 1: `http://` -> `https://`
     - Hop 2: `www.` -> `non-www`
     - Hop 3: `no-slash` -> `trailing slash`
     - Hop 4: `old-slug` -> `new-slug`

4. **Temporary (302/307) & Client-Side Redirects**:
   - `public/_redirects` contains temporary `302` redirects for `/brochures/* /inquiry/ 302`.
   - 14 routes in `app/` (e.g., `app/cat-mock-test/page.tsx`, `app/mock-tests/cat/page.tsx`, `app/resume-builder/page.tsx`) call Next.js `redirect()`. In a static export (`output: "export"`), Next.js emits meta-refresh or temporary 307 headers, and these routes were simultaneously submitted in `sitemap.xml`.

5. **Spammy Templated Meta Keywords & Inappropriate Geo Injection**:
   - A batch update injected blanket "Delhi NCR Colleges", "Best Colleges in Delhi", and "Delhi Admissions 2027" keywords, `location: Delhi NCR`, and generic `coverage` tags onto posts covering national topics (e.g., AICTE/UGC Fee Refund Policy, Central Universities State-Wise List, MNIT Jaipur, DA-IICT Gandhinagar, Hyderabad MCA Colleges).
   - Meta descriptions across hundreds of posts were overwritten with a generic template:  
     `"2027 guide for [Title]: Check fees, verified placement packages, real cutoffs & admission tips with Mohit..."`

6. **Aggressive Overlays & Excessive H1 Pushing Content Below Fold**:
   - On mobile screens, three overlapping floating elements were rendered concurrently: `InquiryPopup`, `BotInquiryPopup`, and `SxoFloatingBar`.
   - The H1 in `BlogPostABHeader` was styled with `text-5xl sm:text-7xl md:text-8xl mb-12` accompanied by massive headers and a 500px image, forcing the actual article content well below the first viewport on both desktop and mobile, triggering Google's Page Layout and helpful content demotions.

---

## 2. Blog Post Slug Changes Audit

### Summary of Git Rename History
- Total renames detected in git history for `posts/`: **825**
- Major renaming commit:
  - **Commit**: `f77326dc7`
  - **Date**: 2026-09-30
  - **Author**: Mohit (`advik.mohit.jain@gmail.com`)
  - **Subject**: `Update all MBA & PGDM admission blogs, college reviews, regional hubs, and pages for 2027-29 admission batch`
  - **Renamed Posts Count**: 823 posts
- Earlier minor commit:
  - **Commit**: `b5741c173` (2026-03-12): 2 posts updated.

### Status of the 14 High-Impact Ranking URLs

| # | Requested Canonical URL | Status in Repository | Root Cause / History |
|---|-------------------------|----------------------|----------------------|
| 1 | `/` | Active (200 OK) | Home page |
| 2 | `/blog/fee-refund-policy-aicte-ugc-2026/` | **Renamed** to `fee-refund-policy-aicte-ugc-2027-29.md` | Renamed in commit `f77326dc7`. Redirected via `_redirects` to `2027-29`. GSC reports "Page with redirect". |
| 3 | `/blog/how-to-recover-college-fee-refund-legal-action/` | Active (200 OK) | Post slug unchanged. Has spammy meta tags/descriptions. |
| 4 | `/blog/btech-colleges-under-5-lakhs-budget-2026/` | Active (200 OK) | Excluded from MBA rename. Slug unchanged. |
| 5 | `/blog/direct-admission-skit-jaipur-btech-2026/` | Active (200 OK) | Excluded from MBA rename. Slug unchanged. |
| 6 | `/blog/cat-2026-whatsapp-group-links-top-coaching/` | **Deleted** (404 Not Found) | Deleted in commit `1a2e07320` (2026-08-25). 404 in Google. |
| 7 | `/blog/jaypee-noida-jiit-btech-admission-2026-fees-cutoff/` | Active (200 OK) | Slug unchanged. Has spammy meta tags. |
| 8 | `/blog/bba-colleges-without-maths-eligibility-2026/` | Active (200 OK) | Slug unchanged. Has templated description. |
| 9 | `/blog/direct-admission-mnit-jaipur-btech-2026/` | Active (200 OK) | Slug unchanged. Has Delhi NCR spam keywords for Jaipur college. |
| 10 | `/blog/bihar-student-credit-card-mba-colleges/` | Active (200 OK) | Slug unchanged. |
| 11 | `/blog/daiict-gandhinagar-btech-admission-2026-fees-cutoff-review/` | Active (200 OK) | Slug unchanged. Has Delhi NCR spam keywords for Gandhinagar college. |
| 12 | `/blog/top-healthcare-management-colleges-india-2026/` | **Renamed** to `top-healthcare-management-colleges-india-2027-29.md` | Renamed in commit `f77326dc7`. No direct redirect existed; returned 404 on old URL. |
| 13 | `/blog/central-university-list-india-2026-state-wise/` | Active (200 OK) | Slug unchanged. Has Delhi NCR spam keywords. |
| 14 | `/blog/top-mca-colleges-hyderabad-2026/` | Active (200 OK) | Slug unchanged. Has Delhi NCR spam keywords for Hyderabad post. |

---

## 3. Inventory of Slug Generation and Consumption

Every point in the application where slugs are generated, mapped, or consumed has been inventoried:

1. **Routing & Dynamic Page**:
   - `app/blog/[slug]/page.tsx`
   - Uses `getPostData(slug)` from `lib/markdown.ts` to read `posts/${slug}.md`.
   - `dynamicParams = false` enforces that only slugs defined by `generateStaticParams()` are statically generated.

2. **generateStaticParams**:
   - Defined in `app/blog/[slug]/page.tsx`. Reads all `.md` files in `posts/` via `getSortedPostsData()`.

3. **Sitemap Generation**:
   - `app/sitemap.ts`
   - Statically builds `sitemap.xml`. Reads `posts/` and filters out any path present in `public/_redirects`.
   - Because `fee-refund-policy-aicte-ugc-2026` was in `public/_redirects`, it was excluded from the sitemap while the redirected `2027-29` URL was submitted.

4. **Canonical Tag & OpenGraph URL**:
   - `app/layout.tsx` sets `metadataBase: new URL("https://careerwithmohit.online")`.
   - `app/blog/[slug]/page.tsx` sets `alternates: { canonical: '/blog/${slug}/' }` and `openGraph.url = 'https://careerwithmohit.online/blog/${slug}/'`.
   - When a slug was renamed, canonical tags immediately switched to the new `-2027-29` slug, sending conflicting signals to Google while external backlinks still targeted the `-2026` URL.

5. **JSON-LD Structured Data**:
   - `app/blog/[slug]/page.tsx` generates:
     - `BlogPosting`: sets `mainEntityOfPage: https://careerwithmohit.online/blog/${slug}/`
     - `BreadcrumbList`: items for Home, Blog, and Article.
     - `Person`: author entity with references to credentials.
   - Note: `components/Breadcrumbs.tsx` was ALSO emitting a duplicate `BreadcrumbList` schema in the body, causing duplicate schema entities.

6. **Internal Links Across Components**:
   - `components/BlogList.tsx`: Line 666 links to `<Link href={`/blog/${slug}`} ...>` (Missing trailing slash).
   - `app/blog/[slug]/page.tsx`: Line 1106 in "Related Articles" links to `<Link href={`/blog/${other.slug}`} ...>` (Missing trailing slash).
   - `app/mock-tests/page.tsx`: Lines 370 & 378 link to `/blog/${post.slug}` (Missing trailing slash).
   - `components/AdmissionsClient.tsx`: Line 946 links to `/blog/${post.slug}` (Missing trailing slash).
   - `components/MbaCollegesPuneClient.tsx`: Line 710 links to `/blog/${post.slug}` (Missing trailing slash).
   - `components/MbaPgdmClient.tsx`: Lines 498 & 1120 link to `/blog/${reviewSlug}` (Missing trailing slash).
   - `components/OnlineDegreeClient.tsx`: Lines 293 & 606 link to `/blog/${college.slug}` (Missing trailing slash).
   - `components/SearchResults.tsx`: Line 265 links to `/blog/${post.slug}` (Missing trailing slash).
   - `app/online-degree-certification/[slug]/page.tsx`: Lines 1152 & 1159 link to `/blog/${college.slug}` (Missing trailing slash).
   - Total detected instances: **16 JSX locations** missing trailing slashes.

7. **Internal Links Across Markdown Posts**:
   - **656 markdown links** inside `posts/*.md` link to `/blog/slug` without a trailing slash.
   - 1 markdown link directly links to `fee-refund-policy-aicte-ugc-2027-29`.

8. **Navigation & Menus**:
   - `components/Footer.tsx`: Links to `/blog/direct-mba-pgdm-admission-2027-2029-management-quota-guide/`.
   - `data/megaMenuData.ts`: Links to category hubs (`/colleges/...`, `/tools/...`, `/online-degree-certification/...`).

9. **RSS Feed**:
   - `scripts/generate-rss.mjs` generates `public/feed.xml` directly from filenames in `posts/`.

10. **LLMs & AI Machine-Readable Contexts**:
    - `public/llms.txt` and `public/llms-full.txt` (served by `app/llms.txt/route.ts`).
    - Currently advertise `https://www.careerwithmohit.online/...` (using `www` and omitting trailing slashes).

11. **Edge Middleware & Static Redirect Rules**:
    - `public/_redirects`: Read by Cloudflare Pages.
    - `functions/_middleware.ts`: Cloudflare Pages edge function built by `scripts/build-optimized-redirects.mjs`. Contains an in-memory dictionary of legacy redirects.

12. **Client-Side & Next.js Redirect Code**:
    - 14 routes in `app/` invoke `redirect(...)` directly in page components (e.g., `app/cat-mock-test/page.tsx`, `app/xat-mock-test/page.tsx`, `app/mock-tests/cat/page.tsx`, `app/resume-builder/page.tsx`).
    - In static export (`output: "export"`), these render client-side HTML redirect meta tags instead of clean HTTP 301 responses.

---

## 4. Redirect Architecture & URL Canonicals Audit

1. **trailingSlash Configuration**:
   - `next.config.ts` specifies: `trailingSlash: true`.
   - All canonical URLs must end with a trailing slash (e.g., `https://careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2026/`).
   - Any request without a trailing slash must receive a single-hop 301/308 redirect directly to the slash version.

2. **Domain & Protocol Canonicalization**:
   - Currently, `functions/_middleware.ts` only inspects `url.pathname` and uses `new URL(target, url.origin)`.
   - As a result, if a request arrives on `http://` or `www.careerwithmohit.online`, the middleware redirects to the target while **preserving** `http://` or `www.`, requiring subsequent hops to reach the final canonical URL.
   - **Requirement**: `functions/_middleware.ts` must normalize `protocol` -> `https:` and `hostname` -> `careerwithmohit.online` in a single edge redirect hop.

3. **Temporary (302/307) Redirects**:
   - `/brochures/* /inquiry/ 302` in `public/_redirects`. Must be updated to permanent status or removed.
   - Next.js `redirect()` on static pages yields temporary status.

4. **Multi-Hop Chained Redirects Flagged**:
   - Example 1: `http://www.careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2026`
     - Hop 1 -> `http://www.careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2027-29/`
     - Hop 2 -> `https://www.careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2027-29/`
     - Hop 3 -> `https://careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2027-29/`
   - Fixed by edge normalizer: 1 single hop directly to `https://careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2026/` (301).

---

## 5. Metadata, Quality, & Layout Audit

1. **Robots.txt & API Dependency**:
   - `app/robots.ts` disallows `['/private/', '/admin/', '/api/']`.
   - Full codebase audit reveals **zero** page content is fetched from `/api/` at render time; all pages are statically pre-rendered markdown/JSON at build time via `output: "export"`.
   - `/api/` is only used for background analytics/lead submissions.
   - Result: `/api/` disallow in `robots.txt` is completely safe and requires no loosening for Googlebot.

2. **Templated & Misleading Meta Keywords**:
   - Across posts, automated scripts injected:
     `"Direct Admission in Delhi", "Delhi NCR Colleges", "Best Colleges in Delhi NCR", "Top Colleges in Delhi NCR 2026", "Delhi NCR Direct Admission 2026", "Colleges in Delhi NCR", "Delhi NCR Career Counselling", "Delhi NCR Admissions 2027"`
   - This was added to:
     - Nationwide regulatory posts: `fee-refund-policy-aicte-ugc`
     - Rajasthan posts: `direct-admission-mnit-jaipur-btech-2026`
     - Gujarat posts: `daiict-gandhinagar-btech-admission-2026-fees-cutoff-review`
     - Telangana posts: `top-mca-colleges-hyderabad-2026`
     - National lists: `central-university-list-india-2026-state-wise`

3. **Low-Quality Meta Descriptions**:
   - Templated descriptions with truncated text and unsubstantiated claims (`verified placement packages, real cutoffs & admission tips with Mohit...`).
   - Need concise, authentic summaries <= 155 characters derived directly from post content.

4. **"ai-content-declaration" Tag**:
   - Present in `app/layout.tsx` (line 112) and `app/blog/[slug]/page.tsx` (line 576): `"ai-content-declaration": "human-authored-expert-guidance"`.
   - Must be removed as requested.

5. **Person Schema & Credential Claims**:
   - In `app/layout.tsx` and `app/about/page.tsx`, `alumniOf` and `hasCredential` list IIM Bangalore and FMS Delhi.
   - Must retain schema validity, preserve claims as instructed, and add explicit `TODO: Verify credential claims against physical certificates` comments.

6. **Overlays & Above-the-Fold UX**:
   - Currently, `ClientWidgets.tsx` triggers both `InquiryPopup` (modal dialog) and `BotInquiryPopup` (chat launcher).
   - `SxoFloatingBar.tsx` floats at the bottom of the screen.
   - `BlogPostABHeader.tsx` renders H1 as `text-5xl sm:text-7xl md:text-8xl mb-12`, with huge badges, date chips, and hero image pushing paragraph 1 offscreen.
   - Overlays must be restricted to at most ONE non-intrusive dismissible element on blog pages with 0 CLS, and H1 typography scaled down to ensure the first paragraph is immediately readable on screen.

---

## 6. Execution Plan & Architecture for Recovery

1. **URL & Post Recovery**:
   - Restore `posts/fee-refund-policy-aicte-ugc-2026.md` as the canonical file.
   - Restore `posts/top-healthcare-management-colleges-india-2026.md` as the canonical file.
   - Restore `posts/cat-2026-whatsapp-group-links-top-coaching.md` from git commit `1a2e07320^`.
   - Add permanent 301 redirect: `/blog/fee-refund-policy-aicte-ugc-2027-29/` -> `/blog/fee-refund-policy-aicte-ugc-2026/`.
   - Add permanent 301 redirect: `/blog/top-healthcare-management-colleges-india-2027-29/` -> `/blog/top-healthcare-management-colleges-india-2026/`.

2. **Evergreen Slug Guard & Immutability**:
   - Create `scripts/verify-slug-immutability.mjs` that runs at build time (`npm run build`).
   - Fails the build if any published slug is altered without a corresponding permanent redirect entry in the central redirect registry.

3. **Centralized Edge Redirect Engine**:
   - Update `scripts/build-optimized-redirects.mjs` and `functions/_middleware.ts` to:
     - Enforce `http` -> `https`
     - Enforce `www` -> `non-www`
     - Enforce `trailingSlash`
     - Resolve all mapped legacy slugs in **exactly 1 hop** (HTTP 301).
   - Export full redirect map to `REDIRECT_MAP.csv`.

4. **Internal Signals & Trailing Slashes**:
   - Fix all JSX component links to include trailing slashes.
   - Fix all 656 internal markdown links to include trailing slashes.
   - Standardize `public/llms.txt`, `public/llms-full.txt`, and `public/feed.xml`.

5. **Page Quality & Typography**:
   - Clean frontmatter keywords, location tags, and descriptions on ranking posts.
   - Remove `ai-content-declaration` tag.
   - Reduce H1 font sizing in `BlogPostABHeader.tsx` to `text-3xl sm:text-4xl md:text-5xl mb-6`.
   - Restrict overlays on blog pages to a single dismissible widget without CLS.
   - Ensure breadcrumb component displays post title rather than raw slug.

6. **Verification & Audit Artifacts**:
   - Generate `SEO_AUDIT.md`, `REDIRECT_MAP.csv`, and `CHANGES.md`.
   - Run local verification test suite.
