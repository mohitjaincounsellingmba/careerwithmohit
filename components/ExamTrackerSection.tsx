"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Target,
  Award,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  BookOpen,
  BarChart2
} from "lucide-react";

interface ExamInfo {
  id: string;
  name: string;
  fullName: string;
  category: "mba" | "global" | "ug";
  badge: string;
  badgeColor: string;
  examDate: string;
  registrationStatus: string;
  registrationColor: string;
  targetColleges: string;
  targetScore: string;
  pattern: string;
  mockHref: string;
  calcHref?: string;
  guideHref: string;
}

const EXAMS_DATA: ExamInfo[] = [
  {
    id: "cat",
    name: "CAT 2026",
    fullName: "Common Admission Test",
    category: "mba",
    badge: "IIM Premier",
    badgeColor: "bg-red-100 text-red-700 border-red-200",
    examDate: "Last Sunday of Nov 2026",
    registrationStatus: "Official Notification Out",
    registrationColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    targetColleges: "All 21 IIMs, FMS Delhi, SPJIMR, MDI Gurgaon, IIT DoMS",
    targetScore: "98.5+ %ile for IIM A/B/C",
    pattern: "120 Mins • 66 Qs (VARC 24, DILR 20, QA 22) • +3/-1 Marking",
    mockHref: "/cat-mock-test",
    calcHref: "/tools/cat-score-calculator",
    guideHref: "/top-tier-mba-colleges?tab=iim",
  },
  {
    id: "xat",
    name: "XAT 2027",
    fullName: "Xavier Aptitude Test",
    category: "mba",
    badge: "XLRI Decision Making",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    examDate: "First Sunday of Jan 2027",
    registrationStatus: "Applications Open",
    registrationColor: "text-blue-700 bg-blue-50 border-blue-200",
    targetColleges: "XLRI Jamshedpur & Delhi, XIMB, IMT Ghaziabad, GIM Goa",
    targetScore: "95+ %ile for XLRI BM/HRM",
    pattern: "210 Mins • 95 Qs (VALR, DM, QA-DI, GK & Essay) • Decision Making Focus",
    mockHref: "/xat-mock-test",
    calcHref: "/tools/xat-score-calculator-2027",
    guideHref: "/top-tier-mba-colleges?tab=xat",
  },
  {
    id: "nmat",
    name: "NMAT 2026",
    fullName: "NMAT by GMAC™",
    category: "mba",
    badge: "NMIMS Target",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    examDate: "Oct 2026 – Dec 2026 (Rolling Window)",
    registrationStatus: "Slot Booking Open",
    registrationColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    targetColleges: "NMIMS Mumbai, Bengaluru, TAPMI, K J Somaiya, SDA Bocconi",
    targetScore: "235+ Scaled Score for NMIMS Mumbai",
    pattern: "120 Mins • 108 Qs (Language 36, Logical 36, Quant 36) • Zero Negative",
    mockHref: "/nmat-mock-test",
    guideHref: "/top-tier-mba-colleges?tab=nmat",
  },
  {
    id: "snap",
    name: "SNAP 2026",
    fullName: "Symbiosis National Aptitude",
    category: "mba",
    badge: "Symbiosis Sprint",
    badgeColor: "bg-rose-100 text-rose-700 border-rose-200",
    examDate: "Dec 2026 (3 Test Slots)",
    registrationStatus: "Registrations Active",
    registrationColor: "text-blue-700 bg-blue-50 border-blue-200",
    targetColleges: "SIBM Pune, SCMHRD Pune, SIIB, SIBM Bengaluru",
    targetScore: "98.5+ %ile for SIBM & SCMHRD",
    pattern: "60 Mins • 60 Qs (Speed Exam: 1 Min/Q) • +1/-0.25 Marking",
    mockHref: "/snap-mock-test",
    guideHref: "/top-tier-mba-colleges?tab=snap",
  },
  {
    id: "mat",
    name: "MAT 2026-27",
    fullName: "Management Aptitude Test (AIMA)",
    category: "mba",
    badge: "600+ B-Schools",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    examDate: "4 Cycles: Sept, Dec, Feb & May (CBT/PBT)",
    registrationStatus: "Upcoming Cycle Open",
    registrationColor: "text-amber-700 bg-amber-50 border-amber-200",
    targetColleges: "600+ AICTE Business Schools across Delhi NCR, Pune & Bangalore",
    targetScore: "600-750 Composite Score (80-99 %ile)",
    pattern: "120 Mins • 150 Qs • Accepted by 600+ Top Private B-Schools",
    mockHref: "/mat-mock-test",
    calcHref: "/tools/mat-score-calculator",
    guideHref: "/colleges",
  },
  {
    id: "gmat",
    name: "GMAT Focus Edition",
    fullName: "Graduate Management Admission Test",
    category: "global",
    badge: "Global & 1-Yr MBA",
    badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    examDate: "Year-Round (Flexible Slot Booking)",
    registrationStatus: "Open 365 Days",
    registrationColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
    targetColleges: "ISB Hyderabad/Mohali, IIM 1-Yr PGPX/EPGP, INSEAD, Harvard, Stanford",
    targetScore: "655+ Score (89th %ile+) for ISB",
    pattern: "135 Mins • 3 Sections (Quant, Verbal, Data Insights) • Question-Adaptive",
    mockHref: "/gmat-mock-test",
    guideHref: "/abroad-education",
  },
  {
    id: "cuet",
    name: "CUET PG MBA 2027",
    fullName: "Common University Entrance Test (NTA)",
    category: "mba",
    badge: "Central Univs & TISS",
    badgeColor: "bg-teal-100 text-teal-700 border-teal-200",
    examDate: "March 2027",
    registrationStatus: "Pre-Registration Phase",
    registrationColor: "text-slate-700 bg-slate-100 border-slate-200",
    targetColleges: "TISS Mumbai, Delhi University (DSE/SRCC GBO), JNU, BHU, Hyderabad Univ",
    targetScore: "260+ Marks for Top Central Universities",
    pattern: "105 Mins • 75 Domain Qs • Highest ROI Central Universities",
    mockHref: "/mock-tests",
    calcHref: "/calculator/cuet-pg-2026",
    guideHref: "/colleges",
  },
  {
    id: "jee",
    name: "JEE Main 2027",
    fullName: "Joint Entrance Examination (Engineering)",
    category: "ug",
    badge: "NIT & IIIT Gateway",
    badgeColor: "bg-cyan-100 text-cyan-700 border-cyan-200",
    examDate: "Session 1: Jan 2027 • Session 2: April 2027",
    registrationStatus: "Notification Announced",
    registrationColor: "text-cyan-700 bg-cyan-50 border-cyan-200",
    targetColleges: "31 NITs, 25 IIITs, DTU, NSUT, and Premier Engineering Colleges",
    targetScore: "95+ %ile for Top NIT Branches",
    pattern: "180 Mins • 75 Qs (Physics, Chemistry, Maths) • +4/-1 Marking",
    mockHref: "/tools/jee-main-mock-test",
    calcHref: "/tools/btech-college-predictor",
    guideHref: "/colleges",
  },
];

