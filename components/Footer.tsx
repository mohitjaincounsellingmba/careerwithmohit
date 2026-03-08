import Link from 'next/link';
import { Compass } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <span className="font-display text-2xl font-bold tracking-tight block mb-4 flex items-center gap-3">
              <Compass className="h-8 w-8 text-primary" />
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
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Connect</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">LinkedIn</a></li>
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Twitter</a></li>
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Email</a></li>
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
