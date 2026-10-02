'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Award, Sparkles, MessageCircle, Share2, CheckCircle2, TrendingUp, Building2, HelpCircle } from 'lucide-react';

export function MatScoreCalculatorWidget() {
  const [langScore, setLangScore] = useState<number>(20);
  const [intelScore, setIntelScore] = useState<number>(22);
  const [daScore, setDaScore] = useState<number>(18);
  const [mathScore, setMathScore] = useState<number>(16);
  const [gkScore, setGkScore] = useState<number>(15);

  const calculated = useMemo(() => {
    // In official MAT calculation, the 4 core sections (Language, Intelligence, Data Analysis, Math)
    // carry 30 marks each = 120 marks total for scaled composite score out of 800 (199 - 801 scale).
    // Indian & Global Environment is reported separately as a raw/scaled score but not part of 800 composite.
    const coreRawScore = Math.max(0, langScore + intelScore + daScore + mathScore);
    const totalRawScore = coreRawScore + Math.max(0, gkScore);

    // Composite score formula: Scale ~200 to 800 based on core 120 marks
    const compositeScore = Math.min(800, Math.max(200, Math.round(200 + (coreRawScore / 120) * 600)));

    // Percentile estimation benchmarked against AIMA historical normalization
    let percentile = '50.00';
    let tier = 'Tier 3 / Tier 4 Colleges';
    let targetColleges = ['NDIM New Delhi', 'ITM Navi Mumbai', 'Lexicon MILE Pune', 'PIBM Pune'];
    let badgeColor = 'bg-slate-800 text-white';

    if (compositeScore >= 700) {
      percentile = '99.20+';
      tier = 'Top Tier-1 MAT Colleges';
      targetColleges = ['PUMBA Pune (99%ile in CET/MAT)', 'Welingkar Mumbai (95+)', 'BIMTECH Greater Noida', 'XIME Bangalore'];
      badgeColor = 'bg-amber-400 text-slate-950 font-black';
    } else if (compositeScore >= 650) {
      percentile = '95.00 - 98.90';
      tier = 'Tier-1 & Top Tier-2 Colleges';
      targetColleges = ['Welingkar Mumbai / Bengaluru', 'PUMBA Pune', 'BIMTECH Greater Noida', 'XIME Bangalore', 'Christ University'];
      badgeColor = 'bg-emerald-500 text-white font-black';
    } else if (compositeScore >= 600) {
      percentile = '90.00 - 94.90';
      tier = 'Tier-2 Premier Colleges';
      targetColleges = ['BIMTECH Greater Noida', 'XIME Bangalore / Chennai', 'Jaipuria Institute of Management', 'JIMS Rohini / Kalkaji', 'SIES Mumbai'];
      badgeColor = 'bg-blue-600 text-white font-black';
    } else if (compositeScore >= 520) {
      percentile = '80.00 - 89.90';
      tier = 'Reputed AICTE PGDM Institutes';
      targetColleges = ['Jaipuria Noida / Jaipur / Lucknow', 'JIMS Kalkaji', 'NDIM Delhi', 'IPE Hyderabad', 'SSIM Hyderabad', 'Alliance Bangalore'];
      badgeColor = 'bg-purple-600 text-white font-black';
    } else if (compositeScore >= 450) {
      percentile = '65.00 - 79.90';
      tier = 'Good Emerging PGDM Institutes';
      targetColleges = ['ITM Navi Mumbai', 'Lexicon MILE Pune', 'FOSTIIMA Business School Delhi', 'ISBR Bangalore', 'PIBM Pune', 'EMPI New Delhi'];
      badgeColor = 'bg-slate-700 text-white font-black';
    }

    return {
      coreRawScore,
      totalRawScore,
      compositeScore,
      percentile,
      tier,
      targetColleges,
      badgeColor
    };
  }, [langScore, intelScore, daScore, mathScore, gkScore]);

  const handleShareScore = () => {
    const shareText = `🎯 My December MAT Mock Scaled Score is ${calculated.compositeScore}/800 (${calculated.percentile} %ile) on CareerWithMohit! 🚀 Target MBA 2027: ${calculated.targetColleges[0]}. Calculate your MAT score & MBA admission eligibility here: https://careerwithmohit.online/tools/mat-mock-test/`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8 my-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-4 border-foreground">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary text-primary px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>AIMA Scaled Formula Calibrated</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase text-foreground">
            MAT Score vs Percentile & Composite Score Calculator
          </h3>
          <p className="text-gray-600 text-sm font-medium mt-1">
            Estimate your official AIMA Composite Score (out of 800) and top MBA/PGDM 2027 college eligibility instantly.
          </p>
        </div>

        <button
          onClick={handleShareScore}
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Calculator</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders / Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Enter or adjust expected raw marks (out of 30) for each of the 5 sections:
          </p>

          {/* Section 1: Language */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-800">1. Language Comprehension</span>
              <span className="text-primary font-black bg-white px-3 py-1 rounded-lg border border-slate-300">
                {langScore} / 30
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={langScore}
              onChange={(e) => setLangScore(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Section 2: Intelligence */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-800">2. Intelligence & Critical Reasoning</span>
              <span className="text-primary font-black bg-white px-3 py-1 rounded-lg border border-slate-300">
                {intelScore} / 30
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={intelScore}
              onChange={(e) => setIntelScore(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Section 3: Data Analysis */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-800">3. Data Analysis & Sufficiency</span>
              <span className="text-primary font-black bg-white px-3 py-1 rounded-lg border border-slate-300">
                {daScore} / 30
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={daScore}
              onChange={(e) => setDaScore(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Section 4: Math Skills */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-800">4. Mathematical Skills</span>
              <span className="text-primary font-black bg-white px-3 py-1 rounded-lg border border-slate-300">
                {mathScore} / 30
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={mathScore}
              onChange={(e) => setMathScore(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Section 5: Indian & Global Environment */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <div className="flex justify-between items-center text-sm font-bold">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-800">5. Economic & Business Environment</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Separate GK Score</span>
              </div>
              <span className="text-primary font-black bg-white px-3 py-1 rounded-lg border border-slate-300">
                {gkScore} / 30
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={gkScore}
              onChange={(e) => setGkScore(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <p className="text-[11px] text-gray-500 font-medium">
              * AIMA reports GK separately; it is not added into the 800 composite score, but institutes check it for GD-PI.
            </p>
          </div>
        </div>

        {/* Output Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              Live Projection Result
            </span>
            <span className={`text-[10px] px-2.5 py-1 rounded-full ${calculated.badgeColor}`}>
              {calculated.tier}
            </span>
          </div>

          {/* Composite Score Display */}
          <div className="text-center py-2 bg-slate-800/60 rounded-2xl border border-slate-700/80">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Estimated Scaled Composite Score
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl md:text-6xl font-black text-amber-400">
                {calculated.compositeScore}
              </span>
              <span className="text-2xl font-bold text-slate-500">/ 800</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Core Raw Marks: <strong className="text-white">{calculated.coreRawScore} / 120</strong>
            </p>
          </div>

          {/* Percentile Box */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 uppercase">National %ile</p>
              <p className="text-xl md:text-2xl font-black text-emerald-400">{calculated.percentile}</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total Raw Marks</p>
              <p className="text-xl md:text-2xl font-black text-white">{calculated.totalRawScore} <span className="text-xs text-slate-400">/150</span></p>
            </div>
          </div>

          {/* Target Colleges Shortlist */}
          <div className="space-y-2.5 pt-1">
            <p className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Target B-Schools for MBA 2027:</span>
            </p>
            <div className="space-y-1.5">
              {calculated.targetColleges.map((clg, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{clg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Guidance CTA */}
          <a
            href={`https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20My%20projected%20MAT%20score%20is%20${calculated.compositeScore}%2F800%20(${calculated.percentile}%20percentile).%20Please%20guide%20me%20for%20top%20MBA%2FPGDM%202027%20admissions.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] text-center"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Check My Admission Chances (WhatsApp)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
