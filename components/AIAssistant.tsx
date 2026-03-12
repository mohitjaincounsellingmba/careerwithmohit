"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Wand2, RefreshCw, X, Zap, MessageSquare, Bot, User, BrainCircuit, History } from "lucide-react";

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
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            text: `Hello! I'm your AI Career Architect. I'm ready to help you build a ${currentMode === "Student" ? "standout internship" : "high-impact executive"} resume. What section should we focus on?`
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
        await new Promise(r => setTimeout(r, 1500));

        const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            text: "I've analyzed your request. Here are some impact-driven suggestions based on top industry standards:",
            type: "suggestion"
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsGenerating(false);
    };

    return (
        <div className="flex flex-col h-full bg-[#0d0d0f] border-l border-white/10 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <BrainCircuit className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-white">AI Agent</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[8px] font-bold text-slate-500 uppercase">System Online</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-slate-500 hover:text-white p-1 transition-colors">
                        <History className="w-4 h-4" />
                    </button>
                    <button onClick={onClose} className="text-slate-500 hover:text-white p-1 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Chat History */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`w-8 h-8 rounded-none border flex items-center justify-center flex-shrink-0 ${m.role === "assistant" ? "bg-primary border-primary" : "bg-white/10 border-white/20"
                            }`}>
                            {m.role === "assistant" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                        </div>
                        <div className={`max-w-[85%] space-y-3`}>
                            <div className={`p-4 text-xs font-medium leading-relaxed ${m.role === "assistant" ? "bg-white/5 text-slate-200 border border-white/5" : "bg-primary/20 text-white border border-primary/30"
                                }`}>
                                {m.text}
                            </div>

                            {m.type === "suggestion" && (
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        "Spearheaded a 20% growth in efficiency...",
                                        "Designed a scalable architecture using...",
                                        "Managed a portfolio of $2M in assets..."
                                    ].map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => onSelectSuggestion(s, "summary")}
                                            className="text-left p-3 bg-white/5 border border-white/10 hover:border-primary/50 text-[10px] text-slate-400 hover:text-white transition-all group flex items-center justify-between"
                                        >
                                            <span className="line-clamp-1 italic">"{s}"</span>
                                            <Zap className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isGenerating && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 bg-primary border border-primary flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex items-center gap-1.5 p-4 bg-white/5 border border-white/5">
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-black border-t border-white/5">
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
                        placeholder="Type a request (e.g. Optimize my summary for finance...)"
                        className="w-full bg-white/5 border border-white/10 p-4 pr-12 text-[11px] font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all resize-none rounded-none"
                    />
                    <button
                        disabled={!query.trim() || isGenerating}
                        onClick={handleSend}
                        className="absolute right-3 bottom-3 p-2 bg-primary text-white hover:bg-white hover:text-primary transition-all disabled:opacity-30 disabled:grayscale"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase text-slate-500">Quick Prompts:</span>
                        <button onClick={() => setQuery("Optimize summary")} className="text-[8px] font-black uppercase text-primary border border-primary/30 px-2 py-0.5 hover:bg-primary hover:text-white transition-all">Optimize</button>
                        <button onClick={() => setQuery("Add metrics")} className="text-[8px] font-black uppercase text-emerald-500 border border-emerald-500/30 px-2 py-0.5 hover:bg-emerald-500 hover:text-white transition-all">Add Metrics</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
