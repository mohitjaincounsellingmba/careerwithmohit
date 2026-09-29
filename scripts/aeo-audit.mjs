import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'posts');

function auditPostAEO(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(content);

  const checks = {
    hasKeyTakeaways: false,
    hasFaqSchema: false,
    faqCount: 0,
    hasRoiTable: false,
    hasAnswerFirstHeaders: false,
    hasHowToOrStepGuide: false,
    score: 0,
    recommendations: []
  };

  // 1. Check for AI Answer Summary Block
  if (/key takeaways|ai answer summary|direct ai answer|💡|🤖/i.test(body)) {
    checks.hasKeyTakeaways = true;
    checks.score += 25;
  } else {
    checks.recommendations.push("Add a '> 💡 **Key Takeaways (Direct AI Answer Summary)**' block below H1.");
  }

  // 2. Check for FAQ in Frontmatter
  if (data.faqs && Array.isArray(data.faqs) && data.faqs.length >= 3) {
    checks.hasFaqSchema = true;
    checks.faqCount = data.faqs.length;
    checks.score += 25;
  } else {
    checks.recommendations.push("Add at least 3-5 conversational Q&A pairs in frontmatter `faqs:`.");
  }

  // 3. Check for High-Density Fact / ROI Table
  if (/\|.*\|.*\|/i.test(body) && /fee|ctc|placement|cutoff|eligibility/i.test(body)) {
    checks.hasRoiTable = true;
    checks.score += 25;
  } else {
    checks.recommendations.push("Include a 4-column structured Fee vs Average Package ROI table.");
  }

  // 4. Check for Q-to-A Answer-First Headings (H2 with question and immediate bold answer)
  const questionH2s = body.match(/^##\s+.*\?/gm) || [];
  if (questionH2s.length > 0) {
    // Check if there is bold text immediately following the question heading
    const hasBoldAnswer = /^##\s+.*\?\s*\n+\s*\*\*.*\*\*/m.test(body);
    if (hasBoldAnswer) {
      checks.hasAnswerFirstHeaders = true;
      checks.score += 25;
    } else {
      checks.recommendations.push("Ensure question H2 headers (e.g. '## What is...') are immediately followed by a bold 40-50 word direct answer.");
    }
  } else {
    checks.recommendations.push("Formulate at least 1-2 H2 headings as natural conversational questions (e.g. '## What is the CAT Cutoff for...?').");
  }

  return {
    slug: path.basename(filePath, '.md'),
    title: data.title || path.basename(filePath, '.md'),
    ...checks
  };
}

export function runAeoAudit() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error("Posts directory not found:", POSTS_DIR);
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  console.log(`\n🔍 Auditing ${files.length} blog posts for Answer Engine Optimization (AEO)...\n`);

  let totalScore = 0;
  let perfectCount = 0;
  let goodCount = 0;
  let needsWorkCount = 0;

  const results = [];

  for (const file of files) {
    const res = auditPostAEO(path.join(POSTS_DIR, file));
    results.push(res);
    totalScore += res.score;
    if (res.score >= 90) perfectCount++;
    else if (res.score >= 60) goodCount++;
    else needsWorkCount++;
  }

  const avgScore = Math.round(totalScore / files.length);

  console.log(`========================================`);
  console.log(`🎯 AEO READINESS AUDIT SUMMARY`);
  console.log(`========================================`);
  console.log(`Total Articles Analyzed : ${files.length}`);
  console.log(`Average AEO Score       : ${avgScore}/100`);
  console.log(`🟢 AEO Ready (90-100%)  : ${perfectCount}`);
  console.log(`🟡 Good (60-89%)        : ${goodCount}`);
  console.log(`🔴 Needs Optimization   : ${needsWorkCount}`);
  console.log(`========================================\n`);

  // Print sample recommendations for top 5 needs-work posts
  const toImprove = results.filter(r => r.score < 60).slice(0, 5);
  if (toImprove.length > 0) {
    console.log(`📋 Sample Action Items for Lower-Scoring Posts:`);
    for (const item of toImprove) {
      console.log(`\n• [${item.score}/100] ${item.slug}`);
      item.recommendations.forEach(rec => console.log(`   └─ ${rec}`));
    }
  }
}

runAeoAudit();
