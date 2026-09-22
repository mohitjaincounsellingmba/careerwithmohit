"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  IndianRupee,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Percent
} from "lucide-react";

export function InteractiveRoiCalculator() {
  const [totalFee, setTotalFee] = useState<number>(1200000); // 12 Lakhs
  const [expectedSalary, setExpectedSalary] = useState<number>(1400000); // 14 Lakhs
  const [currentSalary, setCurrentSalary] = useState<number>(350000); // 3.5 Lakhs

  // Calculations
  const salaryHike = Math.max(0, expectedSalary - currentSalary);
  const salaryHikePercent = currentSalary > 0 ? Math.round((salaryHike / currentSalary) * 100) : 100;
  
  // Payback period in months: (totalFee / salaryHike) * 12
  const paybackMonths = salaryHike > 0 ? Math.round((totalFee / salaryHike) * 12) : 24;
  
  // 3-Year Total Incremental Earnings: (salaryHike * 3) - totalFee
  const netThreeYearReturn = Math.max(0, (salaryHike * 3) - totalFee);
  const threeYearRoiPercent = totalFee > 0 ? Math.round(((salaryHike * 3) / totalFee) * 100) : 0;

  // Format currency in Indian Lakhs
  const formatLakhs = (val: number) => {
    return `₹${(val / 100000).toFixed(1)} L`;
  };

  return (
    <section className="bg-gradient-to-b from-slate-900 via-[#0A1A32] to-slate-950 text-white py-16 sm:py-24 px-6 sm:px-12 border-b border-blue-900/40 relative overflow-hidden content-auto">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Live Interactive Financial Predictor
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              MBA Return on Investment <span className="text-amber-300">(ROI) &amp; Payback</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg font-normal text-blue-100/80">
              Test different tuition fees vs. expected placement packages to calculate your exact breakeven timeline and 3-year net wealth multiplier.
            </p>
          </div>
          <Link
            href="/colleges?budget=under-10l"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-950/20 whitespace-nowrap self-start md:self-auto"
          >
            <span>Explore High-ROI Colleges (&lt; ₹10L Fee)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Sliders Input Panel */}
          <div className="lg:col-span-7 rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-400" />
                <span>Adjust Parameters</span>
              </h3>

              {/* Slider 1: Total 2-Year Tuition Fee */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-300">Total 2-Year College Tuition Fee:</span>
                  <span className="font-mono text-base font-bold text-amber-300 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                    {formatLakhs(totalFee)}
                  </span>
                </div>
                <input
                  type="range"
                  min={300000}
                  max={3000000}
                  step={50000}
                  value={totalFee}
                  onChange={(e) => setTotalFee(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>₹3 Lakhs (Budget/Online)</span>
                  <span>₹15 Lakhs (Tier-2)</span>
                  <span>₹30 Lakhs (IIM/XLRI)</span>
                </div>
              </div>

              {/* Slider 2: Expected Target Post-MBA CTC */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-300">Expected Starting CTC (Avg Package):</span>
                  <span className="font-mono text-base font-bold text-emerald-400 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                    {formatLakhs(expectedSalary)}
                  </span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={3500000}
                  step={50000}
                  value={expectedSalary}
                  onChange={(e) => setExpectedSalary(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>₹5 Lakhs</span>
                  <span>₹16 Lakhs</span>
                  <span>₹35 Lakhs</span>
                </div>
              </div>

              {/* Slider 3: Current / Pre-MBA CTC */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-300">Current Salary / Fresher Baseline:</span>
                  <span className="font-mono text-base font-bold text-cyan-300 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                    {currentSalary === 0 ? "₹0 (Fresher)" : formatLakhs(currentSalary)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1500000}
                  step={50000}
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>₹0 (Fresher)</span>
                  <span>₹6 Lakhs</span>
                  <span>₹15 Lakhs</span>
                </div>
              </div>
            </div>

            {/* Quick Context Summary Pill */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Annual Salary Delta:
              </span>
              <strong className="font-bold text-white font-mono text-sm">
                +{formatLakhs(salaryHike)} / Year (+{salaryHikePercent}%)
              </strong>
            </div>
          </div>

          {/* Results Visual Output Card */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-slate-900/60 border border-blue-400/30 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between shadow-xl shadow-blue-950/50">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Calculated Financial Metrics
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30">
                  {paybackMonths <= 18 ? "Excellent ROI 🚀" : paybackMonths <= 30 ? "Healthy ROI 👍" : "Long Payback ⏳"}
                </span>
              </div>

              {/* Big Stat: Payback Time */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                  <span className="text-xs text-blue-200/80 font-medium block mb-1">Payback Period</span>
                  <div className="font-display text-3xl sm:text-4xl font-black text-amber-300">
                    {paybackMonths} <span className="text-base font-bold text-white">Months</span>
                  </div>
                  <span className="text-[10px] text-slate-300 mt-1 block">Breakeven timeline</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                  <span className="text-xs text-blue-200/80 font-medium block mb-1">3-Year ROI Ratio</span>
                  <div className="font-display text-3xl sm:text-4xl font-black text-emerald-400">
                    {threeYearRoiPercent}%
                  </div>
                  <span className="text-[10px] text-slate-300 mt-1 block">Return on investment</span>
                </div>
              </div>

              {/* Secondary Stats */}
              <div className="space-y-3 mb-6 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-slate-300">3-Year Net Wealth Gain:</span>
                  <span className="font-mono font-bold text-white text-base">+{formatLakhs(netThreeYearReturn)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-slate-300">Investment Payback Multiplier:</span>
                  <span className="font-mono font-bold text-cyan-300">{(expectedSalary / totalFee).toFixed(2)}x CTC/Fee</span>
                </div>
              </div>
            </div>

            {/* CTA action */}
            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20my%20MBA%20budget%20is%20${encodeURIComponent(formatLakhs(totalFee))}%20and%20I%20am%20targeting%20${encodeURIComponent(formatLakhs(expectedSalary))}%20package.%20Please%20suggest%20best%20B-Schools.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm text-center flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/30"
              >
                <span>💬 Evaluate My B-School ROI on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/book-session"
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center transition-all"
              >
                Schedule Free Video Counselling
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
