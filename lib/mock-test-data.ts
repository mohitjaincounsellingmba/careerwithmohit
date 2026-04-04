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
  features?: string[];
  faqs?: FAQItem[];
  examDetails?: ExamDetail[];
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
    sections: [
      { id: 'physics', label: 'Physics', questionCount: 30 },
      { id: 'chemistry', label: 'Chemistry', questionCount: 30 },
      { id: 'maths', label: 'Mathematics', questionCount: 30 }
    ]
  },
  {
    id: 'jee-advanced',
    slug: 'jee-advanced',
    name: 'IIT JEE Advanced 2026',
    durationMinutes: 180,
    totalQuestions: 54,
    targetColleges: 'IITs Only',
    goodScore: '140+',
    seoTitle: 'Free IIT JEE Advanced Mock Test 2026 | Paper 1 Pattern',
    seoDescription: 'Practice with a full-length IIT JEE Advanced mock test. Experience the real difficulty with Physics, Chemistry, and Mathematics sections.',
    sections: [
      { id: 'physics', label: 'Physics', questionCount: 18 },
      { id: 'chemistry', label: 'Chemistry', questionCount: 18 },
      { id: 'maths', label: 'Mathematics', questionCount: 18 }
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
    targetColleges: 'BITS Pilani, Goa, Hyderabad',
    goodScore: '270+',
    seoTitle: 'Free BITSAT Mock Test 2026 | BITS Pilani Preparation',
    seoDescription: 'Maximize your BITSAT score with our free full-length mock test. 130 questions in 3 hours. Includes Logical Reasoning and English Proficiency.',
    sections: [
      { id: 'physics', label: 'Physics', questionCount: 30 },
      { id: 'chemistry', label: 'Chemistry', questionCount: 30 },
      { id: 'english', label: 'English Proficiency', questionCount: 10 },
      { id: 'lr', label: 'Logical Reasoning', questionCount: 20 },
      { id: 'maths', label: 'Mathematics', questionCount: 40 }
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
    sections: [
      { id: 'physics', label: 'Physics', questionCount: 50 },
      { id: 'chemistry', label: 'Chemistry', questionCount: 50 },
      { id: 'botany', label: 'Botany', questionCount: 50 },
      { id: 'zoology', label: 'Zoology', questionCount: 50 }
    ]
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
    totalQuestions: 66,
    targetColleges: 'IIM Ahmedabad, IIM Bangalore, IIM Calcutta, FMS, SPJIMR',
    goodScore: '99+ Percentile',
    seoTitle: 'Free CAT Mock Test 2026 | Best Online Test Series for IIM Prep',
    seoDescription: 'Attempt the best Free CAT Mock Test 2026 based on the latest IIM exam pattern. Get AI analytics, all India percentile, and section-wise VARC, DILR, QA analysis.',
    sections: [
      { id: 'varc', label: 'Verbal Ability & Reading Comprehension', questionCount: 24 },
      { id: 'dilr', label: 'Data Interpretation & Logical Reasoning', questionCount: 20 },
      { id: 'quant', label: 'Quantitative Ability', questionCount: 22 }
    ],
    features: [
      'Latest CAT 2026 Exam Pattern',
      'Detailed AI-Powered Performance Analytics',
      'All India Percentile Predictor',
      'In-depth Sectional Analysis (VARC, DILR, QA)',
      'Video Analysis & Detailed Solutions',
      'Designed by IIM Alumni & Top Educators'
    ],
    faqs: [
      {
        question: 'Is this CAT 2026 Mock Test completely free?',
        answer: 'Yes, this full-length CAT 2026 mock test is completely free. It provides a real exam interface experience with 66 questions to be solved in 120 minutes.'
      },
      {
        question: 'What is the pattern of the CAT Mock Test?',
        answer: 'The mock test strictly follows the latest CAT pattern: 24 questions in VARC, 20 in DILR, and 22 in Quantitative Ability (QA). The total duration is 120 minutes with a sectional time limit of 40 minutes each.'
      },
      {
        question: 'Are the questions similar to the actual CAT exam?',
        answer: 'Our experts actively analyze past CAT papers. The difficulty level of this mock test is curated by IIM alumni to closely match the actual exam difficulty, ranging from moderate to tough.'
      },
      {
        question: 'Do I get detailed solutions after the test?',
        answer: 'Absolutely! Upon submission, you will receive an instant score sheet along with detailed text solutions and analytical breakdowns for every question.'
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
    ]
  }
];

export function generateMockQuestions(config: ExamConfig): GenericQuestion[] {
  let questions: GenericQuestion[] = [];
  let idCounter = 1;
  config.sections.forEach(section => {
    for (let i = 0; i < section.questionCount; i++) {
      questions.push({
        id: idCounter,
        sectionId: section.id,
        text: `Sample ${section.label} Question ${i + 1} for ${config.name}?`,
        options: [
          `Option A for Q${idCounter}`,
          `Option B for Q${idCounter}`,
          `Option C for Q${idCounter}`,
          `Option D for Q${idCounter}`
        ],
        correctAnswer: (idCounter % 4), // Simple predictable answer logic
        explanation: `This is the solution and explanation for ${section.label} question ${i + 1}.`
      });
      idCounter++;
    }
  });
  return questions;
}
