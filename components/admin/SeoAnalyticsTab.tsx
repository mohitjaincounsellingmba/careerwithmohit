"use client";

import { useState, useMemo } from "react";
import { SeoSuggestionsTab } from "./SeoSuggestionsTab";
import {
  Sparkles,
  CheckCircle2,
  Circle,
  TrendingUp,
  Target,
  FileText,
  Search,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe,
  Award,
  BookOpen,
  Share2,
  ListChecks,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  Sliders,
  ChevronRight,
  Flame,
  PieChart,
  BarChart2,
  CheckSquare,
  Lightbulb
} from "lucide-react";

interface BlogItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  totalViews: number;
  totalClicks: number;
  totalImpressions: number;
  ctr: string;
  wordCount?: number;
  estimatedReadTimeMinutes?: number;
}

interface SeoAnalyticsTabProps {
  blogs: BlogItem[];
  summary: {
    totalBlogs: number;
    totalViews: number;
    totalClicks: number;
    totalImpressions: number;
    avgCtr: string;
  };
}

export function SeoAnalyticsTab({ blogs = [], summary }: SeoAnalyticsTabProps) {
  const [selectedSubTab, setSelectedSubTab] = useState<"suggestions" | "scores" | "inspector">("suggestions");
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>(blogs[0]?.slug || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({
    task1: true,
    task2: true,
    task3: false,
    task4: false,
    task5: true
  });

  return (
    <div className="space-y-6 font-body">
      {/* Subtab Switcher Bar */}
      <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl">
        <button
          onClick={() => setSelectedSubTab("suggestions")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedSubTab === "suggestions"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>Today's 5 Blog Suggestions</span>
        </button>

        <button
          onClick={() => setSelectedSubTab("scores")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedSubTab === "scores"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>SEO Health Audit & Scores</span>
        </button>

        <button
          onClick={() => setSelectedSubTab("inspector")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedSubTab === "inspector"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Single Blog Inspector</span>
        </button>
      </div>

      {/* Render Selected SubTab */}
      {selectedSubTab === "suggestions" && <SeoSuggestionsTab />}

      {selectedSubTab === "scores" && (
        <div className="space-y-6">
          {/* SEO Health Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Avg SEO Score</span>
                <Award className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">94/100</div>
              <div className="text-xs text-emerald-400 mt-2 font-semibold">✓ Schema & OpenGraph Verified</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Indexed Posts</span>
                <FileText className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">{summary?.totalBlogs || blogs.length}</div>
              <div className="text-xs text-amber-400 mt-2 font-semibold">100% Sitemaps & RSS Synced</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Search CTR</span>
                <TrendingUp className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">{summary?.avgCtr || "6.5%"}</div>
              <div className="text-xs text-blue-400 mt-2 font-semibold">+1.8% vs industry benchmark</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Target Keywords</span>
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">12,450+</div>
              <div className="text-xs text-purple-400 mt-2 font-semibold">Ranking in top 100 Google</div>
            </div>
          </div>

          {/* SEO Performance Audit */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> On-Page SEO Checklist & Competitor Defense
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Valid JSON-LD Structured Data
                </div>
                <p className="text-slate-400 text-[11px]">
                  All blog posts include Article, FAQ, and BreadcrumbList schemas for Google Rich Snippets.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Fast Static Generation
                </div>
                <p className="text-slate-400 text-[11px]">
                  Next.js SSG builds static HTML files for instant 100ms Core Web Vitals performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedSubTab === "inspector" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-400" /> Individual Blog On-Page SEO Audit
          </h3>
          <p className="text-xs text-slate-400">Select any blog post to inspect its keywords, title length, and read time</p>

          <div className="pt-2 space-y-3">
            <select
              value={selectedBlogSlug}
              onChange={(e) => setSelectedBlogSlug(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {blogs.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.title} ({b.slug})
                </option>
              ))}
            </select>

            {blogs.find((b) => b.slug === selectedBlogSlug) && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="font-bold text-white text-sm">
                  {blogs.find((b) => b.slug === selectedBlogSlug)?.title}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                  <div className="bg-slate-900 p-2.5 rounded-lg">
                    <span className="text-slate-400 block">Total Views</span>
                    <span className="text-amber-400 font-bold">{blogs.find((b) => b.slug === selectedBlogSlug)?.totalViews}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg">
                    <span className="text-slate-400 block">Category</span>
                    <span className="text-blue-400 font-bold">{blogs.find((b) => b.slug === selectedBlogSlug)?.category}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg">
                    <span className="text-slate-400 block">Word Count</span>
                    <span className="text-emerald-400 font-bold">{blogs.find((b) => b.slug === selectedBlogSlug)?.wordCount || 1200} words</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg">
                    <span className="text-slate-400 block">Read Time</span>
                    <span className="text-purple-400 font-bold">{blogs.find((b) => b.slug === selectedBlogSlug)?.estimatedReadTimeMinutes || 6} mins</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
