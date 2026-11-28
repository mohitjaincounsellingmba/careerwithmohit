import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import { BlogList } from '@/components/BlogList';
import { AdUnit } from '@/components/AdUnit';

export const metadata = {
  title: 'MBA Admissions 2027 Blog & College Reviews',
  description: 'Read verified 2027 MBA admission updates, college fee structures, placement audits, cutoff predictions & career guidance articles with expert Mohit Jain.',
  keywords: ['MBA blog', 'career counselling blog', 'MBA admission 2027', 'PGDM admission 2027', 'degree admission 2027', 'MBA admission tips', 'PGDM admission guide', 'career guidance articles', 'B-school insights 2027', 'Mohit Jain blog'],
  alternates: {
    canonical: "https://careerwithmohit.online/blog/",
  },
  openGraph: {
    title: 'MBA / PGDM Admission 2027 Blog | CareerWithMohit',
    description: 'Read latest career insights, MBA admission 2027 updates, and professional growth strategies.',
    type: 'website',
  },
};
export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  // Strip unnecessary fields to prevent bloated HTML payload for crawlers
  const lightweightPosts = allPostsData.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    description: p.description,
    category: p.category,
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://careerwithmohit.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://careerwithmohit.online/blog"
      }
    ]
  };

  const priorityGuides = [
    {
      title: "Fee Refund Policy 2026: AICTE & UGC Guidelines for MBA/PGDM Admissions",
      url: "/blog/fee-refund-policy-aicte-ugc-2026/",
      category: "Admissions Policy",
      desc: "Mandatory fee refund timelines, deduction caps, and legal grievance procedures for AICTE & UGC colleges."
    },
    {
      title: "XAT vs SNAP vs NMAT: Which is Easier After CAT? Complete Comparison & Strategy",
      url: "/blog/xat-vs-snap-vs-nmat-which-is-easier-after-cat-2026/",
      category: "Entrance Exams",
      desc: "Detailed difficulty analysis, target score percentiles, and syllabus pivot strategy after CAT."
    },
    {
      title: "CAT 2026 Score vs Percentile Analysis: What is a Good Score?",
      url: "/blog/cat-2026-score-vs-percentile-what-is-a-good-score/",
      category: "CAT Prep",
      desc: "Raw score to percentile conversion estimates across VARC, DILR, and QA for top IIM calls."
    },
    {
      title: "Direct MBA Admission 2027–2029: Management Quota Seats, Fees & Process",
      url: "/blog/direct-mba-pgdm-admission-2027-2029-management-quota-guide/",
      category: "MBA Admissions",
      desc: "Legitimate institutional seats, eligibility criteria, and fee structure without exam barriers."
    },
    {
      title: "Best BBA Colleges Without Maths in 12th — Eligibility & Admission 2026",
      url: "/blog/bba-colleges-without-maths-eligibility-2026/",
      category: "BBA & BMS",
      desc: "Top government and private universities offering BBA admissions for non-maths commerce & arts students."
    },
    {
      title: "Top B.Tech Colleges Under 5 Lakhs Total Fees (2026) – City-Wise List",
      url: "/blog/btech-colleges-under-5-lakhs-budget-2026/",
      category: "Engineering",
      desc: "Affordable AICTE-approved engineering institutions offering high placement ROI under ₹5 Lakhs budget."
    },
    {
      title: "College Not Refunding Your Fee? 5 Legal Actions Every Student Can Take",
      url: "/blog/how-to-recover-college-fee-refund-legal-action/",
      category: "Student Rights",
      desc: "Step-by-step grievance escalation to AICTE, UGC, National Consumer Helpline, and legal notices."
    },
    {
      title: "Central University List India 2026: All 56 Central Universities State-Wise",
      url: "/blog/central-university-list-india-2026-state-wise/",
      category: "Central Universities",
      desc: "Complete directory of central universities, accepted entrance exams (CUET), and reservation norms."
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Modern EdTech Academic Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0F2744] to-[#123058] text-white py-16 sm:py-24 px-6 sm:px-12 border-b border-blue-900/40">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px] bg-blue-500/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500/15 blur-[100px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-7xl relative z-10 text-center md:text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Admissions 2027 Intelligence</span>
              <span className="text-blue-300">•</span>
              <span className="text-amber-300 font-bold">{allPostsData.length.toLocaleString()} Articles</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Educational Intel &amp; <br className="hidden sm:inline" />
              <span className="text-amber-300">Career Insights</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-blue-100/80 leading-relaxed font-normal">
              Uncompromised B-school cutoffs, true placement ROI analysis, exam strategy, and verified career guidance to empower your academic journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Blog Body */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-12">
        {/* Display Ad unit on main Blog listing page */}
        <div className="mb-10">
          <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_LIST || "5687069123"} />
        </div>

        <BlogList initialPosts={lightweightPosts} />

        {/* Priority Admissions & Exam Strategy Hub (Crawlable Internal Architecture) */}
        <section className="mt-20 pt-16 border-t border-slate-200/80">
          <div className="mb-10">
            <span className="text-xs font-black tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Essential Guidance
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Priority Admissions &amp; Strategy Hubs
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              High-impact reference guides on verified fees, refund policies, exam score mapping, and institutional counseling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {priorityGuides.map((guide) => (
              <Link
                key={guide.url}
                href={guide.url}
                className="group flex flex-col p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
              >
                <span className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">
                  {guide.category}
                </span>
                <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed flex-grow">
                  {guide.desc}
                </p>
                <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                  Read Guide &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
