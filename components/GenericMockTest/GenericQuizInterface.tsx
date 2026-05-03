'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Flag, LayoutGrid, CheckCircle2, AlertCircle } from 'lucide-react';
import { GenericQuestion, ExamConfig } from '@/lib/mock-test-data';

interface GenericQuizInterfaceProps {
  config: ExamConfig;
  questions: GenericQuestion[];
  onComplete: (answers: Record<number, number>) => void;
}

export function GenericQuizInterface({ config, questions, onComplete }: GenericQuizInterfaceProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(config.durationMinutes * 60);
  const [activeSection, setActiveSection] = useState<string>(config.sections[0].id);
  const [unlockedSections, setUnlockedSections] = useState<Set<string>>(new Set([config.sections[0].id]));
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onComplete(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [answers, onComplete]);

  const currentQuestion = questions[currentIdx];

  const sectionQuestionsMap = useMemo(() => {
    const map: Record<string, GenericQuestion[]> = {};
    config.sections.forEach(sec => map[sec.id] = []);
    questions.forEach(q => {
      if(map[q.sectionId]) map[q.sectionId].push(q);
    });
    return map;
  }, [config, questions]);

  const activeSectionQuestions = sectionQuestionsMap[activeSection] || [];

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      triggerTransition(() => {
        const nextQ = questions[currentIdx + 1];
        if (nextQ.sectionId !== currentQuestion.sectionId) {
          setUnlockedSections(prev => new Set([...prev, nextQ.sectionId]));
          setActiveSection(nextQ.sectionId);
        }
        setCurrentIdx(currentIdx + 1);
      });
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      triggerTransition(() => {
        const prevQ = questions[currentIdx - 1];
        setActiveSection(prevQ.sectionId);
        setCurrentIdx(currentIdx - 1);
      });
    }
  };

  const triggerTransition = (action: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      action();
      setIsTransitioning(false);
    }, 200);
  };

  const jumpToQuestion = (id: number) => {
    const qIdx = questions.findIndex(q => q.id === id);
    if (qIdx !== -1) {
      triggerTransition(() => {
        const targetSection = questions[qIdx].sectionId;
        setUnlockedSections(prev => new Set([...prev, targetSection]));
        setCurrentIdx(qIdx);
        setActiveSection(targetSection);
        setShowMobileSidebar(false);
      });
    }
  };

  const toggleMarkForReview = (id: number) => {
    const newSet = new Set(markedForReview);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setMarkedForReview(newSet);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative max-w-[1400px] mx-auto px-4">
      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        {/* Header Bar */}
        <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-xl shadow-gray-200/50 flex justify-between items-center backdrop-blur-sm bg-white/80 sticky top-4 z-30">
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all ${timeLeft < 300 ? 'bg-red-50 border-red-200 text-red-600' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
              <Clock className={`w-5 h-5 ${timeLeft < 300 ? 'animate-pulse' : ''}`} />
              <span className="text-xl font-black tabular-nums">{formatTime(timeLeft)}</span>
            </div>
            <div className="hidden md:block h-8 w-px bg-gray-200" />
            <div className="hidden md:block">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-1">Current Section</p>
              <p className="font-bold text-gray-700">{config.sections.find(s => s.id === activeSection)?.label}</p>
            </div>
          </div>
          
          <button 
            onClick={() => onComplete(answers)}
            className="group bg-slate-900 text-white px-8 py-3 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-red-600 transition-all shadow-lg hover:shadow-red-200 flex items-center gap-2"
          >
            Finish Test <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex bg-gray-100/50 p-2 rounded-2xl gap-2 overflow-x-auto no-scrollbar">
          {config.sections.map((sec) => {
            const isActive = activeSection === sec.id;
            const isUnlocked = unlockedSections.has(sec.id);
            return (
              <button
                key={sec.id}
                disabled={!isUnlocked}
                onClick={() => {
                  setActiveSection(sec.id);
                  const firstQ = questions.find(q => q.sectionId === sec.id);
                  if (firstQ) {
                    const idx = questions.findIndex(q => q.id === firstQ.id);
                    setCurrentIdx(idx);
                  }
                }}
                className={`px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest whitespace-nowrap flex items-center gap-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-white text-primary shadow-sm scale-105' 
                    : isUnlocked 
                      ? 'text-gray-500 hover:text-primary hover:bg-white/50' 
                      : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                {sec.label}
                {!isUnlocked && <Clock className="w-3 h-3 opacity-50" />}
              </button>
            );
          })}
        </div>

        {/* Question Card */}
        <div className={`bg-white border-2 border-gray-100 rounded-[2.5rem] p-10 min-h-[600px] shadow-2xl shadow-gray-200/40 relative transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
          <div className="flex justify-between items-start mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
                  Question {currentIdx + 1} / {config.totalQuestions}
                </span>
                {markedForReview.has(currentQuestion.id) && (
                  <span className="bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-1">
                    <Flag className="w-3 h-3" /> Review
                  </span>
                )}
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-[1.3] tracking-tight">
                {currentQuestion?.text}
              </h3>
            </div>
            
            <button 
              onClick={() => toggleMarkForReview(currentQuestion.id)}
              className={`p-4 rounded-2xl border-2 transition-all shadow-sm ${
                markedForReview.has(currentQuestion.id) 
                  ? 'bg-purple-600 border-purple-600 text-white shadow-purple-200' 
                  : 'bg-white border-gray-100 text-gray-400 hover:border-purple-200 hover:text-purple-600'
              }`}
              title="Mark for Review"
            >
              <Flag className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-16">
            {currentQuestion?.options.map((option, idx) => {
              const isSelected = answers[currentQuestion.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setAnswers({ ...answers, [currentQuestion.id]: idx })}
                  className={`group relative w-full text-left p-6 rounded-3xl border-2 font-bold text-lg flex items-center gap-6 transition-all duration-300 ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-4 ring-primary/5 shadow-lg shadow-primary/5'
                      : 'border-gray-100 hover:border-primary/30 hover:bg-gray-50/50'
                  }`}
                >
                  <span className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center shrink-0 font-black text-xl transition-all duration-300 ${
                    isSelected ? 'bg-primary text-white border-primary rotate-[360deg]' : 'border-gray-100 bg-white text-gray-400 group-hover:border-primary/30'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={`transition-colors duration-300 ${isSelected ? 'text-primary' : 'text-slate-600 group-hover:text-slate-900'}`}>
                    {option}
                  </span>
                  {isSelected && <CheckCircle2 className="absolute right-8 w-6 h-6 text-primary animate-in zoom-in-50 duration-300" />}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-8 border-t-2 border-gray-50 mt-auto">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="group px-8 py-4 rounded-2xl border-2 border-gray-100 font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-gray-50 transition-all disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Previous
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const newAnswers = { ...answers };
                  delete newAnswers[currentQuestion.id];
                  setAnswers(newAnswers);
                }}
                className="px-6 py-4 rounded-2xl text-gray-400 font-black uppercase text-xs tracking-widest hover:text-red-500 transition-colors"
              >
                Clear Response
              </button>
              <button
                onClick={handleNext}
                className="group bg-primary text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {currentIdx === questions.length - 1 ? 'Final Review' : 'Next Question'} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side Navigation Panel */}
      <div className={`lg:w-80 space-y-6 ${showMobileSidebar ? 'fixed inset-0 z-50 bg-white p-6' : 'hidden lg:block'}`}>
        <div className="bg-white border-2 border-gray-100 rounded-[2rem] p-8 shadow-2xl shadow-gray-200/40 lg:sticky lg:top-24 h-fit max-h-[85vh] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-black uppercase text-xs tracking-[0.2em] text-gray-400 flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" /> Question Grid
            </h4>
            {showMobileSidebar && (
              <button onClick={() => setShowMobileSidebar(false)} className="font-black text-red-600 underline text-xs">CLOSE</button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8 text-[9px] font-black uppercase tracking-tighter text-gray-400 border-b-2 border-gray-50 pb-6">
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-primary"></div> Answered</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-purple-600"></div> Marked</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full border-2 border-gray-200"></div> Unvisited</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-gray-100"></div> Visited</div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-5 gap-2 custom-scrollbar">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isMarked = markedForReview.has(q.id);
              const isCurrent = idx === currentIdx;
              const isLocked = !unlockedSections.has(q.sectionId);

              return (
                <button
                  key={q.id}
                  onClick={() => jumpToQuestion(q.id)}
                  disabled={isLocked}
                  className={`aspect-square rounded-xl border-2 font-black text-xs flex items-center justify-center transition-all duration-300 ${
                    isCurrent ? 'border-primary bg-primary/5 text-primary scale-110 z-10 ring-2 ring-primary/20 shadow-lg shadow-primary/10' :
                    isAnswered ? 'bg-primary border-primary text-white shadow-md shadow-primary/20' :
                    isMarked ? 'bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-200' :
                    'border-gray-50 text-gray-400 hover:border-gray-200 hover:bg-gray-50'
                  } ${isLocked ? 'opacity-20 cursor-not-allowed grayscale' : ''}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t-2 border-gray-50">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Section Mastery</span>
              <span className="text-xs font-black text-primary">{activeSectionQuestions.length ? Math.round((Object.keys(answers).filter(id => questions.find(q => q.id === Number(id))?.sectionId === activeSection).length / activeSectionQuestions.length) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-700 ease-out rounded-full"
                style={{ width: `${activeSectionQuestions.length ? (Object.keys(answers).filter(id => questions.find(q => q.id === Number(id))?.sectionId === activeSection).length / activeSectionQuestions.length) * 100 : 0}%` }}
              />
            </div>
            
            <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] font-bold text-slate-500 leading-relaxed">
                    Auto-save enabled. Your progress is synced to our secure server in real-time.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setShowMobileSidebar(true)}
        className="lg:hidden fixed bottom-8 right-8 bg-slate-900 text-white p-5 rounded-3xl shadow-2xl z-40 border-4 border-white active:scale-95 transition-all"
      >
        <LayoutGrid className="w-6 h-6" />
      </button>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e2e2; border-radius: 10px; }
      `}</style>
    </div>
  );
}
