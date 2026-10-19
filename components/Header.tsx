"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  ChevronRight,
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
  BookOpen,
  MapPin,
  Search,
  Palette,
  Scale,
  Star,
  Zap,
} from "lucide-react";
import { SearchInput } from "./SearchInput";
import { Logo } from "./Logo";
import { EducationTicker } from "./EducationTicker";
import { MegaMenuDropdown } from "./MegaMenuDropdown";
import { MEGA_MENU_DATA, MegaMenuItem } from "@/data/megaMenuData";

// Course icon mapping for navigation ribbon
const COURSE_ICONS: Record<string, any> = {
  mba: GraduationCap,
  engineering: Zap,
  design: Palette,
  law: Scale,
  "online-degrees": Laptop,
  "abroad-education": Globe,
  "college-reviews": Star,
};

// Clean title-case display names to prevent awkward text-wrapping and oversized all-caps ribbon
const COURSE_DISPLAY_NAMES: Record<string, string> = {
  mba: "MBA",
  engineering: "Engineering",
  design: "Design",
  law: "Law",
  "online-degrees": "Online Degrees",
  "abroad-education": "Study Abroad",
  "college-reviews": "Reviews",
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenuId, setActiveMegaMenuId] = useState<string | null>(null);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>("mba");

  const headerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle outside click & Escape key to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMegaMenuId(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveMegaMenuId(null);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenuId(null);
  }, [pathname]);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMegaMenuId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenuId(null);
    }, 160);
  };

  const activeMegaMenuItem = MEGA_MENU_DATA.find((item) => item.id === activeMegaMenuId);

  return (
    <>
      {/* 1. Live Admissions Alert Ticker Bar */}
      <EducationTicker />

      {/* 2. Main Navigation Header Container */}
      <header
        ref={headerRef}
        className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/90 shadow-2xs transition-all"
        role="banner"
      >
        {/* Tier 1: Brand Logo + Education Portal Search Bar + Direct Actions */}
        <div className="border-b border-slate-100 bg-white">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 gap-3">
            
            {/* Left: Brand Logo */}
            <div className="flex items-center shrink-0">
              <Logo variant="header" size="md" />
            </div>

            {/* Center: Prominent Education Portal Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl mx-4 lg:mx-8 items-center justify-center">
              <SearchInput isMobile={false} />
            </div>

            {/* Right Action Group: Mobile Search + WhatsApp + Book Meet CTA + Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              
              {/* Mobile Quick Search Button */}
              <button
                type="button"
                className="md:hidden flex items-center justify-center w-9.5 h-9.5 text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl cursor-pointer shrink-0"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Search colleges"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* WhatsApp Direct Chat */}
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20expert%20admissions%20guidance"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9.5 h-9.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 text-emerald-600 hover:text-emerald-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shrink-0 shadow-2xs"
                title="Chat directly on WhatsApp (+91 95600 20771)"
                aria-label="Chat on WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.18-.175.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.234-.244-.588-.493-.508-.676-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.278.495 1.716.634.723.23 1.381.198 1.901.12.579-.087 1.78-.727 2.03-1.43.251-.702.251-1.304.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.761.46 3.48 1.332 4.994L2 22l5.163-1.353a9.95 9.95 0 0 0 4.877 1.268h.004c5.512 0 9.99-4.477 9.99-9.99A9.94 9.94 0 0 0 12.04 2zm0 18.257h-.003a8.27 8.27 0 0 1-4.218-1.154l-.302-.18-3.136.823.837-3.056-.197-.314a8.27 8.27 0 0 1-1.267-4.386c0-4.57 3.719-8.289 8.29-8.289a8.25 8.25 0 0 1 5.86 2.43 8.25 8.25 0 0 1 2.428 5.86c0 4.571-3.719 8.289-8.289 8.289z" />
                </svg>
              </a>

              {/* Desktop Face-to-Face Video Counselling Button */}
              <Link
                href="/book-session/"
                prefetch={false}
                className="hidden sm:inline-flex h-9.5 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-3.5 lg:px-4 text-xs font-bold text-white transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 shrink-0 whitespace-nowrap"
                title="Book Free 1-on-1 Video Counselling on Google Meet"
              >
                <Video className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Book Free Meet</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                className="lg:hidden flex items-center justify-center w-9.5 h-9.5 text-slate-700 hover:text-blue-600 transition-colors bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl cursor-pointer shrink-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 stroke-[2.5]" />
                ) : (
                  <Menu className="h-5 w-5 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tier 2: CLEAN WHITE & ROYAL BLUE COURSE NAVIGATION BAR RIBBON */}
        <div className="hidden lg:block bg-white/95 backdrop-blur-xs border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] relative">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <nav
              className="flex items-center justify-between h-11 text-[12.5px] font-semibold tracking-normal"
              aria-label="Main Course Navigation"
            >
              {/* Primary Course Items with Rich Mega Menu Trigger */}
              <div className="flex items-center gap-0.5 xl:gap-1 shrink-0 overflow-x-auto scrollbar-none">
                {MEGA_MENU_DATA.map((course) => {
                  const isOpen = activeMegaMenuId === course.id;
                  const Icon = COURSE_ICONS[course.id] || Sparkles;
                  const isCurrentRoute =
                    (course.id === "mba" && (pathname?.includes("mba") || pathname?.startsWith("/colleges"))) ||
                    (course.id === "engineering" && pathname?.includes("btech")) ||
                    (course.id === "online-degrees" && pathname?.includes("online-degree")) ||
                    (course.id === "abroad-education" && pathname?.includes("abroad")) ||
                    (course.id === "college-reviews" && pathname?.includes("blog"));

                  const displayLabel = COURSE_DISPLAY_NAMES[course.id] || course.label;
                  const isSecondaryCategory = course.id === "design" || course.id === "law";

                  return (
                    <div
                      key={course.id}
                      className={`relative h-11 items-center shrink-0 ${
                        isSecondaryCategory ? "hidden 2xl:flex" : "flex"
                      }`}
                      onMouseEnter={() => handleMouseEnter(course.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMegaMenuId((prev) => (prev === course.id ? null : course.id))
                        }
                        className={`h-8 px-2 xl:px-2.5 rounded-lg flex items-center gap-1.5 transition-all outline-none cursor-pointer group whitespace-nowrap shrink-0 text-xs font-semibold ${
                          isOpen || isCurrentRoute
                            ? "bg-blue-600 text-white font-bold shadow-xs shadow-blue-500/20"
                            : "text-slate-700 hover:text-blue-700 hover:bg-blue-50/80"
                        }`}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                      >
                        <Icon
                          className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                            isOpen || isCurrentRoute
                              ? "text-white"
                              : "text-blue-600 group-hover:text-blue-700"
                          }`}
                        />
                        <span className="whitespace-nowrap">{displayLabel}</span>

                        {course.badge && !isOpen && (
                          <span className="hidden 2xl:inline-block text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200/60 leading-none">
                            {course.badge.split(" ")[0]}
                          </span>
                        )}

                        <ChevronDown
                          className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                            isOpen ? "-rotate-180 text-white" : "text-slate-400 group-hover:text-blue-600"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Fast Direct Secondary Links (Right aligned in nav ribbon) */}
              <div className="flex items-center gap-1.5 xl:gap-2 pl-3 border-l border-slate-200/80 shrink-0">
                {/* 1. CAT Predictor */}
                <Link
                  href="/tools/cat-score-calculator/"
                  className="h-8 px-2.5 rounded-lg text-amber-900 bg-amber-50/90 hover:bg-amber-100 border border-amber-200/80 flex items-center gap-1.5 transition-all group font-semibold text-xs whitespace-nowrap shrink-0 shadow-2xs"
                  title="CAT 2026 Score & Percentile Calculator"
                >
                  <Calculator className="w-3.5 h-3.5 text-amber-600 group-hover:scale-105 transition-transform shrink-0" />
                  <span className="whitespace-nowrap">CAT Predictor</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] bg-amber-200/80 text-amber-900 font-extrabold leading-none shrink-0">
                    LIVE
                  </span>
                </Link>

                {/* 2. Free Mocks */}
                <Link
                  href="/mock-tests/"
                  className="h-8 px-2.5 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 flex items-center gap-1.5 transition-all group font-semibold text-xs whitespace-nowrap shrink-0 border border-slate-200/80 hover:border-blue-200 shadow-2xs"
                  title="Practice 50+ Free CBT Mock Tests"
                >
                  <Target className="w-3.5 h-3.5 text-blue-600 group-hover:scale-105 transition-transform shrink-0" />
                  <span className="whitespace-nowrap">Free Mocks</span>
                </Link>

                {/* 3. Form Discounts */}
                <Link
                  href="/mba-application-form-discount/"
                  className="hidden xl:flex h-8 px-2.5 rounded-lg text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100 items-center gap-1.5 transition-all group font-semibold text-xs whitespace-nowrap shrink-0 border border-emerald-200/80 hover:border-emerald-300 shadow-2xs"
                  title="MBA Application Form Combo Discounts"
                >
                  <Percent className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-105 transition-transform shrink-0" />
                  <span className="whitespace-nowrap">Discounts</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-200/80 text-emerald-900 font-extrabold leading-none shrink-0">
                    Save ₹5k+
                  </span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Render Active Mega Menu Dropdown Panel */}
          {activeMegaMenuItem && (
            <div
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
              }}
              onMouseLeave={handleMouseLeave}
            >
              <MegaMenuDropdown
                item={activeMegaMenuItem}
                onClose={() => setActiveMegaMenuId(null)}
              />
            </div>
          )}
        </div>
      </header>

      {/* 3. Mobile Navigation Full Viewport Drawer */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-white text-slate-900 flex flex-col justify-between shadow-2xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Mobile Drawer Top Bar with Brand Logo + Quick WhatsApp + Close Button */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-slate-100 bg-white shrink-0">
            <Logo variant="header" size="sm" />
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20expert%20admissions%20guidance"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center transition-colors"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.18-.175.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.234-.244-.588-.493-.508-.676-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.278.495 1.716.634.723.23 1.381.198 1.901.12.579-.087 1.78-.727 2.03-1.43.251-.702.251-1.304.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.761.46 3.48 1.332 4.994L2 22l5.163-1.353a9.95 9.95 0 0 0 4.877 1.268h.004c5.512 0 9.99-4.477 9.99-9.99A9.94 9.94 0 0 0 12.04 2zm0 18.257h-.003a8.27 8.27 0 0 1-4.218-1.154l-.302-.18-3.136.823.837-3.056-.197-.314a8.27 8.27 0 0 1-1.267-4.386c0-4.57 3.719-8.289 8.29-8.289a8.25 8.25 0 0 1 5.86 2.43 8.25 8.25 0 0 1 2.428 5.86c0 4.571-3.719 8.289-8.289 8.289z" />
                </svg>
              </a>
              <button
                type="button"
                className="flex items-center justify-center w-9 h-9 text-slate-700 hover:text-blue-600 transition-colors bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl cursor-pointer shrink-0"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X className="h-5 w-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto flex flex-col px-4 py-5 gap-4 text-sm font-semibold text-left">
            {/* Mobile Search Bar */}
            <div className="w-full">
              <SearchInput isMobile={true} onSearch={() => setIsMobileMenuOpen(false)} />
            </div>

            {/* High-Impact Mobile Booking Card */}
            <Link
              href="/book-session/"
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
                    <span className="text-[9px] bg-emerald-400 text-slate-950 font-black px-1.5 py-0.2 rounded-full">
                      FREE
                    </span>
                  </div>
                  <div className="text-[11px] text-blue-100 font-normal">
                    1-on-1 Google Meet Session with Mohit
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/80 shrink-0" />
            </Link>

            {/* Course Accordions */}
            <div className="flex flex-col gap-1.5">
              <div className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Explore Courses &amp; Colleges
              </div>

              {MEGA_MENU_DATA.map((course) => {
                const isExpanded = mobileExpandedId === course.id;
                const Icon = COURSE_ICONS[course.id] || Sparkles;
                const displayLabel = COURSE_DISPLAY_NAMES[course.id] || course.label;

                return (
                  <div
                    key={course.id}
                    className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/60"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpandedId((prev) => (prev === course.id ? null : course.id))
                      }
                      className={`w-full px-3.5 py-3 flex items-center justify-between transition-colors text-left ${
                        isExpanded
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "text-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-sm tracking-wide">{displayLabel}</span>
                        {course.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded uppercase bg-blue-100 text-blue-800 border border-blue-200">
                            {course.badge}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? "-rotate-180 text-blue-600" : ""
                        }`}
                      />
                    </button>

                    {/* Accordion Content */}
                    {isExpanded && (
                      <div className="p-3 bg-white border-t border-slate-100 flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                            Popular Links &amp; Cities
                          </span>
                          {course.categories[0]?.links.map((link) => (
                            <Link
                              key={link.title}
                              href={link.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="px-2 py-1.5 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs flex items-center justify-between"
                            >
                              <span>{link.title}</span>
                              <ChevronRight className="w-3 h-3 text-slate-300" />
                            </Link>
                          ))}
                        </div>

                        <Link
                          href={course.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <span>Explore All {displayLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Tools & Calculators */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-1">
              <div className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Quick Tools &amp; Admissions
              </div>
              {[
                { name: "CAT / Percentile Calculator", href: "/tools/cat-score-calculator", icon: Calculator },
                { name: "MBA Form Combo Discounts", href: "/mba-application-form-discount", icon: Percent },
                { name: "Free CBT Mock Tests (50+)", href: "/mock-tests", icon: Target },
                { name: "Free ATS Resume Builder", href: "/tools/ats-resume-builder", icon: FileText },
                { name: "Accreditation & UGC-DEB Checker", href: "/tools/accreditation-checker", icon: ShieldCheck },
                { name: "Colleges Directory (770+)", href: "/colleges", icon: Building2 },
              ].map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-blue-600" />
                    <span>{tool.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Mobile Bottom Conversion CTA Bar */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/90 flex flex-col gap-2 shrink-0">
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20expert%20admissions%20guidance"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-sm transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.18-.175.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.234-.244-.588-.493-.508-.676-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.278.495 1.716.634.723.23 1.381.198 1.901.12.579-.087 1.78-.727 2.03-1.43.251-.702.251-1.304.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.527 2 2.05 6.477 2.05 11.99c0 1.761.46 3.48 1.332 4.994L2 22l5.163-1.353a9.95 9.95 0 0 0 4.877 1.268h.004c5.512 0 9.99-4.477 9.99-9.99A9.94 9.94 0 0 0 12.04 2zm0 18.257h-.003a8.27 8.27 0 0 1-4.218-1.154l-.302-.18-3.136.823.837-3.056-.197-.314a8.27 8.27 0 0 1-1.267-4.386c0-4.57 3.719-8.289 8.29-8.289a8.25 8.25 0 0 1 5.86 2.43 8.25 8.25 0 0 1 2.428 5.86c0 4.571-3.719 8.289-8.289 8.289z" />
              </svg>
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-auto text-emerald-100" />
            </a>
            <Link
              href="/book-session/"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all"
            >
              <Video className="h-4 w-4 text-amber-300" />
              <span>Book Free 1-on-1 Meet</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
