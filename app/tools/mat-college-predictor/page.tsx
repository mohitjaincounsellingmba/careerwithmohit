import type { Metadata } from "next";
import MatPredictorClient from "./MatPredictorClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Calculator, School, BarChart3, MapPin, CheckCircle2, Info, Compass, Table, Trophy, Target } from "lucide-react";

export const metadata: Metadata = {
    title: "AIMA MAT College Predictor 2026 | MAT Score vs Percentile & Cutoff",
    description: "Free AIMA MAT 2026 College Predictor. Check MAT Score vs Percentile mapping and find top MBA/PGDM colleges like BIMTECH, XIME, and Jaipuria based on your percentile.",
    keywords: [
        "mat college predictor 2026", 
        "mat score vs percentile 2026", 
        "mba colleges accepting mat 2026", 
        "mat cutoff for top mba colleges", 
        "best colleges for 80 percentile in mat",
        "aima mat predictor free",
        "career with mohit mat tool"
    ],
    alternates: {
        canonical: "/tools/mat-college-predictor",
    },
};

export default function MatPredictorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What MAT percentile is required for top MBA colleges?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Top-tier colleges like BIMTECH (Noida), XIME (Bangalore), and PUMBA (Pune) generally require a MAT percentile of 90-95+. Mid-tier colleges like Jaipuria and JIMS Rohini accept 75-85 percentile."
                }
            },
            {
                "@type": "Question",
                "name": "How is MAT Score vs Percentile calculated for 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For MAT 2026, a composite score of 100+ typically fetches a 90+ percentile. A score between 80-100 results in the 85-90 percentile range."
                }
            },
            {
                "@type": "Question",
                "name": "Is the MAT College Predictor free?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our MAT College Predictor is a free tool designed to help students discover their best MBA/PGDM options based on real-time AIMA data."
                }
            },
            {
                "@type": "Question",
                "name": "Does JBIMS accept MAT?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "JBIMS Mumbai primarily accepts MAH CET scores for its MMS program, but it may consider MAT for specific categories or MSc Finance depending on the latest DTE Rajasthan/Maharashtra guidelines."
                }
            }
        ]
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "AIMA MAT College Predictor 2026",
        "operatingSystem": "All",
        "applicationCategory": "EducationApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        },
        "description": "Interactive tool to predict MBA colleges based on MAT percentile for the 2026 admission cycle."
    };

    return (
        <main className="min-h-screen bg-white">
            <JsonLd data={faqSchema} />
            <JsonLd data={softwareSchema} />

            {/* Premium Hero Section */}
            <div className="bg-[#1a1a2e] text-white pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-500 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-600 rounded-full blur-[120px]"></div>
                </div>
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <Breadcrumbs />

                    <div className="mt-12 flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-1.5 mb-8 rounded-full border border-white/20 shadow-lg shadow-emerald-500/20">
                                <BarChart3 className="w-4 h-4 text-white" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">MAT 2026 Intelligent Prediction</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                                MAT College <br />
                                <span className="text-emerald-500">Predictor</span>
                            </h1>
                            <p className="text-xl text-slate-300 font-bold max-w-xl leading-relaxed">
                                Unlock your path to India's top B-Schools. Map your MAT percentile to 100+ institutes with our advanced 2026 matching algorithm.
                            </p>
                        </div>
                        
                        <div className="flex-1 w-full max-w-lg">
                            <div className="p-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl relative">
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full"></div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/30">
                                        <Calculator className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-black uppercase tracking-widest text-xs text-emerald-500">Free Tool</h3>
                                        <p className="font-bold text-white">MBA Admission 2026</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[75%] animate-pulse"></div>
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium italic">"The most accurate Predictor for MAT Dec 2025 & Feb 2026 exam cycles."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEW Content Section: Score vs Percentile Table */}
            <section className="py-20 px-6 bg-white relative z-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-xs mb-4">
                            <Table className="w-4 h-4" />
                            Statistical Insights
                        </div>
                        <h2 className="text-4xl font-black uppercase tracking-tight text-[#1a1a2e]">MAT Score vs Percentile <span className="text-slate-400">2026</span></h2>
                        <p className="text-slate-500 font-bold mt-4">Average composite score required to achieve targeted percentiles for top MBA colleges.</p>
                    </div>

                    <div className="overflow-hidden rounded-[2rem] border-4 border-[#1a1a2e] shadow-[12px_12px_0px_0px_rgba(26,26,46,1)]">
                        <table className="w-full text-left">
                            <thead className="bg-[#1a1a2e] text-white">
                                <tr>
                                    <th className="px-8 py-5 text-sm font-black uppercase tracking-widest">Composite Score</th>
                                    <th className="px-8 py-5 text-sm font-black uppercase tracking-widest">Estimated Percentile</th>
                                    <th className="px-8 py-5 text-sm font-black uppercase tracking-widest">College Tier</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-emerald-50/50 transition-colors">
                                    <td className="px-8 py-5 font-bold">101 - 110</td>
                                    <td className="px-8 py-5 font-black text-emerald-600">91 - 95%ile</td>
                                    <td className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest">Elite Tier</td>
                                </tr>
                                <tr className="hover:bg-blue-50/50 transition-colors">
                                    <td className="px-8 py-5 font-bold">81 - 100</td>
                                    <td className="px-8 py-5 font-black text-blue-600">85 - 90%ile</td>
                                    <td className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest">Premium Tier</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-5 font-bold">71 - 80</td>
                                    <td className="px-8 py-5 font-black text-slate-900">75 - 80%ile</td>
                                    <td className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest">Core B-School</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-5 font-bold">51 - 70</td>
                                    <td className="px-8 py-5 font-black text-slate-900">61 - 74%ile</td>
                                    <td className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest">Emerging Tier</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Interactive Tool Section */}
            <MatPredictorClient />

            {/* Info Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                                <School className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">Direct AIMA Data</h3>
                            <p className="text-slate-600 font-bold leading-relaxed">
                                We've mapped our database directly with the latest participating B-schools list from AIMA MAT December 2025 and February 2026 cycles.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                                <Compass className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">Zonal Mapping</h3>
                            <p className="text-slate-600 font-bold leading-relaxed">
                                Find colleges in your preferred region. Separate lists for North, South, East, and West zones provided by AIMA.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">Categorized Results</h3>
                            <p className="text-slate-600 font-bold leading-relaxed">
                                Results are grouped into **Safe** (90%+ chance), **Target** (Fair chance), and **Reach** (Competitive) for easier decision making.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Colleges Section */}
            <section className="py-24 px-6 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-black uppercase tracking-tight text-[#1a1a2e] mb-16">Top MBA Colleges <span className="text-emerald-500">Accepting MAT</span></h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "BIMTECH Noida", cutoff: "90+ %ile", pack: "₹10.9 LPA", icon: Trophy },
                            { name: "XIME Bangalore", cutoff: "85+ %ile", pack: "₹10.3 LPA", icon: Target },
                            { name: "Jaipuria Noida", cutoff: "80+ %ile", pack: "₹11.2 LPA", icon: CheckCircle2 },
                            { name: "IMI Kolkata", cutoff: "80+ %ile", pack: "₹10.6 LPA", icon: BarChart3 },
                        ].map((c, i) => (
                            <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border-2 border-slate-100 hover:border-emerald-500 transition-all group">
                                <c.icon className="w-10 h-10 text-emerald-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-black uppercase mb-2">{c.name}</h4>
                                <p className="text-sm font-bold text-slate-500 mb-4">{c.cutoff}</p>
                                <div className="inline-block px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                                    Avg Pack: {c.pack}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
