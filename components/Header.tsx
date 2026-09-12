"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown, Sparkles, GraduationCap, Building2, Laptop, Award, Globe, ArrowUpRight, Calendar, ArrowRight, Video } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { Logo } from './Logo';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmissionsOpen, setIsAdmissionsOpen] = useState(false);
  const admissionsRef = useRef<HTMLDivElement>(null);
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
      if (admissionsRef.current && !admissionsRef.current.contains(event.target as Node)) {
        setIsAdmissionsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsAdmissionsOpen(false);
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
    setIsAdmissionsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Colleges', href: '/colleges' },
    { name: 'Online MBA', shortName: 'Online MBA', longName: 'Online Degrees', href: '/online-degree-certification' },
    { name: 'Community', badge: 'Free', href: '/community' },
    { name: 'Blog', href: '/blog' },
  ];

  const admissionLinks = [
    {
      title: 'Admissions Hub',
      href: '/admissions',
      badge: '2027-29',
      badgeColor: 'text-blue-600 bg-blue-50 border-blue-200/60',
      icon: Sparkles,
      iconColor: 'text-blue-600',
      highlight: true
    },
    {
      title: 'MBA & PGDM 2027',
      href: '/mba-pgdm-admission-2027',
      badge: 'Guide',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200/60',
      icon: GraduationCap,
      iconColor: 'text-amber-500'
    },
    {
      title: 'Top Tier MBA Directory',
      href: '/top-tier-mba-colleges',
      badge: 'Tier-1',
      badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200/60',
      icon: Building2,
      iconColor: 'text-indigo-500'
    },
    {
      title: 'Online Degrees & MBA',
      href: '/online-degree-certification',
      badge: 'UGC-DEB',
      badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200/60',
      icon: Laptop,
      iconColor: 'text-cyan-500'
    },
    {
      title: 'Scholarships & Aid',
      href: '/scholarships-2026',
      badge: 'Merit',
      badgeColor: 'text-slate-600 bg-slate-100 border-slate-200',
      icon: Award,
      iconColor: 'text-slate-500'
    },
    {
      title: 'Abroad Education',
      href: '/abroad-education',
      badge: 'Global',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
      icon: Globe,
      iconColor: 'text-emerald-500'
    },
  ];

  const isAdmissionActive = [
    '/admissions',
    '/mba-pgdm-admission-2027', 
    '/top-tier-mba-colleges', 
    '/scholarships-2026', 
    '/abroad-education'
  ].includes(pathname || '');

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all shadow-xs" role="banner">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-5 lg:px-7">
          
          {/* Left group: Logo + Primary Navigation */}
          <div className="flex items-center gap-4 xl:gap-7">
            <Logo variant="header" size="md" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-5 text-xs xl:text-[13px] font-semibold text-slate-700" aria-label="Main navigation">
              {navLinks.filter((link) => link.href !== '/').map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    className={`transition-colors py-1 relative whitespace-nowrap ${
                      isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-600 text-slate-700'
                    }`}
                  >
                    {link.longName ? (
                      <>
                        <span className="hidden 2xl:inline">{link.longName}</span>
                        <span className="2xl:hidden">{link.shortName || link.name}</span>
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        {link.name}
                        {link.badge && (
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                            {link.badge}
                          </span>
                        )}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
              
              {/* Admissions Dropdown */}
              <div 
                ref={admissionsRef} 
                className="relative group py-2"
                onMouseEnter={() => setIsAdmissionsOpen(true)}
                onMouseLeave={() => setIsAdmissionsOpen(false)}
              >
                <button 
                  type="button"
                  onClick={() => setIsAdmissionsOpen((prev) => !prev)}
                  className={`flex items-center gap-1 transition-colors font-semibold py-1 outline-none cursor-pointer whitespace-nowrap ${
                    isAdmissionActive || isAdmissionsOpen ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'
                  }`}
                  aria-expanded={isAdmissionsOpen}
                  aria-haspopup="true"
                >
                  <span>Admissions</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    isAdmissionsOpen ? '-rotate-180 text-blue-600' : 'group-hover:-rotate-180'
                  }`} />
                </button>

                {/* Invisible bridge + Dropdown Card */}
                <div 
                  className={`absolute top-full left-0 pt-2 transition-all duration-200 z-50 ${
                    isAdmissionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-1'
                  }`}
                >
                  <div className="w-72 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-2 flex flex-col gap-1 ring-1 ring-slate-900/5">
                    {admissionLinks.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          prefetch={false}
                          onClick={() => setIsAdmissionsOpen(false)}
                          className={`px-3 py-2.5 rounded-xl transition-all flex items-center justify-between text-xs font-semibold ${
                            item.highlight 
                              ? 'bg-blue-50/70 hover:bg-blue-100/80 text-blue-900' 
                              : isActive
                                ? 'bg-slate-100 text-blue-600'
                                : 'hover:bg-slate-50 text-slate-700 hover:text-blue-600'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${item.iconColor}`} />
                            <span>{item.title}</span>
                          </div>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Right utility actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <SearchInput />

            {/* WhatsApp Icon Button */}
            <a 
              href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20expert%20admissions%20guidance" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8.5 h-8.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-600 hover:text-emerald-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shrink-0"
              title="Chat directly on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.18-.175.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.234-.244-.588-.493-.508-.676-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.278.495 1.716.634.723.23 1.381.198 1.901.12.579-.087 1.78-.727 2.03-1.43.251-.702.251-1.304.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.761.46 3.48 1.332 4.994L2 22l5.163-1.353a9.95 9.95 0 0 0 4.877 1.268h.004c5.512 0 9.99-4.477 9.99-9.99A9.94 9.94 0 0 0 12.04 2zm0 18.257h-.003a8.27 8.27 0 0 1-4.218-1.154l-.302-.18-3.136.823.837-3.056-.197-.314a8.27 8.27 0 0 1-1.267-4.386c0-4.57 3.719-8.289 8.29-8.289a8.25 8.25 0 0 1 5.86 2.43 8.25 8.25 0 0 1 2.428 5.86c0 4.571-3.719 8.289-8.289 8.289z"/>
              </svg>
            </a>

            {/* Direct Call Icon Button */}
            <Link 
              href="tel:+919560020771" 
              className="w-8.5 h-8.5 rounded-xl bg-slate-100 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shrink-0"
              title="Call Mohit Jain: +91 95600 20771"
              aria-label="Call Counsellor"
            >
              <Phone className="h-3.5 w-3.5" />
            </Link>

            {/* Book Free Face-to-Face Counselling Button */}
            <Link 
              href="/book-session" 
              prefetch={false}
              className="inline-flex h-8.5 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 px-2.5 sm:px-3 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 shrink-0 ring-1 ring-white/20 whitespace-nowrap"
              title="Book Free Face-to-Face 1-on-1 Video Counselling on Google Meet"
            >
              <Video className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span>Face-to-Face Counselling</span>
              <span className="hidden xl:inline px-1 py-0.2 rounded text-[9px] font-black bg-emerald-400 text-slate-950 uppercase tracking-wide">
                Free
              </span>
            </Link>

            {/* Mobile Hamburger Toggle (Visible below lg) */}
            <button 
              type="button"
              className="lg:hidden flex items-center justify-center w-8.5 h-8.5 text-slate-700 hover:text-blue-600 transition-colors bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-4.5 w-4.5 stroke-[2.5]" /> : <Menu className="h-4.5 w-4.5 stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Full Viewport Overlay rendered outside <header> so fixed positioning is viewport-relative */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-x-0 top-16 sm:top-[68px] bottom-0 z-[999] bg-white overflow-y-auto flex flex-col justify-between shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
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
            
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    prefetch={false} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-3 inline-block ${
                        isActive ? 'bg-blue-600' : 'bg-slate-300'
                      }`}></span>
                      {link.name}
                    </div>
                    {isActive ? (
                      <span className="text-[11px] font-semibold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-md">Active</span>
                    ) : link.badge ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 border border-emerald-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {link.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
            
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
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
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
              <ArrowUpRight className="w-4 h-4 ml-auto text-emerald-100" />
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
