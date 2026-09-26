"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Building2,
  MapPin,
  ArrowRight,
  X,
  Sparkles,
  TrendingUp,
  Clock,
  Target,
  Calculator,
  Laptop,
  GraduationCap,
  Percent,
  CheckCircle2,
  ChevronRight,
  FileText
} from "lucide-react";
import { FEATURED_DIRECTORY_COLLEGES, FeaturedCollege } from "@/lib/featuredColleges";
import { COLLEGE_ALIASES } from "@/lib/collegeSearch";

// Popular placeholder rotations just like top education portals
const ROTATING_PLACEHOLDERS = [
  "Search Colleges, Courses, Exams, QnA, & Articles...",
  "Search 'Top MBA Colleges in Delhi NCR'...",
  "Search 'IIM Bangalore Cutoffs & Fees'...",
  "Search 'CAT 2026 Score & Percentile Calculator'...",
  "Search 'MBA Application Form Discounts'...",
  "Search 'Top B.Tech CSE Colleges in Bangalore'...",
  "Search 'UGC-DEB Approved Online MBA'...",
  "Search 'Study in USA / Germany / UK'...",
];

// Curated Top Trending Searches
const TRENDING_SEARCHES = [
  { label: "Top MBA Colleges in Delhi NCR", href: "/colleges/mba-colleges-delhi-ncr", icon: "🏛️", badge: "Hot" },
  { label: "Top 20 IIMs & XLRI Cutoffs", href: "/top-tier-mba-colleges?tab=iim", icon: "🏆", badge: "Tier-1" },
  { label: "CAT 2026 Score Calculator", href: "/tools/cat-score-calculator", icon: "📊", badge: "AI Tool" },
  { label: "MBA Form Combo Discounts (Save ₹5k+)", href: "/mba-application-form-discount", icon: "💰", badge: "Save ₹" },
  { label: "Top MBA Colleges in Pune", href: "/colleges/mba-colleges-pune", icon: "📍" },
  { label: "Top Engineering Colleges in Delhi", href: "/colleges/top-engineering-colleges-in-delhi", icon: "⚡" },
  { label: "UGC-DEB Online MBA Programs", href: "/online-degree-certification", icon: "💻", badge: "UGC" },
  { label: "Free CBT Mock Tests (50+ Tests)", href: "/mock-tests", icon: "🎯", badge: "Free" },
];

// Quick Portal Tools for search modal
const QUICK_PORTAL_TOOLS = [
  { label: "MBA Direct Admission 2027", href: "/mba-pgdm-admission-2027", icon: GraduationCap, color: "text-amber-600 bg-amber-50" },
  { label: "CAT / MAT Score Predictor", href: "/tools/cat-score-calculator", icon: Calculator, color: "text-blue-600 bg-blue-50" },
  { label: "MBA Form Discount Bundle", href: "/mba-application-form-discount", icon: Percent, color: "text-emerald-600 bg-emerald-50" },
  { label: "Free ATS Resume Builder", href: "/tools/ats-resume-builder", icon: FileText, color: "text-purple-600 bg-purple-50" },
];

interface MatchedItem {
  type: "college" | "tool" | "exam";
  slug: string;
  name: string;
  location?: string;
  fees?: string;
  avg_placement?: string;
  badge?: string;
  ranking?: string;
  href?: string;
}

