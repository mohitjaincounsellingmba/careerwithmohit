import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  Award, 
  GraduationCap, 
  Globe2, 
  HeartHandshake, 
  BookOpen, 
  HandCoins, 
  Building2, 
  Landmark, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  MessageCircle,
  Percent
} from 'lucide-react';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { ScholarshipsClient } from '@/components/ScholarshipsClient';
import { ALL_SCHOLARSHIPS } from '@/data/scholarships';

export const metadata: Metadata = {
  title: 'Top Scholarships 2027-2028: National & Global Funding | CareerWithMohit',
  description: 'Explore the definitive list of 2027-2028 scholarships for Indian students. Compare merit-based, means-based, MBA, PGDM, engineering, and study abroad funding with eligibility guidelines from Mohit Jain.',
  keywords: [
    'scholarships 2027',
    'mba scholarships 2027 india',
    'pgdm scholarship 2027',
    'degree admission scholarship 2027',
    'study abroad scholarships 2027',
    'merit scholarship 2027 indian students',
    'nsp central sector scholarship 2027',
    'reliance foundation scholarship',
    'sbi asha scholarship 2027',
    'kotak kanya scholarship'
  ],
  alternates: {
    canonical: 'https://www.careerwithmohit.online/scholarships-2026',
  },
  openGraph: {
    title: 'Top Scholarships 2027-2028: National & Global Funding | CareerWithMohit',
    description: 'Explore verified scholarships for Indian students: MBA, B.Tech, Medical, and Study Abroad grants with audited deadlines.',
    type: 'website',
    url: 'https://www.careerwithmohit.online/scholarships-2026',
    siteName: 'CareerWithMohit',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Scholarships 2027-2028 - CareerWithMohit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Scholarships 2027-2028: National & Global Funding',
    description: 'Complete verified directory of Indian and international scholarships.',
    images: ['/og-image.webp'],
  },
};

