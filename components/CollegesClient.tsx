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
import { BrochureModal } from "@/components/BrochureModal";
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
  const [sortBy, setSortBy] = useState("default");
  const [userScoreInput, setUserScoreInput] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [brochureCollege, setBrochureCollege] = useState<CollegeMetadata | null>(null);
  const [activeToolTab, setActiveToolTab] = useState<'mba' | 'btech' | 'bba'>('mba');

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
  }, [searchQuery, selectedCategory, selectedCourse, selectedSpecialization, selectedState, selectedCity, selectedOwnership, selectedExam, selectedFeeRange, selectedRanking, sortBy]);

  const sortedColleges = useMemo(() => {
    const parseLakhs = (str?: string): number => {
      if (!str) return 0;
      const match = str.match(/([0-9]+(\.[0-9]+)?)/);
      return match ? parseFloat(match[1]) : 0;
    };
    const getRank = (c: CollegeMetadata) => {
      const m = c.ranking.match(/#(\d+)/);
      return m ? parseInt(m[1]) : 999;
    };
    const list = [...filteredColleges];
    list.sort((a, b) => {
      if (sortBy === "roi") {
        const roiA = parseLakhs(a.avg_placement) / (parseLakhs(a.fees) || 1);
        const roiB = parseLakhs(b.avg_placement) / (parseLakhs(b.fees) || 1);
        return roiB - roiA;
      }
      if (sortBy === "avg_placement") {
        return parseLakhs(b.avg_placement) - parseLakhs(a.avg_placement);
      }
      if (sortBy === "highest_placement") {
        return parseLakhs(b.highest_placement) - parseLakhs(a.highest_placement);
      }
      if (sortBy === "fees_low") {
        return parseLakhs(a.fees) - parseLakhs(b.fees);
      }
      if (sortBy === "ranking") {
        return getRank(a) - getRank(b);
      }
      return 0;
    });
    return list;
  }, [filteredColleges, sortBy]);

  const visibleColleges = sortedColleges.slice(0, visibleCount);

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
    <div className="min-h-screen bg-slate-50 pb-32 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Premium EdTech Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0D233E] to-[#123058] text-white border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-radial from-sky-500/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Audited College Directory 2027–2029 • 600+ Campuses</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight leading-tight">
            Discover & Compare Top Colleges in India.{' '}
            <span className="block mt-1 bg-gradient-to-r from-blue-300 via-sky-200 to-amber-300 bg-clip-text text-transparent">
              Verified Fees, Cutoffs & Placement Audits.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore 600+ verified premium institutions in India. Check rankings, cut-offs, fee structures, average vs highest packages, and get direct 1-on-1 counseling.
          </p>

          {/* Quick Filter Shortcuts */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6 max-w-3xl mx-auto">
            <span className="text-xs text-slate-300 font-medium mr-1">Trending:</span>
            {[
              { label: 'Top 20 IIMs', onClick: () => setSearchQuery('IIM') },
              { label: 'Delhi NCR B-Schools', onClick: () => { setSelectedState('Delhi NCR'); setSelectedCity('All Cities'); } },
              { label: 'Pune Tier-1 PGDM', onClick: () => { setSelectedState('Maharashtra'); setSelectedCity('Pune'); } },
              { label: 'High ROI (< ₹10L)', onClick: () => setSelectedFeeRange('₹5 - ₹10 Lakhs') },
              { label: 'Top Placements', onClick: () => setSortBy('avg_placement') },
            ].map((chip) => (
              <button
                key={chip.label}
                onClick={chip.onClick}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white text-xs font-medium transition-all backdrop-blur-sm cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Filter & Dashboard Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        
        {/* Stream Selector Tab & Search Bar Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 p-4 sm:p-5 mb-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar gap-2 pb-3">
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
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
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
                className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-xl transition-all shadow-sm"
            >
              Search
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 shrink-0 ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar space-y-6 shadow-sm">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-600" /> Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button onClick={resetFilters} className="text-xs font-bold text-rose-500 hover:underline cursor-pointer">
                    Reset All
                  </button>
                )}
              </div>

              {/* Accordions */}
              <div className="space-y-4">
                <FilterGroup label="Course" icon={<GraduationCap className="w-3.5 h-3.5 text-blue-600" />}>
                  <select 
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e.target.value);
                      setSelectedSpecialization("All Specializations");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {courseOptionsForCategory.map(course => <option key={course} value={course}>{course}</option>)}
                  </select>
                </FilterGroup>

                {specializationOptions && specializationOptions.length > 1 && (
                  <FilterGroup label="Specialization" icon={<Briefcase className="w-3.5 h-3.5 text-indigo-600" />}>
                    <select
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      {specializationOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </FilterGroup>
                )}
                
                <FilterGroup label="State" icon={<MapPin className="w-3.5 h-3.5 text-emerald-600" />}>
                  <select 
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity("All Cities");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="City" icon={<MapPin className="w-3.5 h-3.5 text-cyan-600" />}>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={selectedState === "All States" && cities.length <= 1}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs disabled:opacity-50 cursor-pointer"
                  >
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Fees" icon={<IndianRupee className="w-3.5 h-3.5 text-amber-600" />}>
                  <select 
                    value={selectedFeeRange}
                    onChange={(e) => setSelectedFeeRange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {feeRanges.map(range => <option key={range} value={range}>{range}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Exam">
                  <select 
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {allPossibleExams.map(exam => <option key={exam} value={exam}>{exam}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Ownership">
                  <select 
                    value={selectedOwnership}
                    onChange={(e) => setSelectedOwnership(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {ownershipTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </FilterGroup>
              </div>

            </div>
          </aside>

          {/* Right Listings Column */}
          <main className="w-full lg:w-3/4">
            
            {/* AI College Predictor Bar */}
            <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-blue-50 via-indigo-50/40 to-sky-50 rounded-2xl border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                  AI
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>College Admission Call Predictor</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Live</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enter your CAT / XAT / CMAT / JEE percentile to evaluate your call chances.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="number"
                  placeholder="e.g. 85 (%ile)"
                  value={userScoreInput}
                  onChange={(e) => {
                    setUserScoreInput(e.target.value);
                    const val = parseFloat(e.target.value);
                    setUserScore(isNaN(val) ? 0 : val);
                  }}
                  className="w-full sm:w-36 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white"
                />
                {userScore > 0 && (
                  <button
                    onClick={() => {
                      setUserScoreInput("");
                      setUserScore(0);
                    }}
                    className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Results Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-slate-800">
                Top Colleges in India <span className="text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full text-xs font-black ml-2">{filteredColleges.length} Found</span>
              </h2>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  <span>Sort by:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 cursor-pointer shadow-sm"
                >
                  <option value="default">Recommended (Default)</option>
                  <option value="roi">🔥 Highest ROI (Placement / Fee Ratio)</option>
                  <option value="avg_placement">Avg Placement (High to Low)</option>
                  <option value="highest_placement">Highest Package (High to Low)</option>
                  <option value="fees_low">Lowest Course Fees</option>
                  <option value="ranking">Top NIRF Ranking</option>
                </select>
                <button 
                  onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                  className="lg:hidden flex items-center gap-1.5 px-4 py-2 bg-slate-800 text-white rounded-lg font-bold text-xs cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5" />
                  Filters
                </button>
              </div>
            </div>

            {/* Grid listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {visibleColleges.map((college) => (
                <CollegeCard 
                  key={college.slug} 
                  college={college} 
                  onCompareToggle={handleCompareToggle}
                  isCompared={comparedColleges.some((c) => c.slug === college.slug)}
                  onDownloadBrochure={(c) => setBrochureCollege(c)}
                  userScore={userScore}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredColleges.length === 0 && (
              <div className="py-20 text-center bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-base font-bold text-slate-800 mb-1">No colleges match your active filters</h3>
                <p className="text-slate-500 text-xs sm:text-sm mb-6 max-w-sm mx-auto">Try clearing one or more active filters or search terms to explore available campuses.</p>
                <button 
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {visibleCount < filteredColleges.length && (
              <div className="flex justify-center mt-10">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 20)}
                  className="px-8 py-3 bg-white border border-slate-200 hover:border-blue-400 text-slate-800 hover:text-blue-600 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  Load More Colleges ({filteredColleges.length - visibleCount} remaining)
                </button>
              </div>
            )}

            {/* Trending Blogs */}
            {trendingBlogs && trendingBlogs.length > 0 && (
              <div className="mt-16 border-t border-slate-200/80 pt-10">
                <div className="flex items-center gap-2 mb-6 text-blue-600">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-extrabold uppercase tracking-wider">Top Admission Insights</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trendingBlogs.slice(0, 4).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      prefetch={false}
                      className="group block bg-white border border-slate-200/90 rounded-2xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <span className="text-[10px] font-bold text-blue-600 block mb-1">
                        {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Shortlist Generators */}
            <div className="mt-16 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 shadow-xs">
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  Instant Shortlisting Tools
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2">
                  Admissions Predictors & Shortlist Generators
                </h3>
              </div>
              <div className="flex gap-2 border-b border-slate-100 pb-3 mb-6 overflow-x-auto no-scrollbar">
                {[
                  { id: 'mba', label: 'MBA / PGDM Predictor' },
                  { id: 'btech', label: 'B.Tech Shortlister' },
                  { id: 'bba', label: 'BBA & BCA Shortlister' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveToolTab(t.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeToolTab === t.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {activeToolTab === 'mba' && <MBACollegeGenerator />}
              {activeToolTab === 'btech' && <BTechCollegeGenerator />}
              {activeToolTab === 'bba' && <BBACollegeGenerator />}
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
      <BrochureModal
        isOpen={!!brochureCollege}
        onClose={() => setBrochureCollege(null)}
        collegeName={brochureCollege?.name || ""}
        collegeSlug={brochureCollege?.slug || ""}
        brochureUrl={brochureCollege?.brochure_url}
        feesText={brochureCollege?.fees}
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
