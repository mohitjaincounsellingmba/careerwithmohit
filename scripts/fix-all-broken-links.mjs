import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'posts');
const COLLEGES_DIR = path.join(ROOT_DIR, 'colleges');
const APP_DIR = path.join(ROOT_DIR, 'app');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const REDIRECTS_FILE = path.join(ROOT_DIR, 'public', '_redirects');

console.log('========================================================================');
console.log('🛠️ REPAIRING ALL INTERNAL 404 LINKS IN BLOG POSTS');
console.log('========================================================================\n');

// 1. Collect all valid routes
const validRoutes = new Set();
function normalizeRoute(r) {
  if (!r) return '/';
  let cleaned = r.trim().split('#')[0].split('?')[0];
  if (!cleaned.startsWith('/')) cleaned = '/' + cleaned;
  if (cleaned.length > 1 && cleaned.endsWith('/')) cleaned = cleaned.slice(0, -1);
  return cleaned;
}

function findStatic(dir, cur = '') {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  if (items.includes('page.tsx') || items.includes('page.jsx') || items.includes('page.js')) {
    if (!cur.includes('[')) validRoutes.add(normalizeRoute(cur || '/'));
  }
  items.forEach(i => {
    const f = path.join(dir, i);
    if (fs.statSync(f).isDirectory()) findStatic(f, cur + '/' + i);
  });
}
findStatic(APP_DIR);

const postFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const collegeFiles = fs.readdirSync(COLLEGES_DIR).filter(f => f.endsWith('.md'));

const postSlugs = postFiles.map(f => f.replace(/\.md$/, ''));
const collegeSlugs = collegeFiles.map(f => f.replace(/\.md$/, ''));

postSlugs.forEach(s => validRoutes.add(normalizeRoute(`/blog/${s}`)));
collegeSlugs.forEach(s => validRoutes.add(normalizeRoute(`/colleges/${s}`)));

const abroad = fs.readFileSync(path.join(DATA_DIR, 'abroadColleges.ts'), 'utf8');
[...abroad.matchAll(/name:\s*['"]([^'"]+)['"],\s*location:\s*['"]([^'"]+)['"]/g)].forEach(m => {
  const slug = (m[1] + '-' + m[2]).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  validRoutes.add(normalizeRoute(`/abroad-education/${slug}`));
});

