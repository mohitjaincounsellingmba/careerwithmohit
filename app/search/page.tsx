import { Suspense } from "react";
import { getSortedPostsData } from "@/lib/markdown";
import { SearchResults } from "@/components/SearchResults";

export const metadata = {
  title: "Search Results | CareerWithMohit",
  description: "Find specific career advice and admission insights on CareerWithMohit.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <Suspense fallback={<main className="min-h-screen bg-muted" />}><SearchResults posts={getSortedPostsData()} /></Suspense>;
}
