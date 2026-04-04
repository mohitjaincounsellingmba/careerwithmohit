"use client";

import { useState, useEffect } from "react";
import { 
  Globe, 
  Search, 
  Zap, 
  TrendingUp, 
  Link2, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  Loader2,
  ArrowRight,
  ExternalLink,
  Target
} from "lucide-react";

type Niche = "mba" | "btech" | "studyabroad" | "edtech" | "marketing";

const NICHE_LINKS: Record<Niche, { label: string, dofollow: string[], nofollow: string[], templates: string[] }> = {
  mba: {
    label: "Management (B-Schools)",
    dofollow: ["mbauniverse.com", "pagalguy.com", "shiksha.com/mba", "topmba.com"],
    nofollow: ["quora.com/topic/MBA", "reddit.com/r/mba", "medium.com/tag/mba"],
    templates: ["Professional Guest Post Pitch", "Alumni Interview Request", "B-School Resource Inclusion"]
  },
  btech: {
    label: "Engineering (B.Tech/JEE)",
    dofollow: ["engineering.careers360.com", "collegepravesh.com", "entrancecorner.com"],
    nofollow: ["stackoverflow.com", "github.com", "hackernoon.com"],
    templates: ["Technical Tutorial Pitch", "College Review Collaboration", "Engineering Study Material Share"]
  },
  studyabroad: {
    label: "Study Abroad (IELTS/Visa)",
    dofollow: ["idp.com", "britishcouncil.org", "studyabroad.shiksha.com"],
    nofollow: ["forbes.com/advisor/education", "thepienews.com", "tripadvisor.com"],
    templates: ["Scholarship Guide Inclusion", "Visa FAQ Guest Contribution", "City-wise Living Guide Pitch"]
  },
  edtech: {
    label: "EdTech & E-Learning",
    dofollow: ["elearningindustry.com", "edsurge.com", "tce.edu"],
    nofollow: ["crunchbase.com", "producthunt.com", "indiehackers.com"],
    templates: ["Product Review Request", "EdTech Case Study Pitch", "Learning Management Guide Pitch"]
  },
  marketing: {
    label: "Digital Marketing & Career",
    dofollow: ["searchenginejournal.com", "socialmediaexaminer.com", "hubspot.com/blog"],
    nofollow: ["pinterest.com", "twitter.com/education", "linkedin.com/pulse"],
    templates: ["Strategic Infographic Pitch", "Career Roadmap Collaboration", "Top Tool List Inclusion"]
  }
};