const online = fs.readFileSync(path.join(APP_DIR, 'online-degree-certification', '[slug]', 'page.tsx'), 'utf8');
const comp = online.match(/const comparisonSlugs = \[([\s\S]*?)\];/);
if (comp) {
  [...comp[1].matchAll(/'([a-z0-9\-]+)'/g)].forEach(m => validRoutes.add(normalizeRoute('/online-degree-certification/' + m[1])));
}
[...online.matchAll(/'([a-z0-9\-]+)':\s*{/g)].forEach(m => validRoutes.add(normalizeRoute('/online-degree-certification/' + m[1])));
const onlineCol = fs.readFileSync(path.join(DATA_DIR, 'onlineColleges.ts'), 'utf8');
[...onlineCol.matchAll(/universitySlug:\s*['"]([^'"]+)['"]/g)].forEach(m => validRoutes.add(normalizeRoute('/online-degree-certification/' + m[1])));

['cat', 'xat', 'cmat', 'snap', 'nmat', 'mah-mba-cet', 'cuet-pg'].forEach(s => validRoutes.add(normalizeRoute('/resources/' + s)));
const mockData = fs.readFileSync(path.join(ROOT_DIR, 'lib', 'mock-test-data.ts'), 'utf8');
[...mockData.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].forEach(m => validRoutes.add(normalizeRoute('/tools/mock-test/' + m[1])));

function findPublic(dir, cur = '') {
  fs.readdirSync(dir).forEach(i => {
    const f = path.join(dir, i);
    if (fs.statSync(f).isDirectory()) findPublic(f, cur + '/' + i);
    else validRoutes.add(normalizeRoute(cur + '/' + i));
  });
}
findPublic(path.join(ROOT_DIR, 'public'));
validRoutes.add('/robots.txt');
validRoutes.add('/sitemap.xml');
validRoutes.add('/feed.xml');

// Load _redirects
const redirectsMap = new Map();
const wildcardRules = [];
fs.readFileSync(REDIRECTS_FILE, 'utf8').split('\n').forEach(l => {
  const tr = l.trim();
  if (!tr || tr.startsWith('#')) return;
  const p = tr.split(/\s+/);
  if (p.length >= 2) {
    if (p[0].includes('*')) wildcardRules.push({ from: p[0], to: p[1] });
    else redirectsMap.set(normalizeRoute(p[0]), normalizeRoute(p[1]));
  }
});

function resolve(url) {
  const norm = normalizeRoute(url);
  if (validRoutes.has(norm)) return { ok: true, url: norm };
  if (redirectsMap.has(norm)) {
    const t = redirectsMap.get(norm);
    if (validRoutes.has(t)) return { ok: true, url: t };
  }
  for (const w of wildcardRules) {
    const pref = w.from.replace('*', '');
    if (norm.startsWith(pref)) {
      let t = w.to;
      if (t.includes(':splat')) t = t.replace(':splat', norm.slice(pref.length));
      const nt = normalizeRoute(t);
      if (validRoutes.has(nt)) return { ok: true, url: nt };
    }
  }
  return { ok: false, url: norm };
}

// Smart Matcher function
function findBestReplacement(brokenUrl) {
  let clean = brokenUrl.trim().split('#')[0].split('?')[0];
  if (clean.startsWith('http')) {
    clean = clean.replace(/https?:\/\/[^\/]+/, '');
  }
  clean = clean.replace(/^\/(blog|colleges|tools|posts)\//, '').replace(/\.md$/, '').replace(/\//g, '');
  clean = clean.replace(/[–—]/g, '-');

  // Specific high-frequency overrides
  const manualOverrides = {
    'btech-vs-bca-career-guide': '/blog/bca-vs-btech-cse-which-is-better-for-your-career-2026',
    'soil-institute-gurgaon': '/colleges/soil-gurgaon',
    'soil-gurgaon': '/colleges/soil-gurgaon',
    'all-about-soil-institute-gurgaon': '/blog/soil-gurgaon-fee-structure-2027-29',
    'all-about-soil-gurgaon': '/blog/soil-gurgaon-fee-structure-2027-29',
    'all-about-ndim-delhi': '/blog/ndim-delhi-review-2026',
    'all-iim-cut-off-2027-29-admission-mba-pgdm': '/blog/all-iim-cut-off-2026-28-admission-mba-pgdm',
    'all-iim-cut-off-2027–29-admission-mba-pgdm': '/blog/all-iim-cut-off-2026-28-admission-mba-pgdm',
    'all-about-nibm-pune': '/blog/direct-admission-nibm-pune-banking-finance-2026',
    'top-mba-colleges-pune': '/colleges/mba-colleges-pune',
    'top-bba-colleges-delhi-ncr': '/blog/top-bba-colleges-delhi-ncr-2026',
    'top-mba-colleges-delhi-ncr-2026': '/colleges/mba-colleges-delhi-ncr',
    'iim-colleges-placements-fees-selection-2026': '/blog/all-about-iim-colleges-placements-fees-selection-2026',
    'siib-pune': '/blog/siib-pune-mba-review-2027-fees-placements-cutoff',
    'isbs-gurgaon': '/blog/first-bridge-business-school-gurgaon-pgdm-admission-2027-29',
    'ifmr-gsb-sri-city': '/blog/ifmr-gsb-sri-city-review-2026',
    'isbs-pune': '/blog/akemi-business-school-pune-mba-admission-2027-29',
    'nmims-hyderabad': '/blog/nmims-hyderabad-mba-review-2027-fees-placements-cutoff',
    'nmims-indore': '/blog/nmims-indore-mba-review-2027-fees-placements-cutoff',
    'nmims-navi-mumbai': '/blog/nmims-navi-mumbai-mba-review-2027-fees-placements-cutoff',
    'scit-pune': '/blog/scit-pune-mba-review-2027-fees-placements-cutoff',
    'sda-bocconi-mumbai': '/blog/sda-bocconi-mumbai-imb-review-2027-fees-placements-cutoff',
    'sibm-hyderabad': '/blog/sibm-hyderabad-mba-review-2027-fees-placements-cutoff',
    'sibm-bangalore': '/blog/sibm-bangalore-mba-review-2027-fees-placements-cutoff',
    'sibm-noida': '/blog/sibm-noida-mba-review-2027-fees-placements-cutoff',
    'symbiosis-centre-for-information-technology-scit-pune': '/blog/scit-pune-mba-review-2027-fees-placements-cutoff',
    'symbiosis-institute-of-international-business-siib-pune': '/blog/siib-pune-mba-review-2027-fees-placements-cutoff',
    '5-year-llb-vs-3-year-llb-which-is-better': '/blog',
    'top-law-colleges-delhi-ncr': '/blog',
    'top-10-bba-colleges-india-2026': '/blog/top-bba-colleges-delhi-ncr-2026',
    'top-mhcet-mba-colleges-pune-2026-cutoffs-fees': '/colleges/mba-colleges-pune',
    'mah-mba-cet-scholarship-2026-eligibility-application-process': '/tools/mhcet-mock-test'
  };

  if (manualOverrides[clean]) return manualOverrides[clean];

  // Check if college exists
  if (collegeSlugs.includes(clean)) return `/colleges/${clean}`;
  if (postSlugs.includes(clean)) return `/blog/${clean}`;

  // Check if college exists without prefix/suffix
  const cExact = collegeSlugs.find(c => c === clean || clean.includes(c) || c.includes(clean));
  if (cExact) return `/colleges/${cExact}`;

  // Check if post exists
  const pExact = postSlugs.find(p => p.includes(clean) || clean.includes(p));
  if (pExact) return `/blog/${pExact}`;

  // Check keywords
  const parts = clean.split('-').filter(p => p.length > 3 && !['college', 'university', 'institute', 'school', 'management', 'business', 'admission', 'review', 'fees', 'placements'].includes(p));
  if (parts.length > 0) {
    const pSub = postSlugs.find(p => parts.some(part => p.includes(part)));
    if (pSub) return `/blog/${pSub}`;
    const cSub = collegeSlugs.find(c => parts.some(part => c.includes(part)));
    if (cSub) return `/colleges/${cSub}`;
  }

  // Fallback
  if (brokenUrl.startsWith('/colleges/')) return '/colleges';
  return '/blog';
}

// 2. Scan and repair all markdown posts
let updatedFilesCount = 0;
let totalReplacedLinks = 0;
const newRedirectsToAdd = new Map();

postFiles.forEach(file => {
  const filePath = path.join(POSTS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace Markdown links: [text](brokenUrl)
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
    let checkUrl = url.trim();
    if (checkUrl.startsWith('http://') || checkUrl.startsWith('https://')) {
      if (checkUrl.includes('careerwithmohit.online') || checkUrl.includes('careerwithmohit.com')) {
        checkUrl = checkUrl.replace(/https?:\/\/[^\/]+/, '');
      } else {
        return match;
      }
    }
    if (checkUrl.startsWith('mailto:') || checkUrl.startsWith('tel:') || checkUrl.startsWith('#') || checkUrl.startsWith('javascript:')) {
      return match;
    }

    const res = resolve(checkUrl);
    if (!res.ok) {
      const rep = findBestReplacement(checkUrl);
      totalReplacedLinks++;
      newRedirectsToAdd.set(normalizeRoute(checkUrl), normalizeRoute(rep));
      return `[${linkText}](${rep})`;
    }
    return match;
  });

  // Replace HTML links: href="brokenUrl"
  content = content.replace(/href=["']([^"']+)["']/g, (match, url) => {
    let checkUrl = url.trim();
    if (checkUrl.startsWith('http://') || checkUrl.startsWith('https://')) {
      if (checkUrl.includes('careerwithmohit.online') || checkUrl.includes('careerwithmohit.com')) {
        checkUrl = checkUrl.replace(/https?:\/\/[^\/]+/, '');
      } else {
        return match;
      }
    }
    if (checkUrl.startsWith('mailto:') || checkUrl.startsWith('tel:') || checkUrl.startsWith('#') || checkUrl.startsWith('javascript:')) {
      return match;
    }

    const res = resolve(checkUrl);
    if (!res.ok) {
      const rep = findBestReplacement(checkUrl);
      totalReplacedLinks++;
      newRedirectsToAdd.set(normalizeRoute(checkUrl), normalizeRoute(rep));
      return `href="${rep}"`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedFilesCount++;
  }
});

console.log(`✅ Fixed ${totalReplacedLinks} broken internal links across ${updatedFilesCount} blog files.`);

// 3. Append discovered 301 redirects to public/_redirects for full web resilience
if (newRedirectsToAdd.size > 0) {
  let redirectsContent = fs.readFileSync(REDIRECTS_FILE, 'utf8');
  let addedCount = 0;
  redirectsContent += '\n# Automated 404 Resolution Redirects\n';
  for (const [from, to] of newRedirectsToAdd.entries()) {
    if (!redirectsMap.has(from) && from !== to) {
      redirectsContent += `${from} ${to} 301\n`;
      redirectsContent += `${from}/ ${to} 301\n`;
      addedCount += 2;
    }
  }
  fs.writeFileSync(REDIRECTS_FILE, redirectsContent, 'utf8');
  console.log(`✅ Appended ${addedCount} safe 301 redirect rules to public/_redirects.`);
}

console.log('\n========================================================================');
console.log('🎉 REPAIR COMPLETE');
console.log('========================================================================\n');
