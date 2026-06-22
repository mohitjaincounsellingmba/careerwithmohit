import type { Metadata } from "next";
import { XatScoreCalculator } from "@/components/XatScoreCalculator";
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
  alternates: {
    canonical: '/tools/xat-score-calculator-2027',
  },
  title: "XAT Score Calculator 2027 – Predict Percentile & Expected Score",
  description:
    "Use the XAT Score Calculator 2027 to predict your percentile, estimate marks, analyze response sheets, and check expected XLRI cutoffs instantly.",
  keywords: [
    "XAT Score Calculator 2027",
    "XAT 2027 Score Calculator",
    "XAT Percentile Predictor 2027",
    "XAT Marks vs Percentile 2027",
    "XAT 2027 Percentile Calculator",
    "XAT Expected Percentile 2027",
    "XAT Response Sheet Calculator 2027",
    "XAT Rank Predictor 2027",
    "Calculate XAT 2027 score online",
    "XAT 2027 score vs percentile",
    "XAT percentile predictor after exam",
    "XAT response sheet score calculator",
    "Free XAT score calculator 2027",
    "Accurate XAT percentile predictor 2027",
    "XAT 2027 expected cutoff calculator",
    "Check XAT score instantly",
    "XAT answer key and score calculator",
    "XAT 2027 score prediction tool",
  ],
  openGraph: {
    title: "XAT Score Calculator 2027 – Predict Percentile & Expected Score",
    description:
      "Use the XAT Score Calculator 2027 to predict your percentile, estimate marks, analyze response sheets, and check expected XLRI cutoffs instantly.",
    type: "website",
  },
};

