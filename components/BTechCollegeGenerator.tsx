"use client";

import { useState } from "react";
import Link from "next/link";
import { Cpu, Search, SlidersHorizontal, Star, IndianRupee, Trophy, Building2, ArrowRight, Sparkles, AlertCircle, GraduationCap } from "lucide-react";

const STREAMS = [
  "Computer Science (CSE)",
  "AI & Machine Learning",
  "Data Science",
  "Electronics (ECE)",
  "Information Technology (IT)",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering (EEE)",
  "CyberSecurity",
  "Biotechnology",
];

const FEE_RANGES = [
  { label: "Under ₹5 Lakhs / year", max: 500000 },
  { label: "₹5 – ₹10 Lakhs / year", min: 500000, max: 1000000 },
  { label: "₹10 – ₹15 Lakhs / year", min: 1000000, max: 1500000 },
  { label: "₹15 – ₹20 Lakhs / year", min: 1500000, max: 2000000 },
  { label: "Above ₹20 Lakhs / year", min: 2000000 },
];

// Comprehensive curated college database
const BTECH_COLLEGES = [
  // TIER 1 — IITs & Near-IIT Private
  { name: "IIT Bombay", tier: 1, fee: 250000, jeeRank: 500, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Electrical Engineering (EEE)", "Civil Engineering"], location: "Mumbai", avg_package: "₹22 LPA", ownership: "Government", slug: null },
  { name: "IIT Delhi", tier: 1, fee: 250000, jeeRank: 600, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Electrical Engineering (EEE)", "Civil Engineering", "AI & Machine Learning"], location: "Delhi", avg_package: "₹24 LPA", ownership: "Government", slug: null },
  { name: "IIT Madras", tier: 1, fee: 250000, jeeRank: 700, streams: ["Computer Science (CSE)", "Electrical Engineering (EEE)", "Mechanical Engineering", "Civil Engineering", "Data Science"], location: "Chennai", avg_package: "₹20 LPA", ownership: "Government", slug: null },
  { name: "IIT Kharagpur", tier: 1, fee: 280000, jeeRank: 1000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Biotechnology"], location: "Kharagpur", avg_package: "₹18 LPA", ownership: "Government", slug: null },
  { name: "IIT Kanpur", tier: 1, fee: 220000, jeeRank: 900, streams: ["Computer Science (CSE)", "Mechanical Engineering", "Electrical Engineering (EEE)", "Civil Engineering", "AI & Machine Learning"], location: "Kanpur", avg_package: "₹19 LPA", ownership: "Government", slug: null },
  { name: "BITS Pilani", tier: 1, fee: 550000, jeeRank: 2500, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Electrical Engineering (EEE)", "Civil Engineering", "Information Technology (IT)"], location: "Pilani", avg_package: "₹17 LPA", ownership: "Private", slug: "tools/mock-test/bitsat" },
  { name: "NIT Trichy", tier: 1, fee: 160000, jeeRank: 5000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering (EEE)"], location: "Tiruchirappalli", avg_package: "₹12 LPA", ownership: "Government", slug: null },
  { name: "NIT Surathkal", tier: 1, fee: 160000, jeeRank: 6000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering (EEE)"], location: "Surathkal", avg_package: "₹12 LPA", ownership: "Government", slug: null },
  { name: "NIT Warangal", tier: 1, fee: 160000, jeeRank: 7000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering (EEE)"], location: "Warangal", avg_package: "₹11 LPA", ownership: "Government", slug: null },

  // TIER 2 — Good Private + Mid NITs
  { name: "VIT Vellore", tier: 2, fee: 220000, jeeRank: 50000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "AI & Machine Learning", "Data Science", "Information Technology (IT)"], location: "Vellore", avg_package: "₹8 LPA", ownership: "Private", slug: null },
  { name: "SRM Chennai", tier: 2, fee: 250000, jeeRank: 70000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "AI & Machine Learning", "Data Science", "CyberSecurity"], location: "Chennai", avg_package: "₹7.5 LPA", ownership: "Private", slug: "tools/mock-test/srmjeee" },
  { name: "Thapar University", tier: 2, fee: 450000, jeeRank: 30000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Electrical Engineering (EEE)", "Civil Engineering", "Information Technology (IT)"], location: "Patiala", avg_package: "₹12 LPA", ownership: "Private", slug: "blog/thapar-university-patiala-btech-review-2026" },
  { name: "Manipal Institute of Technology", tier: 2, fee: 450000, jeeRank: 40000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "AI & Machine Learning", "Information Technology (IT)"], location: "Manipal", avg_package: "₹10 LPA", ownership: "Private", slug: "blog/all-about-manipal-university-btech-campuses" },
  { name: "VITEEE (VIT Chennai)", tier: 2, fee: 220000, jeeRank: 60000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "AI & Machine Learning", "Data Science"], location: "Chennai", avg_package: "₹8 LPA", ownership: "Private", slug: "tools/mock-test/viteee" },
  { name: "NIT Jaipur (MNIT)", tier: 2, fee: 160000, jeeRank: 15000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering (EEE)"], location: "Jaipur", avg_package: "₹10 LPA", ownership: "Government", slug: null },
  { name: "NIT Allahabad (MNNIT)", tier: 2, fee: 160000, jeeRank: 12000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering (EEE)"], location: "Allahabad", avg_package: "₹9.5 LPA", ownership: "Government", slug: null },
  { name: "IIIT Hyderabad", tier: 2, fee: 350000, jeeRank: 8000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "AI & Machine Learning", "Data Science", "CyberSecurity"], location: "Hyderabad", avg_package: "₹15 LPA", ownership: "Government", slug: null },
  { name: "DTU Delhi", tier: 2, fee: 175000, jeeRank: 10000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering (EEE)", "Information Technology (IT)"], location: "Delhi", avg_package: "₹11 LPA", ownership: "Government", slug: null },
  { name: "NSUT Delhi", tier: 2, fee: 175000, jeeRank: 12000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Information Technology (IT)"], location: "Delhi", avg_package: "₹10 LPA", ownership: "Government", slug: null },
  { name: "IGDTU (Indraprastha)", tier: 2, fee: 175000, jeeRank: 15000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Information Technology (IT)"], location: "Delhi", avg_package: "₹9 LPA", ownership: "Government", slug: null },
  { name: "KJ Somaiya Mumbai", tier: 2, fee: 480000, jeeRank: 35000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Information Technology (IT)", "Data Science"], location: "Mumbai", avg_package: "₹11 LPA", ownership: "Private", slug: "blog/kj-somaiya-btech-review-2026" },
  { name: "Amity University Noida", tier: 2, fee: 350000, jeeRank: 80000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "AI & Machine Learning", "Data Science", "CyberSecurity"], location: "Noida", avg_package: "₹7 LPA", ownership: "Private", slug: null },
  { name: "Chandigarh University", tier: 2, fee: 170000, jeeRank: 90000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "AI & Machine Learning", "Data Science", "CyberSecurity"], location: "Chandigarh", avg_package: "₹6.5 LPA", ownership: "Private", slug: null },

  // TIER 3 — Regional & Affordable
  { name: "GD Goenka University", tier: 3, fee: 200000, jeeRank: 150000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "AI & Machine Learning"], location: "Gurugram", avg_package: "₹5 LPA", ownership: "Private", slug: "blog/gd-goenka-btech-review-2026" },
  { name: "Manipal University Jaipur", tier: 3, fee: 420000, jeeRank: 200000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "AI & Machine Learning", "Data Science"], location: "Jaipur", avg_package: "₹6 LPA", ownership: "Private", slug: "blog/direct-admission-manipal-university-jaipur-btech-2026" },
  { name: "Amity University Jaipur", tier: 3, fee: 280000, jeeRank: 200000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "AI & Machine Learning"], location: "Jaipur", avg_package: "₹4.5 LPA", ownership: "Private", slug: null },
  { name: "JECRC University Jaipur", tier: 3, fee: 120000, jeeRank: 250000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Information Technology (IT)"], location: "Jaipur", avg_package: "₹4 LPA", ownership: "Private", slug: "blog/direct-admission-jecrc-university-jaipur-btech-2026" },
  { name: "SKIT Jaipur", tier: 3, fee: 100000, jeeRank: 300000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Information Technology (IT)"], location: "Jaipur", avg_package: "₹3.5 LPA", ownership: "Private", slug: "blog/direct-admission-skit-jaipur-btech-2026" },
  { name: "Poornima College Jaipur", tier: 3, fee: 100000, jeeRank: 300000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Information Technology (IT)"], location: "Jaipur", avg_package: "₹3.5 LPA", ownership: "Private", slug: "blog/direct-admission-poornima-college-jaipur-btech-2026" },
  { name: "GD Goenka Engineering (Gurgaon)", tier: 3, fee: 180000, jeeRank: 200000, streams: ["Computer Science (CSE)", "Mechanical Engineering", "Civil Engineering", "Electronics (ECE)"], location: "Gurugram", avg_package: "₹4.5 LPA", ownership: "Private", slug: null },
  { name: "SMIT Sikkim", tier: 3, fee: 140000, jeeRank: 350000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "Information Technology (IT)"], location: "Sikkim", avg_package: "₹5 LPA", ownership: "Private", slug: "blog/all-about-manipal-university-btech-campuses" },
  { name: "Sharda University", tier: 3, fee: 180000, jeeRank: 300000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "AI & Machine Learning", "Data Science"], location: "Greater Noida", avg_package: "₹4.5 LPA", ownership: "Private", slug: null },
  { name: "Bennett University", tier: 3, fee: 350000, jeeRank: 200000, streams: ["Computer Science (CSE)", "Electronics (ECE)", "Mechanical Engineering", "Civil Engineering", "AI & Machine Learning", "Data Science", "CyberSecurity"], location: "Greater Noida", avg_package: "₹6 LPA", ownership: "Private", slug: null },
];

const TIER_LABELS: Record<number, { label: string; color: string; icon: string; bg: string; border: string }> = {
  1: { label: "Tier 1 — Elite", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-300", icon: "🏆", },
  2: { label: "Tier 2 — Premium", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-300", icon: "⭐", },
  3: { label: "Tier 3 — Regional", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-300", icon: "🎓", },
};

export function BTechCollegeGenerator() {
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedFeeIdx, setSelectedFeeIdx] = useState<number | null>(null);
  const [jeeRankInput, setJeeRankInput] = useState("");
  const [generated, setGenerated] = useState(false);
  const [results, setResults] = useState<typeof BTECH_COLLEGES>([]);

  const handleGenerate = () => {
    const rank = jeeRankInput ? parseInt(jeeRankInput) : null;
    const feeFilter = selectedFeeIdx !== null ? FEE_RANGES[selectedFeeIdx] : null;

    const filtered = BTECH_COLLEGES.filter((college) => {
      const streamMatch = !selectedStream || college.streams.includes(selectedStream);
      const rankMatch = !rank || college.jeeRank >= rank * 0.5; // show colleges where your rank can get in (rank <= college cutoff)
      const feeMatch = !feeFilter || (
        (!feeFilter.min || college.fee >= feeFilter.min) &&
        (!feeFilter.max || college.fee <= feeFilter.max)
      );
      return streamMatch && rankMatch && feeMatch;
    });

    setResults(filtered.sort((a, b) => a.tier - b.tier || a.fee - b.fee));
    setGenerated(true);
  };

  const reset = () => {
    setSelectedStream("");
    setSelectedFeeIdx(null);
    setJeeRankInput("");
    setGenerated(false);
    setResults([]);
  };

  const tier1 = results.filter(c => c.tier === 1);
  const tier2 = results.filter(c => c.tier === 2);
  const tier3 = results.filter(c => c.tier === 3);

  return (
    <section className="mt-8 mb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full -ml-16 -mb-16 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-400/20">
              <Cpu className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Free Tool</span>
                <span className="flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 rounded-full text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                  <Sparkles className="w-2.5 h-2.5" /> New 2026
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-none">
                B.Tech College Generator
              </h2>
            </div>
          </div>
          <p className="text-slate-400 text-base font-medium max-w-2xl leading-relaxed">
            Enter your JEE rank, preferred stream, and annual fee budget — get an instant curated list of Tier 1, Tier 2, and Tier 3 engineering colleges you can realistically target.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 p-6 md:p-10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stream */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Preferred Stream
            </label>
            <select
              value={selectedStream}
              onChange={e => setSelectedStream(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="">All Streams</option>
              {STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Fee Range */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5" /> Annual Fee Budget
            </label>
            <select
              value={selectedFeeIdx ?? ""}
              onChange={e => setSelectedFeeIdx(e.target.value === "" ? null : parseInt(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="">Any Budget</option>
              {FEE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
            </select>
          </div>

          {/* JEE Rank */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" /> JEE Main / Adv Rank (optional)
            </label>
            <input
              type="number"
              placeholder="e.g. 25000"
              value={jeeRankInput}
              onChange={e => setJeeRankInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleGenerate}
            className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black uppercase tracking-widest text-sm py-5 rounded-2xl transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-200 active:scale-95"
          >
            <Search className="w-5 h-5" />
            Generate My College List
          </button>
          {generated && (
            <button
              onClick={reset}
              className="px-8 py-5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-black uppercase tracking-widest text-sm rounded-2xl transition-all"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {generated && (
        <div className="space-y-10">
          {results.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-16 text-center">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">No colleges matched</h3>
              <p className="text-slate-400 font-medium">Try widening your budget or removing the rank filter.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-slate-600 font-bold">
                  Found <span className="text-blue-600 font-black text-xl">{results.length}</span> colleges matching your profile
                </p>
                <Link href="/inquiry" prefetch={false} className="text-xs font-black uppercase tracking-widest text-blue-600 hover:text-slate-900 flex items-center gap-1 transition-colors">
                  Get Expert Help <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {[{ tier: 1, list: tier1 }, { tier: 2, list: tier2 }, { tier: 3, list: tier3 }].map(({ tier, list }) =>
                list.length > 0 ? (
                  <div key={tier}>
                    {/* Tier Header */}
                    <div className={`flex items-center gap-3 mb-4 px-5 py-3 rounded-2xl border ${TIER_LABELS[tier].bg} ${TIER_LABELS[tier].border}`}>
                      <span className="text-2xl">{TIER_LABELS[tier].icon}</span>
                      <div>
                        <h3 className={`text-sm font-black uppercase tracking-widest ${TIER_LABELS[tier].color}`}>{TIER_LABELS[tier].label}</h3>
                        <p className="text-xs text-slate-500 font-medium">{list.length} colleges in this tier</p>
                      </div>
                    </div>

                    {/* College Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {list.map((college, i) => (
                        <div
                          key={i}
                          className={`bg-white rounded-2xl border-2 ${TIER_LABELS[tier].border} p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between`}
                        >
                          <div>
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${TIER_LABELS[tier].bg} ${TIER_LABELS[tier].color} border ${TIER_LABELS[tier].border}`}>
                                  {TIER_LABELS[tier].label}
                                </span>
                                <h4 className="font-black text-slate-900 text-base mt-2 leading-snug">{college.name}</h4>
                                <p className="text-xs text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                                  <Building2 className="w-3 h-3" /> {college.location} · {college.ownership}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-4">
                              <div className="bg-slate-50 rounded-xl p-3">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Annual Fee</p>
                                <p className="text-sm font-black text-slate-900">₹{(college.fee / 100000).toFixed(1)}L</p>
                              </div>
                              <div className="bg-slate-50 rounded-xl p-3">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Avg Package</p>
                                <p className="text-sm font-black text-slate-900">{college.avg_package}</p>
                              </div>
                              <div className="bg-slate-50 rounded-xl p-3 col-span-2">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">JEE Cutoff (approx.)</p>
                                <p className="text-sm font-black text-slate-900">Rank ≤ {college.jeeRank.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-100">
                            {college.slug ? (
                              <Link
                                href={`/${college.slug}`}
                                prefetch={false}
                                className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors group"
                              >
                                View Full Review
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                            ) : (
                              <Link
                                href="/inquiry"
                                prefetch={false}
                                className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors group"
                              >
                                Get Admission Guidance
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              )}

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Still Confused?</h3>
                <p className="text-blue-100 font-medium mb-6 text-sm max-w-lg mx-auto">
                  Get a personalized shortlist with direct admission strategies from Mohit Jain — India's trusted B.Tech counsellor.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/inquiry" prefetch={false} className="bg-white text-blue-700 font-black uppercase tracking-widest text-xs px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-lg">
                    Free Counselling →
                  </Link>
                  <a href="https://wa.me/919560020771" className="border-2 border-white/40 text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-2xl hover:bg-white/10 transition-all">
                    WhatsApp Expert
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
