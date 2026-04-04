import { Metadata } from 'next';
import { InstagramFollowersGenerator } from '@/components/InstagramFollowersGenerator';
import { Users, Zap, TrendingUp, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Free Instagram Followers Generator 2026 | Education Niche Growth",
  description: "Scale your educational Instagram account with our Viral Followers Generator. Get custom growth roadmaps for JEE, MBA, and Career Coaching niches. 100% Organic & Safe.",
  keywords: ["instagram followers generator free", "educational influencer growth", "how to get followers for coaching center", "jee neet instagram tips", "mba influencer strategy 2026", "organic instagram growth education"],
  alternates: {
    canonical: "/tools/instagram-followers-generator",
  },
};

export default function InstagramFollowersPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this Instagram Followers Generator safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Unlike bot services, our tool uses AI to analyze your niche and provide a custom growth roadmap. We never ask for your password."
        }
      },
      {
        "@type": "Question",
        "name": "How fast will I see results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By following our 30-day viral roadmap, users typically see a 25-40% increase in organic reach and engagement within the first 14 days."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white pb-24 overflow-hidden font-sans">
      <JsonLd data={faqSchema} />
      
      {/* HERO SECTION */}
      <section className="relative bg-rose-500 py-24 px-6 sm:px-12 border-b-8 border-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-8 h-full">
                {[...Array(16)].map((_, i) => (
                    <Users key={i} className="text-white w-full h-auto p-4" />
                ))}
            </div>
        </div>
        
        <div className="relative mx-auto max-w-7xl text-center z-10">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-black uppercase tracking-widest text-foreground">Follower Engine 2026</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8">
            Get <span className="bg-foreground text-white px-4 -rotate-1 inline-block border-4 border-rose-400">Viral</span> <br />
            Followers
          </h1>
          <p className="mx-auto max-w-2xl text-xl font-bold text-rose-50 leading-relaxed italic border-l-4 border-white pl-6">
            Stop struggling with the algorithm. Our AI analyzes your education niche to generate a viral roadmap that attracts authentic followers.
          </p>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section className="px-6 -mt-16 relative z-30">
        <InstagramFollowersGenerator />
      </section>

      {/* VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
                <div className="bg-rose-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto border-4 border-foreground rotate-3">
                    <TrendingUp className="w-10 h-10 text-rose-600" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Rapid Growth</h3>
                <p className="text-gray-500 font-bold leading-relaxed text-sm">Engineered for educational profiles to hit their first 10k authentic followers fast.</p>
            </div>
            <div className="space-y-4">
                <div className="bg-amber-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto border-4 border-foreground -rotate-3">
                    <Zap className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Viral Hooks</h3>
                <p className="text-gray-500 font-bold leading-relaxed text-sm">Get access to niche-specific content hooks that stop the scroll instantly.</p>
            </div>
            <div className="space-y-4">
                <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto border-4 border-foreground rotate-6">
                    <ShieldCheck className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">100% Safe</h3>
                <p className="text-gray-500 font-bold leading-relaxed text-sm">No bots. No fake followers. Just high-quality organic growth strategies.</p>
            </div>
        </div>
      </section>

      {/* CONTENT GUIDE */}
      <section className="bg-slate-50 py-24 border-y-4 border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-16 text-center justify-center">
                <HelpCircle className="w-10 h-10 text-rose-500" />
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Why Choose Us?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-6">
                    <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h4 className="text-xl font-black uppercase mb-4 text-rose-500">Niche Expertise</h4>
                        <p className="text-slate-600 font-bold leading-relaxed">Unlike generic tools, we specialize in **Engineering (JEE/NEET)**, **Management (CAT/MBA)**, and **Study Abroad** niches. Our data is tuned to what students actually want to watch in 2026.</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(236,72,153,1)]">
                        <h4 className="text-xl font-black uppercase mb-4 text-primary">Algorithm Mapping</h4>
                        <p className="text-slate-600 font-bold leading-relaxed">We provide precise posting times and reel-specific hashtags derived from local metadata, giving you an unfair advantage over creators using hit-and-trial methods.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}
