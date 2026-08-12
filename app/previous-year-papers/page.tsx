import { Metadata } from 'next';
import PreviousYearPapersClient from '@/components/PreviousYearPapersClient';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Previous Year Question Papers PDF | CAT, XAT, NMAT, SNAP, CMAT | CareerWithMohit',
  description: 'Download free authentic previous year question papers with answer keys and solutions for CAT, XAT, NMAT, SNAP, CMAT, and MAH MBA CET.',
  keywords: ['previous year papers', 'CAT papers PDF', 'NMAT question papers', 'XAT previous papers', 'SNAP question papers', 'CMAT papers with solutions'],
  alternates: {
    canonical: 'https://www.careerwithmohit.online/previous-year-papers',
  },
  openGraph: {
    title: 'Previous Year Question Papers PDF | CAT, XAT, NMAT, SNAP | CareerWithMohit',
    description: 'Access and download official previous year papers with solutions for top MBA entrance exams in India.',
    url: 'https://www.careerwithmohit.online/previous-year-papers',
    siteName: 'CareerWithMohit',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Previous Year Question Papers Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Previous Year Question Papers PDF | CareerWithMohit',
    description: 'Download free previous year papers for CAT, XAT, NMAT, and SNAP.',
    images: ['/og-image.webp'],
  },
};

export default function PreviousYearPapersPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "MBA Entrance Exam Previous Year Papers Library",
    "description": "Download free official question papers and answer keys for CAT, XAT, SNAP, NMAT, CMAT, and MAH CET.",
    "url": "https://www.careerwithmohit.online/previous-year-papers",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "CAT Previous Year Papers",
          "url": "https://www.careerwithmohit.online/resources/cat"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "XAT Previous Year Papers",
          "url": "https://www.careerwithmohit.online/resources/xat"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "SNAP Previous Year Papers",
          "url": "https://www.careerwithmohit.online/resources/snap"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "NMAT Previous Year Papers",
          "url": "https://www.careerwithmohit.online/resources/nmat"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "MAH CET MBA Previous Year Papers",
          "url": "https://www.careerwithmohit.online/resources/mah-mba-cet"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "CMAT Previous Year Papers",
          "url": "https://www.careerwithmohit.online/resources/cmat"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "CUET PG MBA Previous Year Papers",
          "url": "https://www.careerwithmohit.online/resources/cuet-pg"
        }
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.careerwithmohit.online",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Previous Year Papers",
        "item": "https://www.careerwithmohit.online/previous-year-papers",
      },
    ],
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PreviousYearPapersClient />
    </>
  );
}
