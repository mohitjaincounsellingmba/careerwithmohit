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
    <section className="bg-[#F8FAFC] text-[#0F1026] py-16 sm:py-24 px-6 sm:px-12 border-b border-slate-200/80 relative overflow-hidden content-auto">
      {/* Soft Ambient background glows */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between border-b border-slate-200/80 pb-8 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Live Interactive Financial Predictor
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#0F1026] leading-tight">
              MBA Return on Investment <span className="text-blue-600">(ROI) &amp; Payback</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg font-normal text-slate-600">
              Test different tuition fees vs. expected placement packages to calculate your exact breakeven timeline and 3-year net wealth multiplier.
            </p>
          </div>
          <Link
            href="/colleges?budget=under-10l"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 whitespace-nowrap self-start md:self-auto"
          >
            <span>Explore High-ROI Colleges (&lt; ₹10L Fee)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Sliders Input Panel */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-[#0F1026] flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span>Adjust Parameters</span>
              </h3>

              {/* Slider 1: Total 2-Year Tuition Fee */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700">Total 2-Year College Tuition Fee:</span>
                  <span className="font-mono text-base font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200/80">
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
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>₹3 Lakhs (Budget/Online)</span>
                  <span>₹15 Lakhs (Tier-2)</span>
                  <span>₹30 Lakhs (IIM/XLRI)</span>
                </div>
              </div>

              {/* Slider 2: Expected Target Post-MBA CTC */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700">Expected Starting CTC (Avg Package):</span>
                  <span className="font-mono text-base font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200/80">
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
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>₹5 Lakhs</span>
                  <span>₹16 Lakhs</span>
                  <span>₹35 Lakhs</span>
                </div>
              </div>

              {/* Slider 3: Current / Pre-MBA CTC */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700">Current Salary / Fresher Baseline:</span>
                  <span className="font-mono text-base font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg border border-purple-200/80">
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
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>₹0 (Fresher)</span>
                  <span>₹6 Lakhs</span>
                  <span>₹15 Lakhs</span>
                </div>
              </div>
            </div>

            {/* Quick Context Summary Pill */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs text-slate-700">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Annual Salary Delta:
              </span>
              <strong className="font-bold text-[#0F1026] font-mono text-sm">
                +{formatLakhs(salaryHike)} / Year (+{salaryHikePercent}%)
              </strong>
            </div>
          </div>

          {/* Results Visual Output Card */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-blue-50/90 via-indigo-50/60 to-white border-2 border-blue-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-lg shadow-blue-500/5">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-blue-100">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  Calculated Financial Metrics
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                  {paybackMonths <= 18 ? "Excellent ROI 🚀" : paybackMonths <= 30 ? "Healthy ROI 👍" : "Long Payback ⏳"}
                </span>
              </div>

              {/* Big Stat: Payback Time */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs">
                  <span className="text-xs text-slate-500 font-semibold block mb-1">Payback Period</span>
                  <div className="font-display text-3xl sm:text-4xl font-black text-blue-700">
                    {paybackMonths} <span className="text-base font-bold text-slate-600">Months</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium mt-1 block">Breakeven timeline</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs">
                  <span className="text-xs text-slate-500 font-semibold block mb-1">3-Year ROI Ratio</span>
                  <div className="font-display text-3xl sm:text-4xl font-black text-emerald-600">
                    {threeYearRoiPercent}%
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium mt-1 block">Return on investment</span>
                </div>
              </div>

              {/* Secondary Stats */}
              <div className="space-y-3 mb-6 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-2 border-b border-blue-100/80">
                  <span className="text-slate-600 font-medium">3-Year Net Wealth Gain:</span>
                  <span className="font-mono font-bold text-[#0F1026] text-base">+{formatLakhs(netThreeYearReturn)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-100/80">
                  <span className="text-slate-600 font-medium">Investment Payback Multiplier:</span>
                  <span className="font-mono font-bold text-blue-700">{(expectedSalary / totalFee).toFixed(2)}x CTC/Fee</span>
                </div>
              </div>
            </div>

            {/* CTA action */}
            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20my%20MBA%20budget%20is%20${encodeURIComponent(formatLakhs(totalFee))}%20and%20I%20am%20targeting%20${encodeURIComponent(formatLakhs(expectedSalary))}%20package.%20Please%20suggest%20best%20B-Schools.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm text-center flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
              >
                <span>💬 Evaluate My B-School ROI on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/book-session/"
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold text-center transition-all"
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
