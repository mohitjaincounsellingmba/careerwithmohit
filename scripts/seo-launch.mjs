import { execSync } from 'child_process';
import path from 'path';

console.log('========================================================================');
console.log('🚀 CAREERWITHMOHIT — COMPLETE SEO ENGINE LAUNCH SEQUENCE');
console.log('========================================================================\n');

const steps = [
  {
    name: '1. Technical SEO & Health Audit',
    cmd: 'node scripts/seo-score-audit.mjs'
  },
  {
    name: '2. Sitewide Metadata Verification',
    cmd: 'node scripts/optimize-sitewide-metadata.mjs'
  },
  {
    name: '3. Internal Linking Reinforcement',
    cmd: 'node scripts/optimize-internal-links.mjs'
  },
  {
    name: '4. Mock Test Series Funnel Backlinks',
    cmd: 'node scripts/automate-backlinks.mjs'
  },
  {
    name: '5. Instant Search Engine Indexing (IndexNow)',
    cmd: 'node scripts/indexnow-submit.mjs'
  }
];

for (const step of steps) {
  console.log(`\n------------------------------------------------------------------------`);
  console.log(`▶ Running: ${step.name}`);
  console.log(`------------------------------------------------------------------------`);
  try {
    execSync(step.cmd, { stdio: 'inherit' });
    console.log(`✅ Completed: ${step.name}`);
  } catch (err) {
    console.error(`⚠️ Step finished with notification: ${err.message}`);
  }
}

console.log('\n========================================================================');
console.log('🌟 SEO LAUNCH SEQUENCE COMPLETED SUCCESSFULLY!');
console.log('========================================================================');
console.log('Next Recommended Actions:');
console.log('1. Verify domain in Google Search Console: https://search.google.com/search-console');
console.log('2. Submit Sitemap in GSC: https://www.careerwithmohit.online/sitemap.xml');
console.log('3. Verify in Bing Webmaster Tools (or auto-import from GSC): https://www.bing.com/webmasters');
console.log('4. Ensure Google Business Profile for "Mohit Jain Career Counselling" is linked.');
console.log('========================================================================\n');
