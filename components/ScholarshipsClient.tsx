"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  Award, 
  GraduationCap, 
  BookOpen, 
  HandCoins, 
  Landmark, 
  Globe2, 
  Sparkles, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  X, 
  BadgeCheck, 
  LayoutGrid, 
  Table as TableIcon, 
  Filter, 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck,
  Building2,
  Percent,
  DollarSign
} from "lucide-react";
import { submitLead } from "@/lib/leads";
import { ScholarshipItem, ALL_SCHOLARSHIPS } from "@/data/scholarships";

/* ── Modal: Instant Eligibility & Guidance Assessment ── */
function ScholarshipModal({
  scholarship,
  onClose,
}: {
  scholarship: ScholarshipItem | null;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    currentEducation: "College Graduate / Working",
    percentage: "",
    familyIncome: "Under 5 LPA",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await submitLead({
      name: form.name,
      number: form.number,
      email: form.email,
      course: "Scholarship Guidance 2027",
      source: `Scholarships Page Modal (${scholarship?.name || "General Inquiry"})`,
      details: {
        scholarshipTarget: scholarship?.name || "General Scholarship Guidance",
        currentEducation: form.currentEducation,
        academicPercentage: form.percentage,
        annualFamilyIncome: form.familyIncome,
      },
    });
    setStatus("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
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
              Application Profile Received
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Checklist Logged!</h3>
            <p className="text-slate-600 text-sm font-medium mb-6">
              Mohit Jain&apos;s scholarship team is reviewing your profile for <span className="text-primary font-bold">{scholarship?.name || "Target Scholarships"}</span>. We will share your grant eligibility, income certificate criteria &amp; fee waiver roadmaps shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/919811559190?text=${encodeURIComponent(`Hi Mohit, I submitted a scholarship eligibility review for ${scholarship?.name || "Scholarships 2027"}. Please guide me!`)}`}
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
              <span className="bg-amber-500/10 text-amber-900 border border-amber-300/80 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                Financial Aid Evaluator
              </span>
              <span className="text-xs font-semibold text-slate-500">2027-28 Intake</span>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-1">
              {scholarship ? `Check Odds For ${scholarship.provider}` : "Free Scholarship Eligibility Check"}
            </h3>
            <p className="text-xs font-medium text-slate-500 mb-6">
              Find institutional fee waivers, corporate grants, and government schemes matching your profile and academic record.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {scholarship && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target Scheme
                  </label>
                  <input
                    type="text"
                    value={scholarship.name}
                    readOnly
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 cursor-not-allowed"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ananya Gupta"
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
                    Current Education
                  </label>
                  <select
                    value={form.currentEducation}
                    onChange={e => setForm({ ...form, currentEducation: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  >
                    <option value="Class 12th Student">Class 12th Student</option>
                    <option value="Undergraduate College">Undergraduate College</option>
                    <option value="College Graduate">College Graduate</option>
                    <option value="Targeting MBA / PGDM">Targeting MBA / PGDM</option>
                    <option value="Targeting Study Abroad">Targeting Study Abroad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Past Academic %
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 88% in 12th / 8.4 CGPA"
                    value={form.percentage}
                    onChange={e => setForm({ ...form, percentage: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Annual Family Income
                </label>
                <select
                  value={form.familyIncome}
                  onChange={e => setForm({ ...form, familyIncome: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                >
                  <option value="Under 2.5 Lakhs (EWS eligible)">Under ₹2.5 Lakhs (EWS eligible)</option>
                  <option value="2.5 to 5 Lakhs">₹2.5 to ₹5 Lakhs</option>
                  <option value="5 to 8 Lakhs">₹5 to ₹8 Lakhs</option>
                  <option value="8 to 15 Lakhs">₹8 to ₹15 Lakhs</option>
                  <option value="Above 15 Lakhs (Merit grants only)">Above ₹15 Lakhs (Merit grants only)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 px-6 text-sm uppercase tracking-wider rounded-xl shadow-md shadow-amber-500/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {status === "submitting" ? (
                  "Evaluating Profile..."
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    Get Matched Scholarships
                  </>
                )}
              </button>

              <p className="text-[11px] font-medium text-slate-400 text-center">
                🔒 100% Free &amp; Confidential • Direct review by Mohit Jain
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Interactive Category Card Component ── */
export function CategoryCards({
  onSelectCategory,
  activeCategory,
}: {
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
}) {
  const categories = [
    {
      id: "UG",
      title: "Class 12th & Undergraduates",
      desc: "Merit & need-based funding for B.Tech, BBA, BCA, MBBS & Commerce aspirants.",
      icon: GraduationCap,
      count: ALL_SCHOLARSHIPS.filter(s => s.category === "UG").length,
      gradient: "from-blue-500/10 to-indigo-500/10",
      accent: "text-blue-600",
      border: "border-blue-200/80",
      tags: ["B.Tech", "BBA / BCA", "MBBS"],
    },
    {
      id: "PG/MBA",
      title: "MBA & Postgraduate Grants",
      desc: "Institutional fee waivers, bank grants & corporate funding for IIMs and premier B-schools.",
      icon: BookOpen,
      count: ALL_SCHOLARSHIPS.filter(s => s.category === "PG/MBA").length,
      gradient: "from-emerald-500/10 to-teal-500/10",
      accent: "text-emerald-600",
      border: "border-emerald-200/80",
      tags: ["MBA / PGDM", "Top IIMs", "M.Tech"],
    },
    {
      id: "Women",
      title: "Women In Higher Education",
      desc: "Special grants dedicated to empowering girl students in STEM, Management and Law.",
      icon: Award,
      count: ALL_SCHOLARSHIPS.filter(s => s.category === "Women").length,
      gradient: "from-pink-500/10 to-rose-500/10",
      accent: "text-pink-600",
      border: "border-pink-200/80",
      tags: ["Single Girl Child", "Women in STEM", "Leadership"],
    },
    {
      id: "Merit-Means",
      title: "Merit-cum-Means & EWS",
      desc: "High score and family income-based financial aid by foundations and corporate CSR.",
      icon: HandCoins,
      count: ALL_SCHOLARSHIPS.filter(s => s.category === "Merit-Means").length,
      gradient: "from-amber-500/10 to-yellow-500/10",
      accent: "text-amber-600",
      border: "border-amber-200/80",
      tags: ["Income < 5L", "Merit Rankers", "EWS Assistance"],
    },
    {
      id: "Govt",
      title: "Government Schemes (NSP)",
      desc: "Central and State government funded National Scholarship Portal (NSP) programs.",
      icon: Landmark,
      count: ALL_SCHOLARSHIPS.filter(s => s.category === "Govt").length,
      gradient: "from-indigo-500/10 to-purple-500/10",
      accent: "text-indigo-600",
      border: "border-indigo-200/80",
      tags: ["Central Govt", "State Schemes", "Direct Transfer"],
    },
    {
      id: "Study Abroad",
      title: "Global & Study Abroad Fellowships",
      desc: "Prestigious fully funded master's and undergraduate scholarships in US, UK, and Europe.",
      icon: Globe2,
      count: ALL_SCHOLARSHIPS.filter(s => s.category === "Study Abroad").length,
      gradient: "from-cyan-500/10 to-sky-500/10",
      accent: "text-cyan-600",
      border: "border-cyan-200/80",
      tags: ["Chevening UK", "Fulbright US", "Erasmus EU"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map(cat => {
        const Icon = cat.icon;
        const isSelected = activeCategory === cat.id;
        return (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`group rounded-3xl p-7 border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              isSelected
                ? "bg-white border-amber-400 shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/20 -translate-y-1"
                : "bg-white border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} ${cat.border} border flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${cat.accent}`} />
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {cat.count} Schemes
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                {cat.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {cat.tags.map((tag, j) => (
                  <span key={j} className="bg-slate-100/80 text-slate-600 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
              <span className={`text-xs font-bold ${isSelected ? "text-amber-600" : "text-slate-400 group-hover:text-slate-700"} transition-colors flex items-center gap-1`}>
                Filter <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── FAQ Accordion Component ── */
export function ScholarshipsFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "Can I apply for more than one scholarship at the same time?",
      answer: "Yes, you can apply for multiple corporate, university, and merit scholarships simultaneously. However, most government guidelines (such as NSP) stipulate that you can only avail of one central/state government financial aid benefit at a time. If awarded multiple, you can accept the higher value grant."
    },
    {
      question: "Are there scholarships available specifically for MBA and PGDM programs?",
      answer: "Absolutely! Flagship programs like the SBI Asha Scholarship (up to ₹5 Lakhs), Aditya Birla Group Scholarship (up to ₹3 Lakhs), and OP Jindal OPJEMS provide direct grants to students at top B-Schools (IIMs, XLRI, MDI, SPJIMR). Furthermore, almost all top private and university MBA institutions offer 25% to 100% tuition waivers based on CAT/XAT percentiles or academic diversity."
    },
    {
      question: "What documents are compulsory for merit-cum-means scholarships in India?",
      answer: "The essential documents include: (1) Valid Income Certificate issued by a Competent Authority (Tehsildar / SDO), (2) 10th & 12th Marksheets / Degree transcripts, (3) Bonafide Student Certificate from your college, (4) Aadhaar Card, and (5) Bank Passbook copy linked with Aadhaar."
    },
    {
      question: "What is the typical family income limit to qualify for EWS scholarships?",
      answer: "Most government and CSR schemes consider an annual gross family income of up to ₹2.5 Lakhs as priority EWS. Some prominent corporate scholarships (like Reliance Foundation and HDFC Parivartan) accept income certificates up to ₹6 Lakhs to ₹15 Lakhs per annum depending on the category."
    },
    {
      question: "Do study abroad scholarships cover living expenses in addition to tuition?",
      answer: "Prestigious global awards like the UK Chevening Scholarship, US Fulbright-Nehru Fellowship, and European Erasmus Mundus Joint Masters cover 100% of university tuition fees plus a monthly living stipend (€1,200 - £1,500), return airfare, and visa health insurance."
    },
    {
      question: "How can Mohit Jain help me secure scholarships and institutional fee waivers?",
      answer: "Mohit Jain and his team assess your academic scores, entrance exam percentiles (CAT, XAT, MAT, SNAP, NMAT), and financial profile to identify which colleges offer institutional merit waivers, guide you through documentation, and connect you with verified low-interest education loan partners."
    }
  ];

  return (
    <section className="bg-slate-50/70 rounded-3xl border border-slate-200/80 p-6 md:p-12 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <span className="bg-amber-500/10 text-amber-900 border border-amber-300/80 px-3.5 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
          Knowledge Base 2027-28
        </span>
        <span className="text-xs font-semibold text-slate-500">Expert Guidance by Mohit Jain</span>
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

/* ── Main Interactive Client Component ── */
export function ScholarshipsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [awardFilter, setAwardFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedScholarship, setSelectedScholarship] = useState<ScholarshipItem | null>(null);
  const [showGeneralModal, setShowGeneralModal] = useState(false);

  /* Filter Logic */
  const filteredScholarships = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ALL_SCHOLARSHIPS.filter(s => {
      // Text search
      const matchesQuery = 
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.eligibility.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q));

      // Category match
      const matchesCategory = activeCategory === "all" || s.category === activeCategory;

      // Award type match
      const matchesAward = awardFilter === "all" || s.awardType === awardFilter;

      return matchesQuery && matchesCategory && matchesAward;
    });
  }, [searchQuery, activeCategory, awardFilter]);

  return (
    <div className="w-full">
      {/* ── BROWSE BY CATEGORY SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 mt-16 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-900 border border-amber-300/80 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              Categorized Funding Pools
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Browse Grants By Category
            </h2>
          </div>
          {activeCategory !== "all" && (
            <button
              onClick={() => setActiveCategory("all")}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 underline underline-offset-4 cursor-pointer"
            >
              Reset Category Filter (Show All)
            </button>
          )}
        </div>

        <CategoryCards
          activeCategory={activeCategory}
          onSelectCategory={cat => setActiveCategory(cat === activeCategory ? "all" : cat)}
        />
      </section>

      {/* ── INTERACTIVE SCHOLARSHIPS DIRECTORY & CONTROLS ── */}
      <section id="directory" className="max-w-7xl mx-auto px-6 scroll-mt-24 mb-24">
        {/* Toolbar Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -mr-20 -mt-20 blur-2xl pointer-events-none" />

          {/* Top Row: Category Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-6 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: "all", label: "All Schemes", count: ALL_SCHOLARSHIPS.length },
              { id: "UG", label: "Class 12th / UG", count: ALL_SCHOLARSHIPS.filter(s => s.category === "UG").length },
              { id: "PG/MBA", label: "MBA / PGDM", count: ALL_SCHOLARSHIPS.filter(s => s.category === "PG/MBA").length },
              { id: "Women", label: "Women Empowerment", count: ALL_SCHOLARSHIPS.filter(s => s.category === "Women").length },
              { id: "Merit-Means", label: "Merit-cum-Means", count: ALL_SCHOLARSHIPS.filter(s => s.category === "Merit-Means").length },
              { id: "Govt", label: "Govt (NSP)", count: ALL_SCHOLARSHIPS.filter(s => s.category === "Govt").length },
              { id: "Study Abroad", label: "Study Abroad", count: ALL_SCHOLARSHIPS.filter(s => s.category === "Study Abroad").length },
            ].map(tab => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2.5 font-bold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                    isActive
                      ? "bg-[#0A192F] text-white shadow-md shadow-slate-950/20"
                      : "bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 border border-slate-200/60"
                  }`}
                >
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

          {/* Bottom Row: Search, Award Filter, and View Mode Toggle */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pt-6 border-t border-slate-100">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search scholarship name, provider, exam, or keyword..."
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

            {/* Filter & View Mode Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Award Type Filter */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <DollarSign className="w-4 h-4 text-slate-500" />
                <select
                  value={awardFilter}
                  onChange={e => setAwardFilter(e.target.value)}
                  className="bg-transparent text-xs font-bold uppercase text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Award Types</option>
                  <option value="full">100% / Fully Funded</option>
                  <option value="high">High Value (₹1L+)</option>
                  <option value="moderate">Moderate Grants (&lt;₹1L)</option>
                </select>
              </div>

              {/* View Mode Toggle */}
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
                  title="Comparison Table View"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Table</span>
                </button>
              </div>

              {/* Instant Eligibility Trigger */}
              <button
                onClick={() => setShowGeneralModal(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl px-4 py-2 text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                Check Eligibility
              </button>
            </div>
          </div>
        </div>

        {/* Directory Results Heading */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Verified Schemes ({filteredScholarships.length})
            </h3>
            <p className="text-xs font-medium text-slate-500">
              Updated for the 2027-28 admission cycle with validated application guidelines.
            </p>
          </div>
        </div>

        {filteredScholarships.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 p-16 text-center bg-white">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-extrabold text-slate-900 uppercase mb-2">
              No matching scholarships found
            </h3>
            <p className="text-slate-500 text-sm font-medium max-w-md mx-auto">
              We couldn&apos;t find any scholarship matching &ldquo;{searchQuery}&rdquo; in this filter category.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); setAwardFilter("all"); }}
              className="mt-6 px-6 py-2.5 bg-slate-900 text-white font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* ── CARD GRID VIEW ── */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredScholarships.map(schol => (
              <div
                key={schol.id}
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  {/* Top Badge Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="bg-amber-500/10 text-amber-900 border border-amber-300/80 px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider">
                      {schol.category}
                    </span>
                    {schol.highlight && (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider">
                        ★ {schol.highlight}
                      </span>
                    )}
                  </div>

                  {/* Title & Provider */}
                  <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors mb-1 leading-snug">
                    {schol.name}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 mb-5">
                    Offered by <span className="text-slate-700 font-bold">{schol.provider}</span>
                  </p>

                  {/* Key Highlights 2-Box Metric */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-4">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                        Grant / Award Amount
                      </span>
                      <p className="text-base font-extrabold text-emerald-700 leading-tight">
                        {schol.award}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-4">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                        Application Window
                      </span>
                      <p className="text-xs font-bold text-rose-600 flex items-center gap-1 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {schol.deadline}
                      </p>
                    </div>
                  </div>

                  {/* Eligibility snippet */}
                  <div className="bg-slate-50/50 rounded-xl p-3 mb-6 border border-slate-200/50">
                    <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                      Eligibility Criteria:
                    </span>
                    <p className="text-xs font-medium text-slate-700 leading-relaxed">
                      {schol.eligibility}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedScholarship(schol)}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    Check Profile Odds →
                  </button>

                  <a
                    href={schol.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#0A192F] hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Apply on Portal <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── SPREADSHEET TABLE VIEW ── */
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#0A192F] text-white">
                    <th className="p-4 font-bold uppercase text-xs tracking-wider">Scholarship Scheme</th>
                    <th className="p-4 font-bold uppercase text-xs tracking-wider">Category</th>
                    <th className="p-4 font-bold uppercase text-xs tracking-wider">Award Value</th>
                    <th className="p-4 font-bold uppercase text-xs tracking-wider">Eligibility</th>
                    <th className="p-4 font-bold uppercase text-xs tracking-wider">Expected Deadline</th>
                    <th className="p-4 font-bold uppercase text-xs tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredScholarships.map(schol => (
                    <tr key={schol.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 max-w-[280px]">
                        <div className="font-extrabold text-slate-900 text-sm">{schol.name}</div>
                        <div className="text-xs font-medium text-slate-500">{schol.provider}</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-amber-500/10 text-amber-900 border border-amber-300/80 px-2.5 py-1 rounded-full text-xs font-bold uppercase">
                          {schol.category}
                        </span>
                      </td>
                      <td className="p-4 font-extrabold text-emerald-700 text-sm">
                        {schol.award}
                      </td>
                      <td className="p-4 text-xs font-medium text-slate-700 max-w-[260px]">
                        {schol.eligibility}
                      </td>
                      <td className="p-4 text-xs font-bold text-rose-600">
                        {schol.deadline}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedScholarship(schol)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold uppercase cursor-pointer transition-colors"
                          >
                            Odds
                          </button>
                          <a
                            href={schol.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#0A192F] hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase cursor-pointer transition-colors inline-flex items-center gap-1"
                          >
                            Apply ↗
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* ── FAQ ACCORDION SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <ScholarshipsFaq />
      </section>

      {/* ── MODALS ── */}
      {(selectedScholarship || showGeneralModal) && (
        <ScholarshipModal
          scholarship={selectedScholarship}
          onClose={() => {
            setSelectedScholarship(null);
            setShowGeneralModal(false);
          }}
        />
      )}
    </div>
  );
}
