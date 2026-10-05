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
  title: 'MBA/PGDM DIRECT ADMISSION COLLEGES (2027–2029): Top 67+ B-Schools, Fees & Cutoffs | CareerWithMohit',
  description:
    'Compare 67+ most targeted MBA and PGDM direct admission colleges across Delhi NCR, Pune, Bangalore, Mumbai, Dehradun, and Jaipur / Rajasthan for batch 2027–2029. Verified fee structures, placement CTC, and free 1-on-1 counseling.',
  keywords: [
    'MBA PGDM direct admission colleges',
    'direct MBA admission 2027',
    'PGDM direct admission 2027 India',
    'management quota MBA admission',
    'top PGDM colleges in Delhi NCR 2027',
    'MBA admission Pune 2027',
    'MBA admission Bangalore 2027',
    'MBA admission Mumbai 2027',
    'MBA admission Dehradun 2027',
    'MBA admission Jaipur 2027',
    'Jaipuria Jaipur MBA direct admission',
    'Poornima GCEC MBA admission',
    'VGU Jaipur MBA fees',
    'IILM Jaipur MBA admission',
    'Apex University Jaipur MBA',
    'Poddar Business School Jaipur MBA',
    'NIMS Jaipur MBA admission',
    'JECRC Jaipur MBA placement',
    'UPES Dehradun MBA admission',
    'Doon Business School direct admission',
    'Graphic Era MBA admission 2027',
    'best PGDM colleges without CAT',
    'AICTE approved PGDM MBA colleges India',
    'direct admission in MBA colleges 2027-2029'
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'MBA/PGDM DIRECT ADMISSION COLLEGES (2027–2029): Top 67+ B-Schools List',
    description:
      'Compare premier PGDM/MBA institutes across Delhi NCR, Pune, Mumbai, Bangalore, Dehradun, and Jaipur. Get authentic fee breakdowns, accreditation details, and direct admission guidance.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBA/PGDM DIRECT ADMISSION COLLEGES (2027–2029)',
    description:
      'Compare AICTE & AIU approved PGDM/MBA colleges across major business hubs including Delhi NCR, Pune, Bangalore, Mumbai, Dehradun & Jaipur. Free counselling by Mohit Jain.',
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
        'Compare top 67+ targeted AICTE & AIU approved PGDM & MBA colleges in Delhi NCR, Pune, Mumbai, Bangalore, Dehradun, and Jaipur / Rajasthan for direct admission 2027–2029 batch.',
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
      description: 'List of top 67+ targeted AICTE & UGC approved PGDM and MBA institutes across India.',
      url: PAGE_URL,
      numberOfItems: MBA_PGDM_COLLEGES_2027.length,
      itemListElement: MBA_PGDM_COLLEGES_2027.map((c, index) => {
        const itemUrl = c.slug ? `${BASE_URL}/${c.slug}` : `${BASE_URL}/blog/${c.universitySlug}-mba-pgdm-review-2027-fees-placements-cutoff`;
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
            text: 'Yes, all listed business schools in Delhi NCR, Gurgaon, Pune, Mumbai, Bangalore, Dehradun, and Jaipur are officially approved by AICTE or UGC.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the average fee structure for PGDM and MBA in India for 2027?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fees range from ₹2.20 Lakhs up to ₹17.50 Lakhs for the full 2-year program with semester installment facilities and educational loan assistance.',
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
    q: 'Are all 67+ listed B-Schools approved by AICTE or UGC?',
    a: 'Yes, 100% of the institutions listed on this portal across Delhi NCR, Gurgaon, Pune, Mumbai, Bangalore, Dehradun, and Jaipur / Rajasthan are approved by AICTE (All India Council for Technical Education) or UGC (University Grants Commission), Government of India.',
  },
  {
    q: 'What is the average PGDM and MBA fee structure across major cities for 2027?',
    a: 'Fees vary by region and ranking. Budget-friendly options in Jaipur, Roorkee & Greater Noida start at around ₹2.20L - ₹5.50L (like Apex University Jaipur, NIMS Jaipur, JECRC, Poornima GCEC, VGU Jaipur, Quantum Roorkee, RIT Roorkee, Lloyd Business School, Akemi Pune), mid-range institutes range from ₹6.50L to ₹11.00L (like Graphic Era Dehradun, DBS Dehradun, NDIM, FIIB), and premier business schools (like Jaipuria Jaipur, UPES Dehradun, JAGSoM Bangalore, Alliance University) range from ₹11.00L to ₹17.50L for the full 2-year program.',
  },
  {
    q: 'Can I apply for multiple colleges through application fee discount bundles?',
    a: 'Yes! CareerWithMohit provides institutional application form discount packs where you can bundle forms for colleges like Jaipuria Jaipur, Poornima GCEC, VGU, NDIM, FOSTIIMA, FIIB, JIMS, PIBM, SOIL, DBS Dehradun, UPES, etc., saving up to ₹5,000+ in form application fees along with free GD-PI grooming sessions.',
  },
  {
    q: 'Which location is best for pursuing PGDM / MBA: Delhi NCR, Pune, Bangalore, Mumbai, Dehradun, or Jaipur?',
    a: 'All locations provide unique strategic advantages. Bangalore is the IT & Startup capital, Delhi NCR houses corporate headquarters and Fortune 500 MNC offices, Mumbai is India’s financial capital (BFSI & Media), Pune offers a booming automotive and technology ecosystem, Dehradun offers scenic energy and digital business hubs (UPES, Graphic Era, DBS), and Jaipur is a booming entrepreneurship, finance, and industrial corridor (Jaipuria, Poornima GCEC, VGU, JECRC).',
  },
];

export default function MbaPgdmAdmission2027Page() {
  return (
    <div className="w-full bg-[#F8FAFC] text-[#061124] selection:bg-[#F59E0B] selection:text-[#061124]">
      
      {/* ── HIGH-CONVERTING HERO (HOME PAGE THEME) ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F3FF]/70 via-[#F8FAFC] to-[#F1F5F9]/90 text-[#0F1026] pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-slate-200/80">
        {/* Soft Ambient Pastel Glows */}
        <span className="blob b1 !opacity-[0.14]" />
        <span className="blob b2 !opacity-[0.12]" />
        <span className="blob b3 !opacity-[0.10]" />

        {/* Subtle Grid Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb & Trust Eyebrow Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link href="/" className="hover:text-[#6336EA] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#6336EA] font-bold">MBA/PGDM Direct Admission Colleges</span>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-ping" />
              <span>Admissions 2027–2029 • Direct &amp; Management Quota</span>
            </div>
          </div>

          {/* Main Title & Lede */}
          <div className="max-w-4xl">
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[56px] font-black text-[#0F1026] tracking-tight leading-[1.12] mb-4">
              MBA/PGDM DIRECT ADMISSION COLLEGES{' '}
              <span className="bg-gradient-to-r from-[#6336EA] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                (2027–2029)
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal mb-7 max-w-3xl">
              Explore <strong>67+ targeted MBA &amp; PGDM business schools</strong> across Delhi NCR, Pune, Bangalore, Mumbai, Dehradun &amp; Jaipur. Inspect authentic 2-year fee structures, placement CTC benchmarks, AICTE/NBA accreditations, and get direct admission guidance with Mohit Jain.
            </p>
          </div>

          {/* Quick Stats Ribbon (Glass Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mb-7">
            {[
              { num: `${MBA_PGDM_COLLEGES_2027.length}+`, label: 'Targeted Campuses', sub: 'Delhi, Pune, Blr, Jaipur, Dehradun', color: 'text-[#6336EA]' },
              { num: '₹2.20L', label: 'Starting Total Fee', sub: 'Installment plans available', color: 'text-emerald-600' },
              { num: '₹48 LPA', label: 'Highest Package', sub: 'Verified placement CTC stats', color: 'text-amber-600' },
              { num: '100%', label: 'AICTE / UGC Approved', sub: 'AIU MBA Equivalence', color: 'text-blue-600' },
            ].map((s) => (
              <div key={s.label} className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-purple-300 transition-all">
                <p className={`font-display text-2xl sm:text-3xl font-black ${s.color} tracking-tight`}>{s.num}</p>
                <p className="text-[#0F1026] text-[11px] font-mono font-bold uppercase tracking-wider mt-1">{s.label}</p>
                <p className="text-slate-500 text-[11px] font-normal leading-tight mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Fast CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20counselling%20for%20MBA%2FPGDM%20Direct%20Admission%202027"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-display font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <MessageCircle size={16} />
              <span>Get Free WhatsApp Counselling</span>
            </a>

            <Link
              href="/book-session/"
              className="px-5 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0F1026] font-display font-bold text-xs sm:text-sm border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Video size={15} className="text-[#6336EA]" />
              <span>Book Google Meet Call</span>
            </Link>

            <Link
              href="/mba-application-form-discount/"
              className="px-5 py-3.5 rounded-full bg-[#FFD000] hover:bg-[#FFE033] text-[#0F1026] font-display font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Sparkles size={14} className="text-[#0F1026]" />
              <span>Save ₹5k+ on Form Packs</span>
            </Link>

            <a
              href="tel:+919560020771"
              className="hidden lg:inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-950 ml-auto bg-white/80 px-4 py-3 rounded-full border border-slate-200/80 shadow-xs"
            >
              <Phone size={14} className="text-[#6336EA]" />
              <span>Helpline: +91 95600 20771</span>
            </a>
          </div>

        </div>
      </section>

      {/* ── IMMEDIATE COLLEGES EXPLORER PORTAL (TOP OF PAGE) ── */}
      <MbaPgdmClient />

      {/* ── FORM COMBO DISCOUNT PROMO BANNER (COLLEGE4SURE THEME) ── */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[28px] sm:rounded-[40px] bg-gradient-to-br from-[#1E1B4B] via-[#4338CA] to-[#6336EA] text-white p-7 sm:p-12 overflow-hidden shadow-[0_25px_60px_-15px_rgba(79,70,229,0.3)] border border-purple-400/20">
            {/* Glowing Halos */}
            <div className="absolute top-[-140px] right-[-100px] w-96 h-96 rounded-full bg-cyan-400/20 blur-[90px] pointer-events-none" />
            <div className="absolute bottom-[-140px] left-[-80px] w-80 h-80 rounded-full bg-amber-400/20 blur-[90px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center lg:text-left">
                <span className="font-mono text-xs uppercase tracking-[0.15em] font-bold text-[#FFD000] inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFD000]" />
                  Save ₹5,000+ on Application Form Fees
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                  Create Your College Application Form <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD000] via-[#34D399] to-[#38BDF8]">
                    Combo Discount Pack
                  </span>
                </h3>
                <p className="text-purple-100/90 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
                  Applying to multiple colleges? Bundle application forms for <strong>Jaipuria, UPES, NDIM, FOSTIIMA, FIIB, JIMS, PIBM, SOIL, ISBR</strong> &amp; 55+ business schools with exclusive institutional fee waivers &amp; free GD-PI Masterclasses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Link
                  href="/mba-application-form-discount/"
                  className="px-7 py-4 rounded-full bg-[#FFD000] hover:bg-[#FFE033] text-[#0F1026] font-display font-extrabold text-sm sm:text-base transition-all shadow-md flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <span>Open Form Discount Builder</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/book-session/"
                  className="px-5 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm sm:text-base transition-all backdrop-blur-sm"
                >
                  Free Advisory Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REGIONAL MBA & PGDM HUBS DIRECTORY (DEEP INDIGO NIGHT THEME) ── */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] text-white border-b border-purple-900/30 relative overflow-hidden">
        {/* Ambient Ring */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-[#FFD000] font-mono text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 backdrop-blur-md">
              <MapPin size={14} className="text-[#FFD000]" />
              Regional Management Hubs • 2027–2029
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Explore MBA &amp; PGDM Admissions by Region
            </h2>
            <p className="text-purple-100/80 text-sm sm:text-base font-normal leading-relaxed">
              Access location-wise college rankings, average CTC packages, tuition fees, and accepted entrance exams across India&apos;s leading business capitals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.values(GEO_MBA_HUBS).map((hub) => (
              <Link
                key={hub.hubKey}
                href={hub.route}
                className="group relative rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-purple-400/50 hover:bg-white/[0.10] p-5.5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#FFD000] bg-[#FFD000]/15 px-2.5 py-1 rounded-md border border-[#FFD000]/30">
                      {hub.stats.totalColleges}
                    </span>
                    <span className="text-[11px] text-purple-200/70 font-semibold">{hub.stateName.split('/')[0]}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#FFD000] transition-colors">
                    {hub.cityName}
                  </h3>
                  <p className="text-xs text-purple-200/80 mt-1 line-clamp-2 leading-relaxed font-normal">
                    {hub.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-purple-300/70 text-[10px] block">Avg Package</span>
                      <div className="font-bold text-emerald-300">{hub.stats.avgPlacement.split(' - ')[0]}</div>
                    </div>
                    <div>
                      <span className="text-purple-300/70 text-[10px] block">Fee Range</span>
                      <div className="font-bold text-purple-100">{hub.stats.feeRange.split(' - ')[0]}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#FFD000] group-hover:text-amber-200">
                  <span>View {hub.cityName} Colleges</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/mba-pgdm-admissions-by-region/"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#6336EA] via-[#8B5CF6] to-[#EC4899] text-white font-display font-extrabold text-sm sm:text-base shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all"
            >
              <Compass size={18} />
              <span>Explore Dedicated Regional Directory (All 8 Hubs) →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CAT PREVIOUS YEAR PAPERS & MOCK TEST DASHBOARD ── */}
      <section className="bg-white py-16 sm:py-24 border-b border-slate-200/80" id="cat-papers-dashboard">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-[#f26b23] font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
              <BadgeCheck size={14} className="text-[#f26b23]" />
              CAT &amp; MBA Exam Prep Portal • 2000–2025 Papers
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#061124] tracking-tight mb-4">
              CAT Previous Year Papers &amp; Mock Test Dashboard
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              Practice 25+ years of authentic CAT question papers with detailed solutions, slot-wise CBT mock simulations, and topic-wise practice sets.
            </p>
          </div>
          <CatExamPapersDashboard />
        </div>
      </section>

      {/* ── STATIC COMPARISON TABLE (HOME PAGE DESIGN SYSTEM) ── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-24 border-b border-slate-200/80">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#6336EA] font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <span>📊 Fee &amp; Cutoff Matrix</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#061124] tracking-tight mb-4">
              Pan India B-School Quick Comparison Matrix
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              A quick reference list of 2-year total fees, campus locations, and government approval badges across Delhi NCR, Pune, Bangalore, Mumbai, Dehradun &amp; Jaipur.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 bg-white">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#4338CA] text-white font-bold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4.5">B-School Name</th>
                  <th className="px-6 py-4.5">Campus Location</th>
                  <th className="px-6 py-4.5">Total 2-Yr Fee</th>
                  <th className="px-6 py-4.5 text-center">Accreditation</th>
                  <th className="px-6 py-4.5 text-center">Highlight Badge</th>
                  <th className="px-6 py-4.5 text-center">Official Brochure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
                {MBA_PGDM_COLLEGES_2027.slice(0, 20).map((c, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{c.name}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{c.location}</td>
                    <td className="px-6 py-4 font-black text-emerald-600">{c.fee}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-purple-50 text-[#6336EA] px-3 py-1 rounded-full text-xs font-bold border border-purple-100 inline-block">
                        {c.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200 inline-block">
                        {c.badge}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <a
                        href={`https://wa.me/919560020771?text=${encodeURIComponent(`Hi Mohit, please send me the official 2027 Brochure & Fee Structure for ${c.name} (Batch 2027-2029).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-xs transition-all hover:scale-105 active:scale-95"
                      >
                        <FileText size={13} className="text-slate-950" />
                        <span>Get Brochure</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── ADMISSION & ELIGIBILITY GUIDE ── */}
      <section className="bg-white py-16 sm:py-24 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#6336EA] font-mono text-xs font-bold uppercase tracking-wider mb-3">
              📋 Admission Roadmap
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[#061124] tracking-tight">
              Direct Admission Process &amp; Eligibility 2027
            </h2>
            <p className="text-slate-600 text-sm mt-2 font-normal">
              Step-by-step admission roadmap for the 2027–2029 batch.
            </p>
          </div>

          <div className="space-y-5">
            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/40 to-white border-l-4 border-[#6336EA] p-6 sm:p-7 rounded-2xl shadow-xs border border-purple-100">
              <h3 className="font-black text-[#0F1026] text-lg mb-2">1. Basic Academic Eligibility</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Candidates must hold a Bachelor&apos;s Degree in any discipline from a UGC-recognized university with a minimum of <strong className="text-slate-950 font-bold">50% aggregate marks</strong> (45% for reserved categories). Final year graduation students can also apply provisionally.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-bold text-[#6336EA] uppercase tracking-wider block mb-1">Step 2</span>
                <h4 className="font-black text-[#0F1026] text-base mb-2">Accepted Entrance Exams</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                  PGDM institutes accept CAT, XAT, MAT, CMAT, ATMA, and GMAT scores. Direct profile shortlisting is also available for candidates appearing in exams.
                </p>
              </div>
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-bold text-[#6336EA] uppercase tracking-wider block mb-1">Step 3</span>
                <h4 className="font-black text-[#0F1026] text-base mb-2">GD-PI Selection Process</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                  Shortlisted candidates are called for Group Discussion (GD), Written Ability Test (WAT), and Personal Interview (PI) rounds conducted on-campus or online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION (HOME PAGE ACCORDION STYLE) ── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-24 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#061124] tracking-tight mb-2">
              Everything You Need to Know About Direct Admissions 2027
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Common questions about direct MBA &amp; PGDM admissions, management quota, and form discounts.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-sm transition-all open:shadow-md open:border-purple-400/50 open:ring-2 open:ring-purple-500/10"
              >
                <summary className="font-display font-bold text-base sm:text-lg text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-open:rotate-180 group-open:bg-[#6336EA] group-open:text-white transition-all shrink-0">
                    <ChevronDown size={16} />
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed pt-3 border-t border-slate-100 font-normal">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL COSMIC CALL-TO-ACTION BANNER (HOME PAGE THEME) ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[32px] sm:rounded-[44px] p-8 sm:p-14 lg:p-16 text-center text-white overflow-hidden shadow-[0_25px_60px_-15px_rgba(99,102,241,0.35)] bg-gradient-to-br from-[#1E1B4B] via-[#4338CA] to-[#6336EA] border border-purple-400/20">
            {/* Dual Cosmic Rotating Dashed Rings */}
            <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full border-2 border-dashed border-white/20 animate-spinv-slow pointer-events-none" />
            <div className="absolute -bottom-28 -right-20 w-72 h-72 rounded-full border-2 border-dashed border-white/20 animate-spinv-reverse pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-mono text-xs font-extrabold uppercase tracking-wider mb-5 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD000]" />
                Free 1-on-1 Profile Assessment
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                Need Help Shortlisting Your<br />
                MBA / PGDM College?
              </h2>

              <p className="mt-4 text-base sm:text-lg text-purple-100/90 leading-relaxed font-normal">
                Talk it through with Mohit Jain (certified by IIM Bangalore &amp; FMS Delhi). Free 30-minute strategic profile review on Google Meet — real insights, verified fee reviews, and GD-PI guidance.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
                <Link
                  href="/book-session/"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#FFD000] hover:bg-[#FFE033] text-[#0F1026] font-display font-extrabold text-sm sm:text-base transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Video className="w-4 h-4 text-[#0F1026]" />
                  <span>Book 1-on-1 Google Meet</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20need%20guidance%20for%20my%20MBA%20college%20shortlisting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-display font-bold text-sm sm:text-base transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp Profile Review</span>
                </a>
              </div>
            </div>
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
