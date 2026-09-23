"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Building2, MapPin, ArrowRight, X } from "lucide-react";

interface CollegeMini {
  slug: string;
  name: string;
  location: string;
  fees: string;
  avg_placement: string;
  logo?: string;
}

function SearchInputInner({
  isMobile = false,
  onSearch,
}: {
  isMobile?: boolean;
  onSearch?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CollegeMini[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = searchParams?.get("q") || searchParams?.get("search") || "";
    setQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const clean = query.trim();
    if (!clean) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/colleges/search?q=${encodeURIComponent(clean)}&limit=4`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.colleges || []);
        }
      } catch {
        // ignore
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      if (onSearch) onSearch();
    }
  };

  const handleSelectCollege = (slug: string) => {
    setIsOpen(false);
    router.push(`/colleges/${slug}`);
    if (onSearch) onSearch();
  };

  return (
    <div ref={wrapperRef} className={`relative ${isMobile ? "w-full" : "hidden lg:block"}`}>
      <form
        onSubmit={handleSearch}
        className={`flex items-center ${
          isMobile ? "w-full" : "w-28 xl:w-36 2xl:w-44 focus-within:w-56 xl:focus-within:w-64"
        } h-8.5 rounded-xl border border-slate-200 bg-slate-50/90 hover:bg-slate-100/70 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15 transition-all px-2.5`}
      >
        <button
          type="submit"
          aria-label="Search"
          className="text-slate-400 hover:text-blue-600 transition-colors shrink-0 cursor-pointer"
        >
          <Search className="h-3.5 w-3.5 stroke-[2]" />
        </button>
        <input
          type="text"
          aria-label="Search site content"
          placeholder="Search colleges..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="h-full w-full bg-transparent pl-2 pr-1 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </form>

      {/* Autocomplete Popup */}
      {isOpen && query.trim().length > 0 && suggestions.length > 0 && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden divide-y divide-slate-100 text-left animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="p-2 space-y-1 max-h-60 overflow-y-auto">
            {suggestions.map((col) => (
              <div
                key={col.slug}
                onClick={() => handleSelectCollege(col.slug)}
                className="p-2 rounded-xl hover:bg-blue-50 text-slate-800 flex items-center justify-between gap-2 cursor-pointer transition-colors"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate text-slate-900">{col.name}</div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-slate-400" />
                    <span>{col.location}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">{col.avg_placement}</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>

          <div className="p-2 bg-slate-50 text-center">
            <button
              type="button"
              onClick={handleSearch}
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              Search all &ldquo;{query}&rdquo; results &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function SearchInput(props: { isMobile?: boolean; onSearch?: () => void }) {
  return (
    <Suspense
      fallback={
        <div
          className={`h-8.5 w-32 bg-slate-100 rounded-xl animate-pulse border border-slate-200 ${
            props.isMobile ? "w-full" : "hidden lg:block"
          }`}
        />
      }
    >
      <SearchInputInner {...props} />
    </Suspense>
  );
}
