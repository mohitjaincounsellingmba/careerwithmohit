"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Cpu,
  Laptop,
  Globe,
  Calculator,
  Search,
  MapPin,
  IndianRupee,
  Award,
  Sparkles,
  ArrowRight,
  Target,
  X,
  Building2,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";

import { FEATURED_DIRECTORY_COLLEGES } from "@/components/HomeCollegeExplorer";

type StreamTab = "mba" | "btech" | "online" | "abroad" | "mocks" | "calculators";

interface TabConfig {
  id: StreamTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

interface CollegeSuggestion {
  slug: string;
  name: string;
  logo?: string;
  location: string;
  category: string;
  fees: string;
  avg_placement: string;
  highest_placement?: string;
  ranking?: string;
  ownership?: string;
  exams?: string[];
}

const STREAM_TABS: TabConfig[] = [
  { id: "mba", label: "MBA & PGDM 2027", icon: GraduationCap, badge: "Popular", badgeColor: "bg-amber-400 text-slate-950 font-black" },
  { id: "btech", label: "B.Tech & Engg", icon: Cpu },
  { id: "online", label: "Online Degrees", icon: Laptop, badge: "UGC-DEB", badgeColor: "bg-cyan-400 text-slate-950 font-black" },
  { id: "abroad", label: "Study Abroad", icon: Globe, badge: "Global", badgeColor: "bg-emerald-400 text-slate-950 font-black" },
  { id: "mocks", label: "Free CBT Mocks", icon: Target, badge: "Free", badgeColor: "bg-rose-500 text-white font-black" },
  { id: "calculators", label: "Score Calculators", icon: Calculator },
];

export function EducationFinder() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<StreamTab>("mba");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  // Live Autocomplete Suggestions State
  const [suggestions, setSuggestions] = useState<CollegeSuggestion[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [totalMatches, setTotalMatches] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Instant in-memory search for suggestions
  useEffect(() => {
    const streamParam = activeTab === "btech" ? "btech" : activeTab === "mba" ? "mba" : "";
    const cleanQuery = searchQuery.trim().toLowerCase();

    const targetStreamColleges = FEATURED_DIRECTORY_COLLEGES.filter((c) => {
      if (streamParam === "mba") return c.stream === "mba";
      if (streamParam === "btech") return c.stream === "btech";
      return true;
    });

    if (!cleanQuery) {
      setSuggestions(
        targetStreamColleges.slice(0, 5).map((c) => ({
          slug: c.slug.replace(/^colleges\//, ""),
          name: c.name,
          location: c.location,
          category: c.category,
          fees: c.fees,
          avg_placement: c.avgPlacement,
          highest_placement: c.highestPlacement,
          ranking: c.ranking,
          ownership: c.ownership,
          exams: c.exams,
        }))
      );
      setPopularSearches(
        streamParam === "btech"
          ? ["Top B.Tech in Delhi NCR", "Best Engg in Bangalore", "COEP & VJTI Pune", "JEE Main 90+ %ile Colleges"]
          : ["Top 20 IIMs", "NMIMS Mumbai SBM", "SIBM & SCMHRD Pune", "Best MBA under ₹10 Lakhs Fees", "Direct Admission PGDM"]
      );
      setTotalMatches(targetStreamColleges.length);
      return;
    }

    const matches = targetStreamColleges.filter((c) => {
      return (
        c.name.toLowerCase().includes(cleanQuery) ||
        c.location.toLowerCase().includes(cleanQuery) ||
        c.state.toLowerCase().includes(cleanQuery) ||
        c.city.toLowerCase().includes(cleanQuery) ||
        c.ranking.toLowerCase().includes(cleanQuery) ||
        c.exams.some((e) => e.toLowerCase().includes(cleanQuery))
      );
    });

    setSuggestions(
      matches.slice(0, 6).map((c) => ({
        slug: c.slug.replace(/^colleges\//, ""),
        name: c.name,
        location: c.location,
        category: c.category,
        fees: c.fees,
        avg_placement: c.avgPlacement,
        highest_placement: c.highestPlacement,
        ranking: c.ranking,
        ownership: c.ownership,
        exams: c.exams,
      }))
    );
    setTotalMatches(matches.length);
    setPopularSearches(
      [
        `Top Colleges matching "${searchQuery}"`,
        `Fee Structure for "${searchQuery}"`,
        `Cutoff Percentiles for "${searchQuery}"`,
      ].slice(0, 3)
    );
  }, [searchQuery, activeTab, selectedLocation]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsDropdownOpen(false);

    if (activeTab === "mba" || activeTab === "btech") {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set("search", searchQuery.trim());
      if (selectedLocation) params.set("location", selectedLocation);
      if (selectedBudget) params.set("budget", selectedBudget);
      if (selectedExam) params.set("exam", selectedExam);
      params.set("category", activeTab === "btech" ? "Engineering" : "Management");
      if (activeTab === "btech") params.set("course", "B.Tech");

      const queryString = params.toString();
      
      // If college explorer exists in DOM on home page, smoothly scroll to it and optionally update URL
      const inPageExplorer = document.getElementById("college-explorer");
      if (inPageExplorer && !searchQuery.trim()) {
        inPageExplorer.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/colleges${queryString ? `?${queryString}` : ""}`);
      }
    } else if (activeTab === "online") {
      router.push("/online-degree-certification");
    } else if (activeTab === "abroad") {
      router.push("/abroad-education");
    } else if (activeTab === "mocks") {
      router.push("/mock-tests");
    } else if (activeTab === "calculators") {
      router.push("/tools/cat-score-calculator");
    }
  };

  const handleSelectCollege = (slug: string) => {
    setIsDropdownOpen(false);
    router.push(`/colleges/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen) {
      if (e.key === "ArrowDown") {
        setIsDropdownOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        e.preventDefault();
        handleSelectCollege(suggestions[selectedIndex].slug);
      } else {
        handleSearchSubmit();
      }
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-white/20 p-3 sm:p-6 shadow-2xl shadow-black/60 text-white transition-all">
      {/* Stream Tabs Navigation */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 sm:pb-4 border-b border-white/10 no-scrollbar">
        {STREAM_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedIndex(-1);
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02] ring-1 ring-white/30"
                  : "bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-blue-400"}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${tab.badgeColor}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stream Form View */}
      <div className="pt-4 sm:pt-6">
        {activeTab === "mba" && (
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* College & Course Autocomplete Search Input */}
              <div ref={containerRef} className="sm:col-span-4 relative">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search college, city, MBA, ROI..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsDropdownOpen(true);
                      setSelectedIndex(-1);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-12 pl-10 pr-9 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        inputRef.current?.focus();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Live Real-time Predictive College Search Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900/98 backdrop-blur-2xl border border-white/25 rounded-2xl shadow-2xl z-50 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150 divide-y divide-white/10 ring-1 ring-black/50">
                    
                    {/* Header showing match status */}
                    <div className="px-3.5 py-2.5 bg-white/5 flex items-center justify-between text-[11px] font-bold text-slate-300">
                      <span className="flex items-center gap-1.5 text-blue-300">
                        <Building2 className="w-3.5 h-3.5" />
                        {searchQuery.trim() ? "Direct College Matches" : "Top Verified Colleges"}
                      </span>
                      {totalMatches > 0 && (
                        <span className="text-amber-300 font-extrabold">{totalMatches} colleges found</span>
                      )}
                    </div>

                    {/* Matched Colleges List */}
                    {suggestions.length > 0 ? (
                      <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
                        {suggestions.map((col, idx) => {
                          const isSelected = selectedIndex === idx;
                          return (
                            <div
                              key={col.slug}
                              onClick={() => handleSelectCollege(col.slug)}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className={`flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                                isSelected ? "bg-blue-600 text-white" : "hover:bg-white/10 text-slate-200"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xs font-black text-amber-300 shrink-0">
                                  {col.name.charAt(0)}
                                </div>
                                <div className="truncate">
                                  <div className="text-xs sm:text-sm font-bold truncate text-white">
                                    {col.name}
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-slate-300 mt-0.5">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                                      {col.location}
                                    </span>
                                    <span>•</span>
                                    <span className="text-emerald-300 font-bold">Avg: {col.avg_placement}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="hidden sm:flex items-center gap-2 shrink-0">
                                <span className="text-[10px] font-bold bg-white/15 px-2 py-0.5 rounded text-white">
                                  {col.fees}
                                </span>
                                <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? "text-white translate-x-0.5" : "text-slate-400"}`} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : searchQuery.trim() ? (
                      <div className="p-4 text-center text-xs text-slate-400">
                        No direct college name match for &ldquo;{searchQuery}&rdquo;.
                        <div className="mt-1 text-[11px] text-blue-300 font-medium">
                          Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 text-[10px] font-mono">Enter</kbd> to search across all cutoffs, cities &amp; courses.
                        </div>
                      </div>
                    ) : null}

                    {/* Popular Quick Searches */}
                    {popularSearches.length > 0 && (
                      <div className="p-3 bg-white/5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                          Trending Searches
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {popularSearches.map((s, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSearchQuery(s);
                                setIsDropdownOpen(false);
                                router.push(`/colleges?search=${encodeURIComponent(s)}`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer View All Action */}
                    <div className="p-2.5 bg-slate-950 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => handleSearchSubmit()}
                        className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>View all {totalMatches > 0 ? `${totalMatches} ` : ""}colleges on directory</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(false)}
                        className="text-slate-500 hover:text-slate-300 text-[11px] cursor-pointer"
                      >
                        Close [Esc]
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* City / Hub Selector */}
              <div className="sm:col-span-3 relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 pointer-events-none" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full h-12 pl-10 pr-8 rounded-xl bg-slate-800 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer appearance-none"
                >
                  <option value="">All Locations (Pan-India)</option>
                  <option value="delhi-ncr">Delhi NCR (Noida/Gurgaon)</option>
                  <option value="pune">Pune &amp; Mumbai</option>
                  <option value="bangalore">Bangalore &amp; South</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="jaipur">Jaipur / Rajasthan</option>
                  <option value="kolkata">Kolkata / East</option>
                </select>
              </div>

              {/* Budget Tier */}
              <div className="sm:col-span-3 relative">
                <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" />
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full h-12 pl-10 pr-8 rounded-xl bg-slate-800 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer appearance-none"
                >
                  <option value="">Any Budget Tier</option>
                  <option value="under-10l">High ROI (Under ₹10 Lakhs)</option>
                  <option value="10l-16l">Mid-Tier (₹10L - ₹16 Lakhs)</option>
                  <option value="16l-25l">Premier Tier (₹16L - ₹25 Lakhs)</option>
                  <option value="above-25l">Elite Tier (₹25L+)</option>
                </select>
              </div>

              {/* Action Submit */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 active:scale-98 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Links Tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="text-slate-400 font-medium">Quick Discovery:</span>
              <Link href="/top-tier-mba-colleges?tab=iim" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-blue-200 border border-white/10 transition-colors">
                🏛️ Top 20 IIMs
              </Link>
              <Link href="/top-tier-mba-colleges?tab=nmat" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/10 transition-colors">
                ⚡ NMIMS &amp; SIBM
              </Link>
              <Link href="/mba-application-form-discount" className="px-3 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 font-bold transition-colors">
                🏷️ Save ₹5,000+ Form Combos
              </Link>
              <Link href="/top-tier-mba-colleges?tab=roi" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 border border-white/10 transition-colors">
                💰 Best ROI (&lt; ₹10L Fee)
              </Link>
            </div>
          </form>
        )}

        {activeTab === "btech" && (
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
              <div ref={containerRef} className="sm:col-span-5 relative">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search B.Tech colleges (e.g. Computer Science, IIT, NIT, Delhi)..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-12 pl-10 pr-9 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/15 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Live Dropdown for B.Tech */}
                {isDropdownOpen && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900/98 backdrop-blur-2xl border border-white/25 rounded-2xl shadow-2xl z-50 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150 divide-y divide-white/10 ring-1 ring-black/50">
                    <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
                      {suggestions.map((col) => (
                        <div
                          key={col.slug}
                          onClick={() => handleSelectCollege(col.slug)}
                          className="flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-emerald-600 hover:text-white text-slate-200 transition-all group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-black text-emerald-300">
                              {col.name.charAt(0)}
                            </div>
                            <div className="truncate">
                              <div className="text-xs sm:text-sm font-bold truncate text-white">
                                {col.name}
                              </div>
                              <div className="text-[11px] text-slate-300">
                                {col.location} • <span className="text-emerald-300 font-bold">Avg: {col.avg_placement}</span>
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="sm:col-span-4 relative">
                <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 pointer-events-none" />
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full h-12 pl-10 pr-8 rounded-xl bg-slate-800 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer appearance-none"
                >
                  <option value="">Entrance: JEE Main / Direct / CET</option>
                  <option value="jee-main">JEE Main 90+ %ile</option>
                  <option value="jee-70-90">JEE Main 70-90 %ile</option>
                  <option value="direct">Direct / Merit Based Admissions</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Explore B.Tech</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="text-slate-400 font-medium">B.Tech Hubs:</span>
              <Link href="/colleges?category=Engineering&state=Delhi+NCR" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/10 transition-colors">
                🏛️ Delhi NCR (IIT/DTU/NSUT)
              </Link>
              <Link href="/colleges?category=Engineering&state=Karnataka" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-blue-200 border border-white/10 transition-colors">
                💻 Bangalore (RVCE/BMSCE)
              </Link>
              <Link href="/colleges?category=Engineering&state=Maharashtra" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/10 transition-colors">
                ⚡ Pune &amp; Mumbai (COEP/VJTI)
              </Link>
            </div>
          </form>
        )}

        {activeTab === "online" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-400 text-slate-950 text-[10px] font-black uppercase">
                    100% Legal Equivalence
                  </span>
                  <span className="text-xs text-slate-300 font-medium">UGC-DEB Entitled 2027</span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Compare 40+ NAAC A++ Accredited Online Universities
                </h3>
                <p className="text-xs text-blue-200/80">
                  Affordable Online MBA, MCA, BBA, BCA &amp; Data Science degrees with UPSC &amp; WES approval.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/online-degree-certification"
                  className="h-11 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <span>Explore Online Degrees</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Popular:</span>
              <Link href="/online-degree-certification/online-mba" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-200 border border-white/10">
                🎓 Online MBA
              </Link>
              <Link href="/online-degree-certification/online-mca" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-200 border border-white/10">
                💻 Online MCA (AI &amp; CS)
              </Link>
              <Link href="/online-degree-certification/cheapest-online-mba" className="px-3 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 font-bold">
                💰 Cheapest MBA (&lt; ₹1L)
              </Link>
              <Link href="/online-degree-certification/wes-approved-online-degrees" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/10">
                🌍 WES Approved (Canada/USA)
              </Link>
            </div>
          </div>
        )}

        {activeTab === "abroad" && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-400 text-slate-950 text-[10px] font-black uppercase">
                  Global Admissions 2027
                </span>
                <span className="text-xs text-slate-300 font-medium">USA • UK • Canada • Germany • Ireland</span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                Study Abroad End-to-End Strategic Counseling
              </h3>
              <p className="text-xs text-blue-200/80">
                University shortlisting, SOP/LOR drafting, IELTS/GRE prep, scholarship assistance, and visa filing.
              </p>
            </div>

            <Link
              href="/abroad-education"
              className="h-11 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/20 shrink-0"
            >
              <span>Explore Study Abroad</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {activeTab === "mocks" && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px] font-black uppercase">
                  100% Free Full Length CBT
                </span>
                <span className="text-xs text-slate-300 font-medium">CAT • XAT • NMAT • SNAP • CMAT</span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                Simulated CBT Mock Test Engine with Real Countdown Timers
              </h3>
              <p className="text-xs text-blue-200/80">
                Full-length sectional timing, negative marking calculations, and instant percentile score breakdown.
              </p>
            </div>

            <Link
              href="/mock-tests"
              className="h-11 px-5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-rose-500/20 shrink-0"
            >
              <span>Start Free CBT Mock</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {activeTab === "calculators" && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  Score to Percentile
                </span>
                <span className="text-xs text-slate-300 font-medium">Updated for 2026-2027 Scoring</span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                Live Percentile Calculators &amp; Call Predictors
              </h3>
              <p className="text-xs text-blue-200/80">
                Predict sectional percentiles for CAT, XAT, NMAT, SNAP, and calculate your MBA ROI payback timeline.
              </p>
            </div>

            <Link
              href="/tools/cat-score-calculator"
              className="h-11 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/20 shrink-0"
            >
              <span>Open Calculator Tool</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
