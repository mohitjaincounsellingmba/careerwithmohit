"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Sparkles, ArrowRight, Zap } from "lucide-react";
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
    <section className="relative overflow-hidden bg-[#070A14] text-white pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-white/10">
      {/* Floating Ambient Glowing Blobs with Gen Z Dopamine Colors */}
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />

      {/* Subtle Cyber Grid Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Text & Search */}
          <div>
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-[0_0_20px_rgba(0,255,136,0.2)] font-mono text-xs font-bold uppercase tracking-wider mb-6 text-[#00FF88]">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_10px_#00FF88] animate-ping" />
              <span>770+ colleges · Verified by IIM &amp; FMS Alumni</span>
            </div>

            {/* Main Display Headline with Gen Z Holographic Neon Gradient Badge */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[62px] font-black text-white leading-[1.1] tracking-tight">
              Find Top MBA Colleges in<br />
              <span className="inline-block relative min-h-[1.3em] mt-2">
                <Link
                  href={currentCity.href}
                  className={`inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 rounded-2xl bg-gradient-to-r from-[#FF007A] via-[#8B5CF6] to-[#00F0FF] text-white shadow-[0_0_35px_rgba(255,0,122,0.45)] border border-white/30 backdrop-blur-md transition-all duration-300 transform cursor-pointer hover:scale-105 active:scale-95 ${
                    fadeState === "in"
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-2 scale-95"
                  }`}
                  title={`View top MBA colleges in ${currentCity.name}`}
                >
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white stroke-[2.5] shrink-0 animate-bounce" />
                  <span className="drop-shadow-md">{currentCity.name}</span>
                </Link>
              </span>
            </h1>

            {/* Lede paragraph */}
            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              Compare verified placement averages, 2-year course fees, entrance cut-offs, and ROI break-even analysis with 1-on-1 mentorship by Mohit Jain.
            </p>

            {/* Gen Z Cyber Glass Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-7 flex items-center gap-2 bg-white/[0.08] backdrop-blur-2xl p-2 rounded-full border border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] max-w-xl transition-all focus-within:border-[#00F0FF] focus-within:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
            >
              <div className="pl-3.5 text-cyan-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search colleges in ${currentCity.name}, fees, CAT cutoffs…`}
                className="w-full bg-transparent px-3 py-2.5 outline-none font-body text-sm sm:text-base text-white placeholder-slate-400 min-w-0 font-medium"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#6366F1] to-[#FF007A] text-white font-display font-black text-sm transition-all shrink-0 cursor-pointer shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 hover:opacity-95"
              >
                Search
              </button>
            </form>

            {/* Popular City & Category Quick Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 mr-1 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                Top Hubs:
              </span>
              {CITIES.slice(0, 6).map((city, idx) => (
                <Link
                  key={city.name}
                  href={city.href}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all hover:-translate-y-0.5 ${
                    cityIndex === idx
                      ? "bg-gradient-to-r from-[#00F0FF] to-[#6366F1] text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                      : "bg-white/[0.07] backdrop-blur-md text-slate-200 hover:text-white hover:bg-white/[0.15] border border-white/10 hover:border-cyan-400/50"
                  }`}
                >
                  {city.name}
                </Link>
              ))}
              <Link
                href="/mba-application-form-discount"
                className="px-3 py-1 rounded-full bg-[#FF007A]/20 text-[#FF5E9A] hover:bg-[#FF007A] hover:text-white border border-[#FF007A]/40 font-bold text-xs transition-all hover:-translate-y-0.5 shadow-[0_0_12px_rgba(255,0,122,0.25)]"
              >
                🔥 Form Discounts
              </Link>
            </div>

            {/* 4 Counter Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-9 max-w-xl">
              <div className="rounded-[18px] bg-white/[0.06] backdrop-blur-xl border border-white/10 p-3.5 sm:p-4 shadow-lg hover:border-cyan-400/40 hover:-translate-y-1.5 transition-all group">
                <b className="block font-display font-black text-2xl sm:text-3xl text-[#00F0FF] leading-none group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                  770+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1.5">
                  Colleges
                </span>
              </div>

              <div className="rounded-[18px] bg-white/[0.06] backdrop-blur-xl border border-white/10 p-3.5 sm:p-4 shadow-lg hover:border-pink-500/40 hover:-translate-y-1.5 transition-all group">
                <b className="block font-display font-black text-2xl sm:text-3xl text-[#FF007A] leading-none group-hover:drop-shadow-[0_0_10px_rgba(255,0,122,0.8)]">
                  26+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1.5">
                  Exams
                </span>
              </div>

              <div className="rounded-[18px] bg-white/[0.06] backdrop-blur-xl border border-white/10 p-3.5 sm:p-4 shadow-lg hover:border-emerald-400/40 hover:-translate-y-1.5 transition-all group">
                <b className="block font-display font-black text-2xl sm:text-3xl text-[#00FF88] leading-none group-hover:drop-shadow-[0_0_10px_rgba(0,255,136,0.8)]">
                  50+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1.5">
                  Mock Tests
                </span>
              </div>

              <div className="rounded-[18px] bg-white/[0.06] backdrop-blur-xl border border-white/10 p-3.5 sm:p-4 shadow-lg hover:border-yellow-400/40 hover:-translate-y-1.5 transition-all group">
                <b className="block font-display font-black text-2xl sm:text-3xl text-[#FFD600] leading-none group-hover:drop-shadow-[0_0_10px_rgba(255,214,0,0.8)]">
                  5,000+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1.5">
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
