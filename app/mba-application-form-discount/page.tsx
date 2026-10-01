import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Tag,
  ShieldCheck,
  Award,
  CheckCircle2,
  TrendingDown,
  ArrowRight,
  GraduationCap,
  Percent,
  Gift,
  Phone,
  MessageCircle,
  Building,
  HelpCircle,
  Flame,
  Zap,
  Ticket,
  MapPin,
  FileText,
  BadgeCheck,
  Check,
  Layers,
  Clock,
  PhoneCall,
  Users,
  ChevronDown,
  X
} from 'lucide-react';
import MbaFormDiscountCalculator from '@/components/MbaFormDiscountCalculator';
import { MBA_FORM_COLLEGES } from '@/data/mbaFormDiscountsData';

const BASE_URL = 'https://careerwithmohit.online';
const PAGE_PATH = '/mba-application-form-discount/';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'MBA Application Form Discount Codes 2027: 55+ Colleges (Save 50-100%)',
  description:
    'Get verified 2027 MBA application form fee discount coupon codes for 55+ top AICTE B-schools (NDIM, FOSTIIMA, FIIB, JIMS, Jaipuria, PIBM, SOIL, JAGSoM). Save ₹5,000+ with free GD-PI prep.',
  keywords: [
    'MBA application form discount coupon 2027',
    'MBA form discount codes 2027',
    'PGDM form discount code',
    'free MBA application forms 2027',
    'NDIM application form coupon',
    'FOSTIIMA form promo code',
    'FIIB Delhi application form waiver',
    'JIMS Kalkaji form coupon',
    'Jaipuria Noida application discount',
    'PIBM Pune form discount code',
    'SOIL Gurgaon application fee waiver',
    'cheap MBA application forms',
    'MBA college application fee waiver 2027',
    'discount on MBA forms CareerWithMohit',
    'Delhi NCR MBA form discount',
    'Pune MBA form discount code',
    'Bangalore MBA form concession',
    'MBA form combo discount calculator'
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'MBA Application Form Discount Codes 2027: 55+ Colleges (Save 50-100%)',
    description:
      'Unlock verified discount codes and save up to ₹1,500 per form across 55+ top business schools in Delhi NCR, Pune, Mumbai, and Bangalore. Includes free GD-PI mentorship.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: 'MBA Application Form Discount Codes 2027',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBA Application Form Discount Codes 2027: 55+ B-Schools | CareerWithMohit',
    description:
      'Get verified application fee discount coupon codes for 55+ AICTE approved business schools. Save ₹5,000+ with free GD-PI interview guidance.',
    creator: '@careerwithmohit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

// ── JSON-LD Structured Data (Comprehensive Multi-Graph) ──────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': PAGE_URL,
      url: PAGE_URL,
      name: 'MBA Application Form Discount Codes 2027: 55+ Colleges | CareerWithMohit',
      description:
        'Official application form fee concessions and voucher codes for 55+ AICTE approved business schools in Delhi NCR, Pune, Mumbai, and Bangalore.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      inLanguage: 'en-IN',
      datePublished: '2026-08-15T09:00:00+05:30',
      dateModified: '2026-10-01T17:00:00+05:30',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'MBA / PGDM Admission 2027', item: `${BASE_URL}/mba-pgdm-admission-2027` },
          { '@type': 'ListItem', position: 3, name: 'MBA Form Discounts', item: PAGE_URL },
        ],
      },
    },
    {
      '@type': 'OfferCatalog',
      name: 'MBA & PGDM Application Form Discount Coupons 2027',
      description: 'Exclusive institutional application form concessions and voucher codes for 55+ top management institutes.',
      url: PAGE_URL,
      numberOfItems: MBA_FORM_COLLEGES.length,
      itemListElement: MBA_FORM_COLLEGES.map((c, index) => ({
        '@type': 'Offer',
        position: index + 1,
        name: `${c.name} Application Form Concession`,
        price: c.discountedFee,
        priceCurrency: 'INR',
        priceValidUntil: '2027-06-30',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'EducationalOrganization',
          name: 'CareerWithMohit',
          url: BASE_URL
        },
        itemOffered: {
          '@type': 'Service',
          name: `${c.name} Official Application Form 2027`,
          provider: {
            '@type': 'EducationalOrganization',
            name: c.name,
            address: c.location
          }
        }
      }))
    },
    {
      '@type': 'HowTo',
      name: 'How to Claim MBA Application Form Discounts 2027',
      description: 'Step-by-step instructions to unlock official application form fee coupon codes for premier business schools.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select Target Business Schools',
          text: 'Browse 55+ AICTE approved business schools in Delhi NCR, Pune, Bangalore, or Mumbai and click Get Code or add to Combo.'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Verify Candidate Profile',
          text: 'Fill a quick 30-second inquiry form to authenticate your candidate profile and reveal your exclusive institutional voucher code.'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Apply on Official College Portal',
          text: 'Paste the coupon code into the referral/promo code field on the official college ERP portal to reduce your registration fee.'
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Access Free GD-PI Mentorship',
          text: 'Receive complimentary GD-PI interview training kits, top 100 questions PDF, and 1-on-1 strategy with Mohit Jain.'
        }
      ]
    },
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#mohitjain`,
      name: 'Mohit Jain',
      jobTitle: 'Senior MBA & Higher Education Admission Consultant',
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'CareerWithMohit',
        url: BASE_URL
      },
      alumniOf: ['IIM Bangalore Executive Education', 'Faculty of Management Studies'],
      description: 'Senior MBA Admission Mentor with 10+ years of experience helping 12,000+ candidates secure B-school admissions.'
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are these MBA application form discount coupon codes official and legal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, 100%. All application forms and discount vouchers are issued in direct collaboration with the official admissions directorates of the respective institutions (NDIM, FOSTIIMA, FIIB, JIMS, PIBM, SOIL, etc.). You fill out and submit the official college portal form directly.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I use the discount code on the college portal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When you click "Get Code" and fill the quick inquiry, our system reveals the customized institutional voucher code and direct link. When you apply on the college’s official registration page, the fee is automatically reduced to the discounted rate shown here.'
          }
        },
        {
          '@type': 'Question',
          name: 'How much money can an MBA applicant save using form discount bundles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Applying to 4 to 6 business schools normally costs ₹6,000 to ₹10,000 in application form fees. With CareerWithMohit institutional waivers, students typically pay only ₹2,000 to ₹3,500 total, saving between ₹4,000 and ₹7,500+ per admission cycle.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I apply for multiple MBA colleges through combo discount packs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can select 2 to 5 colleges in our interactive Combo Calculator to stack individual form waivers with bundle coupon codes (e.g. MOHIT2027, EARLYBIRD) for maximum total savings.'
          }
        },
        {
          '@type': 'Question',
          name: 'What if I already started filling a form on a college website?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can still avail the discount voucher if you have not yet completed the final payment step. Contact our WhatsApp support at +91 95600 20771 with your registered mobile/email to link your discount.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do I get free GD-PI preparation and interview guidance with these forms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Every student who claims an application form discount receives complimentary 1-on-1 GD-PI mentorship with Mohit Jain, a 100 MBA Interview Questions & Answers PDF guide, and WAT strategy frameworks.'
          }
        }
      ]
    }
  ]
};

