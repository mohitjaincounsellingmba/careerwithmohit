"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HomeSearch() {
  const [homeSearch, setHomeSearch] = useState("");
  const router = useRouter();

  const handleHomeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeSearch.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(homeSearch.trim())}`);
    } else {
      router.push("/colleges");
    }
  };

  return (
    <form 
      onSubmit={handleHomeSearch} 
      className="relative w-full max-w-2xl flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl bg-white/95 backdrop-blur-md p-1.5 sm:p-2 shadow-2xl shadow-black/20 border border-white/40 focus-within:ring-4 focus-within:ring-blue-400/40 focus-within:border-blue-500 transition-all overflow-hidden"
    >
      <div className="relative flex-grow flex items-center pl-3 sm:pl-4">
        <Search className="h-5 w-5 text-blue-600 shrink-0 stroke-[2.2px] pointer-events-none" />
        <input
          type="text"
          aria-label="Search colleges, cities, or exams"
          placeholder="Search 650+ colleges, cities (e.g. Pune, Delhi), or exams..."
          value={homeSearch}
          onChange={(e) => setHomeSearch(e.target.value)}
          className="h-12 sm:h-13 w-full bg-transparent pl-3 pr-3 text-base sm:text-lg font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="h-11 sm:h-12 px-6 sm:px-7 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-base tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-1 sm:mt-0"
      >
        <span>Search</span>
        <span className="text-blue-200">→</span>
      </button>
    </form>
  );
}
