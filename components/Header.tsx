"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Compass, Menu, X } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-12">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Compass className="h-6 w-6 text-accent" />
          <span className="font-display text-xl font-semibold tracking-tight">Mohit Jain</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <Link href="/blog" className="hover:text-accent text-accent transition-colors">Blog</Link>
          <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
          <Link href="/news" className="hover:text-accent transition-colors">News</Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground/50"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              className="h-9 w-48 rounded-md border border-border-subtle bg-surface pl-9 pr-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
            />
          </div>
          <Link 
            href="/contact" 
            className="hidden lg:inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-accent/90"
          >
            Book Consultation
          </Link>
          <button 
            className="md:hidden flex items-center justify-center p-2 text-foreground/80 hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full border-b border-border-subtle bg-surface/95 backdrop-blur-xl shadow-lg">
          <nav className="flex flex-col px-6 py-6 gap-6 text-sm font-medium text-foreground/80">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors">Home</Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors">Blog</Link>
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors">Services</Link>
            <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors">News</Link>
            <Link 
              href="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 flex h-10 w-full items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-accent/90"
            >
              Book Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
