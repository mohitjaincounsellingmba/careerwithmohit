'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Building2,
  MapPin,
  DollarSign,
  GraduationCap,
  Award,
  Clock,
  CheckCircle2,
  Phone,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Briefcase,
  HelpCircle,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { CountryDestination } from '@/data/abroadDestinations';

interface Props {
  destination: CountryDestination;
}

export default function CountryStudyAbroadClient({ destination }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('all');

  const filteredColleges = useMemo(() => {
    return destination.colleges.filter((c) => {
      const matchesSearch =
        !searchQuery.trim() ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (c.programs && c.programs.some((p: string) => p.toLowerCase().includes(searchQuery.toLowerCase().trim())));

      const matchesDegree =
        degreeFilter === 'all' ||
        (degreeFilter === 'ug' && (c.programs?.some((p: string) => p.toLowerCase().includes('undergraduate') || p.toLowerCase().includes('ug') || p.toLowerCase().includes('bs') || p.toLowerCase().includes('bba')))) ||
        (degreeFilter === 'pg' && (c.programs?.some((p: string) => p.toLowerCase().includes('graduate') || p.toLowerCase().includes('pg') || p.toLowerCase().includes('ms') || p.toLowerCase().includes('master')))) ||
        (degreeFilter === 'mba' && (c.programs?.some((p: string) => p.toLowerCase().includes('mba') || p.toLowerCase().includes('business') || p.toLowerCase().includes('management'))));

      return matchesSearch && matchesDegree;
    });
  }, [destination.colleges, searchQuery, degreeFilter]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-body">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0D233E] to-[#123058] text-white pt-24 pb-20 md:pt-28 md:pb-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/abroad-education" className="hover:text-white transition-colors">Abroad Education</Link>
            <span>/</span>
            <span className="text-amber-400 font-bold">{destination.country}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-3xl">{destination.flag}</span>
            <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${destination.badgeColor}`}>
              {destination.badge}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
              {destination.visaType}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 max-w-4xl">
            {destination.h1}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-3xl mb-10 leading-relaxed">
            {destination.subheading}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Clock className="w-4 h-4 text-amber-400" /> Post-Study Work
              </p>
              <p className="text-sm sm:text-base font-extrabold text-white leading-tight">{destination.optDuration}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <DollarSign className="w-4 h-4 text-emerald-400" /> Average Tuition
              </p>
              <p className="text-sm sm:text-base font-extrabold text-emerald-300 leading-tight">{destination.avgTuition}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Award className="w-4 h-4 text-sky-400" /> Average Starting Pay
              </p>
              <p className="text-sm sm:text-base font-extrabold text-sky-300 leading-tight">{destination.avgSalary}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Building2 className="w-4 h-4 text-purple-400" /> Listed Institutions
              </p>
              <p className="text-sm sm:text-base font-extrabold text-purple-300 leading-tight">
                {destination.colleges.length > 0 ? `${destination.colleges.length}+ Universities` : 'Premier Global Hub'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. KEY HIGHLIGHTS & DEGREE TRACKS ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 mb-14">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Highlights Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-extrabold text-slate-900">Why Study in {destination.country}?</h2>
            </div>
            <ul className="space-y-3">
              {destination.highlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Degree Pathways */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-extrabold text-slate-900">In-Demand Degree Specializations</h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {destination.popularDegrees.map((deg, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                    {deg}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-3 mt-4">
              <div>
                <p className="text-xs font-bold text-slate-900">Need University Shortlisting?</p>
                <p className="text-[11px] text-slate-500">1-on-1 Profile Assessment with Mohit Jain</p>
              </div>
              <a
                href={`https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20to%20apply%20for%20higher%20studies%20in%20${encodeURIComponent(destination.country)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" /> WhatsApp Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DIRECTORY OF UNIVERSITIES IN THIS COUNTRY ── */}
      {destination.colleges.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Top Universities in {destination.country}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {filteredColleges.length} accredited universities with verified 2027 fee structures
              </p>
            </div>

            {/* Search Input & Filter Tabs */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search university or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex rounded-xl bg-slate-200/80 p-1 text-xs font-bold text-slate-700">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'pg', label: 'MS / Masters' },
                  { id: 'mba', label: 'MBA' },
                  { id: 'ug', label: 'UG' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setDegreeFilter(tab.id)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      degreeFilter === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* College Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredColleges.slice(0, 30).map((col: any, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-black text-sm text-blue-700 uppercase shrink-0">
                      {col.name.charAt(0)}
                    </div>
                    {col.fee && (
                      <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                        {col.fee}
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                    {col.name}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{col.location}</span>
                  </p>

                  {col.programs && col.programs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {col.programs.slice(0, 3).map((prog: string, pIdx: number) => (
                        <span key={pIdx} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {prog}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {col.website ? (
                    <a
                      href={`https://${col.website.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1"
                    >
                      <span>Website</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">Verified Campus</span>
                  )}

                  <a
                    href={`https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20am%20interested%20in%20applying%20to%20${encodeURIComponent(col.name)}%20in%20${encodeURIComponent(destination.country)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" /> Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredColleges.length > 30 && (
            <div className="mt-8 text-center">
              <p className="text-xs text-slate-500 mb-3">
                Showing 30 of {filteredColleges.length} universities. Connect with counsellor for the complete country database.
              </p>
              <Link
                href="/book-session"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
              >
                Book Free University Consultation
              </Link>
            </div>
          )}
        </section>
      )}

      {/* ── 4. VISA, ADMISSIONS & TIMELINE GUIDE ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Visa & Eligibility</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Category: <strong className="text-white">{destination.visaType}</strong>. Requires university acceptance (I-20, CAS, LoA, or APS), proof of funds, and language proficiency.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li>• Estimated Living: {destination.livingCost}</li>
                <li>• Major Intakes: {destination.intakes}</li>
              </ul>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Work & Career Rights</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Post-Study Authorization: <strong className="text-emerald-300">{destination.optDuration}</strong>. Allows full-time corporate employment across tech, engineering, and finance.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li>• Median Salary: {destination.avgSalary}</li>
                <li>• Part-Time Work: 20-24 hrs/week allowed</li>
              </ul>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Exam Requirements</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Standardized exams required for 2026–2027 admissions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {destination.examRequirements.map((ex, i) => (
                  <span key={i} className="text-[11px] font-semibold bg-white/10 text-slate-200 px-2.5 py-1 rounded-lg border border-white/10">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FAQS ACCORDION ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Studying in {destination.country}: What You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {destination.faqs.map((faq, idx) => (
            <details key={idx} className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" open={idx === 0}>
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors">
                <span>{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── 6. DIRECT CALL TO ACTION ── */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 py-14 px-6 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-3xl">{destination.flag}</span>
          <h2 className="text-2xl sm:text-4xl font-black">
            Ready to Apply to {destination.country} for 2027?
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Get personalized university shortlisting, SOP/LOR drafting, scholarship checks, and visa file support directly with Mohit Jain.
          </p>
          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20to%20apply%20for%20higher%20education%20in%20${encodeURIComponent(destination.country)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <Phone className="w-4 h-4" /> WhatsApp Consultation
            </a>
            <Link
              href="/book-session"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all"
            >
              Book 1-on-1 Video Session
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
