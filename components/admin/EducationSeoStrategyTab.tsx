"use client";

import { useState, useMemo } from "react";
import {
  Sparkles,
  Target,
  FileText,
  Search,
  Zap,
  Globe,
  Award,
  TrendingUp,
  CheckCircle2,
  Copy,
  Check,
  Lightbulb,
  Layers,
  ArrowUpRight,
  RefreshCw,
  BarChart3,
  ListChecks,
  Edit3,
  Info,
  X,
  Plus,
  Trash2,
  Download,
  Filter,
  GraduationCap,
  MapPin,
  Users,
  Compass,
  Briefcase,
  HelpCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
  Flame,
  CheckSquare
} from "lucide-react";

interface EducationSeoStrategyTabProps {
  blogs?: any[];
  colleges?: any[];
  summary?: any;
}

// Preset Exam Strategies for Education Consultants
const EXAM_CAMPAIGN_STRATEGIES = [
  {
    id: "cat-2026-2027",
    exam: "CAT 2026 & 2027 (Common Admission Test)",
    badge: "Highest Traffic & Prestige",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    season: "Mar - Nov: Preparation & Mocks | Dec - Mar: Cutoffs & IIM PI Shortlists",
    leadIntentScore: 94,
    monthlySearches: "1.2M+ Monthly Searches (Pan-India)",
    targetKeywords: [
      { kw: "cat 2026 preparation strategy without coaching", volume: "18.1K", intent: "Commercial / High Intent", difficulty: "Medium" },
      { kw: "cat 2027 syllabus pdf and section-wise weightage", volume: "22.4K", intent: "Informational", difficulty: "Low" },
      { kw: "iim composite score calculator 2026-2027", volume: "14.5K", intent: "Tool / High Conversion", difficulty: "Low-Med" },
      { kw: "best mba colleges for 80-85 percentile in cat", volume: "27.8K", intent: "Direct Lead Magnet", difficulty: "Medium" },
      { kw: "cat exam direct admission management quota reality", volume: "9.2K", intent: "Bottom of Funnel / Direct Call", difficulty: "Low" }
    ],
    funnelBlueprint: {
      leadMagnet: "Free CAT Percentile vs B-School Call Predictor + GD-PI Shortlist PDF",
      consultantCTA: "Book Free 1-on-1 Profile Evaluation (IIMs vs Tier-1 Non-IIM Alternatives)",
      internalLinks: ["/tools/cat-score-calculator", "/cat-mock-test", "/top-tier-mba-colleges"],
      recommendedPostTitle: "CAT 2026-2027 Complete Blueprint: Target Percentile vs Realistic College Calls (IIMs, FMS, MDI, SPJIMR)"
    }
  },
  {
    id: "xat-2027",
    exam: "XAT 2027 (Xavier Aptitude Test)",
    badge: "Top Tier Non-IIM Candidates",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    season: "Jul - Jan: Decision Making & Mocks | Jan - Apr: XLRI & Associate Calls",
    leadIntentScore: 91,
    monthlySearches: "650K+ Monthly Searches",
    targetKeywords: [
      { kw: "xat 2027 decision making previous year solved papers", volume: "14.2K", intent: "High Engagement", difficulty: "Low" },
      { kw: "top colleges accepting xat score 70 to 80 percentile", volume: "19.6K", intent: "Direct Lead Magnet", difficulty: "Medium" },
      { kw: "xlri jamshedpur cutoff 2027 bm vs hrm", volume: "12.8K", intent: "Commercial", difficulty: "Medium" },
      { kw: "xat vs cat difficulty level and score conversion", volume: "16.4K", intent: "Comparison / Informational", difficulty: "Low" }
    ],
    funnelBlueprint: {
      leadMagnet: "XAT Decision Making 5-Year Solved Caselet PDF + Cutoff Matrix",
      consultantCTA: "Chat with Mohit Jain: Top 15 Colleges Accepting XAT with 70-90%ile",
      internalLinks: ["/xat-mock-test", "/mba-pgdm-admission-2027", "/colleges"],
      recommendedPostTitle: "XAT 2027 Preparation Guide: Master Decision Making & Target Top 20 Non-IIM Colleges"
    }
  },
  {
    id: "snap-2026",
    exam: "SNAP 2026 (Symbiosis National Aptitude Test)",
    badge: "Fast Conversion / Speed Test",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    season: "Aug - Dec: Registration & Speed Drills | Jan - Feb: GE-PI-WAT",
    leadIntentScore: 96,
    monthlySearches: "480K+ Monthly Searches",
    targetKeywords: [
      { kw: "snap 2026 speed accuracy strategy sibm pune 60 minutes", volume: "11.2K", intent: "High Intent", difficulty: "Low" },
      { kw: "sibm pune vs scmhrd cutoff and placement 2026-27", volume: "15.9K", intent: "Commercial", difficulty: "Medium" },
      { kw: "snap exam colleges percentile cutoff list 2026", volume: "24.1K", intent: "Direct Lead Magnet", difficulty: "Medium" },
      { kw: "symbiosis direct admission management quota fee structure", volume: "8.4K", intent: "Direct Inquiries / High ROI", difficulty: "Low" }
    ],
    funnelBlueprint: {
      leadMagnet: "SNAP 60-Minute 60-Question Mock Test with Real-Time Speed Telemetry",
      consultantCTA: "Get Symbiosis Cutoff Shortlist: SIBM Pune, SCMHRD, SIBM Bangalore, SIOM",
      internalLinks: ["/snap-mock-test", "/colleges", "/inquiry"],
      recommendedPostTitle: "SNAP 2026 Speed & Accuracy Blueprint: SIBM Pune 98.5+ Percentile Roadmap"
    }
  },
  {
    id: "nmat-2026",
    exam: "NMAT by GMAC (NMIMS & Top PGDM)",
    badge: "Adaptive Window Test",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    season: "Aug - Dec: 70-Day Testing Window | Jan - Mar: NMIMS CD-PI",
    leadIntentScore: 93,
    monthlySearches: "520K+ Monthly Searches",
    targetKeywords: [
      { kw: "nmat 2026 expected cutoff nmims mumbai k j somaiya", volume: "21.3K", intent: "High Intent", difficulty: "Medium" },
      { kw: "nmat colleges list score 200 to 230", volume: "18.7K", intent: "Direct Lead Magnet", difficulty: "Low" },
      { kw: "nmims mumbai mba direct admission management quota fees", volume: "9.8K", intent: "Bottom of Funnel", difficulty: "Low" },
      { kw: "nmat 3 attempts strategy score maximization", volume: "12.1K", intent: "Informational", difficulty: "Low" }
    ],
    funnelBlueprint: {
      leadMagnet: "NMAT Score 200-240 College Matching Table + Sectional Timer Strategy",
      consultantCTA: "Book Profile Review for NMIMS Mumbai, Bangalore, Hyderabad & KJ Somaiya",
      internalLinks: ["/nmat-mock-test", "/colleges", "/mba-pgdm-admission-2027"],
      recommendedPostTitle: "NMAT 2026 Strategy Guide: NMIMS Mumbai Cutoffs, Score Windows & College Matrix"
    }
  },
  {
    id: "executive-online-mba",
    exam: "Executive MBA & Online MBA for Working Professionals",
    badge: "Highest Fee / Highest Ticket Lead",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    season: "Year-Round Continuous Admissions (Jan / Jul / Sep Batches)",
    leadIntentScore: 98,
    monthlySearches: "340K+ High Net Worth Searches",
    targetKeywords: [
      { kw: "executive mba for working professionals in india without cat", volume: "16.8K", intent: "High Ticket Commercial", difficulty: "Medium" },
      { kw: "online mba vs executive mba roi salary hike comparison", volume: "14.2K", intent: "Commercial", difficulty: "Low-Med" },
      { kw: "iim executive mba 1 year fees eligibility placement", volume: "22.5K", intent: "High Intent", difficulty: "Medium" },
      { kw: "ugc aicte entitled online mba colleges with placement support", volume: "11.9K", intent: "Direct Lead Magnet", difficulty: "Low" }
    ],
    funnelBlueprint: {
      leadMagnet: "Executive vs Online MBA Decision Matrix (ROI, Weekend Format, Salary Hikes)",
      consultantCTA: "Schedule Private Career Transition Call with Mohit Jain",
      internalLinks: ["/online-degree-certification", "/services", "/inquiry"],
      recommendedPostTitle: "Executive MBA for Working Professionals (2026-2027): 1-Year vs 2-Year ROI Analysis"
    }
  },
  {
    id: "cmat-mat-atma",
    exam: "CMAT, MAT & ATMA (Top ROI PGDM Colleges)",
    badge: "High Volume Aspirant Base",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    season: "Jan - May: Spring/Summer Admissions & GD-PI Rounds",
    leadIntentScore: 95,
    monthlySearches: "720K+ Searches Across Tier-2/3 Cities",
    targetKeywords: [
      { kw: "top pgdm colleges accepting cmat 70-80 percentile with good placements", volume: "28.4K", intent: "Direct Lead Magnet", difficulty: "Low" },
      { kw: "mat exam colleges under 10 lakhs fees delhi ncr pune", volume: "21.6K", intent: "Commercial / High Intent", difficulty: "Low" },
      { kw: "cmat 2026 score vs percentile and college cutoff list", volume: "31.2K", intent: "High Volume", difficulty: "Medium" }
    ],
    funnelBlueprint: {
      leadMagnet: "List of 50+ AICTE Approved PGDM Colleges with Average Package ₹8-14 LPA",
      consultantCTA: "Get 100% Free Admission Guidance & Fee Waiver Assistance",
      internalLinks: ["/mat-mock-test", "/atma-mock-test", "/colleges"],
      recommendedPostTitle: "Top 30 PGDM Colleges Under 10 Lakhs Accepting CMAT/MAT with ₹9+ LPA Average Salary"
    }
  }
];

