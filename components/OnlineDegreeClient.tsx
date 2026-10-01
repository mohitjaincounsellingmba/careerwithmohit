'use client';

import { useState, useMemo } from 'react';
import {
  MapPin, BadgeCheck, IndianRupee, GraduationCap, Search,
  X, SlidersHorizontal, Phone, ChevronDown, BookOpen,
  Building2, Star, Award, ArrowRight, ShieldCheck, Sparkles
} from 'lucide-react';

import { COLLEGES } from '@/data/onlineColleges';
import { submitLead } from '@/lib/leads';
export { COLLEGES };

const GRADES = ['All', 'A++', 'A+', 'A', 'B+'];
const FEE_RANGES = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹1L', min: 0, max: 100000 },
  { label: '₹1L – ₹1.5L', min: 100000, max: 150000 },
  { label: '₹1.5L – ₹2L', min: 150000, max: 200000 },
  { label: 'Above ₹2L', min: 200000, max: Infinity },
];
const COURSES = ['MBA', 'MA', 'PGDM', 'MCA', 'BBA', 'BCA', 'BA', 'B.Com', 'M.Com', 'B.Sc', 'M.Sc', 'B.Tech', 'Diploma'];

/* ── Inquiry Modal ── */
function InquiryModal({ college, onClose }: { college: typeof COLLEGES[0]; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', number: '', email: '', location: '', program: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await submitLead({
      ...form,
      college: college.name,
      source: 'Online Degree Page Modal',
      timestamp: new Date().toISOString(),
    });
    setStatus('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[#061124]/60 backdrop-blur-md" />
      <div
        className="relative bg-white rounded-[32px] sm:rounded-[40px] border-[1.5px] border-[#061124]/10 shadow-[0_34px_70px_-30px_rgba(6,17,36,0.3)] w-full max-w-lg p-7 sm:p-10 z-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#061124] p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BadgeCheck size={32} className="text-[#10B981]" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest font-extrabold text-[#10B981] mb-2 block">
              Inquiry Sent
            </span>
            <h3 className="font-display text-2xl font-extrabold text-[#061124] mb-2">
              Profile Shortlist in Progress
            </h3>
            <p className="text-[#475569] text-sm leading-relaxed mb-6">
              Our chief admissions counsellor will contact you within 24 hours regarding admission, fee waivers, and eligibility for <strong>{college.name}</strong>.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-display font-extrabold py-3.5 rounded-full transition-all shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] font-extrabold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 inline-block mb-2">
                Official University Inquiry
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#061124] tracking-tight">
                Inquire for {college.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] mt-1 font-normal">
                Get free 1-on-1 brochure downloads, scholarship eligibility, and syllabus breakdown.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#061124]">University</label>
                <input
                  type="text"
                  value={college.name}
                  readOnly
                  className="w-full border border-[#061124]/10 bg-slate-100 rounded-2xl px-4 py-3 text-xs font-bold text-slate-700 cursor-not-allowed"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#061124]">Your Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#061124]/15 bg-[#F8FAFC] rounded-2xl px-4 py-3 text-sm font-semibold text-[#061124] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#061124]">WhatsApp Number *</label>
                <input
                  required
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={form.number}
                  onChange={e => setForm({ ...form, number: e.target.value })}
                  className="w-full border border-[#061124]/15 bg-[#F8FAFC] rounded-2xl px-4 py-3 text-sm font-semibold text-[#061124] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#061124]">Email Address *</label>
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[#061124]/15 bg-[#F8FAFC] rounded-2xl px-4 py-3 text-sm font-semibold text-[#061124] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#061124]">City / State *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Delhi NCR, Bangalore, Pune"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="w-full border border-[#061124]/15 bg-[#F8FAFC] rounded-2xl px-4 py-3 text-sm font-semibold text-[#061124] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#061124]">Target Program *</label>
                <select
                  required
                  value={form.program}
                  onChange={e => setForm({ ...form, program: e.target.value })}
                  className="w-full border border-[#061124]/15 bg-[#F8FAFC] rounded-2xl px-4 py-3 text-sm font-semibold text-[#061124] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Program</option>
                  {college.programs.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                  <option value="Other / Not Sure">Other / Not Sure</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-display font-extrabold text-sm transition-all shadow-[0_12px_26px_-12px_rgba(37,99,235,0.85)] hover:-translate-y-0.5 mt-4 cursor-pointer flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit Free Inquiry →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── College Detail Modal ── */
function CollegeDetailModal({ college, onClose, onInquire }: {
  college: typeof COLLEGES[0];
  onClose: () => void;
  onInquire: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[#061124]/60 backdrop-blur-md" />
      <div
        className="relative bg-white rounded-[32px] sm:rounded-[40px] border-[1.5px] border-[#061124]/10 shadow-[0_34px_70px_-30px_rgba(6,17,36,0.3)] w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-br ${college.gradeColor} p-8 rounded-t-[30px] sm:rounded-t-[38px] relative text-white`}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 bg-white/20 hover:bg-white/30 transition-colors rounded-full p-2"
          >
            <X size={18} className="text-white" />
          </button>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="bg-white/20 backdrop-blur-md text-white font-mono text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
              NAAC {college.grade}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white font-mono text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
              {college.badge}
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white leading-snug">
            {college.name}
          </h2>
          <div className="flex items-center gap-1.5 mt-2 text-white/90 font-mono text-xs">
            <MapPin size={13} />
            <span>{college.location}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-7 sm:p-9 space-y-6">

          {/* About */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#2563EB] flex items-center gap-2 mb-2">
              <Building2 size={14} /> About University
            </h3>
            <p className="text-[#475569] text-sm leading-relaxed font-normal">{college.about}</p>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#F8FAFC] border border-[#061124]/10 rounded-2xl p-4 text-center">
              <p className="font-mono text-[10px] text-[#475569] uppercase font-bold tracking-wider mb-1">Total Fee</p>
              <p className="font-display text-lg font-extrabold text-[#10B981]">{college.fee}</p>
            </div>
            <div className="bg-[#F8FAFC] border border-[#061124]/10 rounded-2xl p-4 text-center">
              <p className="font-mono text-[10px] text-[#475569] uppercase font-bold tracking-wider mb-1">Duration</p>
              <p className="font-display text-base font-bold text-[#061124]">{college.duration}</p>
            </div>
            <div className="bg-[#F8FAFC] border border-[#061124]/10 rounded-2xl p-4 text-center">
              <p className="font-mono text-[10px] text-[#475569] uppercase font-bold tracking-wider mb-1">Mode</p>
              <p className="font-display text-base font-bold text-[#061124]">{college.mode}</p>
            </div>
            <div className="bg-[#F8FAFC] border border-[#061124]/10 rounded-2xl p-4 text-center">
              <p className="font-mono text-[10px] text-[#475569] uppercase font-bold tracking-wider mb-1">Approvals</p>
              <p className="font-mono text-xs font-extrabold text-[#2563EB] truncate">{college.approvals}</p>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#2563EB] flex items-center gap-2 mb-3">
              <GraduationCap size={14} /> Programs Offered &amp; Specializations
            </h3>
            <div className="space-y-3">
              {college.programs.map((p) => (
                <div key={p} className="bg-[#F8FAFC] border border-[#061124]/10 rounded-2xl p-4">
                  <span className="bg-[#2563EB] text-white font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-2">
                    {p}
                  </span>
                  {college.specializations && college.specializations[p] && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {college.specializations[p].map((spec) => (
                        <span key={spec} className="bg-white text-[#061124] border border-[#061124]/12 text-[11px] font-semibold px-2.5 py-0.5 rounded-lg shadow-2xs">
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#2563EB] flex items-center gap-2 mb-3">
              <Star size={14} /> Key Highlights
            </h3>
            <ul className="space-y-2">
              {college.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569] font-normal">
                  <BadgeCheck size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#061124]/10">
            <button
              onClick={onInquire}
              className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-display font-extrabold py-3.5 rounded-full transition-all shadow-md text-sm text-center cursor-pointer"
            >
              Inquire Now
            </button>
            {college.slug && (
              <a
                href={`/blog/${college.slug}`}
                className="flex-1 bg-white hover:bg-slate-50 text-[#061124] border border-[#061124]/15 font-display font-bold py-3.5 rounded-full transition-colors text-sm text-center flex items-center justify-center gap-1.5"
              >
                <BookOpen size={14} />
                <span>Read Review</span>
              </a>
            )}
            <a
              href={`https://wa.me/${college.whatsapp}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(college.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white font-display font-extrabold py-3.5 rounded-full transition-colors text-sm text-center flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Phone size={14} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Client Component ── */
export default function OnlineDegreeClient({ initialCourse = 'All' }: { initialCourse?: string } = {}) {
  const [search, setSearch] = useState('');
  const [grade, setGrade] = useState('All');
  const [feeRange, setFeeRange] = useState(0);
  const [course, setCourse] = useState(initialCourse);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<typeof COLLEGES[0] | null>(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryCollege, setInquiryCollege] = useState<typeof COLLEGES[0] | null>(null);

  const selectedFeeRange = FEE_RANGES[feeRange];

  const filtered = useMemo(() => {
    return COLLEGES.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
        || c.location.toLowerCase().includes(search.toLowerCase())
        || c.programs.some((p) => p.toLowerCase().includes(search.toLowerCase()));
      const matchGrade = grade === 'All' || c.grade === grade;
      const matchFee = c.feeNum >= selectedFeeRange.min && c.feeNum <= selectedFeeRange.max;
      const matchCourse = course === 'All' || c.programs.includes(course);
      return matchSearch && matchGrade && matchFee && matchCourse;
    });
  }, [search, grade, selectedFeeRange, course]);

  const openInquiry = (college: typeof COLLEGES[0]) => {
    setInquiryCollege(college);
    setShowInquiry(true);
    setSelectedCollege(null);
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F8FAFC]">
      {/* Sticky Search + Filter Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-y border-[#061124]/10 shadow-[0_4px_20px_rgba(6,17,36,0.04)]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search 40+ universities, city hubs, or degrees (MBA, MCA, BBA)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#061124]/15 rounded-full pl-10 pr-10 py-2.5 text-sm font-semibold text-[#061124] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border font-display font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
                showFilters
                  ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md'
                  : 'bg-white border-[#061124]/15 text-[#061124] hover:border-[#2563EB] hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
              {(grade !== 'All' || feeRange !== 0 || course !== 'All') && (
                <span className="bg-white text-[#2563EB] text-xs font-black rounded-full w-4 h-4 flex items-center justify-center ml-1">
                  {(grade !== 'All' ? 1 : 0) + (feeRange !== 0 ? 1 : 0) + (course !== 'All' ? 1 : 0)}
                </span>
              )}
              <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Inquiry CTA */}
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20want%20free%20counselling%20for%20online%20degree"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-display font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shrink-0 shadow-sm hover:-translate-y-0.5"
            >
              <Phone size={14} />
              <span>Free Inquiry</span>
            </a>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 bg-white border-[1.5px] border-[#061124]/10 rounded-[28px] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)]">
              {/* NAAC Grade */}
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#061124] mb-3 flex items-center gap-1.5">
                  <Award size={14} className="text-[#2563EB]" /> NAAC Accreditation
                </p>
                <div className="flex flex-wrap gap-2">
                  {GRADES.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-extrabold border transition-all cursor-pointer ${
                        grade === g
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-[#F8FAFC] text-[#061124] border-[#061124]/12 hover:border-[#2563EB] hover:bg-white'
                      }`}
                    >
                      {g === 'All' ? 'All Grades' : `NAAC ${g}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee Range */}
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#061124] mb-3 flex items-center gap-1.5">
                  <IndianRupee size={14} className="text-[#10B981]" /> Max Fee Range: <span className="text-[#2563EB] font-black">{selectedFeeRange.label}</span>
                </p>
                <input
                  type="range"
                  min={0}
                  max={FEE_RANGES.length - 1}
                  value={feeRange}
                  onChange={(e) => setFeeRange(Number(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
                <div className="flex justify-between text-xs font-mono text-[#475569] mt-1.5 font-medium">
                  {FEE_RANGES.map((f) => (
                    <span key={f.label}>{f.label.split(' ')[0]}</span>
                  ))}
                </div>
              </div>

              {/* Course / Program */}
              <div className="sm:col-span-2">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#061124] mb-3 flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-[#2563EB]" /> Course / Degree Track
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCourse('All')}
                    className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-extrabold border transition-all cursor-pointer ${
                      course === 'All'
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                        : 'bg-[#F8FAFC] text-[#061124] border-[#061124]/12 hover:border-[#2563EB] hover:bg-white'
                    }`}
                  >
                    All Degrees
                  </button>
                  {COURSES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCourse(c)}
                      className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-extrabold border transition-all cursor-pointer ${
                        course === c
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-[#F8FAFC] text-[#061124] border-[#061124]/12 hover:border-[#2563EB] hover:bg-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex items-center justify-between">
        <p className="font-mono text-xs sm:text-sm text-[#475569] font-semibold">
          Showing <span className="font-black text-[#2563EB]">{filtered.length}</span> of {COLLEGES.length} verified universities
        </p>
        {(search || grade !== 'All' || feeRange !== 0 || course !== 'All') && (
          <button
            onClick={() => { setSearch(''); setGrade('All'); setFeeRange(0); setCourse('All'); }}
            className="font-mono text-xs text-[#EA580C] font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X size={12} /> Clear all filters
          </button>
        )}
      </div>

      {/* College Card Grid */}
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[28px] border-[1.5px] border-[#061124]/10 p-8 my-6">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="font-display text-xl font-extrabold text-[#061124] mb-2">No universities match your filters</h3>
            <p className="text-[#475569] text-sm max-w-md mx-auto">Try resetting filters or expanding your budget range.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filtered.map((college, idx) => (
              <article
                key={idx}
                onClick={() => setSelectedCollege(college)}
                className="group rounded-[28px] bg-white border-[1.5px] border-[#061124]/10 p-6 sm:p-7 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:shadow-[0_34px_70px_-30px_rgba(6,17,36,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden text-left"
              >
                {/* Colored Top Border Sweep */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left bg-[#2563EB]"
                />

                <div>
                  {/* Top Row: Grade Badge + Tag */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`bg-gradient-to-br ${college.gradeColor} rounded-2xl w-12 h-12 flex items-center justify-center shrink-0 shadow-sm`}>
                      <span className="text-white font-display font-black text-xs tracking-wider">{college.grade}</span>
                    </div>
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#475569] bg-[#F1F5F9] px-3 py-1 rounded-full border border-[#061124]/8">
                      {college.badge}
                    </span>
                  </div>

                  {/* University Name */}
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-[#061124] group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug min-h-[48px]">
                    {college.name}
                  </h3>

                  {/* Location */}
                  <div className="font-mono text-[11px] text-[#475569] flex items-center gap-1.5 mt-1.5 mb-4 font-medium">
                    <MapPin size={13} className="text-[#2563EB] shrink-0" />
                    <span>{college.location}</span>
                  </div>

                  {/* 3 Metric Columns with Dashed Border */}
                  <div className="grid grid-cols-3 gap-2 my-4 py-3 border-y border-dashed border-[#061124]/12 text-center">
                    <div>
                      <b className="block font-display font-black text-sm text-[#10B981] leading-none truncate">
                        {college.fee.replace('₹', '₹ ')}
                      </b>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#475569] mt-1 block">
                        Total Fee
                      </span>
                    </div>

                    <div className="border-x border-dashed border-[#061124]/12 px-1">
                      <b className="block font-display font-black text-xs text-[#2563EB] leading-none truncate">
                        {college.duration}
                      </b>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#475569] mt-1 block">
                        Duration
                      </span>
                    </div>

                    <div>
                      <b className="block font-display font-black text-xs text-[#EA580C] leading-none truncate">
                        {college.mode}
                      </b>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#475569] mt-1 block">
                        Learning
                      </span>
                    </div>
                  </div>

                  {/* Accreditations & Programs */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <BadgeCheck size={14} className="text-[#10B981] shrink-0 mt-0.5" />
                      <p className="font-mono text-[11px] text-[#475569] leading-tight font-medium">
                        {college.accreditation}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <GraduationCap size={14} className="text-[#2563EB] shrink-0 mt-0.5" />
                      <p className="font-mono text-[11px] text-[#475569] leading-tight font-medium truncate">
                        {college.programs.join(' · ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-[#061124]/8 flex items-center justify-between gap-2 mt-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openInquiry(college);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-display font-extrabold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight size={12} />
                  </button>

                  {college.slug ? (
                    <a
                      href={`/blog/${college.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-xs font-bold text-[#475569] hover:text-[#2563EB] hover:underline flex items-center gap-1"
                    >
                      <BookOpen size={12} className="text-slate-400" />
                      <span>Review</span>
                    </a>
                  ) : (
                    <span className="font-mono text-[11px] font-bold text-[#2563EB] flex items-center gap-0.5 group-hover:underline">
                      Details →
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* College Detail Modal */}
      {selectedCollege && (
        <CollegeDetailModal
          college={selectedCollege}
          onClose={() => setSelectedCollege(null)}
          onInquire={() => openInquiry(selectedCollege)}
        />
      )}

      {/* Inquiry Modal */}
      {showInquiry && inquiryCollege && (
        <InquiryModal
          college={inquiryCollege}
          onClose={() => { setShowInquiry(false); setInquiryCollege(null); }}
        />
      )}
    </section>
  );
}

