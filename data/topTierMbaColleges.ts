export interface TopTierMbaCollege {
  name: string;
  location: string;
  fees: string;
  cutoff: string;
  avg_placement: string;
  highest_placement: string;
  exams: string[];
  isIim: boolean;
  website: string;
  slug?: string;
}

export const TOP_TIER_MBA_COLLEGES: TopTierMbaCollege[] = [
  // ==================== IIMs ====================
  {
    name: "IIM Ahmedabad",
    location: "Ahmedabad, Gujarat",
    fees: "₹26.5 Lakhs (Total)",
    cutoff: "99.5+ CAT %ile",
    avg_placement: "₹35.22 LPA",
    highest_placement: "₹1.15 Crore",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iima.ac.in",
    slug: "colleges/iim-ahmedabad"
  },
  {
    name: "IIM Bangalore",
    location: "Bangalore, Karnataka",
    fees: "₹24.5 Lakhs (Total)",
    cutoff: "99.0+ CAT %ile",
    avg_placement: "₹33.50 LPA",
    highest_placement: "₹1.15 Crore",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimb.ac.in",
    slug: "colleges/iim-bangalore"
  },
  {
    name: "IIM Calcutta",
    location: "Kolkata, West Bengal",
    fees: "₹27.0 Lakhs (Total)",
    cutoff: "99.0+ CAT %ile",
    avg_placement: "₹35.07 LPA",
    highest_placement: "₹1.20 Crore",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimcal.ac.in",
    slug: "colleges/iim-calcutta"
  },
  {
    name: "IIM Lucknow",
    location: "Lucknow, Uttar Pradesh",
    fees: "₹20.7 Lakhs (Total)",
    cutoff: "98.0+ CAT %ile",
    avg_placement: "₹32.20 LPA",
    highest_placement: "₹65.0 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iiml.ac.in"
  },
  {
    name: "IIM Kozhikode",
    location: "Kozhikode, Kerala",
    fees: "₹20.5 Lakhs (Total)",
    cutoff: "97.0+ CAT %ile",
    avg_placement: "₹31.02 LPA",
    highest_placement: "₹67.0 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimk.ac.in"
  },
  {
    name: "IIM Indore",
    location: "Indore, Madhya Pradesh",
    fees: "₹21.0 Lakhs (Total)",
    cutoff: "97.0+ CAT %ile",
    avg_placement: "₹30.21 LPA",
    highest_placement: "₹1.14 Crore",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimidr.ac.in"
  },
  {
    name: "IIM Shillong",
    location: "Shillong, Meghalaya",
    fees: "₹19.1 Lakhs (Total)",
    cutoff: "95.0+ CAT %ile",
    avg_placement: "₹26.96 LPA",
    highest_placement: "₹71.3 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimshillong.ac.in",
    slug: "blog/baby-iims-review-2026-honest-analysis"
  },
  {
    name: "IIM Rohtak",
    location: "Rohtak, Haryana",
    fees: "₹17.9 Lakhs (Total)",
    cutoff: "95.0+ CAT %ile",
    avg_placement: "₹18.73 LPA",
    highest_placement: "₹48.2 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimrohtak.ac.in"
  },
  {
    name: "IIM Raipur",
    location: "Raipur, Chhattisgarh",
    fees: "₹18.0 Lakhs (Total)",
    cutoff: "94.0+ CAT %ile",
    avg_placement: "₹21.04 LPA",
    highest_placement: "₹67.6 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimraipur.ac.in",
    slug: "blog/baby-iims-review-2026-honest-analysis"
  },
  {
    name: "IIM Ranchi",
    location: "Ranchi, Jharkhand",
    fees: "₹17.5 Lakhs (Total)",
    cutoff: "94.0+ CAT %ile",
    avg_placement: "₹17.30 LPA",
    highest_placement: "₹35.5 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimranchi.ac.in",
    slug: "blog/baby-iims-review-2026-honest-analysis"
  },
  {
    name: "IIM Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    fees: "₹19.5 Lakhs (Total)",
    cutoff: "94.0+ CAT %ile",
    avg_placement: "₹20.55 LPA",
    highest_placement: "₹41.6 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimtrichy.ac.in",
    slug: "blog/baby-iims-review-2026-honest-analysis"
  },
  {
    name: "IIM Udaipur",
    location: "Udaipur, Rajasthan",
    fees: "₹21.0 Lakhs (Total)",
    cutoff: "92.0+ CAT %ile",
    avg_placement: "₹20.02 LPA",
    highest_placement: "₹47.3 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimu.ac.in"
  },
  {
    name: "IIM Kashipur",
    location: "Kashipur, Uttarakhand",
    fees: "₹18.5 Lakhs (Total)",
    cutoff: "92.0+ CAT %ile",
    avg_placement: "₹18.11 LPA",
    highest_placement: "₹37.0 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimkashipur.ac.in"
  },
  {
    name: "IIM Amritsar",
    location: "Amritsar, Punjab",
    fees: "₹16.0 Lakhs (Total)",
    cutoff: "88.0+ CAT %ile",
    avg_placement: "₹16.51 LPA",
    highest_placement: "₹36.25 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimamritsar.ac.in"
  },
  {
    name: "IIM Visakhapatnam",
    location: "Visakhapatnam, Andhra Pradesh",
    fees: "₹17.8 Lakhs (Total)",
    cutoff: "88.0+ CAT %ile",
    avg_placement: "₹16.62 LPA",
    highest_placement: "₹32.65 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimv.ac.in"
  },
  {
    name: "IIM Jammu",
    location: "Jammu, J&K",
    fees: "₹17.2 Lakhs (Total)",
    cutoff: "88.0+ CAT %ile",
    avg_placement: "₹16.43 LPA",
    highest_placement: "₹64.0 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimj.ac.in"
  },
  {
    name: "IIM Nagpur",
    location: "Nagpur, Maharashtra",
    fees: "₹18.9 Lakhs (Total)",
    cutoff: "88.0+ CAT %ile",
    avg_placement: "₹16.74 LPA",
    highest_placement: "₹64.0 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimnagpur.ac.in"
  },
  {
    name: "IIM Sambalpur",
    location: "Sambalpur, Odisha",
    fees: "₹15.1 Lakhs (Total)",
    cutoff: "88.0+ CAT %ile",
    avg_placement: "₹16.64 LPA",
    highest_placement: "₹64.6 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimsambalpur.ac.in"
  },
  {
    name: "IIM Sirmaur",
    location: "Sirmaur, Himachal Pradesh",
    fees: "₹16.0 Lakhs (Total)",
    cutoff: "88.0+ CAT %ile",
    avg_placement: "₹14.45 LPA",
    highest_placement: "₹64.0 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimsirmaur.ac.in"
  },
  {
    name: "IIM Bodh Gaya",
    location: "Bodh Gaya, Bihar",
    fees: "₹17.0 Lakhs (Total)",
    cutoff: "88.0+ CAT %ile",
    avg_placement: "₹16.00 LPA",
    highest_placement: "₹48.58 LPA",
    exams: ["CAT"],
    isIim: true,
    website: "https://www.iimbg.ac.in"
  },

  // ==================== NMAT Accepting Colleges ====================
  {
    name: "NMIMS School of Business Management",
    location: "Mumbai, Maharashtra",
    fees: "₹28.0 Lakhs (Total)",
    cutoff: "232+ NMAT Score",
    avg_placement: "₹26.63 LPA",
    highest_placement: "₹67.8 LPA",
    exams: ["NMAT"],
    isIim: false,
    website: "https://sbm.nmims.edu",
    slug: "colleges/nmims-mumbai"
  },
  {
    name: "NMIMS Bangalore",
    location: "Bangalore, Karnataka",
    fees: "₹20.0 Lakhs (Total)",
    cutoff: "220+ NMAT Score",
    avg_placement: "₹14.00 LPA",
    highest_placement: "₹43.0 LPA",
    exams: ["NMAT"],
    isIim: false,
    website: "https://www.nmimsbangalore.org",
    slug: "colleges/nmims-bangalore"
  },
  {
    name: "NMIMS Navi Mumbai",
    location: "Navi Mumbai, Maharashtra",
    fees: "₹18.5 Lakhs (Total)",
    cutoff: "210+ NMAT Score",
    avg_placement: "₹11.50 LPA",
    highest_placement: "₹25.0 LPA",
    exams: ["NMAT"],
    isIim: false,
    website: "https://www.nmimsnavimumbai.org"
  },
  {
    name: "NMIMS Hyderabad",
    location: "Hyderabad, Telangana",
    fees: "₹20.0 Lakhs (Total)",
    cutoff: "210+ NMAT Score",
    avg_placement: "₹12.00 LPA",
    highest_placement: "₹28.0 LPA",
    exams: ["NMAT"],
    isIim: false,
    website: "https://www.nmimshyderabad.org"
  },
  {
    name: "NMIMS Indore",
    location: "Indore, Madhya Pradesh",
    fees: "₹18.0 Lakhs (Total)",
    cutoff: "200+ NMAT Score",
    avg_placement: "₹10.50 LPA",
    highest_placement: "₹21.1 LPA",
    exams: ["NMAT"],
    isIim: false,
    website: "https://www.nmimsindore.org"
  },
  {
    name: "K J Somaiya Institute of Management",
    location: "Mumbai, Maharashtra",
    fees: "₹20.8 Lakhs (Total)",
    cutoff: "220+ NMAT Score",
    avg_placement: "₹13.00 LPA",
    highest_placement: "₹25.96 LPA",
    exams: ["NMAT", "CAT", "XAT", "CMAT"],
    isIim: false,
    website: "https://simsr.somaiya.edu"
  },
  {
    name: "Xavier Institute of Management (XIMB)",
    location: "Bhubaneswar, Odisha",
    fees: "₹22.0 Lakhs (Total)",
    cutoff: "220+ NMAT Score",
    avg_placement: "₹20.03 LPA",
    highest_placement: "₹71.5 LPA",
    exams: ["NMAT", "XAT", "CAT", "GMAT"],
    isIim: false,
    website: "https://ximb.edu.in",
    slug: "colleges/xlri-jamshedpur" // Related elite east B-school link
  },
  {
    name: "SDA Bocconi Asia Center",
    location: "Mumbai, Maharashtra",
    fees: "₹19.4 Lakhs (Total)",
    cutoff: "200+ NMAT / Bocconi Test",
    avg_placement: "₹14.30 LPA",
    highest_placement: "₹36.28 LPA",
    exams: ["NMAT", "CAT", "GMAT", "Bocconi Test"],
    isIim: false,
    website: "https://www.sdabocconiasiacenter.com"
  },
  {
    name: "TAPMI Manipal",
    location: "Manipal, Karnataka",
    fees: "₹18.0 Lakhs (Total)",
    cutoff: "210+ NMAT Score",
    avg_placement: "₹15.70 LPA",
    highest_placement: "₹32.0 LPA",
    exams: ["NMAT", "CAT", "XAT", "GMAT"],
    isIim: false,
    website: "https://www.tapmi.edu.in",
    slug: "colleges/tapmi-bangalore"
  },
  {
    name: "Welingkar Institute of Management (WeSchool)",
    location: "Mumbai, Maharashtra",
    fees: "₹14.0 Lakhs (Total)",
    cutoff: "200+ NMAT Score",
    avg_placement: "₹12.50 LPA",
    highest_placement: "₹24.0 LPA",
    exams: ["NMAT", "CAT", "XAT", "CMAT", "ATMA"],
    isIim: false,
    website: "https://www.welingkar.org",
    slug: "colleges/welingkar-bangalore"
  },
  {
    name: "IFMR Graduate School of Business",
    location: "Sri City, Andhra Pradesh",
    fees: "₹14.5 Lakhs (Total)",
    cutoff: "200+ NMAT Score",
    avg_placement: "₹13.50 LPA",
    highest_placement: "₹22.9 LPA",
    exams: ["NMAT", "CAT", "XAT", "CMAT", "GMAT"],
    isIim: false,
    website: "https://krea.edu.in/ifmrgsb/"
  },

  // ==================== SNAP Accepting Colleges ====================
  {
    name: "SIBM Pune",
    location: "Pune, Maharashtra",
    fees: "₹24.5 Lakhs (Total)",
    cutoff: "98.5+ SNAP %ile",
    avg_placement: "₹26.77 LPA",
    highest_placement: "₹49.0 LPA",
    exams: ["SNAP"],
    isIim: false,
    website: "https://www.sibmpune.edu.in",
    slug: "colleges/sibm-pune"
  },
  {
    name: "SCMHRD Pune",
    location: "Pune, Maharashtra",
    fees: "₹23.8 Lakhs (Total)",
    cutoff: "96.0+ SNAP %ile",
    avg_placement: "₹23.71 LPA",
    highest_placement: "₹41.5 LPA",
    exams: ["SNAP"],
    isIim: false,
    website: "https://www.scmhrd.edu",
    slug: "colleges/scmhrd-pune"
  },
  {
    name: "SIBM Bangalore",
    location: "Bangalore, Karnataka",
    fees: "₹19.0 Lakhs (Total)",
    cutoff: "90.0+ SNAP %ile",
    avg_placement: "₹13.48 LPA",
    highest_placement: "₹24.0 LPA",
    exams: ["SNAP"],
    isIim: false,
    website: "https://www.sibmbangalore.edu.in",
    slug: "colleges/sibm-bangalore"
  },
  {
    name: "SIIB Pune",
    location: "Pune, Maharashtra",
    fees: "₹19.6 Lakhs (Total)",
    cutoff: "93.0+ SNAP %ile",
    avg_placement: "₹13.12 LPA",
    highest_placement: "₹39.0 LPA",
    exams: ["SNAP"],
    isIim: false,
    website: "https://www.siib.ac.in"
  },
  {
    name: "SIBM Noida",
    location: "Noida, Uttar Pradesh",
    fees: "₹16.0 Lakhs (Total)",
    cutoff: "85.0+ SNAP %ile",
    avg_placement: "₹11.20 LPA",
    highest_placement: "₹22.0 LPA",
    exams: ["SNAP"],
    isIim: false,
    website: "https://www.sibmnoida.edu.in"
  },
  {
    name: "SIDTM Pune",
    location: "Pune, Maharashtra",
    fees: "₹18.0 Lakhs (Total)",
    cutoff: "83.0+ SNAP %ile",
    avg_placement: "₹12.78 LPA",
    highest_placement: "₹27.83 LPA",
    exams: ["SNAP"],
    isIim: false,
    website: "https://www.sidtm.edu.in"
  },
  {
    name: "SCIT Pune",
    location: "Pune, Maharashtra",
    fees: "₹16.5 Lakhs (Total)",
    cutoff: "76.0+ SNAP %ile",
    avg_placement: "₹11.20 LPA",
    highest_placement: "₹30.0 LPA",
    exams: ["SNAP"],
    isIim: false,
    website: "https://www.scit.edu"
  },
  {
    name: "SIMS Pune",
    location: "Pune, Maharashtra",
    fees: "₹12.0 Lakhs (Total)",
    cutoff: "77.0+ SNAP %ile",
    avg_placement: "₹11.00 LPA",
    highest_placement: "₹21.5 LPA",
    exams: ["SNAP"],
    isIim: false,
    website: "https://www.sims.edu"
  },
  {
    name: "SSBF Pune",
    location: "Pune, Maharashtra",
    fees: "₹17.0 Lakhs (Total)",
    cutoff: "60.0+ SNAP %ile",
    avg_placement: "₹11.00 LPA",
    highest_placement: "₹19.6 LPA",
    exams: ["SNAP"],
    isIim: false,
    website: "https://www.ssbf.edu.in"
  },
  {
    name: "SIBM Hyderabad",
    location: "Hyderabad, Telangana",
    fees: "₹15.5 Lakhs (Total)",
    cutoff: "58.0+ SNAP %ile",
    avg_placement: "₹8.90 LPA",
    highest_placement: "₹15.0 LPA",
    exams: ["SNAP"],
    isIim: false,
    website: "https://www.sibmhyderabad.edu.in"
  },

  // ==================== XAT Accepting Colleges ====================
  {
    name: "XLRI Jamshedpur",
    location: "Jamshedpur, Jharkhand",
    fees: "₹25.0 Lakhs (Total)",
    cutoff: "95.0+ XAT %ile",
    avg_placement: "₹32.70 LPA",
    highest_placement: "₹1.10 Crore",
    exams: ["XAT"],
    isIim: false,
    website: "https://www.xlri.ac.in",
    slug: "colleges/xlri-jamshedpur"
  },
  {
    name: "XLRI Delhi NCR",
    location: "Jhajjar, Haryana",
    fees: "₹25.0 Lakhs (Total)",
    cutoff: "93.0+ XAT %ile",
    avg_placement: "₹30.00 LPA",
    highest_placement: "₹75.0 LPA",
    exams: ["XAT"],
    isIim: false,
    website: "https://xlridelhi.ac.in"
  },
  {
    name: "SPJIMR Mumbai",
    location: "Mumbai, Maharashtra",
    fees: "₹23.0 Lakhs (Total)",
    cutoff: "95.0+ XAT / CAT %ile",
    avg_placement: "₹33.00 LPA",
    highest_placement: "₹77.8 LPA",
    exams: ["XAT", "CAT", "GMAT"],
    isIim: false,
    website: "https://www.spjimr.org",
    slug: "colleges/spjimr-mumbai"
  },
  {
    name: "IMT Ghaziabad",
    location: "Ghaziabad, Uttar Pradesh",
    fees: "₹21.5 Lakhs (Total)",
    cutoff: "90.0+ XAT / CAT %ile",
    avg_placement: "₹17.35 LPA",
    highest_placement: "₹65.6 LPA",
    exams: ["XAT", "CAT", "GMAT"],
    isIim: false,
    website: "https://www.imt.edu"
  },
  {
    name: "Goa Institute of Management (GIM)",
    location: "Sanquelim, Goa",
    fees: "₹19.5 Lakhs (Total)",
    cutoff: "85.0+ XAT / CAT / CMAT",
    avg_placement: "₹15.00 LPA",
    highest_placement: "₹55.0 LPA",
    exams: ["XAT", "CAT", "CMAT", "GMAT"],
    isIim: false,
    website: "https://www.gim.ac.in"
  },
  {
    name: "FORE School of Management",
    location: "New Delhi, Delhi",
    fees: "₹18.6 Lakhs (Total)",
    cutoff: "85.0+ XAT / CAT / GMAT",
    avg_placement: "₹14.50 LPA",
    highest_placement: "₹30.0 LPA",
    exams: ["XAT", "CAT", "GMAT"],
    isIim: false,
    website: "https://www.fsm.ac.in",
    slug: "colleges/fore-school-delhi"
  },
  {
    name: "LBSIM Delhi",
    location: "Dwarka, New Delhi",
    fees: "₹15.5 Lakhs (Total)",
    cutoff: "80.0+ XAT / CAT",
    avg_placement: "₹12.40 LPA",
    highest_placement: "₹25.9 LPA",
    exams: ["XAT", "CAT"],
    isIim: false,
    website: "https://www.lbsim.ac.in",
    slug: "colleges/lbsim-delhi"
  },
  {
    name: "LIBA Chennai",
    location: "Chennai, Tamil Nadu",
    fees: "₹17.0 Lakhs (Total)",
    cutoff: "80.0+ XAT / CAT",
    avg_placement: "₹11.50 LPA",
    highest_placement: "₹20.5 LPA",
    exams: ["XAT", "CAT"],
    isIim: false,
    website: "https://liba.edu"
  },
  {
    name: "BIMTECH Greater Noida",
    location: "Greater Noida, Uttar Pradesh",
    fees: "₹14.0 Lakhs (Total)",
    cutoff: "75.0+ XAT / CAT / CMAT",
    avg_placement: "₹11.00 LPA",
    highest_placement: "₹24.4 LPA",
    exams: ["XAT", "CAT", "CMAT", "MAT"],
    isIim: false,
    website: "https://www.bimtech.ac.in",
    slug: "colleges/bimtech-greater-noida"
  },
  {
    name: "Institute of Rural Management Anand (IRMA)",
    location: "Anand, Gujarat",
    fees: "₹16.8 Lakhs (Total)",
    cutoff: "80.0+ XAT / CAT",
    avg_placement: "₹15.50 LPA",
    highest_placement: "₹31.16 LPA",
    exams: ["XAT", "CAT"],
    isIim: false,
    website: "https://www.irma.ac.in"
  },
  {
    name: "MICA Ahmedabad",
    location: "Ahmedabad, Gujarat",
    fees: "₹23.0 Lakhs (Total)",
    cutoff: "80.0+ XAT / CAT + MICAT",
    avg_placement: "₹20.09 LPA",
    highest_placement: "₹36.00 LPA",
    exams: ["XAT", "CAT", "GMAT"],
    isIim: false,
    website: "https://www.mica.ac.in"
  }
];
