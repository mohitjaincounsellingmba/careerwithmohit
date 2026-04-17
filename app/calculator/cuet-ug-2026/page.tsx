import type { Metadata } from "next";
import { CuetUgCalculator } from "@/components/CuetUgCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShieldCheck, Zap, HelpCircle, BookOpen, GraduationCap, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CUET UG 2026 Score Calculator & Percentile Predictor | NTA Score",
    description: "Free NTA CUET UG 2026 score calculator. Calculate CUET UG raw score, predict percentile, and compare CUET 2026 Marks vs Percentile for DU and BHU admissions.",
    keywords: [
        "CUET UG 2026 Score Calculator",
        "CUET Score Predictor 2026",
        "Calculate CUET UG Raw Score",
        "CUET 2026 Marks vs Percentile Calculator",
        "NTA CUET UG Score Calculator",
        "CUET Percentile Predictor 2026",
        "How to calculate CUET UG score 2026",
        "CUET UG 2026 marking scheme",
        "CUET normalization process explained",
        "How to use CUET response sheet to calculate marks",
        "CUET 2026 negative marking formula",
        "Calculating CUET percentile from raw marks",
        "Good score in CUET UG 2026",
        "CUET marks vs percentile for DU",
        "What is a safe score for BHU in CUET 2026?",
        "CUET 2026 expected cut-off for top universities",
        "CUET score required for North Campus DU",
        "CUET 700+ marks vs percentile",
        "CUET UG answer key 2026 download",
        "NTA normalization formula CUET 2026",
        "CUET subject-wise score calculator (Domain + General Test)",
        "CUET 2026 score calculator for Science/Commerce/Arts",
        "Calculate CUET score without official answer key"
    ],
    openGraph: {
        title: "NTA CUET UG 2026 Score Calculator & Predictor",
        description: "Calculate your CUET UG raw score instantly. Predict percentile and check admission chances for top central universities like DU and BHU.",
        type: "website",
    },
};

