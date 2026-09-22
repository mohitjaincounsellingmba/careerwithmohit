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
      className={`relative flex items-center ${isMobile ? 'w-full' : 'hidden lg:flex'} w-24 xl:w-32 2xl:w-40 focus-within:w-44 xl:focus-within:w-52 h-8.5 rounded-xl border border-slate-200 bg-slate-50/90 hover:bg-slate-100/70 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15 transition-all px-2.5`}
    >
      <button type="submit" aria-label="Search" className="text-slate-400 hover:text-blue-600 transition-colors shrink-0 cursor-pointer">
        <Search className="h-3.5 w-3.5 stroke-[2]" />
      </button>
      <input
        type="text"
        aria-label="Search site content"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-full w-full bg-transparent pl-2 pr-1 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
      />
    </form>
  );
}

export function SearchInput(props: { isMobile?: boolean, onSearch?: () => void }) {
  return (
    <Suspense fallback={
      <div className={`h-8.5 w-32 bg-slate-100 rounded-xl animate-pulse border border-slate-200 ${props.isMobile ? 'w-full' : 'hidden lg:block'}`} />
    }>
      <SearchInputInner {...props} />
    </Suspense>
  );
}
