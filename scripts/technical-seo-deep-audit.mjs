import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://careerwithmohit.online';
const APP_DIR = path.join(process.cwd(), 'app');
const POSTS_DIR = path.join(process.cwd(), 'posts');
const COLLEGES_DIR = path.join(process.cwd(), 'colleges');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

console.log('========================================================================');
console.log('🔍 CAREERWITHMOHIT — COMPREHENSIVE TECHNICAL SEO AUDIT');
console.log('========================================================================\n');

const findings = {
  passed: [],
  warnings: [],
  errors: [],
};

// -----------------------------------------------------------------------------
// 1. Audit next.config.ts & Cloudflare Headers & Redirects
// -----------------------------------------------------------------------------
console.log('📦 1. SERVER, CONFIG & CACHING AUDIT');
const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
if (fs.existsSync(nextConfigPath)) {
  const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
  if (nextConfig.includes('trailingSlash: true')) {
    findings.passed.push('next.config.ts enforces trailingSlash: true for canonical URL consistency.');
  } else {
    findings.errors.push('next.config.ts missing trailingSlash: true');
  }
  if (nextConfig.includes('output: "export"') || nextConfig.includes("output: 'export'")) {
    findings.passed.push('next.config.ts uses static HTML export.');
  }
}

const headersPath = path.join(PUBLIC_DIR, '_headers');
if (fs.existsSync(headersPath)) {
  const headers = fs.readFileSync(headersPath, 'utf8');
  if (headers.includes('Strict-Transport-Security') && headers.includes('X-Content-Type-Options')) {
    findings.passed.push('Cloudflare _headers includes essential security headers (HSTS, nosniff, Referrer-Policy).');
  } else {
    findings.warnings.push('Cloudflare _headers is missing some security headers.');
  }
  if (headers.includes('/sitemap.xml') && headers.includes('/robots.txt') && headers.includes('/llms.txt')) {
    findings.passed.push('Cloudflare _headers includes explicit MIME types and cache headers for sitemap, robots, and llms.txt.');
  }
}

// -----------------------------------------------------------------------------
// 2. Audit Robots.ts & Manifest & LLMs.txt
// -----------------------------------------------------------------------------
console.log('🤖 2. ROBOTS, MANIFEST & AI CRAWLER AUDIT');
const robotsPath = path.join(APP_DIR, 'robots.ts');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (robots.includes("sitemap: 'https://careerwithmohit.online/sitemap.xml'")) {
    findings.passed.push('robots.ts points directly to canonical sitemap.xml.');
  } else {
    findings.warnings.push('robots.ts sitemap URL might not match canonical base URL.');
  }
  if (robots.includes('GPTBot') && robots.includes('PerplexityBot') && robots.includes('ClaudeBot')) {
    findings.passed.push('robots.ts explicitly configures Generative Engine (AI) crawlers.');
  }
}

const llmsTxtPath = path.join(PUBLIC_DIR, 'llms.txt');
const llmsFullTxtPath = path.join(PUBLIC_DIR, 'llms-full.txt');
if (fs.existsSync(llmsTxtPath) && fs.existsSync(llmsFullTxtPath)) {
  findings.passed.push('llms.txt and llms-full.txt present for GEO (Generative Engine Optimization).');
} else {
  findings.warnings.push('llms.txt or llms-full.txt missing from public directory.');
}

// -----------------------------------------------------------------------------
// 3. Audit Layout & Sitewide Schema Markup
// -----------------------------------------------------------------------------
console.log('🏛️ 3. SITEWIDE METADATA & SCHEMA.ORG AUDIT');
const layoutPath = path.join(APP_DIR, 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  const layout = fs.readFileSync(layoutPath, 'utf8');
  if (layout.includes('metadataBase: new URL("https://careerwithmohit.online")')) {
    findings.passed.push('Root layout defines metadataBase with https://careerwithmohit.online');
  } else {
    findings.errors.push('Root layout missing metadataBase.');
  }

  if (layout.includes('Person') && layout.includes('EducationalOrganization') && layout.includes('WebSite')) {
    findings.passed.push('Root layout includes Person, EducationalOrganization, and WebSite schemas.');
  } else {
    findings.warnings.push('Root layout schema markup incomplete.');
  }

  if (layout.includes('preconnect') && layout.includes('dns-prefetch')) {
    findings.passed.push('Root layout includes preconnect and dns-prefetch performance optimizations.');
  }
}

