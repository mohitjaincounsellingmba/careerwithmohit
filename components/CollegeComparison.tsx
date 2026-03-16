"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { CollegeMetadata } from "@/lib/colleges";
import { Search, ChevronDown, Check, ArrowRightLeft, X } from "lucide-react";

interface CollegeComparisonProps {
    colleges: CollegeMetadata[];
}

export function CollegeComparison({ colleges }: CollegeComparisonProps) {
    const [collegeAId, setCollegeAId] = useState<string | null>(null);
    const [collegeBId, setCollegeBId] = useState<string | null>(null);

    const collegeA = useMemo(() => colleges.find(c => c.slug === collegeAId) || null, [collegeAId, colleges]);
    const collegeB = useMemo(() => colleges.find(c => c.slug === collegeBId) || null, [collegeBId, colleges]);

    return (
        <div className="w-full">
            {/* College Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16 relative">
                {/* Visual VS graphic for larger screens */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 bg-accent rounded-full border-4 border-foreground items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-black text-2xl text-foreground">VS</span>
                </div>

                <div className="relative z-20">
                    <div className="bg-primary text-white font-black uppercase tracking-widest text-sm py-2 px-6 inline-block border-4 border-b-0 border-foreground">
                        College A
                    </div>
                    <div className="border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <CollegeSelector
                            colleges={colleges}
                            selectedId={collegeAId}
                            onSelect={setCollegeAId}
                            placeholder="Select first college..."
                            disabledId={collegeBId}
                        />
                    </div>
                </div>

                {/* Visual VS graphic for mobile */}
                <div className="flex md:hidden justify-center -my-4 relative z-10 w-full">
                    <div className="w-16 h-16 bg-accent rounded-full border-4 border-foreground flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="font-black text-xl text-foreground">VS</span>
                    </div>
                </div>

                <div className="relative z-20">
                    <div className="bg-secondary text-white font-black uppercase tracking-widest text-sm py-2 px-6 inline-block border-4 border-b-0 border-foreground">
                        College B
                    </div>
                    <div className="border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <CollegeSelector
                            colleges={colleges}
                            selectedId={collegeBId}
                            onSelect={setCollegeBId}
                            placeholder="Select second college..."
                            disabledId={collegeAId}
                        />
                    </div>
                </div>
            </div>

            {/* Comparison Display */}
            {(!collegeA || !collegeB) ? (
                <div className="border-4 border-dashed border-slate-300 bg-slate-100 p-16 text-center">
                    <ArrowRightLeft className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">
                        Select two colleges to begin battle
                    </h3>
                </div>
            ) : (
                <div className="border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    {/* Header Row */}
                    <div className="grid grid-cols-2 border-b-8 border-foreground bg-slate-50">
                        <div className="p-6 md:p-10 border-r-4 border-foreground">
                            {collegeA.logo && (
                                <img src={collegeA.logo} alt={collegeA.name} className="h-16 md:h-20 w-auto object-contain mb-6 mix-blend-multiply" />
                            )}
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-none mb-2 text-primary">{collegeA.name}</h2>
                            <p className="font-bold text-slate-500 uppercase tracking-wider text-sm">{collegeA.location}</p>
                        </div>
                        <div className="p-6 md:p-10">
                            {collegeB.logo && (
                                <img src={collegeB.logo} alt={collegeB.name} className="h-16 md:h-20 w-auto object-contain mb-6 mix-blend-multiply" />
                            )}
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-none mb-2 text-secondary">{collegeB.name}</h2>
                            <p className="font-bold text-slate-500 uppercase tracking-wider text-sm">{collegeB.location}</p>
                        </div>
                    </div>

                    {/* Data Rows */}
                    <ComparisonRow
                        label="Ranking"
                        valA={collegeA.ranking}
                        valB={collegeB.ranking}
                        isWinnerA={null}
                    />
                    <ComparisonRow
                        label="Average Package"
                        valA={collegeA.avg_placement}
                        valB={collegeB.avg_placement}
                        isWinnerA={comparePackages(collegeA.avg_placement, collegeB.avg_placement)}
                    />
                    <ComparisonRow
                        label="Highest Package"
                        valA={collegeA.highest_placement}
                        valB={collegeB.highest_placement}
                        isWinnerA={comparePackages(collegeA.highest_placement, collegeB.highest_placement)}
                        bg="bg-slate-50"
                    />
                    <ComparisonRow
                        label="Total Fees"
                        valA={collegeA.fees}
                        valB={collegeB.fees}
                        isWinnerA={compareFees(collegeA.fees, collegeB.fees)}
                    />
                    <ComparisonRow
                        label="Exams Accepted"
                        valA={collegeA.exams.join(", ")}
                        valB={collegeB.exams.join(", ")}
                        isWinnerA={null}
                        bg="bg-slate-50"
                    />
                    <ComparisonRow
                        label="Courses Offered"
                        valA={collegeA.courses.join(", ")}
                        valB={collegeB.courses.join(", ")}
                        isWinnerA={null}
                    />
                    <ComparisonRow
                        label="Type & Established"
                        valA={`${collegeA.ownership} (${collegeA.established})`}
                        valB={`${collegeB.ownership} (${collegeB.established})`}
                        isWinnerA={null}
                        bg="bg-slate-50"
                    />
                    
                    {/* Action Row */}
                    <div className="grid grid-cols-2 border-t-8 border-foreground">
                        <div className="p-6 md:p-8 flex justify-center border-r-4 border-foreground bg-primary/10">
                            <a href={`/colleges/${collegeA.slug}`} className="bg-foreground text-white font-black uppercase tracking-widest px-8 py-4 hover:bg-primary transition-colors text-sm md:text-base border-2 border-transparent hover:border-foreground">
                                View Profile
                            </a>
                        </div>
                        <div className="p-6 md:p-8 flex justify-center bg-secondary/10">
                            <a href={`/colleges/${collegeB.slug}`} className="bg-foreground text-white font-black uppercase tracking-widest px-8 py-4 hover:bg-secondary transition-colors text-sm md:text-base border-2 border-transparent hover:border-foreground">
                                View Profile
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper component for the dropdown selector
function CollegeSelector({ 
    colleges, 
    selectedId, 
    onSelect, 
    placeholder,
    disabledId 
}: { 
    colleges: CollegeMetadata[]; 
    selectedId: string | null; 
    onSelect: (id: string | null) => void;
    placeholder: string;
    disabledId: string | null;
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

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 md:p-6 bg-white hover:bg-slate-100 transition-colors text-left"
            >
                {selectedCollege ? (
                    <div>
                        <div className="font-black text-lg md:text-xl text-foreground line-clamp-1">{selectedCollege.name}</div>
                        <div className="font-bold text-sm text-slate-500 uppercase">{selectedCollege.location}</div>
                    </div>
                ) : (
                    <span className="font-bold text-slate-400 text-lg">{placeholder}</span>
                )}
                {selectedCollege ? (
                    <div className="p-2 ml-4 flex-shrink-0" onClick={(e) => { e.stopPropagation(); onSelect(null); }}>
                        <X className="w-6 h-6 text-slate-400 hover:text-red-500" />
                    </div>
                ) : (
                    <ChevronDown className="w-6 h-6 text-foreground flex-shrink-0 ml-4" />
                )}
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-96 flex flex-col">
                    <div className="p-4 border-b-4 border-foreground sticky top-0 bg-white">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                className="w-full border-2 border-foreground bg-slate-50 pl-12 pr-4 py-3 font-bold text-foreground focus:outline-none focus:border-primary focus:bg-white"
                                placeholder="Search college or city..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto overflow-x-hidden flex-1 p-2 space-y-1">
                        {filteredColleges.length === 0 ? (
                            <div className="p-6 text-center font-bold text-slate-500">No colleges found</div>
                        ) : (
                            filteredColleges.map(college => (
                                <button
                                    key={college.slug}
                                    className={`w-full text-left p-4 hover:bg-primary hover:text-white transition-colors flex items-center justify-between group ${selectedId === college.slug ? 'bg-primary/10' : ''}`}
                                    onClick={() => {
                                        onSelect(college.slug);
                                        setIsOpen(false);
                                        setSearch("");
                                    }}
                                >
                                    <div>
                                        <div className={`font-bold text-lg leading-tight mb-1 group-hover:text-white ${selectedId === college.slug ? 'text-primary' : 'text-foreground'}`}>
                                            {college.name}
                                        </div>
                                        <div className={`text-sm uppercase font-bold group-hover:text-white/80 ${selectedId === college.slug ? 'text-primary/70' : 'text-slate-500'}`}>
                                            {college.location}
                                        </div>
                                    </div>
                                    {selectedId === college.slug && <Check className="w-5 h-5 text-primary group-hover:text-white flex-shrink-0" />}
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
    valA, 
    valB, 
    isWinnerA, 
    bg = "bg-white" 
}: { 
    label: string; 
    valA: string; 
    valB: string; 
    isWinnerA: boolean | null; // true means A is better, false means B is better, null means neutral/can't compute
    bg?: string;
}) {
    // If we have a clear winner, we show a green bg for the winner cell.
    const isAWinner = isWinnerA === true;
    const isBWinner = isWinnerA === false;

    return (
        <div className={`border-b-4 border-foreground grid grid-cols-1 md:grid-cols-12 ${bg}`}>
            {/* Label (centered on mobile, left on desktop) */}
            <div className="md:col-span-12 p-2 border-b-2 border-slate-200 md:border-none bg-slate-100 md:bg-transparent text-center">
                <span className="bg-foreground text-white uppercase text-xs font-black tracking-widest px-3 py-1 inline-block">
                    {label}
                </span>
            </div>
            
            <div className="grid grid-cols-2 md:col-span-12">
                <div className={`p-6 md:p-8 font-bold text-lg md:text-xl flex flex-col items-center justify-center text-center border-r-4 border-foreground ${isAWinner ? 'bg-green-100 text-green-900 border-l-8 border-l-green-500' : 'text-foreground'} transition-colors duration-500`}>
                    {valA}
                </div>
                <div className={`p-6 md:p-8 font-bold text-lg md:text-xl flex flex-col items-center justify-center text-center ${isBWinner ? 'bg-green-100 text-green-900 border-l-8 border-l-green-500' : 'text-foreground'} transition-colors duration-500`}>
                    {valB}
                </div>
            </div>
        </div>
    );
}

// Logic to extract number from formatted strings like "₹25.13 LPA" or "₹16.00 Lakhs"
function extractNumber(str: string): number {
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
function comparePackages(a: string, b: string): boolean | null {
    const numA = extractNumber(a);
    const numB = extractNumber(b);
    if (!numA || !numB) return null;
    if (numA === numB) return null;
    return numA > numB;
}

function compareFees(a: string, b: string): boolean | null {
    const numA = extractNumber(a);
    const numB = extractNumber(b);
    if (!numA || !numB) return null;
    if (numA === numB) return null;
    return numA < numB; // For fees, lower is better (winner)
}
