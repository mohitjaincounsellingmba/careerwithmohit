import { useEffect } from 'react';
import { Question } from '@/lib/mhcet-questions';
import { StudentInfo } from './RegistrationForm';

interface ScoreCardProps {
  questions: Question[];
  answers: Record<number, number>;
  student: StudentInfo;
  onReset: () => void;
}

export function ScoreCard({ questions, answers, student, onReset }: ScoreCardProps) {
  const calculateScores = () => {
    let correct = 0;
    const sectionWise: Record<string, { correct: number; total: number }> = {
      LR: { correct: 0, total: 0 },
      AR: { correct: 0, total: 0 },
      QA: { correct: 0, total: 0 },
      VARC: { correct: 0, total: 0 }
    };

    questions.forEach((q) => {
      sectionWise[q.section].total += 1;
      if (answers[q.id] === q.correctAnswer) {
        correct += 1;
        sectionWise[q.section].correct += 1;
      }
    });

    return { total: questions.length, correct, sectionWise };
  };

  const { total, correct, sectionWise } = calculateScores();
  const percentage = Math.round((correct / total) * 100);

  useEffect(() => {
    const sendResults = async () => {
      try {
        await fetch('https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: student.name,
            number: student.phone,
            email: student.email,
            location: student.location,
            source: 'MHCET Mock Test',
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
  }, [correct, total, percentage, student, sectionWise]);

  return (
    <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black uppercase mb-4 text-primary">Test Results</h2>
        <div className="inline-block bg-accent px-6 py-2 border-4 border-foreground -rotate-1">
          <p className="font-black text-xl">Great Job, {student.name}!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Main Score */}
        <div className="flex flex-col items-center justify-center border-4 border-foreground p-8 bg-foreground text-white shadow-[8px_8px_0px_0px_rgba(var(--primary-rgb),1)]">
          <p className="text-sm font-black uppercase tracking-widest text-primary mb-2">Overall Score</p>
          <div className="text-7xl font-black mb-2">{correct} / {total}</div>
          <p className="text-xl font-bold">{percentage}% Accuracy</p>
        </div>

        {/* Section Breakdown */}
        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase border-b-4 border-foreground pb-2">Sectional Analysis</h3>
          {Object.entries(sectionWise).map(([section, data]) => (
            <div key={section} className="flex justify-between items-center group">
              <span className="font-black text-lg group-hover:text-primary transition-colors">{section}</span>
              <div className="flex items-center gap-4">
                <div className="w-48 h-4 bg-gray-100 border-2 border-foreground overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${(data.correct / data.total) * 100}%` }}
                  />
                </div>
                <span className="font-bold w-12 text-right">{data.correct}/{data.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-accent p-6 border-4 border-foreground mb-12">
        <h4 className="font-black uppercase mb-3">Admission Insight:</h4>
        <p className="font-medium text-gray-800 leading-relaxed">
          Based on your performance in {student.targetExam}, you are showing strong potential in **{
            Object.entries(sectionWise).sort((a,b) => (b[1].correct/b[1].total) - (a[1].correct/a[1].total))[0][0]
          }**. To reach the 99th percentile (approx. 140+ in a real MHCET), we recommend focusing on speed-building in the Abstract Reasoning and Quant sections.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={onReset}
          className="flex-1 bg-white text-foreground py-4 text-lg font-black uppercase border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:shadow-none"
        >
          Retake Mock Test
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-primary text-white py-4 text-lg font-black uppercase border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] transition-all"
        >
          Download Scorecard
        </button>
      </div>
    </div>
  );
}
