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
    title: "JEE Main 2026: Session 2 Applications Reopen Temporarily",
    category: "B.Tech Admission",
    date: "March 12, 2026",
    excerpt: "The NTA has briefly reopened the application window for JEE Main 2026 Session 2 until March 13. Candidates aiming for the April 2-9 examination must finalize their registrations immediately. City Intimation Slips are expected shortly.",
    link: "/news"
  },
  {
    id: 2,
    title: "MBA Admissions 2026: Private B-Schools Keep Application Windows Open",
    category: "MBA Admission 2026",
    date: "March 10, 2026",
    excerpt: "While IIM and top-tier institute deadlines have closed, several reputed private B-schools including Great Lakes, BIMTECH, and IMI Kolkata are still accepting applications for the 2026-28 batch. Check specific institute deadlines to apply via CAT/XAT/CMAT scores.",
    link: "/news"
  },
  {
    id: 3,
    title: "CAT 2026: Exam Date & Registration Timeline Anticipated",
    category: "Entrance Exams",
    date: "March 5, 2026",
    excerpt: "Preparation for the 2027-29 academic session begins as the CAT 2026 exam is tentatively scheduled for November 29, 2026. The official notification is expected by July, with IIM Indore rumored to be the convening institute this year.",
    link: "/news"
  },
  {
    id: 4,
    title: "JEE Advanced 2026: Exam Schedule and Eligibility Confirmed",
    category: "Engineering Exams",
    date: "March 2, 2026",
    excerpt: "The prestigious JEE Advanced 2026 examination is officially locked in for May 17, 2026. Only the top 2.5 lakh candidates clearing the JEE Main threshold will be eligible to battle it out for seats in the IITs. Registration opens late April.",
    link: "/news"
  }
];
