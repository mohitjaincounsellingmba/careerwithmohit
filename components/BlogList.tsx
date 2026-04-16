"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/markdown';

export function BlogList({ initialPosts }: { initialPosts: PostData[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const validCategories = initialPosts
      .map(post => post.category)
      .filter((cat): cat is string => Boolean(cat));
      
    const uniqueCategories = Array.from(new Set(validCategories)).sort((a, b) => a.localeCompare(b));
    return ['All', ...uniqueCategories];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return initialPosts;
    return initialPosts.filter(post => post.category === activeCategory);
  }, [activeCategory, initialPosts]);

  return (
    <div className="w-full">
      {/* FILTER CONTROLS */}
      <div className="mb-12 space-y-6 bg-white p-6 rounded-xl border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <span className="text-lg font-black text-foreground uppercase tracking-tighter w-full md:w-auto md:min-w-[120px]">
            Filter by:
          </span>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-md font-bold text-base border-2 border-foreground transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${
                  activeCategory === category 
                    ? 'bg-primary text-white translate-x-[1px] translate-y-[1px] shadow-none' 
                    : 'bg-gray-50 text-foreground hover:bg-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE FILTER STATUS */}
        {activeCategory !== 'All' && (
          <div className="pt-4 border-t-2 border-gray-100 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-500 italic">
              Showing results for: <span className="text-primary">{activeCategory}</span> 
            </p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="text-xs font-black uppercase tracking-widest text-rose-500 hover:text-rose-700 underline"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* BLOG GRID */}
      <div className="grid gap-10 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(({ slug, title, date, description, category }) => (
            <Link 
              key={slug} 
              href={`/blog/${slug}`} 
              prefetch={false}
              className="group flex flex-col rounded-xl border-4 border-foreground bg-white p-8 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-2 hover:bg-gray-50 h-full shadow-[6px_6px_0px_0px_rgba(59,130,246,1)]"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-bold uppercase tracking-widest text-foreground border-2 border-foreground">
                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                {category && (
                  <span className="inline-block rounded-md bg-secondary text-white px-2 py-1 text-xs font-black uppercase tracking-wider border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {category}
                  </span>
                )}
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
            <p className="text-2xl font-bold text-gray-400">No articles found for the selected category. Try another!</p>
          </div>
        )}
      </div>
    </div>
  );
}
