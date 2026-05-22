"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleHomeSearch} className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search colleges..."
        value={homeSearch}
        onChange={(e) => setHomeSearch(e.target.value)}
        className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded"
      >
        Search
      </button>
    </form>
  );
}
