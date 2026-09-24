"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  ChevronDown,
  Star,
  Zap,
  Layers,
  ArrowUpRight
} from "lucide-react";

import { FEATURED_DIRECTORY_COLLEGES, type FeaturedCollege } from "@/lib/featuredColleges";

type StreamTab = "mba" | "btech" | "roi" | "online" | "mocks" | "calculators";

interface TabConfig {
  id: StreamTab;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const STREAM_TABS: TabConfig[] = [
  { 
    id: "mba", 
    label: "MBA & PGDM 2027", 
    sublabel: "55+ Tier-1 & AICTE", 
    icon: GraduationCap, 
    badge: "Most Popular", 
    badgeColor: "bg-amber-400 text-slate-950" 
  },
  { 
    id: "btech", 
    label: "B.Tech & Engg", 
    sublabel: "IITs, NITs, IIITs & DTU", 
    icon: Cpu,
    badge: "JEE / CET",
    badgeColor: "bg-emerald-400 text-slate-950" 
  },
  { 
    id: "roi", 
    label: "High ROI (< ₹10L)", 
    sublabel: "FMS, JBIMS, DBE & DSE", 
    icon: IndianRupee, 
    badge: "15x+ Payback", 
    badgeColor: "bg-purple-400 text-slate-950" 
  },
  { 
    id: "online", 
    label: "Online Degrees", 
    sublabel: "UGC-DEB NAAC A++", 
    icon: Laptop, 
    badge: "WES & UPSC", 
    badgeColor: "bg-cyan-400 text-slate-950" 
  },
  { 
    id: "mocks", 
    label: "Free CBT Mocks", 
    sublabel: "CAT, XAT, NMAT, SNAP", 
    icon: Target, 
    badge: "100% Free", 
    badgeColor: "bg-rose-500 text-white" 
  },
  { 
    id: "calculators", 
    label: "Score Predictors", 
    sublabel: "Percentile & Call Check", 
    icon: Calculator,
    badge: "2027 Tool",
    badgeColor: "bg-blue-400 text-slate-950"
  },
];

export function EducationFinder() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<StreamTab>("mba");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Compute matching colleges live in memory with 0ms lag
  const matchingColleges = useMemo(() => {
    const cleanQ = searchQuery.trim().toLowerCase();
    
    return FEATURED_DIRECTORY_COLLEGES.filter((c) => {
      // Stream filter
      let matchesStream = true;
      if (activeTab === "mba") matchesStream = c.stream === "mba";
      else if (activeTab === "btech") matchesStream = c.stream === "btech";
      else if (activeTab === "roi") matchesStream = c.category === "roi" || !!c.isHighRoi;
      else if (activeTab === "online") matchesStream = c.stream === "online";

      // Location filter
      let matchesLocation = true;
      if (selectedLocation) {
        const cleanLoc = selectedLocation.toLowerCase().replace(/[\-_]/g, " ");
        matchesLocation =
          c.location.toLowerCase().includes(cleanLoc) ||
          c.state.toLowerCase().includes(cleanLoc) ||
          c.city.toLowerCase().includes(cleanLoc);
      }

      // Budget filter
      let matchesBudget = true;
      if (selectedBudget === "under-5l") {
        matchesBudget = c.feeNum <= 5.0;
      } else if (selectedBudget === "5l-10l") {
        matchesBudget = c.feeNum > 5.0 && c.feeNum <= 10.0;
      } else if (selectedBudget === "10l-18l") {
        matchesBudget = c.feeNum > 10.0 && c.feeNum <= 18.0;
      } else if (selectedBudget === "above-18l") {
        matchesBudget = c.feeNum > 18.0;
      }

      // Exam filter
      let matchesExam = true;
      if (selectedExam) {
        const cleanEx = selectedExam.toLowerCase();
        matchesExam = c.exams.some(e => e.toLowerCase().includes(cleanEx)) || c.cutoff.toLowerCase().includes(cleanEx);
      }

      // Text query filter
      let matchesQuery = true;
      if (cleanQ) {
        matchesQuery =
          c.name.toLowerCase().includes(cleanQ) ||
          c.location.toLowerCase().includes(cleanQ) ||
          c.state.toLowerCase().includes(cleanQ) ||
          c.city.toLowerCase().includes(cleanQ) ||
          c.ranking.toLowerCase().includes(cleanQ) ||
          c.tag.toLowerCase().includes(cleanQ) ||
          c.cutoff.toLowerCase().includes(cleanQ) ||
          c.exams.some((e) => e.toLowerCase().includes(cleanQ));
      }

      return matchesStream && matchesLocation && matchesBudget && matchesExam && matchesQuery;
    });
  }, [searchQuery, activeTab, selectedLocation, selectedBudget, selectedExam]);

