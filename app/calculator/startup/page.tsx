import type { Metadata } from "next";
import StartupCalculator from "@/components/StartupCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ShieldCheck, Zap, BarChart3, HelpCircle, Rocket, Target, Flame, Lightbulb, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Startup Valuation & Pitch Calculator | Shark Tank Style ROI Predictor",
    description: "Free Startup Calculator for founders. Calculate your valuation, equity dilution, burn rate, and runway in seconds. Get 'Shark-ready' numbers for your next pitch or funding round.",
    keywords: [
        "startup calculator",
        "startup valuation calculator india",
        "equity dilution calculator",
        "burn rate calculator",
        "startup runway calculator",
        "shark tank india calculator",
        "how to calculate startup valuation",
        "founder equity calculator",
        "pre-money valuation calculator",
        "post-money valuation calculator",
        "startup pitch deck numbers",
        "venture capital calculator",
        "angel investment calculator",
        "saas valuation multiplier",
        "e-commerce startup valuation",
    ],
    openGraph: {
        title: "Startup Valuation & Pitch Calculator | Shark Tank Style",
        description: "Calculate your startup's worth, runway, and equity dilution. Perfect for founders prepping for Shark Tank or VC pitches.",
        type: "website",
    },
};

export default function StartupCalculatorPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How is startup valuation calculated?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Startup valuation is typically calculated using multipliers on Annual Recurring Revenue (ARR) or EBITDA. For early-stage startups, it depends on the niche (e.g., SaaS usually gets 6x-10x ARR) and the strength of the founding team."
                }
            },
            {
                "@type": "Question",
                "name": "What is a healthy runway for a startup?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A healthy runway is typically 18 to 24 months. This gives the founders enough time to hit key milestones and raise the next round of funding without the immediate stress of running out of cash."
                }
            },
            {
                "@type": "Question",
                "name": "How much equity should founders give in a seed round?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ideally, founders should aim to dilute between 10% to 20% in a seed round. Diluting more than 25% early on can lead to losing control of the company in future rounds."
                }
            },
            {
                "@type": "Question",
                "name": "What is the difference between pre-money and post-money valuation?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Pre-money valuation is the value of the company before it receives any new investment. Post-money valuation is the pre-money valuation plus the amount of new investment received."
                }
            }
        ]
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Startup Valuation & Pitch Calculator",
        "description": "Professional tool for startup founders to calculate valuation, runway, and equity dilution.",
        "applicationCategory": "BusinessApplication",
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
                            Master Your <br />
                            <span className="text-yellow-500 underline decoration-[12px] underline-offset-8 text-black">Startup</span> Pitch.
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-yellow-500 pl-8">
                            Don't walk into the Shark Tank unprepared. Calculate your valuation, runway, and equity dilution like a pro.
                            Get the numbers that investors actually care about.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Calculator Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <StartupCalculator />

                {/* Startup Fundamentals Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <Target className="w-10 h-10 text-yellow-500" />
                        Understanding Startup Metrics
                    </h2>
                    <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        <p className="font-bold text-slate-700 leading-relaxed text-lg">
                            Whether you are building a <strong>SaaS platform</strong>, a <strong>D2C brand</strong>, or a <strong>Fintech app</strong>, investors look for three core things: Unit Economics, Scalability, and Founder Control.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black uppercase flex items-center gap-2">
                                    <Flame className="w-6 h-6 text-rose-500" /> Burn Rate
                                </h3>
                                <p className="font-medium text-slate-600">
                                    The amount of money your startup is losing every month. Gross burn is total expenses, while Net burn is Expenses minus Revenue.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black uppercase flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-yellow-500" /> Runway
                                    </h3>
                                <p className="font-medium text-slate-600">
                                    The number of months you can survive before running out of cash. Most VCs want to see at least 18 months of runway after a funding round.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black uppercase flex items-center gap-2">
                                    <TrendingUp className="w-6 h-6 text-emerald-500" /> Valuation
                                </h3>
                                <p className="font-medium text-slate-600">
                                    Often calculated as a multiple of your revenue. High-growth tech companies can command 10x multiplier, while service businesses are usually 2x-3x.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black uppercase flex items-center gap-2">
                                    <Users className="w-6 h-6 text-blue-500" /> Dilution
                                </h3>
                                <p className="font-medium text-slate-600">
                                    The percentage of the company you give to investors. Be careful not to dilute too much in early rounds to maintain decision-making power.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pitch Tips Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <Lightbulb className="w-10 h-10 text-yellow-500" />
                        Shark Tank Pitch Checklist
                    </h2>
                    <div className="bg-black text-white border-4 border-foreground p-8 md:p-10 space-y-8 shadow-[12px_12px_0px_0px_rgba(234,179,8,1)]">
                        <div className="flex items-start gap-4">
                            <div className="bg-yellow-500 text-black w-10 h-10 flex items-center justify-center font-black shrink-0">01</div>
                            <div>
                                <h4 className="text-xl font-black uppercase mb-1">Know Your Numbers</h4>
                                <p className="text-gray-400 font-medium">Sharks hate it when you fumble on revenue, margins, or cost of customer acquisition (CAC).</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-yellow-500 text-black w-10 h-10 flex items-center justify-center font-black shrink-0">02</div>
                            <div>
                                <h4 className="text-xl font-black uppercase mb-1">Be Realistic on Valuation</h4>
                                <p className="text-gray-400 font-medium">Don't ask for a ₹100 Cr valuation if you only have ₹10 Lakh in annual revenue. Use our calculator to find a fair price.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-yellow-500 text-black w-10 h-10 flex items-center justify-center font-black shrink-0">03</div>
                            <div>
                                <h4 className="text-xl font-black uppercase mb-1">Clearly State Use of Funds</h4>
                                <p className="text-gray-400 font-medium">Are you spending on tech, hiring, or marketing? Investors want to know how their money fuels growth.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="bg-yellow-500 text-black w-10 h-10 flex items-center justify-center font-black shrink-0">04</div>
                            <div>
                                <h4 className="text-xl font-black uppercase mb-1">The 'Ex-Out' Strategy</h4>
                                <p className="text-gray-400 font-medium">Know when to walk away. Giving up 40% of your company for a small check is rarely a good deal for the long term.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
                        <HelpCircle className="w-10 h-10 text-yellow-500" />
                        Startup Calculator FAQ
                    </h2>
                    <div className="space-y-8">
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">How does the calculator estimate valuation?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                Our calculator uses industry-standard <strong>multiplier models</strong>. For example, SaaS startups are valued on a multiple of their ARR (Annual Recurring Revenue), while D2C brands might be valued on their EBITDA (Profitability).
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">What is equity dilution?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                Dilution happens when a company issues new shares to investors. Your <strong>ownership percentage decreases</strong>, but the total value of your stake usually increases as the company grows.
                            </p>
                        </div>
                        <div className="bg-white border-4 border-foreground p-8">
                            <h3 className="text-xl font-black uppercase mb-4">Can I use this for my pitch deck?</h3>
                            <p className="font-bold text-slate-600 leading-relaxed">
                                Absolutely! These numbers are based on logical financial models used by angel investors and VCs. However, always consult with a financial advisor before signing any term sheets.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Blog Links */}
                <div className="mt-32 max-w-4xl">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-yellow-500 pl-6 text-black">
                        Startup Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/blog/how-to-start-freelancing-2026-beginners-india" className="bg-white border-4 border-foreground p-6 hover:bg-yellow-50 transition-colors group block">
                            <span className="font-black text-lg group-hover:text-yellow-600 transition-colors">Starting Freelancing vs Startup →</span>
                        </Link>
                        <Link href="/tools/mba-roi-calculator" className="bg-white border-4 border-foreground p-6 hover:bg-yellow-50 transition-colors group block">
                            <span className="font-black text-lg group-hover:text-yellow-600 transition-colors">MBA ROI vs Starting Up →</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