export default function XatScoreCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is the XAT 2027 score calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "XAT uses a penalization marking scheme: +1 for every correct answer, −0.25 for every wrong answer. Additionally, for every unattempted question beyond 8 questions, there is a penalty of −0.10 marks per question.",
        },
      },
      {
        "@type": "Question",
        name: "What XAT percentile is needed for XLRI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "XLRI typically looks for candidates with high percentiles, often in the range of 95-96 and above for its flagship BM and HRM programs. However, the exact cutoff may vary based on the program and the year.",
        },
      },
      {
        "@type": "Question",
        name: "What is the sectional breakdown of the XAT question paper?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The XAT question paper (Part 1) consists of sections like Verbal and Logical Ability (VALR), Decision Making (DM), and Quantitative Ability & Data Interpretation (QA/DI).",
        },
      },
      {
        "@type": "Question",
        name: "What is 40 marks in XAT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "40 marks in the XAT is an excellent score. It would fetch you somewhere above and around the 99.5 percentile and make you eligible for most of the top B-schools like XLRI, provided you clear sectional cutoffs.",
        },
      },
      {
        "@type": "Question",
        name: "What is 35 marks in XAT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "35 marks in the XAT is a very good score. It would typically fetch you somewhere above and around the 98 percentile, making you a strong candidate for top tier-1 colleges.",
        },
      },
    ],
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "XAT Score Calculator 2027",
    description:
      "Online tool to calculate XAT 2027 score, apply negative marking penalties, and predict percentile for XLRI and other top MBA college admissions.",
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
              XAT 2027{" "}
              <span className="text-amber-500 underline decoration-[12px] underline-offset-8">
                Score
              </span>{" "}
              Calculator
            </h1>
            <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-amber-400 pl-8">
              Calculate your XAT 2027 score, apply negative marking penalties, & predict expected
              percentile instantly. Built for XLRI aspirants — free & accurate.
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
                  Official Penalty Scheme
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
        <XatScoreCalculator />

        {/* About XAT 2027 */}
        <div className="mt-32 max-w-4xl">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
            <BookOpen className="w-10 h-10 text-amber-500" />
            XAT 2027 – What You Need to Know
          </h2>
          <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
            <p className="font-bold text-slate-700 leading-relaxed text-lg">
              The <strong>Xavier Aptitude Test (XAT 2027)</strong> is conducted
              by XLRI Jamshedpur on behalf of XAMI. It is one of the most competitive MBA
              entrance exams in India, serving as the gateway to XLRI, XIMB, IMT, IMI, and 160+ other business schools.
            </p>
            <div className="overflow-x-auto border-4 border-foreground mt-6">
              <table className="w-full text-left border-collapse">
                <tbody className="text-base font-bold">
                  {[
                    ["Conducting Body", "XLRI Jamshedpur"],
                    ["Exam Mode", "Online Computer Based Test (CBT)"],
                    ["Total Questions (Part 1)", "75 (approx.)"],
                    ["Sections (Part 1)", "VALR · DM · QA"],
                    ["Marking Scheme", "+1 correct, −0.25 wrong"],
                    ["Unattempted Penalty", "−0.10 per question (beyond 8 unattempted)"],
                    ["Max Raw Score (Part 1)", "75"],
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
                desc: 'Click on VALR, DM, or QA tab to enter responses for each section.',
              },
              {
                step: "02",
                title: "Enter Correct Answers",
                desc: "Count the number of questions you answered correctly in the section (+1 mark each).",
              },
              {
                step: "03",
                title: "Enter Wrong Answers",
                desc: "Count the number of questions you answered incorrectly (attracts −0.25 penalty).",
              },
              {
                step: "04",
                title: "Unattempted Penalty is Auto-calculated",
                desc: "Our calculator automatically detects your unattempted questions and applies the −0.10 penalty if they exceed 8.",
              },
              {
                step: "05",
                title: "Repeat for All Sections",
                desc: "Fill in all three sections to get your final expected score and percentile prediction.",
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
              title: "Accurate Penalty",
              desc: "Strictly follows XAT's unique marking scheme, including the complex unattempted question penalty.",
            },
            {
              icon: <TrendingUp className="w-12 h-12 text-blue-600 mb-6" />,
              title: "Percentile Predictor",
              desc: "Based on historical XAT data trends to give you a reliable percentile estimate instantly.",
            },
            {
              icon: <Zap className="w-12 h-12 text-emerald-600 mb-6" />,
              title: "Section-wise Insights",
              desc: "See individual section scores and predict if you will meet strict sectional cutoffs for XLRI.",
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
            XAT 2027 Score Calculator – FAQs
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How is the XAT 2027 score calculated?",
                a: "XAT uses +1 for correct answers and −0.25 for wrong answers. There is also a penalty of −0.10 marks for every unattempted question, but only after the first 8 unattempted questions.",
              },
              {
                q: "What is a good XAT score for XLRI?",
                a: "A raw score of 35-40+ is generally considered excellent and can fetch a 98-99+ percentile, which is usually required for XLRI's BM and HRM programs. However, you must also clear sectional cutoffs.",
              },
              {
                q: "Does the unattempted penalty make a big difference?",
                a: "It can. If you leave 30 questions unattempted, you get a penalty of (30-8) * 0.10 = -2.2 marks. In competitive exams, 2.2 marks can drop your percentile significantly.",
              },
              {
                q: "Are General Knowledge (GK) and Essay counted in percentile?",
                a: "No, GK and Essay Writing are not counted for the final XAT percentile calculation used for shortlisting by XLRI and other colleges. However, they may be evaluated during the interview stage.",
              },
              {
                q: "Is this calculator accurate?",
                a: "Our calculator accurately calculates your raw score based on official marking schemes. The predicted percentile is an estimate based on historical trends; actual cutoffs will depend on the difficulty of XAT 2027.",
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
            Related XAT Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/tools/mock-test/xat"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>Free XAT 2027 Mock Test →</span>
            </Link>
            <Link
              href="/previous-year-papers"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>XAT Previous Year Papers →</span>
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
              <span>Book Admission Counselling Session →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