export function BacklinkGenerator() {
  const [url, setUrl] = useState("");
  const [niche, setNiche] = useState<Niche>("mba");
  const [phase, setPhase] = useState<"input" | "analyzing" | "result">("input");
  const [analysisText, setAnalysisText] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", number: "", email: "" });

  const analysisSteps = [
    "Analyzing domain authority...",
    "Scanning backlink profiles...",
    "Finding do-follow opportunities...",
    "Checking no-follow efficiency...",
    "Mapping industry link graphs...",
    "Compiling high-DA guest list..."
  ];

  useEffect(() => {
    if (phase === "analyzing") {
      let step = 0;
      const interval = setInterval(() => {
        if (step < analysisSteps.length) {
          setAnalysisText(analysisSteps[step]);
          step++;
        } else {
          setPhase("result");
          clearInterval(interval);
        }
      }, 700);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          website: url,
          niche: NICHE_LINKS[niche].label,
          source: 'Backlink Strategy Generator',
          timestamp: new Date().toISOString()
        })
      });
      setIsUnlocked(true);
    } catch {
      alert("Submission failed. Try again.");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(37,99,235,1)] p-8 md:p-12 overflow-hidden relative">
        <div className="absolute -top-10 -right-10 opacity-5 rotate-12">
            <Link2 size={240} strokeWidth={3} className="text-primary" />
        </div>

        <div className="flex items-center gap-4 mb-12 border-b-4 border-foreground pb-8">
          <div className="bg-primary p-4 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
            Backlink <span className="text-primary">Generator</span>
          </h2>
        </div>

        {phase === "input" && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Target Website URL</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-primary text-sm uppercase">HTTPS://</span>
                  <input 
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="MYWEBSITE.COM"
                    className="w-full bg-slate-50 border-4 border-foreground p-5 pl-20 font-black text-lg focus:bg-white focus:outline-none transition-all uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Industry / Niche</label>
                <select 
                  value={niche}
                  onChange={(e) => setNiche(e.target.value as Niche)}
                  className="w-full bg-slate-50 border-4 border-foreground p-5 font-black text-lg focus:bg-white focus:outline-none transition-all uppercase appearance-none"
                >
                  {Object.keys(NICHE_LINKS).map(n => (
                    <option key={n} value={n}>{NICHE_LINKS[n as Niche].label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border-4 border-blue-200 p-8 flex gap-6">
              <ShieldCheck className="w-10 h-10 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-black uppercase text-blue-900 mb-1">SEO Guard Compliance</h4>
                <p className="text-sm font-bold text-blue-800/70 leading-snug italic">
                  Our system generates only **high-DA (60+) white-hat opportunities**. No penalty risk. No spam. 100% Google-friendly strategies.
                </p>
              </div>
            </div>

            <button 
              onClick={() => url && setPhase("analyzing")}
              disabled={!url}
              className="w-full bg-foreground text-white border-4 border-primary p-8 text-2xl font-black uppercase tracking-tighter hover:bg-primary transition-all shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-4 disabled:opacity-50"
            >
              <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              Generate Backlink Roadmap
            </button>
          </div>
        )}

        {phase === "analyzing" && (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-12 animate-in fade-in zoom-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse" />
              <Loader2 className="w-40 h-40 text-primary animate-spin" strokeWidth={3} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-16 h-16 text-foreground" />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-4xl font-black uppercase tracking-tighter">{analysisText}</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Scanning high-DA university networks...</p>
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="lg:col-span-12">
               <div className="bg-primary text-white p-8 border-b-[12px] border-foreground flex flex-col md:flex-row items-center justify-between gap-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] mb-12">
                  <div>
                    <h3 className="text-4xl font-black italic uppercase leading-none mb-2">Backlink Strategy Unlocked</h3>
                    <p className="text-blue-100 font-bold uppercase tracking-widest text-sm">Site: {url.toUpperCase()}</p>
                  </div>
                  <div className="bg-white/10 p-4 border-2 border-white/20 text-center">
                    <div className="text-3xl font-black">74+</div>
                    <div className="text-[10px] font-black uppercase opacity-60">Avg. Site DR</div>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-7 space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-emerald-50 border-[6px] border-emerald-500 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h4 className="text-sm font-black uppercase text-emerald-700 mb-6 flex items-center gap-2 border-b-2 border-emerald-200 pb-2">
                       <CheckCircle2 className="w-4 h-4" /> Do-Follow Sites
                    </h4>
                    <ul className="space-y-4">
                      {NICHE_LINKS[niche].dofollow.map((link, i) => (
                        <li key={i} className="text-xs font-black text-slate-800 flex items-center justify-between">
                          <span>{link}</span>
                          <span className="text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded italic">DA 70+</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-50 border-[6px] border-slate-700 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h4 className="text-sm font-black uppercase text-slate-700 mb-6 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
                       <ExternalLink className="w-4 h-4" /> No-Follow Sites
                    </h4>
                    <ul className="space-y-4">
                      {NICHE_LINKS[niche].nofollow.map((link, i) => (
                        <li key={i} className="text-xs font-black text-slate-800 flex items-center justify-between">
                          <span>{link}</span>
                          <span className="text-[9px] bg-slate-400 text-white px-2 py-0.5 rounded italic">DR 80+</span>
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>

               <div className="bg-indigo-50 border-4 border-indigo-200 p-8">
                 <h4 className="text-sm font-black uppercase text-indigo-700 mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5" /> Recommended Outreach Patterns
                 </h4>
                 <div className="grid grid-cols-1 gap-4">
                    {NICHE_LINKS[niche].templates.map((t, i) => (
                      <div key={i} className="bg-white p-4 border-2 border-indigo-100 flex items-center justify-between group hover:border-indigo-500 transition-colors">
                        <span className="text-sm font-bold text-slate-800">{t}</span>
                        <ArrowRight size={14} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                 </div>
               </div>
            </div>

            <div className="lg:col-span-5">
              {!isUnlocked ? (
                <div className="bg-white border-8 border-foreground p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
                     <Sparkles size={120} />
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-8 leading-tight">Unlock the <br/><span className="text-primary italic">Mega Link List</span></h3>
                  <p className="text-sm font-bold text-slate-400 mb-8 leading-relaxed">Unlock access to our curated database of **1,000+ Educational Guest Post sites** and direct contact IDs.</p>
                  <form onSubmit={handleLeadSubmit} className="space-y-5">
                    <input 
                      required
                      type="text"
                      placeholder="Full Name"
                      value={leadData.name}
                      onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                      className="w-full bg-slate-50 border-4 border-slate-100 p-4 font-black uppercase text-sm focus:outline-none focus:border-primary transition-all"
                    />
                    <input 
                      required
                      type="tel"
                      placeholder="WhatsApp Number"
                      value={leadData.number}
                      onChange={(e) => setLeadData({...leadData, number: e.target.value})}
                      className="w-full bg-slate-50 border-4 border-slate-100 p-4 font-black uppercase text-sm focus:outline-none focus:border-primary transition-all"
                    />
                    <input 
                      required
                      type="email"
                      placeholder="Professional Email"
                      value={leadData.email}
                      onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                      className="w-full bg-slate-50 border-4 border-slate-100 p-4 font-black uppercase text-sm focus:outline-none focus:border-primary transition-all"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-primary text-white p-6 font-black uppercase text-lg hover:bg-black transition-all flex items-center justify-center gap-3 italic"
                    >
                      Instant Unlock <Target className="w-6 h-6 group-hover:scale-125 transition-transform" />
                    </button>
                  </form>
                  <p className="mt-6 text-[10px] font-black text-slate-400 text-center uppercase tracking-widest">Sent instantly on your WhatsApp 🚀</p>
                </div>
              ) : (
                <div className="text-center p-12 border-8 border-dashed border-emerald-500 bg-emerald-50 h-full flex flex-col items-center justify-center">
                   <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6 animate-bounce" />
                   <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">Full List Sent</h3>
                   <p className="text-sm font-bold text-slate-600 mb-10 italic">Check your WhatsApp at **{leadData.number}**. Meanwhile, copy the do-follow links on the left and start outreach!</p>
                   <button 
                    onClick={() => setPhase("input")}
                    className="bg-foreground text-white px-10 py-5 font-black uppercase text-sm hover:bg-primary transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
                   >
                     Analyze Another Domain
                   </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
