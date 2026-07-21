export interface MbaPgdmCollege {
  name: string;
  universitySlug: string;
  location: string;
  fee: string;
  feeNum: number;
  accreditation: string;
  programs: string[];
  badge: string;
  grade: string;
  gradeColor: string;
  about: string;
  highlights: string[];
  duration: string;
  mode: string;
  approvals: string;
  whatsapp: string;
  slug?: string;
  specializations?: Record<string, string[]>;
}

export const MBA_PGDM_COLLEGES_2027: MbaPgdmCollege[] = [
  {
    name: 'New Delhi Institute of Management (NDIM)',
    universitySlug: 'ndim-delhi',
    location: 'Tughlakabad, South Delhi',
    fee: '₹11.50 Lakhs (Total)',
    feeNum: 1150000,
    accreditation: 'AICTE Approved · NBA Accredited · AIU Equivalent',
    programs: ['PGDM', 'PGDM Marketing', 'PGDM Finance'],
    badge: '100% Placements',
    grade: 'AIU Eq.',
    gradeColor: 'from-blue-600 to-indigo-800',
    about: 'NDIM has been rated as a premier B-School in India for multiple years. Backed by corporate advisory boards and top-tier recruiters, NDIM offers deep industry-immersion, dual-specialization options, and high career outcomes.',
    highlights: ['UGC-AIU declared MBA Equivalent', 'Double Specialization options available', '300+ recruiters on campus', 'Excellent South Delhi campus life'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Corporate Immersion',
    approvals: 'AICTE, NBA, AIU, Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['FinTech', 'Business Analytics', 'Marketing & Digital Media', 'HR Management', 'Logistics & Supply Chain', 'Treasury & Investment Banking'],
      'PGDM Marketing': ['Digital Marketing', 'Brand Management', 'Consumer Insights'],
      'PGDM Finance': ['Investment Banking', 'Wealth Management', 'Corporate Finance']
    }
  },
  {
    name: 'FOSTIIMA Business School',
    universitySlug: 'fostiima-business-school',
    location: 'Dwarka, West Delhi',
    fee: '₹9.75 Lakhs (Total)',
    feeNum: 975000,
    accreditation: 'AICTE Approved · Founded by IIMA Alumni',
    programs: ['PGDM'],
    badge: 'IIM Alumni Legacy',
    grade: 'A Rated',
    gradeColor: 'from-amber-500 to-orange-700',
    about: 'FOSTIIMA was founded by alumni of IIM Ahmedabad to provide top-quality management education. Featuring an active pan-IIM network of faculty, it ensures high-quality training and strong placement linkages in the corporate sector.',
    highlights: ['Faculty from IIM & IIT pools', 'Focus on practical business models', 'Strong placements in top-tier companies', 'Located close to Dwarka Metro Station'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Case-study Method',
    approvals: 'AICTE Approved, Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Marketing Management', 'Financial Management', 'Human Resource Management', 'International Business', 'Operations & Analytics']
    }
  },
  {
    name: 'Fortune Institute of International Business (FIIB)',
    universitySlug: 'fiib-delhi',
    location: 'Vasant Vihar, South Delhi',
    fee: '₹10.80 Lakhs (Total)',
    feeNum: 1080000,
    accreditation: 'AICTE Approved · NBA Accredited · AACSB Member',
    programs: ['PGDM', 'PGDM Financial Management'],
    badge: 'AACSB Member',
    grade: 'NBA Acc.',
    gradeColor: 'from-purple-600 to-violet-800',
    about: 'FIIB is a leading business school situated in South Delhi. With accreditation from NBA and global membership of AACSB, it boasts an experiential curriculum focused on future-ready digital competencies.',
    highlights: ['AACSB Business Education Alliance Member', 'Experiential learning & international collaborations', 'Vibrant campus in premium Vasant Vihar', 'Strong corporate mentoring program'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Digital Learning Hybrid',
    approvals: 'AICTE, NBA, AIU, AACSB Member',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Business Analytics', 'Digital Marketing', 'Financial Technologies', 'Human Resource Management', 'Strategy & Entrepreneurship'],
      'PGDM Financial Management': ['Investment Analysis', 'Risk Management', 'Banking & Financial Services']
    }
  },
  {
    name: 'IILM Institute for Higher Education',
    universitySlug: 'iilm-lodhi-road',
    location: 'Lodhi Road, Central Delhi',
    fee: '₹12.90 Lakhs (Total)',
    feeNum: 1290000,
    accreditation: 'AICTE Approved · NBA Accredited · SAQS Accredited',
    programs: ['PGDM'],
    badge: 'Central Delhi',
    grade: 'SAQS Acc.',
    gradeColor: 'from-rose-500 to-red-700',
    about: 'Located in the heart of Lutyens\' Delhi, IILM Lodhi Road offers a rich heritage of management education since 1993. It is renowned for its global curriculum standards, highly credentialed faculty, and outstanding executive placements.',
    highlights: ['Prime Central Delhi location', 'Triple crown legacy in management education', 'SAQS & NBA international/national accreditations', 'Strong start-up incubation support'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Executive Interaction',
    approvals: 'AICTE, NBA, AIU Equivalent, SAQS',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Marketing & Innovation', 'FinTech & Analytics', 'Human Resource Leadership', 'Operations & Supply Chain', 'Family Business Management']
    }
  },
  {
    name: 'JIMS Kalkaji (Jagannath International)',
    universitySlug: 'jims-kalkaji',
    location: 'Kalkaji, South Delhi',
    fee: '₹9.30 Lakhs (Total)',
    feeNum: 930000,
    accreditation: 'AICTE Approved · NBA Accredited · NAAC Accredited',
    programs: ['PGDM', 'PGDM International Business'],
    badge: 'High ROI B-School',
    grade: 'NAAC Acc.',
    gradeColor: 'from-emerald-500 to-teal-700',
    about: 'JIMS Kalkaji is highly ranked among top business schools in North India. Providing a balance of theoretical and practical business knowledge, it features stellar corporate placements and global study exchange partnerships.',
    highlights: ['NBA Accredited PGDM programs', 'Ranked among top private B-schools in NCR', 'Strong placement record with high packages', 'Dual specialization available'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Corporate Live Projects',
    approvals: 'AICTE, NBA, AIU, NAAC Accredited',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Marketing', 'Finance', 'Human Resource', 'Entrepreneurship & Retail'],
      'PGDM International Business': ['Global Supply Chain', 'Export-Import Management', 'International Finance']
    }
  },
  {
    name: 'Management Education & Research Institute (MERI)',
    universitySlug: 'meri-janakpuri',
    location: 'Janakpuri, West Delhi',
    fee: '₹5.50 Lakhs (Total)',
    feeNum: 550000,
    accreditation: 'AICTE Approved · NAAC Grade A Rated',
    programs: ['PGDM', 'MBA'],
    badge: 'Affordable PGDM',
    grade: 'Grade A',
    gradeColor: 'from-cyan-500 to-blue-700',
    about: 'MERI Janakpuri is a prominent educational institution in West Delhi. Focused on high academic rigor and affordable fee packages, MERI provides a robust platform for students seeking careers in corporate houses, PSUs, and banks.',
    highlights: ['NAAC Grade A accredited', 'Affordable fee structure with high ROI', 'Modern infrastructure next to Metro', 'Active cultural and business clubs'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Practical Projects',
    approvals: 'AICTE Approved, GGSIPU Affiliated (for MBA), Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Marketing', 'Finance', 'Human Resource Management', 'Information Technology'],
      'MBA': ['Financial Management', 'Marketing Management', 'HR Management', 'Systems']
    }
  },
  {
    name: 'New Delhi Institute of Info Tech & Management (NDIIT)',
    universitySlug: 'ndiit-kalkaji',
    location: 'Kalkaji, South Delhi',
    fee: '₹5.80 Lakhs (Total)',
    feeNum: 580000,
    accreditation: 'AICTE Approved B-School',
    programs: ['PGDM'],
    badge: 'Tech & Digital Focus',
    grade: 'Approved',
    gradeColor: 'from-indigo-500 to-purple-700',
    about: 'NDIIT Kalkaji focuses on creating tech-savvy management professionals. Combining core management studies with advanced digital skills (like Data Science, Analytics, and FinTech), NDIIT grooms leaders for modern digital corporations.',
    highlights: ['Curriculum aligned to Digital Business trends', 'Affordable fees in South Delhi', 'Experienced core and guest faculty', 'Frequent industrial workshops'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Digital Labs',
    approvals: 'AICTE Approved, Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Marketing & Digital Media', 'Banking & Finance', 'Human Resources', 'Business Analytics & IT']
    }
  },
  {
    name: 'Delhi School of Business (VIPS-TC)',
    universitySlug: 'delhi-school-of-business',
    location: 'Pitampura, North-West Delhi',
    fee: '₹10.25 Lakhs (Total)',
    feeNum: 1025000,
    accreditation: 'AICTE Approved · NBA Accredited · VIPS Brand Support',
    programs: ['PGDM'],
    badge: 'Premier Campus',
    grade: 'NBA Acc.',
    gradeColor: 'from-violet-600 to-indigo-900',
    about: 'Delhi School of Business (DSB), situated inside the state-of-the-art VIPS Pitampura campus, is a highly modern management institution. Supported by top-tier facilities and a massive alumni network, DSB focuses heavily on analytics and new-age skills.',
    highlights: ['Premium campus infrastructure in North Delhi', 'Advanced Financial and Analytics Labs', 'Strong linkage with MNCs and Tech firms', 'Recognized by AIU as equivalent to MBA'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Analytical Case Studies',
    approvals: 'AICTE, NBA Accredited, AIU Equivalent',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Business Analytics & Big Data', 'Financial Management', 'Marketing & Sales', 'HR Management', 'Operations & Supply Chain']
    }
  },
  {
    name: 'EMPI Business School',
    universitySlug: 'empi-chattarpur',
    location: 'Chattarpur, South Delhi',
    fee: '₹8.95 Lakhs (Total)',
    feeNum: 895000,
    accreditation: 'AICTE Approved · Residential B-School',
    programs: ['PGDM'],
    badge: 'Residential Campus',
    grade: 'A Rated',
    gradeColor: 'from-orange-500 to-amber-700',
    about: 'EMPI is known for its spacious, fully-residential campus in Chattarpur, South Delhi. Driven by its "Innovation Culture", EMPI features modern research labs and global alliances (especially with Japanese corporations) for unique corporate placements.',
    highlights: ['Fully residential campus in South Delhi', 'Japan-centric corporate placement pathways', 'Dedicated Innovation & Incubation Center', 'Focus on Advertising & Analytical skills'],
    duration: '2 Years (Full-Time)',
    mode: 'Residential Classroom & Practice Labs',
    approvals: 'AICTE Approved, Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Advertising & Communication', 'Research & Business Analytics', 'Global Business (with Japan options)', 'Finance & HR Management']
    }
  },
  {
    name: 'Institute of Marketing & Management (IMM)',
    universitySlug: 'imm-qutab',
    location: 'Qutab Institutional Area, South Delhi',
    fee: '₹8.75 Lakhs (Total)',
    feeNum: 875000,
    accreditation: 'AICTE Approved · Established in 1969',
    programs: ['PGDM'],
    badge: '50+ Years Legacy',
    grade: 'Estd. 1969',
    gradeColor: 'from-pink-600 to-rose-800',
    about: 'IMM, established in 1969, holds a stellar legacy of over five decades in business education. Located in the elite Qutab Institutional Area, IMM is a premier hub for marketing-led management courses and strong alumni networking.',
    highlights: ['Located in prime Qutab Institutional hub', 'Vast legacy of 50+ years of management alumni', 'Heavy emphasis on marketing, branding & PR', 'Top placement assistance in South Delhi'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Live Corporate Projects',
    approvals: 'AICTE Approved, Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Marketing & Digital Branding', 'Financial Management', 'HR & Corporate Strategy', 'International Business', 'Operations & Logistics']
    }
  },
  {
    name: 'Maharaja Agrasen Institute of Management Studies (MAIMS)',
    universitySlug: 'maims-rohini',
    location: 'Rohini, North-West Delhi',
    fee: '₹4.50 Lakhs (Total)',
    feeNum: 450000,
    accreditation: 'AICTE Approved · NAAC Grade A Rated',
    programs: ['PGDM', 'MBA'],
    badge: 'Top Academic Brand',
    grade: 'Grade A',
    gradeColor: 'from-emerald-600 to-green-800',
    about: 'Maharaja Agrasen is a landmark campus in Rohini, Delhi. Famous for academic rigor, disciplined educational model, and premium campus infrastructure, MAIMS offers one of the most cost-effective and highly recognized degrees in Northern Delhi.',
    highlights: ['Stellar campus facilities in Rohini', 'Excellent academic results and record placements', 'Highly qualified regular faculty', 'Affordable fee with massive ROI'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Academic Rigor',
    approvals: 'AICTE Approved, GGSIPU Affiliated (for MBA), NAAC Grade A',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['General Management', 'Marketing', 'Finance', 'Human Resource Management'],
      'MBA': ['Financial Markets', 'Marketing Management', 'HR Analytics', 'IT & Systems']
    }
  },
  {
    name: 'ASM Apeejay School of Management',
    universitySlug: 'asm-apeejay-dwarka',
    location: 'Dwarka, West Delhi',
    fee: '₹9.90 Lakhs (Total)',
    feeNum: 990000,
    accreditation: 'AICTE Approved · NBA Accredited · ACBSP (USA) Accredited',
    programs: ['PGDM'],
    badge: 'ACBSP USA Accredited',
    grade: 'NBA Acc.',
    gradeColor: 'from-blue-600 to-indigo-900',
    about: 'Apeejay School of Management is highly accredited, carrying the prestigious ACBSP (USA) accreditation. Driven by Apeejay Stya legacy, ASM combines global management paradigms with a highly sophisticated campus layout in Dwarka.',
    highlights: ['ACBSP (USA) internationally accredited', 'Apeejay Education Legacy (50+ institutions)', 'State of the art Dwarka campus near Sector 9', 'Stellar MNC placements and corporate networks'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Global Case-Studies',
    approvals: 'AICTE, NBA Accredited, ACBSP Global, AIU Equivalent',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Marketing & E-Commerce', 'Financial Markets & Banking', 'Human Resource Analytics', 'Operations & Business Analytics', 'International Business']
    }
  }
];
