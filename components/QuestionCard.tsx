'use client';

import { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, ExternalLink, HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  question: {
    questionText: string;
    options: string[];
    correctAnswer: string;
    explanationUrl: string;
  };
  index: number;
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-white border-4 border-foreground p-6 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg border-l-2 border-b-2 border-slate-200">
        Source: 2IIM
      </div>
      <div className="flex items-start gap-4 mb-6">
        <div className="bg-primary text-white w-10 h-10 rounded-lg flex items-center justify-center font-black flex-shrink-0 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          {index + 1}
        </div>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg font-bold leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: question.questionText.replace(/\$(.*?)\$/g, '<code class="bg-slate-100 px-1 rounded text-primary">$1</code>') }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {question.options.map((option, idx) => (
          <div 
            key={idx}
            className="flex items-center gap-3 p-4 bg-slate-50 border-2 border-slate-100 rounded-lg font-bold text-slate-600"
          >
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center text-sm font-black text-slate-400">
              {String.fromCharCode(65 + idx)}
            </div>
            <span dangerouslySetInnerHTML={{ __html: option.replace(/\$(.*?)\$/g, '<code class="bg-slate-100 px-1 rounded text-primary">$1</code>') }} />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className={`w-full py-3 rounded-lg font-black uppercase flex items-center justify-center gap-2 transition-all ${
            showAnswer 
              ? 'bg-green-100 text-green-700 border-2 border-green-200' 
              : 'bg-foreground text-white hover:bg-primary border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none'
          }`}
        >
          {showAnswer ? (
            <><CheckCircle2 className="w-5 h-5" /> Hide Answer</>
          ) : (
            <><HelpCircle className="w-5 h-5" /> Reveal Correct Answer</>
          )}
        </button>

        {showAnswer && (
          <div className="mt-4 p-6 bg-green-50 border-4 border-green-200 rounded-xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-2 text-green-700 font-black uppercase text-sm mb-2">
              <CheckCircle2 className="w-5 h-5" /> Correct Answer
            </div>
            <p className="text-2xl font-black text-green-800 mb-4" dangerouslySetInnerHTML={{ __html: question.correctAnswer.replace(/\$(.*?)\$/g, '<code>$1</code>') }} />
            
            <a 
              href={question.explanationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
              View detailed video solution on 2IIM <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