export function ExamTrackerSection() {
  const [activeFilter, setActiveFilter] = useState<"all" | "mba" | "global" | "ug">("all");

  const filteredExams = EXAMS_DATA.filter((exam) => {
    if (activeFilter === "all") return true;
    return exam.category === activeFilter;
  });

  return (
    <section id="exam-tracker" className="bg-white py-16 sm:py-24 px-6 sm:px-12 border-b border-slate-200 content-auto">
      <div className="mx-auto max-w-7xl">
        {/* Header with Title & Filter Buttons */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-8 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              National Entrance Exam Radar 2026-2027
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Exam Calendar &amp; <span className="text-blue-600">Cutoff Tracker</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg font-normal text-slate-600">
              Real-time exam dates, registration timelines, target scores, and 100% free full-length CBT mock tests.
            </p>
          </div>

          {/* Filter Pill Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "all", label: "All National Exams" },
              { id: "mba", label: "MBA / PGDM" },
              { id: "global", label: "Global / Study Abroad" },
              { id: "ug", label: "B.Tech & UG" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between hover:border-blue-300"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border uppercase tracking-wider ${exam.badgeColor}`}>
                    {exam.badge}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${exam.registrationColor}`}>
                    {exam.registrationStatus}
                  </span>
                </div>

                {/* Exam Title */}
                <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {exam.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4 font-medium">
                  {exam.fullName}
                </p>

                {/* Key Metrics */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-500 font-medium">Exam Date: </span>
                      <strong className="text-slate-900 font-bold">{exam.examDate}</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Target className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-500 font-medium">Target Cutoff: </span>
                      <strong className="text-amber-700 font-bold">{exam.targetScore}</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Award className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-500 font-medium">Top Institutes: </span>
                      <span className="text-slate-700 font-medium line-clamp-2">{exam.targetColleges}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  href={exam.mockHref}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Attempt Free CBT Mock</span>
                </Link>

                <div className="flex items-center gap-2">
                  {exam.calcHref ? (
                    <Link
                      href={exam.calcHref}
                      className="flex-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-center text-[11px] font-bold transition-colors"
                    >
                      📊 Score Calculator
                    </Link>
                  ) : null}
                  <Link
                    href={exam.guideHref}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-center text-[11px] font-bold transition-colors"
                  >
                    🏛️ Top Colleges
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
