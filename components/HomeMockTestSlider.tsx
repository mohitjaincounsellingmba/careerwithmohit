"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Target, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  BarChart2
} from 'lucide-react';

interface MockTestExam {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  headline: string;
  targetColleges: string;
  duration: string;
  totalQuestions: string;
  sectionsCount: string;
  formatDetails: string[];
  cutoffTarget: string;
  highlightFeature: string;
  accentBg: string;
  themeColor: string;
  href: string;
}

const MOCK_EXAMS: MockTestExam[] = [
  {
    id: 'cat-2026',
    name: 'CAT 2026',
    badge: '🔥 HOT • IIM PREP',
    badgeColor: 'bg-red-500 text-white',
    headline: 'Common Admission Test',
    targetColleges: 'IIM Ahmedabad, Bangalore, Calcutta, FMS & MDI',
    duration: '120 Mins',
    totalQuestions: '66 Questions',
    sectionsCount: '3 Timed Sections',
    formatDetails: ['VARC (24 Qs)', 'DILR (20 Qs)', 'QA (22 Qs)'],
    cutoffTarget: '99+ %ile Target',
    highlightFeature: '+3 / -1 Marking & Percentile Predictor',
    accentBg: 'bg-blue-50',
    themeColor: 'text-primary',
    href: '/cat-mock-test',
  },
  {
    id: 'xat-2027',
    name: 'XAT 2027',
    badge: '⚡ XLRI DECISION MAKING',
    badgeColor: 'bg-purple-600 text-white',
    headline: 'Xavier Aptitude Test',
    targetColleges: 'XLRI Jamshedpur, SPJIMR, IMT Ghaziabad, XIMB',
    duration: '210 Mins',
    totalQuestions: '95 Questions',
    sectionsCount: '4 Sections + Essay',
    formatDetails: ['Decision Making', 'VALR', 'QA-DI', 'GK & Essay'],
    cutoffTarget: '95+ %ile Target',
    highlightFeature: 'Real DM Cases & Live Scaled Scoring',
    accentBg: 'bg-purple-50',
    themeColor: 'text-purple-600',
    href: '/xat-mock-test',
  },
  {
    id: 'nmat-2026',
    name: 'NMAT 2026',
    badge: '🎯 NMIMS TARGET',
    badgeColor: 'bg-emerald-600 text-white',
    headline: 'NMAT by GMAC™',
    targetColleges: 'NMIMS Mumbai, Bangalore, TAPMI, K J Somaiya',
    duration: '120 Mins',
    totalQuestions: '108 Questions',
    sectionsCount: '3 Adaptive Sections',
    formatDetails: ['Language (36 Qs)', 'Logical (36 Qs)', 'Quantitative (36 Qs)'],
    cutoffTarget: '235+ Score Target',
    highlightFeature: 'Zero Negative Marking • Scaled Score',
    accentBg: 'bg-emerald-50',
    themeColor: 'text-emerald-600',
    href: '/nmat-mock-test',
  },
  {
    id: 'snap-2026',
    name: 'SNAP 2026',
    badge: '⏱️ SPEED SPRINT',
    badgeColor: 'bg-rose-600 text-white',
    headline: 'Symbiosis National Aptitude',
    targetColleges: 'SIBM Pune, SCMHRD, SIIB, SIBM Bengaluru',
    duration: '60 Mins',
    totalQuestions: '60 Questions',
    sectionsCount: '3 Speed Sections',
    formatDetails: ['General English (15)', 'Quant-DI-DS (20)', 'Analytical (25)'],
    cutoffTarget: '98.5+ %ile Target',
    highlightFeature: '1 Q/Minute Speed Test Simulation',
    accentBg: 'bg-rose-50',
    themeColor: 'text-rose-600',
    href: '/snap-mock-test',
  },
  {
    id: 'atma-2026',
    name: 'ATMA 2026',
    badge: '🌟 NATIONAL LEVEL',
    badgeColor: 'bg-amber-500 text-foreground',
    headline: 'AIMS Test for Management',
    targetColleges: 'PUMBA, Welingkar Mumbai, JBIMS, BIMTECH',
    duration: '180 Mins',
    totalQuestions: '180 Questions',
    sectionsCount: '6 Timed Sections',
    formatDetails: ['Analytical (60 Qs)', 'Verbal (60 Qs)', 'Quantitative (60 Qs)'],
    cutoffTarget: '95+ %ile Target',
    highlightFeature: 'AIMS Standard 6-Section Interface',
    accentBg: 'bg-amber-50',
    themeColor: 'text-amber-600',
    href: '/atma-mock-test',
  },
  {
    id: 'mat',
    name: 'MAT',
    badge: '📊 CBT / PBT / IBT',
    badgeColor: 'bg-cyan-600 text-white',
    headline: 'Management Aptitude Test',
    targetColleges: 'PUMBA, Welingkar, BIMTECH, XIME, Jaipuria',
    duration: '120 Mins',
    totalQuestions: '150 Questions',
    sectionsCount: '5 Sections',
    formatDetails: ['Language', 'Intelligence', 'Math', 'Data Analysis', 'GK'],
    cutoffTarget: 'Composite /800 Target',
    highlightFeature: 'Sept / Dec / Feb / May Exam Ready',
    accentBg: 'bg-cyan-50',
    themeColor: 'text-cyan-600',
    href: '/mat-mock-test',
  },
];

