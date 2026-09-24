const fs = require('fs');
const path = require('path');

const postsDir = path.join(process.cwd(), 'posts');
const collegesDir = path.join(process.cwd(), 'colleges');
const redirectsFile = path.join(process.cwd(), 'public', '_redirects');

const allPosts = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
const allColleges = fs.readdirSync(collegesDir).filter(f => f.endsWith('.md'));

console.log('=== STARTING DEEP CLEANUP ===');
console.log('Initial Posts count:', allPosts.length);
console.log('Initial Colleges count:', allColleges.length);

const isDoorwayPost = (f) => {
  if (f.startsWith('cat-2026-exam-preparation-')) return true;
  if (f.startsWith('xat-2027-exam-strategy-')) return true;
  if (f.startsWith('nmat-2026-exam-guide-')) return true;
  if (f.startsWith('best-online-mba-colleges-in-')) return true;
  if (f.startsWith('best-online-bba-colleges-in-')) return true;
  if (f.startsWith('best-online-bca-colleges-in-')) return true;
  if (f.startsWith('best-executive-mba-colleges-in-')) return true;
  if (f.startsWith('bba-colleges-under-5-lakhs-in-')) return true;
  if (f.startsWith('btech-colleges-under-10-lakhs-in-')) return true;
  if (f.startsWith('mba-colleges-under-10-lakhs-in-')) return true;
  if (f.startsWith('low-budget-private-mba-colleges-in-')) return true;
  if (f.startsWith('low-budget-private-bba-colleges-in-')) return true;
  if (f.startsWith('private-mtech-colleges-in-')) return true;
  if (f.startsWith('cuet-ug-mba-colleges-in-')) return true;
  if (f.startsWith('cuet-ug-accepting-mba-colleges-in-')) return true;
  if (/^all-about-(amity|galgotias|lal-bahadur-shastri|national|sharda|suryadatta|symbiosis|xavier)-/.test(f)) {
    if (!['all-about-amity-mumbai.md', 'all-about-galgotias-university.md', 'all-about-symbiosis-mba-institutes.md'].includes(f)) {
      return true;
    }
  }
  return false;
};

const legitimateColleges = [
  'symbiosis-centre-for-management-studies-scms-pune.md',
  'sharda-greater-noida.md',
  'sharda-school-of-business-studies-greater-noida.md',
  'galgotias-university.md',
  'xavier-institute-of-management-entrepreneurship-chennai.md',
  'xavier-institute-of-management-entrepreneurship-kochi.md',
  'suryadatta-institute-of-management.md',
  'suryadatta-institute-of-management-mass-communication.md',
  'lbsim-delhi.md',
  'amity-university-noida.md',
  'amity-university-mumbai.md',
  'amity-noida.md',
  'amity-mumbai.md',
  'international-school-of-business-media-pune.md',
  'international-school-of-business-media-bangalore.md',
  'international-school-of-business-media.md',
  'international-institute-of-business-studies.md',
  'international-institute-of-health-management-research.md',
  'international-school-of-management-patna.md',
  'international-management-and-analytics-school-kolkata.md'
];

const isSyntheticCollege = (f) => {
  if (legitimateColleges.includes(f)) return false;
  return /^(sharda|suryadatta|symbiosis|galgotias|lal-bahadur-shastri|national|xavier|amity|international)-[a-z]+-(school|institute|graduate|business|global)/.test(f);
};

const postsToDelete = allPosts.filter(isDoorwayPost);
const collegesToDelete = allColleges.filter(isSyntheticCollege);

console.log(`Posts to delete: ${postsToDelete.length}`);
console.log(`Colleges to delete: ${collegesToDelete.length}`);

// Collect redirects
const newRedirectMap = new Map();

for (const file of postsToDelete) {
  const p = path.join(postsDir, file);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
  }
  const slug = file.replace(/\.md$/, '');
  newRedirectMap.set(`/blog/${slug}`, `/blog`);
}

for (const file of collegesToDelete) {
  const p = path.join(collegesDir, file);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
  }
  const slug = file.replace(/\.md$/, '');
  newRedirectMap.set(`/colleges/${slug}`, `/colleges`);
}

// Update _redirects
let existingRedirects = fs.existsSync(redirectsFile) ? fs.readFileSync(redirectsFile, 'utf8') : '';
let addedLines = [];

for (const [fromUrl, toUrl] of newRedirectMap.entries()) {
  if (!existingRedirects.includes(`${fromUrl} `) && !existingRedirects.includes(`${fromUrl}/ `)) {
    addedLines.push(`${fromUrl} ${toUrl} 301`);
    addedLines.push(`${fromUrl}/ ${toUrl} 301`);
  }
}

if (addedLines.length > 0) {
  const updatedRedirects = existingRedirects.trimEnd() + '\n\n# Mass Pruning 301 Redirects\n' + addedLines.join('\n') + '\n';
  fs.writeFileSync(redirectsFile, updatedRedirects, 'utf8');
  console.log(`Added ${addedLines.length} 301 redirect rules to public/_redirects`);
}

const postsAfter = fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).length;
const collegesAfter = fs.readdirSync(collegesDir).filter(f => f.endsWith('.md')).length;

console.log('\n=== CLEANUP SUMMARY ===');
console.log(`Remaining High-Value Posts: ${postsAfter}`);
console.log(`Remaining Accredited Colleges: ${collegesAfter}`);
console.log(`Total Pruned Pages: ${postsToDelete.length + collegesToDelete.length}`);
