import { getAllColleges } from "@/lib/colleges";
import { CollegeCompareClient } from "@/components/CollegeCompareClient";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Compare Top Colleges 2027: Fees, Cutoffs & Placements | CareerWithMohit",
  description: "Compare fee structures, average placement records, rankings, and cutoffs side-by-side for top MBA, PGDM, B.Tech, and BBA colleges in India for 2027 admission.",
  keywords: [
    "compare mba colleges 2027",
    "mba admission 2027",
    "pgdm admission 2027",
    "degree admission 2027",
    "college comparison tool india",
    "mba fees placement comparison 2027"
  ],
  alternates: { canonical: "https://www.careerwithmohit.online/colleges/compare" },
  openGraph: {
    title: "Compare Top Colleges 2027: Fees & Placements | CareerWithMohit",
    description: "Compare fee structures, average placement records, rankings, and cutoffs side-by-side for top MBA, PGDM, B.Tech, and BBA colleges in India for 2027 admission.",
    type: "website",
    url: "https://www.careerwithmohit.online/colleges/compare",
    siteName: "CareerWithMohit",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "College Compare Tool - CareerWithMohit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Top Colleges 2027: Fees & Placements",
    description: "Compare fee structures, average placement records, rankings, and cutoffs side-by-side.",
    images: ["/og-image.webp"],
  },
};

export default function ComparePage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Higher Education College Compare Engine",
    "url": "https://www.careerwithmohit.online/colleges/compare",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <>
      <JsonLd data={softwareSchema} />
      <Suspense fallback={<main className="min-h-screen bg-slate-50" />}>
        <CollegeCompareClient colleges={getAllColleges()} />
      </Suspense>
    </>
  );
}
