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
      className="relative rounded-[28px] sm:rounded-[40px] bg-[#0C1222]/95 backdrop-blur-2xl border-[1.5px] border-white/15 p-5 sm:p-7 shadow-[0_30px_70px_-20px_rgba(0,240,255,0.25)] animate-floaty transition-all hover:shadow-[0_35px_80px_-15px_rgba(255,0,122,0.3)] hover:border-white/30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Playful Gen Z Neon Marker Stickers */}
      <span className="absolute -top-3.5 -left-3.5 z-20 px-3.5 py-1.5 rounded-full bg-[#FFD600] text-slate-950 font-mono text-[11px] font-black uppercase tracking-wider shadow-[0_0_20px_rgba(255,214,0,0.6)] -rotate-6 animate-wig border border-black/20">
        ⚡ LIVE RADAR
      </span>
      <span className="absolute -bottom-3 -right-2.5 z-20 px-3.5 py-1.5 rounded-full bg-[#00FF88] text-slate-950 font-mono text-[11px] font-black uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,136,0.6)] rotate-6 animate-wig border border-black/20">
        FREE 1-ON-1 →
      </span>

      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-300 font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
          Side by side HUD
        </span>
        <span className="font-mono text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/[0.08] text-[#00F0FF] border border-[#00F0FF]/30 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
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
            <h4 className="font-display font-extrabold text-sm sm:text-base text-white leading-tight line-clamp-2">
              {current.collegeA.name}
            </h4>
            <div className="font-mono text-[10px] text-slate-400 mt-1 line-clamp-1">
              {current.collegeA.meta}
            </div>
          </div>

          {/* Rotating VS Badge with Holographic Neon Gradient */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#FF007A] to-[#00F0FF] text-white flex items-center justify-center font-display font-black text-xs shadow-[0_0_20px_rgba(255,0,122,0.6)] border-2 border-white/40 animate-spinv shrink-0">
            VS
          </div>

          <div className="min-w-0 text-right">
            <h4 className="font-display font-extrabold text-sm sm:text-base text-white leading-tight line-clamp-2">
              {current.collegeB.name}
            </h4>
            <div className="font-mono text-[10px] text-slate-400 mt-1 line-clamp-1">
              {current.collegeB.meta}
            </div>
          </div>
        </div>

        {/* Comparison Bars */}
        <div className="space-y-3.5 mb-5">
          {/* 1. Placement Rate */}
          <div>
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1.5">
              <span className="font-black text-[#00F0FF]">{current.collegeA.placementRate}</span>
              <span className="text-[10px] text-slate-400 font-medium">Placement rate</span>
              <span className="font-black text-[#00FF88]">{current.collegeB.placementRate}</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 flex overflow-hidden gap-0.5 p-0.5 border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-700 ease-out"
                style={{ width: `${current.collegeA.placementPct / 2}%` }}
              />
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00FF88] to-[#FFD600] shadow-[0_0_10px_rgba(0,255,136,0.5)] ml-auto transition-all duration-700 ease-out"
                style={{ width: `${current.collegeB.placementPct / 2}%` }}
              />
            </div>
          </div>

          {/* 2. Highest Package */}
          <div>
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1.5">
              <span className="font-black text-[#00F0FF]">{current.collegeA.highestPackage}</span>
              <span className="text-[10px] text-slate-400 font-medium">Highest package</span>
              <span className="font-black text-[#00FF88]">{current.collegeB.highestPackage}</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 flex overflow-hidden gap-0.5 p-0.5 border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-700 ease-out"
                style={{ width: `${current.collegeA.highestPct / 2}%` }}
              />
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00FF88] to-[#FFD600] shadow-[0_0_10px_rgba(0,255,136,0.5)] ml-auto transition-all duration-700 ease-out"
                style={{ width: `${current.collegeB.highestPct / 2}%` }}
              />
            </div>
          </div>

          {/* 3. Total Fees */}
          <div>
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1.5">
              <span className="font-black text-[#00F0FF]">{current.collegeA.totalFees}</span>
              <span className="text-[10px] text-slate-400 font-medium">Total fees</span>
              <span className="font-black text-[#00FF88]">{current.collegeB.totalFees}</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 flex overflow-hidden gap-0.5 p-0.5 border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-700 ease-out"
                style={{ width: `${current.collegeA.feesPct / 2}%` }}
              />
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00FF88] to-[#FFD600] shadow-[0_0_10px_rgba(0,255,136,0.5)] ml-auto transition-all duration-700 ease-out"
                style={{ width: `${current.collegeB.feesPct / 2}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar with Stream Pips and Compare Link */}
      <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-dashed border-white/15">
        <Link
          href="/colleges"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white hover:text-slate-950 transition-all py-1.5 px-3.5 rounded-full border border-white/20 hover:border-transparent bg-white/[0.08] hover:bg-gradient-to-r hover:from-[#00F0FF] hover:to-[#00FF88] shadow-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.5)]"
        >
          <span>Compare any two</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Clickable Pips */}
        <div className="flex items-center gap-1.5">
          {COMPARISON_PAIRS.map((pair, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectStream(idx)}
              aria-label={`Show ${pair.stream}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? "w-6 bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
