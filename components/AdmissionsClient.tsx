"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CollegeMetadata } from "@/lib/colleges";
import { MBACollegeGenerator } from "@/components/MBACollegeGenerator";
import { BTechCollegeGenerator } from "@/components/BTechCollegeGenerator";
import { BBACollegeGenerator } from "@/components/BBACollegeGenerator";
import { InquiryForm } from "@/components/InquiryForm";
import { 
  Search, X, GraduationCap, Building2, MapPin, IndianRupee, 
  Briefcase, ChevronRight, Sparkles, TrendingUp, Check, 
  ArrowRight, Phone, ArrowRightLeft, Trophy, BookOpen, 
  Users, CheckCircle2, Star, HelpCircle
} from "lucide-react";

interface AdmissionsClientProps {
  colleges: CollegeMetadata[];
  posts: Array<{
    slug: string;
    title: string;
    date: string;
    description?: string;
  }>;
}

export function AdmissionsClient({ colleges, posts }: AdmissionsClientProps) {
  const router = useRouter();

  // --- Search Autocomplete State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute live search suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return { colleges: [], cities: [], courses: [] };
    const query = searchQuery.toLowerCase().trim();

    // 1. Matches colleges
    const matchedColleges = colleges
      .filter(c => c.name.toLowerCase().includes(query))
      .slice(0, 5);

    // 2. Matches unique cities/states
    const uniqueCities = new Set<string>();
    colleges.forEach(c => {
      const loc = c.location.split(",")[0].trim();
      if (loc.toLowerCase().includes(query)) {
        uniqueCities.add(loc);
      }
    });
    const matchedCities = Array.from(uniqueCities).slice(0, 3);

    // 3. Matches unique courses
    const uniqueCourses = new Set<string>();
    colleges.forEach(c => {
      c.courses.forEach(course => {
        if (course.toLowerCase().includes(query)) {
          uniqueCourses.add(course);
        }
      });
    });
    const matchedCourses = Array.from(uniqueCourses).slice(0, 3);

    return {
      colleges: matchedColleges,
      cities: matchedCities,
      courses: matchedCourses
    };
  }, [searchQuery, colleges]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // --- Stream Counts ---
  const streamCounts = useMemo(() => {
    return {
      management: colleges.filter(c => c.category === "Management").length,
      engineering: colleges.filter(c => c.category === "Engineering").length,
      ug: colleges.filter(c => c.category === "UG Courses").length,
    };
  }, [colleges]);

  // --- Compare Widget State ---
  const [compareQuery, setCompareQuery] = useState("");
  const [compareSuggestions, setCompareSuggestions] = useState<CollegeMetadata[]>([]);
  const [comparedColleges, setComparedColleges] = useState<CollegeMetadata[]>([]);
  const compareSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (compareSearchRef.current && !compareSearchRef.current.contains(event.target as Node)) {
        setCompareSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update compare suggestions
  useEffect(() => {
    if (!compareQuery.trim()) {
      setCompareSuggestions([]);
      return;
    }
    const q = compareQuery.toLowerCase().trim();
    const matched = colleges
      .filter(c => c.name.toLowerCase().includes(q) && !comparedColleges.some(cc => cc.slug === c.slug))
      .slice(0, 6);
    setCompareSuggestions(matched);
  }, [compareQuery, colleges, comparedColleges]);

  const addCollegeToCompare = (college: CollegeMetadata) => {
    if (comparedColleges.length >= 4) {
      alert("You can compare up to 4 colleges at a time!");
      return;
    }
    setComparedColleges(prev => [...prev, college]);
    setCompareQuery("");
    setCompareSuggestions([]);
  };

  const removeComparedCollege = (slug: string) => {
    setComparedColleges(prev => prev.filter(c => c.slug !== slug));
  };

  const handleCompareClick = () => {
    if (comparedColleges.length < 2) {
      alert("Please select at least 2 colleges to compare.");
      return;
    }
    const slugsStr = comparedColleges.map(c => c.slug).join(",");
    router.push(`/colleges/compare?slugs=${slugsStr}`);
  };

  // --- Predictors / Generators Tabs ---
  const [activePredictorTab, setActivePredictorTab] = useState<"mba" | "btech" | "bba">("mba");

  // --- Curated Featured Grid Tabs ---
  const [activeCuratedTab, setActiveCuratedTab] = useState<"roi" | "placements" | "ranking">("roi");

  // Helper parsers for sorting
  const parseFee = (feeStr: string): number => {
    const clean = feeStr.replace(/[₹,]/g, '').toLowerCase().trim();
    let val = parseFloat(clean);
    if (clean.includes('lakh')) {
      val = val * 100000;
    } else if (clean.includes('k')) {
      val = val * 1000;
    }
    return isNaN(val) ? 0 : val;
  };

  const parsePlacement = (pkgStr: string): number => {
    const clean = pkgStr.replace(/[₹,]/g, '').toLowerCase().trim();
    let val = parseFloat(clean);
    if (clean.includes('lpa') || clean.includes('lakh')) {
      val = val * 100000;
    }
    return isNaN(val) ? 0 : val;
  };

  // Curated lists computed dynamically
  const curatedColleges = useMemo(() => {
    const sortedROI = [...colleges]
      .filter(c => {
        const fee = parseFee(c.fees);
        const placement = parsePlacement(c.avg_placement);
        return fee > 0 && fee <= 1000000 && placement >= 550000;
      })
      .sort((a, b) => parsePlacement(b.avg_placement) - parsePlacement(a.avg_placement))
      .slice(0, 6);

    const sortedPlacements = [...colleges]
      .filter(c => parsePlacement(c.avg_placement) >= 1200000)
      .sort((a, b) => parsePlacement(b.avg_placement) - parsePlacement(a.avg_placement))
      .slice(0, 6);

    const sortedRanked = [...colleges]
      .filter(c => c.ranking && (c.ranking.includes('#1') || c.ranking.includes('#2') || c.ranking.includes('#3') || c.ranking.includes('Top 50') || c.ranking.includes('Top 20')))
      .slice(0, 6);

    // Fallbacks if filtered results are sparse
    const defaultFallback = colleges.slice(0, 6);

    return {
      roi: sortedROI.length > 0 ? sortedROI : defaultFallback,
      placements: sortedPlacements.length > 0 ? sortedPlacements : defaultFallback,
      ranking: sortedRanked.length > 0 ? sortedRanked : defaultFallback,
    };
  }, [colleges]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-800">
      
      {/* 1. HERO BANNER & REAL-TIME SEARCH */}
      <section className="relative bg-slate-950 pt-24 pb-32 text-center overflow-hidden">
        {/* Modern dark theme elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/40 via-slate-950 to-slate-950 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 z-0"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-brand/10 border border-primary-brand/20 text-primary-brand text-xs font-black uppercase tracking-widest mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions Portal & College Finder 2026</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight uppercase leading-none mb-6">
            Your Gateway to India's <br />
            <span className="text-primary-brand italic font-display">Top-Tier Campuses</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-10">
            Compare fee structures, placement audits, NIRF rankings, and predict admissions for MBA, B.Tech, and UG courses.
          </p>

          {/* Autocomplete Search Bar */}
          <div ref={searchRef} className="relative max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex gap-2 bg-white p-2 rounded-2xl border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(244,112,98,1)]">
              <div className="flex items-center flex-grow pl-3">
                <Search className="w-6 h-6 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search colleges, cities, courses, or entrance exams..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full text-base font-bold text-slate-800 focus:outline-none placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")} className="p-1 text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-primary-brand hover:bg-primary-brand/90 active:scale-95 text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl transition-all"
              >
                Search
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-50 text-left">
                
                {/* College Matches */}
                {suggestions.colleges.length > 0 && (
                  <div className="p-4 border-b-2 border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Matching Colleges</span>
                    <div className="space-y-1">
                      {suggestions.colleges.map(c => (
                        <Link
                          key={c.slug}
                          href={`/colleges/${c.slug}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded border bg-slate-50 flex items-center justify-center font-bold text-xs uppercase text-slate-400">
                              {c.name.slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-800 group-hover:text-primary-brand transition-colors">{c.name}</p>
                              <p className="text-xs text-slate-400 font-semibold">{c.location}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* City Matches */}
                {suggestions.cities.length > 0 && (
                  <div className="p-4 border-b-2 border-slate-100 bg-slate-50/50">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Explore Cities</span>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.cities.map(city => (
                        <Link
                          key={city}
                          href={`/colleges?search=${encodeURIComponent(city)}`}
                          className="bg-white border-2 border-slate-200 hover:border-foreground rounded-xl px-4 py-2 text-xs font-black text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5"
                        >
                          <MapPin className="w-3.5 h-3.5 text-primary-brand" />
                          Colleges in {city} &rarr;
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Course Matches */}
                {suggestions.courses.length > 0 && (
                  <div className="p-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Filter Courses</span>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.courses.map(course => (
                        <Link
                          key={course}
                          href={`/colleges?search=${encodeURIComponent(course)}`}
                          className="bg-white border-2 border-slate-200 hover:border-foreground rounded-xl px-4 py-2 text-xs font-black text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1.5"
                        >
                          <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                          {course} Programs &rarr;
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {suggestions.colleges.length === 0 && suggestions.cities.length === 0 && suggestions.courses.length === 0 && (
                  <div className="p-6 text-center text-slate-400 font-medium">
                    No exact suggestions matching "{searchQuery}". Press Enter to search directory.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY STREAM CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-30 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Management (MBA/PGDM) */}
          <Link
            href="/colleges?category=Management"
            className="bg-white hover:bg-slate-50 border-4 border-foreground p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(59,130,246,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-start gap-5"
          >
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl border-2 border-blue-100">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">Postgraduate</span>
              <h3 className="text-xl font-black mt-2 text-slate-900">Management (MBA/PGDM)</h3>
              <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-tight">{streamCounts.management} Colleges listed</p>
              <span className="inline-flex items-center text-xs font-black uppercase text-blue-600 mt-4 gap-1 hover:underline">
                Explore Stream &rarr;
              </span>
            </div>
          </Link>

          {/* Engineering (B.Tech) */}
          <Link
            href="/colleges?category=Engineering"
            className="bg-white hover:bg-slate-50 border-4 border-foreground p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(244,112,98,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-start gap-5"
          >
            <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl border-2 border-rose-100">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">Engineering</span>
              <h3 className="text-xl font-black mt-2 text-slate-900">B.Tech / M.Tech</h3>
              <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-tight">{streamCounts.engineering} Colleges listed</p>
              <span className="inline-flex items-center text-xs font-black uppercase text-rose-500 mt-4 gap-1 hover:underline">
                Explore Stream &rarr;
              </span>
            </div>
          </Link>

          {/* UG Courses */}
          <Link
            href="/colleges?category=UG%20Courses"
            className="bg-white hover:bg-slate-50 border-4 border-foreground p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-start gap-5"
          >
            <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl border-2 border-emerald-100">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">Undergraduate</span>
              <h3 className="text-xl font-black mt-2 text-slate-900">BBA, BCA, B.Com</h3>
              <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-tight">{streamCounts.ug} Colleges listed</p>
              <span className="inline-flex items-center text-xs font-black uppercase text-emerald-500 mt-4 gap-1 hover:underline">
                Explore Stream &rarr;
              </span>
            </div>
          </Link>
          
        </div>
      </section>

      {/* 3. COMPARE COLLEGES SIDE-BY-SIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white border-8 border-foreground rounded-3xl p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="bg-primary text-white text-xs font-black uppercase tracking-widest px-3 py-1 -rotate-1 inline-block border-2 border-foreground">
              Compare Engine v1.2
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900 leading-none">
              Side-by-Side <br />
              <span className="text-primary-brand italic font-display">College Comparison</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-md">
              Stuck between choices? Select up to 4 colleges to contrast verified fees, highest & average packages, cutoffs, ownership types, and recruiters side-by-side.
            </p>
          </div>

          <div className="lg:col-span-7 bg-slate-50 rounded-2xl border-4 border-foreground p-6 md:p-8 space-y-6">
            
            {/* Search selector */}
            <div ref={compareSearchRef} className="relative">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 block">
                Type college name to add:
              </label>
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. FMS Delhi, BIMTECH, MDI..."
                  value={compareQuery}
                  onChange={(e) => setCompareQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 bg-white border-2 border-slate-200 focus:border-foreground focus:outline-none rounded-xl text-sm font-bold text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* Suggestions */}
              {compareSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-foreground rounded-xl shadow-lg max-h-56 overflow-y-auto z-40">
                  {compareSuggestions.map(college => (
                    <button
                      key={college.slug}
                      onClick={() => addCollegeToCompare(college)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 font-bold text-xs flex justify-between items-center"
                    >
                      <div>
                        <span className="text-slate-800">{college.name}</span>
                        <span className="text-slate-400 block text-[10px]">{college.location}</span>
                      </div>
                      <span className="text-primary-brand font-black">+ Add</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected list */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3 block">
                Selected Colleges ({comparedColleges.length}/4):
              </span>
              {comparedColleges.length === 0 ? (
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-xs font-bold text-slate-400 uppercase">
                  No colleges added yet. Use the search box above.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {comparedColleges.map(college => (
                    <div
                      key={college.slug}
                      className="bg-white border-2 border-foreground rounded-xl p-3 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-8 h-8 rounded border bg-slate-50 shrink-0 flex items-center justify-center font-bold text-xs uppercase text-slate-400">
                          {college.name.slice(0, 2)}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-black text-slate-800 truncate leading-tight">{college.name}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">{college.location.split(",")[0]}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeComparedCollege(college.slug)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded hover:bg-rose-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                disabled={comparedColleges.length < 2}
                onClick={handleCompareClick}
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:shadow-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:-translate-y-0 active:translate-y-0"
              >
                <ArrowRightLeft className="w-4 h-4" />
                Compare Now ({comparedColleges.length})
              </button>
              {comparedColleges.length > 0 && (
                <button
                  onClick={() => setComparedColleges([])}
                  className="px-6 py-4 border-2 border-foreground hover:bg-slate-100 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 4. ADMISSIONS PREDICTOR & GENERATOR TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-slate-900 tracking-tight">
            Admissions <span className="text-primary-brand italic font-display">Predictor Tools</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm mt-2">
            Calculate your eligible colleges. Toggle the calculators below to predict call chances and build your college shortlist.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b-4 border-foreground overflow-x-auto no-scrollbar gap-2 mb-8 bg-white p-2 rounded-2xl border-4 border-foreground">
          {[
            { id: "mba", label: "MBA Calculator" },
            { id: "btech", label: "B.Tech Predictor" },
            { id: "bba", label: "BBA / BCA Shortlister" }
          ].map(tab => {
            const isActive = activePredictorTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePredictorTab(tab.id as any)}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap px-6 ${
                  isActive
                    ? "bg-primary-brand text-white border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "text-slate-500 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active tab content */}
        <div className="bg-white rounded-3xl border-4 border-slate-200/60 p-2 md:p-6 shadow-sm">
          {activePredictorTab === "mba" && <MBACollegeGenerator />}
          {activePredictorTab === "btech" && <BTechCollegeGenerator />}
          {activePredictorTab === "bba" && <BBACollegeGenerator />}
        </div>
      </section>

      {/* 5. POPULAR STUDENT HUBS (CITIES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-4xl font-black uppercase text-slate-900 tracking-tight leading-none">
              Explore Popular Hubs
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase mt-1">Browse top universities by city locations</p>
          </div>
          <Link href="/colleges" className="text-xs font-black uppercase tracking-wider text-primary-brand hover:underline flex items-center gap-1">
            View All Cities <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Delhi NCR", count: 42, color: "hover:bg-blue-50" },
            { name: "Pune", count: 28, color: "hover:bg-violet-50" },
            { name: "Bangalore", count: 35, color: "hover:bg-emerald-50" },
            { name: "Mumbai", count: 18, color: "hover:bg-rose-50" },
            { name: "Noida", count: 25, color: "hover:bg-amber-50" },
            { name: "Jaipur", count: 14, color: "hover:bg-cyan-50" },
          ].map(hub => (
            <Link
              key={hub.name}
              href={`/colleges?search=${encodeURIComponent(hub.name)}`}
              className={`bg-white border-4 border-foreground p-5 rounded-2xl text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex flex-col items-center justify-center ${hub.color}`}
            >
              <MapPin className="w-8 h-8 text-primary-brand mb-2" />
              <h3 className="text-base font-black text-slate-800 leading-tight">{hub.name}</h3>
              <span className="text-[10px] font-black uppercase text-slate-400 mt-2 bg-slate-50 border px-2 py-0.5 rounded-full">
                {hub.count}+ Colleges
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. CURATED FEATURED COLLEGES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-slate-900 tracking-tight">
            Curated <span className="text-primary-brand italic font-display">Featured Listings</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm mt-2">
            Explore lists of top-performing colleges chosen based on audited performance metrics.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-3 mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: "roi", label: "High ROI (Budget Friendly)" },
            { id: "placements", label: "Top Placements" },
            { id: "ranking", label: "Top Ranked B-Schools" }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setActiveCuratedTab(btn.id as any)}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer whitespace-nowrap ${
                activeCuratedTab === btn.id
                  ? "bg-foreground text-white border-foreground"
                  : "bg-white text-slate-500 border-slate-200 hover:border-foreground"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* College list grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curatedColleges[activeCuratedTab].map(college => (
            <div
              key={college.slug}
              className="bg-white border-4 border-foreground rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded border bg-slate-50 flex items-center justify-center font-black text-base text-slate-400 shrink-0">
                    {college.name.slice(0, 2)}
                  </div>
                  <div>
                    {college.ranking ? (
                      <span className="bg-amber-50 border border-amber-300 text-amber-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block">
                        {college.ranking}
                      </span>
                    ) : (
                      <span className="bg-slate-50 border border-slate-200 text-slate-400 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block">
                        Verified Data
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-primary-brand transition-colors">
                  {college.name}
                </h3>
                <p className="text-slate-400 text-xs font-bold mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {college.location}
                </p>

                {/* College Key Stats */}
                <div className="grid grid-cols-2 gap-2 mt-5">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Average Package</span>
                    <span className="text-sm font-black text-slate-900">{college.avg_placement}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Total Fees</span>
                    <span className="text-sm font-black text-slate-900">{college.fees}</span>
                  </div>
                </div>

                {/* Accept exams & courses */}
                <div className="mt-4 space-y-2">
                  <div className="text-[10px] font-bold text-slate-500">
                    <span className="uppercase text-slate-400 mr-2">Exams:</span>
                    {college.exams && college.exams.length > 0 ? college.exams.join(", ") : "Direct Admission"}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500">
                    <span className="uppercase text-slate-400 mr-2">Courses:</span>
                    {college.courses.join(" | ")}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 border-t border-slate-100 mt-6 pt-5">
                <Link
                  href={`/colleges/${college.slug}`}
                  className="flex-1 text-center py-3 border-2 border-foreground hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-black uppercase tracking-wider transition-colors"
                >
                  Reviews
                </Link>
                <Link
                  href="/inquiry"
                  className="flex-1 text-center py-3 bg-primary-brand hover:bg-primary-brand/90 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                >
                  Apply Now
                </Link>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 7. ADMISSIONS EXPERT COUNSELING FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="bg-primary text-white text-xs font-black uppercase tracking-widest px-4 py-2 rotate-1 inline-block border-4 border-foreground">
              Admission Counselling 2026
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-slate-900 leading-none">
              Need Personal <br />
              <span className="text-primary-brand italic font-display">Admissions Intel?</span>
            </h2>
            <div className="w-20 h-3 bg-primary mb-6" />

            <p className="text-slate-500 font-medium text-base leading-relaxed">
              Don't waste time on generic reviews. Connect directly with Mohit Jain, a certified admissions advisor, to obtain your personalized profile evaluation.
            </p>

            <ul className="space-y-3 font-bold text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                Profile mapping with CAT/CMAT percentile
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                Scholarship eligibility checks
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                Direct Admissions & Management quota updates
              </li>
            </ul>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="https://wa.me/919560020771"
                className="inline-flex items-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
              >
                <Phone className="w-4 h-4" />
                WhatsApp Counselor
              </a>
              <div>
                <p className="text-xs font-bold text-slate-400">CALL ADVISORY DESK</p>
                <a href="tel:+919560020771" className="text-base font-black text-slate-800 hover:text-primary-brand transition-colors">
                  +91-9560020771
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <InquiryForm />
          </div>

        </div>
      </section>

      {/* 8. RECENT GUIDES & FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t-2 border-slate-200/80 pt-16">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Recent articles */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-primary-brand">
              <TrendingUp className="w-6 h-6" />
              <h2 className="text-xl font-black uppercase tracking-wider">Top Admission Insights</h2>
            </div>
            <div className="space-y-4">
              {posts.slice(0, 4).map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white border-2 border-slate-200 hover:border-foreground p-5 rounded-2xl block hover:-translate-y-0.5 transition-all group"
                >
                  <span className="text-[10px] font-bold text-primary-brand/80 block mb-2">
                    {new Date(post.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </span>
                  <h3 className="text-base font-black text-slate-800 group-hover:text-primary-brand transition-colors">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-xs text-slate-400 font-semibold mt-1 line-clamp-2">{post.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-primary-brand">
              <HelpCircle className="w-6 h-6" />
              <h2 className="text-xl font-black uppercase tracking-wider">Admissions FAQ</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: "How does the Admission Predictor work?",
                  a: "The shortlist generators map your entrance percentiles (CAT, CMAT, MAT, etc.), fee budget, and specialization preferences against the eligibility cutoff requirements and historic trends of top-tier schools."
                },
                {
                  q: "Can I apply for direct admission through this portal?",
                  a: "Yes. For AICTE-approved PGDM programs and leading private universities, you can request counseling support to register under executive/management seats directly."
                },
                {
                  q: "What is the fee budget limit for High ROI colleges?",
                  a: "Colleges cataloged under 'High ROI' generally feature total tuition fees under ₹8-10 Lakhs while maintaining verified average placements exceeding ₹6-7 LPA, yielding a fast return on tuition cost."
                }
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white border-2 border-slate-200 rounded-2xl overflow-hidden hover:border-foreground transition-colors"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-black text-sm uppercase text-slate-800 select-none">
                    {faq.q}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 pt-1 text-slate-500 font-medium text-xs border-t border-slate-100 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
