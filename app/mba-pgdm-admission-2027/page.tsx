import { Metadata } from 'next';
import Link from 'next/link';
import { BadgeCheck, Phone, PhoneCall, MessageCircle, ChevronDown, CheckCircle2, MapPin, ArrowRight, Building, Sparkles, Compass } from 'lucide-react';
import MbaPgdmClient from '@/components/MbaPgdmClient';
import MbaPgdmLeadForm from '@/components/MbaPgdmLeadForm';
import CatExamPapersDashboard from '@/components/CatExamPapersDashboard';
import { MBA_PGDM_COLLEGES_2027 } from '@/data/mbaPgdmColleges2027';
import { GEO_MBA_HUBS } from '@/data/geoMbaHubs';

const BASE_URL = 'https://www.careerwithmohit.online';
const PAGE_PATH = '/mba-pgdm-admission-2027';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'MBA & PGDM Admission 2027: Top Colleges, Fees & Cutoffs | CareerWithMohit',
  description:
    'Compare top AICTE & AIU approved PGDM and MBA colleges in Delhi NCR, Pune, Mumbai, and Bangalore for 2027 admission. Get fee structures, cutoffs, and free counselling.',
  keywords: [
    'PGDM admission 2027 India',
    'MBA admission 2027 Pan India',
    'top PGDM colleges in India 2027',
    'MBA admission Delhi NCR 2027',
    'MBA admission Pune 2027',
    'MBA admission Bangalore 2027',
    'MBA admission Mumbai 2027',
    'best Pan India PGDM colleges',
    'AICTE approved PGDM MBA colleges India',
    'Pan India business schools ranking',
    'direct admission in MBA colleges India'
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'MBA & PGDM Admission 2027: Top Colleges & Fees | CareerWithMohit',
    description:
      'Compare premier PGDM/MBA institutes across Delhi NCR, Pune, Mumbai, and Bangalore. Get fee breakdowns, accreditation details, and 1-on-1 counseling with Mohit Jain.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBA & PGDM Admission 2027: Top Colleges List',
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
      name: 'MBA & PGDM Admission 2027 | Top Colleges, Fees & Cutoffs | CareerWithMohit',
      description:
        'Compare top AICTE & AIU approved PGDM & MBA colleges in Delhi NCR, Pune, Mumbai, and Bangalore. Find fees, accreditations, and get FREE expert counselling.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'MBA / PGDM Admission 2027', item: PAGE_URL },
        ],
      },
    },
    {
      '@type': 'ItemList',
      name: 'Top PGDM & MBA Colleges 2027',
      description: 'List of top AICTE approved PGDM and MBA institutes across India.',
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
          name: 'Are all listed PGDM and MBA colleges approved by AICTE or UGC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, all 55 listed business schools in Delhi NCR, Gurgaon, Pune, Mumbai, and Bangalore are officially approved by AICTE or UGC, ensuring they comply with standard regulatory guidelines.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the average fee structure for PGDM and MBA in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fees range from ₹2.90 Lakhs (e.g. Lloyd Business School / MERI Janakpuri / Akemi Pune) up to ₹17.50 Lakhs (e.g. JAGSoM Bangalore / Alliance University) for the full 2-year program depending on the institute\'s infrastructure and placements.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which entrance exams are accepted for PGDM & MBA Admission 2027?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most PGDM and MBA colleges accept national level entrance exams including CAT, XAT, MAT, CMAT, ATMA, or GMAT. Many institutes also conduct their own aptitude tests or accept state-level exams.',
          },
        },
      ],
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: 'What is the difference between MBA and PGDM in India?',
    a: 'MBA is a degree course awarded by UGC-recognized universities, whereas PGDM (Post Graduate Diploma in Management) is offered by autonomous institutes approved by AICTE. When a PGDM institute holds AIU (Association of Indian Universities) equivalence, the diploma is legally identical to an MBA degree, with the added benefit of a corporate-oriented, frequently updated syllabus.',
  },
  {
    q: 'Are all these listed PGDM and MBA colleges approved by AICTE or UGC?',
    a: 'Yes, all 55 institutions listed on this portal across Delhi NCR, Gurgaon, Pune, Mumbai, and Bangalore are approved by AICTE (All India Council for Technical Education) or UGC (University Grants Commission), Government of India.',
  },
  {
    q: 'What is the average PGDM and MBA fee structure across major cities for 2027?',
    a: 'Fees vary by region and ranking. For example, budget-friendly options start at around ₹2.90L - ₹5.00L (like Lloyd Business School, Akemi Pune, or GNIOT MBA), whereas premium business schools (like JAGSoM Bangalore, Alliance University, or Amity Noida) range from ₹11.00L to ₹17.50L for the full 2-year program.',
  },
  {
    q: 'Which entrance exams are required for PGDM and MBA 2027 admissions?',
    a: 'AICTE-approved B-schools accept national-level entrance scores like CAT, XAT, MAT, CMAT, and ATMA. Selection usually comprises entrance exam scores followed by Group Discussion & Personal Interview (GD-PI) rounds.',
  },
  {
    q: 'Can I get direct admission in MBA or PGDM colleges under management quota?',
    a: 'Yes, many private B-schools have provisions for direct admission under Management Quota, sponsored seats, or vacant seats. Candidates are evaluated based on their overall academic profile (Graduation & 12th marks), work experience, and basic interview performance.',
  },
  {
    q: 'Which location is best for pursuing PGDM / MBA: Delhi NCR, Pune, Bangalore, or Mumbai?',
    a: 'All four locations are major economic engines. Bangalore is the IT/Startup capital, Delhi NCR (especially Gurgaon and Noida) houses corporate headquarters and MNC offices, Mumbai/Navi Mumbai is the financial hub of India, and Pune offers a booming manufacturing and technology ecosystem. Choosing a location depends on your preferred sector and job goals.',
  },
];

