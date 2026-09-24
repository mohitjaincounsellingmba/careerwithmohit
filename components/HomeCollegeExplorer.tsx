'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Building2,
  MapPin,
  IndianRupee,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Laptop,
  Cpu,
  Percent,
  Star
} from 'lucide-react';

interface CollegeData {
  id: string;
  name: string;
  category: 'iim' | 'premier' | 'online' | 'roi' | 'btech';
  location: string;
  fees: string;
  avgPlacement: string;
  highestPlacement?: string;
  cutoff: string;
  ranking: string;
  exams: string[];
  tag: string;
  tagColor: string;
  slug: string;
  rating: string;
}

const FEATURED_COLLEGES: CollegeData[] = [
  // Top IIMs
  {
    id: 'iim-a',
    name: 'IIM Ahmedabad (Indian Institute of Management)',
    category: 'iim',
    location: 'Ahmedabad, Gujarat',
    fees: '₹26.5 Lakhs (Total)',
    avgPlacement: '₹35.22 LPA',
    highestPlacement: '₹1.15 Cr',
    cutoff: '99.5+ CAT %ile',
    ranking: 'NIRF #1 Management',
    exams: ['CAT'],
    tag: 'Govt • Elite Tier',
    tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
    slug: 'colleges/iim-ahmedabad',
    rating: '4.9'
  },
  {
    id: 'iim-b',
    name: 'IIM Bangalore (Indian Institute of Management)',
    category: 'iim',
    location: 'Bangalore, Karnataka',
    fees: '₹24.5 Lakhs (Total)',
    avgPlacement: '₹33.50 LPA',
    highestPlacement: '₹1.15 Cr',
    cutoff: '99.0+ CAT %ile',
    ranking: 'NIRF #2 Management',
    exams: ['CAT'],
    tag: 'Govt • Elite Tier',
    tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
    slug: 'colleges/iim-bangalore',
    rating: '4.9'
  },
  {
    id: 'iim-c',
    name: 'IIM Calcutta (Indian Institute of Management)',
    category: 'iim',
    location: 'Kolkata, West Bengal',
    fees: '₹27.0 Lakhs (Total)',
    avgPlacement: '₹35.07 LPA',
    highestPlacement: '₹1.20 Cr',
    cutoff: '99.0+ CAT %ile',
    ranking: 'NIRF #3 Management',
    exams: ['CAT'],
    tag: 'Govt • Finance Hub',
    tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
    slug: 'colleges/iim-calcutta',
    rating: '4.9'
  },
  {
    id: 'iim-l',
    name: 'IIM Lucknow',
    category: 'iim',
    location: 'Lucknow, Uttar Pradesh',
    fees: '₹20.7 Lakhs (Total)',
    avgPlacement: '₹32.20 LPA',
    highestPlacement: '₹65.0 LPA',
    cutoff: '98.0+ CAT %ile',
    ranking: 'NIRF #6 Management',
    exams: ['CAT'],
    tag: 'Govt • Top 6 IIM',
    tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
    slug: 'colleges/iim-lucknow',
    rating: '4.8'
  },

  // Premier Non-IIMs
  {
    id: 'xlri',
    name: 'XLRI Jamshedpur (Xavier School of Management)',
    category: 'premier',
    location: 'Jamshedpur, Jharkhand',
    fees: '₹28.6 Lakhs (Total)',
    avgPlacement: '₹32.70 LPA',
    highestPlacement: '₹78.2 LPA',
    cutoff: '95+ XAT %ile',
    ranking: 'NIRF #9 • Asia #1 HR',
    exams: ['XAT', 'GMAT'],
    tag: 'Private • Tier-1 Non-IIM',
    tagColor: 'bg-purple-100 text-purple-900 border-purple-300',
    slug: 'colleges/xlri-jamshedpur',
    rating: '4.9'
  },
  {
    id: 'nmims-mumbai',
    name: 'NMIMS School of Business Management (SBM)',
    category: 'premier',
    location: 'Mumbai, Maharashtra',
    fees: '₹23.9 Lakhs (Total)',
    avgPlacement: '₹26.63 LPA',
    highestPlacement: '₹67.8 LPA',
    cutoff: '235+ NMAT Score',
    ranking: 'NIRF #21 • AACSB',
    exams: ['NMAT'],
    tag: 'Mumbai Financial Hub',
    tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    slug: 'colleges/nmims-mumbai',
    rating: '4.8'
  },
  {
    id: 'sibm-pune',
    name: 'SIBM Pune (Symbiosis Institute of Business Management)',
    category: 'premier',
    location: 'Lavale, Pune, Maharashtra',
    fees: '₹24.2 Lakhs (Total)',
    avgPlacement: '₹26.77 LPA',
    highestPlacement: '₹49.0 LPA',
    cutoff: '98.5+ SNAP %ile',
    ranking: 'NIRF #17 • Symbiosis Flagship',
    exams: ['SNAP'],
    tag: 'Symbiosis Flagship',
    tagColor: 'bg-rose-100 text-rose-900 border-rose-300',
    slug: 'colleges/sibm-pune',
    rating: '4.8'
  },
  {
    id: 'imt-ghaziabad',
    name: 'IMT Ghaziabad (Institute of Management Technology)',
    category: 'premier',
    location: 'Ghaziabad, Delhi NCR',
    fees: '₹21.5 Lakhs (Total)',
    avgPlacement: '₹17.35 LPA',
    highestPlacement: '₹65.6 LPA',
    cutoff: '90+ CAT / XAT',
    ranking: 'AACSB Accredited • Top Mktg',
    exams: ['CAT', 'XAT'],
    tag: 'Delhi NCR #1 Marketing',
    tagColor: 'bg-blue-100 text-blue-900 border-blue-300',
    slug: 'colleges/imt-ghaziabad',
    rating: '4.7'
  },

  // High ROI (< ₹10L)
  {
    id: 'fms-delhi',
    name: 'FMS Delhi (Faculty of Management Studies)',
    category: 'roi',
    location: 'New Delhi, Delhi NCR',
    fees: '₹2.0 Lakhs (Total 2-Yr)',
    avgPlacement: '₹34.10 LPA',
    highestPlacement: '₹1.23 Cr',
    cutoff: '99.0+ CAT %ile',
    ranking: 'ROI Multiplier: 17x',
    exams: ['CAT'],
    tag: '17x Payback • DU Govt',
    tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    slug: 'colleges/fms-delhi',
    rating: '4.9'
  },
  {
    id: 'dbe-du',
    name: 'DBE Delhi University (Business Economics)',
    category: 'roi',
    location: 'New Delhi, Delhi NCR',
    fees: '₹48,000 (Total 2-Yr)',
    avgPlacement: '₹14.20 LPA',
    highestPlacement: '₹32.0 LPA',
    cutoff: '93+ CAT %ile',
    ranking: 'ROI Multiplier: 28x',
    exams: ['CAT'],
    tag: '28x Payback • DU Govt',
    tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    slug: 'colleges/dbe-delhi-university',
    rating: '4.7'
  },
  {
    id: 'dse-delhi',
    name: 'DSE Delhi School of Economics (MBA HRD & IB)',
    category: 'roi',
    location: 'New Delhi, Delhi NCR',
    fees: '₹32,000 (Total 2-Yr)',
    avgPlacement: '₹14.50 LPA',
    highestPlacement: '₹32.0 LPA',
    cutoff: '94+ CAT %ile',
    ranking: 'ROI Multiplier: 30x',
    exams: ['CAT'],
    tag: '30x Payback • DU Govt',
    tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    slug: 'colleges/dse-delhi',
    rating: '4.8'
  },
  {
    id: 'jbims-mumbai',
    name: 'JBIMS Mumbai (Jamnalal Bajaj Institute)',
    category: 'roi',
    location: 'Mumbai, Maharashtra',
    fees: '₹6.0 Lakhs (Total 2-Yr)',
    avgPlacement: '₹28.02 LPA',
    highestPlacement: '₹44.0 LPA',
    cutoff: '99.9+ MAH CET / CAT',
    ranking: 'CEO Factory of India',
    exams: ['MAH CET', 'CAT'],
    tag: 'Highest ROI Maharashtra',
    tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    slug: 'colleges/jbims-mumbai',
    rating: '4.9'
  },

  // Online Degrees
  {
    id: 'amity-online',
    name: 'Amity University Online (MBA / MCA / BBA)',
    category: 'online',
    location: 'Noida / 100% Online',
    fees: '₹1.99 Lakhs (2-Yr EMI)',
    avgPlacement: 'Placement Support',
    highestPlacement: '₹18 LPA',
    cutoff: 'Direct / 50% in Grad',
    ranking: 'UGC-DEB • NAAC A+ • WES',
    exams: ['Direct Admission'],
    tag: 'WES Approved • Canada/USA',
    tagColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    slug: 'online-degree-certification/amity-university-online',
    rating: '4.8'
  },
  {
    id: 'jain-online',
    name: 'Jain University Online (JAIN Deemed-to-be-Univ)',
    category: 'online',
    location: 'Bangalore / 100% Online',
    fees: '₹1.96 Lakhs (2-Yr EMI)',
    avgPlacement: 'Bangalore Tech Connect',
    highestPlacement: '₹21 LPA',
    cutoff: 'Direct / 50% in Grad',
    ranking: 'UGC-DEB • NAAC A++ (3.71)',
    exams: ['Direct Admission'],
    tag: 'NAAC A++ Entitled',
    tagColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    slug: 'online-degree-certification/jain-university-online',
    rating: '4.8'
  },
  {
    id: 'lpu-online',
    name: 'LPU Online (Lovely Professional University)',
    category: 'online',
    location: 'Punjab / 100% Online',
    fees: '₹1.61 Lakhs (2-Yr EMI)',
    avgPlacement: 'Career Support',
    highestPlacement: '₹15 LPA',
    cutoff: 'Direct / 50% in Grad',
    ranking: 'UGC-DEB • NAAC A++',
    exams: ['Direct Admission'],
    tag: 'Award Winning LMS',
    tagColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    slug: 'online-degree-certification/lovely-professional-university-lpu-online',
    rating: '4.7'
  },
  {
    id: 'cu-online',
    name: 'Chandigarh University Online (CU Online)',
    category: 'online',
    location: 'Chandigarh / 100% Online',
    fees: '₹1.65 Lakhs (2-Yr EMI)',
    avgPlacement: 'Fortune 500 Network',
    highestPlacement: '₹16 LPA',
    cutoff: 'Direct / 50% in Grad',
    ranking: 'UGC-DEB • NAAC A+ • QS Ranked',
    exams: ['Direct Admission'],
    tag: 'QS World Ranked',
    tagColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    slug: 'online-degree-certification/chandigarh-university-online',
    rating: '4.7'
  },

  // BTech Hubs
  {
    id: 'iit-delhi',
    name: 'IIT Delhi (Indian Institute of Technology)',
    category: 'btech',
    location: 'Hauz Khas, New Delhi',
    fees: '₹8.5 Lakhs (4-Yr Total)',
    avgPlacement: '₹25.8 LPA',
    highestPlacement: '₹2.0 Cr',
    cutoff: 'JEE Advanced Rank < 2000',
    ranking: 'NIRF #2 Engineering',
    exams: ['JEE Advanced'],
    tag: 'Govt • Top Tech Institute',
    tagColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    slug: 'colleges/iit-delhi',
    rating: '4.9'
  },
  {
    id: 'iiit-delhi',
    name: 'IIIT Delhi (Indraprastha Institute of IT)',
    category: 'btech',
    location: 'Okhla, New Delhi',
    fees: '₹18.0 Lakhs (4-Yr Total)',
    avgPlacement: '₹23.7 LPA',
    highestPlacement: '₹51.3 LPA',
    cutoff: 'JEE Main 98+ %ile (JAC)',
    ranking: 'Premier CS & AI Hub',
    exams: ['JEE Main (JAC Delhi)'],
    tag: 'Govt Autonomous • CS/AI',
    tagColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    slug: 'colleges/iiit-delhi',
    rating: '4.8'
  },
  {
    id: 'dtu-delhi',
    name: 'DTU (Delhi Technological University)',
    category: 'btech',
    location: 'Rohini, New Delhi',
    fees: '₹9.2 Lakhs (4-Yr Total)',
    avgPlacement: '₹16.5 LPA',
    highestPlacement: '₹82.0 LPA',
    cutoff: 'JEE Main Rank (JAC Delhi)',
    ranking: 'NIRF Top 30 • DCE Legacy',
    exams: ['JEE Main (JAC Delhi)'],
    tag: 'Delhi Govt • Tech Legacy',
    tagColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    slug: 'colleges/delhi-technological-university-dtu',
    rating: '4.8'
  },
  {
    id: 'coep-pune',
    name: 'COEP Technological University Pune',
    category: 'btech',
    location: 'Shivajinagar, Pune, Maharashtra',
    fees: '₹4.5 Lakhs (4-Yr Total)',
    avgPlacement: '₹12.8 LPA',
    highestPlacement: '₹50.5 LPA',
    cutoff: 'MHT CET 99+ %ile / JEE',
    ranking: '3rd Oldest Engg College in Asia',
    exams: ['MHT CET', 'JEE Main'],
    tag: 'Govt Autonomous • Pune Hub',
    tagColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    slug: 'colleges/coep-pune',
    rating: '4.8'
  }
];

