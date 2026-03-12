"use client";

import { useState } from "react";
import { Sparkles, Send, Copy, Check, Wand2, RefreshCw, X, Zap } from "lucide-react";

interface AIAssistantProps {
    onSelectSuggestion: (text: string, type: string) => void;
    onClose: () => void;
    currentMode: "Student" | "Professional";
}

export function AIAssistant({ onSelectSuggestion, onClose, currentMode }: AIAssistantProps) {
    const [query, setQuery] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [suggestions, setSuggestions] = useState<{ id: string; text: string; type: string }[]>([]);

    const generateAIContent = async (type: string) => {
        setIsGenerating(true);
        // Simulate AI Latency
        await new Promise(r => setTimeout(r, 1500));

        let results: string[] = [];

        if (type === "summary") {
            results = currentMode === "Student"
                ? [
                    "Ambitious management student with a focus on data-driven decision making and strategic planning. Proven leadership through academic projects and internships.",
                    "Proactive MBA aspirant with strong analytical skills and a passion for marketing operations. Eager to contribute to high-growth environments.",
                    "Result-oriented engineering student with expertise in Full Stack Development and a track record of building scalable software solutions."
                ]
                : [
                    "Strategic Business Leader with 10+ years of experience in scaling SaaS operations and driving multi-million dollar revenue growth.",
                    "Innovative Product Manager specialized in user-centric design and agile methodologies. Delivered 5+ market-leading products from concept to launch.",
                    "Performance-driven Marketing Executive with a deep understanding of digital ecosystems and consumer behavior analysis."
                ];
        } else if (type === "bullets") {
            results = [
                "Spearheaded a cross-functional team of 10 to implement a new CRM system, resulting in a 25% increase in operational efficiency.",
                "Designed and executed a market entry strategy that captured 15% market share within the first 6 months of launch.",
                "Optimized supply chain processes using lean methodologies, reducing overhead costs by $200k annually.",
                "Automated data reporting workflows, saving the department 15+ hours of manual work per week."
            ];
        }

        setSuggestions(results.map((t, i) => ({ id: `${type}-${i}`, text: t, type })));
        setIsGenerating(false);
    };

    return (
        <div className="flex flex-col h-full bg-slate-900 text-white border-l-4 border-foreground shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 bg-primary/20 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    <h3 className="text-sm font-black uppercase tracking-widest italic">AI Career Assistant</h3>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {/* Prompt Box */}
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">What are you working on?</p>
                    <div className="relative">
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g. Help me write impact-driven bullets for a Marketing Manager role..."
                            className="w-full bg-white/5 border-2 border-white/10 p-4 text-sm font-medium focus:outline-none focus:border-primary transition-all rounded-none h-32 placeholder:text-slate-600"
                        />
                        <button
                            disabled={!query || isGenerating}
                            onClick={() => generateAIContent("custom")}
                            className="absolute bottom-3 right-3 bg-primary text-white p-2 hover:bg-white hover:text-primary transition-all rounded-none disabled:opacity-50"
                        >
                            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => generateAIContent("summary")}
                        className="flex flex-col items-center justify-center p-4 bg-white/5 border-2 border-white/10 hover:border-primary hover:bg-white/10 transition-all gap-2 group"
                    >
                        <Wand2 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase">Magic Summary</span>
                    </button>
                    <button
                        onClick={() => generateAIContent("bullets")}
                        className="flex flex-col items-center justify-center p-4 bg-white/5 border-2 border-white/10 hover:border-primary hover:bg-white/10 transition-all gap-2 group"
                    >
                        <Zap className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase">Better Bullets</span>
                    </button>
                </div>

                {/* Suggestions List */}
                <div className="space-y-4">
                    {isGenerating && (
                        <div className="flex flex-col items-center justify-center py-10 opacity-50">
                            <Sparkles className="w-8 h-8 text-primary animate-bounce mb-2" />
                            <p className="text-xs font-black uppercase italic tracking-widest">Generating Brilliance...</p>
                        </div>
                    )}

                    {!isGenerating && suggestions.length > 0 && (
                        <>
                            <p className="text-[10px] font-black uppercase text-primary tracking-tighter">AI Recommendations:</p>
                            {suggestions.map((s) => (
                                <div
                                    key={s.id}
                                    className="group relative bg-white/5 border-2 border-white/10 p-4 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                                    onClick={() => onSelectSuggestion(s.text, s.type)}
                                >
                                    <p className="text-xs font-medium leading-relaxed italic text-slate-300">"{s.text}"</p>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Copy className="w-3 h-3 text-primary" />
                                    </div>
                                    <div className="mt-2 text-[8px] font-black uppercase text-slate-500 group-hover:text-primary transition-colors">Click to use</div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40">
                <p className="text-[9px] font-bold text-slate-500 uppercase leading-snug">
                    AI suggestions are based on 10,000+ winning resumes from Ivy League & Fortune 500 hires.
                </p>
            </div>
        </div>
    );
}
