"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import type { PostData } from "@/lib/blog-categories";
import type { CollegeMetadata } from "@/lib/colleges";
import { searchColleges } from "@/lib/collegeSearch";
import {
  Search,
  Building2,
  BookOpen,
  MapPin,
  IndianRupee,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Filter,
  CheckCircle2
} from "lucide-react";

export function SearchResults({
  posts,
  colleges = [],
}: {
  posts: PostData[];
  colleges?: CollegeMetadata[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || searchParams?.get("search") || "";
  const normalized = query.trim().toLowerCase();

  const [activeTab, setActiveTab] = useState<"all" | "colleges" | "articles">("all");
  const [searchInput, setSearchInput] = useState(query);

  // College matches via intelligent scoring engine
  const matchedColleges = normalized
    ? searchColleges(colleges, normalized).map((s) => s.college)
    : [];

  // Article matches
  const matchedPosts = normalized
    ? posts.filter((post) =>
        `${post.title} ${post.description || ""} ${post.keywords?.join(" ") || ""}`
          .toLowerCase()
          .includes(normalized)
      )
    : [];

  const totalResults = matchedColleges.length + matchedPosts.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Search Header Banner */}
        <div className="bg-gradient-to-br from-[#071324] via-[#0D233E] to-[#112E52] text-white p-6 sm:p-10 rounded-3xl shadow-xl mb-8 border border-white/10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Universal Search Portal</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
              {normalized ? (
                <>
                  Results for <span className="text-amber-300">&ldquo;{query}&rdquo;</span>
                </>
              ) : (
                "Search Colleges & Admissions Insights"
              )}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/80 mb-6">
              {normalized
                ? `Found ${matchedColleges.length} colleges and ${matchedPosts.length} articles matching your search.`
                : "Search across 770+ colleges, exam cutoffs, placement reports, and expert guidance articles."}
            </p>

            {/* Interactive Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-xl">
              <div className="relative flex-grow">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search college, city, MBA, B.Tech, CAT..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/15 border border-white/20 text-white placeholder:text-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-5 h-11 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer shrink-0"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Tab Navigation Filter */}
        {normalized && (
          <div className="flex items-center gap-2 mb-8 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              All Matches ({totalResults})
            </button>
            <button
              onClick={() => setActiveTab("colleges")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "colleges"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Colleges ({matchedColleges.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("articles")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "articles"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Articles &amp; Guides ({matchedPosts.length})</span>
            </button>
          </div>
        )}

        {/* Zero Results View */}
        {normalized && totalResults === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-2xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-black text-xl">
              🔍
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">No matching colleges or articles found</h2>
            <p className="text-slate-500 text-sm mb-6">
              We couldn&apos;t find any records for &ldquo;{query}&rdquo;. Try searching for acronyms like <strong>NDIM</strong>, <strong>IIM</strong>, <strong>FMS</strong>, <strong>DTU</strong>, or browse the directory.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/colleges"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                Browse 770+ Colleges Directory
              </Link>
              <Link
                href="/blog"
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                Explore All Articles
              </Link>
            </div>
          </div>
        )}

        {/* 1. Colleges Section */}
        {(activeTab === "all" || activeTab === "colleges") && matchedColleges.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Colleges &amp; Institutes ({matchedColleges.length})</span>
              </h2>
              <Link
                href={`/colleges?search=${encodeURIComponent(query)}`}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>View with filters</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedColleges.slice(0, activeTab === "all" ? 6 : 50).map((col) => (
                <Link
                  key={col.slug}
                  href={`/colleges/${col.slug}`}
                  prefetch={false}
                  className="group bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-black text-sm text-blue-600 shrink-0">
                        {col.logo && !col.logo.includes("default") ? (
                          <img src={col.logo} alt={`${col.name} logo`} width={40} height={40} className="w-full h-full object-contain p-1" />
                        ) : (
                          col.name.charAt(0)
                        )}
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {col.category}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {col.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{col.location}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Audited Fee</span>
                      <span className="font-extrabold text-slate-900">{col.fees}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Avg Package</span>
                      <span className="font-extrabold text-emerald-600">{col.avg_placement}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {activeTab === "all" && matchedColleges.length > 6 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setActiveTab("colleges")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  View all {matchedColleges.length} matching colleges &rarr;
                </button>
              </div>
            )}
          </section>
        )}

        {/* 2. Articles & Guides Section */}
        {(activeTab === "all" || activeTab === "articles") && matchedPosts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>Admission Articles &amp; Analysis ({matchedPosts.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {matchedPosts.slice(0, activeTab === "all" ? 6 : 50).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  prefetch={false}
                  className="group bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700">
                        {post.category || "Career Guide"}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                        {post.description}
                      </p>
                    )}
                  </div>

                  <span className="mt-4 pt-3 border-t border-slate-100 font-bold text-xs text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Read Full Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>

            {activeTab === "all" && matchedPosts.length > 6 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setActiveTab("articles")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  View all {matchedPosts.length} matching articles &rarr;
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
