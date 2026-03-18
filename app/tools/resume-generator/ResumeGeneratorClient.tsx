"use client";

import { useState, useCallback, useEffect } from "react";
import { ResumeEditor, ResumeData, ResumeMode, initialData } from "@/components/ResumeEditor";
import { ResumeTemplates, TemplateId } from "@/components/ResumeTemplates";
import { AIAssistant } from "@/components/AIAssistant";
import { CommandBar } from "@/components/CommandBar";
import {
    Download, Layout, FileText, ChevronRight, Palette, X,
    Monitor, Tablet, Smartphone, Sparkles, CheckCircle2,
    Command as CommandIcon, Edit3, Eye, Settings, Share2, Zap, ChevronLeft
} from "lucide-react";

const TEMPLATES: { id: TemplateId; name: string; category: string; description: string }[] = [
    { id: "the-disruptor", name: "The Disruptor", category: "V2 Premium", description: "Bold, asymmetric, high-impact design." },
    { id: "global-leader", name: "Global Leader", category: "V2 Premium", description: "Executive power with saphire/gold accents." },
    { id: "silicon-architect", name: "Silicon Arch", category: "V2 Premium", description: "Modern developer-focused grid layout." },
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
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("the-disruptor"); // Default to V2 Disruptor
    const [isPrinting, setIsPrinting] = useState(false);

    // UI State
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showTemplates, setShowTemplates] = useState(false);
    const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);

    // Keyboard shortcut for Command Bar
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsCommandBarOpen(prev => !prev);
            }
            if ((e.metaKey || e.ctrlKey) && e.key === "b") {
                e.preventDefault();
                setSidebarOpen(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleCommand = (cmd: string) => {
        console.log("AI Command received:", cmd);
        // Direct injection or context update logic
        // This would interface with a backend/LLM in true prod
    };

    const handleDownload = () => {
        setIsPrinting(true);
        setTimeout(() => {
            window.print();
            setIsPrinting(false);
        }, 500);
    };

    return (
        <div className="relative min-h-screen bg-slate-900 overflow-hidden font-sans selection:bg-primary/30">
            {/* Ultra-Premium Mesh Gradient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse [animation-delay:2s]"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full animate-pulse [animation-delay:4s]"></div>
            </div>

            <div className="relative z-10 flex h-screen overflow-hidden">
                {/* Unified Sidebar: Command & Edit */}
                <aside
                    className={`transition-all duration-500 ease-in-out border-r border-white/10 bg-black/40 backdrop-blur-2xl flex flex-col ${sidebarOpen ? "w-[450px]" : "w-0 overflow-hidden opacity-0"
                        }`}
                >
                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-white font-bold tracking-tight uppercase text-xs">Career Architect <span className="text-slate-500 font-medium ml-1">V2.0</span></h2>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        <div className="p-6 space-y-8">
                            {/* Command Bar Component */}
                            <CommandBar
                                isVisible={isCommandBarOpen}
                                onClose={() => setIsCommandBarOpen(false)}
                                onCommand={handleCommand}
                            />

                            {/* Contextual Editor Panel */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-600/5 rounded-[2rem] -m-2 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                                <div className="relative">
                                    <ResumeEditor
                                        data={data}
                                        setData={setData}
                                        mode={mode}
                                        setMode={setMode}
                                        onTriggerAI={(type, currentText) => {
                                            if (!sidebarOpen) setSidebarOpen(true);
                                            // Focus AI input or send automated command
                                            console.log(`AI Triggered for ${type}: ${currentText}`);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Interaction Canvas */}
                <main className="flex-1 flex flex-col min-w-0 bg-transparent relative">
                    {/* Floating Toolbar */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all hover:scale-105">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className={`p-2.5 rounded-xl transition-all ${sidebarOpen ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                            title="Toggle Controls (Cmd+B)"
                        >
                            <Layout className="w-4 h-4" />
                        </button>
                        <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
                        <button
                            onClick={() => setShowTemplates(!showTemplates)}
                            className={`p-2.5 rounded-xl transition-all ${showTemplates ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                            title="Gallery"
                        >
                            <Palette className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDownload}
                            className="p-2.5 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition-all"
                            title="Export PDF"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Template Gallery Overlay */}
                    {showTemplates && (
                        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl p-8 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Design Repository</h3>
                                    <p className="text-sm text-slate-400">Select a high-impact architectural pattern</p>
                                </div>
                                <button onClick={() => setShowTemplates(false)} className="p-2 text-slate-400 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                                {TEMPLATES.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => {
                                            setSelectedTemplate(t.id);
                                            setShowTemplates(false);
                                        }}
                                        className={`group relative p-4 rounded-2xl border-2 text-left transition-all ${selectedTemplate === t.id
                                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/5"
                                            : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10"
                                            }`}
                                    >
                                        <div className="mb-3 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <FileText className={`w-4 h-4 ${selectedTemplate === t.id ? "text-primary" : "text-slate-400"}`} />
                                        </div>
                                        <div className="font-bold text-sm text-white mb-1 leading-tight">{t.name}</div>
                                        <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{t.category}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Unified Canvas Section */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* Center: Live Resume Designer */}
                        <div className="flex-1 overflow-y-auto no-scrollbar p-12 lg:p-24 flex justify-center bg-transparent">
                            <div className="relative group transition-transform duration-700 hover:scale-[1.01]">
                                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-blue-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="relative">
                                    <ResumeTemplates
                                        selectedTemplate={selectedTemplate}
                                        data={data}
                                        mode={mode}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right: AI Intelligence Hub (Always Presence) */}
                        <aside className="w-[380px] border-l border-white/10 bg-black/20 backdrop-blur-xl flex flex-col">
                            <div className="p-6 border-b border-white/5 flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <h2 className="text-white font-bold tracking-tight uppercase text-[10px]">Intelligence Hub</h2>
                            </div>
                            <div className="flex-1 overflow-hidden relative">
                                <AIAssistant
                                    onSelectSuggestion={(text, type) => {
                                        if (type === "summary") setData(prev => ({ ...prev, summary: text }));
                                    }}
                                    onClose={() => {
                                        // Sidebar is persistent in V2, but provide empty handler to satisfy TS
                                    }}
                                    currentMode={mode}
                                />
                            </div>
                        </aside>
                    </div>
                </main>
            </div>

            {/* Print Only Container */}
            <div className="hidden print:block absolute inset-0 bg-white text-black z-[9999]">
                <ResumeTemplates
                    selectedTemplate={selectedTemplate}
                    data={data}
                    mode={mode}
                />
            </div>

            <style jsx global>{`
                @media print {
                    @page { margin: 0; size: A4; }
                    body { background: white !important; }
                    .print\:hidden { display: none !important; }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}
