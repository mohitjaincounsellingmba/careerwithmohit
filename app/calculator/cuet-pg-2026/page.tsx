import type { Metadata } from "next";
import { CuetCalculator } from "@/components/CuetCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShieldCheck, Zap, BarChart3, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "CUET PG 2026 Score Calculator | Raw Score & Percentile Predictor",
    description: "Calculate your CUET PG 2026 raw score instantly. Accurate marking scheme (+4/-1), percentile prediction, and top college cutoffs for MBA & other PG programs.",
    keywords: ["CUET PG calculator", "CUET PG 2026 score calculator", "percentile predictor CUET PG", "CUET PG marking scheme", "NTA CUET PG score"],
};

export default function CuetCalculatorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the marking scheme for CUET PG 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The CUET PG marking scheme awards +4 marks for every correct answer and deducts -1 mark for every incorrect answer. Unattempted questions carry zero marks."
                }
            },
            {
                "@type": "Question",
                "name": "How is the raw score calculated in CUET PG?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The raw score is calculated using the formula: (Total Correct × 4) - (Total Incorrect × 1). The maximum marks are usually 300 for 75 questions."
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
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Predict Your <br />
                            <span className="text-primary underline decoration-[12px] underline-offset-8">CUET PG</span> Future.
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-primary pl-8">
                            The most accurate 2026 score calculator based on the latest NTA marking patterns.
                            Get your raw score and predicted percentile in seconds.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Calculator Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <CuetCalculator />

                {/* Features / Why Use This Section */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <ShieldCheck className="w-12 h-12 text-primary mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4">100% Accuracy</h4>
                        <p className="font-bold text-slate-600">Calculated strictly according to the official +4/-1 NTA marking scheme for 2026.</p>
                    </div>
                    <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <BarChart3 className="w-12 h-12 text-blue-600 mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4">Percentile View</h4>
                        <p className="font-bold text-slate-600">Get an instant estimation of your percentile vs other candidates based on past trends.</p>
                    </div>
                    <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <Zap className="w-12 h-12 text-amber-500 mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4">Mobile Ready</h4>
                        <p className="font-bold text-slate-600">Optimized for smartphones. Check your potential score even on the move.</p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-32 max-w-4xl">
                    <h3 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <HelpCircle className="w-10 h-10 text-primary" />
                        Frequently Asked Questions
                    </h3>
                    <div className="space-y-8">
                        <div className="bg-white border-4 border-foreground p-8">
                            <h5 className="text-xl font-black uppercase mb-4">What is a good score in CUET PG 2026?</h5>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                For top-tier universities like TISS, DU, or BHU (MBA Programs), a score of 200+ is generally considered excellent (98+ percentile).
                                For moderate universities, a score between 140-160 often lands you a good seat.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h5 className="text-xl font-black uppercase mb-4">How many questions are there in CUET PG?</h5>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                As per the updated pattern, the exam consists of 75 subject-specific questions. Part A (General Aptitude) was removed for many subjects starting from 2024.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
