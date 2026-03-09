"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/markdown';

export function BlogList({ initialPosts }: { initialPosts: PostData[] }) {
  const [activeYear, setActiveYear] = useState<string>('All');

  // Extract unique years from posts
  const years = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(initialPosts.map(post => new Date(post.date).getFullYear().toString()))
    ).sort((a, b) => b.localeCompare(a));
    return ['All', ...uniqueYears];
  }, [initialPosts]);

  // Filter posts based on active year
  const filteredPosts = useMemo(() => {
    if (activeYear === 'All') return initialPosts;
    return initialPosts.filter(post => 
      new Date(post.date).getFullYear().toString() === activeYear
    );
  }, [activeYear, initialPosts]);

  return (
    <div className="w-full">
      {/* YEAR FILTER BAR */}
      <div className="mb-12 flex flex-wrap gap-4 items-center">
        <span className="text-lg font-bold text-gray-500 uppercase tracking-widest mr-2">Filter by Year:</span>
        {years.map(year => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`px-6 py-2 rounded-md font-bold text-lg border-4 border-foreground transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
              activeYear === year 
                ? 'bg-primary text-white translate-x-[1px] translate-y-[1px]' 
                : 'bg-white text-foreground hover:bg-accent'
            }`}
          >
            {year}
          </button>
        ))}
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
              <h3 className="font-display text-3xl font-bold tracking-tight text-foreground mb-5 group-hover:text-primary transition-colors line-clamp-3 leading-tight">
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
          <div className="col-span-full py-20 text-center">
            <p className="text-2xl font-bold text-gray-400">No articles found for this year. Try another!</p>
          </div>
        )}
      </div>
    </div>
  );
}
