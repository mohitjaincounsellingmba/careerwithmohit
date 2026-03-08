import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const igBusinessId = process.env.INSTAGRAM_BUSINESS_ID;
const igAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

async function postToInstagram() {
  if (!igBusinessId || !igAccessToken) {
    console.error('Missing Instagram credentials');
    process.exit(1);
  }

  // 1. Detect latest post
  const postsDir = path.join(__dirname, '../posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('No posts found');
    return;
  }

  // Sort by name or date if encoded in filename, or just latest modified
  const latestFile = files.sort((a, b) => {
    return fs.statSync(path.join(postsDir, b)).mtime.getTime() - fs.statSync(path.join(postsDir, a)).mtime.getTime();
  })[0];

  const slug = latestFile.replace('.md', '');
  const postUrl = `${baseUrl}/blog/${slug}`;
  const shareCardUrl = `${baseUrl}/social/instagram-card/${slug}`;

  console.log(`Processing: ${slug}`);

  // 2. Generate Graphic
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080 });
  
  console.log(`Capturing graphic from: ${shareCardUrl}`);
  // Wait for content to render
  await page.goto(shareCardUrl, { waitUntil: 'networkidle2' });
  
  const screenshotPath = path.join(__dirname, `../public/temp-ig-${slug}.jpg`);
  await page.screenshot({ path: screenshotPath, type: 'jpeg', quality: 90 });
  await browser.close();

  // 3. Upload to Instagram (Conceptual - requires public URL)
  // NOTE: Instagram API requires a publicly accessible URL for the image.
  // In CI, we would upload to a temporary host or use the deployed site's absolute URL.
  // For now, we output the instructions.
  
  const publicImageUrl = `${baseUrl}/temp-ig-${slug}.jpg`;
  const caption = `New Blog Post: ${slug.replace(/-/g, ' ')}\n\nRead more at ${postUrl}\n\n#MBA #CareerCounselling #Admissions #Success`;

  console.log('--- Ready to Post ---');
  console.log('Image:', publicImageUrl);
  console.log('Caption:', caption);

  // Example API calls (commented out until keys are safe)
  /*
  const containerRes = await fetch(`https://graph.facebook.com/v19.0/${igBusinessId}/media?image_url=${encodeURIComponent(publicImageUrl)}&caption=${encodeURIComponent(caption)}&access_token=${igAccessToken}`, { method: 'POST' });
  const containerData = await containerRes.json();
  
  if (containerData.id) {
    const publishRes = await fetch(`https://graph.facebook.com/v19.0/${igBusinessId}/media_publish?creation_id=${containerData.id}&access_token=${igAccessToken}`, { method: 'POST' });
    const publishData = await publishRes.json();
    console.log('Published!', publishData);
  } else {
    console.error('Failed to create media container', containerData);
  }
  */
}

postToInstagram();
