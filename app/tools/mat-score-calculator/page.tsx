import type { Metadata } from "next";
import { MatScoreCalculator } from "@/components/MatScoreCalculator";
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
  title: "MAT May 2026 Score Calculator | Composite Score & Percentile Predictor | AIMA MAT",
  description:
    "Free MAT May 2026 Score Calculator by CareerWithMohit. Enter section-wise answers for LC, MS, DA, ICR & IGE to instantly calculate your composite score (out of 800) and expected percentile for MBA admissions.",
  keywords: [
    "MAT score calculator 2026",
    "MAT May 2026 score calculator",
    "MAT composite score calculator",
    "MAT percentile calculator 2026",
    "AIMA MAT score predictor",
    "MAT 2026 marks vs percentile",
    "MAT score out of 800",
    "MAT May 2026 result calculator",
    "mat.aima.in score calculator",
    "MAT section wise score calculator",
    "MAT MBA college predictor",
    "MAT LC MS DA ICR score",
  ],
  openGraph: {
    title: "MAT May 2026 Score Calculator | Composite Score & Percentile Predictor",
    description:
      "Free MAT 2026 Score Calculator. Instantly calculate your composite score (out of 800) and expected percentile for MBA admissions.",
    type: "website",
  },
  alternates: {
    canonical: "/tools/mat-score-calculator",
  },
};

