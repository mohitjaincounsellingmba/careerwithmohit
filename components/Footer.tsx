"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12 border-b-2 border-gray-800 pb-12 overflow-hidden">
          {/* Column 1: Branding & Socials */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex flex-col gap-6">
              <span className="font-display text-2xl font-black tracking-tight flex flex-col gap-4 uppercase italic">
                <div className="bg-white p-2 rounded-md border-4 border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] w-fit">
                  <Image 
                    src="/logo.webp" 
                    alt="Mohit Jain Logo" 
                    width={28} 
                    height={20} 
                    className="object-contain"
                  />
                </div>
                Mohit Jain
              </span>
              <p className="text-gray-400 text-sm font-bold border-l-2 border-primary pl-4">
                Direct Admission 2026 hub.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Instagram size={18} />, link: "https://www.instagram.com/careerwithmohit.online/", label: "Instagram" },
                { icon: <Linkedin size={18} />, link: "https://www.linkedin.com/company/career-with-mohit", label: "LinkedIn" },
                { icon: <Facebook size={18} />, link: "https://www.facebook.com/profile.php?id=61575525271998", label: "Facebook" },
                { icon: <Youtube size={18} />, link: "https://www.youtube.com/@careerwithmohit.online", label: "YouTube" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-800 p-2 rounded-md border-2 border-gray-700 hover:bg-primary hover:border-white transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Student Hub (Admissions) */}
          <div className="space-y-8">
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-primary underline decoration-2 underline-offset-4">Admission 2026</h3>
            <ul className="space-y-4 text-xs font-bold">
              <li><Link href="/colleges" prefetch={false} className="text-gray-400 hover:text-white transition-colors">Colleges</Link></li>
              <li><Link href="/blog" prefetch={false} className="text-gray-400 hover:text-white transition-colors">Latest News</Link></li>
              <li><Link href="/services" prefetch={false} className="text-gray-400 hover:text-white transition-colors">Counselling</Link></li>
              <li><Link href="/online-degree-certification" prefetch={false} className="text-cyan-400 font-extrabold italic">Online Degrees</Link></li>
              <li><Link href="/inquiry" prefetch={false} className="bg-accent text-foreground px-2 py-1 border-2 border-foreground inline-block hover:bg-white transition-colors font-black uppercase text-[9px]">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: High-Intent Tools */}
          <div className="space-y-8">
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-primary underline decoration-2 underline-offset-4">Score Tools</h3>
            <ul className="space-y-5 text-xs font-bold">
              <li>
                <Link href="/calculator/jee-main-2026" prefetch={false} className="text-red-500 font-extrabold flex flex-col group italic">
                  JEE Main Checker
                </Link>
              </li>
              <li>
                <Link href="/calculator/cuet-pg-2026" prefetch={false} className="text-cyan-400 font-black flex flex-col group italic">
                  CUET PG 2026 Tool
                </Link>
              </li>
              <li>
                <Link href="/calculator/cuet-ug-2026" prefetch={false} className="text-emerald-400 font-black flex flex-col group italic">
                  CUET UG 2026 Checker
                </Link>
              </li>
              <li>
                <Link href="/calculator/mhcet-mba-2026" prefetch={false} className="text-pink-500 font-black flex flex-col group italic animate-pulse">
                  MHCET MBA Predictor 🔥
                </Link>
              </li>
              <li><Link href="/tools/cuet-pg-mba-predictor" prefetch={false} className="text-blue-500 hover:text-white transition-colors">CUET Predictor</Link></li>
              <li><Link href="/tools/btech-college-predictor" prefetch={false} className="text-yellow-500 hover:text-white transition-colors">B.Tech Predictor</Link></li>
              <li><Link href="/tools/accreditation-checker" prefetch={false} className="text-rose-400 font-black hover:text-white transition-colors italic border-b border-rose-500/30 pb-1">Accreditation Audit</Link></li>
            </ul>
          </div>

          {/* Column 4: Mock Test Hub */}
          <div className="space-y-8">
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-primary underline decoration-2 underline-offset-4">Exam Resources</h3>
            <ul className="grid grid-cols-1 gap-4 text-[10px] font-bold uppercase tracking-wider">
              <li><Link href="/previous-year-papers" prefetch={false} className="text-emerald-400 font-black hover:scale-105 transition-transform inline-block underline decoration-2 underline-offset-4">PYQ Papers 📄</Link></li>
              <li><Link href="/tools/cat-mock-test" prefetch={false} className="text-orange-400 font-black hover:scale-105 transition-transform inline-block">CAT 2026 🔥</Link></li>
              <li><Link href="/tools/govt-exams-mock-test" prefetch={false} className="text-yellow-400 font-black hover:scale-105 transition-transform inline-block underline decoration-2 underline-offset-4">Govt Exams Hub 🏛️</Link></li>
              <li><Link href="/tools/nmat-mock-test" prefetch={false} className="text-secondary font-black hover:scale-105 transition-transform inline-block">NMAT 2026 (Batch '27) ✨</Link></li>
              <li><Link href="/tools/jee-main-mock-test" prefetch={false} className="text-gray-400 hover:text-white transition-colors">JEE Main</Link></li>
              <li><Link href="/tools/jee-advanced-mock-test" prefetch={false} className="text-primary font-black hover:text-white transition-colors">JEE Advanced 🚀</Link></li>
              <li><Link href="/tools/bitsat-mock-test" prefetch={false} className="text-gray-400 hover:text-white transition-colors">BITSAT Prep</Link></li>
              <li><Link href="/tools/mock-test/viteee" prefetch={false} className="text-cyan-400 font-black hover:scale-105 transition-transform inline-block">VITEEE 2026 🎯</Link></li>
              <li><Link href="/tools/mhcet-mock-test" prefetch={false} className="text-secondary font-black hover:text-white transition-colors">MHCET MBA Hub</Link></li>
              <li><Link href="/tools/mock-test/neet" prefetch={false} className="text-[9px] text-gray-500 hover:text-white transition-colors italic">NEET Test Series</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-primary underline decoration-2 underline-offset-4">Marketing Tools</h3>
            <ul className="space-y-4 text-xs font-bold">
              <li><Link href="/tools/hashtag-generator" prefetch={false} className="text-blue-500 hover:text-white transition-colors group italic">Hashtag Generator 🔥</Link></li>
            </ul>
          </div>

          {/* Column 6: Careers & Business */}
          <div className="space-y-8">
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-primary underline decoration-2 underline-offset-4">Careers HUB</h3>
            <ul className="space-y-4 text-xs font-bold">
              <li><Link href="/govt-jobs" prefetch={false} className="text-secondary font-black hover:text-white transition-colors flex items-center gap-2">Govt Jobs & Results <span className="bg-primary text-[8px] px-1 rounded italic text-white">New</span></Link></li>
              <li><Link href="/internships" prefetch={false} className="text-gray-400 hover:text-white transition-colors">Internships</Link></li>
              <li><Link href="/jobs" prefetch={false} className="text-gray-400 hover:text-white transition-colors">Job Placement</Link></li>
              <li><Link href="/certifications" prefetch={false} className="text-gray-400 hover:text-white transition-colors">Certifications</Link></li>
              <li><Link href="/calculator/career-roadmap" prefetch={false} className="text-gray-400 hover:text-white transition-colors italic">Roadmap Tool</Link></li>
              <li className="pt-4 border-t border-gray-800">
                <Link href="/sell-your-coaching-online" prefetch={false} className="text-blue-400 hover:text-white font-black italic block mb-1">Scale Coaching</Link>
                <span className="text-[9px] text-gray-600 uppercase font-bold">Teachers & EdTech</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between border-t border-gray-800">
          <div className="text-sm font-bold text-gray-500 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Mohit Jain Admission Hub.</span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <span className="text-xs uppercase tracking-[0.1em] text-gray-600">Built for 10x Career Growth</span>
          </div>
          <div className="mt-8 sm:mt-0 flex gap-10">
            <Link href="/privacy" prefetch={false} className="text-gray-500 hover:text-white text-xs font-black uppercase transition-colors tracking-widest">Privacy</Link>
            <Link href="/terms" prefetch={false} className="text-gray-500 hover:text-white text-xs font-black uppercase transition-colors tracking-widest">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
