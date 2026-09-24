// Server component
import Link from 'next/link';
import type { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/markdown';
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
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Star,
  Download,
  FileText,
  Building2,
  Video,
  ShieldCheck,
  TrendingUp,
  Percent,
  Users,
  MessageCircle,
  Calculator,
  Compass,
  Check
} from 'lucide-react';

import { DynamicHeroText } from '@/components/DynamicHeroText';
import { EducationFinder } from '@/components/EducationFinder';
import { HomeCollegeExplorer } from '@/components/HomeCollegeExplorer';
import { HomeInquirySection } from '@/components/HomeInquirySection';
import { PortalQuickTools } from '@/components/PortalQuickTools';
import { ExamTrackerSection } from '@/components/ExamTrackerSection';
import { InteractiveRoiCalculator } from '@/components/InteractiveRoiCalculator';
import HomeMockTestSlider from '@/components/HomeMockTestSlider';
import StudentCommunitySection from '@/components/StudentCommunitySection';
import { JsonLd } from '@/components/JsonLd';

const SERVICES = [
  { 
    title: "MBA/PGDM Admission", 
    icon: GraduationCap, 
    description: "Strategic guidance, cutoff intelligence & direct admissions for top-tier B-Schools.", 
    color: "bg-blue-50", 
    accent: "text-primary",
    href: "/colleges"
  },
  { 
    title: "B.Tech & Engg Admission", 
    icon: Cpu, 
    description: "JEE Main rank mapping and direct engineering admissions consulting.", 
    color: "bg-emerald-50", 
    accent: "text-secondary",
    href: "/colleges"
  },
  { 
    title: "BBA/BCA Foundations", 
    icon: LineChart, 
    description: "Early professional degree career roadmap and college selection.", 
    color: "bg-amber-50", 
    accent: "text-accent",
    href: "/colleges"
  },
  { 
    title: "UGC Online Degrees", 
    icon: Globe, 
    description: "40+ NAAC A++ entitled universities with UPSC validity and global WES approval.", 
    color: "bg-purple-50", 
    accent: "text-purple-600",
    href: "/online-degree-certification"
  },
  { 
    title: "Study Abroad Admissions", 
    icon: Plane, 
    description: "Global admissions consulting for USA, UK, Canada, Germany & Australia.", 
    color: "bg-rose-50", 
    accent: "text-rose-600",
    href: "/abroad-education"
  },
  { 
    title: "MBA Form Combo Discounts", 
    icon: Percent, 
    description: "Save up to ₹5,000+ on application form fees across 55+ premier business schools.", 
    color: "bg-emerald-50", 
    accent: "text-emerald-600",
    href: "/mba-application-form-discount"
  },
  { 
    title: "GD-PI-WAT Mentorship", 
    icon: Target, 
    description: "1-on-1 mock interviews, case discussions, and personal interview coaching.", 
    color: "bg-cyan-50", 
    accent: "text-cyan-600",
    href: "/book-session"
  },
  { 
    title: "Scholarship Guidance", 
    icon: Award, 
    description: "Identify and claim merit scholarships and financial aid opportunities.", 
    color: "bg-fuchsia-50", 
    accent: "text-fuchsia-600",
    href: "/scholarships-2026"
  },
];

const STUDENT_REVIEWS = [
  {
    name: "Rohan Sharma",
    admittedTo: "IIM Bangalore (PGP)",
    score: "CAT 99.42 %ile",
    rating: 5,
    text: "Mohit Sir's profile assessment and GD-PI-WAT coaching gave me complete clarity. His interview mock sessions accurately predicted the exact case discussion questions at IIM Bangalore.",
    avatarBg: "bg-amber-500",
  },
  {
    name: "Ananya Deshmukh",
    admittedTo: "NMIMS Mumbai (MBA Core)",
    score: "NMAT 248",
    rating: 5,
    text: "The free NMAT CBT mock tests on CareerWithMohit were identical to the real exam pattern. Sir also saved me ₹4,200 using the MBA form combo discount bundle!",
    avatarBg: "bg-emerald-500",
  },
  {
    name: "Vikram Singhania",
    admittedTo: "SIBM Pune (MBA)",
    score: "SNAP 98.8 %ile",
    rating: 5,
    text: "Mohit Sir's 1-on-1 Google Meet strategy call helped me choose between SIBM and SCMHRD based on real ROI and placement statistics rather than marketing claims.",
    avatarBg: "bg-blue-600",
  },
  {
    name: "Pooja Malhotra",
    admittedTo: "IMT Ghaziabad (PGDM Marketing)",
    score: "XAT 93.6 %ile",
    rating: 5,
    text: "From B-School shortlisting to direct admission guidance, Sir's mentorship was transparent and unmatched. Highly recommend booking a 1-on-1 session.",
    avatarBg: "bg-purple-600",
  },
];

