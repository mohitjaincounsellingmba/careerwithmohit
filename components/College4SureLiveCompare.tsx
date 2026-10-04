"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Scale } from "lucide-react";

interface ComparePair {
  stream: string;
  collegeA: {
    name: string;
    meta: string;
    placementRate: string;
    placementPct: number;
    highestPackage: string;
    highestPct: number;
    totalFees: string;
    feesPct: number;
    slug: string;
  };
  collegeB: {
    name: string;
    meta: string;
    placementRate: string;
    placementPct: number;
    highestPackage: string;
    highestPct: number;
    totalFees: string;
    feesPct: number;
    slug: string;
  };
}

const COMPARISON_PAIRS: ComparePair[] = [
  {
    stream: "Top Tier MBA",
    collegeA: {
      name: "IIM Ahmedabad (IIMA)",
      meta: "NIRF 1 · Govt · Est. 1961",
      placementRate: "100%",
      placementPct: 100,
      highestPackage: "₹2.20 Crore",
      highestPct: 95,
      totalFees: "₹25.0 Lakhs",
      feesPct: 80,
      slug: "/top-tier-mba-colleges",
    },
    collegeB: {
      name: "IIM Bangalore (IIMB)",
      meta: "NIRF 2 · Govt · Est. 1973",
      placementRate: "100%",
      placementPct: 100,
      highestPackage: "₹1.15 Crore",
      highestPct: 75,
      totalFees: "₹24.5 Lakhs",
      feesPct: 78,
      slug: "/top-tier-mba-colleges",
    },
  },
  {
    stream: "Private B-Schools",
    collegeA: {
      name: "SIBM Pune (Symbiosis)",
      meta: "SNAP 98.5%ile · Est. 1978",
      placementRate: "100%",
      placementPct: 100,
      highestPackage: "₹35.2 LPA",
      highestPct: 65,
      totalFees: "₹24.2 Lakhs",
      feesPct: 75,
      slug: "/colleges",
    },
    collegeB: {
      name: "NMIMS Mumbai (SBM)",
      meta: "NMAT 232+ · Est. 1981",
      placementRate: "100%",
      placementPct: 100,
      highestPackage: "₹67.8 LPA",
      highestPct: 85,
      totalFees: "₹26.5 Lakhs",
      feesPct: 84,
      slug: "/colleges",
    },
  },
  {
    stream: "Delhi NCR Flagship",
    collegeA: {
      name: "FORE School of Management",
      meta: "CAT/XAT 85%ile · South Delhi",
      placementRate: "100%",
      placementPct: 100,
      highestPackage: "₹30.0 LPA",
      highestPct: 60,
      totalFees: "₹18.9 Lakhs",
      feesPct: 58,
      slug: "/colleges",
    },
    collegeB: {
      name: "IMT Ghaziabad (PGDM)",
      meta: "CAT/XAT 90%ile · Delhi NCR",
      placementRate: "100%",
      placementPct: 100,
      highestPackage: "₹65.6 LPA",
      highestPct: 82,
      totalFees: "₹21.5 Lakhs",
      feesPct: 68,
      slug: "/colleges",
    },
  },
  {
    stream: "Engineering (B.Tech)",
    collegeA: {
      name: "IIT Madras - Chennai",
      meta: "NIRF 1 Engg · Est. 1959",
      placementRate: "100%",
      placementPct: 100,
      highestPackage: "₹1.31 Crore",
      highestPct: 90,
      totalFees: "₹11.6 Lakhs",
      feesPct: 35,
      slug: "/colleges",
    },
    collegeB: {
      name: "IIT Delhi - Hauz Khas",
      meta: "NIRF 2 Engg · Est. 1961",
      placementRate: "100%",
      placementPct: 100,
      highestPackage: "₹2.00 Crore",
      highestPct: 94,
      totalFees: "₹8.63 Lakhs",
      feesPct: 28,
      slug: "/colleges",
    },
  },
  {
    stream: "UGC Online Degrees",
    collegeA: {
      name: "Amity University Online",
      meta: "NAAC A+ · WES Canada Valid",
      placementRate: "100% WES",
      placementPct: 100,
      highestPackage: "₹18.0 LPA",
      highestPct: 45,
      totalFees: "₹1.99 Lakhs",
      feesPct: 12,
      slug: "/online-degree-certification/amity-university-online",
    },
    collegeB: {
      name: "Jain University Online",
      meta: "NAAC A++ · FinTech Electives",
      placementRate: "100% Valid",
      placementPct: 100,
      highestPackage: "₹21.5 LPA",
      highestPct: 52,
      totalFees: "₹1.96 Lakhs",
      feesPct: 11,
      slug: "/online-degree-certification/jain-university-online",
    },
  },
];

