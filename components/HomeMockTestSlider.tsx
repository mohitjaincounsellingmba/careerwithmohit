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
      className="bg-white border-b border-slate-200 py-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Banner Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6 border-b border-slate-200 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                100% Free Practice Tests
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Live CBT Exam Simulator
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              MBA Mock Test <span className="text-blue-600">Series 2026-27</span>
            </h2>
            <p className="mt-2 text-base sm:text-lg font-normal text-slate-600 max-w-2xl">
              Simulate actual exam screens, timed sections, and get instant AI score & percentile predictions.
            </p>
          </div>

          {/* Slider Controls (Arrows & View All) */}
          <div className="flex items-center gap-3 sm:gap-4 self-start lg:self-end">
            <Link
              href="/mock-tests"
              prefetch={false}
              className="inline-flex items-center gap-2 bg-slate-900 text-white rounded-xl px-5 py-2.5 text-sm font-bold tracking-wide hover:bg-blue-600 transition-all shadow-sm"
            >
              All Mocks <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous mock test"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-all cursor-pointer border border-slate-200"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next mock test"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-all cursor-pointer border border-slate-200"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
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
                className={`flex-shrink-0 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all rounded-full cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
                className="snap-center flex-shrink-0 w-[88vw] sm:w-[380px] lg:w-[390px] xl:w-[410px] rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl shadow-sm hover:border-blue-300 group relative overflow-hidden"
              >
                {/* Decorative Top Accent Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md ${exam.badgeColor}`}>
                    {exam.badge}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-blue-600 stroke-[2.2]" />
                    {exam.duration}
                  </span>
                </div>

                {/* Exam Title & Overview */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {exam.name}
                    </h3>
                    <span className="text-xs font-bold uppercase bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md">
                      Free CBT
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    {exam.headline}
                  </p>

                  {/* Target Colleges Pill */}
                  <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 mb-1">
                      <Target className="w-3.5 h-3.5 text-blue-600" /> Target Premier Institutes
                    </div>
                    <p className="text-xs font-medium text-slate-700 line-clamp-2 leading-snug">
                      {exam.targetColleges}
                    </p>
                  </div>

                  {/* Exam Key Specs Box */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
                      <div className="text-[10px] uppercase text-slate-500 font-semibold">Questions</div>
                      <div className="font-bold text-slate-900 mt-0.5">{exam.totalQuestions}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
                      <div className="text-[10px] uppercase text-slate-500 font-semibold">Sections</div>
                      <div className="font-bold text-slate-900 mt-0.5">{exam.sectionsCount}</div>
                    </div>
                  </div>

                  {/* Section Breakdown Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {exam.formatDetails.map((sec, sIdx) => (
                      <span 
                        key={sIdx}
                        className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer with CTA */}
                <div className="pt-4 border-t border-slate-100 mt-auto flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1 text-blue-700 font-bold">
                      <BarChart2 className="w-4 h-4 text-blue-600" /> {exam.cutoffTarget}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {exam.highlightFeature.split('•')[0]}
                    </span>
                  </div>

                  <Link
                    href={exam.href}
                    prefetch={false}
                    className="w-full bg-slate-900 text-white hover:bg-blue-600 px-5 py-3 text-center font-bold text-sm tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Start Free {exam.name} Mock <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Progress Indicator Dots & Navigation Info */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            {MOCK_EXAMS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Jump to slide ${idx + 1}`}
                className={`h-2.5 transition-all rounded-full cursor-pointer ${
                  activeIndex === idx ? 'w-7 bg-blue-600' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
            <span className="text-xs font-bold uppercase tracking-wider ml-2 text-slate-500">
              {activeIndex + 1} of {MOCK_EXAMS.length} Free Tests
            </span>
          </div>

          <div className="text-xs font-medium text-slate-500 text-center sm:text-right">
            ⚡ Instant scoring • Section timers • Real CBT interface • 100% Free
          </div>
        </div>
      </div>
    </section>
  );
}
