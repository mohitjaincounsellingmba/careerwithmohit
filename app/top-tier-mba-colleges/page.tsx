import type { Metadata } from "next";
import { TopTierMbaClient } from "@/components/TopTierMbaClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { TOP_TIER_MBA_COLLEGES } from "@/data/topTierMbaColleges";
import { Award, ShieldCheck, TrendingUp, Zap, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Top Tier MBA Colleges in India 2027-28: IIMs, NMAT, SNAP & XAT accepting colleges",
  description: "Compare India's top tier MBA colleges for 2027-28. Explore complete cutoffs, fee structures, and latest audited placement reports for all 20 IIMs, SNAP (SIBM), NMAT (NMIMS), and XAT (XLRI) accepting colleges. Get profile strategy from Mohit Jain.",
  keywords: [
    "top tier mba colleges in india 2027",
    "mba admission 2027",
    "pgdm admission 2027",
    "all iim fees cut off placement 2027",
    "nmat colleges fees and cutoff 2027",
    "snap colleges list and placements 2027",
    "xat accepting colleges list 2027",
    "best business schools india 2027",
    "mba career counselling 2027",
    "degree admission 2027"
  ],
  alternates: {
    canonical: "/top-tier-mba-colleges"
  },
  openGraph: {
    title: "Top Tier MBA Colleges in India 2027-28: IIMs, NMAT, SNAP & XAT",
    description: "Compare verified fees, cutoffs, and placements for all IIMs and elite SNAP, NMAT, and XAT accepting business schools in India for 2027-28.",
    type: "website",
    url: "https://www.careerwithmohit.online/top-tier-mba-colleges"
  }
};

