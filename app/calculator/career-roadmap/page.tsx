import type { Metadata } from "next";
import { CareerRoadmapCalculator } from "@/components/CareerRoadmapCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
    Sparkles, ShieldCheck, TrendingUp, Award, Building2,
    BookOpen, CheckCircle2, ArrowRight, Zap, Target,
    Users, Briefcase, GraduationCap, Scale, ChevronRight
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Career Roadmap Calculator 2026-2027 | MBA, PGDM, BTech, BBA, Law, Arts | CareerWithMohit",
    description: "Personalized career roadmap generator for MBA, PGDM, BTech, BBA, BCom, BCA, MCA, BA, MA, LLB, and LLM. Unlock essential skills, top certifications, hiring recruiters, and verified 2026-2027 salary packages.",
    keywords: [
        "career roadmap calculator",
        "MBA career roadmap",
        "PGDM career roadmap",
        "BTech CSE career roadmap",
        "BBA career scope and salary",
        "BCA MCA career path",
        "LLB LLM corporate law salary",
        "BA MA career opportunities",
        "highest paying specializations 2026",
        "salary benchmarks 2027",
        "certifications for high salary"
    ],
    alternates: {
        canonical: "https://www.careerwithmohit.online/calculator/career-roadmap",
    },
    openGraph: {
        title: "Career Roadmap Calculator 2026-2027 | 11 Degrees & 45+ Tracks",
        description: "Calculate your career trajectory across MBA, PGDM, BTech, BBA, BCom, BCA, MCA, BA, MA, LLB, and LLM with real salary packages and industry certifications.",
        url: "https://www.careerwithmohit.online/calculator/career-roadmap",
        siteName: "CareerWithMohit",
        type: "website",
        locale: "en_IN",
        images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Career Roadmap Calculator 2026-2027" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Career Roadmap Calculator 2026-2027 | CareerWithMohit",
        description: "Interactive roadmap generator across 11 major undergraduate and postgraduate degrees with salary benchmarks.",
        images: ["/og-image.webp"],
    },
};

