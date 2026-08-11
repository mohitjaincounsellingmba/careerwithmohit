'use client';

import React, { useState, useMemo } from 'react';
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
  Globe,
  Headphones,
  PenTool,
  Check,
  Share2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCheck
} from 'lucide-react';
import { 
  IELTS_MOCK_TEST_80, 
  IELTS_WRITING_TASKS, 
  IeltsQuestion,
  calculateIeltsListeningBand,
  calculateIeltsReadingBand,
  calculateOverallBand,
  getUniversityEligibility
} from '@/data/ielts_mock_test_80';
import { IeltsUserAnswers } from './IeltsExamInterface';
import { GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';

interface IeltsScorecardSolutionsProps {
  student: GenericStudentInfo;
  answers: IeltsUserAnswers;
  writingAnswers?: Record<string, string>;
  onReset: () => void;
}

export function IeltsScorecardSolutions({ 
  student, 
  answers, 
  writingAnswers = {}, 
  onReset 
}: IeltsScorecardSolutionsProps) {
  const [sectionFilter, setSectionFilter] = useState<'all' | 'listening' | 'reading' | 'writing'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'correct' | 'incorrect' | 'skipped'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);

  // Compute Official IELTS Scores
  const analytics = useMemo(() => {
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalSkipped = 0;

    let listeningCorrect = 0;
    let listeningAttempted = 0;

    let readingCorrect = 0;
    let readingAttempted = 0;

    IELTS_MOCK_TEST_80.forEach(q => {
      const userAns = answers[q.id];
      const isAttempted = userAns !== undefined;

      if (!isAttempted) {
        totalSkipped++;
      } else {
        const isCorrect = Number(userAns) === Number(q.correctAnswer);
        if (isCorrect) {
          totalCorrect++;
          if (q.section === 'listening') listeningCorrect++;
          if (q.section === 'reading') readingCorrect++;
        } else {
          totalIncorrect++;
        }

        if (q.section === 'listening') listeningAttempted++;
        if (q.section === 'reading') readingAttempted++;
      }
    });

    const listeningBand = calculateIeltsListeningBand(listeningCorrect);
    const readingBand = calculateIeltsReadingBand(readingCorrect);
    const overallBand = calculateOverallBand(listeningBand, readingBand);

    const totalAttempted = listeningAttempted + readingAttempted;
    const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    const listeningAccuracy = listeningAttempted > 0 ? Math.round((listeningCorrect / listeningAttempted) * 100) : 0;
    const readingAccuracy = readingAttempted > 0 ? Math.round((readingCorrect / readingAttempted) * 100) : 0;

    // CEFR Level & Descriptor
    let cefrLevel = 'C1 Advanced';
    let descriptor = 'Very Good User: Has fully operational command of the language with only occasional unsystematic inaccuracies.';
    if (overallBand >= 8.5) {
      cefrLevel = 'C2 Mastery / Expert';
      descriptor = 'Expert User: Has fully operational command of the language: appropriate, accurate and fluent with complete understanding.';
    } else if (overallBand >= 7.0) {
      cefrLevel = 'C1 Operational';
      descriptor = 'Good User: Has operational command of the language, though with occasional inaccuracies and misunderstandings in some situations.';
    } else if (overallBand >= 6.0) {
      cefrLevel = 'B2 Competent';
      descriptor = 'Competent User: Has generally effective command of the language despite some inaccuracies and misunderstandings.';
    } else {
      cefrLevel = 'B1 Modest';
      descriptor = 'Modest User: Has partial command of the language, coping with overall meaning in most situations.';
    }

    const eligibleUniversities = getUniversityEligibility(overallBand);

    return {
      totalCorrect,
      totalIncorrect,
      totalSkipped,
      totalAttempted,
      listeningCorrect,
      listeningAttempted,
      listeningAccuracy,
      listeningBand,
      readingCorrect,
      readingAttempted,
      readingAccuracy,
      readingBand,
      overallBand,
      overallAccuracy,
      cefrLevel,
      descriptor,
      eligibleUniversities
    };
  }, [answers]);

  // Filtered Questions for Solution Review
  const filteredQuestions = useMemo(() => {
    return IELTS_MOCK_TEST_80.filter(q => {
      // Section filter
      if (sectionFilter !== 'all' && q.section !== sectionFilter) return false;

      // Status filter
      const userAns = answers[q.id];
      const isAttempted = userAns !== undefined;
      const isCorrect = isAttempted && Number(userAns) === Number(q.correctAnswer);

      if (statusFilter === 'correct' && !isCorrect) return false;
      if (statusFilter === 'incorrect' && (!isAttempted || isCorrect)) return false;
      if (statusFilter === 'skipped' && isAttempted) return false;

      return true;
    });
  }, [answers, sectionFilter, statusFilter]);

  const handleShareWhatsApp = () => {
    const text = `🎯 I scored an official Band ${analytics.overallBand.toFixed(1)} (${analytics.cefrLevel}) in the IELTS Academic Practice Mock on CareerWithMohit!\n\n🎧 Listening: Band ${analytics.listeningBand.toFixed(1)} (${analytics.listeningCorrect}/40)\n📖 Reading: Band ${analytics.readingBand.toFixed(1)} (${analytics.readingCorrect}/40)\n\nTake your free IELTS Mock Test here: https://www.careerwithmohit.online/tools/mock-test/ielts`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = 'https://www.careerwithmohit.online/tools/mock-test/ielts';
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-12">
      
      {/* 1. SCORECARD HERO CARD */}
      <div className="bg-white rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -z-0" />

        <div className="relative z-10 space-y-8">
          
          {/* Top Bar with Candidate & Date */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black shadow-md">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                  Official IELTS Band Report Card
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  {student.name || 'Candidate'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Save / Print PDF</span>
              </button>

              <button
                onClick={onReset}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Exam</span>
              </button>
            </div>
          </div>

          {/* Core Score Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Main Overall Band Score */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(225,29,72,1)] flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">Overall Band Score</span>
              <div className="text-6xl md:text-7xl font-black text-white tracking-tight my-2">
                {analytics.overallBand.toFixed(1)}
              </div>
              <div className="inline-block bg-rose-600 text-white text-xs font-black uppercase px-4 py-1.5 rounded-full shadow">
                CEFR: {analytics.cefrLevel}
              </div>
              <p className="text-[11px] text-slate-300 mt-3 font-medium px-2 leading-snug">
                {analytics.descriptor}
              </p>
            </div>

            {/* Listening Section Band */}
            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-rose-600" />
                    <h3 className="font-black text-base text-slate-900">Listening Module</h3>
                  </div>
                  <span className="text-xs font-extrabold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    Band {analytics.listeningBand.toFixed(1)}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Raw Score:</span>
                    <strong className="text-slate-900 font-bold">{analytics.listeningCorrect} / 40 Marks</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Questions Attempted:</span>
                    <strong className="text-slate-900 font-bold">{analytics.listeningAttempted} / 40</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Section Accuracy:</span>
                    <strong className="text-emerald-700 font-bold">{analytics.listeningAccuracy}%</strong>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-rose-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(analytics.listeningCorrect / 40) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Reading Section Band */}
            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-rose-600" />
                    <h3 className="font-black text-base text-slate-900">Academic Reading</h3>
                  </div>
                  <span className="text-xs font-extrabold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    Band {analytics.readingBand.toFixed(1)}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Raw Score:</span>
                    <strong className="text-slate-900 font-bold">{analytics.readingCorrect} / 40 Marks</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Questions Attempted:</span>
                    <strong className="text-slate-900 font-bold">{analytics.readingAttempted} / 40</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Section Accuracy:</span>
                    <strong className="text-emerald-700 font-bold">{analytics.readingAccuracy}%</strong>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-rose-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(analytics.readingCorrect / 40) * 100}%` }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Social Share Buttons */}
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-600" />
              <span className="text-xs font-extrabold text-rose-950">
                Share your official IELTS Band Score with mentors and study abroad peers:
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share WhatsApp</span>
              </button>
              <button
                onClick={handleShareLinkedIn}
                className="flex-1 sm:flex-none px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow"
              >
                <Linkedin className="w-4 h-4" />
                <span>Share LinkedIn</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. GLOBAL UNIVERSITY ELIGIBILITY MATCHER */}
      <section className="bg-white rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b-2 border-slate-100 gap-2">
          <div>
            <span className="text-xs font-black text-rose-600 uppercase tracking-widest">Study Abroad Readiness</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
              <Globe className="w-7 h-7 text-rose-600" /> Target Universities Based on Your Band {analytics.overallBand.toFixed(1)}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-bold">
            Minimum requirements for 2026/2027 Intakes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analytics.eligibleUniversities.map((uni, idx) => {
            let badgeBg = 'bg-rose-100 text-rose-800 border-rose-300';
            if (uni.status === 'Eligible') badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
            else if (uni.status === 'Competitive') badgeBg = 'bg-sky-100 text-sky-800 border-sky-300';

            return (
              <div key={idx} className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-rose-400 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg">{uni.flag}</span>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
                      {uni.status}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-tight mb-1">{uni.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{uni.country}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Cutoff: <strong>Band {uni.minBand.toFixed(1)}+</strong></span>
                  <span className="text-rose-600 font-bold text-[11px] truncate max-w-[120px]">{uni.featuredCourse}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. WRITING MODULE BENCHMARK & BAND 9 MODEL ESSAYS */}
      <section className="bg-white rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 space-y-8">
        <div className="pb-4 border-b-2 border-slate-100">
          <span className="text-xs font-black text-rose-600 uppercase tracking-widest">Writing Section Evaluation</span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
            <PenTool className="w-7 h-7 text-rose-600" /> IELTS Writing Tasks & Band 9.0 Benchmark Answers
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Compare your written responses directly against official Band 9.0 model essays evaluated on Task Achievement, Coherence, Lexical Resource, and Grammatical Range.
          </p>
        </div>

        <div className="space-y-8">
          {IELTS_WRITING_TASKS.map((task) => {
            const userText = writingAnswers[task.id] || '';
            const wordCount = userText.trim() ? userText.trim().split(/\s+/).length : 0;

            return (
              <div key={task.id} className="p-6 rounded-3xl border-2 border-slate-200 bg-slate-50/60 space-y-6">
                
                {/* Task Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                  <div>
                    <span className="text-xs font-black uppercase text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                      {task.type}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-2">{task.title}</h3>
                  </div>
                  <span className="text-xs font-bold text-slate-600">
                    Min Words: {task.minWords} • Time: {task.timeMinutes} Mins
                  </span>
                </div>

                {/* Task Prompt */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-800 font-serif leading-relaxed whitespace-pre-line">
                  {task.prompt}
                </div>

                {/* Side-by-side or stacked User Response & Band 9 Solution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Left: Candidate Draft */}
                  <div className="p-5 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-black text-xs uppercase text-slate-700">Your Submitted Draft</h4>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          wordCount >= task.minWords ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {wordCount} / {task.minWords} Words
                        </span>
                      </div>
                      {userText ? (
                        <p className="text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-line">
                          {userText}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 italic py-6 text-center">
                          (No written response was submitted during this test session.)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Band 9 Model Solution */}
                  <div className="p-5 bg-gradient-to-br from-rose-50 to-white rounded-2xl border-2 border-rose-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-black text-xs uppercase text-rose-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-rose-600" /> Official Band 9.0 Model Answer
                      </h4>
                      <span className="text-[10px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-sm">
                        Examiner Benchmark
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 font-serif leading-relaxed whitespace-pre-line bg-white/80 p-3.5 rounded-xl border border-rose-100">
                      {task.band9ModelAnswer}
                    </p>

                    {/* Criteria list */}
                    <div className="mt-4 pt-3 border-t border-rose-100 space-y-1 text-[11px] text-slate-600">
                      {task.keyAssessmentCriteria.map((c, idx) => (
                        <div key={idx}>
                          <strong className="text-rose-950">{c.title}:</strong> {c.description}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 4. QUESTION-BY-QUESTION SOLUTIONS (LISTENING & READING) */}
      <section className="bg-white rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 space-y-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b-2 border-slate-100 gap-4">
          <div>
            <span className="text-xs font-black text-rose-600 uppercase tracking-widest">Complete Answer Key & Analysis</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
              <FileCheck className="w-7 h-7 text-rose-600" /> Step-by-Step Question Solutions (80 Qs)
            </h2>
          </div>

          {/* Section Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'listening', 'reading'] as const).map(sec => (
              <button
                key={sec}
                onClick={() => setSectionFilter(sec)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold capitalize transition-all border-2 ${
                  sectionFilter === sec
                    ? 'bg-rose-600 text-white border-rose-700 shadow'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sec === 'all' ? 'All Sections (80)' : sec === 'listening' ? 'Listening (40)' : 'Reading (40)'}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>
          {[
            { id: 'all', label: `All (${IELTS_MOCK_TEST_80.length})` },
            { id: 'correct', label: `Correct (${analytics.totalCorrect})`, color: 'text-emerald-700' },
            { id: 'incorrect', label: `Incorrect (${analytics.totalIncorrect})`, color: 'text-rose-700' },
            { id: 'skipped', label: `Skipped (${analytics.totalSkipped})`, color: 'text-slate-600' },
          ].map(st => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                statusFilter === st.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const userAns = answers[q.id];
            const isAttempted = userAns !== undefined;
            const isCorrect = isAttempted && Number(userAns) === Number(q.correctAnswer);
            const isExpanded = expandedQuestionId === q.id;

            return (
              <div 
                key={q.id}
                className={`p-6 rounded-3xl border-2 transition-all ${
                  isCorrect 
                    ? 'bg-emerald-50/40 border-emerald-200' 
                    : isAttempted 
                      ? 'bg-rose-50/40 border-rose-200' 
                      : 'bg-slate-50/60 border-slate-200'
                }`}
              >
                {/* Question Row Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-slate-900 text-white">
                      Q{q.questionNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase px-2 py-0.5 bg-white rounded border border-slate-200">
                      {q.section} • {q.questionType}
                    </span>
                    <span className="text-xs text-slate-600 font-medium truncate max-w-[200px] sm:max-w-none">
                      {q.partTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1.0)
                      </span>
                    ) : isAttempted ? (
                      <span className="flex items-center gap-1 text-xs font-black text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect (0.0)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-200 px-3 py-1 rounded-full">
                        <MinusCircle className="w-3.5 h-3.5" /> Skipped (0.0)
                      </span>
                    )}

                    <button
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      className="p-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Question Stem */}
                <div className="text-base font-bold text-slate-900 mt-3 leading-snug">
                  {q.questionText}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {q.options.map((optText, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);
                    const isCandidateChoice = userAns === optIdx;
                    const isOfficialCorrect = q.correctAnswer === optIdx;

                    let optBg = 'bg-white border-slate-200 text-slate-700';
                    if (isOfficialCorrect) {
                      optBg = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                    } else if (isCandidateChoice && !isOfficialCorrect) {
                      optBg = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
                    }

                    return (
                      <div 
                        key={optIdx}
                        className={`p-3 rounded-xl border-2 text-xs flex items-start gap-2.5 ${optBg}`}
                      >
                        <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black shrink-0 ${
                          isOfficialCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {letter}
                        </span>
                        <span className="flex-1 pt-0.5">{optText}</span>
                        {isOfficialCorrect && <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />}
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Solution / Transcript Context Dropdown */}
                <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div className="font-extrabold text-rose-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-rose-600" /> Verified Official Rationale:
                    </div>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {q.solution}
                    </p>

                    {/* Show passage / transcript if expanded */}
                    {isExpanded && q.transcriptOrPassage && (
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                          Passage / Transcript Reference:
                        </span>
                        <p className="p-3 bg-slate-50 rounded-xl text-slate-700 font-serif leading-relaxed italic text-[11px]">
                          "{q.transcriptOrPassage}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* 5. BOTTOM RETAKE & COUNSELING CTA */}
      <div className="p-8 bg-slate-900 rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-white text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-black uppercase">Planning Your Global Admissions for 2026/2027?</h3>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto font-medium">
          Get 1-on-1 personalized guidance on university shortlisting, IELTS/GRE fee waivers, Statement of Purpose (SOP) reviews, and visa mock interviews with Mohit Jain.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onReset}
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow"
          >
            Retake IELTS Mock Test
          </button>
          <a
            href="https://api.whatsapp.com/send?phone=918882898892&text=Hi%20Mohit,%20I%20took%20the%20IELTS%20Mock%20Test%20and%20want%20guidance%20for%20study%20abroad%20admissions."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
}
