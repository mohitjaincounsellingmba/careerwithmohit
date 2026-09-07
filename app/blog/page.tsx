import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import { BlogList } from '@/components/BlogList';
import { AdUnit } from '@/components/AdUnit';

export const metadata = {
  title: 'MBA / PGDM Admission 2027 Blog & Career Insights | CareerWithMohit',
  description: 'Read latest career insights, MBA admission 2027 updates, PGDM admission 2027 guide, and professional growth strategies from expert counsellor Mohit Jain. Uncompromised guidance for students.',
  keywords: ['MBA blog', 'career counselling blog', 'MBA admission 2027', 'PGDM admission 2027', 'degree admission 2027', 'MBA admission tips', 'PGDM admission guide', 'career guidance articles', 'B-school insights 2027', 'Mohit Jain blog'],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'MBA / PGDM Admission 2027 Blog | CareerWithMohit',
    description: 'Read latest career insights, MBA admission 2027 updates, and professional growth strategies.',
    type: 'website',
  },
};
export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.careerwithmohit.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.careerwithmohit.online/blog"
      }
    ]
  };

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

        <BlogList initialPosts={allPostsData} />
      </div>
    </div>
  );
}
