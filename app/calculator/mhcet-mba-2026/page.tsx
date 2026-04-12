import type { Metadata } from "next";
import { MhcetCalculator } from "@/components/MhcetCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShieldCheck, Zap, BarChart3, HelpCircle, BookOpen, GraduationCap, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "MHCET MBA 2026 Score Calculator & Rank Predictor | Marks vs Percentile",
    description: "Free MHCET MBA 2026 score calculator. Instantly calculate your raw marks, predict percentile for JBIMS, SIMSREE, PUMBA, and check marks vs rank vs top MBA colleges in Maharashtra.",
    keywords: [
        "MHCET MBA calculator",
        "MHCET MBA 2026 score calculator",
        "MAH MBA CET marks calculator",
        "MHCET MBA rank predictor 2026",
        "MHCET MBA percentile predictor",
        "MHCET MBA marks vs percentile",
        "JBIMS cutoff 2026",
        "SIMSREE cutoff 2026",
        "PUMBA cutoff 2026",
        "MAH CET answer key 2026",
        "calculate mhcet mba score",
        "mhcet percentile vs rank",
    ],
    openGraph: {
        title: "MHCET MBA 2026 Score Calculator & Rank Predictor",
        description: "Free MHCET MBA 2026 score calculator. Predict your marks, percentile, and rank for JBIMS, SIMSREE & more.",
        type: "website",
    },
};

export default function MhcetCalculatorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How is MHCET MBA 2026 score calculated?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The MHCET MBA score is the total number of correct answers. Each correct answer gets +1 mark. There is no negative marking for incorrect or unattempted questions."
                }
            },
            {
                "@type": "Question",
                "name": "What is the cutoff for JBIMS in MHCET MBA 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "JBIMS typically requires a 99.99 percentile. Based on 2026 trends, this equates to a raw score of approximately 155-160+ out of 200."
                }
            },
            {
                "@type": "Question",
                "name": "When will the MHCET MBA 2026 answer key be released?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Phase 1 answer key is expected soon after the Phase 2 exam is conducted on May 9, 2026. Usually, the CET Cell releases the answer key within 10 days of the last exam date."
                }
            }
        ]
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "MHCET MBA 2026 Score Calculator",
        "description": "Online tool to calculate MHCET MBA 2026 score and predict percentile for top Maharashtra MBA colleges.",
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
                            <span className="text-secondary underline decoration-[12px] underline-offset-8">MHCET MBA</span> Rank.
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-secondary pl-8">
                            The most accurate MHCET MBA 2026 score calculator & rank predictor. 
                            Get your predicted percentile for JBIMS, SIMSREE, and PUMBA in seconds.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Calculator Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <MhcetCalculator />

                {/* MHCET MBA 2026 Overview */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <BookOpen className="w-10 h-10 text-secondary" />
                        MAH MBA CET 2026 Exam Details
                    </h2>
                    <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6">
                        <p className="font-bold text-slate-700 leading-relaxed text-lg">
                            The <strong>MAH MBA/MMS CET 2026</strong> is the gateway to top management institutes in Maharashtra. With over 300+ colleges participating, the competition for the top 10 institutes is fierce.
                        </p>

                        <div className="overflow-x-auto border-4 border-foreground mt-6">
                            <table className="w-full text-left border-collapse">
                                <tbody className="text-base font-bold">
                                    <tr className="border-b-2 border-slate-200">
                                        <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black">Total Questions</td>
                                        <td className="p-5">200 MCQs</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200">
                                        <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black">Negative Marking</td>
                                        <td className="p-5 text-green-600">NONE</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200">
                                        <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black">Exam Mode</td>
                                        <td className="p-5">Online Computer Based Test (CBT)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black">Major Colleges</td>
                                        <td className="p-5">JBIMS, SIMSREE, PUMBA, Welingkar</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <ShieldCheck className="w-12 h-12 text-secondary mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4">Zero Error Logic</h4>
                        <p className="font-bold text-slate-600">Calculated strictly according to CET Cell norms: +1 per correct answer, 0 for others.</p>
                    </div>
                    <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <BarChart3 className="w-12 h-12 text-blue-600 mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4">Shift Normalization</h4>
                        <p className="font-bold text-slate-600">Accounts for difficulty level variances across different exam slots/shifts.</p>
                    </div>
                    <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <Zap className="w-12 h-12 text-amber-500 mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4">Fast & Reliable</h4>
                        <p className="font-bold text-slate-600">The quickest way to estimate your standing before the official result declaration.</p>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12">MHCET MBA 2026 FAQs</h2>
                    <div className="space-y-6">
                        <details className="bg-white border-4 border-foreground p-6 group cursor-pointer">
                            <summary className="text-xl font-black uppercase flex justify-between items-center list-none">
                                What is a safe score for JBIMS?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 font-bold text-slate-600">For General category, a score of 155+ is usually safe for JBIMS Mumbai. For Reserved categories, it ranges from 135 to 150.</p>
                        </details>
                        <details className="bg-white border-4 border-foreground p-6 group cursor-pointer">
                            <summary className="text-xl font-black uppercase flex justify-between items-center list-none">
                                Is normalization applicable in MHCET MBA?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 font-bold text-slate-600">Yes, since the exam happens in multiple shifts, the CET Cell uses the Percentile Equi-percentile method to normalize scores.</p>
                        </details>
                    </div>
                </div>

                {/* Internal Links */}
                <div className="mt-32">
                    <h3 className="text-2xl font-black uppercase mb-6">MHCET Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/blog/top-mhcet-mba-colleges-pune-2026-cutoffs-fees" className="bg-white border-4 border-foreground p-6 font-black hover:bg-secondary/5 transition-colors">
                            Top Pune Colleges & Cutoffs →
                        </Link>
                        <Link href="/blog/all-about-mah-mba-cet-exam" className="bg-white border-4 border-foreground p-6 font-black hover:bg-secondary/5 transition-colors">
                            MHCET Exam Pattern & Syllabus →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
