import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllColleges } from '@/lib/colleges';
import { getSortedPostsData } from '@/lib/markdown';
import { AdmissionsClient } from '@/components/AdmissionsClient';
import { JsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://www.careerwithmohit.online';
const PAGE_PATH = '/admissions';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Admissions Portal 2027: Compare Top Colleges, Fees & Cutoffs | CareerWithMohit',
  description:
    'Comprehensive Admissions Hub for 2027-2029 batch. Search 600+ top MBA, PGDM, B.Tech, and BBA colleges across India. Compare verified fees, placements, cutoffs, and get free 1-on-1 counseling with Mohit Jain.',
  keywords: [
    'admissions portal 2027',
    'MBA admission 2027',
    'PGDM admission 2027',
    'B.Tech admission 2027',
    'BBA admission 2027',
    'college search India',
    'compare MBA fees',
    'college placement comparison',
    'admissions predictor tool',
    'direct admission guidance',
    'career counseling Mohit Jain',
    'top B-schools India'
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Admissions Portal 2027: Compare Colleges, Fees & Cutoffs | CareerWithMohit',
    description:
      'Search 600+ top MBA, PGDM, B.Tech & BBA colleges across India. Compare verified fees, placement statistics, and access admissions predictors.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: 'Admissions Portal 2027 - CareerWithMohit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admissions Portal 2027: Compare Colleges & Fees',
    description:
      'Explore 600+ top colleges in India. Compare fees & placements for 2027 admissions with Mohit Jain.',
    images: [`${BASE_URL}/og-image.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function AdmissionsPortalPage() {
  const colleges = getAllColleges();
  const allBlogs = getSortedPostsData();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Admissions Portal',
        item: PAGE_URL,
      },
    ],
  };

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Admissions & College Search Portal 2027',
    description:
      'Premium college search platform featuring interactive comparisons, admissions predictors, and direct counseling services.',
    url: PAGE_URL,
    publisher: {
      '@type': 'Person',
      name: 'Mohit Jain',
      url: BASE_URL,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webpageSchema} />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300 font-medium text-sm">
            Loading admissions portal...
          </div>
        }
      >
        <AdmissionsClient colleges={colleges} posts={allBlogs} />
      </Suspense>
    </>
  );
}
