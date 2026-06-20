"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  School, 
  GraduationCap, 
  Trophy, 
  Landmark, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  BookOpen,
  DollarSign,
  TrendingUp,
  Percent
} from "lucide-react";
import { TOP_TIER_MBA_COLLEGES, TopTierMbaCollege } from "@/data/topTierMbaColleges";
import { InquiryForm } from "@/components/InquiryForm";

export function TopTierMbaClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "iim" | "nmat" | "snap" | "xat">("all");

  const filteredColleges = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return TOP_TIER_MBA_COLLEGES.filter((college) => {
      // Search matching
      const matchesSearch = 
        college.name.toLowerCase().includes(query) ||
        college.location.toLowerCase().includes(query) ||
        college.exams.some(exam => exam.toLowerCase().includes(query));

      // Tab matching
      let matchesTab = true;
      if (activeTab === "iim") {
        matchesTab = college.isIim;
      } else if (activeTab === "nmat") {
        matchesTab = college.exams.includes("NMAT");
      } else if (activeTab === "snap") {
        matchesTab = college.exams.includes("SNAP");
      } else if (activeTab === "xat") {
        matchesTab = college.exams.includes("XAT");
      }

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="w-full bg-slate-50/30">
      {/* Dynamic Sub-header Stats */}
      <section className="bg-slate-900 text-white border-b-8 border-foreground py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="bg-accent text-foreground border-2 border-foreground px-4 py-1.5 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
              LIVE DATA 2026
            </span>
            <span className="text-sm font-bold text-slate-300">Compare top Tier 1 and Tier 2 MBA Programs in India</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">Total Listed</span>
              <span className="text-2xl font-black text-primary">{TOP_TIER_MBA_COLLEGES.length} Colleges</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">IIMs Listed</span>
              <span className="text-2xl font-black text-emerald-400">20 Campuses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Container */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Navigation Tabs and Search */}
        <div className="bg-white border-8 border-foreground p-6 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-xl" />
          
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center">
            {/* Exam Categories */}
            <div className="flex flex-wrap gap-3 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
              {[
                { id: "all", label: "All Colleges", count: TOP_TIER_MBA_COLLEGES.length },
                { id: "iim", label: "All IIMs", count: TOP_TIER_MBA_COLLEGES.filter(c => c.isIim).length },
                { id: "nmat", label: "NMAT Colleges", count: TOP_TIER_MBA_COLLEGES.filter(c => c.exams.includes("NMAT")).length },
                { id: "snap", label: "SNAP Colleges", count: TOP_TIER_MBA_COLLEGES.filter(c => c.exams.includes("SNAP")).length },
                { id: "xat", label: "XAT Accepting", count: TOP_TIER_MBA_COLLEGES.filter(c => c.exams.includes("XAT")).length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-3 font-black text-sm uppercase tracking-wider transition-all border-4 cursor-pointer flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-primary border-foreground text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1"
                      : "bg-white border-foreground text-foreground hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border-2 ${
                    activeTab === tab.id ? "bg-white text-primary border-white" : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Dynamic Search Box */}
            <div className="relative min-w-[280px] md:min-w-[340px] flex-grow lg:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground w-5 h-5 stroke-[2.5px]" />
              <input
                type="text"
                placeholder="Search by name, location, exam..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 h-14 bg-slate-50 border-4 border-foreground text-base font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Results Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Colleges Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-center border-b-4 border-foreground pb-4">
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground flex items-center gap-2">
                <School className="w-6 h-6 text-primary" />
                Featured MBA List
              </h2>
              <span className="bg-slate-100 border-2 border-foreground px-3 py-1 font-bold text-xs uppercase text-slate-700">
                {filteredColleges.length} matches found
              </span>
            </div>

            {filteredColleges.length === 0 ? (
              <div className="border-4 border-dashed border-gray-300 p-16 text-center rounded-xl bg-white">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-black text-foreground uppercase mb-2">No matching colleges</h3>
                <p className="text-slate-500 font-medium">We couldn't find any college matching your query in this category.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
                  className="mt-6 px-6 py-3 bg-foreground text-white font-bold uppercase text-xs tracking-wider border-2 border-foreground hover:bg-slate-800 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredColleges.map((college, idx) => (
                  <div
                    key={idx}
                    className="group bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200 p-6 md:p-8 relative overflow-hidden"
                  >
                    {/* Visual markers/decors */}
                    {college.isIim && (
                      <div className="absolute top-0 right-0 bg-yellow-400 border-l-4 border-b-4 border-foreground px-4 py-1 font-black text-[10px] uppercase tracking-wider">
                        IIM Campus
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <h3 className="font-display text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                          {college.name}
                        </h3>
                        <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {college.location}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {college.exams.map((exam, i) => (
                          <span
                            key={i}
                            className="bg-blue-50 text-primary border border-primary/20 px-3 py-1 font-black text-[10px] uppercase tracking-widest"
                          >
                            {exam}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats details grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-slate-50 border-2 border-foreground p-4">
                      <div>
                        <div className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-slate-400" /> Fees
                        </div>
                        <p className="text-sm font-black text-slate-900 mt-1">{college.fees}</p>
                      </div>

                      <div>
                        <div className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                          <Percent className="w-3 h-3 text-slate-400" /> Cut-off
                        </div>
                        <p className="text-sm font-black text-emerald-600 mt-1">{college.cutoff}</p>
                      </div>

                      <div>
                        <div className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-slate-400" /> Avg Placement
                        </div>
                        <p className="text-sm font-black text-primary mt-1">{college.avg_placement}</p>
                      </div>

                      <div>
                        <div className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                          <Trophy className="w-3 h-3 text-slate-400" /> Highest Placement
                        </div>
                        <p className="text-sm font-black text-slate-950 mt-1">{college.highest_placement}</p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-slate-100">
                      <div className="flex gap-4">
                        {college.slug ? (
                          <Link
                            href={`/${college.slug}`}
                            prefetch={false}
                            className="inline-flex items-center text-xs font-black uppercase tracking-wider text-primary hover:text-foreground transition-all group/btn"
                          >
                            Read Full Review
                            <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" /> Full report coming soon
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <a
                          href={college.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-black uppercase tracking-wider text-slate-600 hover:text-foreground transition-colors"
                        >
                          Official Site
                          <ExternalLink className="ml-1 w-3 h-3" />
                        </a>

                        <Link
                          href="#consult-form"
                          className="bg-accent hover:bg-yellow-400 border-2 border-foreground px-4 py-2 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none transition-all"
                        >
                          Counselling Help
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Counselling Form Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div id="consult-form" className="scroll-mt-28">
              <div className="bg-primary text-white border-8 border-foreground p-6 mb-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">
                    ADMISSION COUNSELLING 2026
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase leading-tight mb-4">
                  Dominate Your B-School Selection
                </h3>
                <p className="text-sm font-bold text-blue-50 leading-relaxed mb-4 italic border-l-4 border-accent pl-3">
                  Deciding between IIMs, Symbiosis, or NMIMS? Let Mohit Jain formulate your profile strategy.
                </p>
                <ul className="text-xs font-bold space-y-2 text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> Target percentile matching
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> GD/PI profile assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> Direct admission consultation
                  </li>
                </ul>
              </div>

              {/* Lead Gen Form */}
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
