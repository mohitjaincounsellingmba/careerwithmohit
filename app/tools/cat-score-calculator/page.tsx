import type { Metadata } from "next";
import { CatScoreCalculator } from "@/components/CatScoreCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { College4SureScrollProgress } from "@/components/College4SureScrollProgress";
import {
  ShieldCheck,
  Zap,
  BarChart3,
  BookOpen,
  TrendingUp,
  Target,
  ArrowRight,
  MapPin,
  Building2,
  HelpCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Award,
  FileCheck2,
  Compass,
  FileText,
  Layers,
  GraduationCap,
  Calendar,
  AlertTriangle,
  Scale,
  Flame,
  MessageCircle,
  Video,
  Share2,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CAT Score Calculator 2026 | CAT Response Sheet Check, 2026 Answer Key & Percentile Predictor",
  description:
    "Free CAT 2026 Score Calculator & CAT Response Sheet Check for MBA Admissions 2027. Scan official answer key URL or calculate raw marks, slot scaled score & predicted IIM percentiles.",
  keywords: [
    "cat score calculator 2026",
    "cat exam score calculator",
    "cat response sheet",
    "cat 2026 answer key",
    "cat 2026 response sheet check",
    "cat exam",
    "cat answer key calculator",
    "cat 2026 percentile predictor",
    "cat marks vs percentile 2026",
    "cat 2026 score calculator",
    "cat response sheet calculator",
    "cat marks calculator",
    "cat percentile calculator",
    "cat raw score calculator",
    "cat scaled score calculator",
    "cat raw score vs scaled score 2026",
    "cat score calculator by slot",
    "cat slot 1 score calculator",
    "cat slot 2 score calculator",
    "cat slot 3 score calculator",
    "cat 2026 response sheet score calculator",
    "cat sectional marks vs percentile",
    "cat varc dilr qa score",
    "cat score vs percentile analysis",
    "expected cat score for 99 percentile",
    "expected cat score for 95 percentile",
    "expected cat score for 90 percentile",
    "cat expected percentile 2026",
    "cat 2026 score vs percentile",
    "cat normalization process 2026",
    "cat normalisation calculator",
    "cat answer key challenge fee",
    "iim admission score calculator",
    "iim call predictor 2027",
    "iim admission cut-offs 2027",
    "mba admission 2027",
    "pgdm admission 2027",
    "mba admission delhi ncr",
    "mba admission mumbai",
    "mba admission bangalore",
    "mba admission pune",
    "mba colleges accepting cat score 2026",
    "cat response sheet url check"
  ],
  alternates: {
    canonical: "https://careerwithmohit.online/tools/cat-score-calculator/",
  },
  openGraph: {
    title: "CAT Score Calculator 2026 | CAT Response Sheet Check, 2026 Answer Key & Percentile",
    description:
      "Free CAT 2026 Score Calculator & CAT Response Sheet Check. Scan official CAT 2026 answer key URL, calculate slot scaled score, and predict 2027 IIM percentiles.",
    type: "website",
    url: "https://careerwithmohit.online/tools/cat-score-calculator/",
    siteName: "CareerWithMohit",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "CAT 2026 Score Calculator, Response Sheet Checker & Answer Key Analysis Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CAT Score Calculator 2026 | Response Sheet Check & 2027 MBA Percentile",
    description:
      "Free CAT 2026 Score Calculator & Response Sheet Check. Calculate raw score, scaled score, and expected percentile for 2027 admissions.",
    images: ["/og-image.webp"],
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi, Delhi NCR, Mumbai, Bengaluru, Pune, Hyderabad, Kolkata, Chennai, Ahmedabad, India",
    "geo.position": "28.6139;77.2090",
    ICBM: "28.6139, 77.2090",
    "DC.coverage": "India, Delhi NCR, Mumbai, Bengaluru, Pune, Hyderabad, Kolkata, Chennai, Ahmedabad",
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
};

const CAT_FAQS = [
  {
    question: "How is the CAT 2026 raw score calculated for 2027 admissions?",
    answer: "CAT 2026 follows a 66-question format with a maximum raw score of 198 marks (24 VARC, 20 DILR, 22 QA). Multiple Choice Questions (MCQs) award +3 marks for every correct answer and deduct −1 mark for every incorrect answer. Non-MCQ / TITA (Type In The Answer) questions award +3 marks for correct answers and carry 0 negative marking for wrong or unattempted responses.",
  },
  {
    question: "How can I check my CAT 2026 response sheet and answer key with this calculator?",
    answer: "Once the conducting IIM releases the official CAT candidate response sheet on cdn.digialm.com / iimcat.ac.in, copy your candidate response sheet URL or view page source (Ctrl+U) and paste it into our scanner. The calculator automatically analyzes your MCQ/TITA attempts across VARC, DILR, and QA to compute your raw score, apply slot normalization, and forecast your 2027 MBA admission percentile.",
  },
  {
    question: "What is the difference between CAT raw score and scaled score?",
    answer: "The raw score is the literal sum of your correct (+3) and incorrect (−1/0) marks out of 198. Because CAT is conducted across Slot 1, Slot 2, and Slot 3 with varying difficulty levels, IIMs employ an equipercentile equating formula (equating mean and standard deviation) to generate the Scaled Score. Your final percentile is calculated strictly from this scaled score.",
  },
  {
    question: "What CAT 2026 score is required for 99+ percentile in 2027 admissions?",
    answer: "Based on historical trends across 66-question CAT exams, a raw score of roughly 82 to 94 marks out of 198 fetches a 99.0+ percentile. A score of 95 to 109 marks yields a 99.5+ percentile, and a score of 110+ marks generally secures a 99.9+ percentile, qualifying aspirants for top IIM Ahmedabad, Bangalore, and Calcutta interview shortlists.",
  },
  {
    question: "How does the CAT normalization formula work across Slot 1, Slot 2, and Slot 3?",
    answer: "IIMs use equipercentile equating to normalize CAT scores. The formula compares the mean and standard deviation of candidate scores in a specific slot with the master mean across all slots, with special weightage to the top 0.1% performers. Tougher slots receive upward score adjustment, while easier slots may see a slight downward calibration.",
  },
  {
    question: "How do I challenge a question in the provisional CAT 2026 answer key?",
    answer: "During the 3-day objection window post-exam, log in to iimcat.ac.in, select the Candidate Grievance / Objection tab, choose the Question ID, upload your justification with reference text, and pay the requisite fee of INR 1,200 (plus transaction fees) per question. If your objection is valid, the fee is refunded and the answer key is updated for all candidates.",
  },
  {
    question: "What happens if a question is dropped in CAT 2026?",
    answer: "If an official CAT question is dropped due to ambiguity or printing error, marks for that question are ignored and the remaining questions are scaled proportionally for all test takers in that specific shift, ensuring no candidate is unfairly penalized.",
  },
  {
    question: "Is there sectional negative marking in CAT 2026?",
    answer: "Sectional marking is uniform across VARC, DILR, and QA: +3 for correct MCQs, −1 for wrong MCQs, +3 for correct TITA, and 0 for wrong TITA. Candidates must also meet individual sectional cut-offs (usually 70-85+ percentile per section) to qualify for IIM calls.",
  },
  {
    question: "What are the expected CAT cut-offs for top Non-IIM B-schools like FMS, MDI, SPJIMR, and IITs?",
    answer: "FMS Delhi typically requires 99.3+ percentile; SPJIMR Mumbai shortlists profile-cum-score candidates around 85-98 percentile; MDI Gurgaon requires 95-97 percentile; DMS IIT Delhi and SJMSOM IIT Bombay require 98-99 percentile; IMT Ghaziabad and IMI Delhi require 90-93 percentile; and Baby IIMs (CAP round) generally cutoff at 92-94 percentile.",
  },
  {
    question: "Which top MBA colleges accept 80 to 90 percentile in CAT 2026?",
    answer: "Candidates scoring between 80 and 90 percentile (raw score of 42 to 64 marks) can target reputed B-schools such as FORE School of Management (Delhi), GIM Goa, TAPMI Manipal, Great Lakes (Chennai/Gurgaon), BIMTECH (Greater Noida), LBSIM (Delhi), K J Somaiya (Mumbai), and LIBA (Chennai).",
  },
  {
    question: "Can I get admission into good MBA colleges with a 70 percentile in CAT?",
    answer: "Yes! High-ROI colleges accepting 70-80 CAT percentiles include Welingkar (Mumbai/Bangalore), Jaipuria Institute of Management, NDIM New Delhi, JIMS Rohini, SOIL Gurgaon, IBS Hyderabad, and ITM Navi Mumbai. Many colleges also accept alternative scores like XAT, CMAT, and MAT.",
  },
  {
    question: "What are the three slot timings in the CAT 2026 exam?",
    answer: "CAT is held in 3 shifts: Slot 1 (Morning) from 08:30 AM to 10:30 AM, Slot 2 (Afternoon) from 12:30 PM to 02:30 PM, and Slot 3 (Evening) from 04:30 PM to 06:30 PM. Each slot has a strict 40-minute limit per section.",
  },
];

export default function CatScoreCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CAT_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CAT Score Calculator 2026 & Response Sheet Checker",
    url: "https://careerwithmohit.online/tools/cat-score-calculator/",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All (Web, iOS, Android, macOS, Windows)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "1850",
    },
    featureList: [
      "Official CAT Response Sheet URL & Page Source Scanner",
      "Accurate 66-Question 198-Mark CAT Pattern Calculator",
      "Slot 1, Slot 2 & Slot 3 Equating Normalization Predictor",
      "Sectional Percentile Prediction for VARC, DILR, and QA",
      "IIM Ahmedabad, Bangalore, Calcutta & BLACKI Call Range Estimator",
      "Goal Planner & Reverse Net Attempts Target Calculator",
      "Regional MBA Colleges Filter for Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad",
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate CAT 2026 Score & Percentile from Official Response Sheet",
    description: "Step-by-step procedure to check your CAT answer key, calculate raw marks, apply slot scaling, and estimate your MBA 2027 percentile.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Access Your CAT Response Sheet",
        text: "Log in to the official IIM CAT portal (iimcat.ac.in) with your Registration ID and Password, and click on 'Candidate Response' to view your response sheet URL hosted on cdn.digialm.com.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Scan URL or Enter Section Attempts",
        text: "Paste your response sheet URL into our CAT Answer Key Scanner or enter your correct/wrong attempts for VARC, DILR, and QA manually.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Compute Raw Score (+3 MCQ / -1 MCQ / +3 TITA)",
        text: "The tool multiplies correct MCQs by +3, deducts −1 for wrong MCQs, and awards +3 for correct TITA questions with zero penalty for wrong TITA.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Apply Slot Normalization",
        text: "Select your exam slot (Slot 1, Slot 2, or Slot 3) to factor in slot difficulty equating and generate your predicted Scaled Score.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Review Percentile & Shortlist Eligible B-Schools",
        text: "View your estimated CAT percentile and receive recommendations for IIMs, top private B-schools, and regional MBA colleges across India.",
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://careerwithmohit.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://careerwithmohit.online/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "CAT Score Calculator 2026",
        item: "https://careerwithmohit.online/tools/cat-score-calculator/",
      },
    ],
  };

  const educationalPageSchema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: "CAT 2026 Score Calculator & Response Sheet Checker",
    description: "Comprehensive CAT 2026 score calculation, answer key analysis, slot normalization guide, and 2027 MBA admission percentile predictor.",
    url: "https://careerwithmohit.online/tools/cat-score-calculator/",
    author: {
      "@type": "Person",
      name: "Mohit Jain",
      jobTitle: "Founder & Lead MBA Admissions Consultant",
      url: "https://careerwithmohit.online",
      sameAs: [
        "https://www.linkedin.com/in/mohitjainmba",
        "https://api.whatsapp.com/send/?phone=919560020771"
      ],
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: "CareerWithMohit",
      url: "https://careerwithmohit.online",
      logo: "https://careerwithmohit.online/og-image.webp",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi NCR",
        addressRegion: "Delhi",
        addressCountry: "IN",
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#061124] selection:bg-[#F59E0B] selection:text-[#061124]">
      <JsonLd data={faqSchema} />
      <JsonLd data={webAppSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={educationalPageSchema} />

      {/* Top Multi-Color Gradient Scroll Progress & Back to Top */}
      <College4SureScrollProgress />

      {/* ── LIVE MARQUEE TICKER BAR MATCHING HOME PAGE ── */}
      <div className="bg-[#061124] text-white py-2.5 px-4 overflow-hidden border-b border-white/10 font-mono text-xs">
        <div className="max-w-[1220px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88] animate-ping" />
            <span className="font-bold text-[#00FF88] uppercase tracking-wider text-[11px]">
              LIVE RADAR
            </span>
          </div>
          <div className="overflow-hidden whitespace-nowrap text-slate-300 text-xs font-medium">
            <span className="inline-block animate-marquee">
              🔥 CAT 2026 Official Answer Key &amp; Response Sheet Portal Active &nbsp;·&nbsp;
              📊 Slot 1, Slot 2 &amp; Slot 3 Normalization Updated &nbsp;·&nbsp;
              🏛️ IIM BLACKI &amp; Top Non-IIM Cutoffs 2027 Live &nbsp;·&nbsp;
              💬 Free 1-on-1 Profile Assessment with Mohit Jain (IIM Bangalore &amp; FMS Alumni)
            </span>
          </div>
          <Link
            href="/book-session/"
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F59E0B] hover:text-white uppercase tracking-wider shrink-0 transition-colors"
          >
            <span>Book 1-on-1 Meet</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ── CYBER DARK HERO MATCHING HOME PAGE ── */}
      <header className="relative overflow-hidden bg-[#070A14] text-white pt-10 pb-24 sm:pt-14 sm:pb-32 border-b border-white/10">
        {/* Floating Ambient Glowing Blobs */}
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />

        {/* Subtle Cyber Grid Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs with light text for dark background */}
          <div className="mb-6 [&_a]:text-slate-300 [&_a:hover]:text-[#00F0FF] [&_span]:text-white [&_svg]:text-slate-400">
            <Breadcrumbs />
          </div>

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-[0_0_20px_rgba(0,255,136,0.2)] font-mono text-xs font-bold uppercase tracking-wider mb-6 text-[#00FF88]">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_10px_#00FF88] animate-ping" />
            <span>CAT 2026 Official Answer Key &amp; Response Sheet Checker · MBA 2027</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[62px] font-black text-white leading-[1.08] tracking-tight mb-6">
              CAT 2026{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF007A] via-[#8B5CF6] to-[#00F0FF]">
                Score Calculator
              </span>{" "}
              &amp; Percentile Predictor
            </h1>

            {/* DIRECT AI ANSWER CARD (GEO / AEO RULE 1) */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] mb-8">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] mb-2">
                <Sparkles className="w-4 h-4 text-[#00F0FF]" /> Direct AI Answer Summary
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                The <strong>CAT 2026 raw score</strong> is calculated across 66 questions (198 max marks) with +3 for correct MCQs, −1 for wrong MCQs, and +3 for non-MCQ (TITA) with zero negative marking. Candidates can paste their official Digialm response sheet URL or page source to compute instant raw marks, apply Slot 1, Slot 2 &amp; Slot 3 equipercentile scaling, and predict 2027 IIM call ranges (BLACKI, New IIMs, Baby IIMs, and top Non-IIM B-schools).
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-white/[0.08] backdrop-blur-xl border border-white/15 p-4 rounded-2xl">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B5CF6] block mb-1">
                  Questions Format
                </span>
                <span className="text-xl sm:text-2xl font-display font-black text-white">66 Qs</span>
                <span className="text-[11px] text-slate-300 block mt-0.5 font-mono">24 VARC · 20 DILR · 22 QA</span>
              </div>

              <div className="bg-white/[0.08] backdrop-blur-xl border border-white/15 p-4 rounded-2xl">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00FF88] block mb-1">
                  Maximum Marks
                </span>
                <span className="text-xl sm:text-2xl font-display font-black text-white">198 Marks</span>
                <span className="text-[11px] text-slate-300 block mt-0.5 font-mono">+3 / −1 / 0 TITA</span>
              </div>

              <div className="bg-white/[0.08] backdrop-blur-xl border border-white/15 p-4 rounded-2xl">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00F0FF] block mb-1">
                  Slot Equating
                </span>
                <span className="text-xl sm:text-2xl font-display font-black text-white">3 Shifts</span>
                <span className="text-[11px] text-slate-300 block mt-0.5 font-mono">Equipercentile Equating</span>
              </div>

              <div className="bg-white/[0.08] backdrop-blur-xl border border-white/15 p-4 rounded-2xl">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFD600] block mb-1">
                  99+ Percentile
                </span>
                <span className="text-xl sm:text-2xl font-display font-black text-white">82 – 94 M</span>
                <span className="text-[11px] text-slate-300 block mt-0.5 font-mono">IIM A / B / C Target</span>
              </div>
            </div>

            {/* Hero Quick Jump Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#FFD600]" /> Fast Navigation:
              </span>
              <a
                href="#cat-calculator-app"
                className="bg-white/[0.08] backdrop-blur-md border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-[#00F0FF] hover:bg-white/15 transition-colors"
              >
                ⚡ Live Calculator
              </a>
              <a
                href="#response-sheet-guide"
                className="bg-white/[0.08] backdrop-blur-md border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-[#FFD600] hover:bg-white/15 transition-colors"
              >
                📄 Response Sheet Check
              </a>
              <a
                href="#answer-key-analysis"
                className="bg-white/[0.08] backdrop-blur-md border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-[#FF007A] hover:bg-white/15 transition-colors"
              >
                🔑 2026 Answer Key
              </a>
              <a
                href="#marks-vs-percentile"
                className="bg-white/[0.08] backdrop-blur-md border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-cyan-300 hover:bg-white/15 transition-colors"
              >
                📊 Marks vs %ile Matrix
              </a>
              <a
                href="#normalization"
                className="bg-white/[0.08] backdrop-blur-md border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-[#00FF88] hover:bg-white/15 transition-colors"
              >
                📈 Slot Normalization
              </a>
              <a
                href="#colleges-by-tier"
                className="bg-white/[0.08] backdrop-blur-md border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-[#8B5CF6] hover:bg-white/15 transition-colors"
              >
                🏛️ IIM Cutoffs
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN INTERACTIVE CALCULATOR SECTION ── */}
      <section
        className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20 pb-20"
        aria-label="CAT 2026 Score Calculator Tool"
      >
        <CatScoreCalculator />

        {/* ── DEEP DIVE EDUCATIONAL & SEO GUIDE SECTIONS ── */}
        <div className="mt-28 max-w-4xl mx-auto space-y-20">

          {/* Section 1: Response Sheet & Answer Key Scanner Guide */}
          <article id="response-sheet-guide" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#061124] text-[#00F0FF] flex items-center justify-center font-bold shadow-md">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#061124] tracking-tight">
                CAT 2026 Response Sheet Check: How to View &amp; Calculate Score
              </h2>
            </div>

            <div className="bg-white rounded-[32px] border-[1.5px] border-[#061124]/10 p-6 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.08)] space-y-6">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                As soon as the conducting IIM releases the official <strong>CAT 2026 candidate response sheet</strong> and provisional <strong>answer key</strong>, candidates can verify every MCQ and TITA attempt without tedious manual counting. Our built-in <strong>CAT response sheet check tool</strong> reads your official candidate URL (hosted on <code>cdn.digialm.com</code> or <code>iimcat.ac.in</code>) or HTML source code directly to compute instant score results.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <h3 className="font-display font-black text-sm text-[#061124] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    How to Get Your Response Sheet Link:
                  </h3>
                  <ol className="list-decimal pl-5 text-xs text-slate-600 space-y-2 font-medium">
                    <li>Log in to <strong>iimcat.ac.in</strong> with your User ID and Password.</li>
                    <li>Click on the <strong>Candidate Response</strong> tab in your dashboard.</li>
                    <li>Click on the link <em>&quot;click here to generate it&quot;</em>.</li>
                    <li>Copy the browser URL and paste it into our scanner above.</li>
                  </ol>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <h3 className="font-display font-black text-sm text-[#061124] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    What the Scanner Automatically Analyzes:
                  </h3>
                  <ul className="list-disc pl-5 text-xs text-slate-600 space-y-2 font-medium">
                    <li>Total questions detected across paper (Standard 66 Questions).</li>
                    <li>Count of answered vs unattempted questions per section.</li>
                    <li>Section-wise distribution: 24 VARC, 20 DILR, 22 QA.</li>
                    <li>Accurate raw score out of 198 max marks with −1 penalties.</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* Section 2: CAT 2026 Answer Key & Objection Window Analysis */}
          <article id="answer-key-analysis" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#061124] text-[#FF007A] flex items-center justify-center font-bold shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#061124] tracking-tight">
                CAT 2026 Answer Key &amp; Objection Challenge Process
              </h2>
            </div>

            <div className="bg-white rounded-[32px] border-[1.5px] border-[#061124]/10 p-6 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.08)] space-y-6">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                The <strong>CAT 2026 provisional answer key</strong> is published alongside the candidate response sheet within 3 to 4 days post-exam. If you discover discrepancies in the official answer key for Slot 1, Slot 2, or Slot 3, you can file an objection through the official candidate grievance portal.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-1">
                  <h4 className="font-display font-black text-xs sm:text-sm text-amber-950 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-600" />
                    Objection Fee &amp; Refund Policy:
                  </h4>
                  <p className="text-xs text-amber-900 font-medium">
                    Candidates must pay <strong>INR 1,200</strong> per question challenged (plus standard bank processing charges). If the expert committee upholds your objection, the fee is 100% refunded to your original payment mode, and a revised Final Answer Key is published.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 space-y-1">
                  <h4 className="font-display font-black text-xs sm:text-sm text-blue-950 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-blue-600" />
                    Question Drop / Ambiguity Rule:
                  </h4>
                  <p className="text-xs text-blue-900 font-medium">
                    If an official question in any slot has multiple correct options or no valid option, it is dropped from calculation. The raw score of all candidates in that shift is scaled proportionally across the remaining questions so that no one loses competitive ground.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Section 3: CAT Exam Pattern, Syllabus & Slot Timings */}
          <article className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#061124] text-[#8B5CF6] flex items-center justify-center font-bold shadow-md">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#061124] tracking-tight">
                CAT Exam Architecture, Slot Timings &amp; Marking Rules
              </h2>
            </div>

            <div className="bg-white rounded-[32px] border-[1.5px] border-[#061124]/10 p-6 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.08)] space-y-6">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                The <strong>Common Admission Test (CAT)</strong> is conducted in 3 distinct shifts on the last Sunday of November across 155+ test cities in India. The exam enforces a strict 40-minute sectional time limit with no option to toggle between sections.
              </p>

              {/* Slot Timings Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-mono font-bold text-amber-700 uppercase block">Shift 1 (Morning)</span>
                  <span className="text-lg font-black text-slate-900">08:30 AM – 10:30 AM</span>
                  <span className="text-[11px] text-slate-500 block mt-1 font-medium">Reporting Time: 07:00 AM</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-mono font-bold text-blue-700 uppercase block">Shift 2 (Afternoon)</span>
                  <span className="text-lg font-black text-slate-900">12:30 PM – 02:30 PM</span>
                  <span className="text-[11px] text-slate-500 block mt-1 font-medium">Reporting Time: 11:00 AM</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase block">Shift 3 (Evening)</span>
                  <span className="text-lg font-black text-slate-900">04:30 PM – 06:30 PM</span>
                  <span className="text-[11px] text-slate-500 block mt-1 font-medium">Reporting Time: 03:00 PM</span>
                </div>
              </div>

              {/* Section Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl border border-violet-200 bg-violet-50/50">
                  <h4 className="font-display font-black text-sm text-violet-900 mb-1">VARC (72 Marks)</h4>
                  <p className="text-xs text-slate-600 font-medium">
                    24 Questions: 16 Reading Comprehension (4 Passages × 4 Qs) + 8 Verbal Ability (Parasummary, Parajumbles, Odd One Out).
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50">
                  <h4 className="font-display font-black text-sm text-blue-900 mb-1">DILR (60 Marks)</h4>
                  <p className="text-xs text-slate-600 font-medium">
                    20 Questions: 4 Sets of 5 questions each covering Matrix Arrangement, Games &amp; Tournaments, Venn Diagrams, and Data Tables.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50">
                  <h4 className="font-display font-black text-sm text-emerald-900 mb-1">QA (66 Marks)</h4>
                  <p className="text-xs text-slate-600 font-medium">
                    22 Questions: Arithmetic (TSD, Work, Percentages, P&amp;L), Algebra (Functions, Quadratic, Progressions), Geometry &amp; Numbers.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Section 4: Marks vs Percentile Benchmark Table */}
          <article id="marks-vs-percentile" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#061124] text-[#00F0FF] flex items-center justify-center font-bold shadow-md">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#061124] tracking-tight">
                CAT 2026 Marks vs Percentile Target Breakdown (198 Max Marks)
              </h2>
            </div>

            <div className="bg-white rounded-[32px] border-[1.5px] border-[#061124]/10 p-6 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.08)] space-y-6">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                In CAT 2026, scoring above <strong>50% raw marks (~100 marks out of 198)</strong> comfortably places an aspirant above the <strong>99.5 percentile</strong>. Because CAT tests relative performance rather than absolute accuracy, understanding raw marks vs percentile targets helps plan mock test benchmarks and target college shortlists:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead className="bg-[#061124] text-white font-mono font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="p-4 border-r border-slate-800">Target %ile</th>
                      <th className="p-4 border-r border-slate-800">Estimated Raw Marks (198M)</th>
                      <th className="p-4 border-r border-slate-800">VARC Score (72M)</th>
                      <th className="p-4 border-r border-slate-800">DILR Score (60M)</th>
                      <th className="p-4">QA Score (66M)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    {[
                      ["99.9+ %ile", "110 – 125+ Marks", "46+ Marks", "38+ Marks", "42+ Marks"],
                      ["99.5+ %ile", "95 – 109 Marks", "42+ Marks", "32+ Marks", "35+ Marks"],
                      ["99.0+ %ile", "82 – 94 Marks", "38+ Marks", "28+ Marks", "30+ Marks"],
                      ["98.0+ %ile", "75 – 81 Marks", "34+ Marks", "24+ Marks", "26+ Marks"],
                      ["95.0+ %ile", "60 – 74 Marks", "28+ Marks", "19+ Marks", "21+ Marks"],
                      ["90.0+ %ile", "48 – 59 Marks", "23+ Marks", "15+ Marks", "16+ Marks"],
                      ["85.0+ %ile", "38 – 47 Marks", "18+ Marks", "12+ Marks", "13+ Marks"],
                      ["80.0+ %ile", "32 – 37 Marks", "14+ Marks", "10+ Marks", "10+ Marks"],
                      ["70.0+ %ile", "22 – 31 Marks", "10+ Marks", "7+ Marks", "7+ Marks"],
                    ].map(([perc, overall, varc, dilr, qa], idx) => (
                      <tr
                        key={idx}
                        className={`hover:bg-cyan-50/50 transition-colors ${
                          idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                        }`}
                      >
                        <td className="p-4 border-r border-slate-200 font-black text-cyan-700">{perc}</td>
                        <td className="p-4 border-r border-slate-200 font-black text-slate-900">{overall}</td>
                        <td className="p-4 border-r border-slate-200 text-slate-600 font-semibold">{varc}</td>
                        <td className="p-4 border-r border-slate-200 text-slate-600 font-semibold">{dilr}</td>
                        <td className="p-4 text-slate-600 font-semibold">{qa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 italic font-medium">
                * Note: Exact marks required may fluctuate ±3 to 5 marks depending on the slot difficulty distribution in CAT 2026.
              </p>
            </div>
          </article>

          {/* Section 5: Normalization Mechanics */}
          <article id="normalization" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#061124] text-[#00FF88] flex items-center justify-center font-bold shadow-md">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#061124] tracking-tight">
                How CAT 2026 Normalization &amp; Slot Scaling Works (Slot 1, 2, 3)
              </h2>
            </div>

            <div className="bg-white rounded-[32px] border-[1.5px] border-[#061124]/10 p-6 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.08)] space-y-6">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                Because CAT is administered in three distinct shifts across test centers in India, small variations in question paper difficulty naturally occur. To ensure complete fairness for all test takers, IIMs implement a multi-stage <strong>equipercentile equating normalization method</strong> modeled on statistical standardization.
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                  <h3 className="font-display font-black text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#F59E0B] text-slate-950 font-black text-xs flex items-center justify-center">1</span>
                    Calculation of Mean &amp; Standard Deviation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium pl-8">
                    The mean and standard deviation of raw scores are computed for each section in every slot, alongside the top 0.1% candidate scores across all slots.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-1.5">
                  <h3 className="font-display font-black text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#2563EB] text-white font-black text-xs flex items-center justify-center">2</span>
                    Scaled Score Equating Formula
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium pl-8">
                    The raw score of a candidate is adjusted relative to the performance of all candidates across sessions. If Slot 3 had a harder QA section, candidates in Slot 3 receive an upward adjustment in their scaled QA score.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                  <h3 className="font-display font-black text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#10B981] text-white font-black text-xs flex items-center justify-center">3</span>
                    Percentile Computation Formula
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium pl-8">
                    Percentile is calculated as: <code className="bg-white px-2 py-0.5 rounded border border-emerald-200 font-mono text-xs text-emerald-800">P = ((N − R) / N) × 100</code>, where <code>N</code> is the total number of test takers and <code>R</code> is the assigned rank based on scaled scores.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Section 6: Top MBA Colleges Accepting CAT by Percentile Tier */}
          <article id="colleges-by-tier" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#061124] text-[#00F0FF] flex items-center justify-center font-bold shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#061124] tracking-tight">
                Top MBA Colleges &amp; IIM Cutoffs by CAT Percentile Tier (2027 Admissions)
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  tier: "Tier 1: Mega Premier IIMs (99.0+ Percentile)",
                  colleges: "IIM Ahmedabad, IIM Bangalore, IIM Calcutta, FMS Delhi, SPJIMR Mumbai, SJMSOM IIT Bombay",
                  avgPkg: "₹30 – 35+ LPA",
                  desc: "Premier B-schools in India offering world-class ROI, legacy recruiter networks, and international placements.",
                  badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
                },
                {
                  tier: "Tier 1.5: Top Legacy IIMs & Premier B-Schools (95.0 – 98.9 %ile)",
                  colleges: "IIM Lucknow, IIM Kozhikode, IIM Indore, IIM Shillong, MDI Gurgaon, DMS IIT Delhi, IIFT Delhi, New IIMs (Udaipur, Trichy, Ranchi)",
                  avgPkg: "₹20 – 28 LPA",
                  desc: "Elite institutions with strong corporate standing, specialized consulting & finance recruitments, and robust alumni bases.",
                  badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
                },
                {
                  tier: "Tier 2 Top: High-ROI Institutes (88.0 – 94.9 %ile)",
                  colleges: "Baby IIMs (Nagpur, Vizag, Amritsar, Bodh Gaya), IMT Ghaziabad, IMI New Delhi, FORE School of Management, TAPMI, GIM Goa, DoMS IIT Madras",
                  avgPkg: "₹14 – 18 LPA",
                  desc: "Highly reputed management institutes featuring solid marketing, BFSI, and analytics placements with fast application turnaround.",
                  badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
                },
                {
                  tier: "Tier 2: Leading Private PGDM Colleges (75.0 – 87.9 %ile)",
                  colleges: "Great Lakes (Chennai/Gurgaon), BIMTECH (Greater Noida), K J Somaiya (Mumbai), LBSIM (Delhi), Welingkar (Mumbai/Bangalore), LIBA",
                  avgPkg: "₹11 – 15 LPA",
                  desc: "Top private PGDM colleges with industry-aligned curricula, metro corporate tie-ups, and excellent return on investment.",
                  badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
                },
                {
                  tier: "Tier 3: Metro PGDM Hubs (60.0 – 74.9 %ile)",
                  colleges: "Jaipuria Institute of Management, NDIM New Delhi, JIMS Rohini, SOIL Gurgaon, IBS Hyderabad, ITM Navi Mumbai",
                  avgPkg: "₹8 – 11 LPA",
                  desc: "Metro PGDM institutes offering strong industry exposure, live projects, and dedicated placement assistance.",
                  badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
                },
              ].map((tierItem, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[28px] border-[1.5px] border-[#061124]/10 p-6 sm:p-7 shadow-sm space-y-3 hover:border-cyan-400 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-display text-base sm:text-lg font-black text-[#061124]">
                      {tierItem.tier}
                    </h3>
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border uppercase self-start sm:self-auto ${tierItem.badgeColor}`}>
                      Avg CTC: {tierItem.avgPkg}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {tierItem.colleges}
                  </p>
                  <p className="text-xs text-slate-600 font-medium">
                    {tierItem.desc}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Section 7: Geo SEO - Regional MBA Hubs */}
          <article id="regional-hubs" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#061124] text-[#FF007A] flex items-center justify-center font-bold shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#061124] tracking-tight">
                Regional MBA Admissions by CAT Score: Top State &amp; Metro Hubs
              </h2>
            </div>

            <div className="bg-white rounded-[32px] border-[1.5px] border-[#061124]/10 p-6 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.08)] space-y-6">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                Depending on your location preferences and career goals, exploring regional MBA hubs allows you to leverage localized corporate recruitment ecosystems in India’s leading commercial centers:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/mba-admissions-by-region/delhi-ncr/"
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-cyan-50/60 hover:border-cyan-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-black text-sm text-[#061124] group-hover:text-cyan-700 transition-colors flex items-center gap-1.5">
                      Delhi NCR MBA Colleges <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <span className="text-[10px] font-mono font-bold uppercase bg-cyan-100 text-cyan-800 px-2.5 py-0.5 rounded-full">
                      Top Hub
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    FMS Delhi, MDI Gurgaon, IMT Ghaziabad, IMI New Delhi, FORE, LBSIM, BIMTECH. Corporate capital of India.
                  </p>
                </Link>

                <Link
                  href="/mba-admissions-by-region/mumbai/"
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-blue-50/60 hover:border-blue-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-black text-sm text-[#061124] group-hover:text-blue-700 transition-colors flex items-center gap-1.5">
                      Mumbai MBA Colleges <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <span className="text-[10px] font-mono font-bold uppercase bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                      Financial Hub
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    SPJIMR, SJMSOM IIT Bombay, JBIMS, K J Somaiya, Welingkar, NIBM. Capital of Banking, Finance &amp; FinTech.
                  </p>
                </Link>

                <Link
                  href="/mba-admissions-by-region/bangalore/"
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-black text-sm text-[#061124] group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                      Bangalore MBA Colleges <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <span className="text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      Tech &amp; Startups
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    IIM Bangalore, IISc DoMS, TAPMI, XIME Bangalore, Alliance University. Silicon Valley of India.
                  </p>
                </Link>

                <Link
                  href="/mba-admissions-by-region/pune/"
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-purple-50/60 hover:border-purple-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-black text-sm text-[#061124] group-hover:text-purple-700 transition-colors flex items-center gap-1.5">
                      Pune MBA Colleges <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <span className="text-[10px] font-mono font-bold uppercase bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full">
                      Auto &amp; IT Hub
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    SIBM Pune, SCMHRD, BIMM, PIBM, NIBM, PUMBA. Oxford of the East with massive manufacturing &amp; IT footprint.
                  </p>
                </Link>

                <Link
                  href="/mba-admissions-by-region/hyderabad/"
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-rose-50/60 hover:border-rose-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-black text-sm text-[#061124] group-hover:text-rose-700 transition-colors flex items-center gap-1.5">
                      Hyderabad MBA Colleges <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <span className="text-[10px] font-mono font-bold uppercase bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full">
                      Pharma &amp; Tech
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    ISB Hyderabad, IPE, IBS Hyderabad, NMIMS Hyderabad, VJIM. Rapidly expanding global tech hub.
                  </p>
                </Link>

                <Link
                  href="/mba-admissions-by-region/kolkata/"
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-cyan-50/60 hover:border-cyan-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-black text-sm text-[#061124] group-hover:text-cyan-700 transition-colors flex items-center gap-1.5">
                      Kolkata &amp; East MBA Colleges <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <span className="text-[10px] font-mono font-bold uppercase bg-cyan-100 text-cyan-800 px-2.5 py-0.5 rounded-full">
                      Eastern Capital
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    IIM Calcutta, VGSoM IIT Kharagpur, IMI Kolkata, MDI Murshidabad. Gateway to Eastern commercial corridors.
                  </p>
                </Link>
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/mba-admissions-by-region/"
                  className="inline-flex items-center gap-2 bg-[#061124] hover:bg-[#070A14] text-white font-display font-black text-xs uppercase px-7 py-3.5 rounded-full shadow-md transition-all hover:scale-105"
                >
                  <span>Explore All 8 Indian MBA Regions &amp; State Admissions Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>

          {/* Section 8: How to Calculate in 5 Easy Steps */}
          <article className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#061124] text-[#FFD600] flex items-center justify-center font-bold shadow-md">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#061124] tracking-tight">
                How to Calculate Your CAT 2026 Score (5 Easy Steps)
              </h2>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  step: "01",
                  title: "Scan Answer Key Link or Choose Section",
                  desc: "Paste your official candidate response sheet URL from iimcat.ac.in, or select VARC, DILR, or QA tabs to manually key in your attempts.",
                },
                {
                  step: "02",
                  title: "Enter Correct MCQs (+3 Marks Each)",
                  desc: "Count the number of Multiple Choice Questions you got right. Each awards +3 marks.",
                },
                {
                  step: "03",
                  title: "Enter Wrong MCQs (−1 Mark Penalty)",
                  desc: "Count the number of incorrect MCQ attempts. Each attracts a −1 mark penalty.",
                },
                {
                  step: "04",
                  title: "Enter Correct Non-MCQ / TITA (+3 Marks)",
                  desc: "Enter your correct Type-In-The-Answer questions (+3 marks each). Wrong TITA attempts have 0 penalty.",
                },
                {
                  step: "05",
                  title: "Select Slot & View Percentile Breakdown",
                  desc: "Choose your exam slot (Slot 1, 2, or 3) to view your raw score, scaled score, predicted percentile, and target MBA colleges.",
                },
              ].map(({ step, title, desc }) => (
                <div
                  key={step}
                  className="bg-white rounded-[24px] border-[1.5px] border-[#061124]/10 p-5 sm:p-6 flex items-start gap-4 sm:gap-5 shadow-sm hover:border-cyan-400 transition-colors"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#061124] text-[#00F0FF] flex items-center justify-center font-black text-base sm:text-lg shrink-0 shadow-md">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm sm:text-base text-[#061124] mb-1">{title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Section 9: FAQs */}
          <article className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#061124] text-[#00F0FF] flex items-center justify-center font-bold shadow-md">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#061124] tracking-tight">
                Frequently Asked Questions: CAT 2026 Scoring, Answer Key &amp; Response Sheet
              </h2>
            </div>

            <div className="space-y-3">
              {CAT_FAQS.map(({ question, answer }, i) => (
                <details
                  key={i}
                  className="bg-white rounded-[24px] border-[1.5px] border-[#061124]/10 p-5 group cursor-pointer shadow-sm"
                >
                  <summary className="text-sm sm:text-base font-display font-black text-[#061124] flex justify-between items-center list-none select-none">
                    <span>{question}</span>
                    <span className="group-open:rotate-180 transition-transform ml-4 shrink-0 text-[#2563EB] font-black">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3.5">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </article>

          {/* Section 10: Related MBA Admission Resources */}
          <article className="pt-6">
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#061124] mb-6 flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-[#2563EB]" />
              Related CAT 2026 &amp; MBA 2027 Admission Resources
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/tools/cat-mock-test/"
                className="bg-white rounded-[24px] border-[1.5px] border-[#061124]/10 p-5 font-bold hover:border-cyan-400 transition-all flex items-center justify-between group shadow-sm"
              >
                <div>
                  <span className="text-[11px] font-mono text-[#0EA5E9] block uppercase tracking-wider font-extrabold">Free Practice</span>
                  <span className="text-sm text-slate-900 group-hover:text-cyan-700 transition-colors">CAT 2026 Full Mock Test →</span>
                </div>
              </Link>

              <Link
                href="/blog/cat-2026-score-calculator-marks-vs-percentile/"
                className="bg-white rounded-[24px] border-[1.5px] border-[#061124]/10 p-5 font-bold hover:border-blue-400 transition-all flex items-center justify-between group shadow-sm"
              >
                <div>
                  <span className="text-[11px] font-mono text-blue-600 block uppercase tracking-wider font-extrabold">Strategy Guide</span>
                  <span className="text-sm text-slate-900 group-hover:text-blue-700 transition-colors">Marks vs Percentile Guide →</span>
                </div>
              </Link>

              <Link
                href="/blog/cat-answer-key-response-sheet-analysis-score-calculator/"
                className="bg-white rounded-[24px] border-[1.5px] border-[#061124]/10 p-5 font-bold hover:border-emerald-400 transition-all flex items-center justify-between group shadow-sm"
              >
                <div>
                  <span className="text-[11px] font-mono text-emerald-600 block uppercase tracking-wider font-extrabold">Answer Key</span>
                  <span className="text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">Response Sheet Analysis →</span>
                </div>
              </Link>

              <Link
                href="/tools/mat-score-calculator/"
                className="bg-white rounded-[24px] border-[1.5px] border-[#061124]/10 p-5 font-bold hover:border-emerald-400 transition-all flex items-center justify-between group shadow-sm"
              >
                <div>
                  <span className="text-[11px] font-mono text-emerald-600 block uppercase tracking-wider font-extrabold">AIMA Exam Tool</span>
                  <span className="text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">MAT Score Calculator →</span>
                </div>
              </Link>

              <Link
                href="/tools/xat-score-calculator-2027/"
                className="bg-white rounded-[24px] border-[1.5px] border-[#061124]/10 p-5 font-bold hover:border-rose-400 transition-all flex items-center justify-between group shadow-sm"
              >
                <div>
                  <span className="text-[11px] font-mono text-[#FF007A] block uppercase tracking-wider font-extrabold">XLRI Exam Tool</span>
                  <span className="text-sm text-slate-900 group-hover:text-rose-700 transition-colors">XAT Score Calculator →</span>
                </div>
              </Link>

              <Link
                href="/tools/college-comparison/"
                className="bg-white rounded-[24px] border-[1.5px] border-[#061124]/10 p-5 font-bold hover:border-purple-400 transition-all flex items-center justify-between group shadow-sm"
              >
                <div>
                  <span className="text-[11px] font-mono text-[#8B5CF6] block uppercase tracking-wider font-extrabold">Compare Colleges</span>
                  <span className="text-sm text-slate-900 group-hover:text-purple-700 transition-colors">Compare MBA Colleges →</span>
                </div>
              </Link>

              <Link
                href="/mba-application-form-discount/"
                className="bg-gradient-to-r from-[#00F0FF] via-[#6366F1] to-[#FF007A] text-white rounded-[24px] p-5 font-bold transition-all flex items-center justify-between group shadow-lg col-span-1 sm:col-span-2 lg:col-span-3 hover:scale-[1.01]"
              >
                <div>
                  <span className="text-[11px] font-mono block uppercase tracking-wider font-extrabold text-cyan-200">Exclusive Savings</span>
                  <span className="text-sm font-display font-black">MBA Application Form Discounts &amp; Combo Offers (Save ₹5,000+) →</span>
                </div>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ── FINAL COSMIC CALL-TO-ACTION BANNER MATCHING HOME PAGE ── */}
      <section className="py-14 sm:py-20 bg-white border-t border-[#061124]/10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[32px] sm:rounded-[44px] p-8 sm:p-14 lg:p-16 text-center text-white overflow-hidden shadow-[0_34px_70px_-30px_rgba(37,99,235,0.45)] bg-gradient-to-br from-[#061124] via-[#1E40AF] to-[#0D9488]">
            {/* Dual Cosmic Rotating Dashed Rings */}
            <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full border-2 border-dashed border-white/20 animate-spinv-slow pointer-events-none" />
            <div className="absolute -bottom-28 -right-20 w-72 h-72 rounded-full border-2 border-dashed border-white/20 animate-spinv-reverse pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-mono text-xs font-extrabold uppercase tracking-wider mb-5 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                Free 1-on-1 MBA Advisory
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                Not sure which colleges<br />
                you should apply to with your score?
              </h2>

              <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                Talk it through with Mohit Jain (certified by IIM Bangalore &amp; FMS Delhi). Free 30-minute strategic profile review on Google Meet — real insights, safe vs dream shortlists, not a sales pitch.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
                <Link
                  href="/book-session/"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#fbbf24] text-[#061124] font-display font-extrabold text-sm sm:text-base transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Video className="w-4 h-4 text-[#061124]" />
                  <span>Book 1-on-1 Google Meet</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20need%20guidance%20for%20my%20CAT%202026%20college%20shortlisting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-display font-bold text-sm sm:text-base transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#10B981]" />
                  <span>WhatsApp Profile Review</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
