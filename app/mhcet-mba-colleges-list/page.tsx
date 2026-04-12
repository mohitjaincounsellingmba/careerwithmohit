import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Download, FileText, School, GraduationCap, CheckCircle2 } from "lucide-react";
import { CtaScrollButton } from "@/components/CtaScrollButton";

export const metadata: Metadata = {
    title: "MHCET MBA 2026 Colleges List & Answer Key PDF | Direct Admission",
    description: "Download the complete MHCET MBA 2026 colleges list with cutoffs, fees, and placements. Get the official answer key PDF and expert counseling for JBIMS, SIMSREE, and top maharashtra MBA institutes.",
    keywords: [
        "MHCET MBA colleges list 2026",
        "MHCET MBA answer key PDF",
        "MAH MBA CET 2026 cutoffs",
        "top MBA colleges in Maharashtra",
        "JBIMS Mumbai admission 2026",
        "SIMSREE Pune cutoffs",
        "MHCET MBA counseling support",
    ],
};

export default function MhcetCollegesPage() {
    const listSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "JBIMS Mumbai" },
            { "@type": "ListItem", "position": 2, "name": "SIMSREE Mumbai" },
            { "@type": "ListItem", "position": 3, "name": "PUMBA Pune" },
            { "@type": "ListItem", "position": 4, "name": "Welingkar Mumbai" },
            { "@type": "ListItem", "position": 5, "name": "SIES Navi Mumbai" }
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
                                Get Your <br />
                                <span className="text-primary italic underline decoration-[12px] underline-offset-4">MHCET MBA</span> <br />
                                PDF Pack.
                            </h1>
                            <p className="text-xl font-bold text-slate-600 border-l-8 border-primary pl-6 mb-10 max-w-xl">
                                Submit the form to receive the **MHCET MBA 2026 Top Colleges List (Fees & Placements)** and the **Official Answer Key PDF** directly on your WhatsApp and Email.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-white border-2 border-foreground px-4 py-2 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> 300+ Colleges
                                </div>
                                <div className="flex items-center gap-2 bg-white border-2 border-foreground px-4 py-2 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> 2026 Cutoffs
                                </div>
                                <div className="flex items-center gap-2 bg-white border-2 border-foreground px-4 py-2 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> ROI Analysis
                                </div>
                            </div>
                        </div>

                        {/* HIGH CONVERTING FORM */}
                        <div className="bg-white border-8 border-foreground shadow-[24px_24px_0px_0px_rgba(37,99,235,1)] p-8 md:p-10 relative">
                            <div className="absolute -top-6 -right-6 bg-yellow-400 border-4 border-foreground p-3 font-black uppercase text-xs rotate-12 animate-bounce">
                                FREE PDF
                            </div>
                            <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3 italic">
                                <Download className="w-6 h-6 text-primary" />
                                Access Official PDF Pack
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
                        <h3 className="text-2xl font-black uppercase tracking-tight">Top Institute List</h3>
                        <p className="font-bold text-slate-600 leading-relaxed">
                            Detailed list of all MAH MBA/MMS Participating Institutes including JBIMS, SIMSREE, PUMBA, Welingkar, SIES, and more. 
                            Filter by City (Mumbai, Pune, Nagpur, Nasik) and ROI.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <FileText className="w-12 h-12 text-secondary" />
                        <h3 className="text-2xl font-black uppercase tracking-tight">Answer Key PDF</h3>
                        <p className="font-bold text-slate-600 leading-relaxed">
                            Official MAH MBA CET 2026 Answer Key PDF releases for all shifts. 
                            Cross-verify your responses and predict your raw score before result declaration.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <GraduationCap className="w-12 h-12 text-emerald-500" />
                        <h3 className="text-2xl font-black uppercase tracking-tight">Admission Counseling</h3>
                        <p className="font-bold text-slate-600 leading-relaxed">
                            Expert guidance for Centralized Admission Process (CAP) rounds 2026. 
                            Learn how to optimize your option form to get the best college for your rank.
                        </p>
                    </div>
                </div>

                <div className="mt-32">
                    <h2 className="text-4xl font-black uppercase mb-12 border-b-8 border-foreground inline-block">Estimated Cutoffs 2026</h2>
                    <div className="overflow-x-auto border-[6px] border-foreground">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                                <tr>
                                    <th className="p-6 border-r border-white/20">College Name</th>
                                    <th className="p-6 border-r border-white/20">Expected Percentile</th>
                                    <th className="p-6">Expected Score</th>
                                </tr>
                            </thead>
                            <tbody className="text-lg font-bold">
                                <tr className="border-b-4 border-foreground hover:bg-slate-50 transition-colors">
                                    <td className="p-6 border-r-4 border-foreground">JBIMS, Mumbai</td>
                                    <td className="p-6 border-r-4 border-foreground">99.99</td>
                                    <td className="p-6 text-primary">155+</td>
                                </tr>
                                <tr className="border-b-4 border-foreground hover:bg-slate-50 transition-colors">
                                    <td className="p-6 border-r-4 border-foreground">SIMSREE, Mumbai</td>
                                    <td className="p-6 border-r-4 border-foreground">99.95+</td>
                                    <td className="p-6 text-primary">148+</td>
                                </tr>
                                <tr className="border-b-4 border-foreground hover:bg-slate-50 transition-colors">
                                    <td className="p-6 border-r-4 border-foreground">PUMBA, Pune</td>
                                    <td className="p-6 border-r-4 border-foreground">99.50+</td>
                                    <td className="p-6 text-primary">135+</td>
                                </tr>
                                <tr className="border-b-4 border-foreground hover:bg-slate-50 transition-colors">
                                    <td className="p-6 border-r-4 border-foreground">Welingkar, Mumbai</td>
                                    <td className="p-6 border-r-4 border-foreground">99.30+</td>
                                    <td className="p-6 text-primary">130+</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="p-6 border-r-4 border-foreground">MET / Chetana / IES</td>
                                    <td className="p-6 border-r-4 border-foreground">98.50+</td>
                                    <td className="p-6 text-primary">115+</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-32 bg-foreground text-white p-12 md:p-16 border-l-[24px] border-primary">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
                        Confused about your <br />
                        Admission Journey?
                    </h2>
                    <p className="text-xl font-bold text-slate-400 mb-10 max-w-2xl leading-relaxed">
                        Don't settle for a tier-3 college if you have a decent percentile. 
                        Let our admission experts review your profile and suggest the best ROI colleges under CAP rounds.
                    </p>
                    <CtaScrollButton />
                </div>
            </div>
        </div>
    );
}
