'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Trophy, 
  Target, 
  Zap, 
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
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { CAT_MOCK_TEST_68, CatQuestion } from '@/data/cat_mock_test_68';
import { UserAnswers } from './CatExamInterface';
import { GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';

interface CatScorecardSolutionsProps {
  student: GenericStudentInfo;
  answers: UserAnswers;
  onReset: () => void;
}

export function checkIsAnswerCorrect(userAns: any, q: CatQuestion): boolean {
  if (userAns === undefined || userAns === null || userAns === '') return false;
  if (q.type === 'mcq') {
    return Number(userAns) === Number(q.correctAnswer);
  } else {
    const cleanUser = String(userAns).trim().toLowerCase().replace(/\s+/g, '').replace(/,/g, '');
    const cleanCorrect = String(q.correctAnswer).trim().toLowerCase().replace(/\s+/g, '').replace(/,/g, '');
    if (cleanUser === cleanCorrect) return true;
    const numUser = parseFloat(cleanUser);
    const numCorrect = parseFloat(cleanCorrect);
    if (!isNaN(numUser) && !isNaN(numCorrect) && numUser === numCorrect) return true;
    if (q.id === 43 && (cleanUser === '3' || cleanUser === '4')) return true;
    return false;
  }
}

export function CatScorecardSolutions({ student, answers, onReset }: CatScorecardSolutionsProps) {
  const [sectionFilter, setSectionFilter] = useState<'all' | 'varc' | 'dilr' | 'qa'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'correct' | 'incorrect' | 'skipped'>('all');

  // Compute detailed scores and sectional analytics
  const analytics = useMemo(() => {
    let totalScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    const sections: Record<'varc' | 'dilr' | 'qa', {
      total: number;
      attempted: number;
      correct: number;
      incorrect: number;
      skipped: number;
      score: number;
      maxScore: number;
      accuracy: number;
      percentile: string;
    }> = {
      varc: { total: 24, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, maxScore: 72, accuracy: 0, percentile: '80.0' },
      dilr: { total: 22, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, maxScore: 66, accuracy: 0, percentile: '80.0' },
      qa: { total: 22, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, maxScore: 66, accuracy: 0, percentile: '80.0' }
    };

    CAT_MOCK_TEST_68.forEach(q => {
      const sec = q.section;
      const userAns = answers[q.id];
      const isAttempted = userAns !== undefined && userAns !== '';

      if (!isAttempted) {
        skippedCount++;
        sections[sec].skipped++;
      } else {
        sections[sec].attempted++;
        const isCorrect = checkIsAnswerCorrect(userAns, q);

        if (isCorrect) {
          correctCount++;
          sections[sec].correct++;
          sections[sec].score += 3;
          totalScore += 3;
        } else {
          incorrectCount++;
          sections[sec].incorrect++;
          if (q.type === 'mcq') {
            sections[sec].score -= 1;
            totalScore -= 1;
          }
          // 0 penalty for incorrect TITA
        }
      }
    });

    // Accuracy and Sectional Percentiles
    (['varc', 'dilr', 'qa'] as const).forEach(secKey => {
      const s = sections[secKey];
      s.accuracy = s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0;
      
      // Percentile estimation per section
      if (s.score >= 45) s.percentile = '99.8';
      else if (s.score >= 36) s.percentile = '99.0';
      else if (s.score >= 28) s.percentile = '97.2';
      else if (s.score >= 22) s.percentile = '94.5';
      else if (s.score >= 15) s.percentile = '88.0';
      else if (s.score >= 10) s.percentile = '78.5';
      else s.percentile = '60.0';
    });

    const totalAttempted = correctCount + incorrectCount;
    const overallAccuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

    // Overall CAT Percentile prediction
    let overallPercentile = '75.0';
    if (totalScore >= 115) overallPercentile = '99.9';
    else if (totalScore >= 98) overallPercentile = '99.5';
    else if (totalScore >= 85) overallPercentile = '99.0';
    else if (totalScore >= 72) overallPercentile = '97.5';
    else if (totalScore >= 58) overallPercentile = '95.0';
    else if (totalScore >= 45) overallPercentile = '90.0';
    else if (totalScore >= 32) overallPercentile = '82.0';
    else if (totalScore >= 20) overallPercentile = '70.0';
    else overallPercentile = '55.0';

    return {
      totalScore,
      maxPossibleScore: 204, // 68 * 3
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
            source: 'CAT 68-Question CBT Mock Test',
            score: analytics.totalScore,
            percentile: analytics.overallPercentile,
            accuracy: analytics.overallAccuracy,
            total_questions: 68,
            targetExam: 'CAT 2026',
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
    return CAT_MOCK_TEST_68.filter(q => {
      // Section filter
      if (sectionFilter !== 'all' && q.section !== sectionFilter) return false;

      // Status filter
      const userAns = answers[q.id];
      const isAttempted = userAns !== undefined && userAns !== '';

      if (statusFilter === 'skipped' && isAttempted) return false;
      if (statusFilter === 'all') return true;

      const isCorrect = checkIsAnswerCorrect(userAns, q);
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
          <Trophy className="w-96 h-96 -rotate-12 text-amber-400" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.25em]">
            <Award className="w-4 h-4" /> Official CAT Scorecard & Performance Report
          </div>

          <div>
            <p className="text-slate-400 text-xs md:text-sm uppercase tracking-widest font-extrabold mb-2">
              Total Scaled Marks Achieved
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className={`text-6xl md:text-8xl font-black tracking-tight ${
                analytics.totalScore >= 70 ? 'text-emerald-400' : analytics.totalScore >= 35 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {analytics.totalScore}
              </span>
              <span className="text-slate-500 text-3xl md:text-5xl font-black">/ {analytics.maxPossibleScore}</span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Projected %ile</p>
              <p className="text-2xl md:text-3xl font-black text-amber-400">{analytics.overallPercentile}%</p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Accuracy Rate</p>
              <p className="text-2xl md:text-3xl font-black text-emerald-400">{analytics.overallAccuracy}%</p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Attempted</p>
              <p className="text-2xl md:text-3xl font-black text-white">{analytics.totalAttempted} <span className="text-sm font-normal text-slate-400">/ 68</span></p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Correct / Wrong</p>
              <p className="text-2xl md:text-3xl font-black text-white">
                <span className="text-emerald-400">{analytics.correctCount}</span> : <span className="text-rose-400">{analytics.incorrectCount}</span>
              </p>
            </div>
          </div>

          <p className="text-slate-300 font-medium text-base md:text-lg max-w-2xl leading-relaxed">
            Congratulations, <strong className="text-white">{student.name}</strong>! You achieved an overall score of <strong className="text-amber-400">{analytics.totalScore} marks</strong> with <strong className="text-emerald-400">{analytics.overallPercentile} projected percentile</strong> in this CAT full-length test.
          </p>

          {/* Social Share & Action Buttons */}
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                const text = `I just scored ${analytics.totalScore}/204 (${analytics.overallPercentile}%ile) in the CAT 2026 Full Mock Test on CareerWithMohit! 🎯 Challenge yourself here: https://careerwithmohit.online/tools/cat-mock-test`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" /> Share on WhatsApp
            </button>
            <button
              onClick={() => {
                const url = `https://careerwithmohit.online/tools/cat-mock-test`;
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
              }}
              className="bg-[#0077B5] hover:bg-[#006097] text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#0077B5]/20 transition-all active:scale-95"
            >
              <Linkedin className="w-4 h-4 fill-white" /> Share on LinkedIn
            </button>
            <button
              onClick={() => window.print()}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-md transition-all active:scale-95"
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
            <Target className="w-6 h-6 text-amber-500" /> Section-by-Section Score Analysis
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['varc', 'dilr', 'qa'] as const).map((secKey) => {
            const data = analytics.sections[secKey];
            const meta = {
              varc: { title: 'Section I: VARC', sub: 'Verbal Ability & Reading Comprehension', totalQs: 24, maxMarks: 72 },
              dilr: { title: 'Section II: DILR', sub: 'Data Interpretation & Logical Reasoning', totalQs: 22, maxMarks: 66 },
              qa: { title: 'Section III: QA', sub: 'Quantitative Ability', totalQs: 22, maxMarks: 66 }
            }[secKey];

            return (
              <div 
                key={secKey} 
                className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="bg-slate-900 text-white px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-widest">
                        {meta.title}
                      </span>
                      <h4 className="font-extrabold text-base text-slate-800 mt-2">{meta.sub}</h4>
                    </div>
                    <span className="text-xs font-mono font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      {data.percentile}%ile
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="text-4xl font-black text-slate-900">{data.score}</span>
                    <span className="text-slate-400 font-bold text-lg">/ {meta.maxMarks} Marks</span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500">
                      <span>Proficiency</span>
                      <span>{Math.max(0, Math.round((data.score / meta.maxMarks) * 100))}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(0, Math.min(100, Math.round((data.score / meta.maxMarks) * 100)))}%` }}
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
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Incorrect</p>
                      <p className="font-black text-rose-600 text-sm mt-0.5">{data.incorrect}</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Skipped</p>
                      <p className="font-black text-slate-600 text-sm mt-0.5">{data.skipped}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Accuracy: <strong className="text-slate-800">{data.accuracy}%</strong></span>
                  <span>Attempted: <strong className="text-slate-800">{data.attempted}/{meta.totalQs}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. TARGET IIM CALL PREDICTOR */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border-4 border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/30">
            <GraduationCap className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight text-white">Target Management Institute Call Predictor</h4>
            <p className="text-xs text-slate-400 font-semibold">Based on your {analytics.overallPercentile} projected CAT percentile</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Tier 1: Top IIMs (BLACKI)</span>
            <p className="text-sm font-bold text-white leading-snug">IIM Ahmedabad, Bangalore, Calcutta, Lucknow, Kozhikode, Indore</p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              Required: 99.0+ %ile ({Number(analytics.overallPercentile) >= 99.0 ? '✅ High Probability' : '⚠️ Aim for 95+ marks'})
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Top Non-IIMs</span>
            <p className="text-sm font-bold text-white leading-snug">FMS Delhi, SPJIMR Mumbai, MDI Gurgaon, IIT Bombay (SJMSOM)</p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              Required: 96.0+ %ile ({Number(analytics.overallPercentile) >= 96.0 ? '✅ High Probability' : '⚠️ Practice DILR Sets'})
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">New IIMs (CAP)</span>
            <p className="text-sm font-bold text-white leading-snug">IIM Udaipur, Trichy, Raipur, Ranchi, Kashipur, Rohtak</p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              Required: 92.0+ %ile ({Number(analytics.overallPercentile) >= 92.0 ? '✅ High Probability' : '👍 Moderate Chances'})
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Baby IIMs & Premier</span>
            <p className="text-sm font-bold text-white leading-snug">IIM Nagpur, Visakhapatnam, Bodh Gaya, Jammu, Sirmaur, IMT Ghaziabad</p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              Required: 85.0+ %ile ({Number(analytics.overallPercentile) >= 85.0 ? '✅ High Probability' : '👍 Accessible Target'})
            </p>
          </div>
        </div>
      </div>

      {/* 4. COMPREHENSIVE STEP-BY-STEP SOLUTION BROWSER */}
      <div className="bg-white rounded-3xl p-6 md:p-12 border-2 border-slate-200 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-slate-100">
          <div>
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-amber-500" /> Complete Question Solutions & Answer Key
            </h3>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              Detailed step-by-step mathematical rationale and deductive analysis for all 68 questions
            </p>
          </div>

          {/* Section Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'varc', 'dilr', 'qa'] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => setSectionFilter(sec)}
                className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                  sectionFilter === sec
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sec === 'all' ? 'All Sections (68)' : sec.toUpperCase()}
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
            { key: 'all', label: `All (${CAT_MOCK_TEST_68.length})` },
            { key: 'correct', label: `Correct (${analytics.correctCount})` },
            { key: 'incorrect', label: `Incorrect (${analytics.incorrectCount})` },
            { key: 'skipped', label: `Skipped (${analytics.skippedCount})` }
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
            const isAttempted = userAns !== undefined && userAns !== '';
            const isCorrect = checkIsAnswerCorrect(userAns, q);

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
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700">
                      {q.type.toUpperCase()}
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
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct (+3 Marks)
                      </span>
                    ) : isAttempted ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 font-black text-xs uppercase tracking-wider">
                        <XCircle className="w-4 h-4 text-rose-600" /> Incorrect ({q.type === 'mcq' ? '-1 Mark' : '0 Marks'})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider">
                        <MinusCircle className="w-4 h-4 text-slate-500" /> Skipped (0 Marks)
                      </span>
                    )}
                  </div>
                </div>

                {/* Context (Passage / Scenario / Table if applicable) */}
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

                {/* MCQ Options Display */}
                {q.type === 'mcq' && q.options && (
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
                )}

                {/* TITA Answer Display */}
                {q.type === 'tita' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-slate-200">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Your Answer</p>
                      <p className={`font-mono text-base font-bold mt-1 ${
                        isCorrect ? 'text-emerald-600' : isAttempted ? 'text-rose-600' : 'text-slate-400'
                      }`}>
                        {isAttempted ? String(userAns) : '(Not Answered)'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Official Correct Answer</p>
                      <p className="font-mono text-base font-bold text-emerald-700 mt-1">
                        {String(q.correctAnswer)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Step-by-Step Detailed Solution Box */}
                <div className="bg-amber-50/60 rounded-2xl border-2 border-amber-200/80 p-5 md:p-6 space-y-2 text-xs md:text-sm text-slate-800">
                  <div className="flex items-center gap-2 text-amber-800 font-extrabold uppercase text-xs tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Step-by-Step Explanation & Logic</span>
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
          <span>Retake CAT Mock Test</span>
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
