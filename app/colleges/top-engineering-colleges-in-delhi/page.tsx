import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Download, FileText, School, GraduationCap, CheckCircle2 } from "lucide-react";
import { CtaScrollButton } from "@/components/CtaScrollButton";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Top Engineering Colleges in Delhi 2026: Ranking, Fees, Placements",
    description: "Discover the top B.Tech engineering colleges in Delhi NCR for 2026. Compare IIT Delhi, DTU, NSUT, IIIT Delhi, and top private GGSIPU colleges like MAIT and MSIT.",
    keywords: [
        "top engineering colleges in delhi",
        "best btech colleges in delhi 2026",
        "DTU Delhi placements",
        "NSUT Delhi cutoffs",
        "IIT Delhi admission 2026",
        "top private engineering colleges in delhi ncr",
        "GGSIPU B.Tech admission",
    ],
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
                                2026
                            </h1>
                            <p className="text-xl font-bold text-slate-600 border-l-8 border-primary pl-6 mb-10 max-w-xl">
                                Submit the form to receive the **Complete B.Tech Colleges Directory (Fees, Cutoffs & Placements)** and **JAC/GGSIPU Counselling Guide** directly on your WhatsApp and Email.
                            </p>
                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className="flex items-center gap-2 bg-white border-2 border-foreground px-4 py-2 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> IITs & NITs
                                </div>
                                <div className="flex items-center gap-2 bg-white border-2 border-foreground px-4 py-2 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> JAC Delhi Cutoffs
                                </div>
                                <div className="flex items-center gap-2 bg-white border-2 border-foreground px-4 py-2 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Top IPU Colleges
                                </div>
                            </div>
                            
                            <div className="bg-accent/20 border-l-4 border-accent p-4 font-bold text-slate-700">
                                Looking for detailed analysis? Read our latest blog post on <Link href="/blog/top-engineering-colleges-in-delhi-2026" className="text-primary underline">Top Engineering Colleges in Delhi 2026</Link>.
                            </div>
                        </div>

                        {/* HIGH CONVERTING FORM */}
                        <div className="bg-white border-8 border-foreground shadow-[24px_24px_0px_0px_rgba(37,99,235,1)] p-8 md:p-10 relative">
                            <div className="absolute -top-6 -right-6 bg-yellow-400 border-4 border-foreground p-3 font-black uppercase text-xs rotate-12 animate-bounce">
                                FREE PDF
                            </div>
                            <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3 italic">
                                <Download className="w-6 h-6 text-primary" />
                                Get Cutoffs & Fees PDF
                            </h2>
                            <InquiryForm />
                        </div>
                    </div>
                </div>
            </div>

            {/* Informational Sections */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <div className="space-y-6">
                        <School className="w-12 h-12 text-primary" />
                        <h3 className="text-2xl font-black uppercase tracking-tight">JAC Delhi Institutes</h3>
                        <p className="font-bold text-slate-600 leading-relaxed">
                            Complete details on DTU, NSUT, IIIT Delhi, and IGDTUW. Understand the 85% Delhi Home State Quota advantage and expected JEE Main cutoffs for top branches like CSE, IT, and ECE.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <FileText className="w-12 h-12 text-secondary" />
                        <h3 className="text-2xl font-black uppercase tracking-tight">GGSIPU Top Colleges</h3>
                        <p className="font-bold text-slate-600 leading-relaxed">
                            Compare top private engineering colleges affiliated with IP University including MAIT, MSIT, BVCOE, and BPIT. Get ROI analysis and management quota details.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <GraduationCap className="w-12 h-12 text-emerald-500" />
                        <h3 className="text-2xl font-black uppercase tracking-tight">Counselling Support</h3>
                        <p className="font-bold text-slate-600 leading-relaxed">
                            Expert guidance for JoSAA, CSAB, JAC Delhi, and IPU counselling 2026. Learn how to optimize your choice-filling preferences to secure the best college for your rank.
                        </p>
                    </div>
                </div>

                <div className="mt-32">
                    <h2 className="text-4xl font-black uppercase mb-12 border-b-8 border-foreground inline-block">Top Colleges Overview (2026)</h2>
                    <div className="overflow-x-auto border-[6px] border-foreground">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                                <tr>
                                    <th className="p-6 border-r border-white/20">College Name</th>
                                    <th className="p-6 border-r border-white/20">Admission Via</th>
                                    <th className="p-6">Avg Package</th>
                                </tr>
                            </thead>
                            <tbody className="text-lg font-bold">
                                <tr className="border-b-4 border-foreground hover:bg-slate-50 transition-colors">
                                    <td className="p-6 border-r-4 border-foreground"><Link href="/colleges/iit-delhi" className="text-primary hover:underline">IIT Delhi</Link></td>
                                    <td className="p-6 border-r-4 border-foreground">JEE Advanced (JoSAA)</td>
                                    <td className="p-6 text-primary">₹20.5 LPA</td>
                                </tr>
                                <tr className="border-b-4 border-foreground hover:bg-slate-50 transition-colors">
                                    <td className="p-6 border-r-4 border-foreground"><Link href="/colleges/dtu-delhi" className="text-primary hover:underline">DTU Delhi</Link></td>
                                    <td className="p-6 border-r-4 border-foreground">JEE Main (JAC Delhi)</td>
                                    <td className="p-6 text-primary">₹18.0 LPA</td>
                                </tr>
                                <tr className="border-b-4 border-foreground hover:bg-slate-50 transition-colors">
                                    <td className="p-6 border-r-4 border-foreground"><Link href="/colleges/nsut-delhi" className="text-primary hover:underline">NSUT Delhi</Link></td>
                                    <td className="p-6 border-r-4 border-foreground">JEE Main (JAC Delhi)</td>
                                    <td className="p-6 text-primary">₹17.5 LPA</td>
                                </tr>
                                <tr className="border-b-4 border-foreground hover:bg-slate-50 transition-colors">
                                    <td className="p-6 border-r-4 border-foreground"><Link href="/colleges/iiit-delhi" className="text-primary hover:underline">IIIT Delhi</Link></td>
                                    <td className="p-6 border-r-4 border-foreground">JEE Main (JAC Delhi)</td>
                                    <td className="p-6 text-primary">₹20.0 LPA</td>
                                </tr>
                                <tr className="border-b-4 border-foreground hover:bg-slate-50 transition-colors">
                                    <td className="p-6 border-r-4 border-foreground"><Link href="/colleges/nit-delhi" className="text-primary hover:underline">NIT Delhi</Link></td>
                                    <td className="p-6 border-r-4 border-foreground">JEE Main (JoSAA/CSAB)</td>
                                    <td className="p-6 text-primary">₹15.5 LPA</td>
                                </tr>
                                <tr className="border-b-4 border-foreground hover:bg-slate-50 transition-colors">
                                    <td className="p-6 border-r-4 border-foreground"><Link href="/colleges/mait-delhi" className="text-primary hover:underline">MAIT Delhi</Link></td>
                                    <td className="p-6 border-r-4 border-foreground">JEE Main (GGSIPU)</td>
                                    <td className="p-6 text-primary">₹8.5 LPA</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="p-6 border-r-4 border-foreground"><Link href="/colleges/msit-delhi" className="text-primary hover:underline">MSIT Delhi</Link></td>
                                    <td className="p-6 border-r-4 border-foreground">JEE Main (GGSIPU)</td>
                                    <td className="p-6 text-primary">₹8.0 LPA</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-32 bg-foreground text-white p-12 md:p-16 border-l-[24px] border-primary">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
                        Confused about your <br />
                        B.Tech Admission?
                    </h2>
                    <p className="text-xl font-bold text-slate-400 mb-10 max-w-2xl leading-relaxed">
                        Don't risk your career with incorrect choice filling. Let our admission experts review your JEE Main percentile and suggest the best ROI engineering colleges in Delhi NCR under JAC or GGSIPU counselling.
                    </p>
                    <CtaScrollButton />
                </div>
            </div>
        </div>
    );
}
