const fs = require('fs');
const path = require('path');

const postsDir = path.join(process.cwd(), 'posts');
const redirectsFile = path.join(process.cwd(), 'public', '_redirects');

const filesBefore = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
console.log('Total files before cleanup:', filesBefore.length);

const deletedFiles = [];
const redirectMap = new Map(); // deletedSlug -> targetSlug

function scheduleDelete(filename, canonicalSlug = null) {
  if (fs.existsSync(path.join(postsDir, filename))) {
    deletedFiles.push(filename);
    const slug = filename.replace(/\.md$/, '');
    if (canonicalSlug) {
      redirectMap.set(`/blog/${slug}`, `/blog/${canonicalSlug}`);
    } else {
      redirectMap.set(`/blog/${slug}`, `/blog`);
    }
  }
}

// 1. Exact Duplicate Collision: Nirma University
scheduleDelete(
  'nirma-university-ahmedabad-mba-review-2027-fees-placements-cutoff.md',
  'nirma-institute-of-management-mba-review-2027-fees-placements-cutoff'
);

// 2. Synthetic Franchise City Pages (216 files)
filesBefore.forEach(f => {
  const isSynthetic = 
    (/^all-about-(amity|galgotias|lal-bahadur-shastri|national|sharda|suryadatta|symbiosis|xavier)-/.test(f) ||
     /^all-about-international-[a-z]+-(graduate|institute|business|school)/.test(f)) && 
    !['all-about-amity-mumbai.md', 'all-about-galgotias-university.md', 'all-about-sharda-university.md', 'all-about-symbiosis-mba-institutes.md', 'all-about-xavier-institute-of-management-entrepreneurship-chennai.md', 'all-about-xavier-institute-of-management-entrepreneurship-kochi.md'].includes(f);

  if (isSynthetic) {
    scheduleDelete(f, null); // Redirect to /blog
  }
});