export function College4SureLiveCompare() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (document.hidden) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % COMPARISON_PAIRS.length);
        setIsTransitioning(false);
      }, 260);
    }, 4800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleSelectStream = (idx: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsTransitioning(false);
    }, 200);
  };

  const current = COMPARISON_PAIRS[currentIndex];

  return (
    <div
      className="relative rounded-[28px] sm:rounded-[36px] bg-white/95 backdrop-blur-xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12)] animate-floaty transition-all hover:shadow-[0_25px_60px_-15px_rgba(99,102,241,0.18)] hover:border-purple-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* College4Sure Signature Marker Badges */}
      <span className="absolute -top-3.5 -left-3.5 z-20 px-3.5 py-1.5 rounded-full bg-[#FFD000] text-[#0F1026] font-mono text-[11px] font-black uppercase tracking-wider shadow-md -rotate-6 animate-wig border border-amber-300">
        ⚡ LIVE RADAR
      </span>
      <span className="absolute -bottom-3 -right-2.5 z-20 px-3.5 py-1.5 rounded-full bg-[#00C49F] text-white font-mono text-[11px] font-black uppercase tracking-wider shadow-md rotate-6 animate-wig border border-emerald-400">
        FREE 1-ON-1 →
      </span>

      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)] animate-pulse" />
          Side by side HUD
        </span>
        <span className="font-mono text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-purple-50 text-[#6336EA] border border-purple-200/80 shadow-2xs">
          {current.stream}
        </span>
      </div>

      {/* College Matchup Box */}
      <div
        className={`transition-opacity duration-300 ${
          isTransitioning ? "opacity-30 scale-[0.98]" : "opacity-100 scale-100"
        }`}
      >
        {/* College VS Row */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3 mb-5">
          <div className="min-w-0">
            <div className="font-display font-extrabold text-sm sm:text-base text-[#0F1026] leading-tight line-clamp-2">
              {current.collegeA.name}
            </div>
            <div className="font-mono text-[10px] text-slate-500 mt-1 line-clamp-1">
              {current.collegeA.meta}
            </div>
          </div>

          {/* Rotating VS Badge with Gradient */}
          <div
            aria-hidden="true"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#6336EA] via-[#8B5CF6] to-[#EC4899] text-white flex items-center justify-center font-display font-black text-xs shadow-md border-2 border-white animate-spinv shrink-0"
          >
            VS
          </div>

          <div className="min-w-0 text-right">
            <div className="font-display font-extrabold text-sm sm:text-base text-[#0F1026] leading-tight line-clamp-2">
              {current.collegeB.name}
            </div>
            <div className="font-mono text-[10px] text-slate-500 mt-1 line-clamp-1">
              {current.collegeB.meta}
            </div>
          </div>
        </div>

        {/* Comparison Bars */}
        <div className="space-y-3.5 mb-5">
          {/* 1. Placement Rate */}
          <div>
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-slate-600 mb-1.5">
              <span className="font-black text-blue-600">{current.collegeA.placementRate}</span>
              <span className="text-[10px] text-slate-400 font-bold">Placement rate</span>
              <span className="font-black text-emerald-600">{current.collegeB.placementRate}</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 flex overflow-hidden gap-0.5 p-0.5 border border-slate-200/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xs transition-all duration-700 ease-out"
                style={{ width: `${current.collegeA.placementPct / 2}%` }}
              />
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 shadow-xs ml-auto transition-all duration-700 ease-out"
                style={{ width: `${current.collegeB.placementPct / 2}%` }}
              />
            </div>
          </div>

          {/* 2. Highest Package */}
          <div>
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-slate-600 mb-1.5">
              <span className="font-black text-blue-600">{current.collegeA.highestPackage}</span>
              <span className="text-[10px] text-slate-400 font-bold">Highest package</span>
              <span className="font-black text-emerald-600">{current.collegeB.highestPackage}</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 flex overflow-hidden gap-0.5 p-0.5 border border-slate-200/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xs transition-all duration-700 ease-out"
                style={{ width: `${current.collegeA.highestPct / 2}%` }}
              />
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 shadow-xs ml-auto transition-all duration-700 ease-out"
                style={{ width: `${current.collegeB.highestPct / 2}%` }}
              />
            </div>
          </div>

          {/* 3. Total Fees */}
          <div>
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-slate-600 mb-1.5">
              <span className="font-black text-blue-600">{current.collegeA.totalFees}</span>
              <span className="text-[10px] text-slate-400 font-bold">Total fees</span>
              <span className="font-black text-emerald-600">{current.collegeB.totalFees}</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 flex overflow-hidden gap-0.5 p-0.5 border border-slate-200/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xs transition-all duration-700 ease-out"
                style={{ width: `${current.collegeA.feesPct / 2}%` }}
              />
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 shadow-xs ml-auto transition-all duration-700 ease-out"
                style={{ width: `${current.collegeB.feesPct / 2}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar with Stream Pips and Compare Link */}
      <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-dashed border-slate-200">
        <Link
          href="/colleges/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-white transition-all py-1.5 px-3.5 rounded-full border border-slate-200 hover:border-transparent bg-slate-100 hover:bg-slate-900 shadow-2xs"
        >
          <span>Compare any two</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Clickable Pips with Accessible Touch Target Area */}
        <div className="flex items-center gap-1">
          {COMPARISON_PAIRS.map((pair, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectStream(idx)}
              aria-label={`Show ${pair.stream} comparison`}
              aria-pressed={idx === currentIndex}
              className="p-1.5 flex items-center justify-center cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span
                className={`h-2 rounded-full transition-all block ${
                  idx === currentIndex
                    ? "w-6 bg-blue-600 shadow-xs"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
