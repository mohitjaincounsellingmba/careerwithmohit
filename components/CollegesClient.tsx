"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CollegeMetadata } from "@/lib/colleges";
import { CollegeCard } from "@/components/CollegeCard";
import { BTechCollegeGenerator } from "@/components/BTechCollegeGenerator";
import { MBACollegeGenerator } from "@/components/MBACollegeGenerator";
import { BBACollegeGenerator } from "@/components/BBACollegeGenerator";
import { Search, X, MapPin, GraduationCap, IndianRupee, Briefcase, Filter, ChevronDown, Sparkles, TrendingUp, ArrowRight, Layers } from "lucide-react";

interface TrendingBlog {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

export function CollegesClient({ colleges, trendingBlogs = [] }: { colleges: CollegeMetadata[]; trendingBlogs?: TrendingBlog[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Streams");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedOwnership, setSelectedOwnership] = useState("All Types");
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [selectedFeeRange, setSelectedFeeRange] = useState("All Fees");
  const [selectedRanking, setSelectedRanking] = useState("All Rankings");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  // Specialization options keyed by category
  const specializationMap: Record<string, string[]> = {
    Management: [
      "All Specializations", "Marketing", "Finance", "Human Resource (HRM)", "Operations & Supply Chain",
      "Business Analytics", "Digital Marketing", "International Business", "IT & Systems", "Entrepreneurship",
      "FinTech", "Healthcare Management", "Agri-Business", "Rural Management", "Banking & BFSI",
    ],
    Engineering: [
      "All Specializations", "Computer Science (CSE)", "AI & Machine Learning", "Data Science", "Electronics (ECE)",
      "CyberSecurity", "Information Technology (IT)", "Mechanical Engineering", "Civil Engineering", "Robotics & Automation",
      "Electrical (EEE)", "Biotechnology", "Cloud Computing", "VLSI Design", "Aerospace",
    ],
    "UG Courses": [
      "All Specializations", "BBA - HR / Finance", "BCA - IT / Software", "B.Com - Accounts", "B.Sc - Science / CS",
      "B.A - Humanities", "B.Pharm", "Integrated Law", "Hotel Management",
    ],
  };

  const specializationKeywords: Record<string, string[]> = {
    Marketing: ["marketing"], Finance: ["finance", "financial"], "Human Resource (HRM)": ["hr", "human resource", "hrm"],
    "Operations & Supply Chain": ["operations", "supply chain", "logistics"], "Business Analytics": ["analytics", "data science"],
    "Digital Marketing": ["digital marketing", "e-commerce"], "International Business": ["international business", "ib"],
    "IT & Systems": ["it", "systems", "information technology"], Entrepreneurship: ["entrepreneurship", "startup", "family business"],
    FinTech: ["fintech", "financial technology"], "Healthcare Management": ["health", "hospital"], "Agri-Business": ["agri", "agriculture"],
    "Rural Management": ["rural"], "Banking & BFSI": ["banking", "bfsi", "financial services"],
    "Computer Science (CSE)": ["computer science", "cse", "computer engineering"], "AI & Machine Learning": ["aiml", "ai", "artificial intelligence", "machine learning"],
    "Data Science": ["data science", "analytics"], "Electronics (ECE)": ["ece", "electronics", "communication"],
    CyberSecurity: ["cyber", "security", "forensics"], "Information Technology (IT)": [" it", "information technology"],
    "Mechanical Engineering": ["mechanical", "me"], "Civil Engineering": ["civil"], "Robotics & Automation": ["robotics", "automation", "mechatronics"],
    "Electrical (EEE)": ["electrical", "eee", "power"], Biotechnology: ["biotechnology", "bio"], "Cloud Computing": ["cloud", "devops"],
    "VLSI Design": ["vlsi", "embedded"], Aerospace: ["aerospace", "aeronautical"],
    "BBA - HR / Finance": ["bba", "management"], "BCA - IT / Software": ["bca", "computer application"],
    "B.Com - Accounts": ["b.com", "commerce", "accounting"], "B.Sc - Science / CS": ["b.sc", "science"],
    "B.A - Humanities": ["b.a", "arts", "humanities"], "B.Pharm": ["pharm"], "Integrated Law": ["law", "llb"],
    "Hotel Management": ["hotel", "hospitality", "bhm"],
  };

  const specializationOptions = specializationMap[selectedCategory] ?? null;

  const locationMap = useMemo(() => {
    return colleges.reduce((acc, college) => {
      const loc = college.location.toLowerCase();
      let state = "Other", city = "Other";
      if (loc.includes("delhi")) { state = "Delhi"; city = "Delhi"; }
      else if (loc.includes("uttar pradesh") || loc.includes("noida") || loc.includes("greater noida") || loc.includes("ghaziabad")) {
        state = "Uttar Pradesh";
        if (loc.includes("greater noida")) city = "Greater Noida";
        else if (loc.includes("noida")) city = "Noida";
        else if (loc.includes("ghaziabad")) city = "Ghaziabad";
        else city = "Noida";
      } else if (loc.includes("haryana") || loc.includes("gurgaon") || loc.includes("faridabad")) {
        state = "Haryana";
        if (loc.includes("faridabad")) city = "Faridabad";
        else city = "Gurgaon";
      } else if (loc.includes("punjab") || loc.includes("chandigarh") || loc.includes("mohali")) {
        state = "Punjab & Chandigarh";
        if (loc.includes("mohali")) city = "Mohali";
        else if (loc.includes("chandigarh")) city = "Chandigarh";
        else city = "Chandigarh";
      } else if (loc.includes("karnataka") || loc.includes("bangalore")) {
        state = "Karnataka"; city = "Bangalore";
      } else if (loc.includes("maharashtra") || loc.includes("mumbai") || loc.includes("pune")) {
        state = "Maharashtra";
        if (loc.includes("mumbai")) city = "Mumbai";
        else if (loc.includes("pune")) city = "Pune";
        else if (loc.includes("navi mumbai")) city = "Navi Mumbai";
      } else if (loc.includes("rajasthan") || loc.includes("jaipur")) {
        state = "Rajasthan"; city = "Jaipur";
      } else if (loc.includes("uttarakhand") || loc.includes("dehradun")) {
        state = "Uttarakhand"; city = "Dehradun";
      } else if (loc.includes("west bengal") || loc.includes("kolkata")) {
        state = "West Bengal"; city = "Kolkata";
      } else if (loc.includes("gujarat") || loc.includes("ahmedabad")) {
        state = "Gujarat"; city = "Ahmedabad";
      }
      acc[college.slug] = { state, city };
      return acc;
    }, {} as Record<string, { state: string; city: string }>);
  }, [colleges]);

  const categories = ["All Streams", "Management", "Engineering", "UG Courses"];
  const managementCourses = ["All Courses", "MBA", "PGDM"];
  const engineeringCourses = ["All Courses", "B.Tech", "M.Tech"];
  const ugCourses = ["All Courses", "BCom", "BBA", "BCA", "BSc", "B.Pharma", "BA", "BA LLB"];
  
  const allPossibleCourses = useMemo(() => {
    const courses = new Set<string>();
    colleges.forEach(c => c.courses.forEach(course => courses.add(course)));
    return ["All Courses", ...Array.from(courses)].sort();
  }, [colleges]);

  const courseOptionsForCategory =
    selectedCategory === "Management" ? managementCourses
    : selectedCategory === "Engineering" ? engineeringCourses
    : selectedCategory === "UG Courses" ? ugCourses
    : allPossibleCourses;

  const allPossibleExams = useMemo(() => {
    const exams = new Set<string>();
    const source = selectedCategory === "All Streams" ? colleges : colleges.filter(c => c.category === selectedCategory);
    source.forEach(c => (c.exams || []).forEach(exam => exams.add(exam)));
    return ["All Exams", ...Array.from(exams)].sort();
  }, [colleges, selectedCategory]);

  const feeRanges = ["All Fees", "< 1 Lakh", "1-5 Lakhs", "5-10 Lakhs", "10-20 Lakhs", "> 20 Lakhs"];
  const rankingOptions = ["All Rankings", "Top 10", "Top 50", "Top 100"];

  const states = useMemo(() => {
    const allStates = new Set(Object.values(locationMap).map(l => l.state));
    return ["All States", ...Array.from(allStates)].sort();
  }, [locationMap]);

  const cities = useMemo(() => {
    let relevantLocations = Object.values(locationMap);
    if (selectedState !== "All States") {
      relevantLocations = relevantLocations.filter(l => l.state === selectedState);
    }
    const filteredCities = new Set(relevantLocations.map(l => l.city));
    return ["All Cities", ...Array.from(filteredCities)].sort();
  }, [locationMap, selectedState]);

  const ownershipTypes = ["All Types", "Public", "Private"];

  const filteredColleges = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return colleges.filter(college => {
      const locInfo = locationMap[college.slug];
      const matchesSearch = !query || 
        college.name.toLowerCase().includes(query) ||
        college.location.toLowerCase().includes(query) ||
        (college.exams || []).some(exam => exam.toLowerCase().includes(query)) ||
        college.courses.some(c => c.toLowerCase().includes(query));

      const matchesCategory = selectedCategory === "All Streams" || college.category === selectedCategory;

      const matchesCourse = selectedCourse === "All Courses" ||
        college.courses.some(c => c === selectedCourse || c.startsWith(selectedCourse + " ") || c.toLowerCase().includes(selectedCourse.toLowerCase()));

      let matchesSpecialization = true;
      if (selectedSpecialization !== "All Specializations") {
        const keywords = specializationKeywords[selectedSpecialization] ?? [];
        if (selectedCategory === "Engineering") {
          matchesSpecialization = college.courses.some(c => keywords.some(kw => c.toLowerCase().includes(kw)));
        } else {
          matchesSpecialization = keywords.some(kw =>
            college.name.toLowerCase().includes(kw) || college.courses.some(c => c.toLowerCase().includes(kw))
          ) || true;
        }
      }

      const matchesState = selectedState === "All States" || locInfo.state === selectedState;
      const matchesCity = selectedCity === "All Cities" || locInfo.city === selectedCity;
      const matchesOwnership = selectedOwnership === "All Types" || college.ownership.toLowerCase().includes(selectedOwnership.toLowerCase());
      const matchesExam = selectedExam === "All Exams" || (college.exams || []).includes(selectedExam);

      let matchesFee = true;
      if (selectedFeeRange !== "All Fees") {
        const feeStr = college.fees.replace(/[₹,]/g, '').toLowerCase();
        let feeNum = parseFloat(feeStr);
        if (feeStr.includes('lakh')) feeNum *= 100000;
        
        if (selectedFeeRange === "< 1 Lakh") matchesFee = feeNum < 100000;
        else if (selectedFeeRange === "1-5 Lakhs") matchesFee = feeNum >= 100000 && feeNum <= 500000;
        else if (selectedFeeRange === "5-10 Lakhs") matchesFee = feeNum > 500000 && feeNum <= 1000000;
        else if (selectedFeeRange === "10-20 Lakhs") matchesFee = feeNum > 1000000 && feeNum <= 2000000;
        else if (selectedFeeRange === "> 20 Lakhs") matchesFee = feeNum > 2000000;
      }

      let matchesRanking = true;
      if (selectedRanking !== "All Rankings") {
        const rankMatch = college.ranking.match(/#(\d+)/);
        if (rankMatch) {
          const rankNum = parseInt(rankMatch[1]);
          if (selectedRanking === "Top 10") matchesRanking = rankNum <= 10;
          else if (selectedRanking === "Top 50") matchesRanking = rankNum <= 50;
          else if (selectedRanking === "Top 100") matchesRanking = rankNum <= 100;
        } else {
          matchesRanking = false;
        }
      }

      return matchesSearch && matchesCategory && matchesCourse && matchesSpecialization && matchesState && matchesCity && matchesOwnership && matchesExam && matchesFee && matchesRanking;
    });
  }, [searchQuery, selectedCategory, selectedCourse, selectedSpecialization, selectedState, selectedCity, selectedOwnership, selectedExam, selectedFeeRange, selectedRanking, colleges, locationMap]);

  // Handle visible count reset when filters change
  useMemo(() => {
    setVisibleCount(20);
  }, [searchQuery, selectedCategory, selectedCourse, selectedSpecialization, selectedState, selectedCity, selectedOwnership, selectedExam, selectedFeeRange, selectedRanking]);

  const visibleColleges = filteredColleges.slice(0, visibleCount);

  const resetFilters = () => {
    setSelectedCategory("All Streams");
    setSelectedCourse("All Courses");
    setSelectedSpecialization("All Specializations");
    setSelectedState("All States");
    setSelectedCity("All Cities");
    setSelectedOwnership("All Types");
    setSelectedExam("All Exams");
    setSelectedFeeRange("All Fees");
    setSelectedRanking("All Rankings");
    setSearchQuery("");
  };

  const activeFiltersCount = [
    selectedCategory !== "All Streams",
    selectedCourse !== "All Courses",
    selectedSpecialization !== "All Specializations",
    selectedState !== "All States",
    selectedCity !== "All Cities",
    selectedOwnership !== "All Types",
    selectedExam !== "All Exams",
    selectedFeeRange !== "All Fees",
    selectedRanking !== "All Rankings",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32">
      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Directory 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight italic">
              Empowering Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Academic Journey</span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
              Discover, compare, and apply to over 200+ top-tier institutes across India. 
              Get accurate data on fees, placements, and rankings in one place.
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-16 bg-slate-50/50 clip-path-wave"></div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Filters */}
          <aside className={`lg:w-1/4 shrink-0 ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100 p-6 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" /> Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button onClick={resetFilters} className="text-xs font-black uppercase text-rose-500 hover:text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full transition-colors">
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <FilterGroup label="Stream" icon={<Layers className="w-4 h-4" />} highlight>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedCourse("All Courses");
                      setSelectedExam("All Exams");
                      setSelectedSpecialization("All Specializations");
                    }}
                    className="w-full bg-blue-50/50 border border-blue-100 rounded-2xl py-3.5 px-4 focus:ring-2 focus:ring-blue-200 text-slate-900 font-bold text-sm cursor-pointer"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Course / Programme" icon={<GraduationCap className="w-4 h-4" />}>
                  <select 
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e.target.value);
                      setSelectedSpecialization("All Specializations");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm cursor-pointer"
                  >
                    {courseOptionsForCategory.map(course => <option key={course} value={course}>{course}</option>)}
                  </select>
                </FilterGroup>

                {specializationOptions && specializationOptions.length > 1 && (
                  <FilterGroup label="Specialization" icon={<Briefcase className="w-4 h-4" />}>
                    <select
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm cursor-pointer"
                    >
                      {specializationOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </FilterGroup>
                )}
                
                <FilterGroup label="State" icon={<MapPin className="w-4 h-4" />}>
                  <select 
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity("All Cities");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm cursor-pointer"
                  >
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="City" icon={<MapPin className="w-4 h-4" />}>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={selectedState === "All States" && cities.length <= 1}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm disabled:opacity-50 cursor-pointer"
                  >
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Fees" icon={<IndianRupee className="w-4 h-4" />}>
                  <select 
                    value={selectedFeeRange}
                    onChange={(e) => setSelectedFeeRange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm cursor-pointer"
                  >
                    {feeRanges.map(range => <option key={range} value={range}>{range}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Exam">
                  <select 
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm cursor-pointer"
                  >
                    {allPossibleExams.map(exam => <option key={exam} value={exam}>{exam}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Institute Type">
                  <select 
                    value={selectedOwnership}
                    onChange={(e) => setSelectedOwnership(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm cursor-pointer"
                  >
                    {ownershipTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Ranking">
                  <select 
                    value={selectedRanking}
                    onChange={(e) => setSelectedRanking(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm cursor-pointer"
                  >
                    {rankingOptions.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                </FilterGroup>
              </div>
            </div>
          </aside>

          {/* Right Content Area */}
          <main className="w-full lg:w-3/4">
            
            {/* Search & Mobile Filter Toggle */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100 p-4 md:p-6 mb-8">
              <div className="flex gap-4">
                <div className="relative flex-grow group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search colleges by name, courses, or exams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:bg-white transition-all text-base font-bold text-slate-900 placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                  className="lg:hidden flex items-center justify-center gap-2 px-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {/* Active Filter Chips */}
              {activeFiltersCount > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 items-center border-t border-slate-100 pt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">Active Filters:</span>
                  {[
                    { label: selectedCategory, active: selectedCategory !== "All Streams", onClear: () => setSelectedCategory("All Streams") },
                    { label: selectedCourse, active: selectedCourse !== "All Courses", onClear: () => setSelectedCourse("All Courses") },
                    { label: selectedSpecialization, active: selectedSpecialization !== "All Specializations", onClear: () => setSelectedSpecialization("All Specializations") },
                    { label: selectedState, active: selectedState !== "All States", onClear: () => setSelectedState("All States") },
                    { label: selectedCity, active: selectedCity !== "All Cities", onClear: () => setSelectedCity("All Cities") },
                    { label: selectedFeeRange, active: selectedFeeRange !== "All Fees", onClear: () => setSelectedFeeRange("All Fees") },
                  ].map((chip, i) => chip.active && (
                    <button 
                      key={i} 
                      onClick={chip.onClear}
                      className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-100 hover:bg-blue-100 transition-colors"
                    >
                      {chip.label}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                  <button onClick={resetFilters} className="text-[10px] font-black text-rose-500 ml-auto uppercase tracking-widest hover:underline">Clear All</button>
                </div>
              )}
            </div>

            {/* Results Header */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Top Colleges in India <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg text-lg ml-2">{filteredColleges.length} Found</span>
              </h2>
            </div>

            {/* College Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {visibleColleges.map((college) => (
                <CollegeCard key={college.slug} college={college} />
              ))}
            </div>

            {/* Empty State */}
            {filteredColleges.length === 0 && (
              <div className="py-24 text-center bg-white rounded-3xl border border-slate-200">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">No Colleges Found</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">We couldn't find any colleges matching your exact filters. Try broadening your criteria or search terms.</p>
                <button 
                  onClick={resetFilters}
                  className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination / Load More */}
            {visibleCount < filteredColleges.length && (
              <div className="flex justify-center mb-16">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 20)}
                  className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 hover:shadow-lg transition-all"
                >
                  Load More Colleges ({filteredColleges.length - visibleCount} left)
                </button>
              </div>
            )}

            {/* Trending Blogs */}
            {trendingBlogs && trendingBlogs.length > 0 && (
              <div className="mb-16 mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 px-4 py-2 rounded-full">
                    <TrendingUp className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-black uppercase tracking-widest text-rose-600">Trending Resources</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trendingBlogs.slice(0, 4).map((post, i) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      prefetch={false}
                      className="group flex flex-col justify-between bg-white border border-slate-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200"
                    >
                      <div>
                        <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3">
                          {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                        </span>
                        <h3 className="text-sm font-black text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Generators */}
            <div className="space-y-16 pb-12">
               <BTechCollegeGenerator />
               <MBACollegeGenerator />
               <BBACollegeGenerator />
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, icon, children, highlight }: { label: string, icon?: React.ReactNode, children: React.ReactNode, highlight?: boolean }) {
  return (
    <div className="space-y-2.5">
      <label className={`text-[11px] font-black uppercase tracking-widest ml-1 flex items-center gap-2 ${
        highlight ? "text-blue-600" : "text-slate-500"
      }`}>
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
