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
  ShieldCheck
} from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let ignore = false;
    const fetchVisits = async () => {
      try {
        const response = await fetch("https://api.counterapi.dev/v1/careerwithmohit/visits/up");
        if (!response.ok) return;
        const data = await response.json();
        if (!ignore && data && typeof data.count === 'number') {
          setVisits(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch visit count:", error);
      }
    };
    fetchVisits();
    return () => {
      ignore = true;
    };
  }, []);

  const footerLinks = {
    programs: [
      { name: 'MBA / PGDM Admissions 2027', href: '/colleges', badge: 'Hot' },
      { name: 'Top Tier MBA Directory', href: '/top-tier-mba-colleges' },
      { name: 'Direct MBA Admission Guide', href: '/blog/direct-mba-pgdm-admission-2027-2029-management-quota-guide' },
      { name: 'Online MBA & Certifications', href: '/online-degree-certification' },
      { name: 'B.Tech Engineering Consulting', href: '/colleges' },
      { name: 'BBA / BCA Admissions', href: '/colleges' },
      { name: 'Abroad Education Advisory', href: '/inquiry' },
    ],
    tools: [
      { name: 'Free ATS Resume Builder', href: '/tools/ats-resume-builder', badge: 'NEW' },
      { name: 'CAT 2026 Score Calculator', href: '/tools/cat-score-calculator', badge: 'Popular' },
      { name: 'XAT 2027 Score Calculator', href: '/tools/xat-score-calculator-2027' },
      { name: 'MAT Score Calculator', href: '/tools/mat-score-calculator' },
      { name: 'MHCET MBA Predictor', href: '/calculator/mhcet-mba-2026' },
      { name: 'CUET PG Tool', href: '/calculator/cuet-pg-2026' },
      { name: 'B.Tech College Predictor', href: '/tools/btech-college-predictor' },
      { name: 'Free Mock Test Hub', href: '/mock-tests', badge: 'Free' },
    ],
    resources: [
      { name: 'Attempt Skills & Get Certificate', href: '/skill-assessment-certificate', badge: 'Certified' },
      { name: 'ATS Resume & CV Builder', href: '/tools/ats-resume-builder', badge: 'Free' },
      { name: '650+ Colleges Database', href: '/colleges' },
      { name: 'MBA Articles & Analysis', href: '/blog' },
      { name: 'Admission News Updates', href: '/news' },
      { name: 'Previous Year Papers (PYQs)', href: '/previous-year-papers' },
      { name: 'Scholarship & Credit Schemes', href: '/inquiry' },
      { name: 'Sell Coaching Online (App)', href: '/sell-your-coaching-online', badge: 'Teachers' },
      { name: 'About Mohit Jain', href: '/about' },
    ]
  };

  const socials = [
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/careerwithmohit.online/", label: "Instagram", color: "hover:bg-pink-600/30 hover:text-pink-400 hover:border-pink-500/40" },
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/company/career-with-mohit", label: "LinkedIn", color: "hover:bg-blue-600/30 hover:text-blue-400 hover:border-blue-500/40" },
    { icon: <Facebook size={18} />, href: "https://www.facebook.com/profile.php?id=61575525271998", label: "Facebook", color: "hover:bg-blue-700/30 hover:text-blue-400 hover:border-blue-500/40" },
    { icon: <Youtube size={18} />, href: "https://www.youtube.com/@careerwithmohit.online", label: "YouTube", color: "hover:bg-red-600/30 hover:text-red-400 hover:border-red-500/40" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0A192F] via-[#081427] to-[#040A14] text-slate-300 overflow-hidden border-t border-blue-900/40">
      {/* Ambient Lighting Accents */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[250px] bg-indigo-600/10 blur-[110px] pointer-events-none rounded-full" />

      {/* Top High-Converting Consultation Card */}
      <div className="relative z-10 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-12">
          <div className="bg-gradient-to-r from-blue-900/80 via-indigo-900/70 to-[#0A1E3D] rounded-3xl p-8 md:p-12 border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Admissions Advisory 2027-29</span>
                <span className="text-blue-300">•</span>
                <span className="text-emerald-300 font-bold">1-on-1 Profile Assessment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Secure Your Dream B-School Seat?
              </h2>
              <p className="text-blue-100/80 text-base sm:text-lg font-normal max-w-2xl leading-relaxed">
                Get personalized B-school shortlist mapping (Dream, Target, Safe), interview coaching, and cutoff intelligence with <strong className="text-white font-semibold">Mohit Jain</strong>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
              <a 
                href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20to%20evaluate%20my%20MBA%20admission%20profile" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white px-7 py-3.5 font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
              >
                <span className="text-lg">💬</span>
                <span>WhatsApp Profile Review</span>
              </a>
              <Link 
                href="/inquiry" 
                prefetch={false}
                className="w-full sm:w-auto rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 px-7 py-3.5 font-bold text-sm sm:text-base transition-all shadow-lg shadow-amber-950/20 flex items-center justify-center gap-2 text-center"
              >
                <span>Book Consultation</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Academic Credentials */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <Logo variant="footer" size="lg" showTagline={true} />
              <p className="text-slate-400 text-sm font-normal leading-relaxed">
                India's premier strategic higher-education counselling and MBA/PGDM discovery portal. Certified mentorship for ambitious career growth.
              </p>
            </div>

            {/* Mentor Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-blue-200">
              <GraduationCap className="w-4 h-4 text-amber-300 shrink-0" />
              <span>IIM Bangalore &amp; FMS Certified Mentor</span>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {socials.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`bg-white/5 p-2.5 rounded-xl border border-white/10 text-slate-400 transition-all duration-300 ${social.color} hover:scale-105`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <a href="tel:+919560020771" className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                <Phone size={15} className="text-blue-400 shrink-0" /> +91 95600 20771
              </a>
              <a href="mailto:info@careerwithmohit.online" className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                <Mail size={15} className="text-blue-400 shrink-0" /> info@careerwithmohit.online
              </a>
            </div>
          </div>

          {/* Column 2: Programs & Admissions */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Programs &amp; Admissions
            </h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    prefetch={false}
                    className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group text-sm font-medium"
                  >
                    <ArrowRight size={13} className="opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400 shrink-0" />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="bg-blue-500/20 text-blue-300 text-[9px] px-1.5 py-0.5 rounded-md border border-blue-400/30 font-bold ml-1.5 uppercase">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tools & Predictors */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Cutoff Tools &amp; Mocks
            </h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    prefetch={false}
                    className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group text-sm font-medium"
                  >
                    <ArrowRight size={13} className="opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-400 shrink-0" />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded-md border border-emerald-400/30 font-bold ml-1.5 uppercase">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Educational Resources */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Resources &amp; Guides
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    prefetch={false}
                    className="text-slate-400 hover:text-white transition-all flex items-center gap-2 group text-sm font-medium"
                  >
                    <ArrowRight size={13} className="opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-400 shrink-0" />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="bg-amber-500/20 text-amber-300 text-[9px] px-1.5 py-0.5 rounded-md border border-amber-400/30 font-bold ml-1.5 uppercase">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between border-t border-white/10 gap-6">
          <div className="text-xs font-medium text-slate-500 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span>© {currentYear} CareerWithMohit. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              AICTE &amp; UGC Accredited Advisory
            </span>
          </div>
          
          <div className="flex gap-5 items-center flex-wrap justify-center md:justify-end">
            {visits !== null && (
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-xs font-semibold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Visits: <strong className="text-white font-bold">{(visits + 24850).toLocaleString()}</strong></span>
              </div>
            )}
            <Link href="/privacy" prefetch={false} className="text-slate-500 hover:text-white text-xs font-medium transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" prefetch={false} className="text-slate-500 hover:text-white text-xs font-medium transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Sub-footer Brand Message */}
      <div className="w-full bg-[#03070E] border-t border-white/5 py-4 relative z-10 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-medium tracking-wider text-slate-400">
            Empowering Ambitious Students &amp; Working Professionals Across India with Data-Driven Higher-Education Mentorship
          </p>
        </div>
      </div>
    </footer>
  );
}
