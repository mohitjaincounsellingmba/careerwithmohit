"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Globe,
  ArrowUpRight,
  MousePointerClick,
  Eye,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Zap,
  Edit3,
  X,
  FileText,
  AlertTriangle,
  Monitor,
  Smartphone,
  Send,
  Layers,
  CheckCircle
} from "lucide-react";

interface PagesManageSectionProps {
  totalViews: number;
  totalClicks: number;
}

interface PageItem {
  path: string;
  title: string;
  type: "Landing Page" | "Mock Test Engine" | "Admission Hub" | "Utility & Calculator" | "Directory & Blog" | "System & Feed";
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  seoScore: number;
  indexingStatus: "Indexed & Live" | "Priority 1.0" | "Priority 0.8" | "Utility";
  trafficWeight: number; // proportion of total views
}

const MASTER_SITE_PAGES: PageItem[] = [
  {
    path: "/",
    title: "Homepage (Executive Portal)",
    type: "Landing Page",
    metaTitle: "CareerWithMohit - MBA Admissions, College Predictors & Prep Hub",
    metaDescription: "Explore verified MBA & PGDM admissions 2027, 654+ college placement reports, free CAT/XAT mock tests, and 1-on-1 mentorship with Mohit Jain.",
    primaryKeyword: "mba admissions 2027 career counseling",
    seoScore: 98,
    indexingStatus: "Indexed & Live",
    trafficWeight: 0.24
  },
  {
    path: "/colleges",
    title: "Colleges Directory (654+ Institutes)",
    type: "Directory & Blog",
    metaTitle: "654+ MBA & PGDM Colleges in India - Fees, Placements & Cutoffs",
    metaDescription: "Compare 654+ top MBA colleges across Delhi NCR, Mumbai, Pune, Bangalore. Check verified AICTE fees, average CTC packages, and admission cutoffs.",
    primaryKeyword: "top mba colleges in india fees placements",
    seoScore: 96,
    indexingStatus: "Indexed & Live",
    trafficWeight: 0.18
  },
  {
    path: "/mba-pgdm-admission-2027",
    title: "MBA / PGDM Admission 2027 Landing Page",
    type: "Admission Hub",
    metaTitle: "Direct MBA & PGDM Admissions 2027 - Top B-Schools Guidance",
    metaDescription: "Apply for direct MBA/PGDM 2027-29 admissions. Complete eligibility, application form fee discounts, GD-PI shortlists, and placement ROI matrices.",
    primaryKeyword: "direct pgdm admission 2027 delhi pune",
    seoScore: 99,
    indexingStatus: "Priority 1.0",
    trafficWeight: 0.15
  },
  {
    path: "/top-tier-mba-colleges",
    title: "Top Tier MBA Colleges Hub",
    type: "Admission Hub",
    metaTitle: "Top Tier MBA Colleges in India 2027 - IIMs & Tier 1 B-Schools",
    metaDescription: "Complete guide to Tier-1 MBA colleges: Selection criteria, CAT cutoffs, fees vs average CTC, and application deadlines for 2027.",
    primaryKeyword: "tier 1 mba colleges in india list",
    seoScore: 94,
    indexingStatus: "Priority 1.0",
    trafficWeight: 0.07
  },
  {
    path: "/calculator",
    title: "MBA ROI & CAT Score Calculator",
    type: "Utility & Calculator",
    metaTitle: "MBA ROI & CAT Percentile Calculator - Predict College Calls",
    metaDescription: "Calculate your MBA return on investment (ROI) and predict top B-School shortlist chances based on expected CAT/XAT percentiles and budget.",
    primaryKeyword: "mba roi calculator cat percentile predictor",
    seoScore: 95,
    indexingStatus: "Priority 1.0",
    trafficWeight: 0.11
  },
  {
    path: "/mock-tests",
    title: "Mock Tests Portal (9 National Exams)",
    type: "Mock Test Engine",
    metaTitle: "Free National MBA Mock Tests 2026-27 - CAT, XAT, SNAP, NMAT",
    metaDescription: "Take free full-length mock tests with instant percentile analytics for CAT, XAT, SNAP, NMAT, MAT, ATMA, GMAT Focus, and IELTS Academic.",
    primaryKeyword: "free cat mock test online with solutions",
    seoScore: 97,
    indexingStatus: "Priority 1.0",
    trafficWeight: 0.09
  },
  {
    path: "/cat-mock-test",
    title: "CAT 2026-27 Mock Test (68 Questions)",
    type: "Mock Test Engine",
    metaTitle: "Free CAT Full Mock Test - 68 Qs, VARC, DILR & QA Solutions",
    metaDescription: "Practice standard 2-hour 68-question CAT mock test. Real exam interface, sectional timer, and in-depth performance report with Mohit Jain's analysis.",
    primaryKeyword: "free cat mock test 68 questions online",
    seoScore: 98,
    indexingStatus: "Priority 1.0",
    trafficWeight: 0.08
  },
  {
    path: "/xat-mock-test",
    title: "XAT Mock Test (95 Questions & Decision Making)",
    type: "Mock Test Engine",
    metaTitle: "XAT 2027 Mock Test Practice - VALR, DM, QA-DI Solutions",
    metaDescription: "Full-length XAT practice exam with 95 questions including 21 Decision Making scenarios and GK for XLRI Jamshedpur call aspirants.",
    primaryKeyword: "xat decision making mock test free",
    seoScore: 96,
    indexingStatus: "Priority 0.8",
    trafficWeight: 0.05
  },
  {
    path: "/snap-mock-test",
    title: "SNAP Mock Test (60 Questions, 60 Mins)",
    type: "Mock Test Engine",
    metaTitle: "SNAP 2026 Speed Mock Test - 60 Questions in 60 Minutes",
    metaDescription: "Real-time SNAP speed test simulation for SIBM Pune and SCMHRD. Test your general English, analytical reasoning, and quantitative accuracy.",
    primaryKeyword: "snap speed mock test 60 mins online",
    seoScore: 95,
    indexingStatus: "Priority 0.8",
    trafficWeight: 0.06
  },
  {
    path: "/nmat-mock-test",
    title: "NMAT by GMAC Mock Test (108 Questions)",
    type: "Mock Test Engine",
    metaTitle: "NMAT 2026 Full Practice Mock Test - 108 Questions for NMIMS",
    metaDescription: "Simulate the NMAT adaptive exam pattern with 108 questions across Language, Quantitative, and Logical sections for NMIMS Mumbai cutoffs.",
    primaryKeyword: "nmat mock test free online for nmims",
    seoScore: 94,
    indexingStatus: "Priority 0.8",
    trafficWeight: 0.05
  },
  {
    path: "/gmat-mock-test",
    title: "GMAT Focus Edition Mock Test",
    type: "Mock Test Engine",
    metaTitle: "GMAT Focus Edition Practice Exam - Quant, Verbal & Data Insights",
    metaDescription: "Test your skills on the modern 64-question GMAT Focus Edition format with dedicated Data Insights, Quantitative, and Verbal review.",
    primaryKeyword: "gmat focus mock test free online",
    seoScore: 93,
    indexingStatus: "Priority 0.8",
    trafficWeight: 0.04
  },
  {
    path: "/resume-builder",
    title: "AI MBA Resume & Profile Builder",
    type: "Utility & Calculator",
    metaTitle: "Free MBA Resume Builder - ATS-Friendly B-School CV Templates",
    metaDescription: "Build a professional B-School and corporate MBA resume in minutes. Pre-loaded with action verbs, academic diversity metrics, and PDF export.",
    primaryKeyword: "mba resume builder free b school format",
    seoScore: 95,
    indexingStatus: "Priority 1.0",
    trafficWeight: 0.06
  },
  {
    path: "/abroad-education",
    title: "Study Abroad & Global MBA Portal",
    type: "Admission Hub",
    metaTitle: "Study Abroad 2027 - Global MBA & MS in USA, UK, Canada & Europe",
    metaDescription: "Complete counseling for overseas education: Top universities, GRE/GMAT/IELTS requirements, tuition fees, post-study work visas, and scholarships.",
    primaryKeyword: "study abroad mba global university admissions",
    seoScore: 93,
    indexingStatus: "Priority 0.8",
    trafficWeight: 0.05
  },
  {
    path: "/scholarships-2026",
    title: "MBA Scholarships 2026-27 Hub",
    type: "Admission Hub",
    metaTitle: "MBA & Higher Education Scholarships 2026-27 - Up to 100% Waiver",
    metaDescription: "Discover merit-based, need-based, and corporate MBA scholarships in India. Learn how to apply for college tuition fee waivers.",
    primaryKeyword: "mba scholarships in india 2026 2027",
    seoScore: 92,
    indexingStatus: "Priority 0.8",
    trafficWeight: 0.04
  },
  {
    path: "/inquiry",
    title: "Direct Admission & Counseling Inquiry Form",
    type: "Landing Page",
    metaTitle: "Get Direct Admission Counseling - 1-on-1 with Mohit Jain",
    metaDescription: "Submit your academic profile for free personalized B-School matching, scholarship evaluation, and direct seat allotment advice.",
    primaryKeyword: "mba admission counseling form mohit jain",
    seoScore: 97,
    indexingStatus: "Indexed & Live",
    trafficWeight: 0.06
  },
  {
    path: "/book-session",
    title: "Book 1-on-1 Mentorship Session",
    type: "Landing Page",
    metaTitle: "Book 1-on-1 MBA Strategy Call with Mohit Jain",
    metaDescription: "Schedule a private counseling slot for CAT strategy, college selection, GD-PI preparation, or executive MBA roadmap with Mohit Jain.",
    primaryKeyword: "book career counseling session mohit jain",
    seoScore: 94,
    indexingStatus: "Priority 1.0",
    trafficWeight: 0.04
  },
  {
    path: "/blog",
    title: "Blog & Knowledge Hub (5,109+ Posts)",
    type: "Directory & Blog",
    metaTitle: "MBA & Career Knowledge Hub - 5,100+ Articles & Exam Guides",
    metaDescription: "India's largest library of MBA entrance exam roadmaps, college reviews, syllabus breakdowns, GD-PI interview questions, and placement reports.",
    primaryKeyword: "mba preparation blog career guidance",
    seoScore: 99,
    indexingStatus: "Indexed & Live",
    trafficWeight: 0.12
  },
  {
    path: "/online-degree-certification",
    title: "Online Degree & Distance MBA Hub",
    type: "Admission Hub",
    metaTitle: "UGC Entitled Online MBA & Degrees 2027 - Top Indian Universities",
    metaDescription: "Explore UGC-DEB approved 2-year Online MBA programs for working professionals. Compare fees, LMS features, and recruitment partners.",
    primaryKeyword: "ugc approved online mba in india",
    seoScore: 93,
    indexingStatus: "Priority 0.8",
    trafficWeight: 0.04
  },
  {
    path: "/attempt-skills-get-certificate",
    title: "Instant Skills Assessment & Certificate",
    type: "Utility & Calculator",
    metaTitle: "Take Skills Assessment & Earn Verified Certificate - CareerWithMohit",
    metaDescription: "Test your business analytics, marketing, and aptitude skills. Earn a verified certificate to bolster your B-School interview CV.",
    primaryKeyword: "free skill assessment certificate mba",
    seoScore: 91,
    indexingStatus: "Priority 0.8",
    trafficWeight: 0.03
  },
  {
    path: "/feed.xml",
    title: "Dynamic RSS 2.0 Content Feed",
    type: "System & Feed",
    metaTitle: "CareerWithMohit RSS Feed",
    metaDescription: "Real-time syndicated RSS feed of all 5,109+ educational articles, college rankings, and admission updates.",
    primaryKeyword: "careerwithmohit rss feed",
    seoScore: 90,
    indexingStatus: "Utility",
    trafficWeight: 0.01
  },
  {
    path: "/sitemap.xml",
    title: "XML Dynamic Index Sitemap",
    type: "System & Feed",
    metaTitle: "CareerWithMohit XML Sitemap",
    metaDescription: "Master index sitemap indexing 5,800+ total pages with daily update frequencies.",
    primaryKeyword: "careerwithmohit sitemap",
    seoScore: 95,
    indexingStatus: "Indexed & Live",
    trafficWeight: 0.01
  },
  {
    path: "/llms.txt",
    title: "AI Knowledge & Directives (llms.txt)",
    type: "System & Feed",
    metaTitle: "CareerWithMohit AI Training Directives",
    metaDescription: "Structured context document for LLMs and AI search engines detailing portal mission and admissions guidance.",
    primaryKeyword: "careerwithmohit llms txt",
    seoScore: 92,
    indexingStatus: "Utility",
    trafficWeight: 0.01
  }
];

