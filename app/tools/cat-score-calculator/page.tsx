import type { Metadata } from "next";
import { CatScoreCalculator } from "@/components/CatScoreCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
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
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CAT Score Calculator 2026 | CAT Response Sheet Check, Scaled Score & 2027 MBA Percentile Predictor",
  description:
    "Free CAT 2026 Score Calculator & Response Sheet Check for MBA Admissions 2027. Scan answer key URL or enter VARC, DILR & QA attempts to calculate raw marks, slot scaled score & expected IIM percentiles.",
  keywords: [
    "cat score calculator 2026",
    "cat 2026 response sheet check",
    "cat 2026 answer key",
    "cat 2026 answer key check",
    "cat 2026 response sheet calculator",
    "cat score calculator 2026 for 2027 admission",
    "cat marks vs percentile 2026",
    "cat 2026 percentile predictor",
    "cat 2026 score calculator",
    "cat answer key calculator 2026",
    "cat marks calculator",
    "cat percentile calculator",
    "cat raw score calculator",
    "cat scaled score",
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
    canonical: "https://www.careerwithmohit.online/tools/cat-score-calculator",
  },
  openGraph: {
    title: "CAT Score Calculator 2026 | CAT Response Sheet Check & 2027 MBA Percentile",
    description:
      "Free CAT 2026 Score Calculator & Response Sheet Check. Calculate raw score, scaled score across slots, and predicted percentile for 2027 IIM & MBA admissions.",
    type: "website",
    url: "https://www.careerwithmohit.online/tools/cat-score-calculator",
    siteName: "CareerWithMohit",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "CAT 2026 Score Calculator & Response Sheet Checker Tool",
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
    "geo.placename": "New Delhi, Delhi NCR, Mumbai, Bengaluru, Pune, Hyderabad, Kolkata, India",
    "geo.position": "28.6139;77.2090",
    ICBM: "28.6139, 77.2090",
    "DC.coverage": "India, Delhi NCR, Mumbai, Bengaluru, Pune, Hyderabad, Kolkata, Chennai, Ahmedabad",
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
};

