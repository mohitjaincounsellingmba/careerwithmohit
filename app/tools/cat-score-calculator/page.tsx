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
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CAT Score Calculator 2026 | Response Sheet Check, Answer Key & 2027 Admission Percentile",
  description:
    "Free CAT 2026 Score Calculator & Response Sheet Check for MBA Admission in 2027. Enter your VARC, DILR & QA attempts or scan your answer key URL to calculate raw score, scaled score & expected IIM percentile.",
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
    "degree admission 2027"
  ],
  alternates: {
    canonical: "/tools/cat-score-calculator",
  },
  openGraph: {
    title: "CAT Score Calculator 2026 | Response Sheet Check & 2027 MBA Percentile",
    description:
      "Free CAT 2026 Score Calculator & Response Sheet Check. Instantly calculate raw score, scaled score, and expected percentile for 2027 MBA / PGDM admissions.",
    type: "website",
    url: "https://www.careerwithmohit.online/tools/cat-score-calculator",
    siteName: "CareerWithMohit",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "CAT 2026 Score Calculator Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CAT Score Calculator 2026 | Response Sheet Check & 2027 MBA Percentile",
    description: "Free CAT 2026 Score Calculator & Response Sheet Check. Calculate raw score, scaled score, and expected percentile for 2027 admissions.",
    images: ["/og-image.webp"],
  }
};

