'use client';

import React, { useState } from 'react';
import { GenericRegistrationForm, GenericStudentInfo } from '@/components/GenericMockTest/GenericRegistrationForm';
import { XatExamInterface, XatUserAnswers } from './XatExamInterface';
import { XatScorecardSolutions } from './XatScorecardSolutions';
import { ExamConfig } from '@/lib/mock-test-data';

interface XatCbtMockTestClientProps {
  config: ExamConfig;
}

export function XatCbtMockTestClient({ config }: XatCbtMockTestClientProps) {
  const [step, setStep] = useState<'register' | 'quiz' | 'results'>('register');
  const [student, setStudent] = useState<GenericStudentInfo | null>(null);
  const [answers, setAnswers] = useState<XatUserAnswers>({});

  const handleRegister = (info: GenericStudentInfo) => {
    setStudent(info);
    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (finalAnswers: XatUserAnswers) => {
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
        <XatExamInterface 
          student={student} 
          onComplete={handleQuizComplete} 
        />
      )}

      {step === 'results' && student && (
        <XatScorecardSolutions 
          student={student} 
          answers={answers} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
}
