"use client";

import { useState } from "react";
import Link from "next/link";
import { LineChart, Search, IndianRupee, Trophy, Building2, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

const BBA_STREAMS = [
  "General BBA",
  "Marketing",
  "Finance",
  "Human Resource (HRM)",
  "International Business",
  "Digital Marketing",
  "Entrepreneurship",
  "Banking & Insurance",
  "Business Analytics",
  "Retail Management",
  "Event Management",
  "Hotel & Hospitality Management",
];

const FEE_RANGES = [
  { label: "Under ₹1 Lakh / year", max: 100000 },
  { label: "₹1 – ₹2 Lakhs / year", min: 100000, max: 200000 },
  { label: "₹2 – ₹3 Lakhs / year", min: 200000, max: 300000 },
  { label: "₹3 – ₹5 Lakhs / year", min: 300000, max: 500000 },
  { label: "Above ₹5 Lakhs / year", min: 500000 },
];

// Cutoff stored as 12th % board marks required
const BBA_COLLEGES = [
  // TIER 1 — Premium / National Repute
  { name: "Shaheed Sukhdev College of Business Studies (SSCBS)", tier: 1, fee: 25000, cutoff: 97, streams: ["General BBA", "Finance", "Marketing", "International Business"], location: "Delhi", avg_package: "₹10 LPA", exams: ["CUET UG"], slug: null },
  { name: "Jesus & Mary College, Delhi", tier: 1, fee: 30000, cutoff: 96, streams: ["General BBA", "Finance", "Marketing"], location: "Delhi", avg_package: "₹8 LPA", exams: ["CUET UG"], slug: null },
  { name: "Christ University Bangalore", tier: 1, fee: 250000, cutoff: 90, streams: ["General BBA", "Finance", "Marketing", "International Business", "Human Resource (HRM)", "Banking & Insurance"], location: "Bangalore", avg_package: "₹7.5 LPA", exams: ["SET (Christ)", "CUET UG"], slug: null },
  { name: "NMIMS Mumbai (BBA)", tier: 1, fee: 400000, cutoff: 88, streams: ["General BBA", "Finance", "Marketing", "Business Analytics", "Human Resource (HRM)"], location: "Mumbai", avg_package: "₹9 LPA", exams: ["NPAT", "CUET UG"], slug: null },
  { name: "Symbiosis BBA (SCMS Pune)", tier: 1, fee: 200000, cutoff: 85, streams: ["General BBA", "Marketing", "Finance", "International Business", "Event Management"], location: "Pune", avg_package: "₹7 LPA", exams: ["SET (Symbiosis)", "CUET UG"], slug: null },
  { name: "Mount Carmel College, Bangalore", tier: 1, fee: 120000, cutoff: 88, streams: ["General BBA", "Finance", "Marketing", "Human Resource (HRM)"], location: "Bangalore", avg_package: "₹6.5 LPA", exams: ["CUET UG", "Direct"], slug: null },
  { name: "SP Jain School (BBA)", tier: 1, fee: 600000, cutoff: 85, streams: ["General BBA", "Finance", "Marketing", "International Business", "Entrepreneurship"], location: "Mumbai", avg_package: "₹10 LPA", exams: ["SPJAT", "SAT"], slug: null },
  { name: "Jagan Institute of Management (JIMS)", tier: 1, fee: 120000, cutoff: 80, streams: ["General BBA", "Marketing", "Finance", "Human Resource (HRM)", "International Business"], location: "Delhi", avg_package: "₹5.5 LPA", exams: ["CUET UG", "Direct"], slug: "blog/all-about-jims-rohini" },

  // TIER 2 — Good Private Universities
  { name: "Amity University Noida (BBA)", tier: 2, fee: 200000, cutoff: 75, streams: ["General BBA", "Marketing", "Finance", "Banking & Insurance", "International Business", "Digital Marketing", "Entrepreneurship", "Human Resource (HRM)"], location: "Noida", avg_package: "₹5.5 LPA", exams: ["Amity JEE", "CUET UG", "Direct"], slug: null },
  { name: "Chandigarh University (BBA)", tier: 2, fee: 110000, cutoff: 70, streams: ["General BBA", "Marketing", "Finance", "Human Resource (HRM)", "Retail Management"], location: "Chandigarh", avg_package: "₹5 LPA", exams: ["CUCET", "CUET UG", "Direct"], slug: null },
  { name: "Manipal University Jaipur (BBA)", tier: 2, fee: 160000, cutoff: 70, streams: ["General BBA", "Marketing", "Finance", "Digital Marketing", "Entrepreneurship", "International Business"], location: "Jaipur", avg_package: "₹5 LPA", exams: ["MET", "CUET UG", "Direct"], slug: "blog/direct-admission-manipal-university-jaipur-btech-2026" },
  { name: "Bennett University (BBA)", tier: 2, fee: 200000, cutoff: 75, streams: ["General BBA", "Marketing", "Finance", "Digital Marketing", "Business Analytics", "Entrepreneurship"], location: "Greater Noida", avg_package: "₹5.5 LPA", exams: ["CUET UG", "Direct"], slug: null },
  { name: "SRM University (BBA)", tier: 2, fee: 130000, cutoff: 70, streams: ["General BBA", "Marketing", "Finance", "Human Resource (HRM)", "International Business"], location: "Chennai / Sonepat", avg_package: "₹4.5 LPA", exams: ["SRMJEEM", "CUET UG", "Direct"], slug: "blog/direct-admission-srm-university-2026" },
  { name: "Sharda University (BBA)", tier: 2, fee: 100000, cutoff: 65, streams: ["General BBA", "Marketing", "Finance", "Human Resource (HRM)", "International Business"], location: "Greater Noida", avg_package: "₹4 LPA", exams: ["CUET UG", "Direct"], slug: null },
  { name: "Amity Jaipur (BBA)", tier: 2, fee: 170000, cutoff: 70, streams: ["General BBA", "Marketing", "Finance", "Entrepreneurship"], location: "Jaipur", avg_package: "₹4.5 LPA", exams: ["Amity JEE", "CUET UG", "Direct"], slug: null },
  { name: "GD Goenka University (BBA)", tier: 2, fee: 150000, cutoff: 65, streams: ["General BBA", "Marketing", "Finance", "Human Resource (HRM)", "Event Management", "Hotel & Hospitality Management"], location: "Gurugram", avg_package: "₹4.5 LPA", exams: ["CUET UG", "Direct"], slug: "blog/gd-goenka-bba-review-2026" },
  { name: "BML Munjal University (BBA)", tier: 2, fee: 200000, cutoff: 75, streams: ["General BBA", "Marketing", "Finance", "Business Analytics", "Entrepreneurship"], location: "Gurugram", avg_package: "₹5.5 LPA", exams: ["CUET UG", "Direct"], slug: "blog/all-about-bml-munjal-university" },
  { name: "IILM University Gurgaon (BBA)", tier: 2, fee: 170000, cutoff: 65, streams: ["General BBA", "Marketing", "Finance", "Human Resource (HRM)", "Digital Marketing", "Entrepreneurship"], location: "Gurugram", avg_package: "₹5 LPA", exams: ["CUET UG", "Direct"], slug: "blog/all-about-iilm-university" },

  // TIER 3 — Affordable / Regional
  { name: "IBMR Gurgaon (BBA)", tier: 3, fee: 90000, cutoff: 55, streams: ["General BBA", "Marketing", "Finance", "Human Resource (HRM)", "Digital Marketing"], location: "Gurugram", avg_package: "₹4 LPA", exams: ["Direct", "CUET UG"], slug: "blog/ibmr-gurgaon-bba-review-2026" },
  { name: "JKBS Gurgaon (BBA)", tier: 3, fee: 85000, cutoff: 55, streams: ["General BBA", "Marketing", "Finance", "Human Resource (HRM)"], location: "Gurugram", avg_package: "₹3.8 LPA", exams: ["Direct", "CUET UG"], slug: "blog/jkbs-gurgaon-bba-review-2026" },
  { name: "St. Andrews (SAITM) Gurgaon (BBA)", tier: 3, fee: 80000, cutoff: 50, streams: ["General BBA", "Marketing", "Finance", "Human Resource (HRM)"], location: "Gurugram", avg_package: "₹3.5 LPA", exams: ["Direct", "CUET UG"], slug: "blog/all-about-saitm-gurgaon" },
  { name: "JECRC University (BBA)", tier: 3, fee: 70000, cutoff: 50, streams: ["General BBA", "Marketing", "Finance", "Human Resource (HRM)", "Entrepreneurship"], location: "Jaipur", avg_package: "₹3.5 LPA", exams: ["Direct", "CUET UG"], slug: "blog/direct-admission-jecrc-university-jaipur-btech-2026" },
  { name: "Poornima Group Jaipur (BBA)", tier: 3, fee: 60000, cutoff: 50, streams: ["General BBA", "Marketing", "Finance"], location: "Jaipur", avg_package: "₹3 LPA", exams: ["Direct", "CUET UG"], slug: null },
  { name: "SKIT Jaipur (BBA)", tier: 3, fee: 60000, cutoff: 50, streams: ["General BBA", "Marketing", "Finance"], location: "Jaipur", avg_package: "₹3 LPA", exams: ["Direct"], slug: "blog/direct-admission-skit-jaipur-btech-2026" },
  { name: "Gitarattan Delhi (BBA)", tier: 3, fee: 65000, cutoff: 55, streams: ["General BBA", "Marketing", "Finance", "Human Resource (HRM)", "International Business"], location: "Delhi", avg_package: "₹3.8 LPA", exams: ["Direct", "CUET UG"], slug: null },
];

const TIER_LABELS: Record<number, { label: string; color: string; icon: string; bg: string; border: string }> = {
  1: { label: "Tier 1 — National Repute", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-300", icon: "🏆" },
  2: { label: "Tier 2 — Premium Private", color: "text-rose-700", bg: "bg-rose-50", border: "border-rose-300", icon: "⭐" },
  3: { label: "Tier 3 — Affordable / Direct", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-300", icon: "🎓" },
};

export function BBACollegeGenerator() {
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedFeeIdx, setSelectedFeeIdx] = useState<number | null>(null);
  const [boardMarks, setBoardMarks] = useState("");
  const [generated, setGenerated] = useState(false);
  const [results, setResults] = useState<typeof BBA_COLLEGES>([]);

  const handleGenerate = () => {
    const marks = boardMarks ? parseFloat(boardMarks) : null;
    const feeFilter = selectedFeeIdx !== null ? FEE_RANGES[selectedFeeIdx] : null;

    const filtered = BBA_COLLEGES.filter((college) => {
      const streamMatch = !selectedStream || college.streams.includes(selectedStream);
      const marksMatch = !marks || marks >= college.cutoff - 5;
      const feeMatch = !feeFilter || (
        (!feeFilter.min || college.fee >= feeFilter.min) &&
        (!feeFilter.max || college.fee <= feeFilter.max)
      );
      return streamMatch && marksMatch && feeMatch;
    });

    setResults(filtered.sort((a, b) => a.tier - b.tier || b.cutoff - a.cutoff));
    setGenerated(true);
  };

  const reset = () => {
    setSelectedStream("");
    setSelectedFeeIdx(null);
    setBoardMarks("");
    setGenerated(false);
    setResults([]);
  };

  const tier1 = results.filter(c => c.tier === 1);
  const tier2 = results.filter(c => c.tier === 2);
  const tier3 = results.filter(c => c.tier === 3);

  return (
    <section className="mt-0 mb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-950 to-slate-900 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full -ml-16 -mb-16 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-400/20">
              <LineChart className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Free Tool</span>
                <span className="flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 rounded-full text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                  <Sparkles className="w-2.5 h-2.5" /> 2026 Edition
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-none">
                BBA College Generator
              </h2>
            </div>
          </div>
          <p className="text-slate-400 text-base font-medium max-w-2xl leading-relaxed">
            Enter your Class 12 board percentage, preferred BBA specialization and annual fee budget — get an instant personalized list of Tier 1, Tier 2, and Tier 3 BBA colleges across India.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 p-6 md:p-10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stream */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
              <LineChart className="w-3.5 h-3.5" /> BBA Specialization
            </label>
            <select
              value={selectedStream}
              onChange={e => setSelectedStream(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-rose-100 focus:outline-none"
            >
              <option value="">All Specializations</option>
              {BBA_STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
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
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-rose-100 focus:outline-none"
            >
              <option value="">Any Budget</option>
              {FEE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
            </select>
          </div>

          {/* Board Marks */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" /> 12th Board Percentage (optional)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="e.g. 82 or 90.5"
              value={boardMarks}
              onChange={e => setBoardMarks(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-rose-100 focus:outline-none placeholder:text-slate-400"
            />
            <p className="text-[10px] text-slate-400 font-semibold mt-1 ml-1">Leave blank to see all colleges</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleGenerate}
            className="flex-1 flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-black uppercase tracking-widest text-sm py-5 rounded-2xl transition-all shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-200 active:scale-95"
          >
            <Search className="w-5 h-5" />
            Generate My BBA College List
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
              <p className="text-slate-400 font-medium">Try increasing your fee budget or adjusting your board marks.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-slate-600 font-bold">
                  Found <span className="text-rose-600 font-black text-xl">{results.length}</span> BBA programs matching your profile
                </p>
                <Link href="/inquiry" className="text-xs font-black uppercase tracking-widest text-rose-600 hover:text-slate-900 flex items-center gap-1 transition-colors">
                  Get Expert Help <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {[{ tier: 1, list: tier1 }, { tier: 2, list: tier2 }, { tier: 3, list: tier3 }].map(({ tier, list }) =>
                list.length > 0 ? (
                  <div key={tier}>
                    <div className={`flex items-center gap-3 mb-4 px-5 py-3 rounded-2xl border ${TIER_LABELS[tier].bg} ${TIER_LABELS[tier].border}`}>
                      <span className="text-2xl">{TIER_LABELS[tier].icon}</span>
                      <div>
                        <h3 className={`text-sm font-black uppercase tracking-widest ${TIER_LABELS[tier].color}`}>{TIER_LABELS[tier].label}</h3>
                        <p className="text-xs text-slate-500 font-medium">{list.length} colleges in this tier</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {list.map((college, i) => (
                        <div
                          key={i}
                          className={`bg-white rounded-2xl border-2 ${TIER_LABELS[tier].border} p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between`}
                        >
                          <div>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${TIER_LABELS[tier].bg} ${TIER_LABELS[tier].color} border ${TIER_LABELS[tier].border}`}>
                              {TIER_LABELS[tier].icon} {tier === 1 ? "Tier 1" : tier === 2 ? "Tier 2" : "Tier 3"}
                            </span>
                            <h4 className="font-black text-slate-900 text-base mt-2 leading-snug">{college.name}</h4>
                            <p className="text-xs text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                              <Building2 className="w-3 h-3" /> {college.location}
                            </p>

                            <div className="grid grid-cols-2 gap-2 mt-4">
                              <div className="bg-slate-50 rounded-xl p-3">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Annual Fee</p>
                                <p className="text-sm font-black text-slate-900">₹{(college.fee / 1000).toFixed(0)}K</p>
                              </div>
                              <div className="bg-slate-50 rounded-xl p-3">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Avg Package</p>
                                <p className="text-sm font-black text-slate-900">{college.avg_package}</p>
                              </div>
                              <div className="bg-slate-50 rounded-xl p-3">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">12th Cutoff</p>
                                <p className="text-sm font-black text-slate-900">{college.cutoff}%+</p>
                              </div>
                              <div className="bg-slate-50 rounded-xl p-3">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Accepts</p>
                                <p className="text-[10px] font-black text-slate-900 leading-tight">{college.exams.join(", ")}</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-100">
                            {college.slug ? (
                              <Link
                                href={`/${college.slug}`}
                                className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-rose-600 hover:text-rose-800 transition-colors group"
                              >
                                View Full Review
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                            ) : (
                              <Link
                                href="/inquiry"
                                className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-600 transition-colors group"
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
              <div className="bg-gradient-to-r from-rose-600 to-rose-900 rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Need BBA Admission Help?</h3>
                <p className="text-rose-100 font-medium mb-6 text-sm max-w-lg mx-auto">
                  Get Mohit Jain's expert BBA shortlist with direct admission strategies — helping students secure top programs without stress.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/inquiry" className="bg-white text-rose-700 font-black uppercase tracking-widest text-xs px-8 py-4 rounded-2xl hover:bg-rose-50 transition-all shadow-lg">
                    Free BBA Counselling →
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
