"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import Link from "next/link";
import { CollegeMetadata } from "@/lib/colleges";
import { CollegeCard } from "@/components/CollegeCard";
import { BTechCollegeGenerator } from "@/components/BTechCollegeGenerator";
import { MBACollegeGenerator } from "@/components/MBACollegeGenerator";
import { BBACollegeGenerator } from "@/components/BBACollegeGenerator";
import { CompareDrawer } from "@/components/CompareDrawer";
import { Search, X, MapPin, GraduationCap, IndianRupee, Briefcase, Filter, ChevronDown, Sparkles, TrendingUp, Layers, Check } from "lucide-react";

interface TrendingBlog {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

export function CollegesClient({ colleges, trendingBlogs = [] }: { colleges: CollegeMetadata[]; trendingBlogs?: TrendingBlog[] }) {
  const router = useRouter();
  const [comparedColleges, setComparedColleges] = useState<CollegeMetadata[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
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

  useEffect(() => {
    const q = searchParams?.get('search') || '';
    if (q) setSearchQuery(q);
  }, [searchParams]);

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

  useEffect(() => {
    console.log('Filtered colleges count:', filteredColleges.length);
  }, [filteredColleges]);

  useEffect(() => {
    console.log("Search input changed:", searchQuery);
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
      <section className="relative pt-20 pb-28 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-brand/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-brand/10 border border-primary-brand/20 text-primary-brand text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Admissions Predictor</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Find the Best College for <span className="text-primary-brand">Your Future</span>
          </h1>
          
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-medium">
            Explore 200+ verified premium institutions in India. Check rankings, cut-offs, fee structures, and placement details.
          </p>
        </div>
      </section>

      {/* Main Filter & Dashboard Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
        
        {/* Stream Selector Tab & Search Bar Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 mb-8 space-y-5">
          {/* Category Tabs */}
          <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar gap-6 pb-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedCourse("All Courses");
                    setSelectedExam("All Exams");
                    setSelectedSpecialization("All Specializations");
                  }}
                  className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? "border-primary-brand text-primary-brand" 
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Action Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search colleges by name, courses, or exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-brand/20 focus:bg-white transition-all text-sm font-bold text-slate-800 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button className="bg-primary-brand hover:bg-primary-brand/90 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md shadow-primary-brand/10">
              Search
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 shrink-0 ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary-brand" /> Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button onClick={resetFilters} className="text-xs font-bold text-rose-500 hover:underline">
                    Reset
                  </button>
                )}
              </div>

              {/* Accordions */}
              <div className="space-y-4">
                <FilterGroup label="Course" icon={<GraduationCap className="w-3.5 h-3.5" />}>
                  <select 
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e.target.value);
                      setSelectedSpecialization("All Specializations");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary-brand/10 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {courseOptionsForCategory.map(course => <option key={course} value={course}>{course}</option>)}
                  </select>
                </FilterGroup>

                {specializationOptions && specializationOptions.length > 1 && (
                  <FilterGroup label="Specialization" icon={<Briefcase className="w-3.5 h-3.5" />}>
                    <select
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary-brand/10 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      {specializationOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </FilterGroup>
                )}
                
                <FilterGroup label="State" icon={<MapPin className="w-3.5 h-3.5" />}>
                  <select 
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity("All Cities");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary-brand/10 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="City" icon={<MapPin className="w-3.5 h-3.5" />}>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={selectedState === "All States" && cities.length <= 1}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary-brand/10 text-slate-700 font-bold text-xs disabled:opacity-50 cursor-pointer"
                  >
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Fees" icon={<IndianRupee className="w-3.5 h-3.5" />}>
                  <select 
                    value={selectedFeeRange}
                    onChange={(e) => setSelectedFeeRange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary-brand/10 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {feeRanges.map(range => <option key={range} value={range}>{range}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Exam">
                  <select 
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary-brand/10 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {allPossibleExams.map(exam => <option key={exam} value={exam}>{exam}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Ownership">
                  <select 
                    value={selectedOwnership}
                    onChange={(e) => setSelectedOwnership(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary-brand/10 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {ownershipTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </FilterGroup>
              </div>

            </div>
          </aside>

          {/* Right Listings Column */}
          <main className="w-full lg:w-3/4">
            
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                Top Colleges in India <span className="text-primary-brand bg-primary-brand/10 px-2.5 py-0.5 rounded-full text-xs font-black ml-2">{filteredColleges.length} Found</span>
              </h2>
              <button 
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="lg:hidden flex items-center gap-1.5 px-4 py-2 bg-slate-800 text-white rounded-lg font-bold text-xs"
              >
                <Filter className="w-3.5 h-3.5" />
                Filters
              </button>
            </div>

            {/* Grid listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {visibleColleges.map((college) => (
                <CollegeCard 
                  key={college.slug} 
                  college={college} 
                  onCompareToggle={handleCompareToggle}
                  isCompared={comparedColleges.some((c) => c.slug === college.slug)}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredColleges.length === 0 && (
              <div className="py-20 text-center bg-white rounded-2xl border border-slate-200/60 p-6">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">No colleges match your filter</h3>
                <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">Try clearing one or more active filters to view results.</p>
                <button 
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-primary-brand text-white rounded-xl font-bold text-xs uppercase tracking-wider"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {visibleCount < filteredColleges.length && (
              <div className="flex justify-center mt-10">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 20)}
                  className="px-8 py-3 bg-white border border-primary-brand text-primary-brand hover:bg-primary-brand/5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Load More ({filteredColleges.length - visibleCount} remaining)
                </button>
              </div>
            )}

            {/* Trending Blogs */}
            {trendingBlogs && trendingBlogs.length > 0 && (
              <div className="mt-16 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-2 mb-6 text-primary-brand">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-black uppercase tracking-wider">Top Admission Insights</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trendingBlogs.slice(0, 4).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      prefetch={false}
                      className="group block bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary-brand/20 transition-all"
                    >
                      <span className="text-[10px] font-bold text-primary-brand/80 block mb-2">
                        {new Date(post.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-primary-brand transition-colors">
                        {post.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Generators */}
            <div className="space-y-12 mt-16">
               <BTechCollegeGenerator />
               <MBACollegeGenerator />
               <BBACollegeGenerator />
            </div>

          </main>
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

function FilterGroup({ label, icon, children }: { label: string, icon?: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 ml-1">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
