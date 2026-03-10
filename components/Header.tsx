"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Compass, Menu, X } from 'lucide-react';
import { SearchInput } from './SearchInput';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLearnDropdownOpen, setIsLearnDropdownOpen] = useState(false);
  const [isMobileLearnOpen, setIsMobileLearnOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-gray-200 bg-white" role="banner">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-12 relative">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:-translate-y-0.5">
          <div className="bg-primary text-white p-2 rounded-md">
            <Compass className="h-6 w-6" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">Mohit Jain</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-base font-bold text-foreground">
          <Link href="/" className="hover:text-primary hover:-translate-y-0.5 transition-transform">Home</Link>
          <Link href="/about" className="hover:text-primary hover:-translate-y-0.5 transition-transform">About</Link>
          <Link href="/blog" className="hover:text-primary hover:-translate-y-0.5 transition-transform">Blog</Link>
          <Link href="/colleges" className="hover:text-primary hover:-translate-y-0.5 transition-transform">Colleges</Link>
          <Link href="/inquiry" className="hover:text-primary hover:-translate-y-0.5 transition-transform">Inquiry</Link>
          
          {/* LEARN AND EARN DROPDOWN */}
          <div 
            className="relative group py-4"
            onMouseEnter={() => setIsLearnDropdownOpen(true)}
            onMouseLeave={() => setIsLearnDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-primary transition-colors uppercase tracking-wider text-sm font-black">
              Learn and Earn
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isLearnDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="C19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isLearnDropdownOpen && (
              <div className="absolute top-full left-0 w-56 bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl py-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                <Link 
                  href="/internships" 
                  className="block px-6 py-3 hover:bg-accent font-bold text-lg transition-colors border-b-2 border-gray-100 last:border-0"
                  onClick={() => setIsLearnDropdownOpen(false)}
                >
                  Internships
                </Link>
                <Link 
                  href="/certifications" 
                  className="block px-6 py-3 hover:bg-accent font-bold text-lg transition-colors"
                  onClick={() => setIsLearnDropdownOpen(false)}
                >
                  Certifications
                </Link>
              </div>
            )}
          </div>

        </nav>
        <div className="flex items-center gap-4">
          <SearchInput />
          <a 
            href="tel:9560020771" 
            className="hidden lg:inline-flex h-12 items-center justify-center rounded-md bg-foreground px-6 py-2 text-base font-bold text-white transition-all hover:bg-gray-800 hover:scale-105"
          >
            Call Now
          </a>
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
        <div className="md:hidden absolute top-20 left-0 w-full border-b-2 border-gray-200 bg-white shadow-xl z-50 h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col px-6 py-8 gap-6 text-lg font-bold text-foreground">
            <div className="mb-2 block lg:hidden">
              <SearchInput isMobile={true} onSearch={() => setIsMobileMenuOpen(false)} />
            </div>
            
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-3 inline-block"></span>Home
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-3 inline-block"></span>About
            </Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-3 inline-block"></span>Blog
            </Link>
            <Link href="/colleges" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-3 inline-block"></span>Colleges
            </Link>
            <Link href="/inquiry" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
              <span className="w-2 h-2 rounded-full bg-accent mr-3 inline-block"></span>Inquiry
            </Link>

            {/* MOBILE LEARN AND EARN */}
            <div className="flex flex-col">
              <button 
                onClick={() => setIsMobileLearnOpen(!isMobileLearnOpen)}
                className="flex items-center justify-between hover:text-primary transition-colors"
                aria-expanded={isMobileLearnOpen}
                aria-label="Toggle Learn and Earn Menu"
              >
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-secondary mr-3 inline-block"></span>Learn and Earn
                </div>
                <svg 
                  className={`w-5 h-5 transition-transform duration-200 ${isMobileLearnOpen ? 'rotate-180' : ''}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isMobileLearnOpen && (
                <div className="pl-8 pt-4 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
                  <Link href="/internships" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary text-gray-600">
                    &raquo; Internships
                  </Link>
                  <Link href="/certifications" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary text-gray-600">
                    &raquo; Certifications
                  </Link>
                </div>
              )}
            </div>


            <a 
              href="tel:9560020771" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 flex h-14 w-full items-center justify-center rounded-md bg-foreground px-4 py-2 text-lg font-bold text-white transition-all hover:bg-gray-800"
            >
              Call Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