export default function HomeMockTestSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to selected card
  const scrollToCard = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll<HTMLElement>('[data-slider-card]');
    if (cards[index]) {
      const targetCard = cards[index];
      const containerLeft = container.getBoundingClientRect().left;
      const cardLeft = targetCard.getBoundingClientRect().left;
      const scrollOffset = cardLeft - containerLeft + container.scrollLeft;
      
      container.scrollTo({
        left: scrollOffset,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  }, []);

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? MOCK_EXAMS.length - 1 : activeIndex - 1;
    scrollToCard(nextIdx);
  };

  const handleNext = useCallback(() => {
    const nextIdx = (activeIndex + 1) % MOCK_EXAMS.length;
    scrollToCard(nextIdx);
  }, [activeIndex, scrollToCard]);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Listen to scroll events to update active index indicator smoothly
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const cards = container.querySelectorAll<HTMLElement>('[data-slider-card]');
        const containerLeft = container.getBoundingClientRect().left;
        let closestIdx = 0;
        let minDiff = Infinity;

        cards.forEach((card, idx) => {
          const diff = Math.abs(card.getBoundingClientRect().left - containerLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });

        setActiveIndex(closestIdx);
      }, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <section 
      aria-label="Free MBA Mock Test Series Slider"
      className="bg-white border-b-8 border-foreground py-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Neo-brutalist decorative background elements */}
      <div className="absolute top-0 right-10 w-48 h-48 bg-accent/20 rotate-12 -z-0 pointer-events-none rounded-3xl" />
      <div className="absolute bottom-0 left-10 w-32 h-32 bg-primary/10 -rotate-12 -z-0 pointer-events-none rounded-2xl" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Banner Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6 border-b-4 border-foreground pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-accent text-foreground border-2 border-foreground px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Sparkles className="w-3.5 h-3.5 text-foreground animate-pulse" />
                100% Free Practice Tests
              </span>
              <span className="inline-flex items-center gap-1.5 bg-foreground text-white px-3.5 py-1 text-xs font-black uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                Live CBT Exam Simulator
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-foreground tracking-tight leading-tight">
              MBA Mock Test <span className="text-primary italic">Series 2026-27</span>
            </h2>
            <p className="mt-2 text-base sm:text-lg font-bold text-gray-600 max-w-2xl">
              Simulate actual exam screens, timed sections, and get instant AI score & percentile predictions.
            </p>
          </div>

          {/* Slider Controls (Arrows & View All) */}
          <div className="flex items-center gap-3 sm:gap-4 self-start lg:self-end">
            <Link
              href="/mock-tests"
              prefetch={false}
              className="inline-flex items-center gap-2 bg-white text-foreground border-4 border-foreground px-4 sm:px-5 py-2.5 text-sm sm:text-base font-black uppercase tracking-wider hover:bg-accent transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              All Mocks <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous mock test"
                className="w-12 h-12 flex items-center justify-center bg-white hover:bg-accent border-4 border-foreground text-foreground transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6 stroke-[3]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next mock test"
                className="w-12 h-12 flex items-center justify-center bg-white hover:bg-accent border-4 border-foreground text-foreground transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                <ChevronRight className="w-6 h-6 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>

        {/* Exam Quick Selectors / Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {MOCK_EXAMS.map((exam, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={exam.id}
                type="button"
                onClick={() => scrollToCard(idx)}
                className={`flex-shrink-0 px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-2 border-foreground cursor-pointer ${
                  isActive 
                    ? 'bg-foreground text-white shadow-[3px_3px_0px_0px_rgba(59,130,246,1)] -translate-y-0.5' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                {exam.name}
              </button>
            );
          })}
        </div>

        {/* Mock Tests Scrollable Track */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-1 no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {MOCK_EXAMS.map((exam) => {
            return (
              <div
                key={exam.id}
                data-slider-card
                className={`snap-center flex-shrink-0 w-[88vw] sm:w-[380px] lg:w-[390px] xl:w-[410px] rounded-2xl border-4 border-foreground ${exam.accentBg} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group relative overflow-hidden`}
              >
                {/* Decorative Top Accent Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`inline-block text-[11px] font-black uppercase tracking-wider px-3 py-1 border-2 border-foreground ${exam.badgeColor} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                    {exam.badge}
                  </span>
                  <span className="flex items-center gap-1 bg-white border-2 border-foreground px-2.5 py-1 text-[11px] font-black uppercase text-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary stroke-[2.5]" />
                    {exam.duration}
                  </span>
                </div>

                {/* Exam Title & Overview */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-display text-3xl sm:text-4xl font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">
                      {exam.name}
                    </h3>
                    <span className="text-xs font-black uppercase bg-accent px-2 py-0.5 border border-foreground text-foreground">
                      Free CBT
                    </span>
                  </div>
                  <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wide mb-3">
                    {exam.headline}
                  </p>

                  {/* Target Colleges Pill */}
                  <div className="bg-white border-2 border-foreground p-3 rounded-lg mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5 mb-1">
                      <Target className="w-3 h-3 text-primary" /> Target Premier Institutes
                    </div>
                    <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug">
                      {exam.targetColleges}
                    </p>
                  </div>

                  {/* Exam Key Specs Box */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-bold">
                    <div className="bg-white/80 border border-foreground/30 p-2 rounded">
                      <div className="text-[10px] uppercase text-gray-500 font-extrabold">Questions</div>
                      <div className="font-black text-foreground">{exam.totalQuestions}</div>
                    </div>
                    <div className="bg-white/80 border border-foreground/30 p-2 rounded">
                      <div className="text-[10px] uppercase text-gray-500 font-extrabold">Sections</div>
                      <div className="font-black text-foreground">{exam.sectionsCount}</div>
                    </div>
                  </div>

                  {/* Section Breakdown Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {exam.formatDetails.map((sec, sIdx) => (
                      <span 
                        key={sIdx}
                        className="bg-white border border-foreground/40 text-[11px] font-bold text-gray-700 px-2 py-0.5 rounded"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer with CTA */}
                <div className="pt-4 border-t-2 border-foreground/15 mt-auto flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-black uppercase text-gray-700">
                    <span className="flex items-center gap-1 text-primary">
                      <BarChart2 className="w-4 h-4" /> {exam.cutoffTarget}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold tracking-tight">
                      {exam.highlightFeature.split('•')[0]}
                    </span>
                  </div>

                  <Link
                    href={exam.href}
                    prefetch={false}
                    className="w-full bg-foreground text-white hover:bg-primary group-hover:bg-primary hover:text-white px-5 py-3.5 text-center font-black text-sm uppercase tracking-wider rounded-xl border-2 border-foreground transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    Start Free {exam.name} Mock <Zap className="w-4 h-4 text-accent fill-accent" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Progress Indicator Dots & Navigation Info */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-foreground/10">
          <div className="flex items-center gap-2">
            {MOCK_EXAMS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Jump to slide ${idx + 1}`}
                className={`h-3 transition-all rounded-full border-2 border-foreground cursor-pointer ${
                  activeIndex === idx ? 'w-8 bg-primary' : 'w-3 bg-white hover:bg-accent'
                }`}
              />
            ))}
            <span className="text-xs font-black uppercase tracking-wider ml-2 text-gray-600">
              {activeIndex + 1} of {MOCK_EXAMS.length} Free Tests
            </span>
          </div>

          <div className="text-xs font-bold text-gray-500 text-center sm:text-right">
            ⚡ Instant scoring • Section timers • Real CBT interface • 100% Free
          </div>
        </div>
      </div>
    </section>
  );
}
