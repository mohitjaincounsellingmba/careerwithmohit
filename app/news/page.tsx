import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

import { NEWS_ITEMS } from '@/lib/news';

export const metadata = {
  title: "Latest News | Education & Career Updates",
  description: "Stay updated with the latest education news, admission alerts, and career growth insights from CareerWithMohit.",
  keywords: ['MBA admission news', 'CAT 2026 updates', 'JEE Advanced news', 'education news India', 'career updates', 'B-school admission alerts'],
  alternates: {
    canonical: "/news",
  },
};

export default function NewsPage() {
  return (
    <div className="w-full bg-muted min-h-screen px-6 py-24 sm:px-12 sm:py-32 border-t-8 border-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 md:flex md:items-end md:justify-between border-b-8 border-foreground pb-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl font-extrabold tracking-tighter text-foreground sm:text-7xl uppercase">
              Latest <span className="bg-primary text-white px-3 py-1 inline-block mt-4 -rotate-1 border-4 border-foreground">News</span> & Updates
            </h1>
            <p className="mt-8 text-2xl font-medium text-gray-600 leading-relaxed">
              Stay informed with the most recent developments in higher education, entrance exams, and career opportunities.
            </p>
          </div>
        </div>
        
        <div className="grid gap-10">
          {NEWS_ITEMS.map((item) => (
            <article 
              key={item.id} 
              className="group flex flex-col sm:flex-row gap-8 rounded-xl border-4 border-foreground bg-white p-8 sm:p-10 transition-all duration-200 hover:scale-[1.01] hover:bg-gray-50"
            >
              <div className="sm:w-1/4 flex-shrink-0">
                <span className="inline-flex items-center bg-accent border-2 border-foreground px-4 py-1 text-sm font-bold uppercase tracking-widest text-foreground mb-6">
                  {item.category}
                </span>
                <div className="flex items-center text-base text-gray-500 font-bold uppercase tracking-widest">
                  <Calendar className="mr-3 h-5 w-5 stroke-[2.5px]" />
                  <time>{item.date}</time>
                </div>
              </div>
              
              <div className="sm:w-3/4 flex flex-col justify-center">
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                  <Link href={item.link}>{item.title}</Link>
                </h2>
                <p className="text-gray-600 text-lg font-medium leading-relaxed max-w-3xl mb-6">
                  {item.excerpt}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={item.link} 
                    className="inline-flex items-center text-lg font-bold text-primary hover:text-foreground transition-colors group-hover:translate-x-2 transition-transform duration-200"
                  >
                    Read Full Story <ArrowRight className="ml-2 h-5 w-5 stroke-[3px]" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 rounded-xl bg-amber-400 border-4 border-foreground p-10 sm:p-16 text-center max-w-4xl mx-auto flex flex-col items-center">
           <h3 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6 uppercase">
             Information Overload?
           </h3>
           <p className="text-gray-900 text-xl font-medium mb-10 max-w-2xl">
             Speak with our experts to get personalized, no-nonsense advice on navigating the latest admission requirements.
           </p>
           <a href="https://wa.me/919560020771" target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center bg-white border-4 border-foreground px-10 py-2 text-xl font-bold text-foreground transition-all hover:bg-gray-100 hover:scale-105 hover:-translate-y-1">
              Connect on WhatsApp
           </a>
        </div>
      </div>
    </div>
  );
}
