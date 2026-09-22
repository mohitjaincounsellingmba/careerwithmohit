"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Sparkles,
  GraduationCap,
  Building2,
  Laptop,
  Award,
  Globe,
  ArrowRight,
  Video,
  Target,
  Calculator,
  Percent,
  FileText,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { SearchInput } from './SearchInput';
import { Logo } from './Logo';
import { EducationTicker } from './EducationTicker';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollegesOpen, setIsCollegesOpen] = useState(false);
  const [isAdmissionsOpen, setIsAdmissionsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const collegesRef = useRef<HTMLDivElement>(null);
  const admissionsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle outside click & Escape key to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (collegesRef.current && !collegesRef.current.contains(event.target as Node)) {
        setIsCollegesOpen(false);
      }
      if (admissionsRef.current && !admissionsRef.current.contains(event.target as Node)) {
        setIsAdmissionsOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsCollegesOpen(false);
        setIsAdmissionsOpen(false);
        setIsToolsOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollegesOpen(false);
    setIsAdmissionsOpen(false);
    setIsToolsOpen(false);
  }, [pathname]);

  const collegeLinks = [
    {
      title: '770+ Colleges Directory',
      desc: 'All-India verified MBA, B.Tech & BBA institutes',
      href: '/colleges',
      icon: Building2,
      iconColor: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Top 20 IIMs & XLRI',
      desc: 'Tier-1 cutoffs, fee structures & audited placements',
      href: '/top-tier-mba-colleges?tab=iim',
      icon: GraduationCap,
      iconColor: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'High ROI B-Schools (< ₹10L)',
      desc: 'Best placement-to-fee ratio management colleges',
      href: '/colleges?budget=under-10l',
      icon: Sparkles,
      iconColor: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Delhi NCR, Pune & Bangalore Hubs',
      desc: 'City-wise top accredited college rankings',
      href: '/colleges',
      icon: Globe,
      iconColor: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'UGC-DEB Online Degrees',
      desc: '40+ NAAC A++ entitled flexible degree programs',
      href: '/online-degree-certification',
      icon: Laptop,
      iconColor: 'text-cyan-600 bg-cyan-50',
    },
  ];

  const admissionLinks = [
    {
      title: 'MBA Form Combo Discounts',
      desc: 'Save up to ₹5,000+ across 55+ top B-Schools',
      href: '/mba-application-form-discount',
      badge: 'Save ₹5k+',
      badgeColor: 'text-emerald-700 bg-emerald-100 font-bold',
      icon: Percent,
      iconColor: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Admissions 2027 Strategy Hub',
      desc: 'Direct & merit-based admission guidelines',
      href: '/admissions',
      icon: Sparkles,
      iconColor: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'MBA & PGDM 2027 Roadmap',
      desc: 'B-School shortlist criteria & GD-PI prep',
      href: '/mba-pgdm-admission-2027',
      icon: GraduationCap,
      iconColor: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Abroad Education Advisory',
      desc: 'USA, UK, Canada, Germany & Australia admissions',
      href: '/abroad-education',
      icon: Globe,
      iconColor: 'text-rose-600 bg-rose-50',
    },
    {
      title: 'Scholarships & Merit Grants',
      desc: 'Financial aid and fee concessions 2026-27',
      href: '/scholarships-2026',
      icon: Award,
      iconColor: 'text-slate-600 bg-slate-100',
    },
  ];

  const toolLinks = [
    {
      title: 'CAT 2026 Score Calculator',
      desc: 'Check response sheet & predict MBA percentile',
      href: '/tools/cat-score-calculator',
      badge: 'Popular',
      badgeColor: 'text-amber-700 bg-amber-100 font-bold',
      icon: Calculator,
      iconColor: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'MBA Form Discount Calculator',
      desc: 'Build custom application bundles & save money',
      href: '/mba-application-form-discount',
      badge: 'Save ₹',
      badgeColor: 'text-emerald-700 bg-emerald-100 font-bold',
      icon: Percent,
      iconColor: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Free ATS Resume Builder',
      desc: 'Placement-ready single-page resume generator',
      href: '/tools/ats-resume-builder',
      badge: 'Free AI',
      badgeColor: 'text-blue-700 bg-blue-100 font-bold',
      icon: FileText,
      iconColor: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'MAT Score & Percentile Checker',
      desc: 'Calculate scaled composite score out of 800',
      href: '/tools/mat-score-calculator',
      icon: Calculator,
      iconColor: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'B.Tech College Predictor',
      desc: 'Predict NITs, IIITs & state colleges by JEE rank',
      href: '/tools/btech-college-predictor',
      icon: Target,
      iconColor: 'text-rose-600 bg-rose-50',
    },
    {
      title: 'Accreditation Checker',
      desc: 'Verify NAAC, UGC-DEB, AICTE & AIU approval',
      href: '/tools/accreditation-checker',
      icon: ShieldCheck,
      iconColor: 'text-cyan-600 bg-cyan-50',
    },
  ];

  const isCollegesActive = pathname?.startsWith('/colleges') || pathname?.startsWith('/top-tier-mba');
  const isAdmissionActive = [
    '/admissions',
    '/mba-application-form-discount',
    '/mba-pgdm-admission-2027', 
    '/scholarships-2026', 
    '/abroad-education'
  ].includes(pathname || '');
  const isToolsActive = pathname?.startsWith('/tools') || pathname?.startsWith('/calculator');

  return (
    <>
      {/* 1. Live Admissions Alert Ticker Bar */}
      <EducationTicker />

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all shadow-xs" role="banner">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center shrink-0">
            <Logo variant="header" size="md" />
          </div>

          {/* Center: Clean, Concise Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] font-semibold text-slate-700" aria-label="Main navigation">
            
            {/* Colleges Dropdown */}
            <div 
              ref={collegesRef} 
              className="relative py-2"
              onMouseEnter={() => setIsCollegesOpen(true)}
              onMouseLeave={() => setIsCollegesOpen(false)}
            >
              <button 
                type="button"
                onClick={() => setIsCollegesOpen((prev) => !prev)}
                className={`flex items-center gap-1 transition-colors py-1 outline-none cursor-pointer whitespace-nowrap ${
                  isCollegesActive || isCollegesOpen ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
                }`}
                aria-expanded={isCollegesOpen}
                aria-haspopup="true"
              >
                <span>Colleges</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isCollegesOpen ? '-rotate-180 text-blue-600' : ''
                }`} />
              </button>

              <div 
                className={`absolute top-full left-0 pt-2 transition-all duration-200 z-50 ${
                  isCollegesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-1'
                }`}
              >
                <div className="w-80 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-2 flex flex-col gap-1 ring-1 ring-slate-900/5">
                  {collegeLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        prefetch={false}
                        onClick={() => setIsCollegesOpen(false)}
                        className={`p-2.5 rounded-xl transition-all flex items-start gap-3 ${
                          isActive ? 'bg-blue-50' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.iconColor}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${isActive ? 'text-blue-600' : 'text-slate-900'}`}>
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal leading-snug">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Admissions Dropdown */}
            <div 
              ref={admissionsRef} 
              className="relative py-2"
              onMouseEnter={() => setIsAdmissionsOpen(true)}
              onMouseLeave={() => setIsAdmissionsOpen(false)}
            >
              <button 
                type="button"
                onClick={() => setIsAdmissionsOpen((prev) => !prev)}
                className={`flex items-center gap-1 transition-colors py-1 outline-none cursor-pointer whitespace-nowrap ${
                  isAdmissionActive || isAdmissionsOpen ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
                }`}
                aria-expanded={isAdmissionsOpen}
                aria-haspopup="true"
              >
                <span>Admissions</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isAdmissionsOpen ? '-rotate-180 text-blue-600' : ''
                }`} />
              </button>

              <div 
                className={`absolute top-full left-0 pt-2 transition-all duration-200 z-50 ${
                  isAdmissionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-1'
                }`}
              >
                <div className="w-80 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-2 flex flex-col gap-1 ring-1 ring-slate-900/5">
                  {admissionLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        prefetch={false}
                        onClick={() => setIsAdmissionsOpen(false)}
                        className={`p-2.5 rounded-xl transition-all flex items-start justify-between gap-2 ${
                          isActive ? 'bg-blue-50' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.iconColor}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className={`text-xs font-bold ${isActive ? 'text-blue-600' : 'text-slate-900'}`}>
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500 font-normal leading-snug">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        {item.badge && (
                          <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded shrink-0 self-start mt-0.5 ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Free CBT Mock Tests Direct Link */}
            <Link
              href="/mock-tests"
              prefetch={false}
              className={`transition-colors py-1 relative whitespace-nowrap flex items-center gap-1.5 ${
                pathname === '/mock-tests' ? 'text-blue-600 font-bold' : 'hover:text-blue-600 text-slate-700'
              }`}
            >
              <span>Mock Tests</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-rose-100 text-rose-700 border border-rose-200 uppercase tracking-wider">
                CBT
              </span>
              {pathname === '/mock-tests' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </Link>

            {/* Tools & Calculators Dropdown */}
            <div 
              ref={toolsRef} 
              className="relative py-2"
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <button 
                type="button"
                onClick={() => setIsToolsOpen((prev) => !prev)}
                className={`flex items-center gap-1 transition-colors py-1 outline-none cursor-pointer whitespace-nowrap ${
                  isToolsActive || isToolsOpen ? 'text-blue-600 font-bold' : 'text-slate-700 hover:text-blue-600'
                }`}
                aria-expanded={isToolsOpen}
                aria-haspopup="true"
              >
                <span>Calculators</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isToolsOpen ? '-rotate-180 text-blue-600' : ''
                }`} />
              </button>

              <div 
                className={`absolute top-full left-0 pt-2 transition-all duration-200 z-50 ${
                  isToolsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-1'
                }`}
              >
                <div className="w-80 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-2 flex flex-col gap-1 ring-1 ring-slate-900/5">
                  {toolLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        prefetch={false}
                        onClick={() => setIsToolsOpen(false)}
                        className={`p-2.5 rounded-xl transition-all flex items-start justify-between gap-2 ${
                          isActive ? 'bg-blue-50' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.iconColor}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className={`text-xs font-bold ${isActive ? 'text-blue-600' : 'text-slate-900'}`}>
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500 font-normal leading-snug">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        {item.badge && (
                          <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded shrink-0 self-start mt-0.5 ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Articles / Blog */}
            <Link
              href="/blog"
              prefetch={false}
              className={`transition-colors py-1 relative whitespace-nowrap ${
                pathname?.startsWith('/blog') ? 'text-blue-600 font-bold' : 'hover:text-blue-600 text-slate-700'
              }`}
            >
              <span>Articles</span>
            </Link>
          </nav>

          {/* Right Action Group: Compact Search + WhatsApp + Streamlined Book CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <SearchInput />

            {/* Quick WhatsApp Chat Button */}
            <a 
              href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20expert%20admissions%20guidance" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8.5 h-8.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-600 hover:text-emerald-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shrink-0"
              title="Chat directly on WhatsApp (+91 95600 20771)"
              aria-label="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.18-.175.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.234-.244-.588-.493-.508-.676-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.278.495 1.716.634.723.23 1.381.198 1.901.12.579-.087 1.78-.727 2.03-1.43.251-.702.251-1.304.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.761.46 3.48 1.332 4.994L2 22l5.163-1.353a9.95 9.95 0 0 0 4.877 1.268h.004c5.512 0 9.99-4.477 9.99-9.99A9.94 9.94 0 0 0 12.04 2zm0 18.257h-.003a8.27 8.27 0 0 1-4.218-1.154l-.302-.18-3.136.823.837-3.056-.197-.314a8.27 8.27 0 0 1-1.267-4.386c0-4.57 3.719-8.289 8.29-8.289a8.25 8.25 0 0 1 5.86 2.43 8.25 8.25 0 0 1 2.428 5.86c0 4.571-3.719 8.289-8.289 8.289z"/>
              </svg>
            </a>

            {/* Mobile Google Meet Icon Button (Visible on mobile <lg) */}
            <Link 
              href="/book-session" 
              prefetch={false}
              className="lg:hidden w-8.5 h-8.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shrink-0 relative"
              title="Book Free 1-on-1 Google Meet Counselling"
              aria-label="Book Google Meet Counselling"
            >
              <Video className="w-4 h-4 text-blue-600" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white"></span>
              </span>
            </Link>

            {/* Desktop Compact Face-to-Face Counselling Button (Visible on lg+) */}
            <Link 
              href="/book-session" 
              prefetch={false}
              className="hidden lg:inline-flex h-8.5 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 px-3 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 shrink-0 ring-1 ring-white/20 whitespace-nowrap"
              title="Book Free 1-on-1 Video Counselling on Google Meet"
            >
              <Video className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Book Free Meet</span>
            </Link>

            {/* Mobile Menu Hamburger Toggle */}
            <button 
              type="button"
              className="lg:hidden flex items-center justify-center w-8.5 h-8.5 text-slate-700 hover:text-blue-600 transition-colors bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl cursor-pointer shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 stroke-[2.5]" /> : <Menu className="h-5 w-5 stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Navigation Full Viewport Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-[999] bg-white overflow-y-auto flex flex-col justify-between shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col px-5 py-6 gap-4 text-base font-semibold text-slate-800 text-left">
            <div className="mb-2 block lg:hidden">
              <SearchInput isMobile={true} onSearch={() => setIsMobileMenuOpen(false)} />
            </div>

            {/* High-Impact Mobile Booking Card */}
            <Link
              href="/book-session"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 active:scale-98 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-amber-300 shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-extrabold flex items-center gap-1.5">
                    <span>Face-to-Face Counselling</span>
                    <span className="text-[9px] bg-emerald-400 text-slate-950 font-black px-1.5 py-0.2 rounded-full">FREE</span>
                  </div>
                  <div className="text-[11px] text-blue-100 font-normal">1-on-1 Google Meet Session with Mohit</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/80 shrink-0" />
            </Link>
            
            {/* Primary Direct Links */}
            <div className="flex flex-col gap-1">
              {[
                { name: 'Colleges Directory (770+)', href: '/colleges', badge: 'Pan-India', icon: Building2 },
                { name: 'Free CBT Mock Tests', href: '/mock-tests', badge: '50+ Tests', icon: Target },
                { name: 'MBA Form Combo Discounts', href: '/mba-application-form-discount', badge: 'Save ₹5k+', icon: Percent },
                { name: 'UGC Online Degrees Hub', href: '/online-degree-certification', badge: '40+ Univs', icon: Laptop },
                { name: 'CAT / Score Calculators', href: '/tools/cat-score-calculator', badge: 'AI Tool', icon: Calculator },
                { name: 'Student Community', href: '/community', badge: 'Free', icon: Sparkles },
                { name: 'Articles & Guides', href: '/blog', badge: null, icon: BookOpen },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    prefetch={false} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-blue-600" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 border border-blue-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
            
            {/* Admissions 2027 Fast-track section */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <div className="px-3 text-slate-400 text-xs font-bold tracking-wider uppercase flex items-center justify-between">
                <span>Admissions 2027 Hub</span>
                <span className="text-[10px] text-blue-600 font-semibold lowercase">fast-track</span>
              </div>
              <div className="flex flex-col gap-1">
                {admissionLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      prefetch={false} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 font-bold' 
                          : item.highlight
                            ? 'bg-blue-50/40 text-blue-900 font-semibold'
                            : 'hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${item.iconColor}`} />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Mobile Bottom Conversion CTA Bar */}
          <div className="p-5 border-t border-slate-100 bg-slate-50/80 flex flex-col gap-2.5">
            <a 
              href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20expert%20admissions%20guidance"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-sm transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.18-.175.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.234-.244-.588-.493-.508-.676-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.278.495 1.716.634.723.23 1.381.198 1.901.12.579-.087 1.78-.727 2.03-1.43.251-.702.251-1.304.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.761.46 3.48 1.332 4.994L2 22l5.163-1.353a9.95 9.95 0 0 0 4.877 1.268h.004c5.512 0 9.99-4.477 9.99-9.99A9.94 9.94 0 0 0 12.04 2zm0 18.257h-.003a8.27 8.27 0 0 1-4.218-1.154l-.302-.18-3.136.823.837-3.056-.197-.314a8.27 8.27 0 0 1-1.267-4.386c0-4.57 3.719-8.289 8.29-8.289a8.25 8.25 0 0 1 5.86 2.43 8.25 8.25 0 0 1 2.428 5.86c0 4.571-3.719 8.289-8.289 8.289z"/>
              </svg>
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-auto text-emerald-100" />
            </a>
            <Link 
              href="tel:+919560020771" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Call +91 95600 20771</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
