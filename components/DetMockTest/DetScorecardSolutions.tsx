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
  FileCheck,
  Camera,
  Volume2,
  Layers
} from 'lucide-react';
import { 
  DET_MOCK_TEST_QUESTIONS, 
  DET_WRITING_SPEAKING_SAMPLES,
  calculateDetScore,
  getDetUniversityEligibility,
  DetAdaptiveQuestion
} from '@/data/det_mock_test_23';
import { DetUserAnswers } from './DetExamInterface';
import { GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';

interface DetScorecardSolutionsProps {
  student: GenericStudentInfo;
  answers: DetUserAnswers;
  onReset: () => void;
}

export function DetScorecardSolutions({ 
  student, 
  answers, 
  onReset 
}: DetScorecardSolutionsProps) {
  const [taskFilter, setTaskFilter] = useState<'all' | 'read_and_select' | 'read_and_complete' | 'listen_and_type' | 'write_about_photo' | 'interactive_reading'>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Compute DET Scaled Score and Subscores
  const analytics = useMemo(() => {
    let readAndSelectPoints = 0;
    let readAndCompletePoints = 0;
    let listenAndTypePoints = 0;
    let photoPoints = 0;
    let interactiveReadingPoints = 0;

    // 1. Task 1: Read and Select (Q1 - Q5)
    [1, 2, 3, 4, 5].forEach(qId => {
      const q = DET_MOCK_TEST_QUESTIONS.find(item => item.id === qId);
      if (q && q.type === 'read_and_select') {
        const userSelected = answers.readAndSelect[qId] || [];
        const realIndices = q.words.map((w, i) => (w.isReal ? i : -1)).filter(i => i !== -1);
        const correctCount = userSelected.filter(i => realIndices.includes(i)).length;
        const wrongCount = userSelected.filter(i => !realIndices.includes(i)).length;
        if (correctCount >= realIndices.length - 1 && wrongCount === 0) {
          readAndSelectPoints += 1;
        } else if (correctCount > 0) {
          readAndSelectPoints += 0.5;
        }
      }
    });

    // 2. Task 2: Read and Complete (Q6 - Q10)
    [6, 7, 8, 9, 10].forEach(qId => {
      const q = DET_MOCK_TEST_QUESTIONS.find(item => item.id === qId);
      if (q && q.type === 'read_and_complete') {
        const userBlanks = answers.readAndComplete[qId] || [];
        let matchCount = 0;
        q.blanks.forEach((b, idx) => {
          const userVal = (userBlanks[idx] || '').trim().toLowerCase();
          if (userVal === b.missing.toLowerCase() || userVal === b.fullWord.toLowerCase()) {
            matchCount++;
          }
        });
        if (matchCount >= q.blanks.length - 1) readAndCompletePoints += 1;
        else if (matchCount > 0) readAndCompletePoints += 0.5;
      }
    });

    // 3. Task 3: Listen and Type (Q11 - Q15)
    [11, 12, 13, 14, 15].forEach(qId => {
      const userText = (answers.listenAndType[qId] || '').trim().toLowerCase();
      const q = DET_MOCK_TEST_QUESTIONS.find(item => item.id === qId);
      if (q && q.type === 'listen_and_type') {
        const targetText = q.audioTranscript.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
        const cleanUser = userText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
        if (cleanUser === targetText) listenAndTypePoints += 1;
        else if (cleanUser.length > targetText.length * 0.6) listenAndTypePoints += 0.5;
      }
    });

    // 4. Task 4: Write About Photo (Q16 - Q18)
    [16, 17, 18].forEach(qId => {
      const userText = (answers.writeAboutPhoto[qId] || '').trim();
      const wordCount = userText ? userText.split(/\s+/).length : 0;
      if (wordCount >= 15) photoPoints += 1;
      else if (wordCount >= 5) photoPoints += 0.5;
    });

    // 5. Task 5: Interactive Reading (Q19 - Q23)
    [19, 20, 21, 22, 23].forEach(qId => {
      const userAns = answers.interactiveReading[qId];
      const q = DET_MOCK_TEST_QUESTIONS.find(item => item.id === qId);
      if (q && q.type === 'interactive_reading') {
        if (userAns !== undefined && Number(userAns) === Number(q.correctAnswer)) {
          interactiveReadingPoints += 1;
        }
      }
    });

    const writingSampleWordCount = answers.writingSample.trim() ? answers.writingSample.trim().split(/\s+/).length : 0;

    const scoreResult = calculateDetScore(
      readAndSelectPoints,
      readAndCompletePoints,
      listenAndTypePoints,
      photoPoints,
      interactiveReadingPoints,
      writingSampleWordCount
    );

    const eligibleUnis = getDetUniversityEligibility(scoreResult.overallScore);

    return {
      scoreResult,
      eligibleUnis,
      readAndSelectPoints,
      readAndCompletePoints,
      listenAndTypePoints,
      photoPoints,
      interactiveReadingPoints,
      writingSampleWordCount
    };
  }, [answers]);

  const handleShareWhatsApp = () => {
    const text = `🎯 I scored an official ${analytics.scoreResult.overallScore} / 160 (${analytics.scoreResult.performanceBand}) in the Duolingo English Test (DET) Mock on CareerWithMohit!\n\n📚 Subscores:\n• Literacy: ${analytics.scoreResult.literacy}\n• Comprehension: ${analytics.scoreResult.comprehension}\n• Conversation: ${analytics.scoreResult.conversation}\n• Production: ${analytics.scoreResult.production}\n\nTake your free DET Mock Test here: https://www.careerwithmohit.online/tools/mock-test/duolingo`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = 'https://www.careerwithmohit.online/tools/mock-test/duolingo';
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  // Filtered Questions for Review
  const filteredQuestions = useMemo(() => {
    return DET_MOCK_TEST_QUESTIONS.filter(q => {
      if (taskFilter !== 'all' && q.type !== taskFilter) return false;
      return true;
    });
  }, [taskFilter]);

  return (
    <div className="w-full space-y-12">
      
      {/* 1. OFFICIAL DET SCORECARD HERO */}
      <div className="bg-white rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(34,197,94,1)] p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-0" />

        <div className="relative z-10 space-y-8">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-md">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-300">
                  Official DET Score Report
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
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Test</span>
              </button>
            </div>
          </div>

          {/* Core Score Display & Subscores */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Overall DET Score */}
            <div className="bg-slate-950 text-white p-8 rounded-3xl border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
                Overall Scaled Score (10–160)
              </span>
              <div className="text-6xl md:text-7xl font-black text-emerald-400 tracking-tight my-2">
                {analytics.scoreResult.overallScore}
              </div>
              <div className="inline-block bg-emerald-500 text-slate-950 text-xs font-black uppercase px-4 py-1.5 rounded-full shadow">
                {analytics.scoreResult.performanceBand}
              </div>
              <p className="text-[11px] text-slate-300 mt-3 font-medium px-2 leading-snug">
                {analytics.scoreResult.summaryFeedback}
              </p>
            </div>

            {/* Right: 4 Official Subscores Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              
              {/* Literacy */}
              <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span className="font-extrabold text-xs text-slate-900">Literacy</span>
                  </div>
                  <span className="text-lg font-black text-emerald-600">{analytics.scoreResult.literacy}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Ability to read and write in academic and professional contexts.</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(analytics.scoreResult.literacy / 160) * 100}%` }} />
                </div>
              </div>

              {/* Comprehension */}
              <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-emerald-600" />
                    <span className="font-extrabold text-xs text-slate-900">Comprehension</span>
                  </div>
                  <span className="text-lg font-black text-emerald-600">{analytics.scoreResult.comprehension}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Ability to read and listen to diverse English content.</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(analytics.scoreResult.comprehension / 160) * 100}%` }} />
                </div>
              </div>

              {/* Conversation */}
              <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-extrabold text-xs text-slate-900">Conversation</span>
                  </div>
                  <span className="text-lg font-black text-emerald-600">{analytics.scoreResult.conversation}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Ability to listen and respond spontaneously in English.</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(analytics.scoreResult.conversation / 160) * 100}%` }} />
                </div>
              </div>

              {/* Production */}
              <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-emerald-600" />
                    <span className="font-extrabold text-xs text-slate-900">Production</span>
                  </div>
                  <span className="text-lg font-black text-emerald-600">{analytics.scoreResult.production}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Ability to write and speak expressing complex thoughts.</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(analytics.scoreResult.production / 160) * 100}%` }} />
                </div>
              </div>

            </div>

          </div>

          {/* Social Share Bar */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-extrabold text-emerald-950">
                Share your official Duolingo English Test (DET) score report:
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

      {/* 2. GLOBAL UNIVERSITY ELIGIBILITY */}
      <section className="bg-white rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(34,197,94,1)] p-6 md:p-10 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b-2 border-slate-100 gap-2">
          <div>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Global Admissions Matcher</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
              <Globe className="w-7 h-7 text-emerald-600" /> Universities Accepting DET Score {analytics.scoreResult.overallScore}+
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-bold">
            USA, Canada, Australia & Europe Intakes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analytics.eligibleUnis.map((uni, idx) => {
            let badgeBg = 'bg-rose-100 text-rose-800 border-rose-300';
            if (uni.status === 'Eligible') badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
            else if (uni.status === 'Competitive') badgeBg = 'bg-sky-100 text-sky-800 border-sky-300';

            return (
              <div key={idx} className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-400 transition-all flex flex-col justify-between">
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
                  <span className="text-slate-600 font-medium">Cutoff: <strong>{uni.minScore}+ Score</strong></span>
                  <span className="text-emerald-700 font-bold text-[11px] truncate max-w-[120px]">{uni.program}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. WRITING & SPEAKING SAMPLES EVALUATION */}
      <section className="bg-white rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(34,197,94,1)] p-6 md:p-10 space-y-6">
        <div className="pb-4 border-b-2 border-slate-100">
          <span className="text-xs font-black text-purple-600 uppercase tracking-widest">Section II Review</span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
            <Camera className="w-7 h-7 text-purple-600" /> Writing & Speaking Samples (Institutional Review)
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Writing Sample */}
          <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Writing Sample (3–5 Mins)
              </span>
              <h3 className="font-extrabold text-base text-slate-900">
                Online vs Traditional Classrooms
              </h3>
              <p className="text-xs text-slate-600 font-serif italic">
                "{DET_WRITING_SPEAKING_SAMPLES[0].prompt}"
              </p>

              <div className="pt-2">
                <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Your Submitted Response:</span>
                {answers.writingSample ? (
                  <p className="text-xs text-slate-800 font-mono bg-white p-3.5 rounded-xl border border-slate-200 leading-relaxed whitespace-pre-line">
                    {answers.writingSample}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 italic py-4 text-center bg-white rounded-xl border border-slate-200">
                    (No text submitted)
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <span className="text-[10px] font-black uppercase text-emerald-600 block mb-1">High-Scoring Benchmark Response:</span>
              <p className="text-xs text-slate-700 font-serif bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 leading-relaxed">
                {DET_WRITING_SPEAKING_SAMPLES[0].sampleAnswer}
              </p>
            </div>
          </div>

          {/* Speaking Sample */}
          <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Speaking Sample (1–3 Mins Video)
              </span>
              <h3 className="font-extrabold text-base text-slate-900">
                Overcoming a Personal Problem
              </h3>
              <p className="text-xs text-slate-600 font-serif italic">
                "{DET_WRITING_SPEAKING_SAMPLES[1].prompt}"
              </p>

              <div className="pt-2">
                <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Your Speech Outline Notes:</span>
                {answers.speakingSampleNotes ? (
                  <p className="text-xs text-slate-800 font-mono bg-white p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                    {answers.speakingSampleNotes}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 italic py-4 text-center bg-white rounded-xl border border-slate-200">
                    (Video recording simulation completed)
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <span className="text-[10px] font-black uppercase text-emerald-600 block mb-1">High-Scoring Sample Transcript:</span>
              <p className="text-xs text-slate-700 font-serif bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 leading-relaxed">
                {DET_WRITING_SPEAKING_SAMPLES[1].sampleAnswer}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. COMPLETE ADAPTIVE QUESTIONS & EXPLANATIONS (Q1 - Q23) */}
      <section className="bg-white rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(34,197,94,1)] p-6 md:p-10 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b-2 border-slate-100 gap-4">
          <div>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">DET Adaptive Question Review</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
              <FileCheck className="w-7 h-7 text-emerald-600" /> Answer Key & Rationale (Tasks 1–5)
            </h2>
          </div>

          {/* Task Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Tasks (23)' },
              { id: 'read_and_select', label: 'Read & Select (5)' },
              { id: 'read_and_complete', label: 'C-Test (5)' },
              { id: 'listen_and_type', label: 'Dictation (5)' },
              { id: 'write_about_photo', label: 'Photo (3)' },
              { id: 'interactive_reading', label: 'Reading (5)' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTaskFilter(t.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                  taskFilter === t.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Render List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;

            return (
              <div 
                key={q.id}
                className="p-6 rounded-3xl border-2 border-slate-200 bg-slate-50/60 space-y-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-emerald-600 text-white">
                      Q{q.id}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {q.taskTitle}
                    </span>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="text-xs font-extrabold text-emerald-700 hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Full Solution'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Specific Question Output By Type */}
                {q.type === 'read_and_select' && (
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-900">{q.questionText}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {q.words.map((w, idx) => (
                        <div 
                          key={idx}
                          className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between ${
                            w.isReal ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-black' : 'bg-white border-slate-200 text-slate-400 line-through'
                          }`}
                        >
                          <span>{w.word}</span>
                          <span className="text-[10px]">{w.isReal ? 'Real Word ✓' : 'Non-Word ✗'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {q.type === 'read_and_complete' && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-500 uppercase">Completed C-Test Text:</p>
                    <p className="text-sm font-serif text-slate-900 bg-white p-4 rounded-2xl border border-slate-200 leading-relaxed">
                      {q.fullPassageText}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-bold">
                      {q.blanks.map((b, idx) => (
                        <span key={idx} className="bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-300">
                          {b.prefix}<strong>{b.missing}</strong> ({b.fullWord})
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {q.type === 'listen_and_type' && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-500 uppercase">Exact Audio Dictation:</p>
                    <p className="text-sm font-mono text-emerald-900 bg-emerald-50 p-4 rounded-2xl border border-emerald-200 font-bold">
                      "{q.audioTranscript}"
                    </p>
                  </div>
                )}

                {q.type === 'write_about_photo' && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-500 uppercase">Visual Description & Model Output:</p>
                    <p className="text-xs text-slate-700 italic bg-white p-3 rounded-xl border border-slate-200">
                      "{q.photoDescription}"
                    </p>
                    <p className="text-xs text-slate-800 font-serif bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 leading-relaxed">
                      <strong>Sample 1–3 Sentence Output:</strong> {q.sampleAnswer}
                    </p>
                  </div>
                )}

                {q.type === 'interactive_reading' && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-900">
                      <span className="text-emerald-600 font-black">[{q.questionType}]</span> {q.questionText}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => (
                        <div 
                          key={optIdx}
                          className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                            optIdx === q.correctAnswer
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-600'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded text-[10px] font-black flex items-center justify-center ${
                            optIdx === q.correctAnswer ? 'bg-emerald-600 text-white' : 'bg-slate-200'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explanation */}
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-700 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Explanation:</strong> {'explanation' in q && q.explanation ? q.explanation : 'Write 1–3 detailed, grammatically complex sentences characterizing the visual stimulus.'}</span>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* 5. RETAKE & WHATSAPP COUNSELING CTA */}
      <div className="p-8 bg-slate-950 rounded-3xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(34,197,94,1)] text-white text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-black uppercase">Need Support for Your Study Abroad Applications?</h3>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto font-medium">
          Get 1-on-1 personalized profile evaluation, DET score targeting, university shortlisting, and scholarship guidance with Mohit Jain.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onReset}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-lg"
          >
            Retake DET Practice Test
          </button>
          <a
            href="https://api.whatsapp.com/send?phone=918882898892&text=Hi%20Mohit,%20I%20took%20the%20Duolingo%20English%20Test%20(DET)%20Mock%20and%20want%20guidance%20for%20admissions."
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
