'use client';

import { useState, useMemo } from 'react';
import {
  MapPin,
  BadgeCheck,
  IndianRupee,
  GraduationCap,
  Search,
  X,
  SlidersHorizontal,
  Phone,
  ChevronDown,
  BookOpen,
  Building2,
  Star,
  Award,
  Globe,
  Plane,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  MessageCircle,
  Clock
} from 'lucide-react';
import { ABROAD_COLLEGES } from '@/data/abroadColleges';
import Link from 'next/link';
import { submitLead } from '@/lib/leads';
import { generateCollegeSlug } from '@/lib/slugify';

const COUNTRIES = [
  'All',
  'USA',
  'Canada',
  'UK',
  'Ireland',
  'Germany',
  'Australia',
  'New Zealand',
  'Sweden',
  'Netherlands',
  'France',
  'Finland',
  'Denmark',
  'Malta',
  'Hungary',
  'Spain',
  'Poland',
  'Malaysia'
];

const FEE_RANGES = [
  { label: 'All Budgets', min: 0, max: Infinity },
  { label: 'Under ₹15 Lakhs', min: 0, max: 1500000 },
  { label: '₹15L – ₹25 Lakhs', min: 1500000, max: 2500000 },
  { label: '₹25L – ₹35 Lakhs', min: 2500000, max: 3500000 },
  { label: 'Above ₹35 Lakhs', min: 3500000, max: Infinity },
];

const PROGRAM_FILTERS = [
  { id: 'all', label: 'All Programs' },
  { id: 'mba', label: 'MBA & Business' },
  { id: 'tech', label: 'Data Science & AI' },
  { id: 'analytics', label: 'Business Analytics' },
  { id: 'online', label: 'Online / Distance' },
];

const getCountryEmoji = (c: string) => {
  if (c.includes('USA')) return '🇺🇸';
  if (c.includes('Canada')) return '🇨🇦';
  if (c.includes('UK')) return '🇬🇧';
  if (c.includes('Ireland')) return '🇮🇪';
  if (c.includes('Australia')) return '🇦🇺';
  if (c.includes('New Zealand')) return '🇳🇿';
  if (c.includes('Germany')) return '🇩🇪';
  if (c.includes('Sweden')) return '🇸🇪';
  if (c.includes('Netherlands')) return '🇳🇱';
  if (c.includes('France')) return '🇫🇷';
  if (c.includes('Finland')) return '🇫🇮';
  if (c.includes('Denmark')) return '🇩🇰';
  if (c.includes('Malta')) return '🇲🇹';
  if (c.includes('Hungary')) return '🇭🇺';
  if (c.includes('Spain')) return '🇪🇸';
  if (c.includes('Poland')) return '🇵🇱';
  if (c.includes('Malaysia')) return '🇲🇾';
  return '🌍';
};