export default function CuetUgCalculatorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the CUET 2026 negative marking formula?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Each wrong MCQ response results in a deduction of 1 mark (-1) according to the official NTA CUET UG marking scheme."
                }
            },
            {
                "@type": "Question",
                "name": "How to use CUET response sheet to calculate marks?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To calculate, tally your valid correct and incorrect responses. Multiply correct answers by 5 and subtract the number of incorrect answers. Our tool automates this subject-wise score calculator process."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use the CUET 2026 score calculator for Science/Commerce/Arts?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our calculator supports all streams including Science, Arts, and Commerce by letting you add as many domain subjects as you attempted alongside the General Test."
                }
            },
            {
                "@type": "Question",
                "name": "What is the NTA normalization formula CUET 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The CUET normalization process explained: NTA uses the 'Equipercentile method' to level the playing field across different test shifts of varying difficulty. Calculating CUET percentile from raw marks depends on the performance of all candidates in your specific shift."
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50 font-body">
            <JsonLd data={faqSchema} />

            {/* Header / Hero Section */}
            <div className="bg-white border-b-8 border-foreground py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <Breadcrumbs />
                    <div className="mt-8 max-w-4xl">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-foreground">
                            NTA <span className="text-primary underline decoration-[12px] underline-offset-8 italic">CUET UG 2026</span> <br /> Score Calculator.
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-primary pl-8 italic">
                            The most accurate CUET 2026 Marks vs Percentile Calculator. 
                            Calculate CUET UG raw score subject-wise, parse your response sheet, and use our CUET percentile predictor 2026 to evaluate admission chances for top universities.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Calculator Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <CuetUgCalculator />

                {/* Exam Breakdown Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4 text-foreground">
                        <BookOpen className="w-10 h-10 text-primary" />
                        CUET UG 2026 Marking Scheme
                    </h2>
                    <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="text-2xl font-bold mb-4 text-foreground">How to calculate CUET UG score 2026?</h3>
                        <p className="font-bold text-slate-700 leading-relaxed text-lg italic">
                            Understanding how to calculate CUET UG score 2026 with the official CUET 2026 negative marking formula is crucial before calculating your marks without the official answer key. NTA follows a standardized marking scheme across all shifts.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                            <div className="border-4 border-foreground p-6 bg-emerald-50">
                                <h4 className="font-black uppercase mb-4 text-emerald-800 tracking-widest text-sm">Correct Answer</h4>
                                <div className="text-5xl font-black text-emerald-600">+5 Marks</div>
                                <p className="text-sm font-bold text-emerald-700 mt-2">Awarded per correct MCQ response.</p>
                            </div>
                            <div className="border-4 border-foreground p-6 bg-rose-50">
                                <h4 className="font-black uppercase mb-4 text-rose-800 tracking-widest text-sm">Wrong Answer</h4>
                                <div className="text-5xl font-black text-rose-600">-1 Mark</div>
                                <p className="text-sm font-bold text-rose-700 mt-2">Deducted per incorrect MCQ response.</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto border-4 border-foreground mt-12 shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                                    <tr>
                                        <th className="p-5 border-r border-white/20">Section</th>
                                        <th className="p-5 border-r border-white/20">Questions to Attempt</th>
                                        <th className="p-5">Max Marks</th>
                                    </tr>
                                </thead>
                                <tbody className="text-base font-bold italic">
                                    <tr className="border-b-2 border-slate-200 bg-white">
                                        <td className="p-5 border-r-2 border-slate-200 text-foreground">Section IA & IB (Languages)</td>
                                        <td className="p-5 border-r-2 border-slate-200 text-foreground">40 out of 50</td>
                                        <td className="p-5 font-black text-foreground">200</td>
                                    </tr>
                                    <tr className="border-b-2 border-slate-200 bg-slate-50">
                                        <td className="p-5 border-r-2 border-slate-200 text-foreground">Section II (Domain Subjects)</td>
                                        <td className="p-5 border-r-2 border-slate-200 text-foreground">40 out of 50</td>
                                        <td className="p-5 font-black text-foreground">200</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="p-5 border-r-2 border-slate-200 text-foreground">Section III (General Test)</td>
                                        <td className="p-5 border-r-2 border-slate-200 text-foreground">50 out of 60</td>
                                        <td className="p-5 font-black text-foreground">250</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Expected Cutoff Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4 text-foreground">
                        <TrendingUp className="w-10 h-10 text-primary" />
                        CUET 2026 Expected Cut-off For Top Universities
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { u: "Delhi University", p: "SRCC, Hindu, Hansraj", s: "780+ / 800", c: "bg-blue-50" },
                            { u: "Banaras Hindu", p: "FMS BHU, Social Sci", s: "450+ / 650", c: "bg-orange-50" },
                            { u: "Jami Millia", p: "Economics, Law", s: "185+ / 200", c: "bg-emerald-50" }
                        ].map((item, i) => (
                            <div key={i} className={`border-4 border-foreground p-8 ${item.c} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                                <h3 className="text-xl font-black uppercase mb-1 text-foreground">{item.u}</h3>
                                <p className="text-[10px] font-black uppercase text-slate-500 mb-6">{item.p}</p>
                                <div className="text-3xl font-black text-foreground">{item.s}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Target Scores Detail Section */}
                <div className="mt-16 max-w-4xl bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-2xl font-black uppercase mb-6 text-foreground">What is a Good Score in CUET UG 2026?</h3>
                    <p className="font-bold text-slate-600 mb-6 italic">A "good score" depends heavily on your category and course choice. For elite courses, achieving a 700+ marks limit is often required. Understanding CUET marks vs percentile for DU is key for setting safe targets.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="border border-slate-200 p-4 bg-slate-50">
                             <h4 className="font-black text-slate-800 uppercase text-sm mb-2">CUET Score Required for North Campus DU</h4>
                             <p className="text-sm font-bold text-slate-600">Typically, top colleges like SRCC, Hindu, and Hansraj demand a percentile of 98-99%+, often equating to ~780/800 marks for General category.</p>
                         </div>
                         <div className="border border-slate-200 p-4 bg-slate-50">
                             <h4 className="font-black text-slate-800 uppercase text-sm mb-2">What is a safe score for BHU in CUET 2026?</h4>
                             <p className="text-sm font-bold text-slate-600">For BA Social Sciences, scores around 240+ out of 350 are generally safe, varying slightly between main campus and affiliated colleges.</p>
                         </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="p-8 border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(59,130,246,1)]">
                        <ShieldCheck className="w-12 h-12 text-primary mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4 text-foreground tracking-tight">Verified Algorithm</h4>
                        <p className="font-bold text-slate-600 italic">Updated logic for the NTA CUET UG score calculator with support for all domain subjects.</p>
                    </div>
                    <div className="p-8 border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(34,197,94,1)]">
                        <Zap className="w-12 h-12 text-emerald-500 mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4 text-foreground tracking-tight">CUET Subject-wise Score (Domain + General Test)</h4>
                        <p className="font-bold text-slate-600 italic">Learn how to use CUET response sheet to calculate marks. Fast parsing once the CUET UG answer key 2026 download is available.</p>
                    </div>
                    <div className="p-8 border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(245,158,11,1)]">
                        <GraduationCap className="w-12 h-12 text-amber-500 mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4 text-foreground tracking-tight">CUET 700+ Marks vs Percentile</h4>
                        <p className="font-bold text-slate-600 italic">Get insights using our CUET 2026 score calculator for Science/Commerce/Arts for top colleges.</p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4 text-foreground">
                        <HelpCircle className="w-10 h-10 text-primary" />
                        CUET UG 2026 FAQs
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "What is the CUET 2026 negative marking formula?", a: "Each wrong MCQ response results in a deduction of 1 mark (-1) according to the official NTA CUET UG marking scheme." },
                            { q: "How to use CUET response sheet to calculate marks?", a: "To calculate, tally your valid correct and incorrect responses. Multiply correct answers by 5 and subtract the number of incorrect answers. Our tool automates this subject-wise score calculator process." },
                            { q: "Can I use the CUET 2026 score calculator for Science/Commerce/Arts?", a: "Yes, our calculator supports all streams including Science, Arts, and Commerce by letting you add as many domain subjects as you attempted alongside the General Test." },
                            { q: "What is the NTA normalization formula CUET 2026?", a: "The CUET normalization process explained: NTA uses the 'Equipercentile method' to level the playing field across different test shifts of varying difficulty. Calculating CUET percentile from raw marks depends on the performance of all candidates in your specific shift." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white border-4 border-foreground p-8 group hover:bg-slate-50 transition-colors">
                                <h3 className="text-xl font-black uppercase mb-3 text-foreground tracking-tighter italic flex items-center gap-3">
                                    <span className="text-primary tracking-normal">Q.</span> {faq.q}
                                </h3>
                                <p className="font-bold text-slate-600 leading-relaxed italic border-l-4 border-slate-200 pl-6">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Blog Links */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-primary pl-6 text-foreground">
                        Admissions Hub
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/blog/delhi-university-du-bcom-admission-process-eligibility-2026" className="bg-white border-4 border-foreground p-6 hover:bg-primary/5 transition-colors group block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                            <span className="font-black text-lg group-hover:text-primary transition-colors italic uppercase">DU B.Com Admission Guide 2026 →</span>
                        </Link>
                        <Link href="/blog/top-cuet-ug-colleges-delhi-ncr" className="bg-white border-4 border-foreground p-6 hover:bg-primary/5 transition-colors group block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                            <span className="font-black text-lg group-hover:text-primary transition-colors italic uppercase">Top CUET UG Colleges in Delhi NCR →</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BarChart3({ className }: { className?: string }) {
    return (
        <svg 
            className={className} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <path d="M3 3v18h18" />
            <path d="M7 16v-4" />
            <path d="M11 16V9" />
            <path d="M15 16V5" />
            <path d="M19 16v-7" />
        </svg>
    );
}
