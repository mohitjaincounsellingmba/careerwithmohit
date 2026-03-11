"use client";

import { useState, useMemo } from "react";
import { Calculator, RefreshCw, Trophy, Target, AlertCircle, ChevronRight, Zap, Beaker, Atom, FunctionSquare, HelpCircle, X } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

type Subject = "Physics" | "Chemistry" | "Mathematics";

interface SubjectData {
    correctMCQ: number | "";
    incorrectMCQ: number | "";
    correctNumerical: number | "";
}

export function JeeCalculator() {
    const [activeSubject, setActiveSubject] = useState<Subject>("Physics");
    const [data, setData] = useState<Record<Subject, SubjectData>>({
        Physics: { correctMCQ: "", incorrectMCQ: "", correctNumerical: "" },
        Chemistry: { correctMCQ: "", incorrectMCQ: "", correctNumerical: "" },
        Mathematics: { correctMCQ: "", incorrectMCQ: "", correctNumerical: "" }
    });

    // Response Sheet URL State
    const [responseSheetUrl, setResponseSheetUrl] = useState("");

    // Lead Form State
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [leadData, setLeadData] = useState({
        name: "",
        number: "",
        email: "",
        location: ""
    });

    // Inquiry popup state
    const [showInquiry, setShowInquiry] = useState(false);

    const stats = useMemo(() => {
        let totalScore = 0;
        const subjectScores: Record<Subject, number> = { Physics: 0, Chemistry: 0, Mathematics: 0 };
        let totalAttempted = 0;
        let totalCorrect = 0;

        (Object.keys(data) as Subject[]).forEach(sub => {
            const cMCQ = Number(data[sub].correctMCQ) || 0;
            const iMCQ = Number(data[sub].incorrectMCQ) || 0;
            const cNum = Number(data[sub].correctNumerical) || 0;

            const subScore = (cMCQ * 4) - (iMCQ * 1) + (cNum * 4);
            subjectScores[sub] = subScore;
            totalScore += subScore;
            totalAttempted += (cMCQ + iMCQ + cNum);
            totalCorrect += (cMCQ + cNum);
        });

        // Percentile prediction logic based on 2026 research
        let percentile = 0;
        if (totalScore >= 280) percentile = 99.99;
        else if (totalScore >= 230) percentile = 99.8;
        else if (totalScore >= 190) percentile = 99.3;
        else if (totalScore >= 170) percentile = 99.0;
        else if (totalScore >= 145) percentile = 98.0;
        else if (totalScore >= 120) percentile = 96.0;
        else if (totalScore >= 100) percentile = 94.0;
        else if (totalScore >= 62) percentile = 84.0;
        else if (totalScore >= 41) percentile = 70.0;
        else percentile = 50.0;

        const accuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0;

        return { totalScore, percentile, accuracy, subjectScores };
    }, [data]);

    const handleInputChange = (sub: Subject, field: keyof SubjectData, val: string) => {
        const num = parseInt(val);
        const max = field === "correctNumerical" ? 5 : 20;
        if (val === "" || (num >= 0 && num <= max)) {
            setData(prev => ({
                ...prev,
                [sub]: { ...prev[sub], [field]: val === "" ? "" : num }
            }));
        }
    };

    const reset = () => {
        setData({
            Physics: { correctMCQ: "", incorrectMCQ: "", correctNumerical: "" },
            Chemistry: { correctMCQ: "", incorrectMCQ: "", correctNumerical: "" },
            Mathematics: { correctMCQ: "", incorrectMCQ: "", correctNumerical: "" }
        });
        setIsUnlocked(false);
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        // Generate WhatsApp message for the lead
        e.preventDefault();
        const message = `*New JEE Main 2026 Lead*%0A%0A` +
            `*Name:* ${leadData.name}%0A` +
            `*Phone:* ${leadData.number}%0A` +
            `*Email:* ${leadData.email}%0A` +
            `*Location:* ${leadData.location}%0A` +
            (responseSheetUrl ? `*Response Sheet URL:* ${responseSheetUrl}%0A` : "") +
            `*Total Score:* ${stats.totalScore}/300%0A` +
            `*P Score:* ${stats.subjectScores.Physics}%0A` +
            `*C Score:* ${stats.subjectScores.Chemistry}%0A` +
            `*M Score:* ${stats.subjectScores.Mathematics}%0A` +
            `*Percentile:* ~${stats.percentile}+`;

        // v2.1 silent capture
        try {
            fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: leadData.name,
                    number: leadData.number,
                    email: leadData.email,
                    location: leadData.location,
                    source: `JEE Main 2026 Calculator`,
                    score: stats.totalScore,
                    percentile: stats.percentile,
                    physics: stats.subjectScores.Physics,
                    chemistry: stats.subjectScores.Chemistry,
                    maths: stats.subjectScores.Mathematics
                }),
            }).catch(err => console.error('Silent capture error:', err));
        } catch (e: any) {
            console.error('Lead Capture Error:', e);
        }

        window.open(`https://wa.me/919560020771?text=${message}`, '_blank');
        setIsUnlocked(true);
        setShowLeadForm(false);
    };

    return (
        <div className="w-full max-w-5xl mx-auto font-body">
            <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 border-b-4 border-foreground pb-8">
                    <div className="bg-primary p-4 border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-fit">
                        <Calculator className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">
                            JEE Main 2026 Calculator
                        </h2>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                            New Pattern: 75 Questions | No optional questions in Section B
                        </p>
                    </div>
                </div>

                {/* Response Sheet URL Section */}
                <div className="mb-12 bg-slate-50 border-4 border-foreground p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="w-6 h-6 text-primary animate-pulse" />
                        <h3 className="text-xl font-black uppercase tracking-tight">Option 1: Auto-Calculate via Response Sheet</h3>
                    </div>

                    <div className="mb-8">
                        <label className="block text-xs font-black uppercase text-slate-500 mb-2">Paste your NTA Response Sheet URL here</label>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="url"
                                value={responseSheetUrl}
                                onChange={(e) => setResponseSheetUrl(e.target.value)}
                                placeholder="https://cdn3.digialm.com///per/g01/pub/..."
                                className="flex-1 bg-white border-4 border-foreground p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                            />
                            <button
                                onClick={() => setShowLeadForm(true)}
                                className="bg-primary text-white border-4 border-foreground px-8 py-4 font-black uppercase hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Submit URL
                            </button>
                        </div>
                    </div>

                    <div className="border-t-2 border-slate-200 pt-6">
                        <button
                            onClick={(e) => {
                                const el = (e.currentTarget.nextElementSibling as HTMLElement);
                                el.classList.toggle('hidden');
                            }}
                            className="text-xs font-black uppercase text-primary hover:underline flex items-center gap-2"
                        >
                            <HelpCircle className="w-4 h-4" />
                            How to get my Response Sheet URL?
                        </button>
                        <div className="hidden mt-4 bg-white border-2 border-slate-200 p-4 space-y-3">
                            <ol className="list-decimal list-inside text-sm font-bold text-slate-700 space-y-2">
                                <li>Log in to the official **NTA JEE Main portal**.</li>
                                <li>Click on **'View Response Sheet'** button.</li>
                                <li>The sheet will open in a new tab. **Copy the full URL** from the address bar.</li>
                                <li>Paste it in the box above and click submit.</li>
                            </ol>
                            <p className="text-[10px] font-black uppercase text-slate-400">Note: We only use the URL to parse your score. Your data remains private.</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-10">
                    <div className="h-1 flex-1 bg-slate-200"></div>
                    <span className="text-xs font-black uppercase text-slate-400 tracking-widest px-4">OR USE MANUAL INPUT</span>
                    <div className="h-1 flex-1 bg-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Input Side */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Subject Tabs */}
                        <div className="flex border-4 border-foreground bg-slate-100 p-2 gap-2">
                            {(Object.keys(data) as Subject[]).map(sub => (
                                <button
                                    key={sub}
                                    onClick={() => setActiveSubject(sub)}
                                    className={`flex-1 py-3 px-2 font-black uppercase text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border-2 ${activeSubject === sub
                                        ? "bg-foreground text-white border-foreground"
                                        : "bg-white text-foreground border-transparent hover:border-slate-300"
                                        }`}
                                >
                                    {sub === "Physics" && <Zap className="w-4 h-4" />}
                                    {sub === "Chemistry" && <Beaker className="w-4 h-4" />}
                                    {sub === "Mathematics" && <FunctionSquare className="w-4 h-4" />}
                                    <span className="hidden sm:inline">{sub}</span>
                                    <span className="sm:hidden">{sub[0]}</span>
                                </button>
                            ))}
                        </div>

                        {/* Subject Input Fields */}
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                            <div className="bg-blue-50 border-l-[8px] border-blue-600 p-4 mb-4">
                                <h4 className="font-black uppercase text-blue-900 flex items-center gap-2">
                                    <Atom className="w-5 h-5" />
                                    Section A: MCQs (20 Questions)
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">Correct (+4)</label>
                                    <input
                                        type="number"
                                        value={data[activeSubject].correctMCQ}
                                        onChange={(e) => handleInputChange(activeSubject, "correctMCQ", e.target.value)}
                                        placeholder="0-20"
                                        className="w-full bg-slate-50 border-4 border-foreground p-4 text-xl font-black focus:bg-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">Incorrect (-1)</label>
                                    <input
                                        type="number"
                                        value={data[activeSubject].incorrectMCQ}
                                        onChange={(e) => handleInputChange(activeSubject, "incorrectMCQ", e.target.value)}
                                        placeholder="0-20"
                                        className="w-full bg-slate-50 border-4 border-foreground p-4 text-xl font-black focus:bg-white focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="bg-amber-50 border-l-[8px] border-amber-500 p-4 mt-8">
                                <h4 className="font-black uppercase text-amber-900 flex items-center gap-2">
                                    <Target className="w-5 h-5" />
                                    Section B: Numerical (5 Questions)
                                </h4>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Correct (+4) - No Negative Marking</label>
                                <input
                                    type="number"
                                    value={data[activeSubject].correctNumerical}
                                    onChange={(e) => handleInputChange(activeSubject, "correctNumerical", e.target.value)}
                                    placeholder="0-5"
                                    className="w-full bg-slate-50 border-4 border-foreground p-4 text-xl font-black focus:bg-white focus:outline-none"
                                />
                            </div>
                        </div>

                        <button onClick={reset} className="flex items-center gap-2 text-xs font-black uppercase text-primary hover:underline">
                            <RefreshCw className="w-4 h-4" /> Reset All Subjects
                        </button>
                    </div>

                    {/* Output Side */}
                    <div className="lg:col-span-5 flex flex-col gap-6">

                        {!isUnlocked ? (
                            <div className="bg-foreground text-white p-8 border-b-[12px] border-primary min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10"><Trophy className="w-40 h-40" /></div>

                                {!showLeadForm ? (
                                    <div className="relative z-10 transition-all">
                                        <Zap className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
                                        <h3 className="text-3xl font-black uppercase mb-4 leading-none">JEE Result Locked</h3>
                                        <p className="text-slate-400 font-bold mb-8">Enter details to view your subject-wise score and 2026 percentile.</p>
                                        <button
                                            onClick={() => setShowLeadForm(true)}
                                            className="w-full bg-primary text-white border-4 border-white px-8 py-4 text-xl font-black uppercase hover:bg-white hover:text-primary transition-all"
                                        >
                                            Unlock Results
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleLeadSubmit} className="relative z-10 w-full space-y-4">
                                        <input required type="text" placeholder="Full Name" value={leadData.name} onChange={e => setLeadData({ ...leadData, name: e.target.value })} className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40" />
                                        <input required type="tel" placeholder="WhatsApp Number" value={leadData.number} onChange={e => setLeadData({ ...leadData, number: e.target.value })} className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40" />
                                        <input required type="email" placeholder="Email" value={leadData.email} onChange={e => setLeadData({ ...leadData, email: e.target.value })} className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40" />
                                        <input required type="text" placeholder="Location" value={leadData.location} onChange={e => setLeadData({ ...leadData, location: e.target.value })} className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40" />
                                        <button type="submit" className="w-full bg-primary text-white p-4 font-black uppercase hover:bg-white hover:text-primary transition-all">Show Final Rank</button>
                                        <button type="button" onClick={() => setShowLeadForm(false)} className="text-xs font-bold text-white/50 uppercase">Back</button>
                                    </form>
                                )}
                            </div>
                        ) : (
                            <div className="bg-foreground text-white p-8 border-b-[12px] border-primary animate-in zoom-in duration-500">
                                <span className="text-xs font-black uppercase tracking-widest text-primary mb-4 block">Total Raw Score</span>
                                <div className="text-8xl font-black mb-2 leading-none">{stats.totalScore}</div>
                                <div className="text-xl font-bold text-slate-400">Predicted Percentile: <span className="text-white">~{stats.percentile}+</span></div>

                                <div className="mt-8 border-t-2 border-white/10 pt-6 space-y-4">
                                    {Object.entries(stats.subjectScores).map(([sub, score]) => (
                                        <div key={sub} className="flex justify-between items-center">
                                            <span className="text-sm font-black uppercase tracking-tight text-slate-400">{sub}</span>
                                            <span className="text-xl font-black">{score}/100</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={`bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(33,150,243,1)] transition-all ${!isUnlocked ? "blur-md grayscale pointer-events-none opacity-50" : ""}`}>
                            <div className="text-xs font-black uppercase text-slate-500 mb-2">Overall Accuracy</div>
                            <div className="text-3xl font-black">{stats.accuracy.toFixed(1)}%</div>
                            <div className="w-full bg-slate-100 h-3 mt-4 border-2 border-foreground overflow-hidden">
                                <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${stats.accuracy}%` }} />
                            </div>
                        </div>

                        <button
                            onClick={() => setShowInquiry(true)}
                            className="w-full bg-primary text-white p-6 border-4 border-foreground group hover:bg-black transition-colors text-left"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-xs font-black uppercase mb-1">Low Score? Don't Panic.</div>
                                    <div className="text-lg font-black uppercase">Plan Your B.Tech Admission</div>
                                </div>
                                <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform flex-shrink-0" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Inquiry Modal */}
                {showInquiry && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[32px_32px_0px_0px_rgba(0,0,0,1)] border-8 border-foreground">
                            <button
                                onClick={() => setShowInquiry(false)}
                                className="absolute top-4 right-4 z-[110] bg-white border-4 border-foreground p-2 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                aria-label="Close"
                            >
                                <X className="h-6 w-6 stroke-[3px]" />
                            </button>
                            <div className="bg-white">
                                <div className="bg-primary p-8 text-center border-b-8 border-foreground">
                                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Let Us Help You!</h2>
                                    <p className="text-blue-50 font-bold mt-2">Share your details and plan your B.Tech admission with Mohit Jain.</p>
                                </div>
                                <div className="p-4 md:p-8">
                                    <InquiryForm />
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 -z-10" onClick={() => setShowInquiry(false)} />
                    </div>
                )}

                {/* Important Note */}
                <div className="mt-12 p-6 bg-slate-50 border-4 border-foreground flex gap-4">
                    <AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <div className="text-xs sm:text-sm font-bold text-slate-600 leading-tight">
                        <strong className="text-foreground uppercase block mb-1">JEE Main 2026 Important Update:</strong>
                        According to the latest NTA circular, Section B (Numerical Questions) negative marking varies. MCQs (-1). Section B (Numerical Value Questions) do not have negative marking for 2025/2026 sessions for correct/incorrect inputs respectively as per current data. Please refer to your official NTA bulletin for exact shift-wise rules.
                    </div>
                </div>
            </div>
        </div>
    );
}
