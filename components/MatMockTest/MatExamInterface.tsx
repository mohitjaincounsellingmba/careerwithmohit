'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, 
  FileText, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  X, 
  LayoutGrid, 
  Sparkles, 
  BookOpen, 
  UserCheck,
  Zap,
  BarChart2,
  Table
} from 'lucide-react';
import { MAT_MOCK_TEST_150, MatQuestion } from '@/data/mat_mock_test_150';
import { GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';

export type MatUserAnswers = Record<number, number>; // qId -> optionIndex (0-3)
export type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked' | 'answered_marked';

export type MatSectionKey = 'language' | 'intelligence' | 'data-analysis' | 'math-skills' | 'economic-environment';

interface MatExamInterfaceProps {
  student: GenericStudentInfo;
  onComplete: (answers: MatUserAnswers) => void;
  matCycle?: string;
}

export const MAT_SECTIONS: { id: MatSectionKey; label: string; short: string; qRange: string }[] = [
  { id: 'language', label: 'Language Comprehension', short: 'Language', qRange: 'Q1-Q30' },
  { id: 'intelligence', label: 'Intelligence & Critical Reasoning', short: 'Reasoning', qRange: 'Q31-Q60' },
  { id: 'data-analysis', label: 'Data Analysis & Sufficiency', short: 'Data Analysis', qRange: 'Q61-Q90' },
  { id: 'math-skills', label: 'Mathematical Skills', short: 'Math Skills', qRange: 'Q91-Q120' },
  { id: 'economic-environment', label: 'Economic & Business Environment', short: 'Econ & Biz', qRange: 'Q121-Q150' },
];

export function MatExamInterface({ student, onComplete, matCycle = 'Sept / Dec / Feb / May MAT' }: MatExamInterfaceProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [activeSection, setActiveSection] = useState<MatSectionKey>('language');

  const [answers, setAnswers] = useState<MatUserAnswers>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([1]));

  // Total 120 Minutes (7,200 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(120 * 60);

  // Modals
  const [isQuestionPaperOpen, setIsQuestionPaperOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);

  const currentQuestion = useMemo(() => {
    return MAT_MOCK_TEST_150.find(q => q.id === currentQuestionId) || MAT_MOCK_TEST_150[0];
  }, [currentQuestionId]);

  // Questions grouped by section
  const sectionQuestions = useMemo(() => {
    const map: Record<MatSectionKey, MatQuestion[]> = {
      'language': [],
      'intelligence': [],
      'data-analysis': [],
      'math-skills': [],
      'economic-environment': []
    };
    MAT_MOCK_TEST_150.forEach(q => {
      map[q.section].push(q);
    });
    return map;
  }, []);

  const activeQuestions = sectionQuestions[activeSection];

  // Timer Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, onComplete]);

  // Question Status Resolver
  const getQuestionStatus = (qId: number): QuestionStatus => {
    const hasAnswer = answers[qId] !== undefined;
    const isMarked = markedForReview.has(qId);
    const isVisited = visitedQuestions.has(qId);

    if (hasAnswer && isMarked) return 'answered_marked';
    if (isMarked) return 'marked';
    if (hasAnswer) return 'answered';
    if (isVisited) return 'not_answered';
    return 'not_visited';
  };

  const handleSelectQuestion = (qId: number) => {
    const targetQ = MAT_MOCK_TEST_150.find(q => q.id === qId);
    if (targetQ) {
      setActiveSection(targetQ.section);
      setCurrentQuestionId(qId);
      setVisitedQuestions(prev => new Set([...prev, qId]));
      setIsMobilePaletteOpen(false);
    }
  };

  const handleSaveAndNext = () => {
    const currentIndexInActive = activeQuestions.findIndex(q => q.id === currentQuestionId);
    if (currentIndexInActive < activeQuestions.length - 1) {
      const nextQ = activeQuestions[currentIndexInActive + 1];
      handleSelectQuestion(nextQ.id);
    } else {
      // Transition to next section
      const secIdx = MAT_SECTIONS.findIndex(s => s.id === activeSection);
      if (secIdx < MAT_SECTIONS.length - 1) {
        const nextSec = MAT_SECTIONS[secIdx + 1];
        setActiveSection(nextSec.id);
        handleSelectQuestion(sectionQuestions[nextSec.id][0].id);
      } else {
        setIsSubmitModalOpen(true);
      }
    }
  };

  const handleMarkForReviewAndNext = () => {
    setMarkedForReview(prev => new Set([...prev, currentQuestionId]));
    handleSaveAndNext();
  };

  const handleClearResponse = () => {
    setAnswers(prev => {
      const updated = { ...prev };
      delete updated[currentQuestionId];
      return updated;
    });
    setMarkedForReview(prev => {
      const updated = new Set(prev);
      updated.delete(currentQuestionId);
      return updated;
    });
  };

  const handlePrev = () => {
    const currentIndexInActive = activeQuestions.findIndex(q => q.id === currentQuestionId);
    if (currentIndexInActive > 0) {
      handleSelectQuestion(activeQuestions[currentIndexInActive - 1].id);
    }
  };

  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? `${h}:` : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getSectionStats = (sectionKey: MatSectionKey) => {
    const qs = sectionQuestions[sectionKey];
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let answeredMarked = 0;
    let notVisited = 0;

    qs.forEach(q => {
      const status = getQuestionStatus(q.id);
      if (status === 'answered') answered++;
      else if (status === 'answered_marked') answeredMarked++;
      else if (status === 'marked') marked++;
      else if (status === 'not_answered') notAnswered++;
      else notVisited++;
    });

    return { total: qs.length, answered, notAnswered, marked, answeredMarked, notVisited };
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      {/* 1. TOP HEADER (MAT CBT Bar) */}
      <header className="bg-[#0f172a] text-white px-4 md:px-8 py-3 border-b-4 border-[#1e293b] shadow-xl sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 text-slate-950 px-2.5 py-1 rounded-lg font-black text-xs uppercase tracking-wider shadow-sm">
            MAT OFFICIAL CBT
          </div>
          <div>
            <h1 className="font-extrabold text-sm md:text-base leading-tight tracking-tight">
              MAT Exam Mock Test <span className="text-amber-400 font-normal hidden sm:inline">({matCycle} • 150 Qs | 120 Mins)</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-semibold">
              Candidate: <span className="text-white font-bold">{student.name}</span>
            </p>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center flex-wrap gap-2 md:gap-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-mono font-black text-base md:text-lg shadow-inner ${
            timeLeft < 600 
              ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse' 
              : 'bg-[#1e293b] border-slate-700 text-amber-300'
          }`}>
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{formatTimer(timeLeft)}</span>
            <span className="text-[10px] uppercase font-sans text-slate-400 font-bold ml-1">Left</span>
          </div>

          <button
            onClick={() => setIsQuestionPaperOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 transition-all shadow-sm active:scale-95"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Question Paper</span>
          </button>

          <button
            onClick={() => setIsInstructionsOpen(true)}
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-all shadow-sm"
            title="View Instructions"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-slate-950/40 transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Exam</span>
          </button>
        </div>
      </header>

      {/* 2. SECTION TABS (5 MAT Sections) */}
      <nav className="bg-white border-b border-slate-200 px-4 md:px-8 py-2.5 shadow-sm flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {MAT_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            const stats = getSectionStats(sec.id);

            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  handleSelectQuestion(sectionQuestions[sec.id][0].id);
                }}
                className={`px-3.5 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 border-2 shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-100'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{sec.short} <span className="hidden md:inline font-normal">({sec.qRange})</span></span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                }`}>
                  {stats.answered + stats.answeredMarked}/30
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsMobilePaletteOpen(true)}
          className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shrink-0"
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Palette</span>
        </button>
      </nav>

      {/* 3. MAIN CBT WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <main className="flex-1 flex flex-col overflow-y-auto p-4 md:p-6 gap-6">
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
            {/* Question Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="bg-slate-900 text-white px-3 py-1 rounded-lg font-black text-xs uppercase tracking-widest">
                  Question {currentQuestion.questionNumber} of 150
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
                  {currentQuestion.sectionName}
                </span>
                {currentQuestion.topic && (
                  <span className="hidden sm:inline text-xs text-slate-500 font-medium italic">
                    Topic: {currentQuestion.topic}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  +1.00 Mark
                </span>
                <span className="text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  −0.25 Mark
                </span>
              </div>
            </div>

            {/* Split Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200 min-h-[440px]">
              
              {/* Context Pane (Passage / Scenario / Table) */}
              {(currentQuestion.passageText || currentQuestion.scenarioText || currentQuestion.dataTable) && (
                <div className="lg:w-1/2 p-6 overflow-y-auto bg-slate-50/60 text-slate-700 leading-relaxed font-sans text-sm md:text-base border-b lg:border-b-0">
                  {currentQuestion.passageTitle && (
                    <div className="mb-4 pb-2 border-b border-slate-200">
                      <h4 className="font-extrabold text-slate-900 text-base uppercase tracking-tight flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        {currentQuestion.passageTitle}
                      </h4>
                    </div>
                  )}

                  {currentQuestion.passageText && (
                    <div className="whitespace-pre-line text-slate-700 leading-relaxed text-sm md:text-[15px] space-y-3 font-normal">
                      {currentQuestion.passageText}
                    </div>
                  )}

                  {currentQuestion.scenarioTitle && (
                    <div className="mb-4 pb-2 border-b border-slate-200">
                      <h4 className="font-extrabold text-slate-900 text-base uppercase tracking-tight flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-600" />
                        {currentQuestion.scenarioTitle}
                      </h4>
                    </div>
                  )}

                  {currentQuestion.scenarioText && (
                    <div className="whitespace-pre-line text-slate-800 leading-relaxed text-sm font-medium mb-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                      {currentQuestion.scenarioText}
                    </div>
                  )}

                  {currentQuestion.dataTable && (
                    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-900 text-white">
                            {currentQuestion.dataTable.headers.map((h, i) => (
                              <th key={i} className="py-2.5 px-3 font-extrabold border-r border-slate-800 last:border-r-0">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 font-semibold text-slate-700">
                          {currentQuestion.dataTable.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="py-2.5 px-3 border-r border-slate-200 last:border-r-0 font-mono">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Question Statement and 4 Options */}
              <div className={`p-6 md:p-8 flex flex-col justify-between overflow-y-auto ${
                (currentQuestion.passageText || currentQuestion.scenarioText || currentQuestion.dataTable) ? 'lg:w-1/2' : 'w-full'
              }`}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug whitespace-pre-line">
                      {currentQuestion.questionText}
                    </h3>
                  </div>

                  {/* 4-Choice Options (A, B, C, D) */}
                  <div className="space-y-3 pt-2">
                    {currentQuestion.options.map((opt, optIdx) => {
                      const isSelected = answers[currentQuestion.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: optIdx }))}
                          className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                            isSelected
                              ? 'bg-amber-50 border-amber-600 shadow-md ring-2 ring-amber-500/20 text-slate-950 font-bold'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium'
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border-2 transition-colors ${
                            isSelected
                              ? 'bg-amber-500 border-amber-500 text-slate-950'
                              : 'bg-slate-100 border-slate-300 text-slate-600'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="text-sm md:text-base pt-0.5 leading-relaxed">
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Standard MAT Marking (+1 / −0.25) • 120 Minutes</span>
                  <span>Question ID: MAT150-Q{currentQuestion.id}</span>
                </div>
              </div>
            </div>

            {/* 4. BOTTOM ACTION TOOLBAR */}
            <div className="bg-slate-100 border-t-2 border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMarkForReviewAndNext}
                  className="px-4 py-3 rounded-xl border-2 border-amber-300 bg-amber-50 text-amber-900 font-bold text-xs uppercase tracking-wider hover:bg-amber-100 transition-colors flex items-center gap-1.5"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Mark for Review & Next</span>
                </button>
                <button
                  onClick={handleClearResponse}
                  className="px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors"
                >
                  Clear Response
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  disabled={activeQuestions.findIndex(q => q.id === currentQuestionId) === 0}
                  className="px-5 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleSaveAndNext}
                  className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>Save & Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Right: Question Palette Sidebar */}
        <aside className={`lg:w-80 bg-white border-l-2 border-slate-200 p-6 flex flex-col justify-between overflow-y-auto ${
          isMobilePaletteOpen ? 'fixed inset-0 z-50 p-6 bg-white' : 'hidden lg:flex'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 font-black text-xs flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-800 uppercase">{student.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">MAT Question Palette</p>
                </div>
              </div>

              {isMobilePaletteOpen && (
                <button
                  onClick={() => setIsMobilePaletteOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 mb-6 text-[10px] font-bold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black">✓</span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-rose-500 text-white flex items-center justify-center text-[9px] font-black">!</span>
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-amber-500 text-slate-950 flex items-center justify-center text-[9px] font-black">★</span>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-slate-200 border border-slate-300 text-slate-600 flex items-center justify-center text-[9px] font-black">·</span>
                <span>Not Visited</span>
              </div>
            </div>

            {/* Active Section Info */}
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
                {activeSection.toUpperCase()}
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                30 Questions
              </span>
            </div>

            {/* Question Matrix Grid */}
            <div className="grid grid-cols-6 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {activeQuestions.map((q) => {
                const status = getQuestionStatus(q.id);
                const isCurrent = q.id === currentQuestionId;

                let btnClass = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';
                if (status === 'answered') {
                  btnClass = 'bg-emerald-500 text-white border-emerald-600 shadow-sm';
                } else if (status === 'answered_marked') {
                  btnClass = 'bg-amber-500 text-slate-950 border-amber-600 ring-2 ring-emerald-400';
                } else if (status === 'marked') {
                  btnClass = 'bg-amber-500 text-slate-950 border-amber-600';
                } else if (status === 'not_answered') {
                  btnClass = 'bg-rose-500 text-white border-rose-600';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(q.id)}
                    className={`h-9 rounded-xl font-mono font-black text-xs border-2 transition-all flex items-center justify-center relative ${btnClass} ${
                      isCurrent ? 'ring-4 ring-amber-400 scale-105 z-10' : ''
                    }`}
                  >
                    <span>{q.questionNumber}</span>
                    {status === 'answered_marked' && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Test Button */}
          <div className="pt-6 mt-6 border-t border-slate-200 space-y-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>Submit Entire Exam</span>
            </button>
            <p className="text-[10px] text-center text-slate-400">
              MAT Official 150-Question Pattern Simulation.
            </p>
          </div>
        </aside>
      </div>

      {/* 5. MODALS */}

      {/* Full Question Paper Modal */}
      {isQuestionPaperOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden border-4 border-slate-900">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-base uppercase tracking-wider">MAT Exam Full Question Paper (150 Questions)</h3>
              </div>
              <button 
                onClick={() => setIsQuestionPaperOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-8 divide-y divide-slate-200">
              {MAT_MOCK_TEST_150.map((q) => (
                <div key={q.id} className="pt-6 first:pt-0 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs uppercase bg-slate-900 text-white px-2.5 py-1 rounded-md">
                      Q{q.questionNumber} ({q.sectionName})
                    </span>
                  </div>
                  {q.passageText && (
                    <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-700 border border-slate-200">
                      <p className="font-bold text-slate-900 mb-1">{q.passageTitle}</p>
                      <p className="whitespace-pre-line">{q.passageText}</p>
                    </div>
                  )}
                  {q.scenarioText && (
                    <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-700 border border-slate-200">
                      <p className="font-bold text-slate-900 mb-1">{q.scenarioTitle}</p>
                      <p className="whitespace-pre-line">{q.scenarioText}</p>
                    </div>
                  )}
                  <p className="font-bold text-sm text-slate-900">{q.questionText}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {q.options.map((opt, i) => (
                      <div key={i} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-2">
                        <span className="font-bold text-slate-500">{String.fromCharCode(65 + i)})</span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Instructions Modal */}
      {isInstructionsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden border-4 border-slate-900">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-black text-base uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                MAT Exam Official Instructions (AIMA Pattern)
              </h3>
              <button 
                onClick={() => setIsInstructionsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                <h4 className="font-black text-amber-950 uppercase text-xs tracking-wider mb-1">MAT Exam Pattern (150 Questions | 120 Mins)</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-amber-900 font-medium">
                  <li><strong>Language Comprehension:</strong> 30 Questions (30 Marks)</li>
                  <li><strong>Intelligence & Critical Reasoning:</strong> 30 Questions (30 Marks)</li>
                  <li><strong>Data Analysis & Sufficiency:</strong> 30 Questions (30 Marks)</li>
                  <li><strong>Mathematical Skills:</strong> 30 Questions (30 Marks)</li>
                  <li><strong>Economic & Business Environment:</strong> 30 Questions (30 Marks)</li>
                </ul>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Marking Scheme:</h4>
                <p>1. <strong>Correct Response:</strong> +1.00 mark</p>
                <p>2. <strong>Incorrect Response:</strong> −0.25 marks penalty</p>
                <p>3. <strong>Unattempted:</strong> 0 marks</p>
                <p>4. <strong>Composite Score:</strong> Scaled score reported from 199 to 801 (Composite Scale /800) alongside percentile ranking for top AICTE B-Schools.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl border-4 border-slate-900 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-2xl">
                <Send className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 uppercase">Submit MAT Exam?</h3>
                <p className="text-xs text-slate-500 font-semibold">Review your question attempt status before final submission</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {MAT_SECTIONS.map((sec) => {
                const s = getSectionStats(sec.id);
                return (
                  <div key={sec.id} className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 space-y-1">
                    <p className="font-black uppercase text-[10px] text-slate-400">{sec.short}</p>
                    <p className="font-black text-slate-900 text-sm">{s.answered + s.answeredMarked} <span className="text-[10px] text-slate-400 font-normal">/ 30</span></p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="flex-1 py-3.5 rounded-xl border-2 border-slate-300 font-bold text-xs uppercase text-slate-700 hover:bg-slate-50"
              >
                Continue Test
              </button>
              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  onComplete(answers);
                }}
                className="flex-1 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase shadow-lg shadow-amber-900/20"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
