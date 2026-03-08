"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative hidden lg:block">
      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500 stroke-[2.5px]" />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-11 w-48 rounded-md bg-gray-100 pl-10 pr-4 text-base font-bold text-foreground placeholder:text-gray-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-0 transition-all border-2 border-transparent focus:border-foreground"
      />
    </form>
  );
}
