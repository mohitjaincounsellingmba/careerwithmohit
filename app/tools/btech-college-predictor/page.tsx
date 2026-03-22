import type { Metadata } from "next";
import BtechPredictorClient from "./BtechPredictorClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShieldCheck, Zap, BarChart3, HelpCircle, BookOpen, GraduationCap, Calendar, TrendingUp, Info, Target, Cpu } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "JEE Main 2026 College Predictor | B.Tech Admission Predictor",
    description: "Free JEE Main 2026 college predictor for B.Tech. Predict your engineering college based on percentile. Check cutoffs for DTU, NSUT, NITs, IIITs, and top private institutes in Pune, Bangalore & Delhi.",
    keywords: [
        "JEE Main college predictor",
        "JEE Main 2026 predictor",
        "B.Tech college predictor",
        "engineering college predictor by percentile",
        "JEE Main marks vs percentile 2026",
        "DTU JEE Main cutoff 2026",
        "NIT college predictor 2026",
        "IIIT Delhi cutoff JEE Main",
        "top B.Tech colleges in Bangalore JEE",
        "top engineering colleges in Pune JEE Main",
        "COMEDK vs JEE Main predictor",
        "JoSAA counseling predictor",
        "IPU engineering predictor",
        "MHT CET vs JEE Main college predictor",
    ],
    openGraph: {
        title: "JEEMain 2026 College Predictor | Which B.Tech College Will I Get?",
        description: "Predict your engineering college based on your JEE Main 2026 expected percentile. Get insights for admission in top Govt and Private B.Tech institutes.",
        type: "website",
    },
};

