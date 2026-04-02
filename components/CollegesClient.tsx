"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CollegeMetadata } from "@/lib/colleges";
import { CollegeCard } from "@/components/CollegeCard";
import { BTechCollegeGenerator } from "@/components/BTechCollegeGenerator";
import { MBACollegeGenerator } from "@/components/MBACollegeGenerator";
import { BBACollegeGenerator } from "@/components/BBACollegeGenerator";
import { Search, X, MapPin, GraduationCap, IndianRupee, Briefcase, Filter, ChevronDown, Sparkles, TrendingUp, ArrowRight } from "lucide-react";

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
  const [showFilters, setShowFilters] = useState(false);

  // Specialization options keyed by category
  const specializationMap: Record<string, string[]> = {
    Management: [
      "All Specializations",
      "Marketing",
      "Finance",
      "Human Resource (HRM)",
      "Operations & Supply Chain",
      "Business Analytics",
      "Digital Marketing",
      "International Business",
      "IT & Systems",
      "Entrepreneurship",
      "FinTech",
      "Healthcare Management",
      "Agri-Business",
      "Rural Management",
      "Banking & BFSI",
    ],
    Engineering: [
      "All Specializations",
      "Computer Science (CSE)",
      "AI & Machine Learning",
      "Data Science",
      "Electronics (ECE)",
      "CyberSecurity",
      "Information Technology (IT)",
      "Mechanical Engineering",
      "Civil Engineering",
      "Robotics & Automation",
      "Electrical (EEE)",
      "Biotechnology",
      "Cloud Computing",
      "VLSI Design",
      "Aerospace",
    ],
    "UG Courses": [
      "All Specializations",
      "BBA - HR / Finance",
      "BCA - IT / Software",
      "B.Com - Accounts",
      "B.Sc - Science / CS",
      "B.A - Humanities",
      "B.Pharm",
      "Integrated Law",
      "Hotel Management",
    ],
  };

  // Keywords to match each specialization against college.courses
  const specializationKeywords: Record<string, string[]> = {
    // Management
    Marketing: ["marketing"],
    Finance: ["finance", "financial"],
    "Human Resource (HRM)": ["hr", "human resource", "hrm"],
    "Operations & Supply Chain": ["operations", "supply chain", "logistics"],
    "Business Analytics": ["analytics", "data science"],
    "Digital Marketing": ["digital marketing", "e-commerce"],
    "International Business": ["international business", "ib"],
    "IT & Systems": ["it", "systems", "information technology"],
    Entrepreneurship: ["entrepreneurship", "startup", "family business"],
    FinTech: ["fintech", "financial technology"],
    "Healthcare Management": ["health", "hospital"],
    "Agri-Business": ["agri", "agriculture"],
    "Rural Management": ["rural"],
    "Banking & BFSI": ["banking", "bfsi", "financial services"],
    // Engineering
    "Computer Science (CSE)": ["computer science", "cse", "computer engineering"],
    "AI & Machine Learning": ["aiml", "ai", "artificial intelligence", "machine learning"],
    "Data Science": ["data science", "analytics"],
    "Electronics (ECE)": ["ece", "electronics", "communication"],
    CyberSecurity: ["cyber", "security", "forensics"],
    "Information Technology (IT)": [" it", "information technology"],
    "Mechanical Engineering": ["mechanical", "me"],
    "Civil Engineering": ["civil"],
    "Robotics & Automation": ["robotics", "automation", "mechatronics"],
    "Electrical (EEE)": ["electrical", "eee", "power"],
    Biotechnology: ["biotechnology", "bio"],
    "Cloud Computing": ["cloud", "devops"],
    "VLSI Design": ["vlsi", "embedded"],
    Aerospace: ["aerospace", "aeronautical"],
    // UG
    "BBA - HR / Finance": ["bba", "management"],
    "BCA - IT / Software": ["bca", "computer application"],
    "B.Com - Accounts": ["b.com", "commerce", "accounting"],
    "B.Sc - Science / CS": ["b.sc", "science"],
    "B.A - Humanities": ["b.a", "arts", "humanities"],
    "B.Pharm": ["pharm"],
    "Integrated Law": ["law", "llb"],
    "Hotel Management": ["hotel", "hospitality", "bhm"],
  };

  const specializationOptions = specializationMap[selectedCategory] ?? null;

  // Mapping of common patterns to standardized State/City
  const locationMap = useMemo(() => {
    return colleges.reduce((acc, college) => {
      const loc = college.location.toLowerCase();
      let state = "Other";
      let city = "Other";

      if (loc.includes("delhi")) {
        state = "Delhi";
        city = "Delhi";
      } else if (loc.includes("uttar pradesh") || loc.includes("noida") || loc.includes("greater noida") || loc.includes("ghaziabad")) {
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
        state = "Karnataka";
        city = "Bangalore";
      } else if (loc.includes("maharashtra") || loc.includes("mumbai") || loc.includes("pune")) {
        state = "Maharashtra";
        if (loc.includes("mumbai")) city = "Mumbai";
        else if (loc.includes("pune")) city = "Pune";
        else if (loc.includes("navi mumbai")) city = "Navi Mumbai";
      } else if (loc.includes("rajasthan") || loc.includes("jaipur")) {
        state = "Rajasthan";
        city = "Jaipur";
      } else if (loc.includes("uttarakhand") || loc.includes("dehradun")) {
        state = "Uttarakhand";
        city = "Dehradun";
      } else if (loc.includes("west bengal") || loc.includes("kolkata")) {
        state = "West Bengal";
        city = "Kolkata";
      } else if (loc.includes("gujarat") || loc.includes("ahmedabad")) {
        state = "Gujarat";
        city = "Ahmedabad";
      }

      acc[college.slug] = { state, city };
      return acc;
    }, {} as Record<string, { state: string; city: string }>);
  }, [colleges]);

  const categories = ["All Streams", "Management", "Engineering", "UG Courses"];

  // Hardcoded course options scoped by category
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
    // Scope exams to selected category
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

      const matchesCategory = selectedCategory === "All Streams" || 
        college.category === selectedCategory;

      // Use partial match: "B.Tech" matches "B.Tech CSE", "B.Tech ECE" etc.
      const matchesCourse = selectedCourse === "All Courses" ||
        college.courses.some(c => c === selectedCourse || c.startsWith(selectedCourse + " ") || c.toLowerCase().includes(selectedCourse.toLowerCase()));

      // Specialization matching
      let matchesSpecialization = true;
      if (selectedSpecialization !== "All Specializations") {
        const keywords = specializationKeywords[selectedSpecialization] ?? [];
        if (selectedCategory === "Engineering") {
          // For engineering: match against actual course names in data
          matchesSpecialization = college.courses.some(c =>
            keywords.some(kw => c.toLowerCase().includes(kw))
          );
        } else {
          // For Management/UG: search query-style match (name, courses, content hint)
          matchesSpecialization = keywords.some(kw =>
            college.name.toLowerCase().includes(kw) ||
            college.courses.some(c => c.toLowerCase().includes(kw))
          ) || true; // fallback: show all since specialization not in frontmatter for MBA
        }
      }

      const matchesState = selectedState === "All States" || 
        locInfo.state === selectedState;

      const matchesCity = selectedCity === "All Cities" || 
        locInfo.city === selectedCity;

      const matchesOwnership = selectedOwnership === "All Types" || 
        college.ownership.toLowerCase().includes(selectedOwnership.toLowerCase());

      const matchesExam = selectedExam === "All Exams" || 
        (college.exams || []).includes(selectedExam);

      // Fee Filter Logic
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

      // Ranking Filter Logic
      let matchesRanking = true;
      if (selectedRanking !== "All Rankings") {
        const rankMatch = college.ranking.match(/#(\d+)/);
        if (rankMatch) {
          const rankNum = parseInt(rankMatch[1]);
          if (selectedRanking === "Top 10") matchesRanking = rankNum <= 10;
          else if (selectedRanking === "Top 50") matchesRanking = rankNum <= 50;
          else if (selectedRanking === "Top 100") matchesRanking = rankNum <= 100;
        } else {
          matchesRanking = false; // If no numeric rank, exclude when filter is active
        }
      }

      return matchesSearch && matchesCategory && matchesCourse && matchesSpecialization && matchesState && matchesCity && matchesOwnership && matchesExam && matchesFee && matchesRanking;
    });
  }, [searchQuery, selectedCategory, selectedCourse, selectedSpecialization, selectedState, selectedCity, selectedOwnership, selectedExam, selectedFeeRange, selectedRanking, colleges, locationMap]);

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
    <div className="min-h-screen bg-slate-50/50">
      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Data for 2026 Admissions</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight italic">
              Empowering Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Academic Journey</span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
              Discover, compare, and apply to over 200+ top-tier institutes across India. 
              Get accurate data on fees, placements, and rankings in one place.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { label: "Colleges", value: "200+" },
                { label: "Streams", value: "MBA | B.Tech | BBA" },
                { label: "Support", value: "Expert Guidance" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-3xl">
                  <div className="text-2xl font-black text-white mb-1 tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-slate-50/50 clip-path-wave"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-6 md:p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-grow group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by name, course, city, or exam..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-12 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:bg-white transition-all text-lg font-bold text-slate-900 placeholder:text-slate-400 shadow-inner"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative group">
                <select 
                  value={selectedCategory}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedCategory(val);
                    setSelectedCourse("All Courses");
                    setSelectedExam("All Exams");
                    setSelectedSpecialization("All Specializations");
                    // Auto-open filters panel when a stream is chosen
                    if (val !== "All Streams") setShowFilters(true);
                  }}
                  className="appearance-none bg-blue-600 text-white pl-8 pr-12 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all cursor-pointer min-w-[180px]"
                >
                  {categories.map(cat => <option key={cat} value={cat} className="bg-white text-slate-900">{cat}</option>)}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" />
              </div>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all ${
                  showFilters || activeFiltersCount > 0 
                  ? "bg-slate-900 text-white" 
                  : "bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600"
                } relative`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-lg border-2 border-white">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Expanded Advanced Filters */}
          {showFilters && (
            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <FilterGroup 
                label={selectedCategory === "Management" ? "Course / Programme" : "Course"} 
                icon={<GraduationCap className="w-3.5 h-3.5" />}
                highlight={selectedCategory === "Management"}
              >
                <select 
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setSelectedSpecialization("All Specializations");
                  }}
                  className={`w-full border rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm ${
                    selectedCategory === "Management"
                      ? "bg-blue-50 border-blue-200 focus:ring-blue-200"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  {courseOptionsForCategory.map(course => <option key={course} value={course}>{course}</option>)}
                </select>
                {selectedCategory === "Management" && (
                  <p className="text-[10px] text-blue-500 font-semibold mt-1 ml-1">Showing management programmes only</p>
                )}
              </FilterGroup>

              {/* Specialization Filter — shown when a stream is selected */}
              {specializationOptions && specializationOptions.length > 1 && (
                <FilterGroup label="Specialization" icon={<Briefcase className="w-3.5 h-3.5" />} highlight>
                  <select
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="w-full bg-violet-50 border border-violet-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-violet-100 text-slate-900 font-bold text-sm"
                  >
                    {specializationOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {selectedCategory === "Management" && selectedSpecialization !== "All Specializations" && (
                    <p className="text-[10px] text-violet-500 font-semibold mt-1 ml-1">Refines search across all results</p>
                  )}
                </FilterGroup>
              )}
              
              <FilterGroup label="State" icon={<MapPin className="w-3.5 h-3.5" />}>
                <select 
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity("All Cities");
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm"
                >
                  {states.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
              </FilterGroup>

              <FilterGroup label="City" icon={<MapPin className="w-3.5 h-3.5" />}>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={selectedState === "All States" && cities.length <= 1}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm disabled:opacity-50"
                >
                  {cities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </FilterGroup>

              <FilterGroup label="Fees" icon={<IndianRupee className="w-3.5 h-3.5" />}>
                <select 
                  value={selectedFeeRange}
                  onChange={(e) => setSelectedFeeRange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm"
                >
                  {feeRanges.map(range => <option key={range} value={range}>{range}</option>)}
                </select>
              </FilterGroup>

              <FilterGroup label="Institute Type">
                <select 
                  value={selectedOwnership}
                  onChange={(e) => setSelectedOwnership(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm"
                >
                  {ownershipTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </FilterGroup>

              <FilterGroup label="Exam">
                <select 
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm"
                >
                  {allPossibleExams.map(exam => <option key={exam} value={exam}>{exam}</option>)}
                </select>
              </FilterGroup>

              <FilterGroup label="Ranking">
                <select 
                  value={selectedRanking}
                  onChange={(e) => setSelectedRanking(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 font-bold text-sm"
                >
                  {rankingOptions.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              </FilterGroup>

              <div className="flex items-end pb-1">
                <button 
                  onClick={resetFilters}
                  className="w-full py-3 px-4 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-2xl text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-3.5 h-3.5" />
                  Reset All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Trending Blogs — shown only when no search/filter active */}
        {searchQuery.trim() === "" && activeFiltersCount === 0 && trendingBlogs.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 px-4 py-2 rounded-full">
                <TrendingUp className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-black uppercase tracking-widest text-rose-600">Trending Articles</span>
              </div>
              <Link href="/blog" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingBlogs.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col justify-between bg-white border border-slate-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200 hover:-translate-y-1"
                >
                  <div>
                    <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3">
                      {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 leading-snug line-clamp-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-blue-500 transition-colors">
                    Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* B.Tech College Generator */}
        {searchQuery.trim() === "" && activeFiltersCount === 0 && (
          <BTechCollegeGenerator />
        )}

        {/* MBA College Generator */}
        {searchQuery.trim() === "" && activeFiltersCount === 0 && (
          <MBACollegeGenerator />
        )}

        {/* BBA College Generator */}
        {searchQuery.trim() === "" && activeFiltersCount === 0 && (
          <BBACollegeGenerator />
        )}

        {/* Results Counter & Active Chips */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <p className="text-3xl font-black text-slate-900 tracking-tighter">
              {searchQuery.trim() === "" && activeFiltersCount === 0 ? (
                "Find Your Dream College"
              ) : (
                <>Discovering <span className="text-blue-600">{filteredColleges.length}</span> Premium Choices</>
              )}
            </p>
            
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2">
                {[
                  { label: selectedCategory, active: selectedCategory !== "All Streams", onClear: () => setSelectedCategory("All Streams") },
                  { label: selectedCourse, active: selectedCourse !== "All Courses", onClear: () => setSelectedCourse("All Courses") },
                  { label: selectedState, active: selectedState !== "All States", onClear: () => setSelectedState("All States") },
                  { label: selectedCity, active: selectedCity !== "All Cities", onClear: () => setSelectedCity("All Cities") },
                  { label: selectedFeeRange, active: selectedFeeRange !== "All Fees", onClear: () => setSelectedFeeRange("All Fees") },
                ].map((chip, i) => chip.active && (
                  <button 
                    key={i} 
                    onClick={chip.onClear}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-100 hover:bg-blue-100 transition-colors"
                  >
                    {chip.label}
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* College Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {searchQuery.trim() === "" && activeFiltersCount === 0 ? (
            <div className="col-span-full py-32 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-blue-50 border-4 border-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner animate-pulse">
                  <Search className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">Search Our Directory</h3>
                <p className="text-slate-500 font-medium">Use the search bar above or apply filters to discover verified colleges tailored exactly to your profile and admission goals.</p>
              </div>
            </div>
          ) : (
            <>
              {filteredColleges.map((college) => (
                <CollegeCard key={college.slug} college={college} />
              ))}
              
              {filteredColleges.length === 0 && (
                <div className="col-span-full py-32 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Search className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">No matching colleges</h3>
                    <p className="text-slate-500 mb-10 font-medium">We couldn&apos;t find any colleges matching your current filters. Try broadening your parameters or start fresh.</p>
                    <button 
                      onClick={resetFilters}
                      className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                    >
                      Clear All Discover Filters
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, icon, children, highlight }: { label: string, icon?: React.ReactNode, children: React.ReactNode, highlight?: boolean }) {
  return (
    <div className="space-y-2">
      <label className={`text-[10px] font-black uppercase tracking-[0.2em] ml-1 flex items-center gap-1.5 ${
        highlight ? "text-blue-500" : "text-slate-400"
      }`}>
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
