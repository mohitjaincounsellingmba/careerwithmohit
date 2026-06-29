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
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CAT Score Calculator 2026 | Raw Score, Scaled Score & Percentile Predictor",
  description:
    "Free CAT 2026 Score Calculator. Enter your VARC, DILR & QA attempts to instantly calculate your raw score, scaled score, and expected percentile for IIM admissions.",
  keywords: [
    "CAT score calculator 2026",
    "CAT 2026 score calculator",
    "cat marks calculator",
    "cat percentile calculator",
    "cat raw score calculator",
    "cat scaled score",
    "cat score predictor 2026",
    "cat 2026 percentile predictor",
    "cat answer key calculator",
    "cat marks vs percentile 2026",
    "IIM admission score calculator",
    "cat varc dilr qa score",
  ],
  alternates: {
    canonical: "/tools/cat-score-calculator",
  },
  openGraph: {
    title: "CAT Score Calculator 2026 | Raw Score & Percentile Predictor",
    description:
      "Free CAT 2026 Score Calculator. Instantly calculate raw score, scaled score, and expected percentile for IIM admissions.",
    type: "website",
    url: "https://www.careerwithmohit.online/tools/cat-score-calculator",
  },
};

export default function CatScoreCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is the CAT 2026 score calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CAT uses a differential marking scheme: +3 for every correct MCQ answer, −1 for every wrong MCQ answer. TITA (Type In The Answer) questions carry +3 for correct answers and 0 for wrong or unattempted. The raw score is then scaled/equated across slots to produce the final scaled score.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between raw score and scaled score in CAT 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The raw score is the score computed directly from your answers using the marking scheme (+3/−1). The scaled score (also called equated score) is derived through statistical equating to account for difficulty differences between exam slots. IIMs use the scaled score to compute your percentile.",
        },
      },
      {
        "@type": "Question",
        name: "What CAT percentile is needed for IIM Ahmedabad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IIM Ahmedabad typically shortlists candidates with an overall CAT percentile of 99+ and section-wise percentiles above 90. A raw score of 185+ is generally required to be in that range.",
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
        name: "Is there negative marking for TITA questions in CAT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. There is no negative marking for TITA (Type In The Answer) questions. Wrong TITA answers receive 0 marks, while correct ones receive +3 marks. Only MCQ wrong answers attract a penalty of −1 mark.",
        },
      },
    ],
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CAT Score Calculator 2026",
    description:
      "Online tool to calculate CAT 2026 raw score, scaled score and predict percentile for IIM and top MBA college admissions.",
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              CAT 2026{" "}
              <span className="text-amber-500 underline decoration-[12px] underline-offset-8">
                Score
              </span>{" "}
              Calculator
            </h1>
            <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-amber-400 pl-8">
              Calculate your CAT 2026 raw score, scaled score & expected
              percentile section-wise. Built for IIM aspirants — free, instant &
              accurate.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-amber-50 border-4 border-amber-300 px-5 py-3 flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-600" />
                <span className="font-black text-sm uppercase text-amber-800">
                  Instant Results
                </span>
              </div>
              <div className="bg-emerald-50 border-4 border-emerald-300 px-5 py-3 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="font-black text-sm uppercase text-emerald-800">
                  Official Marking Scheme
                </span>
              </div>
              <div className="bg-blue-50 border-4 border-blue-300 px-5 py-3 flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="font-black text-sm uppercase text-blue-800">
                  Percentile Prediction
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
          {/* Normalization */}
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-4">
              <TrendingUp className="w-10 h-10 text-amber-500" />
              How CAT 2026 Raw Score is Normalized to Scaled Score
            </h2>
            <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
              <p className="font-bold text-slate-700 leading-relaxed">
                Since the <strong>CAT 2026 exam</strong> is conducted in multiple slots (usually Slot 1, Slot 2, and Slot 3) across the country, the difficulty level of the test papers varies slightly. To ensure fairness, IIMs employ a scientific <strong>normalization process</strong>.
              </p>
              <p className="font-bold text-slate-700 leading-relaxed">
                The normalization is based on a gating formula that equates the mean and standard deviation of scores across different slots. The resulting <strong>scaled score</strong> is what determines your final CAT percentile. Our <strong>CAT percentile predictor 2026</strong> utilizes statistical trends from past years to give you the closest estimate.
              </p>
            </div>
          </div>

          {/* Marks vs Percentile */}
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-4">
              <BarChart3 className="w-10 h-10 text-blue-600" />
              CAT 2026 Marks vs Percentile Projection
            </h2>
            <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
              <p className="font-bold text-slate-700 leading-relaxed">
                To achieve a 99+ percentile in <strong>CAT Exam 2026</strong>, a student typically needs a raw score around 100-110 marks, depending on slot difficulty. This table highlights historical trends:
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
            CAT 2026 – What You Need to Know
          </h2>
          <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
            <p className="font-bold text-slate-700 leading-relaxed text-lg">
              The <strong>Common Admission Test (CAT 2026)</strong> is conducted
              by the IIMs on a rotational basis. It is the most competitive MBA
              entrance exam in India, with over 3 lakh aspirants competing for
              seats in IIMs and 1,200+ other business schools.
            </p>
            <div className="overflow-x-auto border-4 border-foreground mt-6">
              <table className="w-full text-left border-collapse">
                <tbody className="text-base font-bold">
                  {[
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
            How to Use This Calculator
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Select Section",
                desc: 'Click on VARC, DILR, or QA tab to enter responses for each section.',
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
                title: "Repeat for All Sections",
                desc: "Fill in all three sections for the most accurate overall score and percentile.",
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
              title: "Accurate Marking",
              desc: "Strictly follows CAT's official marking scheme: +3/−1 for MCQ, +3/0 for TITA.",
            },
            {
              icon: <TrendingUp className="w-12 h-12 text-blue-600 mb-6" />,
              title: "Percentile Prediction",
              desc: "Based on 5+ years of CAT data trends to give you a reliable percentile estimate.",
            },
            {
              icon: <Zap className="w-12 h-12 text-emerald-600 mb-6" />,
              title: "Section-wise Insights",
              desc: "See individual section scores and percentiles so you know your strengths.",
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
            CAT 2026 Score Calculator – FAQs
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How is the CAT 2026 score calculated?",
                a: "CAT uses +3 for correct MCQs, −1 for wrong MCQs, and +3 for correct TITA questions with no negative marking on TITA. The raw score is then statistically scaled/equated across different exam slots.",
              },
              {
                q: "What is a good CAT score for IIM A, B, C?",
                a: "A raw score of 185+ (scaled ~190+) usually corresponds to 99.5+ percentile required for IIM Ahmedabad, Bangalore, and Calcutta shortlists.",
              },
              {
                q: "Does the calculator account for scaling?",
                a: "Our tool gives an estimated scaled score based on historical trends. The official scaled score is computed by IIMs after the exam using a normalization process across all slots.",
              },
              {
                q: "Can I use this for previous year CAT papers?",
                a: "Yes! You can use this calculator for any CAT year as long as the exam followed the standard 66-question, 228-mark format. Note that the total questions may vary slightly by year.",
              },
              {
                q: "Is there negative marking for TITA questions?",
                a: "No. TITA (Type In The Answer) questions have no negative marking. A wrong TITA answer gets 0, and a correct one gets +3.",
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

        {/* Internal Links */}
        <div className="mt-32">
          <h3 className="text-2xl font-black uppercase mb-6">
            Related CAT Resources
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
              <span>Top MBA Colleges 2026 →</span>
            </Link>
            <Link
              href="/services"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>Book CAT Counselling Session →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
