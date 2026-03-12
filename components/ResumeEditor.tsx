"use client";

import { useState, useEffect } from "react";
import {
    User, Mail, Phone, MapPin, Linkedin, Globe, Github,
    GraduationCap, Briefcase, Award, Plus, Trash2,
    ChevronLeft, ChevronRight, Eye, Layout, FileText,
    Sparkles, Target, Zap, Wand2
} from "lucide-react";

export type ResumeMode = "Student" | "Professional";

export interface ResumeData {
    personalInfo: {
        name: string;
        title: string;
        email: string;
        phone: string;
        location: string;
        linkedin: string;
        website: string;
        github: string;
    };
    summary: string;
    education: {
        school: string;
        degree: string;
        dates: string;
        gpa: string;
        honors: string;
        coursework: string;
    }[];
    experience: {
        company: string;
        role: string;
        dates: string;
        location: string;
        bullets: string[];
    }[];
    projects: {
        name: string;
        description: string;
        link: string;
        technologies: string;
    }[];
    skills: {
        category: string;
        items: string;
    }[];
    certifications: string[];
}

export const initialData: ResumeData = {
    personalInfo: {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        github: "",
    },
    summary: "",
    education: [{ school: "", degree: "", dates: "", gpa: "", honors: "", coursework: "" }],
    experience: [{ company: "", role: "", dates: "", location: "", bullets: [""] }],
    projects: [{ name: "", description: "", link: "", technologies: "" }],
    skills: [{ category: "Technical", items: "" }, { category: "Soft Skills", items: "" }],
    certifications: [""],
};

