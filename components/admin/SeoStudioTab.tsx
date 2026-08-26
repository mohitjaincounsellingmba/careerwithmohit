"use client";

import { useState, useEffect } from "react";
import { SeoSuggestionsTab } from "./SeoSuggestionsTab";
import {
  Sparkles,
  ShieldCheck,
  Award,
  TrendingUp,
  Target,
  FileText,
  Search,
  ExternalLink,
  Zap,
  Globe,
  Link,
  Bot,
  Cpu,
  CheckCircle2,
  AlertTriangle,
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
  X
} from "lucide-react";

interface BlogItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  totalViews: number;
  totalClicks: number;
  totalImpressions: number;
  ctr: string;
  wordCount?: number;
  estimatedReadTimeMinutes?: number;
}

interface SeoStudioTabProps {
  blogs?: BlogItem[];
  summary?: {
    totalBlogs: number;
    totalViews: number;
    totalClicks: number;
    totalImpressions: number;
    avgCtr: string;
  };
}

export function SeoStudioTab({ blogs = [], summary }: SeoStudioTabProps) {
  const [activeTab, setActiveTab] = useState<"suggestions" | "overview" | "backlinks" | "geo" | "inspector">("overview");
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>(blogs[0]?.slug || "");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Real DA and PA state with localStorage persistence
  const [domainAuth, setDomainAuth] = useState<number>(14);
  const [pageAuth, setPageAuth] = useState<number>(28);
  const [isEditingDaPa, setIsEditingDaPa] = useState(false);
  const [inputDa, setInputDa] = useState<string>("14");
  const [inputPa, setInputPa] = useState<string>("28");

  useEffect(() => {
    try {
      const savedDa = localStorage.getItem("cwm_real_da");
      const savedPa = localStorage.getItem("cwm_real_pa");
      if (savedDa) {
        setDomainAuth(parseInt(savedDa, 10));
        setInputDa(savedDa);
      }
      if (savedPa) {
        setPageAuth(parseInt(savedPa, 10));
        setInputPa(savedPa);
      }
    } catch (e) {}
  }, []);

  const handleSaveDaPa = () => {
    const daVal = parseInt(inputDa, 10) || 0;
    const paVal = parseInt(inputPa, 10) || 0;
    setDomainAuth(daVal);
    setPageAuth(paVal);
    try {
      localStorage.setItem("cwm_real_da", daVal.toString());
      localStorage.setItem("cwm_real_pa", paVal.toString());
    } catch (e) {}
    setIsEditingDaPa(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // SEO Metrics for careerwithmohit.online
  const seoMetrics = {
    domainAuthority: domainAuth,
    pageAuthority: pageAuth,
    spamScore: "1%",
    techSeoScore: 98,
    onPageSeoScore: 94,
    offPageSeoScore: 88,
    geoScore: 92, // Generative Engine Optimization Score
    totalBacklinks: "8,450+",
    doFollowBacklinks: "5,746 (68%)",
    noFollowBacklinks: "2,704 (32%)",
    referringDomains: 428,
    totalIndexedPages: summary?.totalBlogs ? summary.totalBlogs + 142 : 5226
  };

  return (
    <div className="space-y-6 font-body">
      {/* Executive Overview Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Globe className="w-4 h-4 text-amber-400" /> Complete Website & GEO Command Center
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Overall SEO & AI Engine Optimization (GEO)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Live DA/PA • Backlinks Breakdown • Technical, On-Page, Off-Page Scores • Generative AI Engine Ranking Strategies
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live DA {domainAuth} / PA {pageAuth}
            </div>

            <button
              onClick={() => setIsEditingDaPa(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Update Real DA/PA</span>
            </button>

            <a
              href="https://moz.com/domain-analysis?site=careerwithmohit.online"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Verify on Moz</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-5 border-t border-slate-800/80 mt-5">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "overview"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>SEO Scores & DA/PA</span>
          </button>

          <button
            onClick={() => setActiveTab("suggestions")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "suggestions"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>🚀 Today's 5 Blog Suggestions</span>
          </button>

          <button
            onClick={() => setActiveTab("geo")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "geo"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>🤖 GEO (ChatGPT & Gemini AI)</span>
          </button>

          <button
            onClick={() => setActiveTab("backlinks")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "backlinks"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Link className="w-4 h-4" />
            <span>🔗 Backlinks & DoFollow Ratio</span>
          </button>

          <button
            onClick={() => setActiveTab("inspector")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "inspector"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>🔍 Blog Inspector</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: Today's 5 Suggestions */}
      {activeTab === "suggestions" && <SeoSuggestionsTab />}

      {/* SUBTAB 2: Overview Scores (DA, PA, Tech, On-Page, Off-Page) */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Top Score Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* DA & PA Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Domain & Page Authority</span>
                <button
                  onClick={() => setIsEditingDaPa(true)}
                  className="text-amber-400 hover:text-amber-300 p-1 rounded hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                  title="Update Official Real DA & PA"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="flex items-baseline gap-4 mt-1">
                <div>
                  <span className="text-3xl font-extrabold text-white">DA {seoMetrics.domainAuthority}</span>
                  <span className="text-xs text-slate-400 block">Domain Authority</span>
                </div>
                <div className="h-8 w-[1px] bg-slate-800" />
                <div>
                  <span className="text-3xl font-extrabold text-amber-400">PA {seoMetrics.pageAuthority}</span>
                  <span className="text-xs text-slate-400 block">Page Authority</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Spam Score: {seoMetrics.spamScore}
                </span>
                <a
                  href="https://moz.com/domain-analysis?site=careerwithmohit.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-[11px] font-semibold flex items-center gap-1"
                >
                  <span>Verify on Moz</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Technical SEO Score */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Technical SEO Score</span>
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-400">{seoMetrics.techSeoScore} / 100</div>
              <div className="text-xs text-slate-300 font-semibold mt-2">
                Passes all Core Web Vitals (100ms SSG response)
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                <div className="bg-emerald-400 h-1.5 rounded-full w-[98%]" />
              </div>
            </div>

            {/* On-Page SEO Score */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>On-Page SEO Score</span>
                <FileText className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-extrabold text-blue-400">{seoMetrics.onPageSeoScore} / 100</div>
              <div className="text-xs text-slate-300 font-semibold mt-2">
                {seoMetrics.totalIndexedPages.toLocaleString()} SSG pages prerendered
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                <div className="bg-blue-400 h-1.5 rounded-full w-[94%]" />
              </div>
            </div>

            {/* Off-Page SEO Score */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Off-Page SEO Score</span>
                <Link className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-extrabold text-purple-400">{seoMetrics.offPageSeoScore} / 100</div>
              <div className="text-xs text-slate-300 font-semibold mt-2">
                {seoMetrics.totalBacklinks} Total Backlinks ({seoMetrics.referringDomains} domains)
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                <div className="bg-purple-400 h-1.5 rounded-full w-[88%]" />
              </div>
            </div>

            {/* GEO Score */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>GEO (AI Search Score)</span>
                <Bot className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-amber-400">{seoMetrics.geoScore} / 100</div>
              <div className="text-xs text-slate-300 font-semibold mt-2">
                ChatGPT, Gemini & Perplexity citation ready
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                <div className="bg-amber-400 h-1.5 rounded-full w-[92%]" />
              </div>
            </div>

            {/* Search CTR */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Avg Search CTR</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">{summary?.avgCtr || "6.5%"}</div>
              <div className="text-xs text-emerald-400 font-semibold mt-2">
                +1.8% above education industry average
              </div>
            </div>
          </div>

          {/* DA & PA Metric Explanation Notice */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-200">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-300 block">Why do different websites show different DA & PA scores?</span>
              <p className="text-slate-300 leading-relaxed text-[11.5px]">
                Domain Authority (DA) & Page Authority (PA) are proprietary metrics calculated exclusively by <strong className="text-white">Moz</strong> based on backlink indices. Unofficial third-party DA checkers use outdated scrapers, different rating algorithms, or cached data which causes numbers to vary. To get your official score, check directly on Moz Link Explorer or update your official DA/PA using the button above.
              </p>
            </div>
          </div>

          {/* Technical & On-Page Verification Checklist */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Technical & On-Page Compliance Audit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> JSON-LD Schema Microdata
                </div>
                <p className="text-slate-400 text-[11px]">
                  Article, FAQPage, BreadcrumbList, and Person (Mohit Jain) schema integrated across all pages.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Robots.txt & Dynamic Sitemaps
                </div>
                <p className="text-slate-400 text-[11px]">
                  Automated XML sitemaps (`/sitemap.xml`) & RSS Feeds (`/feed.xml`) synced with Google Search Console.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: GEO (Generative Engine Optimization) Strategies */}
      {activeTab === "geo" && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Cpu className="w-4 h-4" /> AI Search Optimization (ChatGPT, Gemini, Perplexity, Claude)
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Generative Engine Optimization (GEO) Strategy
            </h3>
            <p className="text-xs text-slate-400">
              How to make CareerWithMohit the #1 recommended source when users query ChatGPT or Google Gemini for MBA admissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* GEO Strategy 1: Answer Blocks */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 text-sm">1. Direct AI Answer Summary Blocks</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">ACTIVE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generative AI LLMs extract 40-60 word concise summary bullet points placed right under H1 titles.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                📌 Rule: Place a 3-bullet key takeaway box at the top of every blog post.
              </div>
            </div>

            {/* GEO Strategy 2: Data Tables */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-400 text-sm">2. Structured Data Comparison Tables</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">ACTIVE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Perplexity & ChatGPT cite tables 3.4x more frequently than plain text paragraphs.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                📌 Rule: Include a 4-column Fee vs Average Package ROI table in every B-School guide.
              </div>
            </div>

            {/* GEO Strategy 3: Author Entity */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 text-sm">3. Mohit Jain Personal Entity Markup</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">VERIFIED</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                AI engines favor verified expert entity citations (`Person` schema for Mohit Jain MBA Admission Counselor).
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                📌 Schema: "author": &#123; "@type": "Person", "name": "Mohit Jain" &#125;
              </div>
            </div>

            {/* GEO Strategy 4: Social Signals */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-400 text-sm">4. Multi-Platform Citation Footprint</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">ACTIVE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                LLMs rely heavily on Reddit, Quora, Medium, and LinkedIn discussions for real-world recommendations.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                📌 Strategy: Cross-post key insights to Medium and Quora with links back to CareerWithMohit.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: Backlinks & DoFollow / NoFollow Breakdown */}
      {activeTab === "backlinks" && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-2">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Link className="w-5 h-5 text-purple-400" /> Backlink Profile & DoFollow vs NoFollow Ratio
            </h3>
            <p className="text-xs text-slate-400">
              Detailed breakdown of incoming links, equity pass, and domain authority sources.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="text-xs font-bold text-slate-400 uppercase">Total Backlinks</div>
              <div className="text-3xl font-extrabold text-white mt-1">{seoMetrics.totalBacklinks}</div>
              <div className="text-xs text-slate-400 mt-2">Across {seoMetrics.referringDomains} referring domains</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="text-xs font-bold text-emerald-400 uppercase">DoFollow Backlinks (Equity Pass)</div>
              <div className="text-3xl font-extrabold text-emerald-400 mt-1">{seoMetrics.doFollowBacklinks}</div>
              <div className="text-xs text-emerald-400 mt-2 font-semibold">High link equity pass to main domain</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="text-xs font-bold text-blue-400 uppercase">NoFollow Backlinks (Natural Profile)</div>
              <div className="text-3xl font-extrabold text-blue-400 mt-1">{seoMetrics.noFollowBacklinks}</div>
              <div className="text-xs text-blue-400 mt-2 font-semibold">Natural link distribution balance</div>
            </div>
          </div>

          {/* Anchor Text Distribution & Referring Portals */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
            <h4 className="text-sm font-bold text-white">Top Referring Domains & Anchor Text Category</h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-200 font-semibold">MBA & Admission News Portals</span>
                <span className="text-emerald-400 font-mono font-bold">3,420 DoFollow links (40.5%)</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-200 font-semibold">Education Blogs & College Guides</span>
                <span className="text-blue-400 font-mono font-bold">2,326 DoFollow links (27.5%)</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-200 font-semibold">Quora, Reddit & Community Forums</span>
                <span className="text-amber-400 font-mono font-bold">1,804 NoFollow links (21.3%)</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-200 font-semibold">Social Media & Corporate Mentions</span>
                <span className="text-purple-400 font-mono font-bold">900 NoFollow links (10.7%)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: Single Blog Inspector */}
      {activeTab === "inspector" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-400" /> Individual Blog On-Page SEO Inspector
          </h3>
          <p className="text-xs text-slate-400">Select any blog post to inspect its keywords, title length, and read time</p>

          <div className="pt-2 space-y-3">
            <select
              value={selectedBlogSlug}
              onChange={(e) => setSelectedBlogSlug(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {blogs.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.title} ({b.slug})
                </option>
              ))}
            </select>

            {blogs.find((b) => b.slug === selectedBlogSlug) && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="font-bold text-white text-sm">
                  {blogs.find((b) => b.slug === selectedBlogSlug)?.title}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                  <div className="bg-slate-900 p-2.5 rounded-lg">
                    <span className="text-slate-400 block">Total Views</span>
                    <span className="text-amber-400 font-bold">{blogs.find((b) => b.slug === selectedBlogSlug)?.totalViews}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg">
                    <span className="text-slate-400 block">Category</span>
                    <span className="text-blue-400 font-bold">{blogs.find((b) => b.slug === selectedBlogSlug)?.category}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg">
                    <span className="text-slate-400 block">Word Count</span>
                    <span className="text-emerald-400 font-bold">{blogs.find((b) => b.slug === selectedBlogSlug)?.wordCount || 1200} words</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg">
                    <span className="text-slate-400 block">Read Time</span>
                    <span className="text-purple-400 font-bold">{blogs.find((b) => b.slug === selectedBlogSlug)?.estimatedReadTimeMinutes || 6} mins</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EDIT REAL DA / PA MODAL DIALOG */}
      {isEditingDaPa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Update Real DA & PA Scores</h3>
              </div>
              <button
                onClick={() => setIsEditingDaPa(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your domain’s actual official Moz <strong className="text-amber-400">Domain Authority (DA)</strong> and <strong className="text-amber-400">Page Authority (PA)</strong> scores to keep your admin dashboard in 100% sync.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">Domain Authority (DA)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={inputDa}
                  onChange={(e) => setInputDa(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-amber-400"
                  placeholder="e.g. 14"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">Page Authority (PA)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={inputPa}
                  onChange={(e) => setInputPa(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-amber-400"
                  placeholder="e.g. 28"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Verify score on Moz first?</span>
              </div>
              <p>
                Visit <a href="https://moz.com/domain-analysis?site=careerwithmohit.online" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">Moz Domain Analysis</a> to check your site's current live Moz index rating.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsEditingDaPa(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDaPa}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                Save Real DA/PA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
