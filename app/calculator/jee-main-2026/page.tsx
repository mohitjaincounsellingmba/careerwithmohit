import type { Metadata } from "next";
import { JeeCalculator } from "@/components/JeeCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShieldCheck, BarChart3, Zap, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "JEE Main 2026 Score Calculator | Subject-wise Percentile Predictor",
    description: "Calculate your JEE Main 2026 marks instantly. Accurate +4/-1 marking for MCQs and +4/0 for Numerical questions. Predict your AIR and percentile across Physics, Chemistry, and Maths.",
    keywords: ["JEE Main score calculator", "JEE Main 2026 percentiles", "JEE Main marking scheme", "NTA JEE Main 2026", "IIT JEE score predictor"],
};

export default function JeeCalculatorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the JEE Main 2026 marking scheme?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For MCQs, you get +4 for a correct answer and -1 for an incorrect answer. For Numerical Value Questions, you get +4 for correct, and there is no negative marking (0) for incorrect answers in the 2025/2026 pattern."
                }
            },
            {
                "@type": "Question",
                "name": "How many questions are mandatory in JEE Main 2026 Section B?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "As per the latest NTA circular, the 'attempt 5 out of 10' rule has been scrapped. All 5 Numerical questions in Section B are now mandatory."
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <JsonLd data={faqSchema} />

            {/* Hero Header */}
            <div className="bg-white border-b-8 border-foreground py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <Breadcrumbs />
                    <div className="mt-10 max-w-4xl">
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                            JEE <span className="text-blue-600 underline decoration-[12px] underline-offset-8">Main 2026</span><br />
                            Score Master.
                        </h1>
                        <p className="text-xl md:text-2xl font-black text-slate-800 border-l-[12px] border-blue-600 pl-8 leading-tight">
                            Don't wait for NTA. Calculate your raw internal score and predicted rank across all three subjects instantly.
                        </p>
                    </div>
                </div>
            </div>

            {/* Calculator Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <JeeCalculator />

                {/* Features Content */}
                <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="p-10 border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(37,99,235,1)]">
                        <ShieldCheck className="w-12 h-12 text-blue-600 mb-6" />
                        <h4 className="text-2xl font-black uppercase mb-4 italic">NTA 2026 Logic</h4>
                        <p className="font-bold text-slate-600">Built with the exact 75-question mandatory pattern for the 2026 session.</p>
                    </div>
                    <div className="p-10 border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(245,158,11,1)]">
                        <BarChart3 className="w-12 h-12 text-amber-500 mb-6" />
                        <h4 className="text-2xl font-black uppercase mb-4 italic">AIR Predictions</h4>
                        <p className="font-bold text-slate-600">Advanced mapping of raw scores to expected percentiles based on shift-wise analysis.</p>
                    </div>
                    <div className="p-10 border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        <Zap className="w-12 h-12 text-primary mb-6" />
                        <h4 className="text-2xl font-black uppercase mb-4 italic">Subject Analysis</h4>
                        <p className="font-bold text-slate-600">Break down your performance in Physics, Chemistry, and Maths separately.</p>
                    </div>
                </div>

                {/* High-Intent FAQ */}
                <div className="mt-40 max-w-5xl">
                    <h3 className="text-5xl font-black uppercase mb-16 flex items-center gap-6">
                        <HelpCircle className="w-12 h-12 text-primary" />
                        JEE 2026 Insights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="bg-white border-4 border-foreground p-10 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                            <h5 className="text-2xl font-black uppercase mb-6 text-blue-700">Is a 180 score good in JEE Main?</h5>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                Yes, a 180+ score usually lands you in the 99+ percentile, which is sufficient for admission to top NITs and eligibility for JEE Advanced.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-10 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                            <h5 className="text-2xl font-black uppercase mb-6 text-blue-700">What is the percentile vs rank trend?</h5>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                A 99 percentile usually corresponds to an AIR of around 12,000-14,000, depending on the number of unique candidates in the 2026 session.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
