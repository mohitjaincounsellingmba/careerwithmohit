import Link from 'next/link';
import Image from 'next/image';
import { Compass, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <span className="font-display text-2xl font-bold tracking-tight block mb-4 flex items-center gap-3 uppercase">
              <div className="bg-white p-1 rounded-md border-2 border-primary">
                <Image 
                  src="/logo.webp" 
                  alt="Mohit Jain Logo" 
                  width={28} 
                  height={28} 
                  className="object-contain"
                />
              </div>
              Mohit Jain
            </span>
            <p className="text-gray-300 text-lg max-w-sm leading-relaxed font-medium">
              Empowering professionals to navigate their career paths with clarity, confidence, and purpose.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Navigation</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><Link href="/" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Home</Link></li>
              <li><Link href="/services" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Services</Link></li>
              <li><Link href="/blog" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Blog</Link></li>
              <li><Link href="/about" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Calculators</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><Link href="/calculator/cuet-pg-2026" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">CUET PG 2026 Calculator</Link></li>
              <li><Link href="/calculator/jee-main-2026" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">JEE Main 2026 Calculator</Link></li>
              <li><Link href="/calculator/career-roadmap" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Career Roadmap Calculator</Link></li>
              <li><Link href="/calculator/certification" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">MBA Certification Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Tools</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><Link href="/tools/resume-generator" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Free Resume Builder</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Connect</h3>
            <ul className="space-y-4 text-base font-medium">
              <li>
                <a
                  href="https://www.instagram.com/collegereviews.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary flex items-center gap-2 group transition-colors"
                >
                  <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  collegereviews.in
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t-2 border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-sm font-medium text-gray-400">
          <p>© {new Date().getFullYear()} Mohit Jain. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
