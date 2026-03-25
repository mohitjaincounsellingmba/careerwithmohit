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
  Sparkles
} from 'lucide-react';

const SERVICES = [
  { title: "MBA/PGDM Admission", icon: GraduationCap, description: "Strategic guidance for top-tier management programs.", color: "bg-blue-50", accent: "text-primary" },
  { title: "B.Tech Admission", icon: Cpu, description: "Engineering admissions consulting for premier institutes.", color: "bg-emerald-50", accent: "text-secondary" },
  { title: "BBA/BCA Admission", icon: LineChart, description: "Foundation mapping for early professional degrees.", color: "bg-amber-50", accent: "text-accent" },
  { title: "Online MBA", icon: Globe, description: "Navigating flexible, global management education.", color: "bg-purple-50", accent: "text-purple-600" },
  { title: "Abroad Education", icon: Plane, description: "Comprehensive guidance for international university admissions.", color: "bg-rose-50", accent: "text-rose-600" },
  { title: "Internship Support", icon: Target, description: "Securing high-impact internships to build your profile.", color: "bg-cyan-50", accent: "text-cyan-600" },
  { title: "Placement Support", icon: Handshake, description: "End-to-end interview prep and placement strategy.", color: "bg-indigo-50", accent: "text-indigo-600" },
  { title: "Scholarship Support", icon: Award, description: "Identifying and applying for merit and need-based aid.", color: "bg-fuchsia-50", accent: "text-fuchsia-600" },
];

export const metadata: Metadata = {
  title: "Mohit Jain | MBA Admissions & Career Counselling Expert 2026",
  description: "Transform your career with expert guidance from Mohit Jain. Specializing in MBA, PGDM, and B.Tech admissions coaching and placement strategy.",
  keywords: [
    "career counsellor India", "MBA admission guidance 2026", "B.Tech admission expert", 
    "best career counsellor Delhi NCR", "CAT 2026 preparation",
    "Direct MBA admission", "MBA placement report 2025", "ROI MBA colleges",
    "Noida", "Ghaziabad", "Pune", "Mumbai", "Bangalore", "Jaipur", "Delhi NCR"
  ],
  alternates: {
    canonical: "/",
  },
};

