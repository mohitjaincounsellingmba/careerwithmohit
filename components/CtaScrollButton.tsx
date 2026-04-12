'use client';

import { ArrowUp } from 'lucide-react';

export function CtaScrollButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      onClick={scrollToTop}
      className="bg-white text-foreground border-4 border-primary px-10 py-5 font-black uppercase text-xl hover:bg-primary hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(37,99,235,1)] flex items-center gap-3 group"
    >
      <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      Back to Top & Fill Form
    </button>
  );
}
