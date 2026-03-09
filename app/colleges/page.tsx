import { getAllColleges } from "@/lib/colleges";
import { CollegesClient } from "@/components/CollegesClient";

export const metadata = {
  title: "Top MBA Colleges & Universities in India | Fees, Placement, Cutoff",
  description: "Find the best MBA colleges in India. Compare fees, placement reports, and cutoffs to choose the right B-school for your career.",
  keywords: ['top MBA colleges India', 'best PGDM colleges', 'MBA fees comparison', 'MBA placement reports', 'B-school cutoffs', 'MBA college ranking India'],
  alternates: {
    canonical: '/colleges',
  },
  openGraph: {
    title: 'Top MBA Colleges & Universities in India',
    description: 'Compare fees, placement reports, and cutoffs for the best MBA colleges in India.',
    type: 'website',
  },
};

export default function CollegesPage() {
  const colleges = getAllColleges();

  return <CollegesClient colleges={colleges} />;
}
