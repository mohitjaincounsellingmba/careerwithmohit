import type { Metadata } from "next";
import { getAllColleges } from "@/lib/colleges";
import { CollegeComparison } from "@/components/CollegeComparison";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Scale, Building2, TrendingUp, HelpCircle, ArrowRightLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "MBA College Comparison Calculator | Compare Fees, Placement & Cutoffs",
    description: "Compare top MBA/PGDM colleges in India side-by-side. Check fees, average placements, highest packages, NMAT/CAT cutoffs, courses, and infrastructure instantly.",
    keywords: [
        "compare MBA colleges",
        "MBA college comparison calculator",
        "compare PGDM colleges",
        "MBA fees vs placement",
        "Indian B-school comparison",
        "compare IIMs",
        "NMIMS vs Symbiosis",
        "best MBA college tool"
    ],
    openGraph: {
        title: "MBA College Comparison Calculator",
        description: "Compare top MBA/PGDM colleges in India side-by-side. Compare fees, placements, and cutoffs instantly.",
        type: "website",
    },
};

export default function CollegeComparisonPage() {
    const colleges = getAllColleges();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How to compare MBA colleges?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The best way to compare MBA colleges is to evaluate them based on total fees (ROI), average placement packages, entrance exam cutoffs, location, and specialization options. Use our free College Comparison Calculator to see these metrics side-by-side."
                }
            },
            {
                "@type": "Question",
                "name": "Which parameters are most important when comparing B-schools?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The critical parameters are average placement (determines ROI), total tuition and hostel fees, alumni network, location (metros offer better internships), and faculty profile."
                }
            },
            {
                "@type": "Question",
                "name": "Is a private PGDM better than a university MBA?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Top private PGDM institutes (like SPJIMR, XLRI, MDI) often have more updated, industry-relevant curriculum and stronger placements than many university MBA programs. However, a university MBA is preferred if you plan to pursue a Ph.D. abroad or apply for certain government jobs."
                }
            }
        ]
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "MBA College Comparison Calculator",
        "description": "Free online tool to compare MBA and PGDM colleges in India side-by-side across fees, placements, and entrance cutoffs.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <JsonLd data={faqSchema} />
            <JsonLd data={webAppSchema} />

            {/* Header / Hero Section */}
            <div className="bg-white border-b border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -mr-40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] -ml-40 pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
                    <Breadcrumbs />
                    <div className="mt-12 mb-20 max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-widest mb-6">
                            <ArrowRightLeft className="w-4 h-4" /> Compare Colleges
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-6 italic">
                            Head-to-Head <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 pr-2">College Battle.</span>
                        </h1>
                        <p className="text-lg md:text-xl font-medium text-slate-500 max-w-2xl leading-relaxed">
                            Stop guessing. Put two institutions side-by-side and compare the real numbers: fees, placements, cutoffs, and rankings. Discover which college gives you the highest ROI.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Interactive Comparison Tool */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-20 -mt-10">
                <CollegeComparison colleges={colleges} />

                {/* Features Section */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-black text-slate-900 mb-3">Calculate Real ROI</h4>
                        <p className="font-medium text-slate-500 text-sm leading-relaxed">Compare the total fees against the average and highest placement packages to instantly see which college offers a better return on your investment.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Scale className="w-6 h-6 text-purple-600" />
                        </div>
                        <h4 className="text-lg font-black text-slate-900 mb-3">Verify Cutoffs</h4>
                        <p className="font-medium text-slate-500 text-sm leading-relaxed">View side-by-side CAT, XAT, NMAT, and CMAT entrance exam acceptance criteria to identify where your current percentile fits best.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Building2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h4 className="text-lg font-black text-slate-900 mb-3">Data-Driven Choices</h4>
                        <p className="font-medium text-slate-500 text-sm leading-relaxed">Access verified data on established years, ownership types, and official rankings to make a fully informed career decision without the marketing noise.</p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-32 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Frequently Asked Questions</h2>
                        <p className="text-slate-500 font-medium mt-4">Everything you need to know about comparing business schools.</p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
                            <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-3">
                                <HelpCircle className="w-5 h-5 text-blue-500" />
                                How to compare MBA colleges?
                            </h3>
                            <p className="font-medium text-slate-500 leading-relaxed text-sm">
                                The best way to compare MBA colleges is to evaluate them based on <strong>Total Fees</strong> vs <strong>Average Placement</strong> (ROI). You should also consider entrance exam cutoffs, location across metro cities, and specific specialization options.
                            </p>
                        </div>
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
                            <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-3">
                                <HelpCircle className="w-5 h-5 text-purple-500" />
                                Which parameters are most important?
                            </h3>
                            <p className="font-medium text-slate-500 leading-relaxed text-sm">
                                Beyond just placements, consider the <strong>Alumni Network</strong> (older colleges like FMS or XLRI have massive networks), <strong>Location</strong> (Mumbai/Delhi NCR/Bangalore offer better live internship opportunities), and <strong>Faculty Profile</strong>.
                            </p>
                        </div>
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
                            <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-3">
                                <HelpCircle className="w-5 h-5 text-emerald-500" />
                                Is a private PGDM better than a university MBA?
                            </h3>
                            <p className="font-medium text-slate-500 leading-relaxed text-sm">
                                Top private PGDM institutes (SPJIMR, MDI, NMIMS) often have more updated, industry-relevant curriculums that dynamically change with market needs. However, a university MBA (like FMS Delhi or PUMBA) often comes with significantly lower fees, providing immense ROI.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Resources */}
                <div className="mt-32 border-t border-slate-200 pt-20">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">
                        Explore Top Colleges
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href="/colleges" className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group flex flex-col justify-between h-32">
                            <span className="font-black text-sm text-slate-700 group-hover:text-blue-600 transition-colors">Directory of Top B-Schools</span>
                            <ArrowRightLeft className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
                        </Link>
                        <Link href="/blog/best-mba-colleges-in-mumbai-2026" className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group flex flex-col justify-between h-32">
                            <span className="font-black text-sm text-slate-700 group-hover:text-blue-600 transition-colors">Top MBA Colleges in Mumbai</span>
                            <ArrowRightLeft className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
                        </Link>
                        <Link href="/blog/best-mba-colleges-in-delhi-2026" className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group flex flex-col justify-between h-32">
                            <span className="font-black text-sm text-slate-700 group-hover:text-blue-600 transition-colors">Top MBA Colleges in Delhi NCR</span>
                            <ArrowRightLeft className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
                        </Link>
                        <Link href="/blog/mba-vs-pgdm-difference" className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group flex flex-col justify-between h-32">
                            <span className="font-black text-sm text-slate-700 group-hover:text-blue-600 transition-colors">MBA vs PGDM: What's the Difference?</span>
                            <ArrowRightLeft className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
