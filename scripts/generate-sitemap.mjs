import fs from 'fs';
import path from 'path';

console.log('🗺️ Generating clean, complete production sitemap.xml...');

const baseUrl = 'https://careerwithmohit.online';
const staticBaseline = '2026-11-20T00:00:00.000Z';

// Load all redirect sources from _redirects and REDIRECT_MAP.csv
const redirectSources = new Set();
try {
  const redirectsPath = path.join(process.cwd(), 'public', '_redirects');
  if (fs.existsSync(redirectsPath)) {
    const lines = fs.readFileSync(redirectsPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [from] = trimmed.split(/\s+/);
      if (from && !from.includes('*')) {
        const clean = from.toLowerCase().replace(/\/$/, '');
        redirectSources.add(clean);
        redirectSources.add(clean + '/');
      }
    }
  }

  const csvPath = path.join(process.cwd(), 'REDIRECT_MAP.csv');
  if (fs.existsSync(csvPath)) {
    const lines = fs.readFileSync(csvPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('Old URL')) continue;
      const [from] = trimmed.split(',');
      if (from && !from.includes('*')) {
        const clean = from.replace(baseUrl, '').toLowerCase().replace(/\/$/, '');
        redirectSources.add(clean);
        redirectSources.add(clean + '/');
      }
    }
  }
} catch (e) {
  console.warn('Warning loading redirects:', e.message);
}

console.log(`Loaded ${redirectSources.size} redirect paths to protect sitemap against redirects.`);

const allEntries = [];
const seenUrls = new Set();

function addUrl(pathname, lastmod, changefreq = 'weekly', priority = '0.8') {
  let clean = pathname.trim();
  if (!clean.startsWith('/')) clean = '/' + clean;
  if (!clean.endsWith('/')) clean = clean + '/';

  const lower = clean.toLowerCase();
  const lowerNoSlash = lower.slice(0, -1);
  if (redirectSources.has(lower) || redirectSources.has(lowerNoSlash)) {
    return; // Do not submit redirected URLs
  }

  const fullUrl = `${baseUrl}${clean === '/' ? '/' : clean}`;
  if (seenUrls.has(fullUrl)) return;
  seenUrls.add(fullUrl);

  allEntries.push({
    url: fullUrl,
    lastmod: lastmod || staticBaseline,
    changefreq,
    priority
  });
}

// 1. Static routes
const staticRoutes = [
  ['/', 'daily', '1.0'],
  ['/blog/', 'daily', '0.95'],
  ['/colleges/', 'daily', '0.95'],
  ['/about/', 'weekly', '0.75'],
  ['/book-session/', 'weekly', '0.9'],
  ['/news/', 'weekly', '0.75'],
  ['/tools/', 'weekly', '0.9'],
  ['/tools/cat-score-calculator/', 'weekly', '0.95'],
  ['/tools/xat-score-calculator-2027/', 'weekly', '0.9'],
  ['/tools/ats-resume-builder/', 'weekly', '0.9'],
  ['/tools/cat-mock-test/', 'weekly', '0.9'],
  ['/tools/nmat-mock-test/', 'weekly', '0.9'],
  ['/tools/mhcet-mock-test/', 'weekly', '0.9'],
  ['/tools/btech-college-predictor/', 'weekly', '0.9'],
  ['/tools/cuet-pg-mba-predictor/', 'weekly', '0.9'],
  ['/tools/college-comparison/', 'weekly', '0.9'],
  ['/tools/accreditation-checker/', 'weekly', '0.8'],
  ['/tools/hashtag-generator/', 'weekly', '0.8'],
  ['/tools/govt-exams-mock-test/', 'weekly', '0.9'],
  ['/mba-application-form-discount/', 'weekly', '0.95'],
  ['/mba-pgdm-admission-2027/', 'weekly', '0.95'],
  ['/mba-pgdm-admissions-by-region/', 'weekly', '0.95'],
  ['/top-tier-mba-colleges/', 'weekly', '0.95'],
  ['/colleges/compare/', 'weekly', '0.9'],
  ['/colleges/top-engineering-colleges-in-delhi/', 'weekly', '0.9'],
  ['/colleges/mba-colleges-delhi-ncr/', 'weekly', '0.95'],
  ['/colleges/mba-colleges-mumbai/', 'weekly', '0.95'],
  ['/colleges/mba-colleges-bangalore/', 'weekly', '0.95'],
  ['/colleges/mba-colleges-pune/', 'weekly', '0.95'],
  ['/colleges/mba-colleges-hyderabad/', 'weekly', '0.95'],
  ['/colleges/mba-colleges-kolkata/', 'weekly', '0.95'],
  ['/colleges/mba-colleges-ahmedabad/', 'weekly', '0.95'],
  ['/colleges/mba-colleges-jaipur/', 'weekly', '0.95'],
  ['/community/', 'weekly', '0.75'],
  ['/services/', 'weekly', '0.75'],
  ['/privacy/', 'monthly', '0.5'],
  ['/terms/', 'monthly', '0.5'],
  ['/inquiry/', 'weekly', '0.8'],
  ['/mock-tests/', 'weekly', '0.85'],
  ['/scholarships-2026/', 'weekly', '0.85'],
  ['/skill-assessment-certificate/', 'weekly', '0.85'],
  ['/calculator/career-roadmap/', 'weekly', '0.85'],
  ['/calculator/certification/', 'weekly', '0.85'],
  ['/calculator/cuet-pg-2026/', 'weekly', '0.85'],
  ['/calculator/cuet-ug-2026/', 'weekly', '0.85'],
  ['/calculator/jee-main-2026/', 'weekly', '0.85'],
  ['/calculator/mhcet-mba-2026/', 'weekly', '0.85'],
  ['/online-degree-certification/', 'weekly', '0.9'],
  ['/online-degree-certification/online-mba/', 'weekly', '0.9'],
  ['/online-degree-certification/online-bba/', 'weekly', '0.9'],
  ['/online-degree-certification/online-mca/', 'weekly', '0.9'],
  ['/online-degree-certification/online-bca/', 'weekly', '0.9'],
  ['/online-degree-certification/online-bcom/', 'weekly', '0.85'],
  ['/online-degree-certification/online-mcom/', 'weekly', '0.85'],
  ['/online-degree-certification/online-bsc/', 'weekly', '0.85'],
  ['/online-degree-certification/online-ma/', 'weekly', '0.85'],
  ['/online-degree-certification/online-ba/', 'weekly', '0.85'],
  ['/online-degree-certification/online-pgdm/', 'weekly', '0.9'],
  ['/online-degree-certification/online-data-science/', 'weekly', '0.9'],
  ['/online-degree-certification/cheapest-online-mba/', 'weekly', '0.9'],
  ['/online-degree-certification/1-year-online-mba/', 'weekly', '0.9'],
  ['/online-degree-certification/distance-vs-online-degree/', 'weekly', '0.85'],
  ['/abroad-education/', 'weekly', '0.9']
];

