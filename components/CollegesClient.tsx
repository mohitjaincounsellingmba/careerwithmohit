"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from "next/link";
import dynamic from "next/dynamic";
import { CollegeMetadata } from "@/lib/colleges";
import { CollegeCard } from "@/components/CollegeCard";
import { searchColleges, getSearchSuggestions } from "@/lib/collegeSearch";
import { 
  Search, X, MapPin, GraduationCap, IndianRupee, Briefcase, 
  Filter, ChevronDown, Sparkles, TrendingUp, Layers, Check, 
  ArrowRight, BookOpen, Compass, CheckCircle2, AlertCircle,
  LayoutGrid, List, SlidersHorizontal, RotateCcw, Building2,
  Award, ShieldCheck, Zap, PhoneCall, Gift, ChevronLeft, ChevronRight,
  School, CheckSquare, MessageSquare
} from "lucide-react";
import { CompareDrawer } from "@/components/CompareDrawer";
import { CompareModal } from "@/components/CompareModal";
import { BrochureModal } from "@/components/BrochureModal";

interface TrendingBlog {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

export const STATE_MBA_EXPLORER_HUBS = [
  {
    name: "Maharashtra",
    badge: "Financial Capital",
    icon: "🏦",
    cities: "Mumbai, Pune, Nagpur, Nashik",
    topInstitutes: "IIM Mumbai, JBIMS, SPJIMR, SIBM Pune, WeSchool, K J Somaiya",
    avgFee: "₹12L - ₹24L",
    avgPlacement: "₹14.50 LPA",
    topExams: ["CAT", "MAH CET", "XAT", "SNAP", "NMAT"]
  },
  {
    name: "Delhi NCR",
    badge: "Corporate Headquarters",
    icon: "🏛️",
    cities: "Delhi, Noida, Gurgaon, Ghaziabad",
    topInstitutes: "FMS, DMS IIT Delhi, MDI Gurgaon, IIFT, FORE, BIMTECH, NDIM",
    avgFee: "₹10L - ₹22L",
    avgPlacement: "₹15.80 LPA",
    topExams: ["CAT", "XAT", "GMAT", "CMAT", "MAT"]
  },
  {
    name: "Karnataka",
    badge: "Tech Capital of India",
    icon: "💻",
    cities: "Bangalore, Manipal, Mangalore",
    topInstitutes: "IIM Bangalore, TAPMI, JAGSoM, Christ, XIME, Alliance",
    avgFee: "₹9L - ₹21L",
    avgPlacement: "₹13.20 LPA",
    topExams: ["CAT", "XAT", "MAT", "CMAT", "GMAT"]
  },
  {
    name: "Tamil Nadu",
    badge: "Manufacturing & Auto Hub",
    icon: "⚡",
    cities: "Chennai, Coimbatore, Trichy",
    topInstitutes: "DoMS IIT Madras, IIM Trichy, Great Lakes, LIBA, PSGIM",
    avgFee: "₹8L - ₹20L",
    avgPlacement: "₹12.90 LPA",
    topExams: ["CAT", "XAT", "TANCET", "GMAT", "MAT"]
  },
  {
    name: "Telangana",
    badge: "IT & Pharma Capital",
    icon: "🚀",
    cities: "Hyderabad, Warangal",
    topInstitutes: "ISB, IBS Hyderabad, IPE, Woxsen, VJIM, SIBM-H",
    avgFee: "₹8L - ₹17L",
    avgPlacement: "₹11.50 LPA",
    topExams: ["CAT", "XAT", "IBSAT", "NMAT", "MAT"]
  },
  {
    name: "Gujarat",
    badge: "Business & Entrepreneurship",
    icon: "📈",
    cities: "Ahmedabad, Gandhinagar, Anand",
    topInstitutes: "IIM Ahmedabad, MICA, IRMA Anand, Nirma, PDEU",
    avgFee: "₹9L - ₹23L",
    avgPlacement: "₹16.50 LPA",
    topExams: ["CAT", "XAT", "MICAT", "CMAT"]
  },
  {
    name: "West Bengal",
    badge: "Eastern Gateway",
    icon: "🌐",
    cities: "Kolkata, Kharagpur",
    topInstitutes: "IIM Calcutta, VGSoM IIT Kharagpur, IMI, Globsyn, Praxis",
    avgFee: "₹7L - ₹25L",
    avgPlacement: "₹14.20 LPA",
    topExams: ["CAT", "XAT", "MAT", "CMAT"]
  },
  {
    name: "Rajasthan",
    badge: "Heritage & Corporate Hub",
    icon: "🏰",
    cities: "Jaipur, Udaipur, Pilani",
    topInstitutes: "IIM Udaipur, BITS Pilani, Jaipuria Jaipur, IIHMR, Taxila",
    avgFee: "₹6L - ₹18L",
    avgPlacement: "₹10.80 LPA",
    topExams: ["CAT", "XAT", "MAT", "CMAT", "ATMA"]
  }
];

export function CollegesClient({ 
  colleges, 
  trendingBlogs = [] 
}: { 
  colleges: CollegeMetadata[]; 
  trendingBlogs?: TrendingBlog[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [comparedColleges, setComparedColleges] = useState<CollegeMetadata[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Primary Filters
  const [selectedCategory, setSelectedCategory] = useState("All Fields");
  const [selectedFeeRange, setSelectedFeeRange] = useState("Any fees");
  const [selectedOwnership, setSelectedOwnership] = useState("Any type");
  const [selectedState, setSelectedState] = useState("All states");
  const [selectedExam, setSelectedExam] = useState("Any exam");
  const [selectedRanking, setSelectedRanking] = useState("all");
  const [isNirfOnly, setIsNirfOnly] = useState(false);
  const [sortBy, setSortBy] = useState("name-asc");
  
  // Quick Filter Chips
  const [activeChip, setActiveChip] = useState<string | null>(null);

  // Pagination & Layout
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  
  // Brochure Modal State
  const [brochureCollege, setBrochureCollege] = useState<CollegeMetadata | null>(null);

  // Handle compare toggle
  const handleCompareToggle = (slug: string) => {
    setComparedColleges((prev) => {
      const exists = prev.some((c) => c.slug === slug);
      if (exists) {
        return prev.filter((c) => c.slug !== slug);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 colleges at a time!");
        return prev;
      }
      const collegeToAdd = colleges.find((c) => c.slug === slug);
      return collegeToAdd ? [...prev, collegeToAdd] : prev;
    });
  };

  const handleClearAllCompare = () => setComparedColleges([]);

  const handleOpenCompareModal = () => {
    if (comparedColleges.length > 0) {
      setIsCompareModalOpen(true);
    }
  };

  // Pan-India city & district mapping
  const locationMap = useMemo(() => {
    const cityMap: Record<string, { state: string; city: string }> = {
      "delhi": { state: "Delhi NCR", city: "Delhi" },
      "noida": { state: "Delhi NCR", city: "Noida" },
      "greater noida": { state: "Delhi NCR", city: "Greater Noida" },
      "gurgaon": { state: "Delhi NCR", city: "Gurgaon" },
      "gurugram": { state: "Delhi NCR", city: "Gurgaon" },
      "ghaziabad": { state: "Delhi NCR", city: "Ghaziabad" },
      "faridabad": { state: "Delhi NCR", city: "Faridabad" },
      "mumbai": { state: "Maharashtra", city: "Mumbai" },
      "pune": { state: "Maharashtra", city: "Pune" },
      "nagpur": { state: "Maharashtra", city: "Nagpur" },
      "nashik": { state: "Maharashtra", city: "Nashik" },
      "bangalore": { state: "Karnataka", city: "Bangalore" },
      "bengaluru": { state: "Karnataka", city: "Bangalore" },
      "manipal": { state: "Karnataka", city: "Manipal" },
      "mangalore": { state: "Karnataka", city: "Mangalore" },
      "mysore": { state: "Karnataka", city: "Mysore" },
      "chennai": { state: "Tamil Nadu", city: "Chennai" },
      "coimbatore": { state: "Tamil Nadu", city: "Coimbatore" },
      "trichy": { state: "Tamil Nadu", city: "Trichy" },
      "vellore": { state: "Tamil Nadu", city: "Vellore" },
      "hyderabad": { state: "Telangana", city: "Hyderabad" },
      "warangal": { state: "Telangana", city: "Warangal" },
      "ahmedabad": { state: "Gujarat", city: "Ahmedabad" },
      "gandhinagar": { state: "Gujarat", city: "Gandhinagar" },
      "anand": { state: "Gujarat", city: "Anand" },
      "surat": { state: "Gujarat", city: "Surat" },
      "vadodara": { state: "Gujarat", city: "Vadodara" },
      "kolkata": { state: "West Bengal", city: "Kolkata" },
      "calcutta": { state: "West Bengal", city: "Kolkata" },
      "kharagpur": { state: "West Bengal", city: "Kharagpur" },
      "jaipur": { state: "Rajasthan", city: "Jaipur" },
      "udaipur": { state: "Rajasthan", city: "Udaipur" },
      "jodhpur": { state: "Rajasthan", city: "Jodhpur" },
      "pilani": { state: "Rajasthan", city: "Pilani" },
      "lucknow": { state: "Uttar Pradesh", city: "Lucknow" },
      "kanpur": { state: "Uttar Pradesh", city: "Kanpur" },
      "varanasi": { state: "Uttar Pradesh", city: "Varanasi" },
      "prayagraj": { state: "Uttar Pradesh", city: "Prayagraj" },
      "chandigarh": { state: "Punjab & Chandigarh", city: "Chandigarh" },
      "mohali": { state: "Punjab & Chandigarh", city: "Mohali" },
      "amritsar": { state: "Punjab & Chandigarh", city: "Amritsar" },
      "patiala": { state: "Punjab & Chandigarh", city: "Patiala" },
      "kochi": { state: "Kerala", city: "Kochi" },
      "kozhikode": { state: "Kerala", city: "Kozhikode" },
      "trivandrum": { state: "Kerala", city: "Trivandrum" },
      "indore": { state: "Madhya Pradesh", city: "Indore" },
      "bhopal": { state: "Madhya Pradesh", city: "Bhopal" },
      "gwalior": { state: "Madhya Pradesh", city: "Gwalior" },
      "bhubaneswar": { state: "Odisha", city: "Bhubaneswar" },
      "rourkela": { state: "Odisha", city: "Rourkela" },
      "patna": { state: "Bihar", city: "Patna" },
      "ranchi": { state: "Jharkhand", city: "Ranchi" },
      "jamshedpur": { state: "Jharkhand", city: "Jamshedpur" },
      "dehradun": { state: "Uttarakhand", city: "Dehradun" },
      "roorkee": { state: "Uttarakhand", city: "Roorkee" },
      "goa": { state: "Goa", city: "Goa" }
    };

    return colleges.reduce((acc, college) => {
      const loc = (college.location || "").toLowerCase();
      const name = (college.name || "").toLowerCase();
      let state = college.state || "Other";
      let city = "Other";

      for (const [key, mapping] of Object.entries(cityMap)) {
        if (loc.includes(key)) {
          if (state === "Other") state = mapping.state;
          city = mapping.city;
          break;
        }
      }

      if (state === "Other") {
        if (name.includes("delhi") || name.includes("ncr") || name.includes("noida") || name.includes("gurgaon") || name.includes("ghaziabad")) {
          state = "Delhi NCR"; city = "Delhi";
        } else if (name.includes("bangalore") || name.includes("bengaluru") || name.includes("christ") || name.includes("rvce")) {
          state = "Karnataka"; city = "Bangalore";
        } else if (name.includes("mumbai") || name.includes("pune") || name.includes("symbiosis")) {
          state = "Maharashtra"; city = name.includes("mumbai") ? "Mumbai" : "Pune";
        } else if (name.includes("chennai") || name.includes("vit") || name.includes("srm")) {
          state = "Tamil Nadu"; city = "Chennai";
        } else if (name.includes("hyderabad")) {
          state = "Telangana"; city = "Hyderabad";
        } else if (name.includes("kolkata") || name.includes("calcutta")) {
          state = "West Bengal"; city = "Kolkata";
        } else if (name.includes("jaipur")) {
          state = "Rajasthan"; city = "Jaipur";
        }
      }

      if (city === "Other" && college.location) {
        const parts = college.location.split(",");
        if (parts.length > 0 && parts[0].trim()) {
          city = parts[0].trim();
        }
      }

      acc[college.slug] = { state, city };
      return acc;
    }, {} as Record<string, { state: string; city: string }>);
  }, [colleges]);

  // Sync initial query params from URL
  useEffect(() => {
    if (!searchParams) return;
    const q = searchParams.get('search') || searchParams.get('q') || '';
    if (q) setSearchQuery(q);

    const st = searchParams.get('state');
    if (st) setSelectedState(st);

    const cat = searchParams.get('category') || searchParams.get('stream');
    if (cat) {
      const cleanCat = cat.toLowerCase();
      if (cleanCat.includes('manage') || cleanCat === 'mba' || cleanCat === 'pgdm') setSelectedCategory('Management');
      else if (cleanCat.includes('eng') || cleanCat === 'btech' || cleanCat === 'b.tech') setSelectedCategory('Engineering');
      else if (cleanCat.includes('ug') || cleanCat === 'bba' || cleanCat === 'bca') setSelectedCategory('UG Courses');
    }

    const bdg = searchParams.get('budget') || searchParams.get('fees');
    if (bdg) setSelectedFeeRange(bdg);

    const exm = searchParams.get('exam');
    if (exm) setSelectedExam(exm);

    const srt = searchParams.get('sort');
    if (srt) setSortBy(srt);
  }, [searchParams]);

  // Click outside listener for search autocomplete popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    return getSearchSuggestions(searchQuery, colleges, locationMap, 6);
  }, [searchQuery, colleges, locationMap]);

  // Stream options with counts
  const streamOptions = useMemo(() => {
    const mgmtCount = colleges.filter(c => c.category === "Management").length;
    const enggCount = colleges.filter(c => c.category === "Engineering").length;
    const ugCount = colleges.filter(c => c.category === "UG Courses").length;
    return [
      { id: "All Fields", label: "All Fields", count: colleges.length },
      { id: "Management", label: "Management", count: mgmtCount },
      { id: "Engineering", label: "Engineering", count: enggCount },
      { id: "UG Courses", label: "UG Courses", count: ugCount },
    ];
  }, [colleges]);

  // States list with counts
  const stateOptions = useMemo(() => {
    const stateCounts: Record<string, number> = {};
    colleges.forEach(c => {
      const st = locationMap[c.slug]?.state || "Other";
      if (st && st !== "Other") {
        stateCounts[st] = (stateCounts[st] || 0) + 1;
      }
    });
    const sortedStates = Object.keys(stateCounts).sort();
    return ["All states", ...sortedStates];
  }, [colleges, locationMap]);

  // Helper to parse fees into number of Lakhs
  const parseFeeNum = (feeStr?: string): number => {
    if (!feeStr) return 0;
    const clean = feeStr.replace(/[₹,]/g, '').toLowerCase();
    const match = clean.match(/([0-9]+(\.[0-9]+)?)/);
    if (!match) return 0;
    let val = parseFloat(match[1]);
    if (clean.includes('crore') || clean.includes('cr')) val *= 100;
    return val;
  };

  // Helper to parse placement into number of LPA
  const parsePlacementNum = (placeStr?: string): number => {
    if (!placeStr) return 0;
    const clean = placeStr.replace(/[₹,]/g, '').toLowerCase();
    const match = clean.match(/([0-9]+(\.[0-9]+)?)/);
    if (!match) return 0;
    let val = parseFloat(match[1]);
    if (clean.includes('crore') || clean.includes('cr')) val *= 100;
    return val;
  };

  // Filter and score colleges
  const filteredColleges = useMemo(() => {
    const cleanQuery = searchQuery.trim();
    let baseList: { college: CollegeMetadata; score: number }[] = [];

    if (cleanQuery) {
      baseList = searchColleges(colleges, cleanQuery, locationMap);
    } else {
      baseList = colleges.map(c => ({ college: c, score: 0 }));
    }

    return baseList.filter(({ college }) => {
      const locInfo = locationMap[college.slug] || { state: "Other", city: "Other" };

      // 1. Category / Stream Filter
      if (selectedCategory !== "All Fields" && college.category !== selectedCategory) {
        return false;
      }

      // 2. State Filter
      if (selectedState !== "All states" && locInfo.state !== selectedState) {
        return false;
      }

      // 3. Ownership / Type Filter
      if (selectedOwnership !== "Any type") {
        const own = (college.ownership || "").toLowerCase();
        const selOwn = selectedOwnership.toLowerCase();
        if (!own.includes(selOwn)) return false;
      }

      // 4. Exam Filter
      if (selectedExam !== "Any exam") {
        const exams = (college.exams || []).map(e => e.toLowerCase());
        const selEx = selectedExam.toLowerCase();
        const hasExam = exams.some(e => e.includes(selEx) || selEx.includes(e));
        if (!hasExam) return false;
      }

      // 5. Fees Filter
      if (selectedFeeRange !== "Any fees") {
        const feeVal = parseFeeNum(college.fees);
        if (selectedFeeRange === "under-5" || selectedFeeRange === "Under ₹5 L") {
          if (feeVal > 5) return false;
        } else if (selectedFeeRange === "5-10" || selectedFeeRange === "₹5 – 10 L") {
          if (feeVal < 5 || feeVal > 10) return false;
        } else if (selectedFeeRange === "10-20" || selectedFeeRange === "₹10 – 20 L") {
          if (feeVal < 10 || feeVal > 20) return false;
        } else if (selectedFeeRange === "above-20" || selectedFeeRange === "Above ₹20 L") {
          if (feeVal < 20) return false;
        }
      }

      // 6. NIRF Ranked Only Checkbox
      if (isNirfOnly) {
        const rank = (college.ranking || "").toLowerCase();
        if (!rank.includes("nirf") && !rank.includes("#")) return false;
      }

      // 7. Quick Chip Filters
      if (activeChip) {
        if (activeChip === "top-10") {
          const rank = college.ranking || "";
          const m = rank.match(/#(\d+)/);
          if (!m || parseInt(m[1]) > 10) return false;
        } else if (activeChip === "top-50") {
          const rank = college.ranking || "";
          const m = rank.match(/#(\d+)/);
          if (!m || parseInt(m[1]) > 50) return false;
        } else if (activeChip === "fees-under-10") {
          const feeVal = parseFeeNum(college.fees);
          if (feeVal > 10) return false;
        } else if (activeChip === "pkg-above-25") {
          const highest = parsePlacementNum(college.highest_placement);
          if (highest < 25) return false;
        } else if (activeChip === "cat") {
          const exams = (college.exams || []).map(e => e.toUpperCase());
          if (!exams.includes("CAT")) return false;
        } else if (activeChip === "cmat-mat") {
          const exams = (college.exams || []).map(e => e.toUpperCase());
          if (!exams.includes("CMAT") && !exams.includes("MAT")) return false;
        } else if (activeChip === "delhi") {
          if (locInfo.state !== "Delhi NCR") return false;
        } else if (activeChip === "bangalore") {
          if (locInfo.state !== "Karnataka") return false;
        } else if (activeChip === "mumbai-pune") {
          if (locInfo.state !== "Maharashtra") return false;
        } else if (activeChip === "high-roi") {
          const fee = parseFeeNum(college.fees);
          const avg = parsePlacementNum(college.avg_placement);
          if (fee <= 0 || avg / fee < 1.1) return false;
        }
      }

      return true;
    });
  }, [colleges, searchQuery, locationMap, selectedCategory, selectedState, selectedOwnership, selectedExam, selectedFeeRange, isNirfOnly, activeChip]);

  // Sort filtered colleges
  const sortedColleges = useMemo(() => {
    const list = [...filteredColleges];

    list.sort((a, b) => {
      if (sortBy === "name-asc" || sortBy === "name") {
        return a.college.name.localeCompare(b.college.name);
      }
      if (sortBy === "name-desc") {
        return b.college.name.localeCompare(a.college.name);
      }
      if (sortBy === "fees-low" || sortBy === "fees_low") {
        return parseFeeNum(a.college.fees) - parseFeeNum(b.college.fees);
      }
      if (sortBy === "fees-high" || sortBy === "fees_high") {
        return parseFeeNum(b.college.fees) - parseFeeNum(a.college.fees);
      }
      if (sortBy === "highest_placement" || sortBy === "pkg-high") {
        return parsePlacementNum(b.college.highest_placement) - parsePlacementNum(a.college.highest_placement);
      }
      if (sortBy === "avg_placement") {
        return parsePlacementNum(b.college.avg_placement) - parsePlacementNum(a.college.avg_placement);
      }
      if (sortBy === "ranking") {
        const getRank = (c: CollegeMetadata) => {
          const m = (c.ranking || "").match(/#(\d+)/);
          return m ? parseInt(m[1]) : 999;
        };
        return getRank(a.college) - getRank(b.college);
      }
      if (sortBy === "roi") {
        const roiA = parseFeeNum(a.college.fees) > 0 ? parsePlacementNum(a.college.avg_placement) / parseFeeNum(a.college.fees) : 0;
        const roiB = parseFeeNum(b.college.fees) > 0 ? parsePlacementNum(b.college.avg_placement) / parseFeeNum(b.college.fees) : 0;
        return roiB - roiA;
      }
      if (searchQuery.trim()) {
        return b.score - a.score;
      }
      return 0;
    });

    return list.map(item => item.college);
  }, [filteredColleges, sortBy, searchQuery]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedState, selectedOwnership, selectedExam, selectedFeeRange, isNirfOnly, activeChip, sortBy]);

  // Paginated slice
  const totalPages = Math.ceil(sortedColleges.length / itemsPerPage) || 1;
  const paginatedColleges = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedColleges.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedColleges, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== "undefined") {
        const el = document.getElementById("colleges-listing-top");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  // Reset all filters
  const handleClearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Fields");
    setSelectedState("All states");
    setSelectedOwnership("Any type");
    setSelectedExam("Any exam");
    setSelectedFeeRange("Any fees");
    setIsNirfOnly(false);
    setActiveChip(null);
    setSortBy("name-asc");
    setCurrentPage(1);
  };

  const hasActiveFilters = 
    searchQuery.trim() !== "" ||
    selectedCategory !== "All Fields" ||
    selectedState !== "All states" ||
    selectedOwnership !== "Any type" ||
    selectedExam !== "Any exam" ||
    selectedFeeRange !== "Any fees" ||
    isNirfOnly ||
    activeChip !== null;

  return (
    <div className="bg-[#F4F2FF] text-[#14103A] min-h-screen">
      
      {/* ========================================================
          1. NOTEBOOK NEON HERO / MASTHEAD
          Deep Indigo (#14103A) background with glowing ambient mesh
          ======================================================== */}
      <header className="relative bg-[#14103A] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-[2.5rem] shadow-xl border-b border-white/10">
        
        {/* Luminous Glow Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 -right-24 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-300">
            <Link href="/" className="hover:text-amber-300 transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <span>›</span>
            <span className="text-amber-400 font-bold">Colleges</span>
          </nav>

          {/* Heading with yellow marker brush */}
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Colleges in{" "}
              <span className="relative inline-block text-white">
                <span className="relative z-10">India</span>
                <span className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-3 sm:h-4 bg-amber-400 -rotate-1 rounded-sm -z-0" />
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
              Browse <span className="text-amber-300 font-bold font-mono">{colleges.length}+</span> verified colleges by fees, placement packages, state ranking, and accepted entrance tests.
            </p>
          </div>

          {/* 4-Card Quick Stat Ticker */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-colors">
              <span className="font-mono text-2xl sm:text-3xl font-black text-amber-300 block">
                {colleges.length}+
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300 font-medium">
                Verified Colleges
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-colors">
              <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400 block">
                ₹1.15 Cr
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300 font-medium">
                Highest CTC Tracked
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-colors">
              <span className="font-mono text-2xl sm:text-3xl font-black text-violet-300 block">
                95%+
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300 font-medium">
                Placement Tracked
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-colors">
              <span className="font-mono text-2xl sm:text-3xl font-black text-pink-400 block">
                100%
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300 font-medium">
                Direct Merit Guidance
              </span>
            </div>
          </div>

        </div>
      </header>


      {/* ========================================================
          2. EXCLUSIVE APPLICATION OFFERS & COUNSELLING BAND
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-[#191046] border-2 border-violet-500/40 rounded-3xl p-5 sm:p-7 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-mono text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admission Offers 2026-27</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Application Fee Waivers &amp; Free 1-on-1 Profile Assessment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Get up to 100% application fee discounts on premier AICTE &amp; UGC recognized colleges. Receive a custom college shortlist tailored to your budget and percentile with Mohit Jain (IIM-B certified).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10 w-full lg:w-auto justify-center">
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit,%20I%20want%20to%20claim%20college%20application%20discount%20and%20counselling"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Free 1-on-1 Shortlist</span>
            </a>
            <Link
              href="/inquiry?type=counselling"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
            >
              <span>Explore Waivers &rarr;</span>
            </Link>
          </div>
        </div>
      </section>


      {/* ========================================================
          3. STREAM / FIELD QUICK SELECTOR TABS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap gap-2.5 items-center">
          {streamOptions.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 select-none ${
                  isActive
                    ? "bg-[#14103A] text-white shadow-md shadow-indigo-950/20 scale-102"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-violet-400 hover:text-violet-700"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>


      {/* ========================================================
          4. UNIFIED FILTER BAR (FBAR) - Matching College4Sure Layout
          ======================================================== */}
      <section id="colleges-listing-top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
          
          {/* Main Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
            
            {/* Search Input (Wide: 4 cols on desktop) */}
            <div className="lg:col-span-4 relative" ref={searchContainerRef}>
              <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Search College, City, Exam
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="IIM Bangalore, law colleges in Pune, BITS…"
                  className="w-full bg-[#F4F2FF] text-slate-900 border border-slate-200 rounded-full pl-10 pr-9 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20 transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Autocomplete suggestions popup */}
              {isSearchFocused && searchSuggestions.popularSearches.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-40 space-y-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-2">
                    Popular Searches
                  </span>
                  <div className="space-y-1">
                    {searchSuggestions.popularSearches.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(s);
                          setIsSearchFocused(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700 rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>{s}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Field / Stream Select */}
            <div className="lg:col-span-2">
              <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Field
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#F4F2FF] text-slate-900 border border-slate-200 rounded-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:border-violet-600 transition-all cursor-pointer"
              >
                {streamOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label} ({opt.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Fees Range Select */}
            <div className="lg:col-span-2">
              <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Fees
              </label>
              <select
                value={selectedFeeRange}
                onChange={(e) => setSelectedFeeRange(e.target.value)}
                className="w-full bg-[#F4F2FF] text-slate-900 border border-slate-200 rounded-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:border-violet-600 transition-all cursor-pointer"
              >
                <option value="Any fees">Any fees</option>
                <option value="under-5">Under ₹5 L</option>
                <option value="5-10">₹5 – 10 L</option>
                <option value="10-20">₹10 – 20 L</option>
                <option value="above-20">Above ₹20 L</option>
              </select>
            </div>

            {/* State Select */}
            <div className="lg:col-span-2">
              <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-[#F4F2FF] text-slate-900 border border-slate-200 rounded-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:border-violet-600 transition-all cursor-pointer truncate"
              >
                {stateOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Select */}
            <div className="lg:col-span-2">
              <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Sort
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#F4F2FF] text-slate-900 border border-slate-200 rounded-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:border-violet-600 transition-all cursor-pointer"
              >
                <option value="name-asc">A–Z</option>
                <option value="fees-low">Fees: low first</option>
                <option value="fees-high">Fees: high first</option>
                <option value="highest_placement">Highest CTC</option>
                <option value="avg_placement">Avg Placement</option>
                <option value="ranking">NIRF Rank</option>
                <option value="roi">Best ROI Ratio</option>
              </select>
            </div>

          </div>

          {/* Secondary Row: Checkbox toggles & Quick Filter Chips */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            
            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto custom-scrollbar py-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                Quick:
              </span>

              {[
                { id: "top-10", label: "Top 10 NIRF" },
                { id: "top-50", label: "Top 50 NIRF" },
                { id: "fees-under-10", label: "Under ₹10L Fee" },
                { id: "pkg-above-25", label: "Package > 25 LPA" },
                { id: "cat", label: "Accepts CAT" },
                { id: "cmat-mat", label: "Accepts CMAT/MAT" },
                { id: "delhi", label: "Delhi NCR" },
                { id: "bangalore", label: "Bangalore" },
                { id: "mumbai-pune", label: "Mumbai & Pune" },
                { id: "high-roi", label: "High ROI (1.2x+)" }
              ].map((chip) => {
                const isActive = activeChip === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setActiveChip(isActive ? null : chip.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-violet-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* NIRF Ranked Checkbox & Clear Filter Button */}
            <div className="flex items-center gap-3 shrink-0">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full">
                <input
                  type="checkbox"
                  checked={isNirfOnly}
                  onChange={(e) => setIsNirfOnly(e.target.checked)}
                  className="rounded text-violet-600 focus:ring-violet-500 w-3.5 h-3.5 accent-violet-600"
                />
                <span>NIRF ranked only</span>
              </label>

              {hasActiveFilters && (
                <button
                  onClick={handleClearAllFilters}
                  className="text-xs font-bold text-violet-600 hover:text-violet-800 underline underline-offset-4 cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          5. RESULTS BAR & VIEW MODE TOGGLE
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          
          {/* Results Counter */}
          <div className="font-mono text-xs font-bold text-slate-600">
            Showing <span className="text-slate-950 font-black">{paginatedColleges.length}</span> of{" "}
            <span className="text-violet-700 font-black">{sortedColleges.length}</span> colleges
            {selectedCategory !== "All Fields" && ` in ${selectedCategory}`}
            {selectedState !== "All states" && ` (${selectedState})`}
          </div>

          {/* View Mode & Compare Counter */}
          <div className="flex items-center gap-3">
            {comparedColleges.length > 0 && (
              <button
                onClick={handleOpenCompareModal}
                className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-700 text-white font-mono text-xs font-bold rounded-full shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Compare ({comparedColleges.length}/4)</span>
              </button>
            )}

            <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1 shadow-2xs">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-[#14103A] text-white" : "text-slate-500 hover:text-slate-800"
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "list" ? "bg-[#14103A] text-white" : "text-slate-500 hover:text-slate-800"
                }`}
                title="List View"
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          6. COLLEGE CARDS GRID / LIST
          ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {paginatedColleges.length > 0 ? (
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {paginatedColleges.map((college) => {
              const isCompared = comparedColleges.some((c) => c.slug === college.slug);
              return (
                <CollegeCard
                  key={college.slug}
                  college={college}
                  onCompareToggle={handleCompareToggle}
                  isCompared={isCompared}
                  onDownloadBrochure={(c) => setBrochureCollege(c)}
                  viewMode={viewMode}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-sm my-8">
            <div className="w-16 h-16 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center mx-auto">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              No matching colleges found
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find colleges matching your exact filters. Try clearing your search query or selecting &quot;All Fields&quot;.
            </p>
            <button
              onClick={handleClearAllFilters}
              className="px-6 py-3 bg-[#14103A] hover:bg-violet-700 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pt-12 pb-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              
              {/* Prev Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3.5 py-2 rounded-full border border-slate-200 bg-white font-mono text-xs font-bold text-slate-700 hover:border-violet-600 hover:text-violet-600 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              {/* Page Number Chips */}
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 7) {
                  if (currentPage > 4 && currentPage < totalPages - 3) {
                    pageNum = currentPage - 3 + i;
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  }
                }
                const isCurrent = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-full font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-violet-600 hover:text-violet-600"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3.5 py-2 rounded-full border border-slate-200 bg-white font-mono text-xs font-bold text-slate-700 hover:border-violet-600 hover:text-violet-600 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

            <span className="font-mono text-xs text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}
      </main>


      {/* ========================================================
          7. REGIONAL MBA HUBS SHOWCASE
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-bold text-violet-700 uppercase tracking-widest block mb-1">
                Regional Hubs
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Explore Premier State &amp; City Campuses
              </h2>
            </div>
            <Link
              href="/inquiry/"
              className="text-xs font-bold text-violet-700 hover:text-violet-900 flex items-center gap-1"
            >
              <span>Get State-wise Cutoff Report &rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATE_MBA_EXPLORER_HUBS.map((hub, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-violet-400 hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{hub.icon}</span>
                    <span className="bg-violet-50 text-violet-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                      {hub.badge}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {hub.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {hub.cities}
                  </p>
                  <p className="text-xs text-slate-700 font-semibold line-clamp-2">
                    {hub.topInstitutes}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-700 font-bold">{hub.avgPlacement}</span>
                  <button
                    onClick={() => {
                      setSelectedState(hub.name);
                      const el = document.getElementById("colleges-listing-top");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-violet-600 font-bold hover:underline"
                  >
                    View Colleges &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================
          8. COMPARE DRAWER & MODAL
          ======================================================== */}
      <CompareDrawer
        selectedColleges={comparedColleges}
        onRemove={handleCompareToggle}
        onClearAll={handleClearAllCompare}
        onCompare={handleOpenCompareModal}
      />

      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        colleges={comparedColleges}
        onRemove={handleCompareToggle}
        onDownloadBrochure={(c) => setBrochureCollege(c)}
      />

      {/* Brochure Lead Download Gate */}
      {brochureCollege && (
        <BrochureModal
          isOpen={!!brochureCollege}
          onClose={() => setBrochureCollege(null)}
          collegeName={brochureCollege.name}
          collegeSlug={brochureCollege.slug}
          brochureUrl={brochureCollege.brochure_url}
          feesText={brochureCollege.fees}
        />
      )}

    </div>
  );
}
