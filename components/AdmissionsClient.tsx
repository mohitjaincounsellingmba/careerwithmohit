'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CollegeMetadata } from '@/lib/colleges';
import { MBACollegeGenerator } from '@/components/MBACollegeGenerator';
import { BTechCollegeGenerator } from '@/components/BTechCollegeGenerator';
import { BBACollegeGenerator } from '@/components/BBACollegeGenerator';
import { InquiryForm } from '@/components/InquiryForm';
import {
  Search,
  X,
  GraduationCap,
  Building2,
  MapPin,
  IndianRupee,
  Briefcase,
  ChevronRight,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Phone,
  ArrowRightLeft,
  Trophy,
  BookOpen,
  Users,
  ShieldCheck,
  Award,
  HelpCircle,
  Laptop,
  Check,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

interface AdmissionsClientProps {
  colleges: CollegeMetadata[];
  posts: Array<{
    slug: string;
    title: string;
    date: string;
    description?: string;
  }>;
}

export function AdmissionsClient({ colleges, posts }: AdmissionsClientProps) {
  const router = useRouter();

  // --- Search Autocomplete State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute live search suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return { colleges: [], cities: [], courses: [] };
    const query = searchQuery.toLowerCase().trim();

    // 1. Matches colleges
    const matchedColleges = colleges
      .filter((c) => c.name.toLowerCase().includes(query))
      .slice(0, 5);

    // 2. Matches unique cities/states
    const uniqueCities = new Set<string>();
    colleges.forEach((c) => {
      const loc = c.location.split(',')[0].trim();
      if (loc.toLowerCase().includes(query)) {
        uniqueCities.add(loc);
      }
    });
    const matchedCities = Array.from(uniqueCities).slice(0, 4);

    // 3. Matches unique courses
    const uniqueCourses = new Set<string>();
    colleges.forEach((c) => {
      c.courses.forEach((course) => {
        if (course.toLowerCase().includes(query)) {
          uniqueCourses.add(course);
        }
      });
    });
    const matchedCourses = Array.from(uniqueCourses).slice(0, 3);

    return {
      colleges: matchedColleges,
      cities: matchedCities,
      courses: matchedCourses,
    };
  }, [searchQuery, colleges]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  // --- Stream Counts ---
  const streamCounts = useMemo(() => {
    return {
      management: colleges.filter((c) => c.category === 'Management').length || 240,
      engineering: colleges.filter((c) => c.category === 'Engineering').length || 180,
      ug: colleges.filter((c) => c.category === 'UG Courses').length || 120,
    };
  }, [colleges]);

  // --- Compare Widget State ---
  const [compareQuery, setCompareQuery] = useState('');
  const [compareSuggestions, setCompareSuggestions] = useState<CollegeMetadata[]>([]);
  const [comparedColleges, setComparedColleges] = useState<CollegeMetadata[]>([]);
  const compareSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (compareSearchRef.current && !compareSearchRef.current.contains(event.target as Node)) {
        setCompareSuggestions([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update compare suggestions
  useEffect(() => {
    if (!compareQuery.trim()) {
      setCompareSuggestions([]);
      return;
    }
    const q = compareQuery.toLowerCase().trim();
    const matches = colleges
      .filter((c) => c.name.toLowerCase().includes(q) && !comparedColleges.some((sel) => sel.slug === c.slug))
      .slice(0, 5);
    setCompareSuggestions(matches);
  }, [compareQuery, colleges, comparedColleges]);

  const addCollegeToCompare = (college: CollegeMetadata) => {
    if (comparedColleges.length >= 4) return;
    if (!comparedColleges.some((c) => c.slug === college.slug)) {
      setComparedColleges([...comparedColleges, college]);
    }
    setCompareQuery('');
    setCompareSuggestions([]);
  };

  const removeComparedCollege = (slug: string) => {
    setComparedColleges(comparedColleges.filter((c) => c.slug !== slug));
  };

  const handleCompareClick = () => {
    if (comparedColleges.length < 2) return;
    const slugs = comparedColleges.map((c) => c.slug).join(',');
    router.push(`/colleges/compare?slugs=${slugs}`);
  };

  // --- Predictor Active Tab ---
  const [activePredictorTab, setActivePredictorTab] = useState<'mba' | 'btech' | 'bba'>('mba');

  // --- Featured Listings Filter ---
  const [featuredTab, setFeaturedTab] = useState<'roi' | 'placements' | 'ranking' | 'direct'>('roi');

  const filteredFeaturedColleges = useMemo(() => {
    if (featuredTab === 'roi') {
      return colleges
        .filter((c) => {
          const feesNum = parseFloat((c.fees || '').replace(/[^0-9.]/g, '')) || 999;
          return feesNum <= 10 && feesNum > 0;
        })
        .slice(0, 6);
    }
    if (featuredTab === 'placements') {
      return colleges
        .filter((c) => {
          const ctcNum = parseFloat((c.avg_placement || '').replace(/[^0-9.]/g, '')) || 0;
          return ctcNum >= 12;
        })
        .slice(0, 6);
    }
    if (featuredTab === 'ranking') {
      return colleges
        .filter((c) => (c.ranking && c.ranking.includes('Top')) || (c.ranking && c.ranking.includes('NIRF')))
        .slice(0, 6);
    }
    // Direct admission / Merit
    return colleges.filter((c) => !c.exams || c.exams.length === 0 || c.exams.includes('Direct')).slice(0, 6);
  }, [featuredTab, colleges]);

  const displayedColleges = filteredFeaturedColleges.length > 0 ? filteredFeaturedColleges : colleges.slice(0, 6);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0D233E] to-[#123058] text-white pt-24 pb-20 md:pt-28 md:pb-24 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-radial from-sky-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Admissions Hub 2027–2029 • 600+ Audited Campuses
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-5">
            Compare Top B-Schools & Colleges.{' '}
            <span className="block mt-1 bg-gradient-to-r from-blue-300 via-sky-200 to-amber-300 bg-clip-text text-transparent">
              Secure Direct & Merit Admissions.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto mb-9 leading-relaxed">
            Real-time verified fees, average CTC placement data, CAT/CMAT cutoffs, and 1-on-1 certified counseling to land your dream campus.
          </p>

          {/* Search Bar */}
          <div ref={searchRef} className="relative max-w-2xl mx-auto text-left">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-2xl border border-white/20 focus-within:ring-4 focus-within:ring-blue-400/30 transition-all"
            >
              <div className="flex items-center flex-grow pl-3.5">
                <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search college name, city (e.g. Pune, Delhi), or course..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full text-sm sm:text-base font-semibold text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400 placeholder:font-normal py-2"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 shrink-0"
              >
                Search
              </button>
            </form>

            {/* Suggestions Palette */}
            {showSuggestions && (suggestions.colleges.length > 0 || suggestions.cities.length > 0 || suggestions.courses.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50 text-slate-800 text-left divide-y divide-slate-100">
                {/* Matching Colleges */}
                {suggestions.colleges.length > 0 && (
                  <div className="p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-1.5">
                      Matching Campuses
                    </span>
                    <div className="space-y-1">
                      {suggestions.colleges.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/colleges/${c.slug}`}
                          onClick={() => setShowSuggestions(false)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-xs text-blue-600 uppercase shrink-0">
                              {c.name.slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {c.name}
                              </p>
                              <p className="text-[11px] text-slate-500">{c.location}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-blue-600 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cities */}
                {suggestions.cities.length > 0 && (
                  <div className="p-3 bg-slate-50/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
                      Popular Hubs
                    </span>
                    <div className="flex flex-wrap gap-2 px-1">
                      {suggestions.cities.map((city) => (
                        <Link
                          key={city}
                          href={`/colleges?search=${encodeURIComponent(city)}`}
                          onClick={() => setShowSuggestions(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-all shadow-sm"
                        >
                          <MapPin className="w-3 h-3 text-blue-500" />
                          {city}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Courses */}
                {suggestions.courses.length > 0 && (
                  <div className="p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
                      Specializations & Degrees
                    </span>
                    <div className="flex flex-wrap gap-2 px-1">
                      {suggestions.courses.map((course) => (
                        <Link
                          key={course}
                          href={`/colleges?search=${encodeURIComponent(course)}`}
                          onClick={() => setShowSuggestions(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50/80 border border-blue-100 hover:border-blue-300 text-xs font-semibold text-blue-700 transition-all"
                        >
                          <GraduationCap className="w-3 h-3 text-blue-600" />
                          {course}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6 max-w-3xl mx-auto">
            <span className="text-xs text-slate-300 font-medium mr-1">Trending:</span>
            {[
              { label: 'Top 20 IIMs', href: '/top-tier-mba-colleges' },
              { label: 'Delhi NCR B-Schools', href: '/colleges?search=Delhi' },
              { label: 'Pune Tier-1 PGDM', href: '/colleges?search=Pune' },
              { label: 'Budget < ₹10L', href: '/colleges' },
              { label: 'Direct Admissions', href: '/inquiry' },
              { label: 'Online MBA 2027', href: '/online-degrees' },
            ].map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white text-xs font-medium transition-all backdrop-blur-sm"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          {/* Trust Stat Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-12 pt-8 border-t border-white/10">
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-white">600+</p>
              <p className="text-xs text-slate-300 font-medium mt-0.5">Audited Colleges</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-300">100%</p>
              <p className="text-xs text-slate-300 font-medium mt-0.5">Verified Placement Data</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-300">₹4.5L–35L</p>
              <p className="text-xs text-slate-300 font-medium mt-0.5">Transparent Fee Audits</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-sky-300">4.9 / 5★</p>
              <p className="text-xs text-slate-300 font-medium mt-0.5">Student Trust Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE BY DEGREE / STREAM GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* MBA / PGDM */}
          <Link
            href="/colleges?category=Management"
            className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                Postgraduate
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                MBA & PGDM
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Top AICTE/AIU approved B-schools, CAT/XAT cutoffs, and highest ROI options.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">{streamCounts.management} Listed</span>
              <span className="text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Explore <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Engineering (B.Tech) */}
          <Link
            href="/colleges?category=Engineering"
            className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                Technical
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                B.Tech / M.Tech
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Computer Science, AI, Data Science & core engineering entrance admissions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">{streamCounts.engineering} Listed</span>
              <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Explore <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Undergrad UG */}
          <Link
            href="/colleges?category=UG%20Courses"
            className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                Undergraduate
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                BBA, BCA, B.Com
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                CUET, IPU CET & direct merit colleges with top placement tracks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">{streamCounts.ug} Listed</span>
              <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Explore <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Online & Distance */}
          <Link
            href="/online-degrees"
            className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Laptop className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                Flexible Learning
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Online Degrees
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                UGC-DEB accredited Online MBA, MCA & BBA programs for working professionals.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">50+ Universities</span>
              <span className="text-xs font-bold text-amber-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Explore <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. SIDE-BY-SIDE COMPARE ENGINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#0c1f38] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <ArrowRightLeft className="w-3.5 h-3.5 text-blue-400" />
                Comparison Tool v2.0
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Compare Colleges <br />
                <span className="bg-gradient-to-r from-blue-300 to-sky-200 bg-clip-text text-transparent">
                  Side-by-Side In Detail
                </span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md">
                Unsure which campus offers higher ROI? Add up to 4 colleges to contrast tuition fees, average vs highest packages, NIRF rankings, and cutoffs in a clean comparison table.
              </p>

              <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" /> Real Fee Structure
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" /> Audited Average CTC
                </span>
              </div>
            </div>

            {/* Right Interactive Box */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-6 space-y-5">
              {/* Search to Add */}
              <div ref={compareSearchRef} className="relative">
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                  Search college to compare (Max 4):
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Type name (e.g. BIMTECH, FMS Delhi, Symbiosis, Great Lakes)..."
                    value={compareQuery}
                    onChange={(e) => setCompareQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 focus:border-blue-400 focus:outline-none rounded-xl text-xs sm:text-sm font-semibold text-white placeholder:text-slate-500 placeholder:font-normal"
                  />
                </div>

                {/* Autocomplete dropdown */}
                {compareSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-slate-200 max-h-56 overflow-y-auto z-40 text-slate-900 divide-y divide-slate-100">
                    {compareSuggestions.map((col) => (
                      <button
                        key={col.slug}
                        onClick={() => addCollegeToCompare(col)}
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50/70 transition-colors flex items-center justify-between text-xs group"
                      >
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {col.name}
                          </p>
                          <p className="text-[11px] text-slate-500">{col.location}</p>
                        </div>
                        <span className="text-xs font-bold text-blue-600 px-2 py-1 rounded bg-blue-50">
                          + Add
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Colleges Pill Tray */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-300">
                    Selected Campuses ({comparedColleges.length}/4):
                  </span>
                  {comparedColleges.length > 0 && (
                    <button
                      onClick={() => setComparedColleges([])}
                      className="text-[11px] text-slate-400 hover:text-rose-300 transition-colors font-semibold"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {comparedColleges.length === 0 ? (
                  <div className="border border-dashed border-slate-700/80 rounded-xl p-4 text-center text-xs text-slate-400">
                    Search and pick at least 2 colleges above to initiate side-by-side analysis.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {comparedColleges.map((col) => (
                      <div
                        key={col.slug}
                        className="bg-slate-800/90 border border-slate-700/70 rounded-xl px-3 py-2 flex items-center justify-between gap-2"
                      >
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-white truncate">{col.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{col.location.split(',')[0]}</p>
                        </div>
                        <button
                          onClick={() => removeComparedCollege(col.slug)}
                          className="text-slate-400 hover:text-rose-400 p-1 rounded-lg hover:bg-slate-700/50 transition-colors shrink-0"
                          title="Remove"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Compare Button */}
              <button
                disabled={comparedColleges.length < 2}
                onClick={handleCompareClick}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-md active:scale-95"
              >
                <ArrowRightLeft className="w-4 h-4" />
                Compare Now ({comparedColleges.length} Selected)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ADMISSIONS PREDICTOR & SHORTLIST CALCULATORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Live Admissions Tools
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Admissions Predictor & Shortlist Calculators
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Estimate your call chances based on your test percentiles (CAT, CMAT, MAT, JEE) and fee budget.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm gap-1">
            {[
              { id: 'mba', label: 'MBA / PGDM Predictor', icon: Trophy },
              { id: 'btech', label: 'B.Tech Shortlister', icon: Briefcase },
              { id: 'bba', label: 'BBA & BCA Shortlister', icon: GraduationCap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activePredictorTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePredictorTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-4 sm:p-8">
          {activePredictorTab === 'mba' && <MBACollegeGenerator />}
          {activePredictorTab === 'btech' && <BTechCollegeGenerator />}
          {activePredictorTab === 'bba' && <BBACollegeGenerator />}
        </div>
      </section>

      {/* 5. TOP REGIONAL EDUCATION HUBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Explore Popular Educational Hubs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Filter premier institutes and B-schools by prime metropolitan regions
            </p>
          </div>
          <Link
            href="/colleges"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            Browse All Cities <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { name: 'Delhi NCR', count: '45+ Campuses', tag: 'Top ROI', href: '/colleges?search=Delhi' },
            { name: 'Pune', count: '32+ Campuses', tag: 'Oxford of East', href: '/colleges?search=Pune' },
            { name: 'Bangalore', count: '38+ Campuses', tag: 'Tech Hub', href: '/colleges?search=Bangalore' },
            { name: 'Mumbai', count: '24+ Campuses', tag: 'Finance Capital', href: '/colleges?search=Mumbai' },
            { name: 'Noida', count: '28+ Campuses', tag: 'Corporate Belt', href: '/colleges?search=Noida' },
            { name: 'Jaipur', count: '16+ Campuses', tag: 'Heritage Hub', href: '/colleges?search=Jaipur' },
          ].map((hub) => (
            <Link
              key={hub.name}
              href={hub.href}
              className="group bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-center flex flex-col items-center justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {hub.name}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">{hub.count}</p>
              <span className="mt-2 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                {hub.tag}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. CURATED FEATURED COLLEGES DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Curated College Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Handpicked campuses based on placement audits, faculty pedigree, and ROI efficiency.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {[
              { id: 'roi', label: 'High ROI (< ₹10 Lakhs)' },
              { id: 'placements', label: 'Top Placements (12+ LPA)' },
              { id: 'ranking', label: 'NIRF & Top Ranked' },
              { id: 'direct', label: 'Direct & Merit Admissions' },
            ].map((btn) => {
              const isSelected = featuredTab === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setFeaturedTab(btn.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* College Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedColleges.map((college) => (
            <div
              key={college.slug}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden p-5 group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-black text-sm text-slate-700 uppercase shrink-0">
                      {college.name.slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {college.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {college.location}
                      </p>
                    </div>
                  </div>
                  {college.ranking && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                      {college.ranking.length > 20 ? college.ranking.slice(0, 18) + '...' : college.ranking}
                    </span>
                  )}
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Fees</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900">{college.fees}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Avg. Placement</span>
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-600">
                      {college.avg_placement}
                    </span>
                  </div>
                </div>

                {/* Exams & Courses */}
                <div className="space-y-1.5 text-[11px] text-slate-600 mt-2">
                  <div className="flex items-center gap-1 text-slate-500">
                    <span className="font-semibold text-slate-700">Exams:</span>
                    <span className="truncate">
                      {college.exams && college.exams.length > 0 ? college.exams.join(', ') : 'Direct Admission / Merit'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <span className="font-semibold text-slate-700">Courses:</span>
                    <span className="truncate">{college.courses.slice(0, 3).join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100">
                <Link
                  href={`/colleges/${college.slug}`}
                  className="flex-1 text-center py-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  View Details
                </Link>
                <Link
                  href={`/inquiry?college=${encodeURIComponent(college.name)}`}
                  className="flex-1 text-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-all shadow-sm"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-8">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            Explore All 600+ Colleges <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 7. ADMISSION COUNSELING & INQUIRY FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Authority Box */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Certified Admissions Advisory
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Confused About College Selection? <br />
              <span className="text-blue-600">Get Direct Profile Guidance</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Don&apos;t risk your career on misleading marketing brochures. Consult directly with Mohit Jain (IIM-B certified counselor) for realistic cutoff assessment, scholarship mapping, and direct admission routes.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-1">
              {[
                'CAT/CMAT/MAT percentile-to-college matching',
                'Institutional fee structure & scholarship evaluation',
                'Direct admission / Institutional quota seat guidance',
                'Honest placement reality check & alumni feedback',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit,%20I%20need%20guidance%20for%20admissions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Counselor
              </a>
              <a
                href="tel:+919560020771"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-sm"
              >
                <Phone className="w-4 h-4" />
                Call +91-9560020771
              </a>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
              Request Free 1-on-1 Counseling Call
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your details to receive personalized college shortlists and cutoff cut-sheets within 2 hours.
            </p>
            <InquiryForm />
          </div>
        </div>
      </section>

      {/* 8. ADMISSIONS INSIGHTS & FAQS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 pt-16">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Recent Articles */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-slate-900">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Latest Admissions Articles & Cutoffs
              </h2>
            </div>
            <div className="space-y-3">
              {posts.slice(0, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-slate-200/90 hover:border-blue-300 p-4 rounded-2xl block hover:shadow-md transition-all group"
                >
                  <span className="text-[10px] font-bold text-blue-600 block mb-1">
                    {new Date(post.date).toLocaleDateString('en-IN', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-xs text-slate-500 font-normal mt-1 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-slate-900">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Frequently Asked Admissions Questions
              </h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  q: 'How does the Admissions Predictor calculate my chances?',
                  a: 'The shortlist engine cross-references your entrance test percentiles (CAT, XAT, CMAT, MAT), undergraduate academic percentages, fee budget, and location preferences with the historical cutoff bands of over 600 verified colleges.',
                },
                {
                  q: 'Can I apply for Direct Admission through this portal?',
                  a: 'Yes. For AICTE-approved PGDM programs and leading private universities, direct application and management quota seat registration can be facilitated with comprehensive profile evaluations.',
                },
                {
                  q: 'What qualifies as a "High ROI" B-School?',
                  a: 'Colleges categorized under High ROI feature total tuition fees below ₹8–10 Lakhs while maintaining verified average placements exceeding ₹7–8 LPA, ensuring candidates recover their educational investment quickly.',
                },
                {
                  q: 'Is 1-on-1 counseling with Mohit Jain completely free?',
                  a: 'Yes. The initial consultation call and college eligibility shortlisting are 100% free of charge to help students navigate admissions transparently.',
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-blue-300 transition-colors"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-xs sm:text-sm text-slate-900 select-none">
                    {faq.q}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0 ml-2" />
                  </summary>
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
