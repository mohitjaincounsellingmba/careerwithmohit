"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  MBA_FORM_COLLEGES,
  CURATED_COMBOS,
  PROMO_CODES,
  MbaFormCollege,
  CuratedCombo,
  PromoCode
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
  Layers,
  TrendingDown,
  ExternalLink,
  Info
} from 'lucide-react';

export default function MbaFormDiscountCalculator() {
  // Selected colleges state (by ID)
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'ndim-delhi',
    'fostiima-business-school',
    'fiib-delhi'
  ]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('discount'); // 'discount', 'fee-low', 'savings', 'alpha'
  const [filterWaiverOnly, setFilterWaiverOnly] = useState<boolean>(false);

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Modal & Lead state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    exam: 'CAT / MAT / CMAT / XAT',
    score: '',
    intake: '2027-2029'
  });

  // Mobile drawer collapse state
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);

  // Active FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filtered colleges calculation
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
      // Waiver filter (colleges offering >45% discount)
      if (filterWaiverOnly && college.discountPercent < 45) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = college.name.toLowerCase().includes(q);
        const matchesShort = college.shortName.toLowerCase().includes(q);
        const matchesLoc = college.location.toLowerCase().includes(q);
        const matchesCity = college.city.toLowerCase().includes(q);
        const matchesPrograms = college.programs.some(p => p.toLowerCase().includes(q));
        const matchesRecruiters = college.topRecruiters?.some(r => r.toLowerCase().includes(q)) || false;
        if (!matchesName && !matchesShort && !matchesLoc && !matchesCity && !matchesPrograms && !matchesRecruiters) {
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
  }, [searchQuery, selectedRegion, selectedCity, sortBy, filterWaiverOnly]);

  // Selected colleges objects
  const selectedColleges = useMemo(() => {
    return MBA_FORM_COLLEGES.filter(c => selectedIds.includes(c.id));
  }, [selectedIds]);

  // Cost calculation
  const calculation = useMemo(() => {
    const totalOfficial = selectedColleges.reduce((sum, c) => sum + c.officialFee, 0);
    const totalBaseDiscounted = selectedColleges.reduce((sum, c) => sum + c.discountedFee, 0);
    let totalDiscounted = totalBaseDiscounted;
    let extraDiscount = 0;

    // Apply promo code if valid
    if (appliedPromo && selectedColleges.length >= appliedPromo.minColleges) {
      if (appliedPromo.discountAmount) {
        extraDiscount += appliedPromo.discountAmount;
      }
      if (appliedPromo.discountPercent) {
        extraDiscount += Math.round((totalBaseDiscounted * appliedPromo.discountPercent) / 100);
      }
      totalDiscounted = Math.max(0, totalBaseDiscounted - extraDiscount);
    }

    const totalSavings = totalOfficial - totalDiscounted;
    const overallSavingsPercent = totalOfficial > 0 ? Math.round((totalSavings / totalOfficial) * 100) : 0;

    return {
      count: selectedColleges.length,
      totalOfficial,
      totalDiscounted,
      totalSavings,
      overallSavingsPercent,
      extraDiscount
    };
  }, [selectedColleges, appliedPromo]);

  // Toggle college selection
  const toggleCollege = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Load curated combo
  const loadCombo = (combo: CuratedCombo) => {
    setSelectedIds(combo.collegeIds);
    // Smooth scroll to builder
    const el = document.getElementById('combo-builder-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Select all currently filtered colleges
  const selectAllFiltered = () => {
    const filteredIds = filteredColleges.map(c => c.id);
    setSelectedIds(Array.from(new Set([...selectedIds, ...filteredIds])));
  };

  // Clear all selections
  const clearSelection = () => {
    setSelectedIds([]);
  };

  // Apply promo code handler
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) return;

    const found = PROMO_CODES.find(p => p.code === cleanCode);
    if (!found) {
      setPromoError('Invalid coupon code. Try MOHIT2027, EARLYBIRD, or COMBO500.');
      return;
    }

    if (selectedColleges.length < found.minColleges) {
      setPromoError(`Code ${found.code} requires at least ${found.minColleges} colleges in your combo.`);
      return;
    }

    setAppliedPromo(found);
    setPromoSuccess(`🎉 Promo applied! ${found.description}`);
  };

  // Remove applied promo
  const removePromo = () => {
    setAppliedPromo(null);
    setPromoSuccess('');
    setPromoError('');
    setPromoInput('');
  };

  // WhatsApp Message Generator
  const generateWhatsAppUrl = () => {
    const collegeNames = selectedColleges.map((c, i) => `${i + 1}. ${c.shortName} (Fee: ₹${c.discountedFee})`).join('%0A');
    const msg = `Hi Mohit Sir, I have created my MBA/PGDM 2027 Application Form Combo on CareerWithMohit:%0A%0A*Selected Colleges (${calculation.count}):*%0A${collegeNames}%0A%0A*Total Official Fee:* ₹${calculation.totalOfficial}%0A*Discounted Combo Fee:* ₹${calculation.totalDiscounted}%0A*My Total Savings:* ₹${calculation.totalSavings} (${calculation.overallSavingsPercent}%25 OFF)%0A${appliedPromo ? `*Applied Code:* ${appliedPromo.code}%0A` : ''}%0APlease share the official discounted application form links and voucher codes for these colleges.`;
    return `https://wa.me/919560020771?text=${msg}`;
  };

  // Handle lead submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        category: 'mba-form-discount-combo',
        source: 'MBA Form Combo Discount Page',
        program: `MBA/PGDM Form Bundle (${calculation.count} Colleges)`,
        college: selectedColleges.map(c => c.shortName).join(', '),
        details: {
          colleges: selectedColleges.map(c => ({
            name: c.name,
            officialFee: c.officialFee,
            discountedFee: c.discountedFee
          })),
          totalOfficial: calculation.totalOfficial,
          totalDiscounted: calculation.totalDiscounted,
          totalSavings: calculation.totalSavings,
          promoCode: appliedPromo?.code || 'NONE',
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
      console.error('Lead submission failed', err);
      setIsSubmitted(true); // Still allow user to proceed to WhatsApp
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full text-slate-100">
      
      {/* ── 1. POPULAR CURATED COMBOS CAROUSEL ── */}
      <section className="mb-14">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              1-Click Fast Bundles
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Popular High-ROI Curated Combos
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Select pre-designed high-converting B-school combinations tailored by expert mentor Mohit Jain.
            </p>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 shrink-0">
            Click any combo to auto-load in builder
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CURATED_COMBOS.map((combo) => {
            const comboColleges = MBA_FORM_COLLEGES.filter(c => combo.collegeIds.includes(c.id));
            const officialSum = comboColleges.reduce((s, c) => s + c.officialFee, 0);
            const discountedSum = comboColleges.reduce((s, c) => s + c.discountedFee, 0);
            const savingsSum = officialSum - discountedSum;
            const savingsPct = Math.round((savingsSum / officialSum) * 100);
            const isCurrentActive = combo.collegeIds.every(id => selectedIds.includes(id)) && selectedIds.length === combo.collegeIds.length;

            return (
              <div
                key={combo.id}
                onClick={() => loadCombo(combo)}
                className={`group cursor-pointer relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                  isCurrentActive
                    ? 'bg-gradient-to-b from-blue-900/60 to-indigo-950/80 border-blue-400 shadow-xl shadow-blue-950/50 scale-[1.02]'
                    : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-800 hover:border-slate-600 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-md">
                      {combo.tag}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium bg-slate-800 px-2 py-0.5 rounded">
                      {combo.region}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {combo.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-semibold mt-1 line-clamp-2">
                    {combo.subtitle}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 line-through">
                        Official: ₹{officialSum.toLocaleString()}
                      </div>
                      <div className="text-lg font-black text-emerald-400">
                        ₹{discountedSum.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-2 py-1 rounded-md">
                        Save ₹{savingsSum.toLocaleString()} ({savingsPct}%)
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-blue-200/90 bg-blue-950/60 p-2 rounded-lg border border-blue-800/40 flex items-start gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                    <span>{combo.bonusPerk}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3">
                  <button
                    type="button"
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isCurrentActive
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'bg-blue-600/20 text-blue-300 group-hover:bg-blue-600 group-hover:text-white'
                    }`}
                  >
                    {isCurrentActive ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Combo Applied</span>
                      </>
                    ) : (
                      <>
                        <span>Apply This Combo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 2. INTERACTIVE BUILDER CONTROLS & SEARCH ── */}
      <section id="combo-builder-grid" className="scroll-mt-24 mb-8">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-xl space-y-5">
          
          {/* Top Bar: Search + Region Filter Pills */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search from 55+ colleges by name, city, recruiter (e.g. NDIM, FOSTIIMA, FIIB, Pune, Bangalore)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    selectedRegion === region
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {region} {region === 'All' ? `(55)` : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Controls: City, Sorting, Quick Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80 text-xs">
            
            {/* City Sub-filters (if Delhi NCR or All) */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> City:
              </span>
              {['All', 'New Delhi', 'Greater Noida', 'Gurugram', 'Ghaziabad', 'Pune', 'Mumbai', 'Bangalore']
                .filter(c => selectedRegion === 'All' || (selectedRegion === 'Delhi NCR' ? ['All', 'New Delhi', 'Greater Noida', 'Gurugram', 'Ghaziabad'].includes(c) : [selectedRegion, 'All'].includes(c)))
                .map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                      selectedCity === city
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {city}
                  </button>
                ))}
            </div>

            {/* Sort & Quick Select Actions */}
            <div className="flex items-center gap-3 ml-auto flex-wrap">
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <label htmlFor="sort-dropdown" className="sr-only">Sort colleges</label>
                <select
                  id="sort-dropdown"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="discount">Sort: Highest Discount %</option>
                  <option value="savings">Sort: Maximum Rupee Savings</option>
                  <option value="fee-low">Sort: Lowest Discounted Fee</option>
                  <option value="placement">Sort: Avg Placement Package</option>
                  <option value="alpha">Sort: Alphabetical (A-Z)</option>
                </select>
              </div>

              <button
                onClick={selectAllFiltered}
                className="text-blue-400 hover:text-blue-300 font-semibold hover:underline"
              >
                + Select All Filtered ({filteredColleges.length})
              </button>

              {selectedIds.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="text-rose-400 hover:text-rose-300 font-semibold hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ── 3. MAIN GRID & STICKY CART LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Column: 55 Colleges Cards Grid (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
            <span>Showing <strong className="text-white">{filteredColleges.length}</strong> colleges</span>
            <span><strong className="text-emerald-400">{selectedIds.length}</strong> selected in your custom combo</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredColleges.map((college) => {
              const isSelected = selectedIds.includes(college.id);

              return (
                <div
                  key={college.id}
                  onClick={() => toggleCollege(college.id)}
                  className={`relative rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#0f244a] to-[#0a1832] border-blue-400 shadow-lg shadow-blue-950/40 ring-1 ring-blue-400'
                      : 'bg-slate-900/70 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Top Row: Location + Selection Checkbox */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="truncate max-w-[180px]">{college.location}</span>
                      </div>
                      
                      {/* Checkbox button */}
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                          isSelected
                            ? 'bg-blue-600 text-white ring-2 ring-blue-400/40'
                            : 'border-2 border-slate-600 bg-slate-950/50 group-hover:border-slate-400'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                    </div>

                    {/* College Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-blue-200 transition-colors leading-snug">
                      {college.name}
                    </h3>

                    {/* Accreditation Badge & Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-[10px] font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                        {college.accreditation.split('·')[0].trim()}
                      </span>
                      {college.badge && (
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                          {college.badge}
                        </span>
                      )}
                    </div>

                    {/* Key Highlight */}
                    <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                      {college.highlight}
                    </p>

                    {/* Placement Metrics */}
                    <div className="mt-3.5 grid grid-cols-2 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-xs">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">Avg Placement</span>
                        <span className="text-slate-200 font-bold">{college.avgPlacement}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">Highest Package</span>
                        <span className="text-emerald-400 font-bold">{college.highestPlacement}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Pricing Breakdown & Selection CTA */}
                  <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <span className="line-through">₹{college.officialFee.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded">
                          {college.discountPercent}% OFF
                        </span>
                      </div>
                      <div className="text-lg font-extrabold text-white flex items-baseline gap-1">
                        <span className="text-emerald-400">₹{college.discountedFee.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-400 font-normal">combo rate</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCollege(college.id);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-950/30'
                          : 'bg-blue-600 hover:bg-blue-500 text-white'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <span>+ Add to Combo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredColleges.length === 0 && (
            <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
              <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-300">No colleges matched your filters</h3>
              <p className="text-sm text-slate-500 mt-1">Try searching a different city or clearing search keyword.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRegion('All');
                  setSelectedCity('All');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Combo Summary Cart (4 cols on desktop) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          
          <div className="bg-gradient-to-b from-slate-900 via-[#0a1832] to-slate-950 border-2 border-blue-500/40 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Your Custom Combo
                </div>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  Form Cost Breakdown
                </h3>
              </div>
              <span className="bg-blue-600 text-white text-xs font-black px-2.5 py-1 rounded-full">
                {calculation.count} {calculation.count === 1 ? 'College' : 'Colleges'}
              </span>
            </div>

            {/* Selected Colleges Pill List */}
            {selectedColleges.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                {selectedColleges.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between gap-2 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-200 truncate">{c.shortName}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2">
                        <span className="line-through">₹{c.officialFee}</span>
                        <span className="text-emerald-400 font-semibold">₹{c.discountedFee}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCollege(c.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded-md transition-colors"
                      title="Remove from combo"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-slate-950/40 rounded-xl border border-dashed border-slate-800 text-xs text-slate-400">
                No colleges selected yet. Click "+ Add to Combo" on any college card to build your bundle.
              </div>
            )}

            {/* Tiered Combo Milestone Bonus Progress */}
            <div className="mt-4 pt-4 border-t border-slate-800/80">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-amber-400" /> Combo Tier Bonus
                </span>
                <span className="text-[11px] text-amber-300 font-extrabold">
                  {selectedColleges.length < 2 && '1/3 to Unlock Bonus'}
                  {selectedColleges.length === 2 && 'Tier 1 Active (10% Extra)'}
                  {selectedColleges.length >= 3 && selectedColleges.length < 5 && 'Tier 2 Active (GD-PI Free)'}
                  {selectedColleges.length >= 5 && '👑 VIP Platinum Active'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(15, (selectedColleges.length / 5) * 100))}%`
                  }}
                />
              </div>

              <div className="text-[11px] bg-blue-950/40 border border-blue-900/50 rounded-xl p-2.5 text-blue-200 leading-snug">
                {selectedColleges.length < 2 && (
                  <span>💡 Add 1 more college to activate combo rate vouchers and extra bonus coupons.</span>
                )}
                {selectedColleges.length === 2 && (
                  <span>🎉 <strong>Tier 1 Active:</strong> Add 1 more college to unlock <strong>Free GD-PI Masterclass worth ₹2,999</strong>!</span>
                )}
                {selectedColleges.length >= 3 && selectedColleges.length < 5 && (
                  <span>🔥 <strong>Tier 2 Unlocked:</strong> Free GD-PI Masterclass + 1-on-1 Profile Strategy Call with Mohit Jain!</span>
                )}
                {selectedColleges.length >= 5 && (
                  <span>👑 <strong>VIP Platinum:</strong> 100% Free Resume Review + VIP Admissions Desk Fast-Track Application Code!</span>
                )}
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. MOHIT2027)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white uppercase placeholder:normal-case placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Apply
                </button>
              </div>

              {promoError && (
                <div className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                  <X className="w-3 h-3 shrink-0" />
                  <span>{promoError}</span>
                </div>
              )}

              {appliedPromo && promoSuccess && (
                <div className="text-[11px] text-emerald-400 mt-1.5 flex items-center justify-between gap-1 bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                  <span className="font-semibold">{promoSuccess}</span>
                  <button type="button" onClick={removePromo} className="text-slate-400 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </form>

            {/* Summary Price Math */}
            <div className="mt-5 pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Official Form Fee Total:</span>
                <span className="line-through text-slate-300 font-medium">₹{calculation.totalOfficial.toLocaleString()}</span>
              </div>

              {calculation.extraDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-400 font-medium">
                  <span>Promo Code Discount:</span>
                  <span>- ₹{calculation.extraDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-sm">
                <span className="font-bold text-white">Your Discounted Combo Price:</span>
                <span className="text-xl font-black text-emerald-400">₹{calculation.totalDiscounted.toLocaleString()}</span>
              </div>

              {calculation.totalSavings > 0 && (
                <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-2.5 text-center text-emerald-300 font-extrabold text-xs">
                  🎉 Total Instant Savings: ₹{calculation.totalSavings.toLocaleString()} ({calculation.overallSavingsPercent}% OFF)
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-5 space-y-2.5">
              <button
                type="button"
                disabled={selectedColleges.length === 0}
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
                  selectedColleges.length > 0
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-110 active:scale-[0.98] text-slate-950 shadow-xl shadow-amber-500/20 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Get Application Vouchers Now</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href={selectedColleges.length > 0 ? generateWhatsAppUrl() : '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (selectedColleges.length === 0) {
                    e.preventDefault();
                    alert('Please select at least 1 college to generate WhatsApp vouchers.');
                  }
                }}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border ${
                  selectedColleges.length > 0
                    ? 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp Dispatch</span>
              </a>
            </div>

            <div className="mt-4 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>100% Authentic College Admission Cell Vouchers</span>
            </div>

          </div>

          {/* Quick Support Badge */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="font-bold text-white">Need Profile Matching Help?</div>
                <div className="text-slate-400 text-[11px]">Talk directly to Mohit Jain</div>
              </div>
            </div>
            <a
              href="tel:+919560020771"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold p-2.5 rounded-xl shrink-0 transition-colors"
              title="Call Helpline"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>

      {/* ── 4. HOW IT WORKS / TRANSPARENCY SECTION ── */}
      <section className="mb-16 bg-gradient-to-r from-slate-900 via-[#0A1A36] to-slate-900 rounded-3xl p-6 sm:p-10 border border-blue-900/40 shadow-2xl">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Zero Hidden Charges · 100% Official
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            How Do College Application Form Discounts Work?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            As an authorized institutional advisory portal, CareerWithMohit partners with premier AICTE/AIU approved management institutions to sponsor fee concessions and profile evaluation waivers for students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Build Your Combo',
              desc: 'Select 2 to 5+ colleges based on your location preference, budget, and percentile targets.'
            },
            {
              step: '02',
              title: 'Get Discount Codes',
              desc: 'Receive official discounted application links & fee waiver promo codes directly on WhatsApp & Email.'
            },
            {
              step: '03',
              title: 'Fill Official Forms',
              desc: 'Apply on the official college portals with discounted fees. Your form is received directly by the college admissions desk.'
            },
            {
              step: '04',
              title: 'Free GD-PI Mentorship',
              desc: 'Unlock complementary interview prep kits, mock GD-PI practice, and 1-on-1 strategy with Mohit Jain.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl relative group hover:border-blue-500/50 transition-all">
              <div className="text-3xl font-black text-blue-500/30 group-hover:text-blue-400/60 transition-colors mb-2">
                {item.step}
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. FREQUENTLY ASKED QUESTIONS (FAQ) ── */}
      <section className="mb-16 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            Everything You Need To Know
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Are these application forms authentic and official?',
              a: 'Yes, 100%. All application forms and discount vouchers are issued in direct collaboration with the official admissions directorates of the respective institutions (NDIM, FOSTIIMA, FIIB, JIMS, PIBM, SOIL, etc.). You fill out the official college portal form directly.'
            },
            {
              q: 'How do I pay the discounted fee for the colleges?',
              a: 'Once you submit your selected combination, our team generates a customized institutional voucher link or waiver code. When you apply on the college’s official registration page, the fee is automatically reduced to the discounted rate shown here.'
            },
            {
              q: 'Can I add colleges from different cities in one combo?',
              a: 'Absolutely! You can mix colleges across Delhi NCR, Pune, Mumbai, and Bangalore in a single bundle (e.g., NDIM Delhi + PIBM Pune + JAGSoM Bangalore). Your combo discount and bonus perks apply seamlessly.'
            },
            {
              q: 'What is the Free GD-PI Masterclass included with 3+ colleges?',
              a: 'Students who choose 3 or more colleges unlock access to CareerWithMohit’s Masterclass Series covering Group Discussion tactics, Personal Interview questions, Case-study analysis, and 1-on-1 Profile Strategy calls.'
            },
            {
              q: 'What if I already started filling a form on a college website?',
              a: 'You can still avail the discount voucher if you have not yet completed the final payment step. Contact our WhatsApp support at +91 95600 20771 with your application ID to link your discount.'
            }
          ].map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 hover:text-blue-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 6. FLOATING MOBILE DRAWER / SUMMARY BAR ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 backdrop-blur-xl px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-slate-400">
              {calculation.count} Colleges • <span className="line-through">₹{calculation.totalOfficial}</span>
            </div>
            <div className="text-base font-black text-emerald-400">
              ₹{calculation.totalDiscounted.toLocaleString()}
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded ml-1.5">
                Save ₹{calculation.totalSavings}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={selectedColleges.length === 0}
            onClick={() => setIsModalOpen(true)}
            className={`py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              selectedColleges.length > 0
                ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 text-slate-500'
            }`}
          >
            <span>Get Vouchers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── 7. APPLICATION / VOUCHER DISPATCH MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative my-8 text-left">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Instant Discount Voucher Dispatch
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Get Your Combo Form Links
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Enter your contact details to receive official application form URLs with discounted pricing directly on WhatsApp & Email.
                </p>

                {/* Selected Summary In Modal */}
                <div className="mt-4 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                  <div className="font-bold text-slate-300 flex items-center justify-between">
                    <span>Selected ({calculation.count} Colleges):</span>
                    <span className="text-emerald-400 font-extrabold text-sm">₹{calculation.totalDiscounted.toLocaleString()}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {selectedColleges.map(c => c.shortName).join(' • ')}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold">
                    Instant Rupee Savings: ₹{calculation.totalSavings.toLocaleString()} ({calculation.overallSavingsPercent}% OFF)
                  </div>
                </div>

                {/* Lead Form */}
                <form onSubmit={handleLeadSubmit} className="mt-5 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Candidate Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Current City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Delhi, Lucknow, Patna"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Target Exam / Percentile
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CAT 75%ile / MAT / CMAT"
                        value={formData.score}
                        onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Generating Official Vouchers...</span>
                    ) : (
                      <>
                        <span>Submit &amp; Open WhatsApp Voucher Links</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success View */
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <h3 className="text-2xl font-black text-white">
                  Application Combo Confirmed!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Your combo request for <strong className="text-white">{calculation.count} colleges</strong> has been logged. Total discounted amount is <strong className="text-emerald-400">₹{calculation.totalDiscounted.toLocaleString()}</strong> (You save ₹{calculation.totalSavings.toLocaleString()}).
                </p>

                <div className="pt-2">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-xl shadow-emerald-950/50 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Open Official Form Links in WhatsApp</span>
                  </a>
                </div>

                <div className="pt-2">
                  <Link
                    href="/book-session"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all"
                  >
                    <span>Book 1-on-1 Profile Strategy Call (Free)</span>
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
