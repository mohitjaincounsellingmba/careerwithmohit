import fs from 'fs';
import path from 'path';

console.log('========================================================================');
console.log('🔍 CAREERWITHMOHIT — SEO ENDPOINT & SITEMAP VALIDATION AUDIT');
console.log('========================================================================\n');

// 1. Verify sitemap.ts logic output
import sitemapFn from '../app/sitemap.ts';

const sitemapEntries = sitemapFn();
console.log(`📊 Generated Sitemap Entries: ${sitemapEntries.length.toLocaleString()}`);

let invalidUrls = 0;
let nonTrailingSlashCount = 0;
let wwwCount = 0;

sitemapEntries.forEach((entry, idx) => {
  if (entry.url.includes('www.careerwithmohit.online')) {
    wwwCount++;
    if (wwwCount <= 3) console.error(`❌ Found 'www' in sitemap: ${entry.url}`);
  }
  if (!entry.url.endsWith('/') && !/\.[a-zA-Z0-9]+$/.test(entry.url)) {
    nonTrailingSlashCount++;
    if (nonTrailingSlashCount <= 3) console.error(`❌ Found non-trailing slash URL: ${entry.url}`);
  }
});

if (wwwCount === 0 && nonTrailingSlashCount === 0) {
  console.log('✅ SITEMAP AUDIT PASSED: 100% of URLs use canonical apex domain (careerwithmohit.online) and have trailing slashes.');
} else {
  console.error(`⚠️ SITEMAP ISSUES: ${wwwCount} with www, ${nonTrailingSlashCount} missing trailing slash.`);
}

// 2. Check feed.xml route
const feedRoutePath = path.join(process.cwd(), 'app', 'feed.xml', 'route.ts');
const feedContent = fs.readFileSync(feedRoutePath, 'utf8');
const feedHasWww = feedContent.includes('www.careerwithmohit.online');
const feedHasTrailingSlash = feedContent.includes('/blog/${post.slug}/');

if (!feedHasWww && feedHasTrailingSlash) {
  console.log('✅ RSS FEED AUDIT PASSED: Uses canonical domain & trailing slashes.');
} else {
  console.error(`⚠️ RSS FEED ISSUE: Has www: ${feedHasWww}, Has trailing slash: ${feedHasTrailingSlash}`);
}

// 3. Check robots.ts
const robotsPath = path.join(process.cwd(), 'app', 'robots.ts');
const robotsContent = fs.readFileSync(robotsPath, 'utf8');
if (robotsContent.includes('https://careerwithmohit.online/sitemap.xml') && !robotsContent.includes('www.careerwithmohit.online')) {
  console.log('✅ ROBOTS.TXT AUDIT PASSED: Correct sitemap URL configured.');
} else {
  console.error('⚠️ ROBOTS.TXT ISSUE: SITEMAP URL not matching canonical domain.');
}

console.log('\n========================================================================');
console.log('🎉 AUDIT COMPLETE!');
console.log('========================================================================\n');
