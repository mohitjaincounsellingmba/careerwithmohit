import type { Metadata } from "next";
import CuetPgPredictorClient from "./CuetPgPredictorClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShieldCheck, Zap, BarChart3, HelpCircle, BookOpen, GraduationCap, Calendar, TrendingUp, Info, Target, Landmark } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CUET PG 2026 MBA College Predictor | Which University Will I Get?",
    description: "Free CUET PG 2026 MBA college predictor. Estimate your best university based on your raw score. Check cutoffs for TISS, BHU, DU, JNU and top Central Universities.",
    keywords: [
        "CUET PG MBA college predictor",
        "CUET PG 2026 score predictor",
        "TISS MBA CUET PG cutoff",
        "BHU MBA expected cutoff 2026",
        "DU MBA CUET PG score",
        "JNU MBA admission 2026 predictor",
        "CUET PG marks vs percentile MBA",
        "top universities for MBA under CUET PG",
        "CUET PG counseling 2026",
        "TISS HRM cutoff CUET PG",
        "central university MBA predictor",
        "CUET PG 2026 free predictor tool",
    ],
    openGraph: {
        title: "Predict Your CUET PG MBA University | 2026 Admission Guide",
        description: "Check which top Central Universities are within your reach based on your CUET PG 2026 score. Accurate TISS/BHU/DU predictor.",
        type: "website",
    },
};

