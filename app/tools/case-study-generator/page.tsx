import type { Metadata } from "next";
import CaseStudyGeneratorClient from "./CaseStudyGeneratorClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { BookOpen, GraduationCap, Lightbulb, Target, FileText, Download, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "MBA Case Study Solution Generator | Free PGDM Case Analysis Tool 2026-2027",
  description: "Type your case study name and get a structured MBA-grade solution. Features include SWOT analysis, problem identification, and strategic recommendations for PGDM students.",
  keywords: ["mba case study generator", "pgdm case solution", "management case analysis tool", "free mba tools", "case study solver", "career with mohit"],
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/case-study-generator',
  },
  openGraph: {
    title: "MBA Case Study Solution Generator | CareerWithMohit",
    description: "Generate structured MBA-grade solutions, SWOT analysis, and strategic recommendations for business case studies.",
    url: "https://www.careerwithmohit.online/tools/case-study-generator",
    siteName: "CareerWithMohit",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "MBA Case Study Solution Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBA Case Study Solution Generator | CareerWithMohit",
    description: "Generate structured MBA-grade solutions, SWOT analysis, and strategic recommendations.",
    images: ["/og-image.webp"],
  },
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

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "MBA Case Study Solution Generator",
        "url": "https://www.careerwithmohit.online/tools/case-study-generator",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <JsonLd data={faqSchema} />
            <JsonLd data={softwareSchema} />

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

            {/* Tool Interactive Section */}
            <CaseStudyGeneratorClient />

            {/* Educational / Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-emerald-600 font-black text-xs uppercase tracking-widest bg-emerald-100 px-4 py-2 border-2 border-emerald-600">Case Framework</span>
                    <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900 mt-4">Why Use Case Study Genius?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                        <Target className="w-10 h-10 text-emerald-500 mb-6" />
                        <h3 className="text-2xl font-black uppercase mb-4">Precision Frameworks</h3>
                        <p className="text-slate-600 font-bold leading-relaxed">Structured using standard MBA problem-solving frameworks including SWOT, Porter's 5 Forces, and PESTLE analysis.</p>
                    </div>

                    <div className="bg-white p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                        <Lightbulb className="w-10 h-10 text-emerald-500 mb-6" />
                        <h3 className="text-2xl font-black uppercase mb-4">Strategic Roadmaps</h3>
                        <p className="text-slate-600 font-bold leading-relaxed">Get actionable solutions categorized into Immediate, Medium-Term, and Long-Term strategic initiatives.</p>
                    </div>

                    <div className="bg-white p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                        <Award className="w-10 h-10 text-emerald-500 mb-6" />
                        <h3 className="text-2xl font-black uppercase mb-4">Exam Ready</h3>
                        <p className="text-slate-600 font-bold leading-relaxed">Formulated to meet top-tier B-school grading criteria for GD-PI preparations and management exams.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
