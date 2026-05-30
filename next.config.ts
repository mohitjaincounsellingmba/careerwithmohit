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
};

export default nextConfig;
