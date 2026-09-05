'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Sparkles, Award, MessageCircle, HelpCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const InquiryForm = dynamic(() => import('./InquiryForm').then(mod => mod.InquiryForm), {
  loading: () => (
    <div className="h-[420px] flex flex-col items-center justify-center gap-3 text-slate-500 font-bold">
      <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
      <span>Loading Admission Form...</span>
    </div>
  ),
  ssr: false
});

export function InquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  // Handle ESC key to close modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setHasDismissed(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    // Check if user has already opened or dismissed popup in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenInquiryPopup_v2');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenInquiryPopup_v2', 'true');
      }, 5000); // Trigger smoothly after 5 seconds

      return () => clearTimeout(timer);
    } else {
      setHasDismissed(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
  };

  return (
    <>
      {/* Floating Re-Open Badge Trigger when modal is closed */}
      {!isOpen && hasDismissed && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 group flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-300"
          aria-label="Open Free Profile Evaluation Form"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
          </span>
          <span className="text-xs font-black tracking-wide uppercase">Free Profile Evaluation</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Main Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[2rem] md:rounded-[2.5rem] bg-white shadow-2xl shadow-blue-950/40 border border-slate-200/90 animate-in zoom-in-95 duration-300 custom-scrollbar"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-popup-title"
          >
            {/* Close Button with Smooth Rounded Pill Edge */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 border border-slate-200/80 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
              aria-label="Close Pop-up"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Gradient Header Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 md:p-8 rounded-t-[2rem] md:rounded-t-[2.5rem] border-b border-white/10">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-10 w-48 h-48 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 pr-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-black uppercase tracking-wider border border-amber-400/30 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Free Admission Strategy Session
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold backdrop-blur-sm">
                    <Award className="w-3.5 h-3.5 text-blue-300" /> IIM &amp; FMS Alumni Mentored
                  </span>
                </div>

                <h2 
                  id="inquiry-popup-title" 
                  className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight"
                >
                  Fast-Track Your <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">Dream College</span> Admission
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm font-medium mt-2 max-w-xl leading-relaxed">
                  Get direct 1-on-1 profile evaluation for MBA, PGDM, B.Tech &amp; Degree programs. Compare top B-schools, fee cutoffs, and verified placement statistics.
                </p>
              </div>
            </div>
            
            {/* Form Body Container */}
            <div className="p-4 sm:p-6 md:p-8 bg-slate-50/50">
              <InquiryForm 
                variant="full"
                source="Website Pop-up Modal"
                hideHeader={true}
                buttonText="Claim Free Profile Evaluation →"
              />
            </div>
          </div>

          {/* Backdrop Click to Close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={handleClose} 
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
}
