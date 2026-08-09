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
  Zap
} from 'lucide-react';
import { SNAP_MOCK_TEST_60, SnapQuestion } from '@/data/snap_mock_test_60';
import { GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';

export type SnapUserAnswers = Record<number, number>; // qId -> optionIndex (0-3)
export type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked' | 'answered_marked';

interface SnapExamInterfaceProps {
  student: GenericStudentInfo;
  onComplete: (answers: SnapUserAnswers) => void;
}

export function SnapExamInterface({ student, onComplete }: SnapExamInterfaceProps) {
  // Current active question and section
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [activeSection, setActiveSection] = useState<'english' | 'quant' | 'logic'>('english');

  // Candidate answers and review states
  const [answers, setAnswers] = useState<SnapUserAnswers>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([1]));

  // Comprehensive 60-Minute Speed Test Timer (3,600 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(60 * 60);

  // Modals
  const [isQuestionPaperOpen, setIsQuestionPaperOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);

  // Current question object
  const currentQuestion = useMemo(() => {
    return SNAP_MOCK_TEST_60.find(q => q.id === currentQuestionId) || SNAP_MOCK_TEST_60[0];
  }, [currentQuestionId]);

  // Section questions mapping
  const sectionQuestions = useMemo(() => {
    return {
      english: SNAP_MOCK_TEST_60.filter(q => q.section === 'english'),
      quant: SNAP_MOCK_TEST_60.filter(q => q.section === 'quant'),
      logic: SNAP_MOCK_TEST_60.filter(q => q.section === 'logic')
    };
  }, []);

  const activeQuestions = sectionQuestions[activeSection];

  // Timer Tick
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

  // Helper to determine question palette status
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
    const targetQ = SNAP_MOCK_TEST_60.find(q => q.id === qId);
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
      // Transition to next section if at end of current section
      if (activeSection === 'english') {
        setActiveSection('quant');
        handleSelectQuestion(sectionQuestions.quant[0].id);
      } else if (activeSection === 'quant') {
        setActiveSection('logic');
        handleSelectQuestion(sectionQuestions.logic[0].id);
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
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Section stats for summary
  const getSectionStats = (sectionKey: 'english' | 'quant' | 'logic') => {
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
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex flex-col selection:bg-purple-100 selection:text-purple-900">
      {/* 1. TOP HEADER (SNAP CBT Bar) */}
      <header className="bg-[#2e1065] text-white px-4 md:px-8 py-3 border-b-4 border-[#3b0764] shadow-xl sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-500 text-white px-2.5 py-1 rounded-lg font-black text-xs uppercase tracking-wider shadow-sm">
            SNAP CBT
          </div>
          <div>
            <h1 className="font-extrabold text-sm md:text-base leading-tight tracking-tight">
              SNAP Official Mock Test <span className="text-purple-300 font-normal hidden sm:inline">(60 Questions | 60 Mins)</span>
            </h1>
            <p className="text-[11px] text-purple-200/70 font-semibold">
              Candidate: <span className="text-white font-bold">{student.name}</span>
            </p>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center flex-wrap gap-2 md:gap-4">
          {/* Main Countdown Display */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-mono font-black text-base md:text-lg shadow-inner ${
            timeLeft < 300 
              ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse' 
              : 'bg-[#1e1b4b] border-purple-800 text-purple-300'
          }`}>
            <Clock className="w-4 h-4 text-purple-400" />
            <span>{formatTimer(timeLeft)}</span>
            <span className="text-[10px] uppercase font-sans text-purple-300/70 font-bold ml-1">Left</span>
          </div>

          {/* Question Paper View */}
          <button
            onClick={() => setIsQuestionPaperOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#3b0764] hover:bg-[#581c87] border border-purple-700/60 rounded-xl text-xs font-bold text-purple-100 transition-all shadow-sm active:scale-95"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Question Paper</span>
          </button>

          {/* Instructions */}
          <button
            onClick={() => setIsInstructionsOpen(true)}
            className="p-2 bg-[#3b0764] hover:bg-[#581c87] border border-purple-700/60 rounded-xl text-purple-200 transition-all shadow-sm"
            title="View Instructions"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Submit Test */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-950/40 transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>
        </div>
      </header>

      {/* 2. SECTION TABS (General English, Quant, Logical Reasoning) */}
      <nav className="bg-white border-b border-slate-200 px-4 md:px-8 py-2.5 shadow-sm flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {(['english', 'quant', 'logic'] as const).map((secKey) => {
            const isActive = activeSection === secKey;
            const stats = getSectionStats(secKey);
            const labelMap = {
              english: 'General English (15 Qs)',
              quant: 'Quant, DI & DS (20 Qs)',
              logic: 'Analytical & Logical Reasoning (25 Qs)'
            };

            return (
              <button
                key={secKey}
                onClick={() => {
                  setActiveSection(secKey);
                  handleSelectQuestion(sectionQuestions[secKey][0].id);
                }}
                className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 border-2 ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-100'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{labelMap[secKey]}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  isActive ? 'bg-purple-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {stats.answered + stats.answeredMarked}/{stats.total}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Palette Toggle */}
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
        {/* Left/Middle: Question Workspace Pane */}
        <main className="flex-1 flex flex-col overflow-y-auto p-4 md:p-6 gap-6">
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
            {/* Question Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="bg-slate-900 text-white px-3 py-1 rounded-lg font-black text-xs uppercase tracking-widest">
                  Question {currentQuestion.questionNumber}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-900">
                  Multiple Choice (+1 Correct, -0.25 Wrong)
                </span>
                {currentQuestion.topic && (
                  <span className="hidden sm:inline text-xs text-slate-500 font-medium italic">
                    Topic: {currentQuestion.topic}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  {markedForReview.has(currentQuestion.id) ? (
                    <span className="text-purple-600 flex items-center gap-1">
                      <Flag className="w-3.5 h-3.5 fill-purple-600" /> Marked for Review
                    </span>
                  ) : (
                    <span>SNAP Speed Format</span>
                  )}
                </span>
              </div>
            </div>

            {/* Split Content Area (Left: Passage / Table / Scenario, Right: Question & 4 Options) */}
            <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200 min-h-[440px]">
              
              {/* Context Pane (Passage / DI Table / Scenario if available) */}
              {(currentQuestion.passageText || currentQuestion.scenarioText || currentQuestion.dataTable) && (
                <div className="lg:w-1/2 p-6 overflow-y-auto bg-slate-50/60 text-slate-700 leading-relaxed font-sans text-sm md:text-base border-b lg:border-b-0">
                  {currentQuestion.passageTitle && (
                    <div className="mb-4 pb-2 border-b border-slate-200">
                      <h4 className="font-extrabold text-slate-900 text-base uppercase tracking-tight flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-purple-600" />
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

                  {/* Data Table */}
                  {currentQuestion.dataTable && (
                    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-800 text-white">
                            {currentQuestion.dataTable.headers.map((h, i) => (
                              <th key={i} className="py-2.5 px-3 font-extrabold border-r border-slate-700 last:border-r-0">
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
                  {/* Question Text */}
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
                              ? 'bg-purple-50 border-purple-600 shadow-md ring-2 ring-purple-500/20 text-slate-950 font-bold'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium'
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border-2 transition-colors ${
                            isSelected
                              ? 'bg-purple-600 border-purple-600 text-white'
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

                {/* Footer Note */}
                <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Marking: +1.0 for Correct, -0.25 for Incorrect</span>
                  <span>Question ID: SNAP60-Q{currentQuestion.id}</span>
                </div>
              </div>
            </div>

            {/* 4. BOTTOM ACTION TOOLBAR */}
            <div className="bg-slate-100 border-t-2 border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMarkForReviewAndNext}
                  className="px-4 py-3 rounded-xl border-2 border-purple-300 bg-purple-50 text-purple-700 font-bold text-xs uppercase tracking-wider hover:bg-purple-100 transition-colors flex items-center gap-1.5"
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
                  className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest shadow-md transition-all active:scale-95 flex items-center gap-2"
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
            {/* Palette Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-purple-400 font-black text-xs flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-800 uppercase">{student.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Question Palette</p>
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
                <span className="w-4 h-4 rounded bg-purple-600 text-white flex items-center justify-center text-[9px] font-black">★</span>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-slate-200 border border-slate-300 text-slate-600 flex items-center justify-center text-[9px] font-black">·</span>
                <span>Not Visited</span>
              </div>
            </div>

            {/* Section Indicator */}
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
                {activeSection.toUpperCase()} Questions
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                {activeQuestions.length} Questions
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
                  btnClass = 'bg-purple-600 text-white border-purple-700 ring-2 ring-emerald-400';
                } else if (status === 'marked') {
                  btnClass = 'bg-purple-600 text-white border-purple-700';
                } else if (status === 'not_answered') {
                  btnClass = 'bg-rose-500 text-white border-rose-600';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(q.id)}
                    className={`h-9 rounded-xl font-mono font-black text-xs border-2 transition-all flex items-center justify-center relative ${btnClass} ${
                      isCurrent ? 'ring-4 ring-purple-400 scale-105 z-10' : ''
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

          {/* Quick Submit Block */}
          <div className="pt-6 mt-6 border-t border-slate-200 space-y-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Submit Entire Exam</span>
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Auto-saves every response securely in real-time.
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
                <FileText className="w-5 h-5 text-purple-400" />
                <h3 className="font-black text-base uppercase tracking-wider">SNAP Official Mock Test - Full Question Paper (60 Questions)</h3>
              </div>
              <button 
                onClick={() => setIsQuestionPaperOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-8 divide-y divide-slate-200">
              {SNAP_MOCK_TEST_60.map((q) => (
                <div key={q.id} className="pt-6 first:pt-0 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs uppercase bg-slate-900 text-white px-2.5 py-1 rounded-md">
                      Q{q.questionNumber} ({q.section.toUpperCase()})
                    </span>
                    <span className="text-xs text-slate-500 font-bold">{q.sectionName}</span>
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
                <HelpCircle className="w-5 h-5 text-purple-400" />
                SNAP Official Exam Instructions
              </h3>
              <button 
                onClick={() => setIsInstructionsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed">
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl">
                <h4 className="font-black text-purple-950 uppercase text-xs tracking-wider mb-1">SNAP Exam Pattern (60 Questions | 60 Minutes)</h4>
                <ul className="list-disc list-inside text-xs space-y-1 text-purple-900 font-medium">
                  <li><strong>General English:</strong> 15 Questions</li>
                  <li><strong>Quant, DI & DS:</strong> 20 Questions</li>
                  <li><strong>Analytical & Logical Reasoning:</strong> 25 Questions</li>
                </ul>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Marking Scheme:</h4>
                <p>1. <strong>Correct Response:</strong> +1.00 mark for each correct MCQ.</p>
                <p>2. <strong>Negative Marking:</strong> -0.25 marks for each incorrect MCQ.</p>
                <p>3. <strong>SIBM Pune & Symbiosis Call Predictor:</strong> Instant scorecards with detailed step-by-step solutions are delivered upon submission.</p>
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
              <div className="p-3 bg-purple-100 rounded-2xl">
                <Send className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 uppercase">Ready to Submit SNAP Exam?</h3>
                <p className="text-xs text-slate-500 font-semibold">Review your current question attempt status below</p>
              </div>
            </div>

            {/* Section Attempt Stats */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {(['english', 'quant', 'logic'] as const).map((secKey) => {
                const s = getSectionStats(secKey);
                const titleMap = { english: 'English', quant: 'Quant', logic: 'Logic' };
                return (
                  <div key={secKey} className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 space-y-1">
                    <p className="font-black uppercase text-[10px] text-slate-400">{titleMap[secKey]}</p>
                    <p className="font-black text-slate-900 text-sm">{s.answered + s.answeredMarked} <span className="text-[10px] text-slate-400 font-normal">/ {s.total}</span></p>
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
                className="flex-1 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase shadow-lg shadow-purple-900/20"
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
