import { Metadata } from 'next';
import Link from 'next/link';
import {
  Globe,
  Plane,
  Award,
  Building2,
  Star,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  FileText,
  DollarSign,
  ArrowRight,
  Phone,
  HelpCircle,
  Clock,
  Compass,
  GraduationCap,
  ChevronDown
} from 'lucide-react';
import AbroadEducationClient from '@/components/AbroadEducationClient';
import { ABROAD_COLLEGES } from '@/data/abroadColleges';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://www.careerwithmohit.online';
const PAGE_PATH = '/abroad-education';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Study Abroad 2027: Top Global Universities, Fees, Visas & Scholarships | CareerWithMohit',
  description:
    'Explore and compare 380+ accredited universities and global MBA programs across the UK, USA, Canada, Australia, Germany, Ireland, and Europe for 2027. Compare fees in INR, WES/AACSB recognition, post-study work permits, and get free admission guidance.',
  keywords: [
    'study abroad 2027',
    'study abroad consultants',
    'global MBA online 2027',
    'MBA in UK from India',
    'MBA in USA fees in INR',
    'study in Canada 2027',
    'study in Germany tuition free',
    'study in Ireland 2027',
    'study in Australia 2027',
    'WES approved degrees India',
    'AACSB accredited MBA abroad',
    'STEM OPT USA guide',
    'PGWP Canada work permit',
    'best abroad education consultant',
    'international admissions guidance Mohit Jain'
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Mohit Jain', url: BASE_URL }],
  publisher: 'CareerWithMohit',
  openGraph: {
    title: 'Top Global MBA & Study Abroad 2027 | Study in UK, USA, Canada, Australia',
    description:
      'Compare 380+ top international universities. Fees, accreditations (AACSB, WES), and global programs. Get free counselling by Mohit Jain.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-abroad-education.png`,
        width: 1200,
        height: 630,
        alt: 'Top Global MBA & Study Abroad 2027 - CareerWithMohit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Abroad Admissions 2027 | CareerWithMohit',
    description:
      'Compare 380+ global universities in UK, USA, Canada, Australia & Europe. Fees, WES/AACSB approvals. Free counselling by Mohit Jain.',
    images: [`${BASE_URL}/og-abroad-education.png`],
    creator: '@careerwithmohit',
  },
};

