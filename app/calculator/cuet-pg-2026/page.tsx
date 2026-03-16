import type { Metadata } from "next";
import { CuetCalculator } from "@/components/CuetCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShieldCheck, Zap, BarChart3, HelpCircle, BookOpen, GraduationCap, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CUET PG 2026 Score Calculator & Rank Predictor | Marks vs Percentile",
    description: "Free CUET PG 2026 score calculator. Instantly calculate your raw score with official NTA marking scheme (+4/-1), predict percentile, check marks vs rank, and compare cutoffs for DU, JNU, BHU, TISS MBA & other PG programs.",
    keywords: [
        "CUET PG calculator",
        "CUET PG 2026 score calculator",
        "CUET PG marks calculator",
        "CUET PG rank predictor 2026",
        "CUET PG percentile predictor",
        "CUET PG marks vs percentile",
        "CUET PG marks vs rank",
        "CUET PG 2026 result",
        "CUET PG cutoff 2026",
        "CUET PG college predictor",
        "CUET PG marking scheme",
        "NTA CUET PG score",
        "CUET PG 2026 exam date",
        "CUET PG answer key 2026",
        "CUET PG good score",
        "CUET PG MBA cutoff",
        "CUET PG DU admission",
        "CUET PG JNU cutoff",
        "CUET PG BHU admission 2026",
        "CUET PG expected cutoff 2026",
    ],
    openGraph: {
        title: "CUET PG 2026 Score Calculator & Rank Predictor",
        description: "Free CUET PG 2026 score calculator. Predict your raw score, percentile, and rank. Compare cutoffs for DU, JNU, BHU, TISS & more.",
        type: "website",
    },
};