export default function MbaPgdmAdmission2027Page() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0D233E] to-[#123058] text-white py-20 sm:py-28 md:py-32 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/90 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6 backdrop-blur-md shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Admissions 2027–2029 Hub • AICTE &amp; AIU Approved B-Schools
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Compare MBA &amp; PGDM{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
              Admission 2027
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal mb-10">
            Compare top AICTE-approved PGDM &amp; MBA business schools side-by-side. Inspect authentic 2-year fee structures, campus locations, NBA/AIU accreditations, and get personalized admission guidance.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20want%20counselling%20for%20MBA%2FPGDM%20Admission%202027"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
            >
              <PhoneCall size={18} />
              <span>Get Free Counselling on WhatsApp</span>
            </a>

            <a
              href="#colleges-directory"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-xl border border-white/20 backdrop-blur-sm transition-all"
            >
              Explore 55+ Colleges ↓
            </a>

            <Link
              href="/mba-pgdm-admissions-by-region"
              className="bg-white/5 hover:bg-white/15 text-amber-300 hover:text-amber-200 font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-xl border border-amber-400/30 backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <Compass size={17} />
              <span>Regional Hubs</span>
            </Link>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {[
              { num: `${MBA_PGDM_COLLEGES_2027.length}+`, label: 'B-Schools Listed', sub: 'Delhi, Pune, Blr, Mumbai' },
              { num: '₹2.90L', label: 'Starting Total Fee', sub: 'Budget to Tier 1' },
              { num: '100%', label: 'AICTE / UGC Approved', sub: 'Verified accreditations' },
              { num: '₹35 LPA', label: 'Highest Placement', sub: 'Top mentored CTC' },
            ].map((s) => (
              <div key={s.label} className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 text-center hover:border-white/20 transition-all">
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{s.num}</p>
                <p className="text-white/90 text-xs font-bold uppercase tracking-wider mt-1">{s.label}</p>
                <p className="text-slate-400 text-[11px] font-normal mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white py-3.5 px-4 text-center shadow-md relative z-20">
        <a
          href="tel:+919560020771"
          className="inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm hover:underline tracking-wide transition-all"
        >
          <Phone size={15} className="shrink-0" />
          <span>Connect directly with Mohit Jain for PGDM 2027 Counseling • Call +91 95600 20771</span>
        </a>
      </div>

      {/* ── LEAD CAPTURE FORM ── */}
      <section className="px-4 sm:px-6 py-8 relative z-10">
        <MbaPgdmLeadForm />
      </section>

      {/* ── WHY PURSUE PGDM IN 2027 ── */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
              ⭐ Capital Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Why Pursue PGDM &amp; MBA in 2027?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
              Top corporate hub campuses across Delhi NCR, Pune, Mumbai, and Bangalore offer PGDM &amp; MBA aspirants unmatched industry exposure, live internships, and high-paying placement drives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: '📜', title: 'AIU MBA Equivalence', desc: 'Top PGDM diplomas from NBA-accredited institutes are recognized by AIU as equivalent to an MBA degree, qualifying you for PhDs and PSU recruitment.' },
              { icon: '🏙️', title: 'Corporate Hub Access', desc: 'Direct access to Corporate HQ offices in Cyber City Gurgaon, Noida Expressway, BKC Mumbai, Hinjawadi Pune, and Electronic City Bangalore for live projects.' },
              { icon: '🚀', title: 'Dual Specialization', desc: 'Combine major/minor streams such as FinTech + Marketing or Business Analytics + HR to double your campus placement prospects.' },
              { icon: '💼', title: 'Top-Tier Recruiters', desc: 'Participate in placement drives visited by Deloitte, KPMG, EY, Amazon, ICICI Bank, Wipro, and Accenture on campus.' },
              { icon: '🏆', title: 'Accreditation Standards', desc: 'Evaluate institutions holding international and national accreditations like NBA, NAAC, UGC, and AACSB for high academic quality.' },
              { icon: '📊', title: 'High ROI & Installments', desc: 'Options starting at ₹2.90 Lakhs total fee with semester installment plans, educational bank loans, and merit scholarships.' },
            ].map((item) => (
              <div key={item.title} className="group bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GEO SEO: REGIONAL MBA & PGDM HUBS ── */}
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0D233E] to-[#0A192F] py-20 sm:py-28 border-t border-slate-800 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
              <MapPin size={14} className="text-amber-400" />
              Regional Education Hubs • 2027–2029
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Explore MBA &amp; PGDM Admissions by Region
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
              Access location-wise college rankings, average CTC packages, tuition fees, and accepted entrance exams across India&apos;s leading business capitals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(GEO_MBA_HUBS).map((hub) => (
              <Link
                key={hub.hubKey}
                href={hub.route}
                className="group relative rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-amber-400/50 hover:bg-white/[0.08] p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                      {hub.stats.totalColleges}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">{hub.stateName.split('/')[0]}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {hub.cityName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed font-normal">
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

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                  <span>View {hub.cityName} Colleges</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Direct CTA to the Dedicated Region Page */}
          <div className="mt-12 text-center">
            <Link
              href="/mba-pgdm-admissions-by-region"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Compass size={18} className="text-slate-950" />
              <span>Explore Dedicated Regional Directory &amp; Comparison Guide (All 8 Hubs) →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE CLIENT SECTION ── */}
      <div className="border-t border-slate-200/80">
        <MbaPgdmClient />
      </div>

      {/* ── CAT PREVIOUS YEAR PAPERS & MOCK TEST DASHBOARD ── */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200/80" id="cat-papers-dashboard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-[#f26b23] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
              <BadgeCheck size={14} className="text-[#f26b23]" />
              CAT Preparation Portal • 2000–2025 Authentic Papers
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              CAT Exam Previous Year Papers &amp; Mock Test Dashboard
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
              Practice 25+ years of authentic CAT question papers with detailed textual &amp; video solutions, slot-wise CBT mock simulations, and topic-wise QA, VARC &amp; LRDI practice sets.
            </p>
          </div>
          <CatExamPapersDashboard />
        </div>
      </section>

      {/* ── STATIC COMPARISON TABLE ── */}
      <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
              📊 Fee &amp; Cutoff Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Pan India B-School Comparison Matrix
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
              A comprehensive overview of 2-year total fees, campus locations, and government approval badges.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 bg-white">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#0A192F] via-[#0D233E] to-[#123058] text-white font-bold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4.5">B-School Name</th>
                  <th className="px-6 py-4.5">Campus Location</th>
                  <th className="px-6 py-4.5">Total 2-Yr Fee</th>
                  <th className="px-6 py-4.5 text-center">Accreditation</th>
                  <th className="px-6 py-4.5 text-center">Highlight Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
                {MBA_PGDM_COLLEGES_2027.map((c, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{c.name}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{c.location}</td>
                    <td className="px-6 py-4 font-extrabold text-emerald-600">{c.fee}</td>
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

      {/* ── ADMISSION & ELIGIBILITY GUIDE SECTION ── */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
              📋 Admission Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              PGDM Admission Process &amp; Eligibility 2027
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-normal">
              Step-by-step admission roadmap for the 2027–2029 batch.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50/70 border-l-4 border-blue-600 p-6 sm:p-7 rounded-2xl shadow-xs border border-slate-200/80">
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">1. Basic Academic Eligibility</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Candidates must hold a Bachelor&apos;s Degree in any discipline from a UGC-recognized university with a minimum of <strong className="text-slate-900 font-bold">50% aggregate marks</strong> (45% for reserved category students). Final year graduation students are also eligible to apply provisionally.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-slate-50/70 p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Step 2</span>
                <h4 className="font-extrabold text-slate-900 text-base mb-2">Accepted Entrance Exams</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
                  PGDM institutes accept scores from CAT, XAT, MAT, CMAT, ATMA, and GMAT exams. Higher percentiles qualify candidates for merit scholarships and fee waivers.
                </p>
              </div>
              <div className="bg-slate-50/70 p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Step 3</span>
                <h4 className="font-extrabold text-slate-900 text-base mb-2">GD-PI Selection Process</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
                  Shortlisted candidates are called for Group Discussion (GD), Extempore / Written Ability Test (WAT), and Personal Interview (PI) rounds conducted on-campus or online.
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm font-normal">
              Common questions about PGDM &amp; MBA admissions in India for 2027.
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
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0D233E] to-[#040A14] py-20 sm:py-28 relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-amber-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            🚀 1-on-1 Profile Assessment
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Need Help Shortlisting Your PGDM B-School?
          </h2>
          <p className="text-slate-300 mb-8 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal">
            Book a free 1-on-1 career call with Mohit Jain. Get honest fee reviews, GD-PI call estimates, and direct admission guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20want%20counselling%20for%20MBA%2FPGDM%20Admission%202027"
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
