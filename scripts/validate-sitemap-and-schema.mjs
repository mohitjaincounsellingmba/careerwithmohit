import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

console.log('🔍 Validating sitemap.xml and JSON-LD schemas ...');

// 1. Sitemap Validation
const sitemapPath = path.join(process.cwd(), 'out', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('❌ out/sitemap.xml not found!');
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const urlMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

console.log(`\nSitemap contains ${urlMatches.length} URLs.`);

let sitemapErrors = [];
const redirectMap = new Set();
const redirectsCsv = fs.readFileSync(path.join(process.cwd(), 'REDIRECT_MAP.csv'), 'utf8');
redirectsCsv.split('\n').forEach(line => {
  const parts = line.split(',');
  if (parts.length >= 2) redirectMap.add(parts[0].trim());
});

urlMatches.forEach(url => {
  // Check protocol
  if (!url.startsWith('https://careerwithmohit.online/')) {
    sitemapErrors.push(`Invalid domain or protocol in sitemap: ${url}`);
  }
  // Check trailing slash
  if (!url.endsWith('/')) {
    sitemapErrors.push(`Missing trailing slash in sitemap URL: ${url}`);
  }
  // Check if URL is in redirect sources
  if (redirectMap.has(url) || redirectMap.has(url.slice(0, -1))) {
    sitemapErrors.push(`Redirected URL present in sitemap: ${url}`);
  }
});

if (sitemapErrors.length === 0) {
  console.log('✅ sitemap.xml validation: 100% PASS (Zero www, zero HTTP, zero missing slashes, zero redirected URLs).');
} else {
  console.error(`❌ sitemap.xml errors found (${sitemapErrors.length}):`);
  console.error(sitemapErrors.slice(0, 10));
}

// Check key ranking URLs in sitemap
const checkUrls = [
  'https://careerwithmohit.online/',
  'https://careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2026/',
  'https://careerwithmohit.online/blog/top-healthcare-management-colleges-india-2026/',
  'https://careerwithmohit.online/blog/cat-2026-whatsapp-group-links-top-coaching/',
  'https://careerwithmohit.online/blog/how-to-recover-college-fee-refund-legal-action/',
  'https://careerwithmohit.online/blog/btech-colleges-under-5-lakhs-budget-2026/',
  'https://careerwithmohit.online/blog/jaypee-noida-jiit-btech-admission-2026-fees-cutoff/',
  'https://careerwithmohit.online/blog/bba-colleges-without-maths-eligibility-2026/',
  'https://careerwithmohit.online/blog/direct-admission-mnit-jaipur-btech-2026/',
  'https://careerwithmohit.online/blog/bihar-student-credit-card-mba-colleges/',
  'https://careerwithmohit.online/blog/daiict-gandhinagar-btech-admission-2026-fees-cutoff-review/',
  'https://careerwithmohit.online/blog/central-university-list-india-2026-state-wise/',
  'https://careerwithmohit.online/blog/top-mca-colleges-hyderabad-2026/'
];

console.log('\nChecking Ranking Canonical URLs in sitemap.xml:');
checkUrls.forEach(u => {
  const present = urlMatches.includes(u);
  console.log(`  ${present ? '✅' : '❌'} ${u}`);
});

// 2. JSON-LD Validation on 5 sample posts including recovered posts
const testPosts = [
  'blog/fee-refund-policy-aicte-ugc-2026',
  'blog/top-healthcare-management-colleges-india-2026',
  'blog/cat-2026-whatsapp-group-links-top-coaching',
  'blog/how-to-recover-college-fee-refund-legal-action',
  'blog/btech-colleges-under-5-lakhs-budget-2026'
];

console.log('\nValidating JSON-LD Schemas on Sample Posts:');
testPosts.forEach(p => {
  const htmlPath = path.join(process.cwd(), 'out', p, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    console.error(`Missing HTML file: ${htmlPath}`);
    return;
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html);

  const jsonLdScripts = $('script[type="application/ld+json"]');
  console.log(`\n📄 Post: /${p}/ (${jsonLdScripts.length} schema blocks found)`);

  jsonLdScripts.each((idx, el) => {
    try {
      const data = JSON.parse($(el).html());
      const type = data['@type'];
      console.log(`   [Block ${idx + 1}] @type: ${type} - VALID JSON`);
      if (type === 'BlogPosting') {
        console.log(`      Headline: ${data.headline}`);
        console.log(`      DatePublished: ${data.datePublished}`);
        console.log(`      Author: ${data.author?.name}`);
        console.log(`      URL: ${data.mainEntityOfPage?.['@id']}`);
      }
    } catch (e) {
      console.error(`   [Block ${idx + 1}] ❌ Invalid JSON-LD: ${e.message}`);
    }
  });
});
