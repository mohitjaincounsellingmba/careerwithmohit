'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  BookOpen, 
  Sparkles, 
  PenTool,
  Headphones,
  Check,
  Award,
  Layers,
  BarChart2,
  Info
} from 'lucide-react';
import { 
  IELTS_MOCK_TEST_80, 
  IELTS_WRITING_TASKS, 
  IeltsQuestion, 
  IeltsWritingTask 
} from '@/data/ielts_mock_test_80';
import { GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';

export type IeltsUserAnswers = Record<number, number>; // qId -> optionIndex (0-3)
export type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked' | 'answered_marked';
export type IeltsActiveSection = 'listening' | 'reading' | 'writing';

export interface IeltsExamInterfaceProps {
  student: GenericStudentInfo;
  onComplete: (answers: IeltsUserAnswers, writingAnswers: Record<string, string>) => void;
  initialSection?: IeltsActiveSection;
}

export function IeltsExamInterface({ 
  student, 
  onComplete, 
  initialSection = 'listening' 
}: IeltsExamInterfaceProps) {
  // Active state
  const [activeSection, setActiveSection] = useState<IeltsActiveSection>(initialSection);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [activeWritingTaskId, setActiveWritingTaskId] = useState<'task1-academic' | 'task1-gt' | 'task2'>('task1-academic');

  // Answers & review states
  const [answers, setAnswers] = useState<IeltsUserAnswers>({});
  const [writingAnswers, setWritingAnswers] = useState<Record<string, string>>({
    'task1-academic': '',
    'task1-gt': '',
    'task2': ''
  });
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([1]));

  // Section Timers: Listening (30m), Reading (60m), Writing (60m) - Total: 150m (9000s)
  const [timeLeft, setTimeLeft] = useState<number>(150 * 60);

  // Audio Speech Simulation State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Modals
  const [isQuestionPaperOpen, setIsQuestionPaperOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);

  // Current Question
  const currentQuestion = useMemo(() => {
    return IELTS_MOCK_TEST_80.find(q => q.id === currentQuestionId) || IELTS_MOCK_TEST_80[0];
  }, [currentQuestionId]);

  // Current Writing Task
  const currentWritingTask = useMemo(() => {
    return IELTS_WRITING_TASKS.find(t => t.id === activeWritingTaskId) || IELTS_WRITING_TASKS[0];
  }, [activeWritingTaskId]);

  // Questions grouped by section
  const sectionQuestions = useMemo(() => {
    return {
      listening: IELTS_MOCK_TEST_80.filter(q => q.section === 'listening'),
      reading: IELTS_MOCK_TEST_80.filter(q => q.section === 'reading')
    };
  }, []);

  // Timer Tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(answers, writingAnswers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, writingAnswers, onComplete]);

  // Stop speech when switching questions/sections or unmounting
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [currentQuestionId, activeSection]);

  // Speech Synthesizer for IELTS Audio Script
  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Audio playback is not supported on this browser. You can read the official script on the left.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const script = currentQuestion.transcriptOrPassage;
    if (!script) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;
    
    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en-GB')) || voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

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
    const targetQ = IELTS_MOCK_TEST_80.find(q => q.id === qId);
    if (targetQ) {
      if (targetQ.section !== activeSection) {
        setActiveSection(targetQ.section);
      }
      setCurrentQuestionId(qId);
      setVisitedQuestions(prev => new Set(prev).add(qId));
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionId]: optionIndex
    }));
  };

  const handleClearResponse = () => {
    setAnswers(prev => {
      const next = { ...prev };
      delete next[currentQuestionId];
      return next;
    });
  };

  const handleToggleMarkForReview = () => {
    setMarkedForReview(prev => {
      const next = new Set(prev);
      if (next.has(currentQuestionId)) {
        next.delete(currentQuestionId);
      } else {
        next.add(currentQuestionId);
      }
      return next;
    });
  };

  const handleSaveAndNext = () => {
    const currentList = sectionQuestions[activeSection as 'listening' | 'reading'] || [];
    const currentIndex = currentList.findIndex(q => q.id === currentQuestionId);
    
    if (currentIndex < currentList.length - 1) {
      const nextQ = currentList[currentIndex + 1];
      setCurrentQuestionId(nextQ.id);
      setVisitedQuestions(prev => new Set(prev).add(nextQ.id));
    } else {
      // End of section: prompt next section
      if (activeSection === 'listening') {
        setActiveSection('reading');
        setCurrentQuestionId(41);
        setVisitedQuestions(prev => new Set(prev).add(41));
      } else if (activeSection === 'reading') {
        setActiveSection('writing');
      }
    }
  };

  const handlePrev = () => {
    const currentList = sectionQuestions[activeSection as 'listening' | 'reading'] || [];
    const currentIndex = currentList.findIndex(q => q.id === currentQuestionId);
    if (currentIndex > 0) {
      const prevQ = currentList[currentIndex - 1];
      setCurrentQuestionId(prevQ.id);
      setVisitedQuestions(prev => new Set(prev).add(prevQ.id));
    }
  };

  // Section Switcher
  const handleSectionTabClick = (sectionKey: IeltsActiveSection) => {
    setActiveSection(sectionKey);
    if (sectionKey === 'listening') {
      setCurrentQuestionId(1);
      setVisitedQuestions(prev => new Set(prev).add(1));
    } else if (sectionKey === 'reading') {
      setCurrentQuestionId(41);
      setVisitedQuestions(prev => new Set(prev).add(41));
    }
  };

  // Count words in writing task
  const getWordCount = (text: string): number => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  // Palette counts
  const currentSectionQuestions = activeSection !== 'writing' ? sectionQuestions[activeSection] : [];
  const answeredCount = currentSectionQuestions.filter(q => answers[q.id] !== undefined).length;
  const markedCount = currentSectionQuestions.filter(q => markedForReview.has(q.id)).length;
  const notAnsweredCount = currentSectionQuestions.filter(q => visitedQuestions.has(q.id) && answers[q.id] === undefined).length;
  const notVisitedCount = currentSectionQuestions.filter(q => !visitedQuestions.has(q.id)).length;

  const formatTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-slate-100 text-slate-900 min-h-screen flex flex-col font-sans select-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden">
      
      {/* 1. TOP OFFICIAL IELTS CBT HEADER */}
      <header className="bg-slate-900 text-white px-4 py-3 border-b-4 border-foreground flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        
        {/* Left: Branding & Candidate Profile */}
        <div className="flex items-center gap-3">
          <div className="bg-rose-600 text-white p-2 rounded-lg font-black tracking-wider text-sm flex items-center gap-1.5 shadow-sm">
            <Award className="w-5 h-5" />
            <span>IELTS OFFICIAL CBT</span>
          </div>
          <div className="hidden sm:block border-l-2 border-slate-700 pl-3">
            <p className="text-xs text-slate-300 font-medium">Candidate: <strong className="text-white font-bold">{student.name || 'Registered Candidate'}</strong></p>
            <p className="text-[10px] text-slate-400 font-mono">ID: IELTS-2026-{student.phone ? student.phone.slice(-4) : '8892'} • Module: Academic</p>
          </div>
        </div>

        {/* Center: Module Selection Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => handleSectionTabClick('listening')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSection === 'listening' 
                ? 'bg-rose-600 text-white shadow' 
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Listening (40 Qs)</span>
          </button>

          <button
            onClick={() => handleSectionTabClick('reading')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSection === 'reading' 
                ? 'bg-rose-600 text-white shadow' 
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Reading (40 Qs)</span>
          </button>

          <button
            onClick={() => handleSectionTabClick('writing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSection === 'writing' 
                ? 'bg-rose-600 text-white shadow' 
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Writing (2 Tasks)</span>
          </button>
        </div>

        {/* Right: Timer, Question Paper & Instructions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <Clock className={`w-4 h-4 ${timeLeft < 600 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`} />
            <span className={`font-mono text-sm font-black ${timeLeft < 600 ? 'text-red-400' : 'text-white'}`}>
              {formatTimer(timeLeft)}
            </span>
          </div>

          <button
            onClick={() => setIsQuestionPaperOpen(true)}
            className="hidden md:flex items-center gap-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Question Paper</span>
          </button>

          <button
            onClick={() => setIsInstructionsOpen(true)}
            className="hidden md:flex items-center gap-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Instructions</span>
          </button>

          <button
            onClick={() => setIsMobilePaletteOpen(!isMobilePaletteOpen)}
            className="lg:hidden p-1.5 bg-slate-800 rounded-lg text-slate-300 border border-slate-700"
            title="Question Palette"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN SPLIT TESTING WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* ========================================================= */}
        {/* WRITING MODULE VIEW */}
        {/* ========================================================= */}
        {activeSection === 'writing' ? (
          <div className="flex-1 flex flex-col lg:flex-row p-4 md:p-6 gap-6 bg-slate-50 overflow-y-auto">
            
            {/* Left Column: Writing Task Selector & Prompt */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              
              {/* Task Tabs */}
              <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border-2 border-slate-200 shadow-sm">
                {IELTS_WRITING_TASKS.map(task => (
                  <button
                    key={task.id}
                    onClick={() => setActiveWritingTaskId(task.id)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                      activeWritingTaskId === task.id
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>{task.type}</div>
                    <div className="text-[10px] opacity-80">{task.timeMinutes} Mins • Min {task.minWords} words</div>
                  </button>
                ))}
              </div>

              {/* Task Prompt Card */}
              <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                    <span className="bg-rose-100 text-rose-800 text-xs font-black uppercase px-3 py-1 rounded-full">
                      {currentWritingTask.type}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-rose-500" /> Target: {currentWritingTask.timeMinutes} Mins
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900">{currentWritingTask.title}</h2>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 text-sm leading-relaxed whitespace-pre-line font-serif">
                    {currentWritingTask.prompt}
                  </div>

                  {/* Task 1 Graphic Illustration representation for Academic */}
                  {currentWritingTask.id === 'task1-academic' && (
                    <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                      <h4 className="text-xs font-black uppercase tracking-wider text-rose-900 mb-2 flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-rose-600" /> Renewable Energy Investment Data ($ Millions - 2025)
                      </h4>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 bg-white rounded-xl border border-rose-200">
                          <strong className="block text-slate-900 font-extrabold">Asia-Pacific</strong>
                          <span className="text-rose-600 font-bold">Solar: $180M</span><br />
                          <span className="text-slate-600">Wind: $115M</span><br />
                          <span className="text-slate-600">Hydro: $65M</span>
                        </div>
                        <div className="p-2 bg-white rounded-xl border border-rose-200">
                          <strong className="block text-slate-900 font-extrabold">Europe</strong>
                          <span className="text-rose-600 font-bold">Solar: $140M</span><br />
                          <span className="text-slate-600">Wind: $125M</span><br />
                          <span className="text-slate-600">Hydro: $40M</span>
                        </div>
                        <div className="p-2 bg-white rounded-xl border border-rose-200">
                          <strong className="block text-slate-900 font-extrabold">North America</strong>
                          <span className="text-rose-600 font-bold">Solar: $110M</span><br />
                          <span className="text-slate-600">Wind: $85M</span><br />
                          <span className="text-slate-600">Hydro: $45M</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* IELTS Band Rubric Tips */}
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-amber-900 text-xs">
                    <h5 className="font-extrabold mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" /> IELTS Band 9 Scoring Focus:
                    </h5>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {currentWritingTask.keyAssessmentCriteria.map((c, i) => (
                        <li key={i}><strong>{c.title}:</strong> {c.description}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                  Tip: Auto-saves as you type. Real Band 9 model solutions are included in the results review!
                </div>
              </div>
            </div>

            {/* Right Column: Writing Input Canvas & Word Count */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Candidate Response Arena
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${
                      getWordCount(writingAnswers[activeWritingTaskId]) >= currentWritingTask.minWords
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {getWordCount(writingAnswers[activeWritingTaskId])} / {currentWritingTask.minWords} Words
                    </span>
                  </div>
                </div>

                <textarea
                  value={writingAnswers[activeWritingTaskId]}
                  onChange={(e) => {
                    const text = e.target.value;
                    setWritingAnswers(prev => ({
                      ...prev,
                      [activeWritingTaskId]: text
                    }));
                  }}
                  placeholder={`Begin your ${currentWritingTask.type} response here...\nMake sure to write at least ${currentWritingTask.minWords} words.`}
                  className="flex-1 w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-slate-800 font-mono text-sm leading-relaxed resize-none min-h-[350px] bg-slate-50/50"
                />

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>Characters: {writingAnswers[activeWritingTaskId].length}</span>
                  <button
                    onClick={() => {
                      if (activeWritingTaskId === 'task1-academic') setActiveWritingTaskId('task2');
                      else if (activeWritingTaskId === 'task2') setIsSubmitModalOpen(true);
                      else setActiveWritingTaskId('task2');
                    }}
                    className="px-4 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all flex items-center gap-1.5 shadow"
                  >
                    <span>{activeWritingTaskId === 'task2' ? 'Review & Submit Test' : 'Next Task'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* LISTENING & READING CBT SPLIT VIEW */
          /* ========================================================= */
          <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
            
            {/* Left Pane: Audio Transcript or Reading Passage */}
            <div className="w-full lg:w-1/2 p-4 md:p-6 bg-white border-b-4 lg:border-b-0 lg:border-r-4 border-slate-200 overflow-y-auto max-h-[45vh] lg:max-h-[calc(100vh-140px)]">
              <div className="space-y-4">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                    {currentQuestion.partTitle}
                  </span>

                  {activeSection === 'listening' && (
                    <button
                      onClick={handleToggleAudio}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm border ${
                        isPlayingAudio 
                          ? 'bg-amber-500 text-slate-950 border-amber-600 animate-pulse' 
                          : 'bg-rose-600 text-white border-rose-700 hover:bg-rose-700'
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause Audio Narration</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play Audio Track</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Audio Waves Indicator when playing */}
                {activeSection === 'listening' && isPlayingAudio && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
                      <Volume2 className="w-4 h-4 text-rose-600 animate-bounce" />
                      <span>Simulating IELTS Audio Track (English Voice)...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-3 bg-rose-500 rounded animate-pulse" />
                      <span className="w-1 h-5 bg-rose-600 rounded animate-pulse delay-75" />
                      <span className="w-1 h-2 bg-rose-400 rounded animate-pulse delay-150" />
                      <span className="w-1 h-4 bg-rose-700 rounded animate-pulse delay-100" />
                    </div>
                  </div>
                )}

                {/* Passage / Transcript Text */}
                <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 text-slate-800 text-sm leading-relaxed whitespace-pre-line font-serif shadow-inner">
                  {currentQuestion.transcriptOrPassage || 'No reading passage required for this question.'}
                </div>

                {activeSection === 'listening' && (
                  <p className="text-xs text-slate-400 italic">
                    Note: In the official IELTS exam, listening audio tracks are played once. You may listen or read the verified transcript provided here.
                  </p>
                )}
              </div>
            </div>

            {/* Right Pane: Question & Interactive Options */}
            <div className="w-full lg:w-1/2 p-4 md:p-6 bg-slate-50 flex flex-col justify-between overflow-y-auto max-h-[55vh] lg:max-h-[calc(100vh-140px)]">
              <div className="space-y-6">
                
                {/* Question Info Bar */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase px-2.5 py-1 bg-rose-600 text-white rounded-lg">
                      Question {currentQuestion.questionNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase px-2 py-0.5 bg-slate-200 rounded">
                      {currentQuestion.questionType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <span className="text-emerald-600">+1.0 Mark</span>
                    <span>•</span>
                    <span className="text-slate-400">0.0 Negative</span>
                  </div>
                </div>

                {/* Question Stem */}
                <div className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                  {currentQuestion.questionText}
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQuestion.options.map((optionText, optIdx) => {
                    const isSelected = answers[currentQuestionId] === optIdx;
                    const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-rose-50 border-rose-600 shadow-md transform -translate-y-0.5'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}>
                          {letter}
                        </span>
                        <span className={`text-sm font-semibold pt-0.5 ${isSelected ? 'text-rose-950 font-bold' : 'text-slate-800'}`}>
                          {optionText}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMarkForReview}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border-2 ${
                      markedForReview.has(currentQuestionId)
                        ? 'bg-purple-600 text-white border-purple-700'
                        : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{markedForReview.has(currentQuestionId) ? 'Marked' : 'Mark for Review'}</span>
                  </button>

                  <button
                    onClick={handleClearResponse}
                    disabled={answers[currentQuestionId] === undefined}
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-white text-slate-600 border-2 border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Clear Response
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionId === 1 || currentQuestionId === 41}
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <button
                    onClick={handleSaveAndNext}
                    className="px-5 py-2 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white transition-all shadow flex items-center gap-1.5"
                  >
                    <span>Save & Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* RIGHT PALETTE (DESKTOP & MOBILE DRAWER) */}
        {/* ========================================================= */}
        {activeSection !== 'writing' && (
          <aside className={`
            lg:w-80 bg-white border-t-4 lg:border-t-0 lg:border-l-4 border-slate-200 p-4 flex flex-col justify-between
            ${isMobilePaletteOpen ? 'fixed inset-0 z-50 overflow-y-auto' : 'hidden lg:flex'}
          `}>
            <div>
              {/* Palette Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100 mb-4">
                <h3 className="font-black text-sm uppercase tracking-wider text-slate-900">
                  {activeSection === 'listening' ? 'Listening Module' : 'Reading Module'} Palette
                </h3>
                {isMobilePaletteOpen && (
                  <button onClick={() => setIsMobilePaletteOpen(false)} className="p-1 rounded-lg bg-slate-100">
                    <X className="w-5 h-5 text-slate-700" />
                  </button>
                )}
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold">✓</span>
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">!</span>
                  <span>Not Answered ({notAnsweredCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-purple-600 text-white text-[9px] flex items-center justify-center font-bold">•</span>
                  <span>Review ({markedCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-slate-200 text-slate-600 text-[9px] flex items-center justify-center font-bold">-</span>
                  <span>Not Visited ({notVisitedCount})</span>
                </div>
              </div>

              {/* Question Palette Buttons Grid */}
              <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto p-1">
                {currentSectionQuestions.map(q => {
                  const status = getQuestionStatus(q.id);
                  const isCurrent = q.id === currentQuestionId;

                  let bgClass = 'bg-slate-100 text-slate-700 border-slate-200';
                  if (status === 'answered') bgClass = 'bg-emerald-600 text-white border-emerald-700 font-black';
                  else if (status === 'not_answered') bgClass = 'bg-rose-500 text-white border-rose-600 font-black';
                  else if (status === 'marked') bgClass = 'bg-purple-600 text-white border-purple-700 font-black';
                  else if (status === 'answered_marked') bgClass = 'bg-purple-700 text-white border-purple-900 font-black ring-2 ring-emerald-400';

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        handleSelectQuestion(q.id);
                        setIsMobilePaletteOpen(false);
                      }}
                      className={`h-9 rounded-xl text-xs font-bold transition-all border flex items-center justify-center ${bgClass} ${
                        isCurrent ? 'ring-4 ring-rose-500 scale-105 shadow-md' : 'hover:opacity-90'
                      }`}
                    >
                      {q.questionNumber}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Submit Test Button */}
            <div className="mt-6 pt-4 border-t-2 border-slate-100">
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Exam & Get Band Score</span>
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* 3. MODALS */}

      {/* QUESTION PAPER MODAL */}
      {isQuestionPaperOpen && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden border-4 border-slate-900 shadow-2xl">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-base uppercase">
                <FileText className="w-5 h-5 text-rose-400" />
                <span>Official IELTS Question Paper View</span>
              </div>
              <button onClick={() => setIsQuestionPaperOpen(false)} className="p-1 rounded-lg hover:bg-slate-800">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              {currentSectionQuestions.map(q => (
                <div key={q.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-xs font-bold text-rose-600 mb-1">
                    Q{q.questionNumber} ({q.questionType}) • {q.partTitle}
                  </div>
                  <div className="font-bold text-slate-900 mb-2">{q.questionText}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, i) => (
                      <div key={i} className="p-2 bg-white rounded-lg border border-slate-200">
                        <strong>{String.fromCharCode(65 + i)}:</strong> {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL INSTRUCTIONS MODAL */}
      {isInstructionsOpen && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 border-4 border-slate-900 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-500" /> Official IELTS CBT Guidelines
              </h3>
              <button onClick={() => setIsInstructionsOpen(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed max-h-[60vh] overflow-y-auto">
              <p><strong>1. Structure:</strong> The test consists of Listening (40 Questions, 30 Mins), Reading (40 Questions, 60 Mins), and Writing (2 Tasks, 60 Mins).</p>
              <p><strong>2. Scoring:</strong> No negative marking for incorrect answers in Listening & Reading. Every correct answer earns 1 raw mark, which is scaled onto the 0–9.0 IELTS Band Score.</p>
              <p><strong>3. Writing Tasks:</strong> Task 1 requires a minimum of 150 words (20 mins); Task 2 requires a minimum of 250 words (40 mins).</p>
              <p><strong>4. Study Abroad Band Target:</strong> Aim for Band 7.0+ for top universities in the US, UK, Canada, Australia, and Singapore.</p>
            </div>
            <button
              onClick={() => setIsInstructionsOpen(false)}
              className="w-full py-2.5 bg-rose-600 text-white font-bold rounded-xl"
            >
              Back to Exam
            </button>
          </div>
        </div>
      )}

      {/* SUBMIT CONFIRMATION MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border-4 border-slate-900 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Confirm IELTS Test Submission?</h3>
              <p className="text-xs text-slate-500">
                Your answers will be evaluated instantaneously using official IELTS 0–9.0 band conversion metrics.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">Listening Attempted:</span>
                <strong className="text-base font-black text-rose-600">
                  {IELTS_MOCK_TEST_80.filter(q => q.section === 'listening' && answers[q.id] !== undefined).length} / 40
                </strong>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">Reading Attempted:</span>
                <strong className="text-base font-black text-rose-600">
                  {IELTS_MOCK_TEST_80.filter(q => q.section === 'reading' && answers[q.id] !== undefined).length} / 40
                </strong>
              </div>
              <div className="col-span-2 p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">Writing Tasks Attempted:</span>
                <strong className="text-sm font-black text-slate-800">
                  Task 1: {getWordCount(writingAnswers['task1-academic'] || writingAnswers['task1-gt'])} words • Task 2: {getWordCount(writingAnswers['task2'])} words
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
              >
                Resume Test
              </button>
              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  onComplete(answers, writingAnswers);
                }}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow"
              >
                Yes, Final Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