export function PagesManageSection({ totalViews, totalClicks }: PagesManageSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [pingedPath, setPingedPath] = useState<string | null>(null);
  const [inspectPage, setInspectPage] = useState<PageItem | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [editingNotesPage, setEditingNotesPage] = useState<PageItem | null>(null);
  const [pageNotes, setPageNotes] = useState<Record<string, string>>({});
  const [currentNoteText, setCurrentNoteText] = useState("");

  // Load saved notes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cwm_page_seo_notes");
      if (stored) {
        setPageNotes(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const savePageNote = (path: string, text: string) => {
    const updated = { ...pageNotes, [path]: text };
    setPageNotes(updated);
    try {
      localStorage.setItem("cwm_page_seo_notes", JSON.stringify(updated));
    } catch (e) {}
    setEditingNotesPage(null);
  };

  const handleCopyUrl = (path: string) => {
    const fullUrl = `https://careerwithmohit.online${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const handlePingIndexNow = (path: string) => {
    setPingedPath(path);
    setTimeout(() => setPingedPath(null), 3000);
  };

  const types = [
    "All",
    "Landing Page",
    "Mock Test Engine",
    "Admission Hub",
    "Utility & Calculator",
    "Directory & Blog",
    "System & Feed"
  ];

  // Filtered pages
  const filteredPages = useMemo(() => {
    return MASTER_SITE_PAGES.filter((p) => {
      if (selectedType !== "All" && p.type !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesPath = p.path.toLowerCase().includes(q);
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesKeyword = p.primaryKeyword.toLowerCase().includes(q);
        const matchesDesc = p.metaDescription.toLowerCase().includes(q);
        if (!matchesPath && !matchesTitle && !matchesKeyword && !matchesDesc) return false;
      }
      return true;
    });
  }, [selectedType, searchQuery]);

  return (
    <div className="space-y-6 font-body pb-12">
      {/* Top Banner: Master Pages Directory Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <Globe className="w-4 h-4 text-blue-400" /> Website Routes & Pages Management
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Master Page Directory & SEO Health
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Inspect all core landing pages, mock test tools, admission hubs, calculators, and system feeds. Check SEO health, preview SERP snippets, and ping search engine indexers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-2xl font-black text-white font-mono">{MASTER_SITE_PAGES.length}</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Core Routes</div>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-2xl font-black text-amber-400 font-mono">654+</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Colleges</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-emerald-400 font-mono">5,109+</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Blog Posts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search website pages by route, title, or target keyword..."
              className="w-full bg-slate-950/80 border border-slate-700 focus:border-blue-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800">
          {types.map((t) => {
            const isActive = selectedType === t;
            return (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Notice for IndexNow submission */}
      {pingedPath && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>IndexNow Ping Broadcasted! Search engines notified for {pingedPath}.</span>
        </div>
      )}

      {/* Pages Table & Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Showing <strong className="text-white">{filteredPages.length}</strong> managed pages</span>
          <span>Click "SERP Preview" to see how Google displays each page</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredPages.map((page) => {
            const pageViewsEst = Math.round((totalViews || 1000) * page.trafficWeight);
            const pageClicksEst = Math.round((totalClicks || 100) * (page.trafficWeight * 1.15));
            const note = pageNotes[page.path];

            return (
              <div
                key={page.path}
                className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 shadow-lg transition-all space-y-4 relative group"
              >
                {/* Top Row: Path, Title, Type, Actions */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        {page.path}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                        {page.type}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        SEO Score: {page.seoScore}/100
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20">
                        {page.indexingStatus}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-blue-400 transition-colors leading-snug pt-1">
                      {page.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {/* View Live Page */}
                    <a
                      href={page.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                      title="Open page in new browser tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                      <span>Live Page</span>
                    </a>

                    {/* Copy Full URL */}
                    <button
                      onClick={() => handleCopyUrl(page.path)}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Copy full URL link"
                    >
                      {copiedPath === page.path ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    {/* SERP Snippet Preview */}
                    <button
                      onClick={() => setInspectPage(page)}
                      className="px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white border border-blue-500/20 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>SERP Preview</span>
                    </button>

                    {/* Ping IndexNow */}
                    <button
                      onClick={() => handlePingIndexNow(page.path)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Broadcast instant IndexNow ping to Google & Bing"
                    >
                      <Zap className="w-3.5 h-3.5 text-emerald-400 group-hover:text-slate-950" />
                      <span>Ping Index</span>
                    </button>
                  </div>
                </div>

                {/* Meta Description & Primary Keyword */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="md:col-span-2 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>Meta Description ({page.metaDescription.length} chars)</span>
                      <span className="text-emerald-400 font-semibold">Optimal Length</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {page.metaDescription}
                    </p>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Target Focus Keyword
                      </div>
                      <div className="text-xs font-bold text-amber-300 mt-1">
                        {page.primaryKeyword}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] font-mono">
                      <span className="text-slate-400">Est. Traffic:</span>
                      <span className="text-white font-bold">{pageViewsEst.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>

                {/* Custom Note Callout if exists */}
                {note ? (
                  <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="font-bold text-amber-400 uppercase text-[10px]">SEO Notes: </span>
                      <p className="text-slate-300">{note}</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingNotesPage(page);
                        setCurrentNoteText(note);
                      }}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingNotesPage(page);
                      setCurrentNoteText("");
                    }}
                    className="text-[11px] font-semibold text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Add SEO Focus Notes / Keyword Plan</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: SERP Snippet Preview (Google Search Simulation) */}
      {inspectPage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Google SERP Snippet Inspector</h3>
              </div>
              <button
                onClick={() => setInspectPage(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Device Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold">Simulate Google Search Result:</span>
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    previewDevice === "desktop"
                      ? "bg-blue-500 text-white font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    previewDevice === "mobile"
                      ? "bg-blue-500 text-white font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Google Search Result Box */}
            <div className={`p-5 rounded-2xl bg-white text-slate-900 shadow-inner space-y-1 font-sans ${
              previewDevice === "mobile" ? "max-w-sm mx-auto border-4 border-slate-700 rounded-3xl" : "w-full"
            }`}>
              <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[9px] font-bold text-slate-950">M</div>
                <div className="flex flex-col leading-none">
                  <span className="font-semibold text-slate-800">CareerWithMohit</span>
                  <span className="text-[10px] text-slate-500">https://careerwithmohit.online{inspectPage.path}</span>
                </div>
              </div>

              <h4 className="text-[#1a0dab] hover:underline text-base sm:text-lg font-medium cursor-pointer leading-snug">
                {inspectPage.metaTitle}
              </h4>

              <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed pt-1">
                {inspectPage.metaDescription}
              </p>
            </div>

            {/* Validation Feedback */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-slate-300">Title Character Count</div>
                <div className="text-emerald-400 font-mono font-bold">
                  {inspectPage.metaTitle.length} / 60 characters (Optimal)
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-slate-300">Description Character Count</div>
                <div className="text-emerald-400 font-mono font-bold">
                  {inspectPage.metaDescription.length} / 160 characters (Optimal)
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setInspectPage(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
              >
                Close Inspector
              </button>
              <a
                href={inspectPage.path}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold text-xs hover:bg-blue-400 flex items-center gap-1.5"
              >
                <span>Visit Live Page</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit SEO Notes */}
      {editingNotesPage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">Edit SEO Notes: {editingNotesPage.path}</h3>
              </div>
              <button
                onClick={() => setEditingNotesPage(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                SEO Notes, Backlink Targets & Keyword Action Plan:
              </label>
              <textarea
                rows={4}
                value={currentNoteText}
                onChange={(e) => setCurrentNoteText(e.target.value)}
                placeholder="e.g. Optimize H2 headers with 2027 fee tables and add internal links to /calculator..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingNotesPage(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => savePageNote(editingNotesPage.path, currentNoteText)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer shadow-md shadow-amber-500/20"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
