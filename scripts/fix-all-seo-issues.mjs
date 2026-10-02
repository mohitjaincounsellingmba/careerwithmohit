import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'posts');
const COLLEGES_DIR = path.join(ROOT_DIR, 'colleges');
const APP_DIR = path.join(ROOT_DIR, 'app');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const REDIRECTS_FILE = path.join(ROOT_DIR, 'public', '_redirects');

console.log('========================================================================');
console.log('🚀 COMPREHENSIVE SEO FIXER: TRAILING SLASHES, BROKEN LINKS & REDIRECTS');
console.log('========================================================================\n');

// Specific Slug Corrections
const SLUG_FIXES = {
  '/colleges/jims-kalkaji-delhi': '/colleges/jims-kalkaji/',
  '/colleges/jims-kalkaji-delhi/': '/colleges/jims-kalkaji/',
  '/colleges/sjmsom-iit-bombay': '/top-tier-mba-colleges/',
  '/colleges/sjmsom-iit-bombay/': '/top-tier-mba-colleges/',
  '/colleges/alliance-university': '/colleges/alliance-university-bangalore/',
  '/colleges/alliance-school-of-business-alliance-university': '/colleges/alliance-university-bangalore/',
  '/blog/all-about-ghaziabad-institute-of-management': '/colleges/mba-colleges-delhi-ncr/',
  '/blog/all-about-ghaziabad-graduate-school-of-management': '/colleges/mba-colleges-delhi-ncr/',
  '/blog/all-about-greater-noida-business-school': '/colleges/mba-colleges-delhi-ncr/',
  '/blog/all-about-greater-noida-institute-of-business-studies': '/colleges/mba-colleges-delhi-ncr/',
  '/blog/all-about-mumbai-institute-of-professional-studies': '/colleges/mba-colleges-mumbai/',
  '/blog/all-about-noida-institute-of-management-technology': '/colleges/mba-colleges-delhi-ncr/',
  '/blog/indus-business-academy': '/colleges/mba-colleges-bangalore/',
  '/colleges/indus-business-academy': '/colleges/mba-colleges-bangalore/'
};

// -----------------------------------------------------------------------------
// 1. Fix Markdown Internal Links in posts/ and colleges/
// -----------------------------------------------------------------------------
function fixMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  let updatedCount = 0;
  let linkFixCount = 0;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Fix specific known broken slugs
    for (const [badSlug, goodSlug] of Object.entries(SLUG_FIXES)) {
      if (content.includes(badSlug)) {
        content = content.replaceAll(badSlug, goodSlug);
      }
    }

    // 2. Fix markdown links [text](/path) -> [text](/path/)
    // Exclude links with file extensions (.pdf, .png, .jpg, .svg, .webp, .xml, .txt) and anchors (#)
    content = content.replace(/\[([^\]]+)\]\(((\/(?:blog|colleges|tools|calculator|services|about|inquiry|book-session|community|news|privacy|terms|mock-tests|resources|abroad-education|online-degree-certification|mba-pgdm-admission-2027|mba-application-form-discount|mba-admissions-by-region|mba-pgdm-admissions-by-region|top-tier-mba-colleges)[^\s)#?]*?))\)/g, (match, text, url) => {
      if (url.endsWith('/') || url.includes('.') || url.includes('#') || url.includes('?')) {
        return match;
      }
      linkFixCount++;
      return `[${text}](${url}/)`;
    });

    // 3. Fix HTML hrefs inside markdown <a href="/path"> -> <a href="/path/">
    content = content.replace(/href=["']((\/(?:blog|colleges|tools|calculator|services|about|inquiry|book-session|community|news|privacy|terms|mock-tests|resources|abroad-education|online-degree-certification|mba-pgdm-admission-2027|mba-application-form-discount|mba-admissions-by-region|mba-pgdm-admissions-by-region|top-tier-mba-colleges)[^\s"'#?]*?))["']/g, (match, url) => {
      if (url.endsWith('/') || url.includes('.') || url.includes('#') || url.includes('?')) {
        return match;
      }
      linkFixCount++;
      return `href="${url}/"`;
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
    }
  });

  console.log(`✅ Audited & Fixed ${path.relative(ROOT_DIR, dir)}: ${updatedCount} files updated, ${linkFixCount} links normalized.`);
}

fixMarkdownFiles(POSTS_DIR);
fixMarkdownFiles(COLLEGES_DIR);

// -----------------------------------------------------------------------------
// 2. Fix JSX / TSX Links in app/ and components/
// -----------------------------------------------------------------------------
function fixTsxFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  let filesUpdated = 0;
  let linksFixed = 0;

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      fixTsxFiles(fullPath);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;

      // Fix specific known broken slugs
      for (const [badSlug, goodSlug] of Object.entries(SLUG_FIXES)) {
        if (content.includes(`"${badSlug}"`) || content.includes(`'${badSlug}'`)) {
          content = content.replaceAll(`"${badSlug}"`, `"${goodSlug}"`);
          content = content.replaceAll(`'${badSlug}'`, `'${goodSlug}'`);
        }
      }

      // Normalize href="..." in Next.js <Link> or <a>
      content = content.replace(/href=["']((\/(?:blog|colleges|tools|calculator|services|about|inquiry|book-session|community|news|privacy|terms|mock-tests|resources|abroad-education|online-degree-certification|mba-pgdm-admission-2027|mba-application-form-discount|mba-admissions-by-region|mba-pgdm-admissions-by-region|top-tier-mba-colleges|starter-kit|jobs|certifications|internships|scholarships-2026)[^\s"'#?]*?))["']/g, (match, url) => {
        if (url.endsWith('/') || url.includes('.') || url.includes('#') || url.includes('?')) {
          return match;
        }
        linksFixed++;
        return `href="${url}/"`;
      });

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        filesUpdated++;
      }
    }
  });

  if (filesUpdated > 0) {
    console.log(`✅ Normalized TSX/TS files in ${path.relative(ROOT_DIR, dir)}: ${filesUpdated} files (${linksFixed} links).`);
  }
}

fixTsxFiles(APP_DIR);
fixTsxFiles(COMPONENTS_DIR);

// -----------------------------------------------------------------------------
// 3. Fix & Clean _redirects
// -----------------------------------------------------------------------------
if (fs.existsSync(REDIRECTS_FILE)) {
  const lines = fs.readFileSync(REDIRECTS_FILE, 'utf8').split('\n');
  let updatedLines = [];
  let redirectsFixed = 0;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      updatedLines.push(line);
      return;
    }

    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      let from = parts[0];
      let to = parts[1];
      const status = parts[2] || '301';

      // Check if `to` is in SLUG_FIXES
      if (SLUG_FIXES[to]) {
        to = SLUG_FIXES[to];
        redirectsFixed++;
      }

      // Ensure destination `to` has trailing slash if it's a directory / page path (not a file with extension or wildcard splat)
      if (to.startsWith('/') && !to.endsWith('/') && !to.includes('.') && !to.includes(':splat') && !to.includes('#') && !to.includes('?')) {
        to = to + '/';
        redirectsFixed++;
      }

      updatedLines.push(`${from} ${to} ${status}`);
    } else {
      updatedLines.push(line);
    }
  });

  fs.writeFileSync(REDIRECTS_FILE, updatedLines.join('\n'), 'utf8');
  console.log(`✅ Cleaned _redirects: ${redirectsFixed} redirect destinations normalized to trailing-slash format.`);
}

console.log('\n🎉 ALL SEO TRAILING SLASHE & 404 BROKEN LINK FIXES APPLIED SUCCESSFULLY!');