export default function CatScoreCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is the CAT 2026 score calculated for 2027 admissions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CAT 2026 uses a differential marking scheme: +3 for every correct MCQ answer, −1 for every wrong MCQ answer. TITA (Type In The Answer) questions carry +3 for correct answers and 0 for wrong or unattempted. The raw score is then scaled/equated across slots to produce the final scaled score for 2027 IIM and MBA admissions.",
        },
      },
      {
        "@type": "Question",
        name: "How can I check my CAT 2026 response sheet and answer key?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "After IIMs release the official CAT 2026 candidate response sheet and answer key, simply paste your response sheet URL or HTML page source into our scanner tool. The calculator automatically detects your correct and incorrect MCQ/TITA attempts across VARC, DILR, and QA to calculate your raw score, scaled score, and percentile for MBA Admission 2027.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between raw score and scaled score in CAT 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The raw score is computed directly from your answers using the marking scheme (+3/−1). The scaled score is derived through statistical equating to account for difficulty differences between CAT 2026 exam slots. IIMs use the scaled score to compute your percentile for 2027 MBA admissions.",
        },
      },
      {
        "@type": "Question",
        name: "What CAT 2026 percentile is needed for IIM Ahmedabad 2027 admission?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IIM Ahmedabad typically shortlists candidates for 2027 admission with an overall CAT percentile of 99+ and section-wise percentiles above 90. A CAT 2026 raw score of 185+ is generally required to be in that range.",
        },
      },
      {
        "@type": "Question",
        name: "How many questions are in CAT 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CAT 2026 is expected to have 66 questions across 3 sections: VARC (24 questions), DILR (20 questions), and QA (22 questions). The exam is 2 hours long with 40 minutes per section.",
        },
      },
      {
        "@type": "Question",
        name: "Is there negative marking for TITA questions in CAT 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. There is no negative marking for TITA (Type In The Answer) questions in CAT 2026. Wrong TITA answers receive 0 marks, while correct ones receive +3 marks. Only MCQ wrong answers attract a penalty of −1 mark.",
        },
      },
    ],
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CAT Score Calculator 2026 & Response Sheet Check (2027 Admission)",
    description:
      "Online CAT 2026 score calculator, response sheet check and answer key checker to calculate raw score, scaled score and predict percentile for 2027 MBA and PGDM admissions.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <JsonLd data={faqSchema} />
      <JsonLd data={webAppSchema} />

      {/* Hero */}
      <div className="bg-white border-b-8 border-foreground py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />
          <div className="mt-8 max-w-4xl">
            <div className="inline-block bg-amber-400 text-foreground font-black text-xs uppercase px-3 py-1.5 mb-4 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              CAT 2026 Exam · MBA / PGDM Admission 2027
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              CAT 2026{" "}
              <span className="text-amber-500 underline decoration-[12px] underline-offset-8">
                Score
              </span>{" "}
              Calculator
            </h1>
            <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-amber-400 pl-8">
              Check your CAT 2026 response sheet & answer key instantly. Calculate your raw score, scaled score & expected percentile for MBA Admission 2027. Built for IIM aspirants — free, instant & accurate.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-amber-50 border-4 border-amber-300 px-5 py-3 flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-600" />
                <span className="font-black text-sm uppercase text-amber-800">
                  Response Sheet Check
                </span>
              </div>
              <div className="bg-emerald-50 border-4 border-emerald-300 px-5 py-3 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="font-black text-sm uppercase text-emerald-800">
                  CAT 2026 Answer Key
                </span>
              </div>
              <div className="bg-blue-50 border-4 border-blue-300 px-5 py-3 flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="font-black text-sm uppercase text-blue-800">
                  2027 MBA Admission Predictor
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <CatScoreCalculator />

        {/* Deep Dive SEO Content */}
        <div className="mt-32 max-w-4xl space-y-12 animate-in fade-in duration-700">
          {/* Response Sheet & Answer Key Check */}
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-4">
              <Zap className="w-10 h-10 text-amber-500" />
              CAT 2026 Response Sheet Check & Answer Key Calculator
            </h2>
            <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
              <p className="font-bold text-slate-700 leading-relaxed">
                As soon as IIMs release the official <strong>CAT 2026 candidate response sheet</strong> and <strong>answer key</strong>, you can check your attempts and score instantly without manual counting. Our built-in <strong>response sheet check</strong> tool lets you scan your candidate URL or paste your HTML source code directly.
              </p>
              <p className="font-bold text-slate-700 leading-relaxed">
                The calculator automatically counts your correct and incorrect MCQ and TITA answers across VARC, DILR, and QA, calculates your sectional & overall raw scores, and predicts your expected percentile for <strong>MBA Admission 2027</strong> in top IIMs and B-schools.
              </p>
            </div>
          </div>

          {/* Normalization */}
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-4">
              <TrendingUp className="w-10 h-10 text-amber-500" />
              How CAT 2026 Raw Score is Normalized to Scaled Score (2027 Admissions)
            </h2>
            <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
              <p className="font-bold text-slate-700 leading-relaxed">
                Since the <strong>CAT 2026 exam</strong> is conducted in multiple slots (usually Slot 1, Slot 2, and Slot 3) across the country, the difficulty level of the test papers varies slightly. To ensure fairness, IIMs employ a scientific <strong>normalization process</strong>.
              </p>
              <p className="font-bold text-slate-700 leading-relaxed">
                The normalization is based on a gating formula that equates the mean and standard deviation of scores across different slots. The resulting <strong>scaled score</strong> is what determines your final CAT percentile for MBA and PGDM admission in 2027. Our <strong>CAT 2026 percentile predictor</strong> utilizes statistical trends from past years to give you the closest estimate.
              </p>
            </div>
          </div>

          {/* Marks vs Percentile */}
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-4">
              <BarChart3 className="w-10 h-10 text-blue-600" />
              CAT 2026 Marks vs Percentile Projection (For 2027 MBA Admissions)
            </h2>
            <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
              <p className="font-bold text-slate-700 leading-relaxed">
                To achieve a 99+ percentile in <strong>CAT Exam 2026</strong>, a student typically needs a raw score around 100-110 marks, depending on slot difficulty. This table highlights historical trends for <strong>2027 IIM admissions</strong>:
              </p>
              <ul className="list-disc pl-6 font-bold text-slate-600 space-y-2">
                <li><strong>99.9+ Percentile:</strong> Raw Score ~155+ (Excellent profile checks for IIM A, B, C calls)</li>
                <li><strong>99.0+ Percentile:</strong> Raw Score ~105-110 (Strong chances for Baby/New IIMs and Tier-1 colleges)</li>
                <li><strong>95.0+ Percentile:</strong> Raw Score ~75-80 (Good for MDI Gurgaon, SPJIMR profiles, IITs)</li>
                <li><strong>90.0+ Percentile:</strong> Raw Score ~60-65 (Opens doors to top Tier-2 MBA programs)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* About CAT 2026 */}
        <div className="mt-32 max-w-4xl">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
            <BookOpen className="w-10 h-10 text-amber-500" />
            CAT 2026 Exam – What You Need to Know (2027 Academic Session)
          </h2>
          <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
            <p className="font-bold text-slate-700 leading-relaxed text-lg">
              The <strong>Common Admission Test (CAT 2026)</strong> is conducted
              by the IIMs on a rotational basis for <strong>MBA Admission 2027</strong>. It is the most competitive MBA
              entrance exam in India, with over 3 lakh aspirants competing for
              seats in IIMs and 1,200+ other business schools.
            </p>
            <div className="overflow-x-auto border-4 border-foreground mt-6">
              <table className="w-full text-left border-collapse">
                <tbody className="text-base font-bold">
                  {[
                    ["Exam Name", "CAT 2026 (Common Admission Test)"],
                    ["Admission Year", "2027 – 2029 MBA / PGDM Batch"],
                    ["Conducting Body", "IIMs (rotational)"],
                    ["Exam Mode", "Online Computer Based Test (CBT)"],
                    ["Total Questions", "66 (approx.)"],
                    ["Total Duration", "2 hours (120 minutes)"],
                    ["Sections", "VARC · DILR · QA"],
                    ["Marking Scheme", "+3 correct MCQ, −1 wrong MCQ, +3 correct TITA"],
                    ["Negative Marking on TITA", "None"],
                    ["Max Raw Score", "228"],
                  ].map(([key, val], i) => (
                    <tr key={i} className="border-b-2 border-slate-200">
                      <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black w-1/2">
                        {key}
                      </td>
                      <td className="p-5">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* How to use */}
        <div className="mt-32 max-w-4xl">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
            <Target className="w-10 h-10 text-amber-500" />
            How to Use This CAT 2026 Calculator
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Scan Answer Key or Select Section",
                desc: 'Paste your CAT 2026 response sheet link in Step 1, OR click on VARC, DILR, or QA tabs to enter responses manually.',
              },
              {
                step: "02",
                title: "Enter Correct MCQs",
                desc: "Count the number of MCQ questions you answered correctly in the section.",
              },
              {
                step: "03",
                title: "Enter Wrong MCQs",
                desc: "Count the number of MCQ questions you answered incorrectly (attracts −1 penalty).",
              },
              {
                step: "04",
                title: "Enter Correct TITA",
                desc: "Enter how many TITA questions you answered correctly. No penalty for wrong TITA.",
              },
              {
                step: "05",
                title: "Check 2027 Admission Percentile",
                desc: "Fill in all three sections to instantly view your CAT 2026 raw score, scaled score, and expected percentile for MBA Admission 2027.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="bg-white border-4 border-foreground p-6 flex gap-6 items-start"
              >
                <div className="bg-foreground text-white w-14 h-14 flex items-center justify-center font-black text-xl shrink-0 border-4 border-amber-400">
                  {step}
                </div>
                <div>
                  <h4 className="font-black uppercase text-lg mb-1">{title}</h4>
                  <p className="font-bold text-slate-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck className="w-12 h-12 text-amber-500 mb-6" />,
              title: "Official Marking Scheme",
              desc: "Strictly follows CAT 2026 marking scheme: +3/−1 for MCQ, +3/0 for TITA.",
            },
            {
              icon: <TrendingUp className="w-12 h-12 text-blue-600 mb-6" />,
              title: "2027 MBA Predictor",
              desc: "Based on 5+ years of CAT data trends to give you a reliable IIM percentile estimate.",
            },
            {
              icon: <Zap className="w-12 h-12 text-emerald-600 mb-6" />,
              title: "Response Sheet Check",
              desc: "Scan your official CAT 2026 response sheet URL or HTML source code instantly.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              {icon}
              <h4 className="text-xl font-black uppercase mb-4">{title}</h4>
              <p className="font-bold text-slate-600">{desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-32 max-w-4xl">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-12">
            CAT 2026 Score Calculator & Response Sheet – FAQs (2027 Admissions)
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How is the CAT 2026 score calculated for 2027 admissions?",
                a: "CAT 2026 uses +3 for correct MCQs, −1 for wrong MCQs, and +3 for correct TITA questions with no negative marking on TITA. The raw score out of 228 is then statistically scaled/equated across different exam slots for 2027 MBA and PGDM admissions.",
              },
              {
                q: "How can I check my CAT 2026 response sheet and answer key?",
                a: "After IIMs release the official CAT 2026 candidate response sheet and answer key, simply paste your response sheet URL or HTML page source into our scanner tool. The calculator automatically counts your correct and incorrect MCQ/TITA attempts across VARC, DILR, and QA to predict your score.",
              },
              {
                q: "What is a good CAT 2026 score for IIM A, B, C?",
                a: "A raw score of 185+ (scaled ~190+) usually corresponds to 99.5+ percentile required for IIM Ahmedabad, Bangalore, and Calcutta 2027 shortlists.",
              },
              {
                q: "Does the calculator account for CAT 2026 slot scaling?",
                a: "Our tool gives an estimated scaled score based on historical slot trends. The official scaled score is computed by IIMs after the exam using a normalization process across all slots.",
              },
              {
                q: "Can I use this for previous year CAT papers?",
                a: "Yes! You can use this calculator for any CAT year as long as the exam followed the standard 66-question, 228-mark format. Note that the total questions may vary slightly by year.",
              },
              {
                q: "Is there negative marking for TITA questions in CAT 2026?",
                a: "No. TITA (Type In The Answer) questions have no negative marking in CAT 2026. A wrong TITA answer gets 0, and a correct one gets +3.",
              },
            ].map(({ q, a }, i) => (
              <details
                key={i}
                className="bg-white border-4 border-foreground p-6 group cursor-pointer"
              >
                <summary className="text-lg font-black uppercase flex justify-between items-center list-none">
                  {q}
                  <span className="group-open:rotate-180 transition-transform ml-4 shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 font-bold text-slate-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Popular Searches & Related Keywords */}
        <div className="mt-32 max-w-4xl">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
            <BookOpen className="w-10 h-10 text-amber-500" />
            CAT 2026 & MBA Admission 2027: Popular Searches & Keywords
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border-4 border-foreground p-6 space-y-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2">Answer Key & Response Sheet</h4>
              <ul className="space-y-2 text-sm font-bold text-slate-600 italic">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> cat 2026 response sheet check</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> cat 2026 answer key</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> cat 2026 answer key check</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> cat 2026 response sheet calculator</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> cat answer key url scanner</li>
              </ul>
            </div>

            <div className="bg-white border-4 border-foreground p-6 space-y-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2">Score vs Percentile 2026</h4>
              <ul className="space-y-2 text-sm font-bold text-slate-600 italic">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> cat score calculator 2026</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> cat 2026 score calculator</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> cat marks vs percentile 2026</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> expected score for 99 percentile</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> cat 2026 percentile predictor</li>
              </ul>
            </div>

            <div className="bg-white border-4 border-foreground p-6 space-y-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2">MBA & PGDM Admission 2027</h4>
              <ul className="space-y-2 text-sm font-bold text-slate-600 italic">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> mba admission 2027</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> pgdm admission 2027</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> degree admission 2027</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> iim admission score calculator 2027</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500 shrink-0" /> iim call predictor 2027</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Internal Links */}
        <div className="mt-32">
          <h3 className="text-2xl font-black uppercase mb-6">
            Related CAT 2026 & MBA 2027 Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/tools/cat-mock-test"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>Free CAT 2026 Mock Test →</span>
            </Link>
            <Link
              href="/blog/cat-2026-score-calculator-marks-vs-percentile"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>CAT 2026 Marks vs Percentile Guide →</span>
            </Link>
            <Link
              href="/previous-year-papers"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>CAT Previous Year Papers →</span>
            </Link>
            <Link
              href="/colleges"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>Top MBA Colleges 2027 →</span>
            </Link>
            <Link
              href="/services"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>Book MBA 2027 Admission Counselling →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

