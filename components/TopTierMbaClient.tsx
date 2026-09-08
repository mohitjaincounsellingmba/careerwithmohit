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
  Percent,
  Filter,
  ArrowUpDown,
  SlidersHorizontal,
  LayoutGrid,
  Table as TableIcon,
  Check,
  Plus,
  X,
  MessageCircle,
  Phone,
  ChevronDown,
  ChevronUp,
  Award,
  ShieldCheck,
  HelpCircle,
  Share2,
  FileText,
  Sliders,
  Scale,
  Zap,
  Star,
  Users,
  BadgeCheck,
  Building2
} from "lucide-react";
import { TOP_TIER_MBA_COLLEGES, TopTierMbaCollege } from "@/data/topTierMbaColleges";
import { InquiryForm } from "@/components/InquiryForm";
import { submitLead } from "@/lib/leads";

/* ── Helper: Numeric parser for sorting (Lakhs / Crores) ── */
function parseLakhs(str: string): number {
  if (!str) return 0;
  const lower = str.toLowerCase();
  const numMatch = str.match(/([0-9.]+)/);
  if (!numMatch) return 0;
  const num = parseFloat(numMatch[1]);
  if (lower.includes("crore") || lower.includes("cr")) {
    return num * 100;
  }
  return num;
}

/* ── Helper: College Category Badge ── */
function getCollegeBadge(college: TopTierMbaCollege): { label: string; bg: string; text: string; border: string } {
  if (college.isIim) {
    const name = college.name.toLowerCase();
    if (name.includes("ahmedabad") || name.includes("bangalore") || name.includes("calcutta") || name.includes("lucknow") || name.includes("kozhikode") || name.includes("indore")) {
      return { label: "👑 IIM Flagship (BLACKI)", bg: "bg-amber-500/10", text: "text-amber-950", border: "border-amber-300/80" };
    }
    return { label: "🏛️ IIM Campus", bg: "bg-yellow-500/10", text: "text-yellow-950", border: "border-yellow-300/80" };
  }
  if (college.exams.includes("XAT") && !college.exams.includes("CAT")) {
    return { label: "⚡ XAT Elite", bg: "bg-purple-500/10", text: "text-purple-950", border: "border-purple-300/80" };
  }
  if (college.exams.includes("SNAP")) {
    return { label: "💎 SNAP Flagship", bg: "bg-blue-500/10", text: "text-blue-950", border: "border-blue-300/80" };
  }
  if (college.exams.includes("NMAT")) {
    return { label: "🎯 NMAT Top Tier", bg: "bg-rose-500/10", text: "text-rose-950", border: "border-rose-300/80" };
  }
  return { label: "🌟 Premier Private B-School", bg: "bg-emerald-500/10", text: "text-emerald-950", border: "border-emerald-300/80" };
}

