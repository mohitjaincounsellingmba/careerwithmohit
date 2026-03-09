import { Briefcase, MapPin, ExternalLink, Calendar, Building2, Search, Filter } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Latest Internships | CareerWithMohit",
  description: "Find your next career-defining internship. Curated latest opportunities in Digital Marketing, IT, Finance, and Business Development at top companies.",
  keywords: ["latest internships India", "MBA internships 2025", "BTech internships 2025", "Delhi NCR internships", "remote internships", "paid internships"],
  alternates: {
    canonical: "/internships",
  },
};

const INTERNSHIPS = [
  {
    id: 1,
    title: "Business Development Intern",
    company: "GAO Tek Inc.",
    location: "Remote",
    type: "Virtual",
    duration: "3-6 Months",
    description: "Focus on SEO, marketing, and business development strategies for global markets. Hands-on experience with market research and client outreach.",
    link: "https://gaotek.com/career/",
    accent: "bg-blue-500"
  },
  {
    id: 2,
    title: "Digital Marketing Intern",
    company: "Eye Wear Labs",
    location: "Delhi/Remote",
    type: "Full-Time",
    duration: "2 Months",
    description: "Manage social media campaigns, content calendars, and assist in influencer marketing strategies for a growing e-commerce brand.",
    link: "https://www.eyewearlabs.com/",
    accent: "bg-emerald-500"
  },
  {
    id: 3,
    title: "Data Analytics Intern",
    company: "Accenture",
    location: "Bengaluru/Hyderabad",
    type: "In-Office",
    duration: "6 Months",
    description: "Assist in data cleaning, visualization, and building predictive models for Fortune 500 clients. Proficient in Python/Excel preferred.",
    link: "https://www.accenture.com/in-en/careers/jobsearch",
    accent: "bg-purple-500"
  },
  {
    id: 4,
    title: "HR Operations Intern",
    company: "Nestlé",
    location: "Gurugram",
    type: "In-Office",
    duration: "1-2 Months",
    description: "Part of the Nesternship program. Assist in talent acquisition, employee engagement, and HR policy documentation.",
    link: "https://www.nestle.in/jobs",
    accent: "bg-rose-500"
  },
  {
    id: 5,
    title: "Software Development Intern",
    company: "Google",
    location: "Bengaluru/Remote",
    type: "Hybrid",
    duration: "3-4 Months",
    description: "Work on real-world engineering projects across Google's cloud or search infrastructure. High-impact coding and collaboration.",
    link: "https://www.google.com/about/careers/students/",
    accent: "bg-cyan-500"
  },
  {
    id: 6,
    title: "Portfolio Management Intern",
    company: "Aditya Birla Group",
    location: "Mumbai",
    type: "Full-Time",
    duration: "2 Months",
    description: "Collaborate with senior fund managers on equity research, portfolio balancing, and market analysis for ABG Capital.",
    link: "https://www.adityabirla.com/careers",
    accent: "bg-amber-500"
  },
  {
    id: 7,
    title: "Social Media Marketing Intern",
    company: "Finladder",
    location: "Remote",
    type: "Part-Time",
    duration: "3 Months",
    description: "Develop engaging financial content for LinkedIn/Instagram. Focus on growth-hacking and community management.",
    link: "https://finladder.in/careers",
    accent: "bg-indigo-500"
  },
  {
    id: 8,
    title: "Management Trainee Intern",
    company: "Symbiosis",
    location: "Pune",
    type: "Full-Time",
    duration: "4 Months",
    description: "Strategic planning, academic operations, and event management for university-wide professional development modules.",
    link: "https://siu.edu.in/",
    accent: "bg-fuchsia-500"
  },
  {
    id: 9,
    title: "Research Intern",
    company: "IIT Delhi",
    location: "New Delhi",
    type: "On-Campus",
    duration: "2-3 Months",
    description: "Summer research fellowship focusing on AI/ML and sustainable technologies under the guidance of top-tier faculty.",
    link: "https://home.iitd.ac.in/",
    accent: "bg-orange-500"
  },
  {
    id: 10,
    title: "Operations Analyst Intern",
    company: "Amazon",
    location: "Hyderabad/Remote",
    type: "Hybrid",
    duration: "6 Months",
    description: "Optimize supply chain workflows, monitor delivery metrics, and build automated reports for the logistics division.",
    link: "https://www.amazon.jobs/en/teams/internships-for-students",
    accent: "bg-yellow-500"
  }
];

export default function InternshipsPage() {
  return (
    <div className="w-full bg-muted min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b-8 border-foreground py-24 px-6 sm:px-12 relative overflow-hidden">
         {/* Background Decoration */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl rotate-45" />

        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-foreground sm:text-8xl mb-6 leading-none">
            Launch Your <br />
            <span className="bg-accent text-foreground px-4 py-1 -rotate-1 inline-block border-4 border-foreground mt-2">Career Journey</span>
          </h1>
          <p className="max-w-3xl mx-auto text-2xl font-bold text-gray-700 leading-tight mb-12">
            Stay ahead with our daily curated selection of high-impact internships from top global firms and fast-growing Indian startups.
          </p>
          
          <div className="flex justify-center gap-6">
             <div className="flex items-center gap-2 bg-foreground text-white px-6 py-3 rounded-md font-black uppercase border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]">
                <Search className="w-5 h-5 text-primary" />
                Latest 10 Openings
             </div>
          </div>
        </div>
      </section>

      {/* Internship Grid */}
      <section className="py-24 px-6 sm:px-12 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {INTERNSHIPS.map((job) => (
              <div 
                key={job.id} 
                className="bg-white border-4 border-foreground p-8 relative flex flex-col h-full transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group"
              >
                {/* Header Area */}
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-14 h-14 ${job.accent} border-4 border-foreground flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform`}>
                    <Briefcase className="text-white w-8 h-8" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="bg-foreground text-white px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-foreground">
                      {job.type}
                    </span>
                    <div className="flex items-center gap-2 mt-2 text-gray-500 font-bold text-xs uppercase tracking-tight">
                       <Calendar className="w-3.5 h-3.5" />
                       {job.duration}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-3xl font-black text-foreground uppercase mb-1 leading-tight tracking-tight group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-600">
                    <Building2 className="w-5 h-5" />
                    {job.company}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-6 text-sm font-black text-gray-400 uppercase tracking-widest">
                    <MapPin className="w-4 h-4 text-accent" />
                    {job.location}
                  </div>

                  <hr className="border-2 border-foreground/10 mb-6" />

                  <p className="font-bold text-gray-700 mb-8 leading-relaxed text-lg italic bg-primary/5 p-4 border-l-4 border-primary">
                    "{job.description}"
                  </p>
                </div>

                {/* CTA */}
                <a 
                  href={job.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full text-center bg-foreground text-white border-4 border-foreground py-4 text-xl font-black uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(244,63,94,1)] hover:shadow-none"
                >
                  Apply Now <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Support */}
      <section className="bg-accent text-foreground py-20 px-6 sm:px-12 border-t-8 border-foreground">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl font-black uppercase mb-6 leading-none">
            Need profile building help?
          </h2>
          <p className="text-xl font-bold mb-10 max-w-2xl mx-auto">
            Get personalized guidance on how to secure high-stipend internships at top-tier firms. 
          </p>
          <Link href="/inquiry" className="inline-block bg-foreground text-white border-4 border-foreground px-10 py-5 text-2xl font-black uppercase hover:bg-white hover:text-foreground transition-all">
            Consult Mohit Jain
          </Link>
        </div>
      </section>
    </div>
  );
}
