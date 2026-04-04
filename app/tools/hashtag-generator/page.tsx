import { Metadata } from 'next';
import { HashtagGenerator } from '@/components/HashtagGenerator';
import { Hash, Zap, Globe, Target, Share2, TrendingUp, HelpCircle } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Trending Social Media Hashtag Generator 2026 | YouTube, LinkedIn, Instagram",
  description: "Boost your reach with our AI-powered Hashtag Generator. Specialized trending hashtags for YouTube, LinkedIn, Instagram, and Facebook in the Education and Career niche.",
  keywords: ["hashtag generator 2026", "trending hashtags education", "youtube tags generator", "linkedin hashtags for careers", "instagram hashtags for students", "reach 10x audience"],
  alternates: {
    canonical: "/tools/hashtag-generator",
  },
};

export default function HashtagGeneratorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do hashtags help in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hashtags help algorithms categorize your content. In 2026, niche-specific hashtags (like #CAT2026 or #JEEMains) are more effective than broad tags for reaching a high-intent audience."
        }
      },
      {
        "@type": "Question",
        "name": "Which platform requires the most hashtags?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Instagram still supports up to 30 hashtags, while LinkedIn and YouTube perform best with 3-5 highly relevant, trending tags."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-24 overflow-hidden">
      <JsonLd data={faqSchema} />
      
      {/* HERO SECTION */}
      <section className="relative bg-primary py-24 px-6 sm:px-12 border-b-8 border-foreground">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-6 h-full">
                {[...Array(12)].map((_, i) => (
                    <Hash key={i} className="text-white w-full h-auto" />
                ))}
            </div>
        </div>
        
        <div className="relative mx-auto max-w-7xl text-center z-10">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 animate-bounce">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-black uppercase tracking-widest text-foreground">Viral Tool 2026</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8">
            Reach <span className="bg-accent text-foreground px-4 -rotate-1 inline-block border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">10X</span> <br />
            Audience
          </h1>
          <p className="mx-auto max-w-2xl text-xl font-bold text-blue-50 leading-relaxed italic">
            Generate high-conversion hashtags for YouTube, LinkedIn, and Instagram in seconds. Dominate the algorithm with curated trends.
          </p>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section className="px-6 -mt-16 relative z-30">
        <HashtagGenerator />
      </section>

      {/* STRATEGY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform">
            <Globe className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Global Reach</h3>
            <p className="text-gray-600 font-bold leading-relaxed">Our generator analyzes global educational trends to ensure your content reaches the right aspirants worldwide.</p>
        </div>
        <div className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(37,99,235,1)] hover:-translate-y-2 transition-transform">
            <Target className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Platform Optimized</h3>
            <p className="text-gray-600 font-bold leading-relaxed">Get specific formatting for every platform. Comma-separated for YouTube, space-separated for Instagram.</p>
        </div>
        <div className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(244,63,94,1)] hover:-translate-y-2 transition-transform">
            <TrendingUp className="w-12 h-12 text-rose-500 mb-6" />
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Niche Focused</h3>
            <p className="text-gray-600 font-bold leading-relaxed">Specially tuned for MBA, Engineering, and Career Counseling keywords to maximize lead conversion.</p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-12 border-b-4 border-foreground pb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-black uppercase tracking-tighter">Everything to Know</h2>
        </div>
        <div className="space-y-8">
            <div className="space-y-3">
                <h4 className="text-xl font-extrabold text-foreground flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-primary" />
                    Why use platform-specific tags?
                </h4>
                <p className="text-gray-600 font-bold leading-relaxed pl-8 border-l-4 border-slate-200">
                    YouTube relies on 'video tags' for SEO, while Instagram uses hashtags for the Explore feed. Our tool detects these nuances and formats content accordingly.
                </p>
            </div>
            <div className="space-y-3">
                <h4 className="text-xl font-extrabold text-foreground flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    How many hashtags are ideal for LinkedIn?
                </h4>
                <p className="text-gray-600 font-bold leading-relaxed pl-8 border-l-4 border-slate-200">
                    LinkedIn's algorithm favors quality over quantity. Using 3-5 hyper-relevant tags (like #StudyAbroad or #MBAAdmissions) delivers the best organic reach.
                </p>
            </div>
        </div>
      </section>
    </main>
  );
}
