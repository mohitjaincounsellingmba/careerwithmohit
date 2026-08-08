export interface GeoExamCutoff {
  collegeName: string;
  exam: string;
  cutoff: string;
  fee: string;
  avgPlacement: string;
  slug?: string;
}

export interface GeoFaq {
  question: string;
  answer: string;
}

export interface GeoMbaHub {
  slug: string;
  hubKey: string;
  route: string;
  cityName: string;
  stateName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  geoCoordinates: {
    latitude: string;
    longitude: string;
    region: string;
    placename: string;
  };
  stats: {
    totalColleges: string;
    avgPlacement: string;
    highestPlacement: string;
    feeRange: string;
    topExams: string[];
  };
  cutoffsTable: GeoExamCutoff[];
  roiHighlights: {
    title: string;
    description: string;
  }[];
  faqs: GeoFaq[];
  locationKeywords: string[];
}

export const GEO_MBA_HUBS: Record<string, GeoMbaHub> = {
  'delhi-ncr': {
    slug: 'mba-colleges-delhi-ncr',
    hubKey: 'delhi-ncr',
    route: '/colleges/mba-colleges-delhi-ncr',
    cityName: 'Delhi NCR',
    stateName: 'Delhi / Haryana / Uttar Pradesh',
    tagline: 'Corporate & Political Capital · 500+ Fortune 500 Headquarters',
    heroTitle: 'Top MBA & PGDM Colleges in Delhi NCR 2027: Fees, Placements & Admission',
    heroSubtitle:
      'Compare top AICTE & AIU approved PGDM and MBA institutes across Delhi, Noida, Greater Noida, Gurugram, and Ghaziabad. Access 2025-2026 placement metrics, CAT/XAT/CMAT cutoffs, and get 1-on-1 admission counselling with Mohit Jain.',
    metaTitle: 'Top MBA Colleges in Delhi NCR 2027: Fees, Cutoffs, Placements | CareerWithMohit',
    metaDescription:
      'Explore premier MBA & PGDM colleges in Delhi NCR (Delhi, Noida, Gurgaon, Greater Noida) for 2027. Compare fees, placement reports (NDIM, FIIB, BIMTECH, JIMS, FORE, MDI), cutoffs, and get free expert counselling.',
    keywords: [
      'top MBA colleges in Delhi NCR 2027',
      'best PGDM colleges in Delhi NCR',
      'MBA admission in Noida 2027',
      'MBA colleges in Greater Noida fees',
      'Gurgaon MBA colleges placement',
      'CAT cutoffs Delhi NCR MBA colleges',
      'low fees high placement MBA Delhi NCR',
      'direct MBA admission in Delhi NCR 2027',
      'AICTE approved PGDM Delhi NCR',
      'MBA colleges in Ghaziabad'
    ],
    geoCoordinates: {
      latitude: '28.6139',
      longitude: '77.2090',
      region: 'IN-DL',
      placename: 'Delhi NCR'
    },
    stats: {
      totalColleges: '120+ B-Schools',
      avgPlacement: '₹8.50 - ₹18.00 LPA',
      highestPlacement: '₹32.00 - ₹50.00 LPA',
      feeRange: '₹7.50L - ₹24.00L',
      topExams: ['CAT', 'XAT', 'CMAT', 'MAT', 'NMAT', 'CUET-PG']
    },
    cutoffsTable: [
      {
        collegeName: 'Management Development Institute (MDI) Gurgaon',
        exam: 'CAT / GMAT',
        cutoff: '95 - 97 %ile',
        fee: '₹24.50 Lakhs',
        avgPlacement: '₹26.70 LPA',
        slug: 'mdi-gurgaon'
      },
      {
        collegeName: 'FORE School of Management, New Delhi',
        exam: 'CAT / XAT / GMAT',
        cutoff: '85 - 88 %ile',
        fee: '₹18.90 Lakhs',
        avgPlacement: '₹14.50 LPA',
        slug: 'fore-school-delhi'
      },
      {
        collegeName: 'Birla Institute of Management Technology (BIMTECH)',
        exam: 'CAT / XAT / CMAT',
        cutoff: '75 - 80 %ile',
        fee: '₹14.00 Lakhs',
        avgPlacement: '₹11.25 LPA',
        slug: 'bimtech-greater-noida'
      },
      {
        collegeName: 'New Delhi Institute of Management (NDIM)',
        exam: 'CAT / MAT / CMAT / XAT',
        cutoff: '65 - 75 %ile',
        fee: '₹11.50 Lakhs',
        avgPlacement: '₹9.50 LPA',
        slug: 'ndim-delhi'
      },
      {
        collegeName: 'Fortune Institute of International Business (FIIB)',
        exam: 'CAT / XAT / MAT / CMAT',
        cutoff: '60 - 70 %ile',
        fee: '₹12.85 Lakhs',
        avgPlacement: '₹8.50 LPA',
        slug: 'fiib-delhi'
      },
      {
        collegeName: 'JIMS Rohini / Kalkaji',
        exam: 'CAT / MAT / CMAT',
        cutoff: '70 - 75 %ile',
        fee: '₹9.50 Lakhs',
        avgPlacement: '₹8.10 LPA',
        slug: 'jims-kalkaji'
      },
      {
        collegeName: 'Jaipuria Institute of Management, Noida',
        exam: 'CAT / CMAT / XAT / MAT',
        cutoff: '70 - 75 %ile',
        fee: '₹14.75 Lakhs',
        avgPlacement: '₹11.20 LPA',
        slug: 'jaipuria-noida'
      },
      {
        collegeName: 'GL Bajaj Institute of Management, Greater Noida',
        exam: 'CAT / MAT / CMAT',
        cutoff: '60 - 70 %ile',
        fee: '₹7.50 Lakhs',
        avgPlacement: '₹7.50 LPA',
        slug: 'gl-bajaj-greater-noida'
      }
    ],
    roiHighlights: [
      {
        title: 'Massive Corporate Density & Head Offices',
        description:
          'Delhi NCR is home to over 500 global MNC headquarters in Cyber City Gurgaon, Noida Expressways, and Central Delhi, offering unparalleled winter and summer internship opportunities.'
      },
      {
        title: 'Dual Specializations & Future-Ready Tracks',
        description:
          'Premier Delhi NCR B-Schools offer dynamic dual-specializations combining FinTech, Business Analytics, Digital Marketing, and Supply Chain with traditional majors.'
      },
      {
        title: 'Rapid ROI & High Average Stipends',
        description:
          'With living expenses moderated across Noida and Greater Noida metro corridors, students achieve average payback periods within 14 to 22 months post graduation.'
      }
    ],
    faqs: [
      {
        question: 'Which are the best MBA/PGDM colleges in Delhi NCR with fees under 12 Lakhs?',
        answer:
          'Top options with fees under ₹12 Lakhs and solid placement track records include New Delhi Institute of Management (NDIM), JIMS (Kalkaji/Rohini), GL Bajaj (Greater Noida), Accurate Institute, and FOSTIIMA Business School. These colleges deliver average placement packages between ₹7.5 LPA to ₹10.5 LPA.'
      },
      {
        question: 'What entrance exams are accepted by private PGDM colleges in Delhi NCR?',
        answer:
          'Most AICTE-approved PGDM colleges in Delhi NCR accept CAT, XAT, CMAT, MAT, ATMA, and CUET-PG scores. Elite colleges like MDI and FORE prioritize CAT/XAT, while institutions like NDIM, FIIB, JIMS, and Jaipuria also accept high MAT and CMAT percentiles.'
      },
      {
        question: 'Is PGDM better than MBA in Delhi NCR?',
        answer:
          'Yes, in Delhi NCR, AICTE-approved PGDM colleges frequently update their syllabus in consultation with corporate industry boards, incorporating AI tools, Bloomberg terminals, and live business analytics, giving PGDM graduates a competitive edge in campus recruitments over university-affiliated theoretical MBAs.'
      },
      {
        question: 'Can I get direct admission in MBA colleges in Delhi NCR without CAT?',
        answer:
          'Yes. Many reputed private business schools accept valid CMAT, MAT, ATMA, or their own aptitude assessments followed by GD-PI rounds. Mohit Jain provides 1-on-1 profile evaluations to help candidates secure direct merit seats.'
      }
    ],
    locationKeywords: ['delhi', 'noida', 'greater noida', 'gurgaon', 'gurugram', 'ghaziabad', 'faridabad']
  },

  'mumbai': {
    slug: 'mba-colleges-mumbai',
    hubKey: 'mumbai',
    route: '/colleges/mba-colleges-mumbai',
    cityName: 'Mumbai & Navi Mumbai',
    stateName: 'Maharashtra',
    tagline: 'Financial Capital of India · BSE, NSE, RBI & Top Investment Banks',
    heroTitle: 'Top MBA & PGDM Colleges in Mumbai 2027: Fees, Placements & Cutoffs',
    heroSubtitle:
      'Explore premier business schools in Mumbai, Navi Mumbai, and Thane. Check MAH MBA CET cutoffs, CAT/XAT eligibility, fee structures, and placement statistics for JBIMS, SPJIMR, NMIMS, Welingkar, SIES, and ITM.',
    metaTitle: 'Top MBA Colleges in Mumbai 2027: Fees, Cutoffs, Placements | CareerWithMohit',
    metaDescription:
      'Compare leading MBA & PGDM colleges in Mumbai for 2027 admissions. Check MAH CET cutoffs, fee structures, ROI, and average packages for JBIMS, NMIMS, Welingkar, ITM, and SIES.',
    keywords: [
      'top MBA colleges in Mumbai 2027',
      'best PGDM colleges in Mumbai',
      'MAH CET MBA cutoffs Mumbai',
      'MBA colleges in Navi Mumbai fees',
      'JBIMS Mumbai admission 2027',
      'Welingkar Mumbai PGDM fees',
      'low fees MBA colleges in Mumbai',
      'best finance MBA colleges in Mumbai',
      'direct MBA admission Mumbai 2027'
    ],
    geoCoordinates: {
      latitude: '19.0760',
      longitude: '72.8777',
      region: 'IN-MH',
      placename: 'Mumbai'
    },
    stats: {
      totalColleges: '90+ B-Schools',
      avgPlacement: '₹9.00 - ₹22.50 LPA',
      highestPlacement: '₹35.00 - ₹55.00 LPA',
      feeRange: '₹6.00L - ₹24.00L',
      topExams: ['MAH-CET', 'CAT', 'XAT', 'CMAT', 'NMAT', 'GMAT']
    },
    cutoffsTable: [
      {
        collegeName: 'Jamnalal Bajaj Institute of Management Studies (JBIMS)',
        exam: 'MAH MBA CET / CAT',
        cutoff: '99.90+ %ile',
        fee: '₹6.00 Lakhs',
        avgPlacement: '₹28.00 LPA',
        slug: 'jbims-mumbai'
      },
      {
        collegeName: 'SPJIMR Mumbai',
        exam: 'CAT / GMAT',
        cutoff: '85+ %ile (Profile-based)',
        fee: '₹22.50 Lakhs',
        avgPlacement: '₹33.00 LPA',
        slug: 'spjimr-mumbai'
      },
      {
        collegeName: 'NMIMS School of Business Management, Mumbai',
        exam: 'NMAT',
        cutoff: '235+ Score',
        fee: '₹24.00 Lakhs',
        avgPlacement: '₹26.60 LPA',
        slug: 'nmims-mumbai'
      },
      {
        collegeName: 'Prin. L.N. Welingkar Institute of Management (WeSchool)',
        exam: 'CAT / XAT / CMAT / MAH-CET',
        cutoff: '80 - 85 %ile',
        fee: '₹14.50 Lakhs',
        avgPlacement: '₹12.50 LPA',
        slug: 'welingkar-mumbai'
      },
      {
        collegeName: 'ITM Business School, Navi Mumbai (Kharghar)',
        exam: 'CAT / XAT / CMAT / MAT',
        cutoff: '65 - 75 %ile',
        fee: '₹12.45 Lakhs',
        avgPlacement: '₹8.65 LPA',
        slug: 'itm-mumbai'
      },
      {
        collegeName: 'SIES College of Management Studies, Navi Mumbai',
        exam: 'MAH-CET / CMAT / CAT',
        cutoff: '85 - 90 %ile',
        fee: '₹9.00 Lakhs',
        avgPlacement: '₹9.10 LPA',
        slug: 'sies-navi-mumbai'
      }
    ],
    roiHighlights: [
      {
        title: 'Unmatched Banking & Finance Capital Exposure',
        description:
          'Mumbai is the undisputed financial nerve-center of South Asia. Investment banking, wealth management, PE/VC funds, and fintech firms hire heavily from Mumbai B-Schools.'
      },
      {
        title: 'High-ROI State Level Seats via MAH CET',
        description:
          'Colleges like JBIMS and SIMSREE offer world-class placement packages (₹20-28 LPA) at subsidized government fees of just ₹6 Lakhs for 2 full years.'
      },
      {
        title: 'Navi Mumbai & Thane Modern Campus Corridors',
        description:
          'Navi Mumbai hubs like Kharghar and Belapur host expansive modern residential campuses offering world-class infrastructure and high placement outcomes.'
      }
    ],
    faqs: [
      {
        question: 'Which MBA colleges in Mumbai accept MAH CET scores for All India candidates?',
        answer:
          'All Maharashtra CAP round institutes including JBIMS, SIMSREE, PUMBA, Welingkar, SIES, and Xavier Institute accept MAH MBA CET scores for Maharashtra state candidates as well as All-India category seats.'
      },
      {
        question: 'What is the average placement package for PGDM in Mumbai?',
        answer:
          'Tier-1 institutes (JBIMS, SPJIMR, NMIMS) average ₹24-33 LPA. Established Tier-2 institutes (Welingkar, SIES, ITM, MET) deliver average packages between ₹8.5 LPA to ₹13.5 LPA with strong FMCG and BFSI hiring.'
      },
      {
        question: 'Is Kharghar Navi Mumbai a good location for MBA?',
        answer:
          'Yes, Kharghar is known as the educational hub of Navi Mumbai, home to major institutes like ITM Business School, NIFT, and Bharati Vidyapeeth, providing serene campus life and easy connectivity to Mumbai corporate corridors.'
      }
    ],
    locationKeywords: ['mumbai', 'navi mumbai', 'thane', 'kharghar', 'kurla', 'bkc', 'panvel', 'karjat']
  },

  'bangalore': {
    slug: 'mba-colleges-bangalore',
    hubKey: 'bangalore',
    route: '/colleges/mba-colleges-bangalore',
    cityName: 'Bangalore (Bengaluru)',
    stateName: 'Karnataka',
    tagline: 'Silicon Valley of India · Startups, Global Tech & Consulting Capital',
    heroTitle: 'Top MBA & PGDM Colleges in Bangalore 2027: Fees, Placements & ROI',
    heroSubtitle:
      'Compare the best management institutes in Bangalore. Review fees, average placement packages, AACSB accreditations, and CAT/XAT/MAT/KMAT cutoffs for IIMB, SIBM-B, JAGSoM, Alliance, ISBR, GIBS, IIBS, and ISME.',
    metaTitle: 'Top MBA Colleges in Bangalore 2027: Fees, Cutoffs, Placements | CareerWithMohit',
    metaDescription:
      'Discover top MBA & PGDM colleges in Bangalore for 2027. Compare fees, 2025 placements, tech consulting opportunities, and cutoffs for IIMB, JAGSoM, Alliance, ISBR, GIBS, and IIBS.',
    keywords: [
      'top MBA colleges in Bangalore 2027',
      'best PGDM colleges in Bangalore',
      'MBA admission in Bengaluru fees',
      'JAGSoM Bangalore PGDM fees',
      'Alliance University MBA admission',
      'ISBR Bangalore placements 2026',
      'KMAT MBA colleges Bangalore',
      'business analytics MBA Bangalore',
      'direct MBA admission Bangalore 2027'
    ],
    geoCoordinates: {
      latitude: '12.9716',
      longitude: '77.5946',
      region: 'IN-KA',
      placename: 'Bangalore'
    },
    stats: {
      totalColleges: '110+ B-Schools',
      avgPlacement: '₹8.80 - ₹19.50 LPA',
      highestPlacement: '₹30.00 - ₹52.00 LPA',
      feeRange: '₹6.50L - ₹21.00L',
      topExams: ['CAT', 'XAT', 'MAT', 'CMAT', 'KMAT', 'PGCET', 'NMAT']
    },
    cutoffsTable: [
      {
        collegeName: 'IIM Bangalore',
        exam: 'CAT / GMAT',
        cutoff: '99+ %ile',
        fee: '₹26.00 Lakhs',
        avgPlacement: '₹35.31 LPA',
        slug: 'iim-bangalore'
      },
      {
        collegeName: 'SIBM Bangalore (Symbiosis)',
        exam: 'SNAP',
        cutoff: '90 - 92 %ile',
        fee: '₹19.20 Lakhs',
        avgPlacement: '₹14.47 LPA',
        slug: 'sibm-bangalore'
      },
      {
        collegeName: 'JAGSoM Bangalore (AACSB Accredited)',
        exam: 'CAT / XAT / GMAT / MAT',
        cutoff: '75 - 80 %ile',
        fee: '₹17.50 Lakhs',
        avgPlacement: '₹10.90 LPA',
        slug: 'jagsom-bangalore'
      },
      {
        collegeName: 'Alliance School of Business, Bangalore',
        exam: 'CAT / MAT / CMAT / NMAT',
        cutoff: '70 - 75 %ile',
        fee: '₹18.00 Lakhs',
        avgPlacement: '₹10.50 LPA',
        slug: 'alliance-bangalore'
      },
      {
        collegeName: 'ISBR Business School (Electronic City)',
        exam: 'CAT / XAT / MAT / CMAT / KMAT',
        cutoff: '65 - 75 %ile',
        fee: '₹11.00 Lakhs',
        avgPlacement: '₹9.00 LPA',
        slug: 'isbr-bangalore'
      },
      {
        collegeName: 'GIBS Business School (Bannerghatta)',
        exam: 'CAT / MAT / CMAT / XAT',
        cutoff: '60 - 70 %ile',
        fee: '₹11.25 Lakhs',
        avgPlacement: '₹9.50 LPA',
        slug: 'gibs-bangalore'
      },
      {
        collegeName: 'ISME Bangalore (Sarjapur)',
        exam: 'CAT / XAT / CMAT / MAT',
        cutoff: '60 - 70 %ile',
        fee: '₹10.95 Lakhs',
        avgPlacement: '₹8.50 LPA',
        slug: 'isme-bangalore'
      },
      {
        collegeName: 'IIBS Bangalore (Airport Corridor)',
        exam: 'MAT / CMAT / KMAT / CAT',
        cutoff: '55 - 65 %ile',
        fee: '₹8.95 Lakhs',
        avgPlacement: '₹8.20 LPA',
        slug: 'iibs-bangalore'
      }
    ],
    roiHighlights: [
      {
        title: 'Leader in Business Analytics & Tech Product Roles',
        description:
          'Bangalore is the global tech product and SaaS capital. B-Schools here lead the nation in product management, consulting, and AI-driven business analytics curriculum.'
      },
      {
        title: 'Electronic City & Whitefield Tech Ecosystem',
        description:
          'Campuses located in Electronic City and Sarjapur enjoy walking proximity to Infosys, Wipro, HP, TCS, and Siemens, translating into continuous live corporate projects.'
      },
      {
        title: 'Global University Partnerships & Dual Degrees',
        description:
          'Institutes like JAGSoM, ISME, and Alliance have formal student exchange pathways with leading American and European universities.'
      }
    ],
    faqs: [
      {
        question: 'Which MBA specializations have highest demand in Bangalore?',
        answer:
          'Business Analytics & AI for Business, Digital Product Strategy, FinTech, and Tech-Consulting are in extraordinarily high demand across Bangalore recruiters, alongside traditional Marketing and Finance.'
      },
      {
        question: 'What is the KMAT cutoff for Bangalore PGDM colleges?',
        answer:
          'KMAT Karnataka is widely accepted by private institutions. A score of 60-75%ile is sufficient for top colleges like ISBR, GIBS, IIBS, and IBA for autonomous PGDM and Bangalore University MBA programs.'
      },
      {
        question: 'How do Bangalore MBA colleges compare to Delhi NCR?',
        answer:
          'Bangalore offers stronger opportunities in Tech, IT Consulting, Product Management, and Startups, whereas Delhi NCR is superior for FMCG, BFSI, Media, Real Estate, and Government/Public Sector consulting.'
      }
    ],
    locationKeywords: ['bangalore', 'bengaluru', 'electronic city', 'bannerghatta', 'sarjapur', 'anekal', 'kengeri', 'whitefield']
  },

  'pune': {
    slug: 'mba-colleges-pune',
    hubKey: 'pune',
    route: '/colleges/mba-colleges-pune',
    cityName: 'Pune',
    stateName: 'Maharashtra',
    tagline: 'Oxford of the East · Automotive, IT & Manufacturing Hub',
    heroTitle: 'Top MBA & PGDM Colleges in Pune 2027: Fees, Placements & Cutoffs',
    heroSubtitle:
      'Compare premier MBA and PGDM colleges in Pune. Check 2025-2026 placement statistics, SNAP and MAH CET cutoffs, fee structures, and ROI metrics for SIBM, SCMHRD, PUMBA, Balaji, PIBM, Indira, and DY Patil.',
    metaTitle: 'Top MBA Colleges in Pune 2027: Fees, Cutoffs, Placements | CareerWithMohit',
    metaDescription:
      'Find top MBA and PGDM colleges in Pune for 2027. Compare fees, placement reports (SIBM, PUMBA, SCMHRD, Indira, PIBM), cutoffs (SNAP, MAH CET, CAT), and book 1-on-1 counselling.',
    keywords: [
      'top MBA colleges in Pune 2027',
      'best PGDM colleges in Pune',
      'SIBM Pune placements 2026',
      'PUMBA Pune MBA fees',
      'low fees MBA colleges in Pune',
      'MAH CET MBA cutoff Pune',
      'direct MBA admission in Pune 2027',
      'Balaji Pune PGDM fees',
      'PIBM Pune placements'
    ],
    geoCoordinates: {
      latitude: '18.5204',
      longitude: '73.8567',
      region: 'IN-MH',
      placename: 'Pune'
    },
    stats: {
      totalColleges: '95+ B-Schools',
      avgPlacement: '₹8.00 - ₹24.00 LPA',
      highestPlacement: '₹28.00 - ₹45.00 LPA',
      feeRange: '₹2.50L - ₹24.00L',
      topExams: ['SNAP', 'MAH-CET', 'CAT', 'CMAT', 'XAT', 'MAT', 'ATMA']
    },
    cutoffsTable: [
      {
        collegeName: 'SIBM Pune (Symbiosis)',
        exam: 'SNAP',
        cutoff: '98.5+ %ile',
        fee: '₹24.50 Lakhs',
        avgPlacement: '₹26.77 LPA',
        slug: 'sibm-pune'
      },
      {
        collegeName: 'SCMHRD Pune (Symbiosis)',
        exam: 'SNAP',
        cutoff: '97+ %ile',
        fee: '₹23.90 Lakhs',
        avgPlacement: '₹23.71 LPA',
        slug: 'scmhrd-pune'
      },
      {
        collegeName: 'PUMBA (Pune University)',
        exam: 'MAH MBA CET / CAT',
        cutoff: '98.5+ %ile',
        fee: '₹1.30 Lakhs',
        avgPlacement: '₹8.60 LPA',
        slug: 'pumba-pune'
      },
      {
        collegeName: 'Indira Institute of Management (IIMP)',
        exam: 'MAH-CET / CMAT / CAT',
        cutoff: '85 - 90 %ile',
        fee: '₹8.50 Lakhs',
        avgPlacement: '₹7.50 LPA',
        slug: 'indira-engineering-pune'
      },
      {
        collegeName: 'Pune Institute of Business Management (PIBM)',
        exam: 'CAT / XAT / CMAT / MAT',
        cutoff: '65 - 75 %ile',
        fee: '₹9.45 Lakhs',
        avgPlacement: '₹7.80 LPA',
        slug: 'pibm-pune'
      },
      {
        collegeName: 'Dr. D.Y. Patil B-School, Pune (Tathawade)',
        exam: 'CAT / MAT / CMAT / XAT / ATMA',
        cutoff: '60 - 70 %ile',
        fee: '₹8.50 Lakhs',
        avgPlacement: '₹7.50 LPA',
        slug: 'dy-patil-b-school'
      },
      {
        collegeName: 'RIIM Pune (Arihant Group)',
        exam: 'MAT / CMAT / ATMA / CAT',
        cutoff: '55 - 65 %ile',
        fee: '₹6.50 Lakhs',
        avgPlacement: '₹6.80 LPA',
        slug: 'riim-pune'
      }
    ],
    roiHighlights: [
      {
        title: 'Hinjawadi IT Corridor & Auto Belt Synergies',
        description:
          'Pune houses India’s leading auto giants (Tata Motors, Bajaj, Mercedes) and massive IT clusters in Hinjawadi and Magarpatta, generating massive supply chain and tech marketing jobs.'
      },
      {
        title: 'Highest ROI B-School: PUMBA',
        description:
          'With course fees under ₹1.5 Lakhs and average placements exceeding ₹8.5 LPA, Pune University’s PUMBA delivers the highest mathematical return on education in Western India.'
      },
      {
        title: 'Student-Friendly Living Costs',
        description:
          'Hostel, food, and PG costs in Pune are 30-40% lower than South Mumbai or Central Delhi, making it an ideal destination for student budgets.'
      }
    ],
    faqs: [
      {
        question: 'Which are the best MBA colleges in Pune with low fees?',
        answer:
          'PUMBA (Department of Management Sciences, Pune University) has total fees of approximately ₹1.3 Lakhs with average placements around ₹8.6 LPA. COEP Pune and other government-aided university departments also offer exceptionally low fee structures.'
      },
      {
        question: 'What is the SNAP cutoff for SIBM Pune and SCMHRD?',
        answer:
          'SIBM Pune requires a SNAP percentile between 98.2 to 98.7%ile, while SCMHRD requires around 97%ile+. Both conduct rigorous GE-PI-WAT rounds.'
      },
      {
        question: 'Can I get direct admission in Pune MBA colleges?',
        answer:
          'Yes, private autonomous PGDM institutes like Dr. D.Y. Patil, PIBM, Indira, Balaji, and Suryadatta offer institutional quota/management seats based on graduation marks, entrance exam scores, and personal interviews.'
      }
    ],
    locationKeywords: ['pune', 'hinjawadi', 'hinjewadi', 'pimpri', 'chinchwad', 'wakad', 'tathawade', 'wagholi', 'bawdhan']
  },

  'hyderabad': {
    slug: 'mba-colleges-hyderabad',
    hubKey: 'hyderabad',
    route: '/colleges/mba-colleges-hyderabad',
    cityName: 'Hyderabad',
    stateName: 'Telangana',
    tagline: 'HITEC City & Cyberabad · Pharmaceutical, IT & FinTech Powerhouse',
    heroTitle: 'Top MBA & PGDM Colleges in Hyderabad 2027: Fees & Placements',
    heroSubtitle:
      'Discover top MBA and PGDM colleges in Hyderabad and Secunderabad. Compare fees, TS ICET and CAT cutoffs, accreditations, and placement stats for ISB, IPE, Vignana Jyothi, Badruka, and SIBM Hyderabad.',
    metaTitle: 'Top MBA Colleges in Hyderabad 2027: Fees, Cutoffs, Placements | CareerWithMohit',
    metaDescription:
      'Explore premier MBA & PGDM colleges in Hyderabad for 2027. Compare fees, TS ICET/CAT cutoffs, placement reports (ISB, IPE, VJIM, Badruka), and get 1-on-1 counselling.',
    keywords: [
      'top MBA colleges in Hyderabad 2027',
      'best PGDM colleges in Hyderabad',
      'TS ICET MBA colleges list',
      'IPE Hyderabad PGDM fees',
      'Vignana Jyothi VJIM placements',
      'low fees MBA colleges in Hyderabad',
      'direct MBA admission Hyderabad 2027'
    ],
    geoCoordinates: {
      latitude: '17.3850',
      longitude: '78.4867',
      region: 'IN-TG',
      placename: 'Hyderabad'
    },
    stats: {
      totalColleges: '75+ B-Schools',
      avgPlacement: '₹7.50 - ₹17.00 LPA',
      highestPlacement: '₹25.00 - ₹40.00 LPA',
      feeRange: '₹4.50L - ₹18.00L',
      topExams: ['TS-ICET', 'CAT', 'XAT', 'MAT', 'CMAT', 'ATMA', 'GMAT']
    },
    cutoffsTable: [
      {
        collegeName: 'Institute of Public Enterprise (IPE Hyderabad)',
        exam: 'CAT / XAT / CMAT / MAT / TS-ICET',
        cutoff: '70 - 75 %ile',
        fee: '₹8.15 Lakhs',
        avgPlacement: '₹7.80 LPA',
        slug: 'institute-of-public-enterprise'
      },
      {
        collegeName: 'Vignana Jyothi Institute of Management (VJIM)',
        exam: 'CAT / MAT / XAT / CMAT',
        cutoff: '65 - 75 %ile',
        fee: '₹8.00 Lakhs',
        avgPlacement: '₹7.50 LPA',
        slug: 'vignana-jyothi-institute-of-management'
      },
      {
        collegeName: 'SIBM Hyderabad (Symbiosis)',
        exam: 'SNAP',
        cutoff: '60 - 70 %ile',
        fee: '₹16.00 Lakhs',
        avgPlacement: '₹9.30 LPA',
        slug: 'sibm-hyderabad'
      },
      {
        collegeName: 'Badruka School of Management',
        exam: 'CAT / GMAT / XAT',
        cutoff: '65 - 75 %ile',
        fee: '₹14.00 Lakhs',
        avgPlacement: '₹9.00 LPA',
        slug: 'badruka-school-of-management'
      },
      {
        collegeName: 'Vishwa Vishwani Institute of Systems & Management',
        exam: 'MAT / CAT / CMAT / TS-ICET',
        cutoff: '55 - 65 %ile',
        fee: '₹6.90 Lakhs',
        avgPlacement: '₹6.50 LPA',
        slug: 'vishwa-vishwani-institute-of-systems-management'
      }
    ],
    roiHighlights: [
      {
        title: 'HITEC City & Gachibowli Tech-Pharma Corridor',
        description:
          'Hyderabad is the global hub for Microsoft, Google, Amazon India headquarters, and the largest pharmaceutical cluster in Asia (Genome Valley).'
      },
      {
        title: 'High ROI & Reasonable Living Costs',
        description:
          'Compared to Mumbai and Bangalore, rental and living costs in Hyderabad are 25-35% lower, giving students superior lifestyle value during their MBA.'
      }
    ],
    faqs: [
      {
        question: 'Which exams are accepted for MBA admission in Hyderabad?',
        answer:
          'For state-affiliated universities (Osmania, JNTU), TS ICET is required. For autonomous AICTE PGDM institutes like IPE, VJIM, and Badruka, national entrance tests (CAT, XAT, MAT, CMAT, ATMA) are widely accepted.'
      },
      {
        question: 'What is the fee structure for IPE Hyderabad?',
        answer:
          'Total tuition fee for the 2-year PGDM at Institute of Public Enterprise (IPE) is approximately ₹8.15 Lakhs, with average placement packages hovering around ₹7.8 LPA to ₹8.5 LPA.'
      }
    ],
    locationKeywords: ['hyderabad', 'secunderabad', 'gachibowli', 'hitec city', 'telangana']
  },

  'kolkata': {
    slug: 'mba-colleges-kolkata',
    hubKey: 'kolkata',
    route: '/colleges/mba-colleges-kolkata',
    cityName: 'Kolkata',
    stateName: 'West Bengal',
    tagline: 'Commercial & Financial Capital of Eastern India · FMCG & Analytics Hub',
    heroTitle: 'Top MBA & PGDM Colleges in Kolkata 2027: Fees, Cutoffs & Admissions',
    heroSubtitle:
      'Compare leading business schools in Kolkata. Check fee structures, placement packages, and CAT/MAT/JEMAT cutoffs for IIMC, Praxis, Globsyn, Calcutta Business School, BIBS, IEM, and Techno India.',
    metaTitle: 'Top MBA Colleges in Kolkata 2027: Fees, Cutoffs, Placements | CareerWithMohit',
    metaDescription:
      'Find top MBA & PGDM colleges in Kolkata for 2027. Compare fees, placement reports (Praxis, Globsyn, IIMC, BIBS, IEM), cutoffs, and get free admission guidance.',
    keywords: [
      'top MBA colleges in Kolkata 2027',
      'best PGDM colleges in Kolkata',
      'Praxis Business School Kolkata fees',
      'Globsyn Business School placements',
      'JEMAT MBA colleges list Kolkata',
      'low fees MBA colleges in Kolkata',
      'direct MBA admission Kolkata 2027'
    ],
    geoCoordinates: {
      latitude: '22.5726',
      longitude: '88.3639',
      region: 'IN-WB',
      placename: 'Kolkata'
    },
    stats: {
      totalColleges: '55+ B-Schools',
      avgPlacement: '₹7.00 - ₹16.50 LPA',
      highestPlacement: '₹22.00 - ₹35.00 LPA',
      feeRange: '₹4.00L - ₹16.00L',
      topExams: ['CAT', 'XAT', 'MAT', 'CMAT', 'JEMAT', 'ATMA']
    },
    cutoffsTable: [
      {
        collegeName: 'IIM Calcutta (Joka)',
        exam: 'CAT / GMAT',
        cutoff: '99+ %ile',
        fee: '₹27.00 Lakhs',
        avgPlacement: '₹35.07 LPA',
        slug: 'iim-calcutta'
      },
      {
        collegeName: 'Praxis Business School, Kolkata',
        exam: 'CAT / XAT / CMAT / MAT',
        cutoff: '65 - 75 %ile',
        fee: '₹9.90 Lakhs',
        avgPlacement: '₹9.40 LPA',
        slug: 'praxis-kolkata'
      },
      {
        collegeName: 'Globsyn Business School (GBS Kolkata)',
        exam: 'CAT / MAT / CMAT / XAT / JEMAT',
        cutoff: '60 - 70 %ile',
        fee: '₹8.70 Lakhs',
        avgPlacement: '₹7.50 LPA',
        slug: 'globsyn-kolkata'
      },
      {
        collegeName: 'Bengal Institute of Business Studies (BIBS)',
        exam: 'CAT / MAT / XAT / JEMAT',
        cutoff: '50 - 65 %ile',
        fee: '₹6.50 Lakhs',
        avgPlacement: '₹6.50 LPA',
        slug: 'bibs-kolkata'
      },
      {
        collegeName: 'Institute of Engineering & Management (IEM Kolkata)',
        exam: 'JEMAT / MAT / CAT',
        cutoff: '65 - 75 %ile',
        fee: '₹6.20 Lakhs',
        avgPlacement: '₹6.80 LPA',
        slug: 'iem-kolkata'
      }
    ],
    roiHighlights: [
      {
        title: 'Pioneer in Data Science & Business Analytics',
        description:
          'Kolkata B-Schools like Praxis were early pioneers in Analytics and Data Engineering education, building deep recruitment ties with PwC, EY, and Genpact analytics centers.'
      },
      {
        title: 'Gateway to FMCG & Retail Distribution Leaders',
        description:
          'Headquarters of ITC, Emami, Britannia regional offices, and tea boards make Kolkata the best location for field sales and supply chain management.'
      }
    ],
    faqs: [
      {
        question: 'What is JEMAT exam in West Bengal?',
        answer:
          'JEMAT (Joint Entrance Management Aptitude Test) is conducted by MAKAUT for admission into state university affiliated MBA programs in West Bengal.'
      },
      {
        question: 'Which college in Kolkata is best for Data Analytics PGDM?',
        answer:
          'Praxis Business School is widely regarded as one of India’s top institutions for Data Science and Business Analytics, consistently achieving top average compensation packages.'
      }
    ],
    locationKeywords: ['kolkata', 'salt lake', 'new town', 'joka', 'west bengal', 'durgapur']
  },

  'ahmedabad': {
    slug: 'mba-colleges-ahmedabad',
    hubKey: 'ahmedabad',
    route: '/colleges/mba-colleges-ahmedabad',
    cityName: 'Ahmedabad & Gandhinagar',
    stateName: 'Gujarat',
    tagline: 'Entrepreneurship Capital · Chemical, Pharma & GIFT City FinTech',
    heroTitle: 'Top MBA & PGDM Colleges in Ahmedabad 2027: Fees & Placements',
    heroSubtitle:
      'Compare premier management colleges across Ahmedabad, Gandhinagar, and Gujarat. Review fees, CMAT and CAT cutoffs, accreditations, and placement stats for IIMA, Nirma, EDII, Shanti Business School, and St. Kabir.',
    metaTitle: 'Top MBA Colleges in Ahmedabad 2027: Fees, Cutoffs, Placements | CareerWithMohit',
    metaDescription:
      'Compare top MBA & PGDM colleges in Ahmedabad & Gandhinagar for 2027. Check fees, Gujarat CMAT cutoffs, placement reports (Nirma, EDII, SBS, IIMA), and get direct counselling.',
    keywords: [
      'top MBA colleges in Ahmedabad 2027',
      'best PGDM colleges in Gujarat',
      'Nirma University MBA fees',
      'EDII Gandhinagar PGDM admission',
      'Gujarat CMAT MBA colleges list',
      'Shanti Business School Ahmedabad fees',
      'direct MBA admission Ahmedabad 2027'
    ],
    geoCoordinates: {
      latitude: '23.0225',
      longitude: '72.5714',
      region: 'IN-GJ',
      placename: 'Ahmedabad'
    },
    stats: {
      totalColleges: '60+ B-Schools',
      avgPlacement: '₹7.50 - ₹18.00 LPA',
      highestPlacement: '₹24.00 - ₹38.00 LPA',
      feeRange: '₹4.50L - ₹16.00L',
      topExams: ['CMAT', 'CAT', 'XAT', 'MAT', 'ATMA']
    },
    cutoffsTable: [
      {
        collegeName: 'IIM Ahmedabad (IIMA)',
        exam: 'CAT / GMAT',
        cutoff: '99.5+ %ile',
        fee: '₹26.00 Lakhs',
        avgPlacement: '₹34.36 LPA',
        slug: 'iim-ahmedabad'
      },
      {
        collegeName: 'Institute of Management, Nirma University',
        exam: 'CAT',
        cutoff: '80 - 85 %ile',
        fee: '₹12.50 Lakhs',
        avgPlacement: '₹12.20 LPA',
        slug: 'nirma-university'
      },
      {
        collegeName: 'Entrepreneurship Development Institute of India (EDII)',
        exam: 'CAT / MAT / CMAT / XAT',
        cutoff: '65 - 75 %ile',
        fee: '₹10.80 Lakhs',
        avgPlacement: '₹8.60 LPA',
        slug: 'entrepreneurship-development-institute-of-india'
      },
      {
        collegeName: 'Shanti Business School (SBS Ahmedabad)',
        exam: 'CAT / MAT / CMAT / ATMA',
        cutoff: '60 - 70 %ile',
        fee: '₹7.50 Lakhs',
        avgPlacement: '₹7.20 LPA',
        slug: 'shanti-business-school'
      },
      {
        collegeName: 'St. Kabir Institute of Professional Studies (SKIPS)',
        exam: 'CAT / CMAT / MAT / XAT',
        cutoff: '55 - 65 %ile',
        fee: '₹6.50 Lakhs',
        avgPlacement: '₹6.50 LPA',
        slug: 'st-kabir-institute-of-professional-studies'
      }
    ],
    roiHighlights: [
      {
        title: 'GIFT City FinTech SEZ & International Finance',
        description:
          'Gujarat International Finance Tec-City (GIFT City) is creating unprecedented corporate treasury, international banking, and fintech compliance roles.'
      },
      {
        title: 'Rich Entrepreneurial & Family Business Culture',
        description:
          'B-Schools in Ahmedabad excel in startup incubation, family managed business (FMB) grooming, and industrial operations.'
      }
    ],
    faqs: [
      {
        question: 'What is the cutoff for Nirma University MBA?',
        answer:
          'Nirma University Institute of Management shortlists candidates through CAT with typical cutoffs ranging between 80 to 85 percentile followed by personal interview rounds.'
      },
      {
        question: 'Does Gujarat ACPC conduct counselling for private PGDM?',
        answer:
          'Gujarat ACPC manages university-affiliated MBA seats. Autonomous AICTE PGDM institutes like EDII, Shanti Business School, and SKIPS conduct independent direct admissions.'
      }
    ],
    locationKeywords: ['ahmedabad', 'gandhinagar', 'vadodara', 'gujarat', 'surat']
  },

  'jaipur': {
    slug: 'mba-colleges-jaipur',
    hubKey: 'jaipur',
    route: '/colleges/mba-colleges-jaipur',
    cityName: 'Jaipur',
    stateName: 'Rajasthan',
    tagline: 'Pink City & Emerging Education Corridor · Healthcare, FMCG & Banking',
    heroTitle: 'Top MBA & PGDM Colleges in Jaipur 2027: Fees, Cutoffs & Admissions',
    heroSubtitle:
      'Compare premier business schools in Jaipur and Rajasthan. Review fee structures, CAT/CMAT/MAT cutoffs, and placements for Jaipuria Jaipur, Taxila Business School, JK Lakshmipat, FMS IRM, and IIHMR.',
    metaTitle: 'Top MBA Colleges in Jaipur 2027: Fees, Cutoffs, Placements | CareerWithMohit',
    metaDescription:
      'Explore top MBA & PGDM colleges in Jaipur for 2027. Compare fees, placement packages (Jaipuria, Taxila, IIHMR, JKLU), cutoffs, and get free expert counselling.',
    keywords: [
      'top MBA colleges in Jaipur 2027',
      'best PGDM colleges in Jaipur',
      'Jaipuria Jaipur MBA fees',
      'Taxila Business School Jaipur placements',
      'IIHMR University Jaipur health management',
      'low fees MBA colleges in Jaipur',
      'direct MBA admission Jaipur 2027'
    ],
    geoCoordinates: {
      latitude: '26.9124',
      longitude: '75.7873',
      region: 'IN-RJ',
      placename: 'Jaipur'
    },
    stats: {
      totalColleges: '45+ B-Schools',
      avgPlacement: '₹6.50 - ₹14.50 LPA',
      highestPlacement: '₹22.00 - ₹32.00 LPA',
      feeRange: '₹4.00L - ₹14.00L',
      topExams: ['CAT', 'CMAT', 'MAT', 'XAT', 'ATMA']
    },
    cutoffsTable: [
      {
        collegeName: 'Jaipuria Institute of Management, Jaipur',
        exam: 'CAT / CMAT / XAT / MAT',
        cutoff: '70 - 75 %ile',
        fee: '₹12.75 Lakhs',
        avgPlacement: '₹11.08 LPA',
        slug: 'jaipuria-institute-of-management-jaipur'
      },
      {
        collegeName: 'IIHMR University, Jaipur (Healthcare Management)',
        exam: 'CAT / MAT / CMAT / ATMA / GPAT',
        cutoff: '60 - 70 %ile',
        fee: '₹11.50 Lakhs',
        avgPlacement: '₹9.20 LPA',
        slug: 'iihmr-university'
      },
      {
        collegeName: 'Taxila Business School, Jaipur',
        exam: 'CAT / CMAT / MAT / XAT',
        cutoff: '65 - 75 %ile',
        fee: '₹10.50 Lakhs',
        avgPlacement: '₹11.50 LPA',
        slug: 'taxila-jaipur'
      },
      {
        collegeName: 'JK Lakshmipat University (HSSB Jaipur)',
        exam: 'CAT / XAT / MAT / CMAT',
        cutoff: '60 - 70 %ile',
        fee: '₹9.00 Lakhs',
        avgPlacement: '₹8.00 LPA',
        slug: 'hari-shankar-singhania-school-of-business-jk-lakshmipat-university'
      },
      {
        collegeName: 'FMS IRM Jaipur (Institute of Rural Management)',
        exam: 'CAT / MAT / CMAT',
        cutoff: '55 - 65 %ile',
        fee: '₹7.20 Lakhs',
        avgPlacement: '₹6.80 LPA',
        slug: 'fms-irm-jaipur'
      }
    ],
    roiHighlights: [
      {
        title: 'Global Leadership in Healthcare & Hospital Management',
        description:
          'IIHMR Jaipur is recognized globally as the premier institution for MBA in Hospital Management, Pharmaceutical Management, and Health Economics.'
      },
      {
        title: 'Cost-Effective Living & High Quality Campus Life',
        description:
          'Jaipur provides modern residential campus infrastructure with substantially lower living expenses compared to metro hubs.'
      }
    ],
    faqs: [
      {
        question: 'Which college in Jaipur is best for Healthcare and Hospital Management?',
        answer:
          'IIHMR University Jaipur is the benchmark institution in South Asia for MBA in Hospital and Health Management, partnering with WHO and UNICEF with 100% placement track record.'
      },
      {
        question: 'What is the average placement at Jaipuria Institute of Management Jaipur?',
        answer:
          'Jaipuria Jaipur records an average placement package of ₹11.08 LPA across central placements with prominent recruiters including Deloitte, ICICI, HDFC, and Amazon.'
      }
    ],
    locationKeywords: ['jaipur', 'rajasthan', 'jodhpur', 'udaipur', 'kota']
  }
};

export function getAllGeoHubs(): GeoMbaHub[] {
  return Object.values(GEO_MBA_HUBS);
}

export function getGeoHubBySlug(slug: string): GeoMbaHub | null {
  const cleanSlug = slug.replace(/^mba-colleges-/, '');
  return GEO_MBA_HUBS[cleanSlug] || Object.values(GEO_MBA_HUBS).find(h => h.slug === slug) || null;
}
