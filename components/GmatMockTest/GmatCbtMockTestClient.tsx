'use client';

import React, { useState } from 'react';
import { GenericRegistrationForm, GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';
import { GmatExamInterface, GmatUserAnswers } from './GmatExamInterface';
import { GmatScorecardSolutions } from './GmatScorecardSolutions';
import { ExamConfig } from '@/lib/mock-test-data';

interface GmatCbtMockTestClientProps {
  config: ExamConfig;
}

export function GmatCbtMockTestClient({ config }: GmatCbtMockTestClientProps) {
  const [step, setStep] = useState<'register' | 'quiz' | 'results'>('register');
  const [student, setStudent] = useState<GenericStudentInfo | null>(null);
  const [answers, setAnswers] = useState<GmatUserAnswers>({});

  const handleRegister = (info: GenericStudentInfo) => {
    setStudent(info);
    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (finalAnswers: GmatUserAnswers) => {
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
    <div className="transition-all duration-500 w-full">
      {step === 'register' && (
        <GenericRegistrationForm config={config} onRegister={handleRegister} />
      )}

      {step === 'quiz' && student && (
        <GmatExamInterface 
          student={student} 
          onComplete={handleQuizComplete} 
        />
      )}

      {step === 'results' && student && (
        <GmatScorecardSolutions 
          student={student} 
          answers={answers} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
}
