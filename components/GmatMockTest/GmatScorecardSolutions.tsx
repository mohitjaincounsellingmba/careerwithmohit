'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Trophy, 
  Target, 
  RotateCcw, 
  Download, 
  MessageCircle, 
  Linkedin, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  Award, 
  GraduationCap, 
  BookOpen, 
  Filter,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import { GMAT_MOCK_TEST_64, GmatQuestion } from '@/data/gmat_mock_test_64';
import { GmatUserAnswers } from './GmatExamInterface';
import { GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';

interface GmatScorecardSolutionsProps {
  student: GenericStudentInfo;
  answers: GmatUserAnswers;
  onReset: () => void;
}

export function GmatScorecardSolutions({ student, answers, onReset }: GmatScorecardSolutionsProps) {
  const [sectionFilter, setSectionFilter] = useState<'all' | 'quant' | 'verbal' | 'di'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'correct' | 'incorrect' | 'skipped'>('all');

  // Compute GMAT Focus Edition Scaled Scores (205 to 805 scale)
  const analytics = useMemo(() => {
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalSkipped = 0;

    const sections: Record<'quant' | 'verbal' | 'di', {
      total: number;
      attempted: number;
      correct: number;
      incorrect: number;
      skipped: number;
      scaledScore: number;
      accuracy: number;
    }> = {
      quant: { total: 21, attempted: 0, correct: 0, incorrect: 0, skipped: 0, scaledScore: 60, accuracy: 0 },
      verbal: { total: 23, attempted: 0, correct: 0, incorrect: 0, skipped: 0, scaledScore: 60, accuracy: 0 },
      di: { total: 20, attempted: 0, correct: 0, incorrect: 0, skipped: 0, scaledScore: 60, accuracy: 0 }
    };

    GMAT_MOCK_TEST_64.forEach(q => {
      const sec = q.section;
      const userAns = answers[q.id];
      const isAttempted = userAns !== undefined;

      if (!isAttempted) {
        totalSkipped++;
        sections[sec].skipped++;
      } else {
        sections[sec].attempted++;
        const isCorrect = Number(userAns) === Number(q.correctAnswer);

        if (isCorrect) {
          totalCorrect++;
          sections[sec].correct++;
        } else {
          totalIncorrect++;
          sections[sec].incorrect++;
        }
      }
    });

    // Calculate Section Scaled Scores (60 to 90 in 1-point increments)
    (['quant', 'verbal', 'di'] as const).forEach(secKey => {
      const s = sections[secKey];
      s.accuracy = s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0;
      const rawRatio = s.correct / s.total;
      s.scaledScore = Math.min(90, Math.max(60, Math.round(60 + rawRatio * 30)));
    });

    // Total Scaled Score on GMAT Focus scale (205 to 805, ending in 5)
    const sumSectionScores = sections.quant.scaledScore + sections.verbal.scaledScore + sections.di.scaledScore; // 180 to 270
    const rawTotal = 205 + ((sumSectionScores - 180) / 90) * 600;
    // Round to nearest 10, then adjust to end in 5
    let gmatTotalScore = Math.round(rawTotal / 10) * 10 + 5;
    gmatTotalScore = Math.min(805, Math.max(205, gmatTotalScore));

    const totalAttempted = totalCorrect + totalIncorrect;
    const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    // Projected Percentile
    let overallPercentile = '75.0';
    if (gmatTotalScore >= 735) overallPercentile = '99.9';
    else if (gmatTotalScore >= 705) overallPercentile = '99.0';
    else if (gmatTotalScore >= 685) overallPercentile = '97.0';
    else if (gmatTotalScore >= 665) overallPercentile = '93.0';
    else if (gmatTotalScore >= 645) overallPercentile = '87.0';
    else if (gmatTotalScore >= 615) overallPercentile = '78.0';
    else if (gmatTotalScore >= 585) overallPercentile = '66.0';
    else if (gmatTotalScore >= 555) overallPercentile = '52.0';
    else overallPercentile = '38.0';

    return {
      gmatTotalScore,
      totalCorrect,
      totalIncorrect,
      totalSkipped,
      totalAttempted,
      overallAccuracy,
      overallPercentile,
      sections
    };
  }, [answers]);

  // Sync lead results to backend
  useEffect(() => {
    const syncResults = async () => {
      try {
        await fetch('/api/leads', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: student.name,
            number: student.phone,
            email: student.email,
            location: student.location,
            source: 'GMAT Focus Edition 64-Question CBT Mock Test',
            score: analytics.gmatTotalScore,
            percentile: analytics.overallPercentile,
            accuracy: analytics.overallAccuracy,
            total_questions: 64,
            targetExam: 'GMAT Focus Edition 2026/27',
            timestamp: new Date().toISOString()
          })
        });
      } catch (err) {
        console.error('Lead sync failed:', err);
      }
    };
    syncResults();
  }, [student, analytics]);

  // Filtered list of questions for solution review
  const filteredQuestions = useMemo(() => {
    return GMAT_MOCK_TEST_64.filter(q => {
      // Section filter
      if (sectionFilter !== 'all' && q.section !== sectionFilter) return false;

      // Status filter
      const userAns = answers[q.id];
      const isAttempted = userAns !== undefined;

      if (statusFilter === 'skipped' && isAttempted) return false;
      if (statusFilter === 'all') return true;

      const isCorrect = isAttempted && Number(userAns) === Number(q.correctAnswer);
      if (statusFilter === 'correct' && !isCorrect) return false;
      if (statusFilter === 'incorrect' && (!isAttempted || isCorrect)) return false;

      return true;
    });
  }, [sectionFilter, statusFilter, answers]);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-6xl mx-auto px-4 py-8">
      {/* 1. EXECUTIVE SCORECARD BANNER */}
      <div className="bg-[#0f172a] text-white rounded-[3rem] p-8 md:p-14 shadow-2xl border-4 border-slate-800 relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Trophy className="w-96 h-96 -rotate-12 text-indigo-400" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.25em]">
            <Award className="w-4 h-4" /> Official GMAT Focus Scorecard & Global B-School Matcher
          </div>

          <div>
            <p className="text-slate-400 text-xs md:text-sm uppercase tracking-widest font-extrabold mb-2">
              Total GMAT Focus Edition Scaled Score
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className={`text-6xl md:text-8xl font-black tracking-tight ${
                analytics.gmatTotalScore >= 685 ? 'text-emerald-400' : analytics.gmatTotalScore >= 645 ? 'text-indigo-400' : 'text-amber-400'
              }`}>
                {analytics.gmatTotalScore}
              </span>
              <span className="text-slate-600 text-3xl md:text-5xl font-black">/ 805</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold mt-2">
              Official Scale: <strong className="text-white">205 to 805</strong> (Equal Section Weighting)
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Projected %ile</p>
              <p className="text-2xl md:text-3xl font-black text-indigo-400">{analytics.overallPercentile}%</p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Accuracy Rate</p>
              <p className="text-2xl md:text-3xl font-black text-emerald-400">{analytics.overallAccuracy}%</p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Attempted</p>
              <p className="text-2xl md:text-3xl font-black text-white">{analytics.totalAttempted} <span className="text-sm font-normal text-slate-400">/ 64</span></p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Correct / Wrong</p>
              <p className="text-2xl md:text-3xl font-black text-white">
                <span className="text-emerald-400">{analytics.totalCorrect}</span> : <span className="text-rose-400">{analytics.totalIncorrect}</span>
              </p>
            </div>
          </div>

          <p className="text-slate-300 font-medium text-base md:text-lg max-w-2xl leading-relaxed">
            Candidate <strong className="text-white">{student.name}</strong>, your scaled score of <strong className="text-indigo-400">{analytics.gmatTotalScore}</strong> translates to the <strong className="text-emerald-400">{analytics.overallPercentile} percentile</strong> bracket for ISB Hyderabad, IIMs, and premier global MBA programs.
          </p>

          {/* Social Share & Action Buttons */}
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                const text = `I just scored ${analytics.gmatTotalScore}/805 (${analytics.overallPercentile}%ile) in the GMAT Focus Edition Mock Test on CareerWithMohit! 🎯 Test your ISB/Global MBA readiness here: https://careerwithmohit.online/tools/mock-test/gmat/`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" /> Share on WhatsApp
            </button>
            <button
              onClick={() => {
                const url = `https://careerwithmohit.online/tools/mock-test/gmat/`;
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
              }}
              className="bg-[#0077B5] hover:bg-[#006097] text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#0077B5]/20 transition-all active:scale-95"
            >
              <Linkedin className="w-4 h-4 fill-white" /> Share on LinkedIn
            </button>
            <button
              onClick={() => window.print()}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Download / Print Report
            </button>
          </div>
        </div>
      </div>

      {/* 2. SECTION-WISE BREAKDOWN CARDS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-600" /> Section Scaled Scores (Scale: 60 to 90)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['quant', 'verbal', 'di'] as const).map((secKey) => {
            const data = analytics.sections[secKey];
            const meta = {
              quant: { title: 'Quantitative Reasoning', sub: 'Problem Solving (21 Questions)' },
              verbal: { title: 'Verbal Reasoning', sub: 'RC & Critical Reasoning (23 Questions)' },
              di: { title: 'Data Insights', sub: 'DS, Table, GI, 2SR & MSR (20 Questions)' }
            }[secKey];

            return (
              <div 
                key={secKey} 
                className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div>
                    <span className="bg-slate-900 text-white px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-widest">
                      {meta.title}
                    </span>
                    <h4 className="font-extrabold text-base text-slate-800 mt-2">{meta.sub}</h4>
                  </div>

                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="text-4xl font-black text-slate-900">{data.scaledScore}</span>
                    <span className="text-slate-400 font-bold text-lg">/ 90 Scaled</span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500">
                      <span>Proficiency</span>
                      <span>{Math.round(((data.scaledScore - 60) / 30) * 100)}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(0, Math.min(100, Math.round(((data.scaledScore - 60) / 30) * 100)))}%` }}
                      />
                    </div>
                  </div>

                  {/* Section Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Correct</p>
                      <p className="font-black text-emerald-600 text-sm mt-0.5">{data.correct}</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Wrong</p>
                      <p className="font-black text-rose-600 text-sm mt-0.5">{data.incorrect}</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Skip</p>
                      <p className="font-black text-slate-600 text-sm mt-0.5">{data.skipped}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Accuracy: <strong className="text-slate-800">{data.accuracy}%</strong></span>
                  <span>Attempted: <strong className="text-slate-800">{data.attempted}/{data.total}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. ISB & GLOBAL B-SCHOOL CUTOFF MATCHING */}
      <div className="bg-[#0f172a] text-white rounded-3xl p-8 border-4 border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
            <Globe className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight text-white">Target B-School Admission Benchmarks</h4>
            <p className="text-xs text-slate-400 font-semibold">Based on your {analytics.gmatTotalScore} GMAT Focus Edition Scaled Score</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">ISB Hyderabad & Mohali</span>
            <p className="text-sm font-bold text-white leading-snug">PGP Post Graduate Programme in Management</p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              Target: 665+ Score • {analytics.gmatTotalScore >= 665 ? '✅ High Admission Probability' : '⚠️ Target 665+ for ISB'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">IIM A / B / C (1-Year MBA)</span>
            <p className="text-sm font-bold text-white leading-snug">PGPX / EPGP Executive MBA for Professionals</p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              Target: 685+ Score • {analytics.gmatTotalScore >= 685 ? '✅ Competitive for IIM Executive' : '👍 Accessible Target'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">INSEAD & LBS</span>
            <p className="text-sm font-bold text-white leading-snug">INSEAD France/Singapore, London Business School</p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              Target: 695+ Score • {analytics.gmatTotalScore >= 695 ? '✅ High Competitiveness' : '👍 Moderate Target'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Harvard & Stanford GSB</span>
            <p className="text-sm font-bold text-white leading-snug">Harvard, Stanford, Wharton, MIT Sloan</p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              Target: 715+ Score • {analytics.gmatTotalScore >= 715 ? '✅ Elite Percentile Range' : '🚀 Target 715+ for M7'}
            </p>
          </div>
        </div>
      </div>

      {/* 4. COMPREHENSIVE STEP-BY-STEP SOLUTION BROWSER */}
      <div className="bg-white rounded-3xl p-6 md:p-12 border-2 border-slate-200 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-slate-100">
          <div>
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-600" /> Complete Question Solutions & Detailed Explanations
            </h3>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              Step-by-step mathematical proofs, critical reasoning logic, and data insights analyses for all 64 questions
            </p>
          </div>

          {/* Section Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'quant', 'verbal', 'di'] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => setSectionFilter(sec)}
                className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                  sectionFilter === sec
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sec === 'all' ? 'All Sections (64)' : sec === 'di' ? 'Data Insights' : sec.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-2">
            <Filter className="w-4 h-4" /> Filter Status:
          </span>

          {[
            { key: 'all', label: `All (${GMAT_MOCK_TEST_64.length})` },
            { key: 'correct', label: `Correct (${analytics.totalCorrect})` },
            { key: 'incorrect', label: `Incorrect (${analytics.totalIncorrect})` },
            { key: 'skipped', label: `Skipped (${analytics.totalSkipped})` }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key as any)}
              className={`px-3.5 py-1.5 rounded-lg font-bold text-xs uppercase transition-all ${
                statusFilter === item.key
                  ? 'bg-indigo-600 text-white font-black shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Question Solutions List */}
        <div className="space-y-8">
          {filteredQuestions.map((q) => {
            const userAns = answers[q.id];
            const isAttempted = userAns !== undefined;
            const isCorrect = isAttempted && Number(userAns) === Number(q.correctAnswer);

            return (
              <div 
                key={q.id}
                className={`p-6 md:p-8 rounded-3xl border-2 transition-all space-y-6 ${
                  !isAttempted 
                    ? 'border-slate-200 bg-slate-50/40' 
                    : isCorrect 
                      ? 'border-emerald-200 bg-emerald-50/20' 
                      : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                      {q.questionNumber}
                    </span>
                    <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      {q.sectionName} ({q.subType || 'MCQ'})
                    </span>
                    {q.topic && (
                      <span className="text-xs text-slate-400 font-medium italic hidden sm:inline">
                        • {q.topic}
                      </span>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct
                      </span>
                    ) : isAttempted ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 font-black text-xs uppercase tracking-wider">
                        <XCircle className="w-4 h-4 text-rose-600" /> Incorrect
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider">
                        <MinusCircle className="w-4 h-4 text-slate-500" /> Skipped
                      </span>
                    )}
                  </div>
                </div>

                {/* Context Pane (Passage / Scenario / Table) */}
                {(q.passageText || q.scenarioText || q.dataTable) && (
                  <div className="bg-slate-100/70 p-5 rounded-2xl border border-slate-200 text-xs md:text-sm text-slate-700 space-y-3 leading-relaxed">
                    {q.passageTitle && <p className="font-extrabold text-slate-900 uppercase">{q.passageTitle}</p>}
                    {q.passageText && <p className="whitespace-pre-line">{q.passageText}</p>}
                    {q.scenarioTitle && <p className="font-extrabold text-slate-900 uppercase">{q.scenarioTitle}</p>}
                    {q.scenarioText && <p className="whitespace-pre-line font-medium">{q.scenarioText}</p>}
                    
                    {q.dataTable && (
                      <div className="overflow-x-auto rounded-xl border border-slate-300 bg-white mt-2">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-900 text-white font-bold">
                              {q.dataTable.headers.map((h, i) => (
                                <th key={i} className="py-2 px-3 border-r border-slate-800 last:border-r-0">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 font-mono">
                            {q.dataTable.rows.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="py-2 px-3 border-r border-slate-200 last:border-r-0">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Question Statement */}
                <h4 className="text-base md:text-lg font-bold text-slate-900 leading-snug whitespace-pre-line">
                  {q.questionText}
                </h4>

                {/* 5-Choice Options Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isOptionCorrect = optIdx === Number(q.correctAnswer);
                    const isOptionUserChosen = userAns !== undefined && Number(userAns) === optIdx;

                    let optStyle = 'border-slate-200 bg-white text-slate-700';
                    if (isOptionCorrect) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400/20';
                    } else if (isOptionUserChosen && !isOptionCorrect) {
                      optStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                    }

                    return (
                      <div 
                        key={optIdx} 
                        className={`p-4 rounded-2xl border-2 text-sm flex items-start gap-3 transition-all ${optStyle}`}
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 border ${
                          isOptionCorrect 
                            ? 'bg-emerald-600 text-white border-emerald-600' 
                            : isOptionUserChosen 
                              ? 'bg-rose-600 text-white border-rose-600' 
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="pt-0.5 leading-relaxed">{opt}</span>
                        {isOptionCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 ml-auto shrink-0" />}
                        {isOptionUserChosen && !isOptionCorrect && <XCircle className="w-5 h-5 text-rose-600 ml-auto shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Step-by-Step Explanation Box */}
                <div className="bg-indigo-50/60 rounded-2xl border-2 border-indigo-200/80 p-5 md:p-6 space-y-2 text-xs md:text-sm text-slate-800">
                  <div className="flex items-center gap-2 text-indigo-900 font-extrabold uppercase text-xs tracking-wider">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Step-by-Step Detailed Solution</span>
                  </div>
                  <div className="whitespace-pre-line leading-relaxed font-normal text-slate-700 pt-1">
                    {q.solution}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. FOOTER ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-16">
        <button
          onClick={onReset}
          className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Retake GMAT Focus Mock Test</span>
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span>Save Full Detailed Solutions (PDF)</span>
        </button>
      </div>
    </div>
  );
}
