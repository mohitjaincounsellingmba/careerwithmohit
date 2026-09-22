"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Cpu,
  Laptop,
  Globe,
  FileSpreadsheet,
  Calculator,
  Search,
  MapPin,
  IndianRupee,
  Award,
  Sparkles,
  ArrowRight,
  Target,
  CheckCircle2,
  BookOpen
} from "lucide-react";

type StreamTab = "mba" | "btech" | "online" | "abroad" | "mocks" | "calculators";

interface TabConfig {
  id: StreamTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const STREAM_TABS: TabConfig[] = [
  { id: "mba", label: "MBA / PGDM 2027", icon: GraduationCap, badge: "Popular", badgeColor: "bg-amber-400 text-slate-950 font-bold" },
  { id: "btech", label: "B.Tech & Engg", icon: Cpu },
  { id: "online", label: "Online Degrees", icon: Laptop, badge: "UGC-DEB", badgeColor: "bg-cyan-400 text-slate-950 font-bold" },
  { id: "abroad", label: "Study Abroad", icon: Globe, badge: "Global", badgeColor: "bg-emerald-400 text-slate-950 font-bold" },
  { id: "mocks", label: "Free CBT Mocks", icon: Target, badge: "Free", badgeColor: "bg-rose-500 text-white font-bold" },
  { id: "calculators", label: "Score Calculators", icon: Calculator },
];

export function EducationFinder() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<StreamTab>("mba");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "mba" || activeTab === "btech") {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set("search", searchQuery.trim());
      if (selectedLocation) params.set("location", selectedLocation);
      if (selectedBudget) params.set("budget", selectedBudget);
      if (selectedExam) params.set("exam", selectedExam);
      if (activeTab === "btech") params.set("course", "btech");
      
      const queryString = params.toString();
      router.push(`/colleges${queryString ? `?${queryString}` : ""}`);
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

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-white/20 p-3 sm:p-6 shadow-2xl shadow-black/50 text-white transition-all">
      {/* Stream Tabs Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 sm:pb-4 border-b border-white/10 no-scrollbar">
        {STREAM_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02] ring-1 ring-white/30"
                  : "bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-blue-400"}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full uppercase tracking-wider ${tab.badgeColor}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive Stream Form View */}
      <div className="pt-4 sm:pt-6">
        {activeTab === "mba" && (
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Keyword Search */}
              <div className="sm:col-span-4 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search college, city, or specialisation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition-all"
                />
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
                  <option value="pune">Pune & Mumbai</option>
                  <option value="bangalore">Bangalore & South</option>
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
                ⚡ NMIMS & SIBM
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
              <div className="sm:col-span-5 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search B.Tech colleges (e.g. Computer Science, AI, Delhi NCR)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition-all"
                />
              </div>

              <div className="sm:col-span-4 relative">
                <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 pointer-events-none" />
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full h-12 pl-10 pr-8 rounded-xl bg-slate-800 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer appearance-none"
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
                  className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Search B.Tech</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="text-slate-400 font-medium">Popular:</span>
              <Link href="/tools/btech-college-predictor" className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold hover:bg-emerald-500/30 transition-colors">
                🎯 JEE Main Rank Predictor
              </Link>
              <Link href="/colleges?search=cse" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors">
                💻 Computer Science &amp; AI
              </Link>
              <Link href="/colleges?search=delhi" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors">
                📍 Delhi NCR Premier Tech
              </Link>
            </div>
          </form>
        )}

        {activeTab === "online" && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  100% Legal UGC-DEB Entitled Universities
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Compare 40+ Online MBA, MCA &amp; Degree Programs
                </h3>
                <p className="text-xs text-blue-200/80 max-w-xl">
                  Govt &amp; UPSC equivalent, Canada/USA WES approved, no-cost EMI from ₹3,500/month.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/online-degree-certification"
                  className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-md"
                >
                  View 40+ Universities &rarr;
                </Link>
                <Link
                  href="/online-degree-certification/cheapest-online-mba"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/15 transition-all"
                >
                  MBA &lt; ₹1 Lakh
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400 font-medium self-center">Explore Programs:</span>
              <Link href="/online-degree-certification/online-mba" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10">🎓 Online MBA</Link>
              <Link href="/online-degree-certification/online-mca" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10">💻 Online MCA (AI &amp; Cloud)</Link>
              <Link href="/online-degree-certification/wes-approved-online-degrees" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10">🌍 WES Approved (Abroad)</Link>
            </div>
          </div>
        )}

        {activeTab === "abroad" && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  🇺🇸 🇬🇧 🇨🇦 🇩🇪 🇦🇺 Global University Admissions
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Study Abroad Mentorship: USA, UK, Canada, Germany &amp; Australia
                </h3>
                <p className="text-xs text-blue-200/80 max-w-xl">
                  Profile evaluation, SOP/LOR drafting, IELTS/GMAT preparation, and scholarship assistance.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/abroad-education"
                  className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md"
                >
                  Explore Global Hub &rarr;
                </Link>
                <Link
                  href="/book-session"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/15 transition-all"
                >
                  Book 1-on-1 Advisory
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400 font-medium self-center">Destinations:</span>
              <Link href="/abroad-education?country=usa" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10">🇺🇸 USA Universities</Link>
              <Link href="/abroad-education?country=uk" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10">🇬🇧 UK Russell Group</Link>
              <Link href="/abroad-education?country=germany" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10">🇩🇪 Germany Zero Tuition</Link>
            </div>
          </div>
        )}

        {activeTab === "mocks" && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
                  🔥 100% Free Full-Length CBT Simulation
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Real Exam Software Simulation with Instant Percentile &amp; Solutions
                </h3>
                <p className="text-xs text-blue-200/80 max-w-xl">
                  Sectional timers, accurate +3/-1 marking, detailed solution breakdowns for CAT, XAT, NMAT, SNAP, MAT &amp; GMAT.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/mock-tests"
                  className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md"
                >
                  View 50+ Mock Tests &rarr;
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400 font-medium self-center">Direct Mock Launchers:</span>
              <Link href="/cat-mock-test" className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-400/30 font-bold">🎯 CAT 2026 Free Mock</Link>
              <Link href="/xat-mock-test" className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-400/30 font-bold">⚡ XAT 2027 Mock</Link>
              <Link href="/nmat-mock-test" className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">⏱️ NMAT Mock</Link>
              <Link href="/snap-mock-test" className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold">🚀 SNAP Mock</Link>
            </div>
          </div>
        )}

        {activeTab === "calculators" && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  📊 AI Score &amp; Percentile Predictors
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Convert Raw Test Scores into Normalized Percentiles &amp; College Shortlists
                </h3>
                <p className="text-xs text-blue-200/80 max-w-xl">
                  Verified statistical formulas calibrated on official IIM CAT, XAT, and MAT normalization algorithms.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/tools"
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md"
                >
                  All 20+ Tools Hub &rarr;
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400 font-medium self-center">Popular Tools:</span>
              <Link href="/tools/cat-score-calculator" className="px-3 py-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">📈 CAT Score Calculator</Link>
              <Link href="/tools/mat-score-calculator" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10">Sept MAT Checker</Link>
              <Link href="/calculator/mhcet-mba-2026" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10">MHCET MBA Predictor</Link>
              <Link href="/tools/ats-resume-builder" className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">📄 ATS Resume Builder</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
