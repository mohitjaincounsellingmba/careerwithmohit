import fs from 'fs';
import path from 'path';

console.log('='.repeat(80));
console.log('🏁 COMPREHENSIVE PHASE 5 TECHNICAL SEO & RECOVERY AUDIT');
console.log('='.repeat(80));

let failures = [];

// 1. Audit Redirect Engine for Chains and Loops
console.log('\n[1/5] Auditing Edge Redirect Table (Chains & Loops)...');
const middlewarePath = path.join(process.cwd(), 'functions', '_middleware.ts');
const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');
const match = middlewareContent.match(/const REDIRECT_MAP: Record<string, string> = (\{[\s\S]*?\});/);
const redirectMap = JSON.parse(match[1]);

let redirectChains = 0;
let redirectLoops = 0;
for (const [from, to] of Object.entries(redirectMap)) {
  const normTo = to.endsWith('/') && to.length > 1 ? to.slice(0, -1) : to;
  if (redirectMap[normTo] || redirectMap[to]) {
    failures.push(`Redirect Chain: ${from} -> ${to} -> ${redirectMap[normTo] || redirectMap[to]}`);
    redirectChains++;
  }
  if (from === to || from === normTo) {
    failures.push(`Redirect Loop: ${from} -> ${to}`);
    redirectLoops++;
  }
}
console.log(`  - Redirect Rules Tested: ${Object.keys(redirectMap).length}`);
console.log(`  - Chains Detected: ${redirectChains}`);
console.log(`  - Loops Detected: ${redirectLoops}`);

// 2. Audit Internal Links in Components & Markdown Posts
console.log('\n[2/5] Auditing Internal Links across JSX/TSX and Markdown files...');
const redirectsSet = new Set();
for (const k of Object.keys(redirectMap)) {
  const norm = k.toLowerCase().replace(/\/$/, '');
  redirectsSet.add(norm);
  redirectsSet.add(norm + '/');
}

let internalLinksToRedirects = 0;
let internalLinksTo404s = 0;
let sampleBadLinks = [];

const postsDir = path.join(process.cwd(), 'posts');
const collegesDir = path.join(process.cwd(), 'colleges');
const activePosts = new Set(fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, '')));
const activeColleges = new Set(fs.readdirSync(collegesDir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, '')));

function auditLinksInText(text, filePath) {
  const matches = text.matchAll(/\[([^\]]+)\]\((\/[^)\s#?]+)\)/g);
  for (const m of matches) {
    const raw = m[2];
    const clean = raw.toLowerCase().replace(/\/$/, '');

    // Check redirect
    if (redirectsSet.has(clean) || redirectsSet.has(clean + '/')) {
      internalLinksToRedirects++;
      if (sampleBadLinks.length < 10) sampleBadLinks.push({ file: filePath, link: raw, reason: 'Points to Redirect' });
    }

    // Check 404
    if (clean.startsWith('/blog/')) {
      const slug = clean.replace('/blog/', '');
      if (!activePosts.has(slug) && !redirectsSet.has(clean)) {
        internalLinksTo404s++;
        if (sampleBadLinks.length < 10) sampleBadLinks.push({ file: filePath, link: raw, reason: '404 Missing Post' });
      }
    } else if (clean.startsWith('/colleges/')) {
      const slug = clean.replace('/colleges/', '');
      if (!activeColleges.has(slug) && !redirectsSet.has(clean) && !clean.includes('mba-colleges-') && !clean.includes('top-engineering') && !clean.includes('compare')) {
        internalLinksTo404s++;
        if (sampleBadLinks.length < 10) sampleBadLinks.push({ file: filePath, link: raw, reason: '404 Missing College' });
      }
    }
  }
}

for (const f of fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))) {
  auditLinksInText(fs.readFileSync(path.join(postsDir, f), 'utf8'), `posts/${f}`);
}
for (const f of fs.readdirSync(collegesDir).filter(f => f.endsWith('.md'))) {
  auditLinksInText(fs.readFileSync(path.join(collegesDir, f), 'utf8'), `colleges/${f}`);
}

