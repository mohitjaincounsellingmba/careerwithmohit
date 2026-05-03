'use client';

import { useEffect, useMemo } from 'react';
import { Trophy, Target, Zap, Download, RotateCcw, MessageCircle, Linkedin, Share2, ArrowRight, CheckCircle2, XCircle, Clock } from 'lucide-react';
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
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-[1200px] mx-auto px-4">
      {/* Hero Result Section */}
      <div className="bg-white border-2 border-gray-100 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-gray-200/50 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] -mr-10 -mt-10">
          <Trophy className="w-80 h-80 rotate-12" />
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center gap-3 bg-primary/5 text-primary px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.3em] mb-4">
            <Trophy className="w-4 h-4" /> Performance Report
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black text-slate-900 leading-none">
            {correct}<span className="text-slate-200">/</span><span className="text-slate-300 text-4xl md:text-5xl">{total}</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6">
             <div className="flex flex-col items-center">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Projected Percentile</p>
                <div className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-2xl shadow-xl shadow-primary/20">
                  {percentage >= 95 ? '99.9' : percentage >= 90 ? '99.1' : percentage >= 80 ? '97.5' : percentage >= 70 ? '95.2' : '85.4'}%
                </div>
             </div>
             <div className="flex flex-col items-center">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Accuracy Rate</p>
                <div className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-2xl shadow-xl shadow-slate-900/10">
                  {percentage}%
                </div>
             </div>
          </div>

          <p className="text-xl font-bold text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Great effort, <span className="text-slate-900">{student.name}</span>! Your performance indicates a strong grasp of the fundamentals. 
            Focus on your <span className="text-primary underline decoration-primary/30 decoration-4 underline-offset-4">{bestSection?.[1].label}</span> section to push for the 99.9th percentile.
          </p>

          <div className="pt-8 flex flex-wrap justify-center gap-4">
             <button
                onClick={() => {
                  const text = `I just scored ${correct}/${total} in the ${config.name} 2026 Mock Test! 🚀 Percentile: ${percentage}%. Challenge me at: https://www.careerwithmohit.online/tools/${config.slug}-mock-test`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-2 shadow-xl shadow-[#25D366]/20 hover:scale-105 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white" /> Share on WhatsApp
              </button>
              <button
                onClick={() => {
                   const url = `https://www.careerwithmohit.online/tools/${config.slug}-mock-test`;
                   window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                }}
                className="bg-white text-slate-900 border-2 border-gray-100 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-2 shadow-lg shadow-gray-100 hover:bg-gray-50 transition-all"
              >
                <Linkedin className="w-5 h-5 fill-slate-900" /> LinkedIn
              </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sectional Analysis */}
        <div className="lg:col-span-2 bg-white border-2 border-gray-100 rounded-[2.5rem] p-10 shadow-2xl shadow-gray-200/30">
          <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-10 flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" /> Sectional Mastery
          </h3>
          
          <div className="space-y-10">
            {Object.entries(sectionWise).map(([key, data]) => {
               const ratio = data.total ? (data.correct / data.total) * 100 : 0;
               return (
                <div key={key} className="group space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 group-hover:text-primary transition-colors">{data.label}</span>
                      <p className="text-xl font-black text-slate-800">{ratio}% Proficiency</p>
                    </div>
                    <span className="font-black text-slate-400"><span className="text-primary">{data.correct}</span> / {data.total}</span>
                  </div>
                  <div className="w-full h-4 bg-gray-100 rounded-full relative overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </div>
               );
            })}
          </div>
        </div>

        {/* Insights Card */}
        <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-900/20 flex flex-col">
          <div className="flex-1 space-y-8">
            <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary" /> Expert Insights
            </h3>
            
            <div className="space-y-8">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-3">Top Recommendation</p>
                <p className="text-slate-300 font-medium leading-relaxed italic text-sm">
                  "Your accuracy in {bestSection?.[1].label} is elite. However, to maximize your IIM chances, aim for more TITA questions in the QA section where negative marking doesn't apply."
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">Target Benchmark</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white uppercase">{config.goodScore}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recommended Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Eligible Institutes</p>
            <p className="text-lg font-black text-white leading-tight">{config.targetColleges}</p>
          </div>
        </div>
      </div>

      {/* Detailed Question Review */}
      <div className="bg-white border-2 border-gray-100 rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-gray-200/30">
        <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-12 flex items-center gap-4">
          <RotateCcw className="w-8 h-8 text-primary" /> Comprehensive Analysis
        </h3>
        
        <div className="space-y-8">
          {questions.map((q, idx) => {
            const isCorrect = answers[q.id] === q.correctAnswer;
            const isUnanswered = answers[q.id] === undefined;
            
            return (
              <div key={idx} className={`group p-8 rounded-[2rem] border-2 transition-all duration-300 ${isCorrect ? 'border-emerald-100 bg-emerald-50/20' : isUnanswered ? 'border-gray-100 bg-gray-50/20' : 'border-rose-100 bg-rose-50/20'}`}>
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 ${isCorrect ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200' : isUnanswered ? 'bg-white border-gray-200 text-gray-400' : 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200'}`}>
                      {idx + 1}
                    </span>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isCorrect ? 'bg-emerald-100 text-emerald-700' : isUnanswered ? 'bg-gray-100 text-gray-500' : 'bg-rose-100 text-rose-700'}`}>
                      {isCorrect ? 'Correct' : isUnanswered ? 'Skipped' : 'Incorrect'}
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{q.sectionId}</span>
                </div>
                
                <h4 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
                  {q.text}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((option, optIdx) => {
                    const isRight = optIdx === q.correctAnswer;
                    const isWrong = answers[q.id] === optIdx && !isRight;
                    return (
                      <div 
                        key={optIdx} 
                        className={`p-5 rounded-2xl border-2 font-bold text-sm flex items-center gap-4 transition-all duration-300 ${
                          isRight 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-lg shadow-emerald-50' 
                            : isWrong 
                              ? 'border-rose-500 bg-rose-50 text-rose-900' 
                              : 'border-gray-50 bg-white/50 text-slate-500'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-black text-xs border-2 transition-all ${
                          isRight ? 'bg-emerald-500 text-white border-emerald-500' : isWrong ? 'bg-rose-500 text-white border-rose-500' : 'bg-white border-gray-100'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        {option}
                        {isRight && <CheckCircle2 className="ml-auto w-5 h-5 text-emerald-500" />}
                        {isWrong && <XCircle className="ml-auto w-5 h-5 text-rose-500" />}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="mt-8 p-6 bg-white/60 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Logic Breakdown</span>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed italic text-sm">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row gap-6 pt-12 pb-20">
        <button
          onClick={onReset}
          className="flex-1 bg-white text-slate-900 py-6 rounded-3xl text-xl font-black uppercase tracking-widest border-2 border-gray-100 shadow-2xl shadow-gray-200/50 hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-6 h-6" /> Retake Mock
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-primary text-white py-6 rounded-3xl text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <Download className="w-6 h-6" /> Download Report
        </button>
      </div>
    </div>
  );
}
