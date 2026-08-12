import { Metadata } from 'next';
import { HashtagGenerator } from '@/components/HashtagGenerator';
import { Hash, Zap, Globe, Target, Share2, TrendingUp, HelpCircle } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Trending Social Media Hashtag Generator 2026-2027 | YouTube, LinkedIn, Instagram | CareerWithMohit",
  description: "Boost your reach with our AI-powered Hashtag Generator. Specialized trending hashtags for YouTube, LinkedIn, Instagram, and Facebook in the Education and Career niche.",
  keywords: ["hashtag generator 2026", "trending hashtags education", "youtube tags generator", "linkedin hashtags for careers", "instagram hashtags for students", "reach 10x audience"],
  alternates: {
    canonical: "https://www.careerwithmohit.online/tools/hashtag-generator",
  },
  openGraph: {
    title: "Trending Social Media Hashtag Generator | CareerWithMohit",
    description: "Generate viral hashtags for YouTube, LinkedIn, Instagram, and Career posts with one click.",
    url: "https://www.careerwithmohit.online/tools/hashtag-generator",
    siteName: "CareerWithMohit",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Social Media Hashtag Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trending Social Media Hashtag Generator | CareerWithMohit",
    description: "Generate viral hashtags for YouTube, LinkedIn, and Instagram.",
    images: ["/og-image.webp"],
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

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Trending Social Media Hashtag Generator",
    "url": "https://www.careerwithmohit.online/tools/hashtag-generator",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-24 overflow-hidden">
      <JsonLd data={faqSchema} />
      <JsonLd data={softwareSchema} />
      
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
          <p className="max-w-2xl mx-auto text-xl font-bold text-white/90 leading-tight mb-8">
            Generate high-conversion, algorithm-tested hashtags for LinkedIn, Instagram, and YouTube. Dominate your niche in seconds.
          </p>
        </div>
      </section>

      {/* GENERATOR INTERFACE */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12">
            <HashtagGenerator />
        </div>
      </div>

      {/* EDUCATIONAL / WHY USE SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 mt-24">
        <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-foreground mb-4">
                Why Hashtags <span className="text-primary underline decoration-accent decoration-8">Matter</span>
            </h2>
            <p className="text-gray-600 font-bold max-w-xl mx-auto text-lg">
                Stop guessing. Start ranking on Explore pages, LinkedIn Feeds, and YouTube Search.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Target className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-black uppercase mb-4">Hyper-Targeting</h3>
                <p className="font-bold text-gray-600 leading-relaxed">Reach students and professionals actively searching for test prep, admissions, and career advice.</p>
            </div>
            
            <div className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <TrendingUp className="w-12 h-12 text-secondary mb-6" />
                <h3 className="text-2xl font-black uppercase mb-4">Algorithm Boost</h3>
                <p className="font-bold text-gray-600 leading-relaxed">Our curated sets align with 2026 social algorithms favoring contextual relevance over generic spam.</p>
            </div>

            <div className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Share2 className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-black uppercase mb-4">Cross-Platform</h3>
                <p className="font-bold text-gray-600 leading-relaxed">Optimized formatting ensures clean line breaks and optimal density whether posting to Reels, Shorts, or Posts.</p>
            </div>
        </div>
      </section>
    </main>
  );
}
