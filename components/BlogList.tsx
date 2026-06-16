"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { PostData } from '@/lib/markdown';

// Helper to hash slug for stable variance
function getSlugHash(slug: string): number {
  return slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function calculateInitialViews(slug: string, dateStr: string): number {
  try {
    const publishedDate = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - publishedDate.getTime());
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    
    const hash = getSlugHash(slug);
    const variance = (hash % 11) - 5; // -5 to +5 variance
    const dailyAverage = Math.max(8, 15 + variance);
    
    const baseViews = diffDays * dailyAverage;
    const randomFactor = hash % 89;
    
    return Math.floor(baseViews + randomFactor);
  } catch (e) {
    return 120; // safe fallback
  }
}

export function BlogList({ initialPosts }: { initialPosts: PostData[] }) {
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({});

  useEffect(() => {
    let active = true;
    fetch('/api/views')
      .then(res => res.json())
      .then(data => {
        if (active) {
          setViewsMap(data);
        }
      })
      .catch(err => console.error('Error fetching views:', err));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="w-full">
      {/* BLOG GRID */}
      <div className="grid gap-10 lg:grid-cols-3">
        {initialPosts.length > 0 ? (
          initialPosts.map(({ slug, title, date, description, category }) => {
            const viewsCount = viewsMap[slug] !== undefined ? viewsMap[slug] : calculateInitialViews(slug, date);
            
            return (
              <Link 
                key={slug} 
                href={`/blog/${slug}`} 
                prefetch={false}
                className="group flex flex-col rounded-xl border-4 border-foreground bg-white p-8 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-2 hover:bg-gray-50 h-full shadow-[6px_6px_0px_0px_rgba(59,130,246,1)]"
              >
                <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-bold uppercase tracking-widest text-foreground border-2 border-foreground">
                      {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-foreground px-3 py-1 text-xs font-bold border-2 border-foreground">
                      <Eye className="w-3.5 h-3.5 stroke-[2.5] text-primary" />
                      <span>{viewsCount.toLocaleString()}</span>
                    </div>
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
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center bg-white border-4 border-dashed border-gray-200 rounded-xl">
            <p className="text-2xl font-bold text-gray-400">No articles found. Stay tuned for updates!</p>
          </div>
        )}
      </div>
    </div>
  );
}