export default function CareerRoadmapPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Which degree offers the highest starting salary in 2026-2027?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "MBA and PGDM in Finance (Investment Banking, Private Equity) and B.Tech in Computer Science / AI-ML lead with top starting compensation ranging from ₹18–45 LPA at Tier-1 institutions. In legal careers, Corporate Law Associates from premier National Law Universities (NLUs) secure ₹14–22 LPA."
                }
            },
            {
                "@type": "Question",
                "name": "What is the key difference between MBA and PGDM career roadmaps?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "MBA degrees are university-affiliated and emphasize broad management fundamentals, whereas AICTE-approved PGDM programs run by autonomous institutions (like XLRI, SPJIMR, MDI) follow dynamic industry curricula with frequent trimester updates and higher executive placement traction."
                }
            },
            {
                "@type": "Question",
                "name": "Can BCA and MCA graduates compete with B.Tech graduates for top tech roles?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Top product tech companies (Google, Microsoft, Amazon) and fintech startups prioritize practical coding skills, system design knowledge, and certifications (AWS, CKA) over degree tags. An MCA graduate with strong DSA and full-stack expertise commands ₹12–28 LPA."
                }
            },
            {
                "@type": "Question",
                "name": "What are the career avenues after BA and MA degrees?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Modern BA and MA programs open high-impact corporate and international careers in Public Policy Consulting, Economic Analysis, Strategic Communications, UX Research, and Civil Services, with packages ranging from ₹6–20 LPA."
                }
            },
            {
                "@type": "Question",
                "name": "What career paths are available for LLB and LLM graduates?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Law graduates can pursue Corporate M&A, In-House General Counsel positions, Intellectual Property (IPR), International Trade Law, and litigation, with top corporate law firms (Shardul Amarchand, AZB, Khaitan) offering ₹12–24 LPA for fresh associates."
                }
            },
            {
                "@type": "Question",
                "name": "How does the Career Roadmap Calculator personalize results?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "By selecting your specific degree from the 11 available options (MBA, PGDM, BBA, BTech, BCom, BCA, MCA, BA, MA, LLB, LLM) and picking your domain track, the calculator synthesizes market-tested technical competencies, mandatory industry certifications, target recruiters, and current 2026-2027 CTC compensation."
                }
            }
        ]
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Interactive Career Roadmap & Salary Benchmark Calculator",
        "url": "https://www.careerwithmohit.online/calculator/career-roadmap",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        }
    };

    const breadcrumbsSchema = {
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
                "name": "Calculators",
                "item": "https://www.careerwithmohit.online/calculator"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Career Roadmap Calculator",
                "item": "https://www.careerwithmohit.online/calculator/career-roadmap"
            }
        ]
    };

    const coursePills = [
        { code: "MBA", label: "MBA", color: "border-blue-400/40 text-blue-300 bg-blue-500/10" },
        { code: "PGDM", label: "PGDM", color: "border-emerald-400/40 text-emerald-300 bg-emerald-500/10" },
        { code: "BBA", label: "BBA", color: "border-amber-400/40 text-amber-300 bg-amber-500/10" },
        { code: "BTech", label: "B.Tech", color: "border-purple-400/40 text-purple-300 bg-purple-500/10" },
        { code: "BCom", label: "B.Com", color: "border-indigo-400/40 text-indigo-300 bg-indigo-500/10" },
        { code: "BCA", label: "BCA", color: "border-teal-400/40 text-teal-300 bg-teal-500/10" },
        { code: "MCA", label: "MCA", color: "border-cyan-400/40 text-cyan-300 bg-cyan-500/10" },
        { code: "BA", label: "BA", color: "border-rose-400/40 text-rose-300 bg-rose-500/10" },
        { code: "MA", label: "MA", color: "border-pink-400/40 text-pink-300 bg-pink-500/10" },
        { code: "LLB", label: "LLB", color: "border-amber-400/40 text-amber-300 bg-amber-500/10" },
        { code: "LLM", label: "LLM", color: "border-sky-400/40 text-sky-300 bg-sky-500/10" },
    ];

    const comparisonTableData = [
        { degree: "MBA", track: "Investment Banking & Finance", fresherCTC: "₹16 – 38 LPA", midCTC: "₹45 – 80 LPA", keyCerts: "CFA, Financial Modeling, Bloomberg" },
        { degree: "PGDM", track: "Product Management & Analytics", fresherCTC: "₹15 – 35 LPA", midCTC: "₹40 – 75 LPA", keyCerts: "AIPMM CPM, Google Analytics, SQL" },
        { degree: "B.Tech", track: "AI, Machine Learning & SDE", fresherCTC: "₹12 – 35 LPA", midCTC: "₹35 – 70 LPA", keyCerts: "AWS Certified Architect, TensorFlow, CKA" },
        { degree: "MCA", track: "Cloud Architecture & Full Stack", fresherCTC: "₹9 – 24 LPA", midCTC: "₹28 – 55 LPA", keyCerts: "Azure DevOps, Docker, Microservices" },
        { degree: "LLB", track: "Corporate Mergers & Acquisitions", fresherCTC: "₹11 – 22 LPA", midCTC: "₹30 – 60 LPA", keyCerts: "AIBE Bar License, Corporate Governance" },
        { degree: "BBA", track: "Strategic Consulting & Marketing", fresherCTC: "₹6 – 14 LPA", midCTC: "₹20 – 38 LPA", keyCerts: "Google Ads, HubSpot, Six Sigma Yellow Belt" },
        { degree: "B.Com", track: "Auditing, Taxation & Risk", fresherCTC: "₹5.5 – 12 LPA", midCTC: "₹18 – 35 LPA", keyCerts: "CA Inter, ACCA, Advanced Excel" },
        { degree: "BCA", track: "Cybersecurity & Web Dev", fresherCTC: "₹5 – 12 LPA", midCTC: "₹18 – 35 LPA", keyCerts: "CompTIA Security+, CEH, Full Stack MERN" },
        { degree: "LLM", track: "IPR & International Commercial Law", fresherCTC: "₹12 – 25 LPA", midCTC: "₹35 – 70 LPA", keyCerts: "WIPO IPR Diploma, International Arbitrator" },
        { degree: "MA", track: "Economic Policy & Strategy", fresherCTC: "₹7 – 16 LPA", midCTC: "₹22 – 45 LPA", keyCerts: "Stata, Econometrics, R Programming" },
        { degree: "BA", track: "Corporate PR & Public Policy", fresherCTC: "₹5 – 11 LPA", midCTC: "₹15 – 30 LPA", keyCerts: "Content Strategy, Digital Journalism" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <JsonLd data={faqSchema} />
            <JsonLd data={webAppSchema} />
            <JsonLd data={breadcrumbsSchema} />

            {/* Midnight Navy Premium Hero Section */}
            <div className="relative bg-gradient-to-b from-[#0A192F] via-[#0D2342] to-[#0A192F] text-white pt-10 pb-20 px-6 sm:px-8 border-b border-slate-800 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-slate-300 mb-6">
                        <Breadcrumbs />
                    </div>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-black tracking-wide uppercase mb-6">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 2026–2027 EdTech Career Accelerator • 11 Degrees Supported
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6">
                            Interactive Career Roadmap &amp; <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                                Salary Benchmark Calculator
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8 max-w-3xl">
                            Select your degree—<strong>MBA, PGDM, BTech, BBA, BCom, BCA, MCA, BA, MA, LLB, or LLM</strong>—to calculate verified 
                            industry skills, top professional certifications, recruiter lists, and realistic starting to mid-career CTC ranges.
                        </p>

                        {/* Stream Badges / Quick Jump Pills */}
                        <div className="flex flex-wrap items-center gap-2 mb-10">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
                                Available Programs:
                            </span>
                            {coursePills.map((course) => (
                                <a
                                    key={course.code}
                                    href="#calculator-widget"
                                    className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all hover:scale-105 ${course.color}`}
                                >
                                    {course.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 4 Metric Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-800">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">11 Degrees</div>
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">UG, PG &amp; Professional Law</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">45+ Tracks</div>
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Tech, Finance, Consulting, Legal</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">₹4.5L – ₹45L+</div>
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Verified 2026–2027 CTC Benchmarks</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-1">100% Free</div>
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Instant Actionable Curriculum</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Calculator Container */}
            <div className="py-12 sm:py-16 px-4 sm:px-6 relative -mt-8 z-20">
                <CareerRoadmapCalculator />
            </div>

            {/* Strategic Career Acceleration Section */}
            <div className="py-16 sm:py-20 px-6 sm:px-8 bg-white border-y border-slate-200">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
                            <Target className="w-3.5 h-3.5 text-amber-600" /> Strategic Placement Framework
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            How Top Students Land 3x Higher Packages
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base mt-2">
                            High campus placements are not accidental. They are engineered through a proven 4-stage acceleration methodology.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black mb-4">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-extrabold text-slate-900 mb-2">1. Early Skill Architecture</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Don&apos;t wait for final placement season. Master core technical competencies (Financial modeling, Full-stack DSA, Legal research) in your very first year.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black mb-4">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-extrabold text-slate-900 mb-2">2. High-ROI Certifications</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Avoid generic online course completion badges. Target recruiter-validated credentials like CFA, AWS Architect, Six Sigma, and Bar Council licenses.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mb-4">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-extrabold text-slate-900 mb-2">3. Corporate Recruiting Target</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Align resume projects directly with the problems faced by McKinsey, Goldman Sachs, Google, Shardul Amarchand, or Unilever.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-400 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black mb-4">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-extrabold text-slate-900 mb-2">4. Admission &amp; ROI Selection</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Choose colleges not just by marketing brochures, but by verified median placement reports, industry alumni networks, and location advantages.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* High Growth 2026-2027 Placement Benchmark Table */}
            <div className="py-16 sm:py-20 px-6 sm:px-8 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
                                <TrendingUp className="w-4 h-4" /> 2026–2027 Compensation Snapshot
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                Degree-Wise Salary Benchmarks &amp; High-ROI Specializations
                            </h2>
                        </div>
                        <Link
                            href="/inquiry"
                            className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 bg-white border border-slate-300 px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-all self-start md:self-auto"
                        >
                            Get Profile Evaluation <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <table className="w-full text-left text-xs text-slate-700">
                            <thead className="bg-slate-900 text-white uppercase text-[11px] font-black tracking-wider">
                                <tr>
                                    <th className="py-4 px-5">Degree</th>
                                    <th className="py-4 px-5">Top Specialized Domain</th>
                                    <th className="py-4 px-5">Fresher CTC (Tier-1/2)</th>
                                    <th className="py-4 px-5">Mid-Career CTC (4-7 Yrs)</th>
                                    <th className="py-4 px-5 hidden md:table-cell">Key High-Value Credentials</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                                {comparisonTableData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-4 px-5 font-black text-slate-900 whitespace-nowrap">
                                            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 mr-2">
                                                {row.degree}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 font-bold text-slate-800">
                                            {row.track}
                                        </td>
                                        <td className="py-4 px-5 font-black text-emerald-700 whitespace-nowrap">
                                            {row.fresherCTC}
                                        </td>
                                        <td className="py-4 px-5 font-bold text-slate-900 whitespace-nowrap">
                                            {row.midCTC}
                                        </td>
                                        <td className="py-4 px-5 text-slate-500 hidden md:table-cell">
                                            {row.keyCerts}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Comprehensive FAQs Section */}
            <div className="py-16 sm:py-20 px-6 sm:px-8 bg-white border-t border-slate-200">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Clear Answers</span>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                            Frequently Asked Questions on Career Paths &amp; Degrees
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
                            <Sparkles className="w-3.5 h-3.5" /> Direct Mentorship
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white">
                            Need Personalized Career &amp; College Guidance?
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                            Talk to Mohit Jain for unbiased college comparisons, percentile cutoffs, GD/PI preparation, and direct corporate placement trends.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <a
                            href="/inquiry"
                            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-widest text-center transition-all shadow-lg shadow-amber-400/20"
                        >
                            Book Free Session
                        </a>
                        <a
                            href="https://wa.me/918851453046"
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