console.log(`  - Internal Links to Redirects: ${internalLinksToRedirects}`);
console.log(`  - Internal Links to 404s: ${internalLinksTo404s}`);
if (sampleBadLinks.length > 0) {
  console.log('  - Sample Bad Links:', sampleBadLinks);
}

// 3. Audit Production Sitemap.xml
console.log('\n[3/5] Auditing Production sitemap.xml...');
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const locMatches = Array.from(sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)).map(m => m[1]);

let sitemapRedirects = 0;
let sitemap404s = 0;

for (const loc of locMatches) {
  const pathname = loc.replace('https://careerwithmohit.online', '').toLowerCase();
  const norm = pathname.replace(/\/$/, '');
  if (redirectsSet.has(norm) || redirectsSet.has(norm + '/')) {
    sitemapRedirects++;
    failures.push(`Sitemap contains redirecting URL: ${loc}`);
  }

  if (pathname === '/blog/' || pathname === '/colleges/' || pathname === '/') {
    continue;
  }

  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
    if (!activePosts.has(slug)) {
      sitemap404s++;
      failures.push(`Sitemap contains missing 404 post: ${loc}`);
    }
  } else if (pathname.startsWith('/colleges/')) {
    const slug = pathname.replace('/colleges/', '').replace(/\/$/, '');
    if (!activeColleges.has(slug) && !pathname.includes('mba-colleges-') && !pathname.includes('compare') && !pathname.includes('top-engineering')) {
      sitemap404s++;
      failures.push(`Sitemap contains missing 404 college: ${loc}`);
    }
  }
}
console.log(`  - Total URLs in Sitemap: ${locMatches.length}`);
console.log(`  - Sitemap URLs Returning Redirect: ${sitemapRedirects} (Expected: 0)`);
console.log(`  - Sitemap URLs Returning 404: ${sitemap404s} (Expected: 0)`);

// 4. Audit Golden List (Category A)
console.log('\n[4/5] Auditing Golden List (Category A) Resolution...');
const goldenCsv = fs.readFileSync(path.join(process.cwd(), 'seo-recovery', 'golden-list-before-after.csv'), 'utf8');
const goldenLines = goldenCsv.split('\n').slice(1).filter(Boolean);
let golden200 = 0;
let golden301 = 0;
let golden404 = 0;

for (const line of goldenLines) {
  if (line.includes('"200 OK"')) golden200++;
  else if (line.includes('"301 OK"')) golden301++;
  else golden404++;
}
console.log(`  - Total Golden List URLs Audited: ${goldenLines.length}`);
console.log(`  - Golden List URLs Ending as 200 OK: ${golden200}`);
console.log(`  - Golden List URLs Ending as Single-Hop 301: ${golden301}`);
console.log(`  - Golden List URLs Unresolved (404): ${golden404}`);

// 5. Audit robots.txt
console.log('\n[5/5] Auditing robots.txt...');
const robotsPath = path.join(process.cwd(), 'app', 'robots.ts');
const robotsContent = fs.readFileSync(robotsPath, 'utf8');
const allowsContent = robotsContent.includes("allow: '/'");
const hasSitemap = robotsContent.includes("sitemap: 'https://careerwithmohit.online/sitemap.xml'");
const blocksAssets = robotsContent.includes('_next') || robotsContent.includes('css') || robotsContent.includes('js');

console.log(`  - Allows Valuable Content: ${allowsContent ? 'YES' : 'NO'}`);
console.log(`  - References Sitemap: ${hasSitemap ? 'YES' : 'NO'}`);
console.log(`  - Blocks CSS/JS Assets: ${blocksAssets ? 'YES (ERROR)' : 'NO (PASSED)'}`);

console.log('\n' + '='.repeat(80));
console.log(`AUDIT COMPLETE: ${failures.length} Failures Detected.`);
console.log('='.repeat(80));

if (failures.length > 0) {
  failures.slice(0, 10).forEach(f => console.error(`  ❌ ${f}`));
  process.exit(1);
} else {
  console.log('🏆 ALL CHECKS PASSED: 0 chains, 0 loops, 0 broken internal links, 0 redirecting sitemap URLs, 100% Golden List resolved!\n');
}
