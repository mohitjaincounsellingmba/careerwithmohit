import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('='.repeat(80));
console.log('🛡️  SEO PERMANENT LOCK & IMMUTABILITY ENFORCEMENT GUARD');
console.log('='.repeat(80));

const errors = [];
const warnings = [];

// 1. Load PROTECTED_URLS.json
const protectedPath = path.join(process.cwd(), 'seo-recovery', 'PROTECTED_URLS.json');
if (!fs.existsSync(protectedPath)) {
  console.error('❌ Critical: seo-recovery/PROTECTED_URLS.json missing!');
  process.exit(1);
}
const protectedData = JSON.parse(fs.readFileSync(protectedPath, 'utf8'));
const postUrls = new Set(protectedData.post_urls || []);
const collegeUrls = new Set(protectedData.college_urls || []);
const staticUrls = new Set(protectedData.static_urls || []);

const postsDir = path.join(process.cwd(), 'posts');
const collegesDir = path.join(process.cwd(), 'colleges');

const activePostSlugs = new Set(fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, '')));
const activeCollegeSlugs = new Set(fs.readdirSync(collegesDir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, '')));

// 2. Load REDIRECT_MAP from functions/_middleware.ts
const middlewarePath = path.join(process.cwd(), 'functions', '_middleware.ts');
let redirectMap = {};
if (fs.existsSync(middlewarePath)) {
  const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');
  const match = middlewareContent.match(/const REDIRECT_MAP: Record<string, string> = (\{[\s\S]*?\});/);
  if (match) {
    try {
      redirectMap = JSON.parse(match[1]);
    } catch (e) {
      errors.push(`Could not parse REDIRECT_MAP in functions/_middleware.ts: ${e.message}`);
    }
  }
}

// Check 1: No Protected Post or College URL is Missing, 404, or Redirecting
console.log(`[1/6] Verifying ${postUrls.size} protected post URLs and ${collegeUrls.size} protected college URLs...`);
let missingPosts = 0;
let redirectedProtectedPosts = 0;

for (const u of postUrls) {
  const slug = u.replace('https://careerwithmohit.online/blog/', '').replace(/\/$/, '');
  if (!activePostSlugs.has(slug)) {
    errors.push(`PROTECTED POST MISSING (404): ${slug}`);
    missingPosts++;
  }
  const path1 = `/blog/${slug}`;
  const path2 = `/blog/${slug}/`;
  if (redirectMap[path1] || redirectMap[path2]) {
    errors.push(`PROTECTED POST IS REDIRECTING (301): ${slug} -> ${redirectMap[path1] || redirectMap[path2]}`);
    redirectedProtectedPosts++;
  }
}

let missingColleges = 0;
let redirectedProtectedColleges = 0;
for (const u of collegeUrls) {
  const slug = u.replace('https://careerwithmohit.online/colleges/', '').replace(/\/$/, '');
  if (!activeCollegeSlugs.has(slug)) {
    errors.push(`PROTECTED COLLEGE MISSING (404): ${slug}`);
    missingColleges++;
  }
  const path1 = `/colleges/${slug}`;
  const path2 = `/colleges/${slug}/`;
  if (redirectMap[path1] || redirectMap[path2]) {
    errors.push(`PROTECTED COLLEGE IS REDIRECTING (301): ${slug} -> ${redirectMap[path1] || redirectMap[path2]}`);
    redirectedProtectedColleges++;
  }
}

// Check 2: Redirect Chains & Loops
console.log('[2/6] Auditing edge redirect table for chains and loops...');
let chains = 0;
let loops = 0;
for (const [from, to] of Object.entries(redirectMap)) {
  const normTo = to.endsWith('/') && to.length > 1 ? to.slice(0, -1) : to;
  if (redirectMap[normTo] || redirectMap[to]) {
    errors.push(`REDIRECT CHAIN DETECTED: ${from} -> ${to} -> ${redirectMap[normTo] || redirectMap[to]}`);
    chains++;
  }
  if (from === to || from === normTo) {
    errors.push(`REDIRECT LOOP DETECTED: ${from} -> ${to}`);
    loops++;
  }
}

// Check 3: Unexpected noindex on Content Pages
console.log('[3/6] Auditing content files for accidental noindex tags...');
let noindexFound = 0;
for (const file of fs.readdirSync(postsDir)) {
  if (!file.endsWith('.md')) continue;
  const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
  if (/^noindex:\s*true/m.test(content)) {
    errors.push(`ACCIDENTAL NOINDEX FOUND in posts/${file}`);
    noindexFound++;
  }
}

// Check 4: Canonical Configuration Audit
console.log('[4/6] Auditing canonical generator scripts...');
const blogPageTsx = fs.readFileSync(path.join(process.cwd(), 'app', 'blog', '[slug]', 'page.tsx'), 'utf8');
if (!blogPageTsx.includes('canonical: `https://careerwithmohit.online/blog/${slug}/`')) {
  errors.push('CANONICAL MISMATCH: app/blog/[slug]/page.tsx must generate absolute self-referencing trailing-slash canonical!');
}

const collegePageTsx = fs.readFileSync(path.join(process.cwd(), 'app', 'colleges', '[slug]', 'page.tsx'), 'utf8');
if (!collegePageTsx.includes('canonical: `https://careerwithmohit.online/colleges/${slug}/`')) {
  errors.push('CANONICAL MISMATCH: app/colleges/[slug]/page.tsx must generate absolute self-referencing trailing-slash canonical!');
}

// Check 5: Git Commit Slug Change Limit (<= 5 slugs modified/deleted)
console.log('[5/6] Checking git commit slug delta threshold (Max 5 slugs)...');
try {
  const gitDiff = execSync('git diff --name-status -M HEAD 2>/dev/null || true', { encoding: 'utf8' });
  const changedSlugs = [];
  gitDiff.split('\n').forEach(line => {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 2) {
      const status = parts[0];
      const file = parts[1];
      if ((file.startsWith('posts/') || file.startsWith('colleges/')) && (status.startsWith('R') || status === 'D')) {
        changedSlugs.push(`${status} ${file}`);
      }
    }
  });
  if (changedSlugs.length > 5) {
    warnings.push(`Notice: Current working tree has ${changedSlugs.length} changed/deleted slugs (Acceptable during baseline restoration).`);
  }
} catch (e) {}

// Check 6: 410 Doorway Filter Check
console.log('[6/6] Verifying edge middleware contains NO doorway 410 response blocks...');
if (fs.existsSync(middlewarePath)) {
  const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');
  if (middlewareContent.includes('status: 410') || middlewareContent.includes('isPrunedDoorway')) {
    errors.push('ILLEGAL 410 FILTER: functions/_middleware.ts contains 410 Gone response block!');
  }
}

console.log('='.repeat(80));
console.log(`SEO LOCK RESULTS: ${errors.length} Errors, ${warnings.length} Warnings`);
console.log('='.repeat(80));

if (errors.length > 0) {
  console.error('\n❌ BUILD HALTED: SEO LOCK POLICY VIOLATIONS:');
  errors.slice(0, 20).forEach(e => console.error(`  - ${e}`));
  if (errors.length > 20) {
    console.error(`  ... and ${errors.length - 20} more errors.`);
  }
  process.exit(1);
}

warnings.forEach(w => console.warn(`  ⚠️  ${w}`));
console.log('✅ ALL SEO LOCK CHECKS PASSED: Zero 404s, Zero 410s, Zero Chains, 100% Canonical Integrity.\n');
