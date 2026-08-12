export type CourseType = 'free' | 'paid';

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  type: CourseType;
  price?: string;
  topics?: string[];
  features?: string[];
  description?: string;
  iconName?: 'Zap' | 'TrendingUp' | 'BarChart3' | 'BookOpen';
  color: string;
  externalLink?: string;
}

export const CERTIFICATIONS_DATA: Course[] = [
  {
    id: 'lv-python',
    title: "Python Tutorial",
    provider: "LearnVern",
    duration: "Self-Paced",
    type: 'free',
    topics: ["Python Syntax", "Data Types", "Object-Oriented Programming"],
    iconName: 'Zap',
    color: "bg-yellow-500",
    externalLink: "https://www.learnvern.com/course/python-tutorial-hindi"
  },
  {
    id: 'lv-dm',
    title: "Digital Marketing",
    provider: "LearnVern",
    duration: "Self-Paced",
    type: 'free',
    topics: ["Search Engine Optimization", "PPC Advertising", "Email Marketing"],
    iconName: 'TrendingUp',
    color: "bg-purple-500",
    externalLink: "https://www.learnvern.com/course/digital-marketing-tutorial-hindi"
  },
  {
    id: 'lv-excel',
    title: "Advance MS Excel",
    provider: "LearnVern",
    duration: "Self-Paced",
    type: 'free',
    topics: ["Macros & VBA", "Logical Functions", "Dashboard Creation"],
    iconName: 'BarChart3',
    color: "bg-green-600",
    externalLink: "https://www.learnvern.com/course/ms-excel-tutorial"
  },
  {
    id: 'lv-java',
    title: "Core Java Tutorial",
    provider: "LearnVern",
    duration: "Self-Paced",
    type: 'free',
    topics: ["JVM Architecture", "Multithreading", "Exception Handling"],
    iconName: 'Zap',
    color: "bg-orange-500",
    externalLink: "https://www.learnvern.com/course/java-tutorial-hindi"
  },
  {
    id: 'lv-ml',
    title: "Machine Learning with Python",
    provider: "LearnVern",
    duration: "Self-Paced",
    type: 'free',
    topics: ["Linear Regression", "Neural Networks", "Scikit-Learn"],
    iconName: 'BarChart3',
    color: "bg-indigo-600",
    externalLink: "https://www.learnvern.com/course/machine-learning-with-python-tutorial"
  },
  {
    id: 'stock-investing',
    title: "Stock Investing Made Easy",
    provider: "Elearn Markets",
    price: "Premium",
    duration: "Self-Paced",
    type: 'paid',
    description: "Master the art of stock market investing with this comprehensive beginner-to-pro guide.",
    features: ["Fundamental Analysis", "Technical Basics", "Portfolio Management"],
    iconName: 'BarChart3',
    color: "bg-rose-600",
    externalLink: "https://www.elearnmarkets.com/courses/display/stock-investing-made-easy?aff_code=ELMAFF2497&utm_source=ELMAFF2497&utm_medium=affiliate"
  },
  {
    id: 'advanced-excel-paid',
    title: "Advanced Excel Tutorial",
    provider: "Elearn Markets",
    price: "Premium",
    duration: "Self-Paced",
    type: 'paid',
    description: "Go beyond the basics and master complex Excel functions, data analysis, and automation.",
    features: ["Advanced Formulas", "Data Cleaning", "Macros & Pivot Tables"],
    iconName: 'BookOpen',
    color: "bg-emerald-600",
    externalLink: "https://www.elearnmarkets.com/courses/display/advanced-excel-tutorial?aff_code=ELMAFF2497&utm_source=ELMAFF2497&utm_medium=affiliate"
  },
  {
    id: 'iide-pg-digital-marketing',
    title: "PG in Digital Marketing & Business Strategy",
    provider: "IIDE",
    price: "Premium",
    duration: "11 Months",
    type: 'paid',
    description: "Earn a PG in Digital Marketing & Business Strategy from India's #1 Digital Business School.",
    features: ["MBA Level Program", "Job Assistance", "D2C Brands"],
    iconName: 'TrendingUp',
    color: "bg-blue-600",
    externalLink: "https://iide.co/pg-digital-marketing-business-strategy/?ref=MOH825"
  },
  {
    id: 'iide-bachelors-digital-business',
    title: "Bachelors in Digital Business & Entrepreneurship",
    provider: "IIDE",
    price: "Premium",
    duration: "3 Years",
    type: 'paid',
    description: "Join India's 1st 3-Year UG Bachelor's in Digital Business program.",
    features: ["Digital-Driven Curriculum", "100% Placement Assistance", "UG Degree"],
    iconName: 'BookOpen',
    color: "bg-indigo-600",
    externalLink: "https://iide.co/bachelors-in-digital-business-program?ref=MOH825"
  },
  {
    id: 'iide-ai-course',
    title: "Professional Online AI Course",
    provider: "IIDE",
    price: "Premium",
    duration: "Self-Paced",
    type: 'paid',
    description: "Gain hands-on experience with AI tools & techniques from industry experts.",
    features: ["AI Tools", "Real Projects", "Certification"],
    iconName: 'Zap',
    color: "bg-purple-600",
    externalLink: "https://iide.co/ai-courses/online?ref=MOH825"
  },
  {
    id: 'iide-online-digital-marketing',
    title: "Online Digital Marketing Course",
    provider: "IIDE",
    price: "Premium",
    duration: "4-6 Months",
    type: 'paid',
    description: "India's best online digital marketing courses with AI-powered training.",
    features: ["AI-powered training", "100% placement assistance", "Online"],
    iconName: 'TrendingUp',
    color: "bg-rose-600",
    externalLink: "https://iide.co/online-digital-marketing-course?ref=MOH825"
  }
];
