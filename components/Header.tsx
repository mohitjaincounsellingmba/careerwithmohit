"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Menu, X, Phone, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { SearchInput } from './SearchInput';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-gray-200 bg-white" role="banner">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-12 relative">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:-translate-y-0.5">
          <div className="bg-primary p-1.5 rounded-md border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center bg-white overflow-hidden">
            <Image 
              src="/logo.webp" 
              alt="Mohit Jain Career Counselling Logo" 
              width={32} 
              height={32} 
              priority
              className="object-contain"
            />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-foreground uppercase">Mohit Jain</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-base font-bold text-foreground">
          <Link href="/" prefetch={false} className="hover:text-primary hover:-translate-y-0.5 transition-transform" title="Home Page">Home</Link>
          <Link href="/about" prefetch={false} className="hover:text-primary hover:-translate-y-0.5 transition-transform" title="About Mohit Jain">About</Link>
          <Link href="/blog" prefetch={false} className="hover:text-primary hover:-translate-y-0.5 transition-transform" title="Career Blog & Roadmaps">Blog</Link>
          
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-primary hover:-translate-y-0.5 transition-transform font-bold outline-none">
              Admissions
              <ChevronDown className="w-4 h-4 transition-transform group-hover:-rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 flex flex-col">
              <Link href="/admissions" prefetch={false} className="px-5 py-3 hover:bg-slate-50 border-b-2 border-slate-100 transition-colors font-bold flex items-center gap-2 text-primary-brand">
                <span className="w-2 h-2 bg-primary-brand rounded-full animate-pulse"></span> Admissions Portal
              </Link>
              <Link href="/colleges" prefetch={false} className="px-5 py-3 hover:bg-slate-50 border-b-2 border-slate-100 transition-colors font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span> Top Colleges
              </Link>
              <Link href="/top-tier-mba-colleges" prefetch={false} className="px-5 py-3 hover:bg-slate-50 border-b-2 border-slate-100 transition-colors font-bold text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span> Top Tier MBA
              </Link>
              <Link href="/mba-pgdm-admission-2027" prefetch={false} className="px-5 py-3 hover:bg-indigo-50 border-b-2 border-slate-100 transition-colors font-bold text-indigo-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span> MBA/PGDM 2027
              </Link>
              <Link href="/scholarships-2026" prefetch={false} className="px-5 py-3 hover:bg-amber-50 border-b-2 border-slate-100 transition-colors font-bold text-amber-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Scholarships
              </Link>
              <Link href="/online-degree-certification" prefetch={false} className="px-5 py-3 hover:bg-cyan-50 border-b-2 border-slate-100 transition-colors font-bold text-cyan-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full"></span> Online Degrees
              </Link>
              <Link href="/abroad-education" prefetch={false} className="px-5 py-3 hover:bg-emerald-50 transition-colors font-bold text-emerald-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Abroad Education
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex items-center gap-4">
          <SearchInput />
          <Link 
            href="tel:+919560020771" 
            className="hidden lg:inline-flex h-12 items-center justify-center gap-2 rounded-md bg-foreground px-6 py-2 text-base font-bold text-white transition-all hover:bg-gray-800 hover:scale-105"
          >
            <Phone className="h-4 w-4" />
            Call
          </Link>
          <button 
            className="md:hidden flex items-center justify-center p-2 text-foreground hover:text-primary transition-colors bg-gray-100 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 stroke-[3px]" /> : <Menu className="h-6 w-6 stroke-[3px]" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 inset-x-0 bottom-0 border-b-2 border-gray-200 bg-white shadow-xl z-50 overflow-y-auto">
          <nav className="flex flex-col px-6 py-8 gap-6 text-lg font-bold text-foreground text-left">
            <div className="mb-2 block lg:hidden">
              <SearchInput isMobile={true} onSearch={() => setIsMobileMenuOpen(false)} />
            </div>
            
            <Link href="/" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-3 inline-block"></span>Home
            </Link>
            <Link href="/about" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-3 inline-block"></span>About
            </Link>
            <Link href="/blog" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-3 inline-block"></span>Blog
            </Link>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center text-slate-500 text-sm tracking-widest uppercase">
                Admissions
              </div>
              <div className="pl-4 flex flex-col gap-5 border-l-2 border-slate-100 ml-1">
                <Link href="/admissions" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center text-primary-brand font-extrabold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-brand mr-3 inline-block animate-pulse"></span>Admissions Portal
                </Link>
                <Link href="/colleges" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 inline-block"></span>Top Colleges
                </Link>
                <Link href="/top-tier-mba-colleges" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center text-primary font-extrabold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 inline-block"></span>Top Tier MBA
                </Link>
                <Link href="/mba-pgdm-admission-2027" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center text-indigo-600 font-extrabold">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-3 inline-block"></span>MBA/PGDM 2027
                </Link>
                <Link href="/scholarships-2026" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center text-amber-600 font-extrabold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3 inline-block"></span>Scholarships
                </Link>
                <Link href="/online-degree-certification" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center text-cyan-600 font-extrabold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-3 inline-block"></span>Online Degrees
                </Link>
                <Link href="/abroad-education" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center text-emerald-600 font-extrabold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3 inline-block"></span>Abroad Education
                </Link>
              </div>
            </div>

            <Link 
              href="tel:+919560020771" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-md bg-foreground px-4 py-2 text-lg font-bold text-white transition-all hover:bg-gray-800"
            >
              <Phone className="h-5 w-5 text-primary" />
              Call Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
