import type { Metadata } from "next";
import CaseStudyGeneratorClient from "./CaseStudyGeneratorClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { BookOpen, GraduationCap, Lightbulb, Target, FileText, Download, Award } from "lucide-react";

export const metadata: Metadata = {
    title: "MBA Case Study Solution Generator | Free PGDM Case Analysis Tool 2026",
    description: "Type your case study name and get a structured MBA-grade solution. Features include SWOT analysis, problem identification, and strategic recommendations for PGDM students.",
    keywords: ["mba case study generator", "pgdm case solution", "management case analysis tool", "free mba tools", "case study solver", "career with mohit"],
};

export default function CaseStudyGeneratorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How does the MBA Case Study Generator work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply enter the name of the case study (e.g., 'Netflix Streaming Strategy' or 'Starbucks Rewards Program') and our tool will generate a structured analysis including SWOT, Problem Statement, and Strategic Solutions."
                }
            },
            {
                "@type": "Question",
                "name": "Is this tool suitable for PGDM and MBA exams?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, the output is structured according to management education standards, making it a perfect reference for assignments, exams, and classroom discussions."
                }
            }
        ]
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <JsonLd data={faqSchema} />

            {/* Hero Section */}
            <div className="bg-slate-900 text-white pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 skew-x-12 translate-x-1/4"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <Breadcrumbs />

                    <div className="mt-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-emerald-500 px-4 py-1 mb-6 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                            <BookOpen className="w-4 h-4 text-white" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">MBA Specialized</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
                            Case Study <br />
                            <span className="text-emerald-500 italic">Genius</span>
                        </h1>
                        <p className="text-xl text-slate-300 font-bold max-w-2xl leading-relaxed">
                            Transform any business scenario into a high-scoring MBA analysis. Get professional solutions with frameworks, SWOT, and strategic roadmaps instantly.
                        </p>
                    </div>
                </div>
            </div>

            {/* Interactive Generator Section */}
            <CaseStudyGeneratorClient />

            {/* Frameworks Section */}
            <section className="py-24 px-6 bg-white border-y-4 border-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Standard Frameworks Included</h2>
                        <div className="h-2 w-24 bg-emerald-500 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: <Target className="w-8 h-8" />, title: "SWOT Analysis", desc: "Strengths, Weaknesses, Opportunities, and Threats deep-dive." },
                            { icon: <FileText className="w-8 h-8" />, title: "Problem ID", desc: "Pinpointing the core management dilemmas and bottlenecks." },
                            { icon: <Lightbulb className="w-8 h-8" />, title: "Strategic Fix", desc: "Short-term and long-term actionable recommendations." },
                            { icon: <Award className="w-8 h-8" />, title: "Roadmap", desc: "Step-by-step implementation and metric tracking." }
                        ].map((f, i) => (
                            <div key={i} className="p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(16,185,129,1)] hover:translate-x-1 hover:-translate-y-1 transition-all">
                                <div className="text-emerald-500 mb-4">{f.icon}</div>
                                <h3 className="text-lg font-black uppercase mb-2">{f.title}</h3>
                                <p className="text-slate-600 font-bold text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instructional Section */}
            <section className="py-24 px-6 max-w-4xl mx-auto">
                <div className="bg-slate-900 text-white p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[60px] rounded-full"></div>
                    <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3 relative z-10">
                        <GraduationCap className="w-8 h-8 text-emerald-500" />
                        Acing Your Case Exams
                    </h2>
                    <div className="space-y-6 text-slate-300 font-medium text-lg leading-relaxed relative z-10">
                        <p>
                            A perfect MBA case solution isn't just about the "answer"—it's about the <strong>analytical process</strong>. Our generator follows the McKinsey and BCG frameworks to ensure your analysis is MECE (Mutually Exclusive, Collectively Exhaustive).
                        </p>
                        <ul className="space-y-4 list-none">
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span>Always identify the primary stakeholder first.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span>Quantify the problem using available industry data.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span>Propose at least three alternative solutions.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
}