export default function CuetCalculatorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the marking scheme for CUET PG 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The CUET PG 2026 marking scheme awards +4 marks for every correct answer and deducts -1 mark for every incorrect answer. Unattempted questions carry zero marks. The exam has 75 questions with a maximum score of 300."
                }
            },
            {
                "@type": "Question",
                "name": "How is the raw score calculated in CUET PG?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The raw score is calculated using the formula: (Total Correct × 4) - (Total Incorrect × 1). The maximum marks are 300 for 75 questions."
                }
            },
            {
                "@type": "Question",
                "name": "What is a good score in CUET PG 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A score above 200 out of 300 is considered good, typically placing you in the 90+ percentile. For top universities like DU, JNU, and BHU, a score of 230+ (99+ percentile) is ideal. For mid-tier universities, 150-180 marks are competitive."
                }
            },
            {
                "@type": "Question",
                "name": "When will the CUET PG 2026 result be declared?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The CUET PG 2026 exam was conducted from March 6 to March 27, 2026. The result is expected to be declared by April 2026 on the official NTA CUET PG website."
                }
            },
            {
                "@type": "Question",
                "name": "Which universities accept CUET PG 2026 scores for MBA admission?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Top universities accepting CUET PG scores for MBA include Delhi University (FMS & DMS), Jawaharlal Nehru University (JNU), Banaras Hindu University (BHU), University of Hyderabad, Pondicherry University, Aligarh Muslim University, Indira Gandhi National Open University (IGNOU), and several other central universities."
                }
            },
            {
                "@type": "Question",
                "name": "How many questions are there in CUET PG 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "CUET PG 2026 has 75 subject-specific multiple choice questions. Part A (General Aptitude) was removed for many subjects. The exam duration is 105 minutes and the total marks are 300."
                }
            },
            {
                "@type": "Question",
                "name": "Is there negative marking in CUET PG 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, CUET PG 2026 has negative marking. For every incorrect answer, 1 mark is deducted (-1). For every correct answer, 4 marks are awarded (+4). Unanswered questions do not carry any penalty."
                }
            },
            {
                "@type": "Question",
                "name": "What is the CUET PG 2026 cutoff for DU MBA?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Based on previous trends, the expected CUET PG cutoff for DU MBA (FMS & DMS) is around 230+ marks (99+ percentile) for General category. OBC category cutoff is expected around 210+ marks, and SC/ST around 170+ marks."
                }
            }
        ]
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "CUET PG 2026 Score Calculator & Rank Predictor",
        "description": "Free online tool to calculate CUET PG 2026 raw score, predict percentile and rank based on official NTA marking scheme.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-body">
            <JsonLd data={faqSchema} />
            <JsonLd data={webAppSchema} />

            {/* Header / Hero Section */}
            <div className="bg-white border-b-8 border-foreground py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <Breadcrumbs />
                    <div className="mt-8 max-w-4xl">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Predict Your <br />
                            <span className="text-primary underline decoration-[12px] underline-offset-8">CUET PG</span> Future.
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-primary pl-8">
                            The most accurate CUET PG 2026 score calculator & rank predictor based on the latest NTA marking patterns.
                            Get your raw score, predicted percentile, and college cutoff insights in seconds.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Calculator Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <CuetCalculator />

                {/* CUET PG 2026 Exam Overview Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <BookOpen className="w-10 h-10 text-primary" />
                        CUET PG 2026 Exam Overview
                    </h2>
                    <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
                        <p className="font-bold text-slate-700 leading-relaxed text-lg">
                            The <strong>Common University Entrance Test for Postgraduate (CUET PG) 2026</strong> is conducted by the <strong>National Testing Agency (NTA)</strong> for admission to various PG programs including MBA, M.A., M.Sc., M.Com., MCA, M.Ed., and more across 200+ Central, State, and Private Universities in India.
                        </p>

                        <div className="overflow-x-auto border-4 border-foreground mt-6">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                                    <tr>
                                        <th className="p-5 border-r border-white/20">Parameter</th>
                                        <th className="p-5">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="text-base font-bold">
                                    <tr className="border-b-2 border-slate-200 bg-white">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Exam Name</td>
                                        <td className="p-5">Common University Entrance Test – Postgraduate (CUET PG)</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200 bg-slate-50">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Conducting Body</td>
                                        <td className="p-5">National Testing Agency (NTA)</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200 bg-white">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Exam Mode</td>
                                        <td className="p-5">Computer Based Test (CBT) – Online</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200 bg-slate-50">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Exam Date 2026</td>
                                        <td className="p-5">March 6 – March 27, 2026</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200 bg-white">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Total Questions</td>
                                        <td className="p-5">75 MCQs (Subject-Specific)</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200 bg-slate-50">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Total Marks</td>
                                        <td className="p-5">300</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200 bg-white">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Duration</td>
                                        <td className="p-5">105 Minutes</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200 bg-slate-50">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Marking Scheme</td>
                                        <td className="p-5">+4 for Correct, -1 for Incorrect, 0 for Unattempted</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200 bg-white">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Total Subjects</td>
                                        <td className="p-5">157 Subjects</td>
                                    </tr>
                                    <tr className="bg-slate-50">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Result Expected</td>
                                        <td className="p-5">April 2026 (Expected)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Expected Cutoff Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <TrendingUp className="w-10 h-10 text-primary" />
                        CUET PG 2026 Expected Cutoff – Top Universities
                    </h2>
                    <div className="overflow-x-auto border-4 border-foreground">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                                <tr>
                                    <th className="p-5 border-r border-white/20">University / Program</th>
                                    <th className="p-5 border-r border-white/20">Expected Cutoff (General)</th>
                                    <th className="p-5">Percentile Range</th>
                                </tr>
                            </thead>
                            <tbody className="text-base font-bold">
                                <tr className="border-b-4 border-foreground bg-white hover:bg-primary/5 transition-colors">
                                    <td className="p-5 border-r-4 border-foreground">DU – FMS / DMS (MBA)</td>
                                    <td className="p-5 border-r-4 border-foreground">230+ Marks</td>
                                    <td className="p-5 text-primary">99+ Percentile</td>
                                </tr>
                                <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-primary/5 transition-colors">
                                    <td className="p-5 border-r-4 border-foreground">JNU (MBA / M.A.)</td>
                                    <td className="p-5 border-r-4 border-foreground">210+ Marks</td>
                                    <td className="p-5">97+ Percentile</td>
                                </tr>
                                <tr className="border-b-4 border-foreground bg-white hover:bg-primary/5 transition-colors">
                                    <td className="p-5 border-r-4 border-foreground">BHU – MBA / M.Com.</td>
                                    <td className="p-5 border-r-4 border-foreground">200+ Marks</td>
                                    <td className="p-5">95+ Percentile</td>
                                </tr>
                                <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-primary/5 transition-colors">
                                    <td className="p-5 border-r-4 border-foreground">University of Hyderabad</td>
                                    <td className="p-5 border-r-4 border-foreground">180+ Marks</td>
                                    <td className="p-5">90+ Percentile</td>
                                </tr>
                                <tr className="border-b-4 border-foreground bg-white hover:bg-primary/5 transition-colors">
                                    <td className="p-5 border-r-4 border-foreground">Pondicherry University</td>
                                    <td className="p-5 border-r-4 border-foreground">160+ Marks</td>
                                    <td className="p-5">85+ Percentile</td>
                                </tr>
                                <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-primary/5 transition-colors">
                                    <td className="p-5 border-r-4 border-foreground">AMU (Aligarh Muslim University)</td>
                                    <td className="p-5 border-r-4 border-foreground">150+ Marks</td>
                                    <td className="p-5">80+ Percentile</td>
                                </tr>
                                <tr className="bg-white hover:bg-primary/5 transition-colors">
                                    <td className="p-5 border-r-4 border-foreground">Other Central Universities</td>
                                    <td className="p-5 border-r-4 border-foreground">120 - 150 Marks</td>
                                    <td className="p-5">70 - 80 Percentile</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm font-bold text-slate-500 mt-4 italic">
                        *Cutoffs are indicative and based on previous year trends. Actual cutoffs may vary.
                    </p>
                </div>

                {/* Important Dates Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <Calendar className="w-10 h-10 text-primary" />
                        CUET PG 2026 Important Dates
                    </h2>
                    <div className="overflow-x-auto border-4 border-foreground">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                                <tr>
                                    <th className="p-5 border-r border-white/20">Event</th>
                                    <th className="p-5">Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-base font-bold">
                                <tr className="border-b-2 border-slate-200 bg-white">
                                    <td className="p-5 border-r-2 border-slate-200">Registration Start</td>
                                    <td className="p-5">December 14, 2025</td>
                                </tr>
                                <tr className="border-b-2 border-slate-200 bg-slate-50">
                                    <td className="p-5 border-r-2 border-slate-200">Registration Last Date</td>
                                    <td className="p-5">January 14, 2026</td>
                                </tr>
                                <tr className="border-b-2 border-slate-200 bg-white">
                                    <td className="p-5 border-r-2 border-slate-200">Correction Window</td>
                                    <td className="p-5">January 18 – 20, 2026</td>
                                </tr>
                                <tr className="border-b-2 border-slate-200 bg-slate-50">
                                    <td className="p-5 border-r-2 border-slate-200">Admit Card Release</td>
                                    <td className="p-5">February 2026 (Expected)</td>
                                </tr>
                                <tr className="border-b-2 border-slate-200 bg-white">
                                    <td className="p-5 border-r-2 border-slate-200">Exam Dates</td>
                                    <td className="p-5 text-primary font-black">March 6 – March 27, 2026</td>
                                </tr>
                                <tr className="border-b-2 border-slate-200 bg-slate-50">
                                    <td className="p-5 border-r-2 border-slate-200">Answer Key Release</td>
                                    <td className="p-5">April 2026 (Expected)</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="p-5 border-r-2 border-slate-200">Result Declaration</td>
                                    <td className="p-5 text-primary font-black">April 2026 (Expected)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Universities Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <GraduationCap className="w-10 h-10 text-primary" />
                        Top Universities Accepting CUET PG 2026 Scores
                    </h2>
                    <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
                        <p className="font-bold text-slate-700 leading-relaxed">
                            Over <strong>200+ universities</strong> across India accept CUET PG scores for admission to MBA, M.A., M.Sc., M.Com., MCA, and other postgraduate programs. Here are the top ones:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 font-bold text-slate-700">
                                    <span className="text-primary font-black">→</span>
                                    Delhi University (DU) – FMS, DMS
                                </li>
                                <li className="flex items-start gap-3 font-bold text-slate-700">
                                    <span className="text-primary font-black">→</span>
                                    Jawaharlal Nehru University (JNU)
                                </li>
                                <li className="flex items-start gap-3 font-bold text-slate-700">
                                    <span className="text-primary font-black">→</span>
                                    Banaras Hindu University (BHU)
                                </li>
                                <li className="flex items-start gap-3 font-bold text-slate-700">
                                    <span className="text-primary font-black">→</span>
                                    University of Hyderabad
                                </li>
                                <li className="flex items-start gap-3 font-bold text-slate-700">
                                    <span className="text-primary font-black">→</span>
                                    Jamia Millia Islamia (JMI)
                                </li>
                                <li className="flex items-start gap-3 font-bold text-slate-700">
                                    <span className="text-primary font-black">→</span>
                                    Pondicherry University
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 font-bold text-slate-700">
                                    <span className="text-primary font-black">→</span>
                                    Aligarh Muslim University (AMU)
                                </li>
                                <li className="flex items-start gap-3 font-bold text-slate-700">
                                    <span className="text-primary font-black">→</span>
                                    Tezpur University
                                </li>
                                <li className="flex items-start gap-3 font-bold text-slate-700">
                                    <span className="text-primary font-black">→</span>
                                    Central University of Rajasthan
                                </li>
                                <li className="flex items-start gap-3 font-bold text-slate-700">
                                    <span className="text-primary font-black">→</span>
                                    Central University of Karnataka
                                </li>
                                <li className="flex items-start gap-3 font-bold text-slate-700">
                                    <span className="text-primary font-black">→</span>
                                    IGNOU (Select Programs)
                                </li>
                                <li className="flex items-start gap-3 font-bold text-slate-700">
                                    <span className="text-primary font-black">→</span>
                                    North-Eastern Hill University (NEHU)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Features / Why Use This Section */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <ShieldCheck className="w-12 h-12 text-primary mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4">100% Accuracy</h4>
                        <p className="font-bold text-slate-600">Calculated strictly according to the official +4/-1 NTA marking scheme for CUET PG 2026.</p>
                    </div>
                    <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <BarChart3 className="w-12 h-12 text-blue-600 mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4">Percentile & Rank View</h4>
                        <p className="font-bold text-slate-600">Get an instant estimation of your percentile and predicted rank vs other candidates based on past trends.</p>
                    </div>
                    <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <Zap className="w-12 h-12 text-amber-500 mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4">Mobile Ready</h4>
                        <p className="font-bold text-slate-600">Optimized for smartphones. Check your potential score, rank, and cutoff chances even on the move.</p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <HelpCircle className="w-10 h-10 text-primary" />
                        CUET PG 2026 – Frequently Asked Questions
                    </h2>
                    <div className="space-y-8">
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">What is the marking scheme for CUET PG 2026?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                The CUET PG 2026 exam follows the official NTA marking scheme: <strong>+4 marks</strong> for every correct answer and <strong>-1 mark</strong> for every incorrect answer. Unattempted questions carry <strong>zero marks</strong>. With 75 questions, the maximum score is <strong>300 marks</strong>.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">How is the CUET PG raw score calculated?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                The raw score formula is: <strong>(Total Correct × 4) – (Total Incorrect × 1)</strong>. For example, if you answered 50 correct and 10 incorrect, your score = (50 × 4) – (10 × 1) = <strong>190 out of 300</strong>.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">What is a good score in CUET PG 2026?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                For top-tier universities like DU (FMS, DMS), JNU, or BHU, a score of <strong>200+</strong> is generally considered excellent (95+ percentile).
                                A score above <strong>230+</strong> can place you in the <strong>99+ percentile</strong> bracket. For moderate universities, <strong>140-180 marks</strong> is competitive.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">When will CUET PG 2026 result be declared?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                The CUET PG 2026 exam was conducted from <strong>March 6 to March 27, 2026</strong>. The NTA answer key is expected in <strong>early April 2026</strong>, and the final result is expected by <strong>mid to late April 2026</strong>. Results will be available on the official NTA CUET PG website.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">How many questions are there in CUET PG?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                CUET PG 2026 consists of <strong>75 subject-specific MCQs</strong>. Part A (General Aptitude) has been removed for many subjects starting from 2024. The exam is conducted in <strong>CBT (Computer Based Test) mode</strong> with a duration of <strong>105 minutes</strong>.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">Is there negative marking in CUET PG 2026?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                Yes, CUET PG 2026 has <strong>negative marking</strong>. For every incorrect answer, <strong>1 mark is deducted</strong>. This makes accuracy very important — avoid blind guessing, especially in the last few minutes.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">Which are the best colleges for CUET PG MBA admission?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                The top colleges accepting CUET PG for MBA include <strong>FMS Delhi, DMS Delhi, JNU, BHU, University of Hyderabad, Pondicherry University, and AMU</strong>. FMS Delhi is the most selective, requiring 99+ percentile for General category students.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">How does NTA normalize CUET PG scores?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                Since CUET PG is conducted across multiple shifts and dates, NTA uses a <strong>normalization process</strong> to equalize difficulty differences between shifts. The raw score is converted to a <strong>normalized/percentile score</strong> which is used for final counselling and admissions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Blog Links for Internal Linking */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-primary pl-6">
                        Related Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/blog/top-mba-colleges-cuet-pg" className="bg-white border-4 border-foreground p-6 hover:bg-primary/5 transition-colors group block">
                            <span className="font-black text-lg group-hover:text-primary transition-colors">Top MBA Colleges Accepting CUET PG →</span>
                        </Link>
                        <Link href="/blog/cuet-pg-2026-result-expected-date" className="bg-white border-4 border-foreground p-6 hover:bg-primary/5 transition-colors group block">
                            <span className="font-black text-lg group-hover:text-primary transition-colors">CUET PG 2026 Result Expected Date →</span>
                        </Link>
                        <Link href="/blog/best-mba-colleges-in-delhi-2026" className="bg-white border-4 border-foreground p-6 hover:bg-primary/5 transition-colors group block">
                            <span className="font-black text-lg group-hover:text-primary transition-colors">Best MBA Colleges in Delhi 2026 →</span>
                        </Link>
                        <Link href="/blog/mba-pgdm-admissions-faq-2026" className="bg-white border-4 border-foreground p-6 hover:bg-primary/5 transition-colors group block">
                            <span className="font-black text-lg group-hover:text-primary transition-colors">MBA/PGDM Admissions FAQ 2026 →</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
