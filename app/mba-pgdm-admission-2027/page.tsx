import { Metadata } from 'next';
import Link from 'next/link';
import {
  BadgeCheck, Phone, PhoneCall, MessageCircle, ChevronDown,
  CheckCircle2, MapPin, ArrowRight, Building, Sparkles, Compass,
  ShieldCheck, Award, GraduationCap, Video, FileText, Percent, Check
} from 'lucide-react';
import MbaPgdmClient from '@/components/MbaPgdmClient';
import CatExamPapersDashboard from '@/components/CatExamPapersDashboard';
import { MBA_PGDM_COLLEGES_2027 } from '@/data/mbaPgdmColleges2027';
import { GEO_MBA_HUBS } from '@/data/geoMbaHubs';

const BASE_URL = 'https://careerwithmohit.online';
const PAGE_PATH = '/mba-pgdm-admission-2027/';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'MBA/PGDM DIRECT ADMISSION COLLEGES (2027–2029): Top 55+ B-Schools, Fees & Cutoffs | CareerWithMohit',
  description:
    'Compare 55+ most targeted MBA and PGDM direct admission colleges across Delhi NCR, Pune, Bangalore, and Mumbai for batch 2027–2029. Verified fee structures, placement CTC, and free 1-on-1 counseling.',
  keywords: [
    'MBA PGDM direct admission colleges',
    'direct MBA admission 2027',
    'PGDM direct admission 2027 India',
    'management quota MBA admission',
    'top PGDM colleges in Delhi NCR 2027',
    'MBA admission Pune 2027',
    'MBA admission Bangalore 2027',
    'MBA admission Mumbai 2027',
    'best PGDM colleges without CAT',
    'AICTE approved PGDM MBA colleges India',
    'direct admission in MBA colleges 2027-2029'
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'MBA/PGDM DIRECT ADMISSION COLLEGES (2027–2029): Top 55+ B-Schools List',
    description:
      'Compare premier PGDM/MBA institutes across Delhi NCR, Pune, Mumbai, and Bangalore. Get authentic fee breakdowns, accreditation details, and direct admission guidance.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBA/PGDM DIRECT ADMISSION COLLEGES (2027–2029)',
    description:
      'Compare AICTE & AIU approved PGDM/MBA colleges across major business hubs. Free counselling by Mohit Jain.',
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
      name: 'MBA/PGDM DIRECT ADMISSION COLLEGES (2027–2029) | CareerWithMohit',
      description:
        'Compare top 55+ targeted AICTE & AIU approved PGDM & MBA colleges in Delhi NCR, Pune, Mumbai, and Bangalore for direct admission 2027–2029 batch.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'MBA/PGDM Direct Admission Colleges', item: PAGE_URL },
        ],
      },
    },
    {
      '@type': 'ItemList',
      name: 'Top MBA & PGDM Direct Admission Colleges 2027',
      description: 'List of top 55+ targeted AICTE approved PGDM and MBA institutes across India.',
      url: PAGE_URL,
      numberOfItems: MBA_PGDM_COLLEGES_2027.length,
      itemListElement: MBA_PGDM_COLLEGES_2027.map((c, index) => {
        const slugMap: Record<string, string> = {
          "ndim-delhi": "ndim-delhi",
          "fostiima-business-school": "fostiima-delhi",
          "fiib-delhi": "fiib-delhi",
          "iilm-lodhi-road": "iilm-delhi",
          "jims-kalkaji": "jims-kalkaji",
          "meri-janakpuri": "meri-delhi",
          "delhi-school-of-business": "dsb-delhi",
          "empi-chattarpur": "empi-delhi",
          "imm-qutab": "imm-delhi",
          "asm-apeejay-dwarka": "asm-apeejay-delhi",
          "jaipuria-school-of-business-ghaziabad": "jaipuria-school-of-business-ghaziabad",
          "its-ghaziabad-mohan-nagar": "its-ghaziabad",
          "jaipuria-noida": "jaipuria-noida",
          "hierank-noida": "hierank-noida",
          "amity-noida": "amity-noida",
          "gniot-greater-noida": "gniot-greater-noida",
          "gl-bajaj-greater-noida": "gl-bajaj-greater-noida",
          "accurate-greater-noida": "accurate-greater-noida",
          "niet-greater-noida": "niet-greater-noida",
          "ibi-greater-noida": "ibi-greater-noida",
          "lloyd-greater-noida": "lloyd-business-school-greater-noida",
          "iilm-greater-noida": "iilm-university-greater-noida",
          "bennett-greater-noida": "bennett-greater-noida",
          "mangalmay-greater-noida": "mangalmay-greater-noida",
          "sparsh-greater-noida": "sparsh-global-greater-noida",
          "jkbs-gurgaon": "jkbs-gurgaon",
          "ibmr-gurgaon": "ibmr-gurgaon",
          "isbm-gurgaon": "isbs-gurgaon",
          "bml-munjal-gurgaon": "bml-munjal-gurgaon",
          "soil-gurgaon": "soil-institute-gurgaon",
          "iilm-gurgaon": "iilm-gurgaon",
          "st-andrews-gurgaon": "st-andrews-gurgaon",
          "pibm-pune": "pibm-pune",
          "lexicon-mile-pune": "lexicon-management-institute-of-leadership-excellence",
          "riim-pune": "riim-pune",
          "asm-ibmr-pune": "asm-ibmr",
          "dy-patil-pune": "dy-patil-b-school",
          "iiebm-indus-pune": "iiebm-pune",
          "akemi-pune": "akemi-business-school",
          "isms-pune": "isms-pune",
          "atlas-skilltech-mumbai": "atlas-skilltech-mumbai",
          "ubs-mumbai-karjat": "universal-ai-mumbai",
          "itm-navi-mumbai": "itm-mumbai",
          "js-kothari-mumbai": "js-kothari-mumbai",
          "amity-mumbai": "amity-mumbai",
          "jagsom-mumbai-karjat": "jagsom-mumbai",
          "isbr-bangalore": "isbr-bangalore",
          "iibs-bangalore": "iibs-bangalore",
          "gibs-bangalore": "gibs-bangalore",
          "alliance-bangalore": "alliance-university-bangalore",
          "isme-bangalore": "isme-bangalore",
          "iba-bangalore": "indus-business-academy",
          "jagsom-bangalore": "jagsom-bangalore"
        };
        const pageSlug = slugMap[c.universitySlug];
        const itemUrl = pageSlug ? `${BASE_URL}/colleges/${pageSlug}` : PAGE_URL;
        return {
          '@type': 'ListItem',
          position: index + 1,
          name: c.name,
          url: itemUrl,
        };
      }),
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the difference between MBA and PGDM in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MBA is a degree course offered by UGC-recognized universities, while PGDM is a diploma course offered by autonomous AICTE approved institutes. PGDM programs accredited by AIU (Association of Indian Universities) are legally equivalent to MBA degrees and offer more updated, industry-ready curricula.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I get direct admission in MBA or PGDM colleges under management quota?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, most leading private B-schools have provisions for direct admission under Management Quota, sponsored seats, or merit profiles with min 50% graduation marks.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are all listed PGDM and MBA colleges approved by AICTE or UGC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, all 55 listed business schools in Delhi NCR, Gurgaon, Pune, Mumbai, and Bangalore are officially approved by AICTE or UGC.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the average fee structure for PGDM and MBA in India for 2027?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fees range from ₹2.90 Lakhs up to ₹17.50 Lakhs for the full 2-year program with semester installment facilities and educational loan assistance.',
          },
        },
      ],
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: 'How does Direct Admission in MBA & PGDM colleges work for 2027–2029 batch?',
    a: 'Direct admission allows eligible candidates (holding min 50% marks in graduation) to secure seats based on profile evaluation, academic track record, work experience, and personal interview (GD-PI) rounds, even if entrance exam scores (CAT/MAT/CMAT) are average or pending.',
  },
  {
    q: 'What is the difference between MBA and PGDM in India?',
    a: 'MBA is a university degree course awarded by UGC-recognized universities, whereas PGDM (Post Graduate Diploma in Management) is offered by autonomous institutes approved by AICTE. When a PGDM institute holds AIU (Association of Indian Universities) equivalence, the diploma is legally identical to an MBA degree, with the added benefit of a corporate-oriented, frequently updated syllabus.',
  },
  {
    q: 'Are all 55+ listed B-Schools approved by AICTE or UGC?',
    a: 'Yes, 100% of the institutions listed on this portal across Delhi NCR, Gurgaon, Pune, Mumbai, and Bangalore are approved by AICTE (All India Council for Technical Education) or UGC (University Grants Commission), Government of India.',
  },
  {
    q: 'What is the average PGDM and MBA fee structure across major cities for 2027?',
    a: 'Fees vary by region and ranking. For example, budget-friendly options start at around ₹2.90L - ₹5.50L (like Lloyd Business School, Akemi Pune, or GNIOT MBA), whereas mid-range institutes range from ₹6.50L to ₹11.00L, and premier business schools (like JAGSoM Bangalore or Alliance University) range from ₹11.00L to ₹17.50L for the full 2-year program.',
  },
  {
    q: 'Can I apply for multiple colleges through application fee discount bundles?',
    a: 'Yes! CareerWithMohit provides institutional application form discount packs where you can bundle forms for colleges like NDIM, FOSTIIMA, FIIB, JIMS, PIBM, SOIL, etc., saving up to ₹5,000+ in form application fees along with free GD-PI grooming sessions.',
  },
  {
    q: 'Which location is best for pursuing PGDM / MBA: Delhi NCR, Pune, Bangalore, or Mumbai?',
    a: 'All four locations are major economic engines. Bangalore is the IT & Startup capital, Delhi NCR (Gurgaon and Noida) houses corporate headquarters and Fortune 500 MNC offices, Mumbai is India’s financial capital (BFSI & Media), and Pune offers a booming automotive and technology ecosystem.',
  },
];

