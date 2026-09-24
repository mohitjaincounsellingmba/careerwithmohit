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
  Star,
  Layers,
  LayoutGrid,
  List,
  RotateCcw,
  ShieldCheck,
  Zap,
  Check,
  X,
  ChevronDown
} from 'lucide-react';

import { FEATURED_DIRECTORY_COLLEGES, type FeaturedCollege } from '@/lib/featuredColleges';
export { FEATURED_DIRECTORY_COLLEGES, type FeaturedCollege };

export function HomeCollegeExplorer() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedExam, setSelectedExam] = useState('all');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [quickTag, setQuickTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [displayCount, setDisplayCount] = useState(8);

  // Filtered & sorted colleges
  const filteredColleges = useMemo(() => {
    return FEATURED_DIRECTORY_COLLEGES.filter((col) => {
      // Category stream match
      let matchesCategory = true;
      if (activeCategory === 'all') {
        matchesCategory = true;
      } else if (activeCategory === 'mba') {
        matchesCategory = col.stream === 'mba';
      } else if (activeCategory === 'iim') {
        matchesCategory = col.category === 'iim';
      } else if (activeCategory === 'premier') {
        matchesCategory = col.category === 'premier';
      } else if (activeCategory === 'aicte') {
        matchesCategory = col.category === 'aicte';
      } else if (activeCategory === 'roi') {
        matchesCategory = col.category === 'roi' || !!col.isHighRoi;
      } else if (activeCategory === 'online') {
        matchesCategory = col.stream === 'online';
      } else if (activeCategory === 'btech') {
        matchesCategory = col.stream === 'btech';
      } else if (activeCategory === 'ug') {
        matchesCategory = col.stream === 'ug';
      }

      // Location match
      let matchesLocation = true;
      if (selectedLocation !== 'all') {
        const cleanLoc = selectedLocation.toLowerCase();
        const colState = col.state.toLowerCase();
        const colCity = col.city.toLowerCase();
        const colFullLoc = col.location.toLowerCase();
        matchesLocation = colState.includes(cleanLoc) || colCity.includes(cleanLoc) || colFullLoc.includes(cleanLoc);
      }

      // Budget match
      let matchesBudget = true;
      if (selectedBudget === 'under-5l') {
        matchesBudget = col.feeNum <= 5.0;
      } else if (selectedBudget === '5l-10l') {
        matchesBudget = col.feeNum > 5.0 && col.feeNum <= 10.0;
      } else if (selectedBudget === '10l-18l') {
        matchesBudget = col.feeNum > 10.0 && col.feeNum <= 18.0;
      } else if (selectedBudget === 'above-18l') {
        matchesBudget = col.feeNum > 18.0;
      }

      // Exam match
      let matchesExam = true;
      if (selectedExam !== 'all') {
        const cleanEx = selectedExam.toLowerCase();
        matchesExam = col.exams.some(e => e.toLowerCase().includes(cleanEx) || cleanEx.includes(e.toLowerCase())) ||
          col.cutoff.toLowerCase().includes(cleanEx);
      }

      // Quick Tag pill match
      let matchesQuickTag = true;
      if (quickTag === 'placements') {
        matchesQuickTag = col.avgPlacementNum >= 15.0;
      } else if (quickTag === 'roi') {
        matchesQuickTag = !!col.isHighRoi || col.category === 'roi';
      } else if (quickTag === 'discount') {
        matchesQuickTag = !!col.hasDiscount;
      } else if (quickTag === 'direct') {
        matchesQuickTag = !!col.hasDirectAdmission;
      } else if (quickTag === 'delhi') {
        matchesQuickTag = col.state.includes('Delhi');
      } else if (quickTag === 'pune') {
        matchesQuickTag = col.state.includes('Maharashtra');
      }

      // Search keyword match
      let matchesSearch = true;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase().trim();
        matchesSearch =
          col.name.toLowerCase().includes(q) ||
          col.location.toLowerCase().includes(q) ||
          col.state.toLowerCase().includes(q) ||
          col.city.toLowerCase().includes(q) ||
          col.ranking.toLowerCase().includes(q) ||
          col.tag.toLowerCase().includes(q) ||
          col.cutoff.toLowerCase().includes(q) ||
          col.exams.some(e => e.toLowerCase().includes(q));
      }

      return matchesCategory && matchesLocation && matchesBudget && matchesExam && matchesQuickTag && matchesSearch;
    }).sort((a, b) => {
      if (selectedSort === 'highest-placement') {
        return b.avgPlacementNum - a.avgPlacementNum;
      }
      if (selectedSort === 'lowest-fee') {
        return a.feeNum - b.feeNum;
      }
      if (selectedSort === 'rating') {
        return parseFloat(b.rating) - parseFloat(a.rating);
      }
      return 0; // default featured order
    });
  }, [activeCategory, selectedLocation, selectedBudget, selectedExam, selectedSort, quickTag, searchFilter]);

  const displayedColleges = useMemo(() => {
    return filteredColleges.slice(0, displayCount);
  }, [filteredColleges, displayCount]);

  const scrollToInquiry = (collegeName?: string) => {
    const el = document.getElementById('inquiry-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchFilter('');
    setSelectedLocation('all');
    setSelectedBudget('all');
    setSelectedExam('all');
    setSelectedSort('featured');
    setQuickTag(null);
    setDisplayCount(8);
  };

  const isAnyFilterActive =
    activeCategory !== 'all' ||
    searchFilter.trim() !== '' ||
    selectedLocation !== 'all' ||
    selectedBudget !== 'all' ||
    selectedExam !== 'all' ||
    selectedSort !== 'featured' ||
    quickTag !== null;

  return (
    <section id="college-explorer" className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-slate-200">
      <div className="mx-auto max-w-7xl">
        
        {/* ── SECTION HEADER & SEARCH TOOLBAR ── */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-8 gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-600/10 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-200 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              Pan-India Admissions 2027 Discovery Panel
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Interactive <span className="text-blue-600">College Search</span> &amp; Explorer
            </h2>
            <p className="text-sm sm:text-base font-normal text-slate-600 leading-relaxed">
              Instantly filter 770+ verified MBA, PGDM, B.Tech &amp; Online universities by audited CTC placements, fee structures, cutoffs, and state hubs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Live Search Input */}
            <div className="relative min-w-[280px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search college, city, CAT, fee..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full h-11 pl-10 pr-9 rounded-xl bg-white border border-slate-300 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-xs"
              />
              {searchFilter && (
                <button
                  type="button"
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
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

        {/* ── 1. STREAM & CATEGORY TABS ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {[
            { id: 'all', label: '🌐 All Streams', badge: `${FEATURED_DIRECTORY_COLLEGES.length}+ Campuses` },
            { id: 'mba', label: '🎓 MBA & PGDM', badge: 'Tier-1 & AICTE' },
            { id: 'aicte', label: '🏷️ AICTE Verified Forms', badge: 'Save ₹5,000+' },
            { id: 'roi', label: '💰 High ROI (< ₹10L)', badge: 'FMS, DBE, JBIMS' },
            { id: 'iim', label: '🏛️ Top 20 IIMs', badge: 'CAT 98-99.5+' },
            { id: 'premier', label: '⚡ Premier Non-IIMs', badge: 'XLRI, NMIMS, SIBM' },
            { id: 'online', label: '💻 UGC Online Degrees', badge: 'UPSC & WES Valid' },
            { id: 'btech', label: '⚡ B.Tech & Engg Hubs', badge: 'IIT, DTU, COEP' },
            { id: 'ug', label: '📖 UG (BBA / BCA)', badge: 'SSCBS, Christ' },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveCategory(tab.id);
                  setDisplayCount(8);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── 2. ADVANCED MULTI-FILTER CONTROL BAR ── */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 mb-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
            
            {/* Location Filter */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-600" />
                <span>Region / City Hub</span>
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setDisplayCount(8);
                }}
                className="w-full h-10 pl-3 pr-8 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer transition-all"
              >
                <option value="all">All Locations (Pan-India)</option>
                <option value="delhi">Delhi NCR (Delhi/Noida/Gurgaon)</option>
                <option value="maharashtra">Maharashtra (Mumbai &amp; Pune)</option>
                <option value="karnataka">Karnataka (Bangalore)</option>
                <option value="telangana">Telangana (Hyderabad)</option>
                <option value="tamil">Tamil Nadu (Chennai)</option>
                <option value="gujarat">Gujarat (Ahmedabad)</option>
                <option value="west bengal">West Bengal (Kolkata)</option>
                <option value="rajasthan">Rajasthan (Jaipur)</option>
                <option value="uttar pradesh">Uttar Pradesh (Lucknow/Kanpur)</option>
              </select>
            </div>

            {/* Budget Range Filter */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <IndianRupee className="w-3 h-3 text-emerald-600" />
                <span>Total Fee Budget</span>
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => {
                  setSelectedBudget(e.target.value);
                  setDisplayCount(8);
                }}
                className="w-full h-10 pl-3 pr-8 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer transition-all"
              >
                <option value="all">Any Budget Tier</option>
                <option value="under-5l">High ROI (Under ₹5 Lakhs)</option>
                <option value="5l-10l">Budget Friendly (₹5L - ₹10 Lakhs)</option>
                <option value="10l-18l">Mid-Tier (₹10L - ₹18 Lakhs)</option>
                <option value="above-18l">Premier / Elite Tier (₹18L+)</option>
              </select>
            </div>

            {/* Exam Filter */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-500" />
                <span>Accepted Entrance Exam</span>
              </label>
              <select
                value={selectedExam}
                onChange={(e) => {
                  setSelectedExam(e.target.value);
                  setDisplayCount(8);
                }}
                className="w-full h-10 pl-3 pr-8 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer transition-all"
              >
                <option value="all">All Accepted Exams</option>
                <option value="cat">CAT (IIMs, FMS, MDI, NDIM)</option>
                <option value="xat">XAT (XLRI, IMT, FORE, GIM)</option>
                <option value="nmat">NMAT (NMIMS, TAPMI, SOIL)</option>
                <option value="snap">SNAP (SIBM Pune, SCMHRD)</option>
                <option value="cmat">CMAT / MAT (50+ AICTE Institutes)</option>
                <option value="jee">JEE Main / Advanced (IIT/DTU/COEP)</option>
                <option value="direct">Direct Admission / Profile Based</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-purple-600" />
                <span>Sort Colleges By</span>
              </label>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full h-10 pl-3 pr-8 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer transition-all"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="highest-placement">Highest Average CTC (↓)</option>
                <option value="lowest-fee">Lowest Course Fees (↑)</option>
                <option value="rating">Student Rating / NIRF (↓)</option>
              </select>
            </div>

          </div>

          {/* Quick Filter Action Pills & Results Bar */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400 mr-1">Quick Picks:</span>
              {[
                { id: 'placements', label: '🔥 ₹25+ LPA Placements' },
                { id: 'roi', label: '💰 10x+ ROI Multiplier' },
                { id: 'discount', label: '🏷️ MBA Form Discounts (Save ₹5k)' },
                { id: 'direct', label: '⚡ Direct Admission' },
                { id: 'delhi', label: '🏛️ Delhi NCR Hub' },
                { id: 'pune', label: '🏦 Mumbai & Pune' },
              ].map((pill) => {
                const isSelected = quickTag === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => {
                      setQuickTag(isSelected ? null : pill.id);
                      setDisplayCount(8);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700 border-slate-200'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

            {/* View Switcher & Reset */}
            <div className="flex items-center gap-2">
              {isAnyFilterActive && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}

              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Grid Cards View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-md transition-all cursor-pointer ${
                    viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Matrix Comparison Table View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. LIVE MATCH STATUS BAR ── */}
        <div className="mb-6 flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              Showing <strong className="text-slate-900 font-extrabold">{displayedColleges.length}</strong> of{' '}
              <strong className="text-blue-600 font-extrabold">{filteredColleges.length}</strong> matching verified institutions
            </span>
          </div>

          <div className="hidden sm:block text-slate-400">
            Free 1-on-1 Profile Shortlist &bull; <strong className="text-slate-700">Mohit Jain</strong>
          </div>
        </div>

        {/* ── 4. COLLEGE CARDS: GRID VIEW MODE ── */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedColleges.map((college) => (
              <div
                key={college.id}
                className="group relative rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  {/* Top Badge & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black border uppercase tracking-wider ${college.tagColor}`}>
                      {college.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      {college.rating}
                    </span>
                  </div>

                  {/* College Title */}
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2 line-clamp-2">
                    <Link href={`/${college.slug}`}>
                      {college.name}
                    </Link>
                  </h3>

                  {/* Location & Accreditations */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{college.location}</span>
                  </div>

                  <div className="text-[11px] font-semibold text-blue-700 bg-blue-50/90 px-2.5 py-1 rounded-lg border border-blue-100 mb-3 inline-block truncate max-w-full">
                    {college.ranking}
                  </div>

                  {/* Key Metrics Matrix */}
                  <div className="space-y-2 py-3 border-t border-b border-slate-100 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Course Fee:</span>
                      <span className="font-bold text-slate-900">{college.fees}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Average CTC:</span>
                      <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {college.avgPlacement}
                      </span>
                    </div>
                    {college.highestPlacement && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Highest CTC:</span>
                        <span className="font-extrabold text-indigo-700">{college.highestPlacement}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Cutoff / Calls:</span>
                      <span className="font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded text-[11px] border border-amber-200/60 truncate max-w-[150px]">
                        {college.cutoff}
                      </span>
                    </div>
                  </div>

                  {/* Accepted Exams Chips */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {college.exams.map((ex, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    href={`/${college.slug}`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-blue-600 text-slate-800 hover:text-white font-bold text-xs text-center transition-all shadow-2xs"
                  >
                    Details &rarr;
                  </Link>
                  <button
                    type="button"
                    onClick={() => scrollToInquiry(college.name)}
                    className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                    title="Submit Free Admission Inquiry"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 5. COLLEGE CARDS: DETAILED MATRIX TABLE VIEW MODE ── */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-extrabold uppercase tracking-wider text-[11px]">
                    <th className="p-3.5 sm:p-4">College / University</th>
                    <th className="p-3.5">Hub / Location</th>
                    <th className="p-3.5">Total Course Fee</th>
                    <th className="p-3.5">Average CTC</th>
                    <th className="p-3.5">Highest CTC</th>
                    <th className="p-3.5">Cutoff / Exams</th>
                    <th className="p-3.5">Accreditation</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {displayedColleges.map((col) => (
                    <tr key={col.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        <Link href={`/${col.slug}`} className="hover:text-blue-600 block text-xs sm:text-sm font-extrabold">
                          {col.name}
                        </Link>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${col.tagColor}`}>
                          {col.tag}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{col.location}</span>
                        </div>
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                        {col.fees}
                      </td>
                      <td className="p-3.5 font-black text-emerald-600 whitespace-nowrap text-sm">
                        {col.avgPlacement}
                      </td>
                      <td className="p-3.5 font-extrabold text-indigo-700 whitespace-nowrap">
                        {col.highestPlacement || '—'}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-bold text-amber-800">{col.cutoff}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{col.exams.join(', ')}</div>
                      </td>
                      <td className="p-3.5 text-[11px] text-slate-600 max-w-[160px] truncate">
                        {col.ranking}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/${col.slug}`}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white font-bold text-[11px] transition-all"
                          >
                            Details
                          </Link>
                          <button
                            type="button"
                            onClick={() => scrollToInquiry(col.name)}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-all cursor-pointer"
                          >
                            Inquire
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 6. ZERO RESULTS / RECOVERY VIEW ── */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-16 px-6 bg-white rounded-3xl border border-slate-200 my-6 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
              No Direct Matches for Selected Filters
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              We couldn&apos;t find colleges matching this exact combination. Try broadening your location or budget tier, or reset filters to browse all.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Reset All Filters
              </button>
              <Link
                href="/colleges"
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
              >
                Search Full 770+ Directory &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* ── 7. LOAD MORE / PAGINATION BUTTON ── */}
        {filteredColleges.length > displayCount && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setDisplayCount((prev) => prev + 8)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white hover:bg-blue-50 border border-slate-300 hover:border-blue-400 text-slate-800 hover:text-blue-700 font-extrabold text-sm shadow-xs transition-all cursor-pointer"
            >
              <span>Show More Colleges ({filteredColleges.length - displayCount} Remaining)</span>
              <ChevronDown className="w-4 h-4 text-blue-600 animate-bounce" />
            </button>
          </div>
        )}

        {/* ── 8. BOTTOM HIGH-CONVERSION CTA BANNER ── */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-blue-800/40">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Pan-India Database 2027
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black text-white">
              Looking for a Specific College, City, or Detailed Cutoff Analysis?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200/90 max-w-2xl font-normal leading-relaxed">
              Explore all 770+ verified MBA, PGDM, B.Tech, and UGC Online universities across Delhi NCR, Mumbai, Pune, Bangalore, Hyderabad, and Pan-India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/colleges"
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-amber-950/20 whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Explore All 770+ Colleges</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => scrollToInquiry()}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer whitespace-nowrap"
            >
              Request Free Shortlist
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
