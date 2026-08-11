'use client';

import React, { useState } from 'react';
import { GenericRegistrationForm, GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';
import { IeltsExamInterface, IeltsUserAnswers, IeltsActiveSection } from './IeltsExamInterface';
import { IeltsScorecardSolutions } from './IeltsScorecardSolutions';
import { ExamConfig } from '@/lib/mock-test-data';
import { Globe, Award, Sparkles, BookOpen, Headphones, PenTool } from 'lucide-react';

interface IeltsCbtMockTestClientProps {
  config: ExamConfig;
}

export function IeltsCbtMockTestClient({ config }: IeltsCbtMockTestClientProps) {
  const [step, setStep] = useState<'register' | 'quiz' | 'results'>('register');
  const [student, setStudent] = useState<GenericStudentInfo | null>(null);
  const [answers, setAnswers] = useState<IeltsUserAnswers>({});
  const [writingAnswers, setWritingAnswers] = useState<Record<string, string>>({});
  const [selectedFormat, setSelectedFormat] = useState<'academic' | 'general'>('academic');

  const handleRegister = (info: GenericStudentInfo) => {
    setStudent(info);
    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (finalAnswers: IeltsUserAnswers, finalWritingAnswers: Record<string, string>) => {
    setAnswers(finalAnswers);
    setWritingAnswers(finalWritingAnswers);
    setStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep('register');
    setStudent(null);
    setAnswers({});
    setWritingAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="transition-all duration-500 w-full space-y-6">
      {step === 'register' && (
        <div className="space-y-6">
          {/* IELTS Format & Module Banner */}
          <div className="bg-white p-6 rounded-3xl border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-rose-100 rounded-2xl text-rose-900 border-2 border-rose-200">
                <Globe className="w-7 h-7 text-rose-600" />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-rose-600 tracking-wider">Official Pattern Simulation</span>
                <h3 className="text-xl font-black text-slate-900">IELTS International Practice Test 2026</h3>
                <p className="text-xs text-slate-500 font-medium">Listening (40 Qs) • Reading (40 Qs) • Writing Tasks 1 & 2</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedFormat('academic')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border-2 flex items-center gap-2 ${
                  selectedFormat === 'academic'
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Academic Module</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('general')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border-2 flex items-center gap-2 ${
                  selectedFormat === 'general'
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>General Training</span>
              </button>
            </div>
          </div>

          {/* Registration Form */}
          <GenericRegistrationForm config={config} onRegister={handleRegister} />
        </div>
      )}

      {step === 'quiz' && student && (
        <IeltsExamInterface 
          student={student} 
          onComplete={handleQuizComplete} 
        />
      )}

      {step === 'results' && student && (
        <IeltsScorecardSolutions 
          student={student} 
          answers={answers} 
          writingAnswers={writingAnswers}
          onReset={handleReset} 
        />
      )}
    </div>
  );
}
