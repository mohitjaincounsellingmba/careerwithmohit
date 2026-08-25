"use client";

import { useState } from "react";
import { SEO_TOPICS_BANK, getDailyBlogSuggestions, BlogTopicSuggestion } from "@/lib/seo-topics-bank";
import { Sparkles, Copy, Check, Target, TrendingUp, Layers, HelpCircle, BookOpen, Compass, ShieldCheck, ArrowRight, Lightbulb } from "lucide-react";

export function SeoSuggestionsTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedTopics, setSavedTopics] = useState<string[]>([]);
  const [activeOutlineId, setActiveOutlineId] = useState<string | null>(null);

  // Daily 5 topics derived from calendar date
  const daily5 = getDailyBlogSuggestions(5);

  const categories = [
    "All",
    "CAT & Entrance Exams",
    "Direct MBA & PGDM",
    "Profile & GD-PI Prep",
    "Executive & Online MBA",
    "Specializations & ROI"
  ];

  const displayTopics = daily5.filter(
    (t) => selectedCategory === "All" || t.category === selectedCategory
  );

  const handleCopyPrompt = (id: string, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleSaveTopic = (id: string) => {
    setSavedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const todayStr = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="space-y-6 font-body">
      {/* Top Banner: Today's Suggestions Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" /> Daily Competitor SEO Intelligence
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Today's 5 Blog Topic Suggestions
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Curated daily for MBA/PGDM Admissions & Entrance Exams based on Shiksha & Collegedunia Gap Analysis • <span className="text-amber-400 font-semibold">{todayStr}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              5 Fresh Topics Loaded
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-5 border-t border-slate-800/80 mt-5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Daily 5 Topic Cards */}
      <div className="space-y-4">
        {displayTopics.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-sm">
            No suggestions found for category "{selectedCategory}" today. Switch to "All" to view today's 5 topics.
          </div>
        ) : (
          displayTopics.map((topic, idx) => {
            const isSaved = savedTopics.includes(topic.id);
            const isOutlineOpen = activeOutlineId === topic.id;

            return (
              <div
                key={topic.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 shadow-lg transition-all space-y-4 relative group"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                        {topic.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        Vol: {topic.searchVolume}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20">
                        Diff: {topic.keywordDifficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors leading-snug pt-1">
                      {topic.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleSaveTopic(topic.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isSaved
                          ? "bg-amber-500 text-slate-950 border-amber-500"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {isSaved ? "Saved ✓" : "Save Idea"}
                    </button>

                    <button
                      onClick={() => handleCopyPrompt(topic.id, topic.aiPrompt)}
                      className="px-4 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      {copiedId === topic.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy AI Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Keywords & Target Audience Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-amber-400" /> Target Keywords
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
                        {topic.primaryKeyword}
                      </span>
                      {topic.secondaryKeywords.map((sk) => (
                        <span key={sk} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-blue-400" /> Target Audience & Intent
                    </div>
                    <p className="text-xs text-slate-300 pt-0.5 leading-relaxed">
                      {topic.targetAudience}
                    </p>
                  </div>
                </div>

                {/* Competitor Gap & Opportunity */}
                <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-400">Competitor Gap Opportunity: </span>
                    <span className="text-slate-300">{topic.competitorGap}</span>
                  </div>
                </div>

                {/* Outline Toggle Accordion */}
                <div>
                  <button
                    onClick={() => setActiveOutlineId(isOutlineOpen ? null : topic.id)}
                    className="text-xs font-semibold text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isOutlineOpen ? "Hide Recommended H2/H3 Outline" : "View Recommended Blog Outline (5 Headings)"}</span>
                  </button>

                  {isOutlineOpen && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 animate-fadeIn text-xs">
                      <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px] text-amber-400 mb-2">
                        Suggested Content Outline for 99+ SEO Score:
                      </div>
                      <ol className="space-y-1.5 list-decimal list-inside text-slate-300">
                        {topic.suggestedOutline.map((head, hIdx) => (
                          <li key={hIdx} className="leading-relaxed">
                            <span className="font-semibold text-white">{head}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Competitor Strategy Reference Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Competitor SEO Intelligence Benchmark
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Based on domain analysis of **Shiksha.com**, **Collegedunia**, **Careers360**, and **CollegeDekho**:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="font-bold text-amber-400">1. Long-Tail Budget Formula</div>
            <div className="text-slate-400 text-[11px]">
              Rank high by targeting queries like `[Course] colleges in [City] under [Budget] Lakhs`.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="font-bold text-blue-400">2. Real Placement ROI Tables</div>
            <div className="text-slate-400 text-[11px]">
              Students convert on fee vs average package comparisons. Always include placement figures.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="font-bold text-emerald-400">3. Direct Counseling CTAs</div>
            <div className="text-slate-400 text-[11px]">
              End every post with a 1-on-1 profile evaluation CTA with Mohit Jain for direct leads.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
