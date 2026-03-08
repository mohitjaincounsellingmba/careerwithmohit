import Link from 'next/link';
import { Compass } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-12">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Compass className="h-6 w-6 text-accent" />
          <span className="font-display text-xl font-semibold tracking-tight">Mohit Jain</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
          <Link href="/" className="hover:text-accent text-accent transition-colors">Blog</Link>
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link 
            href="/contact" 
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-accent/90"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
