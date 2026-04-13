'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Flag, LayoutGrid } from 'lucide-react';
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

  const isSectionComplete = useMemo(() => {
    return activeSectionQuestions.every(q => answers[q.id] !== undefined);
  }, [activeSectionQuestions, answers]);

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      const nextQ = questions[currentIdx + 1];
      if (nextQ.sectionId !== currentQuestion.sectionId) {
        setUnlockedSections(prev => new Set([...prev, nextQ.sectionId]));
        setActiveSection(nextQ.sectionId);
        setCurrentIdx(currentIdx + 1);
      } else {
        setCurrentIdx(currentIdx + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      const prevQ = questions[currentIdx - 1];
      setActiveSection(prevQ.sectionId);
      setCurrentIdx(currentIdx - 1);
    }
  };

  const jumpToQuestion = (id: number) => {
    const qIdx = questions.findIndex(q => q.id === id);
    if (qIdx !== -1) {
      const targetSection = questions[qIdx].sectionId;
      setUnlockedSections(prev => new Set([...prev, targetSection]));
      setCurrentIdx(qIdx);
      setActiveSection(targetSection);
      setShowMobileSidebar(false);
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

  // Helper to determine order of sections
  const sectionIds = config.sections.map(s => s.id);
  const getSectionIndex = (sectionId: string) => sectionIds.indexOf(sectionId);

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      <div className="flex-1 space-y-6">
        <div className="bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-primary p-3 border-4 border-foreground">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-black uppercase text-gray-400">Time Remaining</p>
              <p className={`text-2xl font-black ${timeLeft < 600 ? 'text-red-500 animate-pulse' : 'text-foreground'}`}>
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>
          <button 
            onClick={() => onComplete(answers)}
            className="bg-red-600 text-white px-6 py-2 border-4 border-foreground font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Submit Exam
          </button>
        </div>

        <div className="flex border-4 border-foreground bg-white overflow-x-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {config.sections.map((sec) => (
            <button
              key={sec.id}
              disabled={!unlockedSections.has(sec.id)}
              onClick={() => {
                setActiveSection(sec.id);
                const firstQ = questions.find(q => q.sectionId === sec.id);
                if (firstQ) {
                  const idx = questions.findIndex(q => q.id === firstQ.id);
                  setCurrentIdx(idx);
                }
              }}
              className={`px-6 py-4 font-black uppercase text-sm border-r-4 border-foreground last:border-r-0 transition-all whitespace-nowrap flex items-center gap-2 ${
                activeSection === sec.id 
                  ? 'bg-primary text-white' 
                  : unlockedSections.has(sec.id) 
                    ? 'bg-white hover:bg-gray-50' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              {sec.label}
              {!unlockedSections.has(sec.id) && <Clock className="w-4 h-4" />}
            </button>
          ))}
        </div>

        <div className="bg-white border-4 border-foreground p-8 min-h-[500px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="bg-accent px-4 py-1 border-2 border-foreground font-black text-xs uppercase tracking-widest">
                Question {currentIdx + 1} of {config.totalQuestions}
              </span>
              <h3 className="text-2xl font-black mt-4 leading-tight">
                {currentQuestion?.text}
              </h3>
            </div>
            <button 
              onClick={() => toggleMarkForReview(currentQuestion.id)}
              className={`p-3 border-4 border-foreground transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                markedForReview.has(currentQuestion.id) ? 'bg-purple-600 text-white' : 'bg-white text-gray-400 hover:text-purple-600'
              }`}
            >
              <Flag className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4 mb-12">
            {currentQuestion?.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setAnswers({ ...answers, [currentQuestion.id]: idx })}
                className={`w-full text-left p-6 border-4 font-bold text-lg flex items-center gap-6 transition-all ${
                  answers[currentQuestion.id] === idx
                    ? 'border-primary bg-primary/5 shadow-[8px_8px_0px_0px_rgba(var(--primary-rgb),0.2)]'
                    : 'border-foreground hover:bg-gray-50'
                }`}
              >
                <span className={`w-10 h-10 border-4 flex items-center justify-center shrink-0 font-black ${
                  answers[currentQuestion.id] === idx ? 'bg-primary text-white border-primary' : 'border-foreground bg-white'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center bg-gray-50 -mx-8 -mb-8 p-8 border-t-4 border-foreground">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-8 py-3 border-4 border-foreground font-black uppercase flex items-center gap-2 hover:bg-white transition-all disabled:opacity-30 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>
            <div className="flex gap-4">
              <button
                onClick={handleNext}
                className="bg-primary text-white px-10 py-3 border-4 border-foreground font-black uppercase flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                {currentIdx === questions.length - 1 ? 'Finish Test' : 'Next Question'} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`lg:w-80 space-y-6 ${showMobileSidebar ? 'fixed inset-0 z-50 bg-white p-6' : 'hidden lg:block'}`}>
        <div className="bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:sticky lg:top-24">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-black uppercase flex items-center gap-2">
              <LayoutGrid className="w-5 h-5" /> Navigation
            </h4>
            {showMobileSidebar && (
              <button onClick={() => setShowMobileSidebar(false)} className="font-black text-red-600 underline">CLOSE</button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mb-8 text-[10px] font-black uppercase tracking-tighter text-gray-500">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary"></div> Answered</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-600"></div> Marked</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-foreground"></div> Unvisited</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-200"></div> Visited</div>
          </div>

          <div className="max-h-[500px] overflow-y-auto pr-2 grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const status = answers[q.id] !== undefined ? 'answered' : markedForReview.has(q.id) ? 'marked' : idx === currentIdx ? 'current' : 'unvisited';
              const isLocked = !unlockedSections.has(q.sectionId);

              return (
                <button
                  key={q.id}
                  onClick={() => jumpToQuestion(q.id)}
                  disabled={isLocked}
                  className={`aspect-square border-2 font-black text-xs flex items-center justify-center transition-all ${
                    status === 'answered' ? 'bg-primary text-white border-primary' :
                    status === 'marked' ? 'bg-purple-600 text-white border-purple-600' :
                    status === 'current' ? 'border-primary border-4 text-primary scale-110 z-10' :
                    'border-foreground hover:bg-gray-100'
                  } ${isLocked ? 'opacity-20 cursor-not-allowed' : ''}`}
                >
                  {q.id}
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t-2 border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black uppercase text-gray-400">Section Progress</span>
              <span className="text-sm font-black">{activeSectionQuestions.length ? Math.round((Object.keys(answers).filter(id => questions.find(q => q.id === Number(id))?.sectionId === activeSection).length / activeSectionQuestions.length) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2">
              <div 
                className="bg-primary h-full transition-all duration-500"
                style={{ width: `${activeSectionQuestions.length ? (Object.keys(answers).filter(id => questions.find(q => q.id === Number(id))?.sectionId === activeSection).length / activeSectionQuestions.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setShowMobileSidebar(true)}
        className="lg:hidden fixed bottom-6 right-6 bg-foreground text-white p-4 rounded-full shadow-2xl z-40 border-4 border-white"
      >
        <LayoutGrid className="w-6 h-6" />
      </button>
    </div>
  );
}
