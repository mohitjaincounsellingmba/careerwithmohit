import Link from 'next/link';
import Image from 'next/image';
import { Compass, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import CollegeDataFetcher from './CollegeDataFetcher';

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-12 border-b-2 border-gray-800 pb-12">
          <div className="lg:col-span-2">
            <span className="font-display text-2xl font-bold tracking-tight block mb-4 flex items-center gap-3 uppercase">
              <div className="bg-white p-1 rounded-md border-2 border-primary">
                <Image 
                  src="/logo.webp" 
                  alt="Mohit Jain Logo" 
                  width={28} 
                  height={20} // Fixed height to maintain aspect ratio
                  className="object-contain"
                />
              </div>
              Mohit Jain
            </span>
            <p className="text-gray-300 text-lg max-w-sm leading-relaxed font-medium">
              Empowering professionals to navigate their career paths with clarity, confidence, and purpose.
            </p>

            <div className="flex gap-4 mt-6">
              <a 
                href="https://www.instagram.com/careerwithmohit.online/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/career-with-mohit" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61575525271998" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@careerwithmohit.online" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-all hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
            
            {/* TOOLS SECTION */}
            <div className="mt-8 space-y-6 max-w-xs">
              <CollegeDataFetcher />
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Quick Links</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><Link href="/" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">About</Link></li>
              <li><Link href="/colleges" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Colleges</Link></li>
              <li><Link href="/blog" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Blog</Link></li>
              <li><Link href="/services" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Services</Link></li>
              <li><Link href="/online-degree-certification" className="hover:text-primary hover:translate-x-1 inline-block transition-transform text-cyan-400 font-bold">Online Degrees</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Exams</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><Link href="/blog/all-about-cat-exam" className="hover:text-primary hover:translate-x-1 inline-block transition-transform uppercase">CAT</Link></li>
              <li><Link href="/blog/all-about-xat-exam" className="hover:text-primary hover:translate-x-1 inline-block transition-transform uppercase">XAT</Link></li>
              <li><Link href="/blog/all-about-snap-exam" className="hover:text-primary hover:translate-x-1 inline-block transition-transform uppercase">SNAP</Link></li>
              <li><Link href="/blog/all-about-nmat-exam" className="hover:text-primary hover:translate-x-1 inline-block transition-transform uppercase">NMAT</Link></li>
              <li><Link href="/blog/all-about-jee-exam" className="hover:text-primary hover:translate-x-1 inline-block transition-transform uppercase">JEE</Link></li>
              <li><Link href="/blog/all-about-neet-exam" className="hover:text-primary hover:translate-x-1 inline-block transition-transform uppercase">NEET</Link></li>
              <li><Link href="/blog/all-about-cmat-exam" className="hover:text-primary hover:translate-x-1 inline-block transition-transform uppercase">CMAT</Link></li>
              <li><Link href="/blog/all-about-mat-exam" className="hover:text-primary hover:translate-x-1 inline-block transition-transform uppercase">MAT</Link></li>
              <li><Link href="/blog/all-about-clat-exam" className="hover:text-primary hover:translate-x-1 inline-block transition-transform uppercase">CLAT</Link></li>
              <li><Link href="/blog/all-about-mah-mba-cet-exam" className="hover:text-primary hover:translate-x-1 inline-block transition-transform uppercase">MBA MHCET</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Business Solutions</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><Link href="/sell-your-coaching-online" className="hover:text-primary transition-colors text-accent font-black">For Teachers</Link></li>
              <li><Link href="/sell-your-coaching-online" className="hover:text-primary transition-colors">For YouTubers</Link></li>
              <li><Link href="/sell-your-coaching-online" className="hover:text-primary transition-colors">Coaching Centers</Link></li>
              <li><Link href="/sell-your-coaching-online" className="hover:text-primary transition-colors font-bold italic">10x Your Income</Link></li>
              <li><Link href="/sell-your-coaching-online" className="hover:text-primary transition-colors">Build Your App</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Calculators & Tools</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><Link href="/calculator/jee-main-2026" className="hover:text-primary hover:translate-x-1 inline-block transition-transform text-red-500 font-extrabold italic underline decoration-dotted">JEE Main 2026 Checker</Link></li>
              <li><Link href="/calculator/cuet-pg-2026" className="hover:text-primary hover:translate-x-1 inline-block transition-transform text-cyan-400 font-black italic underline decoration-wavy">CUET PG 2026 Calculator</Link></li>
              <li><Link href="/tools/cuet-pg-mba-predictor" className="hover:text-primary hover:translate-x-1 inline-block transition-transform text-blue-500 font-black italic">CUET PG Predictor</Link></li>
              <li><Link href="/tools/btech-college-predictor" className="hover:text-primary hover:translate-x-1 inline-block transition-transform text-yellow-500 font-black italic">B.Tech Predictor</Link></li>
              <li><Link href="/tools/college-comparison" className="hover:text-primary hover:translate-x-1 inline-block transition-transform text-indigo-400 font-bold">College Comparison</Link></li>
              <li><Link href="/tools/accreditation-checker" className="hover:text-primary hover:translate-x-1 inline-block transition-transform text-rose-400 font-black italic">Accreditation Auditor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Mock Tests</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><Link href="/tools/mock-test/cat" className="hover:text-primary hover:translate-x-1 inline-block transition-transform text-orange-400 font-black">CAT Mock 2026</Link></li>
              <li><Link href="/tools/mock-test/jee-main" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">JEE Main Mock</Link></li>
              <li><Link href="/tools/mock-test/jee-advanced" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">JEE Advanced Mock</Link></li>
              <li><Link href="/tools/mock-test/neet" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">NEET Mock Test</Link></li>
              <li><Link href="/tools/mock-test/bitsat" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">BITSAT Mock Test</Link></li>
              <li><Link href="/tools/mock-test/clat" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">CLAT Mock Test</Link></li>
              <li><Link href="/tools/mock-test/viteee" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">VITEEE Mock</Link></li>
              <li><Link href="/tools/mock-test/srmjee" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">SRMJEE Mock</Link></li>
              <li><Link href="/tools/mhcet-mock-test" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">MHCET Mock</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Career Section</h3>
            <ul className="space-y-4 text-base font-medium">
              <li><Link href="/internships" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Internships</Link></li>
              <li><Link href="/jobs" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Jobs</Link></li>
              <li><Link href="/certifications" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Certifications</Link></li>
              <li><Link href="/calculator/career-roadmap" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Roadmap Generator</Link></li>
              <li><Link href="/tools/ai-skills" className="hover:text-primary hover:translate-x-1 inline-block transition-transform font-bold text-green-500">AI Skills Training</Link></li>
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
