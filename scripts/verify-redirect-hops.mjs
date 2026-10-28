import fs from 'fs';
import path from 'path';

// Load middleware
// Note: functions/_middleware.ts exports onRequest
// We compile/transpile or simulate the exact logic exported in functions/_middleware.ts
const middlewareCode = fs.readFileSync(path.join(process.cwd(), 'functions', '_middleware.ts'), 'utf8');

// Extract REDIRECT_MAP from middleware code
const mapMatch = middlewareCode.match(/const REDIRECT_MAP: Record<string, string> = (\{[\s\S]*?\});/);
if (!mapMatch) {
  console.error('Could not parse REDIRECT_MAP from functions/_middleware.ts');
  process.exit(1);
}
const REDIRECT_MAP = JSON.parse(mapMatch[1]);

// Cloudflare Pages edge simulation function
function simulateCloudflareEdgeRequest(inputUrl) {
  const hops = [];
  let currentUrl = inputUrl;
  const maxHops = 5;

  while (hops.length < maxHops) {
    const url = new URL(currentUrl);
    const hostname = url.hostname.toLowerCase();
    const pathname = url.pathname;
    const protocol = url.protocol;

    const isStaticAsset =
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/images/') ||
      pathname.startsWith('/brochures/') ||
      pathname.startsWith('/papers/') ||
      pathname.startsWith('/downloads/') ||
      /\.(ico|png|jpg|jpeg|webp|svg|css|js|woff|woff2|ttf|json|xml|txt)$/i.test(pathname);

    if (isStaticAsset) {
      hops.push({ url: currentUrl, status: 200 });
      break;
    }

    const cleanPath = pathname.toLowerCase();
    const normPath = cleanPath.length > 1 && cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;

    let targetPath = REDIRECT_MAP[normPath] || REDIRECT_MAP[cleanPath] || null;

    if (
      !targetPath &&
      (cleanPath.startsWith('/blog/all-about-amity-') ||
       cleanPath.startsWith('/blog/low-budget-bba-') ||
       cleanPath.startsWith('/blog/low-budget-mba-') ||
       cleanPath.startsWith('/blog/private-mtech-'))
    ) {
      if (cleanPath !== '/blog' && cleanPath !== '/blog/') {
        targetPath = '/blog/';
      }
    }

    let finalPath = targetPath || cleanPath;
    if (!finalPath.endsWith('/') && !finalPath.includes('?') && !finalPath.includes('#')) {
      finalPath = finalPath + '/';
    }

    const isApex = hostname === 'careerwithmohit.online' || hostname === 'localhost' || hostname === '127.0.0.1';
    const isHttps = protocol === 'https:';
    const isPathChanged = targetPath !== null || (pathname !== finalPath);

    let redirectUrl = null;

    if (!isApex && hostname.endsWith('careerwithmohit.online')) {
      redirectUrl = `https://careerwithmohit.online${finalPath}${url.search}`;
    } else if (!isHttps && !hostname.includes('localhost') && !hostname.includes('127.0.0.1')) {
      redirectUrl = `https://careerwithmohit.online${finalPath}${url.search}`;
    } else if (isPathChanged) {
      const canonicalOrigin = (hostname.endsWith('careerwithmohit.online'))
        ? 'https://careerwithmohit.online'
        : url.origin;
      const destinationUrl = new URL(finalPath, canonicalOrigin);
      if (destinationUrl.toString() !== url.toString()) {
        redirectUrl = destinationUrl.toString();
      }
    }

    if (redirectUrl) {
      hops.push({ url: currentUrl, status: 301, redirect: redirectUrl });
      currentUrl = redirectUrl;
    } else {
      // Check if file exists in out/ directory
      let checkPath = pathname;
      if (checkPath.endsWith('/')) checkPath += 'index.html';
      const localFilePath = path.join(process.cwd(), 'out', checkPath.replace(/^\//, ''));
      const status = fs.existsSync(localFilePath) ? 200 : 404;
      hops.push({ url: currentUrl, status });
      break;
    }
  }

  return hops;
}

const rankingSlugs = [
  '',
  'blog/fee-refund-policy-aicte-ugc-2026',
  'blog/how-to-recover-college-fee-refund-legal-action',
  'blog/btech-colleges-under-5-lakhs-budget-2026',
  'blog/direct-admission-skit-jaipur-btech-2026',
  'blog/cat-2026-whatsapp-group-links-top-coaching',
  'blog/jaypee-noida-jiit-btech-admission-2026-fees-cutoff',
  'blog/bba-colleges-without-maths-eligibility-2026',
  'blog/direct-admission-mnit-jaipur-btech-2026',
  'blog/bihar-student-credit-card-mba-colleges',
  'blog/daiict-gandhinagar-btech-admission-2026-fees-cutoff-review',
  'blog/top-healthcare-management-colleges-india-2026',
  'central-university-list-india-2026-state-wise',
  'top-mca-colleges-hyderabad-2026'
];

// Add the renamed slugs to test
const testUrls = [
  // Fee refund variants
  'http://www.careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2027-29',
  'https://www.careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2027-29',
  'http://careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2027-29',
  'https://careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2027-29',
  'https://careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2027-29/',
  'https://careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2026',
  'https://careerwithmohit.online/blog/fee-refund-policy-aicte-ugc-2026/',

  // Healthcare variants
  'http://www.careerwithmohit.online/blog/top-healthcare-management-colleges-india-2027-29',
  'https://careerwithmohit.online/blog/top-healthcare-management-colleges-india-2027-29',
  'https://careerwithmohit.online/blog/top-healthcare-management-colleges-india-2027-29/',
  'https://careerwithmohit.online/blog/top-healthcare-management-colleges-india-2026',
  'https://careerwithmohit.online/blog/top-healthcare-management-colleges-india-2026/',

  // CAT WhatsApp Group Links
  'http://www.careerwithmohit.online/blog/cat-2026-whatsapp-group-links-top-coaching',
  'https://careerwithmohit.online/blog/cat-2026-whatsapp-group-links-top-coaching',
  'https://careerwithmohit.online/blog/cat-2026-whatsapp-group-links-top-coaching/',

  // Root & other ranking URLs
  'http://www.careerwithmohit.online/',
  'https://www.careerwithmohit.online/',
  'http://careerwithmohit.online/',
  'https://careerwithmohit.online/',
  'http://www.careerwithmohit.online/blog/how-to-recover-college-fee-refund-legal-action',
  'https://careerwithmohit.online/blog/how-to-recover-college-fee-refund-legal-action/',
  'http://www.careerwithmohit.online/blog/btech-colleges-under-5-lakhs-budget-2026',
  'https://careerwithmohit.online/blog/btech-colleges-under-5-lakhs-budget-2026/',
  'http://www.careerwithmohit.online/blog/direct-admission-skit-jaipur-btech-2026',
  'https://careerwithmohit.online/blog/direct-admission-skit-jaipur-btech-2026/',
  'http://www.careerwithmohit.online/blog/jaypee-noida-jiit-btech-admission-2026-fees-cutoff',
  'https://careerwithmohit.online/blog/jaypee-noida-jiit-btech-admission-2026-fees-cutoff/',
  'http://www.careerwithmohit.online/blog/bba-colleges-without-maths-eligibility-2026',
  'https://careerwithmohit.online/blog/bba-colleges-without-maths-eligibility-2026/',
  'http://www.careerwithmohit.online/blog/direct-admission-mnit-jaipur-btech-2026',
  'https://careerwithmohit.online/blog/direct-admission-mnit-jaipur-btech-2026/',
  'http://www.careerwithmohit.online/blog/bihar-student-credit-card-mba-colleges',
  'https://careerwithmohit.online/blog/bihar-student-credit-card-mba-colleges/',
  'http://www.careerwithmohit.online/blog/daiict-gandhinagar-btech-admission-2026-fees-cutoff-review',
  'https://careerwithmohit.online/blog/daiict-gandhinagar-btech-admission-2026-fees-cutoff-review/',
  'http://www.careerwithmohit.online/blog/central-university-list-india-2026-state-wise',
  'https://careerwithmohit.online/blog/central-university-list-india-2026-state-wise/',
  'http://www.careerwithmohit.online/blog/top-mca-colleges-hyderabad-2026',
  'https://careerwithmohit.online/blog/top-mca-colleges-hyderabad-2026/'
];

console.log('='.repeat(90));
console.log('URL HOP & STATUS VERIFICATION REPORT');
console.log('='.repeat(90));

let allPass = true;
testUrls.forEach((testUrl, idx) => {
  const hops = simulateCloudflareEdgeRequest(testUrl);
  const redirectHops = hops.filter(h => h.status === 301 || h.status === 308);
  const finalHop = hops[hops.length - 1];

  const hopCount = redirectHops.length;
  const isDirect = hopCount === 0 && finalHop.status === 200;
  const isSingleHopRedirect = hopCount === 1 && finalHop.status === 200;
  const passed = isDirect || isSingleHopRedirect;

  if (!passed) allPass = false;

  console.log(`\n[${idx + 1}] Input: ${testUrl}`);
  hops.forEach((h, hIdx) => {
    if (h.redirect) {
      console.log(`   Hop ${hIdx + 1}: ${h.status} -> ${h.redirect}`);
    } else {
      console.log(`   Final (${hIdx + 1}): ${h.status} (${h.url})`);
    }
  });
  console.log(`   Result: ${passed ? '✅ PASS' : '❌ FAIL'} | Hops: ${hopCount} | Final Status: ${finalHop.status}`);
});

console.log('\n' + '='.repeat(90));
if (allPass) {
  console.log('🎉 ALL URL VARIANTS PASSED: EXACTLY 0 OR 1 HOP (301), FINAL STATUS 200 OK.');
} else {
  console.log('❌ SOME URL VARIANTS FAILED VERIFICATION.');
  process.exit(1);
}
console.log('='.repeat(90));