const HOME_FAQS = [
  {
    question: "How does Mohit Jain assist students with MBA & PGDM admissions 2027?",
    answer: "Mohit Jain (certified by IIM Bangalore & FMS Delhi) provides personalized 1-on-1 profile evaluation, B-school shortlist mapping (Dream, Target, Safe), application review, GD-PI-WAT interview training, and guidance on direct admission processes in top AICTE/UGC approved business schools across India."
  },
  {
    question: "How do I submit an inquiry for MBA/B.Tech admissions on this portal?",
    answer: "You can fill out the interactive Admission Inquiry Form directly on this home page. Simply select your target course (MBA/PGDM, B.Tech, Online Degrees, or Study Abroad), enter your contact details and preferred location/budget, and Mohit Jain's senior mentorship team will evaluate your profile and contact you within 24 hours."
  },
  {
    question: "How do I save money on MBA application forms with the Form Discount Tool?",
    answer: "CareerWithMohit offers an MBA Application Form Discount Calculator (/mba-application-form-discount) covering 55+ accredited business schools. By applying in curated combo bundles, candidates save up to ₹5,000+ on official application fees with verified institutional discount codes."
  },
  {
    question: "Are UGC-DEB approved online degrees legally valid for UPSC, government jobs, and corporate promotions?",
    answer: "Yes, 100%. Under the UGC (ODL & Online Programmes) Regulations 2020 published in the Gazette of India, online degrees from UGC-DEB entitled universities are legally equivalent to conventional classroom degrees. Graduates are fully eligible for UPSC Civil Services, SSC CGL, IBPS Bank PO, State PSCs, and top MNC hiring."
  },
  {
    question: "Which entrance exam mock tests are available for free on CareerWithMohit?",
    answer: "CareerWithMohit offers 100% free full-length simulated practice mock tests with live countdown timers and instant score breakdowns for CAT 2026, XAT 2027, NMAT 2026, SNAP 2026, MAT, ATMA, MAH MBA CET, GMAT Focus Edition, and IELTS."
  },
  {
    question: "What are the cutoff percentiles for premier Indian B-Schools like IIMs, XLRI, NMIMS, and SIBM?",
    answer: "Top IIMs generally require 98-99.5+ CAT percentile; XLRI Jamshedpur requires 93-96+ XAT percentile; NMIMS Mumbai requires 232+ NMAT score; SIBM Pune and SCMHRD require 97-98.5+ SNAP percentile; Tier-2 institutions like IMT Ghaziabad, IMI Delhi, and FORE School accept 80-92 percentile."
  },
  {
    question: "How do I book a free 1-on-1 face-to-face video counselling session?",
    answer: "You can schedule a free 30-minute 1-on-1 video call on Google Meet directly through our Calendly booking portal (/book-session) to evaluate your academic profile, budget, and target B-schools with Mohit Jain."
  }
];

