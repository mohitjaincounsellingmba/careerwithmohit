"use client";

import { useState, useEffect } from "react";
import { 
  Instagram, 
  Search, 
  Zap, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Sparkles,
  Loader2,
  X,
  Target
} from "lucide-react";

type Niche = "jee" | "mba" | "boards" | "abroad" | "marketing" | "upskilling";

const NICHE_STRATEGIES: Record<Niche, { label: string, roadmap: string[], hooks: string[], bestTime: string, hashtags: string }> = {
  jee: {
    label: "Engineering (JEE/NEET)",
    roadmap: ["Post 3 problem-solving reels/week", "Daily 'Formula of the Day' Stories", "Use high-contrast text on thumbnails"],
    hooks: ["Stop making this JEE mistake!", "Best NIT/IIIT cutoffs for 2026", "Top 5 books for Physics rankers"],
    bestTime: "5:30 PM & 8:00 PM",
    hashtags: "#jeemains #iitjee #neet2026 #engineeringstudent"
  },
  mba: {
    label: "Management (CAT/MBA)",
    roadmap: ["Interview Prep Series (Reels)", "LinkedIn Profile Audit Stories", "B-School Reality Check Reels"],
    hooks: ["How I cracked CAT with 99%", "Top 10 High ROI MBA Colleges", "Don't join an MBA without this!"],
    bestTime: "7:00 PM & 9:30 PM",
    hashtags: "#mba #cat2026 #bschool #management"
  },
  boards: {
    label: "Schooling (CBSE/State)",
    roadmap: ["Exam Hack Reels (15s)", "Topper Interview Carousel", "Subject-wise Study Planner"],
    hooks: ["Score 95%+ with this timetable", "Cheat sheet for Math Boards", "How to finish syllabus in 30 days"],
    bestTime: "4:00 PM & 6:30 PM",
    hashtags: "#cbse #boardexams #studentlife #toppertips"
  },
  abroad: {
    label: "Study Abroad (IELTS/GRE)",
    roadmap: ["University Comparison Reels", "Visa Interview 101 Series", "Cost of Living (City-wise)"],
    hooks: ["Study in Germany for FREE", "IELTS speaking hacks", "Top 5 scholarship secrets"],
    bestTime: "9:00 AM & 8:00 PM",
    hashtags: "#studyabroad #ielts #studentvisa #gre"
  },
  marketing: {
    label: "Career & Marketing",
    roadmap: ["Digital Marketing Trends 2026", "Side Hustle Reels", "LinkedIn Optimization Hacks"],
    hooks: ["Get paid ₹1L/month with this skill", "Stop applying to jobs like this", "3 AI tools to 10x productivity"],
    bestTime: "11:00 AM & 7:30 PM",
    hashtags: "#careergoals #marketingtips #digitalmarketing #hiring"
  },
  upskilling: {
    label: "Direct Admission Hub",
    roadmap: ["Management Quota Truths", "Placement Stats Audit", "Fee Structure Comparison"],
    hooks: ["Direct Admission Secrets", "Best colleges for low scores", "Wait! Check placement here first"],
    bestTime: "6:00 PM & 9:00 PM",
    hashtags: "#directadmission #btech #mbaadmission #collegehunting"
  }
};

