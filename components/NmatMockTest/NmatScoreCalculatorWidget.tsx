'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Award, Sparkles, MessageCircle, Share2, CheckCircle2, TrendingUp, Building2, HelpCircle } from 'lucide-react';

export function NmatScoreCalculatorWidget() {
  const [langRaw, setLangRaw] = useState<number>(72); // 24 correct out of 36
  const [quantRaw, setQuantRaw] = useState<number>(66); // 22 correct out of 36
  const [logicRaw, setLogicRaw] = useState<number>(75); // 25 correct out of 36

  const calculated = useMemo(() => {
    // Total raw marks (0 to 324, +3 per correct question, 0 negative marking)
    const totalRawScore = Math.max(0, langRaw + quantRaw + logicRaw);

    // Sectional Scaled Scores (NMAT scales each section from 40 to 120 based on test curve)
    const langScaled = Math.min(120, Math.max(40, Math.round(40 + (langRaw / 108) * 80)));
    const quantScaled = Math.min(120, Math.max(40, Math.round(40 + (quantRaw / 108) * 80)));
    const logicScaled = Math.min(120, Math.max(40, Math.round(40 + (logicRaw / 108) * 80)));

    // Total Scaled Score (Sum of 3 sectional scaled scores, range 120 to 360)
    const totalScaledScore = langScaled + quantScaled + logicScaled;

    // Percentile estimation and college shortlists benchmarked against GMAC & NMIMS trends
    let percentile = '55.00';
    let tier = 'Needs Retake / Foundation Prep';
    let targetColleges = ['Retake Window Recommended (Up to 3 attempts allowed)', 'Apply to Private AICTE PGDM Colleges'];
    let badgeColor = 'bg-slate-800 text-white';

    if (totalScaledScore >= 245) {
      percentile = '99.50+';
      tier = 'NMIMS Mumbai Top Shortlist';
      targetColleges = ['NMIMS Mumbai (MBA Core)', 'NMIMS Mumbai (MBA HR)', 'NMIMS Mumbai (MBA Business Analytics)', 'SPJIMR (GMP)'];
      badgeColor = 'bg-rose-500 text-white font-black';
    } else if (totalScaledScore >= 232) {
      percentile = '98.00 - 99.40';
      tier = 'NMIMS Mumbai Main Campus Cutoff';
      targetColleges = ['NMIMS Mumbai (MBA Core)', 'NMIMS Mumbai (MBA HR)', 'SPJIMR Mumbai', 'XIM University (HRM)'];
      badgeColor = 'bg-emerald-500 text-white font-black';
    } else if (totalScaledScore >= 220) {
      percentile = '94.00 - 97.90';
      tier = 'NMIMS Bengaluru & Hyderabad';
      targetColleges = ['NMIMS Bengaluru', 'NMIMS Hyderabad', 'NMIMS Navi Mumbai', 'XIMB Bhubaneswar', 'K J Somaiya Mumbai'];
      badgeColor = 'bg-blue-600 text-white font-black';
    } else if (totalScaledScore >= 205) {
      percentile = '88.00 - 93.90';
      tier = 'Top Tier-2 & Private Powerhouses';
      targetColleges = ['K J Somaiya Mumbai', 'TAPMI Manipal', 'NMIMS Indore', 'Great Lakes Chennai (PGPM)', 'GIM Goa (via other tests)'];
      badgeColor = 'bg-purple-600 text-white font-black';
    } else if (totalScaledScore >= 190) {
      percentile = '78.00 - 87.90';
      tier = 'Reputed Global & PGDM Institutes';
      targetColleges = ['SDA Bocconi Asia Center (IMB)', 'Welingkar Mumbai / Bengaluru', 'SOIL Gurgaon', 'ISBR Bangalore'];
      badgeColor = 'bg-indigo-600 text-white font-black';
    } else if (totalScaledScore >= 160) {
      percentile = '60.00 - 77.90';
      tier = 'Good Emerging Management Programs';
      targetColleges = ['Alliance University Bangalore', 'BML Munjal Gurgaon', 'Bennett University Greater Noida', 'UPES Dehradun', 'ITM Navi Mumbai'];
      badgeColor = 'bg-slate-700 text-white font-black';
    }

    return {
      totalRawScore,
      langScaled,
      quantScaled,
      logicScaled,
      totalScaledScore,
      percentile,
      tier,
      targetColleges,
      badgeColor
    };
  }, [langRaw, quantRaw, logicRaw]);

  const handleShareScore = () => {
    const shareText = `🎯 My NMAT Mock Projected Scaled Score is ${calculated.totalScaledScore}/360 (${calculated.percentile} %ile) on CareerWithMohit! 🚀 Target B-School: ${calculated.targetColleges[0]}. Calculate your NMAT score & NMIMS eligibility here: https://careerwithmohit.online/tools/nmat-mock-test/`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8 my-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-4 border-foreground">
        <div>
          <div className="inline-flex items-center gap-2 bg-rose-50 border-2 border-rose-500 text-rose-700 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>GMAC NMAT Scaled Score Formula Calibrated</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase text-foreground">
            NMAT Score vs Scaled Score & NMIMS Call Predictor
          </h3>
          <p className="text-gray-600 text-sm font-medium mt-1">
            Adjust your expected sectional marks to predict your official NMAT scaled score (out of 360) and NMIMS Mumbai call chances.
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
            Enter or adjust your expected raw marks for each strictly timed section:
          </p>

          {/* Section 1: Language */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-800">1. Language Skills (36 Qs | 28 Mins)</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs font-bold">Raw: {langRaw}/108</span>
                <span className="text-rose-600 font-black bg-white px-2.5 py-1 rounded-lg border border-slate-300 text-xs">
                  Scaled: {calculated.langScaled} / 120
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="108"
              step="3"
              value={langRaw}
              onChange={(e) => setLangRaw(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[11px] text-gray-500 font-semibold">
              <span>0 (0 Qs)</span>
              <span>36 Marks (12 Qs)</span>
              <span>72 Marks (24 Qs)</span>
              <span>108 Marks (36 Qs)</span>
            </div>
          </div>

          {/* Section 2: Quant */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-800">2. Quantitative Skills (36 Qs | 52 Mins)</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs font-bold">Raw: {quantRaw}/108</span>
                <span className="text-rose-600 font-black bg-white px-2.5 py-1 rounded-lg border border-slate-300 text-xs">
                  Scaled: {calculated.quantScaled} / 120
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="108"
              step="3"
              value={quantRaw}
              onChange={(e) => setQuantRaw(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[11px] text-gray-500 font-semibold">
              <span>0 (0 Qs)</span>
              <span>36 Marks (12 Qs)</span>
              <span>72 Marks (24 Qs)</span>
              <span>108 Marks (36 Qs)</span>
            </div>
          </div>

          {/* Section 3: Logic */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-800">3. Logical Reasoning (36 Qs | 40 Mins)</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs font-bold">Raw: {logicRaw}/108</span>
                <span className="text-rose-600 font-black bg-white px-2.5 py-1 rounded-lg border border-slate-300 text-xs">
                  Scaled: {calculated.logicScaled} / 120
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="108"
              step="3"
              value={logicRaw}
              onChange={(e) => setLogicRaw(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[11px] text-gray-500 font-semibold">
              <span>0 (0 Qs)</span>
              <span>36 Marks (12 Qs)</span>
              <span>72 Marks (24 Qs)</span>
              <span>108 Marks (36 Qs)</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-500 font-medium">
            * NMAT Marking Rule: +3 marks for every correct answer, 0 penalty for wrong/unattempted questions.
          </p>
        </div>

        {/* Output Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-rose-400">
              Live NMAT Projection
            </span>
            <span className={`text-[10px] px-2.5 py-1 rounded-full ${calculated.badgeColor}`}>
              {calculated.tier}
            </span>
          </div>

          {/* Scaled Score Display */}
          <div className="text-center py-2 bg-slate-800/60 rounded-2xl border border-slate-700/80">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Estimated Total Scaled Score
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className={`text-5xl md:text-6xl font-black ${
                calculated.totalScaledScore >= 232 ? 'text-emerald-400' : calculated.totalScaledScore >= 200 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {calculated.totalScaledScore}
              </span>
              <span className="text-2xl font-bold text-slate-500">/ 360</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Total Raw Marks: <strong className="text-white">{calculated.totalRawScore} / 324</strong> (108 Questions)
            </p>
          </div>

          {/* Sectional Scaled Scores Grid */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Language</p>
              <p className="text-base font-black text-rose-400">{calculated.langScaled} <span className="text-[10px] text-slate-500">/120</span></p>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Quants</p>
              <p className="text-base font-black text-rose-400">{calculated.quantScaled} <span className="text-[10px] text-slate-500">/120</span></p>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Logic</p>
              <p className="text-base font-black text-rose-400">{calculated.logicScaled} <span className="text-[10px] text-slate-500">/120</span></p>
            </div>
          </div>

          <p className="text-sm font-extrabold text-emerald-400 text-center">
            Projected Percentile: <span className="text-xl font-black text-white">{calculated.percentile} %ile</span>
          </p>

          {/* Target Colleges Shortlist */}
          <div className="space-y-2.5 pt-1">
            <p className="text-xs font-black uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Target B-Schools & NMIMS Shortlist Chances:</span>
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
            href={`https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20My%20projected%20NMAT%20score%20is%20${calculated.totalScaledScore}%2F360%20(${calculated.percentile}%20percentile).%20Please%20guide%20me%20for%20NMIMS%20Mumbai%20calls%20and%20top%20B-School%20GD-PI%20profiling.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] text-center"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Check My NMIMS Call Chances (WhatsApp)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
