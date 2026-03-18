import type { Metadata } from "next";
import MatPredictorClient from "./MatPredictorClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Calculator, School, BarChart3, MapPin, CheckCircle2, Info, Compass } from "lucide-react";

export const metadata: Metadata = {
    title: "AIMA MAT College Predictor 2026 | Predict MBA Colleges by Percentile",
    description: "Use our free AIMA MAT 2026 College Predictor to find best MBA/PGDM institutes based on your percentile. Get Safe, Target, and Reach college lists instantly.",
    keywords: ["aima mat college predictor", "mat percentile predictor 2026", "mba colleges accepting mat", "mat score vs percentile", "career with mohit tools"],
};

export default function MatPredictorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How accurate is the MAT College Predictor?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The predictor uses historical cutoff data and the latest AIMA MAT participating institutes list to categorize colleges into Safe, Target, and Reach zones."
                }
            },
            {
                "@type": "Question",
                "name": "Which colleges accept MAT scores?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Over 600+ B-schools in India accept MAT scores, including top institutes like BIMTECH, XIME, Jaipuria, Christ University, and IPE Hyderabad."
                }
            }
        ]
    };

    return (
        <main className="min-h-screen bg-white">
            <JsonLd data={faqSchema} />

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
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">2026 Prediction Algorithm</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                                MAT College <br />
                                <span className="text-emerald-500">Predictor</span>
                            </h1>
                            <p className="text-xl text-slate-300 font-bold max-w-xl leading-relaxed">
                                Don't guess your future. Enter your MAT percentile and discover which top-tier B-Schools are within your reach. 
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
                                        <h3 className="font-black uppercase tracking-widest text-xs text-emerald-500">Step 01</h3>
                                        <p className="font-bold text-white">Enter Your Stats</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[65%] animate-pulse"></div>
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium">Our algorithm is ready to process over 100+ AIMA-recognized institutes based on your MAT performance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
        </main>
    );
}
