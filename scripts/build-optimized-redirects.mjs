import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 Optimizing Cloudflare Pages Redirects & Edge Middleware...');

const redirectsPath = path.join(process.cwd(), 'public', '_redirects');
const raw = fs.readFileSync(redirectsPath, 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

// Categorize existing redirects
const specificMap = new Map();
const massRedirects = new Map();

for (const line of lines) {
  const parts = line.split(/\s+/);
  if (parts.length >= 2) {
    let from = parts[0].toLowerCase().trim();
    let to = parts[1].trim();
    const status = parts[2] || '301';

    // Normalize from key without trailing slash for dictionary
    const normFrom = from.length > 1 && from.endsWith('/') ? from.slice(0, -1) : from;

    if (to === '/blog/' || to === '/blog' || to === '/colleges/' || to === '/colleges') {
      massRedirects.set(normFrom, { to: to.endsWith('/') ? to : to + '/', status });
    } else {
      specificMap.set(normFrom, { to, status });
    }
  }
}

console.log(`📊 Extracted ${specificMap.size} specific 1-to-1 redirects and ${massRedirects.size} mass pruned redirects from initial file.`);

// Build complete valid routes index to guarantee 0 broken redirect destinations
const validRoutes = new Set();
function normalizeRoute(r) {
  if (!r) return '/';
  let cleaned = r.trim().split('#')[0].split('?')[0];
  if (!cleaned.startsWith('/')) cleaned = '/' + cleaned;
  if (cleaned.length > 1 && cleaned.endsWith('/')) cleaned = cleaned.slice(0, -1);
  return cleaned;
}

// 1. Static pages
function findStatic(dir, cur = '') {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  if (items.includes('page.tsx') || items.includes('page.jsx') || items.includes('page.js')) {
    if (!cur.includes('[')) validRoutes.add(normalizeRoute(cur || '/'));
  }
  items.forEach(i => {
    if (i.startsWith('_') || i.startsWith('.') || i === 'api') return;
    const f = path.join(dir, i);
    if (fs.statSync(f).isDirectory()) findStatic(f, cur + '/' + i);
  });
}
findStatic(path.join(process.cwd(), 'app'));

// 2. Posts & Colleges
const postsDir = path.join(process.cwd(), 'posts');
const collegesDir = path.join(process.cwd(), 'colleges');
const postSlugs = fs.existsSync(postsDir) ? fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, '')) : [];
const collegeSlugs = fs.existsSync(collegesDir) ? fs.readdirSync(collegesDir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, '')) : [];
const activePostSet = new Set(postSlugs);
postSlugs.forEach(s => validRoutes.add(normalizeRoute(`/blog/${s}`)));
collegeSlugs.forEach(s => validRoutes.add(normalizeRoute(`/colleges/${s}`)));

// 3. Exam hubs & online courses
['cat', 'xat', 'cmat', 'snap', 'nmat', 'mah-mba-cet', 'cuet-pg'].forEach(s => validRoutes.add(normalizeRoute('/resources/' + s)));

