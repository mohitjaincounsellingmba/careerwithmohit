import type { Metadata } from "next";
import ResumeGeneratorClient from "./ResumeGeneratorClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShieldCheck, Zap, Award, FileText, Layout, Download } from "lucide-react";

export const metadata: Metadata = {
    title: "AI Resume Builder V3 | Free Professional CV Generator 2026",
    description: "Upgrade your career with our AI V3 Resume Builder. Featuring real-time health scoring, tone-based rewriting, and 20+ premium MBA-style templates. 100% Free.",
    keywords: ["ai resume builder v3", "resume health score", "cv generator", "mba resume template", "free resume maker", "career with mohit"],
};

export default function ResumeGeneratorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is this resume builder free for students?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our resume builder is completely free for students and professionals. You can choose from 20+ premium templates including MBA and Tech-focused layouts."
                }
            },
            {
                "@type": "Question",
                "name": "Are these resume templates ATS-friendly?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We have specific 'ATS Standard' and 'Minimalist' templates designed to pass through Applicant Tracking Systems used by top companies."
                }
            }
        ]
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <JsonLd data={faqSchema} />

            {/* Hero Section */}
            <div className="bg-foreground text-white pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 translate-x-1/4"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <Breadcrumbs />

                    <div className="mt-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-primary px-4 py-1 mb-6 border-2 border-white shadow-[4px_4px_00px_0px_rgba(255,255,255,1)]">
                            <Zap className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-widest">Free Tool</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
                            Build Your <br />
                            <span className="text-primary italic">Expert</span> Resume
                        </h1>
                        <p className="text-xl text-slate-300 font-bold max-w-2xl leading-relaxed">
                            Stop struggling with formatting. Use our expertise-driven generator to create a professional CV in minutes. 20+ Premium templates for MBA students and working professionals.
                        </p>
                    </div>
                </div>
            </div>

            {/* Interactive Generator Section */}
            <ResumeGeneratorClient />

            {/* Features Grid */}
            <section className="py-24 px-6 bg-white border-y-4 border-foreground">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
                            <Layout className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-xl font-black uppercase mb-4">20+ Pro Templates</h3>
                            <p className="text-slate-600 font-bold leading-relaxed">From HBS Finance to Modern Tech layouts, choose the vibe that fits your expertise.</p>
                        </div>
                        <div className="p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <Zap className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-xl font-black uppercase mb-4">Expertise Toggles</h3>
                            <p className="text-slate-600 font-bold leading-relaxed">Switch between 'Student' and 'Expert' modes to automatically adjust section priority.</p>
                        </div>
                        <div className="p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(34,197,94,1)]">
                            <Download className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-xl font-black uppercase mb-4">One-Click Export</h3>
                            <p className="text-slate-600 font-bold leading-relaxed">Download your resume as a clean, high-resolution PDF ready for job applications.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-6 max-w-4xl mx-auto">
                <h2 className="text-3xl font-black uppercase mb-8 pb-4 border-b-4 border-foreground inline-block">Why use our Resume Builder?</h2>
                <div className="prose prose-slate max-w-none font-medium text-lg leading-relaxed space-y-6">
                    <p>
                        In today's competitive job market, your resume needs to do more than just list your experience. It needs to tell a story of <strong>impact</strong> and <strong>expertise</strong>. Our generator is built on the same principles taught at top-tier business schools like Harvard and Stanford.
                    </p>
                    <p>
                        For <strong>College Students</strong>, we emphasize your academic honors, key projects, and internships first. For <strong>Working Professionals</strong>, we focus on core competencies, leadership metrics, and quantifiable achievements.
                    </p>
                    <div className="bg-slate-100 p-8 border-l-8 border-primary italic font-bold">
                        "A good resume doesn't just get you a job—it gets you the interview for your dream role."
                    </div>
                </div>
            </section>
        </main>
    );
}
