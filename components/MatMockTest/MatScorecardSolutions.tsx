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
  Building2
} from 'lucide-react';
import { MAT_MOCK_TEST_150, MatQuestion } from '@/data/mat_mock_test_150';
import { MatUserAnswers, MatSectionKey, MAT_SECTIONS } from './MatExamInterface';
import { GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';

interface MatScorecardSolutionsProps {
  student: GenericStudentInfo;
  answers: MatUserAnswers;
  onReset: () => void;
  matCycle?: string;
}

export function MatScorecardSolutions({ student, answers, onReset, matCycle = 'Sept / Dec / Feb / May MAT' }: MatScorecardSolutionsProps) {
  const [sectionFilter, setSectionFilter] = useState<'all' | MatSectionKey>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'correct' | 'incorrect' | 'skipped'>('all');

  const analytics = useMemo(() => {
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalSkipped = 0;

    const sections: Record<MatSectionKey, {
      total: number;
      attempted: number;
      correct: number;
      incorrect: number;
      skipped: number;
      score: number;
      accuracy: number;
    }> = {
      'language': { total: 30, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, accuracy: 0 },
      'intelligence': { total: 30, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, accuracy: 0 },
      'data-analysis': { total: 30, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, accuracy: 0 },
      'math-skills': { total: 30, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, accuracy: 0 },
      'economic-environment': { total: 30, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, accuracy: 0 }
    };

    MAT_MOCK_TEST_150.forEach(q => {
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

    // Score calculations (+1 for correct, -0.25 for incorrect)
    MAT_SECTIONS.forEach(s => {
      const secData = sections[s.id];
      secData.score = Math.max(0, Number((secData.correct * 1.0 - secData.incorrect * 0.25).toFixed(2)));
      secData.accuracy = secData.attempted > 0 ? Math.round((secData.correct / secData.attempted) * 100) : 0;
    });

    const totalRawScore = Number((totalCorrect * 1.0 - totalIncorrect * 0.25).toFixed(2));
    const totalScore = Math.max(0, totalRawScore);
    const totalAttempted = totalCorrect + totalIncorrect;
    const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    // MAT Composite Score Estimation (Scale 199 to 801)
    const compositeScore = Math.min(800, Math.max(200, Math.round(200 + (totalScore / 150) * 600)));

    // Percentile estimation benchmarked against historical AIMA MAT data
    let percentile = '60.0';
    if (totalScore >= 115) percentile = '99.50';
    else if (totalScore >= 105) percentile = '98.20';
    else if (totalScore >= 95) percentile = '95.00';
    else if (totalScore >= 85) percentile = '90.00';
    else if (totalScore >= 75) percentile = '85.00';
    else if (totalScore >= 65) percentile = '78.00';
    else if (totalScore >= 55) percentile = '70.00';
    else if (totalScore >= 45) percentile = '58.00';
    else percentile = '42.00';

    return {
      totalScore,
      compositeScore,
      totalCorrect,
      totalIncorrect,
      totalSkipped,
      totalAttempted,
      overallAccuracy,
      percentile,
      sections
    };
  }, [answers]);

  // Lead synchronization
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
            source: `MAT Exam Mock Test (${matCycle})`,
            score: analytics.totalScore,
            compositeScore: analytics.compositeScore,
            percentile: analytics.percentile,
            accuracy: analytics.overallAccuracy,
            total_questions: 150,
            targetExam: 'MAT 2026/2027',
            timestamp: new Date().toISOString()
          })
        });
      } catch (err) {
        console.error('Lead sync error:', err);
      }
    };
    syncResults();
  }, [student, analytics, matCycle]);

  // Filtered list for solution browser
  const filteredQuestions = useMemo(() => {
    return MAT_MOCK_TEST_150.filter(q => {
      if (sectionFilter !== 'all' && q.section !== sectionFilter) return false;

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
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Trophy className="w-96 h-96 -rotate-12 text-amber-400" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.25em]">
            <Award className="w-4 h-4" /> Official MAT Scorecard & B-School Matcher ({matCycle})
          </div>

          <div>
            <p className="text-slate-400 text-xs md:text-sm uppercase tracking-widest font-extrabold mb-2">
              MAT Scaled Composite Score & Raw Marks
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className={`text-6xl md:text-8xl font-black tracking-tight ${
                analytics.compositeScore >= 600 ? 'text-amber-400' : analytics.compositeScore >= 500 ? 'text-indigo-400' : 'text-emerald-400'
              }`}>
                {analytics.compositeScore}
              </span>
              <span className="text-slate-600 text-3xl md:text-5xl font-black">/ 800</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold mt-2">
              Raw Score: <strong className="text-white">{analytics.totalScore} / 150.00</strong> (+1.00 Correct, −0.25 Wrong)
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Projected %ile</p>
              <p className="text-2xl md:text-3xl font-black text-amber-400">{analytics.percentile}%</p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Accuracy Rate</p>
              <p className="text-2xl md:text-3xl font-black text-emerald-400">{analytics.overallAccuracy}%</p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Attempted</p>
              <p className="text-2xl md:text-3xl font-black text-white">{analytics.totalAttempted} <span className="text-sm font-normal text-slate-400">/ 150</span></p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Correct / Wrong</p>
              <p className="text-2xl md:text-3xl font-black text-white">
                <span className="text-emerald-400">{analytics.totalCorrect}</span> : <span className="text-rose-400">{analytics.totalIncorrect}</span>
              </p>
            </div>
          </div>

          <p className="text-slate-300 font-medium text-base md:text-lg max-w-2xl leading-relaxed">
            Candidate <strong className="text-white">{student.name}</strong>, your estimated composite score of <strong className="text-amber-400">{analytics.compositeScore}/800</strong> translates to an estimated <strong className="text-emerald-400">{analytics.percentile} percentile</strong> for MAT admissions.
          </p>

          {/* Social Share & Action Buttons */}
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                const text = `I scored ${analytics.compositeScore}/800 (${analytics.percentile}%ile) in the MAT Mock Test (${matCycle}) on CareerWithMohit! 🎯 Check your top MBA cutoff eligibility: https://careerwithmohit.online/tools/mock-test/mat/`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" /> Share on WhatsApp
            </button>
            <button
              onClick={() => {
                const url = `https://careerwithmohit.online/tools/mock-test/mat/`;
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

      {/* 2. 5-SECTION SCORECARDS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-600" /> 5 Sectional Scorecards (30 Marks Each)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MAT_SECTIONS.map((sec) => {
            const data = analytics.sections[sec.id];

            return (
              <div 
                key={sec.id} 
                className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div>
                    <span className="bg-slate-900 text-white px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-widest">
                      {sec.label}
                    </span>
                    <p className="text-xs text-slate-500 font-bold mt-2">Section Range: {sec.qRange}</p>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-4xl font-black text-slate-900">{data.score}</span>
                    <span className="text-slate-400 font-bold text-lg">/ 30.00</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500">
                      <span>Proficiency</span>
                      <span>{Math.round((data.score / 30) * 100)}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(0, Math.min(100, Math.round((data.score / 30) * 100)))}%` }}
                      />
                    </div>
                  </div>

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
                  <span>Attempted: <strong className="text-slate-800">{data.attempted}/30</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. TOP B-SCHOOL CUTOFF MATCHING */}
      <div className="bg-[#0f172a] text-white rounded-3xl p-8 border-4 border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/30">
            <Building2 className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight text-white">Top MBA Institutes Accepting MAT Scores</h4>
            <p className="text-xs text-slate-400 font-semibold">Based on your {analytics.compositeScore}/800 composite score ({analytics.percentile}%ile)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">PUMBA / Welingkar</span>
            <p className="text-sm font-bold text-white leading-snug">Welingkar Mumbai & PUMBA Pune</p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              Target: 650+ Composite (95+%ile) • {analytics.compositeScore >= 650 ? '✅ High Admission Chance' : '⚠️ Requires 650+ Score'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">BIMTECH / XIME</span>
            <p className="text-sm font-bold text-white leading-snug">BIMTECH Greater Noida & XIME Bangalore</p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              Target: 600+ Composite (90+%ile) • {analytics.compositeScore >= 600 ? '✅ Strong Eligibility' : '👍 Accessible Target'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">JIMS / Jaipuria</span>
            <p className="text-sm font-bold text-white leading-snug">JIMS Kalkaji, Jaipuria Noida/Jaipur, SIES</p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              Target: 550+ Composite (85+%ile) • {analytics.compositeScore >= 550 ? '✅ Safe Direct Call' : '👍 Good Target'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Alliance / ITM / NDIM</span>
            <p className="text-sm font-bold text-white leading-snug">Alliance Bangalore, ITM Navi Mumbai, NDIM</p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              Target: 500+ Composite (75+%ile) • {analytics.compositeScore >= 500 ? '✅ Eligible for Admission' : '🚀 Accessible'}
            </p>
          </div>
        </div>
      </div>

      {/* 4. COMPREHENSIVE STEP-BY-STEP SOLUTION BROWSER */}
      <div className="bg-white rounded-3xl p-6 md:p-12 border-2 border-slate-200 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-slate-100">
          <div>
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-amber-600" /> Complete Question Solutions & Detailed Explanations
            </h3>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              Step-by-step mathematical proofs, logical deduction steps, and GK/business facts for all 150 questions
            </p>
          </div>

          {/* Section Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSectionFilter('all')}
              className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                sectionFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Sections (150)
            </button>
            {MAT_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSectionFilter(sec.id)}
                className={`px-3.5 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                  sectionFilter === sec.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sec.short}
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
            { key: 'all', label: `All (${MAT_MOCK_TEST_150.length})` },
            { key: 'correct', label: `Correct (${analytics.totalCorrect})` },
            { key: 'incorrect', label: `Incorrect (${analytics.totalIncorrect})` },
            { key: 'skipped', label: `Skipped (${analytics.totalSkipped})` }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key as any)}
              className={`px-3.5 py-1.5 rounded-lg font-bold text-xs uppercase transition-all ${
                statusFilter === item.key
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
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
                      {q.sectionName}
                    </span>
                    {q.topic && (
                      <span className="text-xs text-slate-400 font-medium italic hidden sm:inline">
                        • {q.topic}
                      </span>
                    )}
                  </div>

                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct (+1.00)
                      </span>
                    ) : isAttempted ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 font-black text-xs uppercase tracking-wider">
                        <XCircle className="w-4 h-4 text-rose-600" /> Incorrect (−0.25)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider">
                        <MinusCircle className="w-4 h-4 text-slate-500" /> Skipped (0.00)
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

                {/* 4-Choice Options Display */}
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
                <div className="bg-amber-50/60 rounded-2xl border-2 border-amber-200/80 p-5 md:p-6 space-y-2 text-xs md:text-sm text-slate-800">
                  <div className="flex items-center gap-2 text-amber-950 font-extrabold uppercase text-xs tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-600" />
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
          <span>Retake MAT Mock Test ({matCycle})</span>
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span>Save Full Detailed Solutions (PDF)</span>
        </button>
      </div>
    </div>
  );
}
