import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Paths
const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'app');
const POSTS_DIR = path.join(ROOT_DIR, 'posts');
const COLLEGES_DIR = path.join(ROOT_DIR, 'colleges');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const REDIRECTS_FILE = path.join(ROOT_DIR, 'public', '_redirects');

console.log('========================================================================');
console.log('🔍 FULL WEBSITE 404 ERROR AUDIT');
console.log('========================================================================\n');

// 1. COLLECT ALL VALID ROUTES
const validRoutes = new Set();

function normalizeRoute(r) {
  if (!r) return '/';
  let cleaned = r.trim().split('#')[0].split('?')[0];
  if (!cleaned.startsWith('/')) cleaned = '/' + cleaned;
  // remove trailing slash for standardized comparison (except root)
  if (cleaned.length > 1 && cleaned.endsWith('/')) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned;
}

// 1a. Static app routes
function findStaticPages(dir, currentRoute = '') {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  
  if (items.includes('page.tsx') || items.includes('page.jsx') || items.includes('page.js')) {
    if (!currentRoute.includes('[')) {
      validRoutes.add(normalizeRoute(currentRoute || '/'));
    }
  }
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      findStaticPages(fullPath, currentRoute + '/' + item);
    }
  });
}
findStaticPages(APP_DIR);

// 1b. Blog routes
if (fs.existsSync(POSTS_DIR)) {
  const postFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  postFiles.forEach(f => {
    const slug = f.replace(/\.md$/, '');
    validRoutes.add(normalizeRoute(`/blog/${slug}`));
  });
}

// 1c. College routes
if (fs.existsSync(COLLEGES_DIR)) {
  const collegeFiles = fs.readdirSync(COLLEGES_DIR).filter(f => f.endsWith('.md'));
  collegeFiles.forEach(f => {
    const slug = f.replace(/\.md$/, '');
    validRoutes.add(normalizeRoute(`/colleges/${slug}`));
  });
}

