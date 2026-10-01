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
  Percent,
  ExternalLink,
  Info,
  Copy,
  CheckCheck,
  Ticket,
  LayoutGrid,
  ListFilter,
  Calculator,
  Layers,
  Plus,
  Trash2,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';

export default function MbaFormDiscountCalculator() {
  // Active target college for "Get Coupon Code" modal trigger
  const [targetCollege, setTargetCollege] = useState<MbaFormCollege | null>(null);

  // Multi-college combo selection state
  const [selectedCollegeIds, setSelectedCollegeIds] = useState<string[]>(['ndim-delhi', 'fostiima-business-school', 'fiib-delhi']);
  const [promoCodeInput, setPromoCodeInput] = useState<string>('MOHIT2027');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(PROMO_CODES[0]);
  const [promoError, setPromoError] = useState<string>('');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('discount'); // 'discount', 'fee-low', 'savings', 'placement', 'alpha'
  const [quickFilter, setQuickFilter] = useState<'all' | 'popular' | 'high-discount' | 'budget' | 'top-placement' | 'free'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal & Lead state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'single' | 'combo'>('single');
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

  // Active FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Helper to generate college voucher code
  const getCollegeCode = (college: MbaFormCollege) => {
    if (college.code) return college.code;
    const clean = college.shortName.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 7);
    return `CWM-${clean}${college.discountPercent || 50}`;
  };

  // Combo calculations
  const selectedColleges = useMemo(() => {
    return MBA_FORM_COLLEGES.filter((c) => selectedCollegeIds.includes(c.id));
  }, [selectedCollegeIds]);

  const comboCalculations = useMemo(() => {
    const totalOfficialFee = selectedColleges.reduce((acc, c) => acc + c.officialFee, 0);
    const totalDiscountedFee = selectedColleges.reduce((acc, c) => acc + c.discountedFee, 0);
    const baseSavings = totalOfficialFee - totalDiscountedFee;

    let extraDiscount = 0;
    if (appliedPromo && selectedColleges.length >= appliedPromo.minColleges) {
      extraDiscount = appliedPromo.discountAmount || 0;
      if (appliedPromo.discountPercent) {
        extraDiscount += Math.round((totalDiscountedFee * appliedPromo.discountPercent) / 100);
      }
    }

    const finalPayable = Math.max(0, totalDiscountedFee - extraDiscount);
    const totalSavings = totalOfficialFee - finalPayable;
    const savingsPercent = totalOfficialFee > 0 ? Math.round((totalSavings / totalOfficialFee) * 100) : 0;

    return {
      totalOfficialFee,
      totalDiscountedFee,
      extraDiscount,
      finalPayable,
      totalSavings,
      savingsPercent,
      count: selectedColleges.length
    };
  }, [selectedColleges, appliedPromo]);

  // Toggle college in combo builder
  const handleToggleComboCollege = (collegeId: string) => {
    setSelectedCollegeIds((prev) => {
      if (prev.includes(collegeId)) {
        return prev.filter((id) => id !== collegeId);
      } else {
        if (prev.length >= 7) {
          alert('You can select up to 7 colleges in one combo builder.');
          return prev;
        }
        return [...prev, collegeId];
      }
    });
  };

  // Apply curated combo preset
  const handleApplyCuratedCombo = (combo: CuratedCombo) => {
    setSelectedCollegeIds(combo.collegeIds);
    const comboSection = document.getElementById('combo-calculator-section');
    if (comboSection) {
      comboSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Apply promo code
  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    const matched = PROMO_CODES.find((p) => p.code.toUpperCase() === code);

    if (!matched) {
      setPromoError('Invalid coupon code. Try MOHIT2027, EARLYBIRD, or COMBO500.');
      setAppliedPromo(null);
      return;
    }

    if (selectedColleges.length < matched.minColleges) {
      setPromoError(`Code ${matched.code} requires selecting at least ${matched.minColleges} colleges.`);
      setAppliedPromo(null);
      return;
    }

    setAppliedPromo(matched);
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
    setModalMode('single');
    setIsSubmitted(false);
    setCopiedCode(null);
    setIsModalOpen(true);
  };

  // Open modal for combo bundle
  const handleOpenComboModal = () => {
    if (selectedColleges.length === 0) {
      alert('Please select at least 1 college in the combo builder.');
      return;
    }
    setModalMode('combo');
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
      : `*Discounted Fee:* ₹${college.discountedFee}%0A*Instant Savings:* ₹${college.savings} (${college.discountPercent}%25 OFF)`;
    const msg = `Hi Mohit Sir, I want to apply for *${college.name}* with the official application discount voucher:%0A%0A*Applicant Name:* ${formData.name || 'Candidate'}%0A*WhatsApp:* ${formData.phone || 'N/A'}%0A*City:* ${formData.city || 'N/A'}%0A*Target Exam / Score:* ${formData.score || formData.exam}%0A%0A*College:* ${college.name}%0A*Official Fee:* ₹${college.officialFee}%0A${discountLine}%0A*Voucher Code:* ${code}%0A%0APlease evaluate my profile and share the direct application ERP link with free GD-PI prep.`;
    return `https://wa.me/919560020771?text=${msg}`;
  };

  // Generate WhatsApp message URL for multi-college combo
  const generateComboWhatsAppUrl = () => {
    const collegeNames = selectedColleges.map((c, i) => `${i + 1}. ${c.shortName} (Official ₹${c.officialFee} ➔ Pay ₹${c.discountedFee})`).join('%0A');
    const msg = `Hi Mohit Sir, I have created a customized *MBA Application Form Combo Pack* on CareerWithMohit:%0A%0A*Applicant Name:* ${formData.name || 'Candidate'}%0A*WhatsApp:* ${formData.phone || 'N/A'}%0A*City:* ${formData.city || 'N/A'}%0A*Target Exam:* ${formData.score || formData.exam}%0A%0A*Selected Colleges (${selectedColleges.length}):*%0A${collegeNames}%0A%0A*Total Official Fee:* ₹${comboCalculations.totalOfficialFee}%0A*Discounted Bundle Price:* ₹${comboCalculations.finalPayable}%0A*Total Cash Saved:* ₹${comboCalculations.totalSavings} (${comboCalculations.savingsPercent}%25 OFF)%0A*Applied Promo:* ${appliedPromo ? appliedPromo.code : 'None'}%0A%0APlease activate all my institutional discount codes and share direct application portal links.`;
    return `https://wa.me/919560020771?text=${msg}`;
  };

  // Handle lead submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const isSingle = modalMode === 'single' && targetCollege;
      const collegeSubject = isSingle ? targetCollege.name : selectedColleges.map((c) => c.shortName).join(', ');
      const singleCode = isSingle ? getCollegeCode(targetCollege) : 'COMBO-MULTIPLE';

      const payload = {
        name: formData.name,
        phone: formData.phone,
        number: formData.phone,
        email: formData.email,
        city: formData.city,
        location: formData.city || 'Online',
        category: 'mba-application-form-discount',
        source: isSingle ? `Discount Code - ${targetCollege.name}` : `MBA Form Combo Discount (${selectedColleges.length} Colleges)`,
        program: 'MBA / PGDM Admission 2027',
        course: 'MBA / PGDM',
        college: collegeSubject,
        message: isSingle
          ? `Candidate requested discount code for ${targetCollege.name}. Official: ₹${targetCollege.officialFee}, Discounted: ₹${targetCollege.discountedFee}, Savings: ₹${targetCollege.savings} (${targetCollege.discountPercent}% OFF), Code: ${singleCode}.`
          : `Candidate created combo of ${selectedColleges.length} colleges: [${selectedColleges.map((c) => c.name).join(', ')}]. Official Fee: ₹${comboCalculations.totalOfficialFee}, Final Payable: ₹${comboCalculations.finalPayable}, Saved: ₹${comboCalculations.totalSavings}.`,
        details: {
          mode: modalMode,
          colleges: isSingle ? [targetCollege.name] : selectedColleges.map((c) => c.name),
          officialFee: isSingle ? targetCollege.officialFee : comboCalculations.totalOfficialFee,
          finalPayable: isSingle ? targetCollege.discountedFee : comboCalculations.finalPayable,
          savings: isSingle ? targetCollege.savings : comboCalculations.totalSavings,
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
      setIsSubmitted(true); // Still show unlocked codes to student
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full text-white">

      {/* ── 1. DYNAMIC COMBO BUILDER & SAVINGS CALCULATOR (STICKY INTERACTIVE ENGINE) ── */}
      <section id="combo-calculator-section" className="mb-14 scroll-mt-24">
        <div className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#061124] via-[#0A1835] to-[#040C1A] border-2 border-[#00FF88]/40 p-6 sm:p-10 shadow-[0_20px_80px_rgba(0,255,136,0.15)] overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00FF88]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#00F0FF]/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] font-mono text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>Interactive MBA Form Combo Calculator 2027</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                Bundle 2 to 5 College Forms &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] via-[#00F0FF] to-[#8B5CF6]">Save ₹5,000+ Instantly</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Pick your dream and backup business schools from 55+ AICTE approved institutes. The engine automatically stacks institutional fee waivers and promo codes.
              </p>
            </div>

            {/* Live Savings Badge */}
            <div className="bg-black/60 border border-emerald-500/40 p-4 sm:p-5 rounded-2xl flex items-center gap-4 shrink-0 shadow-lg backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-[#00FF88]/20 border border-[#00FF88] flex items-center justify-center text-[#00FF88] shrink-0">
                <Flame className="w-7 h-7 fill-[#00FF88] text-transparent animate-pulse" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Your Total Cash Savings</div>
                <div className="font-display text-2xl sm:text-3xl font-black text-[#00FF88] flex items-baseline gap-1.5">
                  <span>₹{comboCalculations.totalSavings.toLocaleString()}</span>
                  <span className="text-xs font-mono text-white/80 font-normal">({comboCalculations.savingsPercent}% OFF)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Currently Selected Colleges Chips */}
          <div className="pt-6 relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-mono text-xs text-slate-300 font-bold uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00F0FF]" />
                <span>Selected B-Schools in Combo ({selectedColleges.length}/7):</span>
              </div>
              {selectedColleges.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCollegeIds([])}
                  className="text-[11px] font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedColleges.map((college) => (
                <div
                  key={college.id}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.08] border border-white/20 text-xs font-bold text-white hover:border-[#00FF88]/60 transition-all backdrop-blur-md"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span className="font-display">{college.shortName}</span>
                  <span className="font-mono text-[10px] text-[#00FF88] bg-[#00FF88]/15 px-1.5 py-0.5 rounded">
                    Save ₹{college.savings}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleComboCollege(college.id)}
                    className="text-slate-400 hover:text-rose-400 p-0.5 rounded transition-colors cursor-pointer ml-1"
                    title="Remove from combo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {selectedColleges.length === 0 && (
                <div className="text-xs text-slate-400 italic py-2">
                  No colleges in combo yet. Pick from the 55 colleges below or select a popular combo preset!
                </div>
              )}
            </div>
          </div>

          {/* Calculation Matrix & Promo Code Section */}
          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            
            {/* Promo Code Input */}
            <div className="md:col-span-5 space-y-2">
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Apply Bundle Voucher / Promo Code:
              </label>
              <form onSubmit={handleApplyPromoCode} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. MOHIT2027, EARLYBIRD"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                  className="flex-1 px-3.5 py-2.5 bg-black/50 border border-white/20 rounded-xl text-xs font-mono uppercase text-[#00FF88] placeholder-slate-500 focus:outline-none focus:border-[#00FF88]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white font-mono text-xs font-bold rounded-xl transition-all border border-white/20 cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {appliedPromo && (
                <div className="text-[11px] font-mono text-[#00FF88] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88]" />
                  <span>Promo <strong>{appliedPromo.code}</strong> applied! ({appliedPromo.description})</span>
                </div>
              )}
              {promoError && (
                <div className="text-[11px] font-mono text-rose-400 flex items-center gap-1">
                  <X className="w-3.5 h-3.5 text-rose-400" />
                  <span>{promoError}</span>
                </div>
              )}
            </div>

            {/* Financial Summary Breakdown */}
            <div className="md:col-span-4 bg-black/40 border border-white/10 p-4 rounded-2xl text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Official Form Fee Total:</span>
                <span className="line-through">₹{comboCalculations.totalOfficialFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Institutional Concessions:</span>
                <span className="text-[#00FF88] font-bold">- ₹{(comboCalculations.totalOfficialFee - comboCalculations.totalDiscountedFee).toLocaleString()}</span>
              </div>
              {comboCalculations.extraDiscount > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span>Extra Promo Bonus:</span>
                  <span className="font-bold">- ₹{comboCalculations.extraDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white font-display">
                <span>You Pay Only:</span>
                <span className="text-[#00FF88] font-black text-base">₹{comboCalculations.finalPayable.toLocaleString()}</span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="md:col-span-3 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleOpenComboModal}
                disabled={selectedColleges.length === 0}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00FF88] via-[#00F0FF] to-[#00FF88] hover:brightness-110 active:scale-[0.98] text-black font-display font-black text-xs sm:text-sm transition-all shadow-[0_0_30px_rgba(0,255,136,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Ticket className="w-4 h-4 text-black" />
                <span>Claim All Discount Codes</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <a
                href={generateComboWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/50 hover:bg-[#25D366]/30 text-[#25D366] font-display font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Claim</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. CURATED POPULAR COMBO PACKS (HIGH-CTR SHORTCUTS) ── */}
      <section className="mb-14">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-slate-200 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            Fast 1-Click Regional Packages
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
            Curated MBA Form Combo Packs (Batch 2027–2029)
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5">
            Click any pack below to load all colleges into the savings builder and unlock free GD-PI mock interview slots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CURATED_COMBOS.map((combo) => {
            const collegesInCombo = MBA_FORM_COLLEGES.filter((c) => combo.collegeIds.includes(c.id));
            const officialTotal = collegesInCombo.reduce((acc, c) => acc + c.officialFee, 0);
            const discountedTotal = collegesInCombo.reduce((acc, c) => acc + c.discountedFee, 0);
            const totalSaved = officialTotal - discountedTotal;
            const isSelected = combo.collegeIds.every((id) => selectedCollegeIds.includes(id)) && selectedCollegeIds.length === combo.collegeIds.length;

            return (
              <div
                key={combo.id}
                className={`relative rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between backdrop-blur-xl group hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#0A2540] to-[#061124] border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.2)]'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                }`}
              >
                <div>
                  {/* Tag & Region */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] font-bold text-[#F59E0B] bg-[#F59E0B]/15 border border-[#F59E0B]/30 px-2.5 py-0.5 rounded-full truncate">
                      {combo.tag}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 bg-white/10 px-2 py-0.5 rounded">
                      {combo.region}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display text-base font-extrabold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                    {combo.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono mt-1 mb-3">
                    {combo.subtitle}
                  </p>

                  {/* College Micro Pills */}
                  <div className="space-y-1.5 mb-4">
                    {collegesInCombo.map((c) => (
                      <div key={c.id} className="flex items-center justify-between text-[11px] bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5 font-mono">
                        <span className="text-slate-200 truncate">{c.shortName}</span>
                        <span className="text-[#00FF88] font-bold">₹{c.discountedFee}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bonus Perk Strip */}
                  <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-[11px] text-amber-300 font-medium flex items-center gap-1.5 mb-4">
                    <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="line-clamp-2">{combo.bonusPerk}</span>
                  </div>
                </div>

                {/* Pricing & Apply Button */}
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 line-through block">₹{officialTotal.toLocaleString()}</span>
                      <span className="text-base font-black text-white font-display">₹{discountedTotal.toLocaleString()}</span>
                    </div>
                    <span className="bg-[#00FF88]/15 text-[#00FF88] font-bold px-2 py-1 rounded-lg text-xs">
                      Save ₹{totalSaved.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApplyCuratedCombo(combo)}
                    className={`w-full py-2.5 px-3 rounded-xl font-display font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#00FF88] text-black shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Loaded in Calculator</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Load This Combo</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. SEARCH, FILTER & DIRECTORY BAR ── */}
      <section id="colleges-catalogue" className="scroll-mt-24 mb-10">
        <div className="bg-[#061124]/90 border border-white/15 rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 backdrop-blur-2xl shadow-[0_34px_70px_-30px_rgba(6,17,36,0.7)] space-y-6">
          
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
                className="w-full pl-11 pr-10 py-3.5 bg-white/[0.05] border border-white/15 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#00FF88] focus:ring-2 focus:ring-[#00FF88]/20 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
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
                      ? 'bg-gradient-to-r from-[#00FF88] to-[#00F0FF] text-black shadow-[0_0_20px_rgba(0,255,136,0.3)]'
                      : 'bg-white/[0.06] text-white/80 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {region} {region === 'All' ? `(55)` : region === 'Delhi NCR' ? `(34)` : region === 'Pune' ? `(8)` : region === 'Mumbai' ? `(6)` : `(7)`}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filters Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-mono text-slate-400 font-semibold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#F59E0B]" /> Filter:
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
                    ? 'bg-[#F59E0B] text-[#061124] shadow-md shadow-amber-500/20'
                    : 'bg-white/[0.04] border border-white/10 text-white/80 hover:border-white/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Secondary Controls: City, Sorting, View Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs">
            
            {/* City Sub-filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 font-semibold flex items-center gap-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" /> City:
              </span>
              {['All', 'New Delhi', 'Greater Noida', 'Gurugram', 'Ghaziabad', 'Pune', 'Mumbai', 'Bangalore']
                .filter((c) => selectedRegion === 'All' || (selectedRegion === 'Delhi NCR' ? ['All', 'New Delhi', 'Greater Noida', 'Gurugram', 'Ghaziabad'].includes(c) : [selectedRegion, 'All'].includes(c)))
                .map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-2.5 py-1 rounded-lg transition-colors font-medium cursor-pointer ${
                      selectedCity === city
                        ? 'bg-[#8B5CF6] text-white shadow-sm'
                        : 'bg-white/[0.05] text-slate-300 hover:bg-white/10 hover:text-white'
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
                  className="bg-[#070A14] border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#00FF88] cursor-pointer"
                >
                  <option value="discount">Sort: Highest Discount %</option>
                  <option value="savings">Sort: Maximum Rupee Savings</option>
                  <option value="fee-low">Sort: Lowest Discounted Fee</option>
                  <option value="placement">Sort: Highest Avg Placement</option>
                  <option value="alpha">Sort: Alphabetical (A-Z)</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-white/[0.05] p-0.5 rounded-lg border border-white/15">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-[#00F0FF] text-black font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'table' ? 'bg-[#00F0FF] text-black font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Table View"
                >
                  <ListFilter className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="font-mono text-slate-400 text-xs">
                Showing <strong className="text-white">{filteredColleges.length}</strong> colleges
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. MAIN 55 COLLEGES GRID / DIRECTORY ── */}
      <section className="mb-16">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college) => {
              const voucherCode = getCollegeCode(college);
              const isInCombo = selectedCollegeIds.includes(college.id);

              return (
                <div
                  key={college.id}
                  className={`relative rounded-[28px] p-6 border transition-all duration-300 flex flex-col justify-between group overflow-hidden backdrop-blur-xl shadow-xl ${
                    isInCombo
                      ? 'border-[#00FF88] bg-white/[0.07] shadow-[0_0_30px_rgba(0,255,136,0.2)]'
                      : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-[#00FF88]/50 hover:shadow-[0_0_35px_rgba(0,255,136,0.15)]'
                  }`}
                >
                  
                  {/* Top Notch: Discount Ribbon + Badges + Combo Check */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      {/* Luminous Discount Badge */}
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] font-mono text-xs font-black tracking-wide shadow-sm">
                        <Percent className="w-3.5 h-3.5 text-[#00FF88] stroke-[3]" />
                        <span>{college.discountNote || `${college.discountPercent}% OFF`}</span>
                      </div>

                      {/* Combo Quick Toggle Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleComboCollege(college.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold transition-all cursor-pointer ${
                          isInCombo
                            ? 'bg-[#00FF88] text-black shadow-[0_0_10px_#00FF88]'
                            : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/15'
                        }`}
                        title={isInCombo ? 'Remove from combo builder' : 'Add to combo builder'}
                      >
                        {isInCombo ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>In Combo</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Add to Combo</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* City Location */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1.5 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                      <span className="truncate">{college.location}</span>
                    </div>

                    {/* College Name */}
                    <h3 className="font-display text-lg font-extrabold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                      {college.name}
                    </h3>

                    {/* Accreditation Tag */}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="font-mono text-[10px] font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                        {college.accreditation.split('·')[0].trim()}
                      </span>
                      {college.grade && (
                        <span className="font-mono text-[10px] font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md">
                          {college.grade}
                        </span>
                      )}
                    </div>

                    {/* Highlight */}
                    <p className="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                      {college.highlight}
                    </p>

                    {/* Placement Metrics */}
                    <div className="mt-4 grid grid-cols-2 gap-2 bg-black/40 p-3 rounded-2xl border border-white/10 text-xs">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Avg CTC</span>
                        <span className="text-slate-100 font-bold">{college.avgPlacement}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Highest Package</span>
                        <span className="text-[#00FF88] font-bold">{college.highestPlacement}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Ticket Cutout & Action Button */}
                  <div className="mt-5 pt-4 border-t border-dashed border-white/15 space-y-3.5">
                    
                    {/* Cost Breakdown */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                          <span className="line-through text-slate-400">Official: ₹{college.officialFee.toLocaleString()}</span>
                          <span className="text-[#00FF88] font-bold bg-[#00FF88]/10 px-1.5 py-0.5 rounded text-[10px]">
                            {college.discountNote ? 'Profile Waiver' : `Save ₹${college.savings.toLocaleString()}`}
                          </span>
                        </div>
                        <div className="font-display text-xl font-black text-white flex items-baseline gap-1 mt-0.5">
                          {college.discountNote ? (
                            <span className="text-[#00FF88] text-base sm:text-lg">Depends on Profile</span>
                          ) : (
                            <>
                              <span className="text-[#00FF88]">₹{college.discountedFee.toLocaleString()}</span>
                              <span className="text-[10px] text-slate-400 font-normal">form fee</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">Voucher Code</span>
                        <span className="font-mono text-[11px] font-bold text-[#00FF88] bg-[#00FF88]/10 px-2 py-0.5 rounded border border-[#00FF88]/25 inline-flex items-center gap-1">
                          🔒 Locked Code
                        </span>
                      </div>
                    </div>

                    {/* Primary Button: GET COUPON CODE */}
                    <button
                      type="button"
                      onClick={() => handleOpenSingleModal(college)}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00FF88] via-[#00F0FF] to-[#00FF88] hover:brightness-110 active:scale-[0.98] text-black font-display font-black text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Ticket className="w-4 h-4 text-black" />
                      <span>{college.discountNote ? 'Get Profile Evaluation & Code' : `Get Coupon Code (Save ₹${college.savings.toLocaleString()})`}</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE DIRECTORY VIEW */
          <div className="bg-[#061124] border border-white/15 rounded-[28px] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-black/40 font-mono text-[11px] uppercase tracking-wider text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="py-4 px-4 text-center">Combo</th>
                    <th className="py-4 px-5">College Name</th>
                    <th className="py-4 px-3">City</th>
                    <th className="py-4 px-3">Avg CTC</th>
                    <th className="py-4 px-3">Official Fee</th>
                    <th className="py-4 px-3">Discounted Fee</th>
                    <th className="py-4 px-3">Savings</th>
                    <th className="py-4 px-5 text-right">Get Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredColleges.map((college) => {
                    const isInCombo = selectedCollegeIds.includes(college.id);

                    return (
                      <tr key={college.id} className="hover:bg-white/[0.04] transition-colors">
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isInCombo}
                            onChange={() => handleToggleComboCollege(college.id)}
                            className="w-4 h-4 accent-[#00FF88] rounded cursor-pointer"
                            title="Select for combo builder"
                          />
                        </td>
                        <td className="py-4 px-5 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <span className="font-display">{college.name}</span>
                            {college.badge && (
                              <span className="font-mono text-[9px] bg-[#F59E0B]/20 text-[#F59E0B] px-2 py-0.5 rounded-full">
                                {college.badge}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-3 text-slate-400">{college.city}</td>
                        <td className="py-4 px-3 font-semibold text-[#00FF88]">{college.avgPlacement}</td>
                        <td className="py-4 px-3 line-through text-slate-400 font-mono">₹{college.officialFee}</td>
                        <td className="py-4 px-3 font-bold text-white text-sm font-mono">
                          {college.discountNote ? <span className="text-[#00FF88] text-xs">Profile-Based</span> : `₹${college.discountedFee}`}
                        </td>
                        <td className="py-4 px-3">
                          <span className="font-mono bg-[#00FF88]/10 text-[#00FF88] px-2.5 py-1 rounded-lg font-bold">
                            {college.discountNote || `${college.discountPercent}% OFF`}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button
                            onClick={() => handleOpenSingleModal(college)}
                            className="px-4 py-2 bg-[#00FF88] hover:bg-[#00e67a] text-black font-display font-extrabold rounded-xl text-xs transition-colors cursor-pointer shadow-md inline-flex items-center gap-1.5"
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
          <div className="text-center py-16 bg-white/[0.03] rounded-[32px] border border-white/10 p-8">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300">No colleges matched your filters</h3>
            <p className="text-sm text-slate-400 mt-1">Try searching a different city or clearing the search keyword.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All');
                setSelectedCity('All');
                setQuickFilter('all');
              }}
              className="mt-4 px-5 py-2.5 bg-[#00FF88] hover:bg-[#00e67a] text-black font-display font-extrabold text-xs rounded-full cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* ── 5. HOW TO USE DISCOUNT CODES SECTION ── */}
      <section className="mb-16 bg-[#061124] rounded-[32px] sm:rounded-[40px] p-7 sm:p-12 border border-white/15 shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-80 h-80 rounded-full bg-[#00F0FF]/15 blur-[80px] pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00FF88]" />
            Zero Hidden Charges · 100% Official
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            How to Get &amp; Use Your College Application Discount Code
          </h2>
          <p className="text-white/75 text-sm sm:text-base mt-2 leading-relaxed">
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
            <div key={idx} className="bg-black/40 border border-white/10 p-5 rounded-2xl relative group hover:border-[#00FF88]/50 transition-all">
              <div className="font-display text-3xl font-black text-white/20 group-hover:text-[#00FF88] transition-colors mb-2">
                {item.step}
              </div>
              <h3 className="font-display text-base font-bold text-white mb-1.5">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. INQUIRY MODAL / UNLOCK DISCOUNT CODE POPUP ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#070A14] border border-white/20 rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-[0_0_80px_rgba(0,240,255,0.15)] relative my-8 text-left max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
                setTargetCollege(null);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Modal Top Header */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] font-mono text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  {modalMode === 'single' ? 'Instant Discount Code Request' : 'Combo Discount Pack Activation'}
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-black text-white">
                  {modalMode === 'single' && targetCollege
                    ? `Get Coupon Code: ${targetCollege.shortName}`
                    : `Unlock All Discount Codes (${selectedColleges.length} Colleges)`}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Fill in your candidate details below to instantly unveil official institutional coupon codes &amp; direct application links.
                </p>

                {/* Voucher Card inside Modal */}
                {modalMode === 'single' && targetCollege ? (
                  <div className="mt-4 bg-[#061124] p-4 rounded-2xl border border-cyan-400/30 text-xs space-y-2 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-extrabold text-sm text-white">{targetCollege.name}</span>
                      <span className="font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full font-black text-[11px]">
                        {targetCollege.discountNote || `${targetCollege.discountPercent}% OFF`}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 font-mono">{targetCollege.location}</div>
                    
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 line-through text-[11px] font-mono">Official: ₹{targetCollege.officialFee}</span>
                        <div className="font-display text-base font-black text-[#00FF88]">
                          {targetCollege.discountNote ? 'Discount: Depends on Profile' : `Discounted Fee: ₹${targetCollege.discountedFee}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[11px] text-[#00FF88] bg-[#00FF88]/10 px-2.5 py-1 rounded-lg font-bold">
                          {targetCollege.discountNote ? 'Profile Concession' : `You Save ₹${targetCollege.savings}`}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 bg-[#061124] p-4 rounded-2xl border border-[#00FF88]/40 text-xs space-y-2 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-extrabold text-sm text-white">{selectedColleges.length} Selected Colleges Bundle</span>
                      <span className="font-mono bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30 px-2 py-0.5 rounded-full font-black text-[11px]">
                        Save ₹{comboCalculations.totalSavings.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 font-mono line-clamp-2">
                      {selectedColleges.map((c) => c.shortName).join(' + ')}
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/10 flex justify-between font-mono text-[11px]">
                      <span className="text-slate-400">Total Official: <span className="line-through">₹{comboCalculations.totalOfficialFee}</span></span>
                      <span className="text-[#00FF88] font-bold">Payable: ₹{comboCalculations.finalPayable}</span>
                    </div>
                  </div>
                )}

                {/* Inquiry Lead Form */}
                <form onSubmit={handleLeadSubmit} className="mt-5 space-y-3.5">
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
                      className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00FF88]"
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
                        className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00FF88]"
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
                        className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00FF88]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Current City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Delhi, Pune, Patna"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00FF88]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Target Exam / %ile
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CAT 75% / MAT / CMAT"
                        value={formData.score}
                        onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00FF88]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3.5 bg-gradient-to-r from-[#00FF88] to-[#00F0FF] hover:brightness-110 text-black font-display font-black text-sm rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Unlocking Coupon Codes...</span>
                    ) : (
                      <>
                        <Ticket className="w-4 h-4" />
                        <span>Unlock Coupon Codes &amp; Direct Links</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success / Unveiled Code View */
              <div className="text-center py-2 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00FF88]/20 border-2 border-[#00FF88] flex items-center justify-center mx-auto text-[#00FF88] shadow-[0_0_30px_rgba(0,255,136,0.35)] animate-pulse">
                  <CheckCheck className="w-9 h-9 stroke-[3]" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] font-mono text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                    Codes Unlocked Successfully!
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                    Here are your Discount Voucher Codes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm mx-auto">
                    Use these official institutional codes during registration on each respective college portal.
                  </p>
                </div>

                {/* Unveiled Codes List */}
                <div className="space-y-3 text-left max-h-60 overflow-y-auto pr-1">
                  {(modalMode === 'single' && targetCollege ? [targetCollege] : selectedColleges).map((college) => {
                    const code = getCollegeCode(college);
                    const isCopied = copiedCode === code;

                    return (
                      <div key={college.id} className="bg-[#061124] border border-[#00FF88]/40 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-inner">
                        <div>
                          <div className="font-display font-extrabold text-white text-xs sm:text-sm">{college.shortName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            Fee: <span className="line-through">₹{college.officialFee}</span> ➔ <span className="text-[#00FF88] font-bold">₹{college.discountedFee}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-xs font-bold text-[#00FF88] bg-black/60 px-2.5 py-1.5 rounded-lg border border-[#00FF88]/30 select-all">
                            {code}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(code)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                            title="Copy code"
                          >
                            {isCopied ? <Check className="w-4 h-4 text-[#00FF88]" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* How to Apply Instructions */}
                <div className="bg-cyan-950/30 border border-cyan-800/30 p-3.5 rounded-2xl text-left text-xs text-cyan-200 space-y-1.5">
                  <div className="font-bold text-white flex items-center gap-1.5 font-mono text-xs">
                    <Info className="w-4 h-4 text-[#00F0FF]" /> 3 Simple Steps to Apply:
                  </div>
                  <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1 leading-relaxed">
                    <li>Copy your discount voucher code for the target institute.</li>
                    <li>Click the green WhatsApp button below to request the direct admissions portal link and instant profile verification.</li>
                    <li>Paste the coupon code on the official application page to instantly reduce your registration fee.</li>
                  </ol>
                </div>

                {/* WhatsApp Action */}
                <div className="space-y-2.5 pt-1">
                  <a
                    href={modalMode === 'single' && targetCollege ? generateSingleWhatsAppUrl(targetCollege) : generateComboWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-display font-black text-sm rounded-xl shadow-[0_0_30px_rgba(37,211,102,0.35)] transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-black text-[#25D366]" />
                    <span>Send on WhatsApp for Direct Portal Links &amp; GD-PI Prep</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsSubmitted(false);
                      setTargetCollege(null);
                    }}
                    className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-xs rounded-xl transition-all cursor-pointer border border-white/10"
                  >
                    Close &amp; Browse More Colleges
                  </button>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <Link
                    href="/book-session"
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
                  >
                    <span>Need GD-PI or College Shortlisting Help? Book Free 1-on-1 Mentorship</span>
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
