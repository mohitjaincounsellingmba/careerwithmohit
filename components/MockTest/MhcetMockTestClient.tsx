'use client';

import { useState } from 'react';
import { RegistrationForm, StudentInfo } from '@/components/MockTest/RegistrationForm';
import { QuizInterface } from '@/components/MockTest/QuizInterface';
import { ScoreCard } from '@/components/MockTest/ScoreCard';
import { MHCET_QUESTIONS } from '@/lib/mhcet-questions';

export function MhcetMockTestClient() {
  const [step, setStep] = useState<'register' | 'quiz' | 'results'>('register');
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [activeQuestions, setActiveQuestions] = useState(MHCET_QUESTIONS);

  const getMhcetSet = (setNumber: number) => {
    const offset = (setNumber - 1) * 7;
    const pool = MHCET_QUESTIONS;
    const selected = [];
    for (let i = 0; i < pool.length; i++) {
      selected.push(pool[(i + offset) % pool.length]);
    }
    return selected;
  };

  const handleRegister = (info: StudentInfo) => {
    setStudent(info);
    setActiveQuestions(getMhcetSet(info.selectedSet));
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
        <RegistrationForm onRegister={handleRegister} />
      )}

      {step === 'quiz' && (
        <QuizInterface 
          questions={activeQuestions} 
          onComplete={handleQuizComplete} 
        />
      )}

      {step === 'results' && student && (
        <ScoreCard 
          questions={activeQuestions} 
          answers={answers} 
          student={student}
          onReset={handleReset}
        />
      )}

      {/* Standard Info Grid and Syllabus are now handled in the server page for SEO */}
    </div>
  );
}
