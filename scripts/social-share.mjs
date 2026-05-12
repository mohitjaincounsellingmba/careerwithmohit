import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// --- CONFIGURATION ---
const POSTS_DIR = path.join(process.cwd(), 'posts');
const SITE_URL = 'https://www.careerwithmohit.online';

// Credentials from environment variables
const {
  INSTAGRAM_BUSINESS_ID,
  INSTAGRAM_ACCESS_TOKEN,
  FB_PAGE_ID,
  LINKEDIN_ACCESS_TOKEN
} = process.env;

async function shareToSocialMedia() {
  console.log('🚀 Starting Social Media Automation...');

  // 1. Find the latest blog post
  const files = fs.readdirSync(POSTS_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      name: file,
      time: fs.statSync(path.join(POSTS_DIR, file)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);

  if (files.length === 0) {
    console.error('❌ No blog posts found!');
    return;
  }

  const latestFile = files[0].name;
  const filePath = path.join(POSTS_DIR, latestFile);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const title = data.title || 'New Blog Post';
  const slug = latestFile.replace('.md', '');
  const url = `${SITE_URL}/blog/${slug}`;
  const excerpt = data.description || content.slice(0, 150).replace(/[#*`]/g, '') + '...';

  console.log(`\n📄 Latest Post: ${title}`);
  console.log(`🔗 URL: ${url}`);

  // --- Instagram Sharing ---
  if (INSTAGRAM_BUSINESS_ID && INSTAGRAM_ACCESS_TOKEN) {
    console.log('📸 Sharing to Instagram...');
    // Implementation would go here using Facebook Graph API
    // Requires a public image URL
  } else {
    console.warn('⚠️ Skipping Instagram (Credentials missing)');
  }

  // --- Facebook Sharing ---
  if (FB_PAGE_ID && INSTAGRAM_ACCESS_TOKEN) {
    console.log('👥 Sharing to Facebook...');
    // Implementation would go here
  } else {
    console.warn('⚠️ Skipping Facebook (Credentials missing)');
  }

  // --- LinkedIn Sharing ---
  if (LINKEDIN_ACCESS_TOKEN) {
    console.log('🔗 Sharing to LinkedIn...');
    // Implementation would go here
  } else {
    console.warn('⚠️ Skipping LinkedIn (Credentials missing)');
  }

  console.log('\n✅ Social Media Automation Check Complete.');
  console.log('Note: Ensure your .env file is configured with the required API tokens.');
}

shareToSocialMedia().catch(err => {
  console.error('❌ Social Media Automation Failed:', err);
});
