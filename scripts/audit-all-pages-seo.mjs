import fs from 'fs';
import path from 'path';

function findPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'out' && file !== '.next') {
        findPageFiles(filePath, fileList);
      }
    } else if (file === 'page.tsx' || file === 'page.ts') {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const appDir = path.join(process.cwd(), 'app');
const pages = findPageFiles(appDir);

console.log(`Found ${pages.length} page files to audit...\n`);

const results = [];

for (const pagePath of pages) {
  const relPath = path.relative(process.cwd(), pagePath);
  const content = fs.readFileSync(pagePath, 'utf8');

  const hasMetadata = content.includes('export const metadata') || content.includes('generateMetadata');
  const hasTitle = content.includes('title:');
  const hasDescription = content.includes('description:');
  const hasCanonical = content.includes('canonical') || content.includes('alternates');
  const hasJsonLd = content.includes('<JsonLd') || content.includes('application/ld+json') || content.includes('schema.org');
  const isDynamic = relPath.includes('[slug]') || relPath.includes('[exam]') || relPath.includes('[examSlug]');

  results.push({
    path: relPath,
    hasMetadata,
    hasTitle,
    hasDescription,
    hasCanonical,
    hasJsonLd,
    isDynamic
  });
}

console.log('--- MISSING METADATA OR CANONICALS ---');
let issuesCount = 0;
for (const r of results) {
  if (!r.hasMetadata && !r.path.includes('admin') && !r.path.includes('attempt-skills')) {
    console.log(`❌ Missing metadata: ${r.path}`);
    issuesCount++;
  } else if (r.hasMetadata && !r.hasCanonical && !r.isDynamic && !r.path.includes('admin')) {
    console.log(`⚠️ Missing canonical in metadata: ${r.path}`);
  }
}

if (issuesCount === 0) {
  console.log('✅ All non-admin pages have metadata!');
}

console.log(`\nAudit complete on ${results.length} pages.`);
