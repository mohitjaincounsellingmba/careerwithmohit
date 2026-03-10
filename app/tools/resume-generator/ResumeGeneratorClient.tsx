"use client";

import { useState, useCallback } from "react";
import { ResumeEditor, ResumeData, ResumeMode } from "@/components/ResumeEditor";
import { ResumeTemplates, TemplateId } from "@/components/ResumeTemplates";
import {
    Download, Layout, FileText, ChevronRight,
    Monitor, Tablet, Smartphone, Sparkles, CheckCircle2
} from "lucide-react";

const TEMPLATES: { id: TemplateId; name: string; category: string; description: string }[] = [
    { id: "hbs-classic", name: "HBS Classic", category: "MBA / Finance", description: "The gold standard for top-tier careers." },
    { id: "stanford-gsb", name: "Stanford GSB", category: "Expertise", description: "Modern, leadership-focused layout." },
    { id: "wharton-finance", name: "Wharton Finance", category: "Finance", description: "Strict, dense, achievement-oriented." },
    { id: "modern-cascade", name: "Modern Cascade", category: "Modern", description: "Vibrant two-column layout for tech." },
    { id: "tech-minimal", name: "Tech Minimal", category: "Tech", description: "Sleek, mono-spaced design focus." },
    { id: "creative-sidebar", name: "Creative Sidebar", category: "Creative", description: "Visually impactful and unique." },
    { id: "ats-standard", name: "ATS Standard", category: "ATS-Friendly", description: "Engineered for 100% parse rate." },
    { id: "google-serif", name: "Google Serif", category: "Classic", description: "Clean entry-level professional." },
    { id: "zety-diamond", name: "Zety Diamond", category: "Modern", description: "Elegant fonts and iconography." },
    { id: "minimal-mono", name: "Minimal Mono", category: "Minimal", description: "Bold black & white contrast." },
    { id: "elegant-gold", name: "Elegant Gold", category: "Professional", description: "Premium, sophisticated aesthetic." },
    { id: "startup-bold", name: "Startup Bold", category: "Creative", description: "High-energy, impactful design." }
];

export default function ResumeGeneratorClient() {
    const [data, setData] = useState<ResumeData | null>(null);
    const [mode, setMode] = useState<ResumeMode>("Student");
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("hbs-classic");
    const [isPrinting, setIsPrinting] = useState(false);

    const handleDataChange = useCallback((newData: ResumeData, newMode: ResumeMode) => {
        setData(newData);
        setMode(newMode);
    }, []);

    const handleDownload = () => {
        setIsPrinting(true);
        setTimeout(() => {
            window.print();
            setIsPrinting(false);
        }, 500);
    };

    return (
        <section className="py-12 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">

                {/* Mode & Template Selection */}
                <div className="mb-10 lg:sticky lg:top-24 z-20 bg-white border-4 border-foreground p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-xs font-black uppercase text-slate-400 mr-2">Select Style:</span>
                            <div className="flex bg-slate-100 p-1 rounded-none border-2 border-slate-200 overflow-x-auto no-scrollbar max-w-full">
                                {TEMPLATES.slice(0, 12).map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTemplate(t.id)}
                                        className={`px-4 py-2 text-[10px] font-black uppercase whitespace-nowrap transition-all border-2 border-transparent ${selectedTemplate === t.id
                                                ? "bg-foreground text-white border-foreground"
                                                : "hover:bg-white text-slate-500"
                                            }`}
                                    >
                                        {t.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleDownload}
                            className="bg-green-500 text-white border-4 border-foreground px-8 py-3 font-black uppercase text-sm hover:bg-black transition-all flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                        >
                            <Download className="w-5 h-5" />
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Left Side: Editor */}
                    <div className="lg:col-span-12 xl:col-span-5 h-[1050px] sticky top-36">
                        <ResumeEditor onDataChange={handleDataChange} />
                    </div>

                    {/* Right Side: Live Preview */}
                    <div className="lg:col-span-12 xl:col-span-7 print:hidden">
                        <div id="resume-preview-section" className="relative group">
                            {/* Browser/Device Chrome Mockup */}
                            <div className="bg-foreground text-white p-3 flex items-center justify-between border-4 border-foreground border-b-0">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <Monitor className="w-3 h-3" />
                                    Live Preview • {TEMPLATES.find(t => t.id === selectedTemplate)?.name}
                                </div>
                                <div className="w-12"></div>
                            </div>

                            <div className="border-4 border-foreground min-h-[1050px] overflow-hidden bg-white">
                                {data ? (
                                    <ResumeTemplates
                                        selectedTemplate={selectedTemplate}
                                        data={data}
                                        mode={mode}
                                    />
                                ) : (
                                    <div className="h-[1050px] flex items-center justify-center p-12 text-center bg-slate-50">
                                        <div className="animate-pulse">
                                            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                                            <p className="text-xl font-black uppercase italic text-slate-300">Start typing to see magic...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Only Section */}
            <div className="hidden print:block fixed inset-0 z-[9999] bg-white">
                {data && (
                    <ResumeTemplates
                        selectedTemplate={selectedTemplate}
                        data={data}
                        mode={mode}
                    />
                )}
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        margin: 0;
                        size: A4;
                    }
                    body * {
                        visibility: hidden;
                    }
                    #resume-preview-container, 
                    #resume-preview-container * {
                        visibility: visible;
                    }
                    #resume-preview-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 0;
                        overflow: visible !important;
                        background: white !important;
                    }
                }
            `}</style>
        </section>
    );
}
