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
    <section className="w-full bg-gradient-to-b from-blue-50/50 via-white to-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 border-y border-blue-100/90 relative overflow-hidden">
      
      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Top Shiksha-Style Featured Colleges Ticker Strip */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-black text-[10px] uppercase tracking-wider">
                FEATURED
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Top Rated Universities &amp; Institutes Admissions 2026-27
              </h2>
            </div>
            <Link
              href="/colleges"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
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
                className="bg-white hover:bg-blue-50/40 border border-slate-200/90 hover:border-blue-400 rounded-xl p-3.5 transition-all flex flex-col justify-between group shadow-2xs hover:shadow-sm hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
                      {inst.name}
                    </span>
                    <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded shrink-0">
                      {inst.location}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{inst.tagline}</p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-600 font-bold">{inst.badge}</span>
                  <span className="text-blue-600 font-semibold group-hover:underline flex items-center gap-0.5 text-[10px]">
                    Learn More &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Course Ribbon Switcher (Shiksha Bottom Navbar Style) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-2 sm:p-3 shadow-sm mb-6">
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
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30 scale-100"
                      : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <span>{course.label}</span>
                  {course.badge && (
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                        isActive
                          ? "bg-white text-blue-900"
                          : "bg-blue-50 text-blue-700"
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
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
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
                    ? "bg-blue-600 text-white font-bold shadow-xs"
                    : "bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200"
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
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>
                  Top {activeCourse.label} Colleges{" "}
                  {selectedCity !== "all"
                    ? `in ${CITIES.find((c) => c.value === selectedCity)?.label}`
                    : "in India"}
                </span>
                <span className="text-xs font-normal text-slate-500">
                  (2027 Cutoffs &amp; Fees)
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
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
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
                    className="bg-white hover:bg-blue-50/40 border border-slate-200/90 hover:border-blue-400 rounded-2xl p-4 transition-all group flex flex-col justify-between shadow-2xs hover:shadow-sm"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
                          {col.name}
                        </h4>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                          {col.rating} ★
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{col.location}</span>
                        <span>•</span>
                        <span className="truncate text-slate-500">{col.ranking}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Avg Package</span>
                        <span className="text-emerald-600 font-bold">{col.avgPlacement}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Fees</span>
                        <span className="text-slate-900 font-semibold">{col.fees}</span>
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
                    className="bg-white hover:bg-blue-50/40 border border-slate-200/90 hover:border-blue-400 rounded-xl p-3.5 transition-all group flex items-center justify-between shadow-2xs"
                  >
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
                      {link.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))
              )}
            </div>

            {/* Quick Links Pills for this course */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-3 flex flex-wrap items-center gap-2 shadow-2xs">
              <span className="text-xs font-bold text-slate-500 mr-1">Popular Links:</span>
              {activeCourse.categories[0]?.links.slice(0, 5).map((l) => (
                <Link
                  key={l.title}
                  href={l.href}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60 transition-colors"
                >
                  {l.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column (4 cols): Quick Guidance & Form Discount Card */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* 1. Free 1-on-1 Mentorship Box */}
            <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-800 text-white rounded-2xl p-5 flex flex-col justify-between shadow-md">
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
                <p className="text-xs text-blue-100 leading-relaxed mb-4">
                  Get personalized shortlist of top {activeCourse.label} colleges according to your percentile, budget, and placement goals.
                </p>
              </div>

              <Link
                href="/book-session"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs text-center shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Book Free Google Meet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2. MBA Application Form Discounts Widget */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-emerald-600" />
                  Application Form Discounts
                </span>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  Save ₹5,000+
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Save up to 50% to 100% on application forms across 55+ premier institutes.
              </p>
              <Link
                href="/mba-application-form-discount"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/80 transition-colors"
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
