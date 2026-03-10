"use client";

import { useState, useMemo } from "react";
import { CollegeMetadata } from "@/lib/colleges";
import { CollegeCard } from "@/components/CollegeCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

export function CollegesClient({ colleges }: { colleges: CollegeMetadata[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Streams");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedOwnership, setSelectedOwnership] = useState("All Types");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All Streams", "Management", "Engineering", "UG Courses"];
  
  const allPossibleCourses = useMemo(() => {
    const courses = new Set<string>();
    colleges.forEach(c => c.courses.forEach(course => courses.add(course)));
    return ["All Courses", ...Array.from(courses)].sort();
  }, [colleges]);

  const cities = useMemo(() => {
    const allCities = colleges.map(c => c.location.split(',')[0].trim());
    return ["All Cities", ...Array.from(new Set(allCities))].sort();
  }, [colleges]);

  const ownershipTypes = ["All Types", "Public", "Private"];

  const filteredColleges = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    return colleges.filter(college => {
      const matchesSearch = !query || 
        college.name.toLowerCase().includes(query) ||
        college.location.toLowerCase().includes(query) ||
        (college.exams || []).some(exam => exam.toLowerCase().includes(query)) ||
        college.courses.some(c => c.toLowerCase().includes(query));

      const matchesCategory = selectedCategory === "All Streams" || 
        college.category === selectedCategory;

      const matchesCourse = selectedCourse === "All Courses" || 
        college.courses.includes(selectedCourse);

      const matchesCity = selectedCity === "All Cities" || 
        college.location.toLowerCase().includes(selectedCity.toLowerCase());

      const matchesOwnership = selectedOwnership === "All Types" || 
        college.ownership.toLowerCase().includes(selectedOwnership.toLowerCase());

      return matchesSearch && matchesCategory && matchesCourse && matchesCity && matchesOwnership;
    });
  }, [searchQuery, selectedCategory, selectedCourse, selectedCity, selectedOwnership, colleges]);

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
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Location / City</label>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 border-4 border-foreground rounded-xl py-3 px-4 focus:ring-0 text-slate-900 font-bold"
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
              
              <div className="lg:col-span-3 flex justify-center mt-2">
                <button 
                  onClick={() => {
                    setSelectedCategory("All Streams");
                    setSelectedCourse("All Courses");
                    setSelectedCity("All Cities");
                    setSelectedOwnership("All Types");
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
