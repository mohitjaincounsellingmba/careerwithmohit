'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MapPin, BadgeCheck, Search, X, SlidersHorizontal, Phone,
  ChevronDown, GraduationCap, Building2, Award, CheckCircle2, MessageCircle,
  LayoutGrid, List, Scale, ArrowRight, Sparkles, TrendingUp,
  ShieldCheck, Check, RotateCcw, ExternalLink, HelpCircle, Briefcase, DollarSign
} from 'lucide-react';
import { MBA_PGDM_COLLEGES_2027, MbaPgdmCollege } from '@/data/mbaPgdmColleges2027';
import { submitLead } from '@/lib/leads';

// Location filters with sub-region grouping
const LOCATION_FILTERS = [
  { label: 'All Hubs', value: 'All', count: 55 },
  { label: 'Delhi NCR', value: 'delhi-ncr', count: 26 },
  { label: 'South Delhi', value: 'South Delhi', count: 5 },
  { label: 'West / Central Delhi', value: 'west-central-delhi', count: 4 },
  { label: 'Noida / Gr. Noida', value: 'noida-gr-noida', count: 14 },
  { label: 'Gurgaon', value: 'Gurgaon', count: 7 },
  { label: 'Pune', value: 'Pune', count: 8 },
  { label: 'Bangalore', value: 'Bangalore', count: 7 },
  { label: 'Mumbai', value: 'Mumbai', count: 6 },
  { label: 'Ghaziabad', value: 'Ghaziabad', count: 2 },
];

const FEE_RANGES = [
  { label: 'All Fee Ranges', min: 0, max: Infinity },
  { label: 'Under ₹6.00 Lakhs', min: 0, max: 600000 },
  { label: '₹6.00L – ₹9.00 Lakhs', min: 600000, max: 900000 },
  { label: '₹9.00L – ₹12.00 Lakhs', min: 900000, max: 1200000 },
  { label: 'Above ₹12.00 Lakhs', min: 1200000, max: Infinity },
];

const SMART_TAGS = [
  { id: 'all', label: 'All Targeted Colleges' },
  { id: 'direct', label: '⚡ Direct / Mgmt Quota Open' },
  { id: 'high_roi', label: '💰 High ROI (< ₹8 Lakhs)' },
  { id: 'high_placement', label: '📈 High Avg CTC (≥ ₹9 LPA)' },
  { id: 'top_ctc', label: '🚀 Top CTC (≥ ₹24 LPA)' },
  { id: 'aiu_nba', label: '📜 NBA / AIU MBA Equivalent' },
];

