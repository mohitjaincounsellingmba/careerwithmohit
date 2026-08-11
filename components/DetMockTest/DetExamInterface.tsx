'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Clock, 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  X, 
  Sparkles, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft,
  Camera,
  Mic,
  FileText,
  BookOpen,
  Image as ImageIcon,
  Check,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  DET_MOCK_TEST_QUESTIONS, 
  DET_WRITING_SPEAKING_SAMPLES,
  DetAdaptiveQuestion,
  DetReadAndSelectQuestion,
  DetReadAndCompleteQuestion,
  DetListenAndTypeQuestion,
  DetWriteAboutPhotoQuestion,
  DetInteractiveReadingQuestion
} from '@/data/det_mock_test_23';
import { GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';

export interface DetUserAnswers {
  // Read and Select: qId -> array of selected word indices
  readAndSelect: Record<number, number[]>;
  // Read and Complete: qId -> array of user typed strings for each blank
  readAndComplete: Record<number, string[]>;
  // Listen and Type: qId -> user typed text
  listenAndType: Record<number, string>;
  // Write About Photo: qId -> user written text
  writeAboutPhoto: Record<number, string>;
  // Interactive Reading: qId -> selected option index (0-3)
  interactiveReading: Record<number, number>;
  // Samples
  writingSample: string;
  speakingSampleNotes: string;
}

interface DetExamInterfaceProps {
  student: GenericStudentInfo;
  onComplete: (answers: DetUserAnswers) => void;
}

export function DetExamInterface({ student, onComplete }: DetExamInterfaceProps) {
  // Active Question Index (0 to 22 for adaptive questions, 23 for Writing Sample, 24 for Speaking Sample)
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  // User Responses State
  const [answers, setAnswers] = useState<DetUserAnswers>({
    readAndSelect: {},
    readAndComplete: {},
    listenAndType: {},
    writeAboutPhoto: {},
    interactiveReading: {},
    writingSample: '',
    speakingSampleNotes: ''
  });

  // Timer: 60 Minutes (3,600s)
  const [timeLeft, setTimeLeft] = useState<number>(60 * 60);

  // Audio Playback Simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlaysLeft, setAudioPlaysLeft] = useState<Record<number, number>>({});

  // Modals
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  // Total items: 23 adaptive questions + 2 sample tasks = 25 steps
  const totalSteps = 25;
  const isSampleSection = currentIdx >= 23;
  const activeQuestion = currentIdx < 23 ? DET_MOCK_TEST_QUESTIONS[currentIdx] : null;
  const activeSample = currentIdx === 23 ? DET_WRITING_SPEAKING_SAMPLES[0] : currentIdx === 24 ? DET_WRITING_SPEAKING_SAMPLES[1] : null;

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

  // Cancel any running speech when switching questions
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [currentIdx]);

  // Audio Speech Synthesizer for Dictation
  const handlePlayDictation = (text: string, qId: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Audio not supported on this browser.');
      return;
    }

    const currentPlays = audioPlaysLeft[qId] ?? 3;
    if (currentPlays <= 0) {
      alert('You have used all 3 replays for this dictation item.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en-US')) || voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setAudioPlaysLeft(prev => ({ ...prev, [qId]: currentPlays - 1 }));
  };

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Helper Handlers
  const handleToggleWord = (qId: number, wordIdx: number) => {
    setAnswers(prev => {
      const selected = prev.readAndSelect[qId] || [];
      const updated = selected.includes(wordIdx)
        ? selected.filter(i => i !== wordIdx)
        : [...selected, wordIdx];
      return {
        ...prev,
        readAndSelect: { ...prev.readAndSelect, [qId]: updated }
      };
    });
  };

  const handleBlankChange = (qId: number, blankIdx: number, val: string) => {
    setAnswers(prev => {
      const currentList = prev.readAndComplete[qId] ? [...prev.readAndComplete[qId]] : [];
      currentList[blankIdx] = val;
      return {
        ...prev,
        readAndComplete: { ...prev.readAndComplete, [qId]: currentList }
      };
    });
  };

  const handleNext = () => {
    if (currentIdx < totalSteps - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsSubmitModalOpen(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getWordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  return (
    <div className="w-full bg-slate-900 text-white min-h-[750px] flex flex-col font-sans rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(34,197,94,1)] overflow-hidden relative">
      
      {/* 1. DUOLINGO CBT TOP HEADER */}
      <header className="bg-slate-950 px-6 py-4 border-b-2 border-slate-800 flex items-center justify-between gap-4 sticky top-0 z-30">
        
        {/* Left: Branding & Candidate */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 text-slate-950 p-2.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg">
            <Award className="w-5 h-5" />
            <span className="tracking-wide">DET OFFICIAL CBT</span>
          </div>
          <div className="hidden sm:block pl-2 border-l border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Candidate: <strong className="text-white font-bold">{student.name || 'Candidate'}</strong></span>
            <span className="text-[10px] text-slate-500 font-mono">Subscores: Literacy • Comprehension • Conversation • Production</span>
          </div>
        </div>

        {/* Center: Progress Bar */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-4 hidden md:block">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1.5">
            <span>Progress ({currentIdx + 1} of {totalSteps})</span>
            <span className="text-emerald-400 font-black">{Math.round(((currentIdx + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentIdx + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Right: Timer & Submit */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
            <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`} />
            <span className={`font-mono text-sm font-black ${timeLeft < 300 ? 'text-rose-400' : 'text-white'}`}>
              {formatTimer(timeLeft)}
            </span>
          </div>

          <button
            onClick={() => setIsInstructionsOpen(true)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Instructions"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. ADAPTIVE TESTING INTERACTION ARENA */}
      <main className="flex-1 p-6 md:p-10 flex flex-col justify-between max-w-4xl mx-auto w-full">
        
        {/* TASK CONTENT SECTION */}
        <div className="space-y-6 flex-1 flex flex-col justify-center">
          
          {/* ========================================================================= */}
          {/* TASK 1: READ AND SELECT */}
          {/* ========================================================================= */}
          {activeQuestion && activeQuestion.type === 'read_and_select' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center space-y-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {activeQuestion.taskTitle}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  {activeQuestion.questionText}
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Click on all the real English words in the grid below. Non-words should be left unselected.
                </p>
              </div>

              {/* Interactive Word Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {activeQuestion.words.map((w, idx) => {
                  const selectedIndices = answers.readAndSelect[activeQuestion.id] || [];
                  const isSelected = selectedIndices.includes(idx);

                  return (
                    <button
                      key={idx}
                      onClick={() => handleToggleWord(activeQuestion.id, idx)}
                      className={`p-5 rounded-2xl border-2 text-base font-extrabold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-105'
                          : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                      }`}
                    >
                      <span>{w.word}</span>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border ${
                        isSelected ? 'bg-slate-950 text-emerald-400 border-slate-950' : 'border-slate-600 text-transparent'
                      }`}>
                        ✓
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TASK 2: READ AND COMPLETE (C-TEST) */}
          {/* ========================================================================= */}
          {activeQuestion && activeQuestion.type === 'read_and_complete' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center space-y-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {activeQuestion.taskTitle}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Type the missing letters to complete the text below
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Each blank shows the beginning of a word. Type the remaining letters to form grammatically correct words.
                </p>
              </div>

              {/* Interactive Passage Fill Cards */}
              <div className="p-8 bg-slate-800/70 rounded-3xl border-2 border-slate-700 text-slate-200 text-lg leading-relaxed font-serif shadow-inner max-w-3xl mx-auto">
                <div className="space-y-4">
                  <p className="leading-loose">
                    {activeQuestion.id === 6 && (
                      <>
                        In today's fast-paced digital economy, the con
                        <input
                          type="text"
                          maxLength={4}
                          value={(answers.readAndComplete[6] || [])[0] || ''}
                          onChange={(e) => handleBlankChange(6, 0, e.target.value)}
                          placeholder="____"
                          className="w-16 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none focus:bg-slate-950 focus:border-emerald-300"
                        />
                        of "deep work" has emerged as a cri
                        <input
                          type="text"
                          maxLength={5}
                          value={(answers.readAndComplete[6] || [])[1] || ''}
                          onChange={(e) => handleBlankChange(6, 1, e.target.value)}
                          placeholder="____"
                          className="w-16 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none focus:bg-slate-950 focus:border-emerald-300"
                        />
                        competitive advantage. It all
                        <input
                          type="text"
                          maxLength={3}
                          value={(answers.readAndComplete[6] || [])[2] || ''}
                          onChange={(e) => handleBlankChange(6, 2, e.target.value)}
                          placeholder="___"
                          className="w-14 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none focus:bg-slate-950 focus:border-emerald-300"
                        />
                        individuals to qu
                        <input
                          type="text"
                          maxLength={4}
                          value={(answers.readAndComplete[6] || [])[3] || ''}
                          onChange={(e) => handleBlankChange(6, 3, e.target.value)}
                          placeholder="____"
                          className="w-16 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none focus:bg-slate-950 focus:border-emerald-300"
                        />
                        master complicated information and prod
                        <input
                          type="text"
                          maxLength={3}
                          value={(answers.readAndComplete[6] || [])[4] || ''}
                          onChange={(e) => handleBlankChange(6, 4, e.target.value)}
                          placeholder="___"
                          className="w-14 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none focus:bg-slate-950 focus:border-emerald-300"
                        />
                        better results in less time.
                      </>
                    )}

                    {activeQuestion.id === 7 && (
                      <>
                        Modern deep-learning architectures pri
                        <input
                          type="text"
                          maxLength={7}
                          value={(answers.readAndComplete[7] || [])[0] || ''}
                          onChange={(e) => handleBlankChange(7, 0, e.target.value)}
                          placeholder="______"
                          className="w-20 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        predictive accuracy at the ex
                        <input
                          type="text"
                          maxLength={5}
                          value={(answers.readAndComplete[7] || [])[1] || ''}
                          onChange={(e) => handleBlankChange(7, 1, e.target.value)}
                          placeholder="____"
                          className="w-16 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        of causal transparency. When an algo
                        <input
                          type="text"
                          maxLength={5}
                          value={(answers.readAndComplete[7] || [])[2] || ''}
                          onChange={(e) => handleBlankChange(7, 2, e.target.value)}
                          placeholder="____"
                          className="w-16 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        forecasts complex climate shifts without pro
                        <input
                          type="text"
                          maxLength={6}
                          value={(answers.readAndComplete[7] || [])[3] || ''}
                          onChange={(e) => handleBlankChange(7, 3, e.target.value)}
                          placeholder="_____"
                          className="w-18 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        an intelligible narrative, the traditional link is sev
                        <input
                          type="text"
                          maxLength={4}
                          value={(answers.readAndComplete[7] || [])[4] || ''}
                          onChange={(e) => handleBlankChange(7, 4, e.target.value)}
                          placeholder="___"
                          className="w-14 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        .
                      </>
                    )}

                    {activeQuestion.id === 8 && (
                      <>
                        The agrarian revolution fun
                        <input
                          type="text"
                          maxLength={9}
                          value={(answers.readAndComplete[8] || [])[0] || ''}
                          onChange={(e) => handleBlankChange(8, 0, e.target.value)}
                          placeholder="________"
                          className="w-24 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        reshaped human social hierarchies. Hunter-gatherer comm
                        <input
                          type="text"
                          maxLength={7}
                          value={(answers.readAndComplete[8] || [])[1] || ''}
                          onChange={(e) => handleBlankChange(8, 1, e.target.value)}
                          placeholder="______"
                          className="w-20 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        maintained egalitarian structures due to nom
                        <input
                          type="text"
                          maxLength={5}
                          value={(answers.readAndComplete[8] || [])[2] || ''}
                          onChange={(e) => handleBlankChange(8, 2, e.target.value)}
                          placeholder="____"
                          className="w-16 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        and the impossibility of as
                        <input
                          type="text"
                          maxLength={3}
                          value={(answers.readAndComplete[8] || [])[3] || ''}
                          onChange={(e) => handleBlankChange(8, 3, e.target.value)}
                          placeholder="__"
                          className="w-12 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        accumulation.
                      </>
                    )}

                    {activeQuestion.id === 9 && (
                      <>
                        Default options cap
                        <input
                          type="text"
                          maxLength={7}
                          value={(answers.readAndComplete[9] || [])[0] || ''}
                          onChange={(e) => handleBlankChange(9, 0, e.target.value)}
                          placeholder="______"
                          className="w-20 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        on status quo bias; by pre-sel
                        <input
                          type="text"
                          maxLength={6}
                          value={(answers.readAndComplete[9] || [])[1] || ''}
                          onChange={(e) => handleBlankChange(9, 1, e.target.value)}
                          placeholder="_____"
                          className="w-18 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        a designated choice, choice arch
                        <input
                          type="text"
                          maxLength={6}
                          value={(answers.readAndComplete[9] || [])[2] || ''}
                          onChange={(e) => handleBlankChange(9, 2, e.target.value)}
                          placeholder="_____"
                          className="w-18 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        significantly inc
                        <input
                          type="text"
                          maxLength={4}
                          value={(answers.readAndComplete[9] || [])[3] || ''}
                          onChange={(e) => handleBlankChange(9, 3, e.target.value)}
                          placeholder="___"
                          className="w-14 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        adoption rates without res
                        <input
                          type="text"
                          maxLength={7}
                          value={(answers.readAndComplete[9] || [])[4] || ''}
                          onChange={(e) => handleBlankChange(9, 4, e.target.value)}
                          placeholder="______"
                          className="w-20 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        individual freedom.
                      </>
                    )}

                    {activeQuestion.id === 10 && (
                      <>
                        Central bank digital currencies rep
                        <input
                          type="text"
                          maxLength={6}
                          value={(answers.readAndComplete[10] || [])[0] || ''}
                          onChange={(e) => handleBlankChange(10, 0, e.target.value)}
                          placeholder="_____"
                          className="w-18 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        a fundamental re-architecture of monetary sys
                        <input
                          type="text"
                          maxLength={4}
                          value={(answers.readAndComplete[10] || [])[1] || ''}
                          onChange={(e) => handleBlankChange(10, 1, e.target.value)}
                          placeholder="___"
                          className="w-14 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        . Proponents emp
                        <input
                          type="text"
                          maxLength={6}
                          value={(answers.readAndComplete[10] || [])[2] || ''}
                          onChange={(e) => handleBlankChange(10, 2, e.target.value)}
                          placeholder="_____"
                          className="w-18 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        that sovereign digital money enhances financial inc
                        <input
                          type="text"
                          maxLength={6}
                          value={(answers.readAndComplete[10] || [])[3] || ''}
                          onChange={(e) => handleBlankChange(10, 3, e.target.value)}
                          placeholder="_____"
                          className="w-18 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        and real-time cross-border set
                        <input
                          type="text"
                          maxLength={7}
                          value={(answers.readAndComplete[10] || [])[4] || ''}
                          onChange={(e) => handleBlankChange(10, 4, e.target.value)}
                          placeholder="______"
                          className="w-20 mx-1 px-2 py-0.5 bg-slate-900 border-b-2 border-emerald-500 text-emerald-400 font-mono text-base font-bold text-center outline-none"
                        />
                        .
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TASK 3: LISTEN AND TYPE (DICTATION) */}
          {/* ========================================================================= */}
          {activeQuestion && activeQuestion.type === 'listen_and_type' && (
            <div className="space-y-8 animate-fadeIn text-center">
              <div className="space-y-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {activeQuestion.taskTitle}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Type the sentence that you hear
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Click the speaker button to listen to the prompt. You can replay up to {activeQuestion.replayLimit} times.
                </p>
              </div>

              {/* Large Duolingo Speaker Button */}
              <div className="flex flex-col items-center justify-center gap-3">
                <button
                  onClick={() => handlePlayDictation(activeQuestion.audioTranscript, activeQuestion.id)}
                  className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all shadow-xl ${
                    isPlayingAudio
                      ? 'bg-amber-400 text-slate-950 scale-110 animate-pulse'
                      : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:scale-105 active:scale-95'
                  }`}
                >
                  <Volume2 className="w-12 h-12" />
                </button>

                <span className="text-xs font-extrabold text-slate-400">
                  Plays Remaining: <strong className="text-emerald-400">{audioPlaysLeft[activeQuestion.id] ?? 3} / 3</strong>
                </span>
              </div>

              {/* Dictation Textarea */}
              <div className="max-w-2xl mx-auto w-full">
                <textarea
                  value={answers.listenAndType[activeQuestion.id] || ''}
                  onChange={(e) => {
                    const text = e.target.value;
                    setAnswers(prev => ({
                      ...prev,
                      listenAndType: { ...prev.listenAndType, [activeQuestion.id]: text }
                    }));
                  }}
                  placeholder="Type the exact sentence here..."
                  className="w-full p-5 rounded-2xl bg-slate-800 border-2 border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-white font-mono text-base resize-none min-h-[120px]"
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TASK 4: WRITE ABOUT THE PHOTO */}
          {/* ========================================================================= */}
          {activeQuestion && activeQuestion.type === 'write_about_photo' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {activeQuestion.taskTitle}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Write 1–3 detailed sentences describing the image below
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Photo Simulation Canvas */}
                <div className="bg-slate-800 rounded-3xl p-6 border-2 border-slate-700 flex flex-col items-center justify-center text-center space-y-4 min-h-[260px]">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                      Visual Stimulus (Image Preview)
                    </span>
                    <p className="text-sm text-slate-300 font-medium italic leading-relaxed px-4">
                      "{activeQuestion.photoDescription}"
                    </p>
                  </div>
                </div>

                {/* Candidate Writing Arena */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Your Description:</span>
                    <span className="font-bold text-emerald-400">
                      {getWordCount(answers.writeAboutPhoto[activeQuestion.id] || '')} Words
                    </span>
                  </div>

                  <textarea
                    value={answers.writeAboutPhoto[activeQuestion.id] || ''}
                    onChange={(e) => {
                      const text = e.target.value;
                      setAnswers(prev => ({
                        ...prev,
                        writeAboutPhoto: { ...prev.writeAboutPhoto, [activeQuestion.id]: text }
                      }));
                    }}
                    placeholder="Write 1 to 3 clear, complete sentences describing the image above..."
                    className="w-full p-5 rounded-2xl bg-slate-800 border-2 border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-white font-serif text-sm resize-none min-h-[200px] leading-relaxed"
                  />
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TASK 5: INTERACTIVE READING */}
          {/* ========================================================================= */}
          {activeQuestion && activeQuestion.type === 'interactive_reading' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {activeQuestion.taskTitle}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white">
                  Read the passage and answer the question
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Passage Left */}
                <div className="p-6 bg-slate-800/80 rounded-3xl border-2 border-slate-700 text-slate-300 text-xs md:text-sm font-serif leading-relaxed max-h-[300px] overflow-y-auto shadow-inner">
                  <span className="text-[10px] font-black uppercase text-emerald-400 block mb-2">Reading Text:</span>
                  {activeQuestion.passageText}
                </div>

                {/* Question & Options Right */}
                <div className="space-y-4">
                  <div className="text-sm font-bold text-white leading-snug">
                    <span className="text-xs text-emerald-400 uppercase font-black mr-2">[{activeQuestion.questionType}]</span>
                    {activeQuestion.questionText}
                  </div>

                  <div className="space-y-2.5">
                    {activeQuestion.options.map((opt, optIdx) => {
                      const isSelected = answers.interactiveReading[activeQuestion.id] === optIdx;
                      const letter = String.fromCharCode(65 + optIdx);

                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setAnswers(prev => ({
                              ...prev,
                              interactiveReading: { ...prev.interactiveReading, [activeQuestion.id]: optIdx }
                            }));
                          }}
                          className={`w-full text-left p-3.5 rounded-2xl border-2 text-xs font-bold transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                              : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black shrink-0 ${
                            isSelected ? 'bg-slate-950 text-emerald-400' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {letter}
                          </span>
                          <span className="pt-0.5">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION II: WRITING SAMPLE (STEP 24) */}
          {/* ========================================================================= */}
          {currentIdx === 23 && activeSample && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  {activeSample.taskType} (Institutional Submission)
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  {activeSample.taskTitle}
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Write at least 100–150 words. This writing sample is shared directly with admissions officers.
                </p>
              </div>

              <div className="p-6 bg-slate-800 rounded-3xl border-2 border-slate-700 space-y-4">
                <p className="text-sm text-slate-200 font-serif leading-relaxed italic">
                  "{activeSample.prompt}"
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Your Response Arena:</span>
                    <span className={`font-black px-2.5 py-0.5 rounded-full ${
                      getWordCount(answers.writingSample) >= 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {getWordCount(answers.writingSample)} / 100 Words
                    </span>
                  </div>

                  <textarea
                    value={answers.writingSample}
                    onChange={(e) => setAnswers(prev => ({ ...prev, writingSample: e.target.value }))}
                    placeholder="Begin typing your formal writing sample here..."
                    className="w-full p-5 rounded-2xl bg-slate-900 border-2 border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-white font-mono text-sm leading-relaxed resize-none min-h-[220px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION II: SPEAKING SAMPLE (STEP 25) */}
          {/* ========================================================================= */}
          {currentIdx === 24 && activeSample && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  {activeSample.taskType} (Video / Audio Simulation)
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  {activeSample.taskTitle}
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Speak clearly for 1 to 3 minutes into your microphone.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Video Recorder Simulation */}
                <div className="bg-slate-800 rounded-3xl p-6 border-2 border-slate-700 flex flex-col items-center justify-center text-center space-y-4 min-h-[250px]">
                  <div className="w-20 h-20 rounded-3xl bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center text-purple-400 animate-pulse">
                    <Camera className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-purple-400">Institutional Video Recording Ready</span>
                    <p className="text-xs text-slate-400 mt-1">Camera & Microphone Active</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <Mic className="w-3.5 h-3.5" /> Recording Simulator Ready
                  </div>
                </div>

                {/* Right: Prompt & Preparation Checklist */}
                <div className="p-6 bg-slate-800 rounded-3xl border-2 border-slate-700 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-sm text-white">Prompt:</h4>
                    <p className="text-xs text-slate-300 font-serif leading-relaxed italic">
                      "{activeSample.prompt}"
                    </p>
                    <div className="space-y-1.5 pt-2 border-t border-slate-700">
                      <span className="text-[10px] font-black uppercase text-slate-400">Key Points to Cover:</span>
                      {activeSample.keyPoints?.map((p, idx) => (
                        <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <textarea
                    value={answers.speakingSampleNotes}
                    onChange={(e) => setAnswers(prev => ({ ...prev, speakingSampleNotes: e.target.value }))}
                    placeholder="Optional speaking bullet points / speech outline notes..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 outline-none resize-none h-16"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 3. NAVIGATION BAR */}
        <div className="mt-8 pt-6 border-t-2 border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {currentIdx === totalSteps - 1 ? (
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-8 py-3 rounded-2xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Submit Exam & Get DET Score</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-2xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <span>Next Task</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </main>

      {/* 4. SUBMIT CONFIRMATION MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-8 border-4 border-foreground shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white">Submit Duolingo English Test?</h3>
              <p className="text-xs text-slate-400">
                Your responses across Literacy, Comprehension, Conversation, and Production will be evaluated on the official 10–160 DET score scale.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-500 block font-bold">Adaptive Tasks:</span>
                <strong className="text-base font-black text-emerald-400">23 Questions</strong>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-500 block font-bold">Writing & Speaking:</span>
                <strong className="text-base font-black text-purple-400">2 Samples</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl font-bold text-xs"
              >
                Back to Test
              </button>
              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  onComplete(answers);
                }}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. OFFICIAL INSTRUCTIONS MODAL */}
      {isInstructionsOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-8 border-4 border-foreground shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-black text-lg text-emerald-400 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" /> DET Exam Rules & Format
              </h3>
              <button onClick={() => setIsInstructionsOpen(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto">
              <p><strong>1. Adaptive Section (45 Mins):</strong> Measures English proficiency across Read and Select, Read and Complete, Listen and Type, Write About Photo, and Interactive Reading.</p>
              <p><strong>2. Score Scale (10 - 160):</strong> Overall scores are reported in 5-point increments. Subscores cover Literacy, Comprehension, Conversation, and Production.</p>
              <p><strong>3. Target Universities:</strong> Top tier institutions like Columbia, Yale, and NYU generally look for scores of 130–135+; most US & Canadian universities accept 115–120+.</p>
            </div>
            <button
              onClick={() => setIsInstructionsOpen(false)}
              className="w-full py-2.5 bg-emerald-500 text-slate-950 font-black rounded-xl"
            >
              Resume Test
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
