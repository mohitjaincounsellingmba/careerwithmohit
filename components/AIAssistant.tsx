import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Wand2, RefreshCw, X, Zap, MessageSquare, Bot, User, BrainCircuit, History, Target, TrendingUp, ShieldCheck } from "lucide-react";

interface Message {
    id: string;
    role: "assistant" | "user";
    text: string;
    type?: "suggestion" | "text" | "action";
}

interface AIAssistantProps {
    onSelectSuggestion: (text: string, type: string) => void;
    onClose: () => void;
    currentMode: "Student" | "Professional";
}

export function AIAssistant({ onSelectSuggestion, onClose, currentMode }: AIAssistantProps) {
    const [query, setQuery] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [healthScore, setHealthScore] = useState(45); // Simulated starting score
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            text: `System initialized. I am your V3 Intelligence Hub. Ready to optimize your ${currentMode} profile for maximum industry impact.`
        }
    ]);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!query.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", text: query };
        setMessages(prev => [...prev, userMsg]);
        setQuery("");
        setIsGenerating(true);

        // Simulate AI Thinking
        await new Promise(r => setTimeout(r, 1200));

        const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            text: "Analysis complete. Here are impact-driven optimizations based on top-tier placement data:",
            type: "suggestion"
        };

        setMessages(prev => [...prev, aiMsg]);
        setHealthScore(prev => Math.min(prev + 5, 95));
        setIsGenerating(false);
    };

    return (
        <div className="flex flex-col h-full bg-slate-950/40 backdrop-blur-3xl border-l border-white/5 selection:bg-emerald-500/30">
            {/* V3 Intelligence Header */}
            <div className="p-6 bg-white/5 border-b border-white/5 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <BrainCircuit className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-slate-900 rounded-full flex items-center justify-center border border-white/10">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Intelligence Hub</h3>
                            <h4 className="text-sm font-bold text-white tracking-tight">Active Architect v3.0</h4>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-lg border border-white/5 group">
                        <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                {/* Resume Health Score Meter */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
                    <div className="flex items-center justify-between relative z-10">
                        <div className="space-y-1">
                            <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">Resume Health</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-white">{healthScore}</span>
                                <span className="text-xs font-bold text-slate-500">/100</span>
                            </div>
                        </div>
                        <div className="relative w-14 h-14">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={150.8} strokeDashoffset={150.8 - (150.8 * healthScore) / 100} className="text-emerald-500 transition-all duration-1000 ease-out" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-1000" style={{ width: `${healthScore}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Enhanced Chat History */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-transparent">
                {messages.map((m) => (
                    <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110 ${m.role === "assistant" ? "bg-emerald-500 border-emerald-400/50 shadow-lg shadow-emerald-500/20" : "bg-white/10 border-white/20"
                            }`}>
                            {m.role === "assistant" ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
                        </div>
                        <div className={`max-w-[85%] space-y-4`}>
                            <div className={`p-5 text-xs font-medium leading-relaxed rounded-2xl ${m.role === "assistant" ? "bg-white/5 text-slate-200 border border-white/10 rounded-tl-none" : "bg-emerald-500/20 text-white border border-emerald-500/30 rounded-tr-none"
                                }`}>
                                {m.text}
                            </div>

                            {m.type === "suggestion" && (
                                <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {[
                                        "Spearheaded a 25% increase in operational ROI through...",
                                        "Architected a scalable microservices framework reducing...",
                                        "Engineered a data-driven recruitment strategy for..."
                                    ].map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => onSelectSuggestion(s, "summary")}
                                            className="text-left p-4 bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-[11px] text-slate-400 hover:text-white transition-all group relative overflow-hidden rounded-xl"
                                        >
                                            <div className="relative z-10 flex items-center justify-between gap-3">
                                                <span className="italic">"{s}"</span>
                                                <Zap className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-110" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isGenerating && (
                    <div className="flex gap-4 animate-pulse">
                        <div className="w-9 h-9 bg-emerald-500 border border-emerald-400/50 flex items-center justify-center flex-shrink-0 rounded-xl">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex items-center gap-1.5 p-5 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-duration:0.8s]"></span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mode & Action Area */}
            <div className="p-6 bg-slate-900 border-t border-white/5 space-y-6">
                {/* Tone Switcher Feature */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                    <span className="text-[10px] font-black uppercase text-slate-500 mr-2 shrink-0">Rewriter Tones:</span>
                    {[
                        { name: "Executive", icon: <ShieldCheck className="w-3 h-3" />, color: "text-blue-500" },
                        { name: "Technical", icon: <Target className="w-3 h-3" />, color: "text-purple-500" },
                        { name: "Metric-Heavy", icon: <TrendingUp className="w-3 h-3" />, color: "text-emerald-500" }
                    ].map(t => (
                        <button
                            key={t.name}
                            onClick={() => setQuery(`Rewrite in ${t.name} tone`)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-white/20 text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all rounded-lg shrink-0"
                        >
                            <span className={t.color}>{t.icon}</span>
                            {t.name}
                        </button>
                    ))}
                </div>

                <div className="relative group">
                    <textarea
                        rows={2}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Command AI (e.g. Optimize for Fintech...)"
                        className="w-full bg-white/5 border border-white/10 p-5 pr-14 text-xs font-semibold text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all resize-none rounded-2xl group-hover:bg-white/[0.07]"
                    />
                    <button
                        disabled={!query.trim() || isGenerating}
                        onClick={handleSend}
                        className="absolute right-4 bottom-4 p-2.5 bg-emerald-500 text-white hover:bg-white hover:text-emerald-500 transition-all disabled:opacity-30 disabled:grayscale rounded-xl shadow-lg shadow-emerald-500/10"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
