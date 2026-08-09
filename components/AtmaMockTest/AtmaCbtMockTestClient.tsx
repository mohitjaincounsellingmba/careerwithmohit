'use client';

import React, { useState } from 'react';
import { GenericRegistrationForm, GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';
import { AtmaExamInterface, AtmaUserAnswers } from './AtmaExamInterface';
import { AtmaScorecardSolutions } from './AtmaScorecardSolutions';
import { ExamConfig } from '@/lib/mock-test-data';

interface AtmaCbtMockTestClientProps {
  config: ExamConfig;
}

export function AtmaCbtMockTestClient({ config }: AtmaCbtMockTestClientProps) {
  const [step, setStep] = useState<'register' | 'quiz' | 'results'>('register');
  const [student, setStudent] = useState<GenericStudentInfo | null>(null);
  const [answers, setAnswers] = useState<AtmaUserAnswers>({});

  const handleRegister = (info: GenericStudentInfo) => {
    setStudent(info);
    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (finalAnswers: AtmaUserAnswers) => {
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
        <AtmaExamInterface 
          student={student} 
          onComplete={handleQuizComplete} 
        />
      )}

      {step === 'results' && student && (
        <AtmaScorecardSolutions 
          student={student} 
          answers={answers} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
}
