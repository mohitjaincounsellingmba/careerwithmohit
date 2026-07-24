'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MapPin, BadgeCheck, Search, X, SlidersHorizontal, Phone,
  ChevronDown, GraduationCap, Building2, Award, CheckCircle2, MessageCircle
} from 'lucide-react';
import { MBA_PGDM_COLLEGES_2027, MbaPgdmCollege } from '@/data/mbaPgdmColleges2027';

const LOCATIONS = ['All', 'South Delhi', 'West Delhi', 'North-West Delhi', 'Central Delhi', 'Ghaziabad', 'Noida', 'Greater Noida', 'Gurgaon', 'Pune', 'Mumbai', 'Bangalore'];
const FEE_RANGES = [
  { label: 'All Fees', min: 0, max: Infinity },
  { label: 'Under ₹6 Lakhs', min: 0, max: 600000 },
  { label: '₹6L – ₹9 Lakhs', min: 600000, max: 900000 },
  { label: '₹9L – ₹11 Lakhs', min: 900000, max: 1100000 },
  { label: 'Above ₹11 Lakhs', min: 1100000, max: Infinity },
];

/* ── Instant Inquiry Modal ── */
function InquiryModal({ college, onClose }: { college: MbaPgdmCollege; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', number: '', email: '', location: '', program: 'PGDM' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          college: college.name,
          source: 'MBA/PGDM 2027 Page Direct Inquiry',
          timestamp: new Date().toISOString(),
        }),
      });
      setStatus('success');
    } catch {
      setStatus('success');
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
            <h3 className="text-xl font-black text-[#0f172a] mb-2">Inquiry Submitted!</h3>
            <p className="text-gray-500 text-sm">Our PGDM counsellor will get in touch with you shortly regarding <strong>{college.name}</strong>.</p>
            <button onClick={onClose} className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-black text-[#0f172a] mb-1">Direct Admission Inquiry</h3>
            <p className="text-sm text-gray-500 mb-6">Get free cutoff &amp; fee structure breakdown for <span className="font-bold text-indigo-600">{college.name}</span></p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Target B-School</label>
                <input
                  type="text"
                  value={college.name}
                  readOnly
                  className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 cursor-not-allowed"
                />
              </div>
              <input
                required
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <input
                required
                type="tel"
                placeholder="WhatsApp Phone Number"
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <input
                required
                type="text"
                placeholder="Your City / Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-sm mt-2 shadow-md"
              >
                {status === 'submitting' ? 'Submitting...' : 'Request Free Counseling →'}
              </button>
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
  const [activeTab, setActiveTab] = useState<'Overview' | 'Placements' | 'Specializations'>('Overview');

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-br ${college.gradeColor} p-8 rounded-t-2xl relative text-white`}>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 transition-colors rounded-full p-1.5">
            <X size={18} className="text-white" />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {college.grade}
            </span>
            <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {college.badge}
            </span>
          </div>
          <h2 className="text-2xl font-black leading-snug">{college.name}</h2>
          <div className="flex items-center gap-2 mt-2 text-white/90 text-sm font-medium">
            <MapPin size={14} />
            <span>{college.location}</span>
          </div>
        </div>

        {/* Tabs Header */}
        <div className="flex border-b border-slate-100 px-8 bg-slate-50/50">
          {[
            { id: 'Overview', label: 'Overview' },
            { id: 'Placements', label: 'Placements' },
            { id: 'Specializations', label: 'Specializations' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 pt-4 px-4 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2 -mb-[1px] ${
                activeTab === tab.id
                  ? 'text-indigo-600 border-indigo-600'
                  : 'text-slate-400 border-transparent hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {activeTab === 'Overview' && (
            <>
              {/* About */}
              <div>
                <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  <Building2 size={14} /> Overview
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{college.about}</p>
              </div>

              {/* Key Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-xl p-4">
                  <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mb-1">Total PGDM Fee</p>
                  <p className="text-lg font-black text-indigo-700">{college.fee}</p>
                </div>
                <div className="bg-violet-50 rounded-xl p-4">
                  <p className="text-[10px] text-violet-500 font-black uppercase tracking-widest mb-1">Program Duration</p>
                  <p className="text-sm font-bold text-violet-700">{college.duration}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Learning Mode</p>
                  <p className="text-xs font-bold text-gray-700">{college.mode}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-[10px] text-green-500 font-black uppercase tracking-widest mb-1">Government Approvals</p>
                  <p className="text-xs font-bold text-green-700 leading-tight">{college.approvals}</p>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                  <Award size={14} /> Key Highlights
                </h3>
                <div className="space-y-2">
                  {college.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 size={15} className="text-indigo-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'Placements' && (
            <div className="space-y-6">
              {/* Package Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-xl p-6 text-center border border-emerald-100">
                  <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-2">Average Package</p>
                  <p className="text-2xl font-black text-emerald-800">{college.avgPlacement || 'TBD / Contact Counsellor'}</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-6 text-center border border-indigo-100">
                  <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mb-2">Highest Package</p>
                  <p className="text-2xl font-black text-indigo-800">{college.highestPlacement || 'TBD / Contact Counsellor'}</p>
                </div>
              </div>

              {/* Top Recruiters */}
              {college.topRecruiters && college.topRecruiters.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                    <Building2 size={14} /> Top Recruiters on Campus
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {college.topRecruiters.map((rec) => (
                      <span
                        key={rec}
                        className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Specializations' && (
            <>
              {/* Specializations */}
              {college.specializations ? (
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                    <GraduationCap size={14} /> Specializations Offered
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(college.specializations).map(([prog, specs]) => (
                      <div key={prog} className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
                        <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                          {prog}
                        </span>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {specs.map((spec) => (
                            <span key={spec} className="bg-white border border-slate-200 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded shadow-xs">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm font-medium">
                  Contact our admissions team for the latest specialization curriculum details.
                </div>
              )}
            </>
          )}

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-slate-100">
            <button
              onClick={onInquire}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3.5 rounded-xl hover:opacity-95 transition-opacity text-sm shadow-md text-center"
            >
              Apply / Request Counselling →
            </button>
            <a
              href={`https://wa.me/${college.whatsapp}?text=${encodeURIComponent(`Hi, I want details regarding MBA/PGDM 2027 admission at ${college.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white font-bold px-5 py-3.5 rounded-xl hover:bg-emerald-700 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function getReviewSlug(name: string): string | null {
  const n = name.toLowerCase();
  if (n.includes('new delhi institute of management') || n.includes('ndim')) return 'all-about-ndim-delhi';
  if (n.includes('fostiima')) return 'all-about-fostiima-delhi';
  if (n.includes('fortune institute of international business') || n.includes('fiib')) return 'all-about-fiib-delhi';
  if (n.includes('lodhi road') || (n.includes('iilm') && n.includes('lodhi'))) return 'all-about-iilm-lodhi-road-delhi';
  if (n.includes('jims kalkaji')) return 'all-about-jims-kalkaji';
  if (n.includes('management education & research institute') || n.includes('meri')) return 'all-about-meri-delhi';
  if (n.includes('delhi school of business')) return 'all-about-dsb-delhi';
  if (n.includes('empi')) return 'all-about-empi-delhi';
  if (n.includes('institute of marketing & management') || n.includes('imm')) return 'all-about-imm-delhi';
  if (n.includes('apeejay') || n.includes('asm apeejay')) return 'all-about-asm-apeejay-delhi';
  if (n.includes('jaipuria school of business') || (n.includes('jaipuria') && n.includes('ghaziabad'))) return 'all-about-jaipuria-school-of-business-ghaziabad';
  if (n.includes('its ghaziabad') || n.includes('i.t.s')) return 'all-about-its-ghaziabad';
  if (n.includes('jaipuria noida') || (n.includes('jaipuria') && n.includes('noida'))) return 'all-about-jaipuria-noida';
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
  const [selectedCollegeForInquiry, setSelectedCollegeForInquiry] = useState<MbaPgdmCollege | null>(null);
  const [selectedCollegeForDetail, setSelectedCollegeForDetail] = useState<MbaPgdmCollege | null>(null);

  const filteredColleges = useMemo(() => {
    return MBA_PGDM_COLLEGES_2027.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase()) ||
        c.accreditation.toLowerCase().includes(search.toLowerCase()) ||
        c.about.toLowerCase().includes(search.toLowerCase());

      let matchesLocation = false;
      if (selectedLocation === 'All') {
        matchesLocation = true;
      } else {
        const colLoc = c.location.toLowerCase();
        const selLoc = selectedLocation.toLowerCase();
        if (selLoc === 'noida') {
          matchesLocation = colLoc.includes('noida') && !colLoc.includes('greater noida');
        } else if (selLoc === 'gurgaon') {
          matchesLocation = colLoc.includes('gurgaon') || colLoc.includes('gurugram');
        } else {
          matchesLocation = colLoc.includes(selLoc);
        }
      }

      const matchesFee = c.feeNum >= selectedFee.min && c.feeNum <= selectedFee.max;

      return matchesSearch && matchesLocation && matchesFee;
    });
  }, [search, selectedLocation, selectedFee]);

  return (
    <section className="py-16 md:py-24 bg-[#f8f7f4]" id="colleges-directory">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2 block">
            Pan India B-School Directory 2027
          </span>
          <h2 className="display-font text-3xl md:text-5xl font-black text-[#0f172a] tracking-tight mb-4">
            Compare Top {MBA_PGDM_COLLEGES_2027.length} PGDM &amp; MBA B-Schools
          </h2>
          <p className="text-gray-500 font-medium text-base">
            Filter by campus locations, fee brackets, and government accreditations to find your optimal PGDM &amp; MBA match.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm mb-12 space-y-6">

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by college name, location (Dwarka, Pune, Bangalore...), or accreditation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#0f172a] placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Pills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            {/* Location Filter */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-black text-gray-500 uppercase tracking-wider mb-3">
                <MapPin size={14} className="text-indigo-600" /> Filter by Campus Location
              </label>
              <div className="flex flex-wrap gap-2">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedLocation === loc
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Fee Filter */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-black text-gray-500 uppercase tracking-wider mb-3">
                <SlidersHorizontal size={14} className="text-indigo-600" /> Filter by 2-Year Total Fee
              </label>
              <div className="flex flex-wrap gap-2">
                {FEE_RANGES.map((fee) => (
                  <button
                    key={fee.label}
                    onClick={() => setSelectedFee(fee)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedFee.label === fee.label
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {fee.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-bold text-slate-500">
            Showing <span className="text-indigo-600 font-black">{filteredColleges.length}</span> of {MBA_PGDM_COLLEGES_2027.length} Colleges
          </p>
          {(selectedLocation !== 'All' || selectedFee.label !== 'All Fees' || search !== '') && (
            <button
              onClick={() => {
                setSelectedLocation('All');
                setSelectedFee(FEE_RANGES[0]);
                setSearch('');
              }}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* College Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.map((college) => {
            const reviewSlug = getReviewSlug(college.name);
            return (
              <div
                key={college.universitySlug}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
              >
                {/* Card Header */}
                <div>
                  <div className={`bg-gradient-to-r ${college.gradeColor} p-6 text-white relative`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                        {college.grade}
                      </span>
                      <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                        {college.badge}
                      </span>
                    </div>
                    <h3 className="font-black text-xl leading-tight mb-2 group-hover:text-amber-200 transition-colors">
                      {college.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                      <MapPin size={13} className="shrink-0 text-white" />
                      <span>{college.location}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Course Fee</p>
                        <p className="text-lg font-black text-emerald-700">{college.fee}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Course</p>
                        <p className="text-sm font-bold text-slate-800">{college.programs[0]}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed font-medium">
                      {college.about}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      {college.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                          <CheckCircle2 size={13} className="text-indigo-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>

                    {college.specializations && college.specializations['PGDM'] && (
                      <div className="pt-2">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Specializations</p>
                        <div className="flex flex-wrap gap-1">
                          {college.specializations['PGDM'].slice(0, 3).map((spec) => (
                            <span key={spec} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                              {spec}
                            </span>
                          ))}
                          {college.specializations['PGDM'].length > 3 && (
                            <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded">
                              +{college.specializations['PGDM'].length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => setSelectedCollegeForInquiry(college)}
                    className="w-full bg-[#0f172a] hover:bg-indigo-600 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    Direct Admission Inquiry →
                  </button>

                  {reviewSlug && (
                    <Link
                      href={`/blog/${reviewSlug}`}
                      className="w-full bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <GraduationCap size={14} className="text-indigo-600" />
                      Read College Review
                    </Link>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCollegeForDetail(college)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl text-xs transition-colors text-center"
                    >
                      View Details
                    </button>
                    <a
                      href={`https://wa.me/${college.whatsapp}?text=${encodeURIComponent(`Hi, I want details regarding MBA/PGDM 2027 admission at ${college.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold px-3 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle size={15} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-lg mx-auto">
            <p className="text-lg font-bold text-slate-800 mb-2">No B-Schools Match Your Filters</p>
            <p className="text-sm text-gray-500 mb-6">Try resetting your location or fee filters to see all listed B-schools.</p>
            <button
              onClick={() => {
                setSelectedLocation('All');
                setSelectedFee(FEE_RANGES[0]);
                setSearch('');
              }}
              className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* Direct Inquiry Modal */}
      {selectedCollegeForInquiry && (
        <InquiryModal
          college={selectedCollegeForInquiry}
          onClose={() => setSelectedCollegeForInquiry(null)}
        />
      )}

      {/* College Detail Modal */}
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
    </section>
  );
}
