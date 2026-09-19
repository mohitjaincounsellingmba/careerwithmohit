"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from "next/link";
import { CollegeMetadata } from "@/lib/colleges";
import { CollegeCard } from "@/components/CollegeCard";
import { BTechCollegeGenerator } from "@/components/BTechCollegeGenerator";
import { MBACollegeGenerator } from "@/components/MBACollegeGenerator";
import { BBACollegeGenerator } from "@/components/BBACollegeGenerator";
import { CompareDrawer } from "@/components/CompareDrawer";
import { BrochureModal } from "@/components/BrochureModal";
import { searchColleges, getSearchSuggestions } from "@/lib/collegeSearch";
import { Search, X, MapPin, GraduationCap, IndianRupee, Briefcase, Filter, ChevronDown, Sparkles, TrendingUp, Layers, Check, ArrowRight, BookOpen, Compass, CheckCircle2, AlertCircle } from "lucide-react";

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
    name: "Andhra Pradesh",
    badge: "Coastal Port & FinTech Corridor",
    icon: "🌊",
    cities: "Visakhapatnam, Vijayawada, Sri City",
    topInstitutes: "IIM Visakhapatnam, IFMR GSB Sri City, GITAM",
    avgFee: "₹7L - ₹18L",
    avgPlacement: "₹12.00 LPA",
    topExams: ["CAT", "XAT", "AP ICET", "NMAT"]
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
    name: "Bihar",
    badge: "Eastern Educational Corridor",
    icon: "📖",
    cities: "Patna, Bodh Gaya",
    topInstitutes: "IIM Bodh Gaya, CIMP Patna, DMI Patna",
    avgFee: "₹7L - ₹17L",
    avgPlacement: "₹10.50 LPA",
    topExams: ["CAT", "XAT", "CMAT"]
  },
  {
    name: "Jharkhand",
    badge: "Mining & Industrial Capital",
    icon: "🏭",
    cities: "Jamshedpur, Ranchi, Dhanbad",
    topInstitutes: "XLRI Jamshedpur, IIM Ranchi, XISS Ranchi, BIT Mesra",
    avgFee: "₹8L - ₹27L",
    avgPlacement: "₹18.50 LPA",
    topExams: ["XAT", "CAT", "CMAT"]
  },
  {
    name: "Uttarakhand",
    badge: "Education Valley",
    icon: "🏔️",
    cities: "Dehradun, Roorkee, Kashipur",
    topInstitutes: "IIM Kashipur, DoMS IIT Roorkee, UPES, Doon Business School",
    avgFee: "₹7L - ₹18L",
    avgPlacement: "₹13.40 LPA",
    topExams: ["CAT", "MAT", "CMAT", "XAT"]
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
  },
  {
    name: "Assam & North East",
    badge: "North East Commercial Gate",
    icon: "🌿",
    cities: "Shillong, Guwahati, Tezpur",
    topInstitutes: "IIM Shillong, Tezpur University, Gauhati University",
    avgFee: "₹2L - ₹17.5L",
    avgPlacement: "₹13.00 LPA",
    topExams: ["CAT", "MAT", "CMAT"]
  },
  {
    name: "Himachal Pradesh",
    badge: "Hill B-Schools",
    icon: "🌲",
    cities: "Shimla, Solan, Paonta Sahib",
    topInstitutes: "IIM Sirmaur, HPUBS Shimla, Shoolini University",
    avgFee: "₹3L - ₹16L",
    avgPlacement: "₹10.50 LPA",
    topExams: ["CAT", "HPU-MAT", "CMAT"]
  }
];

