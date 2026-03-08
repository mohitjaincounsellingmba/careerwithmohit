"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Compass, Menu, X } from 'lucide-react';
import { SearchInput } from './SearchInput';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-12 relative">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:-translate-y-0.5">
          <div className="bg-primary text-white p-2 rounded-md">
            <Compass className="h-6 w-6" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">Mohit Jain</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-base font-bold text-foreground">
          <Link href="/" className="hover:text-primary hover:-translate-y-0.5 transition-transform">Home</Link>
          <Link href="/blog" className="hover:text-primary hover:-translate-y-0.5 transition-transform">Blog</Link>
          <Link href="/services" className="hover:text-primary hover:-translate-y-0.5 transition-transform">Services</Link>
          <Link href="/news" className="hover:text-primary hover:-translate-y-0.5 transition-transform">News</Link>
        </nav>
        <div className="flex items-center gap-4">
          <SearchInput />
          <a 
            href="https://wa.me/919560020771" 
            target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 py-2 text-base font-bold text-white transition-all hover:bg-blue-600 hover:scale-105"
          >
            Connect on WhatsApp
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
        <div className="md:hidden absolute top-20 left-0 w-full border-b-2 border-gray-200 bg-white shadow-xl z-50">
          <nav className="flex flex-col px-6 py-8 gap-6 text-lg font-bold text-foreground">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-3 inline-block"></span>Home
            </Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-3 inline-block"></span>Blog
            </Link>
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-3 inline-block"></span>Services
            </Link>
            <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-3 inline-block"></span>News
            </Link>
            <a 
              href="https://wa.me/919560020771" 
              target="_blank" rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-6 flex h-14 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-lg font-bold text-white transition-all hover:bg-blue-600"
            >
              Connect on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
