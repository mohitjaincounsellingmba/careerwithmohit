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
  Flame
} from 'lucide-react';
import MbaFormDiscountCalculator from '@/components/MbaFormDiscountCalculator';
import { MBA_FORM_COLLEGES, CURATED_COMBOS } from '@/data/mbaFormDiscountsData';

const BASE_URL = 'https://careerwithmohit.online';
const PAGE_PATH = '/mba-application-form-discount';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'MBA & PGDM Form Combo Discounts 2027: Save ₹5,000+ | CareerWithMohit',
  description:
    'Create custom application form combos from 55+ top AICTE MBA/PGDM colleges (NDIM, FOSTIIMA, FIIB, JIMS, Jaipuria, PIBM, SOIL) with exclusive discounts & GD-PI prep.',
  keywords: [
    'MBA application form discount 2027',
    'PGDM form combo discount',
    'NDIM application form discount',
    'FOSTIIMA form discount',
    'FIIB Delhi application form waiver',
    'cheap MBA application forms',
    'MBA college application fee waiver 2027',
    'top PGDM colleges form combo offer',
    'discount on MBA forms CareerWithMohit',
    'MBA form bundle offer',
    'Delhi NCR MBA form discount',
    'Pune MBA form discount combo'
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'MBA & PGDM Form Combo Discounts 2027: Save up to ₹5,000+ on Application Forms',
    description:
      'Build your personalized 2 to 5-college form combo across 55+ top business schools. Instant savings, official voucher codes, and complementary GD-PI coaching.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: 'MBA Application Form Combo Discounts 2027',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBA & PGDM Form Combo Discounts 2027: Save ₹5,000+ | CareerWithMohit',
    description:
      'Create college combinations & get application form discounts for 55+ AICTE approved colleges including NDIM, FOSTIIMA, FIIB, JIMS, PIBM, SOIL.',
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
      name: 'MBA & PGDM Application Form Combo Discounts 2027 | CareerWithMohit',
      description:
        'Compare application form fees and create custom college form bundles across 55+ AICTE approved business schools in Delhi NCR, Pune, Mumbai, and Bangalore.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'MBA / PGDM Admission 2027', item: `${BASE_URL}/mba-pgdm-admission-2027` },
          { '@type': 'ListItem', position: 3, name: 'MBA Form Combo Discounts', item: PAGE_URL },
        ],
      },
    },
    {
      '@type': 'OfferCatalog',
      name: 'MBA & PGDM Application Form Combo Discounts 2027',
      description: 'Exclusive application form concessions and combo fee waivers for 55+ top management institutes.',
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
          name: 'Are these application forms authentic and official?',
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
            text: 'Once you submit your selected combination, our team generates a customized institutional voucher link or waiver code. When you apply on the college’s official registration page, the fee is automatically reduced to the discounted rate shown here.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I add colleges from different cities in one combo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can mix colleges across Delhi NCR, Pune, Mumbai, and Bangalore in a single bundle (e.g., NDIM Delhi + PIBM Pune + JAGSoM Bangalore).'
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

      <main className="min-h-screen bg-[#050C18] text-slate-100 selection:bg-blue-600 selection:text-white pb-24">
        
        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-blue-900/30">
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-blue-600/15 blur-[140px] pointer-events-none rounded-full" />
          <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-indigo-600/15 blur-[130px] pointer-events-none rounded-full" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/mba-pgdm-admission-2027" className="hover:text-white transition-colors">MBA &amp; PGDM 2027</Link>
              <span>/</span>
              <span className="text-blue-400 font-semibold">Application Form Combo Discounts</span>
            </nav>

            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold mb-5 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Official Institutional Concession Hub · MBA &amp; PGDM 2027-2029</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-5xl">
              Create Your College Form Combo &amp; <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Save up to ₹5,000+</span> on Application Fees
            </h1>

            {/* Sub-text */}
            <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
              Pick your target business schools from <strong>55+ AICTE &amp; AIU approved colleges</strong> across Delhi NCR, Pune, Mumbai, and Bangalore. Get instant combo vouchers, official application fee waivers, and complementary GD-PI Masterclasses with <strong>Mohit Jain</strong>.
            </p>

            {/* Real Example Callout Card */}
            <div className="mt-8 bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-indigo-950/80 border border-blue-500/30 rounded-2xl p-4 sm:p-6 backdrop-blur-xl max-w-4xl shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    Real Example: Popular 3-College Bundle
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    NDIM (<span className="text-slate-400 line-through">₹1,000</span> → <span className="text-emerald-400">₹1,000</span>) + FOSTIIMA (<span className="text-slate-400 line-through">₹1,200</span> → <span className="text-emerald-400">₹600</span>) + FIIB (<span className="text-slate-400 line-through">₹1,500</span> → <span className="text-emerald-400">₹500</span>)
                  </div>
                  <div className="text-xs text-slate-300">
                    Official Total: <span className="line-through text-slate-400 font-semibold">₹3,700</span> • Mohit Jain Combo Price: <strong className="text-emerald-400 text-sm">₹2,100</strong>
                  </div>
                </div>

                <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl px-4 py-2.5 text-center shrink-0">
                  <div className="text-xs uppercase tracking-wider text-emerald-300 font-bold">You Save Instantly</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">₹1,600 (43% OFF)</div>
                </div>
              </div>
            </div>

            {/* Trust Proof Stats Counter */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-white">55+</div>
                <div className="text-xs text-slate-400 mt-0.5">Verified AICTE Colleges</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">Up to 67%</div>
                <div className="text-xs text-slate-400 mt-0.5">Max Form Fee Discount</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">₹38+ Lakhs</div>
                <div className="text-xs text-slate-400 mt-0.5">Saved by Aspirants</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-blue-400">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Official Direct Links</div>
              </div>
            </div>

          </div>
        </section>

        {/* ── INTERACTIVE CALCULATOR & BUILDER ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
          <MbaFormDiscountCalculator />
        </section>

        {/* ── COUNSELLING CTA STRIP ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#0A1E3D] rounded-3xl p-8 md:p-12 border border-blue-400/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Personalized B-School Profile Review</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Unsure Which College Combination Fits Your Percentile?
              </h2>
              <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
                Connect with <strong>Mohit Jain</strong> (IIM Bangalore &amp; FMS Certified Mentor) for a 1-on-1 shortlist strategy to map your Dream, Target, and Safe backup business schools.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20help%20choosing%20my%20MBA%20application%20form%20combo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white px-7 py-3.5 font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Mentor Desk</span>
              </a>
              <Link
                href="/book-session"
                className="w-full sm:w-auto rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 px-7 py-3.5 font-bold text-sm sm:text-base transition-all shadow-lg shadow-amber-950/20 flex items-center justify-center gap-2 text-center"
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