export function HomeCollegeExplorer() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'iim' | 'premier' | 'online' | 'roi' | 'btech'>('iim');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredColleges = useMemo(() => {
    return FEATURED_COLLEGES.filter((col) => {
      const matchesCategory = activeCategory === 'all' || col.category === activeCategory;
      const matchesSearch =
        !searchFilter.trim() ||
        col.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        col.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
        col.exams.some((e) => e.toLowerCase().includes(searchFilter.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchFilter]);

  const scrollToInquiry = (courseName: string = 'MBA / PGDM') => {
    const el = document.getElementById('inquiry-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="college-explorer" className="bg-white py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-slate-200 content-auto">
      <div className="mx-auto max-w-7xl">
        {/* Section Header with Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-8 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider mb-3 border border-blue-200">
              <Building2 className="w-3.5 h-3.5" />
              Verified College Search Portal
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Explore Top <span className="text-blue-600">Universities &amp; B-Schools</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg font-normal text-slate-600">
              Compare audited fee structures, cutoff percentiles, average salary packages, and NIRF rankings across 770+ colleges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Quick in-section search input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Filter colleges, exams, city..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full sm:w-64 h-11 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <Link
              href="/colleges"
              className="inline-flex h-11 items-center justify-center gap-1.5 px-5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm whitespace-nowrap"
            >
              <span>All 770+ Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'iim', label: '🏛️ Top 20 IIMs', badge: 'CAT 98-99.5+' },
            { id: 'premier', label: '⚡ Premier Non-IIMs', badge: 'XLRI, NMIMS, SIBM' },
            { id: 'roi', label: '💰 High ROI (< ₹10L)', badge: 'FMS, DBE, JBIMS' },
            { id: 'online', label: '🎓 UGC Online Degrees', badge: 'UPSC & WES Valid' },
            { id: 'btech', label: '💻 B.Tech & Engg Hubs', badge: 'JEE & Tech' },
            { id: 'all', label: '🌐 View All Top Picks', badge: '20+ Hubs' },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* College Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              className="group relative rounded-3xl bg-white border border-slate-200 hover:border-blue-400 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                {/* Top Badge & Rating */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${college.tagColor}`}>
                    {college.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    {college.rating}
                  </span>
                </div>

                {/* College Title */}
                <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                  <Link href={`/${college.slug}`}>
                    {college.name}
                  </Link>
                </h3>

                {/* Location & Ranking */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{college.location}</span>
                </div>

                <div className="text-[11px] font-semibold text-blue-700 bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-100 mb-4 inline-block">
                  {college.ranking}
                </div>

                {/* Key Metrics Matrix */}
                <div className="space-y-2 py-3 border-t border-b border-slate-100 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Total Course Fee:</span>
                    <span className="font-bold text-slate-900">{college.fees}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Average CTC:</span>
                    <span className="font-extrabold text-emerald-600">{college.avgPlacement}</span>
                  </div>
                  {college.highestPlacement && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Highest CTC:</span>
                      <span className="font-bold text-indigo-700">{college.highestPlacement}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Required Cutoff:</span>
                    <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded text-[11px]">
                      {college.cutoff}
                    </span>
                  </div>
                </div>

                {/* Accepted Exams Chips */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {college.exams.map((ex, i) => (
                    <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                <Link
                  href={`/${college.slug}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-blue-600 text-slate-800 hover:text-white font-bold text-xs text-center transition-all"
                >
                  View Details
                </Link>
                <button
                  type="button"
                  onClick={() => scrollToInquiry(college.category === 'btech' ? 'B.Tech & Engg' : college.category === 'online' ? 'Online MBA (UGC)' : 'MBA / PGDM')}
                  className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                  title="Submit Inquiry for this College"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Looking for a Specific College, City, or Cutoff Analysis?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200/80 max-w-xl font-normal">
              Search all 770+ MBA, B.Tech, and Online universities across Delhi NCR, Pune, Bangalore, Mumbai, and pan-India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/colleges"
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-amber-950/20 whitespace-nowrap"
            >
              Open Full 770+ Directory &rarr;
            </Link>
            <button
              type="button"
              onClick={() => scrollToInquiry()}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer whitespace-nowrap"
            >
              Request Free Shortlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