import { DynamicHeroText } from '@/components/DynamicHeroText';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-primary px-6 py-24 sm:px-12 sm:py-32 lg:py-40 border-b-8 border-foreground">
        {/* Flat Geometric Decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rotate-45 bg-white/10" />

        <div className="relative mx-auto max-w-7xl text-center z-10">
          <h1 className="font-display text-5xl font-extrabold tracking-tighter text-white sm:text-7xl md:text-8xl leading-none uppercase">
            Best <DynamicHeroText /> Colleges <br className="hidden sm:block" />
            <span className="bg-accent text-foreground px-4 py-1 inline-block mt-4 -rotate-2 border-4 border-foreground">Admission 2026</span>
          </h1>
          <p className="mx-auto mt-10 max-w-2xl text-xl font-bold leading-relaxed text-blue-50">
            Expert career counselling, interview preparation, and bold strategies to help you dominate your professional goals.
          </p>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="https://wa.me/919560020771" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto rounded-md bg-foreground px-8 py-4 text-xl font-bold text-white transition-all hover:scale-105 hover:bg-gray-800 border-4 border-foreground text-center flex items-center justify-center gap-2">
              Connect on WhatsApp
            </a>
            <Link href="#services" className="w-full sm:w-auto rounded-md bg-transparent px-8 py-4 text-xl font-bold text-white transition-all hover:bg-white hover:text-primary border-4 border-white text-center">
              View Our Services
            </Link>
            <Link href="/inquiry" className="w-full sm:w-auto rounded-md bg-accent px-8 py-4 text-xl font-black text-foreground transition-all hover:scale-105 hover:bg-white border-4 border-foreground text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="bg-white px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 md:flex md:items-end md:justify-between border-b-8 border-foreground pb-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase leading-none">
                Admission 2026 <span className="text-primary tracking-tighter italic">Strategic Hub</span>
              </h2>
              <p className="mt-4 text-xl font-bold text-gray-600">
                End-to-end support for your MBA, B.Tech, and professional journey across India.
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-xl border-4 border-foreground ${service.color} p-8 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
                >
                  <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white border-4 border-foreground transition-transform group-hover:scale-110">
                    <Icon className={`h-8 w-8 ${service.accent}`} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-base font-bold text-gray-800 leading-relaxed italic">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLACEMENTS & REVIEWS 2026 */}
      <section id="placements" className="bg-foreground px-6 py-24 sm:px-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="bg-accent text-foreground px-4 py-1 text-sm font-black uppercase tracking-widest mb-6 inline-block transform -rotate-2">
                2026 Batch Intel
              </span>
              <h2 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
                Placement <br /> <span className="text-primary">Audits & Reviews</span>
              </h2>
              <p className="text-xl text-gray-400 font-bold leading-relaxed mb-10 max-w-lg">
                We audit the "Real" placement reports, not the marketing brochures. Get the truth about the 2026 salary trends, pool placement traps, and ROI reality.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Independent College Reviews</h4>
                    <p className="text-gray-400 font-medium">Unbiased comparisons like NDIM vs DSB or NIU vs Galgotias.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Verified ROI Audits</h4>
                    <p className="text-gray-400 font-medium">We verify if a ₹15 Lakh fee justifies a ₹10 Lakh placement.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                <Link href="/blog/ndim-vs-delhi-school-of-business-dsb-comparison-2026" className="bg-white text-foreground px-6 py-3 rounded-md font-black uppercase transition-all hover:bg-accent text-sm border-2 border-white shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] hover:shadow-[6px_6px_0px_0px_rgba(59,130,246,1)]">
                  NDIM vs DSB Review
                </Link>
                <Link href="/blog/why-never-join-nmims-online-mba-honest-review-2026" className="bg-rose-500 text-white px-6 py-3 rounded-md font-black uppercase transition-all hover:bg-rose-600 text-sm border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    NMIMS Online Truth
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-primary rounded-3xl p-10 relative overflow-hidden border-8 border-foreground shadow-[12px_12px_0px_0px_rgba(255,191,0,1)]">
                <div className="absolute top-0 right-0 p-4">
                  <Sparkles className="h-20 w-20 text-white/10 rotate-12" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-6">2026 Snapshot</h3>
                <div className="space-y-6">
                  <div className="bg-foreground/50 p-6 rounded-2xl border border-white/10 group cursor-default">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-black uppercase tracking-widest text-accent">Top Packages</span>
                        <span className="text-xs font-bold text-gray-400">Delhi-NCR</span>
                    </div>
                    <div className="text-4xl font-black">₹36.6 LPA <span className="text-lg text-gray-500 line-through decoration-rose-500 font-normal ml-2">₹12.0 LPA</span></div>
                    <p className="text-sm text-gray-400 mt-2 font-medium">Realized Highest vs Mass Avg for 2026 Batch</p>
                  </div>
                  <div className="bg-foreground/50 p-6 rounded-2xl border border-white/10 group cursor-default">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-black uppercase tracking-widest text-emerald-400">Direct Guidance</span>
                        <span className="text-xs font-bold text-gray-400">Verified Seats</span>
                    </div>
                    <div className="text-4xl font-black">100% <span className="text-lg text-gray-500 font-normal ml-2 tracking-tight">Success</span></div>
                    <p className="text-sm text-gray-400 mt-2 font-medium">Verified Admission Success for all our 2025-26 applicants.</p>
                  </div>
                </div>
                <Link href="/inquiry" className="mt-10 w-full bg-accent text-foreground py-4 rounded-xl flex items-center justify-center font-black uppercase text-xl transition-all hover:bg-white border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] hover:scale-105 group">
                  Start Your Review
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* TOP RECRUITERS MOCKUP */}
          <div className="mt-24 border-t-4 border-white/10 pt-16">
            <h4 className="text-center font-black uppercase tracking-[0.2em] text-accent mb-12 text-sm">
              Companies Hiring Our 2026 Verified Batch
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-70 grayscale transition-all hover:grayscale-0">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black italic tracking-tighter text-white">Deloitte.</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold tracking-tight text-white border-b-2 border-primary pb-1">KPMG</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-rose-500 tracking-tighter shadow-sm">accenture</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-extrabold tracking-tight text-white">amazon<span className="text-accent"></span></span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white italic">HDFC BANK</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">TATA <span className="text-primary font-normal">MOTORS</span></span>
              </div>
            </div>
            <p className="text-center mt-12 text-gray-500 font-bold italic">
               & More 500+ Global Partners ...
            </p>
          </div>

          {/* PLACEMENT LEADERBOARD 2026 */}
          <div className="mt-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-l-8 border-accent pl-8 gap-6">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-2">2026 Placement Leaderboard</h3>
                <p className="text-gray-400 font-bold text-lg">Top 5 Private B-Schools by Salary Growth & ROI</p>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest text-primary italic">
                Verified Jan 2026
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="p-6 text-sm font-black uppercase tracking-widest text-gray-400">Rank</th>
                            <th className="p-6 text-sm font-black uppercase tracking-widest text-gray-400">College</th>
                            <th className="p-6 text-sm font-black uppercase tracking-widest text-gray-400">Avg. 2026</th>
                            <th className="p-6 text-sm font-black uppercase tracking-widest text-accent">Growth %</th>
                            <th className="p-6 text-sm font-black uppercase tracking-widest text-gray-400">Top Sector</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <tr className="group hover:bg-white/[0.05] transition-colors">
                            <td className="p-6 text-2xl font-black text-primary">#01</td>
                            <td className="p-6 font-bold text-lg">NDIM Delhi</td>
                            <td className="p-6 font-black text-xl">₹12.55 Lakhs</td>
                            <td className="p-6"><span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-black">+18% YoY</span></td>
                            <td className="p-6 font-bold text-gray-400">Consulting</td>
                        </tr>
                        <tr className="group hover:bg-white/[0.05] transition-colors">
                            <td className="p-6 text-2xl font-black text-primary/80">#02</td>
                            <td className="p-6 font-bold text-lg">BIMTECH Gre. Noida</td>
                            <td className="p-6 font-black text-xl">₹11.80 Lakhs</td>
                            <td className="p-6"><span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-black">+14% YoY</span></td>
                            <td className="p-6 font-bold text-gray-400">BFS & Insurance</td>
                        </tr>
                        <tr className="group hover:bg-white/[0.05] transition-colors">
                            <td className="p-6 text-2xl font-black text-primary/60">#03</td>
                            <td className="p-6 font-bold text-lg">Jaipuria Noida</td>
                            <td className="p-6 font-black text-xl">₹9.88 Lakhs</td>
                            <td className="p-6"><span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-black">+12% YoY</span></td>
                            <td className="p-6 font-bold text-gray-400">Digital Marketing</td>
                        </tr>
                        <tr className="group hover:bg-white/[0.05] transition-colors">
                            <td className="p-6 text-2xl font-black text-primary/40">#04</td>
                            <td className="p-6 font-bold text-lg">JIMS Rohini</td>
                            <td className="p-6 font-black text-xl">₹8.50 Lakhs</td>
                            <td className="p-6"><span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-black">+10% YoY</span></td>
                            <td className="p-6 font-bold text-gray-400">Operations</td>
                        </tr>
                        <tr className="group hover:bg-white/[0.05] transition-colors">
                            <td className="p-6 text-2xl font-black text-accent">#05</td>
                            <td className="p-6">
                                <span className="font-bold text-lg block">NIU Noida</span>
                                <span className="text-[10px] uppercase font-black tracking-widest text-primary/70">Rising Star for ROI</span>
                            </td>
                            <td className="p-6 font-black text-xl">₹7.20 Lakhs</td>
                            <td className="p-6"><span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-black">+22% YoY</span></td>
                            <td className="p-6 font-bold text-gray-400">Data Analytics</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section id="news" className="bg-white px-6 py-24 sm:px-12 border-t-8 border-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col sm:flex-row sm:items-end justify-between border-b-8 border-foreground pb-8 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase flex items-center gap-4">
                <Bell className="h-10 w-10 text-primary" strokeWidth={3} />
                Admission News
              </h2>
              <p className="mt-4 text-xl font-medium text-gray-600">
                Flash updates on MBA admissions, entrance exams, and college deadlines.
              </p>
            </div>
            <Link href="/news" className="inline-flex h-14 items-center justify-center rounded-md bg-accent px-8 py-3 text-lg font-bold text-foreground transition-all hover:bg-white hover:scale-105 border-4 border-foreground whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              All News Updates &rarr;
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {NEWS_ITEMS.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl border-4 border-foreground bg-gray-50 p-8 transition-all duration-200 hover:bg-white hover:-translate-y-1 shadow-[6px_6px_0px_0px_rgba(59,130,246,1)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary text-white border-2 border-foreground px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
                    {item.category}
                  </span>
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-black tracking-tight text-foreground mb-4 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed mb-6 line-clamp-2">
                  {item.excerpt}
                </p>
                <Link
                  href="/news"
                  className="inline-flex items-center font-bold text-primary hover:text-foreground transition-colors group-hover:translate-x-1 transition-transform"
                >
                  Open <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ARTICLES SECTION */}
      <section id="articles" className="bg-muted px-6 py-24 sm:px-12 border-t-8 border-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col sm:flex-row sm:items-end justify-between border-b-8 border-foreground pb-8 gap-6">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase flex flex-wrap items-center gap-4">
              Latest Intel
              <span className="text-xl sm:text-2xl font-black bg-primary text-white px-4 py-1 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-tighter -rotate-1">
                {allPostsData.length} Total
              </span>
            </h2>
            <Link href="/blog" className="inline-flex h-14 items-center justify-center rounded-md bg-foreground px-8 py-3 text-lg font-bold text-white transition-all hover:bg-primary hover:scale-105 border-4 border-foreground whitespace-nowrap">
              View All Articles &rarr;
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            {allPostsData.slice(0, 3).map(({ slug, title, date, description }) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group flex flex-col rounded-xl border-4 border-foreground bg-white p-8 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-2 hover:bg-gray-50 h-full"
              >
                <div className="mb-6 inline-block rounded-full bg-accent px-4 py-1 text-sm font-bold uppercase tracking-widest text-foreground border-2 border-foreground self-start">
                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h3 className="font-display text-3xl font-bold tracking-tight text-foreground mb-5 group-hover:text-primary transition-colors line-clamp-3 leading-tight">
                  {title}
                </h3>
                {description && (
                  <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8 line-clamp-3">
                    {description}
                  </p>
                )}
                <div className="mt-auto flex items-center font-bold text-primary group-hover:text-foreground text-lg transition-colors">
                  Read Article
                  <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-2">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
