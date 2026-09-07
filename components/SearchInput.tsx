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
      className={`relative flex items-center ${isMobile ? 'w-full' : 'hidden lg:flex'} max-w-[210px] xl:max-w-[280px] w-full rounded-xl border border-slate-200 bg-slate-50/80 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all overflow-hidden`}
    >
      <div className="relative flex-grow flex items-center pl-2.5">
        <Search className="h-3.5 w-3.5 text-slate-400 stroke-[2] pointer-events-none" />
        <input
          type="text"
          aria-label="Search site content"
          placeholder="Search colleges, exams..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-9 w-full bg-transparent pl-2 pr-1.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
      <button 
        type="submit"
        className="h-7 mr-1 px-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}

export function SearchInput(props: { isMobile?: boolean, onSearch?: () => void }) {
  return (
    <Suspense fallback={
      <div className={`h-10 w-48 bg-slate-100 rounded-xl animate-pulse border border-slate-200 ${props.isMobile ? 'w-full' : 'hidden lg:block'}`} />
    }>
      <SearchInputInner {...props} />
    </Suspense>
  );
}
