"use client";

import { useState, useCallback } from "react";
import { ResumeEditor, ResumeData, ResumeMode, initialData } from "@/components/ResumeEditor";
import { ResumeTemplates, TemplateId } from "@/components/ResumeTemplates";
import { AIAssistant } from "@/components/AIAssistant";
import {
    Download, Layout, FileText, ChevronRight,
    Monitor, Tablet, Smartphone, Sparkles, CheckCircle2
} from "lucide-react";

const TEMPLATES: { id: TemplateId; name: string; category: string; description: string }[] = [
    { id: "hbs-classic", name: "HBS Classic", category: "MBA / Finance", description: "The gold standard for top-tier careers." },
    { id: "ai-impact", name: "AI Impact", category: "Premium / AI", description: "Metric-focused modern layout." },
    { id: "oxford-executive", name: "Oxford Exec", category: "Executive", description: "Traditional leadership style." },
    { id: "tech-founder", name: "Tech Founder", category: "Startup", description: "Bold, high-energy layout." },
    { id: "stanford-gsb", name: "Stanford GSB", category: "Expertise", description: "Modern, leadership-focused layout." },
    { id: "modern-cascade", name: "Modern Cascade", category: "Modern", description: "Vibrant two-column layout for tech." },
    { id: "ats-standard", name: "ATS Standard", category: "ATS-Friendly", description: "Engineered for 100% parse rate." },
    { id: "elegant-gold", name: "Elegant Gold", category: "Professional", description: "Premium, sophisticated aesthetic." },
];

export default function ResumeGeneratorClient() {
    const [data, setData] = useState<ResumeData>(initialData);
    const [mode, setMode] = useState<ResumeMode>("Student");
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("hbs-classic");
    const [isPrinting, setIsPrinting] = useState(false);

    // AI Assistant state
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [aiContext, setAIContext] = useState<{ type: string; text: string } | null>(null);

    const handleTriggerAI = (type: string, text: string) => {
        setAIContext({ type, text });
        setShowAIAssistant(true);
    };

    const handleAISelect = (suggestion: string, type: string) => {
        if (type === "summary") {
            setData(prev => ({ ...prev, summary: suggestion }));
        } else if (type === "bullets") {
            // For bullets, we append or replace? Let's say we replace for simplicity or the user can edit
            // In a real app we'd pass the index too.
        }
    };

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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative px-4 sm:px-0">

                    {/* Left Side: Editor */}
                    <div className={`lg:col-span-12 xl:col-span-5 h-[calc(100vh-180px)] xl:sticky xl:top-36 transition-all duration-500 ${showAIAssistant ? "xl:translate-x-[-20%] scale-95 opacity-50" : ""}`}>
                        <ResumeEditor
                            data={data}
                            setData={setData}
                            mode={mode}
                            setMode={setMode}
                            onTriggerAI={handleTriggerAI}
                        />
                    </div>

                    {/* AI Assistant Overlay/Panel */}
                    {showAIAssistant && (
                        <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] z-[50] shadow-[-20px_0_50px_rgba(0,0,0,0.2)]">
                            <AIAssistant
                                currentMode={mode}
                                onClose={() => setShowAIAssistant(false)}
                                onSelectSuggestion={handleAISelect}
                            />
                        </div>
                    )}

                    {/* Right Side: Live Preview */}
                    <div className={`lg:col-span-12 xl:col-span-7 print:hidden transition-all duration-500 ${showAIAssistant ? "xl:blur-sm" : ""}`}>
                        <div id="resume-preview-section" className="relative group scale-[0.85] origin-top xl:scale-100">
                            {/* Browser/Device Chrome Mockup */}
                            <div className="bg-foreground text-white p-3 flex items-center justify-between border-4 border-foreground border-b-0 shadow-[12px_0_0_0_#000]">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                                    AI-Enhanced Preview • {TEMPLATES.find(t => t.id === selectedTemplate)?.name}
                                </div>
                                <div className="w-12"></div>
                            </div>

                            <div className="border-4 border-foreground min-h-[1050px] overflow-hidden bg-white shadow-[12px_12px_0_0_#000]">
                                <ResumeTemplates
                                    selectedTemplate={selectedTemplate}
                                    data={data}
                                    mode={mode}
                                />
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
