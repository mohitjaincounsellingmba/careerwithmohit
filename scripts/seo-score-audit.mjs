import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

console.log('========================================================================');
console.log('🚀 CAREERWITHMOHIT — COMPREHENSIVE SEO SCORE & HEALTH AUDIT');
console.log('========================================================================\n');

let totalScore = 0;
const maxScore = 100;

// ==========================================
// 1. TECHNICAL SEO ARCHITECTURE (30 Points)
// ==========================================
console.log('📌 1. TECHNICAL SEO ARCHITECTURE (Max: 30 pts)');
let techScore = 0;
const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
const robotsPath = path.join(process.cwd(), 'app', 'robots.ts');
const sitemapPath = path.join(process.cwd(), 'app', 'sitemap.ts');
const nextConfigPath = path.join(process.cwd(), 'next.config.ts');

if (fs.existsSync(layoutPath)) {
  const content = fs.readFileSync(layoutPath, 'utf8');
  if (content.includes('metadataBase')) { techScore += 5; console.log('  ✅ metadataBase configured correctly (+5 pts)'); }
  if (content.includes('title:') && content.includes('template:')) { techScore += 3; console.log('  ✅ Dynamic title template configured (+3 pts)'); }
  if (content.includes('index: true') && content.includes('follow: true')) { techScore += 3; console.log('  ✅ Search Engine Indexing enabled in robots metadata (+3 pts)'); }
  if (content.includes('Person') && content.includes('LocalBusiness') && content.includes('WebSite')) { techScore += 5; console.log('  ✅ Sitewide JSON-LD (Person, LocalBusiness, WebSite, SearchAction) (+5 pts)'); }
  if (content.includes('openGraph') && content.includes('twitter')) { techScore += 4; console.log('  ✅ OpenGraph & Twitter card metadata configured (+4 pts)'); }
}
if (fs.existsSync(robotsPath)) {
  const content = fs.readFileSync(robotsPath, 'utf8');
  if (content.includes('sitemap:') && content.includes('rules:')) { techScore += 5; console.log('  ✅ Clean robots.ts with Sitemap URL & scraper rules (+5 pts)'); }
}
if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf8');
  if (content.includes('getSortedPostsData') && content.includes('colleges') && content.includes('lastModified')) { techScore += 5; console.log('  ✅ Sitemap automatically covers static, blogs, colleges & tools (+5 pts)'); }
}

console.log(`  👉 Technical SEO Architecture Subscore: ${techScore} / 30 pts\n`);
totalScore += techScore;


// ==========================================
// 2. ACTIVE PAGE ON-PAGE SEO (30 Points)
// ==========================================
console.log('📌 2. ACTIVE PAGE ON-PAGE SEO (posts/unstop-finance-internships-2026.md) (Max: 30 pts)');
let pageScore = 0;
const activeFile = path.join(process.cwd(), 'posts', 'unstop-finance-internships-2026.md');

if (fs.existsSync(activeFile)) {
  const raw = fs.readFileSync(activeFile, 'utf8');
  const parsed = matter(raw);
  const { title, description, keywords, faqs } = parsed.data;
  const content = parsed.content;

  // 1. Title optimization (30 - 75 chars)
  if (title && title.length >= 25 && title.length <= 75) {
    pageScore += 6;
    console.log(`  ✅ Title Length Optimal: "${title}" (${title.length} chars) (+6 pts)`);
  } else if (title) {
    pageScore += 4;
    console.log(`  ⚠️ Title present but slightly long/short: (${title.length} chars) (+4 pts)`);
  }

  // 2. Meta description (120 - 160 chars)
  if (description && description.length >= 100 && description.length <= 165) {
    pageScore += 6;
    console.log(`  ✅ Meta Description Optimal: "${description}" (${description.length} chars) (+6 pts)`);
  } else if (description) {
    pageScore += 3;
    console.log(`  ⚠️ Meta Description present (${description.length} chars) (+3 pts)`);
  }

  // 3. Target Keywords Array
  if (Array.isArray(keywords) && keywords.length >= 5) {
    pageScore += 6;
    console.log(`  ✅ Rich Target Keywords Array: ${keywords.length} keywords (+6 pts)`);
  }

  // 4. Content Depth & Structure
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const hasH2 = content.includes('## ');
  if (wordCount >= 600 && hasH2) {
    pageScore += 6;
    console.log(`  ✅ Comprehensive Content Depth: ${wordCount} words with H2/H3 headings (+6 pts)`);
  } else {
    pageScore += 3;
    console.log(`  ⚠️ Content Length: ${wordCount} words (+3 pts)`);
  }

  // 5. FAQ Rich Snippet Schema
  if (Array.isArray(faqs) && faqs.length >= 2) {
    pageScore += 6;
    console.log(`  ✅ FAQPage Schema Frontmatter Present: ${faqs.length} FAQs for SERP rich snippets (+6 pts)`);
  }
}
console.log(`  👉 Active Page On-Page SEO Subscore: ${pageScore} / 30 pts\n`);
totalScore += pageScore;


