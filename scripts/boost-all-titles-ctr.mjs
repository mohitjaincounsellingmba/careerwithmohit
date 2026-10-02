import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'posts');

if (!fs.existsSync(POSTS_DIR)) {
  console.error('Posts directory not found');
  process.exit(1);
}

console.log('========================================================================');
console.log('🚀 HIGH-CONVERTING META TITLE & SNIPPET CTR UPGRADER');
console.log('========================================================================\n');

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
let upgradedCount = 0;
let bbaUpgrades = 0;
let mbaUpgrades = 0;
let mockUpgrades = 0;

for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);

  if (!parsed.data.title) continue;

  let title = String(parsed.data.title).trim();
  let description = parsed.data.description ? String(parsed.data.description).trim() : '';
  const originalTitle = title;
  const originalDesc = description;

  // 1. Specific High-Converting BBA Title Upgrades
  if (/^top\s+(?:10\s+|15\s+)?bba\s+colleges\s+in\s+delhi\s+ncr/i.test(title)) {
    title = 'Top 15 BBA Colleges in Delhi NCR (2026-27): Real Fees, Cutoffs & Direct Admission';
    description = 'Complete 2026-2027 guide to the top BBA colleges in Delhi NCR. Compare real tuition fees, average placement packages, CUET cutoffs, and direct admission eligibility.';
    bbaUpgrades++;
  } else if (/^bba\s+colleges\s+in\s+delhi\s+ncr\s+fees\s+and\s+placement/i.test(title)) {
    title = 'Top 15 BBA Colleges in Delhi NCR (2026-27): Real Fees, Cutoffs & Direct Admission';
    description = 'Complete 2026-2027 guide to top BBA colleges in Delhi NCR. Compare verified fee structures, highest & average placement salaries, and direct admission process.';
    bbaUpgrades++;
  } else if (/^best\s+affordable\s+bba\s+colleges\s+delhi\s+ncr/i.test(title)) {
    title = 'Best Low-Budget BBA Colleges in Delhi NCR (2026-27): Under 3-4 Lakh Fees & Placements';
    bbaUpgrades++;
  } else if (/^top\s+bba\s+colleges\s+delhi\s+2026/i.test(title)) {
    title = 'Top BBA Colleges in Delhi (2026-27): Real Fees, Placements & CUET Cutoffs';
    bbaUpgrades++;
  }

  // 2. Specific High-Converting CAT Score / Percentile Title Upgrades
  if (/cat\s+score\s+calculator\s+online/i.test(title) || /^cat\s+2026\s+score\s+calculator\s+marks\s+vs\s+percentile/i.test(title)) {
    title = 'CAT 2026 Score to Percentile Calculator (Sectional & Scaled) — Instant Result';
    description = 'Free CAT 2026 Score to Percentile Calculator & Response Sheet Checker. Instant raw score calculation, slot-wise scaling, and IIM call predictor for 2027 admissions.';
    mbaUpgrades++;
  }

  // 3. College Review Titles (Add high-CTR hooks: Real Placements, Fees, Cutoffs & Truth)
  if (/\b(review|honest review)\s+(?:2026|2027|2027-29)\b/i.test(title) && !title.includes('Placements') && !title.includes('Cutoff')) {
    title = title.replace(/\b(review|honest review)\s+(?:2026|2027|2027-29)\b/i, 'Review (2026-2027): Real Placements, Fees & Cutoffs');
    mbaUpgrades++;
  }

  // 4. Mock Test Title Upgrades (Add 100% Free Live CBT hooks)
  if (/free\s+(cat|xat|nmat|snap|mat|atma|mhcet)\s+mock\s+test/i.test(title) && !title.includes('Free') && !title.includes('CBT')) {
    title = `[100% Free Live CBT] ${title}`;
    mockUpgrades++;
  }

  // 5. General Title Cleanups
  title = title.replace(/\s+/g, ' ').trim();

  if (title !== originalTitle || description !== originalDesc) {
    parsed.data.title = title;
    if (description !== originalDesc) {
      parsed.data.description = description;
    }
    const updatedRaw = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, updatedRaw, 'utf8');
    upgradedCount++;
  }
}

console.log(`\n🎉 Meta Tag & CTR Title Optimization Summary:`);
console.log(`- BBA Title Upgrades: ${bbaUpgrades}`);
console.log(`- MBA & Tool Title Upgrades: ${mbaUpgrades}`);
console.log(`- Mock Test Title Upgrades: ${mockUpgrades}`);
console.log(`- Total Posts Upgraded: ${upgradedCount}`);
