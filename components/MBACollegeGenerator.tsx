"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Search, X, IndianRupee, Trophy, Building2, ArrowRight, Sparkles, AlertCircle, TrendingUp, BarChart3 } from "lucide-react";

const MBA_STREAMS = [
  "Marketing",
  "Finance",
  "Human Resource (HRM)",
  "Operations & Supply Chain",
  "Business Analytics",
  "Digital Marketing",
  "International Business",
  "Entrepreneurship",
  "FinTech",
  "Healthcare Management",
  "Banking & BFSI",
  "IT & Systems",
];

const FEE_RANGES = [
  { label: "Under ₹5 Lakhs (Total)", max: 500000 },
  { label: "₹5 – ₹10 Lakhs (Total)", min: 500000, max: 1000000 },
  { label: "₹10 – ₹15 Lakhs (Total)", min: 1000000, max: 1500000 },
  { label: "₹15 – ₹20 Lakhs (Total)", min: 1500000, max: 2000000 },
  { label: "₹20 – ₹25 Lakhs (Total)", min: 2000000, max: 2500000 },
  { label: "Above ₹25 Lakhs (Total)", min: 2500000 },
];

// CAT %ile cutoffs approximated for admission eligibility
const MBA_COLLEGES = [
  // TIER 1 — IIMs & Equivalent
  { name: "IIM Ahmedabad", tier: 1, fee: 2900000, catPercentile: 99, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Operations & Supply Chain", "Entrepreneurship", "International Business"], location: "Ahmedabad", avg_package: "₹35 LPA", exams: ["CAT"], slug: null },
  { name: "IIM Bangalore", tier: 1, fee: 2300000, catPercentile: 99, streams: ["Marketing", "Finance", "Business Analytics", "Operations & Supply Chain", "International Business", "Entrepreneurship"], location: "Bangalore", avg_package: "₹33 LPA", exams: ["CAT"], slug: null },
  { name: "IIM Calcutta", tier: 1, fee: 2700000, catPercentile: 99, streams: ["Finance", "Marketing", "Operations & Supply Chain", "Human Resource (HRM)", "FinTech"], location: "Kolkata", avg_package: "₹32 LPA", exams: ["CAT"], slug: null },
  { name: "IIM Lucknow", tier: 1, fee: 2100000, catPercentile: 97, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Entrepreneurship", "International Business"], location: "Lucknow", avg_package: "₹28 LPA", exams: ["CAT"], slug: null },
  { name: "IIM Kozhikode", tier: 1, fee: 2100000, catPercentile: 96, streams: ["Marketing", "Finance", "Operations & Supply Chain", "Digital Marketing", "International Business"], location: "Kozhikode", avg_package: "₹25 LPA", exams: ["CAT"], slug: null },
  { name: "IIM Indore", tier: 1, fee: 2200000, catPercentile: 97, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Operations & Supply Chain", "Business Analytics"], location: "Indore", avg_package: "₹26 LPA", exams: ["CAT"], slug: null },
  { name: "XLRI Jamshedpur", tier: 1, fee: 2500000, catPercentile: 95, streams: ["Human Resource (HRM)", "Finance", "Marketing", "Operations & Supply Chain", "International Business"], location: "Jamshedpur", avg_package: "₹28 LPA", exams: ["XAT"], slug: null },
  { name: "FMS Delhi", tier: 1, fee: 200000, catPercentile: 98, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Entrepreneurship", "Operations & Supply Chain"], location: "Delhi", avg_package: "₹30 LPA", exams: ["CAT"], slug: null },
  { name: "SPJIMR Mumbai", tier: 1, fee: 2300000, catPercentile: 95, streams: ["Marketing", "Finance", "Digital Marketing", "Entrepreneurship", "Operations & Supply Chain"], location: "Mumbai", avg_package: "₹27 LPA", exams: ["CAT", "GMAT"], slug: null },
  { name: "MDI Gurgaon", tier: 1, fee: 2200000, catPercentile: 94, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Operations & Supply Chain", "International Business"], location: "Gurgaon", avg_package: "₹25 LPA", exams: ["CAT"], slug: null },

  // TIER 2 — Strong Private / Baby IIMs
  { name: "IIM Shillong", tier: 2, fee: 1700000, catPercentile: 90, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Entrepreneurship"], location: "Shillong", avg_package: "₹18 LPA", exams: ["CAT"], slug: "blog/baby-iims-review-2026-honest-analysis" },
  { name: "IIM Raipur", tier: 2, fee: 1700000, catPercentile: 90, streams: ["Marketing", "Finance", "Operations & Supply Chain", "Human Resource (HRM)"], location: "Raipur", avg_package: "₹17 LPA", exams: ["CAT"], slug: "blog/baby-iims-review-2026-honest-analysis" },
  { name: "IIM Ranchi", tier: 2, fee: 1800000, catPercentile: 91, streams: ["Human Resource (HRM)", "Finance", "Marketing", "Operations & Supply Chain"], location: "Ranchi", avg_package: "₹18 LPA", exams: ["CAT"], slug: "blog/baby-iims-review-2026-honest-analysis" },
  { name: "IIM Trichy", tier: 2, fee: 1700000, catPercentile: 90, streams: ["Marketing", "Finance", "Operations & Supply Chain", "Business Analytics"], location: "Trichy", avg_package: "₹17 LPA", exams: ["CAT"], slug: "blog/baby-iims-review-2026-honest-analysis" },
  { name: "IIFT Delhi", tier: 2, fee: 2100000, catPercentile: 93, streams: ["International Business", "Finance", "Marketing"], location: "Delhi", avg_package: "₹22 LPA", exams: ["IIFT", "CAT"], slug: null },
  { name: "NMIMS Mumbai", tier: 2, fee: 2800000, catPercentile: 90, streams: ["Finance", "Marketing", "Human Resource (HRM)", "FinTech", "Business Analytics", "Banking & BFSI"], location: "Mumbai", avg_package: "₹20 LPA", exams: ["NMAT", "CAT"], slug: null },
  { name: "SIBM Pune", tier: 2, fee: 2000000, catPercentile: 90, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Operations & Supply Chain", "International Business"], location: "Pune", avg_package: "₹18 LPA", exams: ["SNAP", "CAT"], slug: null },
  { name: "IMT Ghaziabad", tier: 2, fee: 1900000, catPercentile: 85, streams: ["Marketing", "Finance", "Operations & Supply Chain", "Digital Marketing", "International Business"], location: "Ghaziabad", avg_package: "₹15 LPA", exams: ["CAT", "XAT", "GMAT"], slug: null },
  { name: "BIMTECH Greater Noida", tier: 2, fee: 1300000, catPercentile: 75, streams: ["Marketing", "Finance", "Operations & Supply Chain", "International Business", "Entrepreneurship"], location: "Greater Noida", avg_package: "₹9.5 LPA", exams: ["CAT", "XAT", "MAT", "CMAT"], slug: "blog/bimtech-greater-noida-placement-review-2025" },
  { name: "TAPMI Manipal", tier: 2, fee: 1800000, catPercentile: 80, streams: ["Finance", "Marketing", "Banking & BFSI", "Healthcare Management", "FinTech"], location: "Manipal", avg_package: "₹13 LPA", exams: ["CAT", "XAT", "GMAT"], slug: null },
  { name: "XISS Ranchi", tier: 2, fee: 1100000, catPercentile: 75, streams: ["Human Resource (HRM)", "Finance", "Marketing", "Operations & Supply Chain"], location: "Ranchi", avg_package: "₹9 LPA", exams: ["XAT", "CAT"], slug: null },
  { name: "Great Lakes Chennai", tier: 2, fee: 1900000, catPercentile: 80, streams: ["Finance", "Marketing", "Business Analytics", "Entrepreneurship"], location: "Chennai", avg_package: "₹14 LPA", exams: ["CAT", "CMAT", "GMAT"], slug: null },
  { name: "Jaipuria Lucknow", tier: 2, fee: 1100000, catPercentile: 65, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Entrepreneurship"], location: "Lucknow", avg_package: "₹8 LPA", exams: ["CAT", "CMAT", "MAT"], slug: "blog/all-about-jaipuria-institute-of-management" },

  // TIER 3 — Affordable / Direct Admission
  { name: "JIMS Rohini Delhi", tier: 3, fee: 900000, catPercentile: 55, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Entrepreneurship"], location: "Delhi", avg_package: "₹6 LPA", exams: ["CAT", "CMAT", "MAT"], slug: "blog/all-about-jims-rohini" },
  { name: "NDIM New Delhi", tier: 3, fee: 700000, catPercentile: 50, streams: ["Marketing", "Finance", "Human Resource (HRM)", "International Business"], location: "Delhi", avg_package: "₹5.5 LPA", exams: ["CMAT", "MAT"], slug: "blog/all-about-ndim-delhi" },
  { name: "IILM Gurgaon", tier: 3, fee: 900000, catPercentile: 55, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Digital Marketing", "Entrepreneurship"], location: "Gurgaon", avg_package: "₹6 LPA", exams: ["CAT", "CMAT", "MAT"], slug: "blog/all-about-iilm-university" },
  { name: "Gitarattan Delhi", tier: 3, fee: 650000, catPercentile: 50, streams: ["Marketing", "Finance", "Human Resource (HRM)"], location: "Delhi", avg_package: "₹5 LPA", exams: ["CMAT", "MAT"], slug: null },
  { name: "MERI Janakpuri Delhi", tier: 3, fee: 700000, catPercentile: 50, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Operations & Supply Chain"], location: "Delhi", avg_package: "₹5.5 LPA", exams: ["CMAT", "MAT", "CAT"], slug: "blog/meri-janakpuri-mba-review-2026" },
  { name: "Lexicon MILE Pune", tier: 3, fee: 900000, catPercentile: 55, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Entrepreneurship"], location: "Pune", avg_package: "₹6.5 LPA", exams: ["CAT", "CMAT", "MAT"], slug: "blog/lexicon-mile-pune-review-2025" },
  { name: "ASM IIBR Pune", tier: 3, fee: 700000, catPercentile: 50, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Operations & Supply Chain"], location: "Pune", avg_package: "₹5.5 LPA", exams: ["CAT", "CMAT", "MAT"], slug: "blog/why-asm-iibr-pune-good-for-mba-pgdm-2026" },
  { name: "IBMR Gurgaon", tier: 3, fee: 600000, catPercentile: 45, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Digital Marketing"], location: "Gurgaon", avg_package: "₹5 LPA", exams: ["CMAT", "MAT"], slug: "blog/ibmr-gurgaon-bba-review-2026" },
  { name: "Amity Online MBA", tier: 3, fee: 200000, catPercentile: 0, streams: ["Marketing", "Finance", "Human Resource (HRM)", "Digital Marketing", "IT & Systems", "Healthcare Management", "Entrepreneurship"], location: "Online", avg_package: "₹5 LPA", exams: ["No Entrance"], slug: "blog/amity-university-online-noida-review-2026" },
  { name: "NMIMS Online MBA", tier: 3, fee: 180000, catPercentile: 0, streams: ["Marketing", "Finance", "Business Analytics", "FinTech", "IT & Systems"], location: "Online", avg_package: "₹6 LPA", exams: ["No Entrance"], slug: "blog/nmims-online-mba-review-2026" },
];

const TIER_LABELS: Record<number, { label: string; color: string; icon: string; bg: string; border: string }> = {
  1: { label: "Tier 1 — IIM & Equivalent", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-300", icon: "🏆" },
  2: { label: "Tier 2 — Premium B-Schools", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-300", icon: "⭐" },
  3: { label: "Tier 3 — High ROI / Direct Admission", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-300", icon: "🎓" },
};

export function MBACollegeGenerator() {
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedFeeIdx, setSelectedFeeIdx] = useState<number | null>(null);
  const [catPercentile, setCatPercentile] = useState("");
  const [generated, setGenerated] = useState(false);
  const [results, setResults] = useState<typeof MBA_COLLEGES>([]);

  const handleGenerate = () => {
    const percentile = catPercentile ? parseFloat(catPercentile) : null;
    const feeFilter = selectedFeeIdx !== null ? FEE_RANGES[selectedFeeIdx] : null;

    const filtered = MBA_COLLEGES.filter((college) => {
      const streamMatch = !selectedStream || college.streams.includes(selectedStream);
      // Show colleges where your percentile meets or can reasonably reach cutoff (within 5 points)
      const percentileMatch = !percentile || percentile >= college.catPercentile - 5;
      const feeMatch = !feeFilter || (
        (!feeFilter.min || college.fee >= feeFilter.min) &&
        (!feeFilter.max || college.fee <= feeFilter.max)
      );
      return streamMatch && percentileMatch && feeMatch;
    });

    setResults(filtered.sort((a, b) => a.tier - b.tier || b.catPercentile - a.catPercentile));
    setGenerated(true);
  };

  const reset = () => {
    setSelectedStream("");
    setSelectedFeeIdx(null);
    setCatPercentile("");
    setGenerated(false);
    setResults([]);
  };

  const tier1 = results.filter(c => c.tier === 1);
  const tier2 = results.filter(c => c.tier === 2);
  const tier3 = results.filter(c => c.tier === 3);

  return (
    <section className="mt-0 mb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-950 to-slate-900 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-16 -mb-16 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-violet-500/20 rounded-2xl border border-violet-400/20">
              <GraduationCap className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-violet-400">Free Tool</span>
                <span className="flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 rounded-full text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                  <Sparkles className="w-2.5 h-2.5" /> 2026 Edition
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-none">
                MBA College Generator
              </h2>
            </div>
          </div>
          <p className="text-slate-400 text-base font-medium max-w-2xl leading-relaxed">
            Enter your CAT/CMAT percentile, preferred MBA specialization, and total fee budget — get an instant shortlist of Tier 1 IIMs, Tier 2 B-schools, and Tier 3 high-ROI programs.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 p-6 md:p-10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stream */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" /> MBA Specialization
            </label>
            <select
              value={selectedStream}
              onChange={e => setSelectedStream(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-violet-100 focus:outline-none"
            >
              <option value="">All Specializations</option>
              {MBA_STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Fee Range */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5" /> Total Program Fee Budget
            </label>
            <select
              value={selectedFeeIdx ?? ""}
              onChange={e => setSelectedFeeIdx(e.target.value === "" ? null : parseInt(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-violet-100 focus:outline-none"
            >
              <option value="">Any Budget</option>
              {FEE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
            </select>
          </div>

          {/* CAT Percentile */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" /> CAT / CMAT Percentile (optional)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              placeholder="e.g. 85 or 92.5"
              value={catPercentile}
              onChange={e => setCatPercentile(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-violet-100 focus:outline-none placeholder:text-slate-400"
            />
            <p className="text-[10px] text-slate-400 font-semibold mt-1 ml-1">Leave blank to see all colleges</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleGenerate}
            className="flex-1 flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-black uppercase tracking-widest text-sm py-5 rounded-2xl transition-all shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-200 active:scale-95"
          >
            <Search className="w-5 h-5" />
            Generate My MBA Shortlist
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
              <p className="text-slate-400 font-medium">Try increasing your fee budget or adjusting your percentile range.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-slate-600 font-bold">
                  Found <span className="text-violet-600 font-black text-xl">{results.length}</span> MBA programs matching your profile
                </p>
                <Link href="/inquiry" className="text-xs font-black uppercase tracking-widest text-violet-600 hover:text-slate-900 flex items-center gap-1 transition-colors">
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
                        <p className="text-xs text-slate-500 font-medium">{list.length} programs in this tier</p>
                      </div>
                    </div>

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
                                  {TIER_LABELS[tier].icon} {tier === 1 ? "Tier 1" : tier === 2 ? "Tier 2" : "Tier 3"}
                                </span>
                                <h4 className="font-black text-slate-900 text-base mt-2 leading-snug">{college.name}</h4>
                                <p className="text-xs text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                                  <Building2 className="w-3 h-3" /> {college.location}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-4">
                              <div className="bg-slate-50 rounded-xl p-3">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Total Fees</p>
                                <p className="text-sm font-black text-slate-900">₹{(college.fee / 100000).toFixed(1)}L</p>
                              </div>
                              <div className="bg-slate-50 rounded-xl p-3">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Avg Package</p>
                                <p className="text-sm font-black text-slate-900">{college.avg_package}</p>
                              </div>
                              <div className="bg-slate-50 rounded-xl p-3">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">CAT Cutoff</p>
                                <p className="text-sm font-black text-slate-900">
                                  {college.catPercentile === 0 ? "No Exam" : `${college.catPercentile}+ %ile`}
                                </p>
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
                                className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-violet-600 hover:text-violet-800 transition-colors group"
                              >
                                View Full Review
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                            ) : (
                              <Link
                                href="/inquiry"
                                className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-400 hover:text-violet-600 transition-colors group"
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
              <div className="bg-gradient-to-r from-violet-600 to-violet-900 rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Need Help Deciding?</h3>
                <p className="text-violet-100 font-medium mb-6 text-sm max-w-lg mx-auto">
                  Get Mohit Jain's personalized MBA shortlist with direct admission strategies — trusted by 15,000+ students.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/inquiry" className="bg-white text-violet-700 font-black uppercase tracking-widest text-xs px-8 py-4 rounded-2xl hover:bg-violet-50 transition-all shadow-lg">
                    Free MBA Counselling →
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
