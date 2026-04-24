import { Metadata } from 'next';
import { GovtJobsList } from '@/components/GovtJobsList';
import { Search, Info, Briefcase, FileCheck, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: "Latest Govt Jobs, Admit Cards & Results 2026 | Mohit Jain Career Hub",
  description: "One-stop destination for all government job notifications, exam admit cards, and latest results for 2026. Stay updated with SSC, Banking, Railway, and State Govt jobs.",
  keywords: ["latest govt jobs 2026", "sarkari result 2026", "admit card download", "govt exam results", "SSC jobs 2026", "banking jobs 2026", "railway recruitment 2026"],
};

export default function GovtJobsPage() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-foreground text-white px-6 py-20 sm:px-12 sm:py-24 border-b-8 border-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col items-center text-center">
            <span className="bg-primary text-white px-5 py-2 text-sm font-black uppercase tracking-[0.2em] mb-8 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              Govt Exam Hub 🏛️
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-8 italic">
              Latest <span className="text-primary italic">Sarkari</span> Intel <br />
              <span className="bg-white text-foreground px-4 -rotate-1 inline-block mt-2">Update 2026</span>
            </h1>
            <p className="max-w-2xl text-xl font-bold text-gray-400 mb-12">
              The fastest way to track your government job applications, admit cards, and results. Counselor-verified links only.
            </p>
            
            {/* QUICK STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
              {[
                { label: "Active Jobs", value: "1,240+", icon: Briefcase, color: "text-blue-400" },
                { label: "New Results", value: "85", icon: Award, color: "text-emerald-400" },
                { label: "Hall Tickets", value: "42", icon: FileCheck, color: "text-amber-400" },
                { label: "Daily Users", value: "10K+", icon: Info, color: "text-purple-400" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-900/50 p-6 rounded-xl border-2 border-gray-800 flex flex-col items-center gap-2 group hover:border-primary transition-colors">
                  <stat.icon className={`w-6 h-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-2xl font-black tracking-tight">{stat.value}</span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOBS GRID SECTION */}
      <section className="bg-white px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-7xl">
          {/* SEARCH & FILTER BAR (Placeholder) */}
          <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-slate-50 border-4 border-foreground rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search for SSC, Railway, Banking, IAS..."
                className="w-full pl-12 pr-6 py-4 border-4 border-foreground font-bold text-lg bg-white focus:outline-none focus:ring-4 ring-primary/20"
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-8 py-4 bg-foreground text-white font-black uppercase text-sm tracking-widest hover:bg-primary transition-colors border-2 border-foreground">
                Filter
              </button>
              <button className="flex-1 md:flex-none px-8 py-4 bg-accent text-foreground font-black uppercase text-sm tracking-widest hover:bg-white transition-colors border-2 border-foreground">
                Subscribe
              </button>
            </div>
          </div>

          {/* MAIN LISTING */}
          <GovtJobsList />

          {/* DISCLAIMER / FOOTER INFO */}
          <div className="mt-24 p-10 bg-blue-50 border-4 border-dashed border-primary rounded-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="bg-white p-4 rounded-full border-4 border-primary">
                <Info className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black uppercase mb-2">Counselor Verification Policy</h3>
                <p className="font-bold text-gray-600 leading-relaxed italic">
                  At Mohit Jain Career Hub, we cross-verify every job link with official government gazettes before listing. Beware of phishing sites mimicking sarkari results. Always check the official domain suffix (.nic.in, .gov.in).
                </p>
              </div>
              <button className="w-full md:w-auto px-10 py-5 bg-primary text-white font-black uppercase tracking-widest border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-all">
                Report Error
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
