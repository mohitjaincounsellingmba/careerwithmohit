"use client";

import { useState, useMemo } from "react";
import { CollegeMetadata } from "@/lib/colleges";
import { CollegeCard } from "@/components/CollegeCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

export function CollegesClient({ colleges }: { colleges: CollegeMetadata[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Streams");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedOwnership, setSelectedOwnership] = useState("All Types");
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [selectedFeeRange, setSelectedFeeRange] = useState("All Fees");
  const [selectedRanking, setSelectedRanking] = useState("All Rankings");
  const [showFilters, setShowFilters] = useState(false);

  // Mapping of common patterns to standardized State/City
  const locationMap = useMemo(() => {
    return colleges.reduce((acc, college) => {
      const loc = college.location.toLowerCase();
      let state = "Other";
      let city = "Other";

      if (loc.includes("delhi")) {
        state = "Delhi";
        city = "Delhi";
      } else if (loc.includes("uttar pradesh") || loc.includes("noida") || loc.includes("greater noida")) {
        state = "Uttar Pradesh";
        city = loc.includes("greater noida") ? "Greater Noida" : "Noida";
      } else if (loc.includes("haryana") || loc.includes("gurgaon")) {
        state = "Haryana";
        city = "Gurgaon";
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
  
  const allPossibleCourses = useMemo(() => {
    const courses = new Set<string>();
    colleges.forEach(c => c.courses.forEach(course => courses.add(course)));
    return ["All Courses", ...Array.from(courses)].sort();
  }, [colleges]);

  const allPossibleExams = useMemo(() => {
    const exams = new Set<string>();
    colleges.forEach(c => (c.exams || []).forEach(exam => exams.add(exam)));
    return ["All Exams", ...Array.from(exams)].sort();
  }, [colleges]);

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

      const matchesCourse = selectedCourse === "All Courses" || 
        college.courses.includes(selectedCourse);

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

      return matchesSearch && matchesCategory && matchesCourse && matchesState && matchesCity && matchesOwnership && matchesExam && matchesFee && matchesRanking;
    });
  }, [searchQuery, selectedCategory, selectedCourse, selectedState, selectedCity, selectedOwnership, selectedExam, selectedFeeRange, selectedRanking, colleges, locationMap]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase italic">
            Find Your <span className="bg-primary text-white px-3 py-1 -rotate-1 inline-block border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">Dream</span> College
          </h1>
          <p className="text-xl font-bold text-slate-600 max-w-2xl mx-auto leading-tight">
            Comprehensive guide to top universities and institutes. B.Tech, MBA, BBA, and BCA—all in one place.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] border-4 border-foreground p-6 mb-16 flex flex-col gap-6 sticky top-24 z-30">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 stroke-[3px]" />
              <input
                type="text"
                placeholder="Search colleges, courses, cities, or exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-12 py-4 bg-slate-50 border-4 border-foreground rounded-xl focus:ring-4 focus:ring-primary/20 transition-all text-xl font-bold text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6 stroke-[3px]" />
                </button>
              )}
            </div>
            
            <div className="flex gap-4">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-accent text-white border-4 border-foreground rounded-xl px-6 py-4 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-8 py-4 border-4 border-foreground rounded-xl font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(244,63,94,1)] hover:shadow-none transition-all ${showFilters ? "bg-white text-foreground" : "bg-foreground text-white"}`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                {showFilters ? "Less" : "Filters"}
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t-4 border-foreground/10 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Specific Course</label>
                <select 
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full bg-slate-50 border-4 border-foreground rounded-xl py-3 px-4 focus:ring-0 text-slate-900 font-bold"
                >
                  {allPossibleCourses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Select State</label>
                <select 
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity("All Cities"); // Reset city when state changes
                  }}
                  className="w-full bg-slate-50 border-4 border-foreground rounded-xl py-3 px-4 focus:ring-0 text-slate-900 font-bold"
                >
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Select City</label>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={selectedState === "All States" && cities.length <= 1}
                  className="w-full bg-slate-50 border-4 border-foreground rounded-xl py-3 px-4 focus:ring-0 text-slate-900 font-bold disabled:opacity-50"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Type of Institute</label>
                <select 
                  value={selectedOwnership}
                  onChange={(e) => setSelectedOwnership(e.target.value)}
                  className="w-full bg-slate-50 border-4 border-foreground rounded-xl py-3 px-4 focus:ring-0 text-slate-900 font-bold"
                >
                  {ownershipTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Accepted Exams</label>
                <select 
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full bg-slate-50 border-4 border-foreground rounded-xl py-3 px-4 focus:ring-0 text-slate-900 font-bold"
                >
                  {allPossibleExams.map(exam => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Fee Range</label>
                <select 
                  value={selectedFeeRange}
                  onChange={(e) => setSelectedFeeRange(e.target.value)}
                  className="w-full bg-slate-50 border-4 border-foreground rounded-xl py-3 px-4 focus:ring-0 text-slate-900 font-bold"
                >
                  {feeRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">NIRF Ranking</label>
                <select 
                  value={selectedRanking}
                  onChange={(e) => setSelectedRanking(e.target.value)}
                  className="w-full bg-slate-50 border-4 border-foreground rounded-xl py-3 px-4 focus:ring-0 text-slate-900 font-bold"
                >
                  {rankingOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="lg:col-span-3 flex justify-center mt-2">
                <button 
                  onClick={() => {
                    setSelectedCategory("All Streams");
                    setSelectedCourse("All Courses");
                    setSelectedState("All States");
                    setSelectedCity("All Cities");
                    setSelectedOwnership("All Types");
                    setSelectedExam("All Exams");
                    setSelectedFeeRange("All Fees");
                    setSelectedRanking("All Rankings");
                    setSearchQuery("");
                  }}
                  className="text-sm font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 p-2 underline decoration-4 underline-offset-4"
                >
                  Reset All Discovery Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="mb-12 flex items-center justify-between border-b-4 border-foreground pb-4">
          <p className="text-2xl font-black uppercase tracking-tighter">
            Found <span className="text-primary">{filteredColleges.length}</span> Opportunities
          </p>
        </div>

        {/* College Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredColleges.map((college) => (
            <CollegeCard key={college.slug} college={college} />
          ))}
          
          {filteredColleges.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 inline-block">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No colleges found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your search for "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Clear search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
