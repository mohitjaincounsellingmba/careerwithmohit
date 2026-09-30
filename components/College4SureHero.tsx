"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { College4SureLiveCompare } from "./College4SureLiveCompare";

const CITIES = [
  { name: "Delhi NCR", href: "/mba-admissions-by-region/delhi-ncr" },
  { name: "Pune", href: "/mba-admissions-by-region/pune" },
  { name: "Mumbai", href: "/mba-admissions-by-region/mumbai" },
  { name: "Bangalore", href: "/mba-admissions-by-region/bangalore" },
  { name: "Kolkata", href: "/mba-admissions-by-region/kolkata" },
  { name: "Jaipur", href: "/mba-admissions-by-region/jaipur" },
  { name: "Greater Noida", href: "/colleges?location=Greater+Noida" },
  { name: "Faridabad", href: "/colleges?location=Faridabad" },
  { name: "Gurgaon", href: "/colleges?location=Gurgaon" },
  { name: "Dehradun", href: "/colleges?location=Dehradun" },
  { name: "Chandigarh", href: "/colleges?location=Chandigarh" },
];

export function College4SureHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [cityIndex, setCityIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setCityIndex((prev) => (prev + 1) % CITIES.length);
        setFadeState("in");
      }, 240);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  const currentCity = CITIES[cityIndex];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/colleges");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] text-[#061124] pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#061124]/10">
      {/* Floating Ambient Glowing Blobs */}
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />

      <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Text & Search */}
          <div>
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border-[1.5px] border-[#061124]/10 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.15)] font-mono text-xs font-semibold uppercase tracking-wider mb-6 text-[#061124]">
              <span className="dotlive" />
              <span>770+ colleges · Verified by IIM &amp; FMS Alumni</span>
            </div>

            {/* Main Display Headline with Dynamic Rotating City */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[62px] font-extrabold text-[#061124] leading-[1.08] tracking-tight">
              Find Top MBA Colleges in<br />
              <span className="inline-block relative min-h-[1.25em] mt-1">
                <Link
                  href={currentCity.href}
                  className={`inline-flex items-center gap-2 hl text-[#061124] transition-all duration-300 transform ${
                    fadeState === "in"
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-2 scale-95"
                  }`}
                  title={`View top MBA colleges in ${currentCity.name}`}
                >
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#061124] stroke-[2.5] shrink-0" />
                  <span>{currentCity.name}</span>
                </Link>
              </span>
            </h1>

            {/* Lede paragraph */}
            <p className="mt-5 text-base sm:text-lg text-[#475569] max-w-xl leading-relaxed font-normal">
              Compare verified placement averages, 2-year course fees, entrance cut-offs, and ROI break-even analysis with 1-on-1 mentorship by Mohit Jain.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-7 flex items-center gap-2 bg-white p-2 rounded-full border-[1.5px] border-[#061124]/15 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.2)] max-w-xl transition-all focus-within:border-[#2563EB] focus-within:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.3)]"
            >
              <div className="pl-3.5 text-[#475569]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search colleges in ${currentCity.name}, fees, CAT cutoffs…`}
                className="w-full bg-transparent px-3 py-2.5 outline-none font-body text-sm sm:text-base text-[#061124] placeholder-[#475569]/70 min-w-0 font-medium"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#061124] hover:bg-[#2563EB] text-white font-display font-extrabold text-sm transition-all shrink-0 cursor-pointer shadow-sm hover:-translate-y-0.5"
              >
                Search
              </button>
            </form>

            {/* Popular City & Category Quick Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#475569] mr-1">
                Top Hubs:
              </span>
              {CITIES.slice(0, 6).map((city, idx) => (
                <Link
                  key={city.name}
                  href={city.href}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all hover:-translate-y-0.5 ${
                    cityIndex === idx
                      ? "bg-[#061124] text-white shadow-sm"
                      : "bg-white text-[#061124] hover:bg-[#2563EB] hover:text-white border border-[#061124]/10"
                  }`}
                >
                  {city.name}
                </Link>
              ))}
              <Link
                href="/mba-application-form-discount"
                className="px-3 py-1 rounded-full bg-[#F59E0B]/15 text-[#B45309] hover:bg-[#F59E0B] hover:text-[#061124] border border-[#F59E0B]/30 font-bold text-xs transition-all hover:-translate-y-0.5"
              >
                Form Discounts
              </Link>
            </div>

            {/* 4 Counter Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-9 max-w-xl">
              <div className="rounded-[18px] bg-white border-[1.5px] border-[#061124]/10 p-3.5 sm:p-4 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:-translate-y-1.5 transition-transform">
                <b className="block font-display font-black text-2xl sm:text-3xl text-[#2563EB] leading-none">
                  770+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#475569] mt-1.5">
                  Colleges
                </span>
              </div>

              <div className="rounded-[18px] bg-white border-[1.5px] border-[#061124]/10 p-3.5 sm:p-4 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:-translate-y-1.5 transition-transform">
                <b className="block font-display font-black text-2xl sm:text-3xl text-[#E11D48] leading-none">
                  26+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#475569] mt-1.5">
                  Exams
                </span>
              </div>

              <div className="rounded-[18px] bg-white border-[1.5px] border-[#061124]/10 p-3.5 sm:p-4 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:-translate-y-1.5 transition-transform">
                <b className="block font-display font-black text-2xl sm:text-3xl text-[#10B981] leading-none">
                  50+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#475569] mt-1.5">
                  Mock Tests
                </span>
              </div>

              <div className="rounded-[18px] bg-white border-[1.5px] border-[#061124]/10 p-3.5 sm:p-4 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:-translate-y-1.5 transition-transform">
                <b className="block font-display font-black text-2xl sm:text-3xl text-[#F59E0B] leading-none">
                  5,000+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#475569] mt-1.5">
                  Mentored
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Compare Card */}
          <div className="lg:pl-4">
            <College4SureLiveCompare />
          </div>
        </div>
      </div>
    </section>
  );
}