// 1d. Abroad education dynamic routes
try {
  const abroadCollegesContent = fs.readFileSync(path.join(DATA_DIR, 'abroadColleges.ts'), 'utf8');
  const nameLocMatches = [...abroadCollegesContent.matchAll(/name:\s*['"]([^'"]+)['"],\s*location:\s*['"]([^'"]+)['"]/g)];
  nameLocMatches.forEach(m => {
    const name = m[1];
    const loc = m[2];
    const slug = `${name}-${loc}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    validRoutes.add(normalizeRoute(`/abroad-education/${slug}`));
  });

  const abroadDestContent = fs.readFileSync(path.join(DATA_DIR, 'abroadDestinations.ts'), 'utf8');
  const destSlugs = [...abroadDestContent.matchAll(/'(study-in-[a-z0-9\-]+)':\s*{/g)].map(m => m[1]);
  destSlugs.forEach(slug => {
    validRoutes.add(normalizeRoute(`/abroad-education/${slug}`));
  });
} catch (e) {
  console.log('Abroad destinations parse note:', e.message);
}

// 1e. Online degree certification dynamic routes
try {
  const onlineFile = fs.readFileSync(path.join(APP_DIR, 'online-degree-certification', '[slug]', 'page.tsx'), 'utf8');
  
  // Extract all single-quoted slugs in comparisonSlugs array or course map
  const comparisonMatch = onlineFile.match(/const comparisonSlugs = \[([\s\S]*?)\];/);
  if (comparisonMatch) {
    const compSlugs = [...comparisonMatch[1].matchAll(/'([a-z0-9\-]+)'/g)].map(m => m[1]);
    compSlugs.forEach(slug => validRoutes.add(normalizeRoute(`/online-degree-certification/${slug}`)));
  }

  const allSlugMatches = [...onlineFile.matchAll(/'([a-z0-9\-]+)':\s*{/g)].map(m => m[1]);
  allSlugMatches.forEach(slug => {
    validRoutes.add(normalizeRoute(`/online-degree-certification/${slug}`));
  });

  // Also read onlineColleges.ts for universitySlug
  const onlineCollegesContent = fs.readFileSync(path.join(DATA_DIR, 'onlineColleges.ts'), 'utf8');
  const univMatches = [...onlineCollegesContent.matchAll(/universitySlug:\s*['"]([^'"]+)['"]/g)];
  univMatches.forEach(m => {
    validRoutes.add(normalizeRoute(`/online-degree-certification/${m[1]}`));
  });
} catch (e) {
  console.log('Online colleges parse note:', e.message);
}

// 1f. Resource dynamic routes
const examSlugs = ['cat', 'xat', 'cmat', 'snap', 'nmat', 'mah-mba-cet', 'cuet-pg'];
examSlugs.forEach(slug => {
  validRoutes.add(normalizeRoute(`/resources/${slug}`));
});

// 1g. Mock test dynamic routes
try {
  const mockTestData = fs.readFileSync(path.join(ROOT_DIR, 'lib', 'mock-test-data.ts'), 'utf8');
  const slugMatches = [...mockTestData.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
  slugMatches.forEach(m => {
    validRoutes.add(normalizeRoute(`/tools/mock-test/${m[1]}`));
  });
} catch (e) {}

// 1h. MBA region dynamic routes
const geoSlugs = ['delhi-ncr', 'delhi', 'ncr', 'noida', 'greater-noida', 'gurgaon', 'gurugram', 'ghaziabad', 'faridabad', 'pune', 'mumbai', 'navi-mumbai', 'thane', 'bangalore', 'bengaluru', 'hyderabad', 'kolkata', 'ahmedabad', 'gujarat', 'jaipur', 'rajasthan'];
geoSlugs.forEach(slug => {
  validRoutes.add(normalizeRoute(`/mba-admissions-by-region/${slug}`));
  validRoutes.add(normalizeRoute(`/mba-pgdm-admissions-by-region/${slug}`));
});


// Also add public static assets recursively
function addPublicFiles(dir, cur = '') {
  if (!fs.existsSync(dir)) return;
  const pubFiles = fs.readdirSync(dir);
  pubFiles.forEach(f => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      addPublicFiles(fullPath, cur + '/' + f);
    } else {
      validRoutes.add(normalizeRoute(cur + '/' + f));
    }
  });
}
addPublicFiles(path.join(ROOT_DIR, 'public'));
validRoutes.add('/robots.txt');
validRoutes.add('/sitemap.xml');
validRoutes.add('/feed.xml');

console.log(`✅ Total Valid Website Routes Registered: ${validRoutes.size}\n`);

// 2. PARSE REDIRECTS (_redirects)
const redirectsMap = new Map();
const wildcardRules = [];

if (fs.existsSync(REDIRECTS_FILE)) {
  const lines = fs.readFileSync(REDIRECTS_FILE, 'utf8').split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      const from = parts[0];
      const to = parts[1];
      if (from.includes('*')) {
        wildcardRules.push({ from, to });
      } else {
        redirectsMap.set(normalizeRoute(from), { to: normalizeRoute(to), originalTo: to });
      }
    }
  });
}
console.log(`📦 Redirects loaded: ${redirectsMap.size} exact rules, ${wildcardRules.length} wildcard rules.\n`);

function resolveUrl(url) {
  const norm = normalizeRoute(url);
  if (validRoutes.has(norm)) {
    return { status: 200, finalUrl: norm };
  }
  
  // Check exact redirect
  if (redirectsMap.has(norm)) {
    let current = norm;
    let visited = new Set();
    while (redirectsMap.has(current)) {
      if (visited.has(current)) {
        return { status: 508, error: 'Redirect Loop', chain: Array.from(visited) };
      }
      visited.add(current);
      const next = redirectsMap.get(current).to;
      if (validRoutes.has(next)) {
        return { status: 301, finalUrl: next };
      }
      current = next;
    }
    return { status: 404, error: 'Redirect target 404', target: current };
  }

  // Check wildcard redirects
  for (const rule of wildcardRules) {
    const prefix = rule.from.replace('*', '');
    if (norm.startsWith(prefix)) {
      let target = rule.to;
      if (target.includes(':splat')) {
        const splat = norm.slice(prefix.length);
        target = target.replace(':splat', splat);
      }
      const normTarget = normalizeRoute(target);
      if (validRoutes.has(normTarget)) {
        return { status: 301, finalUrl: normTarget };
      }
      return { status: 404, error: 'Wildcard redirect target 404', target: normTarget };
    }
  }

  return { status: 404, error: 'Not Found' };
}

// 3. AUDIT REDIRECTS FOR BROKEN DESTINATIONS
console.log('--- 1. AUDITING _redirects DESTINATIONS ---');
let brokenRedirects = [];
for (const [from, { to, originalTo }] of redirectsMap.entries()) {
  const res = resolveUrl(to);
  if (res.status === 404) {
    brokenRedirects.push({ from, to, originalTo });
  }
}
console.log(`Broken redirect targets found: ${brokenRedirects.length}`);
if (brokenRedirects.length > 0) {
  console.log('Sample broken redirects:');
  brokenRedirects.slice(0, 10).forEach(b => console.log(`  ${b.from} -> ${b.to} (Target 404s)`));
}

// 4. AUDIT INTERNAL LINKS IN POSTS (*.md)
console.log('\n--- 2. AUDITING INTERNAL LINKS IN BLOG POSTS (1,948 files) ---');
let brokenPostLinks = [];
let totalPostLinksScanned = 0;

if (fs.existsSync(POSTS_DIR)) {
  const postFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  postFiles.forEach(file => {
    const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    // Extract markdown links [text](url) and <a href="url">
    const mdLinks = [...content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
    const htmlLinks = [...content.matchAll(/href=["']([^"']+)["']/g)];
    
    const allLinks = [
      ...mdLinks.map(m => m[2]),
      ...htmlLinks.map(m => m[1])
    ];

    allLinks.forEach(link => {
      // filter out external, mailto, tel, javascript, anchors only
      if (link.startsWith('http://') || link.startsWith('https://')) {
        // if it points to careerwithmohit domain, check it!
        if (link.includes('careerwithmohit.online') || link.includes('careerwithmohit.com')) {
          const pathname = link.replace(/https?:\/\/[^\/]+/, '');
          checkInternalLink(pathname, `posts/${file}`, link);
        }
        return;
      }
      if (link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('javascript:') || link.startsWith('#')) {
        return;
      }
      checkInternalLink(link, `posts/${file}`, link);
    });
  });
}

function checkInternalLink(url, sourceFile, originalHref) {
  totalPostLinksScanned++;
  const res = resolveUrl(url);
  if (res.status === 404) {
    brokenPostLinks.push({
      sourceFile,
      target: url,
      originalHref,
      error: res.error
    });
  }
}

console.log(`Scanned ${totalPostLinksScanned} internal links in blog posts.`);
console.log(`Broken internal links in blog posts: ${brokenPostLinks.length}`);
if (brokenPostLinks.length > 0) {
  console.log('Sample broken links in posts:');
  brokenPostLinks.slice(0, 15).forEach(l => console.log(`  In ${l.sourceFile}: [${l.originalHref}] -> 404`));
}

// 5. AUDIT INTERNAL LINKS IN COLLEGES (*.md)
console.log('\n--- 3. AUDITING INTERNAL LINKS IN COLLEGES (547 files) ---');
let brokenCollegeLinks = [];
let totalCollegeLinksScanned = 0;

if (fs.existsSync(COLLEGES_DIR)) {
  const collegeFiles = fs.readdirSync(COLLEGES_DIR).filter(f => f.endsWith('.md'));
  collegeFiles.forEach(file => {
    const content = fs.readFileSync(path.join(COLLEGES_DIR, file), 'utf8');
    const mdLinks = [...content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
    const htmlLinks = [...content.matchAll(/href=["']([^"']+)["']/g)];
    
    const allLinks = [
      ...mdLinks.map(m => m[2]),
      ...htmlLinks.map(m => m[1])
    ];

    allLinks.forEach(link => {
      if (link.startsWith('http://') || link.startsWith('https://')) {
        if (link.includes('careerwithmohit.online') || link.includes('careerwithmohit.com')) {
          const pathname = link.replace(/https?:\/\/[^\/]+/, '');
          checkInternalCollegeLink(pathname, `colleges/${file}`, link);
        }
        return;
      }
      if (link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('javascript:') || link.startsWith('#')) {
        return;
      }
      checkInternalCollegeLink(link, `colleges/${file}`, link);
    });
  });
}

function checkInternalCollegeLink(url, sourceFile, originalHref) {
  totalCollegeLinksScanned++;
  const res = resolveUrl(url);
  if (res.status === 404) {
    brokenCollegeLinks.push({
      sourceFile,
      target: url,
      originalHref,
      error: res.error
    });
  }
}
console.log(`Scanned ${totalCollegeLinksScanned} internal links in colleges.`);
console.log(`Broken internal links in colleges: ${brokenCollegeLinks.length}`);
if (brokenCollegeLinks.length > 0) {
  console.log('Sample broken links in colleges:');
  brokenCollegeLinks.slice(0, 15).forEach(l => console.log(`  In ${l.sourceFile}: [${l.originalHref}] -> 404`));
}

// 6. AUDIT COMPONENTS & APP CODE (Header, Footer, Navigation, Pages)
console.log('\n--- 4. AUDITING NAVIGATION & CODE LINKS (components/ and app/) ---');
let brokenCodeLinks = [];

function scanCodeLinks(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      scanCodeLinks(fullPath);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.jsx') || item.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const hrefMatches = [...content.matchAll(/href=["'](\/[^"']*)["']/g)];
      const routerPushMatches = [...content.matchAll(/router\.push\(["'](\/[^"']*)["']\)/g)];
      const allHref = [...hrefMatches.map(m => m[1]), ...routerPushMatches.map(m => m[1])];
      
      allHref.forEach(link => {
        if (link.includes('${') || link.startsWith('//')) return; // skip dynamic template strings
        const res = resolveUrl(link);
        if (res.status === 404) {
          brokenCodeLinks.push({
            file: path.relative(ROOT_DIR, fullPath),
            target: link
          });
        }
      });
    }
  });
}
scanCodeLinks(COMPONENTS_DIR);
scanCodeLinks(APP_DIR);

console.log(`Broken links in components/ and app/ code: ${brokenCodeLinks.length}`);
if (brokenCodeLinks.length > 0) {
  console.log('Broken navigation / component links:');
  brokenCodeLinks.forEach(b => console.log(`  In ${b.file}: href="${b.target}" -> 404`));
}

// 7. SITEMAP AUDIT
console.log('\n--- 5. AUDITING SITEMAP ENTRIES ---');
const sitemapTs = fs.readFileSync(path.join(APP_DIR, 'sitemap.ts'), 'utf8');
const staticRouteMatches = sitemapTs.match(/const routes = \[([\s\S]*?)\]\.map/);
let brokenSitemapRoutes = [];
if (staticRouteMatches) {
  const routesStr = staticRouteMatches[1];
  const stringLiterals = [...routesStr.matchAll(/['"]([^'"]*)['"]/g)].map(m => m[1]);
  stringLiterals.forEach(r => {
    const norm = normalizeRoute(r || '/');
    if (!validRoutes.has(norm)) {
      brokenSitemapRoutes.push(r);
    }
  });
}
console.log(`Broken static routes in sitemap.ts: ${brokenSitemapRoutes.length}`);
if (brokenSitemapRoutes.length > 0) {
  brokenSitemapRoutes.forEach(r => console.log(`  Sitemap static route 404s: "${r}"`));
}

console.log('\n========================================================================');
console.log('📊 AUDIT SUMMARY TOTALS');
console.log('========================================================================');
console.log(`1. Total Valid Working Pages: ${validRoutes.size}`);
console.log(`2. Broken Redirect Targets (_redirects): ${brokenRedirects.length}`);
console.log(`3. Broken Static Routes in Sitemap: ${brokenSitemapRoutes.length}`);
console.log(`4. Broken Links in Navigation / App Code: ${brokenCodeLinks.length}`);
console.log(`5. Broken Internal Links in Blog Posts: ${brokenPostLinks.length}`);
console.log(`6. Broken Internal Links in College Pages: ${brokenCollegeLinks.length}`);
console.log('========================================================================\n');
