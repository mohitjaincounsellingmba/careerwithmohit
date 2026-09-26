export interface MegaMenuLink {
  title: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  desc?: string;
}

export interface MegaMenuCategory {
  id: string;
  label: string;
  shortLabel?: string;
  iconName?: string;
  links: MegaMenuLink[];
}

export interface FeaturedCollegeItem {
  name: string;
  location: string;
  badge: string;
  badgeColor?: string;
  href: string;
  packageInfo?: string;
  ranking?: string;
}

export interface MegaMenuItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  categories: MegaMenuCategory[];
  featuredColleges: FeaturedCollegeItem[];
  promoBanner?: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
    badge?: string;
  };
}

export const MEGA_MENU_DATA: MegaMenuItem[] = [
  // ───────────────────────────────────────────
  // 1. MBA / MANAGEMENT
  // ───────────────────────────────────────────
  {
    id: 'mba',
    label: 'MBA',
    href: '/mba-pgdm-admission-2027',
    badge: '2027 Open',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    categories: [
      {
        id: 'top-ranked',
        label: 'Top Ranked Colleges',
        iconName: 'Award',
        links: [
          { title: 'Top MBA Colleges in India', href: '/top-tier-mba-colleges', badge: 'Tier-1' },
          { title: 'Top Private MBA Colleges in India', href: '/colleges?ownership=private&category=mba' },
          { title: 'Top MBA Colleges in Delhi NCR', href: '/colleges/mba-colleges-delhi-ncr', badge: 'Hot' },
          { title: 'Top MBA Colleges in Bangalore', href: '/colleges/mba-colleges-bangalore' },
          { title: 'Top MBA Colleges in Mumbai', href: '/colleges/mba-colleges-mumbai' },
          { title: 'Top MBA Colleges in Pune', href: '/colleges/mba-colleges-pune', badge: 'Popular' },
          { title: 'Top MBA Colleges in Hyderabad', href: '/colleges/mba-colleges-hyderabad' },
          { title: 'Top MBA Colleges in Chennai', href: '/colleges?city=Chennai&category=mba' },
          { title: 'Top MBA Colleges in Kolkata', href: '/colleges/mba-colleges-kolkata' },
          { title: 'Top MBA Colleges in Ahmedabad', href: '/colleges/mba-colleges-ahmedabad' },
          { title: 'Top MBA Colleges in Jaipur', href: '/colleges/mba-colleges-jaipur' },
          { title: 'Top MBA Colleges in Chandigarh', href: '/colleges?city=Chandigarh&category=mba' },
          { title: 'Top MBA Colleges in Maharashtra', href: '/colleges/mba-colleges-pune' },
          { title: 'Top MBA Colleges in Kerala', href: '/colleges?city=Kochi&category=mba' },
          { title: 'Top 20 IIMs & XLRI Cutoffs', href: '/top-tier-mba-colleges?tab=iim', badge: 'IIMs' },
          { title: 'High ROI B-Schools (Fees < ₹10L)', href: '/colleges?budget=under-10l', badge: 'High ROI' },
        ],
      },
      {
        id: 'colleges-by-location',
        label: 'Colleges By Location',
        iconName: 'MapPin',
        links: [
          { title: 'Top MBA Colleges in Delhi NCR', href: '/colleges/mba-colleges-delhi-ncr', badge: '50+ B-Schools' },
          { title: 'Top MBA Colleges in Mumbai', href: '/colleges/mba-colleges-mumbai' },
          { title: 'Top MBA Colleges in Pune', href: '/colleges/mba-colleges-pune' },
          { title: 'Top MBA Colleges in Bangalore', href: '/colleges/mba-colleges-bangalore' },
          { title: 'Top MBA Colleges in Hyderabad', href: '/colleges/mba-colleges-hyderabad' },
          { title: 'Top MBA Colleges in Chennai', href: '/colleges?city=Chennai&category=mba' },
          { title: 'Top MBA Colleges in Kolkata', href: '/colleges/mba-colleges-kolkata' },
          { title: 'Top MBA Colleges in Ahmedabad', href: '/colleges/mba-colleges-ahmedabad' },
          { title: 'Top MBA Colleges in Jaipur', href: '/colleges/mba-colleges-jaipur' },
          { title: 'Top MBA Colleges in Chandigarh & Mohali', href: '/colleges?city=Chandigarh&category=mba' },
          { title: 'Top MBA Colleges in Lucknow & Kanpur', href: '/colleges?city=Lucknow&category=mba' },
          { title: 'Top MBA Colleges in Indore & Bhopal', href: '/colleges?city=Indore&category=mba' },
          { title: 'State-wise MBA Admissions Hub', href: '/mba-pgdm-admissions-by-region', badge: 'All States' },
        ],
      },
      {
        id: 'popular-courses',
        label: 'Popular Courses',
        iconName: 'BookOpen',
        links: [
          { title: 'MBA / PGDM (2-Year Flagship)', href: '/mba-pgdm-admission-2027', badge: '2027-29' },
          { title: 'Executive MBA (For Working Professionals)', href: '/colleges?category=mba' },
          { title: 'UGC-DEB Online MBA Degrees', href: '/online-degree-certification', badge: 'UGC Entitled' },
          { title: 'Distance MBA Programs in India', href: '/online-degree-certification' },
          { title: 'Global 1-Year Fast Track MBA', href: '/abroad-education' },
          { title: 'Dual Specialization MBA / PGDM', href: '/mba-pgdm-admission-2027' },
          { title: 'Part-Time & Weekend MBA', href: '/online-degree-certification' },
        ],
      },
      {
        id: 'popular-specializations',
        label: 'Popular Specializations',
        iconName: 'Layers',
        links: [
          { title: 'MBA in Finance & Banking', href: '/colleges?category=mba', badge: 'Highest CTC' },
          { title: 'MBA in Marketing & Digital Strategy', href: '/colleges?category=mba' },
          { title: 'MBA in Business Analytics & Big Data', href: '/colleges?category=mba', badge: 'Trending' },
          { title: 'MBA in Human Resource Management (HR)', href: '/colleges?category=mba' },
          { title: 'MBA in Operations & Supply Chain', href: '/colleges?category=mba' },
          { title: 'MBA in International Business (IB)', href: '/colleges?category=mba' },
          { title: 'MBA in Information Technology (IT)', href: '/colleges?category=mba' },
          { title: 'MBA in Healthcare & Hospital Management', href: '/colleges?category=mba' },
          { title: 'MBA in FinTech & Quantitative Finance', href: '/colleges?category=mba' },
        ],
      },
      {
        id: 'exams',
        label: 'Exams',
        iconName: 'Target',
        links: [
          { title: 'CAT 2026-27 Free CBT Mock Test', href: '/cat-mock-test', badge: 'Full CBT' },
          { title: 'XAT 2027 Free CBT Mock Test', href: '/xat-mock-test' },
          { title: 'MAT 2026-27 Free CBT Mock Test', href: '/mat-mock-test' },
          { title: 'SNAP 2026 Free CBT Mock Test', href: '/snap-mock-test' },
          { title: 'NMAT by GMAC Mock Test', href: '/nmat-mock-test' },
          { title: 'ATMA Free Mock Test & Score', href: '/atma-mock-test' },
          { title: 'GMAT Computer Adaptive Mock Test', href: '/gmat-mock-test' },
          { title: 'Explore All 50+ CBT Mock Tests', href: '/mock-tests', badge: '100% Free' },
        ],
      },
      {
        id: 'compare-colleges',
        label: 'Compare Colleges',
        iconName: 'Scale',
        links: [
          { title: 'Compare Any 2 MBA Colleges Tool', href: '/colleges/compare', badge: 'AI Tool' },
          { title: 'IIM Ahmedabad vs IIM Bangalore', href: '/colleges/compare?c1=iim-ahmedabad&c2=iim-bangalore' },
          { title: 'FMS Delhi vs MDI Gurgaon', href: '/colleges/compare?c1=fms-delhi&c2=mdi-gurgaon' },
          { title: 'SIBM Pune vs NMIMS Mumbai', href: '/colleges/compare?c1=sibm-pune&c2=nmims-mumbai' },
          { title: 'BIMTECH Greater Noida vs FORE School', href: '/colleges/compare?c1=bimtech-greater-noida&c2=fore-school-delhi' },
          { title: 'JIMS Rohini vs NDIM New Delhi', href: '/colleges/compare?c1=jims-rohini&c2=ndim-delhi' },
        ],
      },
      {
        id: 'college-reviews',
        label: 'College Reviews',
        iconName: 'MessageSquare',
        links: [
          { title: 'Top 50 MBA Colleges Honest Reviews', href: '/blog', badge: 'Verified' },
          { title: 'Delhi NCR B-School Placement Truths', href: '/blog' },
          { title: 'Pune MBA Colleges Ground Realities', href: '/blog' },
          { title: 'Bangalore Management College Reviews', href: '/blog' },
          { title: 'Audited Placements vs Claimed CTC Reports', href: '/blog', badge: 'Audit' },
          { title: 'Write & Submit a Student Review', href: '/community' },
        ],
      },
      {
        id: 'cat-predictor',
        label: 'CAT Percentile Predictor',
        iconName: 'Calculator',
        links: [
          { title: 'CAT 2026 Score & Percentile Calculator', href: '/tools/cat-score-calculator', badge: 'Popular' },
          { title: 'MAT Scaled Score Calculator (Out of 800)', href: '/tools/mat-score-calculator' },
          { title: 'XAT Score & Percentile Predictor', href: '/tools/xat-score-calculator-2027' },
          { title: 'MBA Form Combo Discount Calculator', href: '/mba-application-form-discount', badge: 'Save ₹5k+' },
          { title: 'MBA ROI & Fee Payback Calculator', href: '/colleges' },
        ],
      },
      {
        id: 'college-predictors',
        label: 'College Predictors',
        iconName: 'Compass',
        links: [
          { title: 'MBA Direct Admission 2027 Hub', href: '/mba-pgdm-admission-2027', badge: 'Direct Entry' },
          { title: 'MBA Form Discount Bundle (Save ₹5,000+)', href: '/mba-application-form-discount' },
          { title: 'High ROI B-Schools (Fees < ₹10L)', href: '/colleges?budget=under-10l' },
          { title: 'Top 20 IIMs & XLRI Cutoff Predictor', href: '/top-tier-mba-colleges' },
          { title: 'CUET PG MBA Predictor', href: '/tools/cuet-pg-mba-predictor' },
        ],
      },
      {
        id: 'counselling',
        label: 'Ask Mohit / Counselling',
        iconName: 'Video',
        links: [
          { title: 'Book Free 1-on-1 Google Meet Session', href: '/book-session', badge: 'Free Video' },
          { title: 'WhatsApp Direct Mentorship (+91 95600 20771)', href: 'https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20MBA%20admission%20guidance' },
          { title: 'Free Profile Evaluation & Shortlisting', href: '/inquiry' },
          { title: 'Join 10,000+ Student Community on Telegram', href: '/community' },
        ],
      },
    ],
    featuredColleges: [
      {
        name: 'International Institute of Management Studies (IIMS)',
        location: 'Pune, Maharashtra',
        badge: 'Highest: ₹26.00 LPA',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        href: '/colleges/iims-pune',
        packageInfo: 'Avg: ₹7.5 LPA · 100% Placements',
        ranking: 'AICTE Approved · NAAC Accredited',
      },
      {
        name: 'Jagan Institute of Management Studies (JIMS Rohini)',
        location: 'Rohini, Delhi NCR',
        badge: 'Avg: ₹8.50 LPA',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        href: '/colleges/jims-rohini',
        packageInfo: 'Highest: ₹22.0 LPA · Top Delhi B-School',
        ranking: 'NAAC A Grade · NBA Accredited',
      },
      {
        name: 'Chandigarh University (CU)',
        location: 'Mohali / Chandigarh',
        badge: 'NAAC A+ Accredited',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        href: '/colleges/cgc-university-mohali',
        packageInfo: 'Global Tie-ups · Top ROI',
        ranking: 'NIRF Top 30 · Admissions Open',
      },
      {
        name: 'Great Lakes Institute of Management',
        location: 'Gurgaon & Chennai',
        badge: 'Avg: ₹15.80 LPA',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        href: '/colleges/great-lakes-gurgaon',
        packageInfo: 'AMBA Accredited · Fast Track 1-Yr / 2-Yr',
        ranking: 'Top 10 Private B-School',
      },
    ],
    promoBanner: {
      title: 'Confused about B-School selection?',
      subtitle: 'Get 100% unbiased admissions roadmap & application discounts with Mohit Jain.',
      ctaText: 'Book Free 1-on-1 Meet',
      ctaHref: '/book-session',
      badge: 'Free Video Call',
    },
  },

  // ───────────────────────────────────────────
  // 2. ENGINEERING / B.TECH
  // ───────────────────────────────────────────
  {
    id: 'engineering',
    label: 'ENGINEERING',
    href: '/colleges?category=btech',
    badge: 'JEE 2026',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    categories: [
      {
        id: 'top-ranked',
        label: 'Top Ranked Colleges',
        iconName: 'Award',
        links: [
          { title: 'Top Engineering Colleges in India', href: '/colleges?category=btech', badge: 'NIRF Top' },
          { title: 'Top B.Tech Colleges in Delhi NCR', href: '/colleges/top-engineering-colleges-in-delhi', badge: 'Hot' },
          { title: 'Top Engineering Colleges in Bangalore', href: '/colleges?city=Bangalore&category=btech' },
          { title: 'Top Engineering Colleges in Pune', href: '/colleges?city=Pune&category=btech' },
          { title: 'Top Engineering Colleges in Hyderabad', href: '/colleges?city=Hyderabad&category=btech' },
          { title: 'Top Engineering Colleges in Chennai', href: '/colleges?city=Chennai&category=btech' },
          { title: 'Top Engineering Colleges in Mumbai', href: '/colleges?city=Mumbai&category=btech' },
          { title: 'Top Private Engineering Colleges in India', href: '/colleges?ownership=private&category=btech' },
          { title: 'Top IITs, NITs & IIITs Directory', href: '/colleges?category=btech', badge: 'Elite' },
        ],
      },
      {
        id: 'popular-branches',
        label: 'Popular Branches / B.Tech',
        iconName: 'Cpu',
        links: [
          { title: 'B.Tech Computer Science & Engg (CSE)', href: '/colleges?category=btech', badge: 'Most In-Demand' },
          { title: 'B.Tech in Artificial Intelligence & ML (AI/ML)', href: '/colleges?category=btech', badge: 'Trending' },
          { title: 'B.Tech in Data Science & Big Data', href: '/colleges?category=btech' },
          { title: 'B.Tech Electronics & Communication (ECE)', href: '/colleges?category=btech' },
          { title: 'B.Tech Information Technology (IT)', href: '/colleges?category=btech' },
          { title: 'B.Tech Mechanical Engineering', href: '/colleges?category=btech' },
          { title: 'B.Tech Civil Engineering', href: '/colleges?category=btech' },
          { title: 'B.Tech Electrical & Electronics (EEE)', href: '/colleges?category=btech' },
        ],
      },
      {
        id: 'engineering-exams',
        label: 'Engineering Entrance Exams',
        iconName: 'Target',
        links: [
          { title: 'JEE Main 2026 Free CBT Mock Test', href: '/tools/jee-main-mock-test', badge: 'Full CBT' },
          { title: 'JEE Advanced Free CBT Mock Test', href: '/tools/jee-advanced-mock-test' },
          { title: 'BITSAT 2026 Free Mock Test', href: '/tools/bitsat-mock-test' },
          { title: 'MHT CET Engineering Exam Guide', href: '/tools/mhcet-mock-test' },
          { title: 'VITEEE / SRMJEEE Entrance Guide', href: '/blog' },
          { title: 'COMEDK & KCET Karnataka Guide', href: '/blog' },
        ],
      },
      {
        id: 'predictors-cutoffs',
        label: 'Predictors & Cutoffs',
        iconName: 'Calculator',
        links: [
          { title: 'B.Tech College Predictor by JEE Rank', href: '/tools/btech-college-predictor', badge: 'AI Tool' },
          { title: 'IIT & NIT Cutoffs & Opening/Closing Ranks', href: '/colleges?category=btech' },
          { title: 'Private B.Tech Direct Admission Guide', href: '/colleges?category=btech' },
          { title: 'Engineering College Comparison Tool', href: '/colleges/compare' },
        ],
      },
    ],
    featuredColleges: [
      {
        name: 'New Horizon College of Engineering',
        location: 'Bangalore, Karnataka',
        badge: 'Highest: ₹45.00 LPA',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        href: '/colleges/nhce-bangalore',
        packageInfo: 'Top Bangalore Autonomous Engg Institute',
        ranking: 'NAAC A Grade · NBA Accredited',
      },
      {
        name: 'SRM University Delhi-NCR',
        location: 'Sonepat (Delhi NCR)',
        badge: 'Admissions Open 2026',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        href: '/colleges/srm-institute-of-science-and-technology-kattankulathur',
        packageInfo: 'Top Placements · Global Tech Partners',
        ranking: 'NAAC A+ Grade · Top Private Univ',
      },
      {
        name: 'Amity School of Engineering & Technology',
        location: 'Noida (Delhi NCR)',
        badge: 'Top 3% Globally',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        href: '/colleges/amity-noida',
        packageInfo: 'Industry Co-op · Modern Labs',
        ranking: 'WASC & NAAC A+ Accredited',
      },
      {
        name: 'Vellore Institute of Technology (VIT)',
        location: 'Vellore & Chennai',
        badge: 'NIRF Top 10',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        href: '/colleges/vit-vellore',
        packageInfo: 'Super Dream Placements ₹1 Cr+',
        ranking: 'Institute of Eminence (IoE)',
      },
    ],
    promoBanner: {
      title: 'Planning B.Tech Admissions 2026?',
      subtitle: 'Predict top engineering colleges based on your JEE rank and budget.',
      ctaText: 'Use B.Tech Predictor',
      ctaHref: '/tools/btech-college-predictor',
      badge: 'Instant Result',
    },
  },

  // ───────────────────────────────────────────
  // 3. DESIGN
  // ───────────────────────────────────────────
  {
    id: 'design',
    label: 'DESIGN',
    href: '/colleges?category=design',
    badge: 'B.Des / M.Des',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    categories: [
      {
        id: 'top-design-colleges',
        label: 'Top Design Colleges',
        iconName: 'Award',
        links: [
          { title: 'Top Design Colleges in India', href: '/colleges?category=design', badge: 'All India' },
          { title: 'Top Design Colleges in Delhi NCR', href: '/colleges?city=Delhi&category=design', badge: 'Hub' },
          { title: 'Top Design Colleges in Mumbai', href: '/colleges?city=Mumbai&category=design' },
          { title: 'Top Design Colleges in Bangalore', href: '/colleges?city=Bangalore&category=design' },
          { title: 'Top Design Colleges in Pune', href: '/colleges?city=Pune&category=design' },
          { title: 'Top Design Colleges in Ahmedabad', href: '/colleges?city=Ahmedabad&category=design' },
          { title: 'Top Fashion & Interior Design Institutes', href: '/colleges?category=design' },
          { title: 'National Institutes of Design (NID & NIFT)', href: '/colleges?category=design', badge: 'Govt Top' },
        ],
      },
      {
        id: 'design-specializations',
        label: 'Popular Specializations',
        iconName: 'Layers',
        links: [
          { title: 'B.Des in UI/UX & Interaction Design', href: '/colleges?category=design', badge: 'High Salary' },
          { title: 'B.Des in Graphic Design & Visual Media', href: '/colleges?category=design' },
          { title: 'B.Des in Fashion Design & Styling', href: '/colleges?category=design' },
          { title: 'B.Des in Product & Industrial Design', href: '/colleges?category=design' },
          { title: 'B.Des in Animation, VFX & Game Design', href: '/colleges?category=design', badge: 'Trending' },
          { title: 'B.Des in Interior & Spatial Design', href: '/colleges?category=design' },
          { title: 'M.Des Masters in Design Programs', href: '/colleges?category=design' },
        ],
      },
      {
        id: 'design-exams',
        label: 'Design Entrance Exams',
        iconName: 'Target',
        links: [
          { title: 'UCEED & CEED Exam Preparation Guide', href: '/blog', badge: 'IIT Design' },
          { title: 'NID DAT (Design Aptitude Test) Guide', href: '/blog' },
          { title: 'NIFT Entrance Examination Pattern', href: '/blog' },
          { title: 'SEED (Symbiosis Entrance Exam for Design)', href: '/blog' },
          { title: 'Pearl Academy Design Entrance (PAF)', href: '/blog' },
        ],
      },
      {
        id: 'portfolio-prep',
        label: 'Portfolio & Studio Prep',
        iconName: 'BookOpen',
        links: [
          { title: 'Design Portfolio Review & Studio Guidance', href: '/book-session', badge: 'Expert Call' },
          { title: 'Top UI/UX Salaries & Placement Report 2026', href: '/blog' },
          { title: 'NID Studio Test & Personal Interview Prep', href: '/blog' },
        ],
      },
    ],
    featuredColleges: [
      {
        name: 'Pearl Academy',
        location: 'Delhi NCR, Mumbai & Jaipur',
        badge: 'Premier Design Institute',
        badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
        href: '/colleges/pearl-academy-delhi',
        packageInfo: 'Global Tie-ups · Top Fashion & UI/UX',
        ranking: 'Ranked #1 Private Design Institute',
      },
      {
        name: 'Symbiosis Institute of Design (SID)',
        location: 'Pune, Maharashtra',
        badge: 'SEED Entrance',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        href: '/colleges/symbiosis-centre-for-management-studies-scms-pune',
        packageInfo: 'B.Des in Communication & Industrial Design',
        ranking: 'Symbiosis International University',
      },
      {
        name: 'National Institute of Design (NID)',
        location: 'Ahmedabad, Gujarat',
        badge: 'Institute of National Importance',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        href: '/colleges?category=design',
        packageInfo: 'Pioneer of Design Education in India',
        ranking: 'Govt Autonomous · Top Global Rep',
      },
    ],
    promoBanner: {
      title: 'Looking for Top UI/UX & Design Colleges?',
      subtitle: 'Schedule a free session to shortlist design colleges and prepare your portfolio.',
      ctaText: 'Get Design Guidance',
      ctaHref: '/book-session',
      badge: 'Free Advisory',
    },
  },

  // ───────────────────────────────────────────
  // 4. LAW
  // ───────────────────────────────────────────
  {
    id: 'law',
    label: 'LAW',
    href: '/colleges?category=law',
    badge: 'CLAT 2026',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    categories: [
      {
        id: 'top-law-colleges',
        label: 'Top Law Colleges',
        iconName: 'Award',
        links: [
          { title: 'Top Law Colleges in India', href: '/colleges?category=law', badge: 'NIRF Law' },
          { title: 'Top Law Colleges in Delhi NCR', href: '/colleges?city=Delhi&category=law', badge: 'Hub' },
          { title: 'Top Law Colleges in Bangalore', href: '/colleges?city=Bangalore&category=law' },
          { title: 'Top Law Colleges in Pune', href: '/colleges?city=Pune&category=law' },
          { title: 'Top Law Colleges in Mumbai', href: '/colleges?city=Mumbai&category=law' },
          { title: 'Top Law Colleges in Hyderabad', href: '/colleges?city=Hyderabad&category=law' },
          { title: 'Top 26 National Law Universities (NLUs)', href: '/colleges?category=law', badge: 'NLUs' },
          { title: 'Top Private Law Colleges in India', href: '/colleges?ownership=private&category=law' },
        ],
      },
      {
        id: 'law-programs',
        label: 'Law Degrees & Programs',
        iconName: 'BookOpen',
        links: [
          { title: '5-Year Integrated BA LLB (Hons)', href: '/colleges?category=law', badge: 'Popular' },
          { title: '5-Year Integrated BBA LLB (Hons)', href: '/colleges?category=law' },
          { title: '3-Year LLB (After Graduation)', href: '/colleges?category=law' },
          { title: 'LLM in Corporate & Commercial Law', href: '/colleges?category=law', badge: 'High Package' },
          { title: 'LLM in Cyber Law & Intellectual Property (IPR)', href: '/colleges?category=law' },
          { title: 'LLM in Constitutional & Criminal Law', href: '/colleges?category=law' },
        ],
      },
      {
        id: 'law-exams',
        label: 'Law Entrance Exams',
        iconName: 'Target',
        links: [
          { title: 'CLAT 2026-27 UG & PG Strategy', href: '/blog', badge: 'All NLUs' },
          { title: 'AILET (NLU Delhi) Entrance Guide', href: '/blog' },
          { title: 'SLAT (Symbiosis Law Aptitude Test)', href: '/blog' },
          { title: 'LSAT India Preparation Tips', href: '/blog' },
          { title: 'MHCET Law 5-Year & 3-Year Guide', href: '/blog' },
        ],
      },
    ],
    featuredColleges: [
      {
        name: 'Symbiosis Law School (SLS)',
        location: 'Pune & Noida',
        badge: 'SLAT Entrance',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        href: '/colleges?category=law',
        packageInfo: 'Top Corporate Law Placements',
        ranking: 'NIRF Top 5 Law School',
      },
      {
        name: 'Jindal Global Law School (JGLS)',
        location: 'Sonipat (Delhi NCR)',
        badge: 'QS World Rank #1 in India',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        href: '/colleges?category=law',
        packageInfo: 'International Faculty · Top Law Firms',
        ranking: 'Institution of Eminence',
      },
      {
        name: 'National Law School of India University (NLSIU)',
        location: 'Bangalore, Karnataka',
        badge: 'NIRF #1 Law School',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        href: '/colleges?category=law',
        packageInfo: 'Premier NLU of India · 100% Placements',
        ranking: 'National Law School',
      },
    ],
    promoBanner: {
      title: 'Aiming for NLUs & Top Law Schools?',
      subtitle: 'Get expert guidance on CLAT cutoffs and direct admissions in top private law colleges.',
      ctaText: 'Talk to Law Advisor',
      ctaHref: '/book-session',
      badge: '1-on-1 Guidance',
    },
  },

  // ───────────────────────────────────────────
  // 5. ONLINE DEGREES
  // ───────────────────────────────────────────
  {
    id: 'online-degrees',
    label: 'ONLINE DEGREES',
    href: '/online-degree-certification',
    badge: 'UGC-DEB',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    categories: [
      {
        id: 'top-online-programs',
        label: 'Top Online Programs',
        iconName: 'Laptop',
        links: [
          { title: 'UGC-DEB Approved Online MBA', href: '/online-degree-certification', badge: 'Most Popular' },
          { title: 'Online BBA Degree Programs', href: '/online-degree-certification' },
          { title: 'Online MCA with AI & Cloud Specialization', href: '/online-degree-certification', badge: 'Tech Career' },
          { title: 'Online BCA Degree for Tech Starters', href: '/online-degree-certification' },
          { title: 'Online B.Com & M.Com Degrees', href: '/online-degree-certification' },
          { title: 'Online Data Science & AI Master', href: '/online-degree-certification', badge: 'Trending' },
          { title: 'Online Executive MBA (1-Year)', href: '/online-degree-certification' },
          { title: 'Executive Post Graduate Diplomas (PGDM)', href: '/online-degree-certification' },
        ],
      },
      {
        id: 'accreditations-validity',
        label: 'Accreditation & Approvals',
        iconName: 'ShieldCheck',
        links: [
          { title: 'University UGC-DEB Entitlement Checker', href: '/tools/accreditation-checker', badge: 'Verify Univ' },
          { title: 'NAAC A++ & A+ Online Universities List', href: '/online-degree-certification' },
          { title: 'AICTE & WES Approval for Jobs Abroad', href: '/online-degree-certification' },
          { title: 'Govt Job & UPSC Validity of Online Degrees', href: '/blog' },
          { title: 'Free Degree Fitment Assessment', href: '/online-degree-certification', badge: 'Free Tool' },
        ],
      },
      {
        id: 'online-specializations',
        label: 'Online MBA Specializations',
        iconName: 'Layers',
        links: [
          { title: 'Online MBA in Finance & FinTech', href: '/online-degree-certification' },
          { title: 'Online MBA in Business Analytics & AI', href: '/online-degree-certification', badge: 'Hot' },
          { title: 'Online MBA in Digital Marketing', href: '/online-degree-certification' },
          { title: 'Online MBA in Human Resource Management', href: '/online-degree-certification' },
          { title: 'Online MBA in Operations & Supply Chain', href: '/online-degree-certification' },
          { title: 'Online MBA in International Business', href: '/online-degree-certification' },
        ],
      },
    ],
    featuredColleges: [
      {
        name: 'Amity University Online',
        location: 'Noida (Delhi NCR)',
        badge: 'NAAC A+ · UGC-DEB',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        href: '/online-degree-certification',
        packageInfo: 'Online MBA, MCA, BBA · Global Live Classes',
        ranking: 'Top Ranked Online Univ in India',
      },
      {
        name: 'Manipal University Online',
        location: 'Jaipur / Manipal',
        badge: 'NAAC A+ · 100% Placement Support',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        href: '/online-degree-certification',
        packageInfo: 'Coursera Access · Industry Mentors',
        ranking: 'Legacy of 70+ Years in Education',
      },
      {
        name: 'DY Patil University Online',
        location: 'Navi Mumbai / Pune',
        badge: 'NAAC A++ Accredited',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        href: '/online-degree-certification',
        packageInfo: 'Flexible Online Exams · Affordable Fees',
        ranking: 'UGC-DEB Approved Degrees',
      },
      {
        name: 'Jain University Online',
        location: 'Bangalore, Karnataka',
        badge: 'NAAC A++ · Global Curriculum',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        href: '/online-degree-certification',
        packageInfo: 'UK Body Exemptions · LinkedIn Learning',
        ranking: 'NIRF Ranked University',
      },
    ],
    promoBanner: {
      title: 'Upgrade your career while working',
      subtitle: 'Compare 40+ UGC-DEB approved Online MBA & MCA programs with 0% EMI options.',
      ctaText: 'Compare Online Degrees',
      ctaHref: '/online-degree-certification',
      badge: '0% EMI Available',
    },
  },

  // ───────────────────────────────────────────
  // 6. ABROAD EDUCATION
  // ───────────────────────────────────────────
  {
    id: 'abroad-education',
    label: 'ABROAD EDUCATION',
    href: '/abroad-education',
    badge: 'Study Abroad',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    categories: [
      {
        id: 'top-destinations',
        label: 'Top Study Destinations',
        iconName: 'Globe',
        links: [
          { title: 'Study in USA (STEM MS, MBA & BS)', href: '/abroad-education/study-in-usa', badge: '3-Yr OPT' },
          { title: 'Study in UK (1-Year Masters & PSW Visa)', href: '/abroad-education/study-in-uk', badge: '1-Yr MS' },
          { title: 'Study in Canada (PGWP & PR Pathway)', href: '/abroad-education/study-in-canada' },
          { title: 'Study in Germany (Zero Tuition Fees)', href: '/abroad-education/study-in-germany', badge: 'Free Tuition' },
          { title: 'Study in Australia (Top Group of 8 Univs)', href: '/abroad-education/study-in-australia' },
          { title: 'Study in Ireland (European Tech Hub)', href: '/abroad-education/study-in-ireland' },
          { title: 'Study in Singapore & Dubai', href: '/abroad-education' },
          { title: 'Study in France & Netherlands', href: '/abroad-education' },
        ],
      },
      {
        id: 'abroad-programs',
        label: 'Top Degree Programs',
        iconName: 'GraduationCap',
        links: [
          { title: 'MS in Computer Science & AI in USA/Germany', href: '/abroad-education', badge: 'High ROI' },
          { title: 'Global MBA & MiM Programs Abroad', href: '/abroad-education' },
          { title: 'MS in Data Analytics & Business Analytics', href: '/abroad-education' },
          { title: '1-Year Fast Track Masters in UK & Ireland', href: '/abroad-education/study-in-uk' },
          { title: 'Bachelors (BS/BBA) Abroad after 12th', href: '/abroad-education' },
        ],
      },
      {
        id: 'global-exams',
        label: 'Global Entrance Exams',
        iconName: 'Target',
        links: [
          { title: 'IELTS Free CBT Mock Test & Band Predictor', href: '/ielts-mock-test', badge: 'Free CBT' },
          { title: 'Duolingo English Test (DET) Mock Exam', href: '/duolingo-mock-test', badge: 'Adaptive' },
          { title: 'GMAT Computer Adaptive Mock Test', href: '/gmat-mock-test' },
          { title: 'GRE Quantitative & Verbal Prep Guide', href: '/blog' },
          { title: 'TOEFL iBT Free Mock Test', href: '/mock-tests' },
        ],
      },
      {
        id: 'admissions-visa',
        label: 'Free Services & Guidance',
        iconName: 'CheckCircle2',
        links: [
          { title: '100% Free Profile Evaluation with Mohit', href: '/book-session', badge: 'Free Video' },
          { title: 'SOP, LOR & Resume Crafting Support', href: '/tools/ats-resume-builder' },
          { title: 'Scholarships up to $30,000 USD Abroad', href: '/scholarships-2026', badge: 'Scholarships' },
          { title: 'Student Visa (F1/Tier 4) & Interview Guidance', href: '/inquiry' },
          { title: 'Education Loan Assistance (0 Collateral)', href: '/inquiry' },
        ],
      },
    ],
    featuredColleges: [
      {
        name: 'Top US Universities (STEM Programs)',
        location: 'United States',
        badge: '3-Year Post Study OPT',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        href: '/abroad-education/study-in-usa',
        packageInfo: 'Avg Starting Salary: $95,000 / year',
        ranking: 'Top 100 Global QS Ranked',
      },
      {
        name: 'Public Universities in Germany',
        location: 'Germany (Europe)',
        badge: 'Zero / Very Low Tuition Fees',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        href: '/abroad-education/study-in-germany',
        packageInfo: '18-Month Job Search Visa · Tech Capital',
        ranking: 'TU9 German Universities',
      },
      {
        name: 'Russell Group Universities (UK)',
        location: 'United Kingdom',
        badge: '1-Year Fast Track Masters',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        href: '/abroad-education/study-in-uk',
        packageInfo: '2-Year Graduate Route Work Visa',
        ranking: 'World Renowned Research Univs',
      },
    ],
    promoBanner: {
      title: 'Planning to Study Abroad in 2026-27?',
      subtitle: 'Get end-to-end profile evaluation, university shortlisting and visa support at ₹0 cost.',
      ctaText: 'Free Abroad Consultation',
      ctaHref: '/book-session',
      badge: '100% Free',
    },
  },

  // ───────────────────────────────────────────
  // 7. COLLEGE REVIEWS
  // ───────────────────────────────────────────
  {
    id: 'college-reviews',
    label: 'COLLEGE REVIEWS',
    href: '/blog',
    badge: 'Audited Truth',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    categories: [
      {
        id: 'reviews-by-stream',
        label: 'Reviews By Stream',
        iconName: 'BookOpen',
        links: [
          { title: 'Top 50 MBA Colleges Honest Reviews 2027', href: '/blog', badge: 'Audited' },
          { title: 'B.Tech Engineering College Ground Realities', href: '/blog' },
          { title: 'BBA & Early Career Colleges Reviews', href: '/blog' },
          { title: 'Top Law Schools & NLUs Ground Feedback', href: '/blog' },
          { title: 'Design & Architecture Institutes Review', href: '/blog' },
          { title: 'Online MBA & Degree Ground Reviews', href: '/blog' },
        ],
      },
      {
        id: 'reviews-by-city',
        label: 'Reviews By City',
        iconName: 'MapPin',
        links: [
          { title: 'Delhi NCR B-School Placement Truths', href: '/blog', badge: 'Delhi Hub' },
          { title: 'Pune MBA Colleges Ground Reality Reports', href: '/blog', badge: 'Pune Hub' },
          { title: 'Bangalore B-Schools Student Feedback', href: '/blog' },
          { title: 'Mumbai Management Colleges Rating', href: '/blog' },
          { title: 'Hyderabad & Chennai College Reviews', href: '/blog' },
          { title: 'Kolkata & Ahmedabad B-School Audits', href: '/blog' },
        ],
      },
      {
        id: 'placement-truth',
        label: 'Placement & ROI Audits',
        iconName: 'Scale',
        links: [
          { title: 'Audited Placement CTC vs Claimed Packages', href: '/blog', badge: 'Must Read' },
          { title: 'Hidden Fees Breakdown in Private B-Schools', href: '/blog' },
          { title: 'Faculty Quality & Real Student Rating', href: '/blog' },
          { title: 'Hostel, Campus Life & Infrastructure Reality', href: '/blog' },
          { title: 'Write a Verified Student Review', href: '/community', badge: 'Submit Review' },
        ],
      },
    ],
    featuredColleges: [
      {
        name: 'Mohit Jain Unbiased Video Reviews',
        location: 'Ground Reality Series',
        badge: '100% Unfiltered',
        badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
        href: '/blog',
        packageInfo: 'Actual Median CTCs · Real Student Voice',
        ranking: 'Trusted by 50,000+ Students',
      },
      {
        name: 'ROI & Fee Payback Audit 2027',
        location: 'All India Analysis',
        badge: 'Fee vs Placement',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        href: '/colleges?budget=under-10l',
        packageInfo: 'Find B-Schools that recover fees in < 18 mos',
        ranking: 'Audited Metrics',
      },
    ],
    promoBanner: {
      title: 'Want real feedback on any college?',
      subtitle: 'Talk directly to Mohit Jain before paying your admission confirmation token fee.',
      ctaText: 'Verify College with Mohit',
      ctaHref: '/book-session',
      badge: 'Save ₹Lakhs',
    },
  },
];
