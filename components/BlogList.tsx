"use client";

import React, { useState, useEffect, useMemo, Suspense, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Eye, 
  Search, 
  X, 
  Filter, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  GraduationCap, 
  Laptop, 
  Briefcase, 
  Code, 
  Award, 
  BookOpen, 
  Stethoscope, 
  Building2, 
  Globe, 
  FileText, 
  Sparkles, 
  Layers, 
  Compass, 
  RotateCcw 
} from 'lucide-react';
import { PostData, BLOG_CATEGORIES } from '@/lib/blog-categories';

// Helper to hash slug for stable variance
function getSlugHash(slug: string): number {
  return slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function calculateInitialViews(slug: string, dateStr: string): number {
  try {
    const publishedDate = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - publishedDate.getTime());
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    
    const hash = getSlugHash(slug);
    const variance = (hash % 11) - 5; // -5 to +5 variance
    const dailyAverage = Math.max(8, 15 + variance);
    
    const baseViews = diffDays * dailyAverage;
    const randomFactor = hash % 89;
    
    return Math.floor(baseViews + randomFactor);
  } catch (e) {
    return 120; // safe fallback
  }
}

// Visual configuration for each category
const CATEGORY_CONFIG: Record<string, {
  icon: React.ElementType;
  color: string;
  bgLight: string;
  border: string;
  description: string;
}> = {
  'All Posts': {
    icon: Layers,
    color: 'bg-primary text-white',
    bgLight: 'bg-blue-50 text-blue-950',
    border: 'border-primary',
    description: 'Explore our complete library of academic & career guidance articles.'
  },
  'MBA & PGDM': {
    icon: GraduationCap,
    color: 'bg-amber-500 text-white',
    bgLight: 'bg-amber-50 text-amber-950',
    border: 'border-amber-600',
    description: 'IIM cutoffs, B-school rankings, placement reports & exam strategies.'
  },
  'Online Degrees': {
    icon: Laptop,
    color: 'bg-indigo-600 text-white',
    bgLight: 'bg-indigo-50 text-indigo-950',
    border: 'border-indigo-600',
    description: 'UGC-entitled Online MBA, BBA & MCA degree reviews & fee comparisons.'
  },
  'Jobs & Careers': {
    icon: Briefcase,
    color: 'bg-emerald-600 text-white',
    bgLight: 'bg-emerald-50 text-emerald-950',
    border: 'border-emerald-600',
    description: 'High-paying career paths, corporate hiring trends & salary roadmaps.'
  },
  'B.Tech & Engineering': {
    icon: Code,
    color: 'bg-blue-600 text-white',
    bgLight: 'bg-blue-50 text-blue-950',
    border: 'border-blue-600',
    description: 'IITs, NITs, private engineering colleges & entrance exam guidance.'
  },
  'BBA & BMS': {
    icon: BookOpen,
    color: 'bg-purple-600 text-white',
    bgLight: 'bg-purple-50 text-purple-950',
    border: 'border-purple-600',
    description: 'Top BBA colleges, CUET admission cutoffs & undergrad management.'
  },
  'Exams & Admissions': {
    icon: Award,
    color: 'bg-rose-600 text-white',
    bgLight: 'bg-rose-50 text-rose-950',
    border: 'border-rose-600',
    description: 'CAT, XAT, CUET, MAT prep guides, registration dates & score calculators.'
  },
  'Medical & MBBS': {
    icon: Stethoscope,
    color: 'bg-teal-600 text-white',
    bgLight: 'bg-teal-50 text-teal-950',
    border: 'border-teal-600',
    description: 'NEET counseling, top medical colleges & MBBS abroad guides.'
  },
  'General & Career Guide': {
    icon: Compass,
    color: 'bg-slate-700 text-white',
    bgLight: 'bg-slate-100 text-slate-900',
    border: 'border-slate-700',
    description: 'Comprehensive career counseling, study abroad & specializations.'
  },
  'BCA & MCA': {
    icon: Globe,
    color: 'bg-sky-600 text-white',
    bgLight: 'bg-sky-50 text-sky-950',
    border: 'border-sky-600',
    description: 'Computer applications, software careers & MCA admissions.'
  },
  'Business & Finance': {
    icon: Sparkles,
    color: 'bg-cyan-600 text-white',
    bgLight: 'bg-cyan-50 text-cyan-950',
    border: 'border-cyan-600',
    description: 'SaaS business models, finance specializations & industry insights.'
  },
  'College Reviews': {
    icon: Building2,
    color: 'bg-orange-600 text-white',
    bgLight: 'bg-orange-50 text-orange-950',
    border: 'border-orange-600',
    description: 'Unbiased college reviews, campus life & head-to-head comparisons.'
  },
  'Law': {
    icon: FileText,
    color: 'bg-violet-600 text-white',
    bgLight: 'bg-violet-50 text-violet-950',
    border: 'border-violet-600',
    description: 'CLAT, AILET, top law universities & legal career roadmaps.'
  }
};