// Geo-Admissions SEO Strategies
const GEO_ADMISSION_STRATEGIES = [
  {
    city: "Delhi NCR (Gurgaon / Noida / Greater Noida)",
    share: "34% of Leads",
    collegesCount: "120+ Top B-Schools",
    keyHighlights: "MDI Gurgaon, IMT Ghaziabad, FORE, LBSIM, BIMTECH, Jaipuria, Lloyd, GL Bajaj",
    topKeywords: [
      "top pgdm colleges in delhi ncr under 10 lakhs fees",
      "mba admission without cat in greater noida top colleges",
      "imt ghaziabad vs mdi gurgaon vs fore school comparison 2026",
      "direct admission in top mba colleges in gurgaon noida"
    ],
    seoActionItem: "Publish comparative placement reports with verified recruiters & median salaries."
  },
  {
    city: "Mumbai & Pune (Maharashtra Hub)",
    share: "32% of Leads",
    collegesCount: "140+ Management Institutes",
    keyHighlights: "JBIMS, SPJIMR, SIBM Pune, SCMHRD, KJ Somaiya, Welingkar, NIBM, PIBM, Balaji",
    topKeywords: [
      "top mba colleges in pune with 100 percent placement record",
      "k j somaiya mba fees structure and cutoff 2026-27",
      "mhcet mba top colleges cutoff list cap rounds 2026",
      "mba in mumbai direct admission management quota fees"
    ],
    seoActionItem: "Highlight ROI (Fees vs Average Package) and specialization strengths (Finance in Mumbai, Ops/Marketing in Pune)."
  },
  {
    city: "Bangalore & South India Hub",
    share: "18% of Leads",
    collegesCount: "90+ Institutes",
    keyHighlights: "IIM Bangalore, SIBM Bangalore, TAPMI, Alliance, XIME, Christ University, IFIM",
    topKeywords: [
      "top pgdm colleges in bangalore for business analytics and tech",
      "christ university mba selection process micro presentation tips",
      "tapmi manipal vs sibm bangalore fees and placement report",
      "executive mba in bangalore for software engineers weekend"
    ],
    seoActionItem: "Target Tech-to-Management aspirants with Business Analytics, Fintech & Product Management angles."
  },
  {
    city: "Tier-2/3 Aspirant Market (Jaipur, Lucknow, Ahmedabad, Indore, Patna)",
    share: "16% of Leads",
    collegesCount: "Pan-India Reach",
    keyHighlights: "Relocation Aspirants seeking Top Metro PGDM with ROI & Hostel facilities",
    topKeywords: [
      "best mba colleges in india with affordable fees and hostel",
      "how to get 100 percent education loan for mba pgdm without collateral",
      "cmat mat colleges in delhi pune for tier 2 students"
    ],
    seoActionItem: "Provide clear education loan, scholarship, hostel, and career placement mentorship guides."
  }
];