// Destination Resolver
function findValidTarget(destUrl) {
  const norm = normalizeRoute(destUrl);
  if (validRoutes.has(norm) || destUrl.includes(':splat')) return destUrl.endsWith('/') ? destUrl : destUrl + '/';

  // Smart resolution for blog posts
  if (norm.startsWith('/blog/')) {
    const slug = norm.replace('/blog/', '');
    
    // Direct batch-year variations
    const alt1 = slug.replace(/-2027-29$/, '-2026');
    if (activePostSet.has(alt1)) return `/blog/${alt1}/`;
    const alt2 = slug.replace(/-2026$/, '-2027-29');
    if (activePostSet.has(alt2)) return `/blog/${alt2}/`;
    const alt3 = slug.replace(/-2027-29$/, '');
    if (activePostSet.has(alt3)) return `/blog/${alt3}/`;

    const tokens = slug.split('-').filter(t => t.length > 2 && !['2025', '2026', '2027', '2028', '2029', 'review', 'admission', 'mba', 'pgdm', 'colleges'].includes(t));
    let bestMatch = null;
    let maxMatches = 0;
    for (const postSlug of postSlugs) {
      let matches = 0;
      for (const t of tokens) {
        if (postSlug.includes(t)) matches++;
      }
      if (matches > maxMatches && matches >= Math.min(tokens.length, 2)) {
        maxMatches = matches;
        bestMatch = postSlug;
      }
    }
    if (bestMatch) {
      return `/blog/${bestMatch}/`;
    }
    return '/blog/';
  }

  // Smart resolution for colleges
  if (norm.startsWith('/colleges/')) {
    const slug = norm.replace('/colleges/', '');
    const tokens = slug.split('-').filter(t => t.length > 2);
    let bestMatch = null;
    let maxMatches = 0;
    for (const colSlug of collegeSlugs) {
      let matches = 0;
      for (const t of tokens) {
        if (colSlug.includes(t)) matches++;
      }
      if (matches > maxMatches && matches >= 2) {
        maxMatches = matches;
        bestMatch = colSlug;
      }
    }
    if (bestMatch) {
      return `/colleges/${bestMatch}/`;
    }
    return '/colleges/';
  }

  return '/';
}

// -----------------------------------------------------------------------------
// INGEST ALL HISTORICAL RENAMES & ARCHIVED POSTS FROM GIT & POSTS_ARCHIVED_DUPLICATES
// -----------------------------------------------------------------------------
console.log('🔍 Ingesting all historical renames & archived duplicate posts...');

