"use client";

import { useState, useMemo } from "react";
import {
  GitCommit,
  GitCompare,
  FileCode,
  GraduationCap,
  Sparkles,
  Search,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ChevronRight,
  Layers,
  FileText,
  Clock,
  IndianRupee,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Eye,
  Sliders
} from "lucide-react";

interface DiffInspectorTabProps {
  blogs: any[];
  colleges: any[];
  recentCommits?: Array<{ hash: string; author: string; date: string; subject: string }>;
  sampleDiffs?: any[];
}

export function DiffInspectorTab({
  blogs = [],
  colleges = [],
  recentCommits = [],
  sampleDiffs = []
}: DiffInspectorTabProps) {
  const [subTab, setSubTab] = useState<"blogs" | "colleges" | "git" | "seo-diff">("blogs");
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [diffViewMode, setDiffViewMode] = useState<"split" | "unified">("split");

  // Blog Diff State
  const [blog1Slug, setBlog1Slug] = useState<string>(blogs[0]?.slug || "");
  const [blog2Slug, setBlog2Slug] = useState<string>(blogs[1]?.slug || "");
  const [blogSearchTerm, setBlogSearchTerm] = useState("");

  // College Diff State
  const [college1Slug, setCollege1Slug] = useState<string>(colleges[0]?.slug || "");
  const [college2Slug, setCollege2Slug] = useState<string>(colleges[1]?.slug || "");
  const [collegeSearchTerm, setCollegeSearchTerm] = useState("");

  const blog1 = useMemo(() => blogs.find((b) => b.slug === blog1Slug) || blogs[0], [blogs, blog1Slug]);
  const blog2 = useMemo(() => blogs.find((b) => b.slug === blog2Slug) || blogs[1] || blogs[0], [blogs, blog2Slug]);

  const college1 = useMemo(() => colleges.find((c) => c.slug === college1Slug) || colleges[0], [colleges, college1Slug]);
  const college2 = useMemo(() => colleges.find((c) => c.slug === college2Slug) || colleges[1] || colleges[0], [colleges, college2Slug]);

  const filteredBlogsList = useMemo(() => {
    if (!blogSearchTerm) return blogs.slice(0, 100);
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
        b.slug.toLowerCase().includes(blogSearchTerm.toLowerCase())
    ).slice(0, 100);
  }, [blogs, blogSearchTerm]);

  const filteredCollegesList = useMemo(() => {
    if (!collegeSearchTerm) return colleges.slice(0, 100);
    return colleges.filter(
      (c) =>
        c.name.toLowerCase().includes(collegeSearchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(collegeSearchTerm.toLowerCase())
    ).slice(0, 100);
  }, [colleges, collegeSearchTerm]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-6 font-body">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
              <GitCompare className="w-4 h-4 text-indigo-400" /> Diff & Revision Intelligence System
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Content Diff, Revision Inspector & College Comparator
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Inspect markdown updates, compare blog revisions, side-by-side B-School matrices & real-time Git change logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => setDiffViewMode("split")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  diffViewMode === "split"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setDiffViewMode("unified")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  diffViewMode === "unified"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Unified View
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-5 border-t border-slate-800/80 mt-5">
          <button
            onClick={() => setSubTab("blogs")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "blogs"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Blog Revision & Content Diff</span>
          </button>

          <button
            onClick={() => setSubTab("colleges")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "colleges"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>🎓 College Side-by-Side Comparator</span>
          </button>

          <button
            onClick={() => setSubTab("seo-diff")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "seo-diff"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>SEO Optimization Before / After Diff</span>
          </button>

          <button
            onClick={() => setSubTab("git")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "git"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <GitCommit className="w-4 h-4" />
            <span>Live Git Commits & Change Log</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: Blog Revision & Comparison Diff */}
      {subTab === "blogs" && (
        <div className="space-y-6">
          {/* Post Selectors */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-400" /> Select Posts to Compare
              </h3>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={blogSearchTerm}
                  onChange={(e) => setBlogSearchTerm(e.target.value)}
                  placeholder="Filter blog options..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Blog 1 (Base / Original) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span>Base Post (Left / A)</span>
                </label>
                <select
                  value={blog1Slug}
                  onChange={(e) => setBlog1Slug(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                >
                  {filteredBlogsList.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.title.slice(0, 60)}... ({b.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Blog 2 (Comparison / Target) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Comparison Post (Right / B)</span>
                </label>
                <select
                  value={blog2Slug}
                  onChange={(e) => setBlog2Slug(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                >
                  {filteredBlogsList.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.title.slice(0, 60)}... ({b.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Diff Metrics Comparison Card */}
          {blog1 && blog2 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Word Count Diff</span>
                <div className="text-xl font-extrabold text-white mt-1 flex items-baseline gap-2">
                  <span>{blog1.wordCount || 1200}</span>
                  <span className="text-xs text-slate-500">vs</span>
                  <span className="text-indigo-400">{blog2.wordCount || 1450}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold mt-1 block">
                  Δ {Math.abs((blog2.wordCount || 1450) - (blog1.wordCount || 1200))} words
                </span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
                <span className="text-[11px] font-bold text-slate-400 uppercase">SEO Score Diff</span>
                <div className="text-xl font-extrabold text-white mt-1 flex items-baseline gap-2">
                  <span>{blog1.seoScore || 85}</span>
                  <span className="text-xs text-slate-500">vs</span>
                  <span className="text-amber-400">{blog2.seoScore || 92}</span>
                </div>
                <span className="text-[10px] text-amber-400 font-bold mt-1 block">
                  Grade: {blog1.seoGrade || "A"} vs {blog2.seoGrade || "A+"}
                </span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Views Diff</span>
                <div className="text-xl font-extrabold text-white mt-1 flex items-baseline gap-2">
                  <span>{blog1.totalViews?.toLocaleString() || 0}</span>
                  <span className="text-xs text-slate-500">vs</span>
                  <span className="text-blue-400">{blog2.totalViews?.toLocaleString() || 0}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">
                  CTR: {blog1.ctr} vs {blog2.ctr}
                </span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
                <span className="text-[11px] font-bold text-slate-400 uppercase">FAQ Schema Diff</span>
                <div className="text-sm font-bold text-white mt-1 flex items-center gap-2">
                  <span>{blog1.hasFaq ? "✅ FAQ Included" : "❌ No FAQ"}</span>
                </div>
                <span className="text-xs text-indigo-300 font-semibold mt-1 block">
                  {blog2.hasFaq ? "✅ FAQ Included" : "❌ No FAQ"}
                </span>
              </div>
            </div>
          )}

          {/* Visual Diff Box */}
          {blog1 && blog2 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-bold">
                    - {blog1.slug}.md
                  </span>
                  <span>↔</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    + {blog2.slug}.md
                  </span>
                </div>

                <button
                  onClick={() =>
                    handleCopy(
                      `---
title: "${blog2.title}"
description: "${blog2.description || ""}"
date: "${blog2.date}"
category: "${blog2.category}"
---`,
                      "blog-frontmatter"
                    )
                  }
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedHash === "blog-frontmatter" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Frontmatter</span>
                </button>
              </div>

              {diffViewMode === "split" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 text-xs font-mono">
                  {/* Left Blog */}
                  <div className="p-5 space-y-3 bg-red-950/10">
                    <div className="text-[11px] font-bold uppercase text-red-400 border-b border-red-500/20 pb-2">
                      Original / Base ({blog1.slug})
                    </div>
                    <div className="space-y-1.5 text-slate-300">
                      <div className="text-red-300 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                        <span className="font-bold">title:</span> {blog1.title}
                      </div>
                      <div className="text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                        <span className="font-bold">category:</span> {blog1.category}
                      </div>
                      <div className="text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                        <span className="font-bold">date:</span> {blog1.date}
                      </div>
                      <div className="text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                        <span className="font-bold">description:</span> {blog1.description || "No description set"}
                      </div>
                      <div className="text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                        <span className="font-bold">SEO Score:</span> {blog1.seoScore} / 100 ({blog1.seoGrade})
                      </div>
                      <div className="text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                        <span className="font-bold">Internal Links:</span> {blog1.internalLinksCount || 0} links
                      </div>
                    </div>
                  </div>

                  {/* Right Blog */}
                  <div className="p-5 space-y-3 bg-emerald-950/10">
                    <div className="text-[11px] font-bold uppercase text-emerald-400 border-b border-emerald-500/20 pb-2">
                      Comparison / Updated ({blog2.slug})
                    </div>
                    <div className="space-y-1.5 text-slate-300">
                      <div className="text-emerald-300 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                        <span className="font-bold">title:</span> {blog2.title}
                      </div>
                      <div className="text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                        <span className="font-bold">category:</span> {blog2.category}
                      </div>
                      <div className="text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                        <span className="font-bold">date:</span> {blog2.date}
                      </div>
                      <div className="text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                        <span className="font-bold">description:</span> {blog2.description || "No description set"}
                      </div>
                      <div className="text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                        <span className="font-bold">SEO Score:</span> {blog2.seoScore} / 100 ({blog2.seoGrade})
                      </div>
                      <div className="text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                        <span className="font-bold">Internal Links:</span> {blog2.internalLinksCount || 0} links
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 font-mono text-xs space-y-2 bg-slate-950">
                  <div className="text-slate-500">--- Frontmatter Unified Diff ---</div>
                  <div className="text-red-400 bg-red-500/10 px-3 py-1.5 rounded border border-red-500/20">
                    - title: "{blog1.title}"
                  </div>
                  <div className="text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20">
                    + title: "{blog2.title}"
                  </div>
                  <div className="text-slate-400 px-3 py-1.5">
                    &nbsp; category: "{blog2.category}"
                  </div>
                  <div className="text-red-400 bg-red-500/10 px-3 py-1.5 rounded border border-red-500/20">
                    - word_count: {blog1.wordCount}
                  </div>
                  <div className="text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20">
                    + word_count: {blog2.wordCount}
                  </div>
                  <div className="text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20">
                    + seo_grade: "{blog2.seoGrade}" (Score: {blog2.seoScore})
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: College Side-by-Side Comparator */}
      {subTab === "colleges" && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-400" /> Compare Any Two Indian B-Schools
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Instant side-by-side diff of Fees, Average & Highest Placements, Cutoffs, Exams and Recruiters.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={collegeSearchTerm}
                  onChange={(e) => setCollegeSearchTerm(e.target.value)}
                  placeholder="Search college name or city..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  College 1 (Left)
                </label>
                <select
                  value={college1Slug}
                  onChange={(e) => setCollege1Slug(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
                >
                  {filteredCollegesList.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} ({c.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  College 2 (Right)
                </label>
                <select
                  value={college2Slug}
                  onChange={(e) => setCollege2Slug(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
                >
                  {filteredCollegesList.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} ({c.location})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Matrix */}
          {college1 && college2 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-white text-xs uppercase tracking-wider border-b border-slate-800">
                    <th className="p-4 w-1/3 text-slate-400">Feature / Metric</th>
                    <th className="p-4 w-1/3 text-amber-400 font-extrabold border-l border-slate-800">
                      {college1.name}
                    </th>
                    <th className="p-4 w-1/3 text-indigo-400 font-extrabold border-l border-slate-800">
                      {college2.name}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-4 font-bold text-slate-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" /> Location / City
                    </td>
                    <td className="p-4 font-semibold text-white border-l border-slate-800">{college1.location}</td>
                    <td className="p-4 font-semibold text-white border-l border-slate-800">{college2.location}</td>
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="p-4 font-bold text-slate-300 flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-amber-400" /> Total Program Fees
                    </td>
                    <td className="p-4 font-extrabold text-amber-400 border-l border-slate-800">{college1.fees}</td>
                    <td className="p-4 font-extrabold text-indigo-400 border-l border-slate-800">{college2.fees}</td>
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="p-4 font-bold text-slate-300 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" /> Average Placement (CTC)
                    </td>
                    <td className="p-4 font-extrabold text-emerald-400 border-l border-slate-800">
                      {college1.avg_placement}
                    </td>
                    <td className="p-4 font-extrabold text-emerald-400 border-l border-slate-800">
                      {college2.avg_placement}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="p-4 font-bold text-slate-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" /> Highest Placement (CTC)
                    </td>
                    <td className="p-4 font-extrabold text-purple-400 border-l border-slate-800">
                      {college1.highest_placement}
                    </td>
                    <td className="p-4 font-extrabold text-purple-400 border-l border-slate-800">
                      {college2.highest_placement}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="p-4 font-bold text-slate-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-400" /> Accreditations & Ranking
                    </td>
                    <td className="p-4 text-slate-200 border-l border-slate-800">{college1.ranking}</td>
                    <td className="p-4 text-slate-200 border-l border-slate-800">{college2.ranking}</td>
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="p-4 font-bold text-slate-300">Accepted Entrance Exams</td>
                    <td className="p-4 border-l border-slate-800">
                      <div className="flex flex-wrap gap-1.5">
                        {(college1.exams || ["CAT", "MAT"]).map((e: string) => (
                          <span key={e} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                            {e}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 border-l border-slate-800">
                      <div className="flex flex-wrap gap-1.5">
                        {(college2.exams || ["CAT", "XAT"]).map((e: string) => (
                          <span key={e} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                            {e}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/30">
                    <td className="p-4 font-bold text-slate-300">Top Recruiters</td>
                    <td className="p-4 border-l border-slate-800 text-slate-300">
                      {Array.isArray(college1.top_recruiters) ? college1.top_recruiters.join(", ") : "Deloitte, KPMG, ICICI"}
                    </td>
                    <td className="p-4 border-l border-slate-800 text-slate-300">
                      {Array.isArray(college2.top_recruiters) ? college2.top_recruiters.join(", ") : "Amazon, Infosys, EY"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: SEO Before/After Optimization Diff */}
      {subTab === "seo-diff" && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> SEO Optimization Before / After Diff
            </h3>
            <p className="text-xs text-slate-400">
              Standardized comparison of title tags, metadata descriptions, H1/H2 structures, and FAQ schema injections.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Before */}
              <div className="bg-slate-950 border border-red-500/20 rounded-xl p-4 space-y-2">
                <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 text-[10px] font-bold uppercase">
                  Before SEO Optimization
                </span>
                <div className="text-xs font-bold text-white">Direct MBA Admission Pune 2026</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  MBA admissions in Pune are open. Contact us for direct admission process in top colleges.
                </p>
                <div className="text-[10px] font-mono text-red-400">❌ Missing Target ROI Data • ❌ No FAQ Schema</div>
              </div>

              {/* After */}
              <div className="bg-slate-950 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">
                  After SEO & GEO Optimization
                </span>
                <div className="text-xs font-bold text-white">
                  Direct MBA Admission in Pune Under 8 Lakhs: Top Colleges & Placement ROI (2027)
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Complete guide to direct MBA admission in Pune with fee vs average salary ROI comparison, management quota rules, and top B-schools.
                </p>
                <div className="text-[10px] font-mono text-emerald-400">
                  ✅ 40-60 Word AI Summary • ✅ 4-Column ROI Table • ✅ FAQPage JSON-LD Schema
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: Live Git Commits & Change Log */}
      {subTab === "git" && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GitCommit className="w-5 h-5 text-indigo-400" /> Recent Git Commits & Production Deployments
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Automatic audit of recently published blogs, UI enhancements, and SEO updates.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                {recentCommits.length} Recent Commits Tracked
              </span>
            </div>

            <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden">
              {recentCommits.map((commit, i) => (
                <div key={commit.hash || i} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-800/40 transition-all">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono text-[10px] font-bold">
                        {commit.hash}
                      </span>
                      <span className="text-xs font-semibold text-white truncate">{commit.subject}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>By {commit.author}</span>
                      <span>•</span>
                      <span>{commit.date}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(commit.hash, commit.hash)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors shrink-0 cursor-pointer"
                    title="Copy Commit Hash"
                  >
                    {copiedHash === commit.hash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