export default function TopTierMbaPage() {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Tier MBA Colleges in India 2027-28",
    "description": "Comprehensive list of all 20 IIMs and premier business schools accepting NMAT, SNAP, and XAT with validated fees and placements.",
    "itemListElement": TOP_TIER_MBA_COLLEGES.map((college, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": college.name,
      "url": college.slug ? `https://www.careerwithmohit.online/${college.slug}` : college.website
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.careerwithmohit.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Top Tier MBA Colleges",
        "item": "https://www.careerwithmohit.online/top-tier-mba-colleges"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which are the top MBA colleges in India for 2027-28 admission?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Tier-1 MBA institutions in India include the top IIMs (IIM Ahmedabad, Bangalore, Calcutta, Lucknow, Kozhikode, and Indore), along with premier private and university institutions such as XLRI Jamshedpur, FMS Delhi, SPJIMR Mumbai, MDI Gurgaon, SIBM Pune, and NMIMS Mumbai. Admission cutoffs range from 95 to 99.5+ percentile in CAT, XAT, NMAT, or SNAP."
        }
      },
      {
        "@type": "Question",
        "name": "What is the expected NMAT score for NMIMS Mumbai in 2027?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For the flagship MBA program at NMIMS School of Business Management (SBM), Mumbai, the expected overall cutoff score is 232+ out of 360 in NMAT by GMAC. Additionally, candidates must clear sectional cutoffs across Language Skills, Quantitative Skills, and Logical Reasoning."
        }
      },
      {
        "@type": "Question",
        "name": "Which top MBA colleges accept the SNAP score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Symbiosis Institute of Business Management (SIBM) Pune and Symbiosis Centre for Management and Human Resource Development (SCMHRD) Pune are the two flagship institutes accepting SNAP. Expected cutoffs for SIBM Pune are ~98.5+ percentile, and for SCMHRD Pune ~96+ percentile."
        }
      },
      {
        "@type": "Question",
        "name": "What are the fees and average placement package for IIM Ahmedabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The total program fee for the 2-Year PGP (MBA) at IIM Ahmedabad is approximately ₹26.5 Lakhs. According to the latest audited placement report, the average placement package stands at ₹35.22 LPA, while the highest domestic package reached ₹1.15 Crore."
        }
      },
      {
        "@type": "Question",
        "name": "How do I choose between an IIM and top private B-Schools like XLRI, SPJIMR, or MDI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While older IIMs (IIM A, B, C) offer unmatched brand equity, flagship private colleges like XLRI Jamshedpur (unrivaled in HR and elite in BM), SPJIMR Mumbai (profile-based calls and excellent ROI), and FMS Delhi (₹2 Lakh fee with ₹34+ LPA average package) equal or exceed several new and baby IIMs in corporate recognition, ROI, and recruiter diversity."
        }
      },
      {
        "@type": "Question",
        "name": "What profile is required to get a call from IIM A, B, C or FMS Delhi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IIM Ahmedabad, Bangalore, and Calcutta use a composite score comprising your CAT percentile (usually 99.2+ for General category), 10th/12th/Graduation academic marks, academic diversity (non-engineering bonus), and work experience. FMS Delhi weighs verbal ability heavily in CAT and has no sectional cutoff restrictions for interview shortlisting."
        }
      },
      {
        "@type": "Question",
        "name": "Which MBA colleges offer the highest Return on Investment (ROI) in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FMS Delhi offers the highest ROI in India, with a total 2-year fee of roughly ₹2 Lakhs against an average placement of ₹34.1 LPA. Other exceptional ROI institutions include JBIMS Mumbai, TISS Mumbai (HRM & LR), and DFS/DBE Delhi University."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get into a top Tier-1 B-School with average past academic scores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Several top institutes place lower or zero weightage on past 10th/12th academic records once you clear their entrance test cutoff. Examples include XLRI Jamshedpur (via XAT), FMS Delhi, MDI Gurgaon, NMIMS Mumbai (via NMAT), and SIBM Pune (via SNAP)."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={listSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* ── STUNNING OBSIDIAN EDITORIAL HERO ── */}
      <div className="bg-slate-950 text-white border-b-8 border-foreground pt-12 pb-20 px-6 relative overflow-hidden">
        {/* Decorative Grid & Light Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8">
            <Breadcrumbs />
          </div>

          {/* Top Announcement Tag */}
          <div className="inline-flex items-center gap-2 bg-slate-900 border-2 border-slate-700 px-4 py-1.5 mb-8 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-200">
              INDIA&apos;S ELITE B-SCHOOL DIRECTORY • 2027-28 INTAKE
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-6">
              Top Tier <br />
              <span className="text-accent italic underline decoration-4 md:decoration-8 underline-offset-4 decoration-primary">
                MBA Colleges
              </span>{" "}
              In India.
            </h1>
            <p className="text-lg md:text-xl font-bold text-slate-300 border-l-4 border-accent pl-5 mb-10 leading-relaxed max-w-3xl">
              Explore the definitive, verified ranking of all <span className="text-white underline decoration-2">20 IIMs</span>, premier <span className="text-white underline decoration-2">XAT (XLRI)</span> colleges, <span className="text-white underline decoration-2">NMAT (NMIMS)</span> universities, and <span className="text-white underline decoration-2">SNAP (SIBM)</span> flagship B-schools. Compare fees, cutoffs, and audited placement stats.
            </p>

            {/* Hero Quick Jump & Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                ⚡ Quick Filters:
              </span>
              <span className="bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs font-black uppercase text-amber-300 flex items-center gap-1.5">
                👑 All 20 IIMs
              </span>
              <span className="bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs font-black uppercase text-rose-300 flex items-center gap-1.5">
                🎯 NMAT Top Tier
              </span>
              <span className="bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs font-black uppercase text-blue-300 flex items-center gap-1.5">
                💎 SNAP Flagships
              </span>
              <span className="bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs font-black uppercase text-purple-300 flex items-center gap-1.5">
                ⚡ XAT Elite
              </span>
            </div>
          </div>

          {/* 4-Card Executive Stats Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-10 border-t-2 border-slate-800">
            <div className="bg-slate-900/90 border-2 border-slate-700 p-5 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              <Award className="w-6 h-6 text-accent mb-2" />
              <div className="text-2xl md:text-3xl font-black text-white">20 IIMs</div>
              <p className="text-xs font-bold text-slate-400 uppercase mt-1">
                Ahmedabad to Jammu
              </p>
            </div>

            <div className="bg-slate-900/90 border-2 border-slate-700 p-5 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              <TrendingUp className="w-6 h-6 text-emerald-400 mb-2" />
              <div className="text-2xl md:text-3xl font-black text-white">₹1.20 Cr+</div>
              <p className="text-xs font-bold text-emerald-400 uppercase mt-1">
                Highest Audited Pkg
              </p>
            </div>

            <div className="bg-slate-900/90 border-2 border-slate-700 p-5 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              <Zap className="w-6 h-6 text-blue-400 mb-2" />
              <div className="text-2xl md:text-3xl font-black text-white">4 Exams</div>
              <p className="text-xs font-bold text-slate-400 uppercase mt-1">
                CAT • XAT • NMAT • SNAP
              </p>
            </div>

            <div className="bg-slate-900/90 border-2 border-slate-700 p-5 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              <ShieldCheck className="w-6 h-6 text-accent mb-2" />
              <div className="text-2xl md:text-3xl font-black text-white">100% Audit</div>
              <p className="text-xs font-bold text-slate-400 uppercase mt-1">
                Verified NIRF &amp; Fee Data
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Directory & Component Content */}
      <TopTierMbaClient />
    </div>
  );
}
