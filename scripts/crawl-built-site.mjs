import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

console.log('🕷️  Starting comprehensive audit crawl of built static site in out/ ...');

const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  console.error('out/ directory does not exist. Run npm run build first.');
  process.exit(1);
}

// Find all HTML files
const htmlFiles = [];
function findHtml(dir, cur = '') {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const rel = path.join(cur, item);
    if (fs.statSync(full).isDirectory()) {
      findHtml(full, rel);
    } else if (item.endsWith('.html')) {
      htmlFiles.push({ full, rel });
    }
  }
}
findHtml(outDir);
console.log(`Found ${htmlFiles.length} HTML files to inspect.`);

// Read redirect map from functions/_middleware.ts or REDIRECT_MAP.csv
const redirectsCsv = fs.readFileSync(path.join(process.cwd(), 'REDIRECT_MAP.csv'), 'utf8');
const redirectMap = new Map();
redirectsCsv.split('\n').forEach(line => {
  const parts = line.split(',');
  if (parts.length >= 2) {
    try {
      const fromUrl = new URL(parts[0].trim());
      const toUrl = new URL(parts[1].trim());
      redirectMap.set(fromUrl.pathname.toLowerCase(), toUrl.pathname.toLowerCase());
    } catch {}
  }
});

const titles = new Map(); // title -> [urls]
const missingDescriptions = [];
const noindexPages = [];
const canonicalMismatches = [];
const brokenLinks = [];
const redirectedLinks = [];
let totalLinksChecked = 0;

// Valid URLs set in out/
const validUrls = new Set();
htmlFiles.forEach(({ rel }) => {
  let urlPath = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '');
  if (!urlPath.endsWith('/')) urlPath += '/';
  validUrls.add(urlPath.toLowerCase());
});

for (const { full, rel } of htmlFiles) {
  let pagePath = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '');
  if (!pagePath.endsWith('/')) pagePath += '/';

  const html = fs.readFileSync(full, 'utf8');
  const $ = cheerio.load(html);

  // 1. Title
  const title = $('title').text().trim();
  if (!title) {
    console.log(`Missing title: ${pagePath}`);
  } else {
    if (!titles.has(title)) titles.set(title, []);
    titles.get(title).push(pagePath);
  }

  // 2. Meta description
  const desc = $('meta[name="description"]').attr('content')?.trim();
  if (!desc) {
    missingDescriptions.push(pagePath);
  }

  // 3. Robots
  const robots = $('meta[name="robots"]').attr('content')?.toLowerCase();
  if (robots && robots.includes('noindex')) {
    noindexPages.push({ pagePath, robots });
  }

  // 4. Canonical
  const canonical = $('link[rel="canonical"]').attr('href');
  if (canonical) {
    try {
      const cUrl = new URL(canonical);
      // Canonical should equal https://careerwithmohit.online + pagePath
      const expectedCanonical = `https://careerwithmohit.online${pagePath}`;
      // Allow intentional redirects or alternates
      if (canonical !== expectedCanonical && !noindexPages.some(p => p.pagePath === pagePath)) {
        canonicalMismatches.push({ pagePath, canonical, expectedCanonical });
      }
    } catch {
      canonicalMismatches.push({ pagePath, canonical, reason: 'invalid url' });
    }
  }

  // 5. Internal Links on page
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href')?.trim();
    if (!href) return;
    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!href.includes('careerwithmohit.online')) return; // external link
    }
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

    let targetPath = href.split('#')[0].split('?')[0];
    if (targetPath.startsWith('https://careerwithmohit.online')) {
      targetPath = targetPath.replace('https://careerwithmohit.online', '');
    } else if (targetPath.startsWith('http://careerwithmohit.online')) {
      targetPath = targetPath.replace('http://careerwithmohit.online', '');
    }

    if (!targetPath.startsWith('/')) return;
    if (targetPath.startsWith('/_next') || targetPath.startsWith('/images') || targetPath.startsWith('/brochures') || targetPath.startsWith('/papers')) return;
    if (/\.(webp|png|jpg|jpeg|svg|ico|pdf|xml|txt)$/i.test(targetPath)) return;

    totalLinksChecked++;
    const norm = targetPath.toLowerCase();

    // Check if link goes to a redirected legacy slug
    if (redirectMap.has(norm) || (norm.endsWith('/') && redirectMap.has(norm.slice(0, -1)))) {
      const dest = redirectMap.get(norm) || redirectMap.get(norm.slice(0, -1));
      redirectedLinks.push({ fromPage: pagePath, link: href, redirectsTo: dest });
    }

    // Check if target exists in valid URLs
    let checkWithSlash = norm.endsWith('/') ? norm : norm + '/';
    if (!validUrls.has(checkWithSlash)) {
      brokenLinks.push({ fromPage: pagePath, link: href });
    }
  });
}

// Duplicate titles filter (only flag pages with duplicate titles where count > 1)
const duplicateTitles = [];
titles.forEach((urls, title) => {
  if (urls.length > 1) {
    duplicateTitles.push({ title, count: urls.length, urls });
  }
});

console.log('\n' + '='.repeat(80));
console.log('SITE CRAWL AUDIT REPORT');
console.log('='.repeat(80));
console.log(`Total Pages Crawled: ${htmlFiles.length}`);
console.log(`Total Internal Links Checked: ${totalLinksChecked}`);
console.log(`Broken Internal Links: ${brokenLinks.length}`);
console.log(`Internal Links pointing to 301 Redirects: ${redirectedLinks.length}`);
console.log(`Canonical Mismatches: ${canonicalMismatches.length}`);
console.log(`Pages with noindex: ${noindexPages.length}`);
console.log(`Missing Descriptions: ${missingDescriptions.length}`);
console.log(`Duplicate Titles: ${duplicateTitles.length}`);

if (brokenLinks.length > 0) {
  console.log('\nSample Broken Links:');
  console.log(brokenLinks.slice(0, 10));
}

if (redirectedLinks.length > 0) {
  console.log('\nSample Redirected Links:');
  console.log(redirectedLinks.slice(0, 10));
}

if (noindexPages.length > 0) {
  console.log('\nNoindex Pages (Expected: admin, login, legal, private):');
  noindexPages.slice(0, 10).forEach(p => console.log(`  - ${p.pagePath} (${p.robots})`));
}

if (canonicalMismatches.length > 0) {
  console.log('\nCanonical Mismatches:');
  canonicalMismatches.slice(0, 10).forEach(m => console.log(m));
}

if (missingDescriptions.length > 0) {
  console.log('\nMissing Descriptions:');
  console.log(missingDescriptions.slice(0, 10));
}

console.log('='.repeat(80));
