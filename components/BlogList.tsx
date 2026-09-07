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
  badge: string;
  description: string;
}> = {
  'All Posts': {
    icon: Layers,
    color: 'text-blue-600',
    bgLight: 'bg-blue-50 text-blue-700',
    border: 'border-blue-200',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Explore our complete library of academic & career guidance articles.'
  },
  'MBA & PGDM': {
    icon: GraduationCap,
    color: 'text-amber-600',
    bgLight: 'bg-amber-50 text-amber-700',
    border: 'border-amber-200',
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'IIM cutoffs, B-school rankings, placement reports & exam strategies.'
  },
  'Online Degrees': {
    icon: Laptop,
    color: 'text-indigo-600',
    bgLight: 'bg-indigo-50 text-indigo-700',
    border: 'border-indigo-200',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description: 'UGC-entitled Online MBA, BBA & MCA degree reviews & fee comparisons.'
  },
  'Jobs & Careers': {
    icon: Briefcase,
    color: 'text-emerald-600',
    bgLight: 'bg-emerald-50 text-emerald-700',
    border: 'border-emerald-200',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'High-paying career paths, corporate hiring trends & salary roadmaps.'
  },
  'B.Tech & Engineering': {
    icon: Code,
    color: 'text-cyan-600',
    bgLight: 'bg-cyan-50 text-cyan-700',
    border: 'border-cyan-200',
    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    description: 'IITs, NITs, private engineering colleges & entrance exam guidance.'
  },
  'BBA & BMS': {
    icon: BookOpen,
    color: 'text-purple-600',
    bgLight: 'bg-purple-50 text-purple-700',
    border: 'border-purple-200',
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Top BBA colleges, CUET admission cutoffs & undergrad management.'
  },
  'Exams & Admissions': {
    icon: Award,
    color: 'text-rose-600',
    bgLight: 'bg-rose-50 text-rose-700',
    border: 'border-rose-200',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'CAT, XAT, CUET, MAT prep guides, registration dates & score calculators.'
  },
  'Medical & MBBS': {
    icon: Stethoscope,
    color: 'text-teal-600',
    bgLight: 'bg-teal-50 text-teal-700',
    border: 'border-teal-200',
    badge: 'bg-teal-50 text-teal-700 border-teal-200',
    description: 'NEET counseling, top medical colleges & MBBS abroad guides.'
  },
  'General & Career Guide': {
    icon: Compass,
    color: 'text-slate-600',
    bgLight: 'bg-slate-100 text-slate-700',
    border: 'border-slate-200',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    description: 'Comprehensive career counseling, study abroad & specializations.'
  },
  'BCA & MCA': {
    icon: Globe,
    color: 'text-sky-600',
    bgLight: 'bg-sky-50 text-sky-700',
    border: 'border-sky-200',
    badge: 'bg-sky-50 text-sky-700 border-sky-200',
    description: 'Computer applications, software careers & MCA admissions.'
  },
  'Business & Finance': {
    icon: Sparkles,
    color: 'text-violet-600',
    bgLight: 'bg-violet-50 text-violet-700',
    border: 'border-violet-200',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    description: 'SaaS business models, finance specializations & industry insights.'
  },
  'College Reviews': {
    icon: Building2,
    color: 'text-orange-600',
    bgLight: 'bg-orange-50 text-orange-700',
    border: 'border-orange-200',
    badge: 'bg-orange-50 text-orange-700 border-orange-200',
    description: 'Unbiased college reviews, campus life & head-to-head comparisons.'
  },
  'Law': {
    icon: FileText,
    color: 'text-fuchsia-600',
    bgLight: 'bg-fuchsia-50 text-fuchsia-700',
    border: 'border-fuchsia-200',
    badge: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
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

  // Substring / keyword match in logical priority order
  const lower = p.toLowerCase();
  if (lower.includes('online')) return 'Online Degrees';
  if (lower.includes('bca') || lower.includes('mca')) return 'BCA & MCA';
  if (lower.includes('law') || lower.includes('llb') || lower.includes('clat')) return 'Law';
  if (lower.includes('medical') || lower.includes('mbbs') || lower.includes('neet')) return 'Medical & MBBS';
  if (lower.includes('mba') || lower.includes('pgdm')) return 'MBA & PGDM';
  if (lower.includes('btech') || lower.includes('engineering') || lower.includes('mtech')) return 'B.Tech & Engineering';
  if (lower.includes('bba') || lower.includes('bms') || lower.includes('ipm')) return 'BBA & BMS';
  if (lower.includes('exam') || lower.includes('admission') || lower.includes('cuet') || lower.includes('placement') || lower.includes('cutoff')) return 'Exams & Admissions';
  if (lower.includes('review') || lower.includes('college') || lower.includes('university')) return 'College Reviews';
  if (lower.includes('business') || lower.includes('finance')) return 'Business & Finance';
  if (lower.includes('job') || lower.includes('career') || lower.includes('salary') || lower.includes('hiring') || lower.includes('recruitment')) return 'Jobs & Careers';
  
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
      <div className="mb-16">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/80 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Specialized Portals
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Explore by Desire Category
            </h2>
            <p className="mt-1.5 text-slate-600 text-base font-normal">
              Select your domain of interest to discover specialized guidance &amp; academic insights.
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
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
                className={`group text-left relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/50 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1.5 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${config.bgLight}`}
                  >
                    <IconComponent className="h-6 w-6 stroke-[2]" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700'
                    }`}
                  >
                    {count.toLocaleString()} Posts
                  </span>
                </div>
                <h3 className={`font-display text-xl font-bold tracking-tight mb-2 ${isSelected ? 'text-blue-900' : 'text-slate-900 group-hover:text-blue-600'} transition-colors`}>
                  {catName}
                </h3>
                <p className="text-sm font-normal text-slate-600 line-clamp-2 leading-relaxed">
                  {config.description}
                </p>
                <div className={`mt-4 flex items-center gap-1.5 text-xs font-semibold tracking-wide ${isSelected ? 'text-blue-600 font-bold' : 'text-slate-500 group-hover:text-blue-600'} transition-colors`}>
                  <span>{isSelected ? 'Currently Selected' : 'Explore Articles'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: FILTER BAR & SEARCH CONTROLS
          ========================================================================= */}
      <div id="blog-filter-section" className="scroll-mt-28 mb-12 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm">
        {/* TOP ROW: CATEGORY PILLS FILTER BAR */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
              <Filter className="w-4 h-4 text-blue-600 stroke-[2.5]" />
              <span>Filter By Domain:</span>
            </div>
            {selectedCategory !== 'All Posts' && (
              <button
                onClick={() => handleCategorySelect('All Posts')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
              >
                <span>Reset to All</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 max-h-[220px] overflow-y-auto pr-2 py-1 scrollbar-thin">
            {BLOG_CATEGORIES.map((catName) => {
              const config = CATEGORY_CONFIG[catName] || CATEGORY_CONFIG['General & Career Guide'];
              const IconComponent = config.icon;
              const count = categoryCounts[catName] || 0;
              const isSelected = selectedCategory === catName;

              return (
                <button
                  key={catName}
                  onClick={() => handleCategorySelect(catName)}
                  className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                      : 'bg-slate-50 text-slate-700 border border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 stroke-[2] ${isSelected ? 'text-white' : config.color}`} />
                  <span>{catName}</span>
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      isSelected ? 'bg-blue-700 text-white' : 'bg-slate-200/80 text-slate-600 group-hover:bg-slate-300'
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
        <div className="pt-6 border-t border-slate-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-grow max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-slate-400 stroke-[2] pointer-events-none" />
              <input
                type="text"
                placeholder={`Search in "${selectedCategory}" (by topic, college or keyword)...`}
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-11 pl-11 pr-10 bg-slate-50/80 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 p-1 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              )}
            </div>
          </div>

          {/* Sort By and Result Counter */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3">
            <div className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-3 py-2 rounded-xl">
              {filteredPosts.length.toLocaleString()} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as 'latest' | 'views' | 'oldest')}
                className="h-10 px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
                className="h-10 px-3.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
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
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0A192F] via-[#0F2744] to-[#123058] text-white border border-blue-900/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[60px] pointer-events-none rounded-full" />
          
          <div className="flex items-center gap-5 relative z-10">
            {(() => {
              const config = CATEGORY_CONFIG[selectedCategory] || CATEGORY_CONFIG['General & Career Guide'];
              const IconComponent = config.icon;
              return (
                <div className="h-14 w-14 rounded-2xl bg-white/10 text-amber-300 border border-white/20 flex items-center justify-center flex-shrink-0 shadow-sm backdrop-blur-md">
                  <IconComponent className="h-7 w-7 stroke-[2]" />
                </div>
              );
            })()}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-blue-200 text-xs font-semibold border border-white/10">
                  Domain Filter Active
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {selectedCategory}
              </h3>
              <p className="mt-1 text-blue-100/80 text-sm sm:text-base font-normal max-w-2xl">
                {CATEGORY_CONFIG[selectedCategory]?.description || 'Explore curated articles & guidance in this domain.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCategorySelect('All Posts')}
            className="relative z-10 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm tracking-wide transition-all backdrop-blur-sm flex items-center gap-2 cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
            <span>Clear Filter</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          SECTION 4: BLOG POSTS GRID
          ========================================================================= */}
      <div className="grid gap-8 lg:grid-cols-3">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map(({ slug, title, date, description, category, viewsCount }) => {
            const postCategory = category || 'General & Career Guide';
            const catConfig = CATEGORY_CONFIG[postCategory] || CATEGORY_CONFIG['General & Career Guide'];
            const CatIcon = catConfig.icon;

            return (
              <div
                key={slug}
                className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-300 shadow-sm relative overflow-hidden"
              >
                {/* Top Badge Bar */}
                <div className="flex flex-wrap gap-2 justify-between items-center mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 text-slate-600 px-2.5 py-0.5 text-xs font-medium border border-slate-200/60">
                      <Eye className="w-3 h-3 text-slate-400 stroke-[2]" />
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
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border transition-all cursor-pointer ${catConfig.badge} hover:opacity-90`}
                  >
                    <CatIcon className="w-3.5 h-3.5" />
                    <span>{postCategory}</span>
                  </button>
                </div>

                <Link href={`/blog/${slug}`} prefetch={false} className="flex flex-col flex-grow">
                  <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-3 leading-snug">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-slate-600 text-sm font-normal leading-relaxed mb-6 line-clamp-3">
                      {description}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between font-semibold text-blue-600 text-sm group-hover:text-blue-700 transition-colors">
                    <span className="flex items-center">
                      Read Analysis 
                      <ArrowRight className="ml-1.5 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      Full Guide
                    </span>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center bg-white border border-dashed border-slate-300 rounded-2xl px-6 shadow-sm">
            <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-5 text-slate-400">
              <Search className="w-8 h-8 stroke-[2]" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
              No Matching Articles Found
            </h3>
            <p className="text-base text-slate-500 max-w-md mx-auto mb-6 font-normal">
              We couldn&apos;t find any articles matching your query or category filter. Try clearing filters or searching another keyword.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 stroke-[2]" />
              <span>Reset Filters &amp; View All Posts</span>
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          SECTION 5: PAGINATION CONTROLS
          ========================================================================= */}
      {totalPages > 1 && (
        <div className="mt-14 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-sm font-medium text-slate-600">
            Showing <span className="font-semibold text-slate-900">{(currentPage - 1) * postsPerPage + 1}</span> to{' '}
            <span className="font-semibold text-slate-900">{Math.min(currentPage * postsPerPage, filteredPosts.length)}</span> of{' '}
            <span className="font-semibold text-slate-900">{filteredPosts.length.toLocaleString()}</span> articles in{' '}
            <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-semibold text-xs border border-blue-200/60">
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
              className={`h-10 px-3.5 rounded-xl border border-slate-200 font-semibold text-xs uppercase flex items-center gap-1 transition-all ${
                currentPage === 1
                  ? 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-60'
                  : 'bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
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
                    <span key={`ellipsis-${idx}`} className="px-2 font-medium text-slate-400">
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
                    className={`h-10 w-10 rounded-xl border font-semibold text-sm transition-all cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
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
              className={`h-10 px-3.5 rounded-xl border border-slate-200 font-semibold text-xs uppercase flex items-center gap-1 transition-all ${
                currentPage === totalPages
                  ? 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-60'
                  : 'bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm cursor-pointer'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
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
        <div className="h-48 bg-slate-100 rounded-2xl border border-slate-200 mb-12"></div>
        <div className="grid gap-8 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-96 bg-slate-100 rounded-2xl border border-slate-200"></div>
          ))}
        </div>
      </div>
    }>
      <BlogListInner {...props} />
    </Suspense>
  );
}
