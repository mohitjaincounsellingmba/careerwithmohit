'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, ArrowRight, CheckCircle2, MessageCircle, Trophy, Flame } from 'lucide-react';

export function CatExamCountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date for upcoming CAT Exam (typically last Sunday of November)
    const targetDate = new Date();
    // Dynamic countdown target
    targetDate.setDate(targetDate.getDate() + 56);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl border-4 border-foreground p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden mb-10">
      {/* Background glow & accents */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Side: Exam Alert & Title */}
        <div className="space-y-4 max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
            <Trophy className="w-3.5 h-3.5" />
            <span>CAT 2026/27 • IIMs, FMS, SPJIMR & Top B-Schools</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
            Targeting <span className="text-amber-400 underline decoration-wavy decoration-amber-400/50">99+ Percentile</span> in CAT 2026?
          </h2>

          <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
            Practice under real exam pressure with official 40-minute sectional timers for VARC, DILR, and Quant. Benchmark your raw score out of 198 and predict your IIM call eligibility instantly.
          </p>

          {/* Key Milestones */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-300 font-semibold">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Official 66/68 Qs Pattern</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>40-Min Sectional Timer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>20 IIMs Call Predictor</span>
            </div>
          </div>
        </div>

        {/* Right Side: Live Countdown & Quick Action */}
        <div className="flex flex-col items-center bg-slate-800/80 p-6 md:p-8 rounded-2xl border-2 border-slate-700 w-full lg:w-auto shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest mb-4">
            <Clock className="w-4 h-4" />
            <span>Countdown to CAT Exam Day</span>
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-3 text-center mb-6">
            <div className="bg-slate-900/90 border border-slate-700 px-3 py-2.5 rounded-xl min-w-[60px]">
              <span className="block text-2xl md:text-3xl font-black text-white">{timeLeft.days}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Days</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-700 px-3 py-2.5 rounded-xl min-w-[60px]">
              <span className="block text-2xl md:text-3xl font-black text-amber-400">{timeLeft.hours}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Hours</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-700 px-3 py-2.5 rounded-xl min-w-[60px]">
              <span className="block text-2xl md:text-3xl font-black text-amber-400">{timeLeft.minutes}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Mins</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-700 px-3 py-2.5 rounded-xl min-w-[60px]">
              <span className="block text-2xl md:text-3xl font-black text-emerald-400">{timeLeft.seconds}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Secs</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full gap-3">
            <a
              href="#test-interface"
              className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 shadow-md text-center"
            >
              <span>Attempt Mock Test</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20am%20preparing%20for%20CAT%202026%20and%20need%201-on-1%20IIM%20profile%20evaluation%20and%20admission%20guidance."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 shadow-md text-center"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>IIM Profiling</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
