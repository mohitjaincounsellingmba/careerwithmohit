"use client";

import Link from 'next/link';
import { PostData } from '@/lib/markdown';

export function BlogList({ initialPosts }: { initialPosts: PostData[] }) {
  return (
    <div className="w-full">
      {/* BLOG GRID */}
      <div className="grid gap-10 lg:grid-cols-3">
        {initialPosts.length > 0 ? (
          initialPosts.map(({ slug, title, date, description, category }) => (
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
            <p className="text-2xl font-bold text-gray-400">No articles found. Stay tuned for updates!</p>
          </div>
        )}
      </div>
    </div>
  );
}
