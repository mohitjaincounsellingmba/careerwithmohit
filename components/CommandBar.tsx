"use client";

import { useState, useEffect } from "react";
import { Sparkles, Command, Wand2, Zap, Send, X, Type, Layout, Star } from "lucide-react";

interface CommandBarProps {
    onCommand: (command: string) => void;
    isVisible: boolean;
    onClose: () => void;
}

export function CommandBar({ onCommand, isVisible, onClose }: CommandBarProps) {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onCommand(inputValue);
            setInputValue("");
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-6 animate-in slide-in-from-bottom-8 duration-500">
            <div className="bg-slate-900/90 backdrop-blur-xl border-2 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/20 text-primary">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex items-center">
                    <input
                        autoFocus
                        type="text"
                        placeholder="Ask AI to 'Add a summary' or 'Polished professional tone'..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full bg-transparent border-none text-white font-medium placeholder:text-slate-500 focus:outline-none focus:ring-0 text-sm py-2"
                    />
                    <button
                        type="submit"
                        className="bg-primary text-white p-2 hover:bg-white hover:text-primary transition-all flex items-center gap-2 group"
                    >
                        <span className="text-[10px] font-black uppercase tracking-tighter hidden sm:inline">Run Magic</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="flex items-center gap-1 border-l border-white/10 pl-3">
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-white p-2 transition-colors"
                        title="Close Command Bar"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <div className="hidden sm:flex items-center gap-1 bg-white/5 px-2 py-1 border border-white/10 text-[9px] font-black text-slate-400 uppercase">
                        <Command className="w-2.5 h-2.5" /> K
                    </div>
                </div>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
                {[
                    { label: "Make it more professional", icon: <Type className="w-3 h-3" /> },
                    { label: "Add impact metrics", icon: <Star className="w-3 h-3 text-amber-400" /> },
                    { label: "Change to Academic layout", icon: <Layout className="w-3 h-3" /> },
                    { label: "Auto-fix grammar", icon: <Zap className="w-3 h-3 text-emerald-400" /> },
                ].map((s) => (
                    <button
                        key={s.label}
                        onClick={() => onCommand(s.label)}
                        className="bg-black/60 backdrop-blur-md border border-white/5 hover:border-primary/50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-slate-300 hover:text-white transition-all flex items-center gap-2"
                    >
                        {s.icon} {s.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
