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
  Award, ShieldCheck, Zap
} from "lucide-react";

const BTechCollegeGenerator = dynamic(
  () => import("@/components/BTechCollegeGenerator").then((mod) => mod.BTechCollegeGenerator),
  { ssr: false }
);
const MBACollegeGenerator = dynamic(
  () => import("@/components/MBACollegeGenerator").then((mod) => mod.MBACollegeGenerator),
  { ssr: false }
);
const BBACollegeGenerator = dynamic(
  () => import("@/components/BBACollegeGenerator").then((mod) => mod.BBACollegeGenerator),
  { ssr: false }
);
const CompareDrawer = dynamic(
  () => import("@/components/CompareDrawer").then((mod) => mod.CompareDrawer),
  { ssr: false }
);
const BrochureModal = dynamic(
  () => import("@/components/BrochureModal").then((mod) => mod.BrochureModal),
  { ssr: false }
);

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
    topInstitutes: "FMS, DMS IIT Delhi, MDI Gurgaon, IIFT, FORE, BIMTECH",
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
  },
  {
    name: "Kerala",
    badge: "Maritime & Tourism Economy",
    icon: "🌴",
    cities: "Kochi, Kozhikode, Trivandrum",
    topInstitutes: "IIM Kozhikode, Rajagiri RCBS, SCMS Cochin",
    avgFee: "₹7L - ₹22L",
    avgPlacement: "₹13.50 LPA",
    topExams: ["CAT", "KMAT", "CMAT", "MAT"]
  },
  {
    name: "Madhya Pradesh",
    badge: "Central India Commercial Hub",
    icon: "🎯",
    cities: "Indore, Bhopal, Gwalior",
    topInstitutes: "IIM Indore, PIMR, IMS DAVV, SIBM Indore, IIITM",
    avgFee: "₹3L - ₹21L",
    avgPlacement: "₹11.20 LPA",
    topExams: ["CAT", "CMAT", "MP DTE", "MAT"]
  },
  {
    name: "Odisha",
    badge: "Heavy Industries & Education",
    icon: "🚢",
    cities: "Bhubaneswar, Cuttack, Sambalpur",
    topInstitutes: "XIMB, IIM Sambalpur, KSOM KIIT, IMI Bhubaneswar",
    avgFee: "₹8L - ₹22L",
    avgPlacement: "₹12.80 LPA",
    topExams: ["XAT", "CAT", "MAT", "CMAT"]
  },
  {
    name: "Punjab & Chandigarh",
    badge: "Northern Industrial Corridor",
    icon: "🌾",
    cities: "Chandigarh, Mohali, Amritsar, Phagwara",
    topInstitutes: "IIM Amritsar, UBS Panjab Univ, LMTSM Thapar, LPU, Chitkara",
    avgFee: "₹1L - ₹17L",
    avgPlacement: "₹11.80 LPA",
    topExams: ["CAT", "XAT", "MAT", "CMAT"]
  },
  {
    name: "Uttar Pradesh",
    badge: "Northern Higher Education Corridor",
    icon: "🎓",
    cities: "Lucknow, Kanpur, Varanasi, Agra",
    topInstitutes: "IIM Lucknow, IMT Ghaziabad, IIT Kanpur IME, Jaipuria Lucknow",
    avgFee: "₹5L - ₹21L",
    avgPlacement: "₹15.20 LPA",
    topExams: ["CAT", "XAT", "CMAT", "CUET-PG"]
  },
  {
    name: "Goa",
    badge: "Executive Coastal Management",
    icon: "🏖️",
    cities: "Sanquelim, Panaji",
    topInstitutes: "Goa Institute of Management (GIM), Goa Business School",
    avgFee: "₹3L - ₹19.5L",
    avgPlacement: "₹15.20 LPA",
    topExams: ["CAT", "XAT", "CMAT", "GMAT"]
  }
];