// Education Consultant Keyword Priority Funnel
const STRATEGY_KEYWORD_FUNNEL = [
  {
    stage: "Bottom of Funnel (Direct Leads / High Conversion)",
    intent: "Transactional / Direct Consulting",
    avgCvr: "7.8% Conversion to WhatsApp / Call",
    keywords: [
      { term: "direct mba admission in top pgdm colleges without entrance exam", diff: "Low", vol: "8.9K", target: "/inquiry" },
      { term: "profile evaluation for iim calls cat 85 percentile", diff: "Low", vol: "6.2K", target: "/services" },
      { term: "mohit jain education consultant mba admission guidance contact", diff: "Low", vol: "3.4K", target: "/about" },
      { term: "mba college fee concession and scholarship eligibility 2026", diff: "Low-Med", vol: "9.5K", target: "/colleges" },
      { term: "best pgdm college under 8 lakhs with 8 lpa average package", diff: "Low", vol: "14.2K", target: "/colleges" }
    ]
  },
  {
    stage: "Middle of Funnel (Comparison & Evaluation)",
    intent: "Commercial Investigation",
    avgCvr: "4.2% Conversion to Mock Test / Inquiry",
    keywords: [
      { term: "imt ghaziabad vs fore vs lbsim pgdm placement comparison", diff: "Medium", vol: "18.6K", target: "/blog" },
      { term: "soil gurgaon 1 year pgpm vs 2 year pgdm roi fees", diff: "Low", vol: "7.8K", target: "/colleges" },
      { term: "snap vs nmat which exam is easier for 15 lpa mba", diff: "Low-Med", vol: "11.4K", target: "/blog" },
      { term: "kj somaiya mba vs welingkar mumbai cutoff and fees", diff: "Medium", vol: "16.1K", target: "/colleges" },
      { term: "executive mba iim ahmedabad vs isb hyderabad eligibility", diff: "Medium", vol: "12.8K", target: "/blog" }
    ]
  },
  {
    stage: "Top of Funnel (Exam Discovery & Syllabus)",
    intent: "High Volume Discovery",
    avgCvr: "1.9% Conversion to Lead (Builds Authority & Retargeting)",
    keywords: [
      { term: "cat 2026 syllabus pdf download section wise weightage", diff: "Medium", vol: "42.0K", target: "/cat-mock-test" },
      { term: "xat 2027 decision making previous year questions with answers", diff: "Low-Med", vol: "22.5K", target: "/xat-mock-test" },
      { term: "free mba mock test with sectional timer and percentile", diff: "Low", vol: "31.0K", target: "/mock-tests" },
      { term: "gmat focus edition scoring chart and percentile table 2026", diff: "Low", vol: "15.3K", target: "/gmat-mock-test" }
    ]
  }
];

