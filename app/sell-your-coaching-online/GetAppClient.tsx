'use client';

import { useState } from 'react';
import { ArrowRight, Play, X } from 'lucide-react';
import { SellCoachingLeadForm } from '@/components/SellCoachingLeadForm';

export function GetAppClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto rounded-md bg-accent px-8 py-4 text-2xl font-black text-foreground transition-all hover:scale-105 hover:bg-white border-4 border-foreground text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3"
        >
          Get Your App <ArrowRight />
        </button>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-4 text-white font-bold hover:scale-105 transition-all"
        >
          <div className="h-12 w-12 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
            <Play fill="white" size={20} />
          </div>
          <span>Watch Demo</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[32px_32px_0px_0px_rgba(0,0,0,1)] border-8 border-foreground">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-[110] bg-white border-4 border-foreground p-2 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 stroke-[3px]" />
            </button>
            <div className="bg-white">
              <div className="bg-primary p-8 text-center border-b-8 border-foreground">
                <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Ready to Scale?</h2>
                <p className="text-blue-50 font-bold mt-2">Get your coaching app & 10x your income.</p>
              </div>
              <div className="p-4 md:p-8">
                <SellCoachingLeadForm onSuccess={() => setIsModalOpen(false)} />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setIsModalOpen(false)} />
        </div>
      )}
    </>
  );
}
