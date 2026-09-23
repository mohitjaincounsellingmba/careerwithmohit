import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'posts');

if (!fs.existsSync(POSTS_DIR)) {
  console.error('Posts directory not found');
  process.exit(1);
}

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
console.log(`Auditing ${files.length} posts for plagiarism markers, broken descriptions, and mismatched keywords...`);

let competitorRemnantsCount = 0;
let truncatedDescCount = 0;
let mismatchedKeywordsCount = 0;

for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  const slug = file.replace(/\.md$/, '');

  let modified = false;

  // 1. Check for competitor remnants
  let content = parsed.content;
  const originalContent = content;

  content = content.replace(/\r?\n\r?\nSource:\s*Shiksha\.com.*$/gim, '');
  content = content.replace(/\r?\nSource:\s*Shiksha\.com.*$/gim, '');
  content = content.replace(/^Source:\s*.*(Shiksha|Careers360|Collegedunia|CollegeDekho).*$/gim, '');
  content = content.replace(/^\*Source:\s*.*(Shiksha|Careers360|Collegedunia|CollegeDekho).*$/gim, '');
  content = content.replace(/For more insights on online universities and courses, explore \[Online Shiksha\]\(https:\/\/onlineshiksha\.online\/\)\.?/gim, '');
  content = content.replace(/Source:\s*IIT Roorkee \(jeeadv\.ac\.in\), Indian Express, Careers360/gim, 'Source: Official Exam Portal (jeeadv.ac.in) and National Admissions Authority');

  if (content !== originalContent) {
    parsed.content = content;
    competitorRemnantsCount++;
    modified = true;
  }

  // 2. Check for truncated or generic descriptions
  if (parsed.data.description) {
    const desc = String(parsed.data.description).trim();
    if (desc.endsWith('under GGSIPU,') || desc.endsWith('private univer') || desc.endsWith('under') || desc.length < 35 || desc.endsWith(',')) {
      // Regenerate clean description from title & category
      const title = parsed.data.title || slug.replace(/-/g, ' ');
      const cleanTitle = title.replace(/[#*`_>\[\]]/g, '').trim();
      parsed.data.description = `Comprehensive expert analysis and 2026-2027 admission guide for ${cleanTitle}. Check updated fees, placement records, real cutoffs, and selection tips by Mohit Jain.`;
      truncatedDescCount++;
      modified = true;
    }
  }

  // 3. Clean mismatched keywords if Delhi NCR keywords are present in non-Delhi NCR articles
  if (Array.isArray(parsed.data.keywords)) {
    const isDelhiArticle = slug.includes('delhi') || 
                           slug.includes('noida') || 
                           slug.includes('gurgaon') || 
                           slug.includes('ghaziabad') || 
                           slug.includes('faridabad') || 
                           slug.includes('ggsipu') || 
                           (parsed.data.title && /delhi|noida|gurgaon|ghaziabad|faridabad|ggsipu/i.test(parsed.data.title));

    if (!isDelhiArticle) {
      const originalKwCount = parsed.data.keywords.length;
      parsed.data.keywords = parsed.data.keywords.filter(kw => {
        const kwLower = String(kw).toLowerCase();
        return !kwLower.includes('delhi ncr') && 
               !kwLower.includes('delhi admissions') && 
               !kwLower.includes('noida colleges') && 
               !kwLower.includes('best colleges in delhi') && 
               !kwLower.includes('delhi colleges');
      });

      if (parsed.data.keywords.length !== originalKwCount) {
        mismatchedKeywordsCount++;
        modified = true;
      }
    }
  }

  if (modified) {
    const updatedRaw = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, updatedRaw, 'utf8');
  }
}

console.log(`\nAudit & Cleanup Complete:`);
console.log(`- Competitor remnants removed from: ${competitorRemnantsCount} files`);
console.log(`- Truncated descriptions repaired in: ${truncatedDescCount} files`);
console.log(`- Mismatched keywords sanitized in: ${mismatchedKeywordsCount} files`);
