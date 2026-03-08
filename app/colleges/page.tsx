import { getAllColleges } from "@/lib/colleges";
import { CollegesClient } from "@/components/CollegesClient";

export const metadata = {
  title: "Top MBA Colleges & Universities in India | Fees, Placement, Cutoff",
  description: "Find the best MBA colleges in India. Compare fees, placement reports, and cutoffs to choose the right B-school for your career.",
};

export default function CollegesPage() {
  const colleges = getAllColleges();

  return <CollegesClient colleges={colleges} />;
}