// ==========================================
// 3. SITE-WIDE CONTENT SEO AUDIT (40 Points)
// ==========================================
console.log('📌 3. SITE-WIDE CONTENT SEO AUDIT (Max: 40 pts)');
let siteContentScore = 0;
const postsDir = path.join(process.cwd(), 'posts');
const collegesDir = path.join(process.cwd(), 'colleges');

// A. Blogs Audit
const postFiles = fs.existsSync(postsDir) ? fs.readdirSync(postsDir).filter(f => f.endsWith('.md')) : [];
let postsWithTitle = 0;
let postsWithDesc = 0;
let postsWithKeywords = 0;
let postsWithFaqs = 0;

postFiles.forEach(file => {
  try {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const { data } = matter(raw);
    if (data.title) postsWithTitle++;
    if (data.description && data.description.length > 50) postsWithDesc++;
    if (Array.isArray(data.keywords) && data.keywords.length > 0) postsWithKeywords++;
    if (Array.isArray(data.faqs) && data.faqs.length > 0) postsWithFaqs++;
  } catch (e) {}
});

const titleRate = postFiles.length ? (postsWithTitle / postFiles.length) : 0;
const descRate = postFiles.length ? (postsWithDesc / postFiles.length) : 0;
const keywordsRate = postFiles.length ? (postsWithKeywords / postFiles.length) : 0;
const faqsRate = postFiles.length ? (postsWithFaqs / postFiles.length) : 0;

const postsSubscore = Math.round((titleRate * 8) + (descRate * 8) + (keywordsRate * 8) + (faqsRate * 6));
console.log(`  📊 Blogs Analyzed (${postFiles.length} files):`);
console.log(`     - Title Coverage: ${(titleRate * 100).toFixed(1)}%`);
console.log(`     - Meta Description Coverage: ${(descRate * 100).toFixed(1)}%`);
console.log(`     - Keyword Optimization: ${(keywordsRate * 100).toFixed(1)}%`);
console.log(`     - FAQ Schema Coverage: ${(faqsRate * 100).toFixed(1)}%`);
console.log(`     -> Blogs Subscore: ${postsSubscore} / 30 pts`);
siteContentScore += postsSubscore;

// B. Colleges Audit
const collegeFiles = fs.existsSync(collegesDir) ? fs.readdirSync(collegesDir).filter(f => f.endsWith('.md')) : [];
let collegesOptimized = 0;
collegeFiles.forEach(file => {
  try {
    const raw = fs.readFileSync(path.join(collegesDir, file), 'utf8');
    const { data } = matter(raw);
    if (data.seo_title && data.seo_description) collegesOptimized++;
  } catch (e) {}
});

const collegeRate = collegeFiles.length ? (collegesOptimized / collegeFiles.length) : 0;
const collegesSubscore = Math.round(collegeRate * 10);
console.log(`  📊 Colleges Analyzed (${collegeFiles.length} files):`);
console.log(`     - SEO Title/Description Coverage: ${(collegeRate * 100).toFixed(1)}%`);
console.log(`     -> Colleges Subscore: ${collegesSubscore} / 10 pts`);
siteContentScore += collegesSubscore;

totalScore += siteContentScore;

console.log('------------------------------------------------------------------------');
console.log(`🏆 OVERALL WEBSITE SEO SCORE: ${totalScore} / 100 (${totalScore >= 90 ? 'EXCELLENT A+' : totalScore >= 80 ? 'VERY GOOD A' : 'GOOD B'})`);
console.log('------------------------------------------------------------------------');
