"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function SearchInput({ isMobile = false, onSearch }: { isMobile?: boolean, onSearch?: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      if (onSearch) onSearch();
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex items-center gap-2 ${isMobile ? 'w-full' : 'hidden lg:flex'}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500 stroke-[2.5px]" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`h-11 w-full rounded-md bg-gray-100 pl-10 pr-4 text-base font-bold text-foreground placeholder:text-gray-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-0 transition-all border-2 border-transparent focus:border-foreground`}
        />
      </div>
      <button 
        type="submit"
        className="h-11 px-4 bg-primary text-white font-bold rounded-md border-2 border-foreground hover:bg-white hover:text-primary transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
      >
        Search
      </button>
    </form>
  );
}
