import type { Metadata } from "next";
import { AtsResumeBuilder } from "@/components/AtsResumeBuilder";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
    Sparkles, ShieldCheck, Award, FileText, CheckCircle2,
    Briefcase, GraduationCap, ArrowRight, Download, Users,
    Zap, Eye, Target, ChevronRight
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Free ATS Resume & CV Builder 2026–2027 | 30+ Templates | CareerWithMohit",
    description: "Build an ATS-compliant resume for Internship, Fresher, or Working Professional goals. Choose from 30+ free ATS templates, optimize with real-time scoring, and export in PDF, PNG, or JPG.",
    keywords: [
        "free ATS resume builder",
        "ATS resume templates free",
        "ATS compliant CV maker",
        "resume builder for internship",
        "fresher placement resume builder",
        "working professional ATS CV",
        "download ATS resume PDF free",
        "resume score checker",
        "active hiring companies resume"
    ],
    alternates: {
        canonical: "https://www.careerwithmohit.online/tools/ats-resume-builder",
    },
    openGraph: {
        title: "Free ATS Resume & CV Builder 2026–2027 | CareerWithMohit",
        description: "100% Free ATS-Compliant Resume & CV Builder with real-time scoring, 30+ templates, and instant PDF/PNG/JPG export.",
        url: "https://www.careerwithmohit.online/tools/ats-resume-builder",
        siteName: "CareerWithMohit",
        type: "website",
        locale: "en_IN",
        images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Free ATS Resume Builder" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free ATS Resume & CV Builder | CareerWithMohit",
        description: "Build, score, and download your ATS-compliant resume free in PDF, PNG, or JPG.",
        images: ["/og-image.webp"],
    },
};