try {
  const gitLog = execSync('git log --name-status -M --diff-filter=R --oneline', { maxBuffer: 30 * 1024 * 1024 }).toString();
  const historicalRenames = new Map();

  gitLog.split('\n').forEach(line => {
    if (line.startsWith('R')) {
      const parts = line.split('\t');
      if (parts.length >= 3) {
        const oldFile = parts[1];
        const newFile = parts[2];
        if (oldFile.startsWith('posts/') && oldFile.endsWith('.md')) {
          const oldSlug = oldFile.replace('posts/', '').replace(/\.md$/, '');
          const newSlug = newFile.replace(/^(?:posts|posts_archived_duplicates)\//, '').replace(/\.md$/, '');
          if (!historicalRenames.has(oldSlug)) {
            historicalRenames.set(oldSlug, newSlug);
          }
        }
      }
    }
  });

  let renamesAdded = 0;
  for (const [oldSlug, newSlug] of historicalRenames.entries()) {
    if (activePostSet.has(oldSlug)) continue; // Post is active, no redirect

    const normFrom = `/blog/${oldSlug}`.toLowerCase();
    if (!specificMap.has(normFrom) && !massRedirects.has(normFrom)) {
      let targetSlug = activePostSet.has(newSlug) ? newSlug : null;
      let targetPath = targetSlug ? `/blog/${targetSlug}/` : findValidTarget(`/blog/${oldSlug}`);
      specificMap.set(normFrom, { to: targetPath, status: '301' });
      renamesAdded++;
    }
  }
  console.log(`➕ Added ${renamesAdded} historical git post renames to redirect table.`);
} catch (e) {
  console.warn('⚠️ Could not extract git renames:', e.message);
}

// Ingest archived posts in posts_archived_duplicates/
const archivedDir = path.join(process.cwd(), 'posts_archived_duplicates');
if (fs.existsSync(archivedDir)) {
  const archivedFiles = fs.readdirSync(archivedDir).filter(f => f.endsWith('.md'));
  let archivedAdded = 0;
  for (const file of archivedFiles) {
    const archSlug = file.replace(/\.md$/, '');
    if (activePostSet.has(archSlug)) continue;

    const normFrom = `/blog/${archSlug}`.toLowerCase();
    if (!specificMap.has(normFrom) && !massRedirects.has(normFrom)) {
      const targetPath = findValidTarget(`/blog/${archSlug}`);
      specificMap.set(normFrom, { to: targetPath, status: '301' });
      archivedAdded++;
    }
  }
  console.log(`➕ Added ${archivedAdded} archived duplicate posts to redirect table.`);
}

// Explicit special character sanitization redirects
const specialRenames = [
  ['/blog/hiring-business-development-executive-(saas)-rannkly', '/blog/hiring-business-development-executive-saas-rannkly/'],
  ['/blog/hiring-data-scientist-sr.-ml-engineer-ithena-technologies', '/blog/hiring-data-scientist-sr-ml-engineer-ithena-technologies/'],
  ['/blog/hiring-senior-analyst-(data-scientist)-b-informative-it-services', '/blog/hiring-senior-analyst-data-scientist-b-informative-it-services/'],
];
for (const [from, to] of specialRenames) {
  specificMap.set(from.toLowerCase(), { to, status: '301' });
}

// Flatten any redirect chains and ensure destinations are 100% valid
function resolveChain(url, visited = new Set()) {
  const norm = url.length > 1 && url.endsWith('/') ? url.slice(0, -1) : url;
  const clean = norm.toLowerCase();
  if (visited.has(clean)) return url;
  visited.add(clean);

  const target = specificMap.get(clean) || massRedirects.get(clean);
  if (target && target.to && target.to !== url) {
    return resolveChain(target.to, visited);
  }
  return url;
}

let chainsFlattened = 0;
let brokenFixed = 0;
for (const [from, target] of specificMap.entries()) {
  let finalDest = resolveChain(target.to);
  const validatedDest = findValidTarget(finalDest);
  if (validatedDest !== finalDest) {
    brokenFixed++;
    finalDest = validatedDest;
  }
  if (finalDest !== target.to) {
    chainsFlattened++;
    specificMap.set(from, { ...target, to: finalDest });
  }
}
if (chainsFlattened > 0 || brokenFixed > 0) {
  console.log(`⚡ Flattened ${chainsFlattened} redirect chains and repaired ${brokenFixed} 404 destination targets.`);
}

// 1. Build optimized public/_redirects (strictly under 1,800 lines for Cloudflare Pages 2k limit)
const staticRules = [];

// Essential wildcards & top aliases first
staticRules.push('# Core Site Aliases & Wildcards');
staticRules.push('/robot.txt /robots.txt 301');
staticRules.push('/posts/* /blog/:splat 301');
staticRules.push('/learn-skills/* /tools/ 301');
staticRules.push('/brochures/* /inquiry/ 302');
staticRules.push('/tools/ai-skills/* /tools/ 301');

staticRules.push('\n# Top-Level Page Aliases');
const topAliases = [
  ['/mhcet-mba-colleges-list', '/colleges/mba-colleges-mumbai/'],
  ['/mba-discount', '/mba-application-form-discount/'],
  ['/form-discount', '/mba-application-form-discount/'],
  ['/mba-forms', '/mba-application-form-discount/'],
  ['/mba-2027', '/mba-pgdm-admission-2027/'],
  ['/counselling', '/book-session/'],
  ['/counseling', '/book-session/'],
  ['/schedule-counselling', '/book-session/'],
  ['/book-call', '/book-session/'],
  ['/calendly', '/book-session/'],
  ['/iim-placements', '/top-tier-mba-colleges/'],
  ['/tools/roadmap-calculator', '/calculator/career-roadmap/'],
  ['/tools/mock-tests', '/mock-tests/'],
  ['/partner-with-us', '/inquiry/'],
  ['/backlink-collaboration', '/inquiry/'],
  ['/govt-jobs', '/tools/govt-exams-mock-test/'],
  ['/tools/backlink-generator', '/inquiry/'],
  ['/calculator/startup', '/calculator/career-roadmap/'],
  ['/tools/mba-roi-calculator', '/tools/'],
  ['/tools/salary-auditor', '/tools/'],
  ['/tools/salary-slip-generator', '/tools/'],
  ['/tools/offer-letter-generator', '/tools/'],
  ['/tools/resume-generator', '/tools/'],
  ['/tools/resume-analyzer', '/tools/'],
  ['/top-mba-colleges-delhi-ncr-2026', '/colleges/mba-colleges-delhi-ncr/'],
  ['/colleges/tiss-mumbai', '/blog/tiss-mumbai-application-form-2027-hrm-lr-cat-dates-fees-cutoff/'],
  ['/colleges/altera-institute', '/blog/direct-admission-altera-institute-gurgaon-2027-29/'],
  ['/colleges/bitsom-mumbai', '/blog/bitsom-mumbai-mba-review-2027-fees-placements-cutoff/'],
  ['/tools/mock-test/srmjee', '/mock-tests/'],
];

for (const [from, to] of topAliases) {
  staticRules.push(`${from} ${to} 301`);
  staticRules.push(`${from}/ ${to} 301`);
}

// Add special character renames to static rules (for verify-slug-immutability)
staticRules.push('\n# Sanitized Slug Aliases');
for (const [from, to] of specialRenames) {
  staticRules.push(`${from} ${to} 301`);
  staticRules.push(`${from}/ ${to} 301`);
}

staticRules.push('\n# Priority 1-to-1 Content & College Migrations');
for (const [from, target] of specificMap.entries()) {
  if (topAliases.some(t => t[0] === from)) continue;
  if (specialRenames.some(s => s[0] === from)) continue;
  
  staticRules.push(`${from} ${target.to} ${target.status}`);
  staticRules.push(`${from}/ ${target.to} ${target.status}`);
  // Keep static rules within safety cap of 1,750 lines (Cloudflare 2,000 line limit)
  if (staticRules.length >= 1750) break;
}

fs.writeFileSync(redirectsPath, staticRules.join('\n') + '\n', 'utf8');
console.log(`✅ Saved compact public/_redirects with ${staticRules.length} lines (under Cloudflare 2,000 limit).`);

// 2. Build Cloudflare Pages Edge Middleware functions/_middleware.ts
// Middleware has NO size limit and executes at the Cloudflare edge for 100% of historical URLs!

// Combine ALL redirects into the fast lookup map
const combinedMap = {};
for (const [from, target] of massRedirects.entries()) {
  const dest = target.to.endsWith('/') ? target.to : target.to + '/';
  combinedMap[from] = dest;
}
for (const [from, target] of specificMap.entries()) {
  const dest = target.to.endsWith('/') ? target.to : target.to + '/';
  combinedMap[from] = dest;
}

// Guarantee recovered ranking URLs point strictly to original canonicals
combinedMap['/blog/fee-refund-policy-aicte-ugc-2027-29'] = '/blog/fee-refund-policy-aicte-ugc-2026/';
combinedMap['/blog/fee-refund-policy-aicte-ugc-2027-29/'] = '/blog/fee-refund-policy-aicte-ugc-2026/';
combinedMap['/blog/top-healthcare-management-colleges-india-2027-29'] = '/blog/top-healthcare-management-colleges-india-2026/';
combinedMap['/blog/top-healthcare-management-colleges-india-2027-29/'] = '/blog/top-healthcare-management-colleges-india-2026/';
delete combinedMap['/blog/fee-refund-policy-aicte-ugc-2026'];
delete combinedMap['/blog/fee-refund-policy-aicte-ugc-2026/'];
delete combinedMap['/blog/top-healthcare-management-colleges-india-2026'];
delete combinedMap['/blog/top-healthcare-management-colleges-india-2026/'];
delete combinedMap['/blog/cat-2026-whatsapp-group-links-top-coaching'];
delete combinedMap['/blog/cat-2026-whatsapp-group-links-top-coaching/'];

// Export REDIRECT_MAP.csv deliverable
const csvLines = ['Old URL,New URL,Status Code,Type'];
for (const [from, dest] of Object.entries(combinedMap)) {
  const isRecovered = from.includes('fee-refund') || from.includes('healthcare');
  const type = isRecovered ? 'Ranking URL Recovery' : (from.startsWith('/blog/') ? 'Blog Slug Migration' : 'Site Alias');
  csvLines.push(`https://careerwithmohit.online${from},https://careerwithmohit.online${dest},301,${type}`);
}
const csvPath = path.join(process.cwd(), 'REDIRECT_MAP.csv');
fs.writeFileSync(csvPath, csvLines.join('\n') + '\n', 'utf8');
console.log(`✅ Generated REDIRECT_MAP.csv with ${Object.keys(combinedMap).length} mapped 301 rules.`);

const middlewareContent = `// Cloudflare Pages Edge Middleware — Complete Zero-Loss Redirect & Canonical Handler
// Handles 100% of historical URLs, domain normalization, and trailing slash in EXACTLY 1 HOP (<1ms)

interface EventContext<Env, P extends string, Data> {
  request: Request;
  env: Env;
  params: Record<P, string | string[]>;
  data: Data;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}

type PagesFunction<Env = unknown, P extends string = string, Data extends Record<string, unknown> = Record<string, unknown>> = (
  context: EventContext<Env, P, Data>
) => Response | Promise<Response>;

// Pre-compiled redirect dictionary
const REDIRECT_MAP: Record<string, string> = ${JSON.stringify(combinedMap, null, 2)};

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();
  const pathname = url.pathname;
  const protocol = url.protocol;

  // Static assets bypass: do not redirect assets, builds, feeds or system files
  const isStaticAsset =
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/brochures/') ||
    pathname.startsWith('/papers/') ||
    pathname.startsWith('/downloads/') ||
    /\\.(ico|png|jpg|jpeg|webp|svg|css|js|woff|woff2|ttf|json|xml|txt)$/i.test(pathname);

  if (isStaticAsset) {
    return context.next();
  }

  const cleanPath = pathname.toLowerCase();
  const normPath = cleanPath.length > 1 && cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;

  // 1. Resolve redirect target from dictionary
  let targetPath: string | null = REDIRECT_MAP[normPath] || REDIRECT_MAP[cleanPath] || null;

  // Fallback for pruned synthetic blog doorway pages pattern
  if (
    !targetPath &&
    (cleanPath.startsWith('/blog/all-about-amity-') ||
     cleanPath.startsWith('/blog/low-budget-bba-') ||
     cleanPath.startsWith('/blog/low-budget-mba-') ||
     cleanPath.startsWith('/blog/private-mtech-'))
  ) {
    if (cleanPath !== '/blog' && cleanPath !== '/blog/') {
      targetPath = '/blog/';
    }
  }

  // 2. Ensure target ends with trailing slash
  let finalPath = targetPath || cleanPath;
  if (!finalPath.endsWith('/') && !finalPath.includes('?') && !finalPath.includes('#')) {
    finalPath = finalPath + '/';
  }

  // 3. Domain & Protocol Normalization: Single Hop Guarantee
  const isApex = hostname === 'careerwithmohit.online' || hostname === 'localhost' || hostname === '127.0.0.1';
  const isHttps = protocol === 'https:';
  const isPathChanged = targetPath !== null || (pathname !== finalPath);

  // If www or non-apex domain on production
  if (!isApex && hostname.endsWith('careerwithmohit.online')) {
    const canonicalUrl = \`https://careerwithmohit.online\${finalPath}\${url.search}\`;
    return Response.redirect(canonicalUrl, 301);
  }

  // If http on production
  if (!isHttps && !hostname.includes('localhost') && !hostname.includes('127.0.0.1')) {
    const canonicalUrl = \`https://careerwithmohit.online\${finalPath}\${url.search}\`;
    return Response.redirect(canonicalUrl, 301);
  }

  // If pathname changed due to redirect map or missing trailing slash
  if (isPathChanged) {
    const canonicalOrigin = (hostname.endsWith('careerwithmohit.online'))
      ? 'https://careerwithmohit.online'
      : url.origin;
    const destinationUrl = new URL(finalPath, canonicalOrigin);
    if (destinationUrl.toString() !== url.toString()) {
      return Response.redirect(destinationUrl.toString(), 301);
    }
  }

  // Pass request to static asset handler
  return context.next();
};
`;

const middlewarePath = path.join(process.cwd(), 'functions', '_middleware.ts');
fs.writeFileSync(middlewarePath, middlewareContent, 'utf8');
console.log(`✅ Saved functions/_middleware.ts with full edge redirect table (${Object.keys(combinedMap).length} routes).`);
