import type { Metadata } from "next";
import { CareerRoadmapCalculator } from "@/components/CareerRoadmapCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Map, Sparkles, Users, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Career Roadmap Calculator 2026-2027 | MBA & BTech Specializations | CareerWithMohit",
  description: "Get your personalized career roadmap for MBA or BTech specializations. Find required skills, top certifications, leading companies, and salary packages for Finance, CS, HR, Marketing, and more.",
  keywords: ["career roadmap MBA", "BTech career roadmap", "MBA specialization guide", "career after MBA finance", "career after BTech CSE", "skills for finance MBA", "certifications for MBA", "top companies MBA placements"],
  alternates: {
    canonical: 'https://www.careerwithmohit.online/calculator/career-roadmap',
  },
  openGraph: {
    title: "Career Roadmap Calculator | CareerWithMohit",
    description: "Personalized career roadmap generator for MBA and B.Tech specializations: required skills, top recruiters, and salary benchmarks.",
    url: "https://www.careerwithmohit.online/calculator/career-roadmap",
    siteName: "CareerWithMohit",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Career Roadmap Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Roadmap Calculator | CareerWithMohit",
    description: "Personalized career roadmap generator for MBA and B.Tech specializations.",
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

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Career Roadmap & Salary Calculator",
        "url": "https://www.careerwithmohit.online/calculator/career-roadmap",
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
            <JsonLd data={softwareSchema} />

            {/* Hero */}
            <div className="bg-white border-b-8 border-foreground py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <Breadcrumbs />
                    <div className="mt-8 max-w-4xl">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Build Your <br />
                            <span className="text-primary underline decoration-[12px] underline-offset-8">Career</span> Roadmap.
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-gray-700 leading-relaxed mb-6">
                            Choose your degree and specialization — instantly get the essential skills, must-have certifications, top hiring companies, and real salary expectations.
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm font-black uppercase">
                            <span className="bg-emerald-100 text-emerald-800 border-2 border-foreground px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                MBA Specializations
                            </span>
                            <span className="bg-blue-100 text-blue-800 border-2 border-foreground px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                B.Tech Branches
                            </span>
                            <span className="bg-purple-100 text-purple-800 border-2 border-foreground px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                Salary Benchmarks 2026-2027
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Section */}
            <div className="py-16 px-6">
                <CareerRoadmapCalculator />
            </div>

            {/* Educational Info Section */}
            <div className="bg-white border-t-8 border-foreground py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-12 text-center">
                        Why You Need a Structured Career Roadmap
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="border-4 border-foreground p-8 bg-amber-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <Sparkles className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-2xl font-black uppercase mb-3">Skill Clarity</h3>
                            <p className="font-bold text-gray-700 leading-relaxed">
                                Don&apos;t wait for placements to figure out what employers want. Start building key industry skills from semester 1.
                            </p>
                        </div>
                        <div className="border-4 border-foreground p-8 bg-blue-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <BookOpen className="w-10 h-10 text-secondary mb-4" />
                            <h3 className="text-2xl font-black uppercase mb-3">Right Certifications</h3>
                            <p className="font-bold text-gray-700 leading-relaxed">
                                Know exactly which certifications (CFA, AWS, Google Ads, Six Sigma) carry weight in your chosen field before spending money.
                            </p>
                        </div>
                        <div className="border-4 border-foreground p-8 bg-emerald-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <Users className="w-10 h-10 text-emerald-600 mb-4" />
                            <h3 className="text-2xl font-black uppercase mb-3">Company Targeting</h3>
                            <p className="font-bold text-gray-700 leading-relaxed">
                                Target the right tier-1 and tier-2 companies aligned with your specialization, with realistic CTC benchmarks.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
