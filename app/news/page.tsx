import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Sparkles,
  Zap,
  GraduationCap,
  Building2,
  BookOpen,
  HelpCircle,
  Clock,
  CheckCircle2,
  FileText,
  Compass,
  Award,
  Bell,
  ShieldCheck,
} from "lucide-react";
import { NEWS_ITEMS } from "@/lib/news";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NewsClient } from "@/components/NewsClient";

export const metadata = {
  title: "Latest Education & Career News 2026-2027 | Admission Updates & Exam Alerts | CareerWithMohit",
  description:
    "Stay updated with the latest higher education news, MBA/PGDM 2027 admission alerts, CAT/XAT/JEE exam notifications, answer keys, and career counselling updates from CareerWithMohit.",
  keywords: [
    "MBA admission news 2027",
    "CAT 2026 updates",
    "MBA admission 2027",
    "PGDM admission 2027",
    "degree admission 2027",
    "JEE Advanced news",
    "education news India",
    "career updates",
    "B-school admission alerts",
    "direct admission MBA 2027",
    "AICTE PGDM news"
  ],
  alternates: {
    canonical: "https://www.careerwithmohit.online/news",
  },
  openGraph: {
    title: "Latest Education & Career News 2026-2027 | CareerWithMohit",
    description:
      "Stay informed with real-time higher education updates, exam notifications, and admission alerts.",
    url: "https://www.careerwithmohit.online/news",
    siteName: "CareerWithMohit",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Latest Career and Admission News - CareerWithMohit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Education & Career News 2026-2027 | CareerWithMohit",
    description:
      "Stay informed with real-time higher education updates and admission alerts.",
    images: ["/og-image.webp"],
  },
};