export const metadata: Metadata = {
  title: "Mohit Jain | MBA Admissions 2027, Colleges & Free Mock Tests",
  description: "Search 770+ top colleges, take free CBT mock tests for CAT, XAT, NMAT & SNAP, calculate MBA ROI, and book 1-on-1 admissions counselling with Mohit Jain.",
  keywords: [
    "education portal india", "college search portal", "career counsellor India", "MBA admission guidance 2027", "PGDM admission 2027", "B.Tech admission expert", 
    "free cat mock test 2026", "free xat mock test 2027", "nmat practice test", "snap mock test", "mba form combo discounts",
    "best career counsellor Delhi NCR", "degree admission 2027", "Direct MBA admission 2027", "ROI MBA colleges",
    "online degree courses india 2027", "ugc deb approved online universities", "online mba colleges fees",
    "Noida", "Ghaziabad", "Pune", "Mumbai", "Bangalore", "Jaipur", "Delhi NCR"
  ],
  alternates: {
    canonical: "https://careerwithmohit.online/",
  },
  openGraph: {
    title: "Mohit Jain | MBA Admissions 2027, Colleges & Free Mock Tests",
    description: "Search 770+ top colleges, take free CBT mock tests for CAT, XAT, NMAT & SNAP, calculate MBA ROI, and book 1-on-1 admissions counselling with Mohit Jain.",
    url: "https://careerwithmohit.online/",
    siteName: "CareerWithMohit",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mohit Jain Education & Admissions Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Jain | MBA Admissions 2027, Colleges & Free Mock Tests",
    description: "770+ Verified Colleges, Free CBT Mock Tests, MBA Form Discounts & 1-on-1 Guidance.",
    images: ["/og-image.webp"],
  },
};

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
      
      {/* ── 1. HERO SECTION: MODERN EDUCATION DISCOVERY & SEARCH PORTAL ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#050D1A] via-[#091A33] to-[#0E284D] text-white px-4 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32 border-b border-blue-900/40">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-blue-500/15 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/15 blur-[110px] pointer-events-none rounded-full" />
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-7xl text-center z-10">
          {/* Glowing Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-blue-100 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-sm transition-all">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-white">National Admissions 2027 Hub</span>
            <span className="text-blue-300">•</span>
            <span className="text-amber-300 font-bold">Free 1-on-1 Profile Assessment</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.15] max-w-5xl mx-auto">
            India&apos;s Premier <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-amber-300">Education &amp; Admissions</span> Portal
            <span className="block mt-2 text-xl sm:text-3xl md:text-4xl font-bold text-blue-100/90 tracking-normal">
              770+ Colleges • Free CBT Mock Tests • Direct Mentorship with <strong className="text-amber-300">Mohit Jain</strong>
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-sm sm:text-base md:text-lg font-normal text-blue-100/80 leading-relaxed">
            Verified fee audits, entrance exam cutoffs, free simulated test engines for CAT/XAT/NMAT/SNAP, MBA form combo discounts, and certified guidance (IIM Bangalore &amp; FMS Delhi).
          </p>

          {/* Interactive Multi-Stream Education Finder Widget */}
          <div className="mt-8 flex justify-center">
            <EducationFinder />
          </div>

          {/* Direct Fast-Track Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
            <a 
              href="#inquiry-section"
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 active:scale-95 px-7 py-3.5 text-sm sm:text-base font-bold text-white transition-all shadow-lg shadow-blue-950/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Submit Admission Inquiry</span>
              <span className="px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-bold uppercase tracking-wider text-white">Free</span>
            </a>
            <a 
              href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20to%20evaluate%20my%20MBA%20admission%20profile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp Profile Review</span>
            </a>
            <Link 
              href="/book-session" 
              prefetch={false} 
              className="w-full sm:w-auto rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 active:scale-95 px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-all backdrop-blur-sm text-center flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4 text-amber-300" />
              <span>Book 1-on-1 Google Meet</span>
            </Link>
          </div>

          {/* Prominent Trust & Credibility Stats Ribbon */}
          <div className="mx-auto max-w-5xl mt-12 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-4xl font-black text-amber-300">6+ Years</span>
              <span className="text-xs sm:text-sm font-medium text-blue-200 mt-1">Admissions Mentorship</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-4xl font-black text-emerald-400">5,000+</span>
              <span className="text-xs sm:text-sm font-medium text-blue-200 mt-1">Students Mentored</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-4xl font-black text-cyan-300">₹35 LPA</span>
              <span className="text-xs sm:text-sm font-medium text-blue-200 mt-1">Highest CTC Mentored</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-4xl font-black text-white">IIM &amp; FMS</span>
              <span className="text-xs sm:text-sm font-medium text-blue-200 mt-1">Certified Mentors</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE FEATURED COLLEGE SEARCH & EXPLORER PORTAL ── */}
      <HomeCollegeExplorer />

      {/* ── 3. DEDICATED STUDENT INQUIRY & PROFILE ASSESSMENT SECTION ── */}
      <HomeInquirySection />

      {/* ── 4. FLAGSHIP EDUCATION PORTAL PILLARS (BENTO GRID) ── */}
      <PortalQuickTools />

      {/* ── 5. NATIONAL ENTRANCE EXAM RADAR & DEADLINE TRACKER ── */}
      <ExamTrackerSection />

      {/* ── 6. LIVE INTERACTIVE MBA ROI & FINANCIAL PAYBACK CALCULATOR ── */}
      <InteractiveRoiCalculator />

      {/* ── 7. FREE FULL-LENGTH CBT MOCK TESTS SLIDER BANNER ── */}
      <HomeMockTestSlider />

      {/* ── 8. UGC-DEB APPROVED ONLINE DEGREES & UNIVERSITIES SHOWCASE ── */}
      <section id="online-degrees" className="bg-gradient-to-b from-slate-900 via-[#0C1A30] to-slate-900 text-white px-6 py-16 sm:py-24 sm:px-12 relative overflow-hidden border-b border-blue-900/50 content-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8 gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-400/30">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                UGC-DEB Approved • 2027 Directory
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
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
                    Check Details
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
        </div>
      </section>

      {/* ── 9. VERIFIED STUDENT SUCCESS & WALL OF FAME ── */}
      <section className="bg-white py-16 sm:py-24 px-6 sm:px-12 border-b border-slate-200 content-auto">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-8 gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                Verified Student Admits
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Mentored by <span className="text-blue-600">Mohit Jain</span>
              </h2>
              <p className="mt-3 text-base sm:text-lg font-normal text-slate-600">
                Real feedback from students who cracked top business schools and secured dream placements.
              </p>
            </div>
            <Link
              href="/book-session"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md self-start md:self-auto"
            >
              <span>Schedule Your Free Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDENT_REVIEWS.map((review, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {review.score}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed mb-6 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm ${review.avatarBg}`}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-slate-900 leading-tight">
                      {review.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-blue-600 block">
                      {review.admittedTo}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. RESOURCE DOWNLOAD & PREVIOUS YEAR PAPERS HUB ── */}
      <section className="bg-slate-50 py-16 sm:py-24 px-6 sm:px-12 border-b border-slate-200 content-auto">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-8 gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
                <FileText className="w-3.5 h-3.5" />
                Free Educational Materials
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Exam Papers &amp; <span className="text-blue-600">Download Hub</span>
              </h2>
              <p className="mt-3 text-base sm:text-lg font-normal text-slate-600">
                Official previous year question papers (PYQs), GD-PI handbooks, and B-school cutoff sheets.
              </p>
            </div>
            <Link
              href="/previous-year-papers"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group self-start md:self-auto"
            >
              <span>View All Downloadable Papers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "CAT Previous Year Papers (2018-2025)",
                desc: "Slot 1, 2 & 3 papers with official answer keys & video explanations.",
                badge: "PDF + Solved",
                href: "/previous-year-papers",
                icon: FileText,
                color: "text-red-600 bg-red-50",
              },
              {
                title: "GD-PI-WAT 200+ Question Bank",
                desc: "Real interview questions asked at IIMs, XLRI, NMIMS & SIBM.",
                badge: "Mentorship Guide",
                href: "/book-session",
                icon: Target,
                color: "text-purple-600 bg-purple-50",
              },
              {
                title: "MBA Form Discount Vouchers",
                desc: "Instant application discount coupon codes for 55+ top B-schools.",
                badge: "Save ₹5,000+",
                href: "/mba-application-form-discount",
                icon: Percent,
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                title: "ATS Resume & CV Builder",
                desc: "Create single-page MBA and placement-ready resumes for free.",
                badge: "AI Powered",
                href: "/tools/ats-resume-builder",
                icon: Award,
                color: "text-blue-600 bg-blue-50",
              },
            ].map((res, idx) => {
              const Icon = res.icon;
              return (
                <Link
                  key={idx}
                  href={res.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col justify-between hover:border-blue-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${res.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase">
                        {res.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {res.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600 group-hover:text-blue-800">
                    <span>Access Resource</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 11. STUDENT COMMUNITY - WHATSAPP & TELEGRAM ── */}
      <StudentCommunitySection />

      {/* ── 12. REAL-TIME ADMISSION NEWS UPDATES ── */}
      <section id="news" className="bg-white px-6 py-16 sm:py-24 sm:px-12 border-b border-slate-200 content-auto">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-8 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                Real-Time Updates
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                <Bell className="h-8 w-8 text-blue-600" strokeWidth={2.5} />
                Admission Flash News
              </h2>
              <p className="mt-3 text-base sm:text-lg font-normal text-slate-600">
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

      {/* ── 13. ARTICLES & ANALYSIS SECTION ── */}
      <section id="articles" className="bg-slate-50 px-6 py-16 sm:py-24 sm:px-12 border-b border-slate-200 content-auto">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-8 gap-6">
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-900 flex flex-wrap items-center gap-3">
              Latest Intel &amp; Analysis
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

      {/* ── 14. AI KNOWLEDGE & FAQ SECTION ── */}
      <section id="ai-fast-facts" className="bg-white px-6 py-16 sm:py-24 sm:px-12 content-auto">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 border-b border-slate-200 pb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              Direct Answers &amp; Fast Facts
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              <HelpCircle className="h-8 w-8 text-blue-600" strokeWidth={2.5} />
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base sm:text-lg font-normal text-slate-600 max-w-3xl speakable-summary">
              Verified answers on MBA &amp; PGDM admissions 2027, free CAT/XAT/NMAT mock tests, MBA form discounts, student inquiry forms, and 1-on-1 counseling with Mohit Jain.
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