/* ── Helper: ROI Indicator Pill ── */
function getRoiBadge(college: TopTierMbaCollege): { label: string; color: string } | null {
  const avg = parseLakhs(college.avg_placement);
  const fee = parseLakhs(college.fees);
  const name = college.name.toLowerCase();
  if (name.includes("fms") || name.includes("tiss") || name.includes("jbims")) {
    return { label: "⚡ Highest ROI in India", color: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white" };
  }
  if (avg > 0 && fee > 0 && avg >= fee * 1.1) {
    return { label: "🌟 Exceptional ROI (Avg > Fees)", color: "bg-gradient-to-r from-indigo-600 to-blue-600 text-white" };
  }
  if (college.isIim && avg >= 28) {
    return { label: "👑 Audited Tier-1 Placement", color: "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black" };
  }
  return null;
}

/* ── Modal: Instant Eligibility & Profile Evaluation ── */
function EligibilityModal({ college, onClose }: { college: TopTierMbaCollege; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState({ name: "", number: "", email: "", exam: "CAT / XAT", percentile: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await submitLead({
      name: form.name,
      number: form.number,
      email: form.email,
      course: "MBA / PGDM 2027",
      source: `Top Tier MBA 2027 Page Direct Eligibility Check (${college.name})`,
      details: {
        targetCollege: college.name,
        targetExam: form.exam,
        currentOrExpectedScore: form.percentile
      }
    });
    setStatus("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="relative bg-white rounded-3xl border border-slate-200/80 shadow-2xl w-full max-w-lg p-6 md:p-8 z-10 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <BadgeCheck className="w-9 h-9 text-emerald-600" />
            </div>
            <span className="bg-emerald-100 text-emerald-800 font-bold text-[11px] uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
              Profile Evaluation Logged
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Evaluation Received!</h3>
            <p className="text-slate-600 text-sm font-medium mb-6">
              Mohit Jain&apos;s counselling team is reviewing your profile for <span className="text-primary font-bold">{college.name}</span>. We will share your cutoff strategy &amp; GD/PI roadmap shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/919811559190?text=${encodeURIComponent(`Hi Mohit, I submitted an eligibility evaluation for ${college.name}. Please share admission details!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3.5 px-4 text-xs uppercase tracking-wider rounded-xl shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Mohit Now
              </a>
              <button
                onClick={onClose}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                Admission Odds Evaluator
              </span>
              <span className="text-xs font-semibold text-slate-500">2027-28 Intake</span>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-1">
              Check Odds For {college.name}
            </h3>
            <p className="text-xs font-medium text-slate-500 mb-6">
              Get an instant profile review, expected safe percentile cutoff, and verified fee structure breakdown.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Target B-School
                </label>
                <input
                  type="text"
                  value={college.name}
                  readOnly
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  WhatsApp Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="e.g. 9876543210 (10-digit mobile)"
                  value={form.number}
                  onChange={e => setForm({ ...form, number: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Primary Exam
                  </label>
                  <select
                    value={form.exam}
                    onChange={e => setForm({ ...form, exam: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  >
                    <option value="CAT">CAT 2026/2027</option>
                    <option value="XAT">XAT 2027</option>
                    <option value="NMAT">NMAT by GMAC</option>
                    <option value="SNAP">SNAP 2026/2027</option>
                    <option value="GMAT / GRE">GMAT / GRE</option>
                    <option value="Other / Multiple">Multiple Exams</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Expected %ile / Score
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 96 %ile / 235 NMAT"
                    value={form.percentile}
                    onChange={e => setForm({ ...form, percentile: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 px-6 text-sm uppercase tracking-wider rounded-xl shadow-md shadow-amber-500/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {status === "submitting" ? (
                  "Analyzing Profile..."
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    Get Instant Profile Assessment
                  </>
                )}
              </button>

              <p className="text-[11px] font-medium text-slate-400 text-center">
                🔒 100% Confidential • Directly supervised by Mohit Jain
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Modal: Side-by-Side Comparison Matrix ── */
function CompareModal({
  colleges,
  onClose,
  onRemove,
  onInquire
}: {
  colleges: TopTierMbaCollege[];
  onClose: () => void;
  onRemove: (name: string) => void;
  onInquire: (college: TopTierMbaCollege) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="relative bg-white rounded-3xl border border-slate-200/80 shadow-2xl w-full max-w-6xl z-10 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A192F] via-[#0D2342] to-[#123058] text-white p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
                B-School Comparison Matrix 2027-28
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
                Side-by-Side Analysis ({colleges.length} Colleges)
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close comparison modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto flex-grow p-6">
          <table className="w-full border-collapse border border-slate-200/80 text-left rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 border-r border-slate-200 font-bold uppercase text-xs text-slate-500 w-44">
                  Parameter
                </th>
                {colleges.map((col, idx) => (
                  <th key={idx} className="p-4 border-r border-slate-200 min-w-[220px] relative bg-white">
                    <button
                      onClick={() => onRemove(col.name)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1 rounded-full hover:bg-rose-50 transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1">
                      {col.isIim ? "IIM Campus" : "Top B-School"}
                    </div>
                    <div className="text-base font-extrabold text-slate-900 leading-tight">
                      {col.name}
                    </div>
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {col.location}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Accepted Exams */}
              <tr>
                <td className="p-4 border-r border-slate-200 font-bold text-xs uppercase text-slate-600 bg-slate-50/50">
                  Accepted Exams
                </td>
                {colleges.map((col, idx) => (
                  <td key={idx} className="p-4 border-r border-slate-200 font-medium">
                    <div className="flex flex-wrap gap-1.5">
                      {col.exams.map(ex => (
                        <span key={ex} className="bg-blue-50 text-blue-700 border border-blue-200/60 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Total Fees */}
              <tr>
                <td className="p-4 border-r border-slate-200 font-bold text-xs uppercase text-slate-600 bg-slate-50/50">
                  Total Program Fee
                </td>
                {colleges.map((col, idx) => (
                  <td key={idx} className="p-4 border-r border-slate-200">
                    <span className="font-extrabold text-slate-900 text-base">{col.fees}</span>
                    <span className="block text-[11px] font-medium text-slate-400">2-Year MBA/PGDM</span>
                  </td>
                ))}
              </tr>

              {/* Exam Cutoff */}
              <tr>
                <td className="p-4 border-r-2 border-slate-200 font-bold text-xs uppercase text-slate-600 bg-slate-50/50">
                  Required Cutoff
                </td>
                {colleges.map((col, idx) => (
                  <td key={idx} className="p-4 border-r border-slate-200">
                    <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold px-3 py-1 rounded-full text-xs uppercase">
                      {col.cutoff}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Average Placement */}
              <tr>
                <td className="p-4 border-r border-slate-200 font-bold text-xs uppercase text-slate-600 bg-slate-50/50">
                  Avg Placement
                </td>
                {colleges.map((col, idx) => (
                  <td key={idx} className="p-4 border-r border-slate-200">
                    <span className="font-extrabold text-primary text-base">{col.avg_placement}</span>
                    <span className="block text-[11px] font-semibold text-emerald-600">✓ Audited Report</span>
                  </td>
                ))}
              </tr>

              {/* Highest Placement */}
              <tr>
                <td className="p-4 border-r border-slate-200 font-bold text-xs uppercase text-slate-600 bg-slate-50/50">
                  Highest Package
                </td>
                {colleges.map((col, idx) => (
                  <td key={idx} className="p-4 border-r border-slate-200 font-bold text-slate-900 text-base">
                    {col.highest_placement}
                  </td>
                ))}
              </tr>

              {/* ROI Verdict */}
              <tr>
                <td className="p-4 border-r border-slate-200 font-bold text-xs uppercase text-slate-600 bg-slate-50/50">
                  Value / ROI Score
                </td>
                {colleges.map((col, idx) => {
                  const badge = getRoiBadge(col);
                  return (
                    <td key={idx} className="p-4 border-r border-slate-200">
                      {badge ? (
                        <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${badge.color}`}>
                          {badge.label}
                        </span>
                      ) : (
                        <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-[11px] font-medium border border-slate-200">
                          🌟 Premier B-School Choice
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Action Links */}
              <tr>
                <td className="p-4 border-r border-slate-200 font-bold text-xs uppercase text-slate-600 bg-slate-50/50">
                  Actions
                </td>
                {colleges.map((col, idx) => (
                  <td key={idx} className="p-4 border-r border-slate-200 space-y-2">
                    <button
                      onClick={() => { onClose(); onInquire(col); }}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-2.5 px-3 text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      Check Eligibility →
                    </button>
                    {col.slug && (
                      <Link
                        href={`/${col.slug}`}
                        className="block text-center text-xs font-bold text-primary hover:underline"
                      >
                        Read Full Review
                      </Link>
                    )}
                    <a
                      href={col.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-[11px] font-medium text-slate-500 hover:text-slate-800"
                    >
                      Official Website ↗
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200/80 rounded-b-3xl flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Comparing verified NIRF &amp; Audited placement data across India&apos;s leading MBA programs.
          </span>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2 text-xs uppercase tracking-wider rounded-xl transition-colors"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Interactive FAQ Accordion Component ── */
function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "Which are the top MBA colleges in India for 2027-28 admission?",
      answer: "The Tier-1 MBA institutions in India include the top IIMs (IIM Ahmedabad, Bangalore, Calcutta, Lucknow, Kozhikode, and Indore), along with premier private and university institutions such as XLRI Jamshedpur, FMS Delhi, SPJIMR Mumbai, MDI Gurgaon, SIBM Pune, and NMIMS Mumbai. Admission cutoffs range from 95 to 99.5+ percentile in CAT, XAT, NMAT, or SNAP."
    },
    {
      question: "What is the expected NMAT score for NMIMS Mumbai in 2027?",
      answer: "For the flagship MBA program at NMIMS School of Business Management (SBM), Mumbai, the expected overall cutoff score is 232+ out of 360 in NMAT by GMAC. Additionally, candidates must clear sectional cutoffs across Language Skills, Quantitative Skills, and Logical Reasoning."
    },
    {
      question: "Which top MBA colleges accept the SNAP score?",
      answer: "Symbiosis Institute of Business Management (SIBM) Pune and Symbiosis Centre for Management and Human Resource Development (SCMHRD) Pune are the two flagship institutes accepting SNAP. Expected cutoffs for SIBM Pune are ~98.5+ percentile, and for SCMHRD Pune ~96+ percentile."
    },
    {
      question: "What are the fees and average placement package for IIM Ahmedabad?",
      answer: "The total program fee for the 2-Year PGP (MBA) at IIM Ahmedabad is approximately ₹26.5 Lakhs. According to the latest audited placement report, the average placement package stands at ₹35.22 LPA, while the highest domestic package reached ₹1.15 Crore."
    },
    {
      question: "How do I choose between an IIM and top private B-Schools like XLRI, SPJIMR, or MDI?",
      answer: "While older IIMs (IIM A, B, C) offer unmatched brand equity, flagship private colleges like XLRI Jamshedpur (unrivaled in HR and elite in BM), SPJIMR Mumbai (profile-based calls and excellent ROI), and FMS Delhi (₹2 Lakh fee with ₹34+ LPA average package) equal or exceed several new and baby IIMs in corporate recognition, ROI, and recruiter diversity."
    },
    {
      question: "What profile is required to get a call from IIM A, B, C or FMS Delhi?",
      answer: "IIM Ahmedabad, Bangalore, and Calcutta use a composite score comprising your CAT percentile (usually 99.2+ for General category), 10th/12th/Graduation academic marks, academic diversity (non-engineering bonus), and work experience. FMS Delhi weighs verbal ability heavily in CAT and has no sectional cutoff restrictions for interview shortlisting."
    },
    {
      question: "Which MBA colleges offer the highest Return on Investment (ROI) in India?",
      answer: "FMS Delhi offers the highest ROI in India, with a total 2-year fee of roughly ₹2 Lakhs against an average placement of ₹34.1 LPA. Other exceptional ROI institutions include JBIMS Mumbai, TISS Mumbai (HRM & LR), and DFS/DBE Delhi University."
    },
    {
      question: "Can I get into a top Tier-1 B-School with average past academic scores?",
      answer: "Yes! Several top institutes place lower or zero weightage on past 10th/12th academic records once you clear their entrance test cutoff. Examples include XLRI Jamshedpur (via XAT), FMS Delhi, MDI Gurgaon, NMIMS Mumbai (via NMAT), and SIBM Pune (via SNAP)."
    }
  ];

  return (
    <section className="mt-20 bg-slate-50/70 rounded-3xl border border-slate-200/80 p-6 md:p-12 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <span className="bg-amber-500/10 text-amber-900 border border-amber-300/80 px-3.5 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
          Knowledge Base 2027-28
        </span>
        <span className="text-xs font-semibold text-slate-500">Expert Answers by Mohit Jain</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-8">
        Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Questions</span>
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? "bg-white border-amber-400/60 shadow-md shadow-amber-500/5" 
                  : "bg-white border-slate-200/80 hover:border-slate-300"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-base md:text-lg font-bold text-slate-900 flex items-start gap-3">
                  <span className="text-amber-500 font-mono font-bold">0{idx + 1}.</span>
                  {faq.question}
                </span>
                <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-transform ${
                  isOpen ? "bg-amber-500 text-slate-950 rotate-180" : "bg-slate-100 text-slate-600"
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-6 md:px-6 md:pb-8 pt-2 text-slate-600 font-medium text-sm leading-relaxed border-t border-slate-100">
                  <p className="border-l-2 border-amber-400/80 pl-4">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Main Exported Component ── */
export function TopTierMbaClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "iim" | "nmat" | "snap" | "xat" | "private" | "top-roi">("all");
  const [sortBy, setSortBy] = useState<"default" | "avg_desc" | "highest_desc" | "fees_asc">("default");
  const [feeFilter, setFeeFilter] = useState<"all" | "under_20" | "20_25" | "above_25">("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  /* Comparison state */
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  /* Instant Eligibility check state */
  const [inquiryCollege, setInquiryCollege] = useState<TopTierMbaCollege | null>(null);

  /* Filtering & Sorting Logic */
  const filteredColleges = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return TOP_TIER_MBA_COLLEGES.filter(college => {
      // Search text matching
      const matchesSearch = 
        college.name.toLowerCase().includes(query) ||
        college.location.toLowerCase().includes(query) ||
        college.exams.some(ex => ex.toLowerCase().includes(query));

      // Tab category matching
      let matchesTab = true;
      if (activeTab === "iim") {
        matchesTab = college.isIim;
      } else if (activeTab === "nmat") {
        matchesTab = college.exams.includes("NMAT");
      } else if (activeTab === "snap") {
        matchesTab = college.exams.includes("SNAP");
      } else if (activeTab === "xat") {
        matchesTab = college.exams.includes("XAT");
      } else if (activeTab === "private") {
        matchesTab = !college.isIim;
      } else if (activeTab === "top-roi") {
        const avg = parseLakhs(college.avg_placement);
        const fee = parseLakhs(college.fees);
        matchesTab = (avg > 0 && fee > 0 && avg >= fee) || college.name.toLowerCase().includes("fms") || college.name.toLowerCase().includes("tiss") || college.name.toLowerCase().includes("jbims");
      }

      // Fee Range matching
      let matchesFee = true;
      const feeNum = parseLakhs(college.fees);
      if (feeFilter === "under_20") {
        matchesFee = feeNum > 0 && feeNum <= 20;
      } else if (feeFilter === "20_25") {
        matchesFee = feeNum > 20 && feeNum <= 25;
      } else if (feeFilter === "above_25") {
        matchesFee = feeNum > 25;
      }

      return matchesSearch && matchesTab && matchesFee;
    }).sort((a, b) => {
      if (sortBy === "avg_desc") {
        return parseLakhs(b.avg_placement) - parseLakhs(a.avg_placement);
      }
      if (sortBy === "highest_desc") {
        return parseLakhs(b.highest_placement) - parseLakhs(a.highest_placement);
      }
      if (sortBy === "fees_asc") {
        return parseLakhs(a.fees) - parseLakhs(b.fees);
      }
      return 0; // Default editorial order
    });
  }, [searchQuery, activeTab, sortBy, feeFilter]);

  /* Compare Toggle Handler */
  const toggleCompare = (collegeName: string) => {
    setCompareList(prev => {
      if (prev.includes(collegeName)) {
        return prev.filter(n => n !== collegeName);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 MBA colleges simultaneously.");
        return prev;
      }
      return [...prev, collegeName];
    });
  };

  const selectedCompareColleges = useMemo(() => {
    return TOP_TIER_MBA_COLLEGES.filter(col => compareList.includes(col.name));
  }, [compareList]);

  return (
    <div className="w-full bg-slate-50/50 pb-28">
      {/* Dynamic Sub-header Stats Bar */}
      <section className="bg-[#0A192F] text-white border-b border-white/10 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-white/10 text-amber-300 border border-white/15 px-3.5 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
              Live NIRF 2027-28 Audit
            </span>
            <span className="text-sm font-medium text-slate-300 hidden sm:inline">
              Compare India&apos;s Tier 1 &amp; Premier B-Schools • Updated Cutoffs &amp; Placements
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-widest">
                Directory Scope
              </span>
              <span className="text-base font-extrabold text-amber-300">{TOP_TIER_MBA_COLLEGES.length} Verified Colleges</span>
            </div>
            <div className="text-right border-l border-white/15 pl-6">
              <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-widest">
                IIM Coverage
              </span>
              <span className="text-base font-extrabold text-emerald-400">All 20 Campuses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Navigation Tabs, Search, Sort and View Toggles */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -mr-20 -mt-20 blur-2xl pointer-events-none" />

          {/* Top Row: Exam Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-6 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: "all", label: "All B-Schools", count: TOP_TIER_MBA_COLLEGES.length, icon: School },
              { id: "iim", label: "👑 All 20 IIMs", count: TOP_TIER_MBA_COLLEGES.filter(c => c.isIim).length, icon: Award },
              { id: "nmat", label: "🎯 NMAT Top Tier", count: TOP_TIER_MBA_COLLEGES.filter(c => c.exams.includes("NMAT")).length, icon: Sparkles },
              { id: "snap", label: "💎 SNAP Flagships", count: TOP_TIER_MBA_COLLEGES.filter(c => c.exams.includes("SNAP")).length, icon: Zap },
              { id: "xat", label: "⚡ XAT Accepting", count: TOP_TIER_MBA_COLLEGES.filter(c => c.exams.includes("XAT")).length, icon: Star },
              { id: "private", label: "🌟 Top Private", count: TOP_TIER_MBA_COLLEGES.filter(c => !c.isIim).length, icon: Building2 },
              { id: "top-roi", label: "💰 High ROI", count: TOP_TIER_MBA_COLLEGES.filter(c => {
                const avg = parseLakhs(c.avg_placement);
                const fee = parseLakhs(c.fees);
                return (avg > 0 && fee > 0 && avg >= fee) || c.name.toLowerCase().includes("fms") || c.name.toLowerCase().includes("tiss");
              }).length, icon: TrendingUp }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 font-bold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                    isActive
                      ? "bg-[#0A192F] text-white shadow-md shadow-slate-950/20"
                      : "bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 border border-slate-200/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-500"}`} />
                  {tab.label}
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-600"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Row: Search, Fee Filter, Sort By, and View Mode Toggle */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pt-6 border-t border-slate-100">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search college, city, or exam (CAT, XAT, NMAT)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 h-12 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter & Sort Controls Group */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Fee Range Filter */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <DollarSign className="w-4 h-4 text-slate-500" />
                <select
                  value={feeFilter}
                  onChange={e => setFeeFilter(e.target.value as any)}
                  className="bg-transparent text-xs font-bold uppercase text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Fee Ranges</option>
                  <option value="under_20">Under ₹20 Lakhs</option>
                  <option value="20_25">₹20L – ₹25 Lakhs</option>
                  <option value="above_25">Above ₹25 Lakhs</option>
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <ArrowUpDown className="w-4 h-4 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-bold uppercase text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="default">Sort: Editorial Ranking</option>
                  <option value="avg_desc">Sort: Highest Avg Package</option>
                  <option value="highest_desc">Sort: Highest Package</option>
                  <option value="fees_asc">Sort: Lowest Program Fee</option>
                </select>
              </div>

              {/* View Mode Toggle (Grid vs Table) */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase ${
                    viewMode === "grid" 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase ${
                    viewMode === "table" 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Comparison Matrix View"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Table Matrix</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Colleges Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header bar */}
            <div className="flex justify-between items-center border-b border-slate-200/80 pb-4">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                  <School className="w-5 h-5 text-amber-500" />
                  {viewMode === "grid" ? "B-School Profiles" : "Comparative Spreadsheet"}
                </h2>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Showing {filteredColleges.length} of {TOP_TIER_MBA_COLLEGES.length} institutions
                </p>
              </div>
              
              {compareList.length > 0 && (
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-full px-4 py-2 text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Scale className="w-4 h-4" />
                  Compare ({compareList.length}) →
                </button>
              )}
            </div>

            {filteredColleges.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 p-16 text-center bg-white">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-extrabold text-slate-900 uppercase mb-2">
                  No matching colleges found
                </h3>
                <p className="text-slate-500 text-sm font-medium max-w-md mx-auto">
                  We couldn&apos;t find any college matching &ldquo;{searchQuery}&rdquo; in this filter category.
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveTab("all"); setFeeFilter("all"); }}
                  className="mt-6 px-6 py-2.5 bg-slate-900 text-white font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* ── GRID / CARD VIEW ── */
              <div className="space-y-6">
                {filteredColleges.map((college, idx) => {
                  const badge = getCollegeBadge(college);
                  const roiBadge = getRoiBadge(college);
                  const isCompared = compareList.includes(college.name);

                  return (
                    <div
                      key={idx}
                      className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300/90 transition-all duration-300 p-6 md:p-8 relative overflow-hidden"
                    >
                      {/* Top Category Badge Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`${badge.bg} ${badge.text} border ${badge.border} px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider`}>
                            {badge.label}
                          </span>
                          {roiBadge && (
                            <span className={`${roiBadge.color} px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider shadow-sm`}>
                              {roiBadge.label}
                            </span>
                          )}
                        </div>

                        {/* Compare Checkbox Button */}
                        <button
                          onClick={() => toggleCompare(college.name)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isCompared
                              ? "bg-[#0A192F] text-white border-transparent shadow-sm"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                          }`}
                        >
                          {isCompared ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-amber-400" />
                              Comparing
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              Compare
                            </>
                          )}
                        </button>
                      </div>

                      {/* College Name & Exam Tags */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                          <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 group-hover:text-primary transition-colors flex items-center gap-2">
                            {college.name}
                          </h3>
                          <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {college.location}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {college.exams.map((exam, i) => (
                            <span
                              key={i}
                              className="bg-blue-50 text-blue-700 border border-blue-200/60 rounded-lg px-2.5 py-1 font-bold text-xs uppercase tracking-wider"
                            >
                              {exam}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Metrics 4-Box Matrix */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
                        <div className="bg-slate-50/80 rounded-2xl border border-slate-200/70 p-4">
                          <div className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Total Fees
                          </div>
                          <p className="text-base font-extrabold text-slate-900 mt-1">{college.fees}</p>
                          <span className="block text-[11px] font-medium text-slate-400 mt-0.5">2-Year Program</span>
                        </div>

                        <div className="bg-emerald-50/60 rounded-2xl border border-emerald-200/70 p-4">
                          <div className="text-[11px] font-bold uppercase text-emerald-800 flex items-center gap-1">
                            <Percent className="w-3.5 h-3.5 text-emerald-700" /> Cut-off Required
                          </div>
                          <p className="text-base font-extrabold text-emerald-900 mt-1">{college.cutoff}</p>
                          <span className="block text-[11px] font-semibold text-emerald-600 mt-0.5">Expected 2027</span>
                        </div>

                        <div className="bg-indigo-50/60 rounded-2xl border border-indigo-200/70 p-4">
                          <div className="text-[11px] font-bold uppercase text-indigo-800 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" /> Avg Placement
                          </div>
                          <p className="text-base font-extrabold text-primary mt-1">{college.avg_placement}</p>
                          <span className="block text-[11px] font-semibold text-indigo-600 mt-0.5">Audited Report</span>
                        </div>

                        <div className="bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] rounded-2xl border border-slate-800 text-white p-4 shadow-sm">
                          <div className="text-[11px] font-bold uppercase text-amber-300 flex items-center gap-1">
                            <Trophy className="w-3.5 h-3.5 text-amber-400" /> Highest Package
                          </div>
                          <p className="text-base font-extrabold text-white mt-1">{college.highest_placement}</p>
                          <span className="block text-[11px] font-medium text-slate-300 mt-0.5">Peak Offer</span>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-4">
                          {college.slug ? (
                            <Link
                              href={`/${college.slug}`}
                              prefetch={false}
                              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-all group/btn"
                            >
                              Read Complete Review
                              <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          ) : (
                            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                              <BookOpen className="w-3.5 h-3.5" /> Full profile updating
                            </span>
                          )}

                          <a
                            href={college.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                          >
                            Official Website
                            <ExternalLink className="ml-1 w-3 h-3" />
                          </a>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setInquiryCollege(college)}
                            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl px-4 py-2.5 text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                            Check Admission Odds
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ── TABLE / SPREADSHEET MATRIX VIEW ── */
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#0A192F] text-white">
                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Institution</th>
                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Exams</th>
                        <th className="p-4 font-bold uppercase text-xs tracking-wider">2-Yr Fees</th>
                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Cutoff</th>
                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Avg Pkg</th>
                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Highest Pkg</th>
                        <th className="p-4 font-bold uppercase text-xs tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredColleges.map((col, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-4">
                            <div className="font-extrabold text-slate-900 text-sm uppercase">{col.name}</div>
                            <div className="text-xs font-medium text-slate-500">{col.location}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {col.exams.map(ex => (
                                <span key={ex} className="bg-blue-50 text-blue-700 border border-blue-200/60 rounded px-2 py-0.5 text-[10px] font-bold uppercase">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 font-extrabold text-sm text-slate-900">{col.fees}</td>
                          <td className="p-4">
                            <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-bold uppercase border border-emerald-200/80">
                              {col.cutoff}
                            </span>
                          </td>
                          <td className="p-4 font-extrabold text-primary text-sm">{col.avg_placement}</td>
                          <td className="p-4 font-extrabold text-slate-900 text-sm">{col.highest_placement}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setInquiryCollege(col)}
                                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                              >
                                Check Odds
                              </button>
                              <button
                                onClick={() => toggleCompare(col.name)}
                                className={`p-1.5 rounded-lg border border-slate-200 cursor-pointer transition-colors ${
                                  compareList.includes(col.name) 
                                    ? "bg-[#0A192F] text-white" 
                                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                }`}
                                title="Compare"
                              >
                                {compareList.includes(col.name) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Counselling Form & Expert Widget Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto pr-1 space-y-6">
            <div id="consult-form" className="scroll-mt-24 space-y-6">
              {/* Executive Strategy Card */}
              <div className="rounded-3xl bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white border border-white/10 p-6 md:p-8 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full -mr-10 -mt-10 blur-xl" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                    Admission Strategy 2027-28
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold leading-tight mb-2">
                  Targeting IIMs, XLRI, or NMIMS?
                </h3>
                <p className="text-xs font-medium text-slate-300 leading-relaxed mb-5 border-l-2 border-amber-400/80 pl-3">
                  Don&apos;t apply blindly. Let Mohit Jain formulate your profile strategy, analyze your GD/PI calls, and guide you to India&apos;s best ROI business schools.
                </p>

                <div className="space-y-2.5 mb-6 text-xs font-semibold text-slate-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Safe vs. Ambitious Cutoff Assessment</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Profile Diversity (Engineering / Non-Engg)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Direct Admission &amp; Management Quota Help</span>
                  </div>
                </div>

                <a
                  href="https://wa.me/919811559190?text=Hi%20Mohit,%20I%20am%20exploring%20Top%20Tier%20MBA%20colleges%20for%202027-28.%20Please%20help%20me%20with%20counselling!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3.5 px-4 text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all block text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat With Mohit On WhatsApp
                </a>
              </div>

              {/* Lead Gen Form */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
                <InquiryForm
                  variant="sidebar"
                  source="Top Tier MBA Colleges Page - Sidebar Callback Request"
                  title="Request B-School Callback"
                  subtitle="Get 1-on-1 cutoff analysis & GD/PI preparation roadmap."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE FAQ SECTION ── */}
      <div className="max-w-7xl mx-auto px-6">
        <FaqAccordion />
      </div>

      {/* ── STICKY FLOATING COMPARISON DRAWER ── */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A192F]/95 backdrop-blur-md text-white border-t border-white/10 py-4 px-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                COMPARING ({compareList.length}/4)
              </span>
              <div className="flex flex-wrap gap-2">
                {compareList.map(name => (
                  <span key={name} className="bg-white/10 border border-white/15 text-slate-200 font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-2">
                    {name}
                    <button 
                      onClick={() => toggleCompare(name)}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCompareList([])}
                className="text-xs font-semibold text-slate-400 hover:text-white uppercase px-3 py-1.5 cursor-pointer"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowCompareModal(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black px-6 py-2.5 text-xs uppercase tracking-wider rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Scale className="w-4 h-4" />
                Compare Now ({compareList.length}) →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODALS ── */}
      {showCompareModal && (
        <CompareModal
          colleges={selectedCompareColleges}
          onClose={() => setShowCompareModal(false)}
          onRemove={toggleCompare}
          onInquire={college => setInquiryCollege(college)}
        />
      )}

      {inquiryCollege && (
        <EligibilityModal
          college={inquiryCollege}
          onClose={() => setInquiryCollege(null)}
        />
      )}
    </div>
  );
}
