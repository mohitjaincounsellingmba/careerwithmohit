import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'posts');

if (!fs.existsSync(POSTS_DIR)) {
  console.error('Posts directory not found');
  process.exit(1);
}

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
console.log(`Auditing and optimizing titles across ${files.length} blog posts...`);

let fixedMarkdownLinks = 0;
let fixedAllAbout = 0;
let updatedYearCount = 0;
let cleanedTitleCount = 0;

for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);

  if (!parsed.data.title) continue;

  let title = String(parsed.data.title).trim();
  const originalTitle = title;

  // 1. Strip markdown links inside title: [College Name](/colleges/xyz) -> College Name
  if (/\[([^\]]+)\]\([^)]+\)/.test(title)) {
    title = title.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    fixedMarkdownLinks++;
  }

  // 2. Remove weak "All About" prefixes and replace with strong search intent
  if (/^all about\s+/i.test(title)) {
    title = title.replace(/^all about\s+/i, '');
    // Capitalize first character if needed
    title = title.charAt(0).toUpperCase() + title.slice(1);
    fixedAllAbout++;
  }

  // 3. Fix outdated years: (2025-2026) -> (2026-2027), 2025 -> 2026 where relevant
  if (/\(2025-2026\)/.test(title)) {
    title = title.replace(/\(2025-2026\)/g, '(2026-2027)');
    updatedYearCount++;
  } else if (/Review 2025\b/.test(title)) {
    title = title.replace(/Review 2025\b/g, 'Review 2026');
    updatedYearCount++;
  }

  // 4. Clean any weird extra quotes or double colons
  title = title.replace(/^["']|["']$/g, '').replace(/:\s*:/g, ':').trim();

  if (title !== originalTitle) {
    parsed.data.title = title;
    const updatedRaw = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, updatedRaw, 'utf8');
    cleanedTitleCount++;
  }
}

console.log(`\nTitle Optimization Complete:`);
console.log(`- Cleaned Markdown links in titles: ${fixedMarkdownLinks}`);
console.log(`- Replaced weak 'All About' prefixes: ${fixedAllAbout}`);
console.log(`- Updated outdated year strings: ${updatedYearCount}`);
console.log(`- Total titles upgraded: ${cleanedTitleCount}`);
