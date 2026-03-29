"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Compass, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { SearchInput } from './SearchInput';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link href="/" className="hover:text-primary hover:-translate-y-0.5 transition-transform" title="Home Page">Home</Link>
          <Link href="/about" className="hover:text-primary hover:-translate-y-0.5 transition-transform" title="About Mohit Jain">About</Link>
          <Link href="/blog" className="hover:text-primary hover:-translate-y-0.5 transition-transform" title="Career Blog & Roadmaps">Blog</Link>
          <Link href="/colleges" className="hover:text-primary hover:-translate-y-0.5 transition-transform" title="Explore Top Colleges">Colleges</Link>

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
