"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ArrowRight, MessageSquare } from "lucide-react";

export function LeadMagnetBar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-40 px-4 pb-4 animate-in slide-in-from-bottom-full duration-700">
            <div className="max-w-7xl mx-auto">
                <div className="bg-[#1a1a2e] border-[3px] border-emerald-500 rounded-3xl p-4 md:p-6 shadow-[20px_20px_0px_0px_rgba(16,185,129,0.2)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>

                    <div className="flex items-center gap-5 relative z-10">

                        <div className="text-center md:text-left">
                            <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tight leading-none mb-1">
                                Seeking MBA Admission <span className="text-emerald-500">2026?</span>
                            </h4>
                            <p className="text-xs md:text-sm font-bold text-slate-400">
                                Get a <span className="text-white">Free 1-on-1</span> Expert Counselling Session Worth ₹1,999!
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 w-full md:w-auto">
                        <Link 
                            href="/inquiry"
                            className="flex-1 md:flex-none h-14 bg-white text-[#1a1a2e] px-8 rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xl"
                        >
                            Request Free Call <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a 
                            href="https://wa.me/919560020771"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                        >
                            <MessageSquare className="w-6 h-6 fill-current" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
