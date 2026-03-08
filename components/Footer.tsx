import Link from 'next/link';
import { Compass } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <span className="font-display text-xl font-semibold tracking-tight block mb-4 flex items-center gap-2">
              <Compass className="h-5 w-5 text-accent" />
              Mohit Jain Career Counselling
            </span>
            <p className="text-foreground/70 text-sm max-w-xs leading-relaxed">
              Empowering professionals to navigate their career paths with clarity, confidence, and purpose.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground/90">Navigation</h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="/" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground/90">Connect</h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li><a href="#" className="hover:text-accent transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border-subtle pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-foreground/50">
          <p>© {new Date().getFullYear()} Mohit Jain. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 space-x-4">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