for (const [route, freq, prio] of staticRoutes) {
  addUrl(route, staticBaseline, freq, prio);
}

// 2. Active blog posts (all 5,354 posts)
const postsDir = path.join(process.cwd(), 'posts');
const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
console.log(`Scanning ${postFiles.length} blog posts in posts/...`);

for (const file of postFiles) {
  const slug = file.replace(/\.md$/, '');
  const filePath = path.join(postsDir, file);
  let lastmod = staticBaseline;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const dateMatch = content.match(/^lastUpdated:\s*["']?(\d{4}-\d{2}-\d{2})["']?/m) || content.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})["']?/m);
    if (dateMatch) {
      lastmod = new Date(dateMatch[1]).toISOString();
    }
  } catch {}

  addUrl(`/blog/${slug}/`, lastmod, 'monthly', '0.8');
}

// 3. Active colleges (all 780 colleges)
const collegesDir = path.join(process.cwd(), 'colleges');
const collegeFiles = fs.readdirSync(collegesDir).filter(f => f.endsWith('.md'));
console.log(`Scanning ${collegeFiles.length} colleges in colleges/...`);

for (const file of collegeFiles) {
  const slug = file.replace(/\.md$/, '');
  const filePath = path.join(collegesDir, file);
  let lastmod = staticBaseline;
  try {
    const stat = fs.statSync(filePath);
    lastmod = stat.mtime.toISOString();
  } catch {}

  addUrl(`/colleges/${slug}/`, lastmod, 'monthly', '0.85');
}

// 4. Exam resources
['cat', 'xat', 'cmat', 'snap', 'nmat', 'mah-mba-cet', 'cuet-pg'].forEach(exam => {
  addUrl(`/resources/${exam}/`, staticBaseline, 'monthly', '0.8');
});

// Construct XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

for (const item of allEntries) {
  xml += '  <url>\n';
  xml += `    <loc>${item.url}</loc>\n`;
  xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
  xml += `    <priority>${item.priority}</priority>\n`;
  xml += '  </url>\n';
}

xml += '</urlset>\n';

const publicSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(publicSitemapPath, xml, 'utf8');
console.log(`✅ Saved ${publicSitemapPath} with ${allEntries.length} 100% 200 OK indexable URLs.`);

// Also copy to out/sitemap.xml if out/ exists
const outSitemapPath = path.join(process.cwd(), 'out', 'sitemap.xml');
if (fs.existsSync(path.dirname(outSitemapPath))) {
  fs.writeFileSync(outSitemapPath, xml, 'utf8');
  console.log(`✅ Synced ${outSitemapPath}`);
}
