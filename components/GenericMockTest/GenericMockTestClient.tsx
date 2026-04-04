'use client';

import { useState } from 'react';
import { GenericRegistrationForm, GenericStudentInfo } from './GenericRegistrationForm';
import { GenericQuizInterface } from './GenericQuizInterface';
import { GenericScoreCard } from './GenericScoreCard';
import { ExamConfig, GenericQuestion, generateMockQuestions } from '@/lib/mock-test-data';

interface GenericMockTestClientProps {
  config: ExamConfig;
  questions: GenericQuestion[];
}

export function GenericMockTestClient({ config, questions }: GenericMockTestClientProps) {
  const [step, setStep] = useState<'register' | 'quiz' | 'results'>('register');
  const [student, setStudent] = useState<GenericStudentInfo | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [activeQuestions, setActiveQuestions] = useState<GenericQuestion[]>(questions);

  const handleRegister = (info: GenericStudentInfo) => {
    setStudent(info);
    setActiveQuestions(generateMockQuestions(config, info.selectedSet));
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
    <div className="transition-all duration-500">
      {step === 'register' && (
        <GenericRegistrationForm config={config} onRegister={handleRegister} />
      )}

      {step === 'quiz' && (
        <GenericQuizInterface 
          config={config}
          questions={activeQuestions} 
          onComplete={handleQuizComplete} 
        />
      )}

      {step === 'results' && student && (
        <GenericScoreCard 
          config={config}
          questions={activeQuestions} 
          answers={answers} 
          student={student}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
