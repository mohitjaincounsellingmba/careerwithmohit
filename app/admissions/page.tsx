import { Suspense } from "react";
import { getAllColleges } from "@/lib/colleges";
import { getSortedPostsData } from "@/lib/markdown";
import { AdmissionsClient } from "@/components/AdmissionsClient";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Admissions Portal 2026: Compare Colleges, Fees, Placements & Predictors",
  description: "Your ultimate college search and admission helper for 2026. Explore 600+ top colleges, predict admissions, compare fees and placement reports, and get direct expert counseling.",
  keywords: [
    'admissions portal 2026', 'college search portal India', 'MBA admission 2026',
    'B.Tech admission 2026', 'compare MBA fees', 'college placement comparison',
    'admissions predictor tool', 'MBA college generator', 'BTech shortlist builder',
    'direct admission guidance', 'expert career counseling Mohit Jain'
  ],
  alternates: {
    canonical: '/admissions',
  },
  openGraph: {
    title: 'Admissions Portal 2026: Compare Colleges, Fees, Placements & Predictors',
    description: 'Explore 600+ top colleges in India. Compare fees, placement reports, and use live predictor tools for B-school and engineering admissions.',
    type: 'website',
    url: 'https://www.careerwithmohit.online/admissions',
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
    "name": "Admissions & College Search Portal 2026",
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
