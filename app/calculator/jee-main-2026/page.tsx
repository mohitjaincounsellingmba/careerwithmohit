import type { Metadata } from "next";
import { JeeScoreCalculator } from "@/components/JeeScoreCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShieldCheck, Zap, BarChart3, HelpCircle, BookOpen, GraduationCap, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "JEE Main 2026 Score Calculator & Response Sheet Checker | Session 2 Predictor",
    description: "Use our free JEE Main 2026 Session 2 score calculator. Instantly check your raw marks with official NTA marking scheme (+4/-1), parse your response sheet URL, and get predicted percentile for NIT/IIIT admissions.",
    keywords: [
        "JEE Main 2026 score calculator",
        "JEE Main response sheet checker",
        "JEE Main Session 2 score predictor",
        "calculate JEE Main marks vs percentile",
        "JEE Main 2026 rank predictor",
        "NTA JEE Main 2026 marking scheme",
        "JEE Main April shift analysis",
        "JEE Main 2026 cutoff for NITs",
        "JEE Main marks vs rank 2026",
    ],
    openGraph: {
        title: "JEE Main 2026 Score Calculator & Session 2 Predictor",
        description: "Free online tool to calculate JEE Main 2026 raw score and predict percentile based on the latest Session 2 exam pattern.",
        type: "website",
    },
};

export default function JeeCalculatorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How to calculate JEE Main 2026 score using the response sheet?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To calculate your score, multiply your total correct answers by 4 and total incorrect answers by 1. Subtract the incorrect marks from the correct marks to get your total raw score out of 300."
                }
            },
            {
                "@type": "Question",
                "name": "Is there negative marking in JEE Main 2026 Session 2?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, there is a negative marking of -1 for every incorrect answer in both MCQs and Numerical Value Questions (NVQs) for JEE Main 2026."
                }
            },
            {
                "@type": "Question",
                "name": "What is a good percentile in JEE Main 2026 for NITs?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A percentile above 98 is generally considered good for top NITs and IIITs. For core branches in top-tier NITs, a 99+ percentile is ideal."
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50 font-body">
            <JsonLd data={faqSchema} />

            {/* Hero Section */}
            <div className="bg-white border-b-8 border-foreground py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <Breadcrumbs />
                    <div className="mt-8 max-w-4xl">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Predict your <br />
                            <span className="text-primary underline decoration-[12px] underline-offset-8">JEE Main</span> Rank.
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-primary pl-8">
                            Instantly check your JEE Main 2026 Session 2 raw score and predicted percentile. 100% accurate NTA marking scheme implementation for NIT/IIIT/GFTI aspirants.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Calculator Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <JeeScoreCalculator />

                {/* Exam Analysis Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <BookOpen className="w-10 h-10 text-primary" />
                        JEE Main 2026 Session 2 Overview
                    </h2>
                    <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
                        <p className="font-bold text-slate-700 leading-relaxed text-lg">
                            The **JEE Main 2026 Session 2** (April Session) is the final opportunity for students to improve their scores for admission to NITs, IIITs, and GFTIs. The exam pattern remains consistent with 90 questions (75 to be attempted).
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
                                    <tr className="border-b-2 border-slate-200">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Total Questions</td>
                                        <td className="p-5">90 (30 each in Physics, Chemistry, Maths)</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200 bg-slate-50">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Questions to Attempt</td>
                                        <td className="p-5">75 (25 per subject)</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Marking Scheme</td>
                                        <td className="p-5 text-primary">+4 for Correct | -1 for Incorrect</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200 bg-slate-50">
                                        <td className="p-5 border-r-2 border-slate-200 font-black">Total Marks</td>
                                        <td className="p-5">300</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Expected Cutoff for JEE Advanced */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <TrendingUp className="w-10 h-10 text-primary" />
                        Expected Cutoff for JEE Advanced 2026
                    </h2>
                    <div className="overflow-x-auto border-4 border-foreground">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                                <tr>
                                    <th className="p-5 border-r border-white/20">Category</th>
                                    <th className="p-5">Expected Percentile Cutoff</th>
                                </tr>
                            </thead>
                            <tbody className="text-lg font-bold">
                                <tr className="border-b-4 border-foreground bg-white">
                                    <td className="p-5 border-r-4 border-foreground">General (UR)</td>
                                    <td className="p-5">91.0 - 92.5</td>
                                </tr>
                                <tr className="border-b-4 border-foreground bg-slate-50">
                                    <td className="p-5 border-r-4 border-foreground">Gen-EWS</td>
                                    <td className="p-5">76.0 - 78.5</td>
                                </tr>
                                <tr className="border-b-4 border-foreground bg-white">
                                    <td className="p-5 border-r-4 border-foreground">OBC-NCL</td>
                                    <td className="p-5">74.5 - 76.5</td>
                                </tr>
                                <tr className="border-b-4 border-foreground bg-slate-50">
                                    <td className="p-5 border-r-4 border-foreground">SC</td>
                                    <td className="p-5">52.0 - 54.5</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="p-5 border-r-4 border-foreground">ST</td>
                                    <td className="p-5">37.0 - 39.5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <HelpCircle className="w-10 h-10 text-primary" />
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">When will JEE Main 2026 Answer Key be released?</h3>
                            <p className="font-bold text-slate-600">The provisional answer key for Session 2 is expected by the 2nd week of April 2026. Students can challenge the key through the official login.</p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">How does normalization work in JEE Main?</h3>
                            <p className="font-bold text-slate-600">Normalization accounts for difficulty variations across multiple shifts. It converts raw scores into a NTA Percentile Score to ensure fair competition among all candidates.</p>
                        </div>
                    </div>
                </div>

                {/* Related Links */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-primary pl-6">
                        Essential Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/blog/jee-main-college-predictor-2026-btech-top-colleges" className="bg-white border-4 border-foreground p-6 hover:bg-primary/5 transition-colors group block">
                            <span className="font-black text-lg group-hover:text-primary transition-colors">NIT/IIIT College Predictor →</span>
                        </Link>
                        <Link href="/blog/total-seats-in-nits-2026-seat-matrix" className="bg-white border-4 border-foreground p-6 hover:bg-primary/5 transition-colors group block">
                            <span className="font-black text-lg group-hover:text-primary transition-colors">JEE Main Seat Matrix 2026 →</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
