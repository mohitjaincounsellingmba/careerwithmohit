export interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  link: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title: "XAT 2026: Sectional Timing and Exam Format Changes Announced",
    category: "MBA Admission 2026",
    date: "March 9, 2025",
    excerpt: "XLRI Jamshedpur has introduced revised sectional timings for XAT 2026 to better evaluate candidate aptitude. Aspirants for the 2026-28 batch should adjust their speed-metrics according to the new mock patterns released on the official portal.",
    link: "#"
  },
  {
    id: 2,
    title: "SPJIMR Mumbai Begins Profile-Based Shortlisting for 2026-28 Batch",
    category: "MBA Admission 2026",
    date: "March 7, 2025",
    excerpt: "SPJIMR has officially kicked off its early interview cycle. Candidates with exceptional academic profiles and consistent professional achievements are receiving early calls, emphasizing the institute's shift towards holistic profiling.",
    link: "#"
  },
  {
    id: 3,
    title: "SNAP 2025: Tentative Schedule Out for Symbiosis MBA Programs",
    category: "Entrance Exams",
    date: "March 5, 2025",
    excerpt: "The Symbiosis International University has released the tentative timeline for SNAP 2025. Registrations are expected to open in August, with the three-test window scheduled for December. Prepare your strategy for SIBM and SCMHRD.",
    link: "#"
  },
  {
    id: 4,
    title: "CAT 2026: IIM Lucknow Likely to Convene, Focus on Numerical Ability Increases",
    category: "Entrance Exams",
    date: "March 2, 2025",
    excerpt: "Internal sources suggest IIM Lucknow will likely convene CAT 2026. Experts anticipate a balanced paper with a slight increase in the complexity of Data Interpretation and Logical Reasoning (DILR). Early preparation is advised.",
    link: "#"
  }
];