export default function CatScoreCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is the CAT 2026 raw score calculated for 2027 admissions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CAT 2026 follows a 66-question format with a maximum raw score of 198 marks (24 VARC, 20 DILR, 22 QA). Multiple Choice Questions (MCQs) award +3 marks for every correct answer and deduct −1 mark for every incorrect answer. Non-MCQ / TITA (Type In The Answer) questions award +3 marks for correct answers and carry 0 negative marking for wrong or unattempted responses.",
        },
      },
      {
        "@type": "Question",
        name: "How can I check my CAT 2026 response sheet and answer key with this calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Once IIM releases the official CAT response sheet on cdn.digialm.com / iimcat.ac.in, copy your candidate response sheet URL or view page source (Ctrl+U) and paste it into our scanner. The calculator automatically analyzes your MCQ/TITA attempts across VARC, DILR, and QA to compute your raw score, apply slot normalization, and forecast your 2027 MBA admission percentile.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between CAT raw score and scaled score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The raw score is the literal sum of your correct (+3) and incorrect (−1/0) marks out of 198. Because CAT is conducted across Slot 1, Slot 2, and Slot 3 with varying difficulty levels, IIMs employ a scientific normalization formula (equating mean and standard deviation) to generate the Scaled Score. Your final percentile is calculated strictly from this scaled score.",
        },
      },
      {
        "@type": "Question",
        name: "What CAT 2026 score is required for 99+ percentile in 2027 admissions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Based on historical trends across 66-question CAT exams, a raw score of roughly 82 to 94 marks out of 198 fetches a 99.0+ percentile. A score of 95 to 109 marks yields a 99.5+ percentile, and a score of 110+ marks generally secures a 99.9+ percentile, qualifying aspirants for top IIM Ahmedabad, Bangalore, and Calcutta interview shortlists.",
        },
      },
      {
        "@type": "Question",
        name: "How does the CAT normalization formula work across Slot 1, Slot 2, and Slot 3?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IIMs use equipercentile equating to normalize CAT scores. The formula compares the mean and standard deviation of candidate scores in a specific slot with the master mean across all slots, with special weightage to the top 0.1% performers. Tougher slots receive upward score adjustment, while easier slots may see a slight downward calibration.",
        },
      },
      {
        "@type": "Question",
        name: "Is there sectional negative marking in CAT 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sectional marking is uniform across VARC, DILR, and QA: +3 for correct MCQs, −1 for wrong MCQs, +3 for correct TITA, and 0 for wrong TITA. Candidates must also meet individual sectional cut-offs (usually 70-85+ percentile per section) to qualify for IIM calls.",
        },
      },
      {
        "@type": "Question",
        name: "What are the expected CAT cut-offs for top Non-IIM B-schools like FMS, MDI, SPJIMR, and IITs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FMS Delhi typically requires 99.3+ percentile; SPJIMR Mumbai shortlists profile-cum-score candidates around 85-98 percentile; MDI Gurgaon requires 95-97 percentile; DMS IIT Delhi and SJMSOM IIT Bombay require 98-99 percentile; IMT Ghaziabad and IMI Delhi require 90-93 percentile; and Baby IIMs (CAP round) generally cutoff at 92-94 percentile.",
        },
      },
      {
        "@type": "Question",
        name: "Which top MBA colleges accept 80 to 90 percentile in CAT 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Candidates scoring between 80 and 90 percentile (raw score of 42 to 64 marks) can target reputed B-schools such as FORE School of Management (Delhi), GIM Goa, TAPMI Manipal, Great Lakes (Chennai/Gurgaon), BIMTECH (Greater Noida), LBSIM (Delhi), K J Somaiya (Mumbai), and LIBA (Chennai).",
        },
      },
      {
        "@type": "Question",
        name: "How do I challenge a question in the provisional CAT answer key?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "During the 3-day objection window post-exam, log in to iimcat.ac.in, select the Objection tab, choose the Question ID, submit your justification with supporting documentation, and pay the requisite fee (approx. INR 1,200 per question). If your challenge is accepted, the fee is refunded and the answer key is updated for all candidates.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get admission into good MBA colleges with a 70 percentile in CAT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! High-ROI colleges accepting 70-80 CAT percentiles include Welingkar (Mumbai/Bangalore), Jaipuria Institute of Management, NDIM New Delhi, JIMS Rohini, SOIL Gurgaon, IBS Hyderabad, and ITM Navi Mumbai. Many colleges also accept alternative scores like XAT, CMAT, and MAT.",
        },
      },
    ],
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CAT Score Calculator 2026 & Response Sheet Checker",
    url: "https://www.careerwithmohit.online/tools/cat-score-calculator",
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
      ratingCount: "1420",
    },
    featureList: [
      "Official CAT Response Sheet URL & Page Source Scanner",
      "Accurate 66-Question 198-Mark CAT Pattern Calculator",
      "Slot 1, Slot 2 & Slot 3 Equating Normalization Predictor",
      "Sectional Percentile Prediction for VARC, DILR, and QA",
      "IIM Ahmedabad, Bangalore, Calcutta & BLACKI Call Range Estimator",
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
        item: "https://www.careerwithmohit.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://www.careerwithmohit.online/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "CAT Score Calculator 2026",
        item: "https://www.careerwithmohit.online/tools/cat-score-calculator",
      },
    ],
  };

  const educationalPageSchema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: "CAT 2026 Score Calculator & Response Sheet Checker",
    description: "Comprehensive CAT 2026 score calculation, answer key analysis, slot normalization guide, and 2027 MBA admission percentile predictor.",
    url: "https://www.careerwithmohit.online/tools/cat-score-calculator",
    author: {
      "@type": "Person",
      name: "Mohit Jain",
      jobTitle: "Founder & Lead MBA Admissions Consultant",
      url: "https://www.careerwithmohit.online",
      sameAs: [
        "https://www.linkedin.com/in/mohitjainmba",
        "https://api.whatsapp.com/send/?phone=919560020771"
      ],
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: "CareerWithMohit",
      url: "https://www.careerwithmohit.online",
      logo: "https://www.careerwithmohit.online/og-image.webp",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi NCR",
        addressRegion: "Delhi",
        addressCountry: "IN",
      },
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 font-body">
      <JsonLd data={faqSchema} />
      <JsonLd data={webAppSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={educationalPageSchema} />

      {/* Hero */}
      <header className="bg-white border-b-8 border-foreground py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />
          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block bg-amber-400 text-foreground font-black text-xs uppercase px-3 py-1.5 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                CAT 2026 Exam · MBA / PGDM Admission 2027
              </span>
              <span className="inline-block bg-emerald-400 text-foreground font-black text-xs uppercase px-3 py-1.5 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                66 Qs · 198 Max Marks
              </span>
              <span className="inline-block bg-blue-400 text-white font-black text-xs uppercase px-3 py-1.5 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Slot 1 · Slot 2 · Slot 3 Equating
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              CAT 2026{" "}
              <span className="text-amber-500 underline decoration-[10px] md:decoration-[14px] underline-offset-8">
                Score
              </span>{" "}
              Calculator
            </h1>

            <p className="text-lg md:text-2xl font-bold text-slate-700 leading-tight border-l-[12px] border-amber-400 pl-6 md:pl-8">
              Check your official CAT 2026 candidate response sheet & answer key instantly. Calculate raw score out of 198 marks, estimate slot-wise scaled scores, and forecast your exact percentile for 2027 IIM & top B-school admissions.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-amber-50 border-4 border-foreground px-5 py-3 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Zap className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="font-black text-xs md:text-sm uppercase text-slate-800">
                  Response Sheet Scanner
                </span>
              </div>
              <div className="bg-emerald-50 border-4 border-foreground px-5 py-3 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-black text-xs md:text-sm uppercase text-slate-800">
                  +3 / −1 Official Marking
                </span>
              </div>
              <div className="bg-blue-50 border-4 border-foreground px-5 py-3 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <BarChart3 className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="font-black text-xs md:text-sm uppercase text-slate-800">
                  2027 IIM & MBA Call Predictor
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Tool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16" aria-label="CAT 2026 Score Calculator Tool">
        <CatScoreCalculator />

        {/* Deep Dive SEO Content */}
        <div className="mt-28 max-w-4xl space-y-16 animate-in fade-in duration-700">

          {/* Section 1: Response Sheet & Answer Key Scanner */}
          <article>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 md:w-10 md:h-10 text-amber-500 shrink-0" />
              CAT 2026 Response Sheet Check & Answer Key Calculator
            </h2>
            <div className="bg-white border-4 border-foreground p-6 md:p-10 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold text-slate-700 leading-relaxed text-base md:text-lg">
                As soon as the conducting IIM releases the official <strong>CAT 2026 candidate response sheet</strong> and provisional <strong>answer key</strong>, candidates can verify every MCQ and TITA attempt without tedious manual counting. Our built-in <strong>CAT response sheet check tool</strong> reads your official candidate URL (hosted on <code>cdn.digialm.com</code>) or HTML source code directly to compute instant score results.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 border-2 border-foreground p-4">
                  <h3 className="font-black uppercase text-sm mb-2 text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    How to Get Response Sheet Link:
                  </h3>
                  <ol className="list-decimal pl-5 text-xs font-bold text-slate-600 space-y-1.5">
                    <li>Log in to <strong>iimcat.ac.in</strong> with your User ID and Password.</li>
                    <li>Click on the <strong>Candidate Response</strong> tab.</li>
                    <li>Click on the link <em>&quot;click here to generate it&quot;</em>.</li>
                    <li>Copy the browser URL and paste it into our scanner above.</li>
                  </ol>
                </div>

                <div className="bg-slate-50 border-2 border-foreground p-4">
                  <h3 className="font-black uppercase text-sm mb-2 text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    What the Scanner Extracts:
                  </h3>
                  <ul className="list-disc pl-5 text-xs font-bold text-slate-600 space-y-1.5">
                    <li>Total questions detected (Standard 66 Questions).</li>
                    <li>Count of answered vs unattempted questions.</li>
                    <li>Section-wise distribution: 24 VARC, 20 DILR, 22 QA.</li>
                    <li>Accurate raw score out of 198 max marks with −1 penalties.</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* Section 2: Marks vs Percentile Table */}
          <article>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 md:w-10 md:h-10 text-blue-600 shrink-0" />
              CAT 2026 Marks vs Percentile Benchmark (198 Max Marks)
            </h2>
            <div className="bg-white border-4 border-foreground p-6 md:p-10 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold text-slate-700 leading-relaxed text-base">
                In CAT 2026, scoring above <strong>50% raw marks (~100 marks out of 198)</strong> comfortably places an aspirant above the <strong>99.5 percentile</strong>. Because CAT tests relative performance rather than absolute accuracy, understanding raw marks vs percentile targets helps plan mock test benchmarks and target college lists:
              </p>

              <div className="overflow-x-auto border-2 border-foreground">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead className="bg-foreground text-white font-black uppercase">
                    <tr>
                      <th className="p-3.5 border-r border-white/20">Target Percentile</th>
                      <th className="p-3.5 border-r border-white/20">Estimated Raw Marks (out of 198)</th>
                      <th className="p-3.5 border-r border-white/20">VARC Score (72M)</th>
                      <th className="p-3.5 border-r border-white/20">DILR Score (60M)</th>
                      <th className="p-3.5">QA Score (66M)</th>
                    </tr>
                  </thead>
                  <tbody className="font-bold">
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
                        className={`border-b-2 border-slate-200 ${
                          idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                        } hover:bg-amber-50 transition-colors`}
                      >
                        <td className="p-3.5 border-r-2 border-slate-200 font-black text-amber-600">{perc}</td>
                        <td className="p-3.5 border-r-2 border-slate-200 font-black text-foreground">{overall}</td>
                        <td className="p-3.5 border-r-2 border-slate-200">{varc}</td>
                        <td className="p-3.5 border-r-2 border-slate-200">{dilr}</td>
                        <td className="p-3.5">{qa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs font-bold text-slate-500 italic">
                * Note: Exact marks required may fluctuate ±3 to 5 marks depending on the slot difficulty distribution in CAT 2026.
              </p>
            </div>
          </article>

          {/* Section 3: Normalization Mechanics */}
          <article>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-amber-500 shrink-0" />
              How CAT 2026 Normalization & Slot Scaling Works (Slot 1, 2, 3)
            </h2>
            <div className="bg-white border-4 border-foreground p-6 md:p-10 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold text-slate-700 leading-relaxed text-base">
                Because CAT is administered in three distinct shifts across test centers in India, small variations in question paper difficulty naturally occur. To ensure complete fairness for all test takers, IIMs implement a multi-stage <strong>equipercentile equating normalization method</strong> modeled on statistical standardization.
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-amber-400 pl-4 py-1 bg-amber-50/50">
                  <h3 className="font-black uppercase text-sm text-foreground">1. Calculation of Mean & Standard Deviation</h3>
                  <p className="text-xs font-bold text-slate-600 mt-1">
                    The mean and standard deviation of raw scores are computed for each section in every slot, alongside the top 0.1% candidate scores across all slots.
                  </p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4 py-1 bg-blue-50/50">
                  <h3 className="font-black uppercase text-sm text-foreground">2. Scaled Score Equating Formula</h3>
                  <p className="text-xs font-bold text-slate-600 mt-1">
                    The raw score of a candidate is adjusted relative to the performance of all candidates across sessions. If Slot 3 had a harder QA section, candidates in Slot 3 receive an upward adjustment in their scaled QA score.
                  </p>
                </div>
                <div className="border-l-4 border-emerald-400 pl-4 py-1 bg-emerald-50/50">
                  <h3 className="font-black uppercase text-sm text-foreground">3. Percentile Computation</h3>
                  <p className="text-xs font-bold text-slate-600 mt-1">
                    Percentile is calculated as: <code>P = ((N − R) / N) × 100</code>, where <code>N</code> is the total number of test takers and <code>R</code> is the assigned rank based on scaled scores.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Section 4: Top MBA Colleges Accepting CAT by Percentile Tier */}
          <article>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <Building2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 shrink-0" />
              Top MBA Colleges & IIM Cutoffs by CAT Percentile Tier (2027 Admissions)
            </h2>
            <div className="space-y-4">
              {[
                {
                  tier: "Tier 1 (99.0+ Percentile)",
                  colleges: "IIM Ahmedabad, IIM Bangalore, IIM Calcutta, FMS Delhi, SPJIMR Mumbai, SJMSOM IIT Bombay",
                  avgPkg: "₹30 – 35+ LPA",
                  desc: "Premier B-schools in India offering world-class ROI, legacy recruiter networks, and international placements.",
                },
                {
                  tier: "Tier 1.5 (95.0 – 98.9 Percentile)",
                  colleges: "IIM Lucknow, IIM Kozhikode, IIM Indore, IIM Shillong, MDI Gurgaon, DMS IIT Delhi, IIFT Delhi, New IIMs (Udaipur, Trichy, Ranchi)",
                  avgPkg: "₹20 – 28 LPA",
                  desc: "Elite institutions with strong corporate standing, specialized consulting & finance recruitments, and robust alumni bases.",
                },
                {
                  tier: "Tier 2 Top (88.0 – 94.9 Percentile)",
                  colleges: "Baby IIMs (Nagpur, Vizag, Amritsar, Bodh Gaya), IMT Ghaziabad, IMI New Delhi, FORE School of Management, TAPMI, GIM Goa, DoMS IIT Madras",
                  avgPkg: "₹14 – 18 LPA",
                  desc: "Highly reputed management institutes featuring solid marketing, BFSI, and analytics placements with fast application turnaround.",
                },
                {
                  tier: "Tier 2 (75.0 – 87.9 Percentile)",
                  colleges: "Great Lakes (Chennai/Gurgaon), BIMTECH (Greater Noida), K J Somaiya (Mumbai), LBSIM (Delhi), Welingkar (Mumbai/Bangalore), LIBA",
                  avgPkg: "₹11 – 15 LPA",
                  desc: "Top private PGDM colleges with industry-aligned curricula, metro corporate tie-ups, and excellent return on investment.",
                },
                {
                  tier: "Tier 3 (60.0 – 74.9 Percentile)",
                  colleges: "Jaipuria Institute of Management, NDIM New Delhi, JIMS Rohini, SOIL Gurgaon, IBS Hyderabad, ITM Navi Mumbai",
                  avgPkg: "₹8 – 11 LPA",
                  desc: "Metro PGDM institutes offering strong industry exposure, live projects, and dedicated placement assistance.",
                },
              ].map((tierItem, i) => (
                <div
                  key={i}
                  className="bg-white border-4 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-black uppercase text-foreground">
                      {tierItem.tier}
                    </h3>
                    <span className="bg-amber-100 text-amber-800 text-xs font-black px-2.5 py-1 border border-amber-300 uppercase self-start sm:self-auto">
                      Avg CTC: {tierItem.avgPkg}
                    </span>
                  </div>
                  <p className="text-sm font-black text-slate-800 mb-1">
                    {tierItem.colleges}
                  </p>
                  <p className="text-xs font-bold text-slate-600">
                    {tierItem.desc}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Section 5: Geo SEO - Regional MBA Hubs */}
          <article>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8 md:w-10 md:h-10 text-rose-500 shrink-0" />
              Regional MBA Admissions by CAT Score: Top State & Metro Hubs
            </h2>
            <div className="bg-white border-4 border-foreground p-6 md:p-8 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold text-slate-700 leading-relaxed text-sm md:text-base">
                Depending on your location preferences and career goals, exploring regional MBA hubs allows you to leverage localized corporate recruitment ecosystems in India’s leading commercial centers:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/colleges/mba-colleges-delhi-ncr"
                  className="p-5 border-2 border-foreground bg-amber-50/50 hover:bg-amber-100 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-base uppercase text-foreground group-hover:text-amber-800">
                      Delhi NCR MBA Colleges →
                    </h3>
                    <span className="text-[10px] font-black uppercase bg-white px-2 py-0.5 border border-foreground">
                      Top Hub
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600">
                    FMS Delhi, MDI Gurgaon, IMT Ghaziabad, IMI New Delhi, FORE, LBSIM, BIMTECH. Corporate capital of India.
                  </p>
                </Link>

                <Link
                  href="/colleges/mba-colleges-mumbai"
                  className="p-5 border-2 border-foreground bg-blue-50/50 hover:bg-blue-100 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-base uppercase text-foreground group-hover:text-blue-800">
                      Mumbai MBA Colleges →
                    </h3>
                    <span className="text-[10px] font-black uppercase bg-white px-2 py-0.5 border border-foreground">
                      Financial Hub
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600">
                    SPJIMR, SJMSOM IIT Bombay, JBIMS, K J Somaiya, Welingkar, NIBM. Capital of Banking, Finance & FinTech.
                  </p>
                </Link>

                <Link
                  href="/colleges/mba-colleges-bangalore"
                  className="p-5 border-2 border-foreground bg-emerald-50/50 hover:bg-emerald-100 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-base uppercase text-foreground group-hover:text-emerald-800">
                      Bangalore MBA Colleges →
                    </h3>
                    <span className="text-[10px] font-black uppercase bg-white px-2 py-0.5 border border-foreground">
                      Tech & Startups
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600">
                    IIM Bangalore, IISc DoMS, TAPMI, XIME Bangalore, Alliance University. Silicon Valley of India.
                  </p>
                </Link>

                <Link
                  href="/colleges/mba-colleges-pune"
                  className="p-5 border-2 border-foreground bg-violet-50/50 hover:bg-violet-100 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-base uppercase text-foreground group-hover:text-violet-800">
                      Pune MBA Colleges →
                    </h3>
                    <span className="text-[10px] font-black uppercase bg-white px-2 py-0.5 border border-foreground">
                      Auto & IT Hub
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600">
                    SIBM Pune, SCMHRD, BIMM, PIBM, NIBM, PUMBA. Oxford of the East with massive manufacturing & IT footprint.
                  </p>
                </Link>

                <Link
                  href="/colleges/mba-colleges-hyderabad"
                  className="p-5 border-2 border-foreground bg-rose-50/50 hover:bg-rose-100 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-base uppercase text-foreground group-hover:text-rose-800">
                      Hyderabad MBA Colleges →
                    </h3>
                    <span className="text-[10px] font-black uppercase bg-white px-2 py-0.5 border border-foreground">
                      Pharma & Tech
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600">
                    ISB Hyderabad, IPE, IBS Hyderabad, NMIMS Hyderabad, VJIM. Rapidly expanding global tech hub.
                  </p>
                </Link>

                <Link
                  href="/colleges/mba-colleges-kolkata"
                  className="p-5 border-2 border-foreground bg-cyan-50/50 hover:bg-cyan-100 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-base uppercase text-foreground group-hover:text-cyan-800">
                      Kolkata & East MBA Colleges →
                    </h3>
                    <span className="text-[10px] font-black uppercase bg-white px-2 py-0.5 border border-foreground">
                      Eastern Capital
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600">
                    IIM Calcutta, VGSoM IIT Kharagpur, IMI Kolkata, MDI Murshidabad. Gateway to Eastern commercial corridors.
                  </p>
                </Link>
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/mba-pgdm-admissions-by-region"
                  className="inline-flex items-center gap-2 bg-foreground text-white font-black text-xs uppercase px-6 py-3 border-2 border-foreground hover:bg-amber-400 hover:text-foreground transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  Explore All 8 Indian MBA Regions & State Admissions Guide →
                </Link>
              </div>
            </div>
          </article>

          {/* Section 6: How to Use */}
          <article>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
              <Target className="w-8 h-8 md:w-10 md:h-10 text-amber-500 shrink-0" />
              How to Calculate Your CAT 2026 Score (5 Easy Steps)
            </h2>
            <div className="space-y-4">
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
                  className="bg-white border-4 border-foreground p-6 flex gap-6 items-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="bg-foreground text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-black text-lg md:text-xl shrink-0 border-4 border-amber-400">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-base md:text-lg mb-1">{title}</h3>
                    <p className="font-bold text-slate-600 text-xs md:text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Section 7: FAQs */}
          <article>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-amber-500 shrink-0" />
              Frequently Asked Questions: CAT 2026 Scoring & Response Sheet
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "How is the CAT 2026 raw score calculated for 2027 admissions?",
                  a: "CAT 2026 follows a 66-question format with a maximum raw score of 198 marks (24 VARC, 20 DILR, 22 QA). Multiple Choice Questions (MCQs) award +3 marks for every correct answer and deduct −1 mark for every incorrect answer. Non-MCQ / TITA (Type In The Answer) questions award +3 marks for correct answers and carry 0 negative marking for wrong or unattempted responses.",
                },
                {
                  q: "How can I check my CAT 2026 response sheet and answer key with this calculator?",
                  a: "Once IIM releases the official CAT response sheet on cdn.digialm.com / iimcat.ac.in, copy your candidate response sheet URL or view page source (Ctrl+U) and paste it into our scanner. The calculator automatically analyzes your MCQ/TITA attempts across VARC, DILR, and QA to compute your raw score, apply slot normalization, and forecast your 2027 MBA admission percentile.",
                },
                {
                  q: "What is the difference between CAT raw score and scaled score?",
                  a: "The raw score is the literal sum of your correct (+3) and incorrect (−1/0) marks out of 198. Because CAT is conducted across Slot 1, Slot 2, and Slot 3 with varying difficulty levels, IIMs employ a scientific normalization formula (equating mean and standard deviation) to generate the Scaled Score. Your final percentile is calculated strictly from this scaled score.",
                },
                {
                  q: "What CAT 2026 score is required for 99+ percentile in 2027 admissions?",
                  a: "Based on historical trends across 66-question CAT exams, a raw score of roughly 82 to 94 marks out of 198 fetches a 99.0+ percentile. A score of 95 to 109 marks yields a 99.5+ percentile, and a score of 110+ marks generally secures a 99.9+ percentile, qualifying aspirants for top IIM Ahmedabad, Bangalore, and Calcutta interview shortlists.",
                },
                {
                  q: "How does the CAT normalization formula work across Slot 1, Slot 2, and Slot 3?",
                  a: "IIMs use equipercentile equating to normalize CAT scores. The formula compares the mean and standard deviation of candidate scores in a specific slot with the master mean across all slots, with special weightage to the top 0.1% performers. Tougher slots receive upward score adjustment, while easier slots may see a slight downward calibration.",
                },
                {
                  q: "Is there sectional negative marking in CAT 2026?",
                  a: "Sectional marking is uniform across VARC, DILR, and QA: +3 for correct MCQs, −1 for wrong MCQs, +3 for correct TITA, and 0 for wrong TITA. Candidates must also meet individual sectional cut-offs (usually 70-85+ percentile per section) to qualify for IIM calls.",
                },
                {
                  q: "What are the expected CAT cut-offs for top Non-IIM B-schools like FMS, MDI, SPJIMR, and IITs?",
                  a: "FMS Delhi typically requires 99.3+ percentile; SPJIMR Mumbai shortlists profile-cum-score candidates around 85-98 percentile; MDI Gurgaon requires 95-97 percentile; DMS IIT Delhi and SJMSOM IIT Bombay require 98-99 percentile; IMT Ghaziabad and IMI Delhi require 90-93 percentile; and Baby IIMs (CAP round) generally cutoff at 92-94 percentile.",
                },
                {
                  q: "Which top MBA colleges accept 80 to 90 percentile in CAT 2026?",
                  a: "Candidates scoring between 80 and 90 percentile (raw score of 42 to 64 marks) can target reputed B-schools such as FORE School of Management (Delhi), GIM Goa, TAPMI Manipal, Great Lakes (Chennai/Gurgaon), BIMTECH (Greater Noida), LBSIM (Delhi), K J Somaiya (Mumbai), and LIBA (Chennai).",
                },
                {
                  q: "How do I challenge a question in the provisional CAT answer key?",
                  a: "During the 3-day objection window post-exam, log in to iimcat.ac.in, select the Objection tab, choose the Question ID, submit your justification with supporting documentation, and pay the requisite fee (approx. INR 1,200 per question). If your challenge is accepted, the fee is refunded and the answer key is updated for all candidates.",
                },
                {
                  q: "Can I get admission into good MBA colleges with a 70 percentile in CAT?",
                  a: "Yes! High-ROI colleges accepting 70-80 CAT percentiles include Welingkar (Mumbai/Bangalore), Jaipuria Institute of Management, NDIM New Delhi, JIMS Rohini, SOIL Gurgaon, IBS Hyderabad, and ITM Navi Mumbai. Many colleges also accept alternative scores like XAT, CMAT, and MAT.",
                },
              ].map(({ q, a }, i) => (
                <details
                  key={i}
                  className="bg-white border-4 border-foreground p-6 group cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <summary className="text-base md:text-lg font-black uppercase flex justify-between items-center list-none select-none">
                    <span>{q}</span>
                    <span className="group-open:rotate-180 transition-transform ml-4 shrink-0 text-amber-500 font-black">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-4 font-bold text-slate-600 text-sm leading-relaxed border-t-2 border-slate-100 pt-4">
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </article>

          {/* Section 8: Related Resources */}
          <article className="pt-4">
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-amber-500 shrink-0" />
              Related CAT 2026 & MBA 2027 Admission Resources
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/tools/cat-mock-test"
                className="bg-white border-4 border-foreground p-5 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  <span className="text-xs text-amber-600 block uppercase tracking-wider">Free Test</span>
                  <span className="text-sm uppercase">CAT 2026 Mock Test →</span>
                </div>
              </Link>

              <Link
                href="/blog/cat-2026-score-calculator-marks-vs-percentile"
                className="bg-white border-4 border-foreground p-5 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  <span className="text-xs text-blue-600 block uppercase tracking-wider">Guide</span>
                  <span className="text-sm uppercase">Marks vs Percentile Guide →</span>
                </div>
              </Link>

              <Link
                href="/tools/mat-score-calculator"
                className="bg-white border-4 border-foreground p-5 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  <span className="text-xs text-emerald-600 block uppercase tracking-wider">Exam Tool</span>
                  <span className="text-sm uppercase">MAT Score Calculator →</span>
                </div>
              </Link>

              <Link
                href="/tools/xat-score-calculator-2027"
                className="bg-white border-4 border-foreground p-5 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  <span className="text-xs text-rose-600 block uppercase tracking-wider">XLRI Exam</span>
                  <span className="text-sm uppercase">XAT Score Calculator →</span>
                </div>
              </Link>

              <Link
                href="/tools/college-comparison"
                className="bg-white border-4 border-foreground p-5 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  <span className="text-xs text-purple-600 block uppercase tracking-wider">Compare</span>
                  <span className="text-sm uppercase">Compare MBA Colleges →</span>
                </div>
              </Link>

              <Link
                href="/mba-pgdm-admissions-by-region"
                className="bg-amber-400 text-foreground border-4 border-foreground p-5 font-black hover:bg-foreground hover:text-white transition-colors flex items-center justify-between group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  <span className="text-xs block uppercase tracking-wider">Consultation</span>
                  <span className="text-sm uppercase">MBA Counselling 2027 →</span>
                </div>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
