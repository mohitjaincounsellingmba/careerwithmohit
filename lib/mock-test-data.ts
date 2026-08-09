export interface SectionDetail {
  id: string;
  label: string;
  questionCount: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ExamDetail {
  title: string;
  content: string;
}

export interface ExamConfig {
  id: string;
  name: string;
  slug: string;
  durationMinutes: number;
  sections: SectionDetail[];
  totalQuestions: number;
  targetColleges: string;
  goodScore: string;
  seoTitle: string;
  seoDescription: string;
  keywords?: string[];
  features?: string[];
  faqs?: FAQItem[];
  examDetails?: ExamDetail[];
  topCollegesList?: { name: string; cutoff: string; link?: string }[];
  markingScheme?: {
    correct: number;
    negative: number;
  };
}

export interface GenericQuestion {
  id: number;
  sectionId: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const EXAM_CONFIGS: ExamConfig[] = [
  {
    id: 'jee-main',
    slug: 'jee-main',
    name: 'IIT JEE Main 2026',
    durationMinutes: 180,
    totalQuestions: 90,
    targetColleges: 'NITs, IIITs, GFTIs',
    goodScore: '200+',
    seoTitle: 'Free IIT JEE Main Mock Test 2026 | Full Length Practice',
    seoDescription: 'Take a free full-length IIT JEE Main 2026 mock test. 90 questions, 180 minutes pattern with Physics, Chemistry, and Mathematics.',
    keywords: ['JEE Main mock test 2026', 'free JEE main practice paper', 'online JEE Main test series', 'JEE mains question paper free', 'IIT JEE Main preparation online', 'JEE Mains Paper 1 mock test', 'JEE rank predictor free', 'NTA JEE main syllabus check'],
    sections: [
      { id: 'physics', label: 'Physics', questionCount: 30 },
      { id: 'chemistry', label: 'Chemistry', questionCount: 30 },
      { id: 'maths', label: 'Mathematics', questionCount: 30 }
    ],
    topCollegesList: [
      { name: 'NIT Trichy', cutoff: '99.8+ %ile' },
      { name: 'NIT Surathkal', cutoff: '99.5+ %ile' },
      { name: 'NIT Rourkela', cutoff: '99.2+ %ile' },
      { name: 'IIIT Hyderabad', cutoff: '99.9+ %ile' },
      { name: 'IIIT Delhi', cutoff: '98.5+ %ile' }
    ],
    faqs: [
      {
        question: "Is this JEE Main mock test free?",
        answer: "Yes, it is 100% free and based on the latest NTA exam pattern with full-length PCM coverage."
      },
      {
        question: "Does it help in rank prediction?",
        answer: "The tool provides a projection of your performance based on historical NIT cutoffs and marks vs percentile trends."
      },
      {
        question: "Can I take this test on mobile?",
        answer: "Yes, our interface is fully responsive, though for a real CBT experience, we recommend using a desktop."
      }
    ],
    markingScheme: { correct: 4, negative: 1 }
  },
  {
    id: 'jee-advanced',
    slug: 'jee-advanced',
    name: 'IIT JEE Advanced 2026',
    durationMinutes: 180,
    totalQuestions: 54,
    targetColleges: 'IITs (IIT Roorkee - Organizing Body)',
    goodScore: '140+',
    seoTitle: 'Free IIT JEE Advanced Mock Test 2026 | Full Length Practice Paper',
    seoDescription: 'Master the IIT JEE Advanced 2026 with our free full-length mock tests. Practice Paper 1 and Paper 2 patterns with multi-correct, integer-type, and matrix-match questions.',
    keywords: ['JEE Advanced mock test 2026', 'free JEE advanced test series', 'JEE Advanced Paper 1 and Paper 2 free mock', 'IIT JEE Advanced practice paper', 'JEE Advanced pattern with solutions', 'JEE advanced rank predictor', 'IIT Roorkee JEE Advanced preparation'],
    sections: [
      { id: 'physics', label: 'Physics', questionCount: 18 },
      { id: 'chemistry', label: 'Chemistry', questionCount: 18 },
      { id: 'maths', label: 'Mathematics', questionCount: 18 }
    ],
    features: [
      'Strictly follows JEE Advanced 2026 Pattern',
      'Complex Question Types (NAT, Matrix Match, Multiple Correct)',
      'Detailed Performance Analytics and Rank Predictor',
      'Compulsory Paper 1 and Paper 2 Mock Simulation',
      'Designed by Top IITians and Subject Matter Experts',
      'Full Syllabus Coverage (Class 11 & 12)'
    ],
    faqs: [
      {
        question: 'What is the exam date for JEE Advanced 2026?',
        answer: 'JEE Advanced 2026 is scheduled to be conducted on May 17, 2026, by IIT Roorkee. Both Paper 1 and Paper 2 are mandatory.'
      },
      {
        question: 'Can I choose my Paper 1 or Paper 2?',
        answer: 'No, both Paper 1 (morning shift) and Paper 2 (afternoon shift) are compulsory to be eligible for ranking in JEE Advanced.'
      },
      {
        question: 'Is there a specific curriculum for JEE Advanced 2026?',
        answer: 'The syllabus covers advanced concepts of Physics, Chemistry, and Mathematics from Class 11 and 12. It includes additional topics not present in JEE Main, such as Thermal Physics in detail and specialized Calculus topics.'
      },
      {
        question: 'How many attempts are allowed for JEE Advanced?',
        answer: 'A candidate can attempt JEE Advanced a maximum of two times in consecutive years, provided they qualify via JEE Main.'
      }
    ],
    examDetails: [
      {
        title: 'JEE Advanced 2026 Curriculum Overview',
        content: 'The curriculum for JEE Advanced involves deep conceptual understanding. Physics focuses on Mechanics, Modern Physics, and Electromagnetism. Chemistry spans over Physical, Organic (GOC & Carbonyls), and Inorganic (P-block). Mathematics emphasizes Calculus, Vectors, 3D Geometry, and Complex Numbers.'
      },
      {
        title: 'Understanding the Difficulty Level',
        content: 'Unlike JEE Main, which focuses on speed and accuracy, JEE Advanced tests your analytical problem-solving skills under time pressure. The questions often combine concepts from multiple chapters, requiring students to have a holistic view of the syllabus.'
      }
    ]
  },
  {
    id: 'viteee',
    slug: 'viteee',
    name: 'VITEEE 2026',
    durationMinutes: 150,
    totalQuestions: 125,
    targetColleges: 'VIT Vellore, Chennai, AP, Bhopal',
    goodScore: '90+',
    seoTitle: 'Free VITEEE Mock Test 2026 | VIT Engineering Entrance',
    seoDescription: 'Take our free VITEEE mock test to boost your rank. 125 questions in 150 minutes covering Maths, Physics, Chemistry, Aptitude & English.',
    keywords: ['VITEEE mock test 2026', 'VIT engineering entrance practice paper', 'free VIT mock test series', 'VIT Vellore exam preparation online', 'VITEEE sample papers with solutions', 'VITEEE chemistry physics maths test'],
    sections: [
      { id: 'maths', label: 'Mathematics/Biology', questionCount: 40 },
      { id: 'physics', label: 'Physics', questionCount: 35 },
      { id: 'chemistry', label: 'Chemistry', questionCount: 35 },
      { id: 'aptitude', label: 'Aptitude', questionCount: 10 },
      { id: 'english', label: 'English', questionCount: 5 }
    ]
  },
  {
    id: 'srmjee',
    slug: 'srmjee',
    name: 'SRMJEEE 2026',
    durationMinutes: 150,
    totalQuestions: 125,
    targetColleges: 'SRM KTR, Ramapuram, Vadapalani, NCR',
    goodScore: '95+',
    seoTitle: 'Free SRMJEEE Mock Test 2026 | SRM Joint Engineering Exam',
    seoDescription: 'Practice the official SRMJEEE pattern online. 125 questions across Physics, Chemistry, Maths, English & Aptitude. Get instant percentiles.',
    keywords: ['SRMJEEE mock test 2026', 'SRM Joint Engineering mock paper', 'free SRM entrance test series', 'SRMJEEE exam practice online', 'SRM Katankulathur admission mock', 'SRMJEEE physics chemistry maths paper'],
    sections: [
      { id: 'physics', label: 'Physics', questionCount: 35 },
      { id: 'chemistry', label: 'Chemistry', questionCount: 35 },
      { id: 'maths', label: 'Mathematics/Biology', questionCount: 40 },
      { id: 'english', label: 'English', questionCount: 5 },
      { id: 'aptitude', label: 'Aptitude', questionCount: 10 }
    ]
  },
  {
    id: 'bitsat',
    slug: 'bitsat',
    name: 'BITS Pilani (BITSAT) 2026',
    durationMinutes: 180,
    totalQuestions: 130,
    targetColleges: 'BITS Pilani, BITS Goa, BITS Hyderabad',
    goodScore: '270+',
    seoTitle: 'Free BITSAT Mock Test 2026 | Simulation for BITS Pilani Prep',
    seoDescription: 'Master the BITSAT 2026 with our free full-length mock test. 130 questions in 3 hours covering Physics, Chemistry, English, and Logical Reasoning.',
    keywords: ['BITSAT mock test 2026', 'BITS Pilani mock test free', 'free BITSAT online test series', 'BITSAT English logical reasoning practice', 'BITSAT score calculator dynamic', 'BITS Goa and Hyderabad admission test'],
    sections: [
      { id: 'physics', label: 'Physics', questionCount: 30 },
      { id: 'chemistry', label: 'Chemistry', questionCount: 30 },
      { id: 'english', label: 'English Proficiency', questionCount: 10 },
      { id: 'lr', label: 'Logical Reasoning', questionCount: 20 },
      { id: 'maths', label: 'Mathematics', questionCount: 40 }
    ],
    features: [
      'Strictly follows BITSAT 2026 Exam Pattern',
      'Bonus Section Integration Simulation',
      'English Proficiency & Logical Reasoning Focus',
      'Instant Score and Accuracy Reporting',
      'Top Campus (Pilani, Goa, Hyderabad) Cutoff Tracker',
      'Conceptual solutions provided for all 130 questions'
    ],
    faqs: [
      {
        question: 'Is there a bonus section in the BITSAT mock test?',
        answer: 'While our main mock test has 130 questions, we provide insights into the BITSAT bonus question strategy (12 extra questions) if you finish the test early with no unanswered questions.'
      },
      {
        question: 'What is a good score in BITSAT 2026?',
        answer: 'A score above 270+ is generally considered safe for top branches at BITS Pilani, while 240+ can fetch you branches at Goa and Hyderabad campuses.'
      },
      {
        question: 'Is English Proficiency important for BITSAT?',
        answer: 'Yes, English Proficiency and Logical Reasoning make up 30 questions (90 marks). This section is often the differentiator for candidates aiming for high-ROI branches like CS or ECE.'
      }
    ],
    examDetails: [
      {
        title: 'The BITSAT Advantage',
        content: 'BITSAT tests your speed and accuracy even more than JEE Main. With 130 questions in 180 minutes, you have less than 1.5 minutes per question. Mastery of English and Logic is just as important as your PCM scores.'
      },
      {
        title: 'No Sectional Timing',
        content: 'Unlike CAT, BITSAT has no sectional time limit. You can jump between Physics, Chemistry, and English freely. We recommend finishing English and Chemistry in the first 50 minutes to leave more time for the 40 Mathematics questions.'
      }
    ]
  },
  {
    id: 'neet',
    slug: 'neet',
    name: 'NEET UG 2026',
    durationMinutes: 200,
    totalQuestions: 200, // Attempt 180, but placing 200 total structure
    targetColleges: 'AIIMS, JIPMER, Top Govt Medical Colleges',
    goodScore: '650+',
    seoTitle: 'Free NEET Mock Test 2026 | 200 Minutes NTA Pattern',
    seoDescription: 'Prepare for NEET 2026 with our full-length mock exam. 200 questions across Physics, Chemistry, Botany, and Zoology. Free online practice.',
    keywords: ['NEET mock test 2026', 'free NEET online practice papers', 'NEET UG biology physics chemistry mock', 'NTA NEET sample papers with solutions', 'NEET raw score to rank predictor', 'AIIMS and JIPMER medical exam prep'],
    sections: [
      { id: 'physics', label: 'Physics', questionCount: 50 },
      { id: 'chemistry', label: 'Chemistry', questionCount: 50 },
      { id: 'botany', label: 'Botany', questionCount: 50 },
      { id: 'zoology', label: 'Zoology', questionCount: 50 }
    ],
    topCollegesList: [
      { name: 'AIIMS New Delhi', cutoff: '705+ Marks' },
      { name: 'MAMC Delhi', cutoff: '695+ Marks' },
      { name: 'VMMC Delhi', cutoff: '690+ Marks' },
      { name: 'JIPMER Puducherry', cutoff: '685+ Marks' },
      { name: 'KGMU Lucknow', cutoff: '675+ Marks' }
    ],
    markingScheme: { correct: 4, negative: 1 }
  },
  {
    id: 'clat',
    slug: 'clat',
    name: 'CLAT 2026',
    durationMinutes: 120,
    totalQuestions: 120,
    targetColleges: 'NLSIU, NALSAR, Top NLUs',
    goodScore: '90+',
    seoTitle: 'Free CLAT Mock Test 2026 | NLU Entrance Practice Paper',
    seoDescription: 'Take a comprehensive CLAT mock test. 120 questions, 120 minutes. Test Legal Reasoning, Current Affairs, English, and Logic.',
    keywords: ['CLAT mock test 2026', 'free CLAT online test series', 'NLU entrance practice paper free', 'CLAT legal reasoning questions', 'CLAT English and logical aptitude mock', 'CLAT GK current affairs practice sets'],
    sections: [
      { id: 'english', label: 'English Language', questionCount: 24 },
      { id: 'current', label: 'Current Affairs & GK', questionCount: 28 },
      { id: 'legal', label: 'Legal Reasoning', questionCount: 32 },
      { id: 'logical', label: 'Logical Reasoning', questionCount: 24 },
      { id: 'quant', label: 'Quantitative Techniques', questionCount: 12 }
    ]
  },
  {
    id: 'cat',
    slug: 'cat',
    name: 'CAT 2026',
    durationMinutes: 120,
    totalQuestions: 68,
    targetColleges: 'IIM Ahmedabad, IIM Bangalore, IIM Calcutta, FMS, SPJIMR',
    goodScore: '99+ Percentile',
    seoTitle: 'Free CAT Mock Test 2026 | Best Online Test Series for IIM Prep',
    seoDescription: 'Attempt the best Free CAT Mock Test 2026 based on the latest IIM exam pattern. Get AI analytics, all India percentile, and section-wise VARC, DILR, QA analysis.',
    keywords: ['CAT mock test 2026', 'free CAT online test series', 'best mock test for CAT 2026', 'IIM preparation VARC DILR QA', 'CAT score vs percentile predictor', 'CAT previous year questions with solutions'],
    sections: [
      { id: 'varc', label: 'Verbal Ability & Reading Comprehension', questionCount: 24 },
      { id: 'dilr', label: 'Data Interpretation & Logical Reasoning', questionCount: 22 },
      { id: 'qa', label: 'Quantitative Ability', questionCount: 22 }
    ],
    topCollegesList: [
      { name: 'IIM Ahmedabad', cutoff: '99.5+ %ile' },
      { name: 'IIM Bangalore', cutoff: '99.2+ %ile' },
      { name: 'IIM Calcutta', cutoff: '99+ %ile' },
      { name: 'FMS Delhi', cutoff: '98.5+ %ile' },
      { name: 'SPJIMR Mumbai', cutoff: '95+ %ile' }
    ],
    features: [
      'Latest CAT 2026 Exam Pattern (68 Questions)',
      'Detailed AI-Powered Performance Analytics',
      'All India Percentile Predictor',
      'In-depth Sectional Analysis (VARC 24, DILR 22, QA 22)',
      'Step-by-Step Mathematical & Logical Solutions',
      'Designed by IIM Alumni & Top Educators'
    ],
    faqs: [
      {
        question: 'Is this CAT 2026 Mock Test completely free?',
        answer: 'Yes, this full-length CAT 2026 mock test is completely free. It provides a real exam interface experience with 68 questions to be solved in 120 minutes.'
      },
      {
        question: 'What is the pattern of the CAT Mock Test?',
        answer: 'The mock test strictly follows the comprehensive CAT pattern: 24 questions in VARC, 22 in DILR, and 22 in Quantitative Ability (QA). The total duration is 120 minutes with a sectional time limit of 40 minutes each.'
      },
      {
        question: 'Are the questions similar to the actual CAT exam?',
        answer: 'Our experts actively analyze past CAT papers. The difficulty level of this mock test is curated by IIM alumni to closely match the actual exam difficulty, ranging from moderate to tough.'
      },
      {
        question: 'Do I get detailed solutions after the test?',
        answer: 'Absolutely! Upon submission, you will receive an instant score sheet along with detailed step-by-step text solutions and analytical breakdowns for every question.'
      }
    ],
    examDetails: [
      {
        title: 'Why Take Our CAT Mock Test?',
        content: 'To crack the Common Admission Test (CAT) and secure a seat in the prestigious IIMs, consistent practice is non-negotiable. Our mock tests simulate the exact pressure, interface, and difficulty level of the real D-Day. By attempting these tests, you can benchmark your preparation against thousands of aspirants nationwide.'
      },
      {
        title: 'Marking Scheme & Sectional Strategy',
        content: 'CAT follows a strict marking scheme: +3 marks for every correct answer and -1 mark for every incorrect MCQ. TITA (Type in The Answer) questions do not have negative marking. It is crucial to maximize accuracy in VARC, choose the right sets in DILR, and manage time smartly in QA.'
      }
    ],
    markingScheme: { correct: 3, negative: 1 }
  },
  {
    id: 'nmat',
    slug: 'nmat',
    name: 'NMAT 2026 (For Admission 2027)',
    durationMinutes: 120,
    totalQuestions: 108,
    targetColleges: 'NMIMS Mumbai, SPJIMR, ISB, VIT, XIMB',
    goodScore: '230+',
    seoTitle: 'Free NMAT Mock Test 2026 | NMIMS Admission 2027 Practice Tool',
    seoDescription: 'Take our free adaptive-style NMAT 2026 mock test for 2027 admissions. 108 questions across Language, Quants, and Logic. Benchmarked for NMIMS Mumbai and top B-schools.',
    keywords: ['NMAT mock test 2026', 'NMIMS Mumbai admission test series', 'NMAT practice paper free', 'adaptive NMAT mock test online', 'NMAT scaled score predictor', 'NMAT Language and logic prep tool'],
    sections: [
      { id: 'language', label: 'Language Skills', questionCount: 36 },
      { id: 'quant', label: 'Quantitative Skills', questionCount: 36 },
      { id: 'logic', label: 'Logical Reasoning', questionCount: 36 }
    ],
    topCollegesList: [
      { name: 'NMIMS Mumbai (Core)', cutoff: '232+ Score' },
      { name: 'NMIMS Bangalore', cutoff: '220+ Score' },
      { name: 'NMIMS Hyderabad', cutoff: '215+ Score' },
      { name: 'XIMB (HRM)', cutoff: '210+ Score' },
      { name: 'K J Somaiya', cutoff: '200+ Score' }
    ],
    features: [
      'Realistic NMAT 2026 Exam Simulation',
      'Sectional Timings (28m, 52m, 40m)',
      'No Negative Marking Pattern',
      'Instant Scaled Score Estimation',
      'NMIMS Mumbai Cutoff Analysis',
      'Detailed Step-by-Step Solutions'
    ],
    faqs: [
      {
        question: 'What is the pattern of NMAT 2026?',
        answer: 'NMAT 2026 consists of 108 questions to be answered in 120 minutes. The sections are Language Skills (36 questions, 28 mins), Quantitative Skills (36 questions, 52 mins), and Logical Reasoning (36 questions, 40 mins).'
      },
      {
        question: 'Is there negative marking in NMAT?',
        answer: 'No, NMAT does not have negative marking. This makes it unique compared to CAT or XAT, allowing students to attempt all questions.'
      },
      {
        question: 'Which colleges accept NMAT scores?',
        answer: 'The primary college is NMIMS (Mumbai, Bengaluru, Hyderabad). Other top colleges include SPJIMR (PGMPW), ISB (Advanced Management), VIT University, and XIMB.'
      },
      {
        question: 'Can I choose the order of sections in NMAT?',
        answer: 'Yes, NMAT allows you to choose the order in which you want to attempt the three sections. However, once a section is submitted, you cannot go back to it.'
      }
    ],
    examDetails: [
      {
        title: 'The Adaptive Nature of NMAT',
        content: 'NMAT by GMAC is a computer-adaptive test. This means the difficulty of the next question depends on whether you answered the previous one correctly. Our mock test simulates this difficulty progression to give you a realistic score.'
      },
      {
        title: 'Strategy for NMAT Success',
        content: 'Since there is no negative marking, never leave a question unattempted. However, NMAT is a high-speed exam. Managing your time per question is critical, especially in the Language section where you have less than a minute per question.'
      }
    ]
  },
  {
    id: 'ssc-cgl',
    slug: 'ssc-cgl',
    name: 'SSC CGL 2026',
    durationMinutes: 60,
    totalQuestions: 100,
    targetColleges: 'Income Tax, Excise, CBI, MEA Departments',
    goodScore: '160+',
    seoTitle: 'Free SSC CGL Mock Test 2026 | Full Length Tier 1 Practice',
    seoDescription: 'Take a free full-length SSC CGL 2026 Tier 1 mock test. 100 questions in 60 minutes covering Quant, Reasoning, English, and GS.',
    sections: [
      { id: 'reasoning', label: 'General Intelligence & Reasoning', questionCount: 25 },
      { id: 'gk', label: 'General Awareness', questionCount: 25 },
      { id: 'quant', label: 'Quantitative Aptitude', questionCount: 25 },
      { id: 'english', label: 'English Comprehension', questionCount: 25 }
    ]
  },
  {
    id: 'ssc-chsl',
    slug: 'ssc-chsl',
    name: 'SSC CHSL 2026',
    durationMinutes: 60,
    totalQuestions: 100,
    targetColleges: 'LDC, DEO, JSA Govt Roles',
    goodScore: '150+',
    seoTitle: 'Free SSC CHSL Mock Test 2026 | Tier 1 Practice Paper',
    seoDescription: 'Attempt the official SSC CHSL pattern mock test. 100 questions in 1 hour. Accurate interface for 10+2 level govt exams.',
    sections: [
      { id: 'reasoning', label: 'Reasoning', questionCount: 25 },
      { id: 'gk', label: 'General Awareness', questionCount: 25 },
      { id: 'quant', label: 'Maths', questionCount: 25 },
      { id: 'english', label: 'English', questionCount: 25 }
    ]
  },
  {
    id: 'ibps-po',
    slug: 'ibps-po',
    name: 'IBPS PO 2026',
    durationMinutes: 60,
    totalQuestions: 100,
    targetColleges: 'Public Sector Banks (PNB, BOB, etc.)',
    goodScore: '70+',
    seoTitle: 'Free IBPS PO Mock Test 2026 | Banking Prelims Simulation',
    seoDescription: 'Practice for IBPS PO Prelims with our free mock test series. 100 questions with sectional timings for Quant, Reasoning, and English.',
    sections: [
      { id: 'english', label: 'English Language', questionCount: 30 },
      { id: 'quant', label: 'Quantitative Aptitude', questionCount: 35 },
      { id: 'reasoning', label: 'Reasoning Ability', questionCount: 35 }
    ]
  },
  {
    id: 'sbi-po',
    slug: 'sbi-po',
    name: 'SBI PO 2026',
    durationMinutes: 60,
    totalQuestions: 100,
    targetColleges: 'State Bank of India',
    goodScore: '65+',
    seoTitle: 'Free SBI PO Mock Test 2026 | High Difficulty Banking Prep',
    seoDescription: 'Attempt the hardest SBI PO prelims mock test online. 100 questions designed for SBI standards. Clear the cutoff with our free series.',
    sections: [
      { id: 'english', label: 'English', questionCount: 30 },
      { id: 'quant', label: 'Quant', questionCount: 35 },
      { id: 'reasoning', label: 'Reasoning', questionCount: 35 }
    ]
  },
  {
    id: 'rrb-ntpc',
    slug: 'rrb-ntpc',
    name: 'RRB NTPC 2026',
    durationMinutes: 90,
    totalQuestions: 100,
    targetColleges: 'Indian Railways (ASM, Goods Guard, etc.)',
    goodScore: '85+',
    seoTitle: 'Free RRB NTPC Mock Test 2026 | Railway Entrance Exam',
    seoDescription: 'Railway recruitment board NTPC CBT 1 mock test. 100 questions in 90 minutes. Static GK and Railway special focus.',
    sections: [
      { id: 'quant', label: 'Mathematics', questionCount: 30 },
      { id: 'reasoning', label: 'General Intelligence', questionCount: 30 },
      { id: 'ga', label: 'General Awareness', questionCount: 40 }
    ]
  },
  {
    id: 'upsc-cse',
    slug: 'upsc-cse',
    name: 'UPSC CSE (Prelims) 2026',
    durationMinutes: 120,
    totalQuestions: 100,
    targetColleges: 'IAS, IPS, IFS (Civil Services)',
    goodScore: '100+',
    seoTitle: 'Free UPSC Prelims GS Mock Test 2026 | Civil Services Hub',
    seoDescription: 'Prepare for UPSC Prelims GS Paper 1 with our comprehensive mock test. 100 high-quality questions on History, Polity, Geography, and current affairs.',
    sections: [
      { id: 'history', label: 'History & Culture', questionCount: 20 },
      { id: 'polity', label: 'Polity & Governance', questionCount: 20 },
      { id: 'geo-env', label: 'Geography & Environment', questionCount: 25 },
      { id: 'eco-ca', label: 'Economy & Current Affairs', questionCount: 35 }
    ]
  },
  {
    id: 'ctet',
    slug: 'ctet',
    name: 'CTET 2026 (Paper 1)',
    durationMinutes: 150,
    totalQuestions: 150,
    targetColleges: 'Central & State Teaching Eligibility',
    goodScore: '120+',
    seoTitle: 'Free CTET Mock Test 2026 | Teaching Pedagogy Special',
    seoDescription: 'Mock test for CTET 2026 candidates. 150 questions covering CDP, EVS, Maths, and Hindi/English. Free practice for teachers.',
    sections: [
      { id: 'cdp', label: 'Child Development & Pedagogy', questionCount: 30 },
      { id: 'evs', label: 'EVS', questionCount: 30 },
      { id: 'maths', label: 'Mathematics', questionCount: 30 },
      { id: 'lang1', label: 'Language 1', questionCount: 30 },
      { id: 'lang2', label: 'Language 2', questionCount: 30 }
    ]
  },
  {
    id: 'rbi-grade-b',
    slug: 'rbi-grade-b',
    name: 'RBI Grade B Phase 1 2026',
    durationMinutes: 120,
    totalQuestions: 200,
    targetColleges: 'Reserve Bank of India Officers',
    goodScore: '110+',
    seoTitle: 'Free RBI Grade B Mock Test 2026 | Officer Grade Prep',
    seoDescription: 'Elite mock test for RBI Grade B Phase 1. 200 questions including General Awareness, Reasoning, and ESI focus.',
    sections: [
      { id: 'ga', label: 'General Awareness', questionCount: 80 },
      { id: 'lr', label: 'Reasoning', questionCount: 60 },
      { id: 'english', label: 'English', questionCount: 30 },
      { id: 'quant', label: 'Quant', questionCount: 30 }
    ]
  },
  {
    id: 'nda',
    slug: 'nda',
    name: 'NDA GAT 2026',
    durationMinutes: 150,
    totalQuestions: 150,
    targetColleges: 'National Defence Academy (Army, Navy, AF)',
    goodScore: '350+',
    seoTitle: 'Free NDA GAT Mock Test 2026 | Defence Entrance Prep',
    seoDescription: 'Take the NDA General Ability Test mock. 150 questions on English and General Knowledge. Prepare for UPSC NDA exam.',
    sections: [
      { id: 'english', label: 'English', questionCount: 50 },
      { id: 'gk', label: 'General Knowledge', questionCount: 100 }
    ]
  },
  {
    id: 'cuet-ug',
    slug: 'cuet-ug',
    name: 'CUET UG 2026 (General Test)',
    durationMinutes: 60,
    totalQuestions: 60,
    targetColleges: 'DU, BHU, JNU, Central Universities',
    goodScore: '50+',
    seoTitle: 'Free CUET Mock Test 2026 | General Test Practice',
    seoDescription: 'Master the CUET UG 2026 General Test. 60 questions covering GK, Mental Ability, and Numerical Reasoning.',
    sections: [
      { id: 'gk-ca', label: 'GK & Current Affairs', questionCount: 20 },
      { id: 'mental-ability', label: 'Mental Ability', questionCount: 20 },
      { id: 'numerical', label: 'Numerical Ability', questionCount: 20 }
    ]
  },
  {
    id: 'ssc-mts',
    slug: 'ssc-mts',
    name: 'SSC MTS 2026',
    durationMinutes: 90,
    totalQuestions: 90,
    targetColleges: 'Multi-Tasking Staff Govt Departments',
    goodScore: '80+',
    seoTitle: 'Free SSC MTS Mock Test 2026 | Full Length Practice Paper',
    seoDescription: 'Attempt the SSC MTS mock test based on the latest pattern. 90 questions in 90 minutes. Focus on scoring sections for govt selection.',
    sections: [
      { id: 'num-math', label: 'Numerical & Math Ability', questionCount: 20 },
      { id: 'reasoning', label: 'Reasoning Ability', questionCount: 20 },
      { id: 'ga', label: 'General Awareness', questionCount: 25 },
      { id: 'english', label: 'English Language', questionCount: 25 }
    ]
  },
  {
    id: 'ibps-clerk',
    slug: 'ibps-clerk',
    name: 'IBPS Clerk 2026',
    durationMinutes: 60,
    totalQuestions: 100,
    targetColleges: 'Participating Public Sector Banks',
    goodScore: '75+',
    seoTitle: 'Free IBPS Clerk Mock Test 2026 | Banking Assistant Prep',
    seoDescription: 'Prepare for IBPS Clerk with our free mock tests. 100 questions, 60 minutes. Sectional timings and detailed solutions included.',
    sections: [
      { id: 'english', label: 'English', questionCount: 30 },
      { id: 'quant', label: 'Quant', questionCount: 35 },
      { id: 'reasoning', label: 'Reasoning', questionCount: 35 }
    ]
  },
  {
    id: 'sbi-clerk',
    slug: 'sbi-clerk',
    name: 'SBI Clerk 2026',
    durationMinutes: 60,
    totalQuestions: 100,
    targetColleges: 'State Bank of India Junior Associates',
    goodScore: '80+',
    seoTitle: 'Free SBI Clerk Mock Test 2026 | Online Practice Series',
    seoDescription: 'Boost your speed with SBI Clerk Prelims mock test. 100 questions in 60 minutes. Realistic SBI-style simulation.',
    sections: [
      { id: 'english', label: 'English', questionCount: 30 },
      { id: 'quant', label: 'Quant', questionCount: 35 },
      { id: 'reasoning', label: 'Reasoning', questionCount: 35 }
    ]
  },
  {
    id: 'rbi-assistant',
    slug: 'rbi-assistant',
    name: 'RBI Assistant 2026',
    durationMinutes: 60,
    totalQuestions: 100,
    targetColleges: 'Reserve Bank of India Offices',
    goodScore: '90+',
    seoTitle: 'Free RBI Assistant Mock Test 2026 | High Speed Banking Prep',
    seoDescription: 'Practice for RBI Assistant Prelims. 100 questions with a focus on speed and accuracy. Free full-length mock series.',
    sections: [
      { id: 'english', label: 'English', questionCount: 30 },
      { id: 'quant', label: 'Quant', questionCount: 35 },
      { id: 'reasoning', label: 'Reasoning', questionCount: 35 }
    ]
  },
  {
    id: 'rrb-alp',
    slug: 'rrb-alp',
    name: 'RRB ALP 2026',
    durationMinutes: 60,
    totalQuestions: 75,
    targetColleges: 'Indian Railways (Loco Pilot)',
    goodScore: '55+',
    seoTitle: 'Free RRB ALP Mock Test 2026 | Assistant Loco Pilot Prep',
    seoDescription: 'Mock test for RRB ALP CBT 1. 75 questions in 60 minutes covering Science, Math, and Reasoning.',
    sections: [
      { id: 'math', label: 'Mathematics', questionCount: 20 },
      { id: 'reasoning', label: 'Mental Ability', questionCount: 25 },
      { id: 'science', label: 'General Science', questionCount: 20 },
      { id: 'ga-ca', label: 'General Awareness', questionCount: 10 }
    ]
  },
  {
    id: 'upsc-epfo',
    slug: 'upsc-epfo',
    name: 'UPSC EPFO 2026',
    durationMinutes: 120,
    totalQuestions: 120,
    targetColleges: 'Enforcement Officer / Accounts Officer',
    goodScore: '80+',
    seoTitle: 'Free UPSC EPFO Mock Test 2026 | Officer Grade Practice',
    seoDescription: 'UPSC EPFO RT Exam mock test. 120 questions on Labor Laws, Accounts, English, and General Science.',
    sections: [
      { id: 'english', label: 'English', questionCount: 20 },
      { id: 'labor-laws', label: 'Labor Laws & Social Security', questionCount: 25 },
      { id: 'accounts', label: 'General Accounting Principles', questionCount: 15 },
      { id: 'gs-quant', label: 'GS & Quant', questionCount: 60 }
    ]
  },
  {
    id: 'lic-aao',
    slug: 'lic-aao',
    name: 'LIC AAO 2026',
    durationMinutes: 60,
    totalQuestions: 100,
    targetColleges: 'Life Insurance Corporation of India',
    goodScore: '60+',
    seoTitle: 'Free LIC AAO Mock Test 2026 | Insurance Officer Prep',
    seoDescription: 'Practice for LIC AAO Prelims with our free mock test. 100 questions on Reasoning, Quant, and English (qualifying).',
    sections: [
      { id: 'reasoning', label: 'Reasoning', questionCount: 35 },
      { id: 'quant', label: 'Quant', questionCount: 35 },
      { id: 'english', label: 'English (Qualifying)', questionCount: 30 }
    ]
  },
  {
    id: 'nabard-grade-a',
    slug: 'nabard-grade-a',
    name: 'NABARD Grade A 2026',
    durationMinutes: 120,
    totalQuestions: 200,
    targetColleges: 'NABARD Offices',
    goodScore: '100+',
    seoTitle: 'Free NABARD Grade A Mock Test 2026 | RDBS Prep',
    seoDescription: 'Full length mock test for NABARD Grade A. 200 questions including ARD and ESI sections.',
    sections: [
      { id: 'ard', label: 'Agriculture & Rural Development', questionCount: 40 },
      { id: 'esi', label: 'Economic & Social Issues', questionCount: 40 },
      { id: 'ga', label: 'General Awareness', questionCount: 20 },
      { id: 'other', label: 'Reasoning, English, Quant & IT', questionCount: 100 }
    ]
  },
  {
    id: 'cds',
    slug: 'cds',
    name: 'CDS (Elementary Maths) 2026',
    durationMinutes: 120,
    totalQuestions: 100,
    targetColleges: 'IMA, OTA, AFA, INA',
    goodScore: '60+',
    seoTitle: 'Free CDS Mock Test 2026 | Combined Defence Services Prep',
    seoDescription: 'Take CDS Elementary Maths mock test. 100 questions in 2 hours. Practice for UPSC CDS exams.',
    sections: [
      { id: 'arithmetic', label: 'Arithmetic', questionCount: 40 },
      { id: 'algebra', label: 'Algebra & Geometry', questionCount: 40 },
      { id: 'trig-stat', label: 'Trigonometry & Statistics', questionCount: 20 }
    ]
  },
  {
    id: 'afcat',
    slug: 'afcat',
    name: 'AFCAT 2026',
    durationMinutes: 120,
    totalQuestions: 100,
    targetColleges: 'Indian Air Force Officers',
    goodScore: '180+',
    seoTitle: 'Free AFCAT Mock Test 2026 | Air Force Common Admission',
    seoDescription: 'Practice for AFCAT 2026 online. 100 questions covering English, GK, Maths, and Military Reasoning. Get your AFCAT score now.',
    sections: [
      { id: 'english', label: 'English', questionCount: 30 },
      { id: 'gk', label: 'General Knowledge', questionCount: 25 },
      { id: 'quant', label: 'Numerical Ability', questionCount: 20 },
      { id: 'reasoning', label: 'Reasoning & Military Aptitude', questionCount: 25 }
    ]
  },
  {
    id: 'reet',
    slug: 'reet',
    name: 'REET Level 1 2026',
    durationMinutes: 150,
    totalQuestions: 150,
    targetColleges: 'Rajasthan Primary Teachers',
    goodScore: '125+',
    seoTitle: 'Free REET Mock Test 2026 | Rajasthan Teacher Exam',
    seoDescription: 'Mock test for REET 2026 Level 1. 150 questions on CDP, Rajasthan GK, Hindi/English, and EVS.',
    sections: [
      { id: 'cdp', label: 'Child Development', questionCount: 30 },
      { id: 'lang1', label: 'Language 1', questionCount: 30 },
      { id: 'lang2', label: 'Language 2', questionCount: 30 },
      { id: 'maths', label: 'Mathematics', questionCount: 30 },
      { id: 'evs', label: 'EVS', questionCount: 30 }
    ]
  },
  {
    id: 'rpsc-ras',
    slug: 'rpsc-ras',
    name: 'RPSC RAS Prelims 2026',
    durationMinutes: 180,
    totalQuestions: 150,
    targetColleges: 'Rajasthan Administrative Services',
    goodScore: '90+',
    seoTitle: 'Free RPSC RAS Mock Test 2026 | Rajasthan Prelims GS',
    seoDescription: 'Full length RAS prelims mock test. 150 questions with special focus on Rajasthan Economy and Culture.',
    sections: [
      { id: 'raj-special', label: 'Rajasthan Arts, History & Economy', questionCount: 50 },
      { id: 'indian-gs', label: 'Indian History & Polity', questionCount: 50 },
      { id: 'quant-lr', label: 'Mental Ability & Maths', questionCount: 20 },
      { id: 'ca-science', label: 'Science & Current Affairs', questionCount: 30 }
    ]
  },
  {
    id: 'uppsc-pcs',
    slug: 'uppsc-pcs',
    name: 'UPPSC PCS Prelims 2026',
    durationMinutes: 120,
    totalQuestions: 150,
    targetColleges: 'UP State Civil Services',
    goodScore: '95+',
    seoTitle: 'Free UPPSC Mock Test 2026 | Uttar Pradesh Civil Services',
    seoDescription: 'Practice for UPPSC PCS Paper 1 online. 150 questions covering UP Special and General GS.',
    sections: [
      { id: 'gs-general', label: 'General Studies', questionCount: 120 },
      { id: 'up-special', label: 'UP Special GK', questionCount: 30 }
    ]
  },
  {
    id: 'bpsc',
    slug: 'bpsc',
    name: 'BPSC Prelims 2026',
    durationMinutes: 120,
    totalQuestions: 150,
    targetColleges: 'Bihar Administrative Services',
    goodScore: '100+',
    seoTitle: 'Free BPSC Mock Test 2026 | Bihar Civil Services Prep',
    seoDescription: 'Attempt the BPSC 71st/72nd Prelims mock test. 150 questions on Bihar History, Science, and Current Affairs.',
    sections: [
      { id: 'history-bihar', label: 'History & Bihar Special', questionCount: 50 },
      { id: 'science', label: 'General Science', questionCount: 30 },
      { id: 'ca-other', label: 'Current Affairs & Other GS', questionCount: 70 }
    ]
  },
  {
    id: 'upsssc-pet',
    slug: 'upsssc-pet',
    name: 'UPSSSC PET 2026',
    durationMinutes: 120,
    totalQuestions: 100,
    targetColleges: 'UP Group C & D Govt Jobs',
    goodScore: '80+',
    seoTitle: 'Free UPSSSC PET Mock Test 2026 | UP Prelims Practice',
    seoDescription: 'Mock test for UPSSSC PET. 100 questions covering Table/Graph analysis and GS.',
    sections: [
      { id: 'gs-history', label: 'History & Geography', questionCount: 20 },
      { id: 'hindi-english', label: 'Hindi & English', questionCount: 15 },
      { id: 'quant-lr', label: 'Maths & Reasoning', questionCount: 15 },
      { id: 'graph-table', label: 'Graph & Table Analysis', questionCount: 20 },
      { id: 'ca-gs', label: 'Current Affairs & GS', questionCount: 30 }
    ]
  },
  {
    id: 'dsssb',
    slug: 'dsssb',
    name: 'DSSSB PRT/TGT 2026',
    durationMinutes: 120,
    totalQuestions: 200,
    targetColleges: 'Delhi Govt Teaching & Admin Roles',
    goodScore: '140+',
    seoTitle: 'Free DSSSB Mock Test 2026 | Delhi Selection Board Prep',
    seoDescription: 'Mock test for DSSSB exams. 200 questions including General Paper and Teaching Methodology.',
    sections: [
      { id: 'gen-paper', label: 'General Awareness, Reasoning & Quant', questionCount: 60 },
      { id: 'lang', label: 'Hindi & English Language', questionCount: 40 },
      { id: 'subject', label: 'Subject Knowledge/Pedagogy', questionCount: 100 }
    ]
  },
  {
    id: 'xat',
    slug: 'xat',
    name: 'XAT 2027',
    durationMinutes: 210,
    totalQuestions: 95,
    targetColleges: 'XLRI Jamshedpur, SPJIMR, IMT, XIMB',
    goodScore: '35+',
    seoTitle: 'Free XAT Mock Test 2027 | XLRI Decision Making, VALR, QADI & GK Practice (95 Questions)',
    seoDescription: 'Take a full-length 95-question XAT 2027 mock test with 5-choice options, Decision Making caselets, VALR, QA & DI, and GK. Instant XLRI cutoff prediction and full solutions.',
    keywords: ['XAT mock test 2027', 'xat 2027', 'XLRI Jamshedpur decision making practice 2027', 'free XAT online test series 2027', 'XAT verbal logical quantitative aptitude', 'XAT exam pattern with solutions', 'XAT score vs percentile predictor'],
    sections: [
      { id: 'valr', label: 'Verbal & Logical Ability', questionCount: 26 },
      { id: 'dm', label: 'Decision Making', questionCount: 21 },
      { id: 'qadi', label: 'QA & Data Interpretation', questionCount: 28 },
      { id: 'gk', label: 'General Knowledge', questionCount: 20 }
    ],
    topCollegesList: [
      { name: 'XLRI Jamshedpur (BM)', cutoff: '95+ %ile' },
      { name: 'XLRI Jamshedpur (HRM)', cutoff: '93+ %ile' },
      { name: 'SPJIMR Mumbai', cutoff: '92+ %ile' },
      { name: 'XIMB Bhubaneswar', cutoff: '90+ %ile' },
      { name: 'IMT Ghaziabad', cutoff: '85+ %ile' }
    ],
    features: [
      'Realistic Decision Making Section',
      'XAT 2027 Negative Marking Pattern',
      'Sectional Timing Simulation',
      'XLRI Jamshedpur Percentile Predictor',
      'Detailed Post-Exam Analysis'
    ]
  },
  {
    id: 'gmat',
    slug: 'gmat',
    name: 'GMAT Focus Edition 2026',
    durationMinutes: 135,
    totalQuestions: 64,
    targetColleges: 'ISB, IIMs (One Year), Harvard, INSEAD',
    goodScore: '655+',
    seoTitle: 'Free GMAT Focus Edition Mock Test 2026 | Adaptive Practice',
    seoDescription: 'Master the GMAT Focus Edition 2026 with our free mock test. Practice Quantitative, Verbal, and Data Insights sections with instant scaled scores.',
    keywords: ['GMAT Focus Edition mock test 2026', 'free GMAT practice test online', 'GMAT quantitative verbal data insights mock', 'GMAT scaled score estimation tool', 'ISB and Harvard MBA preparation online'],
    sections: [
      { id: 'quant', label: 'Quantitative Reasoning', questionCount: 21 },
      { id: 'verbal', label: 'Verbal Reasoning', questionCount: 23 },
      { id: 'di', label: 'Data Insights', questionCount: 20 }
    ]
  },
  {
    id: 'snap',
    slug: 'snap',
    name: 'SNAP Dec 2026',
    durationMinutes: 60,
    totalQuestions: 60,
    targetColleges: 'SIBM Pune, SCMHRD, SIIB, SIOM',
    goodScore: '40+',
    seoTitle: 'Free SNAP Dec 2026 Mock Test | 2026-27 Exam Practice',
    seoDescription: 'Master the SNAP December 2026 exam with our free full-length mock test. 60 questions in 60 minutes. Simulate the actual SIBM Pune and SCMHRD entrance interface for the 2026-27 cycle.',
    keywords: ['SNAP mock test 2026', 'SIBM Pune SCMHRD mock test free', 'SNAP December exam practice paper', 'SNAP general English logic quantitative mock', 'SNAP score to percentile calculator'],
    sections: [
      { id: 'english', label: 'General English', questionCount: 15 },
      { id: 'logic', label: 'Analytical & Logical Reasoning', questionCount: 25 },
      { id: 'quant', label: 'Quant, DI & DS', questionCount: 20 }
    ],
    topCollegesList: [
      { name: 'SIBM Pune', cutoff: '98+ %ile' },
      { name: 'SCMHRD Pune', cutoff: '96+ %ile' },
      { name: 'SIIB Pune', cutoff: '92+ %ile' },
      { name: 'SIBM Bangalore', cutoff: '90+ %ile' },
      { name: 'SIDTM Pune', cutoff: '85+ %ile' }
    ]
  },
  {
    id: 'ipu-cet-ug',
    slug: 'ipu-cet-ug',
    name: 'IPU CET / CUET UG 2026',
    durationMinutes: 60,
    totalQuestions: 60,
    targetColleges: 'MSIT, MAIT, VIPS, JIMS (GGSIPU)',
    goodScore: '50+',
    seoTitle: 'Free IPU CET / CUET UG Mock Test 2026 | BBA & BCA Prep',
    seoDescription: 'Practice for IPU CET and CUET UG 2026. General Test simulation for BBA, BCA, and B.Com admission in Delhi GGSIPU colleges.',
    keywords: ['IPU CET mock test 2026', 'CUET UG general test mock test', 'GGSIPU BBA and BCA admission mock', 'free IPU CET test series online', 'IPU CET sample papers with solutions'],
    sections: [
      { id: 'gk-ca', label: 'GK & Current Affairs', questionCount: 20 },
      { id: 'mental-ability', label: 'Mental Ability', questionCount: 20 },
      { id: 'numerical', label: 'Numerical Ability', questionCount: 20 }
    ]
  },
  {
    id: 'ipu-cet-pg',
    slug: 'ipu-cet-pg',
    name: 'IPU CET / CUET PG 2026',
    durationMinutes: 105,
    totalQuestions: 75,
    targetColleges: 'USMS, USICT, CDAC, GGSIPU MBA/MCA',
    goodScore: '60+',
    seoTitle: 'Free IPU CET / CUET PG Mock Test 2026 | MBA & MCA Prep',
    seoDescription: 'Master the IPU CET and CUET PG 2026. Realistic simulation for MBA, MCA, and Law PG admissions in GGSIPU.',
    keywords: ['IPU CET PG mock test 2026', 'CUET PG MBA MCA practice paper', 'GGSIPU post graduate admission mock', 'free IPU CET PG online test series', 'IPU CET PG syllabus details'],
    sections: [
      { id: 'language', label: 'Language Comprehension', questionCount: 25 },
      { id: 'quant', label: 'Mathematical/Quant Ability', questionCount: 25 },
      { id: 'reasoning', label: 'Logical Reasoning', questionCount: 25 }
    ]
  },
  {
    id: 'atma',
    slug: 'atma',
    name: 'ATMA 2026',
    durationMinutes: 180,
    totalQuestions: 180,
    targetColleges: 'JBIMS, SIMSREE, PUMBA, Welingkar',
    goodScore: '120+',
    seoTitle: 'Free ATMA Mock Test 2026 | MBA Admission Practice Tool',
    seoDescription: 'Take our free full-length ATMA 2026 mock test. 180 questions, 180 minutes pattern with 6 specialized sections. Get instant analytics and college cutoffs.',
    keywords: ['ATMA mock test 2026', 'AIMS ATMA exam practice online', 'free ATMA test series', 'ATMA analytical verbal quantitative mock', 'ATMA score vs percentile predictor', 'JBIMS and PUMBA ATMA cutoff'],
    sections: [
      { id: 'analytical-1', label: 'Analytical Reasoning Skills I', questionCount: 30 },
      { id: 'analytical-2', label: 'Analytical Reasoning Skills II', questionCount: 30 },
      { id: 'verbal-1', label: 'Verbal Skills I', questionCount: 30 },
      { id: 'verbal-2', label: 'Verbal Skills II', questionCount: 30 },
      { id: 'quant-1', label: 'Quantitative Skills I', questionCount: 30 },
      { id: 'quant-2', label: 'Quantitative Skills II', questionCount: 30 }
    ],
    features: [
      'Strictly follows ATMA 2026 pattern (6 Sections)',
      '30-Minute Sectional Timers',
      'Negative Marking Simulation (-0.25)',
      'Detailed Performance Report',
      'Target College Cutoff Tracker'
    ],
    topCollegesList: [
      { name: 'JBIMS Mumbai', cutoff: '99.9+ %ile' },
      { name: 'SIMSREE Mumbai', cutoff: '99.7+ %ile' },
      { name: 'PUMBA Pune', cutoff: '98+ %ile' },
      { name: 'Welingkar Mumbai', cutoff: '97+ %ile' },
      { name: 'MET Mumbai', cutoff: '95+ %ile' }
    ],
    faqs: [
      {
        question: "What is the marking scheme for ATMA 2026?",
        answer: "ATMA follows a +1 for correct answer and -0.25 for incorrect answer marking scheme. There is no penalty for unattempted questions."
      },
      {
        question: "Is there a sectional time limit in ATMA?",
        answer: "Yes, each of the six sections has a strict 30-minute time limit. You cannot move back and forth between sections."
      },
      {
        question: "Which MBA colleges accept ATMA scores?",
        answer: "Over 500+ MBA colleges in India accept ATMA scores, including top institutes like JBIMS, SIMSREE, PUMBA, and Welingkar (primarily for OMS candidates or specific quotas)."
      }
    ],
    markingScheme: { correct: 1, negative: 0.25 }
  },
  {
    id: 'cmat',
    slug: 'cmat',
    name: 'CMAT 2027',
    durationMinutes: 180,
    totalQuestions: 100,
    targetColleges: 'JBIMS Mumbai, GIM Goa, K J Somaiya, Great Lakes, SIMSREE',
    goodScore: '300+',
    seoTitle: 'Free CMAT Mock Test 2027 | National MBA Entrance Practice Tool',
    seoDescription: 'Take our free full-length CMAT 2027 mock test. 100 questions covering Quant/DI, Logical Reasoning, Language Comprehension, General Awareness, and Innovation & Entrepreneurship.',
    keywords: [
      'CMAT mock test 2027', 'cmat 2027', 'free CMAT test series online', 
      'CMAT practice paper with answers', 'CMAT score vs percentile predictor', 
      'JBIMS CMAT cutoff', 'GIM Goa CMAT mock'
    ],
    sections: [
      { id: 'quant-di', label: 'Quantitative Techniques & Data Interpretation', questionCount: 20 },
      { id: 'logical-reasoning', label: 'Logical Reasoning', questionCount: 20 },
      { id: 'language', label: 'Language Comprehension', questionCount: 20 },
      { id: 'general-awareness', label: 'General Awareness', questionCount: 20 },
      { id: 'innovation', label: 'Innovation & Entrepreneurship', questionCount: 20 }
    ],
    topCollegesList: [
      { name: 'JBIMS Mumbai', cutoff: '99.9+ %ile' },
      { name: 'SIMSREE Mumbai', cutoff: '99.7+ %ile' },
      { name: 'GIM Goa', cutoff: '98+ %ile' },
      { name: 'K J Somaiya Mumbai', cutoff: '97+ %ile' },
      { name: 'Great Lakes Chennai', cutoff: '95+ %ile' }
    ],
    features: [
      'Official CMAT 2027 100-Question Format',
      'All 5 Sections Covered (Including Innovation & Entrepreneurship)',
      'Marking Scheme: +4 Correct, -1 Negative Marking',
      'Instant Percentile & Top B-School Cutoff Predictor',
      'Detailed Step-by-Step Solutions'
    ],
    faqs: [
      {
        question: 'What is the pattern of CMAT 2027?',
        answer: 'CMAT 2027 comprises 100 questions across 5 sections: Quant & DI (20), Logical Reasoning (20), Language Comprehension (20), General Awareness (20), and Innovation & Entrepreneurship (20) with a total duration of 180 minutes.'
      },
      {
        question: 'What is the marking scheme in CMAT?',
        answer: 'Each correct answer gives +4 marks, while each incorrect answer attracts a negative marking penalty of -1 mark. Unattempted questions carry 0 marks.'
      }
    ],
    markingScheme: { correct: 4, negative: 1 }
  },
  {
    id: 'ielts',
    slug: 'ielts',
    name: 'IELTS Academic 2026',
    durationMinutes: 120,
    totalQuestions: 80,
    targetColleges: 'Top Universities in USA, UK, Canada, Australia',
    goodScore: 'Band 7.0+',
    seoTitle: 'Free IELTS Academic Mock Test 2026 | Band 7+ Prep',
    seoDescription: 'Take our free full-length IELTS Academic mock test. Practice Listening and Reading sections with real exam-like questions to achieve a Band 7.0+ score.',
    keywords: ['IELTS Academic mock test 2026', 'free IELTS listening reading practice', 'IELTS Band 7 plus exam preparation', 'IELTS academic mock paper with answers', 'study abroad English proficiency test mock'],
    sections: [
      { id: 'listening', label: 'Listening', questionCount: 40 },
      { id: 'reading', label: 'Reading', questionCount: 40 }
    ],
    features: [
      'Strictly follows IELTS Academic Pattern',
      'Realistic Listening & Reading Simulation',
      'Instant Band Score Estimation',
      'Detailed Performance Analytics',
      'No Negative Marking Simulation'
    ],
    markingScheme: { correct: 1, negative: 0 }
  },
  {
    id: 'sat',
    slug: 'sat',
    name: 'Digital SAT 2026',
    durationMinutes: 134,
    totalQuestions: 98,
    targetColleges: 'Ivy League, MIT, Stanford, Global Universities',
    goodScore: '1400+',
    seoTitle: 'Free Digital SAT Mock Test 2026 | Full Length Practice',
    seoDescription: 'Take our free full-length Digital SAT mock test. Practice Reading and Writing & Math modules with realistic questions to boost your score to 1400+.',
    keywords: ['Digital SAT mock test 2026', 'free Digital SAT reading writing math practice', 'Digital SAT score estimation tool online', 'Ivy league MIT admission test prep', 'SAT practice questions with solutions'],
    sections: [
      { id: 'rw', label: 'Reading & Writing', questionCount: 54 },
      { id: 'maths', label: 'Math', questionCount: 44 }
    ],
    features: [
      'Strictly follows Digital SAT Pattern',
      'Realistic Reading, Writing & Math Simulation',
      'Instant Scaled Score Estimation',
      'Detailed Performance Analytics',
      'No Negative Marking Simulation'
    ],
    markingScheme: { correct: 1, negative: 0 }
  },
  {
    id: 'toefl',
    slug: 'toefl',
    name: 'TOEFL iBT 2026',
    durationMinutes: 116,
    totalQuestions: 68,
    targetColleges: 'Top Universities in USA, UK, Canada, Australia',
    goodScore: '100+',
    seoTitle: 'Free TOEFL iBT Mock Test 2026 | Score 100+ Prep',
    seoDescription: 'Take our free TOEFL iBT mock test. Practice Reading and Listening sections with real exam-like questions to achieve a 100+ score for study abroad.',
    keywords: ['TOEFL iBT mock test 2026', 'free TOEFL reading listening practice paper', 'TOEFL score 100 plus preparation online', 'English proficiency test for study abroad', 'TOEFL internet-based test sample questions'],
    sections: [
      { id: 'reading', label: 'Reading', questionCount: 40 },
      { id: 'listening', label: 'Listening', questionCount: 28 }
    ],
    features: [
      'Strictly follows new TOEFL iBT Pattern',
      'Realistic Reading & Listening Simulation',
      'Instant Score Estimation',
      'Detailed Performance Analytics',
      'No Negative Marking Simulation'
    ],
    markingScheme: { correct: 1, negative: 0 }
  },
  {
    id: 'gre',
    slug: 'gre',
    name: 'GRE General Test 2026',
    durationMinutes: 118,
    totalQuestions: 54,
    targetColleges: 'Top Graduate & Business Schools Worldwide',
    goodScore: '320+',
    seoTitle: 'Free GRE Mock Test 2026 | Verbal & Quant Prep',
    seoDescription: 'Take our free full-length GRE mock test. Practice Verbal Reasoning and Quantitative Reasoning with realistic questions for MS/MBA abroad.',
    keywords: ['GRE General Test mock test 2026', 'free GRE verbal quantitative reasoning practice', 'GRE score 320 plus exam prep online', 'GRE mock paper for MS abroad admissions', 'GRE sample questions with answers'],
    sections: [
      { id: 'verbal', label: 'Verbal Reasoning', questionCount: 27 },
      { id: 'quant', label: 'Quantitative Reasoning', questionCount: 27 }
    ],
    features: [
      'Strictly follows New GRE General Test Pattern',
      'Realistic Verbal & Quant Simulation',
      'Instant Score Estimation',
      'Detailed Performance Analytics',
      'No Negative Marking Simulation'
    ],
    markingScheme: { correct: 1, negative: 0 }
  },
  {
    id: 'duolingo',
    slug: 'duolingo',
    name: 'Duolingo English Test 2026',
    durationMinutes: 60,
    totalQuestions: 60,
    targetColleges: 'Universities in USA, UK, Canada, Australia & Europe',
    goodScore: '125+',
    seoTitle: 'Free Duolingo English Test Mock 2026 | Full Length Practice',
    seoDescription: 'Take our free full-length Duolingo English Test (DET) mock test. Practice Literacy, Comprehension, Conversation, and Production sections with realistic adaptive-style questions.',
    keywords: ['Duolingo English Test mock 2026', 'free DET adaptive practice test online', 'Duolingo English score 120 plus prep', 'DET literacy comprehension conversation production', 'Duolingo English sample test questions'],
    sections: [
      { id: 'literacy', label: 'Literacy (Reading/Writing)', questionCount: 15 },
      { id: 'comprehension', label: 'Comprehension (Reading/Listening)', questionCount: 15 },
      { id: 'conversation', label: 'Conversation (Listening/Speaking)', questionCount: 15 },
      { id: 'production', label: 'Production (Writing/Speaking)', questionCount: 15 }
    ],
    features: [
      'Strictly follows Duolingo English Test Pattern',
      'Realistic Adaptive Question Simulation',
      'Instant Score Estimation (10-160 Scale)',
      'Detailed Performance Analytics',
      'No Negative Marking Simulation'
    ],
    faqs: [
      {
        question: 'How is the Duolingo English Test scored?',
        answer: 'The DET is scored on a scale from 10 to 160 in 5-point increments. A score above 120 is generally considered very good for top university admissions.'
      },
      {
        question: 'Is the DET accepted by all universities?',
        answer: 'Most universities in the USA, UK, and Canada now accept DET scores as an alternative to IELTS or TOEFL. However, always check the specific university website for the latest requirements.'
      }
    ],
    markingScheme: { correct: 1, negative: 0 }
  }
];

import { ATMA_QUESTIONS } from './atma-questions';
import { CDS_QUESTIONS } from './cds-questions';
import { REAL_EXAM_QUESTIONS } from './real-exam-questions';
import { MHCET_QUESTIONS } from './mhcet-questions';
import { CAT_MOCK_TEST_68 } from '@/data/cat_mock_test_68';
import { NMAT_MOCK_TEST_108 } from '@/data/nmat_mock_test_108';
import { XAT_MOCK_TEST_95 } from '@/data/xat_mock_test_95';
import { SNAP_MOCK_TEST_60 } from '@/data/snap_mock_test_60';

export function generateMockQuestions(config: ExamConfig, setNumber: number = 1): GenericQuestion[] {
  let questions: GenericQuestion[] = [];
  let idCounter = 1 + (setNumber - 1) * 1000;
  
  // Custom logic for Exams with real data
  let realData: any = null;
  
  if (config.slug === 'cds') realData = CDS_QUESTIONS;
  else if (config.slug === 'mhcet') {
    const mhcetMap: any = {};
    MHCET_QUESTIONS.forEach(q => {
      const sectionKey = q.section.toLowerCase();
      if (!mhcetMap[sectionKey]) mhcetMap[sectionKey] = [];
      mhcetMap[sectionKey].push({ ...q, sectionId: sectionKey });
    });
    realData = mhcetMap;
  }
  else if (REAL_EXAM_QUESTIONS[config.slug]) {
    realData = REAL_EXAM_QUESTIONS[config.slug];
  }
  else if (config.slug === 'cat') {
    const catMap: any = {};
    CAT_MOCK_TEST_68.forEach(q => {
      const sectionKey = q.section.toLowerCase();
      if (!catMap[sectionKey]) catMap[sectionKey] = [];
      catMap[sectionKey].push({
        id: q.id,
        sectionId: sectionKey,
        text: (q.passageText ? `[${q.passageTitle}]\n\n${q.passageText}\n\n` : q.scenarioText ? `[${q.scenarioTitle}]\n\n${q.scenarioText}\n\n` : '') + q.questionText,
        options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
        explanation: q.solution
      });
    });
    realData = catMap;
  }
  else if (config.slug === 'nmat') {
    const nmatMap: any = {};
    NMAT_MOCK_TEST_108.forEach(q => {
      const sectionKey = q.section.toLowerCase();
      if (!nmatMap[sectionKey]) nmatMap[sectionKey] = [];
      nmatMap[sectionKey].push({
        id: q.id,
        sectionId: sectionKey,
        text: (q.passageText ? `[${q.passageTitle}]\n\n${q.passageText}\n\n` : q.scenarioText ? `[${q.scenarioTitle}]\n\n${q.scenarioText}\n\n` : '') + q.questionText,
        options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
        explanation: q.solution
      });
    });
    realData = nmatMap;
  }
  else if (config.slug === 'xat') {
    const xatMap: any = {};
    XAT_MOCK_TEST_95.forEach(q => {
      const sectionKey = q.section.toLowerCase();
      if (!xatMap[sectionKey]) xatMap[sectionKey] = [];
      xatMap[sectionKey].push({
        id: q.id,
        sectionId: sectionKey,
        text: (q.passageText ? `[${q.passageTitle}]\n\n${q.passageText}\n\n` : q.scenarioText ? `[${q.scenarioTitle}]\n\n${q.scenarioText}\n\n` : '') + q.questionText,
        options: q.options || ['Option A', 'Option B', 'Option C', 'Option D', 'Option E'],
        correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
        explanation: q.solution
      });
    });
    realData = xatMap;
  }
  else if (config.slug === 'snap') {
    const snapMap: any = {};
    SNAP_MOCK_TEST_60.forEach(q => {
      const sectionKey = q.section.toLowerCase();
      if (!snapMap[sectionKey]) snapMap[sectionKey] = [];
      snapMap[sectionKey].push({
        id: q.id,
        sectionId: sectionKey,
        text: (q.passageText ? `[${q.passageTitle}]\n\n${q.passageText}\n\n` : q.scenarioText ? `[${q.scenarioTitle}]\n\n${q.scenarioText}\n\n` : '') + q.questionText,
        options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
        explanation: q.solution
      });
    });
    realData = snapMap;
  }
  else if (config.slug === 'atma') {
    realData = ATMA_QUESTIONS;
  }

  // Add a random offset based on setNumber and time to ensure variation
  const seed = setNumber + Math.floor(Date.now() / 10000); 

  config.sections.forEach(section => {
    const sectionKey = section.id.toLowerCase();
    const sectionQuestions = realData ? realData[sectionKey] : undefined;
    
    // Shuffle section questions if they exist to avoid same order
    let availableRealQs = sectionQuestions ? [...sectionQuestions] : [];
    if (availableRealQs.length > 0) {
      availableRealQs.sort(() => Math.random() - 0.5);
    }

    for (let i = 0; i < section.questionCount; i++) {
      // Use real question if available and not yet used in this section
      if (i < availableRealQs.length) {
        const realQ = availableRealQs[i];
        questions.push({
          ...realQ,
          id: idCounter,
        });
      } else {
        const topics: Record<string, string[]> = {
          'maths': ['Calculus', 'Algebra', 'Trigonometry', 'Probability', 'Coordinate Geometry', 'Vectors', 'Matrices', 'Complex Numbers'],
          'quant': ['Profit & Loss', 'Time & Work', 'Percentages', 'Ratios & Proportions', 'Speed, Time & Distance', 'Averages', 'Simple & Compound Interest'],
          'arithmetic': ['Number Systems', 'LCM & HCF', 'Simplification', 'Averages', 'Percentages', 'Ratios'],
          'algebra': ['Linear Equations', 'Quadratic Equations', 'Logarithms', 'Sequences & Series', 'Permutations & Combinations'],
          'trig': ['Trigonometric Identities', 'Heights & Distances', 'Inverse Trigonometric Functions'],
          'english': ['Grammar', 'Vocabulary', 'Reading Comprehension', 'Sentence Correction', 'Idioms & Phrases'],
          'verbc': ['Critical Reasoning', 'Para Jumbles', 'Odd One Out', 'Critical Inference'],
          'gk': ['Indian Polity', 'Modern History', 'Geography', 'Economics', 'Current Affairs', 'Awards & Honors'],
          'ga': ['Static GK', 'Monthly Current Affairs', 'Sports', 'Science & Technology', 'Environment'],
          'logic': ['Coding-Decoding', 'Blood Relations', 'Syllogisms', 'Seating Arrangement', 'Data Sufficiency'],
          'reasoning': ['Series Completion', 'Analogies', 'Puzzles', 'Direction Sense', 'Input-Output'],
          'listening': ['Short Conversations', 'Monologues', 'Academic Discussions', 'Form Completion', 'Matching Information'],
          'reading': ['True/False/Not Given', 'Matching Headings', 'Multiple Choice', 'Summary Completion', 'Diagram Labeling'],
          'rw': ['Information and Ideas', 'Craft and Structure', 'Expression of Ideas', 'Standard English Conventions', 'Vocabulary in Context'],
          'verbal': ['Reading Comprehension', 'Text Completion', 'Sentence Equivalence', 'Vocabulary', 'Argument Analysis'],
          'literacy': ['Read and Complete', 'Read and Select', 'Writing Sample', 'Dictation'],
          'comprehension': ['Listen and Select', 'Listen and Type', 'Read and Select'],
          'production': ['Speak About the Photo', 'Write About the Photo', 'Read, then Speak', 'Listen, then Speak']
        };

        let topicList = topics[Object.keys(topics).find(k => sectionKey.includes(k)) || 'maths'] || ['Concept'];
        const topic = topicList[(i + seed) % topicList.length];

        const templates = [
          `In the context of ${config.name} ${section.label}, which of the following is a fundamental application of ${topic}?`,
          `According to the standard curriculum for ${section.label}, what is the primary objective of studying ${topic}?`,
          `A student preparing for ${config.name} is asked to analyze ${topic}. Which principle is most critical for this analysis?`,
          `Which of the following scenarios best illustrates the practical utility of ${topic} in the ${section.label} section?`,
          `Identify the most accurate statement regarding the role of ${topic} in achieving a high percentile in ${config.name}.`,
          `When solving problems related to ${topic} in ${section.label}, which of these factors must be prioritized?`
        ];
        
        const template = templates[(i + seed) % templates.length];

        questions.push({
          id: idCounter,
          sectionId: section.id,
          text: template,
          options: [
            `Comprehensive understanding of ${topic} principles`,
            `Advanced analytical application in ${section.label}`,
            `Theoretical optimization of ${topic} models`,
            `Practical implementation in ${config.name} scenarios`
          ],
          correctAnswer: (i + seed) % 4,
          explanation: `This evaluation focuses on your proficiency in ${topic} for the ${section.label} section of the ${config.name}. Mastery of these concepts is vital for a top score.`
        });
      }
      idCounter++;
    }
  });
  return questions;
}
