'use client';

import React, { useState } from 'react';
import { GenericRegistrationForm, GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';
import { SnapExamInterface, SnapUserAnswers } from './SnapExamInterface';
import { SnapScorecardSolutions } from './SnapScorecardSolutions';
import { ExamConfig } from '@/lib/mock-test-data';

interface SnapCbtMockTestClientProps {
  config: ExamConfig;
}

export function SnapCbtMockTestClient({ config }: SnapCbtMockTestClientProps) {
  const [step, setStep] = useState<'register' | 'quiz' | 'results'>('register');
  const [student, setStudent] = useState<GenericStudentInfo | null>(null);
  const [answers, setAnswers] = useState<SnapUserAnswers>({});

  const handleRegister = (info: GenericStudentInfo) => {
    setStudent(info);
    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (finalAnswers: SnapUserAnswers) => {
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
        <SnapExamInterface 
          student={student} 
          onComplete={handleQuizComplete} 
        />
      )}

      {step === 'results' && student && (
        <SnapScorecardSolutions 
          student={student} 
          answers={answers} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
}