export default function BtechPredictorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How does the B.Tech college predictor work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The predictor uses previous year JoSAA, CSAB, and JAC Delhi counseling data to estimate which colleges you can get into based on your JEE Main percentile. It categorizes results into Safe, Target, and Reach zones."
                }
            },
            {
                "@type": "Question",
                "name": "What percentile is required for CS/IT in DTU/NSUT?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For General candidates (Delhi Region), a percentile above 98.5 is usually required for CS/IT. For Outside Delhi candidates, it often goes above 99.4."
                }
            },
            {
                "@type": "Question",
                "name": "Which B.Tech colleges in Bangalore accept JEE Main?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Many top private colleges like RVCE, BMSCE, and MSRIT have some seats for JEE Main candidates, though they primarily take COMEDK and KCET. IIIT Bangalore and PES University (JEE Quote) are also highly sought after."
                }
            },
            {
                "@type": "Question",
                "name": "Can I get a good engineering college with 85 percentile?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, at 85 percentile you can get into several reputed IPU colleges in Delhi (like BVCOE, BPIT), Top private colleges in Pune and Bangalore, and newer NITs in some categories."
                }
            }
        ]
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "B.Tech College Predictor 2026",
        "description": "Free online tool to predict B.Tech college based on JEE Main 2026 percentile.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 font-body">
            <JsonLd data={faqSchema} />
            <JsonLd data={webAppSchema} />

            {/* Header Section */}
            <div className="bg-white border-b-8 border-[#18181b] py-20 px-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full opacity-5 -mr-48 -mt-24 blur-3xl" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <Breadcrumbs />
                    <div className="mt-12 max-w-5xl">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-10">
                            Engineering <br />
                            <span className="text-yellow-500 underline decoration-[16px] underline-offset-8 text-black">Destiny</span> Predictor.
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-800 leading-tight border-l-[16px] border-[#18181b] pl-10 bg-yellow-400 py-6 inline-block w-full">
                            Stop guessing. Know exactly which B.Tech colleges are within your reach based on your JEE Main 2026 expected results.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Predictor */}
            <BtechPredictorClient />

            {/* Educational Content */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-8 space-y-20">
                        {/* Counselling Insights */}
                        <section>
                            <h2 className="text-4xl font-black uppercase tracking-tight mb-10 flex items-center gap-4">
                                <Cpu className="w-10 h-10 text-yellow-500" />
                                2026 Engineering Admission Insights
                            </h2>
                            <div className="bg-white border-4 border-[#18181b] p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] prose">
                                <p className="font-bold text-xl text-slate-900 mb-6">
                                    The 2026 B.Tech admissions are expected to be highly competitive due to the increasing volume of applicants for CSE and AI-related branches.
                                </p>
                                <p className="font-medium text-slate-600 leading-relaxed mb-6">
                                    While the IITs and Top NITs remain the first choices, colleges in engineering hubs like **Pune and Bangalore** are seeing a huge surge in JEE Main cutoffs.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 bg-slate-50 p-8 border-2 border-slate-100 italic rounded-2xl">
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-black uppercase text-[#18181b]">Counselling Tip #1</h4>
                                        <p className="text-sm font-bold opacity-80">Don't rely only on JoSAA. Check JAC Delhi, COMEDK, and MHT-CET counselling for better branch options at lower percentiles.</p>
                                    </div>
                                    <div className="space-y-4 font-bold">
                                        <h4 className="text-lg font-black uppercase text-[#18181b]">Counselling Tip #2</h4>
                                        <p className="text-sm font-bold opacity-80 text-rose-600">Many premier private institutes keep 15-20% seats for JEE Main candidates. Always apply via the Institutional Quota if your percentile is &gt; 90.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Cutoff Table */}
                        <section>
                            <h2 className="text-4xl font-black uppercase tracking-tight mb-10 flex items-center gap-4">
                                <BarChart3 className="w-10 h-10 text-yellow-500" />
                                Expected JEE Main Cutoff 2026
                            </h2>
                            <div className="overflow-x-auto border-4 border-[#18181b] shadow-[12px_12px_0px_0px_rgba(234,179,8,1)]">
                                <table className="w-full text-left border-collapse bg-white">
                                    <thead>
                                        <tr className="bg-[#18181b] text-white uppercase text-sm font-black italic tracking-widest">
                                            <th className="p-6 border-r border-white/20">Category</th>
                                            <th className="p-6">Expected Cutoff (%ile)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-black text-lg">
                                        <tr className="border-b-4 border-slate-100 bg-white">
                                            <td className="p-6 border-r-4 border-slate-100 uppercase">General (UR)</td>
                                            <td className="p-6 text-emerald-600 italic">91.5 - 93.0</td>
                                        </tr>
                                        <tr className="border-b-4 border-slate-100 bg-slate-50">
                                            <td className="p-6 border-r-4 border-slate-100 uppercase">General-EWS</td>
                                            <td className="p-6 text-emerald-600 italic">77.0 - 79.0</td>
                                        </tr>
                                        <tr className="border-b-4 border-slate-100 bg-white">
                                            <td className="p-6 border-r-4 border-slate-100 uppercase">OBC-NCL</td>
                                            <td className="p-6 text-emerald-600 italic">74.5 - 76.5</td>
                                        </tr>
                                        <tr className="border-b-4 border-slate-100 bg-slate-50">
                                            <td className="p-6 border-r-4 border-slate-100 uppercase">SC</td>
                                            <td className="p-6 text-emerald-600 italic">52.0 - 54.0</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="p-6 border-r-4 border-slate-100 uppercase">ST</td>
                                            <td className="p-6 text-emerald-600 italic">38.5 - 41.0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        {/* Why Use This Tool */}
                        <div className="bg-[#18181b] text-white p-10 border-4 border-[#18181b] shadow-[12px_12px_0px_0px_rgba(59,130,246,1)]">
                            <h3 className="text-2xl font-black uppercase mb-8 underline decoration-yellow-500 underline-offset-8">Why Use This?</h3>
                            <ul className="space-y-8">
                                <li className="flex gap-4">
                                    <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                                    <div>
                                        <h4 className="font-black uppercase text-sm mb-1">Accurate Data</h4>
                                        <p className="text-xs font-bold text-slate-400">Based on last 5 years of JoSAA Trends.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <TrendingUp className="w-8 h-8 text-blue-400 shrink-0" />
                                    <div>
                                        <h4 className="font-black uppercase text-sm mb-1">Regional Specialists</h4>
                                        <p className="text-xs font-bold text-slate-400">Includes top autonomous colleges in Pune, Bangalore & Delhi.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <Zap className="w-8 h-8 text-yellow-400 shrink-0" />
                                    <div>
                                        <h4 className="font-black uppercase text-sm mb-1">Instant Results</h4>
                                        <p className="text-xs font-bold text-slate-400">No email required. Publicly accessible for all.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Lead Magnet */}
                        <div className="bg-yellow-500 border-4 border-[#18181b] p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-2xl font-black uppercase mb-6 text-black italic">Need a 1-to-1 Choice List?</h3>
                            <p className="text-sm font-bold text-black opacity-80 mb-8 leading-tight">
                                Our engineering admission experts will create a custom preference list for you based on your rank and career goals.
                            </p>
                            <Link href="/inquiry" className="block text-center w-full bg-[#18181b] text-white py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all border-4 border-[#18181b]">
                                Book Consultation
                            </Link>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <HelpCircle className="w-10 h-10 text-yellow-500" />
                        B.Tech Admissions FAQ
                    </h2>
                    <div className="space-y-8">
                        <div className="bg-white border-4 border-[#18181b] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-xl font-black uppercase mb-4 italic">What is the difference between Home State and Other State quota in NITs?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                NITs reserve 50% of the seats for students who have passed their Class 12th from the same state where the NIT is located (Home State). The remaining 50% are for students from other states (Other State). Typically, Home State cutoffs are lower than Other State cutoffs.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-[#18181b] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-xl font-black uppercase mb-4 italic">Should I choose a lower branch in an NIT or CS/IT in a top private college?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                This depends on your interest. If you are passionate about coding, a top private college (like RVCE, BMSCE or VIT Pune) with a CS/IT degree might offer better career prospects than a non-tech branch in a mid-level NIT. However, NITs have a stronger brand value for higher studies abroad.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer Internal Links */}
                <div className="mt-32 pt-16 border-t-8 border-[#18181b]">
                     <h3 className="text-2xl font-black uppercase mb-12 italic underline decoration-blue-500 underline-offset-8">Read Before Counselling</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                         <Link href="/blog/best-engineering-colleges-in-delhi-2026" className="font-black uppercase text-sm hover:text-yellow-600 transition-colors">Top Engg. Colleges in Delhi →</Link>
                         <Link href="/blog/direct-admission-in-btech-pune" className="font-black uppercase text-sm hover:text-yellow-600 transition-colors">Direct Admission in Pune B.Tech →</Link>
                         <Link href="/blog/rvce-bangalore-management-quota" className="font-black uppercase text-sm hover:text-yellow-600 transition-colors">RVCE Management Quota Guide →</Link>
                         <Link href="/tools/college-comparison" className="font-black uppercase text-sm hover:text-yellow-600 transition-colors">Compare Colleges →</Link>
                     </div>
                </div>
            </div>
        </div>
    );
}
