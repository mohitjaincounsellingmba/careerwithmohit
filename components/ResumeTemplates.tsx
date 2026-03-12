"use client";

import React from "react";
import { ResumeData, ResumeMode } from "./ResumeEditor";
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";

export type TemplateId =
    | "hbs-classic" | "stanford-gsb" | "wharton-finance" | "columbia-exec"
    | "modern-cascade" | "tech-minimal" | "creative-sidebar" | "ats-standard"
    | "minimal-mono" | "google-serif" | "zety-diamond" | "novoresume-pro"
    | "elegant-gold" | "compact-grid" | "ivy-academic" | "startup-bold"
    | "ai-impact" | "oxford-executive" | "minimal-modern" | "tech-founder";

interface TemplateProps {
    data: ResumeData;
    mode: ResumeMode;
}

// Helper components for templates
const SectionTitle = ({ title, className = "" }: { title: string; className?: string }) => (
    <h3 className={`font-black uppercase tracking-widest text-sm border-b-2 border-slate-200 pb-1 mb-4 ${className}`}>
        {title}
    </h3>
);

/* 
  --------------------------------------------------------------------------------
  TEMPLATE 1: HBS CLASSIC (Traditional MBA)
  --------------------------------------------------------------------------------
*/
const HBSClassic = ({ data, mode }: TemplateProps) => (
    <div className="bg-white p-8 md:p-12 font-serif text-slate-800 leading-relaxed shadow-lg max-w-[800px] mx-auto min-h-[1050px]">
        <div className="text-center mb-8 border-b-4 border-slate-900 pb-6">
            <h1 className="text-4xl font-black uppercase mb-3 tracking-tighter">{data.personalInfo.name || "YOUR NAME"}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase text-slate-600">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                {data.personalInfo.linkedin && <span>LinkedIn</span>}
            </div>
        </div>

        <div className="space-y-8">
            <section>
                <h2 className="text-sm font-black uppercase border-b-2 border-slate-900 mb-4 tracking-widest">Education</h2>
                {data.education.map((edu, i) => (
                    <div key={i} className="mb-4">
                        <div className="flex justify-between font-black uppercase text-xs mb-1">
                            <span>{edu.school}</span>
                            <span>{edu.dates}</span>
                        </div>
                        <div className="italic text-sm">{edu.degree}</div>
                        {edu.gpa && <div className="text-xs font-bold mt-1">GPA: {edu.gpa} {edu.honors && `| ${edu.honors}`}</div>}
                    </div>
                ))}
            </section>

            <section>
                <h2 className="text-sm font-black uppercase border-b-2 border-slate-900 mb-4 tracking-widest">Professional Experience</h2>
                {data.experience.map((exp, i) => (
                    <div key={i} className="mb-6">
                        <div className="flex justify-between font-black uppercase text-xs mb-1">
                            <span>{exp.company}</span>
                            <span>{exp.dates}</span>
                        </div>
                        <div className="flex justify-between text-sm italic mb-2">
                            <span>{exp.role}</span>
                            <span>{exp.location}</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-1">
                            {exp.bullets.map((b, j) => (
                                <li key={j} className="text-[13px]">{b}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            {mode === "Student" && data.projects.length > 0 && (
                <section>
                    <h2 className="text-sm font-black uppercase border-b-2 border-slate-900 mb-4 tracking-widest">Key Projects</h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-4">
                            <div className="font-black text-xs uppercase mb-1">{proj.name}</div>
                            <p className="text-[13px] italic mb-1">{proj.description}</p>
                            <div className="text-[11px] font-bold uppercase text-slate-500">Tech: {proj.technologies}</div>
                        </div>
                    ))}
                </section>
            )}

            <section>
                <h2 className="text-sm font-black uppercase border-b-2 border-slate-900 mb-4 tracking-widest">Additional Information</h2>
                <div className="text-[13px] space-y-2">
                    {data.skills.map((s, i) => (
                        <div key={i}><span className="font-black uppercase text-[11px]">{s.category}:</span> {s.items}</div>
                    ))}
                    {data.certifications.length > 0 && (
                        <div><span className="font-black uppercase text-[11px]">Certifications:</span> {data.certifications.join(", ")}</div>
                    )}
                </div>
            </section>
        </div>
    </div>
);

/* 
  --------------------------------------------------------------------------------
  TEMPLATE 2: MODERN CASCADE (Clean, Two-Column)
  --------------------------------------------------------------------------------
*/
const ModernCascade = ({ data, mode }: TemplateProps) => (
    <div className="bg-white flex shadow-lg max-w-[800px] mx-auto min-h-[1050px] overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 bg-slate-900 text-white p-8">
            <div className="mb-8">
                <div className="w-16 h-1 w-full bg-primary mb-4"></div>
                <h1 className="text-2xl font-black uppercase leading-none mb-2">{data.personalInfo.name.split(" ")[0]}<br />{data.personalInfo.name.split(" ")[1]}</h1>
                <p className="text-xs font-bold text-primary uppercase tracking-widest">{data.personalInfo.title}</p>
            </div>

            <div className="space-y-6 mb-12">
                <h3 className="text-[10px] font-black uppercase border-b border-slate-700 pb-2 tracking-widest text-slate-400">Contact</h3>
                <div className="space-y-3 text-[11px] font-medium break-all">
                    <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-primary" /> {data.personalInfo.email}</div>
                    <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-primary" /> {data.personalInfo.phone}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-primary" /> {data.personalInfo.location}</div>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase border-b border-slate-700 pb-2 tracking-widest text-slate-400">Skills</h3>
                {data.skills.map((s, i) => (
                    <div key={i} className="mb-4">
                        <div className="text-[10px] font-black uppercase mb-2 text-primary">{s.category}</div>
                        <div className="flex flex-wrap gap-2">
                            {s.items.split(",").map((item, j) => (
                                <span key={j} className="text-[9px] bg-slate-800 px-2 py-1 rounded-none border border-slate-700">{item.trim()}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-10 font-sans text-slate-700">
            <section className="mb-10">
                <p className="text-sm italic text-slate-600 leading-relaxed font-medium">"{data.summary}"</p>
            </section>

            <section className="mb-10">
                <h2 className="text-lg font-black uppercase text-slate-900 border-l-4 border-primary pl-4 mb-6">Experience</h2>
                <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                        <div key={i}>
                            <div className="font-black text-sm text-slate-900">{exp.role}</div>
                            <div className="text-[11px] font-bold text-primary uppercase mb-3">{exp.company} | {exp.dates}</div>
                            <ul className="space-y-2">
                                {exp.bullets.map((b, j) => (
                                    <li key={j} className="text-xs flex gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-lg font-black uppercase text-slate-900 border-l-4 border-primary pl-4 mb-6">Education</h2>
                <div className="space-y-6">
                    {data.education.map((edu, i) => (
                        <div key={i}>
                            <div className="font-black text-sm text-slate-900">{edu.degree}</div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase">{edu.school}</div>
                            <div className="text-[10px] italic">{edu.dates}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </div>
);

/* 
  --------------------------------------------------------------------------------
  TEMPLATE 3: TECH MINIMAL (Sleek, Mono-focus)
  --------------------------------------------------------------------------------
*/
const TechMinimal = ({ data, mode }: TemplateProps) => (
    <div className="bg-slate-50 p-12 font-mono text-slate-900 max-w-[800px] mx-auto min-h-[1050px] shadow-lg">
        <header className="mb-12 border-b-2 border-slate-900 pb-8 flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{data.personalInfo.name}</h1>
                <p className="text-lg font-bold text-blue-600">{data.personalInfo.title}</p>
            </div>
            <div className="text-right text-[10px] font-bold space-y-1">
                <div>{data.personalInfo.email}</div>
                <div>{data.personalInfo.phone}</div>
                <div className="text-blue-600 underline">{data.personalInfo.linkedin}</div>
            </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
                <section>
                    <h2 className="text-xs font-black uppercase bg-slate-900 text-white inline-block px-2 py-1 mb-6 tracking-widest">Experience_Log</h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-8 pl-4 border-l border-slate-300">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-black">{exp.role}</span>
                                <span className="text-[10px] bg-slate-200 px-2">{exp.dates}</span>
                            </div>
                            <div className="text-xs font-bold text-slate-500 uppercase mb-4">{exp.company}</div>
                            <div className="space-y-2">
                                {exp.bullets.map((b, j) => (
                                    <p key={j} className="text-xs leading-relaxed lowercase">{`> ${b}`}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                <section>
                    <h2 className="text-xs font-black uppercase bg-slate-900 text-white inline-block px-2 py-1 mb-6 tracking-widest">Projects_Stack</h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-4 pl-4 border-l border-slate-300">
                            <div className="text-sm font-black mb-1">{proj.name}</div>
                            <p className="text-xs mb-2 italic lowercase">{proj.description}</p>
                            <div className="text-[10px] font-bold text-blue-600 uppercase">Tags: {proj.technologies}</div>
                        </div>
                    ))}
                </section>
            </div>

            <div className="space-y-12">
                <section>
                    <h2 className="text-xs font-black uppercase bg-blue-600 text-white inline-block px-2 py-1 mb-6 tracking-widest">Skill_set</h2>
                    {data.skills.map((s, i) => (
                        <div key={i} className="mb-6">
                            <div className="text-[10px] font-black uppercase text-slate-400 mb-2">{s.category}</div>
                            <div className="flex flex-wrap gap-2">
                                {s.items.split(",").map((item, j) => (
                                    <span key={j} className="text-[10px] font-bold bg-white border border-slate-200 px-2 py-1">{item.trim()}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                <section>
                    <h2 className="text-xs font-black uppercase bg-slate-900 text-white inline-block px-2 py-1 mb-6 tracking-widest">Education_Cert</h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="mb-4">
                            <div className="text-xs font-black">{edu.school}</div>
                            <div className="text-[10px] font-bold text-slate-500">{edu.degree}</div>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    </div>
);

/* 
  --------------------------------------------------------------------------------
  TEMPLATE 4: WHARTON FINANCE (Strict, Investment Banking)
  --------------------------------------------------------------------------------
*/
const WhartonFinance = ({ data, mode }: TemplateProps) => (
    <div className="bg-white p-10 font-serif text-black max-w-[800px] mx-auto min-h-[1050px] shadow-lg text-[12px] leading-snug">
        <div className="text-center mb-6">
            <h1 className="text-2xl font-bold uppercase mb-1">{data.personalInfo.name}</h1>
            <div className="text-[11px] font-medium italic">
                {data.personalInfo.location} • {data.personalInfo.phone} • {data.personalInfo.email} • {data.personalInfo.linkedin}
            </div>
        </div>

        <section className="mb-6">
            <h2 className="font-bold uppercase border-b border-black mb-2 py-0.5">EDUCATION</h2>
            {data.education.map((edu, i) => (
                <div key={i} className="mb-2">
                    <div className="flex justify-between font-bold">
                        <span>{edu.school}</span>
                        <span>{edu.dates}</span>
                    </div>
                    <div className="flex justify-between italic">
                        <span>{edu.degree}</span>
                        <span>{data.personalInfo.location}</span>
                    </div>
                    {edu.gpa && <div className="mt-0.5">• GPA: {edu.gpa} {edu.honors && `| ${edu.honors}`}</div>}
                    {edu.coursework && <div className="mt-0.5 italic">• Relevant Coursework: {edu.coursework}</div>}
                </div>
            ))}
        </section>

        <section className="mb-6">
            <h2 className="font-bold uppercase border-b border-black mb-2 py-0.5">EXPERIENCE</h2>
            {data.experience.map((exp, i) => (
                <div key={i} className="mb-3">
                    <div className="flex justify-between font-bold">
                        <span>{exp.company}</span>
                        <span>{exp.dates}</span>
                    </div>
                    <div className="flex justify-between italic mb-1">
                        <span>{exp.role}</span>
                        <span>{exp.location}</span>
                    </div>
                    <ul className="list-disc list-outside ml-5 space-y-0.5">
                        {exp.bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>

        <section>
            <h2 className="font-bold uppercase border-b border-black mb-2 py-0.5">SKILLS & ADDITIONAL</h2>
            <div className="space-y-1">
                {data.skills.map((s, i) => (
                    <div key={i}><span className="font-bold">{s.category}:</span> {s.items}</div>
                ))}
            </div>
        </section>
    </div>
);

/* 
  --------------------------------------------------------------------------------
  TEMPLATE 5: CREATIVE SIDEBAR (Vibrant, Designer style)
  --------------------------------------------------------------------------------
*/
const CreativeSidebar = ({ data, mode }: TemplateProps) => (
    <div className="bg-white flex shadow-lg max-w-[800px] mx-auto min-h-[1050px]">
        <div className="w-[280px] bg-blue-600 text-white p-8 bg-gradient-to-b from-blue-600 to-indigo-700">
            <div className="mb-10 text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-black">
                    {data.personalInfo.name.charAt(0)}
                </div>
                <h1 className="text-xl font-black uppercase mb-1 leading-tight">{data.personalInfo.name}</h1>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">{data.personalInfo.title}</p>
            </div>

            <div className="space-y-8">
                <section>
                    <h3 className="text-xs font-black uppercase mb-4 text-blue-100 border-b border-white/20 pb-2">Connect</h3>
                    <div className="space-y-3 text-[10px] font-bold">
                        <div className="flex items-center gap-3"><Mail className="w-3.5 h-3.5" /> {data.personalInfo.email}</div>
                        <div className="flex items-center gap-3"><Phone className="w-3.5 h-3.5" /> {data.personalInfo.phone}</div>
                        <div className="flex items-center gap-3"><Linkedin className="w-3.5 h-3.5" /> {data.personalInfo.linkedin.split("/").pop()}</div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xs font-black uppercase mb-4 text-blue-100 border-b border-white/20 pb-2">Skills</h3>
                    <div className="space-y-4">
                        {data.skills.map((s, i) => (
                            <div key={i}>
                                <div className="text-[10px] font-black uppercase mb-2 opacity-70">{s.category}</div>
                                <div className="flex flex-wrap gap-1.5">
                                    {s.items.split(",").map((item, j) => (
                                        <span key={j} className="text-[9px] bg-white/10 px-2 py-1 rounded-sm border border-white/10">{item.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>

        <div className="flex-1 p-10 font-sans">
            <section className="mb-10">
                <h2 className="text-sm font-black uppercase text-blue-600 mb-2 tracking-widest flex items-center gap-2">
                    <div className="w-8 h-[2px] bg-blue-600"></div> Profile
                </h2>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{data.summary}</p>
            </section>

            <section className="mb-10">
                <h2 className="text-sm font-black uppercase text-blue-600 mb-6 tracking-widest flex items-center gap-2">
                    <div className="w-8 h-[2px] bg-blue-600"></div> Journey
                </h2>
                <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200">
                    {data.experience.map((exp, i) => (
                        <div key={i} className="relative pl-8">
                            <div className="absolute left-[5px] top-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 border-4 border-white ring-2 ring-blue-600"></div>
                            <div className="font-black text-slate-900 leading-none mb-1">{exp.role}</div>
                            <div className="text-[10px] font-black uppercase text-slate-400 mb-3">{exp.company} | {exp.dates}</div>
                            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-outside ml-4">
                                {exp.bullets.map((b, j) => (
                                    <li key={j}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </div>
);

/* 
  --------------------------------------------------------------------------------
  TEMPLATE 6: ELEGANT GOLD (Premium, Executive style)
  --------------------------------------------------------------------------------
*/
const ElegantGold = ({ data, mode }: TemplateProps) => (
    <div className="bg-white p-12 font-serif text-slate-900 shadow-lg max-w-[800px] mx-auto min-h-[1050px] border-t-[16px] border-[#C5A059]">
        <div className="flex justify-between items-start mb-12">
            <div className="max-w-[70%]">
                <h1 className="text-4xl font-light uppercase tracking-[4px] mb-2 text-slate-800">{data.personalInfo.name}</h1>
                <p className="text-sm font-bold uppercase tracking-widest text-[#C5A059]">{data.personalInfo.title}</p>
            </div>
            <div className="text-right text-[10px] uppercase font-bold tracking-widest text-slate-400 leading-relaxed">
                <div>{data.personalInfo.location}</div>
                <div>{data.personalInfo.phone}</div>
                <div>{data.personalInfo.email}</div>
            </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
            <div className="col-span-8 space-y-12">
                <section>
                    <h2 className="text-[11px] font-black uppercase tracking-[3px] text-[#C5A059] mb-6 inline-block border-b border-slate-200 pb-1">Experience</h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-8">
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider font-sans">{exp.role}</h3>
                                <span className="text-[10px] font-bold text-slate-400">{exp.dates}</span>
                            </div>
                            <div className="text-[11px] font-bold uppercase text-slate-500 mb-4">{exp.company}</div>
                            <ul className="text-xs space-y-2 list-none">
                                {exp.bullets.map((b, j) => (
                                    <li key={j} className="flex gap-3 leading-relaxed">
                                        <span className="text-[#C5A059] mt-0.5">▪</span>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            </div>

            <div className="col-span-4 space-y-12">
                <section>
                    <h2 className="text-[11px] font-black uppercase tracking-[3px] text-[#C5A059] mb-6 inline-block border-b border-slate-200 pb-1">Education</h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="mb-4">
                            <div className="text-xs font-black uppercase text-slate-800 mb-1">{edu.degree}</div>
                            <div className="text-[10px] font-bold text-slate-400 mb-1 italic">{edu.school}</div>
                            <div className="text-[9px] font-bold text-slate-400">{edu.dates}</div>
                        </div>
                    ))}
                </section>

                <section>
                    <h2 className="text-[11px] font-black uppercase tracking-[3px] text-[#C5A059] mb-6 inline-block border-b border-slate-200 pb-1">Expertise</h2>
                    {data.skills.map((s, i) => (
                        <div key={i} className="mb-4">
                            <div className="text-[9px] font-black uppercase text-slate-400 mb-2">{s.category}</div>
                            <div className="text-[10px] font-bold text-slate-700 leading-loose">{s.items}</div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    </div>
);

/* 
  --------------------------------------------------------------------------------
  TEMPLATE 7: AI IMPACT (Modern, Metric-Focused)
  --------------------------------------------------------------------------------
*/
const AIImpact = ({ data, mode }: TemplateProps) => (
    <div className="bg-white p-12 font-sans text-slate-800 shadow-lg max-w-[800px] mx-auto min-h-[1050px]">
        <header className="mb-10 text-center relative">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary opacity-20"></div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{data.personalInfo.name}</h1>
            <p className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">{data.personalInfo.title}</p>
            <div className="flex justify-center gap-6 text-[10px] font-black uppercase text-slate-400">
                <span>{data.personalInfo.email}</span>
                <span>•</span>
                <span>{data.personalInfo.phone}</span>
                <span>•</span>
                <span>{data.personalInfo.location}</span>
            </div>
        </header>

        <div className="grid grid-cols-1 gap-12">
            <section>
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 shrink-0">Executive Summary</h2>
                    <div className="h-[1px] bg-slate-100 w-full"></div>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 font-medium italic">"{data.summary}"</p>
            </section>

            <section>
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 shrink-0">Strategic Impact</h2>
                    <div className="h-[1px] bg-slate-100 w-full"></div>
                </div>
                <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                        <div key={i} className="relative pl-6 border-l-2 border-primary/20 hover:border-primary transition-colors">
                            <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary"></div>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-black text-sm uppercase text-slate-900">{exp.role}</h3>
                                    <p className="text-[10px] font-bold text-primary uppercase">{exp.company}</p>
                                </div>
                                <span className="text-[9px] font-black text-slate-400 uppercase">{exp.dates}</span>
                            </div>
                            <ul className="grid grid-cols-1 gap-3">
                                {exp.bullets.map((b, j) => (
                                    <li key={j} className="text-xs text-slate-600 flex gap-3">
                                        <span className="text-primary font-black">»</span>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-2 gap-10">
                <section>
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 shrink-0">Expertise</h2>
                        <div className="h-[1px] bg-slate-100 w-full"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((s, i) => (
                            <div key={i} className="w-full">
                                <p className="text-[9px] font-black uppercase text-slate-400 mb-1">{s.category}</p>
                                <p className="text-xs font-bold text-slate-700">{s.items}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 shrink-0">Education</h2>
                        <div className="h-[1px] bg-slate-100 w-full"></div>
                    </div>
                    <div className="space-y-4">
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <h3 className="font-black text-[11px] uppercase text-slate-900">{edu.degree}</h3>
                                <p className="text-[10px] font-bold text-slate-500 italic">{edu.school}</p>
                                <p className="text-[9px] font-black text-primary uppercase">{edu.dates}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    </div>
);

// Map of Template Components
const templateMap: Record<TemplateId, React.FC<TemplateProps>> = {
    "hbs-classic": HBSClassic,
    "stanford-gsb": HBSClassic,
    "wharton-finance": WhartonFinance,
    "columbia-exec": WhartonFinance,
    "modern-cascade": ModernCascade,
    "tech-minimal": TechMinimal,
    "creative-sidebar": CreativeSidebar,
    "ats-standard": WhartonFinance,
    "minimal-mono": TechMinimal,
    "google-serif": HBSClassic,
    "zety-diamond": ModernCascade,
    "novoresume-pro": ModernCascade,
    "elegant-gold": ElegantGold,
    "compact-grid": TechMinimal,
    "ivy-academic": HBSClassic,
    "startup-bold": CreativeSidebar,
    "ai-impact": AIImpact,
    "oxford-executive": WhartonFinance,
    "minimal-modern": TechMinimal,
    "tech-founder": ModernCascade
};

export function ResumeTemplates({ selectedTemplate, data, mode }: { selectedTemplate: TemplateId; data: ResumeData; mode: ResumeMode }) {
    const Component = templateMap[selectedTemplate] || HBSClassic;

    return (
        <div id="resume-preview-container" className="h-full overflow-y-auto no-scrollbar bg-slate-200 p-4 md:p-8 flex justify-center">
            <div className="print:shadow-none print:p-0">
                <Component data={data} mode={mode} />
            </div>
        </div>
    );
}
