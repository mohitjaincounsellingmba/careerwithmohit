"use client";

import Link from "next/link";
import { ShieldCheck, ArrowUpRight, Headphones, Star } from "lucide-react";

interface InquiryCardProps {
    title?: string;
    description?: string;
    cta?: string;
    type?: "admission" | "career" | "exam";
}

export function InquiryCard({ 
    title = "Need Guaranteed Admission Help?", 
    description = "Talk to Mohit Jain for 100% verified management quota and institutional seat guidance in top B-schools across India.",
    cta = "Get Expert Help Now",
    type = "admission"
}: InquiryCardProps) {
    return (
        <div className="my-12 bg-white rounded-[2.5rem] border-4 border-[#1a1a2e] p-8 md:p-10 shadow-[16px_16px_0px_0px_rgba(26,26,46,1)] relative overflow-hidden group">
            {/* Background Accents */}
            <div className={`absolute top-0 right-0 w-40 h-40 opacity-5 blur-3xl rounded-full ${
                type === 'admission' ? 'bg-emerald-500' : type === 'career' ? 'bg-blue-500' : 'bg-purple-500'
            }`}></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center flex-shrink-0 border-2 border-slate-100 group-hover:rotate-6 transition-transform">
                    {type === 'admission' && <ShieldCheck className="w-10 h-10 text-emerald-500" />}
                    {type === 'career' && <Headphones className="w-10 h-10 text-blue-500" />}
                    {type === 'exam' && <Star className="w-10 h-10 text-purple-500" />}
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-[#1a1a2e] mb-3 leading-tight">
                        {title}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 leading-relaxed mb-6 max-w-xl">
                        {description}
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <Link 
                            href="/inquiry"
                            className="bg-[#1a1a2e] text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-emerald-600 transition-all hover:scale-105"
                        >
                            {cta} <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1,2,3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                                        S{i}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">12k+ Successful Admissions</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