// Spotlight featured categories to show at the top of the blog page
const SPOTLIGHT_CATEGORIES = [
  'MBA & PGDM',
  'Online Degrees',
  'Jobs & Careers',
  'B.Tech & Engineering',
  'BBA & BMS',
  'Exams & Admissions'
];

function matchCategoryParam(param: string | null): string {
  if (!param) return 'All Posts';
  
  const p = param.trim();
  if (p === 'All Posts' || p === 'All') return 'All Posts';
  
  // Exact match first
  for (const cat of BLOG_CATEGORIES) {
    if (cat.toLowerCase() === p.toLowerCase()) {
      return cat;
    }
  }

  // Substring / keyword match
  const lower = p.toLowerCase();
  if (lower.includes('mba') || lower.includes('pgdm')) return 'MBA & PGDM';
  if (lower.includes('online')) return 'Online Degrees';
  if (lower.includes('job') || lower.includes('career') || lower.includes('salary')) return 'Jobs & Careers';
  if (lower.includes('btech') || lower.includes('engineering') || lower.includes('mtech')) return 'B.Tech & Engineering';
  if (lower.includes('bba') || lower.includes('bms')) return 'BBA & BMS';
  if (lower.includes('exam') || lower.includes('admission') || lower.includes('cuet')) return 'Exams & Admissions';
  if (lower.includes('medical') || lower.includes('mbbs') || lower.includes('neet')) return 'Medical & MBBS';
  if (lower.includes('bca') || lower.includes('mca')) return 'BCA & MCA';
  if (lower.includes('business') || lower.includes('finance')) return 'Business & Finance';
  if (lower.includes('review') || lower.includes('college')) return 'College Reviews';
  if (lower.includes('law') || lower.includes('llb') || lower.includes('clat')) return 'Law';
  
  return 'All Posts';
}