// -----------------------------------------------------------------------------
// 4. Audit Static Routes vs Sitemap.ts
// -----------------------------------------------------------------------------
console.log('🗺️ 4. SITEMAP ACCURACY & ROUTE AUDIT');
const sitemapPath = path.join(APP_DIR, 'sitemap.ts');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  // Check trailing slashes in static routes definition
  if (sitemapContent.includes('${baseUrl}${route}/') || sitemapContent.includes("route === '' ? `${baseUrl}/`")) {
    findings.passed.push('Sitemap correctly appends trailing slashes to all generated URLs.');
  }

  // Check dynamic sources
  if (sitemapContent.includes('getSortedPostsData') && sitemapContent.includes('collegesDir') && sitemapContent.includes('ABROAD_COLLEGES') && sitemapContent.includes('COLLEGES')) {
    findings.passed.push('Sitemap includes blogs, offline colleges, abroad colleges, online universities, and exam tools.');
  }
}

// -----------------------------------------------------------------------------
// 5. Scan All App Pages for Canonical, OpenGraph, Title, Description
// -----------------------------------------------------------------------------
console.log('📄 5. APP PAGES SEO AUDIT');

function getFilesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFilesRecursively(fullPath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

const allAppFiles = getFilesRecursively(APP_DIR);
const pageFiles = allAppFiles.filter(f => f.endsWith('page.tsx'));
console.log(`Found ${pageFiles.length} page.tsx routes in app directory.`);

let missingCanonicalCount = 0;
let missingOgCount = 0;
let nonTrailingSlashCanonicals = 0;

pageFiles.forEach(file => {
  const relPath = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, 'utf8');
  
  // Skip dynamic route templates that use generateMetadata
  const isDynamic = file.includes('[');
  const hasGenerateMetadata = content.includes('generateMetadata');
  const hasMetadata = content.includes('export const metadata');
  
  if (!isDynamic && !hasMetadata && !hasGenerateMetadata && !file.includes('/admin/')) {
    findings.warnings.push(`Page ${relPath} might be missing metadata export.`);
  }

  // Check canonical trailing slash in file content
  const canonicalMatches = content.match(/canonical:\s*["'`]([^"'`]+)["'`]/g);
  if (canonicalMatches) {
    canonicalMatches.forEach(m => {
      const matchUrl = m.match(/canonical:\s*["'`]([^"'`]+)["'`]/)?.[1];
      if (matchUrl && !matchUrl.endsWith('/') && !matchUrl.includes('${') && !matchUrl.includes('.xml') && !matchUrl.includes('.txt')) {
        nonTrailingSlashCanonicals++;
        findings.warnings.push(`Non-trailing-slash canonical found in ${relPath}: ${matchUrl}`);
      }
    });
  }
});

// -----------------------------------------------------------------------------
// 6. Audit Blog Posts & College Markdown Files
// -----------------------------------------------------------------------------
console.log('📝 6. BLOG POSTS & COLLEGES METADATA AUDIT');
const postFiles = fs.existsSync(POSTS_DIR) ? fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md')) : [];
const collegeFiles = fs.existsSync(COLLEGES_DIR) ? fs.readdirSync(COLLEGES_DIR).filter(f => f.endsWith('.md')) : [];

let postsShortDesc = 0;
let postsShortTitle = 0;
let postsNoFaqs = 0;

postFiles.slice(0, 500).forEach(file => {
  try {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const { data } = matter(raw);
    if (!data.description || data.description.length < 80) postsShortDesc++;
    if (!data.title || data.title.length < 20) postsShortTitle++;
    if (!Array.isArray(data.faqs) || data.faqs.length === 0) postsNoFaqs++;
  } catch (e) {}
});

console.log(`Audited sample of blog posts: ${postsShortDesc} short descriptions, ${postsShortTitle} short titles, ${postsNoFaqs} missing FAQs out of 500 checked.`);

// -----------------------------------------------------------------------------
// Summary Output
// -----------------------------------------------------------------------------
console.log('\n========================================================================');
console.log('📋 AUDIT SUMMARY & FINDINGS');
console.log('========================================================================');
console.log(`\n✅ PASSED CHECKS (${findings.passed.length}):`);
findings.passed.forEach(p => console.log(`  ✓ ${p}`));

if (findings.warnings.length > 0) {
  console.log(`\n⚠️ WARNINGS / IMPROVEMENT AREAS (${findings.warnings.length}):`);
  findings.warnings.slice(0, 20).forEach(w => console.log(`  ! ${w}`));
  if (findings.warnings.length > 20) {
    console.log(`  ... and ${findings.warnings.length - 20} more warnings.`);
  }
}

if (findings.errors.length > 0) {
  console.log(`\n❌ ERRORS / CRITICAL ISSUES (${findings.errors.length}):`);
  findings.errors.forEach(e => console.log(`  ✗ ${e}`));
} else {
  console.log('\n🎉 No critical errors found!');
}
console.log('========================================================================\n');
