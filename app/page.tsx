// Server component
import Link from 'next/link';

import type { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/markdown';
import HomeSearch from '@/components/HomeSearch';
import { NEWS_ITEMS } from '@/lib/news';
import {
  GraduationCap,
  Cpu,
  LineChart,
  Globe,
  Target,
  Handshake,
  Award,
  Plane,
  Bell,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const SERVICES = [
  { 
    title: "MBA/PGDM Admission", 
    icon: GraduationCap, 
    description: "Strategic guidance for top-tier management programs.", 
    color: "bg-blue-50", 
    accent: "text-primary",
    href: "/colleges"
  },
  { 
    title: "B.Tech Admission", 
    icon: Cpu, 
    description: "Engineering admissions consulting for premier institutes.", 
    color: "bg-emerald-50", 
    accent: "text-secondary",
    href: "/colleges"
  },
  { 
    title: "BBA/BCA Admission", 
    icon: LineChart, 
    description: "Foundation mapping for early professional degrees.", 
    color: "bg-amber-50", 
    accent: "text-accent",
    href: "/colleges"
  },
  { 
    title: "Online MBA", 
    icon: Globe, 
    description: "Navigating flexible, global management education.", 
    color: "bg-purple-50", 
    accent: "text-purple-600",
    href: "/online-degree-certification"
  },
  { 
    title: "Abroad Education", 
    icon: Plane, 
    description: "Comprehensive guidance for international university admissions.", 
    color: "bg-rose-50", 
    accent: "text-rose-600",
    href: "/inquiry"
  },
  { 
    title: "Internship Support", 
    icon: Target, 
    description: "Securing high-impact internships to build your profile.", 
    color: "bg-cyan-50", 
    accent: "text-cyan-600",
    href: "/internships"
  },
  { 
    title: "Placement Support", 
    icon: Handshake, 
    description: "End-to-end interview prep and placement strategy.", 
    color: "bg-indigo-50", 
    accent: "text-indigo-600",
    href: "/jobs"
  },
  { 
    title: "Scholarship Support", 
    icon: Award, 
    description: "Identifying and applying for merit and need-based aid.", 
    color: "bg-fuchsia-50", 
    accent: "text-fuchsia-600",
    href: "/inquiry"
  },
];

export const metadata: Metadata = {
  title: "Mohit Jain | MBA & PGDM Admissions & Career Counselling Expert 2027",
  description: "Transform your career with expert guidance from Mohit Jain. Specializing in MBA 2027, PGDM 2027, B.Tech, and other degree admissions coaching and placement strategy.",
  keywords: [
    "career counsellor India", "MBA admission guidance 2027", "PGDM admission 2027", "B.Tech admission expert", 
    "best career counsellor Delhi NCR", "CAT 2027 preparation", "degree admission 2027",
    "Direct MBA admission 2027", "MBA placement report 2025", "ROI MBA colleges",
    "online degree courses india 2027", "ugc deb approved online universities", "online mba colleges fees",
    "online mca in ai data science", "cheapest online mba india", "wes approved online degrees",
    "Noida", "Ghaziabad", "Pune", "Mumbai", "Bangalore", "Jaipur", "Delhi NCR"
  ],
  alternates: {
    canonical: "https://careerwithmohit.online/",
  },
  openGraph: {
    title: "Mohit Jain | MBA & PGDM Admissions & Career Counselling Expert 2027",
    description: "Transform your career with expert guidance from Mohit Jain. Specializing in MBA 2027, PGDM 2027, Online Degrees, and university admissions coaching.",
    url: "https://careerwithmohit.online/",
    siteName: "CareerWithMohit",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mohit Jain Career Counselling & MBA Admissions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Jain | MBA, PGDM & Online Degree Admissions Expert 2027",
    description: "Expert career guidance, MBA / PGDM admissions, and UGC-DEB approved online degree consulting.",
    images: ["/og-image.webp"],
  },
};

import { DynamicHeroText } from '@/components/DynamicHeroText';
import HomeMockTestSlider from '@/components/HomeMockTestSlider';
import StudentCommunitySection from '@/components/StudentCommunitySection';
import { JsonLd } from '@/components/JsonLd';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

const HOME_FAQS = [
  {
    question: "How does Mohit Jain assist students with MBA & PGDM admissions 2027?",
    answer: "Mohit Jain (certified by IIM Bangalore & FMS Delhi) provides personalized 1-on-1 profile evaluation, B-school shortlist mapping (Dream, Target, Safe), application review, GD-PI-WAT interview training, and guidance on direct admission processes in top AICTE/UGC approved business schools across India."
  },
  {
    question: "Are UGC-DEB approved online degrees legally valid for UPSC, government jobs, and corporate promotions?",
    answer: "Yes, 100%. Under the UGC (ODL & Online Programmes) Regulations 2020 published in the Gazette of India, online degrees from UGC-DEB entitled universities are legally equivalent to conventional classroom degrees. Graduates are fully eligible for UPSC Civil Services, SSC CGL, IBPS Bank PO, State PSCs, and top MNC hiring."
  },
  {
    question: "Which top entrance exam mock tests are available for free on CareerWithMohit?",
    answer: "CareerWithMohit offers 100% free full-length simulated practice mock tests with live countdown timers and instant score breakdowns for CAT 2026, XAT 2027, NMAT 2026, SNAP 2026, MAT, ATMA, MAH MBA CET, GMAT Focus Edition, and IELTS."
  },
  {
    question: "What are the cutoff percentiles for premier Indian B-Schools like IIMs, XLRI, NMIMS, and SIBM?",
    answer: "Top IIMs generally require 98-99.5+ CAT percentile; XLRI Jamshedpur requires 93-96+ XAT percentile; NMIMS Mumbai requires 232+ NMAT score; SIBM Pune and SCMHRD require 97-98.5+ SNAP percentile; Tier-2 institutions like IMT Ghaziabad, IMI Delhi, and FORE School accept 80-92 percentile."
  },
  {
    question: "Can I get direct admission in accredited MBA/PGDM colleges without high CAT scores?",
    answer: "Yes, reputed private business schools and AICTE-approved institutions offer institutional and merit quota seats for candidates who meet the 50% graduation eligibility criteria and have taken any national entrance test (CAT, MAT, CMAT, ATMA, XAT) followed by a personal interview."
  },
  {
    question: "How do I calculate my CAT scaled score and predicted percentile?",
    answer: "You can use CareerWithMohit's free CAT Score to Percentile Calculator (/tools/cat-score-calculator) to convert your raw section scores (VARC, DILR, QA) into normalized scaled scores and expected percentile bands with recommended B-schools."
  }
];

export default function Home() {
  const allPostsData = getSortedPostsData();
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": HOME_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="w-full bg-slate-50">
      <JsonLd data={faqSchema} />
      
      {/* HERO SECTION - MODERN EDTECH DISCOVERY PORTAL */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#123058] text-white px-6 pt-20 pb-20 sm:px-12 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32 border-b border-blue-900/40">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-blue-500/15 blur-[120px] pointer-events-none rounded-full blur-glow" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/15 blur-[100px] pointer-events-none rounded-full blur-glow" />
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/10 blur-[90px] pointer-events-none rounded-full blur-glow" />

        <div className="relative mx-auto max-w-7xl text-center z-10">
          {/* Glowing Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-blue-100 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-sm transition-all">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-white">Admissions 2027-29 Hub</span>
            <span className="text-blue-300">•</span>
            <span className="text-amber-300 font-bold">Free 1-on-1 Profile Assessment</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Best <DynamicHeroText /> Colleges
            <span className="block mt-2 text-2xl sm:text-4xl md:text-5xl font-bold text-blue-100/90 tracking-normal">
              Strategic Admissions & Mentorship 2027
            </span>
          </h1>

          {/* Search Box Component */}
          <div className="mt-8 flex justify-center">
            <HomeSearch />
          </div>

          {/* Interactive Educational Quick-Filter Chips */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto text-xs sm:text-sm">
            <span className="text-blue-200/80 font-medium mr-1 hidden sm:inline">Popular:</span>
            <Link 
              href="/top-tier-mba-colleges?tab=iim" 
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium transition-all hover:scale-105 flex items-center gap-1.5 backdrop-blur-sm"
            >
              <span>🎯</span> Top 20 IIMs & XLRI
            </Link>
            <Link 
              href="/top-tier-mba-colleges?tab=nmat" 
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium transition-all hover:scale-105 flex items-center gap-1.5 backdrop-blur-sm"
            >
              <span>⚡</span> NMAT / SNAP B-Schools
            </Link>
            <Link 
              href="/colleges?budget=under-10l" 
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium transition-all hover:scale-105 flex items-center gap-1.5 backdrop-blur-sm"
            >
              <span>💼</span> High ROI (&lt; ₹10L)
            </Link>
            <Link 
              href="/colleges" 
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium transition-all hover:scale-105 flex items-center gap-1.5 backdrop-blur-sm"
            >
              <span>📍</span> Delhi NCR & Pune
            </Link>
            <Link 
              href="/mock-tests" 
              className="px-3.5 py-1.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-amber-200 font-semibold transition-all hover:scale-105 flex items-center gap-1.5 backdrop-blur-sm"
            >
              <span>📝</span> Free CAT Mocks
            </Link>
          </div>

          <p className="mx-auto mt-7 max-w-2xl text-base sm:text-lg font-normal text-blue-100/80 leading-relaxed">
            Personalized B-school shortlisting, GD-PI-WAT preparation, and verified cutoff intelligence with <strong className="text-white font-semibold">Mohit Jain</strong> (IIM Bangalore & FMS Certified).
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20to%20evaluate%20my%20MBA%20admission%20profile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 px-8 py-3.5 text-base sm:text-lg font-bold text-white transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2.5"
            >
              <span className="text-xl">💬</span>
              <span>WhatsApp Profile Review</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-700/60 text-xs font-semibold uppercase tracking-wider text-emerald-100">Instant</span>
            </a>
            <Link 
              href="/inquiry" 
              prefetch={false} 
              className="w-full sm:w-auto rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 active:scale-95 px-7 py-3.5 text-base sm:text-lg font-bold text-white transition-all backdrop-blur-sm text-center"
            >
              Book 1-on-1 Counselling
            </Link>
            <Link 
              href="#services" 
              prefetch={false} 
              className="w-full sm:w-auto rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 px-7 py-3.5 text-base sm:text-lg font-bold text-slate-950 transition-all shadow-lg shadow-amber-950/20 text-center"
            >
              Explore Services
            </Link>
          </div>

          {/* PROMINENT TRUST & CREDIBILITY STATS RIBBON */}
          <div className="mx-auto max-w-5xl mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="font-display text-3xl sm:text-4xl font-black text-amber-300">6+ Years</span>
              <span className="text-xs sm:text-sm font-medium text-blue-200 mt-1">Admissions Mentorship</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display text-3xl sm:text-4xl font-black text-emerald-400">5,000+</span>
              <span className="text-xs sm:text-sm font-medium text-blue-200 mt-1">Students Guided</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display text-3xl sm:text-4xl font-black text-cyan-300">₹35 LPA</span>
              <span className="text-xs sm:text-sm font-medium text-blue-200 mt-1">Highest CTC Mentored</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display text-3xl sm:text-4xl font-black text-white">IIM & FMS</span>
              <span className="text-xs sm:text-sm font-medium text-blue-200 mt-1">Certified Mentors</span>
            </div>
          </div>
        </div>
      </section>

      {/* MOCK TESTS SLIDER BANNER */}
      <HomeMockTestSlider />

      {/* STUDENT COMMUNITY - WHATSAPP & TELEGRAM */}
      <StudentCommunitySection />

      {/* SERVICES SECTION */}
      <section id="services" className="bg-white px-6 py-20 sm:px-12 content-auto">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 md:flex md:items-end md:justify-between border-b border-slate-200 pb-8">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                Expert Guidance
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Admission 2027 <span className="text-blue-600">Strategic Hub</span>
              </h2>
              <p className="mt-3 text-lg font-normal text-slate-600">
                End-to-end strategic support for your MBA, B.Tech, and professional journey across India.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link
                  key={idx}
                  href={service.href}
                  prefetch={false}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col h-full hover:border-blue-300 shadow-sm"
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Icon className="h-7 w-7" strokeWidth={2.2} />
                  </div>
                  
                  <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm font-normal text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 group-hover:text-blue-700">
                      Consult Now
                    </span>
                    <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1.5" strokeWidth={2.5} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOP TIER MBA COLLEGES SECTION */}
      <section id="top-tier-mba" className="bg-slate-50 px-6 py-20 sm:px-12 border-t border-slate-200 relative overflow-hidden content-auto">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-14 md:flex md:items-end md:justify-between border-b border-slate-200 pb-8">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
                MBA / PGDM ADMISSIONS 2027
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Top Tier <span className="text-blue-600">MBA</span> Colleges
              </h2>
              <p className="mt-3 text-lg font-normal text-slate-600">
                Explore fee structures, cut-offs, and audited placements for premier Indian B-Schools.
              </p>
            </div>
            <Link href="/top-tier-mba-colleges" prefetch={false} className="mt-6 md:mt-0 inline-flex items-center text-base font-bold text-blue-600 hover:text-blue-800 transition-colors group">
              View All B-Schools Directory
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "All 20 IIMs",
                description: "IIM Ahmedabad, Bangalore, Calcutta, and new/baby IIMs.",
                badge: "CAT 90-99.5+ %ile",
                link: "/top-tier-mba-colleges?tab=iim",
                stats: "Avg Package up to ₹35 LPA"
              },
              {
                name: "NMAT Colleges",
                description: "NMIMS Mumbai, Bangalore, K J Somaiya, and other elite institutes.",
                badge: "200-232+ Score",
                link: "/top-tier-mba-colleges?tab=nmat",
                stats: "Avg Package up to ₹26 LPA"
              },
              {
                name: "SNAP Colleges",
                description: "SIBM Pune, SCMHRD, and top Symbiosis business schools.",
                badge: "80-98.5+ %ile",
                link: "/top-tier-mba-colleges?tab=snap",
                stats: "Avg Package up to ₹26.7 LPA"
              },
              {
                name: "XAT Accepting",
                description: "XLRI Jamshedpur, SPJIMR, IMT Ghaziabad, GIM Goa, and more.",
                badge: "75-95+ %ile",
                link: "/top-tier-mba-colleges?tab=xat",
                stats: "Avg Package up to ₹32.7 LPA"
              }
            ].map((category, idx) => (
              <Link 
                key={idx} 
                href={category.link}
                prefetch={false}
                className="group relative flex flex-col justify-between h-64 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer shadow-sm hover:border-blue-300"
              >
                <div>
                  <span className="inline-block bg-slate-100 text-slate-800 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {category.badge}
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-xs font-normal text-slate-600 leading-relaxed line-clamp-3">
                    {category.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <span className="text-[11px] font-semibold text-slate-500">
                    {category.stats}
                  </span>
                  <div className="flex items-center text-xs font-bold uppercase text-blue-600 tracking-wider group-hover:text-blue-800 transition-colors">
                    Compare Now <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section id="news" className="bg-white px-6 py-20 sm:px-12 border-t border-slate-200 content-auto">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-8 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                Real-Time Updates
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                <Bell className="h-8 w-8 text-blue-600" strokeWidth={2.5} />
                Admission News
              </h2>
              <p className="mt-3 text-lg font-normal text-slate-600">
                Flash updates on MBA admissions, entrance exams, and college deadlines.
              </p>
            </div>
            <Link href="/news" prefetch={false} className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-600 whitespace-nowrap shadow-sm">
              All News Updates &rarr;
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {NEWS_ITEMS.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-50 text-blue-700 rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-slate-400 font-medium text-xs">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 font-normal text-sm leading-relaxed mb-5 line-clamp-2">
                  {item.excerpt}
                </p>
                <Link
                  href={item.link}
                  prefetch={false}
                  className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group-hover:translate-x-1 transition-transform"
                >
                  Read Update <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UGC-DEB APPROVED ONLINE DEGREES & UNIVERSITIES 2027 SHOWCASE ── */}
      <section id="online-degrees" className="bg-gradient-to-b from-slate-900 via-[#0C1A30] to-slate-900 text-white px-6 py-20 sm:px-12 relative overflow-hidden border-t border-b border-blue-900/50">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8 gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-400/30">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                UGC-DEB Approved • 2027 Directory
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Top Online Degrees in India <span className="text-amber-300">2027</span>
              </h2>
              <p className="mt-3 text-base sm:text-lg font-normal text-blue-100/80">
                Compare 40+ accredited online universities. 100% legal equivalence for UPSC &amp; Govt jobs, WES approved for Canada/USA, fees from ₹20,000.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/online-degree-certification"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 text-sm transition-all shadow-lg shadow-amber-950/20 whitespace-nowrap"
              >
                View 40+ Universities &rarr;
              </Link>
            </div>
          </div>

          {/* Quick Course Category Navigation Pills */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {[
              { name: '🎓 Online MBA', href: '/online-degree-certification/online-mba', tag: 'Top Pick' },
              { name: '💻 Online MCA', href: '/online-degree-certification/online-mca', tag: 'AI & CS' },
              { name: '📈 Online BBA', href: '/online-degree-certification/online-bba', tag: 'UG' },
              { name: '⚡ Online BCA', href: '/online-degree-certification/online-bca', tag: 'UG' },
              { name: '📖 Online MA English', href: '/online-degree-certification/online-ma-english', tag: 'UGC NET' },
              { name: '🤖 Data Science & AI', href: '/online-degree-certification/online-data-science', tag: 'High CTC' },
              { name: '💰 Cheapest MBA (< ₹1L)', href: '/online-degree-certification/cheapest-online-mba', tag: 'From ₹62K' },
              { name: '🌍 WES Approved (Canada)', href: '/online-degree-certification/wes-approved-online-degrees', tag: 'Abroad' },
            ].map((pill, idx) => (
              <Link
                key={idx}
                href={pill.href}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 backdrop-blur-md"
              >
                <span>{pill.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/20 font-bold">
                  {pill.tag}
                </span>
              </Link>
            ))}
          </div>

          {/* Featured Top Online Universities Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {[
              {
                name: 'Amity University Online',
                grade: 'NAAC A+',
                badge: 'WES Approved',
                badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
                fee: '₹1,99,000',
                emi: '₹4,500/mo',
                programs: 'MBA, MCA, BBA, BCA, MA',
                slug: 'online-degree-certification/amity-university-online',
                usp: 'Global alumni network & Canada WES recognition'
              },
              {
                name: 'Jain University Online',
                grade: 'NAAC A++',
                badge: 'Tech & FinTech',
                badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
                fee: '₹1,96,000',
                emi: '₹4,200/mo',
                programs: 'MBA, MCA, BBA, B.Com',
                slug: 'online-degree-certification/jain-university-online',
                usp: 'Bangalore startup network & 70+ electives'
              },
              {
                name: 'LPU Online',
                grade: 'NAAC A++',
                badge: 'Best LMS',
                badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
                fee: '₹1,61,000',
                emi: '₹3,500/mo',
                programs: 'MBA, MCA, BCA, MA English',
                slug: 'online-degree-certification/lovely-professional-university-lpu-online',
                usp: 'AI-driven learning app & placement drives'
              },
              {
                name: 'Chandigarh University Online',
                grade: 'NAAC A+',
                badge: 'QS World Ranked',
                badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
                fee: '₹1,65,000',
                emi: '₹3,800/mo',
                programs: 'MBA, MCA, BBA, BCA, MA',
                slug: 'online-degree-certification/chandigarh-university-online',
                usp: 'Fortune 500 mentors & scholarship programs'
              }
            ].map((univ, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10 backdrop-blur-md shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-blue-600/30 text-blue-300 text-[11px] font-bold border border-blue-400/30">
                      {univ.grade}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${univ.badgeColor}`}>
                      {univ.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {univ.name}
                  </h3>
                  <p className="text-xs text-blue-200/70 mb-4 line-clamp-2">
                    {univ.usp}
                  </p>
                  <div className="pt-3 border-t border-white/10 space-y-1.5 mb-5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Total 2-Yr Fee:</span>
                      <span className="font-bold text-amber-300">{univ.fee}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Programs:</span>
                      <span className="text-slate-200 font-medium">{univ.programs}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Link
                    href={`/${univ.slug}`}
                    className="flex-1 text-center py-2.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 border border-blue-400/30 text-white text-xs font-bold transition-all"
                  >
                    Check Fees &amp; Details
                  </Link>
                  <a
                    href={`https://wa.me/919560020771?text=Hi%2C%20I%20want%20counselling%20for%20${encodeURIComponent(univ.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-400/30 text-xs font-bold transition-all"
                    title="WhatsApp Counsellor"
                  >
                    💬
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Head-to-Head Comparison Strip */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Popular Head-to-Head Comparisons</p>
              <h4 className="text-base sm:text-lg font-extrabold text-white">Confused between top online universities?</h4>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {[
                { title: 'Amity vs Jain', href: '/online-degree-certification/amity-vs-jain' },
                { title: 'LPU vs Chandigarh', href: '/online-degree-certification/lpu-vs-chandigarh' },
                { title: 'NMIMS vs Amity', href: '/online-degree-certification/nmims-vs-amity' },
                { title: 'Manipal vs Amity', href: '/online-degree-certification/manipal-vs-amity' },
                { title: 'SCDL vs NMIMS', href: '/online-degree-certification/scdl-vs-nmims' },
              ].map((comp, idx) => (
                <Link
                  key={idx}
                  href={comp.href}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white text-xs font-bold border border-white/15 transition-all"
                >
                  {comp.title} ⚖️
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES SECTION */}
      <section id="articles" className="bg-slate-50 px-6 py-20 sm:px-12 border-t border-slate-200 content-auto">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-8 gap-6">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 flex flex-wrap items-center gap-3">
              Latest Intel & Analysis
              <span className="text-xs sm:text-sm font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full uppercase tracking-wider">
                {allPostsData.length} Articles
              </span>
            </h2>
            <Link href="/blog" prefetch={false} className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-600 whitespace-nowrap shadow-sm">
              View All Articles &rarr;
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {allPostsData.slice(0, 3).map(({ slug, title, date, description }) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                prefetch={false}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 h-full shadow-sm hover:border-blue-300"
              >
                <div className="mb-4 inline-block rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 self-start">
                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {title}
                </h3>
                {description && (
                  <p className="text-slate-600 text-sm font-normal leading-relaxed mb-6 line-clamp-3">
                    {description}
                  </p>
                )}
                <div className="mt-auto flex items-center font-bold text-blue-600 group-hover:text-blue-800 text-sm transition-colors pt-4 border-t border-slate-100">
                  Read Article
                  <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-1.5">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI KNOWLEDGE & FAQ SECTION */}
      <section id="ai-fast-facts" className="bg-white px-6 py-20 sm:px-12 border-t border-slate-200 content-auto">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 border-b border-slate-200 pb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              Direct Answers & Fast Facts
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
              <HelpCircle className="h-8 w-8 text-blue-600" strokeWidth={2.5} />
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-lg font-normal text-slate-600 max-w-3xl speakable-summary">
              Verified answers on MBA & PGDM admissions 2027, free CAT/XAT/NMAT mock tests, cutoffs, and 1-on-1 counseling with Mohit Jain.
            </p>
          </div>

          <div className="grid gap-5 max-w-5xl mx-auto">
            {HOME_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7 transition-all hover:bg-white hover:shadow-md hover:border-blue-200 shadow-sm"
              >
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-2.5 flex items-start gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-lg bg-blue-600 text-white text-xs font-bold mt-0.5">
                    Q{idx + 1}
                  </span>
                  <span>{faq.question}</span>
                </h3>
                <div className="pl-10 text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

