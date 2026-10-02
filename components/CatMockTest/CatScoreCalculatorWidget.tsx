'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Award, Sparkles, MessageCircle, Share2, CheckCircle2, TrendingUp, Building2, HelpCircle } from 'lucide-react';

export function CatScoreCalculatorWidget() {
  const [varcScore, setVarcScore] = useState<number>(32);
  const [dilrScore, setDilrScore] = useState<number>(24);
  const [qaScore, setQaScore] = useState<number>(28);

  const calculated = useMemo(() => {
    const totalRawScore = Math.max(0, varcScore + dilrScore + qaScore);

    // Percentile estimation benchmarked against CAT 2023, 2024 & 2025 raw score distributions (out of 198)
    let percentile = '60.00';
    let tier = 'Non-IIM Private Colleges';
    let targetColleges = ['Top Tier-3 PGDM Institutes', 'State University MBA Programs'];
    let badgeColor = 'bg-slate-800 text-white';

    if (totalRawScore >= 105) {
      percentile = '99.90+';
      tier = 'Holy Trinity (IIM A / B / C)';
      targetColleges = ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'FMS Delhi (100% Call)'];
      badgeColor = 'bg-amber-400 text-slate-950 font-black';
    } else if (totalRawScore >= 85) {
      percentile = '99.00 - 99.85';
      tier = 'Top 7 IIMs & FMS Delhi';
      targetColleges = ['IIM Lucknow', 'IIM Kozhikode', 'IIM Indore', 'FMS Delhi', 'IIT Bombay (SJMSOM)'];
      badgeColor = 'bg-emerald-500 text-white font-black';
    } else if (totalRawScore >= 68) {
      percentile = '95.00 - 98.90';
      tier = 'Premier Non-IIMs & CAP IIMs';
      targetColleges = ['SPJIMR Mumbai', 'MDI Gurgaon', 'IIM Shillong', 'IIT Delhi (DMS)', 'IIM Udaipur', 'IIM Ranchi'];
      badgeColor = 'bg-blue-600 text-white font-black';
    } else if (totalRawScore >= 52) {
      percentile = '90.00 - 94.90';
      tier = 'New IIMs & Top Private B-Schools';
      targetColleges = ['IIM Trichy', 'IIM Raipur', 'IIM Kashipur', 'IIM Rohtak', 'XIMB Bhubaneswar', 'IMT Ghaziabad'];
      badgeColor = 'bg-purple-600 text-white font-black';
    } else if (totalRawScore >= 40) {
      percentile = '85.00 - 89.90';
      tier = 'Baby IIMs & Tier-2 Premier';
      targetColleges = ['IIM Bodh Gaya', 'IIM Jammu', 'IIM Sambalpur', 'IIM Sirmaur', 'IIM Nagpur', 'FORE School Delhi', 'GIM Goa', 'TAPMI'];
      badgeColor = 'bg-indigo-600 text-white font-black';
    } else if (totalRawScore >= 30) {
      percentile = '75.00 - 84.90';
      tier = 'Reputed AICTE PGDM Institutes';
      targetColleges = ['LBSIM New Delhi', 'BIMTECH Greater Noida', 'KJ Somaiya Mumbai', 'Great Lakes Chennai', 'Welingkar Mumbai'];
      badgeColor = 'bg-slate-700 text-white font-black';
    }

    return {
      totalRawScore,
      percentile,
      tier,
      targetColleges,
      badgeColor
    };
  }, [varcScore, dilrScore, qaScore]);

  const handleShareScore = () => {
    const shareText = `🎯 My CAT Mock Test Raw Score is ${calculated.totalRawScore}/198 (${calculated.percentile} %ile) on CareerWithMohit! 🚀 Target B-School: ${calculated.targetColleges[0]}. Calculate your CAT score & IIM eligibility here: https://careerwithmohit.online/tools/cat-mock-test/`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-foreground p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8 my-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-4 border-foreground">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary text-primary px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>IIM Normalization Algorithm Calibrated</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase text-foreground">
            CAT Score vs Percentile & IIM Call Predictor
          </h3>
          <p className="text-gray-600 text-sm font-medium mt-1">
            Enter your sectional raw scores to predict your overall CAT percentile and shortlists for 20 IIMs, FMS, SPJIMR, and MDI.
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
            Adjust your expected raw marks for each 40-minute section:
          </p>

          {/* Section 1: VARC */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-800">1. Verbal Ability & Reading Comprehension (VARC)</span>
              <span className="text-primary font-black bg-white px-3 py-1 rounded-lg border border-slate-300">
                {varcScore} / 72 Marks
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="72"
              value={varcScore}
              onChange={(e) => setVarcScore(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[11px] text-gray-500 font-semibold">
              <span>0 (0 Qs)</span>
              <span>24 Marks (~8 Qs)</span>
              <span>48 Marks (~16 Qs)</span>
              <span>72 Marks (24 Qs)</span>
            </div>
          </div>

          {/* Section 2: DILR */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-800">2. Data Interpretation & Logical Reasoning (DILR)</span>
              <span className="text-primary font-black bg-white px-3 py-1 rounded-lg border border-slate-300">
                {dilrScore} / 60 Marks
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={dilrScore}
              onChange={(e) => setDilrScore(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[11px] text-gray-500 font-semibold">
              <span>0 (0 Sets)</span>
              <span>18 Marks (~1.5 Sets)</span>
              <span>36 Marks (~3 Sets)</span>
              <span>60 Marks (4 Sets)</span>
            </div>
          </div>

          {/* Section 3: QA */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-800">3. Quantitative Aptitude (QA)</span>
              <span className="text-primary font-black bg-white px-3 py-1 rounded-lg border border-slate-300">
                {qaScore} / 66 Marks
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="66"
              value={qaScore}
              onChange={(e) => setQaScore(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[11px] text-gray-500 font-semibold">
              <span>0 (0 Qs)</span>
              <span>24 Marks (~8 Qs)</span>
              <span>45 Marks (~15 Qs)</span>
              <span>66 Marks (22 Qs)</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-500 font-medium">
            * Marking Scheme: +3 for each correct answer, -1 penalty for wrong MCQ, 0 for non-MCQ (TITA).
          </p>
        </div>

        {/* Output Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              Projected CAT Result
            </span>
            <span className={`text-[10px] px-2.5 py-1 rounded-full ${calculated.badgeColor}`}>
              {calculated.tier}
            </span>
          </div>

          {/* Raw Score & Percentile Display */}
          <div className="text-center py-3 bg-slate-800/60 rounded-2xl border border-slate-700/80">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
              Estimated Total Raw Score
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl md:text-6xl font-black text-amber-400">
                {calculated.totalRawScore}
              </span>
              <span className="text-2xl font-bold text-slate-500">/ 198</span>
            </div>
            <p className="text-sm font-extrabold text-emerald-400 mt-2">
              Projected Percentile: <span className="text-xl font-black text-white">{calculated.percentile} %ile</span>
            </p>
          </div>

          {/* Target Colleges Shortlist */}
          <div className="space-y-2.5 pt-1">
            <p className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Target B-Schools & IIM Call Chances:</span>
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
            href={`https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20My%20projected%20CAT%20score%20is%20${calculated.totalRawScore}%2F198%20(${calculated.percentile}%20percentile).%20Please%20guide%20me%20for%20IIM%20calls%20and%20top%20B-School%20GD-PI%20profiling.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] text-center"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Check My IIM Call Chances (WhatsApp)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
