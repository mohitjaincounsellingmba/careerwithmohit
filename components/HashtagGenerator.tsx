"use client";

import { useState, useMemo } from "react";
import { 
  Hash, 
  Youtube, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Copy, 
  Check, 
  Sparkles, 
  TrendingUp, 
  Search,
  Zap,
  ArrowRight
} from "lucide-react";

type Platform = "instagram" | "youtube" | "linkedin" | "facebook";

const TRENDING_TAGS: Record<string, string[]> = {
  "MBA": ["#mba", "#management", "#cat2026", "#bschool", "#leadership", "#businesseducation", "#mbajourney", "#topcolleges"],
  "JEE": ["#jeemain", "#jeeadvanced", "#iitjee", "#engineering", "#jee2026", "#physics", "#chemistry", "#maths", "#nit", "#iiit"],
  "CAREER": ["#careergoals", "#jobsearch", "#professionalgrowth", "#placement", "#careeradvice", "#hiring", "#success", "#futureofwork"],
  "MARKETING": ["#digitalmarketing", "#branding", "#socialmedia", "#contentstrategy", "#seo", "#marketingtips", "#growthhacking"],
  "AI": ["#artificialintelligence", "#ai", "#machinelearning", "#techtrends", "#future", "#innovation", "#chatgpt", "#automation"],
  "EDUCATION": ["#education", "#learning", "#students", "#upskilling", "#highereducation", "#studygram", "#edtech"],
};

const PLATFORM_CONFIG: Record<Platform, { color: string, icon: any, label: string }> = {
  instagram: { color: "text-rose-500", icon: Instagram, label: "Instagram" },
  youtube: { color: "text-red-600", icon: Youtube, label: "YouTube" },
  linkedin: { color: "text-blue-700", icon: Linkedin, label: "LinkedIn" },
  facebook: { color: "text-blue-600", icon: Facebook, label: "Facebook" },
};

export function HashtagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [activePlatform, setActivePlatform] = useState<Platform>("instagram");
  const [copied, setCopied] = useState(false);

  const generatedTags = useMemo(() => {
    if (!keyword.trim()) return [];
    
    const base = keyword.toLowerCase().replace(/\s+/g, "");
    const generic = ["#trending", "#viral", "#foryou", "#explore", "#careerwithmohit", "#admission2026", "#studentgoals"];
    
    // Find matching trending category
    const trendMatches = Object.keys(TRENDING_TAGS).find(k => keyword.toUpperCase().includes(k));
    const trends = trendMatches ? TRENDING_TAGS[trendMatches] : [];

    const tags = [
      `#${base}`,
      `#${base}2026`,
      `#${base}education`,
      `#best${base}colleges`,
      `#${base}tips`,
      ...trends,
      ...generic
    ];

    // Platform-specific adjustments
    if (activePlatform === "linkedin") {
      return tags.slice(0, 5).map(t => t.replace(/#/, "#")); // LinkedIn prefers fewer, high-relevance tags
    }
    if (activePlatform === "youtube") {
      return tags.map(t => t.replace(/#/, "")); // YouTube description tags
    }
    
    return Array.from(new Set(tags)).slice(0, 25);
  }, [keyword, activePlatform]);

  const handleCopy = () => {
    const textToCopy = activePlatform === "youtube" 
      ? generatedTags.join(", ") 
      : generatedTags.join(" ");
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(37,99,235,1)] p-8 md:p-12 overflow-hidden relative">
        <div className="absolute -top-10 -right-10 opacity-5 rotate-12">
            <Hash size={200} strokeWidth={3} className="text-primary" />
        </div>

        <div className="flex items-center gap-4 mb-12 border-b-4 border-foreground pb-8">
          <div className="bg-primary p-4 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            Hashtag <span className="text-primary italic">Generator</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Control Panel */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <label className="block text-sm font-black uppercase tracking-widest mb-4 text-slate-500">Enter Your Niche / Keyword</label>
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text"
                  placeholder="e.g. MBA, JEE 2026, Career Advice..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-slate-50 border-4 border-foreground p-6 pl-16 text-2xl font-black uppercase tracking-tight focus:bg-white focus:outline-none transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(Object.keys(PLATFORM_CONFIG) as Platform[]).map((p) => {
                const Config = PLATFORM_CONFIG[p];
                const Icon = Config.icon;
                const isActive = activePlatform === p;
                return (
                  <button
                    key={p}
                    onClick={() => setActivePlatform(p)}
                    className={`flex flex-col items-center justify-center p-4 border-4 transition-all duration-200 ${
                      isActive 
                        ? `bg-foreground text-white border-primary shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] -translate-y-1` 
                        : "bg-white border-slate-200 text-slate-400 hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-2 ${isActive ? "text-white" : Config.color}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{Config.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="bg-indigo-50 border-4 border-primary p-6 relative overflow-hidden group">
                <TrendingUp className="absolute -right-4 -bottom-4 w-24 h-24 text-primary/10 transition-transform group-hover:scale-110" />
                <h4 className="text-xs font-black uppercase text-primary tracking-widest mb-4">Trending Tags Context</h4>
                <div className="flex flex-wrap gap-2">
                    {Object.keys(TRENDING_TAGS).map(tag => (
                        <button 
                            key={tag}
                            onClick={() => setKeyword(tag)}
                            className="bg-white border-2 border-primary px-3 py-1 text-[10px] font-black uppercase text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-foreground text-white border-[6px] border-primary p-8 h-full flex flex-col shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] min-h-[400px]">
              <div className="flex items-center justify-between mb-8 border-b border-white/20 pb-4">
                 <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-sm font-black uppercase tracking-widest leading-none">Output Preview</span>
                 </div>
                 {generatedTags.length > 0 && (
                   <button 
                    onClick={handleCopy}
                    className="bg-primary text-white p-2 border-2 border-white hover:bg-white hover:text-black transition-all flex items-center gap-2 text-[10px] font-black uppercase"
                   >
                     {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                     {copied ? "COPIED" : "COPY ALL"}
                   </button>
                 )}
              </div>

              <div className="flex-1 font-mono text-sm leading-relaxed overflow-y-auto max-h-[300px] custom-scrollbar">
                {!keyword ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-30 text-center animate-pulse">
                    <Hash size={48} className="mb-4" />
                    <p className="font-bold">Waiting for keyword...</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-x-3 gap-y-2">
                    {generatedTags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className={`inline-block py-1 hover:text-primary transition-colors cursor-default ${activePlatform === 'youtube' ? 'before:content-["#"] before:text-primary before:mr-0.5' : ''}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                Built for Creators & Students to reach 10x More Audience
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
                <Link 
                    href="/inquiry" 
                    className="bg-accent border-4 border-foreground p-4 text-center font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                    Get Personal Growth Coaching <ArrowRight size={14} />
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal Link component for within the component
function Link({ href, children, className }: { href: string, children: any, className?: string }) {
    return (
        <a href={href} className={className}>
            {children}
        </a>
    )
}
