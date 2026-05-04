"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin, Facebook, Youtube, Send, ArrowRight, ExternalLink, Phone, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Top Colleges', href: '/colleges' },
      { name: 'Latest News', href: '/blog' },
      { name: 'Counselling', href: '/services' },
      { name: 'Backlink Collab', href: '/backlink-collaboration' },
      { name: 'Contact Us', href: '/inquiry' },
      { name: 'About Mohit', href: '/about' },
    ],
    predictors: [
      { name: 'JEE Main Predictor', href: '/calculator/jee-main-2026', color: 'text-red-400' },
      { name: 'CUET PG Tool', href: '/calculator/cuet-pg-2026', color: 'text-cyan-400' },
      { name: 'CUET UG Predictor', href: '/calculator/cuet-ug-2026', color: 'text-emerald-400' },
      { name: 'MHCET MBA 2026', href: '/calculator/mhcet-mba-2026', color: 'text-pink-400' },
      { name: 'B.Tech Predictor', href: '/tools/btech-college-predictor', color: 'text-yellow-400' },
    ],
    resources: [
      { name: 'Mock Test Hub', href: '/mock-tests', badge: 'Popular' },
      { name: 'Free CAT Mock 2026', href: '/tools/cat-mock-test' },
      { name: 'Free JEE Mock 2026', href: '/tools/jee-main-mock-test' },
      { name: 'PYQ Papers', href: '/previous-year-papers' },
      { name: 'Online Degrees', href: '/online-degree-certification' },
      { name: 'Certifications', href: '/certifications' },
      { name: 'Govt Jobs', href: '/govt-jobs' },
    ]
  };

  const socials = [
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/careerwithmohit.online/", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/company/career-with-mohit", label: "LinkedIn", color: "hover:bg-blue-700" },
    { icon: <Facebook size={20} />, href: "https://www.facebook.com/profile.php?id=61575525271998", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: <Youtube size={20} />, href: "https://www.youtube.com/@careerwithmohit.online", label: "YouTube", color: "hover:bg-red-600" }
  ];

  return (
    <footer className="relative bg-foreground text-white overflow-hidden">
      {/* Decorative SVG Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      {/* Top CTA Section */}
      <div className="relative z-10 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-12">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Ready to Elevate Your Career?</h2>
              <p className="text-white/90 text-lg font-medium max-w-xl">
                Get expert guidance for Admissions 2026, Mock Tests, and Career Roadmaps tailored just for you.
              </p>
            </div>
            <Link 
              href="/inquiry" 
              className="bg-white text-foreground px-8 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-3 shrink-0"
            >
              Get Started Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-8">
            <div className="flex flex-col gap-6">
              <Link href="/" className="flex items-center gap-3 w-fit">
                <div className="bg-white p-2 rounded-xl shadow-lg border-2 border-primary">
                  <Image 
                    src="/logo.webp" 
                    alt="Mohit Jain Logo" 
                    width={32} 
                    height={32} 
                    className="object-contain"
                  />
                </div>
                <span className="font-display text-2xl font-black tracking-tight uppercase italic text-white">
                  Mohit Jain
                </span>
              </Link>
              <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs">
                Your ultimate destination for Admissions 2026, career counselling, and premium education resources. We help you build a 10x career.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {socials.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 ${social.color} hover:scale-110 hover:border-white/30`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="space-y-3">
               <a href="tel:+919560020771" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm font-bold">
                 <Phone size={16} className="text-primary" /> +91 95600 20771
               </a>
               <a href="mailto:info@careerwithmohit.online" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm font-bold">
                 <Mail size={16} className="text-primary" /> info@careerwithmohit.online
               </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
              <span className="w-4 h-[2px] bg-primary"></span> Quick Links
            </h3>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all flex items-center gap-2 group text-sm font-bold"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Predictors */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
              <span className="w-4 h-[2px] bg-secondary"></span> Predictors
            </h3>
            <ul className="space-y-4">
              {footerLinks.predictors.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className={`${link.color || 'text-gray-400'} hover:text-white transition-all flex items-center gap-2 group text-sm font-black italic`}
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-accent flex items-center gap-2">
              <span className="w-4 h-[2px] bg-accent"></span> Resources
            </h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all flex items-center gap-2 group text-sm font-bold"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                    {link.name}
                    {link.badge && (
                      <span className="bg-accent/20 text-accent text-[8px] px-1.5 py-0.5 rounded-full border border-accent/30 font-black ml-2 uppercase">
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
        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between border-t border-white/10 gap-8">
          <div className="text-xs font-bold text-gray-500 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <span>© {currentYear} Mohit Jain Admission Hub. All rights reserved.</span>
            <span className="hidden md:inline text-gray-800">|</span>
            <span className="text-gray-600 tracking-wider">BUILT FOR 10X CAREER GROWTH</span>
          </div>
          <div className="flex gap-8 items-center">
            <Link href="/privacy" className="text-gray-500 hover:text-white text-xs font-black uppercase transition-colors tracking-widest">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-white text-xs font-black uppercase transition-colors tracking-widest">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
