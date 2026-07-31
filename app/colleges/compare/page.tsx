import { getAllColleges } from "@/lib/colleges";
import { CollegeCompareClient } from "@/components/CollegeCompareClient";
import { Suspense } from "react";

export const metadata = {
  alternates: { canonical: "/colleges/compare" },
  title: "Compare Top Colleges side-by-side 2027: Fees, Placements & Ranking | CareerWithMohit",
  description: "Compare fees structure, average placement records, NIRF rankings, and cutoffs side-by-side for top MBA, PGDM, B.Tech, and BBA colleges in India for 2027 admission.",
  keywords: [
    "compare mba colleges 2027",
    "mba admission 2027",
    "pgdm admission 2027",
    "degree admission 2027",
    "college comparison tool india",
    "mba fees placement comparison 2027"
  ],
};

export default function ComparePage() {
  // Query strings are evaluated in the client so this page can be exported.
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50" />}>
      <CollegeCompareClient colleges={getAllColleges()} />
    </Suspense>
  );
}
