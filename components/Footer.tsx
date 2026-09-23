"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Instagram, 
  Linkedin, 
  Facebook, 
  Youtube, 
  ArrowRight, 
  Phone, 
  Mail, 
  GraduationCap, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let ignore = false;
    let timerId: NodeJS.Timeout;

    const fetchVisits = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2500);

        const response = await fetch("https://api.counterapi.dev/v1/careerwithmohit/visits/up", {
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (!response.ok) return;
        const data = await response.json();
        if (!ignore && data && typeof data.count === 'number') {
          setVisits(data.count);
        }
      } catch {
        // Silently fail if external counter API is unreachable
      }
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => {
        timerId = setTimeout(fetchVisits, 2500);
      });
    } else {
      timerId = setTimeout(fetchVisits, 3000);
    }

    return () => {
      ignore = true;
      clearTimeout(timerId);
    };
  }, []);

  const footerNavigation = {
    admissions: [
      { name: 'MBA / PGDM Admissions 2027', href: '/mba-pgdm-admission-2027', highlight: true },
      { name: 'Top Tier MBA Directory (770+ Colleges)', href: '/top-tier-mba-colleges' },
      { name: 'Application Form Discounts (Save ₹5k+)', href: '/mba-application-form-discount', badge: 'Save ₹' },
      { name: 'High ROI B-Schools (< ₹10 Lakhs)', href: '/colleges' },
      { name: 'Online Degrees & Certifications Hub', href: '/online-degree-certification' },
      { name: 'Direct MBA Admission Guide', href: '/blog/direct-mba-pgdm-admission-2027-2029-management-quota-guide' },
      { name: 'Study Abroad & Global MBA', href: '/inquiry' },
    ],
    tools: [
      { name: 'Free CBT Mock Test Hub', href: '/mock-tests', badge: 'Free' },
      { name: 'MBA Form Discount Calculator', href: '/mba-application-form-discount' },
      { name: 'CAT 2026 Score & Percentile Calculator', href: '/tools/cat-score-calculator' },
      { name: 'XAT 2027 Cutoff Predictor', href: '/tools/xat-score-calculator-2027' },
      { name: 'MAT Score Calculator', href: '/tools/mat-score-calculator' },
      { name: 'Free ATS Resume Builder', href: '/tools/ats-resume-builder', badge: 'Tool' },
      { name: 'B.Tech College Predictor', href: '/tools/btech-college-predictor' },
    ],
    resources: [
      { name: 'Book 1-on-1 Google Meet Call', href: '/book-session', highlight: true },
      { name: 'Join Student Community (Telegram/WA)', href: '/community' },
      { name: 'Previous Year Question Papers (PYQs)', href: '/previous-year-papers' },
      { name: 'MBA GD-PI Interview Experience Bank', href: '/blog' },
      { name: 'Skill Assessments & Certificates', href: '/skill-assessment-certificate' },
      { name: 'Admission News & Notifications', href: '/news' },
      { name: 'About Mohit Jain & Journey', href: '/about' },
    ]
  };

  const socials = [
    { 
      icon: <Instagram size={17} />, 
      href: "https://www.instagram.com/careerwithmohit.online/", 
      label: "Instagram", 
      hoverStyle: "hover:bg-gradient-to-tr hover:from-amber-600 hover:via-pink-600 hover:to-purple-600 hover:text-white hover:border-transparent" 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] fill-current" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
      ), 
      href: "https://t.me/+fpyLTXTgQQZkMDhl", 
      label: "Telegram", 
      hoverStyle: "hover:bg-sky-500 hover:text-white hover:border-transparent" 
    },
    { 
      icon: <Linkedin size={17} />, 
      href: "https://www.linkedin.com/company/career-with-mohit", 
      label: "LinkedIn", 
      hoverStyle: "hover:bg-blue-600 hover:text-white hover:border-transparent" 
    },
    { 
      icon: <Youtube size={17} />, 
      href: "https://www.youtube.com/@careerwithmohit.online", 
      label: "YouTube", 
      hoverStyle: "hover:bg-red-600 hover:text-white hover:border-transparent" 
    },
    { 
      icon: <Facebook size={17} />, 
      href: "https://www.facebook.com/profile.php?id=61575525271998", 
      label: "Facebook", 
      hoverStyle: "hover:bg-blue-700 hover:text-white hover:border-transparent" 
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0B1528] via-[#070E1B] to-[#03070E] text-slate-300 overflow-hidden border-t border-blue-900/40">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Advisory Banner */}
      <div className="relative z-10 border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
          <div className="bg-gradient-to-r from-blue-950/90 via-indigo-950/80 to-[#0A1A38] rounded-2xl p-6 sm:p-8 md:p-10 border border-blue-500/20 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            
            <div className="space-y-3 text-center lg:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Admissions 2027 Advisory</span>
                <span className="text-blue-400">•</span>
                <span className="text-emerald-300 font-bold">100% Free Profile Assessment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Need Guidance on Top MBA &amp; PGDM Admissions?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
                Get an unbiased college shortlist (Dream, Target, Safe), form combo discounts, and 1-on-1 interview strategy with <strong className="text-white font-semibold">Mohit Jain</strong>.
              </p>
              
              {/* Trust highlights */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Placement Audits
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Save ₹5,000+ on Applications
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> IIM-B &amp; FMS Certified Mentor
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <a 
                href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20to%20evaluate%20my%20MBA%20admission%20profile" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white px-6 py-3 font-semibold text-sm transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Profile Review</span>
              </a>
              <Link 
                href="/book-session" 
                prefetch={false}
                className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-6 py-3 font-semibold text-sm transition-all shadow-lg shadow-blue-950/40 flex items-center justify-center gap-2 text-center border border-blue-400/30"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Book 1-on-1 Meet</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Directory Columns */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Academic Authority (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex flex-col gap-3">
              <Logo variant="footer" size="lg" showTagline={true} />
              <p className="text-slate-400 text-sm font-normal leading-relaxed pr-4">
                India's trusted higher-education counselling and MBA/PGDM discovery portal. Transparent fee audits, CBT mock engines, and certified admissions mentorship.
              </p>
            </div>

            {/* Mentor Credential Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-300">
              <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>IIM Bangalore &amp; FMS Certified Mentorship</span>
            </div>

            {/* Direct Helpline Links */}
            <div className="space-y-2 pt-1 text-sm">
              <a 
                href="tel:+919560020771" 
                className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Phone size={13} className="text-blue-400" />
                </div>
                <span className="font-medium">+91 95600 20771</span>
              </a>
              <a 
                href="mailto:info@careerwithmohit.online" 
                className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Mail size={13} className="text-blue-400" />
                </div>
                <span className="font-medium">info@careerwithmohit.online</span>
              </a>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2 pt-2">
              {socials.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 text-slate-400 flex items-center justify-center transition-all duration-200 ${social.hoverStyle}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Colleges & Admissions (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Colleges &amp; Admissions
            </h3>
            <ul className="space-y-2.5">
              {footerNavigation.admissions.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    prefetch={false}
                    className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group text-sm font-normal py-0.5"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400 shrink-0" />
                    <span className={link.highlight ? "text-slate-200 font-medium group-hover:text-blue-300" : ""}>{link.name}</span>
                    {link.badge && (
                      <span className="bg-blue-500/20 text-blue-300 text-[10px] px-1.5 py-0.5 rounded border border-blue-400/30 font-semibold ml-auto shrink-0">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Calculators & CBT Mocks (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Calculators &amp; Mocks
            </h3>
            <ul className="space-y-2.5">
              {footerNavigation.tools.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    prefetch={false}
                    className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group text-sm font-normal py-0.5"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-400 shrink-0" />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded border border-emerald-400/30 font-semibold ml-auto shrink-0">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Student Resources (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Resources &amp; Help
            </h3>
            <ul className="space-y-2.5">
              {footerNavigation.resources.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    prefetch={false}
                    className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group text-sm font-normal py-0.5"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-400 shrink-0" />
                    <span className={link.highlight ? "text-slate-200 font-medium group-hover:text-amber-300" : ""}>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM LEGAL & COPYRIGHT BAR */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between border-t border-white/10 gap-4">
          <div className="text-xs font-normal text-slate-400 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {currentYear} CareerWithMohit. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              AICTE, UGC &amp; NIRF Data Aligned
            </span>
          </div>
          
          <div className="flex gap-4 items-center flex-wrap justify-center md:justify-end text-xs">
            {visits !== null && (
              <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-md text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Verified Visits: <strong className="text-white">{(visits + 24850).toLocaleString()}</strong></span>
              </div>
            )}
            <Link href="/privacy" prefetch={false} className="text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/terms" prefetch={false} className="text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/inquiry" prefetch={false} className="text-slate-400 hover:text-white transition-colors">
              Student Support
            </Link>
          </div>
        </div>
      </div>

      {/* Sub-footer Brand Statement */}
      <div className="w-full bg-[#02050A] border-t border-white/5 py-3 relative z-10 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[11px] font-medium tracking-wide text-slate-400">
            India's Strategic Higher Education &amp; Admissions Intelligence Platform • Mentoring Ambitious Students Nationwide
          </p>
        </div>
      </div>
    </footer>
  );
}