// 3. Redundant Overlapping College Review Files -> Canonical
const collegeDups = [
  { del: 'all-about-accurate-greater-noida.md', target: 'accurate-greater-noida-review-2026' },
  { del: 'all-about-alliance-university-bangalore.md', target: 'alliance-university-bangalore-review-2026' },
  { del: 'alliance-bangalore-review-2026.md', target: 'alliance-university-bangalore-review-2026' },
  { del: 'all-about-amity-mumbai.md', target: 'amity-mumbai-review-2026' },
  { del: 'all-about-amity-university-noida-bba-admission-2026.md', target: 'amity-university-noida-review-2026' },
  { del: 'all-about-atlas-skilltech-mumbai.md', target: 'atlas-skilltech-mumbai-review-2026' },
  { del: 'all-about-christ-university-bangalore.md', target: 'christ-university-bangalore-review-2026' },
  { del: 'all-about-delhi-school-of-business.md', target: 'delhi-school-of-business-review-2026' },
  { del: 'all-about-dsb-delhi.md', target: 'delhi-school-of-business-review-2026' },
  { del: 'all-about-delhi-school-of-business-vips-tc.md', target: 'delhi-school-of-business-review-2026' },
  { del: 'all-about-fiib-delhi.md', target: 'fiib-delhi-review-2027' },
  { del: 'all-about-fiib.md', target: 'fiib-delhi-review-2027' },
  { del: 'all-about-fortune-institute-of-international-business.md', target: 'fiib-delhi-review-2027' },
  { del: 'all-about-fms-irm-jaipur.md', target: 'fms-irm-jaipur-review-2026' },
  { del: 'all-about-fore-school-delhi.md', target: 'fore-school-delhi-review-2026' },
  { del: 'all-about-gibs-bangalore.md', target: 'gibs-bangalore-review-2026' },
  { del: 'all-about-gniot-greater-noida.md', target: 'gniot-greater-noida-review-2026' },
  { del: 'all-about-gniot-institute-of-management-studies-gims.md', target: 'gniot-greater-noida-review-2026' },
  { del: 'all-about-gniot-mba-institute-greater-noida.md', target: 'gniot-greater-noida-review-2026' },
  { del: 'all-about-hierank-noida.md', target: 'hierank-noida-review-2026' },
  { del: 'all-about-iba-bangalore.md', target: 'iba-bangalore-review-2026' },
  { del: 'all-about-ibi-greater-noida.md', target: 'ibi-greater-noida-review-2026' },
  { del: 'all-about-iibs-bangalore.md', target: 'iibs-bangalore-review-2026' },
  { del: 'all-about-iiebm-pune.md', target: 'iiebm-pune-review-2025' },
  { del: 'all-about-iilm-greater-noida.md', target: 'iilm-greater-noida-review-2026' },
  { del: 'all-about-iilm-gurgaon.md', target: 'iilm-gurgaon-review-2026' },
  { del: 'all-about-iim-ahmedabad.md', target: 'iim-ahmedabad-review-2026' },
  { del: 'all-about-iim-calcutta.md', target: 'iim-calcutta-review-2026' },
  { del: 'all-about-isbr-bangalore.md', target: 'isbr-bangalore-review-2026' },
  { del: 'all-about-isme-bangalore.md', target: 'isme-bangalore-review-2026' },
  { del: 'all-about-isms-pune.md', target: 'isms-pune-review-2025' },
  { del: 'all-about-its-ghaziabad.md', target: 'its-ghaziabad-review-2026' },
  { del: 'all-about-jagsom-bangalore.md', target: 'jagsom-bangalore-review-2026' },
  { del: 'all-about-jaipuria-noida.md', target: 'jaipuria-noida-review-2027' },
  { del: 'all-about-jaipuria-school-of-business-ghaziabad.md', target: 'jaipuria-school-of-business-ghaziabad-review-2026' },
  { del: 'all-about-jims-kalkaji.md', target: 'jims-kalkaji-review-2026' },
  { del: 'all-about-lexicon-management-institute-of-leadership-excellence.md', target: 'aissms-lexicon-management-institute-pune-review-2026' },
  { del: 'all-about-lloyd-business-school-greater-noida.md', target: 'lloyd-greater-noida-review-2026' },
  { del: 'all-about-lloyd-business-school.md', target: 'lloyd-greater-noida-review-2026' },
  { del: 'all-about-mangalmay-greater-noida.md', target: 'mangalmay-greater-noida-review-2026' },
  { del: 'all-about-mangalmay-group.md', target: 'mangalmay-greater-noida-review-2026' },
  { del: 'all-about-meri-delhi.md', target: 'meri-delhi-review-2026' },
  { del: 'all-about-management-education-research-institute-meri.md', target: 'meri-delhi-review-2026' },
  { del: 'mit-wpu-pune-review-2025.md', target: 'mit-wpu-pune-review-2026' },
  { del: 'all-about-new-delhi-institute-of-management.md', target: 'all-about-ndim-delhi' },
  { del: 'all-about-niet-greater-noida.md', target: 'niet-greater-noida-review-2026' },
  { del: 'all-about-niu-greater-noida.md', target: 'niu-greater-noida-review-2026' },
  { del: 'all-about-pibm-pune.md', target: 'pibm-pune-review-2026' },
  { del: 'all-about-riim-pune.md', target: 'riim-pune-review-2026' },
  { del: 'all-about-rvim-bangalore.md', target: 'rvim-bangalore-review-2026' },
  { del: 'all-about-rv-institute-of-management.md', target: 'rvim-bangalore-review-2026' },
  { del: 'all-about-scmhrd-pune.md', target: 'scmhrd-pune-review-2026' },
  { del: 'all-about-sibm-bangalore.md', target: 'sibm-bangalore-review-2026' },
  { del: 'all-about-sibm-pune.md', target: 'sibm-pune-review-2026' },
  { del: 'all-about-sparsh-global-business-school.md', target: 'sparsh-global-greater-noida-review-2026' },
  { del: 'all-about-sparsh-global-greater-noida.md', target: 'sparsh-global-greater-noida-review-2026' },
  { del: 'all-about-taxila-jaipur.md', target: 'taxila-jaipur-review-2026' },
  { del: 'all-about-universal-ai-mumbai.md', target: 'universal-ai-mumbai-review-2026' },
  { del: 'all-about-welingkar-bangalore.md', target: 'welingkar-bangalore-review-2026' },
  { del: 'all-about-xime-bangalore.md', target: 'xime-bangalore-review-2026' },
];

collegeDups.forEach(({ del, target }) => {
  scheduleDelete(del, target);
});

// Perform actual deletion
console.log('Files to delete count:', deletedFiles.length);

for (const file of deletedFiles) {
  const p = path.join(postsDir, file);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
  }
}

// Append redirects to _redirects
let existingRedirects = fs.readFileSync(redirectsFile, 'utf8');
let newRedirectRules = [];

for (const [fromUrl, toUrl] of redirectMap.entries()) {
  // avoid adding duplicate rules
  if (!existingRedirects.includes(`${fromUrl} `) && !existingRedirects.includes(`${fromUrl}/ `)) {
    newRedirectRules.push(`${fromUrl} ${toUrl} 301`);
    newRedirectRules.push(`${fromUrl}/ ${toUrl} 301`);
  }
}

if (newRedirectRules.length > 0) {
  const updatedRedirects = existingRedirects.trimEnd() + '\n\n# Blog Deduplication Cleanup 301 Redirects\n' + newRedirectRules.join('\n') + '\n';
  fs.writeFileSync(redirectsFile, updatedRedirects, 'utf8');
  console.log(`Added ${newRedirectRules.length} redirect rules to public/_redirects`);
}

const filesAfter = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
console.log('Total files after cleanup:', filesAfter.length);

fs.writeFileSync(path.join(process.cwd(), 'scratch', 'cleanup_log.json'), JSON.stringify({
  totalBefore: filesBefore.length,
  totalAfter: filesAfter.length,
  totalDeleted: deletedFiles.length,
  deletedFiles,
  redirectsAddedCount: newRedirectRules.length
}, null, 2));

console.log('Cleanup execution completed successfully.');
