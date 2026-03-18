"use client";

import { useState } from "react";
import { 
    Search, Sparkles, Send, FileText, Download, 
    ChevronRight, Target, ShieldCheck, TrendingUp, 
    Layers, Briefcase, Zap, Loader2, Bookmark
} from "lucide-react";

interface CaseStudyResult {
    title: string;
    executiveSummary: string;
    industryContext: string;
    problemStatement: string;
    swotAnalysis: {
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
    };
    strategicSolution: string;
    conclusion: string;
}

export default function CaseStudyGeneratorClient() {
    const [caseName, setCaseName] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<CaseStudyResult | null>(null);

    const handleGenerate = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!caseName.trim()) return;

        setIsGenerating(true);
        setResult(null);

        // Simulate AI generation lag
        await new Promise(r => setTimeout(r, 2500));

        setResult({
            title: caseName,
            executiveSummary: `This analysis explores the strategic trajectory of ${caseName}, focusing on market positioning and operational efficiency within the current competitive landscape.`,
            industryContext: "The industry is currently undergoing a digital transformation, with a 15% increase in consumer demand for personalized services.",
            problemStatement: `The core challenge for ${caseName} lies in balancing rapid scaling with quality assurance while fending off disruptive new entrants.`,
            swotAnalysis: {
                strengths: ["Strong brand equity", "Proprietary technology stack", "Agile leadership"],
                weaknesses: ["High dependency on single market", "Limited international presence"],
                opportunities: ["Expansion into Tier 2 markets", "AI-driven customer insights"],
                threats: ["Tightening data regulations", "Aggressive price wars"]
            },
            strategicSolution: "Implement a bifurcated growth strategy focusing on operational lean-management in the core business while launching a separate 'Innovation Lab' for experimental markets.",
            conclusion: "By adopting this MECE-driven strategic roadmap, the brand can expect a 20% margin improvement over the next 18 months."
        });

        setIsGenerating(false);
    };

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto -mt-12 relative z-20">
            {/* Search Hub */}
            <div className="bg-white border-4 border-slate-900 p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative group">
                        <input
                            type="text"
                            value={caseName}
                            onChange={(e) => setCaseName(e.target.value)}
                            placeholder="Enter Case Study Name (e.g. Amazon Logistics, Zomato IPO...)"
                            className="w-full bg-slate-50 border-4 border-slate-900 p-5 pl-14 text-lg font-black uppercase tracking-tight focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    </div>
                    <button
                        disabled={!caseName.trim() || isGenerating}
                        className="bg-emerald-500 text-white px-10 py-5 font-black uppercase text-sm tracking-widest border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Generate Solution
                            </>
                        )}
                    </button>
                </form>

                {/* Quick Examples */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-black uppercase text-slate-500">Popular Queries:</span>
                    {["Tesla Autopilot", "Starbucks Loyalty", "IKEA Globalization"].map(q => (
                        <button
                            key={q}
                            onClick={() => { setCaseName(q); }}
                            className="text-[10px] font-bold uppercase text-slate-900 border-2 border-slate-200 px-3 py-1 hover:bg-slate-900 hover:text-white transition-all"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </div>

            {/* Analysis Canvas */}
            {result && (
                <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-slate-900 text-white p-6 border-x-4 border-t-4 border-slate-900 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Bookmark className="w-5 h-5 text-emerald-500" />
                            <h3 className="font-black uppercase tracking-widest text-xs">Analysis Report: {result.title}</h3>
                        </div>
                        <button className="flex items-center gap-2 p-2 px-4 bg-emerald-500 text-white rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-white hover:text-emerald-500 transition-all">
                            <Download className="w-4 h-4" /> Export PDF
                        </button>
                    </div>

                    <div className="bg-white border-4 border-slate-900 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12 shadow-[12px_12px_0px_0px_rgba(16,185,129,1)]">
                        {/* Main Analysis Column */}
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h4 className="text-xl font-black uppercase mb-4 text-emerald-500 border-b-2 border-emerald-500/10 pb-2 inline-block">01. Executive Summary</h4>
                                <p className="text-slate-700 font-bold leading-relaxed text-lg italic bg-slate-50 p-6 border-l-8 border-slate-900">
                                    "{result.executiveSummary}"
                                </p>
                            </section>

                            <section>
                                <h4 className="text-xl font-black uppercase mb-4 text-emerald-500 border-b-2 border-emerald-500/10 pb-2 inline-block">02. Problem Statement</h4>
                                <div className="space-y-4">
                                    <p className="font-bold text-slate-800 leading-relaxed text-xl tracking-tight">
                                        {result.problemStatement}
                                    </p>
                                    <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-100 rounded-xl">
                                        <Target className="w-5 h-5 text-red-500" />
                                        <span className="text-xs font-black uppercase text-red-600">Critical Bottleneck Identified</span>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h4 className="text-xl font-black uppercase mb-4 text-emerald-500 border-b-2 border-emerald-500/10 pb-2 inline-block">03. Strategic Solution</h4>
                                <div className="p-8 bg-slate-900 text-white rounded-3xl relative overflow-hidden">
                                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-500/20 blur-3xl"></div>
                                    <p className="text-xl font-bold leading-relaxed relative z-10">
                                        {result.strategicSolution}
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar: Frameworks & SWOT */}
                        <div className="space-y-8">
                            <div className="bg-slate-50 border-4 border-slate-900 p-6 rounded-2xl">
                                <h4 className="text-sm font-black uppercase mb-6 flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-emerald-500" />
                                    SWOT Matrix
                                </h4>
                                <div className="space-y-6">
                                    {[
                                        { label: "Strengths", items: result.swotAnalysis.strengths, color: "text-emerald-600" },
                                        { label: "Weaknesses", items: result.swotAnalysis.weaknesses, color: "text-red-500" },
                                        { label: "Opportunities", items: result.swotAnalysis.opportunities, color: "text-blue-500" },
                                        { label: "Threats", items: result.swotAnalysis.threats, color: "text-amber-500" }
                                    ].map(s => (
                                        <div key={s.label}>
                                            <span className={`text-[9px] font-black uppercase tracking-widest ${s.color}`}>{s.label}</span>
                                            <ul className="mt-2 space-y-1">
                                                {s.items.map((item, i) => (
                                                    <li key={i} className="text-xs font-bold text-slate-600 flex items-center gap-2">
                                                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-emerald-500 p-6 text-white rounded-2xl">
                                <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-80">Industry Vibe</h4>
                                <div className="flex items-center gap-4">
                                    <TrendingUp className="w-10 h-10" />
                                    <div>
                                        <div className="text-2xl font-black leading-none">HIGH</div>
                                        <div className="text-[9px] font-bold uppercase opacity-80">Strategic Resilience</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
