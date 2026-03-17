import { useEffect, useMemo } from 'react';
import { Question } from '@/lib/mhcet-questions';
import { StudentInfo } from './RegistrationForm';
import { Trophy, Target, Zap, BookOpen, Download, RotateCcw, Share2 } from 'lucide-react';

interface ScoreCardProps {
  questions: Question[];
  answers: Record<number, number>;
  student: StudentInfo;
  onReset: () => void;
}

export function ScoreCard({ questions, answers, student, onReset }: ScoreCardProps) {
  const { total, correct, sectionWise, percentage } = useMemo(() => {
    let correctCount = 0;
    const sectionWise: Record<string, { correct: number; total: number; label: string }> = {
      LR: { correct: 0, total: 0, label: 'Logical Reasoning' },
      AR: { correct: 0, total: 0, label: 'Abstract Reasoning' },
      QA: { correct: 0, total: 0, label: 'Quantitative Aptitude' },
      VARC: { correct: 0, total: 0, label: 'Verbal Ability/RC' }
    };

    questions.forEach((q) => {
      sectionWise[q.section].total += 1;
      if (answers[q.id] === q.correctAnswer) {
        correctCount += 1;
        sectionWise[q.section].correct += 1;
      }
    });

    return { 
      total: questions.length, 
      correct: correctCount, 
      sectionWise,
      percentage: Math.round((correctCount / questions.length) * 100)
    };
  }, [questions, answers]);

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
            section_lr: `${sectionWise.LR.correct}/${sectionWise.LR.total}`,
            section_ar: `${sectionWise.AR.correct}/${sectionWise.AR.total}`,
            section_qa: `${sectionWise.QA.correct}/${sectionWise.QA.total}`,
            section_varc: `${sectionWise.VARC.correct}/${sectionWise.VARC.total}`,
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

  const bestSection = Object.entries(sectionWise).sort((a,b) => (b[1].correct/b[1].total) - (a[1].correct/a[1].total))[0];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Result Section */}
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
            Based on this performance, your projected MHCET percentile is approximately 
            <span className="text-foreground font-black underline ml-2">
              {correct > 140 ? '99.9+' : correct > 120 ? '99.5+' : correct > 100 ? '98.0+' : '90.0+'}
            </span>
          </p>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sectional Performance */}
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
                    style={{ width: `${(data.correct / data.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight Card */}
        <div className="bg-foreground text-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(var(--primary-rgb),1)] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary" /> Strategist's View
            </h3>
            <div className="space-y-6 text-gray-300 font-medium">
              <p>
                Your strongest section is <strong className="text-primary uppercase">{bestSection[1].label}</strong>.
              </p>
              <p>
                To hit the **JBIMS cutoff (145+)**, focus on increasing your speed in 
                {bestSection[0] === 'QA' ? ' Logical Reasoning' : ' Quantitative Aptitude'}.
              </p>
              <div className="bg-white/10 p-4 border-2 border-dashed border-white/20 rounded-lg">
                <p className="text-sm italic">
                  "MHCET is a game of speed. You need to average 45 seconds per question."
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t-2 border-white/10">
            <p className="text-xs uppercase font-black text-gray-500 mb-2">Target College</p>
            <p className="text-xl font-black text-primary">JBIMS / SIMSREE</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
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