export default function AbroadEducationPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Abroad Education', item: PAGE_URL },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Top Global Universities and Study Abroad Programs 2027',
    description: 'Comprehensive directory of 380+ international universities across USA, UK, Canada, Australia, Germany, and Europe for 2027-2028 admissions.',
    url: PAGE_URL,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: ABROAD_COLLEGES.length,
      itemListElement: ABROAD_COLLEGES.slice(0, 30).map((college, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'EducationalOrganization',
          name: college.name,
          address: college.location,
          description: college.about,
          url: `${PAGE_URL}/${college.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        },
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are online global MBAs recognized by Indian and multinational employers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Global MBAs from accredited international universities (AACSB, AMBA, EQUIS, UK Privy Council, WES) are recognized by Fortune 500 multinationals and global consulting firms. Furthermore, degrees evaluated by WES provide standard Canadian Express Entry points and UK/US credential validity.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the average cost of studying abroad vs an online international degree?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'On-campus international programs typically range between ₹25 Lakhs to ₹60 Lakhs per year including tuition and living expenses. In contrast, online and hybrid global degrees from the same universities (e.g. LJMU, Golden Gate University) start from ₹3.5 Lakhs to ₹12 Lakhs total, offering up to 80% cost savings.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Indian students get English proficiency test waivers (IELTS/TOEFL)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many universities in the UK, USA, Germany, and Australia grant IELTS waivers if your undergraduate degree was conducted entirely in English (Medium of Instruction certificate) or based on 70%+ marks in Class 12 English.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do post-study work permits compare across top countries?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The USA offers up to 3 years of STEM OPT; the UK grants a 2-year Graduate Route visa; Canada provides up to 3-year PGWP; Germany gives an 18-month job seeker visa; and Ireland offers a 2-year Stamp 1G visa for master graduates.',
        },
      },
    ],
  };

  const countryComparisons = [
    {
      country: 'United States',
      flag: '🇺🇸',
      workVisa: 'Up to 3-Year STEM OPT',
      avgSalary: '$78,000 – $115,000',
      tuition: '₹18L – ₹45L / year',
      topPrograms: ['MS Computer Science', 'Global MBA', 'Business Analytics', 'FinTech'],
      highlights: 'Silicon Valley job market, Fortune 500 headquarters, massive research funding.',
    },
    {
      country: 'United Kingdom',
      flag: '🇬🇧',
      workVisa: '2-Year Graduate Route Visa',
      avgSalary: '£38,000 – £58,000',
      tuition: '₹14L – ₹32L / year',
      topPrograms: ['1-Year Fast-track MBA', 'Data Analytics', 'Finance & Investment', 'Management'],
      highlights: '1-Year master degrees save 50% living costs; direct proximity to London financial hub.',
    },
    {
      country: 'Canada',
      flag: '🇨🇦',
      workVisa: 'Up to 3-Year PGWP',
      avgSalary: 'CAD $65,000 – $92,000',
      tuition: '₹12L – ₹28L / year',
      topPrograms: ['PG Diploma', 'Global MBA', 'Software Engineering', 'Project Management'],
      highlights: 'Smooth Express Entry & Provincial Nominee (PNP) permanent residency pathways.',
    },
    {
      country: 'Germany',
      flag: '🇩🇪',
      workVisa: '18-Month Job Search Visa',
      avgSalary: '€52,000 – €74,000',
      tuition: '₹0 (Public) – ₹16L / year',
      topPrograms: ['Automotive & Mechanical', 'Data Engineering', 'Renewable Energy', 'International Management'],
      highlights: 'Zero or nominal tuition at world-renowned public universities; Europe\'s strongest industrial economy.',
    },
    {
      country: 'Ireland',
      flag: '🇮🇪',
      workVisa: '2-Year Stamp 1G Visa',
      avgSalary: '€45,000 – €68,000',
      tuition: '₹12L – ₹22L / year',
      topPrograms: ['Cloud Computing', 'Data Analytics', 'Biopharma', 'FinTech & Accounting'],
      highlights: 'European tech hub hosting Google, Meta, Apple, and Pfizer European headquarters.',
    },
    {
      country: 'Australia',
      flag: '🇦🇺',
      workVisa: '2 to 4-Year Subclass 485',
      avgSalary: 'AUD $72,000 – $98,000',
      tuition: '₹18L – ₹38L / year',
      topPrograms: ['MBA', 'Information Technology', 'Civil Engineering', 'Health Informatics'],
      highlights: 'World-class Group of Eight (Go8) universities, high student minimum wage, high quality of life.',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <JsonLd data={faqSchema} />

      {/* ── MODERN SLEEK MIDNIGHT NAVY HERO ── */}
      <header className="relative bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white pt-12 pb-24 px-6 overflow-hidden">
        {/* Subtle Ambient Radial Glows & Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8">
            <Breadcrumbs />
          </div>

          {/* Top Announcement Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-200">
              Global Education & Admissions Hub • 2027–2028 Intake
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Study Abroad Admissions 2027:
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                Top Global Universities & Visas
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-3xl">
              Compare 380+ accredited universities across the UK, USA, Canada, Australia, Germany, Ireland, and Europe. Evaluate tuition fees in INR, WES/AACSB recognition, post-study work visas (PGWP, STEM OPT), and unlock 1-on-1 admission counseling.
            </p>
          </div>

          {/* 4 Hero Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4 mb-10">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-amber-400/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">380+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Global Universities</div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">Public & Accredited Campuses</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-amber-400/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">18+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Study Destinations</div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">USA, UK, Canada, Germany, EU</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-amber-400/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">100%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">WES & AACSB Approved</div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">Verified Global Equivalency</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-amber-400/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">₹0</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Agency Commission</div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">100% Free Profile Guidance</div>
            </div>
          </div>

          {/* Quick Destination Jump Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
              Quick Filter:
            </span>
            {[
              { label: 'USA & STEM OPT', flag: '🇺🇸', id: 'USA' },
              { label: 'UK & Graduate Route', flag: '🇬🇧', id: 'UK' },
              { label: 'Canada & PGWP', flag: '🇨🇦', id: 'Canada' },
              { label: 'Germany (Tuition-Free)', flag: '🇩🇪', id: 'Germany' },
              { label: 'Ireland Tech Hub', flag: '🇮🇪', id: 'Ireland' },
              { label: 'Australia & NZ', flag: '🇦🇺', id: 'Australia' },
            ].map((pill) => (
              <a
                key={pill.id}
                href="#explore"
                className="bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/15 transition-colors flex items-center gap-1.5"
              >
                <span>{pill.flag}</span>
                <span>{pill.label}</span>
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ── INTERACTIVE CLIENT DISCOVERY HUB ── */}
      <AbroadEducationClient />

      {/* ── TOP 6 STUDY ABROAD DESTINATIONS RADAR (2027) ── */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/90">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="bg-amber-100 text-amber-800 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3 border border-amber-200">
              <Compass size={13} className="text-amber-700" /> Strategic Country Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              2027 Global Destination Comparison
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base mt-3">
              Compare average starting salaries, post-study work rights, typical tuition fees in Indian Rupees, and visa conversion rules for popular destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryComparisons.map((c) => (
              <div
                key={c.country}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-2xl">{c.flag}</span>
                    <span className="bg-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200">
                      {c.workVisa}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-950 mb-1">
                    Study in {c.country}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-5">
                    {c.highlights}
                  </p>

                  <div className="space-y-3 bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-bold">Avg. Starting Package:</span>
                      <span className="font-extrabold text-emerald-700">{c.avgSalary}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-bold">Annual Tuition Fee:</span>
                      <span className="font-extrabold text-slate-900">{c.tuition}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-bold">Post-Study Visa:</span>
                      <span className="font-extrabold text-amber-800 text-right">{c.workVisa}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      In-Demand Programs
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {c.topPrograms.map((prog) => (
                        <span
                          key={prog}
                          className="bg-white border border-slate-200 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                        >
                          {prog}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <a
                    href="#explore"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors"
                  >
                    View {c.country} Universities <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCREDITATION & WES DECISION GUIDE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="bg-emerald-50 text-emerald-800 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3 border border-emerald-200">
              <ShieldCheck size={13} className="text-emerald-700" /> Accreditation Standards
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Understanding Global Accreditations & WES
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base mt-3">
              Don&apos;t risk your career on unaccredited universities. Learn how international regulatory bodies ensure global degree validity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="bg-slate-50 rounded-3xl border border-slate-200/90 p-7">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black mb-5">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-950 mb-2">
                Triple Crown: AACSB, AMBA, EQUIS
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                Fewer than 1% of business schools worldwide hold triple crown accreditation. These degrees are universally recognized by elite management consulting, investment banking, and Fortune 100 recruiters.
              </p>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 inline-block">
                Top 1% Global B-Schools
              </span>
            </div>

            <div className="bg-slate-50 rounded-3xl border border-slate-200/90 p-7">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black mb-5">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-950 mb-2">
                WES & Canada PR Equivalence
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                World Education Services (WES) evaluates credentials for immigration and higher studies in Canada and the US. An approved degree awards full CRS points in Canadian Express Entry.
              </p>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 inline-block">
                Express Entry CRS Points
              </span>
            </div>

            <div className="bg-slate-50 rounded-3xl border border-slate-200/90 p-7">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black mb-5">
                <Building2 size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-950 mb-2">
                UK Privy Council & QAA Standards
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                Degrees conferred by Royal Charter or the UK Privy Council are statutory qualifications recognized globally. They comply with the UK Quality Assurance Agency (QAA) framework.
              </p>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block">
                Royal Charter Validation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESSENTIAL DECISION TOOLS CROSS-LINKS ── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/90">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="bg-blue-100 text-blue-800 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
                <Sparkles size={12} className="text-blue-700" /> Free Admissions Tools
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
                Recommended Decision Calculators & Mocks
              </h2>
            </div>
            <Link
              href="/mock-tests"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-amber-600 uppercase tracking-wider transition-colors"
            >
              View all 24+ mock tests <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/mock-tests"
              className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <GraduationCap size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-amber-600 transition-colors">
                IELTS & DET Mock Tests
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Free timed IELTS Academic reading & listening CBT simulation tests.
              </p>
            </Link>

            <Link
              href="/scholarships-2026"
              className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <DollarSign size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-amber-600 transition-colors">
                Scholarships 2026-27 Hub
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Find international study grants, fee waivers, and bursaries.
              </p>
            </Link>

            <Link
              href="/tools/cat-score-calculator"
              className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-amber-600 transition-colors">
                CAT Score Calculator
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Estimate raw scores to percentiles across VARC, DILR, and QA.
              </p>
            </Link>

            <Link
              href="/top-tier-mba-colleges"
              className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <Building2 size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-amber-600 transition-colors">
                Top-Tier MBA Directory
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Compare India&apos;s premier IIMs, XLRI, SPJIMR, and FMS Delhi.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="bg-amber-100 text-amber-800 text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
              <HelpCircle size={13} className="text-amber-700" /> Expert Advisory FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Study Abroad Frequently Asked Questions
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base mt-2">
              Everything you need to know about international university recognition, fees, and work permits.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Are online global MBAs recognized by top employers in India and globally?',
                a: 'Yes. Global MBAs from accredited institutions (AACSB, AMBA, EQUIS, Privy Council) are fully recognized by top multinationals like McKinsey, Amazon, Microsoft, and Goldman Sachs. For immigration purposes, WES evaluates these degrees as equivalent to Canadian and US master degrees.',
              },
              {
                q: 'Can I study abroad without taking IELTS or TOEFL?',
                a: 'Yes. Many universities in the UK, Germany, and the USA offer IELTS waivers if your undergraduate degree was taught in English (with a Medium of Instruction certificate from your Indian college) or based on 70%+ marks in Class 12 English.',
              },
              {
                q: 'What is the cost difference between on-campus and online international degrees?',
                a: 'On-campus international master programs cost between ₹25 Lakhs to ₹60 Lakhs per year including tuition, accommodation, and living expenses. Online global degrees from the exact same universities (e.g. LJMU, GGU) cost between ₹3.5 Lakhs to ₹12 Lakhs total, saving up to 80% without travel expenses.',
              },
              {
                q: 'Do international universities offer education loans without collateral?',
                a: 'Yes. Indian nationalized and private banks (SBI, HDFC Credila, Avanse, InCred) offer unsecured education loans up to ₹40–50 Lakhs for recognized global universities based on your academic profile and co-signer income.',
              },
              {
                q: 'How does CareerWithMohit help with study abroad admissions?',
                a: 'Mohit Jain provides personalized, unbiased counselling. We evaluate your CGPA, work experience, budget, and immigration goals to shortlist top universities, assist with SOP/LOR writing, guide scholarship applications, and navigate visa paperwork with zero agency commission.',
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-slate-50 rounded-3xl border border-slate-200/80 overflow-hidden transition-all duration-200 open:bg-white open:shadow-md"
              >
                <summary className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 sm:py-6 cursor-pointer list-none font-bold text-slate-900 text-sm sm:text-base">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <div className="px-6 sm:px-8 pb-6 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4 font-medium">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL ADMISSIONS CTA BANNER ── */}
      <section className="bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] py-20 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <Plane size={12} className="fill-slate-950" /> Start Your Global Journey
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Take Your Career to the Global Stage
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Get personalized guidance on university shortlisting, scholarships, English test waivers, and visa filing. Talk directly with Mohit Jain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20to%20apply%20for%20Study%20Abroad%20Admissions%202027!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/20 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Get Free Admission Assistance <ArrowRight size={14} />
            </a>
            <a
              href="#explore"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-black px-8 py-4 rounded-2xl border border-white/20 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Explore 380+ Universities
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