export const STATE_ENGINEERING_EXPLORER_HUBS = [
  {
    name: "Tamil Nadu",
    badge: "Deep Tech & Research Powerhouse",
    icon: "⚡",
    cities: "Chennai, Trichy, Coimbatore, Vellore",
    topInstitutes: "IIT Madras (#1 NIRF), NIT Trichy, Anna Univ CEG, PSG Tech, SSN, VIT Vellore, SASTRA",
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
    topExams: ["MHT CET", "JEE Advanced", "JEE Main", "GATE"]
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
    name: "Uttar Pradesh",
    badge: "Centenary Tech & Computing Legacy",
    icon: "🏛️",
    cities: "Kanpur, Varanasi, Prayagraj, Lucknow",
    topInstitutes: "IIT Kanpur, IIT BHU, MNNIT Allahabad, IIIT Allahabad, HBTU",
    avgFee: "₹4L - ₹10L",
    avgPlacement: "₹19.20 LPA",
    topExams: ["JEE Advanced", "JEE Main", "GATE"]
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
  },
  {
    name: "Delhi NCR",
    badge: "Capital Tech & High Placement Hub",
    icon: "🏢",
    cities: "Delhi, Noida, Gurgaon",
    topInstitutes: "IIT Delhi, DTU Delhi, NSUT Delhi, IIIT Delhi, NIT Delhi, Jamia",
    avgFee: "₹70K - ₹10L",
    avgPlacement: "₹17.80 LPA",
    topExams: ["JEE Advanced", "JEE Main (JAC Delhi)"]
  },
  {
    name: "Gujarat",
    badge: "Chemical & ICT Tech Corridor",
    icon: "🧪",
    cities: "Gandhinagar, Surat, Ahmedabad",
    topInstitutes: "IIT Gandhinagar, SVNIT Surat, DA-IICT, Nirma University",
    avgFee: "₹5L - ₹10L",
    avgPlacement: "₹13.50 LPA",
    topExams: ["GUJCET", "JEE Main", "JEE Advanced"]
  },
  {
    name: "Rajasthan",
    badge: "Pioneering Tech & AI Innovation",
    icon: "🏰",
    cities: "Pilani, Jaipur, Jodhpur",
    topInstitutes: "BITS Pilani, IIT Jodhpur, MNIT Jaipur, LNMIIT Jaipur",
    avgFee: "₹6L - ₹22L",
    avgPlacement: "₹15.80 LPA",
    topExams: ["BITSAT", "JEE Advanced", "JEE Main", "REAP"]
  },
  {
    name: "Punjab & Chandigarh",
    badge: "Northern Engineering Powerhouse",
    icon: "🌾",
    cities: "Chandigarh, Patiala, Ropar, Jalandhar",
    topInstitutes: "IIT Ropar, Thapar Institute, PEC Chandigarh, NIT Jalandhar",
    avgFee: "₹5L - ₹20L",
    avgPlacement: "₹14.50 LPA",
    topExams: ["JEE Advanced", "JEE Main", "GATE"]
  },
  {
    name: "Kerala",
    badge: "Coastal Tech & High ROI",
    icon: "🌴",
    cities: "Calicut, Trivandrum, Palakkad, Kochi",
    topInstitutes: "NIT Calicut, IIT Palakkad, CET Trivandrum, MEC Kochi",
    avgFee: "₹50K - ₹9.5L",
    avgPlacement: "₹12.80 LPA",
    topExams: ["KEAM", "JEE Advanced", "JEE Main"]
  },
  {
    name: "Madhya Pradesh",
    badge: "Central India Technical Hub",
    icon: "🎯",
    cities: "Indore, Bhopal, Gwalior",
    topInstitutes: "IIT Indore, MANIT Bhopal, ABV-IIITM Gwalior, SGSITS Indore",
    avgFee: "₹3.5L - ₹10L",
    avgPlacement: "₹14.20 LPA",
    topExams: ["JEE Advanced", "JEE Main", "MP DTE"]
  },
  {
    name: "Andhra Pradesh",
    badge: "Coastal Defense & Tech Corridor",
    icon: "🌊",
    cities: "Tirupati, Sri City, Tadepalligudem, Vizag",
    topInstitutes: "IIT Tirupati, NIT Andhra, IIIT Sri City, AUCE Vizag",
    avgFee: "₹2L - ₹14L",
    avgPlacement: "₹12.20 LPA",
    topExams: ["AP EAPCET", "JEE Advanced", "JEE Main"]
  },
  {
    name: "Odisha",
    badge: "Heavy Metallurgy & Core Engg Hub",
    icon: "🚢",
    cities: "Rourkela, Bhubaneswar",
    topInstitutes: "NIT Rourkela, IIT Bhubaneswar, IIIT Bhubaneswar, SOA ITER",
    avgFee: "₹5.5L - ₹10L",
    avgPlacement: "₹13.60 LPA",
    topExams: ["JEE Advanced", "JEE Main", "OJEE"]
  },
  {
    name: "Jharkhand",
    badge: "Earth Sciences & Mining Hub",
    icon: "⛏️",
    cities: "Dhanbad, Jamshedpur, Ranchi",
    topInstitutes: "IIT (ISM) Dhanbad, NIT Jamshedpur, BIT Mesra",
    avgFee: "₹5.5L - ₹16L",
    avgPlacement: "₹15.20 LPA",
    topExams: ["JEE Advanced", "JEE Main"]
  },
  {
    name: "Bihar",
    badge: "Eastern Academic Valley",
    icon: "📜",
    cities: "Patna, Bihta",
    topInstitutes: "IIT Patna, NIT Patna, BIT Patna",
    avgFee: "₹5.5L - ₹10L",
    avgPlacement: "₹14.80 LPA",
    topExams: ["JEE Advanced", "JEE Main"]
  },
  {
    name: "Haryana",
    badge: "NCR Industrial Corridor",
    icon: "⚙️",
    cities: "Kurukshetra, Faridabad",
    topInstitutes: "NIT Kurukshetra, YMCA UST Faridabad",
    avgFee: "₹3.5L - ₹6.5L",
    avgPlacement: "₹12.00 LPA",
    topExams: ["JEE Main", "HSTES"]
  },
  {
    name: "Uttarakhand",
    badge: "Himalayan Tech Pioneers",
    icon: "⛰️",
    cities: "Roorkee, Srinagar Garhwal",
    topInstitutes: "IIT Roorkee, NIT Uttarakhand, Pantnagar",
    avgFee: "₹5.5L - ₹10L",
    avgPlacement: "₹16.50 LPA",
    topExams: ["JEE Advanced", "JEE Main"]
  },
  {
    name: "Himachal Pradesh",
    badge: "Mountain Research Corridors",
    icon: "🏔️",
    cities: "Mandi, Hamirpur",
    topInstitutes: "IIT Mandi, NIT Hamirpur, JUIT Waknaghat",
    avgFee: "₹5.5L - ₹10L",
    avgPlacement: "₹14.50 LPA",
    topExams: ["JEE Advanced", "JEE Main"]
  },
  {
    name: "Assam & North East",
    badge: "Northeastern Gateway",
    icon: "🌄",
    cities: "Guwahati, Silchar, Shillong, Agartala",
    topInstitutes: "IIT Guwahati, NIT Silchar, NIT Meghalaya, NIT Agartala",
    avgFee: "₹5.5L - ₹10L",
    avgPlacement: "₹15.80 LPA",
    topExams: ["JEE Advanced", "JEE Main"]
  },
  {
    name: "Goa",
    badge: "Coastal Tech & Innovation Hub",
    icon: "🏖️",
    cities: "Ponda, Cuncolim, Zuarinagar",
    topInstitutes: "BITS Goa, IIT Goa, NIT Goa",
    avgFee: "₹5.5L - ₹24L",
    avgPlacement: "₹16.00 LPA",
    topExams: ["BITSAT", "JEE Advanced", "JEE Main"]
  },
  {
    name: "Jammu & Kashmir",
    badge: "Northern Frontier Institutes",
    icon: "❄️",
    cities: "Jammu, Srinagar, Katra",
    topInstitutes: "IIT Jammu, NIT Srinagar, SMVDU Katra",
    avgFee: "₹5.5L - ₹9.5L",
    avgPlacement: "₹12.50 LPA",
    topExams: ["JEE Advanced", "JEE Main"]
  },
  {
    name: "Chhattisgarh",
    badge: "Central Industrial Heartland",
    icon: "⛏️",
    cities: "Raipur, Bhilai, Durg",
    topInstitutes: "IIT Bhilai, NIT Raipur, BIT Durg",
    avgFee: "₹5.5L - ₹9.5L",
    avgPlacement: "₹12.80 LPA",
    topExams: ["JEE Advanced", "JEE Main", "CG PET"]
  }
];

