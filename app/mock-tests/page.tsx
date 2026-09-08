import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Target,
  Zap,
  ArrowRight,
  GraduationCap,
  Stethoscope,
  Building2,
  CheckCircle2,
  Clock,
  BarChart3,
  Sparkles,
  ShieldCheck,
  FileText,
  Compass,
  Award,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getSortedPostsData } from "@/lib/markdown";
import { MockTestsClient } from "@/components/MockTestsClient";
import { ALL_MOCK_TESTS } from "@/data/mockTests";

export const metadata: Metadata = {
  title: "Free Mock Test Series 2026-2027: 50+ Practice Papers & Online CBT Simulation",
  description:
    "Practice 100% free online mock tests for CAT 2026, XAT 2027, SNAP 2026, NMAT 2026, CMAT 2027, ATMA 2026, GMAT Focus, JEE Main, NEET, and Study Abroad exams. Simulate real exam conditions with instant AI score analysis and percentile predictions.",
  keywords: [
    "free mock test series 2026",
    "cat mock test 2026",
    "xat mock test 2027",
    "snap mock test 2026",
    "nmat mock test 2026",
    "cmat mock test 2027",
    "atma mock test 2026",
    "free online test series 2027",
    "jee main mock test online",
    "neet ug practice papers",
    "gmat focus edition free mock",
    "ipu cet mock test online",
    "study abroad mock test free",
    "best online test series india",
    "mba mock test 2026",
    "pgdm entrance exam mock test 2027",
    "online cbt test simulation",
    "free cat mock test series"
  ],
  alternates: {
    canonical: "https://www.careerwithmohit.online/mock-tests",
  },
  openGraph: {
    title: "Free Mock Test Series 2026-2027: 50+ Practice Papers & Online CBT Simulation",
    description:
      "Practice 100% free online mock tests for CAT 2026, XAT 2027, SNAP 2026, NMAT 2026, CMAT 2027, ATMA 2026, GMAT Focus, and JEE/NEET with instant AI analysis.",
    url: "https://www.careerwithmohit.online/mock-tests",
    type: "website",
    siteName: "CareerWithMohit",
    images: [
      {
        url: "https://www.careerwithmohit.online/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mock Test Hub 2026-2027 - CareerWithMohit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Mock Test Series 2026-2027 - 50+ Online Practice Papers | CareerWithMohit",
    description:
      "Practice 100% free online mock tests for CAT 2026, XAT 2027, SNAP 2026, NMAT 2026, CMAT 2027, and ATMA 2026 with instant analytics.",
    images: ["https://www.careerwithmohit.online/og-image.webp"],
  },
};

export default function MockTestHubPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.careerwithmohit.online/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mock Tests",
        item: "https://www.careerwithmohit.online/mock-tests",
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Mock Test Series 2026-2027 - All India CBT Practice Hub",
    description:
      "Directory of 24+ full-length online mock tests covering MBA, Engineering, Medical, Law, and Study Abroad entrance examinations.",
    url: "https://www.careerwithmohit.online/mock-tests",
    provider: {
      "@type": "EducationalOrganization",
      name: "CareerWithMohit",
      url: "https://www.careerwithmohit.online",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are the mock tests on CareerWithMohit completely free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, 100% of the mock tests on CareerWithMohit are free to access. There are zero paywalls, no credit card requirements, and no hidden fees for attempting any of the practice exams or viewing detailed score analyses.",
        },
      },
      {
        "@type": "Question",
        name: "Which exams are covered in the Mock Test Hub?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Mock Test Hub covers top national and international exams: MBA Entrances (CAT, XAT, NMAT, SNAP, GMAT Focus, CMAT, ATMA, MHCET MBA, MAT), B.Tech Engineering (JEE Main, JEE Advanced, BITSAT, VITEEE, SRMJEEE), Medical & Law (NEET UG, CLAT, CUET UG & PG, IPU CET), and Study Abroad (IELTS Academic, Duolingo English Test, Digital SAT, TOEFL iBT, GRE General).",
        },
      },
      {
        "@type": "Question",
        name: "Do these mock tests mimic the actual exam software interface?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our testing software replicates official Computer-Based Test (CBT) interfaces, including sectional timers, question palettes, mark-for-review toggles, official negative marking, and non-MCQ / TITA input fields.",
        },
      },
      {
        "@type": "Question",
        name: "Do I get instant score analysis and percentile predictions after completing a mock test?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Immediately upon submitting a test, you receive detailed performance analytics, including raw marks, accuracy percentage, sectional score breakdown, negative mark deductions, and expected percentile benchmarks based on historical candidate score distributions.",
        },
      },
      {
        "@type": "Question",
        name: "How often are the mock test papers updated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All mock papers are calibrated annually to reflect the latest syllabus revisions, sectional question counts, time durations, and difficulty levels for the 2026-2027 and 2027-2028 admission cycles.",
        },
      },
    ],
  };

  // Fetch blogs dynamically to build linking section
  const allPosts = getSortedPostsData();
  const mockTestBlogs = allPosts.filter(
    (post) =>
      post.slug.includes("mock-test") ||
      post.category === "Exams" ||
      post.title.toLowerCase().includes("mock test")
  );

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <JsonLd data={faqSchema} />

      {/* ── MODERN SLEEK MIDNIGHT HERO ── */}
      <header className="relative bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white pt-12 pb-24 px-6 overflow-hidden">
        {/* Subtle Ambient Glows & Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs styled with white/light text for dark hero */}
          <div className="mb-8 [&_a]:text-slate-300 [&_a:hover]:text-amber-300 [&_span]:text-white [&_svg]:text-slate-400">
            <Breadcrumbs />
          </div>

          {/* Top Announcement Tag */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-200">
              National Mock Test Hub · 2026-2027 Admission Cycle
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Free Mock Test Series <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                2026-2027 Practice Papers
              </span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-slate-300 border-l-2 border-amber-400/80 pl-5 mb-10 leading-relaxed max-w-3xl">
              India&apos;s premier free online exam simulation hub. Practice 24+ full-length entrance exams across <span className="text-white font-semibold underline decoration-amber-400/50 decoration-2 underline-offset-4">MBA</span>, <span className="text-white font-semibold underline decoration-amber-400/50 decoration-2 underline-offset-4">B.Tech</span>, <span className="text-white font-semibold underline decoration-amber-400/50 decoration-2 underline-offset-4">Medical &amp; Law</span>, and <span className="text-white font-semibold underline decoration-amber-400/50 decoration-2 underline-offset-4">Study Abroad</span> with authentic CBT software interfaces, negative marking, and instant AI percentile analytics.
            </p>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  Full Mock Exams
                </span>
                <span className="text-xl sm:text-2xl font-black text-white">24+ Exams</span>
                <span className="text-[11px] text-slate-300 block mt-0.5">MBA · Eng · Med · Abroad</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                  Access Model
                </span>
                <span className="text-xl sm:text-2xl font-black text-white">100% Free</span>
                <span className="text-[11px] text-slate-300 block mt-0.5">Zero Paywalls · No Signup Lock</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 block mb-1">
                  Score Analytics
                </span>
                <span className="text-xl sm:text-2xl font-black text-white">AI Engine</span>
                <span className="text-[11px] text-slate-300 block mt-0.5">Percentiles &amp; Weak Spots</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 block mb-1">
                  Exam Interface
                </span>
                <span className="text-xl sm:text-2xl font-black text-white">CBT Software</span>
                <span className="text-[11px] text-slate-300 block mt-0.5">Timed · Official Marking</span>
              </div>
            </div>

            {/* Hero Quick Jump & Stream Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Featured Streams:
              </span>
              <a
                href="#directory"
                className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors"
              >
                🎓 MBA &amp; Management (9 Mocks)
              </a>
              <a
                href="#directory"
                className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-blue-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors"
              >
                ⚙️ Engineering B.Tech (5 Mocks)
              </a>
              <a
                href="#directory"
                className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-emerald-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors"
              >
                🩺 Medical &amp; Law (5 Mocks)
              </a>
              <a
                href="#directory"
                className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-purple-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors"
              >
                ✈️ Study Abroad (5 Mocks)
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN INTERACTIVE DIRECTORY SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 pb-20">
        <MockTestsClient exams={ALL_MOCK_TESTS} />

        {/* ── COMPLEMENTARY RESOURCES & PREPARATION GUIDES ── */}
        <div className="mt-20 max-w-7xl mx-auto space-y-20">

          {/* Value Propositions / Resource Cards */}
          <div className="bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white p-8 sm:p-12 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Previous Year Papers (PYQ)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  Download authentic question papers with official answer keys from the last 10 years for CAT, JEE Main, XAT, and NEET.
                </p>
                <Link
                  href="/previous-year-papers"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 pt-2"
                >
                  Access Free PYQ Papers <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-400/20 text-blue-300 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">College &amp; Call Predictors</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  Translate your raw mock test scores into estimated percentiles and discover your realistic IIM and top college call chances.
                </p>
                <Link
                  href="/tools/cat-score-calculator"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 pt-2"
                >
                  Explore CAT Score Calculator <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Timed Simulation Software</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  Our testing software replicates official exam user interfaces to help you master time management and eliminate exam-day anxiety.
                </p>
                <Link
                  href="/inquiry"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 pt-2"
                >
                  Get 1-on-1 Exam Guidance <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Dynamic Mock Test Blog Strategy Guides */}
          {mockTestBlogs.length > 0 && (
            <section id="mock-test-guides" className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                    <BookOpen className="w-4 h-4" /> Strategy &amp; Analysis
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Exam Strategy &amp; Preparation Guides
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-bold text-slate-600 hover:text-slate-950 flex items-center gap-1.5 self-start sm:self-auto"
                >
                  View All Guides ({mockTestBlogs.length}) <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTestBlogs.slice(0, 6).map((post, idx) => (
                  <article
                    key={idx}
                    className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full inline-block mb-3">
                        {post.category || "Exam Prep"}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 group-hover:text-amber-700 transition-colors leading-snug mb-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-xs text-slate-600 font-medium line-clamp-3 mb-6 leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 hover:text-amber-900 border-t border-slate-100 pt-4"
                    >
                      Read Strategy Guide <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Popular Search Topics & Regional Resources (SEO Section) */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Frequently Searched Free Mock Tests &amp; Admissions Directories
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Direct shortcuts to India&apos;s most popular entrance exam papers and college shortlists.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 uppercase border-b border-slate-200 pb-2 text-xs tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-amber-600" /> MBA Entrance Mocks
                </h3>
                <ul className="space-y-2 text-xs font-semibold text-slate-600">
                  <li>
                    <Link href="/tools/cat-mock-test" className="hover:text-amber-700 transition-colors">
                      → Free CAT mock test 2026 with sectional timer
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/nmat-mock-test" className="hover:text-amber-700 transition-colors">
                      → NMIMS NMAT adaptive practice paper
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/mock-test/xat" className="hover:text-amber-700 transition-colors">
                      → XAT Decision Making &amp; QA-DI mock test
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/mock-test/snap" className="hover:text-amber-700 transition-colors">
                      → SNAP SIBM Pune 60-minute test series
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/mhcet-mock-test" className="hover:text-amber-700 transition-colors">
                      → MAH MBA CET 200-question speed practice
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 uppercase border-b border-slate-200 pb-2 text-xs tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" /> Engineering &amp; Medical
                </h3>
                <ul className="space-y-2 text-xs font-semibold text-slate-600">
                  <li>
                    <Link href="/tools/jee-main-mock-test" className="hover:text-blue-700 transition-colors">
                      → IIT JEE Main 300-mark full test series
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/jee-advanced-mock-test" className="hover:text-blue-700 transition-colors">
                      → JEE Advanced partial marking simulation
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/bitsat-mock-test" className="hover:text-blue-700 transition-colors">
                      → BITSAT 130-question test with bonus questions
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/mock-test/neet" className="hover:text-blue-700 transition-colors">
                      → NEET UG NCERT biology physics chemistry mock
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/mock-test/viteee" className="hover:text-blue-700 transition-colors">
                      → VITEEE Vellore entrance mock test
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 uppercase border-b border-slate-200 pb-2 text-xs tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-purple-600" /> Study Abroad &amp; Law
                </h3>
                <ul className="space-y-2 text-xs font-semibold text-slate-600">
                  <li>
                    <Link href="/tools/mock-test/ielts" className="hover:text-purple-700 transition-colors">
                      → IELTS Academic complete 4-module test
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/mock-test/sat" className="hover:text-purple-700 transition-colors">
                      → Digital SAT reading and math adaptive mock
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/mock-test/gre" className="hover:text-purple-700 transition-colors">
                      → GRE General shorter format practice test
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/mock-test/duolingo" className="hover:text-purple-700 transition-colors">
                      → Duolingo English test online practice
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/mock-test/clat" className="hover:text-purple-700 transition-colors">
                      → CLAT passage-based legal reasoning mock
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4 Core Pillars Strip */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              Why Practice On CareerWithMohit?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 block">NCERT Aligned</span>
                <span className="text-xs text-slate-500 font-medium">Updated 2026-27 Syllabus</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 block">AI Analytics</span>
                <span className="text-xs text-slate-500 font-medium">Instant Percentiles &amp; Weak Areas</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 block">100% Free</span>
                <span className="text-xs text-slate-500 font-medium">No Paywalls · Unlimited Retakes</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 block">Real CBT UI</span>
                <span className="text-xs text-slate-500 font-medium">Official Exam Timers &amp; Schemes</span>
              </div>
            </div>
          </div>

          {/* Section 6: FAQs */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions: Online Mock Tests
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "Are the mock tests on CareerWithMohit completely free?",
                  a: "Yes, 100% of the mock tests on CareerWithMohit are free to access. There are zero paywalls, no credit card requirements, and no hidden fees for attempting any of the practice exams or viewing detailed score analyses.",
                },
                {
                  q: "Which exams are covered in the Mock Test Hub?",
                  a: "The Mock Test Hub covers top national and international exams: MBA Entrances (CAT, XAT, NMAT, SNAP, GMAT Focus, CMAT, ATMA, MHCET MBA, MAT), B.Tech Engineering (JEE Main, JEE Advanced, BITSAT, VITEEE, SRMJEEE), Medical & Law (NEET UG, CLAT, CUET UG & PG, IPU CET), and Study Abroad (IELTS Academic, Duolingo English Test, Digital SAT, TOEFL iBT, GRE General).",
                },
                {
                  q: "Do these mock tests mimic the actual exam software interface?",
                  a: "Yes. Our testing software replicates official Computer-Based Test (CBT) interfaces, including sectional timers, question palettes, mark-for-review toggles, official negative marking, and non-MCQ / TITA input fields.",
                },
                {
                  q: "Do I get instant score analysis and percentile predictions after completing a mock test?",
                  a: "Immediately upon submitting a test, you receive detailed performance analytics, including raw marks, accuracy percentage, sectional score breakdown, negative mark deductions, and expected percentile benchmarks based on historical candidate score distributions.",
                },
                {
                  q: "How often are the mock test papers updated?",
                  a: "All mock papers are calibrated annually to reflect the latest syllabus revisions, sectional question counts, time durations, and difficulty levels for the 2026-2027 and 2027-2028 admission cycles.",
                },
              ].map(({ q, a }, i) => (
                <details
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200 p-5 group cursor-pointer shadow-sm"
                >
                  <summary className="text-sm sm:text-base font-bold text-slate-900 flex justify-between items-center list-none select-none">
                    <span>{q}</span>
                    <span className="group-open:rotate-180 transition-transform ml-4 shrink-0 text-amber-500 font-black">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3.5">
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Section 7: Bottom High-Converting Consultation Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-8 sm:p-10 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-amber-500/10">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 bg-white/40 px-3 py-1 rounded-full inline-block mb-2">
                Expert Admissions &amp; Mock Analysis
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Stuck at a Score Plateau in Your Mock Tests?
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 max-w-xl">
                Get an unbiased 1-on-1 performance review with Mohit Jain. Discover how to convert your current mock percentiles into confirmed calls from top IIMs and premier B-schools.
              </p>
            </div>
            <Link
              href="/inquiry"
              className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl shadow-lg active:scale-95 transition-all text-xs uppercase tracking-wider shrink-0 text-center"
            >
              Book Free Strategy Session →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