const FAQ_ITEMS = [
  {
    q: 'Are these MBA application form discount coupon codes official and legal?',
    a: 'Yes, 100%. All application forms and discount vouchers are issued in direct partnership with the official admissions directorates of the respective institutions (NDIM, FOSTIIMA, FIIB, JIMS, PIBM, SOIL, etc.). You fill out and submit the application on the official college ERP portal directly.'
  },
  {
    q: 'How do I use the discount code on the college portal?',
    a: 'When you click "Get Code" and fill the quick inquiry, our system reveals the customized institutional voucher code and direct application link. When you apply on the college’s official registration page, enter this code in the promo/referral code field to instantly reduce the payable fee.'
  },
  {
    q: 'How much money can an MBA applicant save during the 2027 application season?',
    a: 'Applying to 4 to 6 business schools normally costs ₹6,000 to ₹10,000 in application form fees alone. With CareerWithMohit institutional fee waivers (ranging from 40% to 100% off), students typically pay only ₹2,000 to ₹3,500 total, saving between ₹4,000 and ₹7,500+ per admission cycle.'
  },
  {
    q: 'Can I apply for multiple MBA colleges through combo discount packs?',
    a: 'Yes! You can select 2 to 5 colleges in our interactive Combo Calculator to stack individual form concessions with bundle coupon codes (e.g. MOHIT2027, EARLYBIRD, COMBO500) for maximum cumulative savings.'
  },
  {
    q: 'What if I have already started filling a form on a college website?',
    a: 'You can still avail the discount voucher if you have not yet completed the final payment step. Contact our WhatsApp support at +91 95600 20771 with your registered candidate details to link your discount.'
  },
  {
    q: 'Do I get free GD-PI preparation and interview guidance with these forms?',
    a: 'Yes! Every candidate who unlocks an application form discount code receives complimentary 1-on-1 GD-PI interview training with Mohit Jain, a 100 MBA Interview Questions & Answers PDF handbook, and WAT structure frameworks.'
  },
  {
    q: 'Which regions and cities are covered in the 55+ college form discount catalog?',
    a: 'Our catalog covers 55+ premier institutions across Delhi NCR (South Delhi, Dwarka, Noida, Greater Noida, Gurugram, Ghaziabad), Pune (Hinjawadi, Tathawade, Wakad), Bangalore (Electronic City, Bannerghatta), and Mumbai (Bandra, Belapur).'
  },
  {
    q: 'Are all listed PGDM & MBA colleges approved by AICTE, UGC, or AIU?',
    a: 'Yes, 100% of the colleges featured on CareerWithMohit are approved by AICTE (All India Council for Technical Education) or recognized by UGC, with many holding AIU (Association of Indian Universities) MBA equivalence and NBA/AACSB accreditations.'
  },
  {
    q: 'Is there any hidden fee or extra charge for accessing these discount codes?',
    a: 'None whatsoever. CareerWithMohit provides these verified institutional concessions completely free of charge to help students minimize their application expense burden.'
  },
  {
    q: 'How do I get personalized profile shortlisting for Dream, Target, and Safe colleges?',
    a: 'You can connect directly with mentor Mohit Jain via WhatsApp at +91 95600 20771 or book a free 1-on-1 video call to evaluate your CAT/MAT/CMAT percentile and academic profile.'
  }
];

export default function MbaApplicationFormDiscountPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#070A14] text-white selection:bg-[#00FF88] selection:text-black pb-24 relative overflow-hidden">
        
        {/* Subtle Cyber Grid Background Texture (Exact Home Page Theme) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]" />

        {/* ── 1. HERO SECTION ── */}
        <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-white/10">
          
          {/* Ambient Glowing Blobs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-[#00FF88]/10 blur-[140px] pointer-events-none rounded-full" />
          <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-[#00F0FF]/10 blur-[130px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[250px] bg-[#8B5CF6]/10 blur-[120px] pointer-events-none rounded-full" />

          <div className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-mono text-xs text-slate-400 mb-6 font-medium">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/mba-pgdm-admission-2027" className="hover:text-white transition-colors">MBA &amp; PGDM 2027</Link>
              <span>/</span>
              <span className="text-[#00FF88] font-bold">Application Form Discounts</span>
            </nav>

            {/* Top Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-[0_0_20px_rgba(0,255,136,0.2)] font-mono text-xs font-bold uppercase tracking-wider mb-6 text-[#00FF88]">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_10px_#00FF88] animate-ping" />
              <span>Official Institutional Concession Hub · Batch 2027–2029</span>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight max-w-5xl">
              Get Official MBA Form Discounts &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] via-[#00F0FF] to-[#8B5CF6]">
                Save up to 100% on 55+ Application Fees
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-white/75 max-w-3xl leading-relaxed font-normal">
              Select your target colleges below to instantly unlock official discount coupon codes for <strong>55+ AICTE &amp; AIU approved business schools</strong> across Delhi NCR, Pune, Mumbai, and Bangalore.
            </p>

            {/* ── RULE 2: DIRECT AI ANSWER SUMMARY BLOCK (GEO/AEO KEY TAKEAWAY) ── */}
            <div className="mt-8 p-6 rounded-2xl bg-[#061124]/90 border border-emerald-500/40 text-slate-200 text-sm leading-relaxed shadow-[0_0_30px_rgba(0,255,136,0.1)] backdrop-blur-md">
              <div className="flex items-center gap-2 font-display font-black text-[#00FF88] text-base mb-2">
                <Sparkles className="w-4 h-4 text-[#00FF88]" />
                <span>Direct AI Answer Summary (MBA Application Form Fee Waivers 2027)</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li><strong>Official Fee Concessions:</strong> Aspirants get verified 40% to 100% discount codes across 55+ AICTE/AIU approved institutes (NDIM, FOSTIIMA, FIIB, JIMS, Jaipuria, PIBM, SOIL, JAGSoM).</li>
                <li><strong>Financial Impact:</strong> An applicant applying to 4–6 business schools saves between <strong>₹3,500 and ₹7,500+</strong> in registration fees alone.</li>
                <li><strong>Bonus Mentorship Inclusions:</strong> Every voucher code includes complimentary 1-on-1 GD-PI interview preparation with Mohit Jain and a 100 MBA Interview Q&amp;A handbook.</li>
              </ul>
            </div>

            {/* Trust Proof Stats Counter */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="bg-white/[0.04] p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:border-cyan-400/30 transition-all">
                <div className="text-2xl sm:text-3xl font-black text-white">55+</div>
                <div className="font-mono text-xs text-slate-400 mt-1">Verified AICTE Colleges</div>
              </div>
              <div className="bg-white/[0.04] p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:border-emerald-400/30 transition-all">
                <div className="text-2xl sm:text-3xl font-black text-[#00FF88]">Up to 100%</div>
                <div className="font-mono text-xs text-slate-400 mt-1">Max Form Fee Concession</div>
              </div>
              <div className="bg-white/[0.04] p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:border-amber-400/30 transition-all">
                <div className="text-2xl sm:text-3xl font-black text-[#F59E0B]">₹38+ Lakhs</div>
                <div className="font-mono text-xs text-slate-400 mt-1">Saved by Aspirants</div>
              </div>
              <div className="bg-white/[0.04] p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:border-blue-400/30 transition-all">
                <div className="text-2xl sm:text-3xl font-black text-[#00F0FF]">100%</div>
                <div className="font-mono text-xs text-slate-400 mt-1">Official Admission Links</div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 2. INTERACTIVE COMBO CALCULATOR & 55 COLLEGES DIRECTORY ── */}
        <section className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8 pt-10">
          <MbaFormDiscountCalculator />
        </section>

        {/* ── 3. AEO ANSWER-FIRST EXPERT EDITORIAL CONTENT SECTIONS ── */}
        <section className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
          
          {/* Section 1: How it works */}
          <div className="bg-[#061124] border border-white/15 rounded-[32px] p-7 sm:p-10 relative overflow-hidden">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider">
                <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Zero Plagiarism Institutional Protocol</span>
              </div>
              
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
                How Do MBA Application Form Discounts Work for 2027 Batch?
              </h2>

              {/* Rule 1: 45-word Bold Direct Answer */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                <strong className="text-white font-bold">
                  MBA application form discounts operate through authorized educational partnerships where business schools provide institutional promo codes to subsidize candidate registration fees from ₹1,000–₹1,500 down to ₹400–₹600 or zero. Candidates apply directly on official college portals, entering the coupon code at the final checkout step.
                </strong>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-black/40 border border-white/10 p-4 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-[#00FF88] font-mono">1. Authorized ERP Codes</div>
                  <p className="text-slate-300">Codes are pre-programmed into the college&apos;s ERP payment gateway for instant fee reduction.</p>
                </div>
                <div className="bg-black/40 border border-white/10 p-4 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-[#00F0FF] font-mono">2. Direct Registration</div>
                  <p className="text-slate-300">You maintain complete ownership of your application directly on the college domain.</p>
                </div>
                <div className="bg-black/40 border border-white/10 p-4 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-[#F59E0B] font-mono">3. No Middlemen</div>
                  <p className="text-slate-300">Zero hidden commissions or intermediary fees. Direct institutional benefit to students.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Why do colleges offer discounts */}
          <div className="bg-[#061124] border border-white/15 rounded-[32px] p-7 sm:p-10 relative overflow-hidden">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admissions Reality Check</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
                Why Do Top Business Schools Offer Application Fee Waivers via CareerWithMohit?
              </h2>

              {/* Rule 1: 45-word Bold Direct Answer */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                <strong className="text-white font-bold">
                  Premier AICTE-approved B-schools sponsor application concessions to attract diverse, high-caliber applicants across non-metro regions, promote gender and academic diversity, and encourage serious aspirants who might otherwise hesitate to spend ₹10,000+ across multiple backup forms during peak CAT, XAT, MAT, and CMAT cycles.
                </strong>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
                <div className="border-l-2 border-[#00FF88] pl-4 space-y-1">
                  <h3 className="font-bold text-white text-sm">Geographic &amp; Profile Diversity</h3>
                  <p className="text-xs text-slate-300">Institutions seek candidates from across India beyond Delhi NCR and Maharashtra.</p>
                </div>
                <div className="border-l-2 border-[#00F0FF] pl-4 space-y-1">
                  <h3 className="font-bold text-white text-sm">Merit-Based Profiling</h3>
                  <p className="text-xs text-slate-300">Candidates with strong academic track records receive priority evaluation waivers.</p>
                </div>
                <div className="border-l-2 border-[#8B5CF6] pl-4 space-y-1">
                  <h3 className="font-bold text-white text-sm">Reduced Candidate Burden</h3>
                  <p className="text-xs text-slate-300">Helps students apply to a balanced mix of Dream, Target, and Safe colleges without financial strain.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Savings Calculation Matrix */}
          <div className="bg-[#061124] border border-white/15 rounded-[32px] p-7 sm:p-10 relative overflow-hidden">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
                <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
                <span>Financial Impact Matrix</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
                How Much Money Can You Save During 2027 Admissions?
              </h2>

              {/* Rule 1: 45-word Bold Direct Answer */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-4xl">
                <strong className="text-white font-bold">
                  Applying to 4 business schools typically costs ₹5,200, which reduces to ₹2,200 with CareerWithMohit discounts (saving ₹3,000). Applying to 6 colleges normally costs ₹8,000, which drops to ₹3,200 (saving ₹4,800). Applying to 8 colleges saves up to ₹7,200 in total out-of-pocket expenses.
                </strong>
              </p>

              {/* Structured Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 mt-6 bg-black/40">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-white/5 font-mono text-slate-400 uppercase text-[11px] border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-5">Colleges Applied</th>
                      <th className="py-3.5 px-4">Standard Application Cost</th>
                      <th className="py-3.5 px-4">Discounted Cost (CareerWithMohit)</th>
                      <th className="py-3.5 px-4">Total Money Saved</th>
                      <th className="py-3.5 px-5 text-right">Free Perks Included</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-5 font-bold text-white font-display">2 Colleges (Backup Pack)</td>
                      <td className="py-3.5 px-4 line-through text-slate-400">₹2,500</td>
                      <td className="py-3.5 px-4 font-bold text-[#00FF88]">₹1,100</td>
                      <td className="py-3.5 px-4 text-[#00FF88] font-black">₹1,400 (56% OFF)</td>
                      <td className="py-3.5 px-5 text-right text-slate-300">GD-PI Question Bank</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-5 font-bold text-white font-display">4 Colleges (Standard Target Pack)</td>
                      <td className="py-3.5 px-4 line-through text-slate-400">₹5,200</td>
                      <td className="py-3.5 px-4 font-bold text-[#00FF88]">₹2,200</td>
                      <td className="py-3.5 px-4 text-[#00FF88] font-black">₹3,000 (58% OFF)</td>
                      <td className="py-3.5 px-5 text-right text-slate-300">1-on-1 Profile Strategy</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-5 font-bold text-white font-display">6 Colleges (Dream + Target + Safe)</td>
                      <td className="py-3.5 px-4 line-through text-slate-400">₹8,000</td>
                      <td className="py-3.5 px-4 font-bold text-[#00FF88]">₹3,200</td>
                      <td className="py-3.5 px-4 text-[#00FF88] font-black">₹4,800 (60% OFF)</td>
                      <td className="py-3.5 px-5 text-right text-slate-300">Full Mock GD-PI + WAT Kit</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-5 font-bold text-white font-display">8 Colleges (Pan-India Multi-Hub)</td>
                      <td className="py-3.5 px-4 line-through text-slate-400">₹11,000</td>
                      <td className="py-3.5 px-4 font-bold text-[#00FF88]">₹3,800</td>
                      <td className="py-3.5 px-4 text-[#00FF88] font-black">₹7,200 (65% OFF)</td>
                      <td className="py-3.5 px-5 text-right text-slate-300">VIP Strategy + Resume Review</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 4: Scam Alert & Safe Application */}
          <div className="bg-[#061124] border border-white/15 rounded-[32px] p-7 sm:p-10 relative overflow-hidden">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>Scam Prevention Protocol</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
                Scam Alert: How to Avoid Fake Promo Code Aggregators
              </h2>

              {/* Rule 1: 45-word Bold Direct Answer */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                <strong className="text-white font-bold">
                  Legitimate MBA form discounts are verified institutional partnerships that apply directly on official college portals. Aspirants must avoid unauthorized coupon scraping websites that charge hidden upfront fees, redirect to unofficial forms, or collect sensitive candidate documents without college authorization.
                </strong>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl text-xs space-y-1.5">
                  <div className="font-bold text-[#00FF88] flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-[#00FF88]" /> What CareerWithMohit Provides:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>Official college domain ERP registration links</li>
                    <li>Direct payment to the college&apos;s verified bank portal</li>
                    <li>100% free voucher codes with zero hidden fees</li>
                    <li>Direct mentor support with Mohit Jain</li>
                  </ul>
                </div>

                <div className="bg-rose-950/30 border border-rose-500/30 p-4 rounded-xl text-xs space-y-1.5">
                  <div className="font-bold text-rose-400 flex items-center gap-1.5 font-mono">
                    <X className="w-4 h-4 text-rose-400" /> Red Flags to Avoid on Other Sites:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>Websites asking you to pay form fees to a third-party UPI</li>
                    <li>Fake expired promo codes generated by automated bots</li>
                    <li>Unsolicited spam calls from unauthorized sales agencies</li>
                    <li>Claims of guaranteed admission without GD-PI clearance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ── 4. GEO (GEOGRAPHIC SEO) REGIONAL MANAGEMENT HUBS ── */}
        <section className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-slate-200 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
              Regional Management Hubs
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white">
              MBA Application Form Concessions by City &amp; Region
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Discover verified application fee waivers across India&apos;s primary management education clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Delhi NCR */}
            <div className="bg-[#061124] border border-white/10 rounded-3xl p-6 hover:border-[#00FF88]/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-white">Delhi NCR Hub (34 B-Schools)</h3>
                <span className="font-mono text-xs font-bold text-[#00FF88] bg-[#00FF88]/15 px-2.5 py-1 rounded-full">Save ₹12,000+</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Delhi NCR represents India&apos;s largest corporate cluster encompassing South Delhi (NDIM, FIIB, JIMS Kalkaji, IMM, EMPI), Dwarka (FOSTIIMA, Apeejay ASM), Noida Sector 62 (Jaipuria Noida, Hierank), Greater Noida Knowledge Park (GL Bajaj, GNIOT, Lloyd, Accurate, NIET, Bennett, IBI), and Gurugram (SOIL, JKBS, IBMR, BML Munjal).
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Avg Form Fee: ₹1,200 ➔ <strong>Pay ₹500</strong></span>
                <span className="text-[#00FF88] font-bold">50% - 100% OFF</span>
              </div>
            </div>

            {/* Pune */}
            <div className="bg-[#061124] border border-white/10 rounded-3xl p-6 hover:border-[#00F0FF]/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-white">Pune Management Hub (8 B-Schools)</h3>
                <span className="font-mono text-xs font-bold text-[#00F0FF] bg-[#00F0FF]/15 px-2.5 py-1 rounded-full">Save ₹4,500+</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Known as the Oxford of the East, Pune houses high-ROI institutes linked directly to the Hinjawadi IT Park and Tathawade automotive hubs. Top participating colleges include PIBM Pune, Lexicon MILE, RIIM Pune, ASM IBMR, ISB&amp;M Nande, MIT-WPU, Indira, and DY Patil.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Avg Form Fee: ₹1,250 ➔ <strong>Pay ₹550</strong></span>
                <span className="text-[#00F0FF] font-bold">50% - 60% OFF</span>
              </div>
            </div>

            {/* Bangalore */}
            <div className="bg-[#061124] border border-white/10 rounded-3xl p-6 hover:border-[#8B5CF6]/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-white">Bangalore Silicon Valley Hub (7 B-Schools)</h3>
                <span className="font-mono text-xs font-bold text-[#8B5CF6] bg-[#8B5CF6]/15 px-2.5 py-1 rounded-full">Save ₹3,800+</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bangalore provides unparalleled access to global tech giants and startups across Electronic City, Bannerghatta, and Whitefield. Key colleges with active form fee waivers include JAGSoM (AACSB Accredited), ISBR, GIBS Bangalore, Alliance University, IFIM, Acharya, and Presidency.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Avg Form Fee: ₹1,000 ➔ <strong>Pay ₹450</strong></span>
                <span className="text-[#8B5CF6] font-bold">50% - 60% OFF</span>
              </div>
            </div>

            {/* Mumbai */}
            <div className="bg-[#061124] border border-white/10 rounded-3xl p-6 hover:border-[#F59E0B]/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-white">Mumbai Financial Capital Hub (6 B-Schools)</h3>
                <span className="font-mono text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/15 px-2.5 py-1 rounded-full">Save ₹3,200+</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mumbai offers premier BFSI, FinTech, and media management exposure across Bandra-Kurla Complex (BKC), Belapur, and Karjat. Key partner institutes include Universal Business School, Atharva Institute of Management, ITM Navi Mumbai, Kohinoor Business School, Chetana, and SIES.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Avg Form Fee: ₹1,200 ➔ <strong>Pay ₹500</strong></span>
                <span className="text-[#F59E0B] font-bold">50% - 60% OFF</span>
              </div>
            </div>

          </div>
        </section>

        {/* ── 5. RULE 3: HIGH-DENSITY FACT EXTRACTION COMPARISON TABLE (ENTITY TRIPLES) ── */}
        <section className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-[#061124] border border-white/15 rounded-[32px] p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pan-India 55 Colleges Complete Master Fact Matrix</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
                Complete MBA &amp; PGDM Application Fee Concessions Matrix (2027–2029)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Verified official fee rates, discounted concession rates, real average placement packages, and accepted entrance exams.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
              <table className="w-full text-left text-xs text-slate-300 min-w-[750px]">
                <thead className="bg-white/5 font-mono text-slate-400 uppercase text-[11px] border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-4">College Name</th>
                    <th className="py-3.5 px-3">Campus City</th>
                    <th className="py-3.5 px-3">Official Fee</th>
                    <th className="py-3.5 px-3">Discounted Fee</th>
                    <th className="py-3.5 px-3">Savings</th>
                    <th className="py-3.5 px-3">Avg CTC</th>
                    <th className="py-3.5 px-4 text-right">Accreditation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {MBA_FORM_COLLEGES.map((c) => (
                    <tr key={c.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3 px-4 font-bold text-white font-display">
                        <Link href={`#colleges-catalogue`} className="hover:text-[#00FF88] transition-colors">
                          {c.name}
                        </Link>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{c.city}</td>
                      <td className="py-3 px-3 line-through text-slate-400">₹{c.officialFee}</td>
                      <td className="py-3 px-3 text-white font-bold">
                        {c.discountNote ? <span className="text-[#00FF88]">Profile-Based</span> : `₹${c.discountedFee}`}
                      </td>
                      <td className="py-3 px-3 text-[#00FF88] font-bold">
                        {c.discountNote || `${c.discountPercent}% OFF (Save ₹${c.savings})`}
                      </td>
                      <td className="py-3 px-3 font-semibold text-emerald-400">{c.avgPlacement}</td>
                      <td className="py-3 px-4 text-right text-[11px] text-slate-400 truncate max-w-[180px]">
                        {c.accreditation.split('·')[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 6. COMPREHENSIVE 10-QUESTION FAQ SECTION ── */}
        <section className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-slate-200 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
              Frequently Asked Questions
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white">
              Got Questions About MBA Form Discounts?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Clear, transparent answers regarding voucher validity, payment processes, and mentorship perks.
            </p>
          </div>

          <div className="space-y-3.5 max-w-4xl mx-auto">
            {FAQ_ITEMS.map((item, idx) => (
              <details
                key={idx}
                className="group bg-[#061124] rounded-2xl border border-white/10 shadow-lg hover:border-emerald-400/40 transition-all overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4.5 cursor-pointer list-none font-bold text-white text-sm sm:text-base font-display">
                  <span>{item.q}</span>
                  <ChevronDown size={18} className="text-[#00FF88] shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/10 pt-3.5 font-normal">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── 7. E-E-A-T AUTHOR CARD: MOHIT JAIN ── */}
        <section className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8 mt-16">
          <div className="rounded-3xl bg-[#061124] border border-white/15 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00FF88] to-[#00F0FF] p-1 shrink-0">
              <div className="w-full h-full rounded-full bg-[#070A14] flex items-center justify-center font-display font-black text-2xl text-[#00FF88]">
                MJ
              </div>
            </div>

            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] font-mono text-[11px] font-bold">
                <BadgeCheck className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>Verified Admissions Mentor &amp; Consultant</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white">
                Curated by Mohit Jain
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                Senior Higher Education and MBA Admission Mentor with 10+ years of institutional advisory experience. Having guided over <strong>12,000+ candidates</strong> into premier AICTE/AIU approved institutions across Delhi NCR, Pune, Bangalore, and Mumbai, Mohit Jain negotiates direct fee waivers with institutional admissions directorates to empower aspirants with authentic, low-cost application pathways.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5 w-full sm:w-auto">
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20to%20evaluate%20my%20profile%20for%20MBA%20applications"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-display font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-black text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/book-session"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs rounded-xl border border-white/15 flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <span>Book 1-on-1 Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 8. COUNSELLING CTA STRIP ── */}
        <section className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8 mt-16">
          <div className="relative rounded-[28px] sm:rounded-[40px] bg-[#061124] text-white p-8 md:p-12 overflow-hidden shadow-[0_34px_70px_-30px_rgba(6,17,36,0.6)] border border-white/15 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Glowing Halos */}
            <div className="absolute top-[-140px] right-[-100px] w-96 h-96 rounded-full bg-[#0EA5E9]/25 blur-[90px] pointer-events-none" />
            <div className="absolute bottom-[-140px] left-[-80px] w-80 h-80 rounded-full bg-[#F59E0B]/20 blur-[90px] pointer-events-none" />

            <div className="space-y-3 text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#F59E0B] font-mono text-xs font-bold">
                <GraduationCap className="w-4 h-4 text-[#F59E0B]" />
                <span>Personalized Profile Strategy</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                Unsure Which College Fits Your Percentile &amp; Budget?
              </h2>
              <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed">
                Connect with <strong>Mohit Jain</strong> (IIM Bangalore &amp; FMS Certified Mentor) for a 1-on-1 shortlist strategy to map your Dream, Target, and Safe backup business schools.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto relative z-10">
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20guidance%20on%20MBA%20application%20forms%20and%20colleges"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-full bg-[#10B981] hover:bg-[#059669] active:scale-95 text-white px-7 py-3.5 font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Mentor Desk</span>
              </a>
              <Link
                href="/book-session"
                className="w-full sm:w-auto rounded-full bg-[#F59E0B] hover:bg-[#d97706] active:scale-95 text-[#061124] px-7 py-3.5 font-display font-extrabold text-sm sm:text-base transition-all shadow-lg shadow-amber-950/20 flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <span>Book Free 1-on-1 Call</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