export function InstagramFollowersGenerator() {
  const [username, setUsername] = useState("");
  const [niche, setNiche] = useState<Niche>("jee");
  const [phase, setPhase] = useState<"input" | "analyzing" | "result">("input");
  const [analysisText, setAnalysisText] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", number: "", email: "" });

  const analysisSteps = [
    "Fetching profile metadata...",
    "Scanning hashtag efficiency...",
    "Mapping niche trends for 2026...",
    "Analyzing competitor vitality...",
    "Optimizing viral coefficient...",
    "Calibrating follower growth engine..."
  ];

  useEffect(() => {
    if (phase === "analyzing") {
      let step = 0;
      const interval = setInterval(() => {
        if (step < analysisSteps.length) {
          setAnalysisText(analysisSteps[step]);
          setCurrentStep(step + 1);
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
          username,
          niche: NICHE_STRATEGIES[niche].label,
          source: 'Instagram Followers Generator',
          timestamp: new Date().toISOString()
        })
      });
      setIsUnlocked(true);
    } catch {
      alert("Submission failed. Try again.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(236,72,153,1)] p-8 md:p-12 overflow-hidden relative">
        <div className="absolute -top-10 -right-10 opacity-5 rotate-12">
            <Instagram size={200} strokeWidth={3} className="text-rose-500" />
        </div>

        <div className="flex items-center gap-4 mb-10 border-b-4 border-foreground pb-6">
          <div className="bg-rose-500 p-3 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
            Followers <span className="text-rose-500">Generator</span>
          </h2>
        </div>

        {phase === "input" && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Instagram Handle</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-rose-500 text-xl">@</span>
                  <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="USERNAME"
                    className="w-full bg-slate-50 border-4 border-foreground p-4 pl-10 font-black text-lg focus:bg-white focus:outline-none transition-all uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Target Education Niche</label>
                <select 
                  value={niche}
                  onChange={(e) => setNiche(e.target.value as Niche)}
                  className="w-full bg-slate-50 border-4 border-foreground p-4 font-black text-lg focus:bg-white focus:outline-none transition-all uppercase appearance-none"
                >
                  {Object.keys(NICHE_STRATEGIES).map(n => (
                    <option key={n} value={n}>{NICHE_STRATEGIES[n as Niche].label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-rose-50 border-4 border-rose-200 p-6 flex gap-4 transition-all hover:bg-rose-100">
              <ShieldCheck className="w-8 h-8 text-rose-600 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-black uppercase text-rose-900 mb-1">AI-Engine: Viral Growth Mapping</h4>
                <p className="text-sm font-bold text-rose-800/80 leading-snug italic">
                  Our algorithm scans current engagement trends and suggests **high-retention content hooks and post timings** tailored for your current audience pool.
                </p>
              </div>
            </div>

            <button 
              onClick={() => username && setPhase("analyzing")}
              disabled={!username}
              className="w-full bg-foreground text-white border-4 border-rose-500 p-6 text-2xl font-black uppercase tracking-tighter hover:bg-rose-600 transition-all shadow-[8px_8px_0px_0px_rgba(244,63,94,1)] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Zap className="w-8 h-8 animate-pulse text-yellow-400 fill-yellow-400" />
              Analyze & Generate Roadmap
            </button>
          </div>
        )}

        {phase === "analyzing" && (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-10 animate-in fade-in zoom-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-500/20 blur-3xl animate-pulse" />
              <Loader2 className="w-32 h-32 text-rose-500 animate-spin" strokeWidth={3} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-foreground" />
              </div>
            </div>
            <div className="space-y-6 w-full max-w-lg">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                 <span>Progress</span>
                 <span>{Math.round((currentStep / analysisSteps.length) * 100)}%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 border-2 border-foreground relative overflow-hidden">
                 <div 
                    className="h-full bg-rose-500 transition-all duration-500" 
                    style={{ width: `${(currentStep / analysisSteps.length) * 100}%` }} 
                 />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter text-rose-600">{analysisText}</h3>
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="space-y-8">
              <div className="bg-foreground text-white p-8 border-b-8 border-rose-500 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <TrendingUp className="absolute top-4 right-4 text-rose-500 w-10 h-10 opacity-20" />
                <h3 className="text-3xl md:text-4xl font-black italic uppercase leading-tight mb-2">Analysis Complete</h3>
                <p className="text-rose-200 font-bold uppercase tracking-widest text-xs">Profile: @{username}</p>
                <div className="mt-8 text-5xl md:text-6xl font-black leading-none text-rose-50">+1,200<span className="text-2xl text-rose-500">/WK</span></div>
                <p className="mt-2 text-slate-400 font-bold uppercase text-xs tracking-widest">Projected Growth Potential</p>
              </div>

              {!isUnlocked ? (
                <div className="bg-slate-50 border-4 border-dashed border-slate-300 p-8 flex flex-col items-center text-center space-y-4 blur-[2px] grayscale pointer-events-none select-none">
                   <div className="w-16 h-16 bg-slate-200 rounded-full animate-pulse" />
                   <div className="h-4 w-32 bg-slate-200" />
                   <div className="space-y-2 w-full">
                     <div className="h-2 w-full bg-slate-200" />
                     <div className="h-2 w-full bg-slate-200" />
                   </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="bg-emerald-50 border-4 border-emerald-500 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h4 className="text-sm font-black uppercase text-emerald-700 mb-4 flex items-center gap-2">
                       <CheckCircle2 className="w-4 h-4" /> 3-Step Viral Roadmap
                    </h4>
                    <ul className="space-y-3">
                      {NICHE_STRATEGIES[niche].roadmap.map((r, i) => (
                        <li key={i} className="text-sm font-bold text-slate-800 flex items-start gap-2">
                          <span className="bg-emerald-500 text-white p-0.5 rounded text-[10px] font-black">{i+1}</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border-4 border-blue-500 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h4 className="text-sm font-black uppercase text-blue-700 mb-4 flex items-center gap-2">
                       <Target className="w-4 h-4" /> Best Content Hooks
                    </h4>
                    <ul className="space-y-3">
                      {NICHE_STRATEGIES[niche].hooks.map((h, i) => (
                        <li key={i} className="text-xs font-black text-slate-800 border-l-4 border-blue-400 pl-3">"{h}"</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50 border-4 border-amber-400 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
                     <div className="flex justify-between items-center border-b-2 border-amber-200 pb-2">
                        <span className="text-[10px] font-black uppercase text-amber-700">Best Posting Times</span>
                        <span className="text-xs font-black text-amber-900">{NICHE_STRATEGIES[niche].bestTime}</span>
                     </div>
                     <div className="flex flex-col gap-1 pt-1">
                        <span className="text-[10px] font-black uppercase text-amber-700">Target Hashtags</span>
                        <span className="text-[10px] font-bold text-amber-900 leading-relaxed font-mono">{NICHE_STRATEGIES[niche].hashtags}</span>
                     </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              {!isUnlocked && (
                <div className="bg-white border-4 border-foreground p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group">
                  <h3 className="text-2xl font-black uppercase mb-6 leading-tight">Unlock Your Full <br/><span className="text-rose-500 tracking-tighter">Viral Growth Package</span></h3>
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <input 
                      required
                      type="text"
                      placeholder="Full Name"
                      value={leadData.name}
                      onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-slate-200 p-3 font-bold placeholder:text-slate-400 focus:outline-none focus:border-rose-500"
                    />
                    <input 
                      required
                      type="tel"
                      placeholder="WhatsApp Number"
                      value={leadData.number}
                      onChange={(e) => setLeadData({...leadData, number: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-slate-200 p-3 font-bold placeholder:text-slate-400 focus:outline-none focus:border-rose-500"
                    />
                    <input 
                      required
                      type="email"
                      placeholder="Email Address"
                      value={leadData.email}
                      onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-slate-200 p-3 font-bold placeholder:text-slate-400 focus:outline-none focus:border-rose-500"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-rose-500 text-white p-4 font-black uppercase hover:bg-black transition-colors flex items-center justify-center gap-2"
                    >
                      Unlock Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                  <p className="mt-4 text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest">Get a 30-Day Viral Calendar on WhatsApp 🚀</p>
                </div>
              )}

              {isUnlocked && (
                <div className="text-center p-8 border-4 border-dashed border-emerald-500 bg-emerald-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col justify-center">
                   <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter text-emerald-600">Strategy Unlocked</h3>
                   <p className="text-sm font-bold text-slate-600 mb-8 leading-relaxed">Your custom 30-day viral calendar is being sent to <strong className="text-foreground">{leadData.number}</strong>. Meanwhile, implement the roadmap insights to supercharge your algorithms today!</p>
                   <button 
                    onClick={() => {
                        setPhase("input");
                        setUsername("");
                        setIsUnlocked(false);
                        setLeadData({ name: "", number: "", email: "" });
                    }}
                    className="bg-foreground text-white px-8 py-4 font-black uppercase text-sm hover:bg-rose-500 transition-all w-full"
                   >
                     Analyze Another Account
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
