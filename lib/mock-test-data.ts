export interface SectionDetail {
  id: string;
  label: string;
  questionCount: number;
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