export function ResumeEditor({
    data,
    setData,
    mode,
    setMode,
    onTriggerAI
}: {
    data: ResumeData;
    setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    mode: ResumeMode;
    setMode: (mode: ResumeMode) => void;
    onTriggerAI?: (type: string, currentText: string) => void;
}) {
    const [step, setStep] = useState(1);

    // We'll handle data change notification in the parent

    const handleChange = (section: keyof ResumeData, field: string, value: any, index?: number) => {
        setData(prev => {
            const newData = { ...prev };
            if (index !== undefined && Array.isArray(newData[section])) {
                const sectionArray = [...(newData[section] as any[])];
                sectionArray[index] = { ...sectionArray[index], [field]: value };
                (newData as any)[section] = sectionArray;
            } else if (typeof newData[section] === "object" && !Array.isArray(newData[section])) {
                (newData as any)[section] = { ...(newData[section] as any), [field]: value };
            } else {
                (newData as any)[section] = value;
            }
            return newData;
        });
    };

    const addItem = (section: keyof ResumeData, defaultValue: any) => {
        setData(prev => ({
            ...prev,
            [section]: [...(prev[section] as any[]), defaultValue]
        }));
    };

    const removeItem = (section: keyof ResumeData, index: number) => {
        setData(prev => ({
            ...prev,
            [section]: (prev[section] as any[]).filter((_, i) => i !== index)
        }));
    };

    const handleExperienceBulletChange = (expIndex: number, bulletIndex: number, value: string) => {
        setData(prev => {
            const newExp = [...prev.experience];
            newExp[expIndex].bullets[bulletIndex] = value;
            return { ...prev, experience: newExp };
        });
    };

    const addExperienceBullet = (expIndex: number) => {
        setData(prev => {
            const newExp = [...prev.experience];
            newExp[expIndex].bullets.push("");
            return { ...prev, experience: newExp };
        });
    };

    return (
        <div className="bg-white border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full max-h-[85vh] overflow-hidden">

            {/* Expertise Switcher */}
            <div className="bg-slate-100 border-b-4 border-foreground p-2 flex gap-2">
                <button
                    onClick={() => setMode("Student")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 font-black uppercase text-sm transition-all border-2 ${mode === "Student"
                        ? "bg-foreground text-white border-foreground"
                        : "bg-white text-foreground border-transparent hover:border-slate-300"
                        }`}
                >
                    <GraduationCap className="w-4 h-4" />
                    Student Mode
                </button>
                <button
                    onClick={() => setMode("Professional")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 font-black uppercase text-sm transition-all border-2 ${mode === "Professional"
                        ? "bg-foreground text-white border-foreground"
                        : "bg-white text-foreground border-transparent hover:border-slate-300"
                        }`}
                >
                    <Briefcase className="w-4 h-4" />
                    Expert Mode
                </button>
            </div>

            {/* Stepper Header */}
            <div className="bg-white border-b-2 border-slate-100 px-6 py-4 flex items-center justify-between overflow-x-auto no-scrollbar">
                {[1, 2, 3, 4, 5, 6].map(s => (
                    <div key={s} className="flex items-center gap-2 shrink-0">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-none border-2 font-black text-sm ${step === s ? "bg-primary text-white border-foreground" :
                            step > s ? "bg-foreground text-white border-foreground" : "bg-white text-slate-300 border-slate-200"
                            }`}>
                            {s}
                        </div>
                        {s < 6 && <div className={`w-4 h-0.5 ${step > s ? "bg-foreground" : "bg-slate-100"}`}></div>}
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">

                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                            <User className="w-6 h-6 text-primary" />
                            Personal Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={data.personalInfo.name}
                                    onChange={e => handleChange("personalInfo", "name", e.target.value)}
                                    className="w-full bg-slate-50 border-4 border-foreground p-3 font-bold focus:bg-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Professional Title</label>
                                <input
                                    type="text"
                                    placeholder={mode === "Student" ? "Management Student / Aspiring Analyst" : "Senior Product Manager / Marketing Head"}
                                    value={data.personalInfo.title}
                                    onChange={e => handleChange("personalInfo", "title", e.target.value)}
                                    className="w-full bg-slate-50 border-4 border-foreground p-3 font-bold focus:bg-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={data.personalInfo.email}
                                    onChange={e => handleChange("personalInfo", "email", e.target.value)}
                                    className="w-full bg-slate-50 border-4 border-foreground p-3 font-bold focus:bg-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={data.personalInfo.phone}
                                    onChange={e => handleChange("personalInfo", "phone", e.target.value)}
                                    className="w-full bg-slate-50 border-4 border-foreground p-3 font-bold focus:bg-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Location (City, Country)</label>
                                <input
                                    type="text"
                                    value={data.personalInfo.location}
                                    onChange={e => handleChange("personalInfo", "location", e.target.value)}
                                    className="w-full bg-slate-50 border-4 border-foreground p-3 font-bold focus:bg-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase text-slate-500 mb-2">LinkedIn URL</label>
                                <input
                                    type="url"
                                    value={data.personalInfo.linkedin}
                                    onChange={e => handleChange("personalInfo", "linkedin", e.target.value)}
                                    className="w-full bg-slate-50 border-4 border-foreground p-3 font-bold focus:bg-white focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-primary" />
                            {mode === "Student" ? "Career Objective" : "Professional Summary"}
                        </h3>
                        <div className="relative group">
                            <textarea
                                rows={6}
                                value={data.summary}
                                placeholder={mode === "Student" ? "Motivated management student with a strong academic background..." : "Passionate business leader with over 10 years of experience..."}
                                onChange={e => setData(prev => ({ ...prev, summary: e.target.value }))}
                                className="w-full bg-slate-50 border-4 border-foreground p-4 font-bold focus:bg-white focus:outline-none pr-12"
                            ></textarea>
                            <button
                                onClick={() => onTriggerAI?.("summary", data.summary)}
                                className="absolute top-4 right-4 text-primary hover:scale-110 transition-transform bg-white border-2 border-foreground p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                title="Optimize with AI"
                            >
                                <Wand2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black uppercase flex items-center gap-3">
                                <GraduationCap className="w-6 h-6 text-primary" />
                                Education
                            </h3>
                            <button onClick={() => addItem("education", { school: "", degree: "", dates: "", gpa: "", honors: "", coursework: "" })} className="bg-foreground text-white p-2 border-2 border-foreground hover:bg-primary transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-10">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="relative bg-slate-50 border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                    {idx > 0 && (
                                        <button onClick={() => removeItem("education", idx)} className="absolute -top-4 -right-4 bg-red-500 text-white p-2 border-4 border-foreground hover:bg-black transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Institution Name</label>
                                            <input type="text" value={edu.school} onChange={e => handleChange("education", "school", e.target.value, idx)} className="w-full bg-white border-2 border-foreground p-3 font-bold focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Degree / Major</label>
                                            <input type="text" value={edu.degree} onChange={e => handleChange("education", "degree", e.target.value, idx)} className="w-full bg-white border-2 border-foreground p-3 font-bold focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Dates (e.g. 2022 - 2024)</label>
                                            <input type="text" value={edu.dates} onChange={e => handleChange("education", "dates", e.target.value, idx)} className="w-full bg-white border-2 border-foreground p-3 font-bold focus:outline-none" />
                                        </div>
                                        {mode === "Student" && (
                                            <>
                                                <div>
                                                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">GPA / Percentage</label>
                                                    <input type="text" value={edu.gpa} onChange={e => handleChange("education", "gpa", e.target.value, idx)} className="w-full bg-white border-2 border-foreground p-3 font-bold focus:outline-none" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">Honors / Awards</label>
                                                    <input type="text" value={edu.honors} onChange={e => handleChange("education", "honors", e.target.value, idx)} className="w-full bg-white border-2 border-foreground p-3 font-bold focus:outline-none" />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black uppercase flex items-center gap-3">
                                <Briefcase className="w-6 h-6 text-primary" />
                                {mode === "Student" ? "Internships" : "Experience"}
                            </h3>
                            <button onClick={() => addItem("experience", { company: "", role: "", dates: "", location: "", bullets: [""] })} className="bg-foreground text-white p-2 border-2 border-foreground hover:bg-primary transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-12">
                            {data.experience.map((exp, expIdx) => (
                                <div key={expIdx} className="relative bg-slate-50 border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
                                    {expIdx > 0 && (
                                        <button onClick={() => removeItem("experience", expIdx)} className="absolute -top-4 -right-4 bg-red-500 text-white p-2 border-4 border-foreground hover:bg-black transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Organization Name</label>
                                            <input type="text" value={exp.company} onChange={e => handleChange("experience", "company", e.target.value, expIdx)} className="w-full bg-white border-2 border-foreground p-3 font-bold focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Your Role</label>
                                            <input type="text" value={exp.role} onChange={e => handleChange("experience", "role", e.target.value, expIdx)} className="w-full bg-white border-2 border-foreground p-3 font-bold focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Dates</label>
                                            <input type="text" value={exp.dates} onChange={e => handleChange("experience", "dates", e.target.value, expIdx)} className="w-full bg-white border-2 border-foreground p-3 font-bold focus:outline-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="block text-xs font-black uppercase text-slate-500 mb-2">Key Accomplishments</label>
                                        {exp.bullets.map((bullet, bIdx) => (
                                            <div key={bIdx} className="flex gap-2 group/bullet relative">
                                                <input
                                                    type="text"
                                                    value={bullet}
                                                    onChange={e => handleExperienceBulletChange(expIdx, bIdx, e.target.value)}
                                                    placeholder="Increased ROI by 20% by implementing..."
                                                    className="w-full bg-white border-2 border-slate-200 p-2 font-medium text-sm focus:border-foreground focus:outline-none pr-10"
                                                />
                                                <button
                                                    onClick={() => onTriggerAI?.("bullets", bullet)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary opacity-0 group-hover/bullet:opacity-100 transition-all hover:scale-110"
                                                >
                                                    <Sparkles className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                        <button onClick={() => addExperienceBullet(expIdx)} className="text-xs font-black uppercase text-blue-600 flex items-center gap-1 hover:underline">
                                            <Plus className="w-3 h-3" /> Add Achievement
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black uppercase flex items-center gap-3">
                                <Layout className="w-6 h-6 text-primary" />
                                {mode === "Student" ? "Key Projects" : "Expertise & Skills"}
                            </h3>
                            <button
                                onClick={() => mode === "Student" ? addItem("projects", { name: "", description: "", link: "", technologies: "" }) : addItem("skills", { category: "", items: "" })}
                                className="bg-foreground text-white p-2 border-2 border-foreground hover:bg-primary transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {mode === "Student" ? (
                            <div className="space-y-8">
                                {data.projects.map((proj, idx) => (
                                    <div key={idx} className="bg-slate-50 border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Project Name</label>
                                                <input type="text" value={proj.name} onChange={e => handleChange("projects", "name", e.target.value, idx)} className="w-full bg-white border-2 border-foreground p-3 font-bold focus:outline-none" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Description</label>
                                                <textarea rows={3} value={proj.description} onChange={e => handleChange("projects", "description", e.target.value, idx)} className="w-full bg-white border-2 border-foreground p-3 font-bold focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Technologies Used</label>
                                                <input type="text" value={proj.technologies} onChange={e => handleChange("projects", "technologies", e.target.value, idx)} className="w-full bg-white border-2 border-foreground p-3 font-bold focus:outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {data.skills.map((skill, idx) => (
                                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end bg-white border-4 border-foreground p-4">
                                        <div className="md:col-span-1">
                                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Category</label>
                                            <input type="text" value={skill.category} onChange={e => handleChange("skills", "category", e.target.value, idx)} className="w-full border-b-2 border-foreground p-2 font-black uppercase text-sm focus:outline-none" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Skills (Comma separated)</label>
                                            <input type="text" value={skill.items} onChange={e => handleChange("skills", "items", e.target.value, idx)} className="w-full border-b-2 border-foreground p-2 font-bold text-sm focus:outline-none" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {step === 6 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                            <Award className="w-6 h-6 text-primary" />
                            Certifications & Extras
                        </h3>
                        <div className="space-y-4">
                            {data.certifications.map((cert, idx) => (
                                <div key={idx} className="flex gap-4 items-center">
                                    <input
                                        type="text"
                                        value={cert}
                                        onChange={e => {
                                            const newCerts = [...data.certifications];
                                            newCerts[idx] = e.target.value;
                                            setData(prev => ({ ...prev, certifications: newCerts }));
                                        }}
                                        className="flex-1 bg-slate-50 border-4 border-foreground p-3 font-bold focus:bg-white focus:outline-none"
                                        placeholder="Google Project Management Certificate..."
                                    />
                                    {idx > 0 && (
                                        <button onClick={() => {
                                            const newCerts = data.certifications.filter((_, i) => i !== idx);
                                            setData(prev => ({ ...prev, certifications: newCerts }));
                                        }} className="text-red-500 p-2 border-2 border-transparent hover:border-red-500">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button onClick={() => setData(prev => ({ ...prev, certifications: [...prev.certifications, ""] }))} className="text-sm font-black uppercase text-primary flex items-center gap-2 hover:underline">
                                <Plus className="w-4 h-4" /> Add Certification
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Footer */}
            <div className="bg-slate-100 border-t-4 border-foreground p-4 flex items-center justify-between">
                <button
                    disabled={step === 1}
                    onClick={() => setStep(prev => prev - 1)}
                    className="flex items-center gap-2 px-6 py-3 font-black uppercase text-sm border-4 border-foreground bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </button>

                <div className="hidden md:block text-xs font-black uppercase text-slate-400">
                    Progress: {Math.round((step / 6) * 100)}% Complete
                </div>

                <button
                    onClick={() => step < 6 ? setStep(prev => prev + 1) : null}
                    className={`flex items-center gap-2 px-8 py-3 font-black uppercase text-sm border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${step === 6 ? "bg-green-500 text-white" : "bg-primary text-white"
                        } transition-all active:translate-x-1 active:translate-y-1 active:shadow-none`}
                >
                    {step === 6 ? "Finalize" : "Next Step"}
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