export const STATE_ENGINEERING_EXPLORER_HUBS = [
  {
    name: "Tamil Nadu",
    badge: "Deep Tech & Research Powerhouse",
    icon: "⚡",
    cities: "Chennai, Trichy, Coimbatore, Vellore",
    topInstitutes: "IIT Madras (#1 NIRF), NIT Trichy, Anna Univ CEG, PSG Tech, SSN, VIT Vellore",
    avgFee: "₹1.5L - ₹10L",
    avgPlacement: "₹12.50 LPA",
    topExams: ["JEE Advanced", "JEE Main", "TNEA", "VITEEE"]
  },
  {
    name: "Karnataka",
    badge: "Silicon Valley Engineering Hub",
    icon: "💻",
    cities: "Bangalore, Surathkal, Manipal",
    topInstitutes: "NITK Surathkal, IIIT Bangalore, RVCE, BMSCE, MSRIT, MIT Manipal",
    avgFee: "₹4L - ₹18L",
    avgPlacement: "₹13.80 LPA",
    topExams: ["JEE Main", "KCET", "COMEDK", "MET"]
  },
  {
    name: "Maharashtra",
    badge: "Automotive & Heavy Industry Hub",
    icon: "🏭",
    cities: "Mumbai, Pune, Nagpur",
    topInstitutes: "IIT Bombay, VNIT Nagpur, COEP Pune, VJTI Mumbai, ICT Mumbai, SPIT",
    avgFee: "₹3L - ₹10L",
    avgPlacement: "₹14.20 LPA",
    topExams: ["MHT CET", "JEE Advanced", "JEE Main"]
  },
  {
    name: "Telangana",
    badge: "AI & Software Powerhouse",
    icon: "🚀",
    cities: "Hyderabad, Warangal",
    topInstitutes: "IIIT Hyderabad, IIT Hyderabad, NIT Warangal, BITS Hyderabad, CBIT",
    avgFee: "₹5L - ₹20L",
    avgPlacement: "₹18.50 LPA",
    topExams: ["JEE Advanced", "JEE Main", "TS EAMCET", "BITSAT"]
  },
  {
    name: "Delhi NCR",
    badge: "Capital Tech & High Placement Hub",
    icon: "🏢",
    cities: "Delhi, Noida, Gurgaon",
    topInstitutes: "IIT Delhi, DTU Delhi, NSUT Delhi, IIIT Delhi, NIT Delhi",
    avgFee: "₹70K - ₹10L",
    avgPlacement: "₹17.80 LPA",
    topExams: ["JEE Advanced", "JEE Main (JAC Delhi)"]
  },
  {
    name: "Rajasthan",
    badge: "Pioneering Tech & AI Innovation",
    icon: "🏰",
    cities: "Pilani, Jaipur, Jodhpur",
    topInstitutes: "BITS Pilani, IIT Jodhpur, MNIT Jaipur, LNMIIT Jaipur",
    avgFee: "₹6L - ₹22L",
    avgPlacement: "₹15.80 LPA",
    topExams: ["BITSAT", "JEE Advanced", "JEE Main"]
  },
  {
    name: "Uttar Pradesh",
    badge: "Centenary Tech & Computing Legacy",
    icon: "🏛️",
    cities: "Kanpur, Varanasi, Prayagraj",
    topInstitutes: "IIT Kanpur, IIT BHU, MNNIT Allahabad, IIIT Allahabad, HBTU",
    avgFee: "₹4L - ₹10L",
    avgPlacement: "₹19.20 LPA",
    topExams: ["JEE Advanced", "JEE Main"]
  },
  {
    name: "West Bengal",
    badge: "Pioneer Research & Core Sciences",
    icon: "🌉",
    cities: "Kharagpur, Kolkata, Shibpur, Durgapur",
    topInstitutes: "IIT Kharagpur, Jadavpur Univ FET, IIEST Shibpur, NIT Durgapur",
    avgFee: "₹25K - ₹10L",
    avgPlacement: "₹15.50 LPA",
    topExams: ["WBJEE", "JEE Advanced", "JEE Main"]
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Streams");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedOwnership, setSelectedOwnership] = useState("All Types");
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [selectedFeeRange, setSelectedFeeRange] = useState("All Fees");
  const [selectedRanking, setSelectedRanking] = useState("All Rankings");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24);
  const [stateExplorerStream, setStateExplorerStream] = useState<'management' | 'engineering'>('management');
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [userScoreInput, setUserScoreInput] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [brochureCollege, setBrochureCollege] = useState<CollegeMetadata | null>(null);
  const [activeToolTab, setActiveToolTab] = useState<'mba' | 'btech' | 'bba'>('mba');

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

  const handleCompareNow = () => {
    const slugsStr = comparedColleges.map((c) => c.slug).join(",");
    router.push(`/colleges/compare?slugs=${slugsStr}`);
  };

  // Sync initial query params from URL
  useEffect(() => {
    if (!searchParams) return;
    const q = searchParams.get('search') || searchParams.get('q') || '';
    if (q) setSearchQuery(q);

    const loc = (searchParams.get('location') || '').toLowerCase().trim();
    const st = searchParams.get('state');
    const ct = searchParams.get('city');

    if (st) {
      setSelectedState(st);
    } else if (loc) {
      if (loc.includes('delhi') || loc.includes('ncr') || loc.includes('noida') || loc.includes('gurgaon')) {
        setSelectedState('Delhi NCR');
      } else if (loc.includes('pune')) {
        setSelectedState('Maharashtra');
        setSelectedCity('Pune');
      } else if (loc.includes('mumbai')) {
        setSelectedState('Maharashtra');
        setSelectedCity('Mumbai');
      } else if (loc.includes('bangalore') || loc.includes('bengaluru') || loc.includes('karnataka')) {
        setSelectedState('Karnataka');
        setSelectedCity('Bangalore');
      } else if (loc.includes('hyderabad') || loc.includes('telangana')) {
        setSelectedState('Telangana');
        setSelectedCity('Hyderabad');
      } else if (loc.includes('chennai') || loc.includes('tamil')) {
        setSelectedState('Tamil Nadu');
        setSelectedCity('Chennai');
      } else if (loc.includes('jaipur') || loc.includes('rajasthan')) {
        setSelectedState('Rajasthan');
        setSelectedCity('Jaipur');
      } else if (loc.includes('kolkata') || loc.includes('bengal')) {
        setSelectedState('West Bengal');
        setSelectedCity('Kolkata');
      } else if (loc.includes('ahmedabad') || loc.includes('gujarat')) {
        setSelectedState('Gujarat');
        setSelectedCity('Ahmedabad');
      }
    }

    if (ct) setSelectedCity(ct);

    const cat = searchParams.get('category') || searchParams.get('stream');
    if (cat) {
      const cleanCat = cat.toLowerCase();
      if (cleanCat.includes('manage') || cleanCat === 'mba' || cleanCat === 'pgdm') setSelectedCategory('Management');
      else if (cleanCat.includes('eng') || cleanCat === 'btech' || cleanCat === 'b.tech') setSelectedCategory('Engineering');
      else if (cleanCat.includes('ug') || cleanCat === 'bba' || cleanCat === 'bca') setSelectedCategory('UG Courses');
    }

    const crs = searchParams.get('course');
    if (crs) {
      const cleanCrs = crs.toLowerCase().replace(/[\s\.\-_]/g, '');
      if (cleanCrs === 'btech') setSelectedCourse('B.Tech');
      else if (cleanCrs === 'mtech') setSelectedCourse('M.Tech');
      else if (cleanCrs === 'mba') setSelectedCourse('MBA');
      else if (cleanCrs === 'pgdm') setSelectedCourse('PGDM');
      else if (cleanCrs === 'bba') setSelectedCourse('BBA');
      else if (cleanCrs === 'bca') setSelectedCourse('BCA');
      else if (cleanCrs === 'bcom') setSelectedCourse('BCom');
      else setSelectedCourse(crs);
    }

    const bdg = searchParams.get('budget') || searchParams.get('fee');
    if (bdg) {
      const cleanBdg = bdg.toLowerCase();
      if (cleanBdg.includes('under-10l') || cleanBdg.includes('under-10') || cleanBdg.includes('roi')) {
        setSelectedFeeRange('5-10 Lakhs');
      } else if (cleanBdg.includes('under-5l') || cleanBdg.includes('under-1l')) {
        setSelectedFeeRange('1-5 Lakhs');
      } else if (cleanBdg.includes('10l-16l') || cleanBdg.includes('10-20') || cleanBdg.includes('10l-20l')) {
        setSelectedFeeRange('10-20 Lakhs');
      } else if (cleanBdg.includes('16l-25l') || cleanBdg.includes('above-25l') || cleanBdg.includes('> 20')) {
        setSelectedFeeRange('> 20 Lakhs');
      } else {
        setSelectedFeeRange(bdg);
      }
    }

    const exm = searchParams.get('exam');
    if (exm) {
      const cleanExm = exm.toLowerCase().replace(/[\s\.\-_]/g, '');
      if (cleanExm.includes('jeemain') || cleanExm === 'jee') setSelectedExam('JEE Main');
      else if (cleanExm === 'cat') setSelectedExam('CAT');
      else if (cleanExm === 'xat') setSelectedExam('XAT');
      else if (cleanExm === 'cmat') setSelectedExam('CMAT');
      else if (cleanExm === 'mat') setSelectedExam('MAT');
      else if (cleanExm === 'snap') setSelectedExam('SNAP');
      else if (cleanExm === 'nmat') setSelectedExam('NMAT');
      else if (cleanExm.includes('direct')) setSelectedExam('Direct Admission');
      else setSelectedExam(exm);
    }

    const srt = searchParams.get('sort');
    if (srt) setSortBy(srt);
  }, [searchParams]);

  // Sync state changes to URL for shareability
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (selectedCategory !== 'All Streams') params.set('category', selectedCategory);
    if (selectedCourse !== 'All Courses') params.set('course', selectedCourse);
    if (selectedState !== 'All States') params.set('state', selectedState);
    if (selectedCity !== 'All Cities') params.set('city', selectedCity);
    if (sortBy !== 'default') params.set('sort', sortBy);

    const queryStr = params.toString();
    const newUrl = queryStr ? `${pathname}?${queryStr}` : pathname;
    if (typeof window !== 'undefined' && window.location.search !== (queryStr ? `?${queryStr}` : '')) {
      window.history.replaceState(null, '', newUrl);
    }
  }, [searchQuery, selectedCategory, selectedCourse, selectedState, selectedCity, sortBy, pathname]);

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

  // Specialization options
  const specializationMap: Record<string, string[]> = {
    Management: [
      "All Specializations", "Marketing", "Finance", "Human Resource (HRM)", "Operations & Supply Chain",
      "Business Analytics", "Digital Marketing", "International Business", "IT & Systems", "Entrepreneurship",
      "FinTech", "Healthcare Management", "Agri-Business", "Rural Management", "Banking & BFSI",
    ],
    Engineering: [
      "All Specializations", "Computer Science (CSE)", "AI & Machine Learning", "Data Science", "Electronics (ECE)",
      "CyberSecurity", "Information Technology (IT)", "Mechanical Engineering", "Civil Engineering", "Robotics & Automation",
      "Electrical (EEE)", "Biotechnology", "Cloud Computing", "VLSI Design", "Aerospace",
    ],
    "UG Courses": [
      "All Specializations", "BBA - HR / Finance", "BCA - IT / Software", "B.Com - Accounts", "B.Sc - Science / CS",
      "B.A - Humanities", "B.Pharm", "Integrated Law", "Hotel Management",
    ],
  };

  const specializationKeywords: Record<string, string[]> = {
    Marketing: ["marketing"], Finance: ["finance", "financial"], "Human Resource (HRM)": ["hr", "human resource", "hrm"],
    "Operations & Supply Chain": ["operations", "supply chain", "logistics"], "Business Analytics": ["analytics", "data science"],
    "Digital Marketing": ["digital marketing", "e-commerce"], "International Business": ["international business", "ib"],
    "IT & Systems": ["it", "systems", "information technology"], Entrepreneurship: ["entrepreneurship", "startup", "family business"],
    FinTech: ["fintech", "financial technology"], "Healthcare Management": ["health", "hospital"], "Agri-Business": ["agri", "agriculture"],
    "Rural Management": ["rural"], "Banking & BFSI": ["banking", "bfsi", "financial services"],
    "Computer Science (CSE)": ["computer science", "cse", "computer engineering"], "AI & Machine Learning": ["aiml", "ai", "artificial intelligence", "machine learning"],
    "Data Science": ["data science", "analytics"], "Electronics (ECE)": ["ece", "electronics", "communication"],
    CyberSecurity: ["cyber", "security", "forensics"], "Information Technology (IT)": [" it", "information technology"],
    "Mechanical Engineering": ["mechanical", "me"], "Civil Engineering": ["civil"], "Robotics & Automation": ["robotics", "automation", "mechatronics"],
    "Electrical (EEE)": ["electrical", "eee", "power"], Biotechnology: ["biotechnology", "bio"], "Cloud Computing": ["cloud", "devops"],
    "VLSI Design": ["vlsi", "embedded"], Aerospace: ["aerospace", "aeronautical"],
    "BBA - HR / Finance": ["bba", "management"], "BCA - IT / Software": ["bca", "computer application"],
    "B.Com - Accounts": ["b.com", "commerce", "accounting"], "B.Sc - Science / CS": ["b.sc", "science"],
    "B.A - Humanities": ["b.a", "arts", "humanities"], "B.Pharm": ["pharm"], "Integrated Law": ["law", "llb"],
    "Hotel Management": ["hotel", "hospitality", "bhm"],
  };

  const specializationOptions = specializationMap[selectedCategory] ?? null;

  // Pan-India city & district mapping
  const locationMap = useMemo(() => {
    const cityMap: Record<string, { state: string; city: string }> = {
      "chennai": { state: "Tamil Nadu", city: "Chennai" },
      "coimbatore": { state: "Tamil Nadu", city: "Coimbatore" },
      "trichy": { state: "Tamil Nadu", city: "Trichy" },
      "madurai": { state: "Tamil Nadu", city: "Madurai" },
      "vellore": { state: "Tamil Nadu", city: "Vellore" },
      "hyderabad": { state: "Telangana", city: "Hyderabad" },
      "secunderabad": { state: "Telangana", city: "Secunderabad" },
      "warangal": { state: "Telangana", city: "Warangal" },
      "visakhapatnam": { state: "Andhra Pradesh", city: "Visakhapatnam" },
      "vijayawada": { state: "Andhra Pradesh", city: "Vijayawada" },
      "tirupati": { state: "Andhra Pradesh", city: "Tirupati" },
      "sri city": { state: "Andhra Pradesh", city: "Sri City" },
      "kochi": { state: "Kerala", city: "Kochi" },
      "ernakulam": { state: "Kerala", city: "Kochi" },
      "kozhikode": { state: "Kerala", city: "Kozhikode" },
      "calicut": { state: "Kerala", city: "Kozhikode" },
      "thiruvananthapuram": { state: "Kerala", city: "Thiruvananthapuram" },
      "trivandrum": { state: "Kerala", city: "Thiruvananthapuram" },
      "indore": { state: "Madhya Pradesh", city: "Indore" },
      "bhopal": { state: "Madhya Pradesh", city: "Bhopal" },
      "gwalior": { state: "Madhya Pradesh", city: "Gwalior" },
      "bhubaneswar": { state: "Odisha", city: "Bhubaneswar" },
      "rourkela": { state: "Odisha", city: "Rourkela" },
      "patna": { state: "Bihar", city: "Patna" },
      "bodh gaya": { state: "Bihar", city: "Bodh Gaya" },
      "ranchi": { state: "Jharkhand", city: "Ranchi" },
      "jamshedpur": { state: "Jharkhand", city: "Jamshedpur" },
      "dhanbad": { state: "Jharkhand", city: "Dhanbad" },
      "goa": { state: "Goa", city: "Goa" },
      "panaji": { state: "Goa", city: "Panaji" },
      "sanquelim": { state: "Goa", city: "Sanquelim" },
      "shimla": { state: "Himachal Pradesh", city: "Shimla" },
      "solan": { state: "Himachal Pradesh", city: "Solan" },
      "mandi": { state: "Himachal Pradesh", city: "Mandi" },
      "guwahati": { state: "Assam & North East", city: "Guwahati" },
      "shillong": { state: "Assam & North East", city: "Shillong" },
      "raipur": { state: "Chhattisgarh", city: "Raipur" },
      "bhilai": { state: "Chhattisgarh", city: "Bhilai" },
      "jammu": { state: "Jammu & Kashmir", city: "Jammu" },
      "srinagar": { state: "Jammu & Kashmir", city: "Srinagar" },
      "chandigarh": { state: "Punjab & Chandigarh", city: "Chandigarh" },
      "mohali": { state: "Punjab & Chandigarh", city: "Mohali" },
      "amritsar": { state: "Punjab & Chandigarh", city: "Amritsar" },
      "jalandhar": { state: "Punjab & Chandigarh", city: "Jalandhar" },
      "patiala": { state: "Punjab & Chandigarh", city: "Patiala" },
      "gurgaon": { state: "Delhi NCR", city: "Gurgaon" },
      "gurugram": { state: "Delhi NCR", city: "Gurgaon" },
      "noida": { state: "Delhi NCR", city: "Noida" },
      "greater noida": { state: "Delhi NCR", city: "Greater Noida" },
      "ghaziabad": { state: "Delhi NCR", city: "Ghaziabad" },
      "faridabad": { state: "Delhi NCR", city: "Faridabad" },
      "delhi": { state: "Delhi NCR", city: "Delhi" },
      "bangalore": { state: "Karnataka", city: "Bangalore" },
      "bengaluru": { state: "Karnataka", city: "Bangalore" },
      "manipal": { state: "Karnataka", city: "Manipal" },
      "mangalore": { state: "Karnataka", city: "Mangalore" },
      "mysore": { state: "Karnataka", city: "Mysore" },
      "mumbai": { state: "Maharashtra", city: "Mumbai" },
      "pune": { state: "Maharashtra", city: "Pune" },
      "nagpur": { state: "Maharashtra", city: "Nagpur" },
      "nashik": { state: "Maharashtra", city: "Nashik" },
      "aurangabad": { state: "Maharashtra", city: "Aurangabad" },
      "ahmedabad": { state: "Gujarat", city: "Ahmedabad" },
      "gandhinagar": { state: "Gujarat", city: "Gandhinagar" },
      "anand": { state: "Gujarat", city: "Anand" },
      "vadodara": { state: "Gujarat", city: "Vadodara" },
      "surat": { state: "Gujarat", city: "Surat" },
      "jaipur": { state: "Rajasthan", city: "Jaipur" },
      "udaipur": { state: "Rajasthan", city: "Udaipur" },
      "jodhpur": { state: "Rajasthan", city: "Jodhpur" },
      "pilani": { state: "Rajasthan", city: "Pilani" },
      "kolkata": { state: "West Bengal", city: "Kolkata" },
      "kharagpur": { state: "West Bengal", city: "Kharagpur" },
      "dehradun": { state: "Uttarakhand", city: "Dehradun" },
      "roorkee": { state: "Uttarakhand", city: "Roorkee" },
      "lucknow": { state: "Uttar Pradesh", city: "Lucknow" },
      "kanpur": { state: "Uttar Pradesh", city: "Kanpur" },
      "varanasi": { state: "Uttar Pradesh", city: "Varanasi" },
      "prayagraj": { state: "Uttar Pradesh", city: "Prayagraj" },
      "agra": { state: "Uttar Pradesh", city: "Agra" },
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
        if (name.includes("delhi") || name.includes("ncr") || name.includes("ggsipu") || name.includes("vips") || name.includes("jims") || (name.includes("iitm") && !name.includes("madras"))) {
          state = "Delhi NCR"; city = "Delhi";
        } else if (name.includes("bangalore") || name.includes("bengaluru") || name.includes("christ") || name.includes("rv") || name.includes("bms") || name.includes("ramaiah")) {
          state = "Karnataka"; city = "Bangalore";
        } else if (name.includes("mumbai") || name.includes("pune") || name.includes("d y patil") || name.includes("dy patil") || name.includes("symbiosis") || name.includes("mit-wpu")) {
          state = "Maharashtra"; city = name.includes("mumbai") ? "Mumbai" : "Pune";
        } else if (name.includes("chennai") || name.includes("karunya") || name.includes("mgr") || name.includes("srm") || name.includes("vit")) {
          state = "Tamil Nadu"; city = "Chennai";
        } else if (name.includes("hyderabad") || name.includes("cvr") || name.includes("telangana")) {
          state = "Telangana"; city = "Hyderabad";
        } else if (name.includes("gla university") || name.includes("bajaj") || name.includes("greater noida") || name.includes("ghaziabad")) {
          state = "Delhi NCR"; city = "Greater Noida";
        } else if (name.includes("kolkata") || name.includes("calcutta")) {
          state = "West Bengal"; city = "Kolkata";
        } else if (name.includes("jaipur")) {
          state = "Rajasthan"; city = "Jaipur";
        } else if (name.includes("dehradun") || name.includes("roorkee")) {
          state = "Uttarakhand"; city = "Dehradun";
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

  const streamTabs = [
    { id: "All Streams", label: "All Campuses", icon: "🌐", count: colleges.length },
    { id: "Management", label: "MBA & PGDM", icon: "🎓", count: colleges.filter(c => c.category === "Management").length },
    { id: "Engineering", label: "B.Tech & M.Tech", icon: "⚡", count: colleges.filter(c => c.category === "Engineering").length },
    { id: "UG Courses", label: "BBA / BCA / UG", icon: "📖", count: colleges.filter(c => c.category === "UG Courses").length },
  ];

  const managementCourses = ["All Courses", "MBA", "PGDM"];
  const engineeringCourses = ["All Courses", "B.Tech", "M.Tech"];
  const ugCourses = ["All Courses", "BCom", "BBA", "BCA", "BSc", "B.Pharma", "BA", "BA LLB"];
  
  const allPossibleCourses = useMemo(() => {
    const courses = new Set<string>();
    colleges.forEach(c => c.courses.forEach(course => courses.add(course)));
    return ["All Courses", ...Array.from(courses)].sort();
  }, [colleges]);

  const courseOptionsForCategory =
    selectedCategory === "Management" ? managementCourses
    : selectedCategory === "Engineering" ? engineeringCourses
    : selectedCategory === "UG Courses" ? ugCourses
    : allPossibleCourses;

  const allPossibleExams = useMemo(() => {
    const exams = new Set<string>();
    const source = selectedCategory === "All Streams" ? colleges : colleges.filter(c => c.category === selectedCategory);
    source.forEach(c => (c.exams || []).forEach(exam => exams.add(exam)));
    return ["All Exams", ...Array.from(exams)].sort();
  }, [colleges, selectedCategory]);

  const feeRanges = ["All Fees", "< 1 Lakh", "1-5 Lakhs", "5-10 Lakhs", "10-20 Lakhs", "> 20 Lakhs"];
  const rankingOptions = ["All Rankings", "Top 10", "Top 50", "Top 100"];

  const states = useMemo(() => {
    const allStates = new Set(Object.values(locationMap).map(l => l.state));
    return ["All States", ...Array.from(allStates)].sort();
  }, [locationMap]);

  const cities = useMemo(() => {
    let relevantLocations = Object.values(locationMap);
    if (selectedState !== "All States") {
      relevantLocations = relevantLocations.filter(l => l.state === selectedState);
    }
    const filteredCities = new Set(relevantLocations.map(l => l.city));
    return ["All Cities", ...Array.from(filteredCities)].sort();
  }, [locationMap, selectedState]);

  const ownershipTypes = ["All Types", "Public", "Private"];

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    return getSearchSuggestions(searchQuery, colleges, locationMap, 6);
  }, [searchQuery, colleges, locationMap]);

  // Scored & filtered colleges
  const filteredCollegesWithScore = useMemo(() => {
    const cleanQuery = searchQuery.trim();
    
    let baseList: { college: CollegeMetadata; score: number }[] = [];
    if (cleanQuery) {
      baseList = searchColleges(colleges, cleanQuery, locationMap);
    } else {
      baseList = colleges.map(c => ({ college: c, score: 0 }));
    }

    return baseList.filter(({ college }) => {
      const locInfo = locationMap[college.slug] || { state: "Other", city: "Other" };

      const matchesCategory = selectedCategory === "All Streams" || college.category === selectedCategory;

      const matchesCourse = selectedCourse === "All Courses" ||
        college.courses.some(c => {
          const cleanCollegeCourse = c.replace(/[\s\.\-_]/g, '').toLowerCase();
          const cleanSelected = selectedCourse.replace(/[\s\.\-_]/g, '').toLowerCase();
          return cleanCollegeCourse.includes(cleanSelected) || cleanSelected.includes(cleanCollegeCourse) || c.toLowerCase().includes(selectedCourse.toLowerCase());
        });

      let matchesSpecialization = true;
      if (selectedSpecialization !== "All Specializations") {
        const keywords = specializationKeywords[selectedSpecialization] ?? [];
        if (selectedCategory === "Engineering") {
          matchesSpecialization = college.courses.some(c => keywords.some(kw => c.toLowerCase().includes(kw)));
        } else {
          matchesSpecialization = keywords.some(kw =>
            college.name.toLowerCase().includes(kw) || college.courses.some(c => c.toLowerCase().includes(kw))
          ) || true;
        }
      }

      const matchesState = selectedState === "All States" || locInfo.state === selectedState;
      const matchesCity = selectedCity === "All Cities" || locInfo.city === selectedCity;
      const matchesOwnership = selectedOwnership === "All Types" || college.ownership.toLowerCase().includes(selectedOwnership.toLowerCase());
      const matchesExam = selectedExam === "All Exams" || (college.exams || []).some(e => {
        const cleanCollegeExam = e.replace(/[\s\.\-_]/g, '').toLowerCase();
        const cleanSelected = selectedExam.replace(/[\s\.\-_]/g, '').toLowerCase();
        return cleanCollegeExam.includes(cleanSelected) || cleanSelected.includes(cleanCollegeExam) || e.toLowerCase() === selectedExam.toLowerCase();
      });

      let matchesFee = true;
      if (selectedFeeRange !== "All Fees") {
        const feeStr = college.fees.replace(/[₹,]/g, '').toLowerCase();
        let feeNum = parseFloat(feeStr);
        if (feeStr.includes('lakh')) feeNum *= 100000;
        
        if (selectedFeeRange === "< 1 Lakh") matchesFee = feeNum < 100000;
        else if (selectedFeeRange === "1-5 Lakhs") matchesFee = feeNum >= 100000 && feeNum <= 500000;
        else if (selectedFeeRange === "5-10 Lakhs") matchesFee = feeNum > 500000 && feeNum <= 1000000;
        else if (selectedFeeRange === "10-20 Lakhs") matchesFee = feeNum > 1000000 && feeNum <= 2000000;
        else if (selectedFeeRange === "> 20 Lakhs") matchesFee = feeNum > 2000000;
      }

      let matchesRanking = true;
      if (selectedRanking !== "All Rankings") {
        const rankMatch = college.ranking.match(/#(\d+)/);
        if (rankMatch) {
          const rankNum = parseInt(rankMatch[1]);
          if (selectedRanking === "Top 10") matchesRanking = rankNum <= 10;
          else if (selectedRanking === "Top 50") matchesRanking = rankNum <= 50;
          else if (selectedRanking === "Top 100") matchesRanking = rankNum <= 100;
        } else {
          matchesRanking = false;
        }
      }

      return matchesCategory && matchesCourse && matchesSpecialization && matchesState && matchesCity && matchesOwnership && matchesExam && matchesFee && matchesRanking;
    });
  }, [searchQuery, selectedCategory, selectedCourse, selectedSpecialization, selectedState, selectedCity, selectedOwnership, selectedExam, selectedFeeRange, selectedRanking, colleges, locationMap]);

  const filteredColleges = useMemo(() => {
    return filteredCollegesWithScore.map(item => item.college);
  }, [filteredCollegesWithScore]);

  useEffect(() => {
    setVisibleCount(24);
  }, [searchQuery, selectedCategory, selectedCourse, selectedSpecialization, selectedState, selectedCity, selectedOwnership, selectedExam, selectedFeeRange, selectedRanking, sortBy]);

  const sortedColleges = useMemo(() => {
    const parseLakhs = (str?: string): number => {
      if (!str) return 0;
      const match = str.match(/([0-9]+(\.[0-9]+)?)/);
      return match ? parseFloat(match[1]) : 0;
    };
    const getRank = (c: CollegeMetadata) => {
      const m = c.ranking.match(/#(\d+)/);
      return m ? parseInt(m[1]) : 999;
    };

    const list = [...filteredCollegesWithScore];

    list.sort((a, b) => {
      if (sortBy === "roi") {
        const roiA = parseLakhs(a.college.avg_placement) / (parseLakhs(a.college.fees) || 1);
        const roiB = parseLakhs(b.college.avg_placement) / (parseLakhs(b.college.fees) || 1);
        return roiB - roiA;
      }
      if (sortBy === "avg_placement") {
        return parseLakhs(b.college.avg_placement) - parseLakhs(a.college.avg_placement);
      }
      if (sortBy === "highest_placement") {
        return parseLakhs(b.college.highest_placement) - parseLakhs(a.college.highest_placement);
      }
      if (sortBy === "fees_low") {
        return parseLakhs(a.college.fees) - parseLakhs(b.college.fees);
      }
      if (sortBy === "ranking") {
        return getRank(a.college) - getRank(b.college);
      }
      if (searchQuery.trim()) {
        return b.score - a.score;
      }
      return 0;
    });

    return list.map(item => item.college);
  }, [filteredCollegesWithScore, sortBy, searchQuery]);

  const visibleColleges = sortedColleges.slice(0, visibleCount);

  const resetFilters = () => {
    setSelectedCategory("All Streams");
    setSelectedCourse("All Courses");
    setSelectedSpecialization("All Specializations");
    setSelectedState("All States");
    setSelectedCity("All Cities");
    setSelectedOwnership("All Types");
    setSelectedExam("All Exams");
    setSelectedFeeRange("All Fees");
    setSelectedRanking("All Rankings");
    setSearchQuery("");
    setUserScore(0);
    setUserScoreInput("");
  };

  const handleSelectState = (stateName: string, categoryPreference?: "Management" | "Engineering") => {
    setSelectedState(stateName);
    setSelectedCity("All Cities");
    if (categoryPreference) {
      setSelectedCategory(categoryPreference);
    }
    const el = document.getElementById("college-listings-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const activeFiltersCount = [
    selectedCategory !== "All Streams",
    selectedCourse !== "All Courses",
    selectedSpecialization !== "All Specializations",
    selectedState !== "All States",
    selectedCity !== "All Cities",
    selectedOwnership !== "All Types",
    selectedExam !== "All Exams",
    selectedFeeRange !== "All Fees",
    selectedRanking !== "All Rankings",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* 1. MASTER HERO & SEARCH HUB */}
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 bg-gradient-to-b from-[#071326] via-[#0B203E] to-[#0F2D54] text-white border-b border-slate-800/80 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-blue-500/15 blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-200 text-xs font-bold tracking-wide backdrop-blur-md shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Pan-India College Search Portal 2027 • 770+ Verified Campuses</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto space-y-3 mb-8">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Find Your Dream College.{' '}
              <span className="block mt-1 bg-gradient-to-r from-blue-300 via-sky-200 to-amber-300 bg-clip-text text-transparent">
                Verified Fees, Cutoffs &amp; Placement Audits.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore 770+ top MBA, PGDM, B.Tech &amp; UG institutions across all Indian states. Compare ROI metrics, check entrance cutoffs, and get direct 1-on-1 counseling.
            </p>
          </div>

          {/* Master Search Input Bar */}
          <div className="max-w-3xl mx-auto mb-6">
            <div ref={searchContainerRef} className="relative">
              <div className="flex items-center bg-white rounded-2xl shadow-2xl p-2 border border-slate-200 focus-within:ring-4 focus-within:ring-blue-400/30 transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by college name (e.g. IIM Bangalore, NDIM, FMS, DTU, SIBM), city, or exam..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsSearchFocused(false);
                      const el = document.getElementById("college-listings-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                    if (e.key === "Escape") {
                      setIsSearchFocused(false);
                    }
                  }}
                  className="w-full px-3 py-2 text-slate-900 placeholder:text-slate-400 font-semibold text-xs sm:text-sm bg-transparent focus:outline-none"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchFocused(false);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full mr-2 transition-colors cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsSearchFocused(false);
                    const el = document.getElementById("college-listings-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-600/25 shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Autocomplete Dropdown */}
              {isSearchFocused && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden text-slate-900 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
                  {searchQuery.trim().length > 0 ? (
                    <>
                      <div className="p-3">
                        <div className="flex items-center justify-between px-3 py-1 text-[11px] font-black uppercase tracking-wider text-slate-400">
                          <span>Top College Matches ({searchSuggestions.colleges.length})</span>
                          <span className="text-blue-600 lowercase font-bold">{filteredColleges.length} results</span>
                        </div>

                        {searchSuggestions.colleges.length > 0 ? (
                          <div className="space-y-1 mt-1">
                            {searchSuggestions.colleges.map((col) => (
                              <Link
                                key={col.slug}
                                href={`/colleges/${col.slug}`}
                                onClick={() => setIsSearchFocused(false)}
                                prefetch={false}
                                className="group flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-blue-50/70 transition-all"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-black text-blue-600 shrink-0">
                                    {col.logo && !col.logo.includes("default") ? (
                                      <img src={col.logo} alt={`${col.name} logo`} width={36} height={36} className="w-full h-full object-contain p-1" />
                                    ) : (
                                      col.name.charAt(0)
                                    )}
                                  </div>
                                  <div className="truncate">
                                    <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                      {col.name}
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                      <span>{col.location}</span>
                                      <span>•</span>
                                      <span className="text-emerald-600 font-bold">Avg: {col.avg_placement}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 shrink-0">
                                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                                    {col.fees}
                                  </span>
                                  <span className="text-xs font-bold text-blue-600">&rarr;</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="py-4 text-center text-xs text-slate-500">
                            No direct name match. Press Enter to search all cutoffs and course matches.
                          </div>
                        )}
                      </div>

                      <div className="p-2.5 bg-slate-50 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setIsSearchFocused(false);
                            const el = document.getElementById("college-listings-section");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          View all {filteredColleges.length} results matching &ldquo;{searchQuery}&rdquo; &rarr;
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 space-y-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>🔥 Trending Shortlists &amp; Hubs</span>
                      </span>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {[
                          { label: "Top 20 IIMs in India", query: "IIM" },
                          { label: "Delhi NCR Top MBA & PGDM", state: "Delhi NCR", category: "Management" },
                          { label: "Pune Tier-1 B-Schools", state: "Maharashtra", city: "Pune", category: "Management" },
                          { label: "Bangalore Tech & B.Tech", state: "Karnataka", city: "Bangalore", category: "Engineering" },
                          { label: "High ROI MBA (< ₹10L Fees)", fee: "5-10 Lakhs", category: "Management" },
                          { label: "Colleges Accepting CAT 80-90%ile", query: "CAT" },
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (item.query) setSearchQuery(item.query);
                              if (item.state) setSelectedState(item.state);
                              if (item.city) setSelectedCity(item.city);
                              if (item.category) setSelectedCategory(item.category);
                              if (item.fee) setSelectedFeeRange(item.fee);
                              setIsSearchFocused(false);
                            }}
                            className="text-left p-2.5 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center justify-between text-xs font-bold text-slate-800 group"
                          >
                            <span>{item.label}</span>
                            <span className="text-slate-400 group-hover:text-blue-600">&rarr;</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Trending Chips */}
          <div className="flex flex-wrap justify-center items-center gap-2 max-w-3xl mx-auto">
            <span className="text-xs text-slate-300 font-bold mr-1">Popular:</span>
            {[
              { label: 'Top IIMs', onClick: () => setSearchQuery('IIM') },
              { label: 'Delhi NCR', onClick: () => { setSelectedState('Delhi NCR'); setSelectedCity('All Cities'); } },
              { label: 'Pune B-Schools', onClick: () => { setSelectedState('Maharashtra'); setSelectedCity('Pune'); } },
              { label: 'Bangalore Tech', onClick: () => { setSelectedState('Karnataka'); setSelectedCity('Bangalore'); } },
              { label: 'High ROI (< ₹10L)', onClick: () => setSelectedFeeRange('5-10 Lakhs') },
              { label: 'Highest Packages', onClick: () => setSortBy('avg_placement') },
            ].map((chip) => (
              <button
                key={chip.label}
                onClick={chip.onClick}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white text-xs font-semibold transition-all backdrop-blur-xs cursor-pointer active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 2. STREAM SWITCHER & AI CALL PREDICTOR BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-30 mb-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-4 sm:p-6 space-y-6">
          
          {/* Stream Switcher Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {streamTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedCategory(tab.id);
                    setSelectedCourse("All Courses");
                    setSelectedExam("All Exams");
                    setSelectedSpecialization("All Specializations");
                    if (tab.id === "Management") setStateExplorerStream("management");
                    if (tab.id === "Engineering") setStateExplorerStream("engineering");
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 ring-2 ring-blue-500/20"
                      : "bg-slate-50 hover:bg-slate-100/80 border-slate-200/80 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tab.icon}</span>
                    <div>
                      <div className={`text-xs sm:text-sm font-black leading-tight ${isActive ? 'text-white' : 'text-slate-900'}`}>
                        {tab.label}
                      </div>
                      <div className={`text-[11px] font-semibold mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                        {tab.count} Colleges
                      </div>
                    </div>
                  </div>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* AI Predictor & Quick State Pill Strip */}
          <div className="pt-4 border-t border-slate-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* AI Score Predictor */}
            <div className="flex items-center gap-3 bg-blue-50/60 border border-blue-200/70 p-3 sm:p-3.5 rounded-2xl flex-1">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                AI
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Admission Call Predictor</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">Live</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">
                  Enter your CAT / XAT / JEE %ile to evaluate admission chances
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="number"
                  placeholder="e.g. 85 (%ile)"
                  value={userScoreInput}
                  onChange={(e) => {
                    setUserScoreInput(e.target.value);
                    const val = parseFloat(e.target.value);
                    setUserScore(isNaN(val) ? 0 : val);
                  }}
                  className="w-24 sm:w-28 px-2.5 py-1.5 text-xs font-bold rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 bg-white"
                />
                {userScore > 0 && (
                  <button
                    onClick={() => {
                      setUserScoreInput("");
                      setUserScore(0);
                    }}
                    className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold border border-slate-200 cursor-pointer"
                    title="Clear predictor score"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick State Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
                <MapPin className="w-3 h-3 text-blue-600" /> States:
              </span>
              {["All States", "Delhi NCR", "Maharashtra", "Karnataka", "Tamil Nadu", "Telangana", "Gujarat", "West Bengal"].map((st) => {
                const isActive = selectedState === st;
                return (
                  <button
                    key={st}
                    onClick={() => {
                      setSelectedState(st);
                      setSelectedCity("All Cities");
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {st}
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      {/* 3. MAIN EXPLORER AREA (SIDEBAR + LISTINGS) */}
      <div id="college-listings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Active Filter Pills Bar */}
        {(activeFiltersCount > 0 || searchQuery.trim() || userScore > 0) && (
          <div className="mb-6 p-3 sm:p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-blue-600" /> Active Filters:
            </span>

            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                <span>Keyword: &ldquo;{searchQuery}&rdquo;</span>
                <button type="button" onClick={() => setSearchQuery("")} className="hover:text-blue-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategory !== "All Streams" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                <span>Stream: {selectedCategory}</span>
                <button type="button" onClick={() => setSelectedCategory("All Streams")} className="hover:text-rose-600 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCourse !== "All Courses" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                <span>Course: {selectedCourse}</span>
                <button type="button" onClick={() => setSelectedCourse("All Courses")} className="hover:text-rose-600 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedState !== "All States" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                <span>State: {selectedState}</span>
                <button type="button" onClick={() => { setSelectedState("All States"); setSelectedCity("All Cities"); }} className="hover:text-rose-600 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCity !== "All Cities" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                <span>City: {selectedCity}</span>
                <button type="button" onClick={() => setSelectedCity("All Cities")} className="hover:text-rose-600 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedFeeRange !== "All Fees" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                <span>Fee: {selectedFeeRange}</span>
                <button type="button" onClick={() => setSelectedFeeRange("All Fees")} className="hover:text-rose-600 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedExam !== "All Exams" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                <span>Exam: {selectedExam}</span>
                <button type="button" onClick={() => setSelectedExam("All Exams")} className="hover:text-rose-600 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {userScore > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <span>Predictor: {userScore}%ile</span>
                <button type="button" onClick={() => { setUserScore(0); setUserScoreInput(""); }} className="hover:text-rose-600 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-black text-rose-600 hover:text-rose-800 ml-auto px-2 py-1 cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* A. LEFT FILTER SIDEBAR */}
          <aside className={`lg:w-1/4 w-full shrink-0 ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar space-y-6 shadow-xs">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  <span>Filters</span>
                </h3>
                {activeFiltersCount > 0 && (
                  <button onClick={resetFilters} className="text-xs font-bold text-rose-600 hover:underline cursor-pointer">
                    Clear ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Filter Controls */}
              <div className="space-y-4">
                
                {/* Course Filter */}
                <FilterBlock label="Course / Degree" icon={<GraduationCap className="w-3.5 h-3.5 text-blue-600" />}>
                  <select 
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e.target.value);
                      setSelectedSpecialization("All Specializations");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800 font-bold text-xs cursor-pointer"
                  >
                    {courseOptionsForCategory.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FilterBlock>

                {/* Specialization Filter */}
                {specializationOptions && specializationOptions.length > 1 && (
                  <FilterBlock label="Specialization" icon={<Briefcase className="w-3.5 h-3.5 text-indigo-600" />}>
                    <select
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800 font-bold text-xs cursor-pointer"
                    >
                      {specializationOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </FilterBlock>
                )}

                {/* State Filter */}
                <FilterBlock label="State" icon={<MapPin className="w-3.5 h-3.5 text-emerald-600" />}>
                  <select 
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity("All Cities");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800 font-bold text-xs cursor-pointer"
                  >
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </FilterBlock>

                {/* City Filter */}
                <FilterBlock label="City" icon={<MapPin className="w-3.5 h-3.5 text-cyan-600" />}>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={selectedState === "All States" && cities.length <= 1}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800 font-bold text-xs disabled:opacity-50 cursor-pointer"
                  >
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </FilterBlock>

                {/* Fee Range Filter */}
                <FilterBlock label="Fee Budget" icon={<IndianRupee className="w-3.5 h-3.5 text-amber-600" />}>
                  <select 
                    value={selectedFeeRange}
                    onChange={(e) => setSelectedFeeRange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800 font-bold text-xs cursor-pointer"
                  >
                    {feeRanges.map(range => <option key={range} value={range}>{range}</option>)}
                  </select>
                </FilterBlock>

                {/* Exam Filter */}
                <FilterBlock label="Accepted Entrance Exam" icon={<Sparkles className="w-3.5 h-3.5 text-purple-600" />}>
                  <select 
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800 font-bold text-xs cursor-pointer"
                  >
                    {allPossibleExams.map(exam => <option key={exam} value={exam}>{exam}</option>)}
                  </select>
                </FilterBlock>

                {/* Ownership Filter */}
                <FilterBlock label="Institute Ownership" icon={<Building2 className="w-3.5 h-3.5 text-slate-600" />}>
                  <select 
                    value={selectedOwnership}
                    onChange={(e) => setSelectedOwnership(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800 font-bold text-xs cursor-pointer"
                  >
                    {ownershipTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </FilterBlock>

                {/* NIRF Ranking */}
                <FilterBlock label="NIRF Ranking" icon={<Award className="w-3.5 h-3.5 text-blue-600" />}>
                  <select 
                    value={selectedRanking}
                    onChange={(e) => setSelectedRanking(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800 font-bold text-xs cursor-pointer"
                  >
                    {rankingOptions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </FilterBlock>

              </div>

            </div>
          </aside>

          {/* B. RIGHT LISTINGS & TOOLS */}
          <main className="w-full lg:w-3/4 flex-1">
            
            {/* Header Controls Bar */}
            <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>Colleges Directory</span>
                  <span className="text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-black">
                    {filteredColleges.length} Found
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing verified institutions with 2025-26 placement audits and 2027 fee reports
                </p>
              </div>

              {/* View mode toggle & Sort Dropdown */}
              <div className="flex items-center gap-2.5">
                
                {/* View Switcher Toggle */}
                <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === "grid" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === "list" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="Compact List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer shadow-2xs"
                >
                  <option value="default">{searchQuery.trim() ? "Relevance (Default)" : "Recommended (Default)"}</option>
                  <option value="roi">🔥 Highest ROI (Placement / Fee Ratio)</option>
                  <option value="avg_placement">Avg Placement (High to Low)</option>
                  <option value="highest_placement">Highest Package (High to Low)</option>
                  <option value="fees_low">Lowest Course Fees</option>
                  <option value="ranking">Top NIRF Ranking</option>
                </select>

                {/* Mobile Filters Trigger */}
                <button 
                  onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                  className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer shadow-2xs"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
                </button>
              </div>
            </div>

            {/* Listings Grid or List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {visibleColleges.map((college) => (
                  <CollegeCard 
                    key={college.slug} 
                    college={college} 
                    onCompareToggle={handleCompareToggle}
                    isCompared={comparedColleges.some((c) => c.slug === college.slug)}
                    onDownloadBrochure={(c) => setBrochureCollege(c)}
                    userScore={userScore}
                    viewMode="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3 mb-8">
                {visibleColleges.map((college) => (
                  <CollegeCard 
                    key={college.slug} 
                    college={college} 
                    onCompareToggle={handleCompareToggle}
                    isCompared={comparedColleges.some((c) => c.slug === college.slug)}
                    onDownloadBrochure={(c) => setBrochureCollege(c)}
                    userScore={userScore}
                    viewMode="list"
                  />
                ))}
              </div>
            )}

            {/* Empty State Recovery */}
            {filteredColleges.length === 0 && (
              <div className="py-16 px-6 text-center bg-white rounded-3xl border border-slate-200/90 shadow-xs max-w-2xl mx-auto space-y-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto border border-blue-100">
                  <Search className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-1">No colleges match your active search criteria</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                    We couldn&apos;t find any colleges matching your criteria. Try adjusting your filters or resetting the search.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                  >
                    Clear Search Keyword
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedState("All States"); setSelectedCity("All Cities"); }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                  >
                    Search All States
                  </button>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}

            {/* Load More Button */}
            {visibleCount < filteredColleges.length && (
              <div className="flex justify-center mt-10">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 24)}
                  className="px-8 py-3.5 bg-white border border-slate-200 hover:border-blue-400 text-slate-800 hover:text-blue-600 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  Load More Colleges ({filteredColleges.length - visibleCount} remaining)
                </button>
              </div>
            )}

            {/* Instant Shortlist Generators */}
            <div className="mt-16 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 shadow-xs">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                  Instant Shortlisting Engine
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Smart College Shortlist Generators
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Generate an AI-curated college shortlist based on your budget, percentile, and career preferences.
                </p>
              </div>

              <div className="flex gap-2 border-b border-slate-100 pb-3 mb-6 overflow-x-auto no-scrollbar">
                {[
                  { id: 'mba', label: '🎓 MBA / PGDM Predictor' },
                  { id: 'btech', label: '⚡ B.Tech Shortlister' },
                  { id: 'bba', label: '📖 BBA & BCA Shortlister' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveToolTab(t.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeToolTab === t.id ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {activeToolTab === 'mba' && <MBACollegeGenerator />}
              {activeToolTab === 'btech' && <BTechCollegeGenerator />}
              {activeToolTab === 'bba' && <BBACollegeGenerator />}
            </div>

            {/* Trending Blogs */}
            {trendingBlogs && trendingBlogs.length > 0 && (
              <div className="mt-16 border-t border-slate-200/80 pt-10">
                <div className="flex items-center gap-2 mb-6 text-blue-600">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-black uppercase tracking-wider">Top Admission Insights &amp; Cutoff Guides</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trendingBlogs.slice(0, 4).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      prefetch={false}
                      className="group block bg-white border border-slate-200/90 rounded-2xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <span className="text-[10px] font-bold text-blue-600 block mb-1">
                        {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Compare Floating Drawer */}
      <CompareDrawer
        selectedColleges={comparedColleges}
        onRemove={handleCompareToggle}
        onClearAll={handleClearAllCompare}
        onCompare={handleCompareNow}
      />

      {/* Brochure Download Modal */}
      <BrochureModal
        isOpen={!!brochureCollege}
        onClose={() => setBrochureCollege(null)}
        collegeName={brochureCollege?.name || ""}
        collegeSlug={brochureCollege?.slug || ""}
        brochureUrl={brochureCollege?.brochure_url}
        feesText={brochureCollege?.fees}
      />
    </div>
  );
}

function FilterBlock({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 ml-1">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
