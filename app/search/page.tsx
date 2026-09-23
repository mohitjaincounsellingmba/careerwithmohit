import { Suspense } from "react";
import { getSortedPostsData } from "@/lib/markdown";
import { getAllColleges } from "@/lib/colleges";
import { SearchResults } from "@/components/SearchResults";

export const metadata = {
  title: "Search Colleges & Admissions Insights | CareerWithMohit",
  description: "Search 770+ colleges, cutoffs, placements, and expert admission guidance on CareerWithMohit.",
  alternates: { canonical: "/search/" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const posts = getSortedPostsData();
  const colleges = getAllColleges();

  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50 text-center py-20 font-bold text-slate-500">Loading search results…</main>}>
      <SearchResults posts={posts} colleges={colleges} />
    </Suspense>
  );
}
