/**
 * CareerWithMohit — Social Media Auto-Poster
 * ============================================
 * Posts the latest (or specified) blog post to LinkedIn, Facebook, and Instagram.
 *
 * Usage:
 *   node scripts/social-share.mjs                     → posts latest blog
 *   node scripts/social-share.mjs --slug my-post      → posts specific blog
 *   node scripts/social-share.mjs --dry-run            → preview without posting
 *   node scripts/social-share.mjs --platform linkedin  → post to one platform only
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import 'dotenv/config';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Parse CLI Arguments ───────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
};
const hasFlag = (name) => args.includes(`--${name}`);

const DRY_RUN = hasFlag('dry-run');
const PLATFORM = getArg('platform'); // 'linkedin', 'instagram', 'facebook', or null (all)
const FORCED_SLUG = getArg('slug');

// ─── Configuration ─────────────────────────────────────────────────
const BASE_URL = process.env.BASE_URL || 'https://careerwithmohit.com';
const LOCAL_URL = 'http://localhost:3000';

const IG_BUSINESS_ID = process.env.INSTAGRAM_BUSINESS_ID;
const IG_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN;
const LI_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LI_PERSON_URN = process.env.LINKEDIN_PERSON_URN;

// ─── Detect Latest / Specific Blog Post ───────────────────────────
function getPost(slug) {
  const postsDir = path.join(__dirname, '../posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  let targetFile;
  if (slug) {
    targetFile = `${slug}.md`;
    if (!files.includes(targetFile)) {
      console.error(`❌ Post not found: ${slug}`);
      process.exit(1);
    }
  } else {
    // Get latest modified file
    targetFile = files.sort((a, b) =>
      fs.statSync(path.join(postsDir, b)).mtime - fs.statSync(path.join(postsDir, a)).mtime
    )[0];
  }

  const fullPath = path.join(postsDir, targetFile);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(raw);
  const postSlug = targetFile.replace('.md', '');

  return {
    slug: postSlug,
    title: data.title || postSlug.replace(/-/g, ' '),
    description: data.description || '',
    keywords: data.keywords || [],
    date: data.date || new Date().toISOString().split('T')[0],
    url: `${BASE_URL}/blog/${postSlug}`,
  };
}

// ─── Build Captions ────────────────────────────────────────────────
function buildCaption(post, platform) {
  const hashtags = [
    '#CareerWithMohit', '#MBA', '#BTech',
    '#CareerCounselling', '#Admissions2026',
    '#EducationIndia', '#CollegeAdmission',
    ...(post.keywords?.slice(0, 3).map(k => `#${k.replace(/\s+/g, '')}`) || []),
  ].join(' ');

  if (platform === 'linkedin') {
    return [
      `📚 ${post.title}`,
      '',
      post.description,
      '',
      `🔗 Read the full article: ${post.url}`,
      '',
      hashtags,
    ].join('\n');
  }

  return [
    `🎓 ${post.title}`,
    '',
    post.description,
    '',
    `👉 Link in bio | ${post.url}`,
    '',
    hashtags,
  ].join('\n');
}

// ─── Screenshot Card with Puppeteer ────────────────────────────────
async function captureCard(slug, type) {
  const viewport = type === 'linkedin'
    ? { width: 1200, height: 627 }
    : { width: 1080, height: 1080 };

  const cardUrl = `${LOCAL_URL}/social/${type}-card/${slug}`;
  console.log(`📸 Capturing ${type} card from: ${cardUrl}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport(viewport);

  try {
    await page.goto(cardUrl, { waitUntil: 'networkidle0', timeout: 60000 });
    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    const outDir = path.join(__dirname, '../public');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const filePath = path.join(outDir, `social-card-${type}.jpg`);
    await page.screenshot({ path: filePath, type: 'jpeg', quality: 95 });
    console.log(`✅ Saved: ${filePath}`);
    await browser.close();
    return filePath;
  } catch (err) {
    console.error(`❌ Failed to capture ${type} card:`, err.message);
    await browser.close();
    throw err;
  }
}

// ─── Post to Instagram ─────────────────────────────────────────────
async function postToInstagram(post, imageUrl) {
  if (!IG_BUSINESS_ID || !IG_ACCESS_TOKEN) {
    console.log('⏭️  Skipping Instagram — INSTAGRAM_BUSINESS_ID or INSTAGRAM_ACCESS_TOKEN missing');
    return;
  }
  const caption = buildCaption(post, 'instagram');

  if (DRY_RUN) {
    console.log('\n📋 [DRY RUN] Instagram Post Preview:');
    console.log('Image URL:', imageUrl);
    console.log('Caption:\n', caption);
    return;
  }

  try {
    // Step 1: Create media container
    const containerRes = await axios.post(
      `https://graph.facebook.com/v19.0/${IG_BUSINESS_ID}/media`,
      { image_url: imageUrl, caption, access_token: IG_ACCESS_TOKEN }
    );
    const creationId = containerRes.data.id;

    // Step 2: Publish
    await axios.post(
      `https://graph.facebook.com/v19.0/${IG_BUSINESS_ID}/media_publish`,
      { creation_id: creationId, access_token: IG_ACCESS_TOKEN }
    );
    console.log('✅ Posted to Instagram!');
  } catch (err) {
    console.error('❌ Instagram Post Failed:', err.response?.data || err.message);
  }
}

// ─── Post to Facebook ──────────────────────────────────────────────
async function postToFacebook(post, imageUrl) {
  if (!FB_PAGE_ID || !FB_ACCESS_TOKEN) {
    console.log('⏭️  Skipping Facebook — FB_PAGE_ID or FB_PAGE_ACCESS_TOKEN missing');
    return;
  }
  const caption = buildCaption(post, 'facebook');

  if (DRY_RUN) {
    console.log('\n📋 [DRY RUN] Facebook Post Preview:');
    console.log('Image URL:', imageUrl);
    console.log('Caption:\n', caption);
    return;
  }

  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/${FB_PAGE_ID}/photos`,
      { url: imageUrl, caption, access_token: FB_ACCESS_TOKEN }
    );
    console.log('✅ Posted to Facebook!');
  } catch (err) {
    console.error('❌ Facebook Post Failed:', err.response?.data || err.message);
  }
}

// ─── Post to LinkedIn ──────────────────────────────────────────────
async function postToLinkedIn(post) {
  if (!LI_ACCESS_TOKEN || !LI_PERSON_URN) {
    console.log('⏭️  Skipping LinkedIn — LINKEDIN_ACCESS_TOKEN or LINKEDIN_PERSON_URN missing');
    return;
  }
  const text = buildCaption(post, 'linkedin');

  if (DRY_RUN) {
    console.log('\n📋 [DRY RUN] LinkedIn Post Preview:');
    console.log('Caption:\n', text);
    return;
  }

  try {
    await axios.post(
      'https://api.linkedin.com/v2/ugcPosts',
      {
        author: LI_PERSON_URN,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text },
            shareMediaCategory: 'ARTICLE',
            media: [{
              status: 'READY',
              description: { text: post.description },
              originalUrl: post.url,
              title: { text: post.title },
            }],
          },
        },
        visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
      },
      { headers: { Authorization: `Bearer ${LI_ACCESS_TOKEN}`, 'X-Restli-Protocol-Version': '2.0.0' } }
    );
    console.log('✅ Posted to LinkedIn!');
  } catch (err) {
    console.error('❌ LinkedIn Post Failed:', err.response?.data || err.message);
  }
}

// ─── Main ──────────────────────────────────────────────────────────
async function main() {
  console.log('\n🚀 CareerWithMohit Social Auto-Poster');
  if (DRY_RUN) console.log('⚠️  DRY RUN MODE — No posts will be published\n');

  const post = getPost(FORCED_SLUG);
  console.log(`📝 Post: "${post.title}"`);
  console.log(`🔗 URL: ${post.url}\n`);

  // Screenshot both cards
  let igImageUrl = `${BASE_URL}/social-card-instagram.jpg`;
  let liImageUrl = `${BASE_URL}/social-card-linkedin.jpg`;

  if (!DRY_RUN) {
    try {
      await captureCard(post.slug, 'instagram');
      await captureCard(post.slug, 'linkedin');
      console.log('\n📤 Images captured. Starting to post...\n');
    } catch (e) {
      console.error('❌ Card capture failed. Make sure your dev server is running (npm run dev)');
      process.exit(1);
    }
  }

  // Post based on platform flag
  const platforms = PLATFORM
    ? [PLATFORM]
    : ['instagram', 'facebook', 'linkedin'];

  if (platforms.includes('instagram')) await postToInstagram(post, igImageUrl);
  if (platforms.includes('facebook')) await postToFacebook(post, igImageUrl);
  if (platforms.includes('linkedin')) await postToLinkedIn(post);

  console.log('\n🎉 Done!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