export function CollegesClient({ colleges, trendingBlogs = [] }: { colleges: CollegeMetadata[]; trendingBlogs?: TrendingBlog[] }) {
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
  const [visibleCount, setVisibleCount] = useState(20);
  const [stateExplorerStream, setStateExplorerStream] = useState<'management' | 'engineering'>('management');
  const [sortBy, setSortBy] = useState("default");
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

    const st = searchParams.get('state');
    if (st) setSelectedState(st);

    const ct = searchParams.get('city');
    if (ct) setSelectedCity(ct);

    const cat = searchParams.get('category') || searchParams.get('stream');
    if (cat) {
      if (cat.toLowerCase().includes('manage') || cat.toLowerCase() === 'mba') setSelectedCategory('Management');
      else if (cat.toLowerCase().includes('eng') || cat.toLowerCase() === 'btech') setSelectedCategory('Engineering');
      else if (cat.toLowerCase().includes('ug')) setSelectedCategory('UG Courses');
    }

    const crs = searchParams.get('course');
    if (crs) setSelectedCourse(crs);

    const srt = searchParams.get('sort');
    if (srt) setSortBy(srt);
  }, [searchParams]);

  // Sync state changes to URL for shareability & SEO deep-links
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

  // Specialization options keyed by category
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

  // Comprehensive Pan-India city & district mapping for all states
  const locationMap = useMemo(() => {
    const cityMap: Record<string, { state: string; city: string }> = {
      // Tamil Nadu
      "chennai": { state: "Tamil Nadu", city: "Chennai" },
      "coimbatore": { state: "Tamil Nadu", city: "Coimbatore" },
      "madurai": { state: "Tamil Nadu", city: "Madurai" },
      "tiruchirappalli": { state: "Tamil Nadu", city: "Trichy" },
      "trichy": { state: "Tamil Nadu", city: "Trichy" },
      "salem": { state: "Tamil Nadu", city: "Salem" },
      "vellore": { state: "Tamil Nadu", city: "Vellore" },
      "tiruppur": { state: "Tamil Nadu", city: "Tiruppur" },
      "erode": { state: "Tamil Nadu", city: "Erode" },
      "tirunelveli": { state: "Tamil Nadu", city: "Tirunelveli" },
      "thoothukudi": { state: "Tamil Nadu", city: "Thoothukudi" },
      "dindigul": { state: "Tamil Nadu", city: "Dindigul" },
      "thanjavur": { state: "Tamil Nadu", city: "Thanjavur" },
      "ranipet": { state: "Tamil Nadu", city: "Ranipet" },
      "sivakasi": { state: "Tamil Nadu", city: "Sivakasi" },
      "karur": { state: "Tamil Nadu", city: "Karur" },
      "nagercoil": { state: "Tamil Nadu", city: "Nagercoil" },
      "kanchipuram": { state: "Tamil Nadu", city: "Kanchipuram" },
      "cuddalore": { state: "Tamil Nadu", city: "Cuddalore" },
      "hosur": { state: "Tamil Nadu", city: "Hosur" },
      "ambur": { state: "Tamil Nadu", city: "Ambur" },
      "neyveli": { state: "Tamil Nadu", city: "Neyveli" },
      "kumbakonam": { state: "Tamil Nadu", city: "Kumbakonam" },
      "pudukkottai": { state: "Tamil Nadu", city: "Pudukkottai" },
      "rajapalayam": { state: "Tamil Nadu", city: "Rajapalayam" },
      "pollachi": { state: "Tamil Nadu", city: "Pollachi" },

      // Telangana
      "hyderabad": { state: "Telangana", city: "Hyderabad" },
      "secunderabad": { state: "Telangana", city: "Secunderabad" },
      "warangal": { state: "Telangana", city: "Warangal" },
      "nizamabad": { state: "Telangana", city: "Nizamabad" },
      "khammam": { state: "Telangana", city: "Khammam" },
      "karimnagar": { state: "Telangana", city: "Karimnagar" },
      "ramagundam": { state: "Telangana", city: "Ramagundam" },
      "mahbubnagar": { state: "Telangana", city: "Mahbubnagar" },
      "nalgonda": { state: "Telangana", city: "Nalgonda" },
      "adilabad": { state: "Telangana", city: "Adilabad" },
      "suryapet": { state: "Telangana", city: "Suryapet" },
      "siddipet": { state: "Telangana", city: "Siddipet" },
      "miryalaguda": { state: "Telangana", city: "Miryalaguda" },
      "jagtial": { state: "Telangana", city: "Jagtial" },
      "mancherial": { state: "Telangana", city: "Mancherial" },
      "kothagudem": { state: "Telangana", city: "Kothagudem" },
      "bodhan": { state: "Telangana", city: "Bodhan" },

      // Andhra Pradesh
      "visakhapatnam": { state: "Andhra Pradesh", city: "Visakhapatnam" },
      "vijayawada": { state: "Andhra Pradesh", city: "Vijayawada" },
      "guntur": { state: "Andhra Pradesh", city: "Guntur" },
      "nellore": { state: "Andhra Pradesh", city: "Nellore" },
      "kurnool": { state: "Andhra Pradesh", city: "Kurnool" },
      "kakinada": { state: "Andhra Pradesh", city: "Kakinada" },
      "rajahmundry": { state: "Andhra Pradesh", city: "Rajahmundry" },
      "tirupati": { state: "Andhra Pradesh", city: "Tirupati" },
      "kadapa": { state: "Andhra Pradesh", city: "Kadapa" },
      "anantapur": { state: "Andhra Pradesh", city: "Anantapur" },
      "vizianagaram": { state: "Andhra Pradesh", city: "Vizianagaram" },
      "eluru": { state: "Andhra Pradesh", city: "Eluru" },
      "ongole": { state: "Andhra Pradesh", city: "Ongole" },
      "nandyal": { state: "Andhra Pradesh", city: "Nandyal" },
      "machilipatnam": { state: "Andhra Pradesh", city: "Machilipatnam" },
      "adoni": { state: "Andhra Pradesh", city: "Adoni" },
      "tenali": { state: "Andhra Pradesh", city: "Tenali" },
      "proddatur": { state: "Andhra Pradesh", city: "Proddatur" },
      "chittoor": { state: "Andhra Pradesh", city: "Chittoor" },
      "hindupur": { state: "Andhra Pradesh", city: "Hindupur" },
      "bhimavaram": { state: "Andhra Pradesh", city: "Bhimavaram" },
      "guntakal": { state: "Andhra Pradesh", city: "Guntakal" },
      "dharmavaram": { state: "Andhra Pradesh", city: "Dharmavaram" },
      "gudivada": { state: "Andhra Pradesh", city: "Gudivada" },
      "srikakulam": { state: "Andhra Pradesh", city: "Srikakulam" },
      "sri city": { state: "Andhra Pradesh", city: "Sri City" },

      // Kerala
      "kochi": { state: "Kerala", city: "Kochi" },
      "ernakulam": { state: "Kerala", city: "Kochi" },
      "kozhikode": { state: "Kerala", city: "Kozhikode" },
      "calicut": { state: "Kerala", city: "Kozhikode" },
      "thiruvananthapuram": { state: "Kerala", city: "Thiruvananthapuram" },
      "trivandrum": { state: "Kerala", city: "Thiruvananthapuram" },
      "thrissur": { state: "Kerala", city: "Thrissur" },
      "kannur": { state: "Kerala", city: "Kannur" },
      "alappuzha": { state: "Kerala", city: "Alappuzha" },
      "kollam": { state: "Kerala", city: "Kollam" },
      "palakkad": { state: "Kerala", city: "Palakkad" },
      "kottayam": { state: "Kerala", city: "Kottayam" },
      "malappuram": { state: "Kerala", city: "Malappuram" },
      "kasaragod": { state: "Kerala", city: "Kasaragod" },
      "wayanad": { state: "Kerala", city: "Wayanad" },
      "idukki": { state: "Kerala", city: "Idukki" },
      "pathanamthitta": { state: "Kerala", city: "Pathanamthitta" },
      "kayamkulam": { state: "Kerala", city: "Kayamkulam" },
      "chalakudy": { state: "Kerala", city: "Chalakudy" },
      "changanassery": { state: "Kerala", city: "Changanassery" },
      "neyyattinkara": { state: "Kerala", city: "Neyyattinkara" },
      "koyilandy": { state: "Kerala", city: "Koyilandy" },
      "taliparamba": { state: "Kerala", city: "Taliparamba" },
      "ponnani": { state: "Kerala", city: "Ponnani" },
      "vadakara": { state: "Kerala", city: "Vadakara" },
      "manjeri": { state: "Kerala", city: "Manjeri" },

      // Madhya Pradesh
      "indore": { state: "Madhya Pradesh", city: "Indore" },
      "bhopal": { state: "Madhya Pradesh", city: "Bhopal" },
      "gwalior": { state: "Madhya Pradesh", city: "Gwalior" },
      "jabalpur": { state: "Madhya Pradesh", city: "Jabalpur" },
      "ujjain": { state: "Madhya Pradesh", city: "Ujjain" },
      "sagar": { state: "Madhya Pradesh", city: "Sagar" },
      "rewa": { state: "Madhya Pradesh", city: "Rewa" },
      "satna": { state: "Madhya Pradesh", city: "Satna" },

      // Odisha
      "bhubaneswar": { state: "Odisha", city: "Bhubaneswar" },
      "cuttack": { state: "Odisha", city: "Cuttack" },
      "rourkela": { state: "Odisha", city: "Rourkela" },
      "sambalpur": { state: "Odisha", city: "Sambalpur" },
      "berhampur": { state: "Odisha", city: "Berhampur" },

      // Bihar
      "patna": { state: "Bihar", city: "Patna" },
      "gaya": { state: "Bihar", city: "Gaya" },
      "bhagalpur": { state: "Bihar", city: "Bhagalpur" },
      "muzaffarpur": { state: "Bihar", city: "Muzaffarpur" },
      "bodh gaya": { state: "Bihar", city: "Bodh Gaya" },

      // Jharkhand
      "ranchi": { state: "Jharkhand", city: "Ranchi" },
      "jamshedpur": { state: "Jharkhand", city: "Jamshedpur" },
      "dhanbad": { state: "Jharkhand", city: "Dhanbad" },
      "bokaro": { state: "Jharkhand", city: "Bokaro" },

      // Goa
      "goa": { state: "Goa", city: "Goa" },
      "panaji": { state: "Goa", city: "Panaji" },
      "sanquelim": { state: "Goa", city: "Sanquelim" },

      // Himachal Pradesh
      "shimla": { state: "Himachal Pradesh", city: "Shimla" },
      "solan": { state: "Himachal Pradesh", city: "Solan" },
      "dharamshala": { state: "Himachal Pradesh", city: "Dharamshala" },
      "sirmaur": { state: "Himachal Pradesh", city: "Sirmaur" },
      "paonta sahib": { state: "Himachal Pradesh", city: "Paonta Sahib" },

      // Assam & North East
      "guwahati": { state: "Assam & North East", city: "Guwahati" },
      "shillong": { state: "Assam & North East", city: "Shillong" },
      "tezpur": { state: "Assam & North East", city: "Tezpur" },
      "silchar": { state: "Assam & North East", city: "Silchar" },
      "dibrugarh": { state: "Assam & North East", city: "Dibrugarh" },
      "jorhat": { state: "Assam & North East", city: "Jorhat" },
      "imphal": { state: "Assam & North East", city: "Imphal" },
      "agartala": { state: "Assam & North East", city: "Agartala" },
      "gangtok": { state: "Assam & North East", city: "Gangtok" },

      // Chhattisgarh
      "raipur": { state: "Chhattisgarh", city: "Raipur" },
      "bhilai": { state: "Chhattisgarh", city: "Bhilai" },
      "bilaspur": { state: "Chhattisgarh", city: "Bilaspur" },
      "raigarh": { state: "Chhattisgarh", city: "Raigarh" },

      // Jammu & Kashmir
      "jammu": { state: "Jammu & Kashmir", city: "Jammu" },
      "srinagar": { state: "Jammu & Kashmir", city: "Srinagar" },

      // Punjab & Chandigarh
      "chandigarh": { state: "Punjab & Chandigarh", city: "Chandigarh" },
      "mohali": { state: "Punjab & Chandigarh", city: "Mohali" },
      "ludhiana": { state: "Punjab & Chandigarh", city: "Ludhiana" },
      "amritsar": { state: "Punjab & Chandigarh", city: "Amritsar" },
      "jalandhar": { state: "Punjab & Chandigarh", city: "Jalandhar" },
      "patiala": { state: "Punjab & Chandigarh", city: "Patiala" },
      "bathinda": { state: "Punjab & Chandigarh", city: "Bathinda" },
      "phagwara": { state: "Punjab & Chandigarh", city: "Phagwara" },
      "rajpura": { state: "Punjab & Chandigarh", city: "Rajpura" },
      "dera bassi": { state: "Punjab & Chandigarh", city: "Dera Bassi" },

      // Haryana
      "gurgaon": { state: "Haryana", city: "Gurgaon" },
      "gurugram": { state: "Haryana", city: "Gurgaon" },
      "faridabad": { state: "Haryana", city: "Faridabad" },
      "panipat": { state: "Haryana", city: "Panipat" },
      "ambala": { state: "Haryana", city: "Ambala" },
      "rohtak": { state: "Haryana", city: "Rohtak" },
      "hisar": { state: "Haryana", city: "Hisar" },
      "karnal": { state: "Haryana", city: "Karnal" },
      "sonipat": { state: "Haryana", city: "Sonipat" },
      "bahadurgarh": { state: "Haryana", city: "Bahadurgarh" },

      // Karnataka
      "bangalore": { state: "Karnataka", city: "Bangalore" },
      "bengaluru": { state: "Karnataka", city: "Bangalore" },
      "manipal": { state: "Karnataka", city: "Manipal" },
      "mangalore": { state: "Karnataka", city: "Mangalore" },
      "mysore": { state: "Karnataka", city: "Mysore" },
      "mysuru": { state: "Karnataka", city: "Mysore" },
      "hubli": { state: "Karnataka", city: "Hubli" },
      "dharwad": { state: "Karnataka", city: "Dharwad" },
      "belgaum": { state: "Karnataka", city: "Belgaum" },
      "bellary": { state: "Karnataka", city: "Bellary" },
      "davanagere": { state: "Karnataka", city: "Davanagere" },
      "shimoga": { state: "Karnataka", city: "Shimoga" },
      "tumkur": { state: "Karnataka", city: "Tumkur" },
      "bidar": { state: "Karnataka", city: "Bidar" },
      "bijapur": { state: "Karnataka", city: "Bijapur" },
      "raichur": { state: "Karnataka", city: "Raichur" },
      "udupi": { state: "Karnataka", city: "Udupi" },
      "kolar": { state: "Karnataka", city: "Kolar" },
      "chikmagalur": { state: "Karnataka", city: "Chikmagalur" },
      "bagalkot": { state: "Karnataka", city: "Bagalkot" },
      "gangavati": { state: "Karnataka", city: "Gangavati" },
      "hospet": { state: "Karnataka", city: "Hospet" },
      "hassan": { state: "Karnataka", city: "Hassan" },
      "ranibennur": { state: "Karnataka", city: "Ranibennur" },
      "mandya": { state: "Karnataka", city: "Mandya" },
      "karwar": { state: "Karnataka", city: "Karwar" },
      "gulbarga": { state: "Karnataka", city: "Gulbarga" },
      "harihar": { state: "Karnataka", city: "Harihar" },

      // Maharashtra
      "mumbai": { state: "Maharashtra", city: "Mumbai" },
      "pune": { state: "Maharashtra", city: "Pune" },
      "nagpur": { state: "Maharashtra", city: "Nagpur" },
      "nashik": { state: "Maharashtra", city: "Nashik" },
      "aurangabad": { state: "Maharashtra", city: "Aurangabad" },
      "sambhajinagar": { state: "Maharashtra", city: "Chhatrapati Sambhajinagar" },
      "thane": { state: "Maharashtra", city: "Thane" },
      "navi mumbai": { state: "Maharashtra", city: "Navi Mumbai" },
      "solapur": { state: "Maharashtra", city: "Solapur" },
      "kolhapur": { state: "Maharashtra", city: "Kolhapur" },
      "amravati": { state: "Maharashtra", city: "Amravati" },
      "akola": { state: "Maharashtra", city: "Akola" },
      "ahmednagar": { state: "Maharashtra", city: "Ahmednagar" },
      "jalgaon": { state: "Maharashtra", city: "Jalgaon" },
      "dhule": { state: "Maharashtra", city: "Dhule" },
      "chandrapur": { state: "Maharashtra", city: "Chandrapur" },
      "nanded": { state: "Maharashtra", city: "Nanded" },
      "sangli": { state: "Maharashtra", city: "Sangli" },
      "satara": { state: "Maharashtra", city: "Satara" },
      "latur": { state: "Maharashtra", city: "Latur" },
      "beed": { state: "Maharashtra", city: "Beed" },
      "jalna": { state: "Maharashtra", city: "Jalna" },
      "yavatmal": { state: "Maharashtra", city: "Yavatmal" },
      "bhusawal": { state: "Maharashtra", city: "Bhusawal" },
      "ichalkaranji": { state: "Maharashtra", city: "Ichalkaranji" },
      "malegaon": { state: "Maharashtra", city: "Malegaon" },
      "kalyan": { state: "Maharashtra", city: "Kalyan" },
      "dombivli": { state: "Maharashtra", city: "Dombivli" },
      "mira-bhayandar": { state: "Maharashtra", city: "Mira Bhayandar" },
      "ulhasnagar": { state: "Maharashtra", city: "Ulhasnagar" },
      "vasai": { state: "Maharashtra", city: "Vasai-Virar" },
      "virar": { state: "Maharashtra", city: "Vasai-Virar" },
      "wardha": { state: "Maharashtra", city: "Wardha" },
      "gondia": { state: "Maharashtra", city: "Gondia" },
      "osmanabad": { state: "Maharashtra", city: "Osmanabad" },
      "udgir": { state: "Maharashtra", city: "Udgir" },
      "achalpur": { state: "Maharashtra", city: "Achalpur" },
      "barshi": { state: "Maharashtra", city: "Barshi" },
      "panvel": { state: "Maharashtra", city: "Panvel" },

      // Gujarat
      "ahmedabad": { state: "Gujarat", city: "Ahmedabad" },
      "gandhinagar": { state: "Gujarat", city: "Gandhinagar" },
      "anand": { state: "Gujarat", city: "Anand" },
      "vadodara": { state: "Gujarat", city: "Vadodara" },
      "surat": { state: "Gujarat", city: "Surat" },
      "rajkot": { state: "Gujarat", city: "Rajkot" },
      "bhavnagar": { state: "Gujarat", city: "Bhavnagar" },
      "jamnagar": { state: "Gujarat", city: "Jamnagar" },
      "junagadh": { state: "Gujarat", city: "Junagadh" },
      "nadiad": { state: "Gujarat", city: "Nadiad" },
      "morbi": { state: "Gujarat", city: "Morbi" },
      "mehsana": { state: "Gujarat", city: "Mehsana" },
      "bharuch": { state: "Gujarat", city: "Bharuch" },
      "navsari": { state: "Gujarat", city: "Navsari" },
      "veraval": { state: "Gujarat", city: "Veraval" },
      "porbandar": { state: "Gujarat", city: "Porbandar" },
      "valsad": { state: "Gujarat", city: "Valsad" },
      "vapi": { state: "Gujarat", city: "Vapi" },

      // Rajasthan
      "jaipur": { state: "Rajasthan", city: "Jaipur" },
      "udaipur": { state: "Rajasthan", city: "Udaipur" },
      "jodhpur": { state: "Rajasthan", city: "Jodhpur" },
      "kota": { state: "Rajasthan", city: "Kota" },
      "bikaner": { state: "Rajasthan", city: "Bikaner" },
      "ajmer": { state: "Rajasthan", city: "Ajmer" },
      "pilani": { state: "Rajasthan", city: "Pilani" },
      "alwar": { state: "Rajasthan", city: "Alwar" },
      "sikar": { state: "Rajasthan", city: "Sikar" },

      // West Bengal
      "kolkata": { state: "West Bengal", city: "Kolkata" },
      "kharagpur": { state: "West Bengal", city: "Kharagpur" },
      "durgapur": { state: "West Bengal", city: "Durgapur" },
      "siliguri": { state: "West Bengal", city: "Siliguri" },
      "howrah": { state: "West Bengal", city: "Howrah" },
      "haldia": { state: "West Bengal", city: "Haldia" },
      "hooghly": { state: "West Bengal", city: "Hooghly" },

      // Uttarakhand
      "dehradun": { state: "Uttarakhand", city: "Dehradun" },
      "roorkee": { state: "Uttarakhand", city: "Roorkee" },
      "haridwar": { state: "Uttarakhand", city: "Haridwar" },
      "kashipur": { state: "Uttarakhand", city: "Kashipur" },

      // Delhi NCR / Uttar Pradesh
      "delhi": { state: "Delhi NCR", city: "Delhi" },
      "noida": { state: "Delhi NCR", city: "Noida" },
      "greater noida": { state: "Delhi NCR", city: "Greater Noida" },
      "ghaziabad": { state: "Delhi NCR", city: "Ghaziabad" },
      "lucknow": { state: "Uttar Pradesh", city: "Lucknow" },
      "kanpur": { state: "Uttar Pradesh", city: "Kanpur" },
      "varanasi": { state: "Uttar Pradesh", city: "Varanasi" },
      "prayagraj": { state: "Uttar Pradesh", city: "Prayagraj" },
      "agra": { state: "Uttar Pradesh", city: "Agra" },
      "meerut": { state: "Uttar Pradesh", city: "Meerut" },
      "bareilly": { state: "Uttar Pradesh", city: "Bareilly" },
      "aligarh": { state: "Uttar Pradesh", city: "Aligarh" },
      "moradabad": { state: "Uttar Pradesh", city: "Moradabad" },
      "saharanpur": { state: "Uttar Pradesh", city: "Saharanpur" },
      "gorakhpur": { state: "Uttar Pradesh", city: "Gorakhpur" },
      "jhansi": { state: "Uttar Pradesh", city: "Jhansi" },
      "mathura": { state: "Uttar Pradesh", city: "Mathura" },

      // Additional Engineering Hub Cities
      "sangareddy": { state: "Telangana", city: "Sangareddy" },
      "shibpur": { state: "West Bengal", city: "Howrah" },
      "tadepalligudem": { state: "Andhra Pradesh", city: "Tadepalligudem" },
      "rupnagar": { state: "Punjab & Chandigarh", city: "Rupnagar" },
      "ropar": { state: "Punjab & Chandigarh", city: "Rupnagar" },
      "kurukshetra": { state: "Haryana", city: "Kurukshetra" },
      "mandi": { state: "Himachal Pradesh", city: "Mandi" },
      "kamand": { state: "Himachal Pradesh", city: "Mandi" },
      "hamirpur": { state: "Himachal Pradesh", city: "Hamirpur" },
      "cuncolim": { state: "Goa", city: "Cuncolim" },
      "zuarinagar": { state: "Goa", city: "Zuarinagar" },
      "durg": { state: "Chhattisgarh", city: "Durg" }
    };

    return colleges.reduce((acc, college) => {
      const loc = (college.location || "").toLowerCase();
      const name = (college.name || "").toLowerCase();
      let state = college.state || "Other";
      let city = "Other";

      // 1. Direct city check
      for (const [key, mapping] of Object.entries(cityMap)) {
        if (loc.includes(key)) {
          if (state === "Other") state = mapping.state;
          city = mapping.city;
          break;
        }
      }

      // 2. Name-based fallback if location was generic (e.g. "India")
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

      // Fallback city from location string if still Other
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

  const categories = ["All Streams", "Management", "Engineering", "UG Courses"];
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

  // Compute live search suggestions for autocomplete
  const searchSuggestions = useMemo(() => {
    return getSearchSuggestions(searchQuery, colleges, locationMap, 6);
  }, [searchQuery, colleges, locationMap]);

  // Scored and filtered college matching
  const filteredCollegesWithScore = useMemo(() => {
    const cleanQuery = searchQuery.trim();
    
    // If a search query is present, use our intelligent multi-token scoring engine
    let baseList: { college: CollegeMetadata; score: number }[] = [];
    if (cleanQuery) {
      const scoredResults = searchColleges(colleges, cleanQuery, locationMap);
      baseList = scoredResults;
    } else {
      baseList = colleges.map(c => ({ college: c, score: 0 }));
    }

    return baseList.filter(({ college }) => {
      const locInfo = locationMap[college.slug] || { state: "Other", city: "Other" };

      const matchesCategory = selectedCategory === "All Streams" || college.category === selectedCategory;

      const matchesCourse = selectedCourse === "All Courses" ||
        college.courses.some(c => c === selectedCourse || c.startsWith(selectedCourse + " ") || c.toLowerCase().includes(selectedCourse.toLowerCase()));

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
      const matchesExam = selectedExam === "All Exams" || (college.exams || []).includes(selectedExam);

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
    setVisibleCount(20);
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
      // If default and search query active, sort by relevance score
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
  };

  const mbaStateCountsMap = useMemo(() => {
    const counts: Record<string, number> = {};
    colleges
      .filter((c) => c.category === "Management" || (c.courses && c.courses.some((cr) => cr.toLowerCase().includes("mba") || cr.toLowerCase().includes("pgdm"))))
      .forEach((c) => {
        const info = locationMap[c.slug];
        if (info && info.state) {
          counts[info.state] = (counts[info.state] || 0) + 1;
        }
      });
    return counts;
  }, [colleges, locationMap]);

  const btechStateCountsMap = useMemo(() => {
    const counts: Record<string, number> = {};
    colleges
      .filter((c) => c.category === "Engineering" || (c.courses && c.courses.some((cr) => cr.toLowerCase().includes("b.tech") || cr.toLowerCase().includes("b.e") || cr.toLowerCase().includes("m.tech"))))
      .forEach((c) => {
        const info = locationMap[c.slug];
        if (info && info.state) {
          counts[info.state] = (counts[info.state] || 0) + 1;
        }
      });
    return counts;
  }, [colleges, locationMap]);

  const handleSelectState = (stateName: string, categoryPreference?: "Management" | "Engineering") => {
    setSelectedState(stateName);
    setSelectedCity("All Cities");
    if (categoryPreference) {
      setSelectedCategory(categoryPreference);
    } else if (stateExplorerStream === 'engineering' && selectedCategory !== "Engineering") {
      setSelectedCategory("Engineering");
    } else if (stateExplorerStream === 'management' && selectedCategory !== "Management" && selectedCategory !== "All Streams") {
      setSelectedCategory("Management");
    }
    const el = document.getElementById("college-listings-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
    <div className="min-h-screen bg-slate-50 pb-32 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Premium EdTech Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0D233E] to-[#123058] text-white border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-radial from-sky-500/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Audited College Directory 2027–2029 • 600+ Campuses</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight leading-tight">
            Discover & Compare Top Colleges in India.{' '}
            <span className="block mt-1 bg-gradient-to-r from-blue-300 via-sky-200 to-amber-300 bg-clip-text text-transparent">
              Verified Fees, Cutoffs & Placement Audits.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore 600+ verified premium institutions in India. Check rankings, cut-offs, fee structures, average vs highest packages, and get direct 1-on-1 counseling.
          </p>

          {/* Quick Filter Shortcuts */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6 max-w-3xl mx-auto">
            <span className="text-xs text-slate-300 font-medium mr-1">Trending:</span>
            {[
              { label: 'Top 20 IIMs', onClick: () => setSearchQuery('IIM') },
              { label: 'Delhi NCR B-Schools', onClick: () => { setSelectedState('Delhi NCR'); setSelectedCity('All Cities'); } },
              { label: 'Pune Tier-1 PGDM', onClick: () => { setSelectedState('Maharashtra'); setSelectedCity('Pune'); } },
              { label: 'High ROI (< ₹10L)', onClick: () => setSelectedFeeRange('₹5 - ₹10 Lakhs') },
              { label: 'Top Placements', onClick: () => setSortBy('avg_placement') },
            ].map((chip) => (
              <button
                key={chip.label}
                onClick={chip.onClick}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white text-xs font-medium transition-all backdrop-blur-sm cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Filter & Dashboard Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        
        {/* Stream Selector Tab & Search Bar Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 p-4 sm:p-5 mb-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar gap-2 pb-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedCourse("All Courses");
                    setSelectedExam("All Exams");
                    setSelectedSpecialization("All Specializations");
                    if (cat === "Management") setStateExplorerStream("management");
                    if (cat === "Engineering") setStateExplorerStream("engineering");
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Action Bar with Autocomplete Dropdown */}
          <div ref={searchContainerRef} className="relative">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search 770+ colleges by name (e.g. IIM Bangalore, NDIM, FMS, DTU, SIBM), city, course, or exam..."
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
                  className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 shadow-inner"
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchFocused(false);
                    }} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-full p-1 transition-colors cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSearchFocused(false);
                  const el = document.getElementById("college-listings-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-2xl transition-all shadow-md shadow-blue-600/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Live Autocomplete Popover (Shiksha / Collegedunia format) */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 divide-y divide-slate-100">
                
                {/* When User is actively typing */}
                {searchQuery.trim().length > 0 ? (
                  <>
                    {/* Matching Colleges List */}
                    <div className="p-3">
                      <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400">
                        <span>Top College Matches ({searchSuggestions.colleges.length})</span>
                        <span className="text-blue-600 lowercase font-bold">{filteredColleges.length} total results</span>
                      </div>

                      {searchSuggestions.colleges.length > 0 ? (
                        <div className="space-y-1 mt-1">
                          {searchSuggestions.colleges.map((col) => (
                            <Link
                              key={col.slug}
                              href={`/colleges/${col.slug}`}
                              onClick={() => setIsSearchFocused(false)}
                              prefetch={false}
                              className="group flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-blue-50/70 transition-all cursor-pointer"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-black text-blue-600 shrink-0 group-hover:border-blue-300">
                                  {col.logo && !col.logo.includes("default") ? (
                                    <img src={col.logo} alt={`${col.name} logo - CareerWithMohit`} className="w-full h-full object-contain p-1" />
                                  ) : (
                                    col.name.charAt(0)
                                  )}
                                </div>
                                <div className="truncate">
                                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                    {col.name}
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3 text-slate-400" />
                                      {col.location}
                                    </span>
                                    <span>•</span>
                                    <span className="text-emerald-600 font-bold">Avg: {col.avg_placement}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="hidden sm:flex items-center gap-2 shrink-0">
                                <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                                  {col.fees}
                                </span>
                                <span className="text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                                  &rarr;
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="py-4 text-center text-xs text-slate-500">
                          No direct college name match. Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border text-[10px] font-mono">Enter</kbd> to search across all courses, cities & cutoffs.
                        </div>
                      )}
                    </div>

                    {/* Popular / Suggested Query Chips */}
                    {searchSuggestions.popularSearches.length > 0 && (
                      <div className="p-3 bg-slate-50/60">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-2 mb-2">
                          Suggested Searches
                        </span>
                        <div className="flex flex-wrap gap-1.5 px-2">
                          {searchSuggestions.popularSearches.map((s, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSearchQuery(s);
                                setIsSearchFocused(false);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-600 hover:text-white border border-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                            >
                              <Search className="w-3 h-3 opacity-60" />
                              <span>{s}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* View All Matches Footer */}
                    <div className="p-2.5 bg-slate-50 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchFocused(false);
                          const el = document.getElementById("college-listings-section");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors w-full py-1 cursor-pointer"
                      >
                        View all {filteredColleges.length} results matching &ldquo;{searchQuery}&rdquo; &rarr;
                      </button>
                    </div>
                  </>
                ) : (
                  /* When Input is focused but empty */
                  <div className="p-4 space-y-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>🔥 Trending Searches & Top Hubs</span>
                      </span>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {[
                          { label: "Top 20 IIMs in India", query: "IIM" },
                          { label: "Delhi NCR Top MBA & PGDM", state: "Delhi NCR", category: "Management" },
                          { label: "Pune Tier-1 B-Schools", state: "Maharashtra", city: "Pune", category: "Management" },
                          { label: "Bangalore Tech & Engineering", state: "Karnataka", city: "Bangalore", category: "Engineering" },
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
                            className="text-left p-2.5 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center justify-between text-xs font-bold text-slate-800 group cursor-pointer"
                          >
                            <span>{item.label}</span>
                            <span className="text-slate-400 group-hover:text-blue-600 text-[10px]">&rarr;</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                      <span>Quick search tip: Type college acronyms like <strong>NDIM</strong>, <strong>IIMB</strong>, <strong>DTU</strong>, <strong>FMS</strong>, <strong>GL Bajaj</strong></span>
                      <button 
                        type="button"
                        onClick={() => setIsSearchFocused(false)} 
                        className="text-slate-400 hover:text-slate-600 font-bold"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Shiksha.com Style: Explore Colleges by State (MBA/PGDM & B.Tech/M.Tech) */}
        {(selectedCategory === "All Streams" || selectedCategory === "Management" || selectedCategory === "Engineering") && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 mb-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {selectedCategory === "Engineering" || (selectedCategory === "All Streams" && stateExplorerStream === 'engineering')
                      ? "Pan-India B.Tech & M.Tech Directory (Shiksha Format)" 
                      : "Pan-India MBA Directory (Shiksha Format)"}
                  </div>

                  {selectedCategory === "All Streams" && (
                    <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                      <button
                        onClick={() => setStateExplorerStream('management')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          stateExplorerStream === 'management'
                            ? "bg-white text-blue-600 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        🎓 MBA / PGDM Hubs
                      </button>
                      <button
                        onClick={() => setStateExplorerStream('engineering')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          stateExplorerStream === 'engineering'
                            ? "bg-white text-blue-600 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        ⚡ B.Tech / M.Tech Hubs
                      </button>
                    </div>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {(selectedCategory === "Engineering" || (selectedCategory === "All Streams" && stateExplorerStream === 'engineering'))
                    ? "Explore B.Tech & M.Tech Colleges by State"
                    : "Explore MBA & PGDM Colleges by State"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {(selectedCategory === "Engineering" || (selectedCategory === "All Streams" && stateExplorerStream === 'engineering'))
                    ? "Select any Indian state to browse audited fees, JEE Main/Advanced cutoffs, highest & average packages, and top engineering universities."
                    : "Select any Indian state to browse audited fees, CAT/XAT cutoffs, placement packages, and top B-schools."}
                </p>
              </div>

              <button
                onClick={() => {
                  const targetCat = (selectedCategory === "Engineering" || (selectedCategory === "All Streams" && stateExplorerStream === 'engineering')) ? "Engineering" : "Management";
                  handleSelectState("All States", targetCat);
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 self-start sm:self-center shrink-0 cursor-pointer"
              >
                {(selectedCategory === "Engineering" || (selectedCategory === "All Streams" && stateExplorerStream === 'engineering'))
                  ? `View All States (${colleges.filter(c => c.category === "Engineering").length}+ Colleges) →`
                  : `View All States (${colleges.filter(c => c.category === "Management").length}+ Colleges) →`}
              </button>
            </div>

            {/* Grid of State Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {(selectedCategory === "Engineering" || (selectedCategory === "All Streams" && stateExplorerStream === 'engineering')
                ? STATE_ENGINEERING_EXPLORER_HUBS
                : STATE_MBA_EXPLORER_HUBS
              ).map((hub) => {
                const isEngg = selectedCategory === "Engineering" || (selectedCategory === "All Streams" && stateExplorerStream === 'engineering');
                const count = isEngg ? (btechStateCountsMap[hub.name] || 0) : (mbaStateCountsMap[hub.name] || 0);
                const isSelected = selectedState === hub.name;
                return (
                  <div
                    key={hub.name}
                    onClick={() => handleSelectState(hub.name, isEngg ? "Engineering" : "Management")}
                    className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-500/20"
                        : "bg-slate-50/50 hover:bg-white border-slate-200/80 hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-2xl">{hub.icon}</span>
                        <span className="text-[10px] font-extrabold bg-white border border-slate-200 text-blue-600 px-2 py-0.5 rounded-full">
                          {count > 0 ? `${count}+ Colleges` : 'Top Hub'}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                        {hub.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                        {hub.badge} • {hub.cities}
                      </p>
                      <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                        <strong className="text-slate-800">{isEngg ? 'Top Tech Campuses:' : 'Top B-Schools:'}</strong> {hub.topInstitutes}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">Avg Package</span>
                        <span className="font-extrabold text-emerald-600">{hub.avgPlacement}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">Fees Tier</span>
                        <span className="font-bold text-slate-700">{hub.avgFee}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 shrink-0 ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar space-y-6 shadow-sm">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-600" /> Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button onClick={resetFilters} className="text-xs font-bold text-rose-500 hover:underline cursor-pointer">
                    Reset All
                  </button>
                )}
              </div>

              {/* Accordions */}
              <div className="space-y-4">
                <FilterGroup label="Course" icon={<GraduationCap className="w-3.5 h-3.5 text-blue-600" />}>
                  <select 
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e.target.value);
                      setSelectedSpecialization("All Specializations");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {courseOptionsForCategory.map(course => <option key={course} value={course}>{course}</option>)}
                  </select>
                </FilterGroup>

                {specializationOptions && specializationOptions.length > 1 && (
                  <FilterGroup label="Specialization" icon={<Briefcase className="w-3.5 h-3.5 text-indigo-600" />}>
                    <select
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      {specializationOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </FilterGroup>
                )}
                
                <FilterGroup label="State" icon={<MapPin className="w-3.5 h-3.5 text-emerald-600" />}>
                  <select 
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity("All Cities");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="City" icon={<MapPin className="w-3.5 h-3.5 text-cyan-600" />}>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={selectedState === "All States" && cities.length <= 1}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs disabled:opacity-50 cursor-pointer"
                  >
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Fees" icon={<IndianRupee className="w-3.5 h-3.5 text-amber-600" />}>
                  <select 
                    value={selectedFeeRange}
                    onChange={(e) => setSelectedFeeRange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {feeRanges.map(range => <option key={range} value={range}>{range}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Exam">
                  <select 
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {allPossibleExams.map(exam => <option key={exam} value={exam}>{exam}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Ownership">
                  <select 
                    value={selectedOwnership}
                    onChange={(e) => setSelectedOwnership(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    {ownershipTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </FilterGroup>
              </div>

            </div>
          </aside>

          {/* Right Listings Column */}
          <main className="w-full lg:w-3/4">
            
            {/* Quick State Navigation Pills (Shiksha Format) */}
            <div id="college-listings-section" className="mb-6 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" /> State:
                </span>
                {(() => {
                  const isEngg = selectedCategory === "Engineering" || (selectedCategory === "All Streams" && stateExplorerStream === 'engineering');
                  const hubs = isEngg ? STATE_ENGINEERING_EXPLORER_HUBS : STATE_MBA_EXPLORER_HUBS;
                  const countsMap = isEngg ? btechStateCountsMap : mbaStateCountsMap;

                  return ["All States", ...hubs.map(h => h.name)].map((st) => {
                    const count = st === "All States" 
                      ? (isEngg ? colleges.filter(c => c.category === "Engineering").length : (selectedCategory === "Management" ? colleges.filter(c => c.category === "Management").length : colleges.length))
                      : (countsMap[st] || (Object.values(locationMap).filter(l => l.state === st).length));
                    const isActive = selectedState === st;
                    return (
                      <button
                        key={st}
                        onClick={() => {
                          setSelectedState(st);
                          setSelectedCity("All Cities");
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                          isActive
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        <span>{st}</span>
                        {count > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${isActive ? 'bg-blue-700 text-white' : 'bg-white text-slate-500'}`}>
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  });
                })()}
              </div>
            </div>

            {/* AI College Predictor Bar */}
            <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-blue-50 via-indigo-50/40 to-sky-50 rounded-2xl border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                  AI
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>College Admission Call Predictor</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Live</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enter your CAT / XAT / CMAT / JEE percentile to evaluate your call chances.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="number"
                  placeholder="e.g. 85 (%ile)"
                  value={userScoreInput}
                  onChange={(e) => {
                    setUserScoreInput(e.target.value);
                    const val = parseFloat(e.target.value);
                    setUserScore(isNaN(val) ? 0 : val);
                  }}
                  className="w-full sm:w-36 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white"
                />
                {userScore > 0 && (
                  <button
                    onClick={() => {
                      setUserScoreInput("");
                      setUserScore(0);
                    }}
                    className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {activeFiltersCount > 0 || searchQuery.trim() || userScore > 0 ? (
              <div className="mb-4 flex flex-wrap items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-blue-600" /> Active Filters:
                </span>

                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                    <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                    <button type="button" onClick={() => setSearchQuery("")} className="hover:text-blue-900 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {selectedCategory !== "All Streams" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                    <span>Stream: {selectedCategory}</span>
                    <button type="button" onClick={() => setSelectedCategory("All Streams")} className="hover:text-rose-600 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {selectedCourse !== "All Courses" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                    <span>Course: {selectedCourse}</span>
                    <button type="button" onClick={() => setSelectedCourse("All Courses")} className="hover:text-rose-600 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {selectedState !== "All States" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                    <span>State: {selectedState}</span>
                    <button type="button" onClick={() => { setSelectedState("All States"); setSelectedCity("All Cities"); }} className="hover:text-rose-600 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {selectedCity !== "All Cities" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                    <span>City: {selectedCity}</span>
                    <button type="button" onClick={() => setSelectedCity("All Cities")} className="hover:text-rose-600 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {selectedFeeRange !== "All Fees" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                    <span>Fee: {selectedFeeRange}</span>
                    <button type="button" onClick={() => setSelectedFeeRange("All Fees")} className="hover:text-rose-600 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {selectedExam !== "All Exams" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold">
                    <span>Exam: {selectedExam}</span>
                    <button type="button" onClick={() => setSelectedExam("All Exams")} className="hover:text-rose-600 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {userScore > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <span>Predictor: {userScore}%ile</span>
                    <button type="button" onClick={() => { setUserScore(0); setUserScoreInput(""); }} className="hover:text-rose-600 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-extrabold text-rose-600 hover:text-rose-800 underline ml-auto px-2 py-1 cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : null}

            {/* Results Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span>Top Colleges in India</span>
                  <span className="text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-black">
                    {filteredColleges.length} Found
                  </span>
                </h2>
                {searchQuery.trim() && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    Displaying colleges matched by intelligent multi-token ranking for &ldquo;<strong>{searchQuery}</strong>&rdquo;
                  </p>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  <span>Sort by:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 cursor-pointer shadow-sm"
                >
                  <option value="default">{searchQuery.trim() ? "Relevance (Default)" : "Recommended (Default)"}</option>
                  <option value="roi">🔥 Highest ROI (Placement / Fee Ratio)</option>
                  <option value="avg_placement">Avg Placement (High to Low)</option>
                  <option value="highest_placement">Highest Package (High to Low)</option>
                  <option value="fees_low">Lowest Course Fees</option>
                  <option value="ranking">Top NIRF Ranking</option>
                </select>
                <button 
                  onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                  className="lg:hidden flex items-center gap-1.5 px-4 py-2 bg-slate-800 text-white rounded-lg font-bold text-xs cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5" />
                  Filters
                </button>
              </div>
            </div>

            {/* Grid listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {visibleColleges.map((college) => (
                <CollegeCard 
                  key={college.slug} 
                  college={college} 
                  onCompareToggle={handleCompareToggle}
                  isCompared={comparedColleges.some((c) => c.slug === college.slug)}
                  onDownloadBrochure={(c) => setBrochureCollege(c)}
                  userScore={userScore}
                />
              ))}
            </div>

            {/* Empty State with Smart Fallback & Recovery */}
            {filteredColleges.length === 0 && (
              <div className="py-16 px-6 text-center bg-white rounded-3xl border border-slate-200/90 shadow-sm max-w-2xl mx-auto space-y-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto border border-blue-100">
                  <Search className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">No colleges match your active search criteria</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                    We couldn&apos;t find any colleges for &ldquo;<strong className="text-slate-700">{searchQuery || 'selected filters'}</strong>&rdquo; under the currently applied filters.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                    Suggested Solutions:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => { setSearchQuery(""); }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 text-slate-700 text-xs font-bold transition-all"
                    >
                      Clear Search Keyword
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedState("All States"); setSelectedCity("All Cities"); }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 text-slate-700 text-xs font-bold transition-all"
                    >
                      Search All India (All States)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedCategory("All Streams"); setSelectedCourse("All Courses"); }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 text-slate-700 text-xs font-bold transition-all"
                    >
                      Search All Streams
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={resetFilters}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    Reset All Filters & View 770+ Colleges
                  </button>
                </div>
              </div>
            )}

            {/* Load More */}
            {visibleCount < filteredColleges.length && (
              <div className="flex justify-center mt-10">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 20)}
                  className="px-8 py-3 bg-white border border-slate-200 hover:border-blue-400 text-slate-800 hover:text-blue-600 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  Load More Colleges ({filteredColleges.length - visibleCount} remaining)
                </button>
              </div>
            )}

            {/* Trending Blogs */}
            {trendingBlogs && trendingBlogs.length > 0 && (
              <div className="mt-16 border-t border-slate-200/80 pt-10">
                <div className="flex items-center gap-2 mb-6 text-blue-600">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-extrabold uppercase tracking-wider">Top Admission Insights</span>
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

            {/* Shortlist Generators */}
            <div className="mt-16 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 shadow-xs">
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  Instant Shortlisting Tools
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2">
                  Admissions Predictors & Shortlist Generators
                </h3>
              </div>
              <div className="flex gap-2 border-b border-slate-100 pb-3 mb-6 overflow-x-auto no-scrollbar">
                {[
                  { id: 'mba', label: 'MBA / PGDM Predictor' },
                  { id: 'btech', label: 'B.Tech Shortlister' },
                  { id: 'bba', label: 'BBA & BCA Shortlister' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveToolTab(t.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeToolTab === t.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {activeToolTab === 'mba' && <MBACollegeGenerator />}
              {activeToolTab === 'btech' && <BTechCollegeGenerator />}
              {activeToolTab === 'bba' && <BBACollegeGenerator />}
            </div>

          </main>
        </div>
      </div>
      <CompareDrawer
        selectedColleges={comparedColleges}
        onRemove={handleCompareToggle}
        onClearAll={handleClearAllCompare}
        onCompare={handleCompareNow}
      />
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

function FilterGroup({ label, icon, children }: { label: string, icon?: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 ml-1">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
