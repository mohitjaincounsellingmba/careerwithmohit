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
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col gap-6">
              <span className="font-display text-3xl font-black tracking-tight flex items-center gap-4 uppercase italic">
                <div className="bg-white p-2 rounded-md border-4 border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                  <Image 
                    src="/logo.webp" 
                    alt="Mohit Jain Logo" 
                    width={32} 
                    height={24} 
                    className="object-contain"
                  />
                </div>
                Mohit Jain
              </span>
              <p className="text-gray-400 text-lg max-w-sm leading-relaxed font-bold border-l-4 border-primary pl-6">
                Direct Admission 2026 hub. Strategic career counselling and high-intent admission guidance.
              </p>
            </div>

            <div className="flex gap-4">
              {[
                { icon: <Instagram size={22} />, link: "https://www.instagram.com/careerwithmohit.online/", label: "Instagram" },
                { icon: <Linkedin size={22} />, link: "https://www.linkedin.com/company/career-with-mohit", label: "LinkedIn" },
                { icon: <Facebook size={22} />, link: "https://www.facebook.com/profile.php?id=61575525271998", label: "Facebook" },
                { icon: <Youtube size={22} />, link: "https://www.youtube.com/@careerwithmohit.online", label: "YouTube" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-800 p-3 rounded-md border-2 border-gray-700 hover:bg-primary hover:border-white transition-all hover:-translate-y-1 active:translate-y-0"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Student Hub (Admissions) */}
          <div className="space-y-8">
            <h3 className="font-black text-sm uppercase tracking-[0.2em] text-primary">Admission 2026</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="/colleges" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">Colleges <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span></Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">Latest News <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span></Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">Counselling <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span></Link></li>
              <li><Link href="/online-degree-certification" className="text-cyan-400 font-black flex items-center gap-2 group italic underline decoration-dotted">Online MBA/Degrees <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span></Link></li>
              <li><Link href="/inquiry" className="bg-accent text-foreground px-3 py-1 border-2 border-foreground inline-block hover:bg-white transition-colors font-black uppercase text-[10px]">Contact Now</Link></li>
            </ul>
          </div>

          {/* Column 3: High-Intent Tools */}
          <div className="space-y-8">
            <h3 className="font-black text-sm uppercase tracking-[0.2em] text-primary">Calculators & Tools</h3>
            <ul className="space-y-5 text-sm font-bold">
              <li>
                <Link href="/calculator/jee-main-2026" className="text-red-500 font-extrabold flex flex-col group italic">
                  <span className="text-[10px] uppercase font-black tracking-widest text-white/50 mb-1 group-hover:text-red-300">Live Tool</span>
                  JEE Main Checker
                </Link>
              </li>
              <li>
                <Link href="/calculator/cuet-pg-2026" className="text-cyan-400 font-black flex flex-col group italic">
                  <span className="text-[10px] uppercase font-black tracking-widest text-white/50 mb-1 group-hover:text-cyan-200">Featured</span>
                  CUET PG 2026 Tool
                </Link>
              </li>
              <li><Link href="/tools/cuet-pg-mba-predictor" className="text-blue-500 hover:text-white transition-colors italic">CUET PG Predictor</Link></li>
              <li><Link href="/tools/btech-college-predictor" className="text-yellow-500 hover:text-white transition-colors italic">B.Tech Predictor</Link></li>
              <li><Link href="/tools/college-comparison" className="text-indigo-400 hover:text-white transition-colors">College Comparison</Link></li>
              <li><Link href="/tools/accreditation-checker" className="text-rose-400 font-black hover:text-white transition-colors italic underline decoration-wavy">Accreditation Auditor</Link></li>
            </ul>
          </div>

          {/* Column 4: Preparation (Mock Tests) */}
          <div className="space-y-8">
            <h3 className="font-black text-sm uppercase tracking-[0.2em] text-primary">Mock Test Hub</h3>
            <ul className="grid grid-cols-1 gap-4 text-xs font-bold uppercase tracking-wider">
              <li><Link href="/tools/mock-test/cat" className="text-orange-400 font-black flex items-center gap-2 group">CAT 2026 <span className="opacity-0 group-hover:opacity-100">🔥</span></Link></li>
              <li><Link href="/tools/mock-test/jee-main" className="text-gray-400 hover:text-white transition-colors">JEE Main</Link></li>
              <li><Link href="/tools/mock-test/jee-advanced" className="text-gray-400 hover:text-white transition-colors">JEE Advanced</Link></li>
              <li><Link href="/tools/mock-test/neet" className="text-gray-400 hover:text-white transition-colors">NEET Test</Link></li>
              <li><Link href="/tools/mock-test/bitsat" className="text-gray-400 hover:text-white transition-colors">BITSAT</Link></li>
              <li><Link href="/tools/mock-test/clat" className="text-gray-400 hover:text-white transition-colors">CLAT</Link></li>
              <li><Link href="/tools/mock-test/viteee" className="text-gray-400 hover:text-white transition-colors">VITEEE</Link></li>
              <li><Link href="/tools/mock-test/srmjee" className="text-gray-400 hover:text-white transition-colors">SRMJEE</Link></li>
              <li><Link href="/tools/mhcet-mock-test" className="text-gray-400 hover:text-white transition-colors font-black text-secondary">MHCET MBA</Link></li>
            </ul>
          </div>

          {/* Column 5: Career & Business */}
          <div className="space-y-8">
            <h3 className="font-black text-sm uppercase tracking-[0.2em] text-primary">Careers & Growth</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="/internships" className="text-gray-400 hover:text-white transition-colors">High-Stakes Internships</Link></li>
              <li><Link href="/jobs" className="text-gray-400 hover:text-white transition-colors">Job Placement</Link></li>
              <li><Link href="/certifications" className="text-gray-400 hover:text-white transition-colors">Certification Audit</Link></li>
              <li><Link href="/calculator/career-roadmap" className="text-gray-400 hover:text-white transition-colors italic">Career Roadmap</Link></li>
              <li><Link href="/tools/ai-skills" className="text-green-500 font-black hover:text-white transition-colors italic">AI Skills Training</Link></li>
              <li className="pt-4 border-t border-gray-800">
                <Link href="/sell-your-coaching-online" className="text-accent hover:text-white font-black italic block mb-1 tracking-tighter">Monetize Your Influence</Link>
                <span className="text-[10px] text-gray-500 uppercase font-black">For Teachers & YouTubers</span>
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
            <Link href="/privacy" className="text-gray-500 hover:text-white text-xs font-black uppercase transition-colors tracking-widest">Privacy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-white text-xs font-black uppercase transition-colors tracking-widest">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
