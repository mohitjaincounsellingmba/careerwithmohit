# 📢 Social Media Auto-Posting — Setup Guide

## What This Does
Every time you push a new blog post to GitHub, it **automatically**:
- Generates a branded graphic image for Instagram/Facebook (1080×1080)
- Generates a branded graphic for LinkedIn (1200×627)
- Posts to **Instagram**, **Facebook Page**, and **LinkedIn** with captions + hashtags

---

## ✅ STEP 1 — Get LinkedIn API Credentials

### 1a. Create a LinkedIn App
1. Go to: https://www.linkedin.com/developers/apps
2. Click **"Create App"**
3. Fill in:
   - App Name: `CareerWithMohit`
   - LinkedIn Page: your personal or business page
   - App logo: upload your logo
4. Click **"Create App"**

### 1b. Get Permissions
1. Go to **Products** tab → Request access to **"Share on LinkedIn"** and **"Sign In with LinkedIn using OpenID Connect"**
2. Go to **Auth** tab → Add OAuth 2.0 scopes: `w_member_social`, `r_liteprofile`

### 1c. Get Access Token
1. Go to **Auth** tab → Use the **OAuth 2.0 Token Generator**
2. Select scopes: `w_member_social`, `r_liteprofile`
3. Click **"Request Access Token"** and authorize
4. Copy the **Access Token** → this is your `LINKEDIN_ACCESS_TOKEN`

> ⚠️ LinkedIn tokens expire in **60 days**. You'll need to refresh it manually.

### 1d. Get Your Person URN
1. Call this URL in your browser (replace TOKEN):
   ```
   https://api.linkedin.com/v2/me?oauth2_access_token=YOUR_TOKEN
   ```
2. Copy the `id` field — your URN is: `urn:li:person:YOUR_ID`

---

## ✅ STEP 2 — Get Facebook + Instagram Credentials

### 2a. Create a Meta Developer App
1. Go to: https://developers.facebook.com/apps
2. Click **"Create App"** → Choose **"Business"**
3. Fill in App Name: `CareerWithMohit`

### 2b. Connect Your Facebook Page
1. In your App → Add Product → **"Facebook Login"** + **"Instagram Graph API"**
2. Go to **Tools → Graph API Explorer**
3. Select your App → Select your **Facebook Page** from the dropdown
4. Add permissions: `pages_manage_posts`, `pages_read_engagement`
5. Click **Generate Access Token** → Copy it → this is `FB_PAGE_ACCESS_TOKEN`
6. The **Page ID** is shown in your Facebook Page → About section → `FB_PAGE_ID`

### 2c. Connect Instagram Business Account
> Your Instagram must be a **Business or Creator** account linked to your Facebook Page

1. In Graph API Explorer → Add permissions:
   - `instagram_basic`
   - `instagram_content_publish`
2. Find your Instagram Business ID:
   ```
   GET /{facebook-page-id}?fields=instagram_business_account
   ```
3. Copy the `id` → this is `INSTAGRAM_BUSINESS_ID`
4. The same token is your `INSTAGRAM_ACCESS_TOKEN`

---

## ✅ STEP 3 — Add Secrets to GitHub

1. Go to your GitHub repo → **Settings → Secrets and Variables → Actions**
2. Click **"New repository secret"** and add each one:

| Secret Name | Value |
|-------------|-------|
| `INSTAGRAM_BUSINESS_ID` | From Step 2c |
| `INSTAGRAM_ACCESS_TOKEN` | From Step 2b |
| `FB_PAGE_ID` | From Step 2b |
| `FB_PAGE_ACCESS_TOKEN` | From Step 2b |
| `LINKEDIN_ACCESS_TOKEN` | From Step 1c |
| `LINKEDIN_PERSON_URN` | From Step 1d (e.g. `urn:li:person:XXXX`) |

---

## ✅ STEP 4 — Test Locally (Before Pushing)

```bash
# 1. Copy env template
cp .env.example .env.local

# 2. Fill in your credentials in .env.local

# 3. Start dev server
npm run dev

# 4. Preview your cards at:
# http://localhost:3000/social/instagram-card/test-mba-post-2026
# http://localhost:3000/social/linkedin-card/test-mba-post-2026

# 5. Dry run — see what would be posted without actually posting
npm run social-share:dry

# 6. Post for real (all platforms)
npm run social-share

# 7. Post to specific platform only
npm run social-share:linkedin
npm run social-share:instagram
npm run social-share:facebook

# 8. Post a specific blog by slug
node scripts/social-share.mjs --slug direct-admission-srm-university-2026
```

---

## ✅ STEP 5 — Automatic Trigger (GitHub Actions)

Once secrets are added, every time you:
```bash
git add posts/my-new-blog.md
git commit -m "Add new blog post"
git push
```

GitHub will **automatically**:
1. Detect the new file in `/posts/`
2. Build the site
3. Take screenshots of the social cards
4. Post to Instagram, Facebook, and LinkedIn

You can also trigger manually from:
**GitHub → Actions → "📢 Social Media Auto-Post" → Run workflow**

---

## 📋 Available npm Commands

| Command | What it does |
|---------|-------------|
| `npm run social-share` | Post latest blog to all platforms |
| `npm run social-share:dry` | Preview without posting |
| `npm run social-share:linkedin` | Post to LinkedIn only |
| `npm run social-share:instagram` | Post to Instagram only |
| `npm run social-share:facebook` | Post to Facebook only |
| `npm run social-preview` | Save card screenshots locally |

---

## ❓ Troubleshooting

**"Missing credentials" error**
→ Make sure `.env.local` exists and all values are filled in

**Instagram posting fails**
→ Check your Instagram is a **Business account** connected to your Facebook Page

**LinkedIn token expired**
→ Go back to LinkedIn Developers → regenerate Access Token → update GitHub Secret

**Card looks broken**
→ Visit http://localhost:3000/social/instagram-card/test-mba-post-2026 to debug visually