function SearchInputInner({
  isMobile = false,
  onSearch,
}: {
  isMobile?: boolean;
  onSearch?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<"all" | "colleges" | "tools">("all");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const router = useRouter();
  const searchParams = useSearchParams();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync initial query
  useEffect(() => {
    const q = searchParams?.get("q") || searchParams?.get("search") || "";
    if (q) setQuery(q);
  }, [searchParams]);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cwm_recent_searches");
      if (stored) {
        setRecentSearches(JSON.parse(stored).slice(0, 5));
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  // Animated placeholder rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PLACEHOLDERS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Global Keyboard Shortcut: ⌘K, Ctrl+K or '/' focuses search
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smart Search matching
  const matchedResults = useMemo<MatchedItem[]>(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];

    const results: MatchedItem[] = [];

    // 1. Match Featured Colleges & Aliases
    FEATURED_DIRECTORY_COLLEGES.forEach((c) => {
      const slugKey = c.slug.replace(/^colleges\//, "");
      const aliases = COLLEGE_ALIASES[slugKey] || [];
      const nameLower = c.name.toLowerCase();
      const locLower = c.location.toLowerCase();
      const rankLower = c.ranking.toLowerCase();

      const isMatch =
        nameLower.includes(clean) ||
        locLower.includes(clean) ||
        rankLower.includes(clean) ||
        c.exams.some((e) => e.toLowerCase().includes(clean)) ||
        aliases.some((a) => a.toLowerCase().includes(clean));

      if (isMatch) {
        results.push({
          type: "college",
          slug: slugKey,
          name: c.name,
          location: c.location,
          fees: c.fees,
          avg_placement: c.avgPlacement,
          badge: c.tag || c.rating ? `${c.rating} ★` : undefined,
          ranking: c.ranking,
        });
      }
    });

    // 2. Match Tools / Calculators / Mock Tests
    const TOOL_KEYWORDS = [
      { name: "CAT 2026 Score & Percentile Calculator", href: "/tools/cat-score-calculator", keywords: ["cat", "percentile", "calculator", "score"] },
      { name: "MBA Application Form Discount Calculator", href: "/mba-application-form-discount", keywords: ["discount", "form", "combo", "application", "save"] },
      { name: "Free CBT Mock Test Series (50+ Tests)", href: "/mock-tests", keywords: ["mock", "test", "cbt", "xat", "cat", "mat", "nmat", "snap"] },
      { name: "Free ATS Resume Builder for Placements", href: "/tools/ats-resume-builder", keywords: ["resume", "ats", "builder", "cv", "placement"] },
      { name: "B.Tech College Predictor by JEE Rank", href: "/tools/btech-college-predictor", keywords: ["btech", "jee", "predictor", "rank", "engineering"] },
      { name: "UGC-DEB Online Degrees & Universities Hub", href: "/online-degree-certification", keywords: ["online", "degree", "ugc", "mca", "bba", "distance"] },
      { name: "Study Abroad Admissions (USA, UK, Canada)", href: "/abroad-education", keywords: ["abroad", "usa", "uk", "ielts", "gre", "canada", "germany"] },
    ];

    TOOL_KEYWORDS.forEach((t) => {
      const isToolMatch = t.keywords.some((k) => clean.includes(k) || k.includes(clean)) || t.name.toLowerCase().includes(clean);
      if (isToolMatch) {
        results.push({
          type: "tool",
          slug: t.href,
          name: t.name,
          href: t.href,
          badge: "Direct Tool",
        });
      }
    });

    return results.slice(0, 8);
  }, [query]);

  // Filtered by Category Tab in Dropdown
  const filteredSuggestions = useMemo(() => {
    if (activeCategoryFilter === "colleges") {
      return matchedResults.filter((r) => r.type === "college");
    }
    if (activeCategoryFilter === "tools") {
      return matchedResults.filter((r) => r.type === "tool" || r.type === "exam");
    }
    return matchedResults;
  }, [matchedResults, activeCategoryFilter]);

  const saveRecentSearch = (text: string) => {
    try {
      const clean = text.trim();
      if (!clean) return;
      const updated = [clean, ...recentSearches.filter((s) => s.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem("cwm_recent_searches", JSON.stringify(updated));
    } catch (e) {
      // Ignore
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem("cwm_recent_searches");
    } catch (e) {
      // Ignore
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = query.trim();
    if (clean) {
      saveRecentSearch(clean);
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(clean)}`);
      if (onSearch) onSearch();
    }
  };

  const handleSelectCollege = (slug: string, name: string) => {
    saveRecentSearch(name);
    setIsOpen(false);
    router.push(`/colleges/${slug}`);
    if (onSearch) onSearch();
  };

  const handleSelectTool = (href: string, name: string) => {
    saveRecentSearch(name);
    setIsOpen(false);
    router.push(href);
    if (onSearch) onSearch();
  };

  // Keyboard navigation inside suggestions list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const item = filteredSuggestions[selectedIndex];
      if (item) {
        if (item.type === "college") {
          handleSelectCollege(item.slug, item.name);
        } else if (item.href) {
          handleSelectTool(item.href, item.name);
        }
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${isMobile ? "w-full" : "w-full max-w-xl xl:max-w-2xl"}`}>
      
      {/* ── HIGH-CONVERTING EDUCATION PORTAL SEARCH BAR ── */}
      <form
        onSubmit={handleSearch}
        className={`flex items-center w-full h-10.5 rounded-xl border bg-white transition-all shadow-xs ${
          isOpen
            ? "border-blue-600 ring-3 ring-blue-500/15 shadow-md"
            : "border-slate-300/90 hover:border-slate-400"
        }`}
      >
        {/* Left Search Icon with Portal Scope Hint */}
        <div className="pl-3.5 pr-2 flex items-center text-slate-400 pointer-events-none">
          <Search className="w-4 h-4 text-blue-600 stroke-[2.2]" />
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          aria-label="Search colleges, courses, exams and calculators"
          placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="h-full flex-1 bg-transparent px-1 text-[13px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />

        {/* Clear Button (When Query Exists) */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg mr-1 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Keyboard Shortcut Indicator (Desktop only) */}
        <div className="hidden xl:flex items-center mr-2 text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-md select-none">
          ⌘K
        </div>

        {/* High-Contrast Education Portal Orange "Search" Button (Shiksha Style) */}
        <button
          type="submit"
          className="h-[34px] my-1 mr-1 px-4 sm:px-5 rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 active:scale-98"
        >
          <span>Search</span>
          <ArrowRight className="w-3.5 h-3.5 text-white/90 hidden sm:inline-block" />
        </button>
      </form>

      {/* ── RICH AUTOCOMPLETE & TRENDING SEARCH MODAL ── */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden divide-y divide-slate-100 text-left animate-in fade-in slide-in-from-top-1 duration-150">
          
          {/* STATE A: EMPTY QUERY -> SHOW TRENDING & QUICK TOOLS */}
          {!query.trim() && (
            <div className="p-4 flex flex-col gap-4 max-h-[440px] overflow-y-auto">
              
              {/* Recent Searches (if any) */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Recent Searches
                    </span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 normal-case"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((rec) => (
                      <button
                        key={rec}
                        type="button"
                        onClick={() => {
                          setQuery(rec);
                          handleSearch();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>{rec}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 🔥 Trending Searches Grid */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                    Trending Searches in India
                  </span>
                  <span className="text-[10px] text-amber-800 bg-amber-100 font-bold px-1.5 py-0.5 rounded">
                    Popular
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {TRENDING_SEARCHES.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        saveRecentSearch(item.label);
                        setIsOpen(false);
                      }}
                      className="p-2 rounded-xl hover:bg-blue-50/80 text-slate-700 hover:text-blue-700 text-xs font-semibold flex items-center justify-between gap-2 transition-colors group"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-sm shrink-0">{item.icon}</span>
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 border border-orange-200 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* ⚡ Quick Portal Tools */}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Quick Admissions Shortcuts
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_PORTAL_TOOLS.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.label}
                        href={tool.href}
                        onClick={() => {
                          saveRecentSearch(tool.label);
                          setIsOpen(false);
                        }}
                        className="p-2 rounded-xl border border-slate-200/80 hover:border-blue-300 bg-slate-50/50 hover:bg-white text-xs font-bold text-slate-800 hover:text-blue-600 flex items-center gap-2 transition-all shadow-2xs group"
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${tool.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{tool.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STATE B: QUERY TYPED -> INSTANT SMART SEARCH RESULTS */}
          {query.trim().length > 0 && (
            <div>
              {/* Category Filter Pills */}
              <div className="p-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveCategoryFilter("all")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      activeCategoryFilter === "all"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-200/70"
                    }`}
                  >
                    All ({matchedResults.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategoryFilter("colleges")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      activeCategoryFilter === "colleges"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-200/70"
                    }`}
                  >
                    Colleges ({matchedResults.filter((r) => r.type === "college").length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategoryFilter("tools")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      activeCategoryFilter === "tools"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-200/70"
                    }`}
                  >
                    Tools &amp; Exams ({matchedResults.filter((r) => r.type !== "college").length})
                  </button>
                </div>
                <span className="text-[11px] text-slate-700 font-semibold hidden sm:inline-block">
                  Navigate with ↑ ↓
                </span>
              </div>

              {/* Suggestions List */}
              <div className="p-2 space-y-1 max-h-[350px] overflow-y-auto">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item, idx) => {
                    const isSelected = selectedIndex === idx;

                    if (item.type === "college") {
                      return (
                        <div
                          key={item.slug}
                          onClick={() => handleSelectCollege(item.slug, item.name)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`p-2.5 rounded-xl text-slate-800 flex items-center justify-between gap-3 cursor-pointer transition-all ${
                            isSelected ? "bg-blue-50/90 ring-1 ring-blue-500/20" : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0 font-black text-xs mt-0.5">
                              <Building2 className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">
                                {item.name}
                              </div>
                              <div className="text-[11px] text-slate-700 flex items-center gap-1.5 mt-0.5">
                                {item.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-2.5 h-2.5 text-slate-400" />
                                    <span>{item.location}</span>
                                  </span>
                                )}
                                {item.avg_placement && (
                                  <>
                                    <span>•</span>
                                    <span className="text-emerald-700 font-bold">
                                      Avg: {item.avg_placement}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {item.badge && (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      );
                    }

                    // Tool / Exam suggestion
                    return (
                      <div
                        key={item.slug}
                        onClick={() => handleSelectTool(item.href || item.slug, item.name)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`p-2.5 rounded-xl text-slate-800 flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          isSelected ? "bg-blue-50/90 ring-1 ring-blue-500/20" : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-xs">
                            <Target className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded shrink-0">
                          Open Tool
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-6 text-center text-slate-500">
                    <p className="text-xs font-semibold">
                      No direct match found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Press enter to run a comprehensive portal search.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Action Bar */}
          <div className="p-3 bg-slate-50 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => handleSearch()}
              className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Search all &ldquo;{query || "colleges"}&rdquo; results &rarr;</span>
            </button>
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20help%20choosing%20a%20college"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Need Help? Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      )}
    </div>
  );
}

export function SearchInput(props: { isMobile?: boolean; onSearch?: () => void }) {
  return (
    <Suspense
      fallback={
        <div
          className={`h-10.5 w-full bg-slate-100 rounded-xl animate-pulse border border-slate-200`}
        />
      }
    >
      <SearchInputInner {...props} />
    </Suspense>
  );
}
