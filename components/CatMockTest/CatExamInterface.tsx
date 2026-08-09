'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, 
  Calculator as CalcIcon, 
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
  UserCheck
} from 'lucide-react';
import { CAT_MOCK_TEST_68, CatQuestion } from '@/data/cat_mock_test_68';
import { CatCalculatorModal } from './CatCalculatorModal';
import { GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';

export type UserAnswers = Record<number, number | string>; // qId -> optionIndex or TITA string
export type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked' | 'answered_marked';

interface CatExamInterfaceProps {
  student: GenericStudentInfo;
  onComplete: (answers: UserAnswers) => void;
}

export function CatExamInterface({ student, onComplete }: CatExamInterfaceProps) {
  // Navigation & Section state
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [activeSection, setActiveSection] = useState<'varc' | 'dilr' | 'qa'>('varc');
  
  // Responses and Review states
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([1]));

  // Sectional Timer state (40 mins per section = 2400 seconds)
  const [sectionTimes, setSectionTimes] = useState<{ varc: number; dilr: number; qa: number }>({
    varc: 40 * 60,
    dilr: 40 * 60,
    qa: 40 * 60
  });

  // Modals
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isQuestionPaperOpen, setIsQuestionPaperOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);

  // Current question object
  const currentQuestion = useMemo(() => {
    return CAT_MOCK_TEST_68.find(q => q.id === currentQuestionId) || CAT_MOCK_TEST_68[0];
  }, [currentQuestionId]);

  // Section questions
  const sectionQuestions = useMemo(() => {
    return {
      varc: CAT_MOCK_TEST_68.filter(q => q.section === 'varc'),
      dilr: CAT_MOCK_TEST_68.filter(q => q.section === 'dilr'),
      qa: CAT_MOCK_TEST_68.filter(q => q.section === 'qa')
    };
  }, []);

  const activeQuestions = sectionQuestions[activeSection];

  // Timer Tick
  useEffect(() => {
    const timer = setInterval(() => {
      setSectionTimes(prev => {
        const currentTime = prev[activeSection];
        if (currentTime <= 1) {
          // Auto switch section if time runs out
          if (activeSection === 'varc') {
            setActiveSection('dilr');
            setCurrentQuestionId(sectionQuestions.dilr[0].id);
          } else if (activeSection === 'dilr') {
            setActiveSection('qa');
            setCurrentQuestionId(sectionQuestions.qa[0].id);
          } else {
            clearInterval(timer);
            onComplete(answers);
          }
          return { ...prev, [activeSection]: 0 };
        }
        return { ...prev, [activeSection]: currentTime - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSection, answers, onComplete, sectionQuestions]);

  // Helper to determine question status
  const getQuestionStatus = (qId: number): QuestionStatus => {
    const hasAnswer = answers[qId] !== undefined && answers[qId] !== '';
    const isMarked = markedForReview.has(qId);
    const isVisited = visitedQuestions.has(qId);

    if (hasAnswer && isMarked) return 'answered_marked';
    if (isMarked) return 'marked';
    if (hasAnswer) return 'answered';
    if (isVisited) return 'not_answered';
    return 'not_visited';
  };

  const handleSelectQuestion = (qId: number) => {
    const targetQ = CAT_MOCK_TEST_68.find(q => q.id === qId);
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
      // If at end of section, jump to next section if available
      if (activeSection === 'varc') {
        setActiveSection('dilr');
        handleSelectQuestion(sectionQuestions.dilr[0].id);
      } else if (activeSection === 'dilr') {
        setActiveSection('qa');
        handleSelectQuestion(sectionQuestions.qa[0].id);
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
  const getSectionStats = (sectionKey: 'varc' | 'dilr' | 'qa') => {
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
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      {/* 1. TOP HEADER (CAT CBT Bar) */}
      <header className="bg-[#1e293b] text-white px-4 md:px-8 py-3 border-b-4 border-slate-700 shadow-xl sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 text-slate-950 px-2.5 py-1 rounded-lg font-black text-xs uppercase tracking-wider">
            CAT CBT
          </div>
          <div>
            <h1 className="font-extrabold text-sm md:text-base leading-tight tracking-tight">
              CAT 2026 Full Mock Test <span className="text-amber-400 font-normal hidden sm:inline">(68 Questions)</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-semibold">
              Candidate: <span className="text-white font-bold">{student.name}</span>
            </p>
          </div>
        </div>

        {/* Section Timer & Utility Buttons */}
        <div className="flex items-center flex-wrap gap-2 md:gap-4">
          {/* Sectional Timer Display */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-mono font-black text-base md:text-lg shadow-inner ${
            sectionTimes[activeSection] < 300 
              ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse' 
              : 'bg-slate-900 border-slate-700 text-amber-400'
          }`}>
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{formatTimer(sectionTimes[activeSection])}</span>
            <span className="text-[10px] uppercase font-sans text-slate-400 font-bold ml-1">Left</span>
          </div>

          {/* Calculator Tool */}
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-bold text-amber-300 transition-all shadow-sm active:scale-95"
            title="Open CAT On-Screen Calculator"
          >
            <CalcIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Calculator</span>
          </button>

          {/* Question Paper View */}
          <button
            onClick={() => setIsQuestionPaperOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-bold text-slate-200 transition-all shadow-sm active:scale-95"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">Question Paper</span>
          </button>

          {/* Instructions */}
          <button
            onClick={() => setIsInstructionsOpen(true)}
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 transition-all shadow-sm"
            title="View Instructions"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Submit Test */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>
        </div>
      </header>

      {/* 2. SECTION TABS (VARC, DILR, QA) */}
      <nav className="bg-white border-b border-slate-200 px-4 md:px-8 py-2.5 shadow-sm flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {(['varc', 'dilr', 'qa'] as const).map((secKey) => {
            const isActive = activeSection === secKey;
            const stats = getSectionStats(secKey);
            const labelMap = {
              varc: 'Section I: VARC (24 Qs)',
              dilr: 'Section II: DILR (22 Qs)',
              qa: 'Section III: QA (22 Qs)'
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
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
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

      {/* 3. MAIN CBT WORKSPACE (Split Screen Layout) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left/Middle: Question Pane (and Passage Pane if RC/DILR) */}
        <main className="flex-1 flex flex-col overflow-y-auto p-4 md:p-6 gap-6">
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
            {/* Question Info Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="bg-slate-900 text-white px-3 py-1 rounded-lg font-black text-xs uppercase tracking-widest">
                  Question {currentQuestion.questionNumber}
                </span>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  currentQuestion.type === 'mcq' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {currentQuestion.type === 'mcq' ? 'Multiple Choice (+3, -1)' : 'TITA / Numerical (+3, 0)'}
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
                    <span>CAT Pattern</span>
                  )}
                </span>
              </div>
            </div>

            {/* Split Content Area (Passage / Scenario on Left, Question & Options on Right) */}
            <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200 min-h-[420px]">
              
              {/* Context / Reading Passage / Data Table (If available) */}
              {(currentQuestion.passageText || currentQuestion.scenarioText || currentQuestion.dataTable) && (
                <div className="lg:w-1/2 p-6 overflow-y-auto bg-slate-50/50 text-slate-700 leading-relaxed font-sans text-sm md:text-base border-b lg:border-b-0">
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
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        {currentQuestion.scenarioTitle}
                      </h4>
                    </div>
                  )}

                  {currentQuestion.scenarioText && (
                    <div className="whitespace-pre-line text-slate-800 leading-relaxed text-sm font-medium mb-4 bg-white p-4 rounded-2xl border border-slate-200">
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

              {/* Question Statement and Options/TITA box */}
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

                  {/* Options (For MCQ) */}
                  {currentQuestion.type === 'mcq' && currentQuestion.options && (
                    <div className="space-y-3 pt-2">
                      {currentQuestion.options.map((opt, optIdx) => {
                        const isSelected = answers[currentQuestion.id] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: optIdx }))}
                            className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                              isSelected
                                ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/20 text-slate-950 font-bold'
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
                  )}

                  {/* TITA Input Box (For Numerical / String Answers) */}
                  {currentQuestion.type === 'tita' && (
                    <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-300 space-y-4">
                      <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
                        <AlertCircle className="w-4 h-4 text-purple-600" />
                        <span>Type In The Answer (TITA) - No Negative Marking</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={(answers[currentQuestion.id] as string) || ''}
                          onChange={(e) => setAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value.trim() }))}
                          placeholder="Enter your answer (e.g. 2314, 296, 13)..."
                          className="w-full px-5 py-4 bg-white border-2 border-slate-300 rounded-xl font-mono text-lg font-bold text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
                        />
                        <button
                          onClick={() => {
                            setAnswers(prev => {
                              const updated = { ...prev };
                              delete updated[currentQuestion.id];
                              return updated;
                            });
                          }}
                          className="px-4 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider"
                        >
                          Clear
                        </button>
                      </div>

                      {/* Mini on-screen keypad for numbers */}
                      <div className="grid grid-cols-5 gap-2 pt-2 max-w-xs">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '-'].map((key) => (
                          <button
                            key={key}
                            onClick={() => {
                              const currentVal = (answers[currentQuestion.id] as string) || '';
                              setAnswers(prev => ({ ...prev, [currentQuestion.id]: currentVal + key }));
                            }}
                            className="p-2.5 bg-white border border-slate-300 hover:bg-purple-50 hover:border-purple-300 rounded-lg font-mono font-bold text-sm text-slate-800 shadow-sm"
                          >
                            {key}
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            const currentVal = (answers[currentQuestion.id] as string) || '';
                            if (currentVal.length > 0) {
                              setAnswers(prev => ({ ...prev, [currentQuestion.id]: currentVal.slice(0, -1) }));
                            }
                          }}
                          className="col-span-3 p-2.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-lg font-bold text-xs text-rose-700 uppercase tracking-wider"
                        >
                          Backspace
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Question Footer Note */}
                <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Standard CAT Marking: +3 Correct, -1 Incorrect (MCQ), 0 for TITA</span>
                  <span>Question ID: CAT68-Q{currentQuestion.id}</span>
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

        {/* Right: Question Palette Sidebar Grid */}
        <aside className={`lg:w-80 bg-white border-l-2 border-slate-200 p-6 flex flex-col justify-between overflow-y-auto ${
          isMobilePaletteOpen ? 'fixed inset-0 z-50 p-6 bg-white' : 'hidden lg:flex'
        }`}>
          <div>
            {/* Palette Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 font-black text-xs flex items-center justify-center">
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

            {/* Status Legend (TIME / CL standard) */}
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

            {/* Question Number Matrix Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {activeQuestions.map((q) => {
                const status = getQuestionStatus(q.id);
                const isCurrent = q.id === currentQuestionId;

                // Color mappings
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
                    className={`h-10 rounded-xl font-mono font-black text-xs border-2 transition-all flex items-center justify-center relative ${btnClass} ${
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

      {/* On-screen Calculator Modal */}
      <CatCalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />

      {/* Full Question Paper Modal */}
      {isQuestionPaperOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden border-4 border-slate-900">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="font-black text-base uppercase tracking-wider">CAT Mock Test - Full Question Paper</h3>
              </div>
              <button 
                onClick={() => setIsQuestionPaperOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-8 divide-y divide-slate-200">
              {CAT_MOCK_TEST_68.map((q) => (
                <div key={q.id} className="pt-6 first:pt-0 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs uppercase bg-slate-900 text-white px-2.5 py-1 rounded-md">
                      Q{q.questionNumber} ({q.section.toUpperCase()})
                    </span>
                    <span className="text-xs font-bold text-slate-500">[{q.type.toUpperCase()}]</span>
                  </div>
                  {q.passageText && (
                    <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 leading-relaxed font-sans">
                      {q.passageText}
                    </div>
                  )}
                  <p className="font-bold text-slate-800 text-sm">{q.questionText}</p>
                  {q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {q.options.map((opt, i) => (
                        <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                          {String.fromCharCode(65 + i)}) {opt}
                        </div>
                      ))}
                    </div>
                  )}
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
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-base uppercase tracking-wider">Exam Instructions</h3>
              </div>
              <button 
                onClick={() => setIsInstructionsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed">
              <h4 className="font-black text-slate-900 text-base">CAT Exam Structure & Rules:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Total Duration: <strong>120 Minutes</strong> (40 minutes per section).</li>
                <li>Total Questions: <strong>68 Questions</strong> across 3 Sections:
                  <ul className="list-circle pl-5 mt-1 text-xs text-slate-600">
                    <li>Section I: VARC - 24 Questions</li>
                    <li>Section II: DILR - 22 Questions</li>
                    <li>Section III: QA - 22 Questions</li>
                  </ul>
                </li>
                <li>Marking Scheme:
                  <ul className="list-circle pl-5 mt-1 text-xs text-slate-600">
                    <li><strong>+3 Marks</strong> for every correct response.</li>
                    <li><strong>-1 Mark</strong> for every incorrect Multiple Choice Question (MCQ).</li>
                    <li><strong>0 Marks (No negative marking)</strong> for Type-In-The-Answer (TITA) questions.</li>
                  </ul>
                </li>
                <li>Use the on-screen CAT Calculator located on the top navigation bar.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 6. SUBMIT CONFIRMATION SUMMARY MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border-4 border-slate-900 overflow-hidden">
            <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <h3 className="font-black text-lg uppercase tracking-wider">Exam Submission Summary</h3>
              </div>
              <button 
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <p className="text-sm font-semibold text-slate-600">
                Please review your attempt summary across all sections before submitting your mock test:
              </p>

              {/* Sectional Attempt Matrix Table */}
              <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-black uppercase text-[11px]">
                      <th className="py-3 px-4">Section Name</th>
                      <th className="py-3 px-3 text-center">Total Qs</th>
                      <th className="py-3 px-3 text-center bg-emerald-700">Answered</th>
                      <th className="py-3 px-3 text-center bg-rose-700">Not Answered</th>
                      <th className="py-3 px-3 text-center bg-purple-700">Marked</th>
                      <th className="py-3 px-3 text-center">Not Visited</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-bold text-slate-800">
                    {(['varc', 'dilr', 'qa'] as const).map((secKey) => {
                      const stats = getSectionStats(secKey);
                      const labels = {
                        varc: 'Section I: VARC',
                        dilr: 'Section II: DILR',
                        qa: 'Section III: QA'
                      };
                      return (
                        <tr key={secKey} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-black">{labels[secKey]}</td>
                          <td className="py-3 px-3 text-center font-mono">{stats.total}</td>
                          <td className="py-3 px-3 text-center font-mono text-emerald-700 bg-emerald-50/50">
                            {stats.answered + stats.answeredMarked}
                          </td>
                          <td className="py-3 px-3 text-center font-mono text-rose-700 bg-rose-50/50">
                            {stats.notAnswered}
                          </td>
                          <td className="py-3 px-3 text-center font-mono text-purple-700 bg-purple-50/50">
                            {stats.marked}
                          </td>
                          <td className="py-3 px-3 text-center font-mono text-slate-400">
                            {stats.notVisited}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium leading-relaxed">
                <strong>Important:</strong> Once you click <em>Submit & Generate Report</em>, your test will end immediately and you will receive your final CAT scaled score, projected percentile, and comprehensive step-by-step solutions.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-6 py-3.5 rounded-2xl border-2 border-slate-300 font-black text-xs uppercase tracking-wider text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Resume Test
                </button>
                <button
                  onClick={() => {
                    setIsSubmitModalOpen(false);
                    onComplete(answers);
                  }}
                  className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/30 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit & Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS helper */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
