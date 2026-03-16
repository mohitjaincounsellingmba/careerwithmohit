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
        <div className="min-h-screen bg-slate-50 font-body">
            <JsonLd data={faqSchema} />
            <JsonLd data={webAppSchema} />

            {/* Header / Hero Section */}
            <div className="bg-white border-b-8 border-foreground py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <Breadcrumbs />
                    <div className="mt-8 max-w-4xl">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Head-to-Head <br />
                            <span className="text-primary underline decoration-[12px] underline-offset-8">College Battle.</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-accent pl-8">
                            Stop guessing. Put two business schools side-by-side and compare the real numbers: fees, placements, cutoffs, and rankings. Discover which college gives you the best ROI.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Interactive Comparison Tool */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <CollegeComparison colleges={colleges} />

                {/* Features Section */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-300">
                        <TrendingUp className="w-12 h-12 text-secondary mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4">Calculate Real ROI</h4>
                        <p className="font-bold text-slate-600">Compare the total fees against the average and highest placement packages to instantly see which college offers a better return on your investment.</p>
                    </div>
                    <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-300">
                        <Scale className="w-12 h-12 text-primary mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4">Verify Cutoffs</h4>
                        <p className="font-bold text-slate-600">View side-by-side CAT, XAT, NMAT, and CMAT entrance exam acceptance and identify where your current percentile fits best.</p>
                    </div>
                    <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-300">
                        <Building2 className="w-12 h-12 text-accent mb-6" />
                        <h4 className="text-xl font-black uppercase mb-4">Data-Driven Choices</h4>
                        <p className="font-bold text-slate-600">Access verified data on established years, ownership types, and official rankings to make a fully informed career decision.</p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <HelpCircle className="w-10 h-10 text-primary" />
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-8">
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">How to compare MBA colleges?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                The best way to compare MBA colleges is to evaluate them based on <strong>Total Fees</strong> vs <strong>Average Placement</strong> (ROI). You should also consider entrance exam cutoffs, location across metro cities, and specific specialization options.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">Which parameters are most important?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                Beyond just placements, consider the <strong>Alumni Network</strong> (older colleges like FMS or XLRI have massive networks), <strong>Location</strong> (Mumbai/Delhi NCR/Bangalore offer better live internship opportunities), and <strong>Faculty Profile</strong>.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">Is a private PGDM better than a university MBA?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                Top private PGDM institutes (SPJIMR, MDI, NMIMS) often have more updated, industry-relevant curriculums that dynamically change with market needs. However, a university MBA (like FMS Delhi or PUMBA) often comes with significantly lower fees, providing immense ROI.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Resources */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-primary pl-6">
                        Explore Top Colleges
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/colleges" className="bg-white border-4 border-foreground p-6 hover:bg-primary/5 transition-colors group block">
                            <span className="font-black text-lg group-hover:text-primary transition-colors">Directory of Top B-Schools →</span>
                        </Link>
                        <Link href="/blog/best-mba-colleges-in-mumbai-2026" className="bg-white border-4 border-foreground p-6 hover:bg-primary/5 transition-colors group block">
                            <span className="font-black text-lg group-hover:text-primary transition-colors">Top MBA Colleges in Mumbai →</span>
                        </Link>
                        <Link href="/blog/best-mba-colleges-in-delhi-2026" className="bg-white border-4 border-foreground p-6 hover:bg-primary/5 transition-colors group block">
                            <span className="font-black text-lg group-hover:text-primary transition-colors">Top MBA Colleges in Delhi NCR →</span>
                        </Link>
                        <Link href="/blog/mba-vs-pgdm-difference" className="bg-white border-4 border-foreground p-6 hover:bg-primary/5 transition-colors group block">
                            <span className="font-black text-lg group-hover:text-primary transition-colors">MBA vs PGDM: What's the Difference? →</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