/* ── Instant Direct Admission Inquiry Modal ── */
function InquiryModal({
  college,
  onClose,
}: {
  college: MbaPgdmCollege;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [form, setForm] = useState({
    name: '',
    number: '',
    email: '',
    location: '',
    graduationScore: '',
    program: 'PGDM / MBA Direct Admission 2027',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await submitLead({
      ...form,
      college: college.name,
      source: 'MBA/PGDM Direct Admission Portal 2027',
      timestamp: new Date().toISOString(),
    });
    setStatus('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-md" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-full hover:bg-slate-100"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} className="text-emerald-600" />
            </div>
            <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Application Priority Logged
            </span>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Inquiry Submitted!</h3>
            <p className="text-slate-600 text-sm font-normal max-w-sm mx-auto mb-6">
              Our official PGDM &amp; MBA admissions counselor will contact you within <strong>30 minutes</strong> with seat availability and fee waiver details for{' '}
              <strong className="text-slate-900">{college.name}</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/919560020771?text=${encodeURIComponent(`Hi Mohit, I just submitted an inquiry for direct admission at ${college.name}. Please share seat details and GD-PI call updates.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <MessageCircle size={18} />
                <span>Instant WhatsApp Connect</span>
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                <Sparkles size={13} className="text-amber-600" />
                Direct Admission Desk 2027
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                100% Free Guidance
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 leading-tight">
              Request Direct Admission &amp; Fee Details
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-5 font-normal">
              Target B-School:{' '}
              <span className="font-extrabold text-blue-600">{college.name}</span>
            </p>

            {/* Quick College Summary Strip */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 mb-5 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="border-r border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Fee</span>
                <span className="font-black text-emerald-600 text-xs sm:text-sm">{college.fee.split(' ')[0]}</span>
              </div>
              <div className="border-r border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Avg Placement</span>
                <span className="font-black text-blue-700 text-xs sm:text-sm">{college.avgPlacement || '₹8.5 LPA'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Campus</span>
                <span className="font-black text-slate-700 text-xs sm:text-sm truncate block">{college.location.split(',')[0]}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/60 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">WhatsApp Phone *</label>
                  <input
                    required
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={form.number}
                    onChange={(e) => setForm({ ...form, number: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/60 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="your.email@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/60 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Current City / State</label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi, Pune, Patna..."
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/60 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Graduation Score (%)</label>
                  <input
                    type="text"
                    placeholder="e.g. 68% (or Appearing)"
                    value={form.graduationScore}
                    onChange={(e) => setForm({ ...form, graduationScore: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/60 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black py-4 rounded-xl transition-all text-sm shadow-lg shadow-blue-500/25 active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Get Direct Admission Guidance &amp; Fee Waivers</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2 font-normal">
                  🔒 We respect your privacy. No spam. Direct 1-on-1 counseling support.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Full College Detail Modal ── */
function CollegeDetailModal({
  college,
  onClose,
  onInquire,
}: {
  college: MbaPgdmCollege;
  onClose: () => void;
  onInquire: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Placements' | 'Specializations' | 'DirectAdmission'>('Overview');
  const reviewSlug = getReviewSlug(college.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-md" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto z-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Banner Header */}
        <div className={`bg-gradient-to-br ${college.gradeColor} p-6 sm:p-8 rounded-t-3xl relative text-white`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white transition-colors rounded-full p-2"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
              {college.grade}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
              {college.badge}
            </span>
            <span className="bg-emerald-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              ⚡ Direct Admission 2027 Open
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black leading-snug tracking-tight text-white">{college.name}</h2>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-white/90 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="shrink-0 text-amber-300" />
              <span>{college.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="shrink-0 text-emerald-300" />
              <span>{college.approvals}</span>
            </div>
          </div>
        </div>

        {/* Modal Tabs Header */}
        <div className="flex border-b border-slate-200 px-4 sm:px-8 bg-slate-50/80 overflow-x-auto scrollbar-none">
          {[
            { id: 'Overview', label: 'Overview & Fees' },
            { id: 'Placements', label: 'Placements & CTC' },
            { id: 'Specializations', label: 'Specializations' },
            { id: 'DirectAdmission', label: 'Direct Admission & GD-PI' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-3 sm:px-4 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border-b-2 -mb-[1px] ${
                activeTab === tab.id
                  ? 'text-blue-600 border-blue-600 bg-white sm:bg-transparent'
                  : 'text-slate-500 border-transparent hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-6">
          {activeTab === 'Overview' && (
            <>
              {/* About */}
              <div>
                <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  <Building2 size={15} className="text-blue-600" /> Institution Profile
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed font-normal">{college.about}</p>
              </div>

              {/* Key Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
                  <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider mb-1">Total Course Fee</p>
                  <p className="text-base sm:text-lg font-black text-emerald-900">{college.fee}</p>
                </div>
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4">
                  <p className="text-[10px] text-blue-700 font-bold uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-sm font-bold text-blue-900">{college.duration}</p>
                </div>
                <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4">
                  <p className="text-[10px] text-purple-700 font-bold uppercase tracking-wider mb-1">Avg Placement</p>
                  <p className="text-sm font-black text-purple-900">{college.avgPlacement || '₹8.5 LPA'}</p>
                </div>
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
                  <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider mb-1">Highest CTC</p>
                  <p className="text-sm font-black text-amber-900">{college.highestPlacement || '₹20.0 LPA'}</p>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                  <Award size={15} className="text-blue-600" /> Key Campus Advantages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {college.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'Placements' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-200 rounded-2xl p-6 text-center">
                  <p className="text-xs text-emerald-800 font-bold uppercase tracking-wider mb-1">Average Salary (CTC)</p>
                  <p className="text-3xl font-black text-emerald-950">{college.avgPlacement || '₹8.50 LPA'}</p>
                  <span className="text-[11px] text-emerald-700 mt-1 block">Audited 2024-2025 batch</span>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-200 rounded-2xl p-6 text-center">
                  <p className="text-xs text-blue-800 font-bold uppercase tracking-wider mb-1">Highest Salary (CTC)</p>
                  <p className="text-3xl font-black text-blue-950">{college.highestPlacement || '₹22.0 LPA'}</p>
                  <span className="text-[11px] text-blue-700 mt-1 block">Top mentored package</span>
                </div>
              </div>

              {college.topRecruiters && college.topRecruiters.length > 0 ? (
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                    <Briefcase size={15} className="text-blue-600" /> Top Regular Recruiters on Campus
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {college.topRecruiters.map((rec) => (
                      <span
                        key={rec}
                        className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                  <p className="text-sm font-semibold text-slate-700">Top Recruiters across BFSI, Consulting, IT &amp; FMCG</p>
                  <p className="text-xs text-slate-500 mt-1">Amazon, Deloitte, ICICI Bank, KPMG, PwC, Infosys, Wipro, Tata Capital, HDFC Bank &amp; more.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Specializations' && (
            <div>
              <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                <GraduationCap size={15} className="text-blue-600" /> Dual &amp; Core Specialization Options
              </h3>
              {college.specializations ? (
                <div className="space-y-4">
                  {Object.entries(college.specializations).map(([prog, specs]) => (
                    <div key={prog} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5">
                      <span className="bg-blue-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg inline-block mb-3">
                        {prog}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {specs.map((spec) => (
                          <span key={spec} className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-slate-600 text-sm">
                  Offers dual specializations in Marketing, Finance, Business Analytics, Human Resources, Supply Chain &amp; FinTech. Contact counsellor for full syllabus booklet.
                </div>
              )}
            </div>
          )}

          {activeTab === 'DirectAdmission' && (
            <div className="space-y-4">
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5">
                <h4 className="text-sm font-black text-amber-900 mb-1">Direct Admission &amp; Management Quota Guidelines</h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Candidates with min 50% marks in graduation can apply for direct profile assessment. Valid scores in CAT, XAT, MAT, CMAT, ATMA, or GMAT are accepted. Direct interviews (GD-PI) can be scheduled online or on-campus.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-slate-200 rounded-2xl p-4">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">Requirement 1</span>
                  <h5 className="font-extrabold text-slate-900 text-sm mt-1">Graduation Eligibility</h5>
                  <p className="text-xs text-slate-600 mt-1">Minimum 50% aggregate (45% for SC/ST). Final year students can apply provisionally.</p>
                </div>
                <div className="border border-slate-200 rounded-2xl p-4">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">Requirement 2</span>
                  <h5 className="font-extrabold text-slate-900 text-sm mt-1">Entrance Scores &amp; GD-PI</h5>
                  <p className="text-xs text-slate-600 mt-1">Accepts CAT/XAT/MAT/CMAT/ATMA or Institutional Aptitude Test followed by Personal Interview.</p>
                </div>
              </div>
            </div>
          )}

          {/* Modal Action Bar */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-slate-200">
            <button
              onClick={onInquire}
              className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black py-4 rounded-xl transition-all text-sm shadow-md shadow-blue-500/20 text-center flex items-center justify-center gap-2"
            >
              <span>Apply for Direct Admission 2027 →</span>
            </button>

            <a
              href={`https://wa.me/${college.whatsapp}?text=${encodeURIComponent(`Hi Mohit, I want direct admission details and fee structure for ${college.name} (Batch 2027-2029).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Counsellor</span>
            </a>

            {reviewSlug && (
              <Link
                href={`/blog/${reviewSlug}`}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-4 rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5"
              >
                <GraduationCap size={16} className="text-blue-600" />
                <span>Read Full Review</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Floating Compare Modal ── */
function CompareModal({
  colleges,
  onClose,
  onRemove,
  onInquire,
}: {
  colleges: MbaPgdmCollege[];
  onClose: () => void;
  onRemove: (slug: string) => void;
  onInquire: (college: MbaPgdmCollege) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto z-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Side-by-Side B-School Comparison ({colleges.length}/3)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[650px]">
            {colleges.map((college) => (
              <div
                key={college.universitySlug}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-blue-100 text-blue-800 rounded-md">
                      {college.grade}
                    </span>
                    <button
                      onClick={() => onRemove(college.universitySlug)}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove from comparison"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <h3 className="text-base font-black text-slate-900 leading-snug mb-1">{college.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                    <MapPin size={12} className="text-blue-600 shrink-0" />
                    <span>{college.location}</span>
                  </div>

                  <div className="space-y-3 text-xs divide-y divide-slate-200/70 border-y border-slate-200/70 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Total 2-Yr Fee</span>
                      <span className="font-black text-emerald-600 text-sm">{college.fee}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-slate-500 font-medium">Average Package</span>
                      <span className="font-black text-blue-700 text-sm">{college.avgPlacement || '₹8.5 LPA'}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-slate-500 font-medium">Highest CTC</span>
                      <span className="font-black text-amber-700 text-sm">{college.highestPlacement || '₹22.0 LPA'}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-slate-500 font-medium">Approvals</span>
                      <span className="font-bold text-slate-800 text-right">{college.approvals.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-slate-500 font-medium">Duration</span>
                      <span className="font-bold text-slate-800">{college.duration}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Key USPs</span>
                    <ul className="space-y-1.5 text-[11px] text-slate-700">
                      {college.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => {
                      onClose();
                      onInquire(college);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm"
                  >
                    Direct Apply 2027 →
                  </button>
                  <a
                    href={`https://wa.me/${college.whatsapp}?text=${encodeURIComponent(`Hi, I am comparing B-Schools. Please share admission counseling for ${college.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getReviewSlug(name: string): string | null {
  const n = name.toLowerCase();
  if (n.includes('new delhi institute of management') || n.includes('ndim')) return 'ndim-delhi-review-2026';
  if (n.includes('fostiima')) return 'fostiima-business-school-review-2026';
  if (n.includes('fortune institute of international business') || n.includes('fiib')) return 'fiib-delhi-review-2027';
  if (n.includes('lodhi road') || (n.includes('iilm') && n.includes('lodhi'))) return 'all-about-iilm-lodhi-road-delhi';
  if (n.includes('jims kalkaji')) return 'jims-kalkaji-review-2026';
  if (n.includes('management education & research institute') || n.includes('meri')) return 'all-about-meri-delhi';
  if (n.includes('delhi school of business')) return 'all-about-dsb-delhi';
  if (n.includes('empi')) return 'all-about-empi-delhi';
  if (n.includes('institute of marketing & management') || n.includes('imm')) return 'all-about-imm-delhi';
  if (n.includes('apeejay') || n.includes('asm apeejay')) return 'all-about-asm-apeejay-delhi';
  if (n.includes('jaipuria school of business') || (n.includes('jaipuria') && n.includes('ghaziabad'))) return 'all-about-jaipuria-school-of-business-ghaziabad';
  if (n.includes('its ghaziabad') || n.includes('i.t.s')) return 'all-about-its-ghaziabad';
  if (n.includes('jaipuria noida') || (n.includes('jaipuria') && n.includes('noida'))) return 'jaipuria-noida-review-2027';
  if (n.includes('hierank')) return 'all-about-hierank-noida';
  if (n.includes('gniot')) return 'all-about-gniot-greater-noida';
  if (n.includes('gl bajaj') || n.includes('g.l. bajaj')) return 'all-about-gl-bajaj-greater-noida';
  if (n.includes('accurate')) return 'all-about-accurate-greater-noida';
  if (n.includes('niet')) return 'all-about-niet-greater-noida';
  if (n.includes('i business institute') || n.includes('ibi')) return 'all-about-ibi-greater-noida';
  if (n.includes('lloyd')) return 'all-about-lloyd-business-school-greater-noida';
  if (n.includes('iilm greater noida')) return 'all-about-iilm-greater-noida';
  if (n.includes('bennett')) return 'all-about-bennett-university';
  if (n.includes('mangalmay')) return 'all-about-mangalmay-greater-noida';
  if (n.includes('sparsh')) return 'all-about-sparsh-global-greater-noida';
  if (n.includes('jk business') || n.includes('jkbs')) return 'all-about-jk-business-school-gurugram';
  if (n.includes('ibmr')) return 'all-about-ibmr-gurgaon';
  if (n.includes('isbs') || n.includes('isb&m')) return 'all-about-isbs-gurgaon';
  if (n.includes('bml munjal') || n.includes('bmu')) return 'all-about-bml-munjal-university';
  if (n.includes('soil')) return 'all-about-soil-gurgaon';
  if (n.includes('iilm gurugram') || n.includes('iilm gurgaon') || n.includes('iilm university')) return 'all-about-iilm-gurgaon';
  if (n.includes('st. andrews') || n.includes('saitm') || n.includes('st. andrew')) return 'all-about-st-andrews-gurgaon';
  if (n.includes('pibm') || n.includes('pune institute of business')) return 'all-about-pibm-pune';
  if (n.includes('lexicon') || n.includes('mile')) return 'all-about-lexicon-management-institute-of-leadership-excellence';
  if (n.includes('riim')) return 'all-about-riim-pune';
  if (n.includes('asm institute') || n.includes('asm ibmr')) return 'all-about-asm-ibmr';
  if (n.includes('d.y. patil') || n.includes('dy patil')) return 'all-about-dy-patil-b-school';
  if (n.includes('iiebm') || n.includes('indus')) return 'all-about-iiebm-pune';
  if (n.includes('akemi')) return 'all-about-akemi-business-school';
  if (n.includes('isms')) return 'all-about-isms-pune';
  if (n.includes('atlas')) return 'all-about-atlas-skilltech-mumbai';
  if (n.includes('ubs') || n.includes('universal')) return 'all-about-universal-ai-mumbai';
  if (n.includes('itm')) return 'all-about-itm-mumbai';
  if (n.includes('kothari')) return 'all-about-js-kothari-mumbai';
  if (n.includes('amity mumbai')) return 'all-about-amity-mumbai';
  if (n.includes('jagsom mumbai') || (n.includes('jagsom') && n.includes('karjat'))) return 'all-about-jagsom-mumbai';
  if (n.includes('isbr')) return 'all-about-isbr-bangalore';
  if (n.includes('iibs')) return 'all-about-iibs-bangalore';
  if (n.includes('gibs')) return 'all-about-gibs-bangalore';
  if (n.includes('alliance')) return 'all-about-alliance-university-bangalore';
  if (n.includes('isme')) return 'all-about-isme-bangalore';
  if (n.includes('indus business academy') || n.includes('iba bangalore')) return 'all-about-indus-business-academy';
  if (n.includes('jagsom bangalore') || (n.includes('jagsom') && n.includes('electronic city'))) return 'all-about-jagsom-bangalore';
  return null;
}

export default function MbaPgdmClient() {
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedFee, setSelectedFee] = useState(FEE_RANGES[0]);
  const [smartTag, setSmartTag] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const [selectedCollegeForInquiry, setSelectedCollegeForInquiry] = useState<MbaPgdmCollege | null>(null);
  const [selectedCollegeForDetail, setSelectedCollegeForDetail] = useState<MbaPgdmCollege | null>(null);
  const [comparedColleges, setComparedColleges] = useState<MbaPgdmCollege[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Filter & Sort Logic
  const filteredColleges = useMemo(() => {
    let result = MBA_PGDM_COLLEGES_2027.filter((c) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.accreditation.toLowerCase().includes(q) ||
        c.about.toLowerCase().includes(q) ||
        (c.programs && c.programs.some((p) => p.toLowerCase().includes(q))) ||
        (c.topRecruiters && c.topRecruiters.some((r) => r.toLowerCase().includes(q)));

      // Location match
      let matchesLocation = false;
      if (selectedLocation === 'All') {
        matchesLocation = true;
      } else if (selectedLocation === 'delhi-ncr') {
        const colLoc = c.location.toLowerCase();
        matchesLocation =
          colLoc.includes('delhi') ||
          colLoc.includes('noida') ||
          colLoc.includes('gurgaon') ||
          colLoc.includes('gurugram') ||
          colLoc.includes('ghaziabad');
      } else if (selectedLocation === 'west-central-delhi') {
        const colLoc = c.location.toLowerCase();
        matchesLocation =
          colLoc.includes('west delhi') ||
          colLoc.includes('dwarka') ||
          colLoc.includes('janakpuri') ||
          colLoc.includes('rohini') ||
          colLoc.includes('central delhi');
      } else if (selectedLocation === 'noida-gr-noida') {
        const colLoc = c.location.toLowerCase();
        matchesLocation = colLoc.includes('noida') || colLoc.includes('greater noida');
      } else {
        const colLoc = c.location.toLowerCase();
        const selLoc = selectedLocation.toLowerCase();
        if (selLoc === 'gurgaon') {
          matchesLocation = colLoc.includes('gurgaon') || colLoc.includes('gurugram');
        } else {
          matchesLocation = colLoc.includes(selLoc);
        }
      }

      // Fee match
      const matchesFee = c.feeNum >= selectedFee.min && c.feeNum <= selectedFee.max;

      // Smart Tag match
      let matchesTag = true;
      if (smartTag === 'high_roi') {
        matchesTag = c.feeNum <= 850000;
      } else if (smartTag === 'high_placement') {
        const num = parseFloat(c.avgPlacement?.replace(/[^\d.]/g, '') || '0');
        matchesTag = num >= 9.0;
      } else if (smartTag === 'top_ctc') {
        const num = parseFloat(c.highestPlacement?.replace(/[^\d.]/g, '') || '0');
        matchesTag = num >= 24.0;
      } else if (smartTag === 'aiu_nba') {
        const acc = (c.accreditation + ' ' + c.grade).toLowerCase();
        matchesTag = acc.includes('nba') || acc.includes('aiu') || acc.includes('aacsb');
      }

      return matchesSearch && matchesLocation && matchesFee && matchesTag;
    });

    // Sorting
    if (sortBy === 'fee_asc') {
      result.sort((a, b) => a.feeNum - b.feeNum);
    } else if (sortBy === 'fee_desc') {
      result.sort((a, b) => b.feeNum - a.feeNum);
    } else if (sortBy === 'avg_desc') {
      result.sort((a, b) => {
        const numA = parseFloat(a.avgPlacement?.replace(/[^\d.]/g, '') || '0');
        const numB = parseFloat(b.avgPlacement?.replace(/[^\d.]/g, '') || '0');
        return numB - numA;
      });
    } else if (sortBy === 'highest_desc') {
      result.sort((a, b) => {
        const numA = parseFloat(a.highestPlacement?.replace(/[^\d.]/g, '') || '0');
        const numB = parseFloat(b.highestPlacement?.replace(/[^\d.]/g, '') || '0');
        return numB - numA;
      });
    } else if (sortBy === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, selectedLocation, selectedFee, smartTag, sortBy]);

  const toggleCompare = (college: MbaPgdmCollege) => {
    if (comparedColleges.some((c) => c.universitySlug === college.universitySlug)) {
      setComparedColleges(comparedColleges.filter((c) => c.universitySlug !== college.universitySlug));
    } else {
      if (comparedColleges.length >= 3) {
        alert('You can compare up to 3 colleges at a time.');
        return;
      }
      setComparedColleges([...comparedColleges, college]);
    }
  };

  const isCompared = (slug: string) => comparedColleges.some((c) => c.universitySlug === slug);

  return (
    <section className="py-8 sm:py-12 bg-slate-50/70" id="colleges-directory">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">

        {/* ── SEARCH & FILTER PORTAL CONTROL PANEL ── */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-7 shadow-xl shadow-slate-900/5 mb-8 space-y-5">
          
          {/* Top Search Bar with Direct Search & View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
              <input
                type="text"
                placeholder="Search by college name, city (e.g. Dwarka, Pune, Bangalore), or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50/90 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all shadow-xs"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort & View Mode Switches */}
            <div className="flex items-center gap-2">
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs rounded-2xl pl-3.5 pr-8 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-xs"
                >
                  <option value="featured">🔥 Most Targeted (Recommended)</option>
                  <option value="fee_asc">💰 Fee: Low to High</option>
                  <option value="fee_desc">💎 Fee: High to Low</option>
                  <option value="avg_desc">📈 Highest Avg CTC</option>
                  <option value="highest_desc">🚀 Highest Placement CTC</option>
                  <option value="name_asc">🔤 Name: A to Z</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="bg-slate-100 p-1 rounded-2xl border border-slate-200 flex items-center shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-xl transition-all ${
                    viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid View"
                  aria-label="Grid View"
                >
                  <LayoutGrid size={17} />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2.5 rounded-xl transition-all ${
                    viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Table / List View"
                  aria-label="Table / List View"
                >
                  <List size={17} />
                </button>
              </div>
            </div>
          </div>

          {/* Location Filter Pills */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="flex items-center gap-1.5 text-xs font-black text-slate-600 uppercase tracking-wider">
                <MapPin size={14} className="text-blue-600" /> Filter by Campus Hub
              </label>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
              {LOCATION_FILTERS.map((loc) => (
                <button
                  key={loc.value}
                  onClick={() => setSelectedLocation(loc.value)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                    selectedLocation === loc.value
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-600/30'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
                  }`}
                >
                  <span>{loc.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Smart Feature Tags & Fee Filters */}
          <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Smart Feature Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {SMART_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSmartTag(tag.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                    smartTag === tag.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Fee Dropdown Pill */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-slate-500 uppercase">Fee:</span>
              <div className="relative">
                <select
                  value={selectedFee.label}
                  onChange={(e) => {
                    const found = FEE_RANGES.find((f) => f.label === e.target.value);
                    if (found) setSelectedFee(found);
                  }}
                  className="appearance-none bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl pl-3 pr-7 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-xs"
                >
                  {FEE_RANGES.map((f) => (
                    <option key={f.label} value={f.label}>
                      {f.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* ── RESULTS COUNTER BAR ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Showing <span className="text-blue-600">{filteredColleges.length}</span> Direct Admission Targeted Colleges
            </h2>
            <span className="hidden sm:inline-flex text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
              Batch 2027–2029
            </span>
          </div>

          {(selectedLocation !== 'All' || selectedFee.label !== 'All Fee Ranges' || smartTag !== 'all' || search !== '') && (
            <button
              onClick={() => {
                setSelectedLocation('All');
                setSelectedFee(FEE_RANGES[0]);
                setSmartTag('all');
                setSearch('');
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <RotateCcw size={13} />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* ── VIEW MODE: GRID CARDS (PORTAL CARDS) ── */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredColleges.map((college) => {
              const reviewSlug = getReviewSlug(college.name);
              const compared = isCompared(college.universitySlug);

              return (
                <div
                  key={college.universitySlug}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative"
                >
                  {/* Card Header with Brand Gradient */}
                  <div>
                    <div className={`bg-gradient-to-r ${college.gradeColor} p-5 sm:p-6 text-white relative`}>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                          {college.grade}
                        </span>
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                          {college.badge}
                        </span>
                      </div>

                      <h3 className="font-black text-lg sm:text-xl leading-snug tracking-tight mb-2 group-hover:text-amber-200 transition-colors">
                        {college.name}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                        <MapPin size={13} className="shrink-0 text-amber-300" />
                        <span className="truncate">{college.location}</span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Metric Bar: 3 Key Figures */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200/90 rounded-2xl p-3 text-center">
                        <div className="border-r border-slate-200">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">2-Yr Fee</span>
                          <span className="font-black text-emerald-600 text-xs sm:text-sm block truncate">{college.fee.split(' ')[0]}</span>
                        </div>
                        <div className="border-r border-slate-200">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Avg CTC</span>
                          <span className="font-black text-blue-700 text-xs sm:text-sm block truncate">{college.avgPlacement || '₹8.5 LPA'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Highest CTC</span>
                          <span className="font-black text-amber-700 text-xs sm:text-sm block truncate">{college.highestPlacement || '₹22.0 LPA'}</span>
                        </div>
                      </div>

                      {/* Direct Admission Status Strip */}
                      <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-emerald-800">
                        <span className="font-black flex items-center gap-1 text-[11px]">
                          <Sparkles size={13} className="text-emerald-600" />
                          Direct Admission 2027 Open
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700">Mgmt Quota Slabs</span>
                      </div>

                      {/* Snippet About */}
                      <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-normal">
                        {college.about}
                      </p>

                      {/* Key Highlights */}
                      <div className="space-y-1.5 pt-1">
                        {college.highlights.slice(0, 2).map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] font-semibold text-slate-700">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Specialization Chips */}
                      {college.specializations && college.specializations['PGDM'] && (
                        <div className="pt-1">
                          <div className="flex flex-wrap gap-1">
                            {college.specializations['PGDM'].slice(0, 3).map((spec) => (
                              <span key={spec} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                                {spec}
                              </span>
                            ))}
                            {college.specializations['PGDM'].length > 3 && (
                              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                +{college.specializations['PGDM'].length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Action Strip */}
                  <div className="p-5 sm:p-6 pt-0 space-y-2">
                    {/* Primary Direct Admission CTA */}
                    <button
                      onClick={() => setSelectedCollegeForInquiry(college)}
                      className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                    >
                      <span>⚡ Direct Apply / Inquiry</span>
                      <ArrowRight size={14} />
                    </button>

                    {/* Secondary Actions (WhatsApp + Review + Details) */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`https://wa.me/${college.whatsapp}?text=${encodeURIComponent(`Hi Mohit, I want direct admission details for ${college.name} (Batch 2027-2029).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle size={14} />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => setSelectedCollegeForDetail(college)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-xl text-xs transition-colors text-center"
                      >
                        Quick Details
                      </button>
                    </div>

                    {/* Tertiary Actions (Compare Checkbox + Review Link) */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        onClick={() => toggleCompare(college)}
                        className={`flex items-center gap-1.5 font-bold transition-colors ${
                          compared ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                            compared ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {compared && <Check size={10} />}
                        </div>
                        <span>Compare</span>
                      </button>

                      {reviewSlug ? (
                        <Link
                          href={`/blog/${reviewSlug}`}
                          className="font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                        >
                          <span>Full Review</span>
                          <ArrowRight size={12} />
                        </Link>
                      ) : (
                        <span className="text-slate-400 text-[11px]">AICTE Verified</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── VIEW MODE: COMPACT PORTAL TABLE (LIST VIEW) ── */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                    <th className="px-5 py-4">B-School &amp; Location</th>
                    <th className="px-5 py-4">Total 2-Yr Fee</th>
                    <th className="px-5 py-4">Avg Placement</th>
                    <th className="px-5 py-4">Highest CTC</th>
                    <th className="px-5 py-4">Approvals</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                  {filteredColleges.map((college) => {
                    const reviewSlug = getReviewSlug(college.name);
                    const compared = isCompared(college.universitySlug);

                    return (
                      <tr key={college.universitySlug} className="hover:bg-blue-50/40 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-extrabold text-slate-900 text-sm mb-0.5">{college.name}</div>
                          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                            <span className="flex items-center gap-1">
                              <MapPin size={11} className="text-blue-600" />
                              {college.location}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-emerald-600 font-bold">⚡ Direct Admission Open</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-black text-emerald-600 text-sm">{college.fee}</td>
                        <td className="px-5 py-4 font-black text-blue-700">{college.avgPlacement || '₹8.5 LPA'}</td>
                        <td className="px-5 py-4 font-black text-amber-700">{college.highestPlacement || '₹20.0 LPA'}</td>
                        <td className="px-5 py-4">
                          <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-200">
                            {college.grade}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setSelectedCollegeForInquiry(college)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
                            >
                              Direct Apply
                            </button>
                            <a
                              href={`https://wa.me/${college.whatsapp}?text=${encodeURIComponent(`Hi Mohit, I want details for ${college.name}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-1.5 rounded-lg border border-emerald-200 transition-colors"
                              title="WhatsApp Inquiry"
                            >
                              <MessageCircle size={15} />
                            </a>
                            <button
                              onClick={() => setSelectedCollegeForDetail(college)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-bold"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => toggleCompare(college)}
                              className={`p-1.5 rounded-lg border text-xs font-bold ${
                                compared ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                              }`}
                              title="Compare"
                            >
                              <Scale size={13} />
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

        {/* ── EMPTY STATE ── */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-lg mx-auto">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Search size={28} />
            </div>
            <p className="text-lg font-bold text-slate-800 mb-1">No Targeted Colleges Match Your Filters</p>
            <p className="text-sm text-slate-500 mb-5 font-normal">Try searching with a broader location or fee bracket.</p>
            <button
              onClick={() => {
                setSelectedLocation('All');
                setSelectedFee(FEE_RANGES[0]);
                setSmartTag('all');
                setSearch('');
              }}
              className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* ── FLOATING MULTI-COLLEGE COMPARE TRAY ── */}
      {comparedColleges.length > 0 && (
        <div className="fixed bottom-5 inset-x-4 max-w-2xl mx-auto z-40 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl border border-white/20 flex items-center justify-between gap-4 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">
              {comparedColleges.length}
            </div>
            <div>
              <p className="text-xs font-bold text-white">Compare B-Schools Side-by-Side</p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-300 font-normal truncate max-w-xs sm:max-w-sm">
                {comparedColleges.map((c) => c.name.split('(')[0]).join(' vs ')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Scale size={14} />
              <span>Compare Now</span>
            </button>
            <button
              onClick={() => setComparedColleges([])}
              className="text-slate-400 hover:text-white p-2 text-xs font-bold"
              title="Clear comparison"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* ── DIRECT INQUIRY MODAL ── */}
      {selectedCollegeForInquiry && (
        <InquiryModal
          college={selectedCollegeForInquiry}
          onClose={() => setSelectedCollegeForInquiry(null)}
        />
      )}

      {/* ── COLLEGE DETAIL MODAL ── */}
      {selectedCollegeForDetail && (
        <CollegeDetailModal
          college={selectedCollegeForDetail}
          onClose={() => setSelectedCollegeForDetail(null)}
          onInquire={() => {
            const c = selectedCollegeForDetail;
            setSelectedCollegeForDetail(null);
            setSelectedCollegeForInquiry(c);
          }}
        />
      )}

      {/* ── COMPARE MODAL ── */}
      {isCompareModalOpen && (
        <CompareModal
          colleges={comparedColleges}
          onClose={() => setIsCompareModalOpen(false)}
          onRemove={(slug) => setComparedColleges(comparedColleges.filter((c) => c.universitySlug !== slug))}
          onInquire={(college) => {
            setIsCompareModalOpen(false);
            setSelectedCollegeForInquiry(college);
          }}
        />
      )}
    </section>
  );
}
