"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/markdown';

export function BlogList({ initialPosts }: { initialPosts: PostData[] }) {
  const [activeYear, setActiveYear] = useState<string>('All');
  const [activeMonth, setActiveMonth] = useState<string>('All');
  const [activeDay, setActiveDay] = useState<string>('All');

  // Reset dependent filters when parent changes
  useEffect(() => {
    setActiveMonth('All');
    setActiveDay('All');
  }, [activeYear]);

  useEffect(() => {
    setActiveDay('All');
  }, [activeMonth]);

  // Hierarchical Data Extraction
  const years = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(initialPosts.map(post => new Date(post.date).getFullYear().toString()))
    ).sort((a, b) => b.localeCompare(a));
    return ['All', ...uniqueYears];
  }, [initialPosts]);

  const months = useMemo(() => {
    if (activeYear === 'All') return [];
    const filteredByYear = initialPosts.filter(post => 
      new Date(post.date).getFullYear().toString() === activeYear
    );
    const uniqueMonths = Array.from(
      new Set(filteredByYear.map(post => {
        const d = new Date(post.date);
        return d.toLocaleString('default', { month: 'long' });
      }))
    ).sort((a, b) => {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return monthNames.indexOf(a) - monthNames.indexOf(b);
    });
    return ['All', ...uniqueMonths];
  }, [activeYear, initialPosts]);

  const days = useMemo(() => {
    if (activeMonth === 'All' || activeYear === 'All') return [];
    const filteredByMonth = initialPosts.filter(post => {
      const d = new Date(post.date);
      return d.getFullYear().toString() === activeYear && 
             d.toLocaleString('default', { month: 'long' }) === activeMonth;
    });
    const uniqueDays = Array.from(
      new Set(filteredByMonth.map(post => new Date(post.date).getDate().toString()))
    ).sort((a, b) => parseInt(a) - parseInt(b));
    return ['All', ...uniqueDays];
  }, [activeYear, activeMonth, initialPosts]);

  // Final Filtering Logic
  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      const d = new Date(post.date);
      const yearMatch = activeYear === 'All' || d.getFullYear().toString() === activeYear;
      const monthMatch = activeMonth === 'All' || d.toLocaleString('default', { month: 'long' }) === activeMonth;
      const dayMatch = activeDay === 'All' || d.getDate().toString() === activeDay;
      return yearMatch && monthMatch && dayMatch;
    });
  }, [activeYear, activeMonth, activeDay, initialPosts]);

  return (
    <div className="w-full">
      {/* FILTER CONTROLS */}
      <div className="mb-12 space-y-8 bg-white p-8 rounded-xl border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        {/* YEAR FILTER */}
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-sm font-black text-gray-400 uppercase tracking-tighter w-full md:w-auto md:min-w-[100px]">Step 1: Year</span>
          <div className="flex flex-wrap gap-3">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-5 py-2 rounded-md font-bold text-base border-2 border-foreground transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${
                  activeYear === year 
                    ? 'bg-primary text-white translate-x-[1px] translate-y-[1px]' 
                    : 'bg-gray-50 text-foreground hover:bg-accent'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* MONTH FILTER (Condition-based) */}
        {activeYear !== 'All' && months.length > 1 && (
          <div className="flex flex-wrap gap-4 items-center animate-in fade-in slide-in-from-left-4 duration-300">
            <span className="text-sm font-black text-gray-400 uppercase tracking-tighter w-full md:w-auto md:min-w-[100px]">Step 2: Month</span>
            <div className="flex flex-wrap gap-3">
              {months.map(month => (
                <button
                  key={month}
                  onClick={() => setActiveMonth(month)}
                  className={`px-5 py-2 rounded-md font-bold text-base border-2 border-foreground transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${
                    activeMonth === month 
                      ? 'bg-secondary text-white translate-x-[1px] translate-y-[1px]' 
                      : 'bg-gray-50 text-foreground hover:bg-emerald-50'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DAY FILTER (Condition-based) */}
        {activeMonth !== 'All' && days.length > 1 && (
          <div className="flex flex-wrap gap-4 items-center animate-in fade-in slide-in-from-left-4 duration-300">
            <span className="text-sm font-black text-gray-400 uppercase tracking-tighter w-full md:w-auto md:min-w-[100px]">Step 3: Date</span>
            <div className="flex flex-wrap gap-3">
              {days.map(day => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-4 py-2 rounded-md font-bold text-base border-2 border-foreground transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${
                    activeDay === day 
                      ? 'bg-accent text-foreground translate-x-[1px] translate-y-[1px]' 
                      : 'bg-gray-50 text-foreground hover:bg-amber-50'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVE FILTER STATUS */}
        {(activeYear !== 'All' || activeMonth !== 'All' || activeDay !== 'All') && (
          <div className="pt-4 border-t-2 border-gray-100 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-500 italic">
              Showing results for: <span className="text-primary">{activeYear}</span> 
              {activeMonth !== 'All' && <> &raquo; <span className="text-secondary">{activeMonth}</span></>}
              {activeDay !== 'All' && <> &raquo; <span className="text-accent">{activeDay}</span></>}
            </p>
            <button 
              onClick={() => { setActiveYear('All'); setActiveMonth('All'); setActiveDay('All'); }}
              className="text-xs font-black uppercase tracking-widest text-rose-500 hover:text-rose-700 underline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* BLOG GRID */}
      <div className="grid gap-10 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(({ slug, title, date, description }) => (
            <Link 
              key={slug} 
              href={`/blog/${slug}`} 
              className="group flex flex-col rounded-xl border-4 border-foreground bg-white p-8 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-2 hover:bg-gray-50 h-full shadow-[6px_6px_0px_0px_rgba(59,130,246,1)]"
            >
              <div className="mb-6 inline-block rounded-full bg-accent px-4 py-1 text-sm font-bold uppercase tracking-widest text-foreground border-2 border-foreground self-start">
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-foreground mb-5 group-hover:text-primary transition-colors line-clamp-3 leading-tight">
                {title}
              </h3>
              {description && (
                <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8 line-clamp-3">
                  {description}
                </p>
              )}
              <div className="mt-auto flex items-center font-bold text-primary group-hover:text-foreground text-lg transition-colors">
                Read Article 
                <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-2">&rarr;</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white border-4 border-dashed border-gray-200 rounded-xl">
            <p className="text-2xl font-bold text-gray-400">No articles found for the selected criteria. Try adjusting your filters!</p>
          </div>
        )}
      </div>
    </div>
  );
}
