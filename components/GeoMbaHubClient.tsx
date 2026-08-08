"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GeoMbaHub, GEO_MBA_HUBS } from "@/data/geoMbaHubs";
import { CollegeMetadata } from "@/lib/colleges";
import { CompareDrawer } from "@/components/CompareDrawer";
import { InquiryForm } from "@/components/InquiryForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Search,
  MapPin,
  GraduationCap,
  IndianRupee,
  Briefcase,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Award,
  Download,
  Check,
  Building,
  HelpCircle,
  ExternalLink,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  Flame,
  Globe2,
  Users
} from "lucide-react";

interface GeoMbaHubClientProps {
  hub: GeoMbaHub;
  colleges: CollegeMetadata[];
}

export function GeoMbaHubClient({ hub, colleges }: GeoMbaHubClientProps) {
  const router = useRouter();
  const [comparedColleges, setComparedColleges] = useState<CollegeMetadata[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeeRange, setSelectedFeeRange] = useState("All Fees");
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [selectedAccreditation, setSelectedAccreditation] = useState("All Accreditations");
  const [sortBy, setSortBy] = useState("default");
  const [activeTab, setActiveTab] = useState<"catalog" | "cutoffs" | "roi" | "guide">("catalog");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Compare Toggle
  const handleCompareToggle = (slug: string) => {
    setComparedColleges((prev) => {
      const exists = prev.some((c) => c.slug === slug);
      if (exists) {
        return prev.filter((c) => c.slug !== slug);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 colleges at a time!");
        return prev;
      }
      const collegeToAdd = colleges.find((c) => c.slug === slug);
      return collegeToAdd ? [...prev, collegeToAdd] : prev;
    });
  };

  const handleClearAllCompare = () => setComparedColleges([]);
  const handleCompareNow = () => {
    const slugsStr = comparedColleges.map((c) => c.slug).join(",");
    router.push(`/colleges/compare?slugs=${slugsStr}`);
  };

  // Helper for numeric fee calculation
  const parseFeeToNumber = (feeStr: string): number => {
    if (!feeStr) return 0;
    const cleanStr = feeStr.replace(/[₹,\s]/g, "").toLowerCase();
    const num = parseFloat(cleanStr);
    if (isNaN(num)) return 0;
    if (cleanStr.includes("lakh") || cleanStr.includes("l")) return num * 100000;
    if (cleanStr.includes("cr")) return num * 10000000;
    return num;
  };

  // Helper for numeric placement calculation
  const parsePlacementToNumber = (placementStr: string): number => {
    if (!placementStr) return 0;
    const cleanStr = placementStr.replace(/[₹,\s]/g, "").toLowerCase();
    const num = parseFloat(cleanStr);
    if (isNaN(num)) return 0;
    if (cleanStr.includes("lpa") || cleanStr.includes("lakh") || cleanStr.includes("l")) return num * 100000;
    if (cleanStr.includes("cr")) return num * 10000000;
    return num;
  };

  // Filtered & Sorted Colleges
  const filteredColleges = useMemo(() => {
    return colleges
      .filter((college) => {
        // 1. Search Query
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          college.name.toLowerCase().includes(q) ||
          college.location.toLowerCase().includes(q) ||
          college.courses.some((c) => c.toLowerCase().includes(q)) ||
          college.exams.some((e) => e.toLowerCase().includes(q));

        if (!matchesQuery) return false;

        // 2. Fee Range
        if (selectedFeeRange !== "All Fees") {
          const feeNum = parseFeeToNumber(college.fees);
          if (selectedFeeRange === "< ₹8 Lakhs" && feeNum > 800000) return false;
          if (selectedFeeRange === "₹8L - ₹14 Lakhs" && (feeNum < 800000 || feeNum > 1400000)) return false;
          if (selectedFeeRange === "₹14 Lakhs+" && feeNum < 1400000) return false;
        }

        // 3. Exams
        if (selectedExam !== "All Exams") {
          const matchesExam = college.exams.some((exam) =>
            exam.toLowerCase().includes(selectedExam.toLowerCase())
          );
          if (!matchesExam) return false;
        }

        // 4. Accreditation
        if (selectedAccreditation !== "All Accreditations") {
          const accLower = (college.ranking || "").toLowerCase() + " " + (college.ownership || "").toLowerCase();
          if (selectedAccreditation === "AICTE" && !accLower.includes("aicte")) return false;
          if (selectedAccreditation === "NBA" && !accLower.includes("nba")) return false;
          if (selectedAccreditation === "AACSB" && !accLower.includes("aacsb")) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "placement-desc") {
          return parsePlacementToNumber(b.avg_placement) - parsePlacementToNumber(a.avg_placement);
        }
        if (sortBy === "fee-asc") {
          return parseFeeToNumber(a.fees) - parseFeeToNumber(b.fees);
        }
        if (sortBy === "fee-desc") {
          return parseFeeToNumber(b.fees) - parseFeeToNumber(a.fees);
        }
        return 0; // Default order
      });
  }, [colleges, searchQuery, selectedFeeRange, selectedExam, selectedAccreditation, sortBy]);

  // Other Geo Hubs list
  const otherHubs = Object.values(GEO_MBA_HUBS).filter((h) => h.hubKey !== hub.hubKey);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* ── Top Announcement & Breadcrumbs Bar ─────────────────────────────── */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <Breadcrumbs />
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              2026-2027 Admissions Open
            </span>
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit,%20I%20am%20looking%20for%20MBA/PGDM%20colleges%20in%20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Guidance
            </a>
          </div>
        </div>
      </div>

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-amber-400 text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            {hub.tagline}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
            {hub.heroTitle}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {hub.heroSubtitle}
          </p>

          {/* Quick Stats Grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 shadow-md">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <Building className="w-4 h-4 text-blue-400" />
                Total B-Schools
              </div>
              <div className="mt-1.5 text-xl font-bold text-white tracking-tight">{hub.stats.totalColleges}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">AICTE & UGC Listed</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 shadow-md">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Average CTC
              </div>
              <div className="mt-1.5 text-xl font-bold text-emerald-400 tracking-tight">{hub.stats.avgPlacement}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">2025-2026 Batch</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 shadow-md">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <Flame className="w-4 h-4 text-amber-400" />
                Highest Package
              </div>
              <div className="mt-1.5 text-xl font-bold text-amber-400 tracking-tight">{hub.stats.highestPlacement}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Top Domestic/Global</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 shadow-md">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <IndianRupee className="w-4 h-4 text-purple-400" />
                Fee Bracket
              </div>
              <div className="mt-1.5 text-xl font-bold text-purple-300 tracking-tight">{hub.stats.feeRange}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Total 2-Year Course</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <a
              href="#lead-form-section"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              Book Free {hub.cityName} Counselling
            </a>

            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit,%20please%20send%20me%20the%20MBA%20college%20shortlist%20and%20fee%20cutoffs%20for%20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              Get WhatsApp Shortlist (Free)
            </a>

            {comparedColleges.length > 0 && (
              <button
                onClick={handleCompareNow}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all animate-pulse"
              >
                <Layers className="w-4 h-4" />
                Compare Selected ({comparedColleges.length})
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Navigation Tabs ──────────────────────────────────────────────── */}
      <div className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-12 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto py-2.5 no-scrollbar">
            <button
              onClick={() => setActiveTab("catalog")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "catalog"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Building className="w-4 h-4" />
              {hub.cityName} Colleges ({filteredColleges.length})
            </button>

            <button
              onClick={() => setActiveTab("cutoffs")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "cutoffs"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Cutoff & Exam Matrix
            </button>

            <button
              onClick={() => setActiveTab("roi")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "roi"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              ROI & Payback Matrix
            </button>

            <button
              onClick={() => setActiveTab("guide")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "guide"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Globe2 className="w-4 h-4" />
              {hub.cityName} City Guide & ROI
            </button>
          </nav>
        </div>
      </div>

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ── TAB 1: COLLEGES CATALOG ────────────────────────────────────── */}
        {activeTab === "catalog" && (
          <div className="space-y-8">
            {/* Filters Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${hub.cityName} colleges...`}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-all"
                  />
                </div>

                {/* Fee Range */}
                <div>
                  <select
                    value={selectedFeeRange}
                    onChange={(e) => setSelectedFeeRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-all"
                  >
                    <option value="All Fees">All Fees</option>
                    <option value="< ₹8 Lakhs">Under ₹8 Lakhs</option>
                    <option value="₹8L - ₹14 Lakhs">₹8L - ₹14 Lakhs</option>
                    <option value="₹14 Lakhs+">₹14 Lakhs & Above</option>
                  </select>
                </div>

                {/* Entrance Exam */}
                <div>
                  <select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-all"
                  >
                    <option value="All Exams">All Accepted Exams</option>
                    <option value="CAT">CAT Accepted</option>
                    <option value="XAT">XAT Accepted</option>
                    <option value="CMAT">CMAT Accepted</option>
                    <option value="MAT">MAT Accepted</option>
                    <option value="SNAP">SNAP Accepted</option>
                    <option value="MAH-CET">MAH-CET Accepted</option>
                    <option value="NMAT">NMAT Accepted</option>
                    <option value="KMAT">KMAT Accepted</option>
                  </select>
                </div>

                {/* Sorting */}
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-all"
                  >
                    <option value="default">Sort by: Recommended</option>
                    <option value="placement-desc">Highest Average CTC</option>
                    <option value="fee-asc">Lowest Course Fees</option>
                    <option value="fee-desc">Highest Course Fees</option>
                  </select>
                </div>
              </div>

              {/* Active Results Counter */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                <div>
                  Showing <span className="font-semibold text-amber-400">{filteredColleges.length}</span> management colleges in {hub.cityName}
                </div>
                {(searchQuery || selectedFeeRange !== "All Fees" || selectedExam !== "All Exams" || sortBy !== "default") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedFeeRange("All Fees");
                      setSelectedExam("All Exams");
                      setSelectedAccreditation("All Accreditations");
                      setSortBy("default");
                    }}
                    className="text-amber-400 hover:underline font-medium"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            </div>

            {/* Colleges Cards Grid */}
            {filteredColleges.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl bg-slate-900 border border-slate-800">
                <Building className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">No colleges match your specific filter criteria</h3>
                <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                  Try clearing some filter options or search for another location in {hub.cityName}.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFeeRange("All Fees");
                    setSelectedExam("All Exams");
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredColleges.map((college, idx) => {
                  const isCompared = comparedColleges.some((c) => c.slug === college.slug);

                  return (
                    <div
                      key={college.slug || idx}
                      className="group flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/40 p-5 transition-all hover:shadow-xl hover:shadow-amber-500/5 relative overflow-hidden"
                    >
                      {/* Top Header & Badges */}
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md mb-2">
                              <Award className="w-3 h-3" />
                              {college.ranking || "AICTE Approved"}
                            </span>
                            <Link href={`/colleges/${college.slug}`}>
                              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                                {college.name}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              <span className="truncate">{college.location}</span>
                            </div>
                          </div>

                          {/* Compare Checkbox */}
                          <button
                            onClick={() => handleCompareToggle(college.slug)}
                            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                              isCompared
                                ? "bg-blue-600 border-blue-500 text-white"
                                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                            }`}
                            title="Compare side-by-side"
                          >
                            {isCompared ? <Check className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Metric Highlights Grid */}
                        <div className="mt-4 grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs">
                          <div>
                            <div className="text-slate-400 text-[11px]">Avg Package</div>
                            <div className="font-bold text-emerald-400 text-sm mt-0.5">
                              {college.avg_placement || "₹8.50 LPA"}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-400 text-[11px]">Total Fees</div>
                            <div className="font-bold text-slate-200 text-sm mt-0.5">
                              {college.fees || "₹9.50 Lakhs"}
                            </div>
                          </div>
                        </div>

                        {/* Accepted Exams */}
                        {college.exams && college.exams.length > 0 && (
                          <div className="mt-3.5 flex flex-wrap gap-1.5 items-center">
                            <span className="text-[11px] text-slate-400 font-medium mr-1">Exams:</span>
                            {college.exams.slice(0, 4).map((exam, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700/80 text-[10px] text-slate-300 font-medium"
                              >
                                {exam}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <Link
                          href={`/colleges/${college.slug}`}
                          className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
                        >
                          View Details
                        </Link>

                        <a
                          href={`https://wa.me/919560020771?text=Hi%20Mohit,%20I%20want%20to%20apply%20to%20${encodeURIComponent(
                            college.name
                          )}%20in%20${encodeURIComponent(hub.cityName)}.%20Please%20guide%20me.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                          Apply
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: CUTOFF & EXAM MATRIX ────────────────────────────────── */}
        {activeTab === "cutoffs" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-amber-400" />
                {hub.cityName} MBA & PGDM Cutoff Matrix (2026-2027)
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Expected cutoff percentiles across national & state entrance exams for premier business schools in {hub.cityName}.
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] tracking-wider bg-slate-950/60">
                      <th className="py-3 px-4 rounded-l-lg">College / Business School</th>
                      <th className="py-3 px-4">Accepted Entrance Exam</th>
                      <th className="py-3 px-4">Expected Cutoff</th>
                      <th className="py-3 px-4">Total Fees</th>
                      <th className="py-3 px-4">Average Placement</th>
                      <th className="py-3 px-4 rounded-r-lg text-right">Guidance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {hub.cutoffsTable.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-white">
                          {item.slug ? (
                            <Link href={`/colleges/${item.slug}`} className="hover:text-amber-400 transition-colors">
                              {item.collegeName}
                            </Link>
                          ) : (
                            item.collegeName
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
                            {item.exam}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-amber-400">{item.cutoff}</td>
                        <td className="py-3.5 px-4 text-slate-300">{item.fee}</td>
                        <td className="py-3.5 px-4 font-bold text-emerald-400">{item.avgPlacement}</td>
                        <td className="py-3.5 px-4 text-right">
                          <a
                            href={`https://wa.me/919560020771?text=Hi%20Mohit,%20what%20is%20the%20admission%20process%20for%20${encodeURIComponent(
                              item.collegeName
                            )}?`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                          >
                            Check Profile <ArrowRight className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: ROI & PAYBACK MATRIX ────────────────────────────────── */}
        {activeTab === "roi" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Return on Investment (ROI) & Payback Analysis for {hub.cityName}
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Comparing tuition costs against first-year starting CTC to compute estimated payback periods for {hub.cityName} business schools.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {hub.roiHighlights.map((hl, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-sm mb-3">
                        0{idx + 1}
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{hl.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{hl.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: CITY GUIDE & RECRUITMENT HUBS ────────────────────────── */}
        {activeTab === "guide" && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Globe2 className="w-6 h-6 text-amber-400" />
                  Why Pursue an MBA / PGDM in {hub.cityName}?
                </h2>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {hub.cityName} stands out as one of India’s foremost corporate education destinations. From deep industry mentorship and Fortune 500 corporate hubs to active alumni networks and winter internships, pursuing your management degree here establishes rapid career momentum.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                    Key Recruitment Sectors
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    BFSI & Wealth Management, FinTech, Management Consulting, FMCG Brand Management, Business Analytics & AI Strategy, Supply Chain Operations, and Digital Product Leadership.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                    <IndianRupee className="w-4 h-4 text-emerald-400" />
                    Cost of Living & Student Budget
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Student accommodation (PGs and shared flats) ranges from ₹8,000 to ₹16,000 per month depending on metro proximity, making it a highly accessible education corridor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Direct Admission & Lead Capture Section ───────────────────────── */}
        <section id="lead-form-section" className="mt-12 pt-8 border-t border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                1-on-1 Profile Evaluation with Mohit Jain
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Confused About Selecting the Best MBA College in {hub.cityName}?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Don’t rely on generic rankings. Get a customized college shortlist matched with your CAT/XAT/CMAT/MAT score, academic background, budget, and desired specialization (Marketing, Finance, Analytics, HR, or FinTech).
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Free & Unbiased GD-PI Preparation Support</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Merit & Institutional Quota Seat Guidance</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Official Placement Audits & Real Alumni Feedback</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
                <InquiryForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── Geo FAQ Accordion Section ─────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-slate-800">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl font-bold text-white mt-3">
                MBA & PGDM Admissions in {hub.cityName}: FAQs
              </h2>
            </div>

            <div className="space-y-3">
              {hub.faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-amber-400 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-amber-400" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Explore Other MBA Hubs Strip ──────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                Explore MBA Admissions in Other Cities
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Browse location-wise rankings, fee structures, and placement reports across India’s major education hubs.
              </p>
            </div>
            <Link
              href="/mba-pgdm-admission-2027"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 hidden sm:inline-flex items-center gap-1"
            >
              All India Directory <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {otherHubs.map((other) => (
              <Link
                key={other.hubKey}
                href={other.route}
                className="group p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all text-center flex flex-col justify-between"
              >
                <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                  {other.cityName}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{other.stats.totalColleges}</div>
                <div className="text-[10px] text-emerald-400 font-semibold mt-1">Avg: {other.stats.avgPlacement.split(' - ')[0]}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ── Side-by-Side Comparison Drawer ─────────────────────────────────── */}
      <CompareDrawer
        selectedColleges={comparedColleges}
        onRemove={handleCompareToggle}
        onClearAll={handleClearAllCompare}
        onCompare={handleCompareNow}
      />
    </div>
  );
}