export default function CuetPgPredictorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Which are the best MBA colleges under CUET PG?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The top MBA and equivalent programs under CUET PG are at TISS Mumbai (HRM & LR), DU (FMS for some PG programs), JNU (MBA), and BHU (MBA). Other strong options include the University of Hyderabad and DAVV Indore."
                }
            },
            {
                "@type": "Question",
                "name": "What score is needed for TISS HRM in CUET PG 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Based on 2024 and 2025 trends, a score of 240+ out of 300 is usually considered safe for the TISS HRM & LR program for General category candidates."
                }
            },
            {
                "@type": "Question",
                "name": "Is there a separate cutoff for each university in CUET PG?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, after NTA declares the CUET PG results, each participating university releases its own cutoff list and merit list based on the applications they receive. You must apply separately to each university's portal."
                }
            },
            {
                "@type": "Question",
                "name": "What is a good raw score for BHU MBA?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A raw score above 210 is considered competitive for BHU MBA programs. For Reserved categories, it can range between 170-190."
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50 font-body">
            <JsonLd data={faqSchema} />

            {/* Header Section */}
            <div className="bg-white border-b-8 border-[#18181b] py-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-5 -mr-48 -mt-24 blur-3xl" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <Breadcrumbs />
                    <div className="mt-12 max-w-5xl">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-10">
                            CUET PG <br />
                            <span className="text-blue-600 underline decoration-[16px] underline-offset-8 text-black">MBA Hub</span>.
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-800 leading-tight border-l-[16px] border-blue-600 pl-10 bg-white py-6 inline-block w-full shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
                            Predict your CUET PG 2026 dream university. From TISS to BHU, find where your score can take you.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Predictor Client Component */}
            <CuetPgPredictorClient />

            {/* Informational Content */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-8 space-y-20">
                        {/* Cutoff Analysis */}
                        <section>
                            <h2 className="text-4xl font-black uppercase tracking-tight mb-10 flex items-center gap-4">
                                <TrendingUp className="w-10 h-10 text-blue-600" />
                                2026 Expected Score Analysis
                            </h2>
                            <div className="bg-white border-4 border-[#18181b] p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] prose">
                                <p className="font-bold text-xl text-slate-900 mb-6 uppercase">
                                    The 300-Mark Era: How to interpret your score.
                                </p>
                                <p className="font-medium text-slate-600 leading-relaxed mb-10">
                                    With the removal of Part A (General Aptitude) in many program codes, the competition is now purely subject-based. For MBA (COQP12), the paper focuses on Logical Reasoning, Quants, and English.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                    <div className="bg-emerald-50 p-8 border-4 border-emerald-500 font-bold">
                                        <h4 className="text-lg font-black uppercase text-emerald-700 mb-3 underline underline-offset-4">Elite Bracket (230+)</h4>
                                        <p className="text-sm">Safe for TISS HRM, DU (FMS/DMS), and JNU. Focus on PI/Extempore preparation immediately.</p>
                                    </div>
                                    <div className="bg-blue-50 p-8 border-4 border-blue-500 font-bold">
                                        <h4 className="text-lg font-black uppercase text-blue-700 mb-3 underline underline-offset-4">Top Tier (190-230)</h4>
                                        <p className="text-sm">Strong chances for BHU, University of Hyderabad, and TISS Regional campuses. Keep backups ready.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Top University Programs */}
                        <section>
                            <h2 className="text-4xl font-black uppercase tracking-tight mb-10 flex items-center gap-4 text-slate-900">
                                <Landmark className="w-10 h-10 text-blue-600" />
                                Top MBA Programs under CUET PG
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white p-8 border-4 border-[#18181b] shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]">
                                    <h4 className="text-xl font-black uppercase mb-4 leading-none">TISS Mumbai</h4>
                                    <p className="text-sm font-bold text-slate-500 mb-4">Program: M.A. in HRM & LR</p>
                                    <p className="text-sm font-medium opacity-80 italic group-hover:not-italic transition-all">Commonly referred to as the HR capital of India, TISS takes CUET PG COQP12 scores.</p>
                                </div>
                                <div className="bg-white p-8 border-4 border-[#18181b] shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]">
                                    <h4 className="text-xl font-black uppercase mb-4 leading-none">BHU Varanasi</h4>
                                    <p className="text-sm font-bold text-slate-500 mb-4">Program: MBA / MBA-IB</p>
                                    <p className="text-sm font-medium opacity-80 italic">A highly affordable premium university with excellent placement records in North India.</p>
                                </div>
                                <div className="bg-white p-8 border-4 border-[#18181b] shadow-[8px_8px_0px_0px_rgba(168,85,247,1)]">
                                    <h4 className="text-xl font-black uppercase mb-4 leading-none">DAVV Indore</h4>
                                    <p className="text-sm font-bold text-slate-500 mb-4">Program: MBA (Core)</p>
                                    <p className="text-sm font-medium opacity-80 italic">The strongest choice for candidates looking for ROI and regional corporate exposure in MP/Maharashtra.</p>
                                </div>
                                <div className="bg-white p-8 border-4 border-[#18181b] shadow-[8px_8px_0px_0px_rgba(244,63,94,1)]">
                                    <h4 className="text-xl font-black uppercase mb-4 leading-none">JNU Delhi</h4>
                                    <p className="text-sm font-bold text-slate-500 mb-4">Program: MBA</p>
                                    <p className="text-sm font-medium opacity-80 italic">The ABV-SME JNU offers an MBA with an academic rigour that is unmatched in the country.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        {/* Call to Action */}
                        <div className="bg-blue-600 text-white p-10 border-4 border-[#18181b] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-2xl font-black uppercase mb-8 italic underline lg:no-underline decoration-yellow-500 underline-offset-8">Confused with Options?</h3>
                            <p className="text-sm font-bold opacity-80 mb-10 leading-snug">
                                With 200+ universities, picking the right one is tough. Let Mohit Jain's team help you pick the best ROI program.
                            </p>
                            <Link href="/inquiry" className="block text-center w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-yellow-500 transition-all border-4 border-[#18181b]">
                                Talk to Expert
                            </Link>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-slate-900 text-white p-10 border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(37,99,235,1)]">
                            <h3 className="text-xl font-black uppercase mb-8 text-primary">Key CUET Numbers</h3>
                            <ul className="space-y-6">
                                <li className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <span className="text-xs font-bold uppercase text-slate-400">Total Marks</span>
                                    <span className="font-black">300</span>
                                </li>
                                <li className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <span className="text-xs font-bold uppercase text-slate-400">Marking</span>
                                    <span className="font-black text-emerald-400">+4 / -1</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase text-slate-400">Participating Univ</span>
                                    <span className="font-black">200+</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <HelpCircle className="w-10 h-10 text-blue-600" />
                        CUET PG MBA Counselling FAQ
                    </h2>
                    <div className="space-y-8">
                        <div className="bg-white border-4 border-[#18181b] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-xl font-black uppercase mb-4 italic">How many universities can I apply to via CUET PG?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                You can choose any number of universities during the registration process. However, we recommend selecting at least 5-10 universities including Top-tier (TISS/BHU), Mid-tier (DAVV/HBNU), and Regional ones to maximize your admission chances.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-[#18181b] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-xl font-black uppercase mb-4 italic">Is TISS Mumbai admission purely based on CUET score?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                No. TISS typically conducts the TISS Online Assessment (OA) which includes an Extempore and Online Personal Interview (OPI) for candidates shortlisted based on their CUET PG scores. The final merit is calculated using a weighted score of CUET PG + OA.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
