"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Sparkles,
  ArrowRight,
  Building2,
  Award,
  ChevronRight,
  TrendingUp,
  Percent,
  CheckCircle2,
  Video,
  Layers,
  Search,
  BookOpen
} from "lucide-react";
import { MEGA_MENU_DATA } from "@/data/megaMenuData";
import { FEATURED_DIRECTORY_COLLEGES } from "@/lib/featuredColleges";

const CITIES = [
  { label: "All Cities", value: "all" },
  { label: "Delhi NCR", value: "delhi" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Pune", value: "pune" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Chennai", value: "chennai" },
  { label: "Kolkata", value: "kolkata" },
  { label: "Ahmedabad", value: "ahmedabad" },
  { label: "Jaipur", value: "jaipur" },
  { label: "Chandigarh", value: "chandigarh" },
];

export function ShikshaCollegeExplorer() {
  const [activeCourseId, setActiveCourseId] = useState<string>("mba");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  const activeCourse = useMemo(() => {
    return MEGA_MENU_DATA.find((c) => c.id === activeCourseId) || MEGA_MENU_DATA[0];
  }, [activeCourseId]);

  // Filter featured directory colleges
  const filteredColleges = useMemo(() => {
    return FEATURED_DIRECTORY_COLLEGES.filter((col) => {
      const streamMatch =
        activeCourseId === "mba"
          ? col.stream === "mba" || col.category === "premier" || col.category === "iim"
          : activeCourseId === "engineering"
          ? col.stream === "btech"
          : activeCourseId === "online-degrees"
          ? col.stream === "online" || col.category === "online"
          : true;

      const cityMatch =
        selectedCity === "all"
          ? true
          : (col.city && col.city.toLowerCase().includes(selectedCity.toLowerCase())) ||
            (col.location && col.location.toLowerCase().includes(selectedCity.toLowerCase()));

      return streamMatch && cityMatch;
    }).slice(0, 6);
  }, [activeCourseId, selectedCity]);

  return (
    <section className="w-full bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-slate-800 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Top Shiksha-Style Featured Colleges Ticker Strip */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                FEATURED
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-200">
                Top Rated Universities & Institutes Admissions 2026-27
              </h2>
            </div>
            <Link
              href="/colleges"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <span>View All 770+</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Featured Cards Row (as seen in Shiksha screenshot) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                name: "NEW HORIZON COLLEGE OF ENGINEERING",
                location: "BANGALORE",
                badge: "Highest: 45 LPA",
                tagline: "Top Engg College in India | Placements",
                href: "/colleges/nhce-bangalore",
              },
              {
                name: "AMITY UNIVERSITY",
                location: "NOIDA (DELHI NCR)",
                badge: "Ranked Top 3% Globally",
                tagline: "Admissions Open 2026-27 | MBA & B.Tech",
                href: "/colleges/amity-noida",
              },
              {
                name: "SRM UNIVERSITY DELHI-NCR",
                location: "SONEPAT",
                badge: "NAAC A+ Accredited",
                tagline: "High Placement Ratio | AICTE Approved",
                href: "/colleges/srm-institute-of-science-and-technology-kattankulathur",
              },
              {
                name: "IIM INDORE - INDIAN INSTITUTE OF MGMT",
                location: "INDORE",
                badge: "Ranked 4 for IIMs",
                tagline: "Tier-1 Cutoffs & Audited Placements",
                href: "/colleges/iim-indore",
              },
            ].map((inst, idx) => (
              <Link
                key={idx}
                href={inst.href}
                className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 rounded-xl p-3.5 transition-all flex flex-col justify-between group shadow-sm hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-100 group-hover:text-blue-400 line-clamp-1">
                      {inst.name}
                    </span>
                    <span className="text-[9px] font-bold text-amber-300 bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.2 rounded shrink-0">
                      {inst.location}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{inst.tagline}</p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-bold">{inst.badge}</span>
                  <span className="text-blue-400 font-semibold group-hover:underline flex items-center gap-0.5 text-[10px]">
                    Learn More &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Course Ribbon Switcher (Shiksha Bottom Navbar Style) */}
        <div className="bg-slate-800/95 border border-slate-700/80 rounded-2xl p-2 sm:p-3 shadow-xl mb-6">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {MEGA_MENU_DATA.map((course) => {
              const isActive = course.id === activeCourseId;
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => {
                    setActiveCourseId(course.id);
                    setSelectedCity("all");
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-100 ring-2 ring-blue-400/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/70"
                  }`}
                >
                  <span>{course.label}</span>
                  {course.badge && (
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                        isActive
                          ? "bg-white text-blue-900"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {course.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            City:
          </span>
          {CITIES.map((city) => {
            const isSelected = selectedCity === city.value;
            return (
              <button
                key={city.value}
                type="button"
                onClick={() => setSelectedCity(city.value)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                }`}
              >
                {city.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Grid for Selected Course & City */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (8 cols): Top Colleges List & Direct Links */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>
                  Top {activeCourse.label} Colleges{" "}
                  {selectedCity !== "all"
                    ? `in ${CITIES.find((c) => c.value === selectedCity)?.label}`
                    : "in India"}
                </span>
                <span className="text-xs font-normal text-slate-400">
                  (2027 Cutoffs & Fees)
                </span>
              </h3>
              <Link
                href={
                  activeCourseId === "mba"
                    ? selectedCity !== "all"
                      ? `/colleges/mba-colleges-${selectedCity === "delhi" ? "delhi-ncr" : selectedCity}`
                      : "/mba-pgdm-admission-2027"
                    : activeCourse.href
                }
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>View All Filtered</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Colleges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredColleges.length > 0 ? (
                filteredColleges.map((col) => (
                  <Link
                    key={col.id}
                    href={`/${col.slug}`}
                    className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 rounded-2xl p-4 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-400 line-clamp-1">
                          {col.name}
                        </h4>
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-700/60 px-2 py-0.5 rounded-full shrink-0">
                          {col.rating} ★
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{col.location}</span>
                        <span>•</span>
                        <span className="truncate text-slate-400">{col.ranking}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Avg Package</span>
                        <span className="text-emerald-400 font-bold">{col.avgPlacement}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Fees</span>
                        <span className="text-slate-200 font-semibold">{col.fees}</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                /* Fallback links if specific directory filter has 0 direct match */
                activeCourse.categories[0]?.links.slice(0, 6).map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 rounded-xl p-3.5 transition-all group flex items-center justify-between"
                  >
                    <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400 line-clamp-1">
                      {link.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))
              )}
            </div>

            {/* Quick Links Pills for this course */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Popular Links:</span>
              {activeCourse.categories[0]?.links.slice(0, 5).map((l) => (
                <Link
                  key={l.title}
                  href={l.href}
                  className="text-xs font-medium text-blue-400 hover:text-blue-300 bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
                >
                  {l.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column (4 cols): Quick Guidance & Form Discount Card */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* 1. Free 1-on-1 Mentorship Box */}
            <div className="bg-gradient-to-br from-blue-900/60 via-slate-800 to-indigo-950/80 border border-blue-500/40 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
                      FREE CONSULTATION
                    </span>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      1-on-1 Video Meet with Mohit Jain
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Get personalized shortlist of top {activeCourse.label} colleges according to your percentile, budget, and placement goals.
                </p>
              </div>

              <Link
                href="/book-session"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-xs text-center shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Book Free Google Meet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2. MBA Application Form Discounts Widget */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-emerald-400" />
                  Application Form Discounts
                </span>
                <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950 border border-emerald-800 px-1.5 py-0.5 rounded">
                  Save ₹5,000+
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                Save up to 50% to 100% on application forms across 55+ premier institutes.
              </p>
              <Link
                href="/mba-application-form-discount"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50 hover:bg-emerald-950/80 transition-colors"
              >
                <span>Calculate My Savings</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
