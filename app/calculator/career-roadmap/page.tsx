import type { Metadata } from "next";
import { CareerRoadmapCalculator } from "@/components/CareerRoadmapCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Map, Sparkles, Users, BookOpen } from "lucide-react";

export const metadata: Metadata = {
    title: "Career Roadmap Calculator 2026 | MBA & BTech Skills, Certifications & Companies",
    description: "Get your personalized career roadmap for MBA or BTech specializations. Find required skills, top certifications, leading companies, and salary packages for Finance, CS, HR, Marketing, and more.",
    keywords: ["career roadmap MBA", "BTech career roadmap", "MBA specialization guide", "career after MBA finance", "career after BTech CSE", "skills for finance MBA", "certifications for MBA", "top companies MBA placements"],
};

export default function CareerRoadmapPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is a good MBA specialization for high salary?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Finance and Business Analytics are among the highest paying MBA specializations in India, with roles like Investment Banker and Portfolio Manager offering ₹15–35 LPA starting packages at top firms."
                }
            },
            {
                "@type": "Question",
                "name": "Which B.Tech branch has the best career scope?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Computer Science (CSE) and Electronics (ECE) have the highest demand, especially in product-based tech companies, semiconductor firms, and startups offering ₹10–40 LPA for fresh graduates."
                }
            },
            {
                "@type": "Question",
                "name": "How do I use the Career Roadmap Calculator?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply select your program (MBA or BTech), then choose your specialization. Enter your contact details to unlock a full personalized roadmap including skills, certifications, top companies, and salary ranges."
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50 font-body">
            <JsonLd data={faqSchema} />

            {/* Hero */}
            <div className="bg-white border-b-8 border-foreground py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <Breadcrumbs />
                    <div className="mt-8 max-w-4xl">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Build Your <br />
                            <span className="text-primary underline decoration-[12px] underline-offset-8">Career</span> Roadmap.
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-primary pl-8">
                            Select your program and specialization. Get a personalized guide to skills,
                            certifications, top companies, and salaries — instantly.
                        </p>
                    </div>
                </div>
            </div>

            {/* Calculator */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <CareerRoadmapCalculator />

                {/* Why use this */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { icon: <Map className="w-10 h-10 text-primary mb-4" />, title: "Clear Roadmap", desc: "Step-by-step path for your chosen specialization — no guesswork." },
                        { icon: <Sparkles className="w-10 h-10 text-amber-500 mb-4" />, title: "Cert Guidance", desc: "Know exactly which certifications will boost your profile and hirability." },
                        { icon: <Users className="w-10 h-10 text-blue-600 mb-4" />, title: "Top Companies", desc: "Discover which companies recruit from your specialization and sector." },
                        { icon: <BookOpen className="w-10 h-10 text-green-600 mb-4" />, title: "Salary Intel", desc: "Get realistic salary benchmarks for each role in your career path." },
                    ].map(item => (
                        <div key={item.title} className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            {item.icon}
                            <h4 className="text-lg font-black uppercase mb-3">{item.title}</h4>
                            <p className="font-bold text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <div className="mt-32 max-w-4xl">
                    <h3 className="text-4xl font-black uppercase tracking-tight mb-10">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        {[
                            { q: "Which MBA specialization is best for me?", a: "It depends on your interests and strengths. Finance is best for number-oriented students aiming for investment banking. Marketing is ideal if you love brand storytelling. Analytics suits tech-savvy problem solvers. Use our calculator to explore all options." },
                            { q: "Is a B.Tech in CSE better than ECE?", a: "Both have excellent career prospects. CSE is better for software, AI, and product roles at tech giants. ECE is ideal for VLSI, embedded systems, semiconductor, and telecom roles, often offering international opportunities." },
                            { q: "Do I need certifications alongside my MBA/BTech degree?", a: "Yes — certifications significantly boost your employability. For MBA Finance, CFA or FMVA is gold. For BTech CSE, AWS or Google Cloud certifications can double your package. Our roadmap highlights the most impactful ones for each path." },
                        ].map(faq => (
                            <div key={faq.q} className="bg-white border-4 border-foreground p-8">
                                <h5 className="text-lg font-black uppercase mb-3">{faq.q}</h5>
                                <p className="font-bold text-slate-600 leading-relaxed text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
