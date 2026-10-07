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
  RegionalCollegeInquiryModal,
  RegionalInquiryTarget
} from "@/components/RegionalCollegeInquiryModal";
import { getCollegeDetailUrl } from "@/lib/collegeBlogLinks";
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
  Check,
  Building,
  HelpCircle,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  Flame,
  Globe2,
  Users,
  Star,
  BookOpen,
  Compass,
  ArrowUpRight
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
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("default");
  const [activeTab, setActiveTab] = useState<"catalog" | "cutoffs" | "roi" | "tier-guide" | "low-fees">("catalog");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Specific College Inquiry Modal State
  const [inquiryTarget, setInquiryTarget] = useState<RegionalInquiryTarget | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const handleOpenInquiry = (target: RegionalInquiryTarget) => {
    setInquiryTarget(target);
    setIsInquiryModalOpen(true);
  };

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

        // 4. Sub-location
        if (selectedLocation !== "All Locations") {
          const locLower = (college.location || "").toLowerCase();
          const nameLower = (college.name || "").toLowerCase();
          const target = selectedLocation.toLowerCase();
          if (!locLower.includes(target) && !nameLower.includes(target)) return false;
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
  }, [colleges, searchQuery, selectedFeeRange, selectedExam, selectedLocation, sortBy]);

  // Other Geo Hubs list
  const otherHubs = Object.values(GEO_MBA_HUBS).filter((h) => h.hubKey !== hub.hubKey);

  return (
    <div className="w-full bg-[#F8FAFC] text-[#0F1026] selection:bg-[#F59E0B] selection:text-[#0F1026]">
      {/* ── Top Announcement & Breadcrumbs Bar ─────────────────────────────── */}
      <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <Breadcrumbs />
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              2027–2029 Admissions Open
            </span>
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit,%20I%20am%20looking%20for%20MBA/PGDM%20colleges%20in%20Delhi%20NCR%20(2027-2029)"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Guidance
            </a>
          </div>
        </div>
      </div>

      {/* ── Hero Section (Home Theme Visuals) ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F3FF]/70 via-[#F8FAFC] to-[#F1F5F9]/80 text-[#0F1026] pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-slate-200/80">
        {/* Soft Ambient Pastel Glows */}
        <span className="blob b1 !opacity-[0.14]" />
        <span className="blob b2 !opacity-[0.12]" />
        <span className="blob b3 !opacity-[0.10]" />

        {/* Subtle Grid Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs text-[#6336EA] font-mono text-xs font-bold uppercase tracking-wider mb-5">
            <MapPin className="w-3.5 h-3.5 text-[#6336EA]" />
            {hub.tagline}
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-black text-[#0F1026] leading-[1.15] tracking-tight max-w-5xl">
            Top MBA &amp; PGDM Colleges in{" "}
            <span className="inline-block bg-gradient-to-r from-[#6336EA] via-[#8B5CF6] to-[#EC4899] text-white px-3.5 py-0.5 rounded-2xl shadow-md border border-purple-400/30">
              {hub.cityName}
            </span>{" "}
            (2027–2029 Batch)
          </h1>

          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            {hub.heroSubtitle}
          </p>

          {/* Quick Stats Grid */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl">
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Building className="w-4 h-4" />
                </div>
                <span className="font-mono text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  Total B-Schools
                </span>
              </div>
              <div className="mt-3">
                <div className="font-display text-2xl font-black text-[#0F1026] tracking-tight">
                  {hub.stats.totalColleges}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">AICTE &amp; UGC Approved</div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="font-mono text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  Average CTC
                </span>
              </div>
              <div className="mt-3">
                <div className="font-display text-2xl font-black text-[#10B981] tracking-tight">
                  {hub.stats.avgPlacement}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Verified Batch Medians</div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-200 transition-all flex flex-col justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Flame className="w-4 h-4" />
                </div>
                <span className="font-mono text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  Highest CTC
                </span>
              </div>
              <div className="mt-3">
                <div className="font-display text-2xl font-black text-amber-600 tracking-tight">
                  {hub.stats.highestPlacement}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Domestic &amp; International</div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <span className="font-mono text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  Fee Bracket
                </span>
              </div>
              <div className="mt-3">
                <div className="font-display text-2xl font-black text-purple-700 tracking-tight">
                  {hub.stats.feeRange}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Total 2-Year Program</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#lead-form-section"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#6336EA] to-[#8B5CF6] hover:from-[#5225D7] hover:to-[#7C3AED] text-white font-display font-bold text-sm transition-all shadow-lg shadow-purple-600/25 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              Book Free {hub.cityName} Counselling
            </a>

            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit,%20please%20send%20me%20the%20MBA%20college%20shortlist%20and%20fee%20cutoffs%20for%20Delhi%20NCR%20(2027-2029)"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md shadow-emerald-600/20 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              Get WhatsApp Shortlist (Free)
            </a>

            {comparedColleges.length > 0 && (
              <button
                onClick={handleCompareNow}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all animate-pulse shadow-md"
              >
                <Layers className="w-4 h-4" />
                Compare Selected ({comparedColleges.length})
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Direct AI Answer Summary Block (GEO / AEO Rule 2) ────────────────── */}
      <section className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="rounded-3xl bg-gradient-to-br from-[#0F1026] via-[#1E1B4B] to-[#0F1026] text-white p-6 sm:p-8 border-2 border-[#F59E0B] shadow-xl shadow-indigo-950/20">
          <div className="flex items-center gap-2 text-[#F59E0B] font-mono text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            Key Takeaways &amp; AI Answer Summary (Delhi NCR MBA Admissions 2027–2029)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
              <div className="text-amber-300 font-bold text-sm font-display flex items-center gap-1.5">
                <Building className="w-4 h-4" />
                Corporate Density &amp; Hubs
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                Home to <strong>500+ Fortune 500 corporate headquarters</strong> across Cyber City Gurgaon, Noida Expressways, and Central Delhi, offering unmatched summer internships and corporate live projects.
              </p>
            </div>

            <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
              <div className="text-emerald-300 font-bold text-sm font-display flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                Fees vs Median Placement (ROI)
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                Course fees range from <strong>₹7.50L (GL Bajaj)</strong> to <strong>₹24.50L (MDI Gurgaon)</strong>, delivering median CTCs of <strong>₹8.50 LPA to ₹26.70 LPA</strong> with payback periods between <strong>14 to 22 months</strong>.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-purple-300 font-bold text-sm font-display flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Accepted Exams &amp; Direct Merit
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                Accepted exams: <strong>CAT, XAT, CMAT, MAT, NMAT, ATMA, CUET-PG</strong>. Several top-tier private colleges offer direct merit seats based on graduation score (min 50%) and personal interview clearance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Navigation Tabs ──────────────────────────────────────────────── */}
      <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-12 z-30 shadow-xs mt-10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 sm:space-x-3 overflow-x-auto py-3 no-scrollbar">
            <button
              onClick={() => setActiveTab("catalog")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "catalog"
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-600/25"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
              }`}
            >
              <Building className="w-4 h-4" />
              {hub.cityName} Colleges ({filteredColleges.length})
            </button>

            <button
              onClick={() => setActiveTab("cutoffs")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "cutoffs"
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-600/25"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Cutoff &amp; Exam Matrix
            </button>

            <button
              onClick={() => setActiveTab("roi")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "roi"
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-600/25"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              ROI &amp; Payback Matrix
            </button>

            <button
              onClick={() => setActiveTab("tier-guide")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "tier-guide"
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-600/25"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
              }`}
            >
              <Globe2 className="w-4 h-4" />
              Tier-Wise Guide &amp; Hubs
            </button>

            <button
              onClick={() => setActiveTab("low-fees")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "low-fees"
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-600/25"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Low Fees &amp; Direct Admission
            </button>
          </nav>
        </div>
      </div>

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <main className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ── TAB 1: COLLEGES CATALOG ────────────────────────────────────── */}
        {activeTab === "catalog" && (
          <div className="space-y-8">
            {/* Filters Bar */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${hub.cityName} colleges...`}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                  />
                </div>

                {/* Sub-region Filter */}
                <div>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
                  >
                    <option value="All Locations">All Locations (NCR)</option>
                    <option value="Delhi">Delhi / New Delhi</option>
                    <option value="Noida">Noida</option>
                    <option value="Greater Noida">Greater Noida</option>
                    <option value="Gurgaon">Gurgaon / Gurugram</option>
                    <option value="Ghaziabad">Ghaziabad</option>
                    <option value="Faridabad">Faridabad</option>
                  </select>
                </div>

                {/* Fee Range */}
                <div>
                  <select
                    value={selectedFeeRange}
                    onChange={(e) => setSelectedFeeRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
                  >
                    <option value="All Fees">All Total Fees</option>
                    <option value="< ₹8 Lakhs">Under ₹8 Lakhs</option>
                    <option value="₹8L - ₹14 Lakhs">₹8L - ₹14 Lakhs</option>
                    <option value="₹14 Lakhs+">₹14 Lakhs &amp; Above</option>
                  </select>
                </div>

                {/* Entrance Exam */}
                <div>
                  <select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
                  >
                    <option value="All Exams">All Accepted Exams</option>
                    <option value="CAT">CAT Accepted</option>
                    <option value="XAT">XAT Accepted</option>
                    <option value="CMAT">CMAT Accepted</option>
                    <option value="MAT">MAT Accepted</option>
                    <option value="NMAT">NMAT Accepted</option>
                    <option value="CUET-PG">CUET-PG Accepted</option>
                    <option value="GMAT">GMAT Accepted</option>
                  </select>
                </div>

                {/* Sorting */}
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
                  >
                    <option value="default">Sort by: Recommended</option>
                    <option value="placement-desc">Highest Average CTC</option>
                    <option value="fee-asc">Lowest Course Fees</option>
                    <option value="fee-desc">Highest Course Fees</option>
                  </select>
                </div>
              </div>

              {/* Active Results Counter */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
                <div>
                  Showing <span className="font-bold text-[#2563EB]">{filteredColleges.length}</span> verified business schools in {hub.cityName}
                </div>
                {(searchQuery || selectedFeeRange !== "All Fees" || selectedExam !== "All Exams" || selectedLocation !== "All Locations" || sortBy !== "default") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedFeeRange("All Fees");
                      setSelectedExam("All Exams");
                      setSelectedLocation("All Locations");
                      setSortBy("default");
                    }}
                    className="text-[#2563EB] hover:underline font-bold"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            </div>

            {/* Colleges Cards Grid */}
            {filteredColleges.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <Building className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-slate-900">No colleges match your specific filter criteria</h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Try clearing some filter options or search for another location in {hub.cityName}.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFeeRange("All Fees");
                    setSelectedExam("All Exams");
                    setSelectedLocation("All Locations");
                  }}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow-md"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {filteredColleges.map((college, idx) => {
                  const isCompared = comparedColleges.some((c) => c.slug === college.slug);

                  return (
                    <div
                      key={college.slug || idx}
                      className="group flex flex-col justify-between rounded-[28px] bg-white border-[1.5px] border-[#061124]/10 hover:border-[#2563EB]/40 p-5 sm:p-6 transition-all duration-300 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:shadow-[0_30px_60px_-25px_rgba(37,99,235,0.2)] hover:-translate-y-1.5 relative overflow-hidden"
                    >
                      {/* Top Header & Badges */}
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200/80 px-2.5 py-0.5 rounded-lg mb-2 font-mono uppercase tracking-wider">
                              <Award className="w-3 h-3" />
                              {college.ranking || "AICTE Approved"}
                            </span>
                            <Link href={getCollegeDetailUrl(college)}>
                              <h3 className="font-display text-lg font-extrabold text-[#0F1026] group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2 min-h-[48px]">
                                {college.name}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{college.location}</span>
                            </div>
                          </div>

                          {/* Compare Toggle Button */}
                          <button
                            onClick={() => handleCompareToggle(college.slug)}
                            className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition-all cursor-pointer ${
                              isCompared
                                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                                : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            }`}
                            title="Compare side-by-side"
                          >
                            {isCompared ? <Check className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Metric Highlights Grid */}
                        <div className="mt-4 grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/70 text-center">
                          <div>
                            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                              Average CTC
                            </div>
                            <div className="font-display font-black text-[#10B981] text-base sm:text-lg mt-0.5">
                              {college.avg_placement || "₹8.50 LPA"}
                            </div>
                          </div>
                          <div className="border-l border-slate-200 pl-2">
                            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                              Total Fees
                            </div>
                            <div className="font-display font-black text-[#0F1026] text-base sm:text-lg mt-0.5">
                              {college.fees || "₹9.50 Lakhs"}
                            </div>
                          </div>
                        </div>

                        {/* Accepted Exams */}
                        {college.exams && college.exams.length > 0 && (
                          <div className="mt-3.5 flex flex-wrap gap-1.5 items-center">
                            <span className="text-[11px] text-slate-500 font-semibold mr-1 font-mono">Exams:</span>
                            {college.exams.slice(0, 4).map((exam, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-700 font-mono font-bold shadow-2xs"
                              >
                                {exam}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5">
                        <Link
                          href={getCollegeDetailUrl(college)}
                          className="flex-1 text-center py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all border border-slate-200/80"
                        >
                          View Details
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleOpenInquiry({
                              name: college.name,
                              slug: college.slug,
                              location: college.location,
                              fees: college.fees,
                              avg_placement: college.avg_placement,
                              hubCity: hub.cityName,
                            })
                          }
                          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
                          Apply Now
                        </button>
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
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center gap-2 mb-2">
                    <span className="w-4 h-0.5 rounded-full bg-[#2563EB]" />
                    Entrance Cutoff Matrix
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1026] tracking-tight">
                    {hub.cityName} MBA &amp; PGDM Cutoff Benchmarks (2027–2029)
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Official &amp; expected cutoff percentiles across CAT, XAT, CMAT, MAT, and GMAT for top B-Schools in Delhi NCR.
                  </p>
                </div>
                <a
                  href="#lead-form-section"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 font-bold text-xs hover:bg-purple-100 transition-all self-start sm:self-auto"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Evaluate My Percentile
                </a>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                      <th className="py-3.5 px-4 rounded-l-xl font-bold">College / Business School</th>
                      <th className="py-3.5 px-4 font-bold">Accepted Entrance Exam</th>
                      <th className="py-3.5 px-4 font-bold">Expected Cutoff</th>
                      <th className="py-3.5 px-4 font-bold">Total Fees</th>
                      <th className="py-3.5 px-4 font-bold">Average Placement</th>
                      <th className="py-3.5 px-4 rounded-r-xl text-right font-bold">Shortlist</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {hub.cutoffsTable.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-4 font-display font-bold text-slate-900">
                          {item.slug ? (
                            <Link href={`/colleges/${item.slug}`} className="hover:text-[#2563EB] transition-colors flex items-center gap-1.5 group">
                              <span>{item.collegeName}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#2563EB] transition-opacity" />
                            </Link>
                          ) : (
                            item.collegeName
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold">
                            {item.exam}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono font-black text-purple-700">{item.cutoff}</td>
                        <td className="py-4 px-4 font-display font-semibold text-slate-800">{item.fee}</td>
                        <td className="py-4 px-4 font-display font-black text-[#10B981]">{item.avgPlacement}</td>
                        <td className="py-4 px-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenInquiry({
                                name: item.collegeName,
                                slug: item.slug,
                                location: hub.cityName,
                                fees: item.fee,
                                avg_placement: item.avgPlacement,
                                hubCity: hub.cityName,
                              })
                            }
                            className="inline-flex items-center gap-1 text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-3.5 py-1.5 rounded-lg font-bold transition-all shadow-xs cursor-pointer"
                          >
                            Apply <ArrowRight className="w-3 h-3" />
                          </button>
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
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#10B981] flex items-center gap-2 mb-2">
                <span className="w-4 h-0.5 rounded-full bg-[#10B981]" />
                Financial ROI &amp; Payback Intelligence
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1026] tracking-tight">
                Return on Investment (ROI) &amp; Payback Analysis for {hub.cityName}
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                Comparing total 2-year educational costs against realistic first-year starting CTCs to compute expected financial payback periods for Delhi NCR management institutes.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                {hub.roiHighlights.map((hl, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:shadow-md hover:border-emerald-300 transition-all">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center font-mono font-black text-sm mb-4">
                        0{idx + 1}
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 mb-2">{hl.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{hl.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inverted Pyramid AEO Question 1 */}
              <div className="mt-8 p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <h3 className="font-display text-lg font-extrabold text-emerald-950 mb-2">
                  What is the Realistic ROI and Payback Period for Delhi NCR PGDM Colleges?
                </h3>
                <p className="text-sm text-slate-800 leading-relaxed">
                  <strong>The average financial payback period for Delhi NCR PGDM colleges ranges between 14 to 22 months post-graduation.</strong> With private college fees averaging ₹9.50L to ₹14.00L and median starting CTCs between ₹8.50 LPA to ₹12.00 LPA, students who secure campus placements in Delhi NCR recover their entire tuition investment within their first two years of corporate employment.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: TIER-WISE GUIDE & HUBS ──────────────────────────────── */}
        {activeTab === "tier-guide" && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#6336EA] flex items-center gap-2 mb-2">
                  <span className="w-4 h-0.5 rounded-full bg-[#6336EA]" />
                  Strategic Admissions Intelligence
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1026] tracking-tight">
                  Tier-Wise Classification &amp; Corporate Ecosystem in {hub.cityName}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  Delhi NCR stands out as India’s highest-density management education cluster. To make an informed choice, compare colleges based on their recruitment tier and industrial proximity:
                </p>
              </div>

              {/* Tier Classification Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-bold uppercase mb-3">
                    Tier-1 Elite (90+ %ile)
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 mb-2">
                    MDI Gurgaon, FMS Delhi, IIFT, IIT Delhi (DMS)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Top national institutions offering median CTCs of ₹24.00L to ₹34.00L with consulting, investment banking, and global FMCG hiring.
                  </p>
                  <div className="font-mono text-[11px] text-slate-500 font-semibold">Exams: CAT / GMAT only</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-mono font-bold uppercase mb-3">
                    Tier-2 Premier (75–88 %ile)
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 mb-2">
                    FORE School, IMI Delhi, BIMTECH, LBSIM
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Established business schools with strong industry boards, international accreditations (AACSB/SAQS), and ₹11.5L–₹17.0L median packages.
                  </p>
                  <div className="font-mono text-[11px] text-slate-500 font-semibold">Exams: CAT / XAT / CMAT / GMAT</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-mono font-bold uppercase mb-3">
                    Tier-3 &amp; High ROI (55–75 %ile)
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 mb-2">
                    NDIM Delhi, FIIB, JIMS, GL Bajaj, FOSTIIMA, Jaipuria
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    High value-for-money colleges with fees under ₹8L–₹14L and steady ₹7.5L–₹10.5L average placements in BFSI, IT, FinTech, and Retail.
                  </p>
                  <div className="font-mono text-[11px] text-slate-500 font-semibold">Exams: CAT / MAT / CMAT / ATMA / Direct</div>
                </div>
              </div>

              {/* Regional Corporate Hubs Breakdown */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-4">
                  Key Corporate Placement Corridors in Delhi NCR
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="font-display font-bold text-slate-900 text-base mb-1">
                      Cyber City &amp; Golf Course Ext. (Gurgaon)
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Consulting &amp; Big-4 (Deloitte, EY, PwC, KPMG), Tech Giants (Google, Microsoft), and FinTech unicorns.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="font-display font-bold text-slate-900 text-base mb-1">
                      Noida Expressway &amp; Sector 62/125
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      IT Services (HCL, Infosys, Tech Mahindra), Media, E-commerce Logistics, and Supply Chain management clusters.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="font-display font-bold text-slate-900 text-base mb-1">
                      Central &amp; South Delhi Corridors
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Public Sector undertakings (PSUs), Wealth Management, FMCG head offices, and Healthcare leadership.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Blog & Review Articles Ribbon */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="font-display text-base font-bold text-slate-900 mb-3">
                  Read Expert Comparison &amp; Review Articles:
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href="/posts/ndim-delhi-vs-fostiima-business-school-comparison-2027-29"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    NDIM Delhi vs FOSTIIMA Comparison
                  </Link>

                  <Link
                    href="/posts/ndim-delhi-pgdm-mba-2027-29-fee-admission-process"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    NDIM Delhi Complete Review 2027
                  </Link>

                  <Link
                    href="/posts/low-fees-mba-colleges-delhi-ncr-2027-29"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Low Fees MBA Colleges Delhi NCR
                  </Link>

                  <Link
                    href="/posts/top-mba-colleges-in-noida-2027"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Top MBA Colleges in Noida
                  </Link>

                  <Link
                    href="/posts/direct-mba-admission-delhi-ncr-2027-29"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Direct Admission in Delhi NCR
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 5: LOW FEES & DIRECT ADMISSION ─────────────────────────── */}
        {activeTab === "low-fees" && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#F59E0B] flex items-center gap-2 mb-2">
                  <span className="w-4 h-0.5 rounded-full bg-[#F59E0B]" />
                  Affordability &amp; Direct Admissions
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1026] tracking-tight">
                  Best MBA Colleges in Delhi NCR with Fees Under ₹10 Lakhs
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Students seeking high return on investment without massive education loans can explore these top AICTE-approved management institutes in Delhi, Noida, Greater Noida, and Ghaziabad:
                </p>
              </div>

              {/* Low Fee Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md font-mono">
                        Fee: ₹7.50 Lakhs
                      </span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md font-mono">
                        Avg: ₹7.50 LPA
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                      GL Bajaj Institute of Management, Greater Noida
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      Accepts MAT / CMAT / CAT. Highly disciplined academic environment with 100% placement track record in IT, BFSI, and FMCG.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleOpenInquiry({
                        name: "GL Bajaj Institute of Management",
                        slug: "gl-bajaj-greater-noida",
                        location: "Greater Noida",
                        fees: "₹7.50 Lakhs",
                        avg_placement: "₹7.50 LPA",
                        hubCity: "Delhi NCR",
                      })
                    }
                    className="w-full py-2 rounded-xl bg-[#2563EB] text-white font-bold text-xs"
                  >
                    Apply for GL Bajaj
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md font-mono">
                        Fee: ₹9.50 Lakhs
                      </span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md font-mono">
                        Avg: ₹8.10 LPA
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                      JIMS (Jagannath International Management School)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      Campuses in Kalkaji &amp; Rohini. Strong dual-specialization curriculum in Marketing, FinTech, and Data Analytics.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleOpenInquiry({
                        name: "JIMS Kalkaji / Rohini",
                        slug: "jims-kalkaji",
                        location: "New Delhi",
                        fees: "₹9.50 Lakhs",
                        avg_placement: "₹8.10 LPA",
                        hubCity: "Delhi NCR",
                      })
                    }
                    className="w-full py-2 rounded-xl bg-[#2563EB] text-white font-bold text-xs"
                  >
                    Apply for JIMS
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md font-mono">
                        Fee: ₹9.50 Lakhs
                      </span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md font-mono">
                        Avg: ₹9.00 LPA
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                      FOSTIIMA Business School, New Delhi
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      Founded by IIM Ahmedabad alumni with intensive case study pedagogy and active recruiter ties in Gurugram.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleOpenInquiry({
                        name: "FOSTIIMA Business School",
                        slug: "fostiima-business-school",
                        location: "New Delhi",
                        fees: "₹9.50 Lakhs",
                        avg_placement: "₹9.00 LPA",
                        hubCity: "Delhi NCR",
                      })
                    }
                    className="w-full py-2 rounded-xl bg-[#2563EB] text-white font-bold text-xs"
                  >
                    Apply for FOSTIIMA
                  </button>
                </div>
              </div>

              {/* Direct Admission Criteria Info Box */}
              <div className="mt-8 p-6 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                <h3 className="font-display text-lg font-extrabold text-blue-950 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  How to Secure Direct MBA / PGDM Merit Admission in Delhi NCR (2027)
                </h3>
                <p className="text-sm text-slate-800 leading-relaxed">
                  <strong>Candidates with 50%+ in graduation and valid entrance percentiles (or looking for institutional GD-PI assessment) are eligible for direct merit seats.</strong> Mohit Jain provides 1-on-1 profile mapping to match your academic background with college cutoffs, application form combo discounts, and interview preparation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Direct Admission & Lead Capture Section ───────────────────────── */}
        <section id="lead-form-section" className="mt-16 pt-10 border-t border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                1-on-1 Profile Evaluation with Mohit Jain
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F1026] leading-tight tracking-tight">
                Confused About Selecting the Best MBA College in {hub.cityName}?
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Don’t rely on unverified portal rankings. Get a customized, realistic college shortlist matching your CAT/XAT/CMAT/MAT score, academic background, budget, and desired specialization (Marketing, Finance, Analytics, HR, or FinTech).
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>100% Free &amp; Unbiased GD-PI Preparation Support</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Direct Merit &amp; Institutional Quota Seat Guidance</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Official Placement Audits &amp; Real Alumni Insights</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Save Up to ₹5,000+ on Application Form Combo Bundles</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
                <InquiryForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── Geo FAQ Accordion Section ─────────────────────────────────────── */}
        <section className="mt-16 pt-10 border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold font-mono uppercase tracking-wider border border-emerald-200">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                Frequently Asked Questions
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0F1026] mt-3 tracking-tight">
                MBA &amp; PGDM Admissions in {hub.cityName}: FAQs
              </h2>
            </div>

            <div className="space-y-3.5">
              {hub.faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-slate-900 hover:text-[#2563EB] transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#2563EB]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
        <section className="mt-16 pt-10 border-t border-slate-200/80">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F1026] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#6336EA]" />
                Explore MBA Admissions in Other Cities
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Browse location-wise rankings, fee structures, and placement reports across India’s major education hubs.
              </p>
            </div>
            <Link
              href="/mba-pgdm-admission-2027/"
              className="text-xs sm:text-sm font-bold text-[#2563EB] hover:text-blue-800 hidden sm:inline-flex items-center gap-1"
            >
              All India Directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {otherHubs.map((other) => (
              <Link
                key={other.hubKey}
                href={other.route}
                className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all text-center flex flex-col justify-between"
              >
                <div className="font-display text-sm font-bold text-[#0F1026] group-hover:text-[#2563EB] transition-colors">
                  {other.cityName}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">{other.stats.totalColleges}</div>
                <div className="text-[11px] text-[#10B981] font-mono font-bold mt-1">
                  Avg: {other.stats.avgPlacement.split(" - ")[0]}
                </div>
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

      {/* ── Specific College Inquiry Modal ───────────────────────────────────── */}
      <RegionalCollegeInquiryModal
        target={inquiryTarget}
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </div>
  );
}
