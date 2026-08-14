"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Search,
  Building,
  Briefcase,
  IndianRupee,
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronDown,
  Phone,
  MessageCircle,
  CheckCircle2,
  Filter,
  Check,
  Globe2,
  Layers,
  Flame,
  ShieldCheck,
  Compass,
  DollarSign,
  BarChart3
} from "lucide-react";
import { GEO_MBA_HUBS, GeoMbaHub } from "@/data/geoMbaHubs";
import { CollegeMetadata } from "@/lib/colleges";
import { CompareDrawer } from "@/components/CompareDrawer";
import {
  RegionalCollegeInquiryModal,
  RegionalInquiryTarget
} from "@/components/RegionalCollegeInquiryModal";
import { getCollegeDetailUrl } from "@/lib/collegeBlogLinks";

interface RegionAdmissionsClientProps {
  allHubs: GeoMbaHub[];
  collegesByHub: Record<string, CollegeMetadata[]>;
  totalCollegesCount: number;
}

export default function MbaPgdmAdmissionsByRegionClient({
  allHubs,
  collegesByHub,
  totalCollegesCount
}: RegionAdmissionsClientProps) {
  const router = useRouter();
  const [selectedHubKey, setSelectedHubKey] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("all");
  const [selectedExam, setSelectedExam] = useState<string>("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [comparedColleges, setComparedColleges] = useState<CollegeMetadata[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "matrix" | "colleges" | "guide">("overview");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // College-Specific Inquiry Modal State
  const [inquiryTarget, setInquiryTarget] = useState<RegionalInquiryTarget | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);

  const handleOpenInquiry = (target: RegionalInquiryTarget) => {
    setInquiryTarget(target);
    setIsInquiryModalOpen(true);
  };

  // Compare Toggle
  const handleRemoveCompare = (slug: string) => {
    setComparedColleges((prev) => prev.filter((c) => c.slug !== slug));
  };

  const handleCompareToggle = (college: CollegeMetadata) => {
    setComparedColleges((prev) => {
      const exists = prev.some((c) => c.slug === college.slug);
      if (exists) {
        return prev.filter((c) => c.slug !== college.slug);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 colleges at a time!");
        return prev;
      }
      return [...prev, college];
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

  // Filtered Hubs
  const displayedHubs = useMemo(() => {
    if (selectedHubKey === "all") return allHubs;
    return allHubs.filter((h) => h.hubKey === selectedHubKey);
  }, [allHubs, selectedHubKey]);

  // Aggregate All Colleges
  const allFlattenedColleges = useMemo(() => {
    const list: (CollegeMetadata & { hubCity: string; hubKey: string })[] = [];
    const seen = new Set<string>();

    allHubs.forEach((hub) => {
      const hubCols = collegesByHub[hub.hubKey] || [];
      hubCols.forEach((col) => {
        if (!seen.has(col.slug)) {
          seen.add(col.slug);
          list.push({ ...col, hubCity: hub.cityName, hubKey: hub.hubKey });
        }
      });
    });
    return list;
  }, [allHubs, collegesByHub]);

  // Filtered College List for the Interactive Directory Tab
  const filteredColleges = useMemo(() => {
    return allFlattenedColleges.filter((college) => {
      // 1. Hub Filter
      if (selectedHubKey !== "all" && college.hubKey !== selectedHubKey) {
        return false;
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (college.name || "").toLowerCase().includes(q);
        const matchLoc = (college.location || "").toLowerCase().includes(q);
        const matchHub = (college.hubCity || "").toLowerCase().includes(q);
        const matchCourses = (college.courses || []).some((c) => c.toLowerCase().includes(q));
        if (!matchName && !matchLoc && !matchHub && !matchCourses) return false;
      }

      // 3. Budget Filter
      if (selectedBudget !== "all") {
        const feeNum = parseFeeToNumber(college.fees);
        if (selectedBudget === "under-8" && feeNum > 800000) return false;
        if (selectedBudget === "8-15" && (feeNum < 800000 || feeNum > 1500000)) return false;
        if (selectedBudget === "above-15" && feeNum < 1500000) return false;
      }

      // 4. Exam Filter
      if (selectedExam !== "all") {
        const exams = (college.exams || []).map((e) => e.toUpperCase());
        if (!exams.includes(selectedExam.toUpperCase())) return false;
      }

      return true;
    });
  }, [allFlattenedColleges, selectedHubKey, searchQuery, selectedBudget, selectedExam]);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 overflow-hidden border-b border-slate-800/80">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-8 backdrop-blur-md shadow-lg shadow-amber-500/5">
            <Compass className="h-4 w-4 text-amber-400 animate-spin-slow" />
            Pan-India MBA &amp; PGDM Geographical Directory · 2027 Admissions
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Explore MBA &amp; PGDM Admissions <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-400 bg-clip-text text-transparent">
              by Region &amp; Business Hub
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium mb-12">
            Compare India&apos;s 8 dominant MBA capital corridors side-by-side. Analyze average placement packages,
            tuition fees, sector clusters (FinTech, Tech Consulting, Analytics, FMCG), and entrance cutoffs with expert counselor Mohit Jain.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { num: "8 Hubs", label: "Metro Corridors Covered", icon: MapPin, color: "text-amber-400" },
              { num: `${totalCollegesCount}+`, label: "B-Schools Listed", icon: Building, color: "text-indigo-400" },
              { num: "₹2.9L - ₹28L", label: "2-Yr Fee Spectrum", icon: IndianRupee, color: "text-emerald-400" },
              { num: "₹7.5L - ₹35L", label: "Average CTC Placements", icon: TrendingUp, color: "text-sky-400" }
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm text-center transition-all hover:border-slate-700 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stat.num}</div>
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Connect Bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20to%20know%20the%20best%20region%20for%20my%20MBA%20PGDM%202027%20admission"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4 text-slate-950 fill-current" />
              Get 1-on-1 Regional Counseling with Mohit Jain
            </a>
            <a
              href="tel:+919560020771"
              className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
            >
              <Phone className="h-4 w-4 text-amber-400" />
              Call +91 95600 20771
            </a>
          </div>
        </div>
      </section>

      {/* ── STICKY NAVIGATION TABS & FILTER BAR ── */}
      <section className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/90 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Main View Mode Tabs */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1.5 w-full lg:w-auto overflow-x-auto">
            {[
              { id: "overview", label: "Hub Profiles", icon: Building },
              { id: "matrix", label: "Regional Comparison Matrix", icon: BarChart3 },
              { id: "colleges", label: "College Directory & Filters", icon: GraduationCap },
              { id: "guide", label: "City Decision Guide", icon: Compass }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Region Quick Select Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest hidden sm:inline">Hub:</span>
            <button
              onClick={() => setSelectedHubKey("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedHubKey === "all"
                  ? "bg-indigo-600 text-white border border-indigo-500 shadow-md"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700"
              }`}
            >
              All Regions (8)
            </button>
            {allHubs.map((hub) => (
              <button
                key={hub.hubKey}
                onClick={() => setSelectedHubKey(hub.hubKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedHubKey === hub.hubKey
                    ? "bg-amber-500 text-slate-950 border border-amber-400 shadow-md"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {hub.cityName.split(" &")[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
        {/* ── TAB 1: HUB PROFILES & CARDS ── */}
        {activeTab === "overview" && (
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-amber-400 text-xs font-black uppercase tracking-widest">
                  {selectedHubKey === "all" ? "All 8 Premier Business Capitals" : "Selected Regional Corridor"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                  {selectedHubKey === "all"
                    ? "Top MBA & PGDM Regional Hubs in India"
                    : `MBA Admissions in ${GEO_MBA_HUBS[selectedHubKey]?.cityName || "Region"}`}
                </h2>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Showing <strong className="text-white">{displayedHubs.length}</strong> hubs with verified 2025-2026 placement audits
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {displayedHubs.map((hub) => {
                const colleges = collegesByHub[hub.hubKey] || [];
                return (
                  <div
                    key={hub.hubKey}
                    className="group bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-amber-500/5"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
                            <MapPin className="h-3.5 w-3.5" />
                            {hub.stateName}
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-300 transition-colors">
                            {hub.cityName}
                          </h3>
                        </div>
                        <span className="text-xs font-bold bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
                          {hub.stats.totalColleges}
                        </span>
                      </div>

                      <p className="text-slate-300 text-sm font-medium leading-relaxed mb-6">
                        {hub.tagline}
                      </p>

                      {/* Key Stats Pill Bar */}
                      <div className="grid grid-cols-3 gap-3 bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 mb-6">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Avg CTC</span>
                          <div className="text-sm sm:text-base font-black text-emerald-400 mt-0.5">
                            {hub.stats.avgPlacement.split(" - ")[0]}
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Fee Range</span>
                          <div className="text-sm sm:text-base font-black text-slate-200 mt-0.5">
                            {hub.stats.feeRange.split(" - ")[0]}
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Top Exams</span>
                          <div className="text-xs font-bold text-amber-400 truncate mt-1">
                            {hub.stats.topExams.slice(0, 3).join(", ")}
                          </div>
                        </div>
                      </div>

                      {/* Top Institutions Snapshot */}
                      <div className="space-y-3 mb-6">
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center justify-between">
                          <span>Key B-Schools in this Hub</span>
                          <span className="text-[10px] text-slate-500">Cutoff / Apply</span>
                        </div>
                        <div className="space-y-2">
                          {hub.cutoffsTable.slice(0, 4).map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-2 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 hover:border-amber-500/40 transition-colors"
                            >
                              <div className="font-semibold text-slate-200 truncate pr-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenInquiry({
                                      name: item.collegeName,
                                      slug: item.slug,
                                      location: hub.cityName,
                                      fees: item.fee,
                                      hubCity: hub.cityName
                                    })
                                  }
                                  className="hover:text-amber-400 text-left truncate transition-colors cursor-pointer"
                                >
                                  {item.collegeName.split("(")[0]}
                                </button>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-slate-400 font-mono text-[11px]">{item.cutoff}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenInquiry({
                                      name: item.collegeName,
                                      slug: item.slug,
                                      location: hub.cityName,
                                      fees: item.fee,
                                      hubCity: hub.cityName
                                    })
                                  }
                                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-md shadow-sm transition-all cursor-pointer"
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Economic USP */}
                      {hub.roiHighlights?.[0] && (
                        <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-3.5 mb-6 text-xs">
                          <strong className="text-amber-300 block mb-1">
                            🚀 {hub.roiHighlights[0].title}
                          </strong>
                          <span className="text-slate-400 leading-relaxed line-clamp-2">
                            {hub.roiHighlights[0].description}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={hub.route}
                        className="inline-flex items-center gap-2 text-xs font-black text-amber-400 hover:text-amber-300 group-hover:translate-x-1 transition-all"
                      >
                        Explore All {hub.cityName} Colleges &amp; Cutoffs
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      <a
                        href={`https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20counselling%20for%20MBA%20colleges%20in%20${encodeURIComponent(
                          hub.cityName
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-amber-400" />
                        Ask Mohit
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TAB 2: REGIONAL COMPARISON MATRIX ── */}
        {activeTab === "matrix" && (
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-6">
              <span className="text-amber-400 text-xs font-black uppercase tracking-widest">
                Comprehensive Benchmarking
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                Regional MBA Comparison Matrix (2027)
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-3xl font-medium">
                Compare major management hubs by placement benchmarks, dominant hiring sectors, cost of living index, and flagship institutions.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-slate-950 text-slate-300 font-bold text-xs uppercase tracking-widest border-b border-slate-800">
                    <th className="px-6 py-5">Hub / Region</th>
                    <th className="px-6 py-5">Key Economic Cluster</th>
                    <th className="px-6 py-5">Avg Package Range</th>
                    <th className="px-6 py-5">2-Yr Fee Spectrum</th>
                    <th className="px-6 py-5">Top Entrance Exams</th>
                    <th className="px-6 py-5">Flagship B-Schools</th>
                    <th className="px-6 py-5 text-right">Directory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-sm font-medium text-slate-300">
                  {allHubs.map((hub) => (
                    <tr key={hub.hubKey} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-5 font-bold text-white">
                        <div className="text-base font-black text-amber-400">{hub.cityName}</div>
                        <span className="text-xs text-slate-500">{hub.stateName.split("/")[0]}</span>
                      </td>
                      <td className="px-6 py-5 text-xs text-slate-300 max-w-[200px] leading-relaxed">
                        {hub.tagline.split(" · ")[1] || hub.tagline}
                      </td>
                      <td className="px-6 py-5 font-black text-emerald-400">
                        {hub.stats.avgPlacement}
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-200">
                        {hub.stats.feeRange}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-1 max-w-[150px]">
                          {hub.stats.topExams.slice(0, 3).map((ex) => (
                            <span
                              key={ex}
                              className="text-[10px] font-bold bg-slate-950 text-amber-300 px-2 py-0.5 rounded border border-slate-800"
                            >
                              {ex}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-xs text-slate-300 max-w-[180px]">
                        {hub.cutoffsTable.slice(0, 3).map((c) => c.collegeName.split("(")[0]).join(", ")}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Link
                          href={hub.route}
                          className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors"
                        >
                          View Hub
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 3: INTERACTIVE ALL-COLLEGE DIRECTORY ── */}
        {activeTab === "colleges" && (
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-6">
              <span className="text-amber-400 text-xs font-black uppercase tracking-widest">
                Searchable College Finder
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                Explore Regional MBA &amp; PGDM Colleges
              </h2>
              <p className="text-slate-400 text-sm mt-2 font-medium">
                Filter over {allFlattenedColleges.length} management colleges across all regional hubs by fee bracket, exam acceptance, and location.
              </p>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search college, city, or stream..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Region Select */}
              <div>
                <select
                  value={selectedHubKey}
                  onChange={(e) => setSelectedHubKey(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="all">All Regions (8 Hubs)</option>
                  {allHubs.map((h) => (
                    <option key={h.hubKey} value={h.hubKey}>
                      {h.cityName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Select */}
              <div>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="all">All Fee Budgets</option>
                  <option value="under-8">Under ₹8.00 Lakhs</option>
                  <option value="8-15">₹8.00L - ₹15.00 Lakhs</option>
                  <option value="above-15">Above ₹15.00 Lakhs</option>
                </select>
              </div>

              {/* Exam Select */}
              <div>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="all">All Entrance Exams</option>
                  <option value="CAT">Accepts CAT</option>
                  <option value="XAT">Accepts XAT</option>
                  <option value="CMAT">Accepts CMAT</option>
                  <option value="MAT">Accepts MAT</option>
                  <option value="SNAP">Accepts SNAP</option>
                  <option value="NMAT">Accepts NMAT</option>
                  <option value="MAH-CET">Accepts MAH CET</option>
                </select>
              </div>
            </div>

            {/* Results Count & Reset */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
              <span>
                Found <strong className="text-amber-400">{filteredColleges.length}</strong> colleges matching criteria
              </span>
              {(searchQuery || selectedHubKey !== "all" || selectedBudget !== "all" || selectedExam !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedHubKey("all");
                    setSelectedBudget("all");
                    setSelectedExam("all");
                  }}
                  className="text-amber-400 hover:underline font-bold"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            {/* College Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.slice(0, 30).map((college) => {
                const isCompared = comparedColleges.some((c) => c.slug === college.slug);
                return (
                  <div
                    key={college.slug}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1"
                  >
                    <div>
                      {/* Top tag & location */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                          {college.hubCity}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold truncate max-w-[120px]">
                          {college.ranking || "AICTE Approved"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white hover:text-amber-400 transition-colors line-clamp-1">
                        <Link href={getCollegeDetailUrl(college)}>{college.name}</Link>
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-500" />
                        {college.location}
                      </p>

                      {/* Placement & Fee Strip */}
                      <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-bold">Avg Placement</span>
                          <div className="font-black text-emerald-400">{college.avg_placement}</div>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-bold">Total Fees</span>
                          <div className="font-bold text-slate-200">{college.fees}</div>
                        </div>
                      </div>

                      {/* Exams */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {(college.exams || ["CAT", "MAT", "CMAT"]).slice(0, 4).map((ex) => (
                          <span
                            key={ex}
                            className="text-[9px] font-bold bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions & Direct College Inquiry */}
                    <div className="mt-5 pt-3 border-t border-slate-800 space-y-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenInquiry({
                            name: college.name,
                            slug: college.slug,
                            location: college.location,
                            fees: college.fees,
                            avg_placement: college.avg_placement,
                            hubCity: college.hubCity
                          })
                        }
                        className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs py-2.5 px-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles size={13} className="text-slate-950 shrink-0" />
                        <span className="truncate">Apply to {college.name.split("(")[0]} →</span>
                      </button>

                      <div className="flex items-center justify-between gap-2 pt-0.5">
                        <Link
                          href={getCollegeDetailUrl(college)}
                          className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
                        >
                          View Review <ArrowRight className="h-3 w-3" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleCompareToggle(college)}
                          className={`text-xs font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                            isCompared
                              ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                              : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                          }`}
                        >
                          {isCompared ? "✓ Compared" : "+ Compare"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredColleges.length > 30 && (
              <div className="text-center pt-6 text-sm text-slate-400 font-medium">
                Showing first 30 of {filteredColleges.length} colleges. Use search and hub filters to narrow down specific colleges.
              </div>
            )}
          </div>
        )}

        {/* ── TAB 4: CITY DECISION GUIDE BY MOHIT JAIN ── */}
        {activeTab === "guide" && (
          <div className="space-y-12">
            <div className="border-b border-slate-800 pb-6">
              <span className="text-amber-400 text-xs font-black uppercase tracking-widest">
                Career Roadmap &amp; Location Strategy
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                How to Pick the Best Region for Your MBA
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-3xl font-medium">
                Your post-MBA specialization should match the industrial ecosystem of your chosen campus city. Here is expert counselor Mohit Jain&apos;s sector-to-city matching framework:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  sector: "Investment Banking, Wealth Management & BFSI",
                  bestCity: "Mumbai & Navi Mumbai",
                  why: "Home to BSE, NSE, Reserve Bank of India, and global investment banks (Morgan Stanley, JP Morgan, Goldman Sachs). Over 40% of Mumbai campus hiring is financial services.",
                  topColleges: "JBIMS, SPJIMR, NMIMS, Welingkar, SIES",
                  badge: "Financial Capital"
                },
                {
                  sector: "Product Management, AI, SaaS & Tech Consulting",
                  bestCity: "Bangalore (Bengaluru)",
                  why: "India's Silicon Valley with 400+ MNC R&D centers and unicorn startup density. Electronic City and Whitefield campuses offer live product sprints.",
                  topColleges: "IIMB, SIBM Bangalore, JAGSoM, Alliance, ISBR",
                  badge: "Tech & Startup Hub"
                },
                {
                  sector: "FMCG, Corporate Strategy, Media & Consulting",
                  bestCity: "Delhi NCR (Gurgaon / Noida / Delhi)",
                  why: "Cyber City Gurgaon and Noida host 500+ multinational corporate headquarters, management consultancies (McKinsey, BCG, Big 4), and diplomatic embassies.",
                  topColleges: "FMS Delhi, MDI Gurgaon, FORE, LBSIM, BIMTECH",
                  badge: "Corporate Headquarters"
                },
                {
                  sector: "Automotive, Manufacturing, Supply Chain & Operations",
                  bestCity: "Pune",
                  why: "Massive manufacturing and automotive belt (Tata, Bajaj, Mercedes) alongside the Hinjawadi IT cluster. PUMBA and SIBM deliver high ROI with low living costs.",
                  topColleges: "SIBM Pune, SCMHRD, PUMBA, PIBM, Indira",
                  badge: "Oxford of the East"
                },
                {
                  sector: "Pharmaceuticals, Biotechnology & FinTech",
                  bestCity: "Hyderabad",
                  why: "Genome Valley and HITEC City host the world's biggest pharma companies (Dr. Reddy's, Bharat Biotech) and major tech campuses (Google, Microsoft, Amazon).",
                  topColleges: "ISB, IPE Hyderabad, VJIM, SIBM Hyderabad",
                  badge: "Pharma & IT Powerhouse"
                },
                {
                  sector: "FinTech SEZ, Chemical & Family Business",
                  bestCity: "Ahmedabad & Gandhinagar",
                  why: "GIFT City is South Asia's booming international financial services center. Unbeatable entrepreneurial and family business ecosystem.",
                  topColleges: "IIM Ahmedabad, Nirma University, EDII, Shanti BS",
                  badge: "GIFT City FinTech"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-7 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                        {item.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{item.bestCity}</span>
                    </div>

                    <h3 className="text-xl font-black text-white mb-2">{item.sector}</h3>
                    <p className="text-slate-300 text-sm font-medium leading-relaxed mb-4">
                      {item.why}
                    </p>

                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
                      <strong className="text-slate-400 block mb-1">Benchmark Colleges:</strong>
                      <span className="text-slate-200 font-semibold">{item.topColleges}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400">
                    <span>Target Region: {item.bestCity}</span>
                    <a
                      href={`https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20to%20apply%20for%20${encodeURIComponent(
                        item.sector
                      )}%20in%20${encodeURIComponent(item.bestCity)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      Check Eligibility <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FREQUENTLY ASKED QUESTIONS SECTION ── */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-400 text-xs font-black uppercase tracking-widest">
              Regional Admissions FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Frequently Asked Questions About Choosing an MBA Region
            </h2>
            <p className="text-slate-400 text-sm mt-2 font-medium">
              Get clarity on placement variations, living expenses, local languages, and management quota rules across different Indian states.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                q: "How important is location when choosing an MBA / PGDM college in India?",
                a: "Location is extremely vital. Over 60% to 75% of campus placement recruiters at Tier-2 and Tier-3 B-schools come from the local metropolitan industrial ecosystem. Choosing Bangalore gives superior access to Tech and Product roles, Mumbai excels in BFSI and Equity Research, Delhi NCR dominates in Consulting, FMCG, and Media, while Pune leads in Automotive and Supply Chain."
              },
              {
                q: "Which MBA region offers the highest Return on Investment (ROI)?",
                a: "Colleges like FMS Delhi (fees ₹2L, avg CTC ₹34L) and JBIMS Mumbai / PUMBA Pune (fees ₹1.3L - ₹6L, avg CTC ₹8.5L - ₹28L) offer the absolute highest mathematical ROI. In private autonomous institutions, Bangalore and Greater Noida deliver strong 14 to 22 month payback periods due to high placement volumes."
              },
              {
                q: "Do colleges in Delhi NCR and Bangalore accept state entrance exams like MAH CET or TS ICET?",
                a: "State exams (MAH CET, TS ICET, KMAT) are primarily for their respective state quota seats. However, autonomous AICTE-approved PGDM colleges in Delhi NCR and Bangalore widely accept national entrance test scores like CAT, XAT, MAT, CMAT, and ATMA."
              },
              {
                q: "Is language or culture a barrier when moving to Pune, Mumbai, or Bangalore for an MBA?",
                a: "Not at all. Professional B-Schools in Bangalore, Mumbai, Pune, and Hyderabad operate 100% in English with diverse pan-India batches representing all 28 states. Corporate recruitment is strictly merit and performance-based."
              },
              {
                q: "Can I get direct admission in regional MBA colleges under management quota?",
                a: "Yes. Many reputed private universities and AICTE-approved autonomous business schools across Delhi NCR, Pune, Bangalore, and Mumbai offer profile-based direct admission, sponsored seats, or management quota rounds for eligible candidates."
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-white text-sm sm:text-base hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-amber-400 shrink-0 transition-transform ${
                      expandedFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="p-5 pt-0 text-slate-300 text-sm leading-relaxed border-t border-slate-900 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── COUNSELING CTA FOOTER ── */}
        <section className="bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-700 rounded-3xl p-8 sm:p-14 text-slate-950 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-slate-950">
              Still confused which region fits your MBA dream?
            </h2>
            <p className="text-slate-950/80 font-bold text-base sm:text-lg mb-8 leading-relaxed">
              Book a direct 1-on-1 career mapping call with Mohit Jain. Evaluate fees, placement reality, GD-PI tips, and direct admission options across all 8 regions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20help%20choosing%20the%20right%20MBA%20region%20for%202027"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 hover:bg-slate-900 text-white font-black text-base px-8 py-4 rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Book Free Profile Mapping Session →
              </a>
              <a
                href="tel:+919560020771"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-slate-950 border border-slate-950/20 font-black text-base px-6 py-4 rounded-xl transition-colors"
              >
                Call +91 95600 20771
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Compare Floating Drawer */}
      <CompareDrawer
        selectedColleges={comparedColleges}
        onRemove={handleRemoveCompare}
        onClearAll={handleClearAllCompare}
        onCompare={handleCompareNow}
      />

      {/* Specific College Inquiry Modal */}
      <RegionalCollegeInquiryModal
        target={inquiryTarget}
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </div>
  );
}
