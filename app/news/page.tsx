import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

const NEWS_ITEMS = [
  {
    id: 1,
    title: "Top IITs Announce Minor Changes to JEE Advanced 2026 Eligibility",
    category: "B.Tech Admission",
    date: "March 5, 2026",
    excerpt: "The Joint Admission Board has released updated guidelines for the upcoming JEE Advanced examination, introducing slight modifications to the class 12 performance criteria. Engineering aspirants are advised to review the changes.",
    link: "#"
  },
  {
    id: 2,
    title: "IIM Ahmedabad Updates CAT 2026 Selection Criteria, Emphasizes Diversity",
    category: "MBA/PGDM Admission",
    date: "March 3, 2026",
    excerpt: "In a move to foster a more diverse cohort, IIMA has revised its weightage for academic diversity and work experience in the upcoming Common Admission Test cycles. Find out how this impacts your preparation.",
    link: "#"
  },
  {
    id: 3,
    title: "New AICTE Guidelines Mandate AI & ML Internships for Computer Science Graduates",
    category: "B.Tech Admission",
    date: "February 28, 2026",
    excerpt: "To bridge the industry-academia gap, the AICTE has announced that all affiliated technical institutions must incorporate mandatory artificial intelligence internships in their curriculum starting this academic year.",
    link: "#"
  },
  {
    id: 4,
    title: "Top Global Business Schools See 15% Surge in Indian Applicants for Online MBAs",
    category: "MBA/PGDM Admission",
    date: "February 22, 2026",
    excerpt: "Recent data shows a significant increase in professionals opting for flexible, globally recognized online MBA programs. We analyze the trend and the top universities driving this change.",
    link: "#"
  }
];

export const metadata = {
  title: "Latest News & Updates | Mohit Jain Career Counselling",
  description: "Stay updated with the latest news on MBA, B.Tech admissions, and career guidance.",
};

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-12 sm:py-24">
      <div className="mb-16 max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl mb-6">
          Latest <span className="text-accent italic">News</span> & Updates
        </h1>
        <p className="text-foreground/70 text-lg leading-relaxed">
          Stay informed with the most recent developments in higher education, entrance exams, and career opportunities for MBA and Engineering aspirants.
        </p>
      </div>
      
      <div className="grid gap-8">
        {NEWS_ITEMS.map((item) => (
          <article 
            key={item.id} 
            className="group flex flex-col sm:flex-row gap-6 rounded-3xl border border-border-subtle bg-surface backdrop-blur-xl p-6 sm:p-8 shadow-xl transition-all hover:shadow-2xl hover:border-accent/40 hover:-translate-y-1 hover:bg-white/80"
          >
            <div className="sm:w-1/4 flex-shrink-0">
              <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent mb-4">
                {item.category}
              </span>
              <div className="flex items-center text-sm text-foreground/50 font-medium">
                <Calendar className="mr-2 h-4 w-4" />
                <time>{item.date}</time>
              </div>
            </div>
            
            <div className="sm:w-3/4 flex flex-col justify-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground mb-3 group-hover:text-accent transition-colors">
                <Link href={item.link}>{item.title}</Link>
              </h2>
              <p className="text-foreground/70 leading-relaxed max-w-3xl mb-4">
                {item.excerpt}
              </p>
              <div className="mt-auto">
                <Link 
                  href={item.link} 
                  className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  Read full story <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 rounded-3xl bg-surface backdrop-blur-xl border border-border-subtle p-8 text-center max-w-3xl mx-auto flex flex-col items-center">
         <h3 className="font-display text-xl font-semibold text-foreground mb-3">
           Worried about how these changes affect you?
         </h3>
         <p className="text-foreground/70 mb-6">
           Speak with our experts to get personalized advice on navigating the latest admission requirements.
         </p>
         <Link href="/contact" className="inline-flex h-10 items-center justify-center rounded-md bg-accent px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-accent/90">
            Book a Consultation
         </Link>
      </div>
    </div>
  );
}