// Competitor Gap Analysis for Education Consulting
const COMPETITOR_GAPS = [
  {
    competitor: "Shiksha.com & Collegedunia",
    weakness: "Generic automated aggregator data; no personalized 1-on-1 human guidance; outdated fee figures from 2023-2024.",
    ourAdvantage: "Direct personal mentorship with Mohit Jain; verified 2026-2027 real fee & placement RTI data; instant WhatsApp callback.",
    actionStrategy: "Incorporate 'Real Ground Reality 2026 vs Listed College Claims' comparison tables in every college review."
  },
  {
    competitor: "MBAUniverse & Pagalguy",
    weakness: "Forum clutter, ad bombardment, complex user journey with slow mobile response.",
    ourAdvantage: "Zero-clutter high-speed Next.js platform; interactive CAT/SNAP/NMAT Mock Test engines; instant percentile calculators.",
    actionStrategy: "Embed interactive mini-mock widgets & score calculators inside high-intent blog posts to boost dwell time."
  },
  {
    competitor: "Large Coaching Institutes (TIME / IMS / Career Launcher)",
    weakness: "Focus exclusively on Top 10 IIMs; ignore 80% of students scoring between 50-85 percentile.",
    ourAdvantage: "Specialized in 50-90 percentile segment: unlocking top tier-2 PGDM colleges with ₹10-18 LPA average salaries.",
    actionStrategy: "Dominate 'Best Colleges for 70-85 percentile in CAT/XAT/CMAT' keyword clusters to capture high-volume underserved students."
  }
];

