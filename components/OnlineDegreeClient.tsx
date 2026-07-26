'use client';

import { useState, useMemo } from 'react';
import {
  MapPin, BadgeCheck, IndianRupee, GraduationCap, Search,
  X, SlidersHorizontal, Phone, ChevronDown, BookOpen,
  Building2, Star, Award
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
      source: 'Online Degree Page',
      timestamp: new Date().toISOString(),
    });
    setStatus('success');
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
            <p className="text-gray-500 text-sm">Our team will contact you within 24 hours about <strong>{college.name}</strong>.</p>
            <button onClick={onClose} className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-black text-[#0f172a] mb-1">Inquire Now</h3>
            <p className="text-sm text-gray-500 mb-6">Get free counselling for <span className="font-semibold text-indigo-600">{college.name}</span></p>
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
  college: typeof COLLEGES[0];
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
              NAAC {college.grade}
            </span>
            <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {college.badge}
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
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-1">Total Fee</p>
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
              <p className="text-xs text-green-400 font-bold uppercase tracking-widest mb-1">Approvals</p>
              <p className="text-xs font-bold text-green-700 leading-relaxed">{college.approvals}</p>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 mb-3">
              <GraduationCap size={14} /> Programs Offered &amp; Specializations
            </h3>
            <div className="space-y-3">
              {college.programs.map((p) => (
                <div key={p} className="bg-indigo-50/40 border border-indigo-100/50 rounded-2xl p-4 transition-all hover:bg-indigo-50/70">
                  <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                    {p}
                  </span>
                  {college.specializations && college.specializations[p] && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {college.specializations[p].map((spec) => (
                        <span key={spec} className="bg-white text-slate-700 border border-slate-200/60 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
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
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 mb-3">
              <Star size={14} /> Why This College?
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
              Inquire Now
            </button>
            {college.slug && (
              <a
                href={`/blog/${college.slug}`}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-colors text-sm text-center flex items-center justify-center gap-1.5"
              >
                <BookOpen size={15} />
                Read Review
              </a>
            )}
            <a
              href={`https://wa.me/${college.whatsapp}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(college.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-colors text-sm text-center flex items-center justify-center gap-1"
            >
              WhatsApp
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
    <>
      {/* Search + Filter Bar */}
      <div className="sticky top-0 z-30 bg-[#f8f7f4]/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search university, location, or program..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold text-sm transition-all ${showFilters ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300'}`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {(grade !== 'All' || feeRange !== 0 || course !== 'All') && (
                <span className="bg-white text-indigo-600 text-xs font-black rounded-full w-4 h-4 flex items-center justify-center ml-1">
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
              className="flex items-center gap-2 bg-green-500 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-green-600 transition-colors shrink-0"
            >
              <Phone size={14} />
              Free Inquiry
            </a>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 bg-white border border-gray-100 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-5 shadow-sm">
              {/* NAAC Grade */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
                  <Award size={12} /> NAAC Grade
                </p>
                <div className="flex flex-wrap gap-2">
                  {GRADES.map((g) => (
                    <button key={g} onClick={() => setGrade(g)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-bold border transition-all ${grade === g ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-indigo-300'}`}
                    >
                      {g === 'All' ? 'All Grades' : `NAAC ${g}`}
                    </button>
                  ))}
                </div>
              </div>
              {/* Fee Range */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
                  <IndianRupee size={12} /> Fee Range: <span className="text-indigo-600 font-black">{selectedFeeRange.label}</span>
                </p>
                <input type="range" min={0} max={FEE_RANGES.length - 1} value={feeRange}
                  onChange={(e) => setFeeRange(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1 font-medium">
                  {FEE_RANGES.map((f) => <span key={f.label}>{f.label.split(' ')[0]}</span>)}
                </div>
              </div>
              {/* Course / Program */}
              <div className="sm:col-span-2">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
                  <GraduationCap size={12} /> Course / Program
                </p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setCourse('All')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold border transition-all ${course === 'All' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-indigo-300'}`}
                  >
                    All Courses
                  </button>
                  {COURSES.map((c) => (
                    <button key={c} onClick={() => setCourse(c)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-bold border transition-all ${course === c ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-indigo-300'}`}
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
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500 font-medium">
          Showing <span className="font-black text-indigo-600">{filtered.length}</span> of {COLLEGES.length} universities
        </p>
        {(search || grade !== 'All' || feeRange !== 0 || course !== 'All') && (
          <button onClick={() => { setSearch(''); setGrade('All'); setFeeRange(0); setCourse('All'); }}
            className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
          >
            <X size={12} /> Clear filters
          </button>
        )}
      </div>

      {/* College Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-xl font-black text-gray-700 mb-2">No universities found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((college, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCollege(college)}
                className="college-card p-6 flex flex-col gap-4 text-left w-full group cursor-pointer"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`bg-gradient-to-br ${college.gradeColor} rounded-xl w-12 h-12 flex items-center justify-center shrink-0 shadow-lg`}>
                    <span className="grade-pill text-white font-black text-xs">{college.grade}</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {college.badge}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#0f172a] leading-snug group-hover:text-indigo-700 transition-colors">
                  {college.name}
                </h3>

                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <MapPin size={13} className="text-indigo-400 shrink-0" />
                  <span>{college.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="fee-tag text-sm font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                    <IndianRupee size={13} />
                    {college.fee.replace('₹', '')} total fee
                  </span>
                </div>

                <div className="border-t border-gray-100" />

                <div className="flex items-start gap-2">
                  <BadgeCheck size={14} className="text-violet-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 leading-relaxed">{college.accreditation}</p>
                </div>

                <div className="flex items-start gap-2">
                  <GraduationCap size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">{college.programs.join(', ')}</p>
                </div>

                <div className="mt-auto pt-2 flex items-center justify-between">
                  <span className="text-xs text-indigo-500 font-bold group-hover:underline">
                    View Details →
                  </span>
                  {college.slug && (
                    <a
                      href={`/blog/${college.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-slate-500 font-semibold hover:text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      <BookOpen size={12} className="text-slate-400" />
                      Full Review
                    </a>
                  )}
                </div>
              </button>
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

      <style>{`
        .college-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .college-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.10);
        }
        .grade-pill {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
        }
        .fee-tag {
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }
      `}</style>
    </>
  );
}
