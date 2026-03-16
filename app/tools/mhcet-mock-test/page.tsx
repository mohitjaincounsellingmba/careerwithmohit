'use client';

import { useState } from 'react';
import { RegistrationForm, StudentInfo } from '@/components/MockTest/RegistrationForm';
import { QuizInterface } from '@/components/MockTest/QuizInterface';
import { ScoreCard } from '@/components/MockTest/ScoreCard';
import { MHCET_QUESTIONS } from '@/lib/mhcet-questions';

export default function MhcetMockTestPage() {
  const [step, setStep] = useState<'register' | 'quiz' | 'results'>('register');
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleRegister = (info: StudentInfo) => {
    setStudent(info);
    setStep('quiz');
  };

  const handleQuizComplete = (finalAnswers: Record<number, number>) => {
    setAnswers(finalAnswers);
    setStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setStep('register');
    setStudent(null);
    setAnswers({});
  };

  return (
    <main className="min-h-screen bg-[#f0f0f0] pt-24 pb-20 px-6 sm:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 leading-none">
            MHCET <span className="text-primary italic">Mock</span> Test
          </h1>
          <div className="inline-block bg-accent px-4 py-1 border-4 border-foreground transform -rotate-2">
            <p className="font-bold uppercase tracking-widest text-sm">Official MAH-MBA-CET 2026 Pattern</p>
          </div>
        </div>

        {/* Dynamic Content Based on Step */}
        <div className="transition-all duration-500">
          {step === 'register' && (
            <RegistrationForm onRegister={handleRegister} />
          )}

          {step === 'quiz' && (
            <QuizInterface 
              questions={MHCET_QUESTIONS} 
              onComplete={handleQuizComplete} 
            />
          )}

          {step === 'results' && student && (
            <ScoreCard 
              questions={MHCET_QUESTIONS} 
              answers={answers} 
              student={student}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Info Grid - Only shown on registration page */}
        {step === 'register' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black uppercase mb-2">Timed Exam</h3>
              <p className="text-sm font-medium text-gray-600">Strict 30-minute timer for this sample mock to simulate real-world pressure.</p>
            </div>
            <div className="bg-white p-6 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black uppercase mb-2">Instant Scoring</h3>
              <p className="text-sm font-medium text-gray-600">Get a detailed sectional breakdown of your accuracy immediately after completion.</p>
            </div>
            <div className="bg-white p-6 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black uppercase mb-2">Expert Feedback</h3>
              <p className="text-sm font-medium text-gray-600">Receive strategic insights based on your strongest and weakest sections.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
