import { getAllColleges } from "@/lib/colleges";
import { CollegeCompareClient } from "@/components/CollegeCompareClient";
import { Suspense } from "react";

export const metadata = {
  alternates: { canonical: "/colleges/compare" },
  title: "Compare Top Colleges side-by-side 2026: Fees, Placements & Ranking | CareerWithMohit",
  description: "Compare fees structure, average placement records, NIRF rankings, and cutoffs side-by-side for top MBA, B.Tech, and BBA colleges in India for 2026 admission.",
};

export default function ComparePage() {
  // Query strings are evaluated in the client so this page can be exported.
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50" />}>
      <CollegeCompareClient colleges={getAllColleges()} />
    </Suspense>
  );
}
