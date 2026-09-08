"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  ArrowRight,
  Sparkles,
  Tag,
  Filter,
  GraduationCap,
  BookOpen,
  Building2,
  FileText,
  Clock,
  ChevronRight,
  X,
  Compass,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { NewsItem } from "@/lib/news";

export function NewsClient({ items }: { items: NewsItem[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Normalize categories
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      let cat = item.category;
      if (cat.includes("MBA Admission")) cat = "MBA & PGDM";
      else if (cat.includes("B.Tech")) cat = "B.Tech & Eng";
      else if (cat.includes("Entrance Exams")) cat = "Exams & Results";
      else if (cat.includes("Career")) cat = "Career Counselling";
      else if (cat.includes("Board Results")) cat = "Board Results";
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return [
      { id: "all", label: "All News", count: items.length },
      { id: "MBA & PGDM", label: "MBA & PGDM", count: counts["MBA & PGDM"] || 0 },
      { id: "Exams & Results", label: "Exams & Cutoffs", count: counts["Exams & Results"] || 0 },
      { id: "Career Counselling", label: "Career Insights", count: counts["Career Counselling"] || 0 },
      { id: "B.Tech & Eng", label: "B.Tech & Engineering", count: counts["B.Tech & Eng"] || 0 },
      { id: "Board Results", label: "Board Results", count: counts["Board Results"] || 0 },
    ];
  }, [items]);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category check
      if (selectedCategory !== "all") {
        let cat = item.category;
        if (cat.includes("MBA Admission")) cat = "MBA & PGDM";
        else if (cat.includes("B.Tech")) cat = "B.Tech & Eng";
        else if (cat.includes("Entrance Exams")) cat = "Exams & Results";
        else if (cat.includes("Career")) cat = "Career Counselling";
        else if (cat.includes("Board Results")) cat = "Board Results";

        if (cat !== selectedCategory) return false;
      }

      // Search check
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchExcerpt = item.excerpt.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        return matchTitle || matchExcerpt || matchCategory;
      }

      return true;
    });
  }, [items, selectedCategory, search]);

  // Featured breaking item (first item in list)
  const breakingNews = items[0];

  return (
    <div id="news-feed" className="w-full scroll-mt-20">
      {/* ── Featured Breaking Bulletin Card ── */}
      {breakingNews && !search && selectedCategory === "all" && (
        <div className="mb-12 relative bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white p-6 sm:p-10 rounded-3xl border border-amber-400/40 shadow-xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3 h-3 fill-slate-950" /> Featured Admission Alert
                </span>
                <span className="text-slate-400 text-xs font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {breakingNews.date}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white group-hover:text-amber-300 transition-colors leading-tight">
                <Link href={breakingNews.link}>{breakingNews.title}</Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {breakingNews.excerpt}
              </p>
            </div>

            <Link
              href={breakingNews.link}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black px-6 py-4 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 self-start md:self-auto"
            >
              Read Full Bulletin <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* ── Search & Filter Controls ── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-lg shadow-slate-900/5 mb-10 space-y-5">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search news, colleges, admission deadlines, or exams (e.g. MBA 2027, JEE, CUET, Direct Admission)..."
            className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl pl-12 pr-10 py-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-950 text-white shadow-md shadow-slate-900/10"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
          {(selectedCategory !== "all" || search) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearch("");
              }}
              className="text-xs text-rose-600 font-bold hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="text-xs sm:text-sm font-bold text-slate-600">
          Showing <span className="text-slate-900 font-black">{filteredItems.length}</span> news articles
          {selectedCategory !== "all" && (
            <span> in <span className="text-amber-700 font-bold">{selectedCategory}</span></span>
          )}
          {search && (
            <span> matching &ldquo;<span className="text-slate-900 font-bold">{search}</span>&rdquo;</span>
          )}
        </div>
        <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
          Verified Academic Bulletins
        </span>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-8 shadow-sm">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No news articles found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try searching for a different keyword or reset your stream filters to view all updates.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearch("");
            }}
            className="mt-4 bg-slate-950 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* ── News Feed Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Accent Stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Category & Date */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <time>{item.date}</time>
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-extrabold text-slate-950 group-hover:text-amber-700 transition-colors leading-snug mb-3">
                <Link href={item.link}>{item.title}</Link>
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed line-clamp-3 mb-6">
                {item.excerpt}
              </p>
            </div>

            {/* Footer / Read More */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={item.link}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 group-hover:text-amber-700 transition-colors"
              >
                Read Full Update <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/inquiry"
                className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 transition-colors"
              >
                Consult on this →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
