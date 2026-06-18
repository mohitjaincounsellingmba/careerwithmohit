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
import { Search, X, MapPin, GraduationCap, IndianRupee, Briefcase, Filter, ChevronDown, Sparkles, TrendingUp, Layers, Check, Award, ShieldCheck } from "lucide-react";

interface TrendingBlog {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

// Helpers to calculate ROI (average placement / fees)
function parsePlacementNum(val: string): number {
  if (!val) return 0;
  const clean = val.replace(/[₹,\s]/g, "").toLowerCase();
  const match = clean.match(/([\d.]+)\s*(?:lpa|l|k)?/);
  if (match) {
    let num = parseFloat(match[1]);
    if (clean.includes("k")) num = num / 100;
    return num;
  }
  return 0;
}

function parseFeesNum(val: string): number {
  if (!val) return 0;
  const clean = val.replace(/[₹,\s]/g, "").toLowerCase();
  const match = clean.match(/([\d.]+)\s*(?:lakhs|lakh|l|cr)?/);
  if (match) {
    let num = parseFloat(match[1]);
    if (clean.includes("cr")) num = num * 100;
    return num;
  }
  return 0;
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

  // Dynamic counts for each category
  const managementCount = useMemo(() => colleges.filter(c => c.category === "Management").length, [colleges]);
  const engineeringCount = useMemo(() => colleges.filter(c => c.category === "Engineering").length, [colleges]);
  const ugCount = useMemo(() => colleges.filter(c => c.category === "UG Courses").length, [colleges]);
  const totalCount = colleges.length;

  // Dynamically extract Top 4 ROI choices
  const featuredColleges = useMemo(() => {
    return [...colleges]
      .map(c => {
        const placement = parsePlacementNum(c.avg_placement);
        const fees = parseFeesNum(c.fees);
        const roi = fees > 0 ? placement / fees : 0;
        return { college: c, roi };
      })
      .filter(item => item.roi > 0 && item.college.avg_placement !== "Not Disclosed")
      .sort((a, b) => b.roi - a.roi)
      .slice(0, 4)
      .map(item => item.college);
  }, [colleges]);

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
      <section className="relative pt-24 pb-28 overflow-hidden bg-primary border-b-8 border-foreground">
        {/* Flat Geometric Decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rotate-45 bg-white/10" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-foreground border-2 border-foreground rounded-md text-[10px] font-black uppercase tracking-widest mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles className="w-4 h-4 stroke-[2.5px]" />
            <span>Admissions Directory 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight uppercase leading-none">
            Find the Best College <br />
            <span className="bg-white text-foreground px-4 py-1.5 inline-block -rotate-1 border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mt-2">
              For Your Future
            </span>
          </h1>
          
          <p className="text-lg text-blue-50 max-w-2xl mx-auto font-bold italic leading-relaxed">
            Explore 260+ verified premium institutions in India. Uncompromised fee structures, authentic average placement audits, and cutoffs.
          </p>

          {/* Statistics Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12 bg-white border-4 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {[
              { label: "Verified Colleges", value: `${totalCount}+`, icon: "🏢" },
              { label: "Fee Structures", value: "100% Clear", icon: "💰" },
              { label: "Placement Audits", value: "Verified 2025", icon: "📈" },
              { label: "Counselling Desk", value: "15k+ Dominated", icon: "🚀" }
            ].map((ticker, index) => (
              <div key={index} className="flex items-center gap-3 justify-center md:justify-start">
                <span className="text-3xl">{ticker.icon}</span>
                <div className="text-left">
                  <div className="text-lg font-black text-foreground leading-none">{ticker.value}</div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{ticker.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Filter & Dashboard Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 -mt-10 relative z-30">
        
        {/* Stream Selector Pill Grid */}
        <div className="bg-white rounded-2xl border-4 border-foreground p-6 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          
          {/* Custom Neo-Brutalist Category Switches */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: "All Streams", label: "All Streams", count: totalCount, icon: "🌐" },
              { id: "Management", label: "MBA & PGDM", count: managementCount, icon: "🎓" },
              { id: "UG Courses", label: "BBA & UG", count: ugCount, icon: "📈" },
              { id: "Engineering", label: "B.Tech & Engg", count: engineeringCount, icon: "💻" }
            ].map((stream) => {
              const isActive = selectedCategory === stream.id;
              return (
                <button
                  key={stream.id}
                  onClick={() => {
                    setSelectedCategory(stream.id);
                    setSelectedCourse("All Courses");
                    setSelectedExam("All Exams");
                    setSelectedSpecialization("All Specializations");
                    setSelectedState("All States");
                    setSelectedCity("All Cities");
                    setSelectedFeeRange("All Fees");
                    setSelectedRanking("All Rankings");
                  }}
                  className={`flex items-center justify-between p-4 border-2 border-foreground transition-all rounded-xl cursor-pointer ${
                    isActive 
                      ? "bg-accent text-foreground shadow-none translate-x-[2px] translate-y-[2px]" 
                      : `bg-white hover:bg-slate-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{stream.icon}</span>
                    <div className="text-left">
                      <span className="block text-xs font-black uppercase tracking-tight text-foreground leading-none">
                        {stream.label}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        Explore
                      </span>
                    </div>
                  </div>
                  <span className="bg-foreground text-white border border-foreground text-[10px] font-black px-2 py-0.5 rounded-md">
                    {stream.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Action Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground w-5 h-5 stroke-[2.5px]" />
              <input
                type="text"
                placeholder="Search colleges by name, city, courses, or exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border-2 border-foreground focus:outline-none focus:bg-white transition-all text-sm font-black text-foreground placeholder:text-slate-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button className="bg-foreground hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest px-8 py-3.5 border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(59,130,246,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              Search
            </button>
          </div>
        </div>

        {/* Featured Showcase */}
        {featuredColleges.length > 0 && selectedCategory === "All Streams" && searchQuery === "" && (
          <div className="mb-12 border-4 border-foreground bg-accent/5 p-6 sm:p-8 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-6 border-b-2 border-foreground pb-4 border-dashed">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent stroke-[2.5px]" />
                <h3 className="text-lg font-black uppercase tracking-tight text-foreground italic">
                  Top Featured Choices · High ROI Picks
                </h3>
              </div>
              <span className="bg-accent text-foreground text-[9px] font-black px-3 py-1 border-2 border-foreground rounded-md uppercase tracking-wider">
                2026 Admissions
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredColleges.map((college) => (
                <CollegeCard 
                  key={college.slug} 
                  college={college} 
                  onCompareToggle={handleCompareToggle}
                  isCompared={comparedColleges.some((c) => c.slug === college.slug)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 shrink-0 ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl border-4 border-foreground p-5 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              
              <div className="flex items-center justify-between border-b-2 border-foreground pb-4">
                <h3 className="text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Filter className="w-4 h-4 text-foreground stroke-[2.5px]" /> Filter Panel
                </h3>
                {activeFiltersCount > 0 && (
                  <button onClick={resetFilters} className="text-xs font-black text-rose-600 hover:underline uppercase tracking-wide">
                    Reset
                  </button>
                )}
              </div>

              {/* Styled Select Box Accordions */}
              <div className="space-y-4">
                <FilterGroup label="Course" icon={<GraduationCap className="w-3.5 h-3.5" />}>
                  <select 
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e.target.value);
                      setSelectedSpecialization("All Specializations");
                    }}
                    className="w-full bg-white border-2 border-foreground rounded-none py-2 px-3 focus:outline-none focus:bg-accent/10 text-foreground font-black text-xs cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    {courseOptionsForCategory.map(course => <option key={course} value={course}>{course}</option>)}
                  </select>
                </FilterGroup>

                {specializationOptions && specializationOptions.length > 1 && (
                  <FilterGroup label="Specialization" icon={<Briefcase className="w-3.5 h-3.5" />}>
                    <select
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                      className="w-full bg-white border-2 border-foreground rounded-none py-2 px-3 focus:outline-none focus:bg-accent/10 text-foreground font-black text-xs cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
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
                    className="w-full bg-white border-2 border-foreground rounded-none py-2 px-3 focus:outline-none focus:bg-accent/10 text-foreground font-black text-xs cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="City" icon={<MapPin className="w-3.5 h-3.5" />}>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={selectedState === "All States" && cities.length <= 1}
                    className="w-full bg-white border-2 border-foreground rounded-none py-2 px-3 focus:outline-none focus:bg-accent/10 text-foreground font-black text-xs cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50"
                  >
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Fees Budget" icon={<IndianRupee className="w-3.5 h-3.5" />}>
                  <select 
                    value={selectedFeeRange}
                    onChange={(e) => setSelectedFeeRange(e.target.value)}
                    className="w-full bg-white border-2 border-foreground rounded-none py-2 px-3 focus:outline-none focus:bg-accent/10 text-foreground font-black text-xs cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    {feeRanges.map(range => <option key={range} value={range}>{range}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Entrance Exam" icon={<Award className="w-3.5 h-3.5" />}>
                  <select 
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full bg-white border-2 border-foreground rounded-none py-2 px-3 focus:outline-none focus:bg-accent/10 text-foreground font-black text-xs cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    {allPossibleExams.map(exam => <option key={exam} value={exam}>{exam}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Ownership Type">
                  <select 
                    value={selectedOwnership}
                    onChange={(e) => setSelectedOwnership(e.target.value)}
                    className="w-full bg-white border-2 border-foreground rounded-none py-2 px-3 focus:outline-none focus:bg-accent/10 text-foreground font-black text-xs cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    {ownershipTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </FilterGroup>
              </div>

              {/* Counselor Hotline Banner */}
              <div className="border-4 border-foreground bg-accent p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group border-dashed">
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-16 h-16 bg-white/10 rounded-full rotate-45" />
                <h4 className="text-xl font-black uppercase leading-none mb-2 tracking-tight italic">
                  Admission <br />Guidance Desk
                </h4>
                <div className="w-16 h-1 bg-foreground mb-4" />
                <p className="text-xs font-bold text-foreground/80 leading-snug mb-6 italic">
                  Confused about placement rates, direct admission, or scholarship budgets? Contact Mohit Jain's counsel.
                </p>
                
                <div className="space-y-3">
                  <Link 
                    href="/inquiry" 
                    className="block w-full text-center py-3 bg-foreground text-white font-black uppercase tracking-widest text-[10px] border-2 border-foreground hover:bg-white hover:text-foreground transition-all shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px]"
                  >
                    Get Free Advice &rarr;
                  </Link>
                  <a 
                    href="https://wa.me/919560020771" 
                    className="block w-full text-center py-3 bg-white text-foreground font-black uppercase tracking-widest text-[10px] border-2 border-foreground hover:bg-slate-50 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px]"
                  >
                    WhatsApp Helpline
                  </a>
                </div>
              </div>

            </div>
          </aside>

          {/* Right Listings Column */}
          <main className="w-full lg:w-3/4">
            
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-black text-foreground uppercase tracking-tight italic">
                Colleges Directory <span className="bg-primary text-white border-2 border-foreground px-3 py-0.5 rounded-md text-xs font-black ml-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{filteredColleges.length} Verified</span>
              </h2>
              <button 
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="lg:hidden flex items-center gap-1.5 px-4 py-2 bg-foreground text-white border-2 border-foreground rounded-lg font-black text-xs"
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
              <div className="py-20 text-center bg-white border-4 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-black text-foreground uppercase mb-1">No colleges match your filter</h3>
                <p className="text-slate-400 text-xs font-bold mb-6 max-w-sm mx-auto">Try clearing one or more active filters to view results.</p>
                <button 
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-accent text-foreground border-2 border-foreground font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px]"
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
                  className="px-8 py-3.5 bg-white border-2 border-foreground text-foreground hover:bg-slate-50 font-black text-xs uppercase tracking-widest transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2.5px] hover:translate-y-[2.5px]"
                >
                  Load More ({filteredColleges.length - visibleCount} remaining)
                </button>
              </div>
            )}

            {/* Trending Blogs */}
            {trendingBlogs && trendingBlogs.length > 0 && (
              <div className="mt-16 border-t-4 border-foreground border-dashed pt-10">
                <div className="flex items-center gap-2 mb-6 text-foreground">
                  <TrendingUp className="w-5 h-5 text-primary stroke-[2.5px]" />
                  <span className="text-sm font-black uppercase tracking-widest">Trending Insights & Strategy</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trendingBlogs.slice(0, 4).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      prefetch={false}
                      className="group block bg-white border-2 border-foreground p-5 hover:bg-slate-50 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px]"
                    >
                      <span className="text-[9px] font-black text-slate-400 block mb-2 uppercase tracking-wider">
                        {new Date(post.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                      </span>
                      <h4 className="text-sm font-black text-foreground leading-snug group-hover:text-primary transition-colors">
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
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 ml-1">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
