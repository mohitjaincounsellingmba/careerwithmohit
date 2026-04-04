import { Metadata } from 'next';
import { BacklinkGenerator } from '@/components/BacklinkGenerator';
import { Globe, Zap, Link2, ShieldCheck, Target, TrendingUp, HelpCircle, FileText } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Professional Backlink Strategy Generator 2026 | EdTech & MBA SEO",
  description: "Boost your search ranking with our free Backlink Generator. Get a curated list of Do-Follow and No-Follow opportunities specialized for Higher Education and Career niches.",
  keywords: ["backlink generator free", "dofollow links education niche", "mba guest post list", "engineering blog backlinks", "seo tool for educational businesses", "high da backlinks 2026"],
  alternates: {
    canonical: "/tools/backlink-generator",
  },
};

export default function BacklinkGeneratorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are these backlinks safe for my website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our tool focuses on high-DA, white-hat opportunities (universities, reputable blogs, and industry directories) that follow Google's search guidelines."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Do-Follow and No-Follow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Do-Follow links pass 'link juice' and help increase your domain authority directly. No-Follow links don't pass authority but are crucial for a natural-looking backlink profile and driving referral traffic."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-24 overflow-hidden font-sans">
      <JsonLd data={faqSchema} />
      
      {/* HERO SECTION */}
      <section className="relative bg-primary py-24 px-6 sm:px-12 border-b-8 border-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-10 h-full gap-4">
                {[...Array(20)].map((_, i) => (
                    <Link2 key={i} className="text-white w-full h-auto p-2" />
                ))}
            </div>
        </div>
        
        <div className="relative mx-auto max-w-7xl text-center z-10">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-sm font-black uppercase tracking-widest text-foreground">SEO Authority Engine 2026</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8">
            Build <span className="bg-foreground text-white px-4 -rotate-1 inline-block border-4 border-primary">High-DA</span> <br />
            Backlinks
          </h1>
          <p className="mx-auto max-w-3xl text-xl font-bold text-blue-50 leading-relaxed italic border-l-4 border-white pl-6">
            Rank #1 on Google for competitive keywords. Our AI generates a niche-specific backlink roadmap including do-follow opportunities and outreach templates.
          </p>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section className="px-6 -mt-16 relative z-30">
        <BacklinkGenerator />
      </section>

      {/* VALUE SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-4">
                <div className="bg-white w-20 h-20 flex items-center justify-center mx-auto border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Globe className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">University Outreach</h3>
                <p className="text-gray-500 font-bold leading-relaxed text-sm">Target .edu and high-DA university domains for powerful ranking signals.</p>
            </div>
            <div className="space-y-4">
                <div className="bg-white w-20 h-20 flex items-center justify-center mx-auto border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]">
                    <TrendingUp className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Authority Growth</h3>
                <p className="text-gray-500 font-bold leading-relaxed text-sm">Focus on 70+ DR sites to skyrocket your domain authority in months.</p>
            </div>
            <div className="space-y-4">
                <div className="bg-white w-20 h-20 flex items-center justify-center mx-auto border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
                    <Zap className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Do-Follow Focused</h3>
                <p className="text-gray-500 font-bold leading-relaxed text-sm">Prioritize the links that actually pass search authority to your domain.</p>
            </div>
            <div className="space-y-4">
                <div className="bg-white w-20 h-20 flex items-center justify-center mx-auto border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(168,85,247,1)]">
                    <FileText className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Ready Templates</h3>
                <p className="text-gray-500 font-bold leading-relaxed text-sm">Professional outreach scripts to ensure a 25%+ placement success rate.</p>
            </div>
        </div>
      </section>

      {/* STRATEGY GUIDE */}
      <section className="bg-foreground py-24 px-6 border-y-8 border-primary">
        <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-6">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">SEO Strategy <span className="text-primary italic">2026</span></h2>
                <div className="h-2 w-32 bg-primary mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white/5 p-8 border-2 border-white/10 rounded-xl group hover:bg-white/10 transition-colors">
                    <Target className="w-8 h-8 text-primary mb-6" />
                    <h4 className="text-xl font-black text-white uppercase mb-4 tracking-tighter">Niche Relevancy</h4>
                    <p className="text-gray-400 font-bold leading-relaxed">In 2026, Google values relevancy more than quantity. A single backlink from an **MBA resource site** is worth 100 links from generic directories.</p>
                </div>
                <div className="bg-white/5 p-8 border-2 border-white/10 rounded-xl group hover:bg-white/10 transition-colors">
                    <HelpCircle className="w-8 h-8 text-blue-400 mb-6" />
                    <h4 className="text-xl font-black text-white uppercase mb-4 tracking-tighter">Link Diversity</h4>
                    <p className="text-gray-400 font-bold leading-relaxed">Avoid a profile with 100% do-follow links. A natural-looking ratio (around 70:30) of do-follow to no-follow ensures SEO safety.</p>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}
