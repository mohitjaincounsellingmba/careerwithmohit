'use client';

import { useState, useMemo } from 'react';
import {
  MapPin, BadgeCheck, IndianRupee, GraduationCap, Search,
  X, SlidersHorizontal, Phone, ChevronDown, BookOpen,
  Building2, Star, Award, Globe, Plane
} from 'lucide-react';
import { USA_COLLEGES } from '@/data/usaColleges';

export const ABROAD_COLLEGES = [
  {
    name: 'Liverpool John Moores University (LJMU)',
    location: 'Liverpool, United Kingdom',
    fee: '₹4,85,000',
    feeNum: 485000,
    accreditation: 'WES | AACSB | Privy Council (UK)',
    programs: ['Global MBA', 'M.Sc Data Science', 'M.Sc AI'],
    badge: 'UK Degree',
    grade: 'A+',
    gradeColor: 'from-blue-600 to-indigo-800',
    about: 'Liverpool John Moores University (LJMU) is a highly ranked public research university in the UK. Its online international programs provide access to a prestigious British degree recognized by the UK Privy Council and WES globally.',
    highlights: ['Top-tier UK public research university', 'WES recognized British degree', 'Triple Crown accredited curriculum', 'Global alumni network of 200,000+', 'Comprehensive career support'],
    duration: '12-24 Months',
    mode: 'Online (International)',
    approvals: 'Privy Council, QAA, AACSB, WES',
    whatsapp: '919560020771',
    country: 'UK',
  },
  {
    name: 'Golden Gate University (GGU)',
    location: 'San Francisco, USA',
    fee: '₹4,30,000',
    feeNum: 430000,
    accreditation: 'AACSB | WSCUC | WES | AIU',
    programs: ['Global MBA', 'MS Business Analytics', 'DBA'],
    badge: 'International',
    grade: 'A+',
    gradeColor: 'from-amber-600 to-orange-800',
    about: 'Located in the heart of San Francisco, GGU has been a leader in professional education for over 100 years. Its online international programs offer Silicon Valley insights and global exposure for ambitious professionals.',
    highlights: ['AACSB Accredited business school', 'Taught by Silicon Valley professionals', 'WES approved for global recognition', 'AIU Equivalence for Indian learners', 'Heritage of 100+ years in education'],
    duration: '12-15 Months',
    mode: 'Online (Global)',
    approvals: 'AACSB, WSCUC, WES, AIU',
    whatsapp: '919560020771',
    country: 'USA',
  },
  {
    name: 'IIM Visakhapatnam (Global MBA)',
    location: 'Visakhapatnam, India',
    fee: '₹11,90,000',
    feeNum: 1190000,
    accreditation: 'NIRF | WES | AACSB',
    programs: ['Global MBA (PGPEx-GM)'],
    badge: 'IIM Brand',
    grade: 'A++',
    gradeColor: 'from-red-700 to-red-900',
    about: 'IIM Visakhapatnam\'s Global MBA is one of the highest-rated programs, combining IIM prestige with global recognition through AACSB and WES. Ideal for senior professionals seeking global leadership roles.',
    highlights: ['Prestigious IIM Brand', 'AACSB Global Accreditation', 'WES recognized for immigration', 'High ROI & Career Growth', 'Top-tier Peer Networking'],
    duration: '12-24 Months',
    mode: 'Online / Blended',
    approvals: 'NIRF, WES, AACSB, Ministry of Education',
    whatsapp: '919560020771',
    country: 'India (Global)',
  },
  {
    name: 'IIM Sirmaur (Global MBA)',
    location: 'Sirmaur, India',
    fee: '₹8,00,000',
    feeNum: 800000,
    accreditation: 'AICTE | NIRF Ranked',
    programs: ['Executive Global MBA'],
    badge: 'Trending',
    grade: 'A+',
    gradeColor: 'from-blue-700 to-blue-900',
    about: 'IIM Sirmaur offers a prestigious online Global MBA program under the Ministry of Education, India. It provides the IIM brand value with the flexibility of online learning for working professionals.',
    highlights: ['IIM Brand Recognition', 'Ministry of Education Approved', 'Strong Industry Faculty', 'Flexible Online Delivery', 'Focus on Global Management'],
    duration: '12-24 Months',
    mode: 'Online',
    approvals: 'AICTE, NIRF, Ministry of Education',
    whatsapp: '919560020771',
    country: 'India (Global)',
  },
  {
    name: 'OP Jindal Global University',
    location: 'Sonipat, India',
    fee: '₹1,80,000',
    feeNum: 180000,
    accreditation: 'AACSB | UGC | NAAC A | QS Ranked',
    programs: ['Global MBA', 'BBA', 'MA', 'BA'],
    badge: 'Value Pick',
    grade: 'A',
    gradeColor: 'from-indigo-600 to-indigo-800',
    about: 'OP Jindal Global University is India\'s only private university ranked in QS World Rankings with AACSB accreditation. It offers the most affordable globally accredited MBA from an Indian university.',
    highlights: ['Only Indian private university with AACSB', 'QS World Rankings recognized', 'Global faculty from top universities', 'Excellent for international careers', 'Premium brand for MBAs'],
    duration: '1 Year (MBA) / 3 Years (UG)',
    mode: 'Online (Global Standard)',
    approvals: 'UGC-DEB, NAAC A, AACSB, QS World',
    whatsapp: '919560020771',
    country: 'India (Global)',
  },
  {
    name: 'Edgewood University',
    location: 'Madison, Wisconsin, USA',
    fee: '₹10,00,000',
    feeNum: 1000000,
    accreditation: 'WES | ACBSP | HLC',
    programs: ['Global MBA'],
    badge: 'USA Focus',
    grade: 'A',
    gradeColor: 'from-blue-500 to-blue-700',
    about: 'Edgewood University is accredited by WES, ACBSP, and HLC — well-recognized across the USA and globally. A strong option for professionals targeting North American markets.',
    highlights: ['Licensed by HLC & ACBSP', 'WES recognized US degree', '100% online flexible structure', 'Strong for North American careers', 'Modern leadership curriculum'],
    duration: '18-24 Months',
    mode: 'Fully Online',
    approvals: 'WES, ACBSP, HLC',
    whatsapp: '919560020771',
    country: 'USA',
  },
  {
    name: 'Birchwood University',
    location: 'Florida, USA',
    fee: '₹65,500',
    feeNum: 65500,
    accreditation: 'Florida CIE | CECU | QAHE',
    programs: ['Global MBA', 'DBA', 'M.Sc Data Science'],
    badge: 'Affordable US',
    grade: 'A',
    gradeColor: 'from-emerald-600 to-emerald-800',
    about: 'Birchwood University is an innovative Florida-based institution committed to affordable and industry-aligned higher education. Programs are tailored to modern market demands.',
    highlights: ['Licensed by Florida CIE', 'Most affordable US Online degree', '100% online flexible structure', 'Industry-centric curriculum', 'Modern technological integration'],
    duration: '18 Months',
    mode: '100% Online',
    approvals: 'Florida CIE, CECU, QAHE',
    whatsapp: '919560020771',
    country: 'USA',
  },
  {
    name: 'University of Wollongong (UOW)',
    location: 'Dubai / Australia',
    fee: '₹15,50,000',
    feeNum: 1550000,
    accreditation: 'AACSB | TEQSA | WES',
    programs: ['Global MBA', 'International Business'],
    badge: 'Australian Brand',
    grade: 'A++',
    gradeColor: 'from-orange-600 to-orange-900',
    about: 'UOW is a global top 1% university. Its Dubai and Australia campuses offer world-class management education with strong focus on international trade and global leadership.',
    highlights: ['Top 1% Global University', 'AACSB Accredited', 'Strong Dubai/Australia connection', 'World-class faculty', 'Excellent global networking'],
    duration: '1.5 - 2 Years',
    mode: 'Online / Blended',
    approvals: 'AACSB, TEQSA, WES',
    whatsapp: '919560020771',
    country: 'Australia / Dubai',
  },
  ...USA_COLLEGES,
];

