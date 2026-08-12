import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Download, FileText, School, GraduationCap, CheckCircle2 } from "lucide-react";
import { CtaScrollButton } from "@/components/CtaScrollButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Top Engineering Colleges in Delhi NCR 2026-2027: Ranking, Fees, Placements | CareerWithMohit",
  description: "Discover the top B.Tech engineering colleges in Delhi NCR for 2026-2027. Compare IIT Delhi, DTU, NSUT, IIIT Delhi, and top private GGSIPU colleges like MAIT and MSIT with cutoffs and placements.",
  keywords: [
    "top engineering colleges in delhi",
    "best btech colleges in delhi 2026",
    "DTU Delhi placements",
    "NSUT Delhi cutoffs",
    "IIT Delhi admission 2026",
    "top private engineering colleges in delhi ncr",
    "GGSIPU B.Tech admission",
  ],
  alternates: {
    canonical: 'https://www.careerwithmohit.online/colleges/top-engineering-colleges-in-delhi',
  },
  openGraph: {
    title: "Top Engineering Colleges in Delhi NCR 2026-2027 | CareerWithMohit",
    description: "Compare DTU, NSUT, IIT Delhi, IIIT Delhi, MAIT, and MSIT. Fees, cutoffs, and placements analysis.",
    url: "https://www.careerwithmohit.online/colleges/top-engineering-colleges-in-delhi",
    siteName: "CareerWithMohit",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Top Engineering Colleges in Delhi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Engineering Colleges in Delhi NCR 2026-2027",
    description: "Compare DTU, NSUT, IIT Delhi, IIIT Delhi, MAIT, and MSIT fees, cutoffs, and placements.",
    images: ["/og-image.webp"],
  },
};

export default function EngineeringCollegesDelhiPage() {
    const listSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "IIT Delhi" },
            { "@type": "ListItem", "position": 2, "name": "DTU Delhi" },
            { "@type": "ListItem", "position": 3, "name": "NSUT Delhi" },
            { "@type": "ListItem", "position": 4, "name": "IIIT Delhi" },
            { "@type": "ListItem", "position": 5, "name": "NIT Delhi" },
            { "@type": "ListItem", "position": 6, "name": "IGDTUW Delhi" },
            { "@type": "ListItem", "position": 7, "name": "MAIT Delhi" },
        ]
    };

    return (
        <div className="min-h-screen bg-white font-body">
            <JsonLd data={listSchema} />

            {/* Hero Section */}
            <div className="bg-slate-50 border-b-8 border-foreground py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <Breadcrumbs />
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                                Top Engineering <br />
                                <span className="text-primary italic underline decoration-[12px] underline-offset-4">Colleges in Delhi</span> <br />
                                2026-2027
                            </h1>
                            <p className="text-xl font-bold text-slate-600 border-l-8 border-primary pl-6 mb-10 max-w-xl">
                                Submit the form to receive the **Complete B.Tech Colleges Directory (Fees, Cutoffs & Placements)** and **JAC/GGSIPU Counselling Guide** directly on your WhatsApp and Email.
                            </p>
                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className="flex items-center gap-2 bg-white border-2 border-foreground px-4 py-2 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                    JAC Delhi Cutoffs
                                </div>
                                <div className="flex items-center gap-2 bg-white border-2 border-foreground px-4 py-2 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                    IPU CET Rankings
                                </div>
                                <div className="flex items-center gap-2 bg-white border-2 border-foreground px-4 py-2 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                    Placement Statistics
                                </div>
                            </div>
                            <CtaScrollButton />
                        </div>
                        <div className="bg-white border-4 border-foreground p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                                <Download className="w-6 h-6 text-primary" />
                                Get Free College Guide PDF
                            </h2>
                            <InquiryForm />
                        </div>
                    </div>
                </div>
            </div>

            {/* List & Comparison Matrix */}
            <div className="py-20 px-6 max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-4">
                        Premier Institutions <span className="text-primary italic">at a Glance</span>
                    </h2>
                    <p className="text-lg font-bold text-slate-600">
                        Top government and university engineering institutes located in the National Capital Region.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            name: "IIT Delhi",
                            type: "Institute of National Importance",
                            avgPkg: "₹25.8 LPA",
                            highestPkg: "₹2.0+ Cr",
                            exam: "JEE Advanced",
                            desc: "Ranked #2 in NIRF Engineering, premier center for technology research, startups, and global placements.",
                        },
                        {
                            name: "DTU Delhi (DCE)",
                            type: "State University",
                            avgPkg: "₹15.4 LPA",
                            highestPkg: "₹1.8 Cr",
                            exam: "JEE Main (JAC)",
                            desc: "One of India's oldest engineering colleges with unmatched alumni network and huge tech recruiter footprint.",
                        },
                        {
                            name: "NSUT Delhi (Netaji Subhas)",
                            type: "State University",
                            avgPkg: "₹16.0 LPA",
                            highestPkg: "₹1.0+ Cr",
                            exam: "JEE Main (JAC)",
                            desc: "Top choice for Computer Science, IT, and Electronics with tier-1 MNC recruitments.",
                        },
                        {
                            name: "IIIT Delhi",
                            type: "State University",
                            avgPkg: "₹20.4 LPA",
                            highestPkg: "₹51 LPA",
                            exam: "JEE Main (JAC)",
                            desc: "Specialized in Computer Science, AI, Data Engineering, and Computational Biology research.",
                        },
                        {
                            name: "IGDTUW Delhi",
                            type: "Women's State University",
                            avgPkg: "₹19.1 LPA",
                            highestPkg: "₹59 LPA",
                            exam: "JEE Main (JAC)",
                            desc: "Premier engineering university for women with industry-leading placement rates in top tech firms.",
                        },
                        {
                            name: "MAIT Delhi (Maharaja Agrasen)",
                            type: "GGSIPU Affiliated",
                            avgPkg: "₹8.5 LPA",
                            highestPkg: "₹45 LPA",
                            exam: "JEE Main (IPU)",
                            desc: "Top private engineering institute affiliated with IP University with consistent placement records.",
                        },
                    ].map((c, i) => (
                        <div key={i} className="border-4 border-foreground p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-primary mb-2">
                                    <School className="w-4 h-4" /> {c.type}
                                </div>
                                <h3 className="text-2xl font-black uppercase mb-4">{c.name}</h3>
                                <p className="text-sm font-bold text-slate-600 mb-6">{c.desc}</p>
                                <div className="space-y-2 mb-6 border-t-2 border-slate-100 pt-4 text-xs font-black uppercase">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Average CTC:</span>
                                        <span className="text-emerald-700">{c.avgPkg}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Highest CTC:</span>
                                        <span className="text-primary">{c.highestPkg}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Admission via:</span>
                                        <span>{c.exam}</span>
                                    </div>
                                </div>
                            </div>
                            <Link href="/inquiry" className="block text-center border-2 border-foreground py-2 text-xs font-black uppercase bg-accent text-foreground hover:bg-primary hover:text-white transition-colors">
                                Get Cutoff & Admission Help
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
