"use client";

import { useState } from "react";
import { LeadGenForm } from "@/components/LeadGenForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
    Download, FileText, Calendar, ArrowRight,
    CheckCircle2, ShieldCheck, Zap
} from "lucide-react";

interface Paper {
    year: string;
    title: string;
    url: string;
}

interface ExamData {
    name: string;
    description: string;
    papers: Paper[];
}

interface ResourceClientProps {
    exam: ExamData;
    examKey: string;
}

export function ResourceClient({ exam, examKey }: ResourceClientProps) {
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleDownloadRequest = (paper: Paper) => {
        setSelectedPaper(paper);
        setShowForm(true);
    };

    const handleSuccess = () => {
        if (selectedPaper) {
            window.open(selectedPaper.url, "_blank");
            setShowForm(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 pt-32 pb-24 px-6">
            <div className="max-w-5xl mx-auto">
                <Breadcrumbs />

                <div className="mt-10 mb-16">
                    <div className="inline-flex items-center gap-2 bg-primary px-4 py-1 mb-6 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <FileText className="w-4 h-4 text-white" />
                        <span className="text-xs font-black uppercase tracking-widest text-white">Download Center</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
                        {exam.name} <br />
                        <span className="text-primary italic">Previous Year Papers</span>
                    </h1>
                    <p className="text-xl text-slate-600 font-bold max-w-2xl leading-relaxed">
                        {exam.description} Practice with actual questions to understand the difficulty level and exam pattern.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                    {/* Left: Papers List */}
                    <div className="md:col-span-12 lg:col-span-7 space-y-6">
                        {exam.papers.map((paper, idx) => (
                            <div
                                key={idx}
                                className="group bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 flex items-center justify-center border-2 border-slate-200">
                                        <Calendar className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black uppercase leading-tight group-hover:text-primary transition-colors">{paper.title}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">PDF + Solutions Included</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDownloadRequest(paper)}
                                    className="bg-foreground text-white border-2 border-foreground px-6 py-3 font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shadow-primary/20"
                                >
                                    <Download className="w-4 h-4" />
                                    Download
                                </button>
                            </div>
                        ))}

                        <div className="mt-12 p-8 bg-blue-50 border-4 border-primary border-dashed rounded-none">
                            <div className="flex gap-4">
                                <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
                                <div>
                                    <h4 className="text-lg font-black uppercase mb-2">Why Practice Previous Papers?</h4>
                                    <ul className="text-sm font-bold text-slate-600 space-y-3 leading-relaxed">
                                        <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-primary shrink-0" /> Understand the actual weightage of different topics.</li>
                                        <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-primary shrink-0" /> Master time management under real exam pressure.</li>
                                        <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-primary shrink-0" /> Identify recurring patterns and question types.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar Info */}
                    <div className="md:col-span-12 lg:col-span-5 lg:sticky lg:top-36">
                        {showForm && selectedPaper ? (
                            <LeadGenForm
                                resourceName={selectedPaper.title}
                                onSuccess={handleSuccess}
                                onClose={() => setShowForm(false)}
                            />
                        ) : (
                            <div className="bg-foreground text-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
                                <Zap className="w-10 h-10 text-primary mb-6" />
                                <h3 className="text-2xl font-black uppercase mb-6 leading-tight">Master Your <br /><span className="text-primary italic">Preparation</span></h3>
                                <div className="space-y-6 text-sm font-bold text-slate-300 uppercase tracking-widest leading-relaxed">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" /> High-Resolution PDFs
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" /> Topic-wise Solutions
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" /> Free Mentorship Sync
                                    </div>
                                </div>
                                <div className="mt-10 pt-10 border-t border-slate-700">
                                    <p className="text-[10px] text-slate-500 mb-2">TRUSTED BY 50,000+ ASPIRANTS</p>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-4/5"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
