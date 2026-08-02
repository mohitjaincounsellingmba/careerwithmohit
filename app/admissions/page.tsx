import { Suspense } from "react";
import { getAllColleges } from "@/lib/colleges";
import { getSortedPostsData } from "@/lib/markdown";
import { AdmissionsClient } from "@/components/AdmissionsClient";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Admissions Portal 2027: Compare Colleges & Fees",
  description: "Your ultimate college search and admission helper for 2027. Explore 600+ top colleges, predict admissions, compare fees and placement reports, and get direct expert counseling.",
  keywords: [
    'admissions portal 2027', 'college search portal India', 'MBA admission 2027', 'PGDM admission 2027',
    'B.Tech admission 2027', 'compare MBA fees', 'college placement comparison',
    'admissions predictor tool', 'MBA college generator', 'BTech shortlist builder',
    'direct admission guidance', 'expert career counseling Mohit Jain', 'degree admission 2027'
  ],
  alternates: {
    canonical: '/admissions',
  },
  openGraph: {
    title: 'Admissions Portal 2027: Compare Colleges & Fees',
    description: 'Explore 600+ top colleges in India. Compare fees, placement reports, and use live predictor tools for B-school and engineering admissions for 2027.',
    type: 'website',
    url: 'https://www.careerwithmohit.online/admissions',
    siteName: 'CareerWithMohit',
    images: [
      {
        url: 'https://www.careerwithmohit.online/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Admissions Portal 2027 - CareerWithMohit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admissions Portal 2027: Compare Colleges & Fees',
    description: 'Explore 600+ top colleges in India. Compare fees & placements for 2027 admissions.',
    images: ['https://www.careerwithmohit.online/og-image.webp'],
  },
};

export default function AdmissionsPortalPage() {
  const colleges = getAllColleges();
  const allBlogs = getSortedPostsData();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.careerwithmohit.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Admissions Portal",
        "item": "https://www.careerwithmohit.online/admissions"
      }
    ]
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Admissions & College Search Portal 2027",
    "description": "Premium college search platform featuring interactive comparisons, admissions predictors, and counseling services.",
    "url": "https://www.careerwithmohit.online/admissions"
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webpageSchema} />
      <Suspense fallback={<div className="text-center py-20 font-bold text-slate-500">Loading admissions portal...</div>}>
        <AdmissionsClient colleges={colleges} posts={allBlogs} />
      </Suspense>
    </>
  );
}
