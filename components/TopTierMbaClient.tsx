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
      return { label: "👑 IIM Flagship (BLACKI)", bg: "bg-amber-100", text: "text-amber-900", border: "border-amber-400" };
    }
    return { label: "🏛️ IIM Campus", bg: "bg-yellow-100", text: "text-yellow-900", border: "border-yellow-400" };
  }
  if (college.exams.includes("XAT") && !college.exams.includes("CAT")) {
    return { label: "⚡ XAT Elite", bg: "bg-purple-100", text: "text-purple-900", border: "border-purple-300" };
  }
  if (college.exams.includes("SNAP")) {
    return { label: "💎 SNAP Flagship", bg: "bg-blue-100", text: "text-blue-900", border: "border-blue-300" };
  }
  if (college.exams.includes("NMAT")) {
    return { label: "🎯 NMAT Top Tier", bg: "bg-rose-100", text: "text-rose-900", border: "border-rose-300" };
  }
  return { label: "🌟 Premier Private B-School", bg: "bg-emerald-100", text: "text-emerald-900", border: "border-emerald-300" };
}

/* ── Helper: ROI Indicator Pill ── */
function getRoiBadge(college: TopTierMbaCollege): { label: string; color: string } | null {
  const avg = parseLakhs(college.avg_placement);
  const fee = parseLakhs(college.fees);
  const name = college.name.toLowerCase();
  if (name.includes("fms") || name.includes("tiss") || name.includes("jbims")) {
    return { label: "⚡ Highest ROI in India", color: "bg-emerald-600 text-white" };
  }
  if (avg > 0 && fee > 0 && avg >= fee * 1.1) {
    return { label: "🌟 Exceptional ROI (Avg > Fees)", color: "bg-indigo-600 text-white" };
  }
  if (college.isIim && avg >= 28) {
    return { label: "👑 Audited Tier-1 Placement", color: "bg-amber-600 text-white" };
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
      course: "MBA / PGDM 2026",
      source: `Top Tier MBA 2026 Page Direct Eligibility Check (${college.name})`,
      details: {
        targetCollege: college.name,
        targetExam: form.exam,
        currentOrExpectedScore: form.percentile
      }
    });
    setStatus("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="relative bg-white border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-lg p-6 md:p-8 z-10 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 border-2 border-foreground p-1.5 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 border-2 border-foreground flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <BadgeCheck className="w-10 h-10 text-emerald-600" />
            </div>
            <span className="bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest px-3 py-1 border border-foreground inline-block mb-3">
              PROFILE EVALUATION LOGGED
            </span>
            <h3 className="text-2xl font-black uppercase text-foreground mb-2">Checklist Received!</h3>
            <p className="text-slate-600 text-sm font-bold mb-6">
              Mohit Jain&apos;s counselling team is reviewing your profile for <span className="text-primary underline decoration-2">{college.name}</span>. We will share your cutoff strategy &amp; GD/PI roadmap shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/919811559190?text=${encodeURIComponent(`Hi Mohit, I submitted an eligibility evaluation for ${college.name}. Please share admission details!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 px-4 text-xs uppercase tracking-wider border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Mohit Now
              </a>
              <button
                onClick={onClose}
                className="bg-slate-200 hover:bg-slate-300 text-foreground font-black py-3.5 px-6 text-xs uppercase tracking-wider border-2 border-foreground"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-foreground">
                ADMISSION ODDS EVALUATOR
              </span>
              <span className="text-xs font-bold text-slate-500">2026-27 Intake</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-1">
              Check Odds For {college.name}
            </h3>
            <p className="text-xs font-bold text-slate-500 mb-6 border-l-4 border-primary pl-2.5">
              Get an instant profile review, expected safe percentile cutoff, and verified fee structure breakdown.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                  Target B-School
                </label>
                <input
                  type="text"
                  value={college.name}
                  readOnly
                  className="w-full bg-slate-100 border-2 border-foreground px-4 py-2.5 text-sm font-black text-slate-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white border-2 border-foreground px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                  WhatsApp Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="e.g. 9876543210 (10-digit mobile)"
                  value={form.number}
                  onChange={e => setForm({ ...form, number: e.target.value })}
                  className="w-full bg-white border-2 border-foreground px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Primary Exam
                  </label>
                  <select
                    value={form.exam}
                    onChange={e => setForm({ ...form, exam: e.target.value })}
                    className="w-full bg-white border-2 border-foreground px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="CAT">CAT 2026</option>
                    <option value="XAT">XAT 2026</option>
                    <option value="NMAT">NMAT by GMAC</option>
                    <option value="SNAP">SNAP 2026</option>
                    <option value="GMAT / GRE">GMAT / GRE</option>
                    <option value="Other / Multiple">Multiple Exams</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Expected %ile / Score
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 96 %ile / 235 NMAT"
                    value={form.percentile}
                    onChange={e => setForm({ ...form, percentile: e.target.value })}
                    className="w-full bg-white border-2 border-foreground px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-black py-4 px-6 text-sm uppercase tracking-wider border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {status === "submitting" ? (
                  "Analyzing Profile..."
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-accent" />
                    Get Instant Profile Assessment
                  </>
                )}
              </button>

              <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="relative bg-white border-4 border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] w-full max-w-6xl z-10 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 border-b-4 border-foreground flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-accent" />
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-accent block">
                B-SCHOOL MATRIX 2026
              </span>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                Side-by-Side Comparison ({colleges.length} Colleges)
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white border-2 border-white/20 p-2 transition-colors"
            aria-label="Close comparison modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto flex-grow p-6">
          <table className="w-full border-collapse border-2 border-foreground text-left">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-foreground">
                <th className="p-4 border-r-2 border-foreground font-black uppercase text-xs text-slate-500 w-44">
                  Parameter
                </th>
                {colleges.map((col, idx) => (
                  <th key={idx} className="p-4 border-r-2 border-foreground min-w-[220px] relative bg-white">
                    <button
                      onClick={() => onRemove(col.name)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 p-1"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="text-xs font-black uppercase tracking-wider text-primary mb-1">
                      {col.isIim ? "IIM Campus" : "Top B-School"}
                    </div>
                    <div className="text-lg font-black uppercase text-foreground leading-tight">
                      {col.name}
                    </div>
                    <div className="text-xs font-bold text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {col.location}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-foreground">
              {/* Accepted Exams */}
              <tr>
                <td className="p-4 border-r-2 border-foreground font-black text-xs uppercase text-slate-600 bg-slate-50">
                  Accepted Exams
                </td>
                {colleges.map((col, idx) => (
                  <td key={idx} className="p-4 border-r-2 border-foreground font-bold">
                    <div className="flex flex-wrap gap-1.5">
                      {col.exams.map(ex => (
                        <span key={ex} className="bg-blue-50 text-primary border border-primary/30 px-2.5 py-0.5 text-xs font-black uppercase">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Total Fees */}
              <tr>
                <td className="p-4 border-r-2 border-foreground font-black text-xs uppercase text-slate-600 bg-slate-50">
                  Total Program Fee
                </td>
                {colleges.map((col, idx) => (
                  <td key={idx} className="p-4 border-r-2 border-foreground">
                    <span className="font-black text-slate-900 text-base">{col.fees}</span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">2-Year MBA/PGDM</span>
                  </td>
                ))}
              </tr>

              {/* Exam Cutoff */}
              <tr>
                <td className="p-4 border-r-2 border-foreground font-black text-xs uppercase text-slate-600 bg-slate-50">
                  Required Cutoff
                </td>
                {colleges.map((col, idx) => (
                  <td key={idx} className="p-4 border-r-2 border-foreground">
                    <span className="inline-block bg-emerald-100 text-emerald-900 border border-emerald-400 font-black px-3 py-1 text-xs uppercase">
                      {col.cutoff}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Average Placement */}
              <tr>
                <td className="p-4 border-r-2 border-foreground font-black text-xs uppercase text-slate-600 bg-slate-50">
                  Avg Placement
                </td>
                {colleges.map((col, idx) => (
                  <td key={idx} className="p-4 border-r-2 border-foreground">
                    <span className="font-black text-primary text-lg">{col.avg_placement}</span>
                    <span className="block text-[10px] font-bold text-emerald-600 uppercase">✓ Audited Report</span>
                  </td>
                ))}
              </tr>

              {/* Highest Placement */}
              <tr>
                <td className="p-4 border-r-2 border-foreground font-black text-xs uppercase text-slate-600 bg-slate-50">
                  Highest Package
                </td>
                {colleges.map((col, idx) => (
                  <td key={idx} className="p-4 border-r-2 border-foreground font-black text-slate-950 text-base">
                    {col.highest_placement}
                  </td>
                ))}
              </tr>

              {/* ROI Verdict */}
              <tr>
                <td className="p-4 border-r-2 border-foreground font-black text-xs uppercase text-slate-600 bg-slate-50">
                  Value / ROI Score
                </td>
                {colleges.map((col, idx) => {
                  const badge = getRoiBadge(col);
                  return (
                    <td key={idx} className="p-4 border-r-2 border-foreground">
                      {badge ? (
                        <span className={`inline-block px-3 py-1 text-[11px] font-black uppercase ${badge.color}`}>
                          {badge.label}
                        </span>
                      ) : (
                        <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 text-[11px] font-bold uppercase border border-slate-300">
                          🌟 Premier B-School Choice
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Action Links */}
              <tr>
                <td className="p-4 border-r-2 border-foreground font-black text-xs uppercase text-slate-600 bg-slate-50">
                  Actions
                </td>
                {colleges.map((col, idx) => (
                  <td key={idx} className="p-4 border-r-2 border-foreground space-y-2">
                    <button
                      onClick={() => { onClose(); onInquire(col); }}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-black py-2.5 px-3 text-xs uppercase tracking-wider border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    >
                      Check Eligibility →
                    </button>
                    {col.slug && (
                      <Link
                        href={`/${col.slug}`}
                        className="block text-center text-xs font-black uppercase text-primary hover:underline"
                      >
                        Read Full Review
                      </Link>
                    )}
                    <a
                      href={col.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-[11px] font-bold text-slate-500 hover:text-foreground"
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
        <div className="bg-slate-100 p-4 border-t-4 border-foreground flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600">
            Comparing verified NIRF &amp; Audited placement data across India&apos;s leading MBA programs.
          </span>
          <button
            onClick={onClose}
            className="bg-foreground hover:bg-slate-800 text-white font-black px-6 py-2.5 text-xs uppercase tracking-wider border-2 border-foreground"
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
      question: "Which are the top MBA colleges in India for 2026-27 admission?",
      answer: "The Tier-1 MBA institutions in India include the top IIMs (IIM Ahmedabad, Bangalore, Calcutta, Lucknow, Kozhikode, and Indore), along with premier private and university institutions such as XLRI Jamshedpur, FMS Delhi, SPJIMR Mumbai, MDI Gurgaon, SIBM Pune, and NMIMS Mumbai. Admission cutoffs range from 95 to 99.5+ percentile in CAT, XAT, NMAT, or SNAP."
    },
    {
      question: "What is the expected NMAT score for NMIMS Mumbai in 2026?",
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
    <section className="mt-20 bg-white border-8 border-foreground p-6 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-accent text-foreground border-2 border-foreground px-3 py-1 font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          KNOWLEDGE BASE 2026
        </span>
        <span className="text-sm font-bold text-slate-500">Expert Answers by Mohit Jain</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-8">
        Frequently Asked <span className="text-primary underline decoration-8 underline-offset-4">Questions</span>
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`border-4 border-foreground transition-all duration-200 ${
                isOpen 
                  ? "bg-slate-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" 
                  : "bg-white hover:bg-slate-50/50"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-lg md:text-xl font-black text-foreground uppercase tracking-tight flex items-start gap-3">
                  <span className="text-primary font-mono font-bold">0{idx + 1}.</span>
                  {faq.question}
                </span>
                <span className={`w-8 h-8 shrink-0 bg-white border-2 border-foreground flex items-center justify-center transition-transform ${
                  isOpen ? "bg-primary text-white rotate-180" : "text-foreground"
                }`}>
                  <ChevronDown className="w-5 h-5 stroke-[3]" />
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-6 md:px-6 md:pb-8 pt-2 border-t-2 border-slate-200 text-slate-700 font-bold text-base leading-relaxed">
                  <p className="border-l-4 border-primary pl-4">{faq.answer}</p>
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
      <section className="bg-slate-900 text-white border-b-8 border-foreground py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-accent text-foreground border-2 border-foreground px-3.5 py-1 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
              LIVE NIRF 2026 AUDIT
            </span>
            <span className="text-sm font-bold text-slate-300 hidden sm:inline">
              Compare India&apos;s Tier 1 &amp; Premier B-Schools • Updated Cutoffs &amp; Placements
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">
                Directory Scope
              </span>
              <span className="text-lg font-black text-accent">{TOP_TIER_MBA_COLLEGES.length} Verified Colleges</span>
            </div>
            <div className="text-right border-l-2 border-slate-700 pl-6">
              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">
                IIM Coverage
              </span>
              <span className="text-lg font-black text-emerald-400">All 20 Campuses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Navigation Tabs, Search, Sort and View Toggles */}
        <div className="bg-white border-8 border-foreground p-6 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-2xl pointer-events-none" />

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
                  className={`px-4 py-2.5 font-black text-xs uppercase tracking-wider transition-all border-4 cursor-pointer flex items-center gap-2 shrink-0 ${
                    isActive
                      ? "bg-primary border-foreground text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5"
                      : "bg-white border-foreground text-foreground hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-accent" : "text-primary"}`} />
                  {tab.label}
                  <span className={`text-[10px] font-black px-2 py-0.5 border-2 ${
                    isActive ? "bg-white text-primary border-white" : "bg-slate-100 text-slate-700 border-slate-300"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Row: Search, Fee Filter, Sort By, and View Mode Toggle */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pt-6 border-t-4 border-slate-100">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground w-5 h-5 stroke-[2.5]" />
              <input
                type="text"
                placeholder="Search college, city, or exam (CAT, XAT, NMAT)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 h-13 bg-slate-50 border-4 border-foreground text-sm font-bold text-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter & Sort Controls Group */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Fee Range Filter */}
              <div className="flex items-center gap-1.5 bg-slate-100 border-2 border-foreground px-3 py-1.5">
                <DollarSign className="w-4 h-4 text-slate-600" />
                <select
                  value={feeFilter}
                  onChange={e => setFeeFilter(e.target.value as any)}
                  className="bg-transparent text-xs font-black uppercase text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="all">All Fee Ranges</option>
                  <option value="under_20">Under ₹20 Lakhs</option>
                  <option value="20_25">₹20L – ₹25 Lakhs</option>
                  <option value="above_25">Above ₹25 Lakhs</option>
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-100 border-2 border-foreground px-3 py-1.5">
                <ArrowUpDown className="w-4 h-4 text-slate-600" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-black uppercase text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="default">Sort: Editorial Ranking</option>
                  <option value="avg_desc">Sort: Highest Avg Package</option>
                  <option value="highest_desc">Sort: Highest Package</option>
                  <option value="fees_asc">Sort: Lowest Program Fee</option>
                </select>
              </div>

              {/* View Mode Toggle (Grid vs Table) */}
              <div className="flex items-center border-2 border-foreground bg-white overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-black uppercase ${
                    viewMode === "grid" 
                      ? "bg-foreground text-white" 
                      : "bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2.5 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-black uppercase border-l-2 border-foreground ${
                    viewMode === "table" 
                      ? "bg-foreground text-white" 
                      : "bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                  title="Comparison Matrix View"
                >
                  <TableIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Table Matrix</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Colleges Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header bar */}
            <div className="flex justify-between items-center border-b-4 border-foreground pb-4">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-foreground flex items-center gap-2">
                  <School className="w-6 h-6 text-primary" />
                  {viewMode === "grid" ? "B-School Profiles" : "Comparative Spreadsheet"}
                </h2>
                <p className="text-xs font-bold text-slate-500 mt-0.5">
                  Showing {filteredColleges.length} of {TOP_TIER_MBA_COLLEGES.length} institutions
                </p>
              </div>
              
              {compareList.length > 0 && (
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="bg-accent hover:bg-yellow-400 border-2 border-foreground px-4 py-2 font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 transition-all animate-bounce"
                >
                  <Scale className="w-4 h-4" />
                  Compare ({compareList.length}) →
                </button>
              )}
            </div>

            {filteredColleges.length === 0 ? (
              <div className="border-4 border-dashed border-gray-300 p-16 text-center bg-white">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-black text-foreground uppercase mb-2">
                  No matching colleges found
                </h3>
                <p className="text-slate-500 font-medium max-w-md mx-auto">
                  We couldn&apos;t find any college matching &ldquo;{searchQuery}&rdquo; in this filter category.
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveTab("all"); setFeeFilter("all"); }}
                  className="mt-6 px-6 py-3 bg-foreground text-white font-bold uppercase text-xs tracking-wider border-2 border-foreground hover:bg-slate-800 transition-all cursor-pointer"
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
                      className="group bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200 p-6 md:p-8 relative overflow-hidden"
                    >
                      {/* Top Category Badge Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b-2 border-slate-100">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`${badge.bg} ${badge.text} border ${badge.border} px-3 py-1 font-black text-[11px] uppercase tracking-wider`}>
                            {badge.label}
                          </span>
                          {roiBadge && (
                            <span className={`${roiBadge.color} border border-foreground px-3 py-1 font-black text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                              {roiBadge.label}
                            </span>
                          )}
                        </div>

                        {/* Compare Checkbox Button */}
                        <button
                          onClick={() => toggleCompare(college.name)}
                          className={`px-3 py-1 text-xs font-black uppercase tracking-wider border-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                            isCompared
                              ? "bg-foreground text-white border-foreground shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                              : "bg-slate-100 text-slate-700 border-slate-300 hover:border-foreground hover:bg-slate-200"
                          }`}
                        >
                          {isCompared ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-accent" />
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
                          <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                            {college.name}
                          </h3>
                          <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {college.location}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {college.exams.map((exam, i) => (
                            <span
                              key={i}
                              className="bg-blue-50 text-primary border-2 border-primary/20 px-3 py-1 font-black text-xs uppercase tracking-widest shadow-xs"
                            >
                              {exam}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Metrics 4-Box Matrix */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-slate-50 border-2 border-foreground p-3.5">
                          <div className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5 text-slate-500" /> Total Fees
                          </div>
                          <p className="text-sm md:text-base font-black text-slate-900 mt-1">{college.fees}</p>
                          <span className="block text-[10px] font-bold text-slate-400 mt-0.5">2-Year Program</span>
                        </div>

                        <div className="bg-emerald-50/60 border-2 border-emerald-500 p-3.5">
                          <div className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1">
                            <Percent className="w-3.5 h-3.5 text-emerald-700" /> Cut-off Required
                          </div>
                          <p className="text-sm md:text-base font-black text-emerald-800 mt-1">{college.cutoff}</p>
                          <span className="block text-[10px] font-bold text-emerald-600 mt-0.5">Expected 2026</span>
                        </div>

                        <div className="bg-blue-50/60 border-2 border-primary p-3.5">
                          <div className="text-[10px] font-black uppercase text-primary flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-primary" /> Avg Placement
                          </div>
                          <p className="text-sm md:text-base font-black text-primary mt-1">{college.avg_placement}</p>
                          <span className="block text-[10px] font-bold text-blue-600 mt-0.5">Audited Report</span>
                        </div>

                        <div className="bg-slate-900 text-white border-2 border-foreground p-3.5">
                          <div className="text-[10px] font-black uppercase text-accent flex items-center gap-1">
                            <Trophy className="w-3.5 h-3.5 text-accent" /> Highest Package
                          </div>
                          <p className="text-sm md:text-base font-black text-white mt-1">{college.highest_placement}</p>
                          <span className="block text-[10px] font-bold text-slate-400 mt-0.5">Peak Offer</span>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-slate-100">
                        <div className="flex items-center gap-4">
                          {college.slug ? (
                            <Link
                              href={`/${college.slug}`}
                              prefetch={false}
                              className="inline-flex items-center text-xs font-black uppercase tracking-wider text-primary hover:text-foreground transition-all group/btn"
                            >
                              Read Complete Review
                              <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                              <BookOpen className="w-3.5 h-3.5" /> Full profile updating
                            </span>
                          )}

                          <a
                            href={college.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs font-black uppercase tracking-wider text-slate-600 hover:text-foreground transition-colors"
                          >
                            Official Website
                            <ExternalLink className="ml-1 w-3 h-3" />
                          </a>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setInquiryCollege(college)}
                            className="bg-primary hover:bg-primary/90 text-white border-2 border-foreground px-4 py-2.5 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-accent" />
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
              <div className="bg-white border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white border-b-4 border-foreground">
                        <th className="p-4 font-black uppercase text-xs tracking-wider">Institution</th>
                        <th className="p-4 font-black uppercase text-xs tracking-wider">Exams</th>
                        <th className="p-4 font-black uppercase text-xs tracking-wider">2-Yr Fees</th>
                        <th className="p-4 font-black uppercase text-xs tracking-wider">Cutoff</th>
                        <th className="p-4 font-black uppercase text-xs tracking-wider">Avg Pkg</th>
                        <th className="p-4 font-black uppercase text-xs tracking-wider">Highest Pkg</th>
                        <th className="p-4 font-black uppercase text-xs tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-200">
                      {filteredColleges.map((col, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <div className="font-black text-foreground text-sm uppercase">{col.name}</div>
                            <div className="text-xs font-bold text-slate-500">{col.location}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {col.exams.map(ex => (
                                <span key={ex} className="bg-blue-50 text-primary border border-primary/20 px-2 py-0.5 text-[10px] font-black uppercase">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 font-black text-sm text-slate-900">{col.fees}</td>
                          <td className="p-4">
                            <span className="bg-emerald-100 text-emerald-900 px-2.5 py-1 text-xs font-black uppercase border border-emerald-300">
                              {col.cutoff}
                            </span>
                          </td>
                          <td className="p-4 font-black text-primary text-sm">{col.avg_placement}</td>
                          <td className="p-4 font-black text-slate-950 text-sm">{col.highest_placement}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setInquiryCollege(col)}
                                className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 font-black text-xs uppercase tracking-wider border border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                              >
                                Check Odds
                              </button>
                              <button
                                onClick={() => toggleCompare(col.name)}
                                className={`p-1.5 border border-foreground cursor-pointer ${
                                  compareList.includes(col.name) 
                                    ? "bg-foreground text-white" 
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
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-8">
            <div id="consult-form" className="scroll-mt-28">
              {/* Executive Strategy Card */}
              <div className="bg-slate-900 text-white border-8 border-foreground p-6 mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-accent/10 rounded-full -mr-10 -mt-10 blur-xl" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                    ADMISSION STRATEGY 2026-27
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase leading-tight mb-3">
                  Targeting IIMs, XLRI, or NMIMS?
                </h3>
                <p className="text-xs font-bold text-slate-300 leading-relaxed mb-5 border-l-4 border-accent pl-3">
                  Don&apos;t apply blindly. Let Mohit Jain formulate your profile strategy, analyze your GD/PI calls, and guide you to India&apos;s best ROI business schools.
                </p>

                <div className="space-y-2.5 mb-6 text-xs font-bold text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span>Safe vs. Ambitious Cutoff Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span>Profile Diversity (Engineering / Non-Engg)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span>Direct Admission &amp; Management Quota Help</span>
                  </div>
                </div>

                <a
                  href="https://wa.me/919811559190?text=Hi%20Mohit,%20I%20am%20exploring%20Top%20Tier%20MBA%20colleges%20for%202026-27.%20Please%20help%20me%20with%20counselling!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 px-4 text-xs uppercase tracking-wider border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-2 transition-all block text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat With Mohit On WhatsApp
                </a>
              </div>

              {/* Lead Gen Form */}
              <div className="bg-white border-8 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-yellow-400 text-foreground text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 border border-foreground">
                    FREE CONSULTATION
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase text-foreground mb-4">
                  Request B-School Callback
                </h3>
                <InquiryForm />
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
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 text-white border-t-4 border-accent py-4 px-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-accent text-foreground font-black text-xs px-2.5 py-1 uppercase tracking-wider">
                COMPARING ({compareList.length}/4)
              </span>
              <div className="flex flex-wrap gap-2">
                {compareList.map(name => (
                  <span key={name} className="bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs px-3 py-1 flex items-center gap-2">
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
                className="text-xs font-bold text-slate-400 hover:text-white uppercase px-3 py-1.5 cursor-pointer"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowCompareModal(true)}
                className="bg-accent hover:bg-yellow-400 text-foreground font-black px-6 py-3 text-xs uppercase tracking-wider border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] flex items-center gap-2 cursor-pointer transition-all"
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
