"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { CollegeMetadata } from "@/lib/colleges";
import { Search, ChevronDown, Check, ArrowRightLeft, X, TrendingUp, IndianRupee, Trophy, GraduationCap, MapPin, Building2, BookOpen } from "lucide-react";

interface CollegeComparisonProps {
    colleges: CollegeMetadata[];
}

export function CollegeComparison({ colleges }: CollegeComparisonProps) {
    const [collegeAId, setCollegeAId] = useState<string | null>(null);
    const [collegeBId, setCollegeBId] = useState<string | null>(null);

    const collegeA = useMemo(() => colleges.find(c => c.slug === collegeAId) || null, [collegeAId, colleges]);
    const collegeB = useMemo(() => colleges.find(c => c.slug === collegeBId) || null, [collegeBId, colleges]);

    return (
        <div className="w-full relative">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

            {/* College Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12 relative z-20">
                {/* Visual VS graphic */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg border border-slate-100 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 font-black text-xl italic drop-shadow-sm">
                    VS
                </div>

                <div className="relative">
                    <div className="mb-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-xs">01</div>
                        <span className="font-black text-sm uppercase tracking-widest text-slate-500">First College</span>
                    </div>
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 transition-all hover:border-blue-300 hover:shadow-md">
                        <CollegeSelector
                            colleges={colleges}
                            selectedId={collegeAId}
                            onSelect={setCollegeAId}
                            placeholder="Select first college..."
                            disabledId={collegeBId}
                            theme="blue"
                        />
                    </div>
                </div>

                {/* Mobile VS */}
                <div className="flex md:hidden justify-center -my-2 relative z-30 w-full">
                    <div className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg border border-slate-100 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 font-black italic flex drop-shadow-sm">
                        VS
                    </div>
                </div>

                <div className="relative">
                    <div className="mb-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-black text-xs">02</div>
                        <span className="font-black text-sm uppercase tracking-widest text-slate-500">Second College</span>
                    </div>
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 transition-all hover:border-purple-300 hover:shadow-md">
                        <CollegeSelector
                            colleges={colleges}
                            selectedId={collegeBId}
                            onSelect={setCollegeBId}
                            placeholder="Select second college..."
                            disabledId={collegeAId}
                            theme="purple"
                        />
                    </div>
                </div>
            </div>

            {/* Comparison Display */}
            {(!collegeA || !collegeB) ? (
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-16 text-center max-w-3xl mx-auto mt-8 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <ArrowRightLeft className="w-16 h-16 text-slate-300 mx-auto mb-6 relative z-10" />
                    <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest relative z-10">
                        Select two colleges to start comparing
                    </h3>
                    <p className="text-slate-500 font-medium mt-4 relative z-10">Compare ROI, Fees, Placements side-by-side.</p>
                </div>
            ) : (
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden relative z-10 pb-8">
                    {/* Header Row */}
                    <div className="grid grid-cols-2 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
                        <div className="p-8 md:p-12 border-r border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mt-20 -mr-20 pointer-events-none" />
                            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-3 mb-6 relative z-10">
                                {collegeA.logo ? (
                                    <img src={collegeA.logo} alt={collegeA.name} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                                ) : <GraduationCap className="w-10 h-10 text-blue-300" />}
                            </div>
                            <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight mb-3 text-slate-900 relative z-10">{collegeA.name}</h2>
                            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[10px] md:text-xs relative z-10">
                                <MapPin className="w-3.5 h-3.5 text-blue-500" /> {collegeA.location}
                            </div>
                        </div>
                        <div className="p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -mt-20 -ml-20 pointer-events-none" />
                            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-3 mb-6 relative z-10">
                                {collegeB.logo ? (
                                    <img src={collegeB.logo} alt={collegeB.name} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                                ) : <GraduationCap className="w-10 h-10 text-purple-300" />}
                            </div>
                            <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight mb-3 text-slate-900 relative z-10">{collegeB.name}</h2>
                            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-[10px] md:text-xs relative z-10">
                                <MapPin className="w-3.5 h-3.5 text-purple-500" /> {collegeB.location}
                            </div>
                        </div>
                    </div>

                    {/* Data Rows */}
                    <div className="px-4 md:px-8 py-4">
                        <ComparisonRow
                            label="Total Fees"
                            icon={<IndianRupee className="w-4 h-4" />}
                            valA={collegeA.fees}
                            valB={collegeB.fees}
                            isWinnerA={compareFees(collegeA.fees, collegeB.fees)}
                        />
                        <ComparisonRow
                            label="Average Package"
                            icon={<TrendingUp className="w-4 h-4" />}
                            valA={collegeA.avg_placement}
                            valB={collegeB.avg_placement}
                            isWinnerA={comparePackages(collegeA.avg_placement, collegeB.avg_placement)}
                        />
                        <ComparisonRow
                            label="Highest Package"
                            icon={<Trophy className="w-4 h-4" />}
                            valA={collegeA.highest_placement || "N/A"}
                            valB={collegeB.highest_placement || "N/A"}
                            isWinnerA={comparePackages(collegeA.highest_placement, collegeB.highest_placement)}
                        />
                        <ComparisonRow
                            label="Recognitions & Ranking"
                            icon={<Award className="w-4 h-4" />}
                            valA={collegeA.ranking}
                            valB={collegeB.ranking}
                            isWinnerA={null}
                        />
                        <ComparisonRow
                            label="Exams Accepted"
                            icon={<BookOpen className="w-4 h-4" />}
                            valA={collegeA.exams.join(", ")}
                            valB={collegeB.exams.join(", ")}
                            isWinnerA={null}
                        />
                        <ComparisonRow
                            label="Courses Offered"
                            icon={<GraduationCap className="w-4 h-4" />}
                            valA={collegeA.courses.join(", ")}
                            valB={collegeB.courses.join(", ")}
                            isWinnerA={null}
                        />
                        <ComparisonRow
                            label="Type & Established"
                            icon={<Building2 className="w-4 h-4" />}
                            valA={`${collegeA.ownership} (${collegeA.established})`}
                            valB={`${collegeB.ownership} (${collegeB.established})`}
                            isWinnerA={null}
                        />
                    </div>
                    
                    {/* Action Row */}
                    <div className="grid grid-cols-2 gap-4 px-8 mt-4 rounded-b-[2.5rem]">
                        <div className="flex justify-center">
                            <a href={`/colleges/${collegeA.slug}`} className="w-full text-center bg-slate-900 text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-md shadow-slate-200 text-xs md:text-sm">
                                View Profile
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <a href={`/colleges/${collegeB.slug}`} className="w-full text-center bg-slate-900 text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-purple-600 transition-all shadow-md shadow-slate-200 text-xs md:text-sm">
                                View Profile
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const Award = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
)

// Helper component for the dropdown selector
function CollegeSelector({ 
    colleges, 
    selectedId, 
    onSelect, 
    placeholder,
    disabledId,
    theme
}: { 
    colleges: CollegeMetadata[]; 
    selectedId: string | null; 
    onSelect: (id: string | null) => void;
    placeholder: string;
    disabledId: string | null;
    theme: "blue" | "purple";
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedCollege = colleges.find(c => c.slug === selectedId);
    
    // Filter out the college selected in the OTHER dropdown
    const availableColleges = colleges.filter(c => c.slug !== disabledId);
    
    const filteredColleges = availableColleges.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.location.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const themeColors = {
        blue: { icon: "text-blue-500", hover: "hover:bg-blue-50", text: "text-blue-600" },
        purple: { icon: "text-purple-500", hover: "hover:bg-purple-50", text: "text-purple-600" },
    }[theme];

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 md:p-6 bg-transparent transition-colors text-left rounded-3xl"
            >
                {selectedCollege ? (
                    <div>
                        <div className="font-black text-lg text-slate-900 line-clamp-1">{selectedCollege.name}</div>
                        <div className="font-bold text-xs text-slate-400 uppercase tracking-wider mt-0.5">{selectedCollege.location}</div>
                    </div>
                ) : (
                    <span className="font-bold text-slate-400 text-base">{placeholder}</span>
                )}
                {selectedCollege ? (
                    <div className="p-2 ml-4 flex-shrink-0 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors" onClick={(e) => { e.stopPropagation(); onSelect(null); }}>
                        <X className="w-4 h-4 text-slate-400 hover:text-red-500" />
                    </div>
                ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                )}
            </button>

            {isOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-white border border-slate-200 shadow-2xl rounded-3xl max-h-96 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                className="w-full border border-slate-200 bg-white rounded-2xl pl-12 pr-4 py-3 font-semibold text-sm text-slate-800 focus:outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100 transition-all placeholder:text-slate-400 placeholder:font-medium"
                                placeholder="Search college or city..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 p-2 space-y-1">
                        {filteredColleges.length === 0 ? (
                            <div className="p-6 text-center font-bold text-sm text-slate-400">No colleges found</div>
                        ) : (
                            filteredColleges.map(college => (
                                <button
                                    key={college.slug}
                                    className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between group ${selectedId === college.slug ? 'bg-slate-50' : `hover:bg-slate-50`}`}
                                    onClick={() => {
                                        onSelect(college.slug);
                                        setIsOpen(false);
                                        setSearch("");
                                    }}
                                >
                                    <div>
                                        <div className={`font-black text-sm leading-tight mb-1 transition-colors ${selectedId === college.slug ? themeColors.text : 'text-slate-700'}`}>
                                            {college.name}
                                        </div>
                                        <div className={`text-[10px] uppercase font-bold tracking-wider ${selectedId === college.slug ? themeColors.text + ' opacity-70' : 'text-slate-400'}`}>
                                            {college.location}
                                        </div>
                                    </div>
                                    {selectedId === college.slug && <Check className={`w-4 h-4 flex-shrink-0 ${themeColors.text}`} />}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Component for a single comparison row
function ComparisonRow({ 
    label, 
    icon,
    valA, 
    valB, 
    isWinnerA, 
}: { 
    label: string; 
    icon: React.ReactNode;
    valA: string | undefined | null; 
    valB: string | undefined | null; 
    isWinnerA: boolean | null; // true means A is better, false means B is better, null means neutral/can't compute
}) {
    const isAWinner = isWinnerA === true;
    const isBWinner = isWinnerA === false;

    // Use placeholder if a value is entirely missing
    const showValA = valA || "—";
    const showValB = valB || "—";

    return (
        <div className="mb-4 last:mb-0">
            {/* Label */}
            <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                    {icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
            </div>
            
            {/* Data Columns */}
            <div className="grid grid-cols-2 gap-4">
                <div className={`rounded-2xl p-5 md:p-6 flex items-center justify-center text-center transition-all duration-300 ${isAWinner ? 'bg-emerald-50 border border-emerald-100 shadow-sm' : 'bg-slate-50 border border-slate-100'}`}>
                    <span className={`font-black text-sm md:text-base ${isAWinner ? 'text-emerald-700' : 'text-slate-700'}`}>
                        {showValA}
                    </span>
                    {isAWinner && <span className="ml-2 flex-shrink-0 bg-emerald-100 text-emerald-600 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md">Winner</span>}
                </div>
                <div className={`rounded-2xl p-5 md:p-6 flex items-center justify-center text-center transition-all duration-300 ${isBWinner ? 'bg-emerald-50 border border-emerald-100 shadow-sm' : 'bg-slate-50 border border-slate-100'}`}>
                    <span className={`font-black text-sm md:text-base ${isBWinner ? 'text-emerald-700' : 'text-slate-700'}`}>
                        {showValB}
                    </span>
                    {isBWinner && <span className="ml-2 flex-shrink-0 bg-emerald-100 text-emerald-600 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md">Winner</span>}
                </div>
            </div>
        </div>
    );
}

// Logic to extract number from formatted strings like "₹25.13 LPA" or "₹16.00 Lakhs"
function extractNumber(str: string | undefined | null): number {
    if (!str) return 0;
    const cleanStr = str.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleanStr);
    
    // Convert Crores to Lakhs so maths works out (1 Crore = 100 Lakhs)
    if (str.toLowerCase().includes('crore')) {
        return num * 100;
    }
    return isNaN(num) ? 0 : num;
}

// Returns true if A > B, false if B > A, null if equal or unparseable
function comparePackages(a: string | undefined | null, b: string | undefined | null): boolean | null {
    const numA = extractNumber(a);
    const numB = extractNumber(b);
    if (!numA || !numB) return null;
    if (numA === numB) return null;
    return numA > numB;
}

function compareFees(a: string | undefined | null, b: string | undefined | null): boolean | null {
    const numA = extractNumber(a);
    const numB = extractNumber(b);
    if (!numA || !numB) return null;
    if (numA === numB) return null;
    return numA < numB; // For fees, lower is better (winner)
}

