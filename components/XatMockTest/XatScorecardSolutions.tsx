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
  Scale
} from 'lucide-react';
import { XAT_MOCK_TEST_95, XatQuestion } from '@/data/xat_mock_test_95';
import { XatUserAnswers } from './XatExamInterface';
import { GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';

interface XatScorecardSolutionsProps {
  student: GenericStudentInfo;
  answers: XatUserAnswers;
  onReset: () => void;
}

export function XatScorecardSolutions({ student, answers, onReset }: XatScorecardSolutionsProps) {
  const [sectionFilter, setSectionFilter] = useState<'all' | 'valr' | 'dm' | 'qadi' | 'gk'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'correct' | 'incorrect' | 'skipped'>('all');

  // Compute detailed scores: XAT marking (+1 correct, -0.25 wrong for VALR, DM, QADI; +1 correct, 0 wrong for GK)
  const analytics = useMemo(() => {
    let mainScore = 0; // VALR + DM + QADI (75 max)
    let gkScore = 0;   // GK (20 max)
    let totalScore = 0;

    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    const sections: Record<'valr' | 'dm' | 'qadi' | 'gk', {
      total: number;
      attempted: number;
      correct: number;
      incorrect: number;
      skipped: number;
      score: number;
      maxScore: number;
      accuracy: number;
    }> = {
      valr: { total: 26, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, maxScore: 26, accuracy: 0 },
      dm: { total: 21, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, maxScore: 21, accuracy: 0 },
      qadi: { total: 28, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, maxScore: 28, accuracy: 0 },
      gk: { total: 20, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, maxScore: 20, accuracy: 0 }
    };

    XAT_MOCK_TEST_95.forEach(q => {
      const sec = q.section;
      const userAns = answers[q.id];
      const isAttempted = userAns !== undefined;

      if (!isAttempted) {
        skippedCount++;
        sections[sec].skipped++;
      } else {
        sections[sec].attempted++;
        const isCorrect = Number(userAns) === Number(q.correctAnswer);

        if (isCorrect) {
          correctCount++;
          sections[sec].correct++;
          sections[sec].score += 1;
          if (sec === 'gk') gkScore += 1;
          else mainScore += 1;
        } else {
          incorrectCount++;
          sections[sec].incorrect++;
          if (sec !== 'gk') {
            sections[sec].score -= 0.25;
            mainScore -= 0.25;
          }
        }
      }
    });

    // Accuracy and rounding
    (['valr', 'dm', 'qadi', 'gk'] as const).forEach(secKey => {
      const s = sections[secKey];
      s.accuracy = s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0;
      s.score = Math.round(s.score * 100) / 100;
    });

    mainScore = Math.round(mainScore * 100) / 100;
    totalScore = Math.round((mainScore + gkScore) * 100) / 100;

    const totalAttempted = correctCount + incorrectCount;
    const overallAccuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

    // Projected Percentile based on Main Score (out of 75)
    let overallPercentile = '75.0';
    if (mainScore >= 38) overallPercentile = '99.5';
    else if (mainScore >= 35) overallPercentile = '98.0';
    else if (mainScore >= 32) overallPercentile = '95.0';
    else if (mainScore >= 28) overallPercentile = '90.0';
    else if (mainScore >= 24) overallPercentile = '85.0';
    else if (mainScore >= 20) overallPercentile = '78.0';
    else if (mainScore >= 16) overallPercentile = '68.0';
    else overallPercentile = '50.0';

    return {
      mainScore,
      gkScore,
      totalScore,
      correctCount,
      incorrectCount,
      skippedCount,
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
            source: 'XAT 95-Question Official CBT Mock Test',
            score: analytics.mainScore,
            gkScore: analytics.gkScore,
            totalScore: analytics.totalScore,
            percentile: analytics.overallPercentile,
            accuracy: analytics.overallAccuracy,
            total_questions: 95,
            targetExam: 'XAT 2026/27',
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
    return XAT_MOCK_TEST_95.filter(q => {
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
      <div className="bg-[#0f291e] text-white rounded-[3rem] p-8 md:p-14 shadow-2xl border-4 border-[#1b4332] relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Trophy className="w-96 h-96 -rotate-12 text-emerald-400" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.25em]">
            <Award className="w-4 h-4" /> Official XAT Performance Scorecard & XLRI Predictor
          </div>

          <div>
            <p className="text-emerald-200/70 text-xs md:text-sm uppercase tracking-widest font-extrabold mb-2">
              XAT Core Score (VALR + DM + QADI)
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className={`text-6xl md:text-8xl font-black tracking-tight ${
                analytics.mainScore >= 35 ? 'text-emerald-400' : analytics.mainScore >= 28 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {analytics.mainScore}
              </span>
              <span className="text-emerald-300/40 text-3xl md:text-5xl font-black">/ 75</span>
            </div>
            <p className="text-xs text-emerald-200/60 font-semibold mt-2">
              General Knowledge Score: <strong className="text-white">{analytics.gkScore} / 20</strong> (Evaluated separately for XLRI interviews)
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
            <div className="bg-[#1b4332]/80 p-4 rounded-2xl border border-emerald-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-emerald-200/70 tracking-wider mb-1">Projected %ile</p>
              <p className="text-2xl md:text-3xl font-black text-emerald-400">{analytics.overallPercentile}%</p>
            </div>
            <div className="bg-[#1b4332]/80 p-4 rounded-2xl border border-emerald-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-emerald-200/70 tracking-wider mb-1">Accuracy Rate</p>
              <p className="text-2xl md:text-3xl font-black text-white">{analytics.overallAccuracy}%</p>
            </div>
            <div className="bg-[#1b4332]/80 p-4 rounded-2xl border border-emerald-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-emerald-200/70 tracking-wider mb-1">Attempted</p>
              <p className="text-2xl md:text-3xl font-black text-white">{analytics.totalAttempted} <span className="text-sm font-normal text-emerald-200/60">/ 95</span></p>
            </div>
            <div className="bg-[#1b4332]/80 p-4 rounded-2xl border border-emerald-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-emerald-200/70 tracking-wider mb-1">Correct / Wrong</p>
              <p className="text-2xl md:text-3xl font-black text-white">
                <span className="text-emerald-400">{analytics.correctCount}</span> : <span className="text-rose-400">{analytics.incorrectCount}</span>
              </p>
            </div>
          </div>

          <p className="text-emerald-100 font-medium text-base md:text-lg max-w-2xl leading-relaxed">
            Candidate <strong className="text-white">{student.name}</strong>, you scored <strong className="text-emerald-400">{analytics.mainScore} Marks</strong> with an estimated <strong className="text-emerald-400">{analytics.overallPercentile} percentile</strong> in this full-length XAT simulation.
          </p>

          {/* Social Share & Action Buttons */}
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                const text = `I scored ${analytics.mainScore}/75 (${analytics.overallPercentile}%ile) in the XAT Official Mock Test on CareerWithMohit! 🎯 Check your XLRI call chances here: https://careerwithmohit.online/tools/mock-test/xat/`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" /> Share on WhatsApp
            </button>
            <button
              onClick={() => {
                const url = `https://careerwithmohit.online/tools/mock-test/xat/`;
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
              }}
              className="bg-[#0077B5] hover:bg-[#006097] text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#0077B5]/20 transition-all active:scale-95"
            >
              <Linkedin className="w-4 h-4 fill-white" /> Share on LinkedIn
            </button>
            <button
              onClick={() => window.print()}
              className="bg-[#1b4332] hover:bg-[#2d6a4f] text-emerald-100 border border-emerald-700/60 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-md transition-all active:scale-95"
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
            <Target className="w-6 h-6 text-emerald-600" /> Section-by-Section Score Analysis
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(['valr', 'dm', 'qadi', 'gk'] as const).map((secKey) => {
            const data = analytics.sections[secKey];
            const meta = {
              valr: { title: 'Section I: VALR', sub: 'Reading, Critical & Verbal Logic', maxMarks: 26 },
              dm: { title: 'Section II: DM', sub: 'Ethical & Business Decision Making', maxMarks: 21 },
              qadi: { title: 'Section III: QA & DI', sub: 'Quantitative & Data Interpretation', maxMarks: 28 },
              gk: { title: 'Section IV: GK', sub: 'Static GK & Current Affairs', maxMarks: 20 }
            }[secKey];

            return (
              <div 
                key={secKey} 
                className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div>
                    <span className="bg-slate-900 text-white px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-widest">
                      {meta.title}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-800 mt-2">{meta.sub}</h4>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-3xl font-black text-slate-900">{data.score}</span>
                    <span className="text-slate-400 font-bold text-sm">/ {meta.maxMarks} M</span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>Proficiency</span>
                      <span>{Math.max(0, Math.round((data.score / meta.maxMarks) * 100))}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(0, Math.min(100, Math.round((data.score / meta.maxMarks) * 100)))}%` }}
                      />
                    </div>
                  </div>

                  {/* Section Stats Grid */}
                  <div className="grid grid-cols-3 gap-1.5 pt-2 text-center text-xs">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Correct</p>
                      <p className="font-black text-emerald-600 text-xs mt-0.5">{data.correct}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Wrong</p>
                      <p className="font-black text-rose-600 text-xs mt-0.5">{data.incorrect}</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Skip</p>
                      <p className="font-black text-slate-600 text-xs mt-0.5">{data.skipped}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Acc: <strong className="text-slate-800">{data.accuracy}%</strong></span>
                  <span>Att: <strong className="text-slate-800">{data.attempted}/{data.total}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. XLRI JAMSHEDPUR & TOP B-SCHOOL CALL PREDICTOR */}
      <div className="bg-[#0f291e] text-white rounded-3xl p-8 border-4 border-[#1b4332] shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/30">
            <GraduationCap className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight text-white">XLRI & Top XAT B-School Cutoff Predictor</h4>
            <p className="text-xs text-emerald-200/70 font-semibold">Based on your {analytics.mainScore}/75 XAT core performance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-[#1b4332]/80 p-5 rounded-2xl border border-emerald-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">XLRI Jamshedpur (BM)</span>
            <p className="text-sm font-bold text-white leading-snug">Business Management (BM Flagship)</p>
            <p className="text-xs font-semibold text-emerald-200/70 pt-1">
              Cutoff: 35+ Marks (95+%ile) • {analytics.mainScore >= 35 ? '✅ High Call Probability' : '⚠️ Target 35+ for XLRI BM'}
            </p>
          </div>

          <div className="bg-[#1b4332]/80 p-5 rounded-2xl border border-emerald-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">XLRI Jamshedpur (HRM)</span>
            <p className="text-sm font-bold text-white leading-snug">Human Resource Management (HRM)</p>
            <p className="text-xs font-semibold text-emerald-200/70 pt-1">
              Cutoff: 33+ Marks (93+%ile) • {analytics.mainScore >= 33 ? '✅ High Call Probability' : '👍 Accessible Target'}
            </p>
          </div>

          <div className="bg-[#1b4332]/80 p-5 rounded-2xl border border-emerald-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">SPJIMR & XIMB</span>
            <p className="text-sm font-bold text-white leading-snug">SPJIMR Mumbai & XIMB Bhubaneswar</p>
            <p className="text-xs font-semibold text-emerald-200/70 pt-1">
              Cutoff: 30 - 32+ Marks (90-92%ile) • {analytics.mainScore >= 30 ? '✅ High Call Probability' : '👍 Moderate Chances'}
            </p>
          </div>

          <div className="bg-[#1b4332]/80 p-5 rounded-2xl border border-emerald-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-teal-300">IMT, GIM & TAPMI</span>
            <p className="text-sm font-bold text-white leading-snug">IMT Ghaziabad, GIM Goa, TAPMI Manipal</p>
            <p className="text-xs font-semibold text-emerald-200/70 pt-1">
              Cutoff: 25 - 28+ Marks (85-88%ile) • {analytics.mainScore >= 25 ? '✅ High Call Probability' : '👍 Strong Candidate'}
            </p>
          </div>
        </div>
      </div>

      {/* 4. COMPREHENSIVE STEP-BY-STEP SOLUTION BROWSER */}
      <div className="bg-white rounded-3xl p-6 md:p-12 border-2 border-slate-200 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-slate-100">
          <div>
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-emerald-600" /> Complete Question Solutions & Explanations
            </h3>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              Detailed step-by-step logic, caselet analysis, and mathematical solutions for all 95 questions
            </p>
          </div>

          {/* Section Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'valr', 'dm', 'qadi', 'gk'] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => setSectionFilter(sec)}
                className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                  sectionFilter === sec
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sec === 'all' ? 'All Sections (95)' : sec.toUpperCase()}
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
            { key: 'all', label: `All (${XAT_MOCK_TEST_95.length})` },
            { key: 'correct', label: `Correct (${analytics.correctCount})` },
            { key: 'incorrect', label: `Incorrect (${analytics.incorrectCount})` },
            { key: 'skipped', label: `Skipped (${analytics.skippedCount})` }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key as any)}
              className={`px-3.5 py-1.5 rounded-lg font-bold text-xs uppercase transition-all ${
                statusFilter === item.key
                  ? 'bg-emerald-600 text-white font-black shadow-sm'
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

                  {/* Status Badge */}
                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct (+1.00 Mark)
                      </span>
                    ) : isAttempted ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 font-black text-xs uppercase tracking-wider">
                        <XCircle className="w-4 h-4 text-rose-600" /> Incorrect ({q.section === 'gk' ? '0 Penalty' : '-0.25 Penalty'})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider">
                        <MinusCircle className="w-4 h-4 text-slate-500" /> Skipped (0 Marks)
                      </span>
                    )}
                  </div>
                </div>

                {/* Context (Passage / Scenario / Table) */}
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
                            <tr className="bg-slate-800 text-white font-bold">
                              {q.dataTable.headers.map((h, i) => (
                                <th key={i} className="py-2 px-3 border-r border-slate-700 last:border-r-0">{h}</th>
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

                {/* 5-Choice MCQ Options Display */}
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
                <div className="bg-emerald-50/60 rounded-2xl border-2 border-emerald-200/80 p-5 md:p-6 space-y-2 text-xs md:text-sm text-slate-800">
                  <div className="flex items-center gap-2 text-emerald-900 font-extrabold uppercase text-xs tracking-wider">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Step-by-Step Detailed Explanation</span>
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
          <span>Retake XAT Mock Test</span>
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span>Save Full Detailed Solutions (PDF)</span>
        </button>
      </div>
    </div>
  );
}
