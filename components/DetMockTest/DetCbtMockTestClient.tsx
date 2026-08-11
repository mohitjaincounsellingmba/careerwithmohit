'use client';

import React, { useState } from 'react';
import { GenericRegistrationForm, GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';
import { DetExamInterface, DetUserAnswers } from './DetExamInterface';
import { DetScorecardSolutions } from './DetScorecardSolutions';
import { ExamConfig } from '@/lib/mock-test-data';
import { Award, Globe, Zap, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface DetCbtMockTestClientProps {
  config: ExamConfig;
}

export function DetCbtMockTestClient({ config }: DetCbtMockTestClientProps) {
  const [step, setStep] = useState<'register' | 'quiz' | 'results'>('register');
  const [student, setStudent] = useState<GenericStudentInfo | null>(null);
  const [answers, setAnswers] = useState<DetUserAnswers>({
    readAndSelect: {},
    readAndComplete: {},
    listenAndType: {},
    writeAboutPhoto: {},
    interactiveReading: {},
    writingSample: '',
    speakingSampleNotes: ''
  });

  const handleRegister = (info: GenericStudentInfo) => {
    setStudent(info);
    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (finalAnswers: DetUserAnswers) => {
    setAnswers(finalAnswers);
    setStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep('register');
    setStudent(null);
    setAnswers({
      readAndSelect: {},
      readAndComplete: {},
      listenAndType: {},
      writeAboutPhoto: {},
      interactiveReading: {},
      writingSample: '',
      speakingSampleNotes: ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="transition-all duration-500 w-full space-y-6">
      {step === 'register' && (
        <div className="space-y-6">
          {/* DET Information Banner */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-emerald-500/20 rounded-2xl text-emerald-400 border-2 border-emerald-500/40">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                  Official Pattern Adaptive Simulator
                </span>
                <h3 className="text-2xl font-black text-white">Duolingo English Test (DET) 2026</h3>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  Adaptive Section (45 Mins) • Writing & Speaking Samples (15 Mins) • 10–160 Scale Scoring
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="px-4 py-2 bg-slate-800 rounded-2xl border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>4 Official Subscores</span>
              </div>
              <div className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-wider shadow">
                Free Instant Evaluation
              </div>
            </div>
          </div>

          <GenericRegistrationForm config={config} onRegister={handleRegister} />
        </div>
      )}

      {step === 'quiz' && student && (
        <DetExamInterface 
          student={student} 
          onComplete={handleQuizComplete} 
        />
      )}

      {step === 'results' && student && (
        <DetScorecardSolutions 
          student={student} 
          answers={answers} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
}
