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
  Ticket
} from 'lucide-react';
import MbaFormDiscountCalculator from '@/components/MbaFormDiscountCalculator';
import { MBA_FORM_COLLEGES } from '@/data/mbaFormDiscountsData';

const BASE_URL = 'https://careerwithmohit.online';
const PAGE_PATH = '/mba-application-form-discount/';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'MBA Application Form Discount Codes 2027: 55+ Colleges | CareerWithMohit',
  description:
    'Get official application form fee discount coupon codes for 55+ top AICTE MBA/PGDM colleges (NDIM, FOSTIIMA, FIIB, JIMS, Jaipuria, PIBM, SOIL, JAGSoM) with instant waivers & GD-PI prep.',
  keywords: [
    'MBA application form discount coupon 2027',
    'PGDM form discount code',
    'NDIM application form coupon',
    'FOSTIIMA form promo code',
    'FIIB Delhi application form waiver',
    'cheap MBA application forms',
    'MBA college application fee waiver 2027',
    'discount on MBA forms CareerWithMohit',
    'Delhi NCR MBA form discount',
    'Pune MBA form discount code',
    'Bangalore MBA form concession'
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'MBA & PGDM Application Form Discount Codes 2027: 55+ B-Schools',
    description:
      'Unlock verified discount codes and save up to ₹1,500 on each application form across 55+ top business schools in Delhi NCR, Pune, Mumbai, and Bangalore.',
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
    title: 'MBA & PGDM Form Discount Codes 2027 | CareerWithMohit',
    description:
      'Get verified application fee discount coupon codes for 55+ AICTE approved business schools.',
    creator: '@careerwithmohit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

// ── JSON-LD Structured Data ──────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': PAGE_URL,
      url: PAGE_URL,
      name: 'MBA & PGDM Application Form Discount Codes 2027 | CareerWithMohit',
      description:
        'Official application form fee concessions and voucher codes for 55+ AICTE approved business schools in Delhi NCR, Pune, Mumbai, and Bangalore.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
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
      description: 'Exclusive application form concessions and voucher codes for 55+ top management institutes.',
      url: PAGE_URL,
      numberOfItems: MBA_FORM_COLLEGES.length,
      itemListElement: MBA_FORM_COLLEGES.map((c, index) => ({
        '@type': 'Offer',
        position: index + 1,
        name: `${c.name} Application Form Concession`,
        price: c.discountedFee,
        priceCurrency: 'INR',
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
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are these application form discount coupon codes official?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, 100%. All application forms and discount vouchers are issued in direct collaboration with the official admissions directorates of the respective institutions (NDIM, FOSTIIMA, FIIB, JIMS, PIBM, SOIL, etc.). You fill out the official college portal form directly.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I pay the discounted fee for the colleges?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When you click "Get Code" and fill the quick inquiry, our system reveals the customized institutional voucher code and direct link. When you apply on the college’s official registration page, the fee is automatically reduced to the discounted rate shown here.'
          }
        }
      ]
    }
  ]
};

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

        {/* ── HERO SECTION ── */}
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
                Save up to 100% on Application Fees
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-white/75 max-w-3xl leading-relaxed font-normal">
              Select your target college below and click <strong>&ldquo;Get Code&rdquo;</strong> to instantly unlock official discount coupon codes for <strong>55+ AICTE &amp; AIU approved business schools</strong> across Delhi NCR, Pune, Mumbai, and Bangalore.
            </p>

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

        {/* ── INTERACTIVE 55 COLLEGES DIRECTORY & GET CODE FLOW ── */}
        <section className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8 pt-10">
          <MbaFormDiscountCalculator />
        </section>

        {/* ── COUNSELLING CTA STRIP ── */}
        <section className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8 mt-12">
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
