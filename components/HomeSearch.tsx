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
      className="relative w-full max-w-xl flex items-center rounded-xl border-4 border-foreground bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-within:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus-within:-translate-x-[2px] focus-within:-translate-y-[2px] transition-all overflow-hidden"
    >
      <div className="relative flex-grow flex items-center pl-4">
        <Search className="h-6 w-6 text-gray-500 stroke-[2.5px] pointer-events-none" />
        <input
          type="text"
          placeholder="Search colleges..."
          value={homeSearch}
          onChange={(e) => setHomeSearch(e.target.value)}
          className="h-14 w-full bg-transparent pl-3 pr-4 text-lg font-bold text-foreground placeholder:text-gray-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="h-14 px-8 bg-accent text-foreground border-l-4 border-foreground font-black text-lg uppercase tracking-wide hover:bg-white hover:text-primary transition-colors cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
