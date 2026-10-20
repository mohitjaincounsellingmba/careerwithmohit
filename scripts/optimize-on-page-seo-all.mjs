import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'posts');

if (!fs.existsSync(POSTS_DIR)) {
  console.error('Posts directory not found');
  process.exit(1);
}

function smartTrimDescription(text, max = 158) {
  if (!text) return '';
  let clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const sub = clean.substring(0, max);
  const sentenceEnd = Math.max(sub.lastIndexOf('. '), sub.lastIndexOf('? '), sub.lastIndexOf('! '));
  if (sentenceEnd >= 105) {
    return sub.substring(0, sentenceEnd + 1).trim();
  }

  const clauseEnd = Math.max(sub.lastIndexOf(', '), sub.lastIndexOf('; '));
  if (clauseEnd >= 120) {
    return sub.substring(0, clauseEnd).trim() + '.';
  }

  const lastSpace = sub.lastIndexOf(' ');
  if (lastSpace > 110) {
    return sub.substring(0, lastSpace).trim() + '...';
  }

  return sub.trim() + '...';
}

function cleanBoilerplateDesc(desc, title) {
  if (desc.startsWith('Comprehensive expert analysis and 2026-2027 admission guide for')) {
    const rawSubject = title
      .replace(/:\s*Fees, Placements.*$/i, '')
      .replace(/:\s*Real Placements.*$/i, '')
      .replace(/:\s*The IIM Topper.*$/i, '')
      .replace(/\s*\|\s*CareerWithMohit.*$/i, '')
      .trim();
    const shortSubject = rawSubject.length > 55 ? rawSubject.substring(0, 52) + '...' : rawSubject;
    return `2027 guide for ${shortSubject}: Check fees, verified placement packages, real cutoffs & admission tips with Mohit Jain.`;
  }
  return desc;
}

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
console.log(`Auditing and optimizing on-page SEO across ${files.length} posts...`);

let trimmedDescs = 0;
let fixedTitles = 0;
let fixedH1s = 0;
let totalUpdated = 0;

for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);

  let updated = false;

  // 1. Optimize Title
  if (parsed.data.title) {
    let title = String(parsed.data.title).trim();
    const origTitle = title;

    // Strip trailing brand suffix
    title = title.replace(/\s*\|\s*CareerWithMohit\s*$/i, '');
    // Strip markdown links
    title = title.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    // Strip redundant 'All About '
    title = title.replace(/^all about\s+/i, '');
    // Clean redundant double colons or quotes
    title = title.replace(/^["']|["']$/g, '').replace(/:\s*:/g, ':').trim();

    if (title !== origTitle) {
      parsed.data.title = title;
      fixedTitles++;
      updated = true;
    }
  }

  // 2. Optimize Meta Description (< 160 chars, Google SERP optimal)
  if (parsed.data.description) {
    let desc = String(parsed.data.description).trim();
    const origDesc = desc;

    // First handle boilerplate
    desc = cleanBoilerplateDesc(desc, parsed.data.title || '');

    // Trim smartly to under 160 chars
    desc = smartTrimDescription(desc, 158);

    if (desc !== origDesc) {
      parsed.data.description = desc;
      trimmedDescs++;
      updated = true;
    }
  }

  // 3. Demote any '# ' in markdown body to '## ' to enforce single H1 on page
  if (parsed.content) {
    const origContent = parsed.content;
    // Replace lines starting with "# " (markdown H1) with "## " (markdown H2)
    const fixedContent = parsed.content.replace(/^# ([^\n]+)/gm, '## $1');

    if (fixedContent !== origContent) {
      parsed.content = fixedContent;
      fixedH1s++;
      updated = true;
    }
  }

  if (updated) {
    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, newContent, 'utf8');
    totalUpdated++;
  }
}

console.log('\n======================================================');
console.log('✅ ON-PAGE SEO OPTIMIZATION COMPLETE:');
console.log(`- Meta descriptions optimized (<160 chars): ${trimmedDescs}`);
console.log(`- Titles cleaned (no duplicate brand/links): ${fixedTitles}`);
console.log(`- Content H1s demoted to H2 (single H1 enforced): ${fixedH1s}`);
console.log(`- Total post files improved: ${totalUpdated} / ${files.length}`);
console.log('======================================================\n');
