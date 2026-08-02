import { getAllColleges } from "@/lib/colleges";
import { CollegeCompareClient } from "@/components/CollegeCompareClient";
import { Suspense } from "react";

export const metadata = {
  title: "Compare Top Colleges 2027: Fees & Placements",
  description: "Compare fee structures, average placement records, rankings, and cutoffs side-by-side for top MBA, PGDM, B.Tech, and BBA colleges in India for 2027 admission.",
  keywords: [
    "compare mba colleges 2027",
    "mba admission 2027",
    "pgdm admission 2027",
    "degree admission 2027",
    "college comparison tool india",
    "mba fees placement comparison 2027"
  ],
  alternates: { canonical: "/colleges/compare" },
  openGraph: {
    title: "Compare Top Colleges 2027: Fees & Placements",
    description: "Compare fee structures, average placement records, rankings, and cutoffs side-by-side for top MBA, PGDM, B.Tech, and BBA colleges in India for 2027 admission.",
    type: "website",
    url: "/colleges/compare",
    siteName: "CareerWithMohit",
    images: [
      {
        url: "https://www.careerwithmohit.online/og-image.webp",
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
    images: ["https://www.careerwithmohit.online/og-image.webp"],
  },
};

export default function ComparePage() {
  // Query strings are evaluated in the client so this page can be exported.
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50" />}>
      <CollegeCompareClient colleges={getAllColleges()} />
    </Suspense>
  );
}