export default function MbaPgdmAdmission2027Page() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      
      {/* ── HIGH-CONVERTING COMPACT EDUCATION PORTAL HERO ── */}
      <section className="bg-gradient-to-b from-[#071324] via-[#0B1E38] to-[#0F294A] text-white pt-8 pb-10 sm:pt-12 sm:pb-14 relative overflow-hidden border-b border-blue-900/40">
        {/* Glow Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb & Trust Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-amber-300 font-bold">MBA/PGDM Direct Admission Colleges</span>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admissions 2027–2029 • Direct &amp; Management Quota Hub</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-3">
              MBA/PGDM DIRECT ADMISSION COLLEGES{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                (2027–2029)
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal mb-6 max-w-3xl">
              Explore <strong>55+ most targeted MBA &amp; PGDM business schools</strong> across Delhi NCR, Pune, Bangalore &amp; Mumbai. Inspect authentic 2-year fee structures, placement CTC benchmarks, AICTE/NBA accreditations, and get direct admission counseling.
            </p>
          </div>

          {/* Quick Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-4xl mb-6">
            {[
              { num: `${MBA_PGDM_COLLEGES_2027.length}+`, label: 'Targeted Campuses', sub: 'Delhi, Pune, Blr, Mumbai' },
              { num: '₹2.90L', label: 'Starting Total Fee', sub: 'Installment plans' },
              { num: '₹48 LPA', label: 'Highest Package', sub: 'Verified CTC stats' },
              { num: '100%', label: 'AICTE / UGC Approved', sub: 'AIU MBA Equivalence' },
            ].map((s) => (
              <div key={s.label} className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-4 hover:border-white/20 transition-all">
                <p className="text-xl sm:text-2xl font-black text-white tracking-tight">{s.num}</p>
                <p className="text-white/90 text-[11px] font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
                <p className="text-slate-400 text-[10px] font-normal">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Fast CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20counselling%20for%20MBA%2FPGDM%20Direct%20Admission%202027"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>Get Free WhatsApp Counselling</span>
            </a>

            <Link
              href="/book-session"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl border border-white/20 backdrop-blur-sm transition-all flex items-center gap-1.5"
            >
              <Video size={15} className="text-amber-300" />
              <span>Book Google Meet Call</span>
            </Link>

            <Link
              href="/mba-application-form-discount"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-slate-950" />
              <span>Save ₹5k+ on Form Packs</span>
            </Link>

            <a
              href="tel:+919560020771"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white ml-auto"
            >
              <Phone size={14} className="text-blue-400" />
              <span>Helpline: +91 95600 20771</span>
            </a>
          </div>

        </div>
      </section>

      {/* ── IMMEDIATE COLLEGES EXPLORER PORTAL (TOP OF PAGE) ── */}
      <MbaPgdmClient />

      {/* ── FORM COMBO DISCOUNT PROMO BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-gradient-to-r from-amber-500/15 via-blue-900/40 to-indigo-950/60 border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Save ₹5,000+ On Application Forms</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 md:text-white">
              Create Your College Application Form Combo Pack
            </h3>
            <p className="text-slate-700 md:text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-normal">
              Applying to multiple colleges? Bundle application forms for <strong>NDIM, FOSTIIMA, FIIB, JIMS, PIBM, SOIL, ISBR</strong> &amp; 50+ business schools with exclusive institutional fee waivers &amp; free GD-PI Masterclasses.
            </p>
          </div>
          <Link
            href="/mba-application-form-discount"
            className="shrink-0 px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-110 active:scale-95 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            <span>Open Form Discount Builder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── REGIONAL MBA & PGDM HUBS DIRECTORY ── */}
      <section className="bg-gradient-to-b from-[#071324] via-[#0B1E38] to-[#071324] py-16 sm:py-24 border-t border-slate-800 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
              <MapPin size={14} className="text-amber-400" />
              Regional Management Hubs • 2027–2029
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Explore MBA &amp; PGDM Admissions by Region
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
              Access location-wise college rankings, average CTC packages, tuition fees, and accepted entrance exams across India&apos;s leading business capitals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.values(GEO_MBA_HUBS).map((hub) => (
              <Link
                key={hub.hubKey}
                href={hub.route}
                className="group relative rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-amber-400/50 hover:bg-white/[0.08] p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                      {hub.stats.totalColleges}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">{hub.stateName.split('/')[0]}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {hub.cityName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed font-normal">
                    {hub.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px]">Avg Package</span>
                      <div className="font-bold text-emerald-400">{hub.stats.avgPlacement.split(' - ')[0]}</div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Fee Range</span>
                      <div className="font-bold text-slate-300">{hub.stats.feeRange.split(' - ')[0]}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                  <span>View {hub.cityName} Colleges</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/mba-pgdm-admissions-by-region"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Compass size={17} className="text-slate-950" />
              <span>Explore Dedicated Regional Directory (All 8 Hubs) →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CAT PREVIOUS YEAR PAPERS & MOCK TEST DASHBOARD ── */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200/80" id="cat-papers-dashboard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-[#f26b23] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
              <BadgeCheck size={14} className="text-[#f26b23]" />
              CAT &amp; MBA Exam Prep Portal • 2000–2025 Papers
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              CAT Previous Year Papers &amp; Mock Test Dashboard
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
              Practice 25+ years of authentic CAT question papers with detailed solutions, slot-wise CBT mock simulations, and topic-wise practice sets.
            </p>
          </div>
          <CatExamPapersDashboard />
        </div>
      </section>

      {/* ── STATIC COMPARISON TABLE ── */}
      <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
              📊 Fee &amp; Cutoff Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Pan India B-School Quick Comparison Matrix
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
              A quick reference list of 2-year total fees, campus locations, and government approval badges.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 bg-white">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#071324] via-[#0B1E38] to-[#0F294A] text-white font-bold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4.5">B-School Name</th>
                  <th className="px-6 py-4.5">Campus Location</th>
                  <th className="px-6 py-4.5">Total 2-Yr Fee</th>
                  <th className="px-6 py-4.5 text-center">Accreditation</th>
                  <th className="px-6 py-4.5 text-center">Highlight Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
                {MBA_PGDM_COLLEGES_2027.slice(0, 20).map((c, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{c.name}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{c.location}</td>
                    <td className="px-6 py-4 font-black text-emerald-600">{c.fee}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100 inline-block">
                        {c.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200 inline-block">
                        {c.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── ADMISSION & ELIGIBILITY GUIDE ── */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
              📋 Admission Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Direct Admission Process &amp; Eligibility 2027
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-normal">
              Step-by-step admission roadmap for the 2027–2029 batch.
            </p>
          </div>

          <div className="space-y-5">
            <div className="bg-slate-50/80 border-l-4 border-blue-600 p-6 sm:p-7 rounded-2xl shadow-xs border border-slate-200/80">
              <h3 className="font-black text-slate-900 text-lg mb-2">1. Basic Academic Eligibility</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Candidates must hold a Bachelor&apos;s Degree in any discipline from a UGC-recognized university with a minimum of <strong className="text-slate-900 font-bold">50% aggregate marks</strong> (45% for reserved categories). Final year graduation students can also apply provisionally.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Step 2</span>
                <h4 className="font-black text-slate-900 text-base mb-2">Accepted Entrance Exams</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
                  PGDM institutes accept CAT, XAT, MAT, CMAT, ATMA, and GMAT scores. Direct profile shortlisting is also available for candidates appearing in exams.
                </p>
              </div>
              <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Step 3</span>
                <h4 className="font-black text-slate-900 text-base mb-2">GD-PI Selection Process</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
                  Shortlisted candidates are called for Group Discussion (GD), Written Ability Test (WAT), and Personal Interview (PI) rounds conducted on-campus or online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
              ❓ FAQs
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm font-normal">
              Common questions about direct MBA &amp; PGDM admissions for 2027.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 transition-all overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4.5 cursor-pointer list-none font-bold text-slate-900 text-sm sm:text-base">
                  <span>{item.q}</span>
                  <ChevronDown size={18} className="text-blue-600 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 font-normal">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ── */}
      <section className="bg-gradient-to-b from-[#071324] via-[#0B1E38] to-[#040A14] py-16 sm:py-24 relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-amber-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            🚀 1-on-1 Profile Assessment
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Need Help Shortlisting Your MBA / PGDM College?
          </h2>
          <p className="text-slate-300 mb-8 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal">
            Book a free 1-on-1 career call with Mohit Jain. Get honest fee reviews, GD-PI call estimates, and direct admission guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20counselling%20for%20MBA%2FPGDM%20Direct%20Admission%202027"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp →</span>
            </a>
            <a
              href="tel:+919560020771"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl border border-white/20 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall size={18} />
              <span>Call +91 95600 20771</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