  // Click outside to close live dropdown preview
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowLivePreview(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowLivePreview(false);

    if (activeTab === "mba" || activeTab === "btech" || activeTab === "roi") {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set("search", searchQuery.trim());
      if (selectedLocation) params.set("location", selectedLocation);
      if (selectedBudget) params.set("budget", selectedBudget);
      if (selectedExam) params.set("exam", selectedExam);
      params.set("category", activeTab === "btech" ? "Engineering" : "Management");
      if (activeTab === "btech") params.set("course", "B.Tech");

      const queryString = params.toString();
      
      // If college explorer section exists on current page, smooth scroll to it
      const inPageExplorer = document.getElementById("college-explorer");
      if (inPageExplorer && !searchQuery.trim() && !selectedLocation && !selectedBudget) {
        inPageExplorer.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/colleges${queryString ? `?${queryString}` : ""}`);
      }
    } else if (activeTab === "online") {
      router.push("/online-degree-certification");
    } else if (activeTab === "mocks") {
      router.push("/mock-tests");
    } else if (activeTab === "calculators") {
      router.push("/tools/cat-score-calculator");
    }
  };

  const handleSelectCollege = (slug: string) => {
    setShowLivePreview(false);
    const cleanSlug = slug.replace(/^colleges\//, "");
    router.push(`/colleges/${cleanSlug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showLivePreview) {
      if (e.key === "ArrowDown") {
        setShowLivePreview(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < matchingColleges.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : matchingColleges.length - 1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && matchingColleges[selectedIndex]) {
        e.preventDefault();
        handleSelectCollege(matchingColleges[selectedIndex].slug);
      } else {
        handleSearchSubmit();
      }
    } else if (e.key === "Escape") {
      setShowLivePreview(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-white/25 p-4 sm:p-7 shadow-2xl shadow-blue-950/80 text-white transition-all ring-1 ring-white/10">
      
      {/* ── TOP STREAM TABS CAROUSEL / GRID ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 pb-5 border-b border-white/15">
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
              className={`group flex flex-col items-start p-3 rounded-2xl text-left transition-all cursor-pointer relative overflow-hidden border ${
                isActive
                  ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-blue-400/80 shadow-lg shadow-blue-600/40 scale-[1.03] ring-2 ring-blue-400/30"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"
              }`}
            >
              <div className="w-full flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? "bg-white/20 text-white" : "bg-white/10 text-blue-400 group-hover:text-blue-300"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider ${tab.badgeColor}`}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-extrabold leading-tight block text-white">
                {tab.label}
              </span>
              <span className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? "text-blue-100 font-medium" : "text-slate-400"}`}>
                {tab.sublabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── MAIN INTERACTIVE SEARCH & MULTI-FILTER BAR ── */}
      <div className="pt-5">
        {(activeTab === "mba" || activeTab === "btech" || activeTab === "roi") && (
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-3.5 items-center">
              
              {/* Primary Search Input with Predictive Autocomplete Dropdown */}
              <div ref={containerRef} className="sm:col-span-5 relative">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={
                      activeTab === "btech"
                        ? "Search B.Tech colleges (IIT, DTU, COEP, CS)..."
                        : "Search 770+ colleges (IIM, FMS, NMIMS, Pune)..."
                    }
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowLivePreview(true);
                      setSelectedIndex(-1);
                    }}
                    onFocus={() => setShowLivePreview(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-12 pl-10 pr-9 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition-all shadow-inner"
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

                {/* Instant Predictive Results Dropdown Preview */}
                {showLivePreview && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900/98 backdrop-blur-2xl border border-white/25 rounded-2xl shadow-2xl z-50 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150 divide-y divide-white/10 ring-1 ring-black/50">
                    
                    {/* Header showing match status */}
                    <div className="px-4 py-2.5 bg-white/5 flex items-center justify-between text-[11px] font-bold text-slate-300">
                      <span className="flex items-center gap-1.5 text-blue-300 font-extrabold">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Instant Verified Matches</span>
                      </span>
                      <span className="text-amber-300 font-black">
                        {matchingColleges.length} colleges found
                      </span>
                    </div>

                    {/* Matched Colleges List */}
                    {matchingColleges.length > 0 ? (
                      <div className="p-2 space-y-1 max-h-72 overflow-y-auto custom-scrollbar">
                        {matchingColleges.slice(0, 6).map((col, idx) => {
                          const isSelected = selectedIndex === idx;
                          return (
                            <div
                              key={col.id}
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
                                    <span className="text-emerald-300 font-bold">Avg: {col.avgPlacement}</span>
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
                    ) : (
                      <div className="p-4 text-center text-xs text-slate-400">
                        No direct matches for &ldquo;{searchQuery}&rdquo;.
                        <div className="mt-1 text-[11px] text-blue-300 font-medium">
                          Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 text-[10px] font-mono">Enter</kbd> to search pan-India directory.
                        </div>
                      </div>
                    )}

                    {/* Footer View All Action */}
                    <div className="p-3 bg-slate-950 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => handleSearchSubmit()}
                        className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>View all {matchingColleges.length} matching colleges on directory</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLivePreview(false)}
                        className="text-slate-500 hover:text-slate-300 text-[11px] cursor-pointer"
                      >
                        Close [Esc]
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Hub / Location Filter */}
              <div className="sm:col-span-3 relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 pointer-events-none" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full h-12 pl-10 pr-8 rounded-2xl bg-slate-800/90 border border-white/20 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer appearance-none shadow-inner"
                >
                  <option value="">All Locations (Pan-India)</option>
                  <option value="delhi">Delhi NCR (Noida/Gurgaon)</option>
                  <option value="maharashtra">Maharashtra (Mumbai/Pune)</option>
                  <option value="karnataka">Karnataka (Bangalore)</option>
                  <option value="telangana">Telangana (Hyderabad)</option>
                  <option value="tamil">Tamil Nadu (Chennai)</option>
                  <option value="gujarat">Gujarat (Ahmedabad)</option>
                  <option value="west bengal">West Bengal (Kolkata)</option>
                  <option value="rajasthan">Rajasthan (Jaipur)</option>
                </select>
              </div>

              {/* Budget Range Filter */}
              <div className="sm:col-span-2 relative">
                <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" />
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full h-12 pl-10 pr-8 rounded-2xl bg-slate-800/90 border border-white/20 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer appearance-none shadow-inner"
                >
                  <option value="">Any Budget</option>
                  <option value="under-5l">&lt; ₹5 Lakhs (Extreme ROI)</option>
                  <option value="5l-10l">₹5L - ₹10 Lakhs</option>
                  <option value="10l-18l">₹10L - ₹18 Lakhs</option>
                  <option value="above-18l">₹18L+ (Premier/Elite)</option>
                </select>
              </div>

              {/* Action Explore CTA */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
                  <span>Explore ({matchingColleges.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Discovery Navigation Chips */}
            <div className="flex flex-wrap items-center gap-2 text-xs pt-1 border-t border-white/10">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Trending:</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("mba");
                  setSearchQuery("IIM");
                }}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-blue-200 border border-white/10 transition-colors font-semibold cursor-pointer"
              >
                🏛️ Top 20 IIMs
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("mba");
                  setSearchQuery("NMIMS SIBM");
                }}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/10 transition-colors font-semibold cursor-pointer"
              >
                ⚡ NMIMS &amp; SIBM
              </button>
              <Link
                href="/mba-application-form-discount"
                className="px-3 py-1 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 font-extrabold transition-colors"
              >
                🏷️ Save ₹5,000+ Form Combos
              </Link>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("roi");
                  setSearchQuery("");
                }}
                className="px-3 py-1 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-400/30 font-semibold cursor-pointer"
              >
                💰 Best ROI (&lt; ₹10L Fee)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("btech");
                  setSearchQuery("");
                }}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-200 border border-white/10 font-semibold cursor-pointer"
              >
                💻 Premier B.Tech Hubs
              </button>
            </div>
          </form>
        )}

        {activeTab === "online" && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-black uppercase">
                    100% Legal Equivalence
                  </span>
                  <span className="text-xs text-slate-300 font-bold">UGC-DEB Entitled 2027 Directory</span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Compare 40+ NAAC A++ Accredited Online Universities
                </h3>
                <p className="text-xs text-blue-200/80">
                  Affordable Online MBA, MCA, BBA, BCA &amp; Data Science degrees with UPSC &amp; WES Canada/USA approval.
                </p>
              </div>

              <Link
                href="/online-degree-certification"
                className="h-11 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20 shrink-0"
              >
                <span>Explore 40+ Universities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold">Quick Links:</span>
              <Link href="/online-degree-certification/online-mba" className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-200 border border-white/10 font-semibold">
                🎓 Online MBA
              </Link>
              <Link href="/online-degree-certification/online-mca" className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-200 border border-white/10 font-semibold">
                💻 Online MCA (AI &amp; CS)
              </Link>
              <Link href="/online-degree-certification/cheapest-online-mba" className="px-3 py-1 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 font-bold">
                💰 Cheapest MBA (&lt; ₹1L)
              </Link>
              <Link href="/online-degree-certification/wes-approved-online-degrees" className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/10 font-semibold">
                🌍 WES Approved (Canada/USA)
              </Link>
            </div>
          </div>
        )}

        {activeTab === "mocks" && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-indigo-950/40 border border-rose-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase">
                    100% Free Full Length CBT
                  </span>
                  <span className="text-xs text-slate-300 font-bold">CAT • XAT • NMAT • SNAP • CMAT</span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Simulated CBT Mock Test Engine with Real Exam Timers
                </h3>
                <p className="text-xs text-blue-200/80">
                  Full-length sectional timing, negative marking calculations, and instant percentile score breakdown.
                </p>
              </div>

              <Link
                href="/mock-tests"
                className="h-11 px-6 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-rose-500/20 shrink-0"
              >
                <span>Start Free CBT Mock</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold">Exam Engines:</span>
              <Link href="/mock-tests/cat-2026-free-mock-test" className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 border border-white/10 font-semibold">
                🎯 CAT 2026 Mock
              </Link>
              <Link href="/mock-tests/xat-2027-free-mock-test" className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 border border-white/10 font-semibold">
                ⚡ XAT 2027 Mock
              </Link>
              <Link href="/mock-tests/nmat-2026-free-mock-test" className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 border border-white/10 font-semibold">
                📈 NMAT Practice Test
              </Link>
              <Link href="/mock-tests/snap-2026-free-mock-test" className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 border border-white/10 font-semibold">
                ⏱️ SNAP Speed Test
              </Link>
            </div>
          </div>
        )}

        {activeTab === "calculators" && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-blue-950/40 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                    Score to Percentile
                  </span>
                  <span className="text-xs text-slate-300 font-bold">Updated for 2026-2027 Admissions</span>
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
                className="h-11 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/20 shrink-0"
              >
                <span>Open Calculator Tool</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold">Available Tools:</span>
              <Link href="/tools/cat-score-calculator" className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/10 font-semibold">
                🧮 CAT Score to %ile
              </Link>
              <Link href="/tools/xat-score-calculator" className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/10 font-semibold">
                🎯 XAT Call Predictor
              </Link>
              <Link href="/tools/nmat-scaled-score-calculator" className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/10 font-semibold">
                📊 NMAT Scaled Score
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