export default function ScholarshipsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Top Indian & International Scholarships 2027-2028",
    "description": "Complete list of government, corporate, MBA, and merit scholarships for Indian students.",
    "url": "https://www.careerwithmohit.online/scholarships-2026",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": ALL_SCHOLARSHIPS.map((s, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "FinancialProduct",
          "name": s.name,
          "description": `${s.category} scholarship offering ${s.award} for ${s.eligibility}. Deadline: ${s.deadline}.`,
          "url": s.applyLink,
        }
      }))
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.careerwithmohit.online",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Scholarships",
        "item": "https://www.careerwithmohit.online/scholarships-2026",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I apply for more than one scholarship at the same time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can apply for multiple corporate, university, and merit scholarships simultaneously. However, government guidelines (such as NSP) typically stipulate that you can only avail of one central/state government financial aid benefit at a time."
        }
      },
      {
        "@type": "Question",
        "name": "Are there scholarships available specifically for MBA and PGDM programs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Flagship programs like the SBI Asha Scholarship (up to ₹5 Lakhs), Aditya Birla Group Scholarship (up to ₹3 Lakhs), and OP Jindal OPJEMS provide direct grants to students at top B-Schools (IIMs, XLRI, MDI, SPJIMR). Most top private and university MBA institutions also offer 25% to 100% tuition waivers."
        }
      },
      {
        "@type": "Question",
        "name": "What documents are compulsory for merit-cum-means scholarships in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Essential documents include: (1) Valid Income Certificate issued by a Competent Authority (Tehsildar / SDO), (2) 10th & 12th Marksheets, (3) Bonafide Student Certificate, (4) Aadhaar Card, and (5) Bank Passbook linked with Aadhaar."
        }
      },
      {
        "@type": "Question",
        "name": "What is the typical family income limit to qualify for EWS scholarships?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most government and CSR schemes consider an annual gross family income of up to ₹2.5 Lakhs as priority EWS. Some prominent corporate scholarships accept income certificates up to ₹6 Lakhs to ₹15 Lakhs per annum depending on the category."
        }
      },
      {
        "@type": "Question",
        "name": "Do study abroad scholarships cover living expenses in addition to tuition?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prestigious global awards like the UK Chevening Scholarship, US Fulbright-Nehru Fellowship, and European Erasmus Mundus Joint Masters cover 100% of university tuition fees plus a monthly living stipend, return airfare, and visa health insurance."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* ── MODERN SLEEK MIDNIGHT HERO ── */}
      <div className="relative bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white pt-12 pb-20 px-6 overflow-hidden">
        {/* Subtle Ambient Glows & Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8">
            <Breadcrumbs />
          </div>

          {/* Top Announcement Tag */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-200">
              National &amp; Global Financial Aid Directory • 2027-28 Academic Cycle
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Top Scholarships <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                For 2027-28 Intake
              </span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-slate-300 border-l-2 border-amber-400/80 pl-5 mb-10 leading-relaxed max-w-3xl">
              India&apos;s most comprehensive scholarship and financial grant discovery directory. Compare corporate CSR awards, <span className="text-white font-semibold underline decoration-amber-400/50 decoration-2 underline-offset-4">central government schemes (NSP)</span>, <span className="text-white font-semibold underline decoration-amber-400/50 decoration-2 underline-offset-4">MBA institutional fee waivers</span>, and <span className="text-white font-semibold underline decoration-amber-400/50 decoration-2 underline-offset-4">fully funded global fellowships</span>.
            </p>

            {/* Hero Quick Jump & Trust Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Featured Streams:
              </span>
              <span className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors">
                🎓 Class 12 &amp; UG
              </span>
              <span className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-emerald-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors">
                💼 MBA / PGDM Grants
              </span>
              <span className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-pink-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors">
                🌸 Women in STEM
              </span>
              <span className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-blue-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors">
                🏛️ Govt (NSP Portal)
              </span>
              <span className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-purple-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors">
                ✈️ Global Masters
              </span>
            </div>

            {/* Quick Action CTA Strip */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#directory"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black px-7 py-3.5 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center gap-2"
              >
                Browse Scholarships Directory <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919811559190?text=Hi%20Mohit,%20I%20need%20guidance%20regarding%20scholarships%20and%20fee%20waivers%20for%202027-28."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 text-white border border-white/15 font-bold px-6 py-3.5 rounded-2xl transition-all text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Mohit Jain
              </a>
            </div>
          </div>

          {/* 4-Card Executive Stats Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-10 border-t border-white/10">
            <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-3">
                <HandCoins className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-white">₹100 Cr+</div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">
                Annual Grant Pools
              </p>
            </div>

            <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-white">50+ Schemes</div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mt-1">
                100% Verified Guidelines
              </p>
            </div>

            <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mb-3">
                <Percent className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-white">Up to 100%</div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">
                Tuition Fee Waivers
              </p>
            </div>

            <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-white">₹0 Fee</div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">
                Free Expert Advice
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE CLIENT CONTENT (CATEGORIES, DIRECTORY, TABLE & FAQ) ── */}
      <ScholarshipsClient />

      {/* ── BOTTOM CTA BANNER ── */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="rounded-3xl bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white border border-white/10 p-8 md:p-14 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-300 mb-4">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
              Personalized Scholarship Advisory
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Need Help Finding The Right Scholarship Or Fee Waiver?
            </h2>
            <p className="text-base md:text-lg font-medium text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Don&apos;t let financial constraints stop you from attending India&apos;s best business schools and universities. Book a 1-on-1 strategy session with Mohit Jain to assess fee waivers, low-interest bank loans, and corporate grants.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/919811559190?text=Hi%20Mohit,%20I%20am%20exploring%20scholarships%20and%20fee%20waivers.%20Please%20guide%20me!"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-7 py-4 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chat On WhatsApp (Fastest)
              </a>
              <Link 
                href="/services" 
                className="bg-white/10 hover:bg-white/15 text-white border border-white/15 font-bold px-7 py-4 rounded-2xl transition-all text-xs uppercase tracking-wider flex items-center gap-2"
              >
                Book Counselling Session <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
