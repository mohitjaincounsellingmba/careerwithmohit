"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

function SearchInputInner({ isMobile = false, onSearch }: { isMobile?: boolean, onSearch?: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams?.get('q') || '';
    setQuery(q);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      if (onSearch) onSearch();
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative flex items-center ${isMobile ? 'w-full' : 'hidden lg:flex'} max-w-xs xl:max-w-sm w-full rounded-md border-2 border-foreground bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-within:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-within:-translate-x-[2px] focus-within:-translate-y-[2px] transition-all overflow-hidden`}
    >
      <div className="relative flex-grow flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-500 stroke-[2.5px] pointer-events-none" />
        <input
          type="text"
          aria-label="Search site content"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 w-full bg-transparent pl-2 pr-4 text-base font-bold text-foreground placeholder:text-gray-500 focus:outline-none"
        />
      </div>
      <button 
        type="submit"
        className="h-11 px-5 bg-primary text-white font-bold border-l-2 border-foreground hover:bg-white hover:text-primary transition-colors active:bg-gray-100 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}

export function SearchInput(props: { isMobile?: boolean, onSearch?: () => void }) {
  return (
    <Suspense fallback={
      <div className={`h-11 w-48 bg-gray-100 rounded-md animate-pulse border-2 border-foreground ${props.isMobile ? 'w-full' : 'hidden lg:block'}`} />
    }>
      <SearchInputInner {...props} />
    </Suspense>
  );
}
