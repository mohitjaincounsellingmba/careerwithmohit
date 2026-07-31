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
    "Noida", "Ghaziabad", "Pune", "Mumbai", "Bangalore", "Jaipur", "Delhi NCR"
  ],
  alternates: {
    canonical: "/",
  },
};

import { DynamicHeroText } from '@/components/DynamicHeroText';

export default function Home() {
  const allPostsData = getSortedPostsData();
    // Search functionality moved to HomeSearch component

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
            <span className="bg-accent text-foreground px-4 py-1 inline-block mt-4 -rotate-2 border-4 border-foreground">Admission 2027</span>
          </h1>
          <div className="mt-8 flex justify-center">
            <HomeSearch />
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-xl font-bold leading-relaxed text-blue-50">
            Expert career counselling, interview preparation, and bold strategies to help you dominate your professional goals.
          </p>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="https://wa.me/919560020771" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto rounded-md bg-foreground px-8 py-4 text-xl font-bold text-white transition-all hover:scale-105 hover:bg-gray-800 border-4 border-foreground text-center flex items-center justify-center gap-2">
              Connect on WhatsApp
            </a>
            <Link href="#services" prefetch={false} className="w-full sm:w-auto rounded-md bg-transparent px-8 py-4 text-xl font-bold text-white transition-all hover:bg-white hover:text-primary border-4 border-white text-center">
              View Our Services
            </Link>
            <Link href="/inquiry" prefetch={false} className="w-full sm:w-auto rounded-md bg-accent px-8 py-4 text-xl font-black text-foreground transition-all hover:scale-105 hover:bg-white border-4 border-foreground text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
                Admission 2027 <span className="text-primary tracking-tighter italic">Strategic Hub</span>
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
                <Link
                  key={idx}
                  href={service.href}
                  prefetch={false}
                  className={`group relative overflow-hidden rounded-xl border-4 border-foreground ${service.color} p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full`}
                >
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rotate-45 bg-foreground/5 transition-transform group-hover:rotate-90 group-hover:bg-foreground/10" />
                  
                  <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white border-4 border-foreground transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-accent">
                    <Icon className={`h-8 w-8 ${service.accent} group-hover:text-foreground`} strokeWidth={2.5} />
                  </div>
                  
                  <h3 className="font-display text-2xl font-black tracking-tight text-foreground mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-base font-bold text-gray-700 leading-relaxed italic mb-8">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t-2 border-foreground/10">
                    <span className="text-xs font-black uppercase tracking-widest text-foreground/60 group-hover:text-primary transition-colors">
                      Consult Now
                    </span>
                    <ArrowRight className="h-5 w-5 text-foreground transition-transform group-hover:translate-x-2" strokeWidth={3} />
                  </div>
                </Link>
              );
            })}
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
            <Link href="/news" prefetch={false} className="inline-flex h-14 items-center justify-center rounded-md bg-accent px-8 py-3 text-lg font-bold text-foreground transition-all hover:bg-white hover:scale-105 border-4 border-foreground whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
                  href={item.link}
                  prefetch={false}
                  className="inline-flex items-center font-bold text-primary hover:text-foreground transition-colors group-hover:translate-x-1 transition-transform"
                >
                  Open <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* NEW TOP TIER MBA COLLEGES SECTION */}
      <section id="top-tier-mba" className="bg-slate-50 px-6 py-24 sm:px-12 border-t-8 border-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-32 -mt-32 blur-2xl" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-20 md:flex md:items-end md:justify-between border-b-8 border-foreground pb-8">
            <div className="max-w-2xl">
              <span className="bg-accent text-foreground px-5 py-2 text-sm font-black uppercase tracking-widest inline-block border-4 border-foreground mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                MBA / PGDM ADMISSIONS 2027
              </span>
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase leading-none">
                Top Tier <span className="text-primary italic">MBA</span> Colleges
              </h2>
              <p className="mt-4 text-xl font-bold text-gray-600">
                Explore fee structures, cut-offs, and audited placements for premier Indian B-Schools.
              </p>
            </div>
            <Link href="/top-tier-mba-colleges" prefetch={false} className="mt-8 md:mt-0 inline-flex items-center text-lg font-black uppercase text-primary hover:text-foreground transition-colors group">
              View MBA Directory
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "All 20 IIMs",
                description: "IIM Ahmedabad, Bangalore, Calcutta, and new/baby IIMs.",
                badge: "CAT 90-99.5+ %ile",
                color: "bg-blue-50",
                link: "/top-tier-mba-colleges?tab=iim",
                stats: "Avg Package up to ₹35 LPA"
              },
              {
                name: "NMAT Colleges",
                description: "NMIMS Mumbai, Bangalore, K J Somaiya, and other elite institutes.",
                badge: "200-232+ Score",
                color: "bg-emerald-50",
                link: "/top-tier-mba-colleges?tab=nmat",
                stats: "Avg Package up to ₹26 LPA"
              },
              {
                name: "SNAP Colleges",
                description: "SIBM Pune, SCMHRD, and top Symbiosis university business schools.",
                badge: "80-98.5+ %ile",
                color: "bg-rose-50",
                link: "/top-tier-mba-colleges?tab=snap",
                stats: "Avg Package up to ₹26.7 LPA"
              },
              {
                name: "XAT Accepting",
                description: "XLRI Jamshedpur, SPJIMR, IMT Ghaziabad, GIM Goa, and more.",
                badge: "75-95+ %ile",
                color: "bg-purple-50",
                link: "/top-tier-mba-colleges?tab=xat",
                stats: "Avg Package up to ₹32.7 LPA"
              }
            ].map((category, idx) => (
              <Link 
                key={idx} 
                href={category.link}
                prefetch={false}
                className={`group relative flex flex-col justify-between h-64 rounded-xl border-4 border-foreground ${category.color} p-6 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
              >
                <div>
                  <span className="inline-block bg-white border-2 border-foreground px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    {category.badge}
                  </span>
                  <h3 className="font-display text-2xl font-black text-foreground leading-tight group-hover:text-primary transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 leading-snug line-clamp-3">
                    {category.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-foreground/10 flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {category.stats}
                  </span>
                  <div className="flex items-center text-xs font-black uppercase text-gray-800 tracking-wider group-hover:text-primary transition-colors">
                    Compare Now <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDED COACHING APP PROMO BANNER FOR TEACHERS & CREATORS */}
      <section className="bg-foreground text-white px-6 py-16 sm:px-12 border-t-8 border-accent">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="bg-accent text-foreground px-4 py-1.5 font-black uppercase text-xs border-2 border-foreground inline-block mb-3">
              FOR TEACHERS & YOUTUBERS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase leading-none">
              Sell Your Coaching <span className="text-accent italic">Online</span>
            </h2>
            <p className="mt-3 text-lg font-bold text-gray-300 max-w-2xl">
              Launch your own branded Android & iOS coaching app in 7 days. Keep 100% of your course revenue with 0% commission & anti-piracy security.
            </p>
          </div>
          <Link
            href="/sell-your-coaching-online"
            prefetch={false}
            className="flex-shrink-0 bg-accent text-foreground hover:bg-white px-8 py-4 text-xl font-black uppercase rounded-xl border-4 border-white transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
          >
            Launch Branded App &rarr;
          </Link>
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
            <Link href="/blog" prefetch={false} className="inline-flex h-14 items-center justify-center rounded-md bg-foreground px-8 py-3 text-lg font-bold text-white transition-all hover:bg-primary hover:scale-105 border-4 border-foreground whitespace-nowrap">
              View All Articles &rarr;
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            {allPostsData.slice(0, 3).map(({ slug, title, date, description }) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                prefetch={false}
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
