'use client';

import React, { useState } from 'react';
import { GenericRegistrationForm, GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';
import { MatExamInterface, MatUserAnswers } from './MatExamInterface';
import { MatScorecardSolutions } from './MatScorecardSolutions';
import { ExamConfig } from '@/lib/mock-test-data';
import { Calendar, Sparkles } from 'lucide-react';

interface MatCbtMockTestClientProps {
  config: ExamConfig;
}

export function MatCbtMockTestClient({ config }: MatCbtMockTestClientProps) {
  const [step, setStep] = useState<'register' | 'quiz' | 'results'>('register');
  const [student, setStudent] = useState<GenericStudentInfo | null>(null);
  const [answers, setAnswers] = useState<MatUserAnswers>({});
  const [selectedCycle, setSelectedCycle] = useState<string>('Sept MAT 2026');

  const matCycles = [
    { label: 'Sept MAT 2026', tag: 'Upcoming' },
    { label: 'Dec MAT 2026', tag: 'Winter' },
    { label: 'Feb MAT 2027', tag: 'Spring' },
    { label: 'May MAT 2027', tag: 'Summer' }
  ];

  const handleRegister = (info: GenericStudentInfo) => {
    setStudent(info);
    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (finalAnswers: MatUserAnswers) => {
    setAnswers(finalAnswers);
    setStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep('register');
    setStudent(null);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="transition-all duration-500 w-full space-y-6">
      {step === 'register' && (
        <div className="space-y-6">
          {/* MAT Exam Cycle Switcher */}
          <div className="bg-white p-4 md:p-6 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-2xl text-amber-900 font-bold">
                <Calendar className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-tight">Select Target MAT Session</h3>
                <p className="text-xs text-slate-500 font-semibold">Mock simulation calibrated for all 4 official AIMA testing windows</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {matCycles.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setSelectedCycle(c.label)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 border-2 ${
                    selectedCycle === c.label
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md scale-105'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{c.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    selectedCycle === c.label ? 'bg-slate-950 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {c.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <GenericRegistrationForm config={config} onRegister={handleRegister} />
        </div>
      )}

      {step === 'quiz' && student && (
        <MatExamInterface 
          student={student} 
          onComplete={handleQuizComplete} 
          matCycle={selectedCycle}
        />
      )}

      {step === 'results' && student && (
        <MatScorecardSolutions 
          student={student} 
          answers={answers} 
          onReset={handleReset} 
          matCycle={selectedCycle}
        />
      )}
    </div>
  );
}