export function EducationSeoStrategyTab({ blogs = [], colleges = [], summary }: EducationSeoStrategyTabProps) {
  const [activeSubSection, setActiveSubSection] = useState<"generator" | "campaigns" | "geo" | "competitor" | "funnel">("generator");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Strategy Generator Interactive State
  const [targetExam, setTargetExam] = useState("CAT 2026-2027");
  const [targetRegion, setTargetRegion] = useState("Delhi NCR & Greater Noida");
  const [targetPersona, setTargetPersona] = useState("Mid-Percentile Aspirants (65-85%ile)");
  const [targetDegree, setTargetDegree] = useState("2-Year PGDM / MBA");
  const [targetBudget, setTargetBudget] = useState("₹8 Lakhs - ₹15 Lakhs");
  const [leadObjective, setLeadObjective] = useState("Direct WhatsApp & 1-on-1 Profile Assessment");

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Generate dynamic actionable strategy based on selected options
  const generatedStrategy = useMemo(() => {
    const slug = `${targetExam.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${targetRegion.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-admission-guide-2027`;
    
    const h1Title = `${targetExam} Selection Blueprint: Best ${targetDegree} Colleges in ${targetRegion} for ${targetPersona}`;
    
    const metaDescription = `Complete 2026-2027 guide to ${targetExam} admissions in ${targetRegion}. Discover top ${targetDegree} colleges under ${targetBudget}, realistic cutoffs & book free profile evaluation with Mohit Jain.`;
    
    const keywords = [
      `${targetExam.toLowerCase()} colleges in ${targetRegion.toLowerCase().split('&')[0].trim()}`,
      `best ${targetDegree.toLowerCase()} colleges ${targetRegion.toLowerCase().split('&')[0].trim()} under ${targetBudget.split('-')[0].trim()}`,
      `top b schools for ${targetPersona.toLowerCase().replace(/[()]/g, '')}`,
      `${targetExam.toLowerCase()} cutoff and fees structure 2026-27`,
      `direct admission guidance education consultant ${targetRegion.toLowerCase().split('&')[0].trim()}`
    ];

    const outline = [
      `## 1. Executive Overview: ${targetExam} Admission Landscape (2026-2027)`,
      `## 2. Realistic Cutoff Matrix vs College Tier Mapping (${targetPersona})`,
      `## 3. Top ${targetDegree} Colleges in ${targetRegion} (Fees: ${targetBudget} vs ROI)`,
      `## 4. Specialization Selection: Finance vs Marketing vs Business Analytics`,
      `## 5. Selection Process: GD-PI-WAT Preparation & Profile Weightage`,
      `## 6. How to Avoid Common Admission Mistakes & Direct Admission Guidance`,
      `## 7. Frequently Asked Questions (FAQs) for ${targetExam} Candidates`
    ];

    const ctaText = `### 🎯 Need Direct Guidance for ${targetExam} & Top Colleges in ${targetRegion}?
Connect directly with **Mohit Jain**, Senior MBA Admissions Consultant. Get your profile evaluated, unlock scholarship options, and secure admission in AICTE-approved top B-schools.
- **WhatsApp Direct**: [+91 92898 87788](https://wa.me/919289887788)
- **Book 1-on-1 Profile Call**: [careerwithmohit.online/inquiry](/inquiry)
- **Practice Mock Exam**: [Free ${targetExam} Mock Test](/mock-tests)`;

    const markdownDraft = `---
title: "${h1Title}"
description: "${metaDescription}"
date: "${new Date().toISOString().split('T')[0]}"
category: "MBA & PGDM"
tags: ["${targetExam}", "MBA Admissions", "${targetRegion.split('&')[0].trim()}", "PGDM 2027", "Career Guidance"]
author: "Mohit Jain"
---

# ${h1Title}

${metaDescription}

---

${outline.join('\n\n')}

---

${ctaText}
`;

    return {
      slug,
      h1Title,
      metaDescription,
      keywords,
      outline,
      ctaText,
      markdownDraft
    };
  }, [targetExam, targetRegion, targetPersona, targetDegree, targetBudget, leadObjective]);

  return (
    <div className="space-y-8 font-body">
      {/* Consultant Strategy Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/40 border border-amber-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Education Consultant SEO & Lead Command Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Education SEO Strategy & Lead Funnel System
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Tailored specifically for MBA & Higher Education Consulting (CareerWithMohit). Build data-driven SEO campaigns for CAT, XAT, SNAP, NMAT, Executive MBA, regional hubs, and high-converting consultation lead magnets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center min-w-[120px]">
              <div className="text-xl font-black text-amber-400">{summary?.totalBlogs || 5109}</div>
              <div className="text-[11px] text-slate-400 font-medium">Indexed Posts</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center min-w-[120px]">
              <div className="text-xl font-black text-emerald-400">{summary?.totalColleges || 654}</div>
              <div className="text-[11px] text-slate-400 font-medium">College Hubs</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center min-w-[120px]">
              <div className="text-xl font-black text-blue-400">9 Exams</div>
              <div className="text-[11px] text-slate-400 font-medium">Live Mock Hubs</div>
            </div>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: "generator", label: "🎯 Strategy & Outline Generator", icon: Sparkles },
            { id: "campaigns", label: "🏆 Exam Campaign Hub (CAT/XAT/SNAP)", icon: Award },
            { id: "geo", label: "📍 City & Geo-Admissions SEO", icon: MapPin },
            { id: "funnel", label: "📈 High-Intent Keyword Funnel", icon: TrendingUp },
            { id: "competitor", label: "⚔️ Competitor Gap Matrix", icon: Flame },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubSection(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25"
                    : "bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-SECTION 1: Interactive Strategy & Content Generator */}
      {activeSubSection === "generator" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Form */}
            <div className="lg:col-span-5 rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Strategy Generator</h3>
                    <p className="text-xs text-slate-400">Configure parameters for Education SEO</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Instant Output
                </span>
              </div>

              {/* Target Exam */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Target Exam / Entrance</label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option>CAT 2026-2027</option>
                  <option>XAT 2027</option>
                  <option>SNAP 2026</option>
                  <option>NMAT by GMAC 2026</option>
                  <option>CMAT & MAT 2026</option>
                  <option>GMAT Focus Edition</option>
                  <option>Executive MBA (Working Professionals)</option>
                  <option>Online MBA & UGC Entitled</option>
                  <option>Direct Admission / Management Quota</option>
                </select>
              </div>

              {/* Target Region */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Target Location / Hub</label>
                <select
                  value={targetRegion}
                  onChange={(e) => setTargetRegion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option>Delhi NCR & Greater Noida</option>
                  <option>Mumbai & Pune (Maharashtra)</option>
                  <option>Bangalore & South India Hub</option>
                  <option>Hyderabad & Telangana</option>
                  <option>Ahmedabad & Gujarat</option>
                  <option>Jaipur & North India Tier-2</option>
                  <option>Pan-India National Aspirants</option>
                  <option>Study Abroad (USA/UK/Germany/Australia)</option>
                </select>
              </div>

              {/* Aspirant Persona */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Target Student Persona</label>
                <select
                  value={targetPersona}
                  onChange={(e) => setTargetPersona(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option>Mid-Percentile Aspirants (65-85%ile)</option>
                  <option>Top Percentile Achievers (90-99%ile)</option>
                  <option>Low Percentile / Non-CAT Aspirants (Below 60%ile)</option>
                  <option>Working Professionals (2 to 7+ Years Experience)</option>
                  <option>Fresh Graduates (BBA / B.Tech / B.Com final year)</option>
                </select>
              </div>

              {/* Budget & Fee Tier */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Degree</label>
                  <select
                    value={targetDegree}
                    onChange={(e) => setTargetDegree(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    <option>2-Year PGDM / MBA</option>
                    <option>1-Year Executive MBA</option>
                    <option>Online UGC-DEB MBA</option>
                    <option>Global MBA / Dual Degree</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Fee Budget Tier</label>
                  <select
                    value={targetBudget}
                    onChange={(e) => setTargetBudget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    <option>₹5 Lakhs - ₹8 Lakhs</option>
                    <option>₹8 Lakhs - ₹15 Lakhs</option>
                    <option>₹15 Lakhs - ₹25 Lakhs</option>
                    <option>Affordable / Loan-Supported</option>
                  </select>
                </div>
              </div>

              {/* Conversion Objective */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Conversion Funnel Goal</label>
                <select
                  value={leadObjective}
                  onChange={(e) => setLeadObjective(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option>Direct WhatsApp & 1-on-1 Profile Assessment</option>
                  <option>Free Mock Test Registration + Score Report</option>
                  <option>Download College Cutoff & Placement PDF Matrix</option>
                  <option>Scholarship & Fee Concession Eligibility Check</option>
                </select>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Strategy auto-optimizes for <strong>Google Search Snippets</strong>, <strong>EEAT Authority</strong>, and <strong>High-Intent Lead Inquiries</strong>.
                </span>
              </div>
            </div>

            {/* Generated Strategy Preview & Output */}
            <div className="lg:col-span-7 rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Live Generated Strategy Blueprint</span>
                  </h3>
                  <p className="text-xs text-slate-400">Ready to execute across blog posts, landing pages & ads</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(generatedStrategy.markdownDraft, "md")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    {copiedKey === "md" ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
                    <span>{copiedKey === "md" ? "Copied Markdown!" : "Copy Post Markdown"}</span>
                  </button>
                  <button
                    onClick={() => handleCopy(JSON.stringify(generatedStrategy, null, 2), "json")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                  >
                    {copiedKey === "json" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
                    <span>JSON</span>
                  </button>
                </div>
              </div>

              {/* Output Item 1: High CTR H1 Title */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Recommended H1 Title (High CTR)</span>
                  <button
                    onClick={() => handleCopy(generatedStrategy.h1Title, "h1")}
                    className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    {copiedKey === "h1" ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white">
                  {generatedStrategy.h1Title}
                </div>
              </div>

              {/* Output Item 2: Meta Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Meta Description ({generatedStrategy.metaDescription.length} chars)</span>
                  <button
                    onClick={() => handleCopy(generatedStrategy.metaDescription, "meta")}
                    className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    {copiedKey === "meta" ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {generatedStrategy.metaDescription}
                </div>
              </div>

              {/* Output Item 3: Target Keyword Cluster */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300">Target Keyword Cluster (LSI & Commercial)</span>
                <div className="flex flex-wrap gap-2">
                  {generatedStrategy.keywords.map((kw, i) => (
                    <span
                      key={i}
                      onClick={() => handleCopy(kw, `kw-${i}`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-200 cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                      <Search className="w-3 h-3 text-amber-400" />
                      <span>{kw}</span>
                      {copiedKey === `kw-${i}` && <Check className="w-3 h-3 text-emerald-400" />}
                    </span>
                  ))}
                </div>
              </div>

              {/* Output Item 4: Content Structure Outline */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300">Recommended H2/H3 Content Architecture</span>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                  {generatedStrategy.outline.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-200">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-mono">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output Item 5: In-Article Lead CTA Banner */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300">High-Converting In-Article CTA Placement</span>
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/30 text-xs space-y-2">
                  <div className="font-bold text-amber-400 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Education Consultant Lead Magnet Script</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Connect directly with <strong>Mohit Jain</strong> for 1-on-1 profile shortlisting, GD-PI tips, and direct admission counselling for top AICTE B-schools.
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-[11px] font-semibold text-amber-300">
                    <span>📞 WhatsApp: +91 92898 87788</span>
                    <span>•</span>
                    <span>🌐 /inquiry Instant Callback</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: Exam Campaign Hub */}
      {activeSubSection === "campaigns" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Major Exam SEO Campaigns</h3>
              <p className="text-xs text-slate-400">Targeted SEO playbooks for India's top MBA & PGDM entrance tests</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">6 Core Exam Verticals</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXAM_CAMPAIGN_STRATEGIES.map((campaign) => (
              <div
                key={campaign.id}
                className="rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-all p-6 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${campaign.badgeColor}`}>
                        {campaign.badge}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1.5">{campaign.exam}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{campaign.season}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-black text-amber-400">{campaign.leadIntentScore}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Lead Score</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                    <span>Search Reach:</span>
                    <span className="font-semibold text-white">{campaign.monthlySearches}</span>
                  </div>

                  {/* Target Keywords */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Performing Keywords</span>
                    <div className="space-y-1.5">
                      {campaign.targetKeywords.map((kwItem, kidx) => (
                        <div
                          key={kidx}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs"
                        >
                          <div className="font-medium text-slate-200 truncate pr-2">{kwItem.kw}</div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">
                              {kwItem.volume}
                            </span>
                            <span className="text-[10px] text-slate-400">{kwItem.intent}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Funnel Blueprint */}
                  <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1.5 text-xs">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>Consultant Lead Strategy</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      <strong>Lead Magnet:</strong> {campaign.funnelBlueprint.leadMagnet}
                    </p>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      <strong>CTA:</strong> {campaign.funnelBlueprint.consultantCTA}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setTargetExam(campaign.exam.split('(')[0].trim());
                      setActiveSubSection("generator");
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Post Blueprint for {campaign.exam.split('(')[0].trim()}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: Geo-Admissions SEO */}
      {activeSubSection === "geo" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">City & Regional Admissions SEO</h3>
              <p className="text-xs text-slate-400">Local SEO domination across India's biggest MBA recruitment and college clusters</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GEO_ADMISSION_STRATEGIES.map((geo, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{geo.city}</h4>
                      <span className="text-xs text-amber-400 font-semibold">{geo.share}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {geo.collegesCount}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <span className="text-slate-400 font-semibold block mb-1">Key Institutes:</span>
                  <span>{geo.keyHighlights}</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Target Local Keywords:</span>
                  {geo.topKeywords.map((kw, kidx) => (
                    <div
                      key={kidx}
                      className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 flex items-center gap-2"
                    >
                      <Search className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{kw}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  <strong>Consultant Action Plan:</strong> {geo.seoActionItem}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-SECTION 4: High-Intent Keyword Funnel */}
      {activeSubSection === "funnel" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Consultant Lead Funnel & Keyword Priority</h3>
            <p className="text-xs text-slate-400">Keywords mapped by commercial intent and student inquiry potential</p>
          </div>

          <div className="space-y-6">
            {STRATEGY_KEYWORD_FUNNEL.map((funnel, fidx) => (
              <div key={fidx} className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <h4 className="text-base font-bold text-white">{funnel.stage}</h4>
                    <p className="text-xs text-slate-400">Intent: {funnel.intent}</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {funnel.avgCvr}
                  </span>
                </div>

                <div className="space-y-2">
                  {funnel.keywords.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs gap-3 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center gap-2.5 font-medium text-slate-200 truncate">
                        <Search className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{item.term}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[11px] font-bold text-amber-400">{item.vol} / mo</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">{item.diff} Diff</span>
                        <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">{item.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-SECTION 5: Competitor Gap Matrix */}
      {activeSubSection === "competitor" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Competitor Gap & Authority Matrix</h3>
            <p className="text-xs text-slate-400">How CareerWithMohit outranks giant portals with personalized counseling & fresh data</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPETITOR_GAPS.map((comp, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-bold text-white text-base">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>{comp.competitor}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 space-y-1">
                    <span className="font-bold text-red-400 block">Their Vulnerability:</span>
                    <span>{comp.weakness}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                    <span className="font-bold text-emerald-400 block">Our Unfair Advantage:</span>
                    <span>{comp.ourAdvantage}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                  <span className="font-bold text-amber-400 block mb-1">Execution Rule:</span>
                  <span>{comp.actionStrategy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