export default function MatScoreCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is the MAT composite score calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MAT composite score is calculated from 4 sections: Language Comprehension (LC), Mathematical Skills (MS), Data Analysis & Sufficiency (DA), and Intelligence & Critical Reasoning (ICR). Each section has 40 questions with +1 for correct and -0.25 for wrong answers. The raw score is scaled to give each section a score out of 200, and the total composite score is out of 800. The Indian & Global Environment (IGE) section is NOT included in the composite.",
        },
      },
      {
        "@type": "Question",
        name: "What is a good MAT score for top MBA colleges?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A MAT composite score of 600+ (out of 800) is generally considered good and corresponds to roughly 97+ percentile. For top MBA colleges like JBIMS, MDI, and TAPMI, you typically need 650+ (99+ percentile). For good mid-tier colleges like BIMTECH, Jaipuria, and NIBM, a score of 530–600 (90–97 percentile) is sufficient.",
        },
      },
      {
        "@type": "Question",
        name: "How many sections are in MAT 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MAT 2026 has 5 sections: Language Comprehension (40 Qs), Mathematical Skills (40 Qs), Data Analysis & Sufficiency (40 Qs), Intelligence & Critical Reasoning (40 Qs), and Indian & Global Environment (40 Qs). Total = 200 questions. The composite score (out of 800) is based on the first 4 sections only.",
        },
      },
      {
        "@type": "Question",
        name: "Is there negative marking in MAT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. MAT uses a differential marking scheme: +1 mark for every correct answer and -0.25 marks for every wrong answer. Unattempted questions receive 0 marks. There is no special treatment for any section regarding negative marking.",
        },
      },
      {
        "@type": "Question",
        name: "When is the MAT May 2026 result expected?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The MAT May 2026 PBT exam was held on May 31, 2026, and the CBT is scheduled for June 14, 2026. Results are typically declared 10–15 days after the last mode of the session. The MAT May 2026 result is expected in the last week of June 2026 on mat.aima.in.",
        },
      },
    ],
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MAT May 2026 Score Calculator",
    description:
      "Online tool to calculate MAT 2026 composite score (out of 800) and predict percentile for MBA college admissions.",
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
              MAT May 2026{" "}
              <span className="text-amber-500 underline decoration-[12px] underline-offset-8">
                Score
              </span>{" "}
              Calculator
            </h1>
            <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-amber-400 pl-8">
              Calculate your MAT May 2026 composite score (out of 800) &
              expected percentile section-wise. Built for MBA aspirants — free,
              instant & accurate.
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
        <MatScoreCalculator />

        {/* About MAT 2026 */}
        <div className="mt-32 max-w-4xl">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
            <BookOpen className="w-10 h-10 text-amber-500" />
            MAT May 2026 – What You Need to Know
          </h2>
          <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
            <p className="font-bold text-slate-700 leading-relaxed text-lg">
              The{" "}
              <strong>
                Management Aptitude Test (MAT) — May 2026 Session
              </strong>{" "}
              is conducted by the All India Management Association (AIMA). It
              is accepted by 600+ B-Schools across India for MBA/PGDM
              admissions. MAT is offered in three modes: PBT (Paper-Based),
              CBT (Computer-Based), and IBT (Internet-Based).
            </p>
            <div className="overflow-x-auto border-4 border-foreground mt-6">
              <table className="w-full text-left border-collapse">
                <tbody className="text-base font-bold">
                  {[
                    ["Conducting Body", "AIMA (All India Management Association)"],
                    ["Exam Mode", "PBT · CBT · IBT"],
                    ["PBT Exam Date", "May 31, 2026"],
                    ["CBT Exam Date", "June 14, 2026"],
                    ["Total Questions", "200 (5 sections × 40 each)"],
                    ["Total Duration", "2 hours 30 minutes (150 minutes)"],
                    ["Sections", "LC · MS · DA · ICR · IGE"],
                    ["Marking Scheme", "+1 correct, −0.25 wrong"],
                    ["Max Composite Score", "800 (4 sections × 200)"],
                    ["IGE in Composite?", "No — for candidate info only"],
                    ["Result Expected", "Last week of June 2026"],
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
                title: "Select a Section Tab",
                desc: "Click on LC, MS, DA, ICR, or IGE tab to enter responses for each section.",
              },
              {
                step: "02",
                title: "Enter Correct Answers",
                desc: "Count the number of questions you answered correctly in that section (each worth +1 mark).",
              },
              {
                step: "03",
                title: "Enter Wrong Answers",
                desc: "Count the number of questions you answered incorrectly (each attracts −0.25 penalty).",
              },
              {
                step: "04",
                title: "Repeat for All Sections",
                desc: "Fill LC, MS, DA, and ICR for your composite score. IGE is optional but informational.",
              },
              {
                step: "05",
                title: "Unlock Full Results",
                desc: "Enter your details to reveal the full composite score, percentile, and college recommendations.",
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
              desc: "Strictly follows MAT's official marking scheme: +1 for correct, −0.25 for wrong answers.",
            },
            {
              icon: <TrendingUp className="w-12 h-12 text-blue-600 mb-6" />,
              title: "Percentile Prediction",
              desc: "Based on 5+ years of MAT historical data to give you a reliable percentile estimate.",
            },
            {
              icon: <Zap className="w-12 h-12 text-emerald-600 mb-6" />,
              title: "Section-wise Insights",
              desc: "See individual section scores (out of 200) so you know exactly where you stand.",
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
            MAT 2026 Score Calculator – FAQs
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How is the MAT composite score calculated?",
                a: "MAT composite score is calculated from 4 sections (LC, MS, DA, ICR). Each section has 40 questions with +1 correct, −0.25 wrong. Raw section scores are scaled to 200 each, giving a total composite of 800. IGE is excluded from the composite.",
              },
              {
                q: "What is a good MAT composite score for top colleges?",
                a: "600+ (out of 800) = 97+ percentile for tier-1 MAT colleges. 530–600 = 90–97 percentile for strong mid-tier MBA colleges. 470–530 = 80–90 percentile for good B-schools.",
              },
              {
                q: "Does the IGE section affect my MAT score?",
                a: "No. The Indian & Global Environment (IGE) section is not included in the composite score calculation. Most colleges do not use IGE marks for shortlisting. However, some specific institutes may consider it, so always check college-specific criteria.",
              },
              {
                q: "When is MAT May 2026 result expected?",
                a: "MAT May 2026 PBT was on May 31 and CBT is on June 14. Results are expected in the last week of June 2026 on the official portal mat.aima.in.",
              },
              {
                q: "Can I use MAT score to get into IIMs?",
                a: "No. IIMs do not accept MAT scores. They only accept CAT scores. However, many other top MBA and PGDM institutes like TAPMI, Great Lakes, BIMTECH, Jaipuria, FORE, and 600+ other B-Schools accept MAT scores.",
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
                <p className="mt-4 font-bold text-slate-600 leading-relaxed">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Internal Links */}
        <div className="mt-32">
          <h3 className="text-2xl font-black uppercase mb-6">
            Related MAT Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/all-about-mat-exam"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>All About MAT Exam 2026 →</span>
            </Link>
            <Link
              href="/tools/mat-college-predictor"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>MAT College Predictor →</span>
            </Link>
            <Link
              href="/blog/mat-may-2026-result-date-scorecard-download"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>MAT May 2026 Result Date →</span>
            </Link>
            <Link
              href="/blog/mba-colleges-accepting-mat-score-delhi-ncr-2026"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>MBA Colleges Accepting MAT Score →</span>
            </Link>
            <Link
              href="/tools/cat-score-calculator"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>CAT Score Calculator →</span>
            </Link>
            <Link
              href="/services"
              className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group"
            >
              <span>Book MAT Counselling Session →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
