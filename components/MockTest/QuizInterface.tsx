'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/lib/mhcet-questions';

interface QuizInterfaceProps {
  questions: Question[];
  onComplete: (answers: Record<number, number>) => void;
}

export function QuizInterface({ questions, onComplete }: QuizInterfaceProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes for sample

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onComplete(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [answers, onComplete]);

  const currentQuestion = questions[currentIdx];

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-8">
      {/* Quiz Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-accent p-6 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase text-foreground">MAH-MBA-CET Mock</h2>
          <p className="font-bold text-gray-700">Question {currentIdx + 1} of {questions.length}</p>
        </div>
        <div className="bg-white border-4 border-foreground px-6 py-2">
          <p className="text-sm font-black uppercase text-gray-400">Time Remaining</p>
          <p className={`text-2xl font-black ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-foreground'}`}>
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white border-4 border-foreground h-6 overflow-hidden">
        <div 
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[400px]">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-foreground text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Section: {currentQuestion.section}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold mb-8 leading-tight">
          {currentQuestion.text}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setAnswers({ ...answers, [currentQuestion.id]: idx })}
              className={`text-left p-4 border-4 transition-all flex items-center gap-4 font-bold ${
                answers[currentQuestion.id] === idx
                  ? 'border-primary bg-primary/10 shadow-[4px_4px_0px_0px_rgba(var(--primary-rgb),1)]'
                  : 'border-foreground hover:bg-gray-50'
              }`}
            >
              <span className={`w-8 h-8 rounded-full border-4 flex items-center justify-center shrink-0 ${
                answers[currentQuestion.id] === idx ? 'bg-primary text-white border-primary' : 'border-foreground'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="bg-white text-foreground px-8 py-3 font-black uppercase border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 transition-all hover:-translate-y-1"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-primary text-white px-12 py-3 font-black uppercase border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 active:shadow-none"
        >
          {currentIdx === questions.length - 1 ? 'Finish Test' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}
