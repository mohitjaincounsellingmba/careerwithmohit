import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

console.log('🔒 Verifying slug immutability & redirect guard...');

const publishedSlugsPath = path.join(process.cwd(), 'data', 'published-slugs.json');
if (!fs.existsSync(publishedSlugsPath)) {
  console.error('❌ Missing data/published-slugs.json registry!');
  process.exit(1);
}

const publishedSlugs = JSON.parse(fs.readFileSync(publishedSlugsPath, 'utf8'));
const postsDir = path.join(process.cwd(), 'posts');
const currentPostFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
const currentSlugSet = new Set(currentPostFiles.map(f => f.replace(/\.md$/, '')));

// Read redirects to verify coverage for any changed slugs
const redirectsPath = path.join(process.cwd(), 'public', '_redirects');
const redirectMap = new Map();
if (fs.existsSync(redirectsPath)) {
  const content = fs.readFileSync(redirectsPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      let from = parts[0].toLowerCase().replace(/\/$/, '');
      let to = parts[1];
      redirectMap.set(from, to);
    }
  });
}

let missingWithoutRedirect = 0;
let errors = [];

// 1. Guard against silent deletion or renaming of published slugs
for (const [slug, info] of Object.entries(publishedSlugs)) {
  if (!currentSlugSet.has(slug)) {
    const blogPath = `/blog/${slug}`;
    if (!redirectMap.has(blogPath)) {
      errors.push(`CRITICAL: Published slug '${slug}' was removed or renamed without a 301 redirect in public/_redirects!`);
      missingWithoutRedirect++;
    } else {
      const dest = redirectMap.get(blogPath);
      if (!dest.endsWith('/')) {
        errors.push(`WARNING: Redirect destination for '${slug}' (${dest}) is missing trailing slash.`);
      }
    }
  }
}

// 2. Validate frontmatter slug field consistency for all current posts
for (const file of currentPostFiles) {
  const filePath = path.join(postsDir, file);
  const slugFromFilename = file.replace(/\.md$/, '');
  const content = fs.readFileSync(filePath, 'utf8');

  try {
    const { data } = matter(content);
    if (data.slug && data.slug !== slugFromFilename) {
      errors.push(`SLUG MISMATCH: In ${file}, frontmatter slug '${data.slug}' does not match filename '${slugFromFilename}'!`);
    }
  } catch (e) {
    errors.push(`PARSE ERROR: Could not parse frontmatter in ${file}: ${e.message}`);
  }
}

if (errors.length > 0) {
  console.error('\n🚨 SLUG IMMUTABILITY GUARD FAILED:');
  errors.forEach(err => console.error(`  - ${err}`));
  if (missingWithoutRedirect > 0) {
    console.error(`\n❌ Build halted: ${missingWithoutRedirect} published slug(s) changed without required permanent redirects.`);
    process.exit(1);
  }
}

console.log(`✅ Verified ${Object.keys(publishedSlugs).length} published slugs against deletion/renaming.`);
console.log('✅ Slug immutability guard passed.');
