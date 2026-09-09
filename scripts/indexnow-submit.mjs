import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const HOST = 'www.careerwithmohit.online';
const BASE_URL = `https://${HOST}`;
const KEY = '85b9671d18ce4266a1a1f5926ec037c8';
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find(a => a.startsWith('--limit='));
const maxLimit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 10000;

console.log('========================================================================');
console.log('🚀 CAREERWITHMOHIT — INDEXNOW REAL-TIME INSTANT INDEXING SUBMISSION');
console.log('========================================================================');
console.log(`Host: ${HOST}`);
console.log(`Key Location: ${KEY_LOCATION}`);
console.log(`Dry Run: ${isDryRun ? 'YES (Simulating)' : 'NO (Live API submission)'}`);
console.log(`Max Limit: ${maxLimit}\n`);

// 1. Core high-priority static routes
const coreRoutes = [
  '',
  '/colleges',
  '/mock-tests',
  '/blog',
  '/mba-pgdm-admission-2027',
  '/mba-pgdm-admissions-by-region',
  '/mba-admissions-by-region',
  '/online-degree-certification',
  '/services',
  '/about',
  '/inquiry',
  '/news',
  '/starter-kit',
  '/tools/cat-mock-test',
  '/tools/cat-score-calculator',
  '/tools/xat-score-calculator-2027',
  '/tools/btech-college-predictor',
  '/colleges/mba-colleges-delhi-ncr',
  '/colleges/mba-colleges-pune',
  '/colleges/mba-colleges-bangalore',
  '/colleges/mba-colleges-mumbai',
  '/colleges/mba-colleges-hyderabad',
  '/colleges/mba-colleges-kolkata',
  '/colleges/mba-colleges-ahmedabad',
  '/colleges/mba-colleges-jaipur'
].map(r => `${BASE_URL}${r}`);

// 2. Discover college profiles
const collegesDir = path.join(process.cwd(), 'colleges');
let collegeUrls = [];
if (fs.existsSync(collegesDir)) {
  const collegeFiles = fs.readdirSync(collegesDir).filter(f => f.endsWith('.md'));
  collegeUrls = collegeFiles.map(f => `${BASE_URL}/colleges/${f.replace('.md', '')}`);
}

// 3. Discover recent and top blog posts
const postsDir = path.join(process.cwd(), 'posts');
let blogUrls = [];
if (fs.existsSync(postsDir)) {
  const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  
  // Sort posts by mtime (most recently updated first)
  const postsWithStats = postFiles.map(f => {
    const stat = fs.statSync(path.join(postsDir, f));
    return { file: f, mtime: stat.mtime };
  }).sort((a, b) => b.mtime - a.mtime);

  blogUrls = postsWithStats.map(p => `${BASE_URL}/blog/${p.file.replace('.md', '')}`);
}

// Combine all unique URLs
const allUrls = Array.from(new Set([...coreRoutes, ...collegeUrls, ...blogUrls])).slice(0, maxLimit);

console.log(`📊 Discovered URLs:`);
console.log(`   - Core Static & Landing Pages: ${coreRoutes.length}`);
console.log(`   - College Directory Guides:   ${collegeUrls.length}`);
console.log(`   - Blog & Article Guides:       ${blogUrls.length}`);
console.log(`   - Total URLs Ready to Submit:  ${allUrls.length}\n`);

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: allUrls
};

async function submitIndexNow() {
  if (isDryRun) {
    console.log('🔍 [DRY RUN] Payload sample:');
    console.log(JSON.stringify({
      host: payload.host,
      key: payload.key,
      keyLocation: payload.keyLocation,
      sampleUrls: payload.urlList.slice(0, 5),
      totalCount: payload.urlList.length
    }, null, 2));
    console.log('\n✅ Dry run completed successfully. No HTTP request was sent.');
    return;
  }

  console.log(`📡 Sending batch submission of ${allUrls.length} URLs to IndexNow (${INDEXNOW_ENDPOINT})...`);

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`\n🎉 SUCCESS! IndexNow accepted ${allUrls.length} URLs (HTTP ${response.status}).`);
      console.log('⚡ Search engines (Bing, Copilot, Yandex, Seznam, Naver) have received instant indexing notifications!');
    } else {
      const text = await response.text();
      console.error(`\n⚠️ IndexNow responded with HTTP ${response.status}: ${text}`);
      if (response.status === 422) {
        console.error('Hint: Key file location or host format mismatch.');
      }
    }
  } catch (err) {
    console.error(`\n❌ Failed to submit to IndexNow:`, err.message);
  }
}

submitIndexNow();