/* ── Modern Inquiry Modal ── */
function InquiryModal({ college, onClose }: { college: typeof ABROAD_COLLEGES[0]; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', number: '', email: '', location: '', program: college.programs[0] || 'Global MBA' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await submitLead({
      ...form,
      college: college.name,
      source: `Abroad Education Directory (${college.country})`,
      timestamp: new Date().toISOString(),
    });
    setStatus('success');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="relative bg-white rounded-3xl shadow-2xl shadow-slate-950/30 w-full max-w-lg border border-slate-200/90 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white p-6 md:p-7 border-b border-white/10 shrink-0">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
          
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30 mb-2">
            <Sparkles size={11} className="text-amber-400" /> Study Abroad 2027 Admissions
          </div>
          <h3 className="text-xl font-extrabold text-white leading-tight">
            Apply to {college.name}
          </h3>
          <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
            <MapPin size={13} className="text-amber-400 shrink-0" /> {college.location} • {getCountryEmoji(college.country)} {college.country}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-7 overflow-y-auto">
          {status === 'success' ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900 mb-1">Inquiry Registered!</h4>
                <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-sm mx-auto">
                  Our international admissions advisors will review your academic profile and reach out with fee details, WES eligibility, and scholarship options.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/919560020771?text=${encodeURIComponent(`Hi Mohit Sir, I just submitted an abroad admission inquiry for ${college.name} (${college.country}). My name is ${form.name}. Please guide me on cutoffs, scholarships, and visa options!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <MessageCircle size={16} /> Chat with Mohit on WhatsApp
                </a>
                <button 
                  onClick={onClose} 
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Selected University</label>
                <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-extrabold text-slate-800 flex items-center justify-between">
                  <span className="truncate">{college.name}</span>
                  <span className="text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded text-amber-700 font-bold shrink-0">{college.fee}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Program of Interest</label>
                <select
                  required
                  value={form.program}
                  onChange={e => setForm({ ...form, program: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                >
                  {college.programs.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                  <option value="Global MBA (Executive / 1-Year)">Global MBA (Executive / 1-Year)</option>
                  <option value="MS Data Science / AI">MS Data Science / AI</option>
                  <option value="General Profile Evaluation">General Profile Evaluation</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">WhatsApp Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="10-digit mobile"
                    value={form.number}
                    onChange={e => setForm({ ...form, number: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="name@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Current City</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Delhi, Pune, Bangalore"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Processing Profile...' : 'Submit Profile for Free Evaluation →'}
                </button>
                <p className="text-[11px] text-slate-400 text-center font-medium mt-2">
                  🔒 Confidential • Zero agency commission • Direct institutional advisory
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Modern College Detail Modal ── */
function CollegeDetailModal({ 
  college, 
  onClose, 
  onInquire 
}: {
  college: typeof ABROAD_COLLEGES[0];
  onClose: () => void;
  onInquire: () => void;
}) {
  const slug = generateCollegeSlug(college.name, college.location);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="relative bg-white rounded-3xl shadow-2xl shadow-slate-950/30 w-full max-w-2xl max-h-[92vh] overflow-y-auto z-10 border border-slate-200/90 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white p-7 sm:p-8 border-b border-white/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="relative z-10 space-y-2.5 pr-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                {college.badge}
              </span>
              <span className="bg-white/10 text-slate-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/15">
                {getCountryEmoji(college.country)} {college.country}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Verified Institution
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {college.name}
            </h2>

            <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm font-medium">
              <MapPin size={15} className="text-amber-400 shrink-0" />
              <span>{college.location}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Estimated Fee</p>
              <p className="text-base font-black text-slate-900">{college.fee}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Program Duration</p>
              <p className="text-sm font-extrabold text-slate-800">{college.duration}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Learning Mode</p>
              <p className="text-sm font-extrabold text-slate-800 truncate">{college.mode}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Accreditation</p>
              <p className="text-xs font-extrabold text-emerald-700 truncate">{college.accreditation.split('|')[0]}</p>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
              <Building2 size={14} className="text-amber-600" /> About the Institution
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              {college.about}
            </p>
          </div>

          {/* Programs */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
              <GraduationCap size={14} className="text-blue-600" /> Programs & Specializations
            </h3>
            <div className="flex flex-wrap gap-2">
              {college.programs.map((p) => (
                <span key={p} className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
              <Star size={14} className="text-amber-500" /> Key Admissions Highlights
            </h3>
            <ul className="space-y-2">
              {college.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <span className="w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-emerald-600">
                    <BadgeCheck size={13} />
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onInquire();
              }}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 px-6 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              Apply / Check Eligibility <ArrowRight size={14} />
            </button>
            <Link
              href={`/abroad-education/${slug}`}
              className="flex-1 bg-slate-950 hover:bg-slate-800 text-white font-black py-3.5 px-6 rounded-2xl active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Full Program Guide <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Client Component ── */
export default function AbroadEducationClient() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('All');
  const [feeRange, setFeeRange] = useState(0);
  const [programFilter, setProgramFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'fee-asc' | 'fee-desc' | 'name'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<typeof ABROAD_COLLEGES[0] | null>(null);
  const [showInquiry, setShowInquiry] = useState(false);

  // Country counts calculation
  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ABROAD_COLLEGES.forEach((c) => {
      counts[c.country] = (counts[c.country] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter & Sort Logic
  const filtered = useMemo(() => {
    const list = ABROAD_COLLEGES.filter((c) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchLocation = c.location.toLowerCase().includes(q);
        const matchCountry = c.country.toLowerCase().includes(q);
        const matchPrograms = c.programs.some(p => p.toLowerCase().includes(q));
        const matchAccred = c.accreditation.toLowerCase().includes(q);
        if (!matchName && !matchLocation && !matchCountry && !matchPrograms && !matchAccred) return false;
      }

      // Country
      if (country !== 'All' && c.country !== country) return false;

      // Fee Range
      const range = FEE_RANGES[feeRange];
      if (c.feeNum < range.min || c.feeNum > range.max) return false;

      // Program Type
      if (programFilter !== 'all') {
        const pLower = c.programs.map(p => p.toLowerCase()).join(' ');
        if (programFilter === 'mba' && !pLower.includes('mba') && !pLower.includes('management')) return false;
        if (programFilter === 'tech' && !pLower.includes('data') && !pLower.includes('ai') && !pLower.includes('science')) return false;
        if (programFilter === 'analytics' && !pLower.includes('analytics')) return false;
        if (programFilter === 'online' && !c.mode.toLowerCase().includes('online')) return false;
      }

      return true;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === 'fee-asc') return a.feeNum - b.feeNum;
      if (sortBy === 'fee-desc') return b.feeNum - a.feeNum;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // default featured order
    });
  }, [search, country, feeRange, programFilter, sortBy]);

  return (
    <section className="py-14 md:py-24 bg-white relative" id="explore">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Section Header & View Toggle ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
              <Globe size={13} className="text-amber-600" /> Interactive University Directory
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Compare Global Universities & Programs
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base max-w-2xl mt-2">
              Filter across 380+ accredited universities in the USA, UK, Canada, Australia, Germany, Ireland, and Europe. Compare tuition fees, accreditations, and post-study work routes.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/80">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid size={15} /> Card View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
                aria-label="Table Comparison View"
              >
                <TableIcon size={15} /> Comparison Table
              </button>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 shadow-sm"
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
          </div>
        </div>

        {/* ── Search & Filter Controls Hub ── */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-lg shadow-slate-900/5 mb-10 space-y-6">
          
          {/* Main Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by university name, country, city, or program (e.g. LJMU, GGU, Global MBA, Data Science, UK)..."
              className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl pl-12 pr-10 py-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Destination Pills */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Popular Study Destinations
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {COUNTRIES.map((c) => {
                const isSelected = country === c;
                const count = c === 'All' ? ABROAD_COLLEGES.length : (countryCounts[c] || 0);
                return (
                  <button
                    key={c}
                    onClick={() => setCountry(c)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-950 text-white shadow-md shadow-slate-900/10'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                    }`}
                  >
                    <span>{getCountryEmoji(c)} {c === 'All' ? 'All Destinations' : c}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dropdown Filters Row */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 ${showFilters ? 'grid' : 'hidden sm:grid'}`}>
            {/* Fee Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Estimated Tuition Fee
              </label>
              <div className="relative">
                <select
                  value={feeRange}
                  onChange={(e) => setFeeRange(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 cursor-pointer"
                >
                  {FEE_RANGES.map((r, i) => (
                    <option key={r.label} value={i}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Program Discipline Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Discipline / Focus
              </label>
              <div className="relative">
                <select
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 cursor-pointer"
                >
                  {PROGRAM_FILTERS.map((pf) => (
                    <option key={pf.id} value={pf.id}>
                      {pf.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Sort Options
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 cursor-pointer"
                >
                  <option value="featured">Recommended & Featured</option>
                  <option value="fee-asc">Tuition: Low to High</option>
                  <option value="fee-desc">Tuition: High to Low</option>
                  <option value="name">University Name (A-Z)</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Status & Reset */}
          {(country !== 'All' || feeRange !== 0 || programFilter !== 'all' || search) && (
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">
                Filters active: <span className="text-slate-900 font-bold">{country !== 'All' ? country : ''}</span>
              </span>
              <button
                onClick={() => {
                  setSearch('');
                  setCountry('All');
                  setFeeRange(0);
                  setProgramFilter('all');
                  setSortBy('featured');
                }}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Counter Header */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="text-xs sm:text-sm font-bold text-slate-600">
            Showing <span className="text-slate-900 font-black">{filtered.length}</span> international institutions
            {country !== 'All' && <span> in <span className="text-amber-700 font-bold">{country}</span></span>}
            {search && <span> matching &ldquo;<span className="text-slate-900 font-bold">{search}</span>&rdquo;</span>}
          </div>
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
            Verified 2027 Admissions Feed
          </span>
        </div>

        {/* ── Empty State ── */}
        {filtered.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200 p-8 my-8">
            <Globe className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Universities Found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-4">
              We couldn&apos;t find any global programs matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCountry('All');
                setFeeRange(0);
                setProgramFilter('all');
              }}
              className="bg-slate-950 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* ── CARD GRID VIEW ── */}
        {viewMode === 'grid' && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
            {filtered.map((college) => {
              const slug = generateCollegeSlug(college.name, college.location);
              return (
                <div
                  key={college.name}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Top Accent Gradient Header */}
                  <div className="relative bg-gradient-to-r from-[#0A192F] via-[#0D2342] to-[#123058] p-5 text-white overflow-hidden shrink-0">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                        {college.badge}
                      </span>
                      <span className="bg-white/15 text-slate-200 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-white/15 flex items-center gap-1.5">
                        {getCountryEmoji(college.country)} {college.country}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-white leading-snug group-hover:text-amber-300 transition-colors line-clamp-1 relative z-10">
                      <Link href={`/abroad-education/${slug}`}>{college.name}</Link>
                    </h3>

                    <div className="flex items-center gap-1.5 text-slate-300 text-xs font-medium mt-1 relative z-10">
                      <MapPin size={13} className="text-amber-400 shrink-0" />
                      <span className="truncate">{college.location}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    {/* Stats Box */}
                    <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-bold flex items-center gap-1.5">
                          <IndianRupee size={13} className="text-slate-400" /> Estimated Tuition
                        </span>
                        <span className="font-black text-slate-950 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                          {college.fee}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-bold flex items-center gap-1.5">
                          <Clock size={13} className="text-slate-400" /> Duration & Mode
                        </span>
                        <span className="font-bold text-slate-800 text-right truncate max-w-[170px]">
                          {college.duration} • {college.mode}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-bold flex items-center gap-1.5">
                          <ShieldCheck size={13} className="text-emerald-600" /> Recognition
                        </span>
                        <span className="font-bold text-emerald-700 truncate max-w-[170px]" title={college.accreditation}>
                          {college.accreditation.split('|').slice(0, 2).join(' • ')}
                        </span>
                      </div>
                    </div>

                    {/* Programs Preview */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                        Featured Offerings
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {college.programs.slice(0, 3).map((prog) => (
                          <span
                            key={prog}
                            className="bg-slate-100 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200/80"
                          >
                            {prog}
                          </span>
                        ))}
                        {college.programs.length > 3 && (
                          <span className="bg-slate-50 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-lg border border-slate-200/60">
                            +{college.programs.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCollege(college);
                          setShowInquiry(false);
                        }}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition-colors text-center cursor-pointer"
                      >
                        Quick Overview
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCollege(college);
                          setShowInquiry(true);
                        }}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 text-center cursor-pointer"
                      >
                        Check Eligibility
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── COMPARISON TABLE VIEW ── */}
        {viewMode === 'table' && filtered.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden mb-16">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#0A192F] via-[#0D2342] to-[#123058] text-white">
                    <th className="py-4 px-5 font-black uppercase tracking-wider">University & Location</th>
                    <th className="py-4 px-4 font-black uppercase tracking-wider">Country</th>
                    <th className="py-4 px-4 font-black uppercase tracking-wider">Estimated Fee</th>
                    <th className="py-4 px-4 font-black uppercase tracking-wider">Duration / Mode</th>
                    <th className="py-4 px-4 font-black uppercase tracking-wider">Accreditations</th>
                    <th className="py-4 px-5 font-black uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((college) => {
                    const slug = generateCollegeSlug(college.name, college.location);
                    return (
                      <tr key={college.name} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-5">
                          <Link href={`/abroad-education/${slug}`} className="font-extrabold text-sm text-slate-950 hover:text-amber-600 transition-colors block">
                            {college.name}
                          </Link>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin size={11} className="text-amber-500" /> {college.location}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200">
                            {getCountryEmoji(college.country)} {college.country}
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap font-black text-slate-900 text-sm">
                          {college.fee}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-slate-600">
                          {college.duration}
                          <span className="block text-[11px] text-slate-400">{college.mode}</span>
                        </td>
                        <td className="py-4 px-4 text-emerald-700 font-semibold max-w-[200px] truncate" title={college.accreditation}>
                          {college.accreditation}
                        </td>
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <Link
                              href={`/abroad-education/${slug}`}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
                            >
                              Guide
                            </Link>
                            <button
                              onClick={() => {
                                setSelectedCollege(college);
                                setShowInquiry(true);
                              }}
                              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-black px-3.5 py-1.5 rounded-lg text-xs transition-all shadow-xs cursor-pointer"
                            >
                              Apply
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Direct 1-on-1 Consultation Callout ── */}
        <div className="bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] rounded-3xl p-8 sm:p-12 text-white border border-amber-400/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles size={12} className="fill-slate-950" /> Profile Review 2027
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Confused between Country, Course, or Post-Study Visas?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Schedule a personalized 1-on-1 international education evaluation with Mohit Jain. We evaluate your CGPA, work experience, English test waivers, and budget to find your ideal global path.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20to%20evaluate%20my%20profile%20for%20Study%20Abroad%20Admissions%202027!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 text-white font-black px-6 py-4 rounded-2xl shadow-lg shadow-emerald-600/20 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp with Mohit
            </a>
            <a
              href="tel:+919560020771"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-black px-5 py-4 rounded-2xl border border-white/20 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone size={15} /> +91 95600 20771
            </a>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedCollege && !showInquiry && (
        <CollegeDetailModal
          college={selectedCollege}
          onClose={() => setSelectedCollege(null)}
          onInquire={() => setShowInquiry(true)}
        />
      )}

      {selectedCollege && showInquiry && (
        <InquiryModal
          college={selectedCollege}
          onClose={() => {
            setShowInquiry(false);
            setSelectedCollege(null);
          }}
        />
      )}
    </section>
  );
}
