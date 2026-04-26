'use client';

import { useEffect, useMemo } from 'react';
import { Trophy, Target, Zap, Download, RotateCcw } from 'lucide-react';
import { GenericQuestion, ExamConfig } from '@/lib/mock-test-data';
import { GenericStudentInfo } from './GenericRegistrationForm';

interface GenericScoreCardProps {
  config: ExamConfig;
  questions: GenericQuestion[];
  answers: Record<number, number>;
  student: GenericStudentInfo;
  onReset: () => void;
}

export function GenericScoreCard({ config, questions, answers, student, onReset }: GenericScoreCardProps) {
  const { total, correct, sectionWise, percentage } = useMemo(() => {
    let correctCount = 0;
    const sectionWise: Record<string, { correct: number; total: number; label: string }> = {};
    
    config.sections.forEach(sec => {
      sectionWise[sec.id] = { correct: 0, total: 0, label: sec.label };
    });

    questions.forEach((q) => {
      if(sectionWise[q.sectionId]) {
        sectionWise[q.sectionId].total += 1;
      }
      if (answers[q.id] === q.correctAnswer) {
        correctCount += 1;
        if(sectionWise[q.sectionId]) {
          sectionWise[q.sectionId].correct += 1;
        }
      }
    });

    return { 
      total: questions.length, 
      correct: correctCount, 
      sectionWise,
      percentage: Math.round((correctCount / questions.length) * 100)
    };
  }, [config, questions, answers]);

  useEffect(() => {
    const sendResults = async () => {
      try {
        await fetch('/api/leads', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: student.name,
            number: student.phone,
            email: student.email,
            location: student.location,
            source: `${config.name} Mock Test`,
            score: correct,
            percentile: percentage,
            accuracy: percentage,
            total_questions: total,
            targetExam: student.targetExam,
            timestamp: new Date().toISOString()
          })
        });
      } catch (err) {
        console.error('Failed to sync results:', err);
      }
    };
    sendResults();
  }, [correct, total, percentage, student, config]);

  const sortedSections = Object.entries(sectionWise).sort((a,b) => {
    const ratioA = a[1].total ? a[1].correct/a[1].total : 0;
    const ratioB = b[1].total ? b[1].correct/b[1].total : 0;
    return ratioB - ratioA;
  });
  
  const bestSection = sortedSections.length > 0 ? sortedSections[0] : null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white border-4 border-foreground p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Trophy className="w-48 h-48 rotate-12" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-black uppercase mb-6 leading-tight">
            YOUR SCORE: <span className="text-primary">{correct}</span>
            <span className="text-gray-300"> / {total}</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-accent px-6 py-2 border-4 border-foreground font-black uppercase text-xl -rotate-1">
              {student.name}
            </div>
            <div className="bg-primary text-white px-6 py-2 border-4 border-foreground font-black uppercase text-xl rotate-1">
              ACCURACY: {percentage}%
            </div>
          </div>

          <p className="text-xl font-bold text-gray-600 max-w-2xl mx-auto mb-10">
            Based on this performance, your projected level is approximately 
            <span className="text-foreground font-black underline ml-2">
              {percentage >= 90 ? 'Top 1%' : percentage >= 80 ? 'Top 5%' : percentage >= 70 ? 'Top 10%' : 'Need Improvement'}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" /> Sectional Breakdown
          </h3>
          
          <div className="space-y-8">
            {Object.entries(sectionWise).map(([key, data]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-black text-sm uppercase tracking-wider">{data.label}</span>
                  <span className="font-black text-primary">{data.correct}/{data.total}</span>
                </div>
                <div className="w-full h-6 bg-gray-100 border-4 border-foreground relative overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: `${data.total ? (data.correct / data.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-foreground text-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(var(--primary-rgb),1)] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary" /> Strategist's View
            </h3>
            <div className="space-y-6 text-gray-300 font-medium">
              {bestSection && bestSection[1].total > 0 ? (
                <p>
                  Your strongest section is <strong className="text-primary uppercase">{bestSection[1].label}</strong>.
                </p>
              ) : (
                <p>You need to improve across all sections.</p>
              )}
              <p>
                To hit a good score ({config.goodScore}), you need to focus on accuracy and speed.
              </p>
              <div className="bg-white/10 p-4 border-2 border-dashed border-white/20 rounded-lg">
                <p className="text-sm italic">
                  "Exams like {config.name} are games of speed. Maintain a high strike rate."
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t-2 border-white/10">
            <p className="text-xs uppercase font-black text-gray-500 mb-2">Target Colleges / Result</p>
            <p className="text-xl font-black text-primary">{config.targetColleges}</p>
          </div>
        </div>
      </div>

      {/* Detailed Question Review */}
      <div className="bg-white border-4 border-foreground p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-3xl font-black uppercase mb-10 flex items-center gap-3 border-b-4 border-foreground pb-4">
          <RotateCcw className="w-8 h-8 text-secondary" /> Complete Question Review
        </h3>
        
        <div className="space-y-12">
          {questions.map((q, idx) => {
            const isCorrect = answers[q.id] === q.correctAnswer;
            const isUnanswered = answers[q.id] === undefined;
            
            return (
              <div key={idx} className={`p-6 border-4 ${isCorrect ? 'border-green-500 bg-green-50/30' : isUnanswered ? 'border-gray-300 bg-gray-50/30' : 'border-red-500 bg-red-50/30'}`}>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-4 py-1 text-xs font-black uppercase border-2 ${isCorrect ? 'border-green-500 text-green-700 bg-green-100' : isUnanswered ? 'border-gray-400 text-gray-500 bg-gray-100' : 'border-red-500 text-red-700 bg-red-100'}`}>
                    Q{idx + 1}: {isCorrect ? 'Correct' : isUnanswered ? 'Skipped' : 'Incorrect'}
                  </span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{q.sectionId}</span>
                </div>
                
                <h4 className="text-xl font-bold mb-6 leading-tight">{q.text}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {q.options.map((option, optIdx) => (
                    <div 
                      key={optIdx} 
                      className={`p-4 border-2 font-medium flex items-center gap-4 ${
                        optIdx === q.correctAnswer 
                          ? 'border-green-500 bg-green-100 text-green-900' 
                          : answers[q.id] === optIdx 
                            ? 'border-red-500 bg-red-100 text-red-900' 
                            : 'border-gray-200'
                      }`}
                    >
                      <span className={`w-8 h-8 flex items-center justify-center shrink-0 font-black border-2 ${
                        optIdx === q.correctAnswer ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      {option}
                    </div>
                  ))}
                </div>

                {q.explanation && (
                  <div className="mt-4 p-4 bg-white border-2 border-dashed border-gray-300">
                    <p className="text-sm font-black uppercase text-gray-400 mb-2 tracking-widest">Detailed Explanation</p>
                    <p className="text-gray-700 font-medium">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 pt-8">
        <button
          onClick={onReset}
          className="flex-1 bg-white text-foreground py-5 text-xl font-black uppercase border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-6 h-6" /> Retake Test
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-primary text-white py-5 text-xl font-black uppercase border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3"
        >
          <Download className="w-6 h-6" /> PDF Report
        </button>
      </div>
    </div>
  );
}
