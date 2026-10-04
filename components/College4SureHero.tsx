"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Sparkles, ArrowRight, Zap } from "lucide-react";
import { College4SureLiveCompare } from "./College4SureLiveCompare";

const CITIES = [
  { name: "Delhi NCR", symbol: "🏛️", landmark: "India Gate", href: "/mba-admissions-by-region/delhi-ncr" },
  { name: "Pune", symbol: "🏰", landmark: "Shaniwar Wada", href: "/mba-admissions-by-region/pune" },
  { name: "Mumbai", symbol: "🌊", landmark: "Gateway of India", href: "/mba-admissions-by-region/mumbai" },
  { name: "Bangalore", symbol: "💻", landmark: "Silicon Valley", href: "/mba-admissions-by-region/bangalore" },
  { name: "Kolkata", symbol: "🌉", landmark: "Howrah Bridge", href: "/mba-admissions-by-region/kolkata" },
  { name: "Jaipur", symbol: "👑", landmark: "Hawa Mahal", href: "/mba-admissions-by-region/jaipur" },
  { name: "Greater Noida", symbol: "🏎️", landmark: "Buddh Circuit", href: "/colleges?location=Greater+Noida" },
  { name: "Faridabad", symbol: "🏭", landmark: "Surajkund Hub", href: "/colleges?location=Faridabad" },
  { name: "Gurgaon", symbol: "🏙️", landmark: "Cyber Hub", href: "/colleges?location=Gurgaon" },
  { name: "Dehradun", symbol: "🏔️", landmark: "Doon Valley", href: "/colleges?location=Dehradun" },
  { name: "Chandigarh", symbol: "✋", landmark: "The Open Hand", href: "/colleges?location=Chandigarh" },
];

export function College4SureHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [cityIndex, setCityIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.hidden) return;
      setFadeState("out");
      setTimeout(() => {
        setCityIndex((prev) => (prev + 1) % CITIES.length);
        setFadeState("in");
      }, 240);
    }, 3200);

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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F3FF]/60 via-[#F8FAFC] to-[#F1F5F9]/80 text-[#0F1026] pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200/80">
      {/* Soft Ambient Pastel Glows */}
      <span className="blob b1 !opacity-[0.14]" />
      <span className="blob b2 !opacity-[0.12]" />
      <span className="blob b3 !opacity-[0.10]" />

      {/* Subtle Grid Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Text & Search */}
          <div>
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs font-mono text-xs font-bold uppercase tracking-wider mb-6 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-ping" />
              <span>770+ colleges · Verified by IIM &amp; FMS Alumni</span>
            </div>

            {/* Main Display Headline with Landmark Symbol and Holographic City Badge */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[62px] font-black text-[#0F1026] leading-[1.1] tracking-tight">
              Find Top MBA Colleges in<br />
              <span className="inline-block relative min-h-[1.35em] mt-2">
                <Link
                  href={currentCity.href}
                  className={`inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-[#6336EA] via-[#8B5CF6] to-[#EC4899] text-white shadow-lg shadow-purple-600/25 border border-purple-400/30 backdrop-blur-md transition-all duration-300 transform cursor-pointer hover:scale-105 active:scale-95 ${
                    fadeState === "in"
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-2 scale-95"
                  }`}
                  title={`View top MBA colleges in ${currentCity.name} (${currentCity.landmark})`}
                >
                  {/* Landmark Special Symbol */}
                  <span className="text-2xl sm:text-3xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] animate-bounce shrink-0" role="img" aria-label={currentCity.landmark}>
                    {currentCity.symbol}
                  </span>
                  
                  {/* City Name */}
                  <span className="drop-shadow-sm font-black">{currentCity.name}</span>
                  
                  {/* Landmark Tag Badge */}
                  <span className="hidden sm:inline-flex items-center text-[11px] font-mono font-extrabold uppercase tracking-wider bg-black/25 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 text-purple-100">
                    {currentCity.landmark}
                  </span>
                </Link>
              </span>
            </h1>

            {/* Lede paragraph */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              Compare verified placement averages, 2-year course fees, entrance cut-offs, and ROI break-even analysis with 1-on-1 mentorship by Mohit Jain.
            </p>

            {/* Light Elevated Search Bar */}
            <form
              role="search"
              aria-label="Find top MBA colleges and entrance cutoffs"
              onSubmit={handleSearchSubmit}
              className="mt-7 flex items-center gap-2 bg-white p-2 rounded-full border border-slate-200/90 shadow-[0_16px_40px_-10px_rgba(15,23,42,0.12)] max-w-xl transition-all focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10"
            >
              <div className="pl-3.5 text-blue-600">
                <Search className="w-5 h-5" />
              </div>
              <label htmlFor="hero-college-search" className="sr-only">
                Search colleges in India, fees, and CAT cutoffs
              </label>
              <input
                id="hero-college-search"
                type="search"
                aria-label={`Search colleges in ${currentCity.name}, fees, and CAT cutoffs`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search colleges in ${currentCity.name} (${currentCity.landmark}), fees, CAT cutoffs…`}
                className="w-full bg-transparent px-3 py-2.5 outline-none font-body text-sm sm:text-base text-[#0F1026] placeholder-slate-400 min-w-0 font-medium"
              />
              <button
                id="hero-search-submit"
                type="submit"
                aria-label="Submit college search"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-display font-black text-sm transition-all shrink-0 cursor-pointer shadow-md shadow-blue-500/25 hover:scale-105 active:scale-95"
              >
                Search
              </button>
            </form>

            {/* Popular City Quick Chips with Landmark Icons */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 mr-1 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Top Hubs:
              </span>
              {CITIES.slice(0, 7).map((city, idx) => (
                <Link
                  key={city.name}
                  href={city.href}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all hover:-translate-y-0.5 ${
                    cityIndex === idx
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white/90 text-slate-700 hover:text-blue-600 hover:bg-white border border-slate-200/80 shadow-2xs"
                  }`}
                  title={`${city.name} - ${city.landmark}`}
                >
                  <span className="text-sm">{city.symbol}</span>
                  <span>{city.name}</span>
                </Link>
              ))}
              <Link
                href="/mba-application-form-discount/"
                className="px-3 py-1 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100 hover:text-pink-800 border border-pink-200 font-bold text-xs transition-all hover:-translate-y-0.5 shadow-2xs"
              >
                🔥 Form Discounts
              </Link>
            </div>

            {/* 4 Light Elevated Counter Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-9 max-w-xl">
              <div className="rounded-[20px] bg-white/95 backdrop-blur-md border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_8px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all group">
                <b className="block font-display font-black text-2xl sm:text-3xl text-blue-600 leading-none">
                  770+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1.5">
                  Colleges
                </span>
              </div>

              <div className="rounded-[20px] bg-white/95 backdrop-blur-md border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_8px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-pink-300 hover:-translate-y-1 transition-all group">
                <b className="block font-display font-black text-2xl sm:text-3xl text-pink-600 leading-none">
                  26+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1.5">
                  Exams
                </span>
              </div>

              <div className="rounded-[20px] bg-white/95 backdrop-blur-md border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_8px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-emerald-300 hover:-translate-y-1 transition-all group">
                <b className="block font-display font-black text-2xl sm:text-3xl text-emerald-600 leading-none">
                  50+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1.5">
                  Mock Tests
                </span>
              </div>

              <div className="rounded-[20px] bg-white/95 backdrop-blur-md border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_8px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-amber-300 hover:-translate-y-1 transition-all group">
                <b className="block font-display font-black text-2xl sm:text-3xl text-amber-600 leading-none">
                  5,000+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1.5">
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
