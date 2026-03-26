import { Metadata } from 'next';
import { BadgeCheck, Phone } from 'lucide-react';
import OnlineDegreeClient from '@/components/OnlineDegreeClient';

export const metadata: Metadata = {
  title: 'Top Online Degrees & Certifications 2026 | UGC Approved Universities',
  description:
    'Explore UGC-approved online universities in India. Compare fees, programs, accreditation and get free expert counselling for online MBA, MCA, BBA, BCA and more.',
  keywords: [
    'online MBA 2026',
    'UGC approved online universities',
    'online degree India',
    'online BBA admission',
    'distance education India',
    'online MCA colleges',
  ],
};

export default function OnlineDegreePage() {
  return (
    <div className="bg-[#f8f7f4] min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        .page-font { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }
        .hero-bg {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%);
        }
        .hero-grid {
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          position: absolute;
          inset: 0;
        }
        .stat-card {
          background: linear-gradient(135deg, #1e293b, #0f172a);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
        }
        .cta-strip {
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
        }
      `}</style>

      <div className="page-font">

        {/* ── HERO ── */}
        <section className="hero-bg py-24 md:py-36 relative">
          <div className="hero-grid" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <BadgeCheck size={14} className="text-indigo-400" />
              UGC-DEB Approved Universities · 2026 Edition
            </span>
            <h1 className="display-font text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Online Degrees
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                &amp; Certifications
              </span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Compare India&apos;s top online universities on fees, accreditation, and programs.
              Search, filter, and make the smartest choice for your career in 2026.
            </p>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { num: '26+', label: 'Universities' },
                { num: '₹62K', label: 'Starting Fee' },
                { num: '100%', label: 'UGC Approved' },
              ].map((s) => (
                <div key={s.label} className="stat-card px-4 py-5">
                  <p className="display-font text-2xl font-black text-white">{s.num}</p>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <div className="cta-strip py-4 text-center text-white">
          <a
            href="tel:+919560020771"
            className="inline-flex items-center gap-2 font-semibold text-sm hover:underline underline-offset-2 transition-all"
          >
            <Phone size={15} />
            Talk to a free counsellor · Call +91 95600 20771
          </a>
        </div>

        {/* ── INTERACTIVE CLIENT SECTION ── */}
        <OnlineDegreeClient />

        {/* ── BOTTOM CTA BANNER ── */}
        <section className="bg-[#0f172a] py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="display-font text-3xl md:text-4xl font-black text-white mb-4">
              Not sure which university to pick?
            </h2>
            <p className="text-white/50 mb-8 text-lg">
              Get a free 1-on-1 call with Mohit Jain and find the right program based on your goals + budget.
            </p>
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20want%20to%20know%20more%20about%20online%20degrees"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-lg px-10 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-xl shadow-indigo-900/40"
            >
              Get Free Counselling →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
