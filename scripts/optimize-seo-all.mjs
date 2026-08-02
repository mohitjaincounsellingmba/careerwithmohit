import { execSync } from 'child_process';
import path from 'path';

const seoScripts = [
  'optimize-sitewide-metadata.mjs',
  'optimize-all-blogs-seo.mjs',
  'optimize-delhi-ncr-seo.mjs',
  'optimize-mock-test-seo.mjs',
  'optimize-internal-links.mjs'
];

console.log('🚀 Starting Comprehensive SEO Optimization for All Blogs & Pages...\n');

for (const script of seoScripts) {
  const scriptPath = path.join(process.cwd(), 'scripts', script);
  console.log(`\n======================================================`);
  console.log(`Executing: ${script}`);
  console.log(`======================================================`);
  try {
    execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
    console.log(`✅ Successfully finished: ${script}\n`);
  } catch (err) {
    console.error(`❌ Error executing ${script}:`, err.message);
  }
}

console.log('\n✨ All SEO optimizations completed successfully across all blogs and pages!');
