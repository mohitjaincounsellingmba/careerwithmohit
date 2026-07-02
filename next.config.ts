import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.google.com' },
      { protocol: 'https', hostname: 't0.gstatic.com' },
      { protocol: 'https', hostname: 'unavatar.io' },
    ]
  },
  async redirects() {
    return [
      {
        source: '/posts/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/tools/roadmap-calculator',
        destination: '/calculator/career-roadmap',
        permanent: true,
      },
      {
        source: '/tools/mock-tests',
        destination: '/mock-tests',
        permanent: true,
      },
      // GSC 404 Redirects
      {
        source: '/best-mba-colleges-in-pune-2026',
        destination: '/blog/best-mba-colleges-in-pune-2026',
        permanent: true,
      },
      {
        source: '/blog/why-never-join-ifeel-pune-honest-review-2026',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/backlink-collaboration',
        destination: '/partner-with-us',
        permanent: true,
      },
      {
        source: '/blog/bba-colleges-delhi-ncr-2026-cuet-ipu-fees-placements',
        destination: '/blog/top-bba-colleges-delhi-ncr-2026',
        permanent: true,
      },
      {
        source: '/govt-jobs',
        destination: '/tools/govt-exams-mock-test',
        permanent: true,
      },
      {
        source: '/learn-skills/:path*',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/backlink-generator',
        destination: '/partner-with-us',
        permanent: true,
      },
      {
        source: '/calculator/startup',
        destination: '/calculator/career-roadmap',
        permanent: true,
      },
      {
        source: '/tools/mba-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/blog/best-bdes-design-colleges-india-2026-citywise',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/mer-janakpuri-review',
        destination: '/blog/meri-janakpuri-mba-review-2026',
        permanent: true,
      },
      {
        source: '/blog/why-asm-iibs-pune-good-for-mba-pgdm-2026',
        destination: '/blog/why-asm-iibr-pune-good-for-mba-pgdm-2026',
        permanent: true,
      },
      {
        source: '/blog/the-truth-about-mba-admission-commissions-to-consultants',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tools/salary-auditor',
        destination: '/tools/salary-slip-generator',
        permanent: true,
      },
      {
        source: '/tools/resume-generator',
        destination: '/tools/resume-analyzer',
        permanent: true,
      },
      {
        source: '/colleges/first-bridge-gurgaon',
        destination: '/colleges',
        permanent: true,
      },
      {
        source: '/blog/top-cmat-colleges-delhi-ncr',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/first-post',
        destination: '/blog',
        permanent: true,
      },
      // Redirect duplicate dynamic mock tests to static custom ones
      {
        source: '/tools/mock-test/cat',
        destination: '/tools/cat-mock-test',
        permanent: true,
      },
      {
        source: '/tools/mock-test/nmat',
        destination: '/tools/nmat-mock-test',
        permanent: true,
      },
      {
        source: '/tools/mock-test/mhcet',
        destination: '/tools/mhcet-mock-test',
        permanent: true,
      },
      {
        source: '/tools/mock-test/atma',
        destination: '/tools/atma-mock-test',
        permanent: true,
      },
      {
        source: '/tools/mock-test/jee-main',
        destination: '/tools/jee-main-mock-test',
        permanent: true,
      },
      {
        source: '/tools/mock-test/jee-advanced',
        destination: '/tools/jee-advanced-mock-test',
        permanent: true,
      },
      {
        source: '/tools/mock-test/bitsat',
        destination: '/tools/bitsat-mock-test',
        permanent: true,
      },
      {
        source: '/brochures/jaipuria-jaipur-2025.pdf',
        destination: '/colleges/jaipuria-jaipur',
        permanent: true,
      },
      {
        source: '/brochures/bimtech-2025.pdf',
        destination: '/colleges/bimtech-greater-noida',
        permanent: true,
      },
      {
        source: '/brochures/fms-2025.pdf',
        destination: '/colleges/fms-delhi',
        permanent: true,
      },
      {
        source: '/brochures/greatlakes-gurgaon-2025.pdf',
        destination: '/colleges/great-lakes-gurgaon',
        permanent: true,
      },
      {
        source: '/brochures/iift-2025.pdf',
        destination: '/colleges/iift-delhi',
        permanent: true,
      },
      {
        source: '/brochures/iima-pgp-2025.pdf',
        destination: '/colleges/iim-ahmedabad',
        permanent: true,
      },
      {
        source: '/brochures/iimb-2025.pdf',
        destination: '/colleges/iim-bangalore',
        permanent: true,
      },
      {
        source: '/brochures/imik-2025.pdf',
        destination: '/colleges/imi-kolkata',
        permanent: true,
      },
      {
        source: '/brochures/itm-2025.pdf',
        destination: '/colleges/itm-mumbai',
        permanent: true,
      },
      {
        source: '/brochures/jaipuria-noida-2025.pdf',
        destination: '/colleges/jaipuria-noida',
        permanent: true,
      },
      {
        source: '/brochures/mdi-2025.pdf',
        destination: '/colleges/mdi-gurgaon',
        permanent: true,
      },
      {
        source: '/brochures/mnit-2025.pdf',
        destination: '/colleges/mnit-jaipur',
        permanent: true,
      },
      {
        source: '/brochures/xime-2025.pdf',
        destination: '/colleges/xime-bangalore',
        permanent: true,
      },
      {
        source: '/brochures/:path*',
        destination: '/inquiry',
        permanent: false,
      },
      {
        source: '/blog/rvce-bangalore-management-quota',
        destination: '/blog/rv-college-of-engineering-rvce-btech-admission-2026-fees-cutoff',
        permanent: true,
      },
      {
        source: '/cuet-ug-university-list-2026-citywise',
        destination: '/blog/cuet-ug-university-list-2026-citywise',
        permanent: true,
      },
      {
        source: '/blog/top-bba-colleges-coimbatore-2026',
        destination: '/blog/top-btech-colleges-coimbatore-2026',
        permanent: true,
      },
      {
        source: '/blog/how-to-',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tools/instagram-followers-generator',
        destination: '/tools/hashtag-generator',
        permanent: true,
      },
      {
        source: '/tools/cat-',
        destination: '/tools/cat-mock-test',
        permanent: true,
      },
      {
        source: '/blog/top-btech-colleges-north-east',
        destination: '/blog/top-10-engineering-colleges-india-2026',
        permanent: true,
      },
      {
        source: '/&',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