export default function NewsPage() {
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
        name: "News",
        item: "https://www.careerwithmohit.online/news",
      },
    ],
  };

  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Education & Career News Updates 2026-2027",
    description:
      "Latest education news, admission alerts, exam notifications, and career growth insights.",
    url: "https://www.careerwithmohit.online/news",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: NEWS_ITEMS.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "NewsArticle",
          headline: item.title,
          description: item.excerpt,
          datePublished: item.date,
          url: `https://www.careerwithmohit.online${item.link}`,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How frequently is the education news desk updated on CareerWithMohit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our admissions editorial team monitors official announcements from the AICTE, NTA, IIMs, State CET Cells, and major universities daily. Important notifications, circulars, and exam schedule changes are updated immediately.",
        },
      },
      {
        "@type": "Question",
        name: "Where do you source your MBA & PGDM admission news from?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All news updates are verified directly against official B-school admission bulletins, AICTE approval handbooks, state counselling schedules (like MAH CET, GGSIPU, CAP rounds), and university press releases.",
        },
      },
      {
        "@type": "Question",
        name: "Can I receive personalized counselling regarding an admission alert?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! If you are confused by any notification regarding cutoffs, eligibility criteria, or deadlines, you can book a free 1-on-1 profile evaluation with admissions expert Mohit Jain.",
        },
      },
      {
        "@type": "Question",
        name: "What key admission alerts are covered for the 2027 intake?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We track early application deadlines for top private PGDM institutes, CAT 2026 response sheet and answer key releases, XAT/SNAP/NMAT registration cycles, management quota eligibility, and GD-PI shortlist releases.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={newsSchema} />
      <JsonLd data={faqSchema} />

      {/* ── MODERN SLEEK MIDNIGHT HERO ── */}
      <header className="relative bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white pt-12 pb-24 px-6 overflow-hidden">
        {/* Subtle Ambient Glows & Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs styled for dark background */}
          <div className="mb-8 [&_a]:text-slate-300 [&_a:hover]:text-amber-300 [&_span]:text-white [&_svg]:text-slate-400">
            <Breadcrumbs />
          </div>

          {/* Top Announcement Tag */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-200">
              Higher Education &amp; Admissions Desk · 2026-2027 Cycle
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Latest Education &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                Admissions News 2026-2027
              </span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-slate-300 border-l-2 border-amber-400/80 pl-5 mb-10 leading-relaxed max-w-3xl">
              Stay ahead with verified notifications, exam schedules, cut-off announcements, and admissions circulars for <span className="text-white font-semibold underline decoration-amber-400/50 decoration-2 underline-offset-4">MBA &amp; PGDM 2027</span>, <span className="text-white font-semibold underline decoration-amber-400/50 decoration-2 underline-offset-4">National Entrance Exams</span>, and <span className="text-white font-semibold underline decoration-amber-400/50 decoration-2 underline-offset-4">B-School Application Deadlines</span>.
            </p>

            {/* Hero Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  Active Updates
                </span>
                <span className="text-xl sm:text-2xl font-black text-white">20+ Alerts</span>
                <span className="text-[11px] text-slate-300 block mt-0.5">Real-time Desk</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                  Verification
                </span>
                <span className="text-xl sm:text-2xl font-black text-white">100% Official</span>
                <span className="text-[11px] text-slate-300 block mt-0.5">AICTE · NTA · State Portals</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 block mb-1">
                  Coverage
                </span>
                <span className="text-xl sm:text-2xl font-black text-white">5 Streams</span>
                <span className="text-[11px] text-slate-300 block mt-0.5">MBA · B.Tech · Exams · Careers</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 block mb-1">
                  Direct Advisory
                </span>
                <span className="text-xl sm:text-2xl font-black text-white">1-on-1 Guidance</span>
                <span className="text-[11px] text-slate-300 block mt-0.5">Profile Review with Mohit</span>
              </div>
            </div>

            {/* Quick Filter Jump Links */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Quick Streams:
              </span>
              <a
                href="#news-feed"
                className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors"
              >
                🎓 MBA Admissions 2027
              </a>
              <a
                href="#news-feed"
                className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-blue-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors"
              >
                📝 Entrance Exams &amp; Keys
              </a>
              <a
                href="#news-feed"
                className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-emerald-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors"
              >
                💼 Career Insights
              </a>
              <a
                href="#news-feed"
                className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-purple-300 flex items-center gap-1.5 hover:bg-white/15 transition-colors"
              >
                ⚙️ B.Tech &amp; Engineering
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN INTERACTIVE NEWS FEED SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 pb-20">
        <NewsClient items={NEWS_ITEMS} />

        {/* ── VALUE-ADDED SECTIONS & TOOLS ── */}
        <div className="mt-16 space-y-16">

          {/* Critical Admissions Deadlines Timeline Tracker */}
          <section className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                  <Clock className="w-4 h-4" /> Timeline Radar
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Upcoming Admissions &amp; Exam Deadlines 2026-2027
                </h2>
              </div>
              <Link
                href="/inquiry"
                className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 self-start sm:self-auto"
              >
                Set Deadline Alert with Advisor →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  Nov – Dec 2026
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  CAT 2026 Response Sheet &amp; Scaled Scores
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Official answer key release, 3-day challenge window, and score scaling across Slot 1, 2, and 3.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Dec 2026 – Jan 2027
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  XAT &amp; SNAP 2026 Exam Windows
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Symbiosis and XLRI entrance test dates with fast results turnaround for Round 1 shortlists.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Jan – Mar 2027
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Top Private PGDM Early Applications
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Early bird admission deadlines for MDI, SPJIMR, IMT, FORE, GIM, TAPMI, and Great Lakes.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Mar – May 2027
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  State CAP Rounds &amp; Direct Seats
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  MAH CET, GGSIPU, PUMBA counselling rounds and institutional management quota seat allocations.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Admissions Discovery Tools Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/tools/cat-score-calculator"
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-slate-900 group-hover:text-amber-700 transition-colors">
                CAT Score Calculator →
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Scan response sheet URL and predict IIM percentiles.
              </p>
            </Link>

            <Link
              href="/mock-tests"
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                Free Mock Tests Hub →
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Practice 24+ full CBT exam simulations for free.
              </p>
            </Link>

            <Link
              href="/top-tier-mba-colleges"
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                Top Tier B-Schools →
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Verified fees, placements, and cutoffs ranked.
              </p>
            </Link>

            <Link
              href="/scholarships-2026"
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-purple-300 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-slate-900 group-hover:text-purple-700 transition-colors">
                Scholarships 2026-27 →
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Find corporate and institutional fee waivers.
              </p>
            </Link>
          </div>

          {/* Frequently Asked Questions */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions: Higher Education News Desk
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "How frequently is the education news desk updated on CareerWithMohit?",
                  a: "Our admissions editorial team monitors official announcements from the AICTE, NTA, IIMs, State CET Cells, and major universities daily. Important notifications, circulars, and exam schedule changes are updated immediately.",
                },
                {
                  q: "Where do you source your MBA & PGDM admission news from?",
                  a: "All news updates are verified directly against official B-school admission bulletins, AICTE approval handbooks, state counselling schedules (like MAH CET, GGSIPU, CAP rounds), and university press releases.",
                },
                {
                  q: "Can I receive personalized counselling regarding an admission alert?",
                  a: "Yes! If you are confused by any notification regarding cutoffs, eligibility criteria, or deadlines, you can book a free 1-on-1 profile evaluation with admissions expert Mohit Jain.",
                },
                {
                  q: "What key admission alerts are covered for the 2027 intake?",
                  a: "We track early application deadlines for top private PGDM institutes, CAT 2026 response sheet and answer key releases, XAT/SNAP/NMAT registration cycles, management quota eligibility, and GD-PI shortlist releases.",
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

          {/* High-Converting Consultation Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-8 sm:p-12 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-amber-500/10">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 bg-white/40 px-3 py-1 rounded-full inline-block mb-2">
                Information Overload?
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Confused by Complex Admission Circulars &amp; Cutoffs?
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 max-w-xl">
                Speak directly with admissions consultant Mohit Jain to get honest, personalized, no-nonsense guidance on navigating your target colleges for the 2027 academic session.
              </p>
            </div>
            <Link
              href="/inquiry"
              className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl shadow-lg active:scale-95 transition-all text-xs uppercase tracking-wider shrink-0 text-center"
            >
              Book Free Appointment →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
