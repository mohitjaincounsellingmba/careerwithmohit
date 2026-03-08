"use client";

import { useState, useMemo } from "react";
import { CollegeMetadata } from "@/lib/colleges";
import { CollegeCard } from "@/components/CollegeCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

export function CollegesClient({ colleges }: { colleges: CollegeMetadata[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedOwnership, setSelectedOwnership] = useState("All Types");
  const [showFilters, setShowFilters] = useState(false);

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
        (college.exams || []).some(exam => exam.toLowerCase().includes(query));

      const matchesCity = selectedCity === "All Cities" || 
        college.location.toLowerCase().includes(selectedCity.toLowerCase());

      const matchesOwnership = selectedOwnership === "All Types" || 
        college.ownership.toLowerCase().includes(selectedOwnership.toLowerCase());

      return matchesSearch && matchesCity && matchesOwnership;
    });
  }, [searchQuery, selectedCity, selectedOwnership, colleges]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Find Your Dream <span className="text-blue-600">B-School</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore 500+ top MBA colleges with accurate data on fees, placement records, and entrance exam requirements.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-12 flex flex-col gap-4 sticky top-24 z-30">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by college name, city, or exam (CAT, MAT...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-6 py-3 border rounded-xl font-semibold transition-all ${showFilters ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              {showFilters ? "Hide Filters" : "Filters"}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Location</label>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Ownership</label>
                <select 
                  value={selectedOwnership}
                  onChange={(e) => setSelectedOwnership(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                >
                  {ownershipTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2 flex justify-end">
                <button 
                  onClick={() => {
                    setSelectedCity("All Cities");
                    setSelectedOwnership("All Types");
                    setSearchQuery("");
                  }}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 p-2"
                >
                  Reset All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-bold">{filteredColleges.length}</span> colleges
          </p>
        </div>

        {/* College Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