export default function AtsResumeBuilderPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is an ATS (Applicant Tracking System) friendly resume?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "An ATS-friendly resume is formatted specifically so automated recruitment software (like Workday, Taleo, Greenhouse, and Lever) can parse your text, extract skills, work history, and qualifications without errors. It uses single-column or clean two-column structures, standard font hierarchies, and avoids non-parseable graphics or complex tables."
                }
            },
            {
                "@type": "Question",
                "name": "How does the template selector adapt to Internship, Fresher, and Professional goals?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "When you select your career goal, the builder adjusts input fields, placeholder examples, and ATS power verbs. College students see sections highlighting coursework and hackathons; freshers see degree CGPAs and corporate internships; working professionals see quantifiable P&L metrics and leadership milestones."
                }
            },
            {
                "@type": "Question",
                "name": "Is the resume download completely free with no watermark?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! All 30+ templates can be downloaded 100% free with zero watermarks in text-selectable ATS-compliant PDF, PNG, or high-res JPG formats."
                }
            },
            {
                "@type": "Question",
                "name": "Can I switch between the 30+ templates without losing my typed data?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. The builder decouples your profile data from the visual styling. You can switch between any of the 30+ templates with 1 click, and all your entered information stays preserved."
                }
            },
            {
                "@type": "Question",
                "name": "How does the Active Hiring Companies section work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Based on whether you chose Internship, Fresher, or Working Professional, the page dynamically displays verified openings at companies like Google, Microsoft, Deloitte, Swiggy, and Goldman Sachs with direct application links."
                }
            }
        ]
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Free ATS Resume & CV Builder",
        "url": "https://www.careerwithmohit.online/tools/ats-resume-builder",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.careerwithmohit.online"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Tools",
                "item": "https://www.careerwithmohit.online/tools"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "ATS Resume Builder",
                "item": "https://www.careerwithmohit.online/tools/ats-resume-builder"
            }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <JsonLd data={faqSchema} />
            <JsonLd data={webAppSchema} />
            <JsonLd data={breadcrumbSchema} />

            {/* Print Stylesheet to guarantee pristine 100% vector text-selectable PDF output */}
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    body * {
                        visibility: hidden !important;
                    }
                    #ats-resume-document, #ats-resume-document * {
                        visibility: visible !important;
                    }
                    #ats-resume-document {
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 15mm 20mm !important;
                        box-shadow: none !important;
                        border: none !important;
                        transform: none !important;
                    }
                }
            ` }} />

            {/* Midnight Navy Premium Hero Section */}
            <div className="relative bg-gradient-to-b from-[#0A192F] via-[#0D2342] to-[#0A192F] text-white pt-10 pb-20 px-6 sm:px-8 border-b border-slate-800 overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-slate-300 mb-6">
                        <Breadcrumbs />
                    </div>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-black tracking-wide uppercase mb-6">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 2026–2027 ATS Optimization Engine • 100% Free
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6">
                            Free ATS Resume &amp; <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                                CV Builder with Live Preview
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8 max-w-3xl">
                            Tailor your curriculum vitae for <strong>Internships</strong>, <strong>Fresher Campus Placements</strong>, or <strong>Lateral Corporate Roles</strong>. 
                            Select from 30+ ATS-compliant templates, optimize with real-time scoring, and export free in PDF, PNG, or high-res JPG.
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mb-10">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
                                3 Tailored Tracks:
                            </span>
                            <span className="px-3 py-1 rounded-xl text-xs font-bold border border-sky-400/40 text-sky-300 bg-sky-500/10">
                                🎓 Internship (10 Templates)
                            </span>
                            <span className="px-3 py-1 rounded-xl text-xs font-bold border border-amber-400/40 text-amber-300 bg-amber-500/10">
                                💼 Fresher Placement (10 Templates)
                            </span>
                            <span className="px-3 py-1 rounded-xl text-xs font-bold border border-emerald-400/40 text-emerald-300 bg-emerald-500/10">
                                🚀 Working Professional (10 Templates)
                            </span>
                        </div>
                    </div>

                    {/* 4 Metric Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-800">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">30+ Templates</div>
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">10 Per Goal Track</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">100% Free</div>
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Zero Watermarks &amp; Locks</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">Live ATS Meter</div>
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Instant Scoring &amp; Tips</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-1">PDF • PNG • JPG</div>
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Text-Selectable Vector Export</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive ATS Resume Builder Application */}
            <div className="py-12 sm:py-16 px-4 sm:px-6 relative -mt-8 z-20">
                <AtsResumeBuilder />
            </div>

            {/* 7 Golden Rules of ATS Compliance */}
            <div className="py-16 sm:py-20 px-6 sm:px-8 bg-white border-y border-slate-200">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Recruiter Intelligence
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            The 7 Golden Rules to Beat ATS Screening Bots
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base mt-2">
                            Over 75% of job applications are filtered out by algorithms before a human recruiter reads them. Here is how our builder protects your profile:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                            <div className="text-amber-600 font-black text-lg mb-2">01. Single &amp; Clean Two-Column</div>
                            <h3 className="text-sm font-extrabold text-slate-900 mb-1">Predictable Parsing Order</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                ATS parsers read resumes from left to right and top to bottom. Our templates avoid floating graphics and nested tables that corrupt text streams.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                            <div className="text-blue-600 font-black text-lg mb-2">02. Quantifiable XYZ Formula</div>
                            <h3 className="text-sm font-extrabold text-slate-900 mb-1">Numbers &amp; Percentage Gains</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Use Google&apos;s XYZ format: &quot;Accomplished [X] as measured by [Y], by doing [Z]&quot;. This triggers positive scoring in modern AI recruitment screeners.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                            <div className="text-emerald-600 font-black text-lg mb-2">03. Standard Section Headers</div>
                            <h3 className="text-sm font-extrabold text-slate-900 mb-1">Recognizable Category Labels</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Don&apos;t use quirky labels like &quot;Where I&apos;ve Been&quot;. ATS parsers specifically search for &quot;Work Experience&quot;, &quot;Education&quot;, and &quot;Skills&quot;.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                            <div className="text-purple-600 font-black text-lg mb-2">04. Action Verb Commencement</div>
                            <h3 className="text-sm font-extrabold text-slate-900 mb-1">Strong Dynamic Verbs</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Start each bullet point with decisive action verbs (e.g., &quot;Spearheaded&quot;, &quot;Architected&quot;, &quot;Automated&quot;, &quot;Negotiated&quot;) instead of &quot;Responsible for&quot;.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                            <div className="text-rose-600 font-black text-lg mb-2">05. Text-Selectable PDF Vector</div>
                            <h3 className="text-sm font-extrabold text-slate-900 mb-1">Never Image-Only PDFs</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Scanning bots cannot extract text from flattened images. Our PDF download engine preserves live, copyable vector text characters.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                            <div className="text-teal-600 font-black text-lg mb-2">06. Role-Specific Keyword Matching</div>
                            <h3 className="text-sm font-extrabold text-slate-900 mb-1">Target Job Description Sync</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Incorporate exact hard tools mentioned in the job description (e.g., &quot;PostgreSQL&quot;, &quot;DCF Modeling&quot;, &quot;Kubernetes&quot;, &quot;A/B Testing&quot;).
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Table: Fancy CV vs Modern ATS Resume */}
            <div className="py-16 sm:py-20 px-6 sm:px-8 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Crucial Comparison</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                            Fancy Canva Templates vs. CareerWithMohit ATS Engine
                        </h2>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <table className="w-full text-left text-xs text-slate-700">
                            <thead className="bg-slate-900 text-white uppercase text-[11px] font-black tracking-wider">
                                <tr>
                                    <th className="py-4 px-5">Feature</th>
                                    <th className="py-4 px-5 text-rose-300">Generic Graphic Templates (Canva)</th>
                                    <th className="py-4 px-5 text-emerald-300">CareerWithMohit ATS Builder</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                                <tr className="hover:bg-slate-50">
                                    <td className="py-4 px-5 font-bold text-slate-900">ATS Bot Parsing Accuracy</td>
                                    <td className="py-4 px-5 text-rose-600">Poor (Fails on Workday, Taleo, Greenhouse)</td>
                                    <td className="py-4 px-5 font-black text-emerald-700">95%+ Compliant with clean text hierarchy</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="py-4 px-5 font-bold text-slate-900">Career Goal Adaptation</td>
                                    <td className="py-4 px-5 text-slate-500">Generic placeholder layout for all</td>
                                    <td className="py-4 px-5 font-bold text-slate-900">3 Distinct tracks (Internship, Fresher, Professional)</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="py-4 px-5 font-bold text-slate-900">1-Click Template Switching</td>
                                    <td className="py-4 px-5 text-rose-600">No (Must retype entire CV from scratch)</td>
                                    <td className="py-4 px-5 font-bold text-emerald-700">Instant switch across 30+ templates without data loss</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="py-4 px-5 font-bold text-slate-900">Real-Time ATS Scoring</td>
                                    <td className="py-4 px-5 text-slate-500">None</td>
                                    <td className="py-4 px-5 font-bold text-emerald-700">Live score &amp; bullet metrics optimization meter</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="py-4 px-5 font-bold text-slate-900">Export Formats</td>
                                    <td className="py-4 px-5 text-slate-500">Often watermarked or paid paywall</td>
                                    <td className="py-4 px-5 font-bold text-emerald-700">100% Free PDF, PNG, and high-res JPG</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="py-4 px-5 font-bold text-slate-900">Active Job Matching</td>
                                    <td className="py-4 px-5 text-slate-500">None</td>
                                    <td className="py-4 px-5 font-bold text-emerald-700">Live hiring openings matched to your goal</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* FAQs Accordion */}
            <div className="py-16 sm:py-20 px-6 sm:px-8 bg-white border-t border-slate-200">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Help &amp; Answers</span>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqSchema.mainEntity.map((item, idx) => (
                            <details
                                key={idx}
                                className="group bg-slate-50 rounded-2xl border border-slate-200 p-5 [&_summary::-webkit-details-marker]:hidden transition-all duration-200"
                            >
                                <summary className="flex items-center justify-between cursor-pointer font-extrabold text-sm text-slate-900">
                                    <span>{item.name}</span>
                                    <span className="ml-4 flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 group-open:bg-slate-900 group-open:text-white flex items-center justify-center text-xs font-bold transition-colors">
                                        +
                                    </span>
                                </summary>
                                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-2 border-t border-slate-200">
                                    {item.acceptedAnswer.text}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>

            {/* Direct Consultation CTA Banner */}
            <div className="py-16 px-6 sm:px-8 bg-slate-900 text-white">
                <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-12 border border-slate-800 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                            <Sparkles className="w-3.5 h-3.5" /> 1-on-1 Profile Review
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white">
                            Need Expert Review of Your Resume &amp; Admissions Profile?
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                            Connect directly with Mohit Jain for targeted campus placement strategy, interview guidance, and top MBA/B-School profile shortlisting.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <a
                            href="/inquiry"
                            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-widest text-center transition-all shadow-lg shadow-amber-400/20"
                        >
                            Book Profile Review
                        </a>
                        <a
                            href="https://wa.me/918851453046?text=Hi%20Mohit%20Sir%2C%20I%20built%20my%20resume%20using%20the%20ATS%20builder%20and%20want%20your%20expert%20feedback"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition-all border border-white/10"
                        >
                            WhatsApp Mohit Sir
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
}