function BlogListInner({ initialPosts }: { initialPosts: PostData[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse initial category from query param (?category=...) or hash on client
  const [selectedCategory, setSelectedCategory] = useState<string>('All Posts');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'views' | 'oldest'>('latest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 18;

  // Initialize from searchParams
  useEffect(() => {
    const catParam = searchParams?.get('category');
    const qParam = searchParams?.get('q') || '';
    const sortParam = searchParams?.get('sort') as 'latest' | 'views' | 'oldest';
    
    if (catParam) {
      setSelectedCategory(matchCategoryParam(catParam));
    } else if (typeof window !== 'undefined' && window.location.hash) {
      const hashCat = decodeURIComponent(window.location.hash.replace('#', ''));
      setSelectedCategory(matchCategoryParam(hashCat));
    }
    
    if (qParam) {
      setSearchQuery(qParam);
    }
    if (sortParam && ['latest', 'views', 'oldest'].includes(sortParam)) {
      setSortBy(sortParam);
    }
  }, [searchParams]);

  // Sync state changes back to URL without reloading
  const updateUrl = useCallback((category: string, query: string, sort: string) => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    if (category && category !== 'All Posts') {
      params.set('category', category);
    }
    if (query.trim()) {
      params.set('q', query.trim());
    }
    if (sort && sort !== 'latest') {
      params.set('sort', sort);
    }
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState(null, '', newUrl);
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateUrl(category, searchQuery, sortBy);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1);
    updateUrl(selectedCategory, value, sortBy);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
    updateUrl(selectedCategory, '', sortBy);
  };

  const handleSortChange = (newSort: 'latest' | 'views' | 'oldest') => {
    setSortBy(newSort);
    setCurrentPage(1);
    updateUrl(selectedCategory, searchQuery, newSort);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All Posts');
    setSearchQuery('');
    setSortBy('latest');
    setCurrentPage(1);
    updateUrl('All Posts', '', 'latest');
  };

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Posts': initialPosts.length
    };
    BLOG_CATEGORIES.forEach((cat) => {
      if (cat !== 'All Posts') counts[cat] = 0;
    });

    initialPosts.forEach((post) => {
      const cat = post.category || 'General & Career Guide';
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return counts;
  }, [initialPosts]);

  // Precompute view counts for sorting
  const postsWithViews = useMemo(() => {
    return initialPosts.map((post) => ({
      ...post,
      viewsCount: calculateInitialViews(post.slug, post.date)
    }));
  }, [initialPosts]);

  // Filter & sort articles
  const filteredPosts = useMemo(() => {
    let result = postsWithViews;

    // Filter by category
    if (selectedCategory !== 'All Posts') {
      result = result.filter((post) => (post.category || 'General & Career Guide') === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const queryLower = searchQuery.trim().toLowerCase();
      result = result.filter((post) => {
        const inTitle = post.title.toLowerCase().includes(queryLower);
        const inDesc = (post.description || '').toLowerCase().includes(queryLower);
        const inKeywords = (post.keywords || []).some(k => k.toLowerCase().includes(queryLower));
        const inCategory = (post.category || '').toLowerCase().includes(queryLower);
        return inTitle || inDesc || inKeywords || inCategory;
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'latest') {
        return a.date < b.date ? 1 : -1;
      }
      if (sortBy === 'oldest') {
        return a.date > b.date ? 1 : -1;
      }
      if (sortBy === 'views') {
        return b.viewsCount - a.viewsCount;
      }
      return 0;
    });

    return result;
  }, [postsWithViews, selectedCategory, searchQuery, sortBy]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  const scrollToFilterBar = () => {
    const el = document.getElementById('blog-filter-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          SECTION 1: SPOTLIGHT - EXPLORE BY DESIRE CATEGORY
          ========================================================================= */}
      <div className="mb-20">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-foreground pb-6">
          <div>
            <span className="inline-block px-3 py-1 bg-accent text-foreground text-xs font-black uppercase tracking-widest border-2 border-foreground mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Quick Navigation
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-foreground uppercase">
              Explore by Desire Category
            </h2>
            <p className="mt-2 text-gray-600 text-lg font-bold">
              Select your domain of interest to discover specialized guidance & academic insights.
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm font-black uppercase text-gray-500 tracking-wider">
              12 Categories &bull; {initialPosts.length.toLocaleString()} Articles
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPOTLIGHT_CATEGORIES.map((catName) => {
            const config = CATEGORY_CONFIG[catName] || CATEGORY_CONFIG['General & Career Guide'];
            const IconComponent = config.icon;
            const count = categoryCounts[catName] || 0;
            const isSelected = selectedCategory === catName;

            return (
              <button
                key={catName}
                onClick={() => {
                  handleCategorySelect(catName);
                  scrollToFilterBar();
                }}
                className={`group text-left relative p-6 rounded-xl border-4 border-foreground transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white scale-[1.02] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white hover:bg-gray-50 hover:scale-[1.02] hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div
                    className={`h-14 w-14 rounded-xl border-4 border-foreground flex items-center justify-center transition-transform group-hover:rotate-6 ${
                      isSelected ? 'bg-white text-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : `${config.bgLight}`
                    }`}
                  >
                    <IconComponent className="h-7 w-7 stroke-[2.5]" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 border-foreground ${
                      isSelected ? 'bg-accent text-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-gray-100 text-foreground'
                    }`}
                  >
                    {count.toLocaleString()} Posts
                  </span>
                </div>
                <h3 className={`font-display text-2xl font-black uppercase tracking-tight mb-2 ${isSelected ? 'text-white' : 'text-foreground group-hover:text-primary'}`}>
                  {catName}
                </h3>
                <p className={`text-sm font-semibold line-clamp-2 leading-relaxed ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>
                  {config.description}
                </p>
                <div className={`mt-4 flex items-center gap-1.5 text-xs font-black uppercase tracking-widest ${isSelected ? 'text-accent' : 'text-primary group-hover:text-foreground'}`}>
                  <span>{isSelected ? 'Currently Selected' : 'Filter Articles'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: STICKY FILTER BAR & SEARCH CONTROLS
          ========================================================================= */}
      <div id="blog-filter-section" className="scroll-mt-28 mb-12 bg-white p-6 sm:p-8 rounded-2xl border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* TOP ROW: CATEGORY PILLS FILTER BAR */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-foreground">
              <Filter className="w-4 h-4 stroke-[3]" />
              <span>Filter By Category:</span>
            </div>
            {selectedCategory !== 'All Posts' && (
              <button
                onClick={() => handleCategorySelect('All Posts')}
                className="text-xs font-black uppercase tracking-wider text-primary hover:underline flex items-center gap-1"
              >
                <span>Show All Categories</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5 max-h-[220px] overflow-y-auto pr-2 py-1 scrollbar-thin">
            {BLOG_CATEGORIES.map((catName) => {
              const config = CATEGORY_CONFIG[catName] || CATEGORY_CONFIG['General & Career Guide'];
              const IconComponent = config.icon;
              const count = categoryCounts[catName] || 0;
              const isSelected = selectedCategory === catName;

              return (
                <button
                  key={catName}
                  onClick={() => handleCategorySelect(catName)}
                  className={`group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-3 border-foreground font-black text-sm uppercase tracking-wide transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5 scale-[1.03]'
                      : 'bg-gray-50 text-foreground hover:bg-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 stroke-[2.5] ${isSelected ? 'text-accent' : 'text-primary'}`} />
                  <span>{catName}</span>
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-xs font-black border border-foreground ${
                      isSelected ? 'bg-accent text-foreground' : 'bg-gray-200 text-gray-800 group-hover:bg-primary group-hover:text-white'
                    }`}
                  >
                    {count.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* BOTTOM ROW: SEARCH BOX & SORT BY DROPDOWN */}
        <div className="pt-6 border-t-4 border-foreground flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-grow max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-500 stroke-[2.5] pointer-events-none" />
              <input
                type="text"
                placeholder={`Search in "${selectedCategory}" (by title, keyword or topic)...`}
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-13 pl-12 pr-11 bg-slate-50 border-3 border-foreground rounded-xl text-base font-bold text-foreground placeholder:text-gray-500 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-3.5 p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-foreground transition-colors"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </button>
              )}
            </div>
          </div>

          {/* Sort By and Result Counter */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-4">
            <div className="text-sm font-black uppercase text-foreground bg-accent px-3 py-2 rounded-lg border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {filteredPosts.length.toLocaleString()} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs font-black uppercase tracking-wider text-gray-600">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as 'latest' | 'views' | 'oldest')}
                className="h-11 px-3 py-1 bg-white border-3 border-foreground rounded-lg text-sm font-black uppercase text-foreground focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                <option value="latest">Latest Published</option>
                <option value="views">Most Viewed</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {(selectedCategory !== 'All Posts' || searchQuery.trim() || sortBy !== 'latest') && (
              <button
                onClick={handleResetFilters}
                title="Reset all filters"
                className="h-11 px-3.5 bg-gray-100 hover:bg-rose-50 hover:text-rose-600 text-foreground border-3 border-foreground rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: SELECTED CATEGORY HERO HEADER
          ========================================================================= */}
      {selectedCategory !== 'All Posts' && (
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(59,130,246,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {(() => {
              const config = CATEGORY_CONFIG[selectedCategory] || CATEGORY_CONFIG['General & Career Guide'];
              const IconComponent = config.icon;
              return (
                <div className="h-16 w-16 rounded-2xl bg-primary text-white border-4 border-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex-shrink-0">
                  <IconComponent className="h-8 w-8 stroke-[2.5]" />
                </div>
              );
            })()}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded bg-accent text-foreground text-xs font-black uppercase tracking-wider">
                  Category Filter
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                {selectedCategory}
              </h3>
              <p className="mt-1 text-gray-300 text-base font-semibold max-w-2xl">
                {CATEGORY_CONFIG[selectedCategory]?.description || 'Explore curated articles & guidance in this domain.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCategorySelect('All Posts')}
            className="px-5 py-2.5 rounded-xl bg-white text-foreground hover:bg-accent hover:text-foreground border-3 border-foreground font-black text-sm uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[3]" />
            <span>Clear Filter</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          SECTION 4: BLOG POSTS GRID
          ========================================================================= */}
      <div className="grid gap-10 lg:grid-cols-3">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map(({ slug, title, date, description, category, viewsCount }) => {
            const postCategory = category || 'General & Career Guide';
            const catConfig = CATEGORY_CONFIG[postCategory] || CATEGORY_CONFIG['General & Career Guide'];
            const CatIcon = catConfig.icon;

            return (
              <div
                key={slug}
                className="group flex flex-col rounded-2xl border-4 border-foreground bg-white p-8 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-2 hover:bg-gray-50 h-full shadow-[6px_6px_0px_0px_rgba(59,130,246,1)] relative overflow-hidden"
              >
                {/* Top Badge Bar */}
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="inline-block rounded-full bg-accent px-3.5 py-1 text-xs font-black uppercase tracking-wider text-foreground border-2 border-foreground">
                      {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-foreground px-3 py-1 text-xs font-black border-2 border-foreground">
                      <Eye className="w-3.5 h-3.5 stroke-[2.5] text-primary" />
                      <span>{viewsCount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Clickable Category Pill on Card */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCategorySelect(postCategory);
                      scrollToFilterBar();
                    }}
                    title={`Filter by ${postCategory}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-secondary hover:bg-primary text-white px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
                  >
                    <CatIcon className="w-3.5 h-3.5" />
                    <span>{postCategory}</span>
                  </button>
                </div>

                <Link href={`/blog/${slug}`} prefetch={false} className="flex flex-col flex-grow">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-3 leading-tight">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-gray-600 text-base font-semibold leading-relaxed mb-8 line-clamp-3">
                      {description}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t-2 border-gray-100 flex items-center justify-between font-bold text-primary group-hover:text-foreground text-lg transition-colors">
                    <span className="flex items-center">
                      Read Article 
                      <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-2">&rarr;</span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-primary">
                      Full Guide
                    </span>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-24 text-center bg-white border-4 border-dashed border-gray-300 rounded-2xl px-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-gray-100 border-4 border-foreground flex items-center justify-center mb-6 text-gray-400">
              <Search className="w-10 h-10 stroke-[2]" />
            </div>
            <h3 className="font-display text-3xl font-black uppercase tracking-tight text-foreground mb-2">
              No Matching Articles Found
            </h3>
            <p className="text-lg font-bold text-gray-500 max-w-md mx-auto mb-8">
              We couldn&apos;t find any blog posts matching your current search or category filter.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-black text-base uppercase tracking-wider border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5 stroke-[2.5]" />
              <span>Reset Filters &amp; View All Posts</span>
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          SECTION 5: PAGINATION CONTROLS
          ========================================================================= */}
      {totalPages > 1 && (
        <div className="mt-16 pt-10 border-t-4 border-foreground flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-base font-bold text-gray-600">
            Showing <span className="font-black text-foreground">{(currentPage - 1) * postsPerPage + 1}</span> to{' '}
            <span className="font-black text-foreground">{Math.min(currentPage * postsPerPage, filteredPosts.length)}</span> of{' '}
            <span className="font-black text-foreground">{filteredPosts.length.toLocaleString()}</span> articles in{' '}
            <span className="bg-accent px-2 py-0.5 rounded font-black text-foreground border border-foreground">
              {selectedCategory}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Prev Button */}
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.max(1, prev - 1));
                scrollToFilterBar();
              }}
              disabled={currentPage === 1}
              className={`h-11 px-4 rounded-xl border-3 border-foreground font-black text-sm uppercase flex items-center gap-1.5 transition-all ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                  : 'bg-white hover:bg-primary hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4 stroke-[3]" />
              <span>Prev</span>
            </button>

            {/* Page number buttons */}
            {(() => {
              const pages: (number | string)[] = [];
              const maxShown = 5;

              if (totalPages <= maxShown + 2) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                if (currentPage > 3) pages.push('...');
                
                const startPage = Math.max(2, currentPage - 1);
                const endPage = Math.min(totalPages - 1, currentPage + 1);
                
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(i);
                }
                
                if (currentPage < totalPages - 2) pages.push('...');
                pages.push(totalPages);
              }

              return pages.map((p, idx) => {
                if (p === '...') {
                  return (
                    <span key={`ellipsis-${idx}`} className="px-2 font-black text-gray-400">
                      &hellip;
                    </span>
                  );
                }
                const pageNum = p as number;
                const isCurrent = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      scrollToFilterBar();
                    }}
                    className={`h-11 w-11 rounded-xl border-3 border-foreground font-black text-sm transition-all cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? 'bg-primary text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5'
                        : 'bg-white hover:bg-gray-50 text-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              });
            })()}

            {/* Next Button */}
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                scrollToFilterBar();
              }}
              disabled={currentPage === totalPages}
              className={`h-11 px-4 rounded-xl border-3 border-foreground font-black text-sm uppercase flex items-center gap-1.5 transition-all ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                  : 'bg-white hover:bg-primary hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 cursor-pointer'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function BlogList(props: { initialPosts: PostData[] }) {
  return (
    <Suspense fallback={
      <div className="w-full py-20 text-center animate-pulse">
        <div className="h-48 bg-gray-100 rounded-2xl border-4 border-foreground mb-12"></div>
        <div className="grid gap-10 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-96 bg-gray-100 rounded-2xl border-4 border-foreground"></div>
          ))}
        </div>
      </div>
    }>
      <BlogListInner {...props} />
    </Suspense>
  );
}
