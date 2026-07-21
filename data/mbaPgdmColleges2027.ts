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
  },
  {
    name: 'Jaipuria School of Business (JSB)',
    universitySlug: 'jaipuria-school-of-business-ghaziabad',
    location: 'Indirapuram, Ghaziabad',
    fee: '₹7.90 Lakhs (Total)',
    feeNum: 790000,
    accreditation: 'AICTE Approved · Jaipuria Legacy Brand',
    programs: ['PGDM'],
    badge: 'Jaipuria Legacy',
    grade: 'Approved',
    gradeColor: 'from-amber-600 to-amber-800',
    about: 'Jaipuria School of Business (JSB), located in Indirapuram, Ghaziabad, is a premier PGDM institution under the Jaipuria Group of Educational Institutions. JSB offers an industry-centric curriculum, dual specialization pathways, and strong corporate networks for excellent placement outcomes.',
    highlights: ['Part of the prestigious Jaipuria Education Group', 'Highly active corporate mentoring & guest lectures', 'Modern Indirapuram campus close to Noida/Delhi border', 'Focus on industry readiness and real-world internships'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Case-study Approach',
    approvals: 'AICTE Approved, Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Marketing & Digital Media', 'Financial Services', 'Human Resource Management', 'Business Analytics & IT', 'Operations & Supply Chain']
    }
  },
  {
    name: 'ITS Ghaziabad (Mohan Nagar)',
    universitySlug: 'its-ghaziabad-mohan-nagar',
    location: 'Mohan Nagar, Ghaziabad',
    fee: '₹2.75L - ₹6.50L (Total)',
    feeNum: 650000,
    accreditation: 'AICTE Approved · NBA Accredited · NAAC Grade A',
    programs: ['MBA', 'PGDM'],
    badge: 'NAAC Grade A',
    grade: 'Grade A',
    gradeColor: 'from-rose-600 to-rose-900',
    about: 'ITS Ghaziabad (Institute of Technology & Science) is a highly prominent B-school located in Mohan Nagar, Ghaziabad. ITS offers both a university-affiliated MBA and an autonomous AICTE-approved PGDM, characterized by high placement records and excellent student growth models.',
    highlights: ['NAAC Grade A accredited B-school', 'Affordable university-affiliated MBA and autonomous PGDM', 'Strong industrial visit schedules and outbound training', 'Stellar placement record in manufacturing, IT, and FMCG sectors'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Outbound Industry Training',
    approvals: 'AICTE Approved, Affiliated to AKTU (for MBA), NAAC Grade A, NBA',
    whatsapp: '919560020771',
    specializations: {
      'MBA': ['Marketing Management', 'Financial Management', 'Human Resource Management', 'Information Technology', 'International Business'],
      'PGDM': ['Marketing & Sales', 'Corporate Finance', 'Human Resource Capital', 'Business Analytics', 'Digital Business']
    }
  },
  {
    name: 'Jaipuria Institute of Management',
    universitySlug: 'jaipuria-noida',
    location: 'Sector 62, Noida',
    fee: '₹14.50 Lakhs (Total)',
    feeNum: 1450000,
    accreditation: 'AICTE Approved · NBA Accredited · AIU Equivalent',
    programs: ['PGDM', 'PGDM Service Management', 'PGDM Marketing'],
    badge: 'Flagship Noida',
    grade: 'AIU Eq.',
    gradeColor: 'from-amber-500 to-amber-700',
    about: 'Jaipuria Institute of Management Noida is the flagship campus of the Jaipuria Group. It is highly ranked for PGDM courses, carrying NBA accreditation and AIU MBA equivalence. Known for international immersion and premium corporate connections.',
    highlights: ['AIU recognized MBA Equivalence', 'Top 50 NIRF ranked B-School', 'Stellar placement packages in MNCs', 'Modern campus in Noida Tech Hub'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & International Immersion',
    approvals: 'AICTE, NBA Accredited, AIU Equivalent',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Marketing & Brand Strategy', 'Financial Services', 'Human Resources Capital', 'Business Analytics', 'Operations Management'],
      'PGDM Service Management': ['Retail Management', 'FinTech', 'Service Analytics'],
      'PGDM Marketing': ['Digital Marketing', 'Consumer Insights', 'Sales & Distribution']
    }
  },
  {
    name: 'Hierank Business School',
    universitySlug: 'hierank-noida',
    location: 'Sector 62, Noida',
    fee: '₹2.95 Lakhs (Total)',
    feeNum: 295000,
    accreditation: 'AICTE Approved · AKTU Affiliated',
    programs: ['MBA'],
    badge: 'Value B-School',
    grade: 'Approved',
    gradeColor: 'from-slate-600 to-slate-800',
    about: 'Hierank Business School, situated in the hub of Sector 62 Noida, offers a value-driven MBA program affiliated with AKTU. Focusing on practical exposure and corporate readiness, Hierank provides solid opportunities at affordable fees.',
    highlights: ['Affordable fee with strong local ROI', 'Located in Sector 62 corporate and IT hub', 'Dedicated personality development classes', 'Regular industry workshops and lectures'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Core Industry Exposure',
    approvals: 'AICTE Approved, Affiliated to AKTU, Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'MBA': ['Marketing Management', 'Financial Management', 'Human Resource Management', 'Information Technology', 'International Business']
    }
  },
  {
    name: 'Amity University (Noida Campus)',
    universitySlug: 'amity-noida',
    location: 'Sector 125, Noida',
    fee: '₹15.20 Lakhs (Total)',
    feeNum: 1520000,
    accreditation: 'UGC Approved · WES Globally Recognized · NAAC A+ Rated',
    programs: ['MBA', 'MBA Business Analytics', 'MBA HR'],
    badge: 'World-Class Campus',
    grade: 'A+ Rated',
    gradeColor: 'from-blue-600 to-blue-800',
    about: 'Amity University Noida campus is a premier global institution. Offering an elite MBA program with state-of-the-art labs, tie-ups with global universities, and a highly premium recruiter list, it is a top preference for global management careers.',
    highlights: ['WES approved for global education/visas', 'Premium campus infrastructure & global network', '100% placement support in tier-1 MNCs', 'Diverse MBA tracks and specialized modules'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Corporate Immersion',
    approvals: 'UGC, NAAC A+ Rated, WES, ACBSP, IACBE',
    whatsapp: '919560020771',
    specializations: {
      'MBA': ['General Management', 'Marketing & Sales', 'Finance & FinTech', 'HR Capital', 'International Business'],
      'MBA Business Analytics': ['Data Engineering', 'Predictive Modeling', 'Data Visualization'],
      'MBA HR': ['Strategic HR', 'Talent Acquisition', 'Compensation Management']
    }
  },
  {
    name: 'GNIOT (Greater Noida Institute of Technology)',
    universitySlug: 'gniot-greater-noida',
    location: 'Knowledge Park II, Greater Noida',
    fee: '₹3.10L - ₹6.50L (Total)',
    feeNum: 650000,
    accreditation: 'AICTE Approved · Affiliated to AKTU',
    programs: ['MBA', 'PGDM'],
    badge: 'Knowledge Park Hub',
    grade: 'Approved',
    gradeColor: 'from-blue-600 to-indigo-800',
    about: 'GNIOT Group of Institutions is a major educational hub in Greater Noida Knowledge Park. GNIOT offers a university-affiliated MBA and an autonomous AICTE-approved PGDM focused on practical skills, digital technologies, and robust placements.',
    highlights: ['Strategic location in Knowledge Park II', 'Dual Specialization opportunities', 'Affordable fee with strong industry exposure', 'Active placement and mentorship cell'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Practical Projects',
    approvals: 'AICTE Approved, AKTU Affiliated (for MBA), Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'MBA': ['Marketing Management', 'Financial Management', 'Human Resource Management', 'Information Technology', 'International Business'],
      'PGDM': ['Business Analytics', 'Digital Marketing', 'Banking & Finance Services', 'Human Capital Management', 'Logistics & Supply Chain']
    }
  },
  {
    name: 'GL Bajaj Institute of Management & Research (GLBIMR)',
    universitySlug: 'gl-bajaj-greater-noida',
    location: 'Knowledge Park III, Greater Noida',
    fee: '₹7.50 Lakhs (Total)',
    feeNum: 750000,
    accreditation: 'AICTE Approved · Highly Ranked B-School',
    programs: ['PGDM'],
    badge: 'High Placement ROI',
    grade: 'Ranked',
    gradeColor: 'from-emerald-500 to-emerald-700',
    about: 'GLBIMR is one of the most popular B-schools in Greater Noida. Featuring a highly corporate-aligned PGDM curriculum, GLBIMR is known for outstanding placement records, corporate link-ups, and live project opportunities.',
    highlights: ['Consistently ranked among top NCR private B-schools', '100% placement track record with top recruiters', 'Value added certification courses (Analytics, Digital Marketing)', 'Strong alumni network and regular industry visits'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Corporate Immersion',
    approvals: 'AICTE Approved, Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Marketing Management', 'Financial Management', 'Human Resource Management', 'Operations & Analytics', 'International Business']
    }
  },
  {
    name: 'Accurate Institute of Management & Technology',
    universitySlug: 'accurate-greater-noida',
    location: 'Knowledge Park III, Greater Noida',
    fee: '₹2.85L - ₹6.50L (Total)',
    feeNum: 650000,
    accreditation: 'AICTE Approved · AKTU Affiliated',
    programs: ['MBA', 'PGDM'],
    badge: '100% Placement Record',
    grade: 'Approved',
    gradeColor: 'from-indigo-500 to-purple-700',
    about: 'Accurate Institute of Management & Technology is renowned for its academic excellence and placement focus. Accurate offers both PGDM and MBA options supported by modern classrooms, lab facilities, and dedicated placement support cells.',
    highlights: ['Assured placement programs and packages', 'Tech-integrated smart campus', 'Incubation and entrepreneurship support', 'Strong connections with Noida corporate hubs'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Digital Labs',
    approvals: 'AICTE Approved, Affiliated to AKTU (for MBA)',
    whatsapp: '919560020771',
    specializations: {
      'MBA': ['General Management', 'Marketing', 'Finance', 'HR Management'],
      'PGDM': ['Business Analytics', 'Digital Marketing Services', 'Finance & Banking', 'Human Capital Strategy']
    }
  },
  {
    name: 'Noida Institute of Engineering & Technology (NIET)',
    universitySlug: 'niet-greater-noida',
    location: 'Knowledge Park II, Greater Noida',
    fee: '₹6.20 Lakhs (Total)',
    feeNum: 620000,
    accreditation: 'AICTE Approved · Autonomous B-School',
    programs: ['PGDM'],
    badge: 'Autonomous B-School',
    grade: 'Approved',
    gradeColor: 'from-cyan-500 to-blue-700',
    about: 'NIET Greater Noida is a premier autonomous institution in NCR. Its management department offers a dynamic PGDM program focused on next-generation business skills, cloud technologies, and corporate leadership modules.',
    highlights: ['Autonomous academic curriculum flexibilities', 'Strong technological integration in core management', '100% internship assurance in top MNCs', 'Modern campus with specialized analytics labs'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Lab Immersion',
    approvals: 'AICTE Approved, Autonomous Status',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Marketing & Sales', 'Corporate Finance', 'Human Resources & Analytics', 'Information Technology', 'Operations & Supply Chain']
    }
  },
  {
    name: 'I Business Institute (IBI)',
    universitySlug: 'ibi-greater-noida',
    location: 'Knowledge Park II, Greater Noida',
    fee: '₹8.45 Lakhs (Total)',
    feeNum: 845000,
    accreditation: 'AICTE Approved · Premium Certifications B-School',
    programs: ['PGDM'],
    badge: 'Premium Certifications',
    grade: 'Approved',
    gradeColor: 'from-orange-500 to-amber-700',
    about: 'I Business Institute (IBI) is a boutique, highly focused business school in Knowledge Park II. IBI PGDM curriculum is supplemented with multiple international and national certifications, ensuring high placement results.',
    highlights: ['Includes 10+ corporate value certifications', 'International study tour opportunities', 'Personalized mentor-mentee relationship model', 'High ROI with prominent NCR companies visiting campus'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Value Certifications',
    approvals: 'AICTE Approved, Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Marketing Management', 'Financial Management', 'Human Resource Management', 'Business Analytics & IT', 'Operations Management', 'International Business']
    }
  },
  {
    name: 'Lloyd Business School',
    universitySlug: 'lloyd-greater-noida',
    location: 'Knowledge Park II, Greater Noida',
    fee: '₹2.90L - ₹6.90L (Total)',
    feeNum: 690000,
    accreditation: 'AICTE Approved · IBM Collaboration B-School',
    programs: ['MBA', 'PGDM'],
    badge: 'IBM Partnered PGDM',
    grade: 'Approved',
    gradeColor: 'from-violet-600 to-indigo-900',
    about: 'Lloyd Business School offers an industry-centric education model in collaboration with technology leaders like IBM. Lloyd features highly specialized PGDM streams (like Business Analytics and Supply Chain) alongside university MBA.',
    highlights: ['PGDM streams partnered directly with IBM', 'State of the art analytics labs on campus', 'Excellent placement track in logistics and corporate analytics', 'Lush green Knowledge Park campus'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & IBM Labs Hybrid',
    approvals: 'AICTE Approved, Affiliated to AKTU (for MBA)',
    whatsapp: '919560020771',
    specializations: {
      'MBA': ['Marketing Management', 'Financial Management', 'HR Management', 'IT Systems'],
      'PGDM': ['Business Analytics (with IBM)', 'Supply Chain Management', 'Finance & Banking', 'Human Resource Analytics']
    }
  },
  {
    name: 'IILM Greater Noida (IILM University)',
    universitySlug: 'iilm-greater-noida',
    location: 'Knowledge Park II, Greater Noida',
    fee: '₹10.80 Lakhs (Total)',
    feeNum: 1080000,
    accreditation: 'UGC Approved · Elite Legacy B-School',
    programs: ['MBA'],
    badge: 'Elite Legacy Campus',
    grade: 'Approved',
    gradeColor: 'from-rose-500 to-red-700',
    about: 'IILM University Greater Noida campus carries a rich legacy since 1993. Offering a top-tier MBA program with global academic parameters, it highlights massive corporate collaborations, entrepreneurship incubation, and premium placements.',
    highlights: ['Legacy brand in management education since 1993', 'Massive lush green campus in Knowledge Park', 'Robust global alumni network', 'Excellent placement packages in consultancy & consulting'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Incubator Support',
    approvals: 'UGC Approved, IILM University, Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'MBA': ['Marketing & Innovation', 'FinTech & Wealth Management', 'Strategic HR & Analytics', 'Logistics & Supply Chain', 'Digital Entrepreneurship']
    }
  },
  {
    name: 'Bennett University',
    universitySlug: 'bennett-greater-noida',
    location: 'Greater Noida',
    fee: '₹11.20 Lakhs (Total)',
    feeNum: 1120000,
    accreditation: 'UGC Approved · Times Group Initiative',
    programs: ['MBA'],
    badge: 'Times Group Legacy',
    grade: 'Approved',
    gradeColor: 'from-amber-600 to-amber-800',
    about: 'Bennett University, a premium initiative of the Times Group, offers a highly modern MBA program. Positioned to bridge academia with direct media and corporate exposure, Bennett provides world-class infrastructure and top-tier MNC visits.',
    highlights: ['Backed by Times Group corporate network', 'Highly premium global university collaborations', 'State-of-the-art residential campus infrastructure', 'Dynamic entrepreneurship incubation support'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Times Group Hub Interaction',
    approvals: 'UGC Approved, Bennett University',
    whatsapp: '919560020771',
    specializations: {
      'MBA': ['Marketing & Sales', 'Finance & FinTech', 'Human Resource Capital', 'Business Analytics', 'Media & Entertainment Management']
    }
  },
  {
    name: 'Mangalmay Institute of Management and Technology',
    universitySlug: 'mangalmay-greater-noida',
    location: 'Knowledge Park II, Greater Noida',
    fee: '₹2.85 Lakhs (Total)',
    feeNum: 285000,
    accreditation: 'AICTE Approved · AKTU Affiliated',
    programs: ['MBA'],
    badge: 'Value B-School',
    grade: 'Approved',
    gradeColor: 'from-emerald-600 to-green-800',
    about: 'Mangalmay Institute of Management and Technology is an established name in Knowledge Park II. Mangalmay offers a highly cost-effective and value-focused MBA affiliated with AKTU, making it a top preference for budget-conscious management seekers.',
    highlights: ['Highly affordable fee structure in Greater Noida', 'Disciplined academic learning model', 'Focused personal development workshops', 'Dedicated placement drive support'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Local Industry Ties',
    approvals: 'AICTE Approved, Affiliated to AKTU, NAAC Accredited',
    whatsapp: '919560020771',
    specializations: {
      'MBA': ['Marketing Management', 'Financial Management', 'Human Resource Management', 'Information Technology', 'International Business']
    }
  },
  {
    name: 'Sparsh Global Business School (SGBS)',
    universitySlug: 'sparsh-greater-noida',
    location: 'Greater Noida',
    fee: '₹8.50 Lakhs (Total)',
    feeNum: 850000,
    accreditation: 'AICTE Approved · ESG Centric Modern B-School',
    programs: ['PGDM'],
    badge: 'Entrepreneurship Focused',
    grade: 'Approved',
    gradeColor: 'from-pink-600 to-rose-800',
    about: 'Sparsh Global Business School is a modern B-school focused on sustainable business leadership and environmental, social, and governance (ESG) paradigms. Sparsh features active incubation cells, industry mentors, and hands-on business modeling.',
    highlights: ['Modern neo-curriculum incorporating ESG trends', 'Active business incubation and incubator funding support', 'Premium corporate collaborations', 'Focus on strategic thinking and venture creation'],
    duration: '2 Years (Full-Time)',
    mode: 'Classroom & Business Incubation',
    approvals: 'AICTE Approved, Govt. of India',
    whatsapp: '919560020771',
    specializations: {
      'PGDM': ['Strategic Marketing', 'FinTech & Investment Banking', 'Strategic Human Resources', 'Business Analytics & Data Science', 'Global Business Operations']
    }
  }
];

