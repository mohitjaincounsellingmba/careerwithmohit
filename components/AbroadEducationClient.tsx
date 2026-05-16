'use client';

import { useState, useMemo } from 'react';
import {
  MapPin, BadgeCheck, IndianRupee, GraduationCap, Search,
  X, SlidersHorizontal, Phone, ChevronDown, BookOpen,
  Building2, Star, Award, Globe, Plane
} from 'lucide-react';
import { ABROAD_COLLEGES } from '@/data/abroadColleges';

const COUNTRIES = ['All', 'USA', 'Canada', 'UK', 'Ireland', 'Germany', 'Sweden', 'Netherlands', 'France', 'Finland', 'New Zealand', 'Australia', 'Dubai', 'India (Global)'];
const FEE_RANGES = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹15 Lakhs', min: 0, max: 1500000 },
  { label: '₹15L – ₹25 Lakhs', min: 1500000, max: 2500000 },
  { label: '₹25L – ₹35 Lakhs', min: 2500000, max: 3500000 },
  { label: 'Above ₹35 Lakhs', min: 3500000, max: Infinity },
];

/* ── Inquiry Modal ── */
function InquiryModal({ college, onClose }: { college: typeof ABROAD_COLLEGES[0]; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', number: '', email: '', location: '', program: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await fetch('/api/leads', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, college: college.name, source: 'Abroad Education Page', timestamp: new Date().toISOString() }),
      });
      setStatus('success');
    } catch {
      setStatus('success'); // fail-silent
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 z-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BadgeCheck size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-black text-[#0f172a] mb-2">Inquiry Sent!</h3>
            <p className="text-gray-500 text-sm">Our expert advisors will contact you within 24 hours about <strong>{college.name}</strong>.</p>
            <button onClick={onClose} className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-black text-[#0f172a] mb-1">Inquire Now</h3>
            <p className="text-sm text-gray-500 mb-6">Get free admission assistance for <span className="font-semibold text-indigo-600">{college.name}</span></p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">University</label>
                <input type="text" value={college.name} readOnly
                  className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold text-gray-600 cursor-not-allowed"
                />
              </div>
              <input required type="text" placeholder="Full Name" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <input required type="tel" placeholder="WhatsApp Number" value={form.number}
                onChange={e => setForm({ ...form, number: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <input required type="email" placeholder="Email Address" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <input required type="text" placeholder="Your City/Location" value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <select required value={form.program}
                onChange={e => setForm({ ...form, program: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors bg-white appearance-none"
              >
                <option value="" disabled>Select Program of Interest</option>
                {college.programs.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
                <option value="Other / Not Sure">Other / Not Sure</option>
              </select>
              <button type="submit" disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm mt-2"
              >
                {status === 'submitting' ? 'Sending...' : 'Submit Free Inquiry →'}
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
  college: typeof ABROAD_COLLEGES[0];
  onClose: () => void;
  onInquire: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-br ${college.gradeColor} p-8 rounded-t-2xl relative`}>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 transition-colors rounded-full p-1.5">
            <X size={18} className="text-white" />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {college.badge}
            </span>
            <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {college.country}
            </span>
          </div>
          <h2 className="text-2xl font-black text-white leading-snug">{college.name}</h2>
          <div className="flex items-center gap-2 mt-2 text-white/80 text-sm">
            <MapPin size={14} />
            <span>{college.location}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">

          {/* About */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 mb-3">
              <Building2 size={14} /> About
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{college.about}</p>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-xl p-4">
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-1">Estimated Fee</p>
              <p className="text-xl font-black text-indigo-700">{college.fee}</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-4">
              <p className="text-xs text-violet-400 font-bold uppercase tracking-widest mb-1">Duration</p>
              <p className="text-sm font-bold text-violet-700">{college.duration}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Mode</p>
              <p className="text-sm font-bold text-gray-700">{college.mode}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-xs text-green-400 font-bold uppercase tracking-widest mb-1">Accreditations</p>
              <p className="text-xs font-bold text-green-700 leading-relaxed">{college.approvals}</p>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 mb-3">
              <GraduationCap size={14} /> Programs Offered
            </h3>
            <div className="flex flex-wrap gap-2">
              {college.programs.map((p) => (
                <span key={p} className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold px-3 py-1.5 rounded-lg">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 mb-3">
              <Star size={14} /> Why Choose This?
            </h3>
            <ul className="space-y-2">
              {college.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <BadgeCheck size={12} className="text-green-600" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onInquire}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              Get Free Admission Assistance
            </button>
            <a
              href={`https://wa.me/${college.whatsapp}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20abroad%20education%20at%20${encodeURIComponent(college.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-colors text-sm text-center"
            >
              WhatsApp Advisor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  if (c.includes('Dubai')) return '🇦🇪';
  if (c.includes('India')) return '🇮🇳';
  return '🌍';
};

/* ── Main Client Component ── */
export default function AbroadEducationClient() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('All');
  const [feeRange, setFeeRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<typeof ABROAD_COLLEGES[0] | null>(null);
  const [showInquiry, setShowInquiry] = useState(false);

  const filtered = useMemo(() => {
    return ABROAD_COLLEGES.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.programs.some(p => p.toLowerCase().includes(search.toLowerCase())) ||
        c.location.toLowerCase().includes(search.toLowerCase());
      const matchCountry = country === 'All' || c.country === country;
      const matchFee = c.feeNum >= FEE_RANGES[feeRange].min && c.feeNum <= FEE_RANGES[feeRange].max;
      return matchSearch && matchCountry && matchFee;
    });
  }, [search, country, feeRange]);

  return (
    <section className="py-12 md:py-24 bg-[#f8f7f4] relative overflow-hidden" id="explore">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h2 className="display-font text-3xl md:text-5xl font-black text-[#0f172a] mb-4">
              Explore Global Universities ✈️
            </h2>
            <p className="text-gray-500 font-medium max-w-xl">
              Compare 380+ top universities from the UK, USA, Canada, Australia, New Zealand, Ireland, Germany, Sweden, Netherlands, France, Finland, and Dubai. Filter by budget, country, and accreditation to find your perfect match.
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 bg-white px-5 py-3 rounded-xl border border-gray-200 font-bold text-sm text-[#0f172a]"
          >
            <SlidersHorizontal size={18} />
            Filters {showFilters ? <ChevronDown size={16} className="rotate-180" /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* ── Filters ── */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 ${showFilters ? 'block' : 'hidden md:grid'}`}>
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search university or program..."
              className="w-full bg-white border-2 border-transparent hover:border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-sm font-bold text-gray-700 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Country Select */}
          <div className="relative group">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <select
              className="w-full bg-white border-2 border-transparent hover:border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-sm font-bold text-gray-700 shadow-sm appearance-none"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {COUNTRIES.map(c => <option key={c} value={c}>{getCountryEmoji(c)} {c === 'All' ? 'All Locations' : c}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>

          {/* Fee Filter */}
          <div className="relative group">
            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <select
              className="w-full bg-white border-2 border-transparent hover:border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-sm font-bold text-gray-700 shadow-sm appearance-none"
              value={feeRange}
              onChange={(e) => setFeeRange(Number(e.target.value))}
            >
              {FEE_RANGES.map((r, i) => <option key={r.label} value={i}>💰 {r.label === 'All' ? 'Any Budget' : r.label}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>

        {/* ── University Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((college) => (
              <div
                key={college.name}
                className="group bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 overflow-hidden relative"
              >
                {/* Decorative Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 z-0 pointer-events-none" />

                {/* Card Header */}
                <div className={`h-28 bg-gradient-to-br ${college.gradeColor} p-6 relative overflow-hidden`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  <div className="flex justify-between items-start relative z-10">
                    <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/30 shadow-sm flex items-center gap-1.5">
                      {college.badge}
                    </span>
                    <span className="bg-black/20 text-white text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                      {getCountryEmoji(college.country)} {college.country}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 relative z-10 bg-white">
                  <h3 className="text-xl font-black text-[#0f172a] mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {college.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold mb-6">
                    <MapPin size={14} className="text-rose-500" />
                    <span>{college.location}</span>
                  </div>

                  <div className="space-y-4 mb-8 bg-gray-50/50 rounded-2xl p-4 border border-gray-100/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 font-bold flex items-center gap-2">
                        💰 Estimated Fee
                      </span>
                      <span className="font-black text-[#0f172a] bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">{college.fee}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 font-bold flex items-center gap-2">
                        🎓 Programs
                      </span>
                      <span className="font-bold text-[#0f172a] text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md">
                        {college.programs[0]}{college.programs.length > 1 ? ` +${college.programs.length - 1}` : ''}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 font-bold flex items-center gap-2">
                        🏆 Accreditation
                      </span>
                      <span className="font-black text-emerald-700 text-xs bg-emerald-50 px-2 py-1 rounded-md truncate max-w-[110px]">
                        {college.accreditation.split('|')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedCollege(college)}
                      className="w-full bg-[#f8f7f4] text-[#0f172a] font-bold py-3.5 rounded-xl text-xs hover:bg-gray-100 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCollege(college);
                        setShowInquiry(true);
                      }}
                      className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl text-xs hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-black text-[#0f172a] mb-2">No universities found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => { setSearch(''); setCountry('All'); setFeeRange(0); }}
              className="mt-6 text-indigo-600 font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
              <Plane size={32} className="text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0f172a] mb-1">Confused about which country to pick?</h3>
              <p className="text-gray-500 text-sm font-medium">Get a personalized study abroad roadmap from our expert counsellors.</p>
            </div>
          </div>
          <a
            href="https://wa.me/919560020771?text=Hi%2C%20I%20want%20to%20know%20more%20about%20study%20abroad%20options"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0f172a] text-white font-black px-8 py-4 rounded-2xl hover:scale-105 transition-all flex items-center gap-3 shrink-0 uppercase tracking-widest text-xs"
          >
            Get Free Counselling <Phone size={16} />
          </a>
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
