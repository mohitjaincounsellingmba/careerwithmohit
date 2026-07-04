"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CollegeMetadata } from "@/lib/colleges";
import { CompareDrawer } from "@/components/CompareDrawer";
import { InquiryForm } from "@/components/InquiryForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  Search, 
  X, 
  MapPin, 
  GraduationCap, 
  IndianRupee, 
  Briefcase, 
  Filter, 
  ChevronDown, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Download, 
  CheckSquare, 
  Square, 
  ChevronRight, 
  Check, 
  Layers, 
  BookOpen,
  DollarSign, 
  Building,
  HelpCircle,
  ExternalLink
} from "lucide-react";

interface TrendingBlog {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

export function MbaCollegesPuneClient({ 
  colleges, 
  trendingBlogs = [] 
}: { 
  colleges: CollegeMetadata[]; 
  trendingBlogs?: TrendingBlog[] 
}) {
  const router = useRouter();
  const [comparedColleges, setComparedColleges] = useState<CollegeMetadata[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeeRange, setSelectedFeeRange] = useState("All Fees");
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [selectedOwnership, setSelectedOwnership] = useState("All Types");
  const [sortBy, setSortBy] = useState("default");
  
  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState("list"); // list, matrix, cutoffs, placements

  const handleCompareToggle = (slug: string) => {
    setComparedColleges((prev) => {
      const exists = prev.some((c) => c.slug === slug);
      if (exists) {
        return prev.filter((c) => c.slug !== slug);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 colleges at a time!");
        return prev;
      }
      const collegeToAdd = colleges.find((c) => c.slug === slug);
      return collegeToAdd ? [...prev, collegeToAdd] : prev;
    });
  };

  const handleClearAllCompare = () => setComparedColleges([]);
  const handleCompareNow = () => {
    const slugsStr = comparedColleges.map((c) => c.slug).join(",");
    router.push(`/colleges/compare?slugs=${slugsStr}`);
  };

  // Extract Stats
  const stats = useMemo(() => {
    const total = colleges.length;
    
    // Find min and max fees
    let minFee = Infinity;
    let maxFee = -Infinity;
    let highestPlacement = 0;
    
    colleges.forEach(c => {
      // Parse fee
      const feeStr = c.fees.replace(/[₹,\s]/g, '').toLowerCase();
      let feeNum = parseFloat(feeStr);
      if (feeStr.includes('lakh')) feeNum *= 100000;
      else if (feeStr.includes('l')) feeNum *= 100000;
      
      if (!isNaN(feeNum) && feeNum > 0) {
        if (feeNum < minFee) minFee = feeNum;
        if (feeNum > maxFee) maxFee = feeNum;
      }

      // Parse highest placement
      const salStr = c.highest_placement ? c.highest_placement.replace(/[₹,\s]/g, '').toLowerCase() : "";
      let salNum = parseFloat(salStr);
      if (salStr.includes('lpa')) salNum *= 100000;
      if (!isNaN(salNum) && salNum > highestPlacement) {
        highestPlacement = salNum;
      }
    });

    const formatLakhs = (val: number) => {
      if (val === Infinity || val === -Infinity) return "N/A";
      return `₹${(val / 100000).toFixed(1)} L`;
    };

    const formatLpa = (val: number) => {
      return `₹${(val / 100000).toFixed(1)} LPA`;
    };

    return {
      total,
      feesRange: `${formatLakhs(minFee)} - ${formatLakhs(maxFee)}`,
      highestPackage: formatLpa(highestPlacement),
      topExams: "SNAP, MAH CET, CAT"
    };
  }, [colleges]);

  // Unique exams list
  const examsList = useMemo(() => {
    const exams = new Set<string>();
    colleges.forEach(c => (c.exams || []).forEach(e => exams.add(e)));
    return ["All Exams", ...Array.from(exams)].sort();
  }, [colleges]);

  // Filter and Sort Colleges
  const filteredColleges = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    let result = colleges.filter(college => {
      const matchesSearch = !query || 
        college.name.toLowerCase().includes(query) ||
        college.location.toLowerCase().includes(query) ||
        (college.exams || []).some(exam => exam.toLowerCase().includes(query));

      const matchesExam = selectedExam === "All Exams" || (college.exams || []).includes(selectedExam);
      const matchesOwnership = selectedOwnership === "All Types" || college.ownership.toLowerCase().includes(selectedOwnership.toLowerCase());

      let matchesFee = true;
      if (selectedFeeRange !== "All Fees") {
        const feeStr = college.fees.replace(/[₹,]/g, '').toLowerCase();
        let feeNum = parseFloat(feeStr);
        if (feeStr.includes('lakh') || feeStr.includes('l')) feeNum *= 100000;

        if (selectedFeeRange === "< 5 Lakhs") matchesFee = feeNum < 500000;
        else if (selectedFeeRange === "5-15 Lakhs") matchesFee = feeNum >= 500000 && feeNum <= 1500000;
        else if (selectedFeeRange === "> 15 Lakhs") matchesFee = feeNum > 1500000;
      }

      return matchesSearch && matchesExam && matchesOwnership && matchesFee;
    });

    // Sorting
    if (sortBy === "salary_desc") {
      result = [...result].sort((a, b) => {
        const getSal = (c: CollegeMetadata) => {
          const str = c.avg_placement.replace(/[₹,\s]/g, '').toLowerCase();
          let num = parseFloat(str);
          if (str.includes('lpa')) num *= 100000;
          return isNaN(num) ? 0 : num;
        };
        return getSal(b) - getSal(a);
      });
    } else if (sortBy === "fees_asc") {
      result = [...result].sort((a, b) => {
        const getFee = (c: CollegeMetadata) => {
          const str = c.fees.replace(/[₹,\s]/g, '').toLowerCase();
          let num = parseFloat(str);
          if (str.includes('lakh') || str.includes('l')) num *= 100000;
          return isNaN(num) ? Infinity : num;
        };
        return getFee(a) - getFee(b);
      });
    } else if (sortBy === "ranking") {
      result = [...result].sort((a, b) => {
        const getRank = (c: CollegeMetadata) => {
          const match = c.ranking.match(/#?(\d+)/);
          return match ? parseInt(match[1]) : 999;
        };
        return getRank(a) - getRank(b);
      });
    }

    return result;
  }, [colleges, searchQuery, selectedExam, selectedOwnership, selectedFeeRange, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedFeeRange("All Fees");
    setSelectedExam("All Exams");
    setSelectedOwnership("All Types");
    setSortBy("default");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32 font-body text-foreground">
      {/* Neo-brutalist Hero Banner */}
      <section className="bg-foreground text-white border-b-8 border-foreground py-16 px-6 sm:px-12 relative overflow-hidden">
        {/* Absolute Deco Grids */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-brand/10 rounded-full translate-x-20 -translate-y-20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Breadcrumbs />
          
          <div className="mt-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div>
              <span className="bg-primary-brand text-white font-black uppercase text-xs tracking-widest px-4 py-1.5 border-2 border-white rotate-[-1deg] inline-block mb-4">
                2026 Admissions & Placements Info
              </span>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
                Top MBA Colleges <br />
                <span className="text-primary-brand italic underline decoration-[8px] underline-offset-8">in Pune</span> 2026
              </h1>
              <p className="text-lg sm:text-xl font-bold text-slate-300 max-w-2xl border-l-4 border-primary-brand pl-4 mt-4">
                Compare placements, verified fees, cutoffs, and SNAP/MAH CET requirements. Check out top high-ROI government universities and elite private business schools.
              </p>
            </div>
            
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
              <div className="bg-white border-4 border-foreground text-foreground p-5 shadow-[6px_6px_0px_0px_rgba(244,112,98,1)]">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Total Colleges</span>
                <span className="text-3xl font-black text-foreground">{stats.total} MBA Schools</span>
              </div>
              <div className="bg-white border-4 border-foreground text-foreground p-5 shadow-[6px_6px_0px_0px_rgba(59,130,246,1)]">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Highest Package</span>
                <span className="text-3xl font-black text-primary">{stats.highestPackage}</span>
              </div>
              <div className="bg-white border-4 border-foreground text-foreground p-5 shadow-[6px_6px_0px_0px_rgba(16,185,129,1)]">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Fees Range</span>
                <span className="text-sm font-black text-slate-700 block mt-1">{stats.feesRange}</span>
              </div>
              <div className="bg-white border-4 border-foreground text-foreground p-5 shadow-[6px_6px_0px_0px_rgba(245,158,11,1)]">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Top Exams</span>
                <span className="text-sm font-black text-slate-700 block mt-1">{stats.topExams}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Navigation Tabs (Dashboard Controls) */}
        <div className="flex border-b-4 border-foreground overflow-x-auto no-scrollbar gap-2 sm:gap-4 mb-8">
          {[
            { id: "list", label: "Colleges List", icon: <BookOpen className="w-4 h-4" /> },
            { id: "matrix", label: "Comparison Matrix", icon: <Layers className="w-4 h-4" /> },
            { id: "cutoffs", label: "Admission & Cutoffs", icon: <Award className="w-4 h-4" /> },
            { id: "placements", label: "Placement Statistics", icon: <TrendingUp className="w-4 h-4" /> }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-black uppercase tracking-wider border-t-4 border-x-4 border-foreground transition-all translate-y-[4px] relative z-10 cursor-pointer ${
                  isActive 
                    ? "bg-white text-primary-brand border-b-[4px] border-b-white" 
                    : "bg-slate-100/80 text-slate-600 border-b-4 border-b-foreground hover:bg-slate-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Areas */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Dynamic Left Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {activeTab === "list" && (
              <>
                {/* Search & Simple Filters */}
                <div className="bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
                  <h3 className="text-lg font-black uppercase text-foreground flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary-brand" /> Filter & Search Directory
                  </h3>
                  
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by college name, exam, or location (e.g. Lavale, Tathawade)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-10 py-3 bg-slate-50 border-2 border-foreground font-bold text-sm focus:outline-none focus:bg-white focus:ring-0"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-4 gap-4">
                    {/* Exam Filter */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Exam</label>
                      <select
                        value={selectedExam}
                        onChange={(e) => setSelectedExam(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-foreground py-2 px-3 font-bold text-xs cursor-pointer"
                      >
                        {examsList.map(e => <option key={e} value={e}>{e}</option>)}
                      </select>
                    </div>

                    {/* Fees Filter */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Fees</label>
                      <select
                        value={selectedFeeRange}
                        onChange={(e) => setSelectedFeeRange(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-foreground py-2 px-3 font-bold text-xs cursor-pointer"
                      >
                        <option value="All Fees">All Fees</option>
                        <option value="< 5 Lakhs">&lt; 5 Lakhs</option>
                        <option value="5-15 Lakhs">5 - 15 Lakhs</option>
                        <option value="> 15 Lakhs">&gt; 15 Lakhs</option>
                      </select>
                    </div>

                    {/* Ownership */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Type</label>
                      <select
                        value={selectedOwnership}
                        onChange={(e) => setSelectedOwnership(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-foreground py-2 px-3 font-bold text-xs cursor-pointer"
                      >
                        <option value="All Types">All Types</option>
                        <option value="Private">Private</option>
                        <option value="Public">Public / Govt</option>
                      </select>
                    </div>

                    {/* Sort By */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-foreground py-2 px-3 font-bold text-xs cursor-pointer"
                      >
                        <option value="default">Default</option>
                        <option value="salary_desc">Average Placement (High-Low)</option>
                        <option value="fees_asc">Fees (Low-High)</option>
                        <option value="ranking">Rankings / Fame</option>
                      </select>
                    </div>
                  </div>

                  {/* Reset Filters button */}
                  {(searchQuery || selectedExam !== "All Exams" || selectedFeeRange !== "All Fees" || selectedOwnership !== "All Types" || sortBy !== "default") && (
                    <div className="flex justify-end">
                      <button onClick={resetFilters} className="text-xs font-black text-rose-500 uppercase tracking-wider hover:underline">
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* College Cards List */}
                <div className="space-y-6">
                  {filteredColleges.map((college) => {
                    const isCompared = comparedColleges.some((c) => c.slug === college.slug);
                    return (
                      <div 
                        key={college.slug}
                        className="bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(244,112,98,1)] transition-all flex flex-col md:flex-row justify-between gap-6"
                      >
                        {/* Left Content Side */}
                        <div className="flex-grow space-y-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-slate-100 text-slate-700 font-bold uppercase text-[9px] px-2.5 py-1 border border-slate-200">
                              {college.ownership}
                            </span>
                            <span className="bg-primary/10 text-primary font-black uppercase text-[9px] px-2.5 py-1 flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              {college.ranking || "Top Rated"}
                            </span>
                            <span className="bg-amber-100 text-amber-700 font-black uppercase text-[9px] px-2.5 py-1">
                              Est. {college.established}
                            </span>
                          </div>

                          <div>
                            <Link href={`/colleges/${college.slug}`} className="group inline-flex items-center gap-1">
                              <h4 className="text-2xl font-black uppercase tracking-tight text-foreground group-hover:text-primary-brand transition-colors">
                                {college.name}
                              </h4>
                              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary-brand" />
                            </Link>
                            <p className="text-xs font-bold text-slate-500 flex items-center mt-1">
                              <MapPin className="w-3.5 h-3.5 mr-1" />
                              {college.location}
                            </p>
                          </div>

                          {/* Quick Facts Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 border-2 border-foreground p-4">
                            <div>
                              <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">Total Fees</span>
                              <span className="text-sm font-black text-foreground">{college.fees}</span>
                            </div>
                            <div>
                              <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">Avg Placement</span>
                              <span className="text-sm font-black text-emerald-600">{college.avg_placement}</span>
                            </div>
                            <div>
                              <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">Highest Placement</span>
                              <span className="text-sm font-black text-slate-700">{college.highest_placement || "N/A"}</span>
                            </div>
                            <div>
                              <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">Exams Accepted</span>
                              <span className="text-xs font-bold text-foreground truncate block" title={college.exams.join(', ')}>
                                {college.exams.slice(0, 2).join(', ')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Buttons / Actions Side */}
                        <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 md:border-l-2 md:border-dashed md:border-slate-200 md:pl-6 shrink-0">
                          {/* Compare Toggle */}
                          <button
                            onClick={() => handleCompareToggle(college.slug)}
                            className="flex items-center gap-2 text-slate-700 hover:text-primary-brand transition-colors text-xs font-black cursor-pointer uppercase tracking-wider"
                          >
                            {isCompared ? (
                              <CheckSquare className="w-4 h-4 text-primary-brand" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400" />
                            )}
                            <span>Compare</span>
                          </button>

                          <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto">
                            {college.brochure_url && (
                              <a 
                                href={college.brochure_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border-2 border-foreground py-2 px-4 text-center text-xs font-black uppercase tracking-wider hover:bg-slate-50 flex items-center justify-center gap-1.5"
                              >
                                <Download className="w-3.5 h-3.5" /> Brochure
                              </a>
                            )}
                            <Link 
                              href={`/inquiry?college=${college.slug}`}
                              className="bg-primary-brand border-2 border-foreground text-white py-2 px-5 text-center text-xs font-black uppercase tracking-wider hover:bg-primary-brand/90 flex items-center justify-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                            >
                              Apply Now <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {filteredColleges.length === 0 && (
                    <div className="bg-white border-4 border-foreground p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <h4 className="text-xl font-black uppercase mb-1">No colleges match your filters</h4>
                      <p className="text-sm font-bold text-slate-500 mb-6">Try resetting filters to show matches.</p>
                      <button onClick={resetFilters} className="bg-foreground text-white border-2 border-foreground font-black px-6 py-2.5 text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors">
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === "matrix" && (
              <div className="bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tight text-foreground flex items-center gap-2">
                  <Layers className="w-6 h-6 text-primary-brand" /> Top MBA Colleges Comparison Matrix
                </h3>
                <p className="font-bold text-slate-600 text-sm">
                  Head-to-head quick reference matrix of Pune's leading business schools. Add colleges to compare above to use the detailed comparator tool.
                </p>

                <div className="overflow-x-auto border-2 border-foreground">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-foreground text-white text-xs font-black uppercase tracking-wider">
                      <tr>
                        <th className="p-4 border-r border-white/20">College Name</th>
                        <th className="p-4 border-r border-white/20">Ownership</th>
                        <th className="p-4 border-r border-white/20">Total Fees</th>
                        <th className="p-4 border-r border-white/20">Avg Package</th>
                        <th className="p-4 border-r border-white/20">Exams</th>
                        <th className="p-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-bold divide-y-2 divide-foreground">
                      {colleges.slice(0, 8).map((c) => (
                        <tr key={c.slug} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 border-r-2 border-foreground font-black">
                            <Link href={`/colleges/${c.slug}`} className="text-primary hover:underline block">{c.name}</Link>
                          </td>
                          <td className="p-4 border-r-2 border-foreground">{c.ownership}</td>
                          <td className="p-4 border-r-2 border-foreground text-slate-800 font-black">{c.fees}</td>
                          <td className="p-4 border-r-2 border-foreground text-emerald-600 font-black">{c.avg_placement}</td>
                          <td className="p-4 border-r-2 border-foreground font-bold">{c.exams.join(', ')}</td>
                          <td className="p-4">
                            <Link href={`/inquiry?college=${c.slug}`} className="bg-primary-brand text-white border-2 border-foreground px-3 py-1.5 text-[10px] font-black uppercase tracking-wider hover:bg-primary-brand/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] block text-center">
                              Apply
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "cutoffs" && (
              <div className="bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tight text-foreground flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary-brand" /> Admission Process & Cutoff Insights
                </h3>
                
                <div className="space-y-6 text-base font-bold text-slate-600 leading-relaxed">
                  <p>
                    Admissions to MBA/PGDM programs in Pune are highly structured and depend on entrance exams. Here is a review of requirements at top-tier institutions:
                  </p>

                  <div className="space-y-4">
                    {/* SIBM */}
                    <div className="border-l-4 border-primary-brand bg-slate-50 p-5">
                      <h4 className="text-lg font-black text-foreground uppercase tracking-tight mb-2">SIBM Pune (SNAP)</h4>
                      <p className="text-sm">
                        Admission is purely through the **SNAP Test** conducted by Symbiosis International University. SIBM Pune cutoff score generally ranges between **98.5 to 99 percentile**. Shortlisted candidates must clear Group Exercise, Writing Ability Test, and Personal Interview (GE-WAT-PI).
                      </p>
                    </div>

                    {/* PUMBA */}
                    <div className="border-l-4 border-primary bg-slate-50 p-5">
                      <h4 className="text-lg font-black text-foreground uppercase tracking-tight mb-2">PUMBA Pune (MAH MBA CET)</h4>
                      <p className="text-sm">
                        As a state department, PUMBA accepts **MAH MBA CET** scores via CAP Round counselling. Cutoff percentile for Maharashtra General Home University stands around **98.2 percentile**, while Outside Maharashtra Candidates (OMS) typically require **99.5+ percentile**. CAT, CMAT, MAT scores are also conditionally accepted.
                      </p>
                    </div>

                    {/* Private PGDM */}
                    <div className="border-l-4 border-emerald-500 bg-slate-50 p-5">
                      <h4 className="text-lg font-black text-foreground uppercase tracking-tight mb-2">Private PGDM Institutes (DY Patil, Lexicon, Kirloskar)</h4>
                      <p className="text-sm">
                        Private AICTE-approved PGDM business schools have a more flexible intake. They accept CAT, CMAT, MAT, XAT, and ATMA scores. Shortlisting is typically done at **50-70 percentile** followed by intensive Group Discussions and Personal Interviews focused on academic records and soft skills.
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-50 border-4 border-dashed border-amber-500 p-6 text-slate-800">
                    <h5 className="font-black uppercase text-sm tracking-wide text-amber-700 flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-4 h-4" /> Expert Counselling Advice
                    </h5>
                    <p className="text-sm font-bold">
                      Struggling to secure a top SNAP score or MAH CET percentile? Don't worry. Many high-ROI private B-schools accept MAT or CMAT and offer great placements. Speak to our admissions counselor to map out your scores.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "placements" && (
              <div className="bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tight text-foreground flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary-brand" /> Placement & ROI Analysis
                </h3>

                <p className="font-bold text-slate-600 text-base leading-relaxed">
                  Pune is known as the &quot;Oxford of the East&quot; and offers extensive industrial density (IT, Automotive, BFSI), facilitating high placement conversion. Check out placement data highlights below:
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {colleges.slice(0, 4).map((c) => {
                    const avgStr = c.avg_placement.replace(/[₹,\s]/g, '').toLowerCase();
                    const avgNum = parseFloat(avgStr);
                    // Determine color percentage for mock graph
                    const percentage = isNaN(avgNum) ? 30 : Math.min(100, (avgNum / 30) * 100);
                    return (
                      <div key={c.slug} className="border-2 border-foreground p-5 space-y-3 bg-slate-50">
                        <h4 className="font-black uppercase text-sm tracking-tight text-foreground">{c.name}</h4>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-bold">Average CTC:</span>
                          <span className="font-black text-emerald-600">{c.avg_placement}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-bold">Highest CTC:</span>
                          <span className="font-black text-slate-700">{c.highest_placement || "N/A"}</span>
                        </div>
                        {/* Placement Progress bar */}
                        <div className="w-full bg-slate-200 h-3 border border-foreground">
                          <div 
                            className="bg-primary-brand h-full border-r border-foreground" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-4 border-foreground p-6 bg-slate-50">
                  <h4 className="font-black uppercase text-base text-foreground mb-4">Prominent Hiring Sectors in Pune</h4>
                  <ul className="grid grid-cols-2 gap-4 text-xs font-bold">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>IT & ITES (Infosys, Tech Mahindra, Wipro)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Automotive & Engg (Tata Motors, Bajaj, Cummins)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Consulting & BFSI (Deloitte, ICICI, HDFC)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>FMCG & Logistics (DHL, Kuehne+Nagel)</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Informational SEO Content Section */}
            <section className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
              <h3 className="text-3xl font-black uppercase tracking-tight text-foreground">
                Guide to Selecting MBA Colleges in Pune
              </h3>
              <div className="space-y-4 text-slate-600 font-bold leading-relaxed text-sm">
                <p>
                  Pune has emerged as a premium hub for management education in India. When choosing a college in Pune, you must consider:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-semibold">
                  <li>
                    <strong className="font-black text-foreground">Return on Investment (ROI):</strong> Government departments like <Link href="/colleges/pumba-pune" className="text-primary hover:underline">PUMBA Pune</Link> offer extremely low fees (~₹1.3 Lakhs) with strong ₹8.5 LPA average salaries. Private colleges like <Link href="/colleges/sibm-pune" className="text-primary hover:underline">SIBM Pune</Link> have higher fees (~₹29 Lakhs) but offer top-tier brand placement records exceeding ₹28 LPA average package.
                  </li>
                  <li>
                    <strong className="font-black text-foreground">Curriculum Accreditation:</strong> Ensure PGDM courses have AICTE approval and MBA courses are affiliated with Savitribai Phule Pune University (SPPU) or Symbiosis International.
                  </li>
                  <li>
                    <strong className="font-black text-foreground">Location & Connectivity:</strong> B-schools located near IT parks in Hinjewadi or industrial zones in Chakan/Pimpri enjoy better guest lectures, internships, and live projects.
                  </li>
                </ul>
              </div>
            </section>

          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
            
            {/* Counselor Form Box */}
            <div className="bg-accent border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="text-2xl font-black uppercase leading-tight italic text-foreground mb-2">
                Pune Admission Desk
              </h4>
              <div className="w-16 h-1.5 bg-primary mb-4" />
              <p className="text-sm font-bold text-slate-800 leading-snug mb-6">
                Get a customized list of Pune business schools matching your percentile, budget, and target placements.
              </p>
              
              <InquiryForm />

              <div className="mt-8 border-t-2 border-foreground border-dashed pt-6 text-center">
                <p className="text-[10px] font-black uppercase text-slate-700 tracking-wider mb-3">Or chat live on Whatsapp</p>
                <a 
                  href="https://wa.me/919560020771"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-foreground text-foreground hover:bg-slate-50 py-3 px-6 text-xs font-black uppercase tracking-wider block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
                >
                  WhatsApp Expert
                </a>
              </div>
            </div>

            {/* Trending Blogs List */}
            {trendingBlogs && trendingBlogs.length > 0 && (
              <div className="bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
                <h4 className="text-lg font-black uppercase text-foreground flex items-center gap-2 border-b-2 border-slate-100 pb-3">
                  <TrendingUp className="w-5 h-5 text-primary-brand" /> Trending Insights
                </h4>
                <div className="space-y-4">
                  {trendingBlogs.slice(0, 4).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block border-l-4 border-primary-brand pl-3 py-1 hover:border-foreground transition-all"
                    >
                      <span className="text-[9px] font-black text-slate-400 block mb-1">
                        {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </span>
                      <h5 className="text-xs font-black text-slate-800 leading-snug group-hover:text-primary-brand transition-colors">
                        {post.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Fact sheet */}
            <div className="bg-slate-100 border-4 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4 text-xs font-bold text-slate-600">
              <h4 className="text-sm font-black uppercase text-foreground">Pune MBA Hub Facts</h4>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-300 pb-1.5">
                  <span>Elite Campus:</span>
                  <span className="text-foreground">SIBM Pune</span>
                </div>
                <div className="flex justify-between border-b border-slate-300 pb-1.5">
                  <span>Best ROI Choice:</span>
                  <span className="text-foreground">PUMBA Pune</span>
                </div>
                <div className="flex justify-between border-b border-slate-300 pb-1.5">
                  <span>Popular State Exam:</span>
                  <span className="text-foreground">MAH MBA CET</span>
                </div>
                <div className="flex justify-between pb-1.5">
                  <span>Popular Symbiosis Exam:</span>
                  <span className="text-foreground">SNAP Test</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <CompareDrawer
        selectedColleges={comparedColleges}
        onRemove={handleCompareToggle}
        onClearAll={handleClearAllCompare}
        onCompare={handleCompareNow}
      />
    </div>
  );
}
