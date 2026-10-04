"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MBA_FORM_COLLEGES,
  MbaFormCollege
} from '@/data/mbaFormDiscountsData';
import {
  Sparkles,
  Search,
  Check,
  X,
  Tag,
  ShieldCheck,
  Award,
  ArrowRight,
  MessageCircle,
  Phone,
  Gift,
  Zap,
  ChevronDown,
  ChevronUp,
  MapPin,
  Building2,
  HelpCircle,
  SlidersHorizontal,
  Flame,
  GraduationCap,
  Percent,
  ExternalLink,
  Info,
  Copy,
  CheckCheck,
  Ticket,
  LayoutGrid,
  ListFilter,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';

export default function MbaFormDiscountCalculator() {
  // Active target college for "Get Coupon Code" modal trigger
  const [targetCollege, setTargetCollege] = useState<MbaFormCollege | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('discount'); // 'discount', 'fee-low', 'savings', 'placement', 'alpha'
  const [quickFilter, setQuickFilter] = useState<'all' | 'popular' | 'high-discount' | 'budget' | 'top-placement' | 'free'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal & Lead state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    exam: 'CAT / MAT / CMAT / XAT',
    score: '',
    intake: '2027-2029'
  });

  // Helper to generate college voucher code
  const getCollegeCode = (college: MbaFormCollege) => {
    if (college.code) return college.code;
    const clean = college.shortName.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 7);
    return `CWM-${clean}${college.discountPercent || 50}`;
  };

  // Filtered colleges calculation across all 55 colleges
  const filteredColleges = useMemo(() => {
    return MBA_FORM_COLLEGES.filter((college) => {
      // Region filter
      if (selectedRegion !== 'All' && college.region !== selectedRegion) {
        return false;
      }
      // City filter
      if (selectedCity !== 'All' && college.city !== selectedCity) {
        return false;
      }
      // Quick filters
      if (quickFilter === 'popular' && !college.popular) {
        return false;
      }
      if (quickFilter === 'high-discount' && college.discountPercent < 55) {
        return false;
      }
      if (quickFilter === 'budget' && college.discountedFee > 500) {
        return false;
      }
      if (quickFilter === 'top-placement') {
        const avgNum = parseFloat(college.avgPlacement.replace(/[^0-9.]/g, '')) || 0;
        if (avgNum < 9.0) return false;
      }
      if (quickFilter === 'free' && college.discountPercent !== 100) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = college.name.toLowerCase().includes(q);
        const matchesShort = college.shortName.toLowerCase().includes(q);
        const matchesLoc = college.location.toLowerCase().includes(q);
        const matchesCity = college.city.toLowerCase().includes(q);
        const matchesPrograms = college.programs.some((p) => p.toLowerCase().includes(q));
        const matchesRecruiters = college.topRecruiters?.some((r) => r.toLowerCase().includes(q)) || false;
        const matchesAccreditation = college.accreditation.toLowerCase().includes(q);
        if (!matchesName && !matchesShort && !matchesLoc && !matchesCity && !matchesPrograms && !matchesRecruiters && !matchesAccreditation) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'discount') {
        return b.discountPercent - a.discountPercent;
      }
      if (sortBy === 'savings') {
        return b.savings - a.savings;
      }
      if (sortBy === 'fee-low') {
        return a.discountedFee - b.discountedFee;
      }
      if (sortBy === 'placement') {
        const getNum = (s: string) => parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
        return getNum(b.avgPlacement) - getNum(a.avgPlacement);
      }
      if (sortBy === 'alpha') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [searchQuery, selectedRegion, selectedCity, quickFilter, sortBy]);

  // Open modal for specific college
  const handleOpenSingleModal = (college: MbaFormCollege) => {
    setTargetCollege(college);
    setIsSubmitted(false);
    setCopiedCode(null);
    setIsModalOpen(true);
  };

  // Copy code to clipboard
  const handleCopyCode = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 3000);
    }
  };

  // Generate WhatsApp message URL for single college
  const generateSingleWhatsAppUrl = (college: MbaFormCollege) => {
    const code = getCollegeCode(college);
    const discountLine = college.discountNote
      ? `*Discount:* ${college.discountNote} (Profile Evaluation Waiver)`
      : college.discountedFee === 0
      ? `*Discounted Fee:* FREE (₹0)%0A*Instant Savings:* ₹${college.officialFee} (100%25 OFF Full Waiver)`
      : `*Discounted Fee:* ₹${college.discountedFee}%0A*Instant Savings:* ₹${college.savings} (${college.discountPercent}%25 OFF)`;
    const msg = `Hi Mohit Sir, I want to apply for *${college.name}* with the official application discount voucher:%0A%0A*Applicant Name:* ${formData.name || 'Candidate'}%0A*WhatsApp:* ${formData.phone || 'N/A'}%0A*City:* ${formData.city || 'N/A'}%0A*Target Exam / Score:* ${formData.score || formData.exam}%0A%0A*College:* ${college.name}%0A*Official Fee:* ₹${college.officialFee}%0A${discountLine}%0A*Voucher Code:* ${code}%0A%0APlease evaluate my profile and share the direct application ERP link with free GD-PI prep.`;
    return `https://wa.me/919560020771?text=${msg}`;
  };

  // Handle lead submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !targetCollege) return;

    setIsSubmitting(true);
    try {
      const code = getCollegeCode(targetCollege);

      const payload = {
        name: formData.name,
        phone: formData.phone,
        number: formData.phone,
        email: formData.email,
        city: formData.city,
        location: formData.city || 'Online',
        category: 'mba-application-form-discount',
        source: `Discount Code - ${targetCollege.name}`,
        program: 'MBA / PGDM Admission 2027',
        course: 'MBA / PGDM',
        college: targetCollege.name,
        message: `Candidate requested discount code for ${targetCollege.name}. Official: ₹${targetCollege.officialFee}, Discounted: ₹${targetCollege.discountedFee}, Savings: ₹${targetCollege.savings} (${targetCollege.discountPercent}% OFF), Code: ${code}.`,
        details: {
          college: targetCollege.name,
          officialFee: targetCollege.officialFee,
          discountedFee: targetCollege.discountedFee,
          savings: targetCollege.savings,
          discountPercent: targetCollege.discountPercent,
          code,
          exam: formData.exam,
          score: formData.score,
          intake: formData.intake
        }
      };

      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Lead submission error', err);
      setIsSubmitted(true); // Still reveal code to candidate
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full text-[#0F1026]">

      {/* ── 1. SEARCH, FILTER & LOCATION SELECTOR ── */}
      <section id="colleges-catalogue" className="scroll-mt-24 mb-10">
        <div className="bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.06)] space-y-6">
          
          {/* Search Input + Region Selection */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search 55+ colleges by name, city, recruiter (e.g. NDIM, FOSTIIMA, FIIB, JIMS, Pune, Bangalore)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl text-sm text-[#0F1026] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Region Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {['All', 'Delhi NCR', 'Pune', 'Mumbai', 'Bangalore'].map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region);
                    setSelectedCity('All');
                  }}
                  className={`px-4 py-2.5 rounded-full font-mono text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedRegion === region
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-[#0F1026]'
                  }`}
                >
                  {region} {region === 'All' ? `(55)` : region === 'Delhi NCR' ? `(34)` : region === 'Pune' ? `(8)` : region === 'Mumbai' ? `(6)` : `(7)`}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filters Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-mono text-slate-500 font-semibold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Filter:
            </span>
            {[
              { id: 'all', label: 'All 55 Colleges' },
              { id: 'popular', label: '⭐ Most Popular' },
              { id: 'high-discount', label: '🔥 50%+ Discount' },
              { id: 'free', label: '🆓 100% Free Waiver' },
              { id: 'budget', label: '💰 Under ₹500 Fee' },
              { id: 'top-placement', label: '🚀 Top Placement (>₹9 LPA)' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setQuickFilter(f.id as any)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  quickFilter === f.id
                    ? 'bg-amber-400 text-[#0F1026] shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Secondary Controls: City, Sorting, View Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs">
            
            {/* City Sub-filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 font-semibold flex items-center gap-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> City:
              </span>
              {['All', 'New Delhi', 'Greater Noida', 'Gurugram', 'Ghaziabad', 'Pune', 'Mumbai', 'Bangalore']
                .filter((c) => selectedRegion === 'All' || (selectedRegion === 'Delhi NCR' ? ['All', 'New Delhi', 'Greater Noida', 'Gurugram', 'Ghaziabad'].includes(c) : [selectedRegion, 'All'].includes(c)))
                .map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-2.5 py-1 rounded-lg transition-colors font-medium cursor-pointer ${
                      selectedCity === city
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {city}
                  </button>
                ))}
            </div>

            {/* Sort & View Mode Actions */}
            <div className="flex items-center gap-3 ml-auto flex-wrap">
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <select
                  aria-label="Sort colleges"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-600 cursor-pointer shadow-2xs"
                >
                  <option value="discount">Sort: Highest Discount %</option>
                  <option value="savings">Sort: Maximum Rupee Savings</option>
                  <option value="fee-low">Sort: Lowest Discounted Fee</option>
                  <option value="placement">Sort: Highest Avg Placement</option>
                  <option value="alpha">Sort: Alphabetical (A-Z)</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'table' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Table View"
                >
                  <ListFilter className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="font-mono text-slate-500 text-xs">
                Showing <strong className="text-slate-900">{filteredColleges.length}</strong> colleges
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. MAIN 55 COLLEGES GRID / DIRECTORY ── */}
      <section className="mb-16">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college) => {
              return (
                <div
                  key={college.id}
                  className="relative rounded-[28px] p-6 border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-sm"
                >
                  
                  {/* Top Notch: Discount Ribbon + Badges */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      {/* Luminous Discount Badge */}
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-black tracking-wide shadow-2xs">
                        <Percent className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        <span>{college.discountNote || `${college.discountPercent}% OFF`}</span>
                      </div>

                      {college.badge && (
                        <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                          {college.badge}
                        </span>
                      )}
                    </div>

                    {/* City Location */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1.5 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{college.location}</span>
                    </div>

                    {/* College Name */}
                    <h3 className="font-display text-lg font-extrabold text-[#0F1026] group-hover:text-blue-600 transition-colors leading-snug">
                      {college.name}
                    </h3>

                    {/* Accreditation Tag */}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="font-mono text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-md">
                        {college.accreditation.split('·')[0].trim()}
                      </span>
                      {college.grade && (
                        <span className="font-mono text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200/80 px-2 py-0.5 rounded-md">
                          {college.grade}
                        </span>
                      )}
                    </div>

                    {/* Highlight */}
                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {college.highlight}
                    </p>

                    {/* Placement Metrics */}
                    <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-xs">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">Avg CTC</span>
                        <span className="text-[#0F1026] font-bold">{college.avgPlacement}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">Highest Package</span>
                        <span className="text-emerald-700 font-bold">{college.highestPlacement}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Ticket Cutout & Action Button */}
                  <div className="mt-5 pt-4 border-t border-dashed border-slate-200 space-y-3.5">
                    
                    {/* Cost Breakdown */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                          <span className="line-through text-slate-400">Official: ₹{college.officialFee.toLocaleString()}</span>
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] border border-emerald-200/60">
                            {college.discountNote ? 'Profile Waiver' : `Save ₹${college.savings.toLocaleString()}`}
                          </span>
                        </div>
                        <div className="font-display text-xl font-black text-[#0F1026] flex items-baseline gap-1 mt-0.5">
                          {college.discountNote ? (
                            <span className="text-emerald-700 text-base sm:text-lg">Depends on Profile</span>
                          ) : college.discountedFee === 0 ? (
                            <span className="text-emerald-700 text-xl font-black">FREE (₹0)</span>
                          ) : (
                            <>
                              <span className="text-blue-700">₹{college.discountedFee.toLocaleString()}</span>
                              <span className="text-[10px] text-slate-500 font-normal">form fee</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">Voucher Code</span>
                        <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-flex items-center gap-1">
                          🔒 Locked Code
                        </span>
                      </div>
                    </div>

                    {/* Primary Button: GET COUPON CODE */}
                    <button
                      type="button"
                      onClick={() => handleOpenSingleModal(college)}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-[0.98] text-white font-display font-black text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Ticket className="w-4 h-4 text-white" />
                      <span>{college.discountNote ? 'Get Profile Evaluation & Code' : `Get Coupon Code (Save ₹${college.savings.toLocaleString()})`}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE DIRECTORY VIEW */
          <div className="bg-white border border-slate-200/90 rounded-[28px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 font-mono text-[11px] uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-5">College Name</th>
                    <th className="py-4 px-3">City</th>
                    <th className="py-4 px-3">Avg CTC</th>
                    <th className="py-4 px-3">Official Fee</th>
                    <th className="py-4 px-3">Discounted Fee</th>
                    <th className="py-4 px-3">Savings</th>
                    <th className="py-4 px-5 text-right">Get Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredColleges.map((college) => {
                    return (
                      <tr key={college.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-5 font-bold text-[#0F1026]">
                          <div className="flex items-center gap-2">
                            <span className="font-display">{college.name}</span>
                            {college.badge && (
                              <span className="font-mono text-[9px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                                {college.badge}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-3 text-slate-500">{college.city}</td>
                        <td className="py-4 px-3 font-semibold text-emerald-700">{college.avgPlacement}</td>
                        <td className="py-4 px-3 line-through text-slate-400 font-mono">₹{college.officialFee}</td>
                        <td className="py-4 px-3 font-bold text-[#0F1026] text-sm font-mono">
                          {college.discountNote ? (
                            <span className="text-emerald-700 text-xs">Profile-Based</span>
                          ) : college.discountedFee === 0 ? (
                            <span className="text-emerald-700 font-bold">FREE (₹0)</span>
                          ) : (
                            `₹${college.discountedFee}`
                          )}
                        </td>
                        <td className="py-4 px-3">
                          <span className="font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold">
                            {college.discountNote || `${college.discountPercent}% OFF`}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button
                            onClick={() => handleOpenSingleModal(college)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-display font-extrabold rounded-xl text-xs transition-colors cursor-pointer shadow-sm inline-flex items-center gap-1.5"
                          >
                            <Ticket className="w-3.5 h-3.5" />
                            <span>Get Code</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredColleges.length === 0 && (
          <div className="text-center py-16 bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0F1026]">No colleges matched your filters</h3>
            <p className="text-sm text-slate-500 mt-1">Try searching a different city or clearing the search keyword.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All');
                setSelectedCity('All');
                setQuickFilter('all');
              }}
              className="mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-display font-extrabold text-xs rounded-full cursor-pointer shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* ── 3. HOW TO USE DISCOUNT CODES SECTION ── */}
      <section className="mb-16 bg-gradient-to-br from-[#1E1B4B] via-[#4338CA] to-[#6336EA] rounded-[32px] sm:rounded-[40px] p-7 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-80 h-80 rounded-full bg-cyan-400/15 blur-[80px] pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-white font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFD000]" />
            Zero Hidden Charges · 100% Official
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            How to Get &amp; Use Your College Application Discount Code
          </h2>
          <p className="text-purple-100/90 text-sm sm:text-base mt-2 leading-relaxed">
            As an authorized institutional advisory portal, CareerWithMohit partners with premier AICTE/AIU approved management institutions to sponsor fee concessions and profile evaluation waivers for students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {[
            {
              step: '01',
              title: 'Click "Get Code"',
              desc: 'Select your target business school from 55+ AICTE approved institutions in Delhi NCR, Pune, Mumbai & Bangalore.'
            },
            {
              step: '02',
              title: 'Fill Quick Inquiry',
              desc: 'Enter your basic details to verify your profile and instantly unlock the official fee concession voucher code.'
            },
            {
              step: '03',
              title: 'Copy & Apply on Portal',
              desc: 'Copy your unique coupon code and apply directly on the official college registration page with the discounted fee.'
            },
            {
              step: '04',
              title: 'Free GD-PI Mentorship',
              desc: 'Get complementary interview kits, mock GD-PI practice sessions, and 1-on-1 strategy with mentor Mohit Jain.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl relative group hover:bg-white/15 transition-all">
              <div className="font-display text-3xl font-black text-white/30 group-hover:text-[#FFD000] transition-colors mb-2">
                {item.step}
              </div>
              <h3 className="font-display text-base font-bold text-white mb-1.5">{item.title}</h3>
              <p className="text-xs text-purple-100/90 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. INQUIRY MODAL / UNLOCK DISCOUNT CODE POPUP ── */}
      {isModalOpen && targetCollege && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative my-8 text-left max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
                setTargetCollege(null);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Modal Top Header */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Instant Discount Code Request
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-black text-[#0F1026]">
                  Get Coupon Code: {targetCollege.shortName}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Fill in your candidate details below to instantly unveil the official fee waiver coupon code &amp; direct portal link.
                </p>

                {/* College Voucher Card inside Modal */}
                <div className="mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/90 text-xs space-y-2 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-sm text-[#0F1026]">{targetCollege.name}</span>
                    <span className="font-mono bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full font-black text-[11px]">
                      {targetCollege.discountNote || `${targetCollege.discountPercent}% OFF`}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-mono">{targetCollege.location}</div>
                  
                  <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 line-through text-[11px] font-mono">Official: ₹{targetCollege.officialFee}</span>
                      <div className="font-display text-base font-black text-blue-700">
                        {targetCollege.discountNote
                          ? 'Discount: Depends on Profile'
                          : targetCollege.discountedFee === 0
                          ? 'Discounted Fee: FREE (₹0)'
                          : `Discounted Fee: ₹${targetCollege.discountedFee}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold">
                        {targetCollege.discountNote ? 'Profile Concession' : `You Save ₹${targetCollege.savings}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inquiry Lead Form */}
                <form onSubmit={handleLeadSubmit} className="mt-5 space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Candidate Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0F1026] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0F1026] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0F1026] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Current City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Delhi, Pune, Patna"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0F1026] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Target Exam / %ile
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CAT 75% / MAT / CMAT"
                        value={formData.score}
                        onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0F1026] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-display font-black text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Unlocking Coupon Code...</span>
                    ) : (
                      <>
                        <Ticket className="w-4 h-4 text-white" />
                        <span>Unlock Coupon Code &amp; Direct Apply Link</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success / Unveiled Code View */
              <div className="text-center py-2 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-600 shadow-sm animate-pulse">
                  <CheckCheck className="w-9 h-9 stroke-[3]" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Code Unlocked Successfully!
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-[#0F1026]">
                    Here is your Discount Code
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                    Use this official institutional code on the <strong className="text-[#0F1026]">{targetCollege.name}</strong> portal.
                  </p>
                </div>

                {/* Single Code Revealed Box */}
                <div className="bg-blue-50/60 border-2 border-blue-200 rounded-2xl p-4 sm:p-5 text-center space-y-3 shadow-sm relative overflow-hidden">
                  <div className="font-mono text-[11px] text-blue-700 uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-600" /> Official Application Voucher Code
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <span className="text-2xl sm:text-3xl font-mono font-black text-blue-700 tracking-widest bg-white px-5 py-2.5 rounded-xl border border-blue-200 shadow-xs select-all w-full sm:w-auto">
                      {getCollegeCode(targetCollege)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(getCollegeCode(targetCollege))}
                      className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white font-display font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/20"
                    >
                      {copiedCode === getCollegeCode(targetCollege) ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-1 flex items-center justify-center gap-2 flex-wrap font-mono text-xs">
                    <span className="text-slate-500">Official Fee: <span className="line-through">₹{targetCollege.officialFee.toLocaleString()}</span></span>
                    {targetCollege.discountNote ? (
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md text-xs">
                        Profile Evaluation Waiver (Up to 100% OFF)
                      </span>
                    ) : targetCollege.discountedFee === 0 ? (
                      <>
                        <span className="text-slate-900 font-bold">Discounted Fee: <span className="text-emerald-700 font-black">FREE (₹0)</span></span>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md text-[11px]">
                          Saved ₹{targetCollege.savings.toLocaleString()} (100% OFF)
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-slate-900 font-bold">Discounted Fee: <span className="text-blue-700 font-black">₹{targetCollege.discountedFee.toLocaleString()}</span></span>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md text-[11px]">
                          Saved ₹{targetCollege.savings.toLocaleString()} ({targetCollege.discountPercent}% OFF)
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* How to Apply Instructions */}
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-left text-xs text-slate-700 space-y-1.5">
                  <div className="font-bold text-[#0F1026] flex items-center gap-1.5 font-mono text-xs">
                    <Info className="w-4 h-4 text-blue-600" /> 3 Simple Steps to Apply:
                  </div>
                  <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1 leading-relaxed">
                    <li>Copy your discount code: <strong className="text-blue-700 font-mono">{getCollegeCode(targetCollege)}</strong></li>
                    <li>Click the green WhatsApp button below to ask for the direct application portal link or instant verification.</li>
                    <li>
                      {targetCollege.discountNote
                        ? 'Enter the code during checkout or connect with the mentor desk for profile-based waiver.'
                        : targetCollege.discountedFee === 0
                        ? 'Paste the code on the college portal form to claim your 100% Free Application waiver (₹0 payable).'
                        : `Paste the code on the college portal form to pay only ₹${targetCollege.discountedFee.toLocaleString()}.`}
                    </li>
                  </ol>
                </div>

                {/* WhatsApp & Direct Portal Actions */}
                <div className="space-y-2.5 pt-1">
                  {/* WhatsApp Ask Code & Apply Link CTA */}
                  <a
                    href={generateSingleWhatsAppUrl(targetCollege)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-display font-black text-sm rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-black text-[#25D366]" />
                    <span>Ask Coupon Code &amp; Apply Link on WhatsApp</span>
                  </a>

                  {/* Direct College Portal Link if present */}
                  {targetCollege.applyUrl && (
                    <a
                      href={targetCollege.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-display font-bold text-xs rounded-xl border border-slate-200 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                      <span>Open Official {targetCollege.shortName} Application Portal</span>
                    </a>
                  )}

                  {/* Close & Browse More */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsSubmitted(false);
                      setTargetCollege(null);
                    }}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl transition-all cursor-pointer border border-slate-200"
                  >
                    Get Discount Code for Another College
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href="/book-session/"
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 underline underline-offset-4 font-medium"
                  >
                    <span>Need GD-PI or College Selection Guidance? Book Free 1-on-1 Mentorship</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