const COUNTRIES = ['All', 'USA', 'UK', 'Australia / Dubai', 'India (Global)'];
const FEE_RANGES = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹5L', min: 0, max: 500000 },
  { label: '₹5L – ₹10L', min: 500000, max: 1000000 },
  { label: 'Above ₹10L', min: 1000000, max: Infinity },
];

/* ── Inquiry Modal ── */
function InquiryModal({ college, onClose }: { college: typeof ABROAD_COLLEGES[0]; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', number: '', email: '' });

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
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 z-10"
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
            <p className="text-sm text-gray-500 mb-6">Get free abroad education counselling for <span className="font-semibold text-indigo-600">{college.name}</span></p>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <button type="submit" disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
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
              Explore Global Universities
            </h2>
            <p className="text-gray-500 font-medium max-w-xl">
              Compare top universities from the UK, USA, Australia, and Dubai. Filter by budget, country, and accreditation to find your perfect match.
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
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search university or program..."
              className="w-full bg-white border-2 border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-indigo-500 transition-all text-sm font-medium shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Country Select */}
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              className="w-full bg-white border-2 border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-indigo-500 transition-all text-sm font-medium shadow-sm appearance-none"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {COUNTRIES.map(c => <option key={c} value={c}>{c === 'All' ? 'Select Country' : c}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>

          {/* Fee Filter */}
          <div className="relative">
            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              className="w-full bg-white border-2 border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-indigo-500 transition-all text-sm font-medium shadow-sm appearance-none"
              value={feeRange}
              onChange={(e) => setFeeRange(Number(e.target.value))}
            >
              {FEE_RANGES.map((r, i) => <option key={r.label} value={i}>{r.label === 'All' ? 'Filter by Fee' : r.label}</option>)}
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
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className={`h-24 bg-gradient-to-br ${college.gradeColor} p-6 relative`}>
                  <div className="flex justify-between items-start">
                    <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md">
                      {college.badge}
                    </span>
                    <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md">
                      {college.country}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-[#0f172a] mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {college.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold mb-5">
                    <MapPin size={12} className="text-indigo-400" />
                    <span>{college.location}</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 font-medium flex items-center gap-2">
                        <IndianRupee size={14} /> Estimated Fee
                      </span>
                      <span className="font-black text-[#0f172a]">{college.fee}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 font-medium flex items-center gap-2">
                        <GraduationCap size={14} /> Programs
                      </span>
                      <span className="font-black text-[#0f172a]">{college.programs[0]}{college.programs.length > 1 ? ` +${college.programs.length - 1}` : ''}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 font-medium flex items-center gap-2">
                        <Award size={14} /> Accreditation
                      </span>
                      <span className="font-black text-[#0f172a] truncate max-w-[120px]">{college.accreditation.split('|')[0]}</span>
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
