import { Briefcase, MapPin, ExternalLink, Calendar, Building2, Search, Filter } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Latest Finance Internships (Work From Home) 2026 | CareerWithMohit",
  description: "Explore the latest Work From Home Finance internships in India for 2026. Curated opportunities in Financial Analysis, Investment Banking, CA, Risk Management, and more — sourced from Internshala.",
  keywords: ["finance internships work from home 2026", "online finance internship India", "WFH internships finance students", "investment banking internship online", "CA internship work from home", "financial analyst internship India", "Internshala finance internships"],
  alternates: {
    canonical: "/internships",
  },
};

const INTERNSHIPS = [
  {
    id: 1,
    title: "Chartered Accountancy (CA)",
    company: "Urban Property Spaces Mumbai",
    location: "Work From Home",
    type: "Remote",
    duration: "12 Months",
    stipend: "₹3,000 – ₹7,000/mo",
    description: "Hands-on CA internship covering GST filing, IT returns, invoice management, legal drafts, and payroll preparation. Great for CA aspirants.",
    skills: "GST, IT Returns, Invoicing, Legal Drafts, Payroll",
    link: "https://internshala.com/internship/detail/work-from-home-chartered-accountancy-ca-internship-at-urban-property-spaces-mumbai1772914306",
    accent: "bg-blue-500"
  },
  {
    id: 2,
    title: "Forex Trader Intern",
    company: "Pipraiser",
    location: "Work From Home",
    type: "Remote",
    duration: "2 Months",
    stipend: "₹5,000/mo",
    description: "Learn live Forex trading strategies and portfolio management. Exposure to global currency markets under professional mentorship.",
    skills: "Forex Trading, Stock Markets, Portfolio Management, Investment Banking",
    link: "https://internshala.com/internship/detail/work-from-home-forex-trader-internship-at-pipraiser1772870089",
    accent: "bg-emerald-500"
  },
  {
    id: 3,
    title: "Enterprise Risk Management",
    company: "Vogabe Advisors Pvt. Ltd.",
    location: "Work From Home",
    type: "Remote",
    duration: "6 Months",
    stipend: "₹5,000/mo",
    description: "Work on identifying, assessing, and mitigating enterprise-level risks. Requires MS-Excel and PowerPoint proficiency for presentations.",
    skills: "Risk Management, MS-Excel, MS-PowerPoint, MS-Word, Teamwork",
    link: "https://internshala.com/internship/detail/work-from-home-enterprise-risk-management-internship-at-vogabe-advisors-private-limited1773226108",
    accent: "bg-purple-500"
  },
  {
    id: 4,
    title: "Trading Intern",
    company: "Pipraiser",
    location: "Work From Home",
    type: "Remote",
    duration: "2 Months",
    stipend: "₹5,000 – ₹10,000/mo",
    description: "Practical equity and derivatives trading experience under live market conditions, with mentorship from experienced traders.",
    skills: "Stock Trading, Investment Banking, Portfolio Management, Investing",
    link: "https://internshala.com/internship/detail/work-from-home-trading-internship-at-pipraiser1772869996",
    accent: "bg-rose-500"
  },
  {
    id: 5,
    title: "Content Writer – Trading & Finance",
    company: "Sloth Desk",
    location: "Work From Home",
    type: "Remote (Part-Time)",
    duration: "6 Months",
    stipend: "₹5,000 – ₹8,000/mo",
    description: "Write insightful finance and stock trading content for blog/social media. SEO-optimized articles on markets, investing, and personal finance.",
    skills: "Finance Writing, SEO, Copywriting, Stock Trading, Content Creation",
    link: "https://internshala.com/internship/detail/work-from-home-part-time-content-writer-trading-finance-internship-at-sloth-desk1773320314",
    accent: "bg-cyan-500"
  },
  {
    id: 6,
    title: "Global Market Analyst",
    company: "Pipraiser",
    location: "Work From Home",
    type: "Remote",
    duration: "2 Months",
    stipend: "₹5,000/mo",
    description: "Analyze international equity, commodity, and currency markets. Prepare research reports and monitor global macroeconomic indicators.",
    skills: "Global Markets, Investment Banking, Stock Trading, Portfolio Management",
    link: "https://internshala.com/internship/detail/work-from-home-global-market-analyst-internship-at-pipraiser1772870197",
    accent: "bg-amber-500"
  },
  {
    id: 7,
    title: "Financial Analyst Intern",
    company: "Zean Lithos & Company Pvt. Ltd.",
    location: "Work From Home",
    type: "Remote",
    duration: "6 Months",
    stipend: "₹1,000 – ₹3,000/mo",
    description: "Build financial models, prepare reports, and analyze company data using Excel. Ideal for finance students seeking real-world exposure.",
    skills: "MS-Excel, Financial Modeling, Report Writing, English Proficiency",
    link: "https://internshala.com/internship/detail/work-from-home-financial-analyst-internship-at-zean-lithos-and-company-private-limited1773344607",
    accent: "bg-indigo-500"
  },
  {
    id: 8,
    title: "Portfolio Management Intern",
    company: "Pipraiser",
    location: "Work From Home",
    type: "Remote",
    duration: "2 Months",
    stipend: "₹5,000 – ₹10,000/mo",
    description: "Manage and rebalance investment portfolios under supervision. Exposure to equity, MF, and ETF instruments across market cycles.",
    skills: "Portfolio Management, Stock Trading, Investment Banking, Investing",
    link: "https://internshala.com/internship/detail/work-from-home-portfolio-management-internship-at-pipraiser1772870341",
    accent: "bg-fuchsia-500"
  },
  {
    id: 9,
    title: "Investment Banker Intern",
    company: "The Venture Guys",
    location: "Work From Home",
    type: "Remote",
    duration: "6 Months",
    stipend: "₹1,000 – ₹5,000/mo",
    description: "Assist in deal sourcing, financial due diligence, and pitch deck preparation for early-stage startup funding and M&A advisory.",
    skills: "Finance, MS-Excel, Financial Analysis, Research & Analytics",
    link: "https://internshala.com/internship/detail/work-from-home-investment-banker-internship-at-the-venture-guys1773313845",
    accent: "bg-orange-500"
  },
  {
    id: 10,
    title: "Investment Advisory Intern",
    company: "Pipraiser",
    location: "Work From Home",
    type: "Remote",
    duration: "2 Months",
    stipend: "₹1,000 – ₹35,000/mo",
    description: "Provide stock and mutual fund advisory to clients. Deep dive into technical analysis and portfolio construction with high earning potential.",
    skills: "Technical Analysis, Investment Banking, Stock Trading, Portfolio Management",
    link: "https://internshala.com/internship/detail/work-from-home-investment-advisory-internship-at-pipraiser1772870205",
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
            Finance <br />
            <span className="bg-accent text-foreground px-4 py-1 -rotate-1 inline-block border-4 border-foreground mt-2">WFH Internships</span>
          </h1>
          <p className="max-w-3xl mx-auto text-2xl font-bold text-gray-700 leading-tight mb-12">
            10 live Finance internships you can do from home — sourced directly from Internshala. Updated March 2026.
          </p>
          
          <div className="flex justify-center gap-6">
             <div className="flex items-center gap-2 bg-foreground text-white px-6 py-3 rounded-md font-black uppercase border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]">
                <Search className="w-5 h-5 text-primary" />
                10 Live Openings
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
                  <div className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-600">
                    <Building2 className="w-5 h-5" />
                    {job.company}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2 text-sm font-black text-gray-400 uppercase tracking-widest">
                    <MapPin className="w-4 h-4 text-accent" />
                    {job.location}
                  </div>

                  {/* Stipend badge */}
                  {'stipend' in job && (
                    <div className="inline-block bg-green-50 border-2 border-green-500 text-green-700 px-3 py-1 text-sm font-black uppercase tracking-wide mb-4">
                      💰 {(job as any).stipend}
                    </div>
                  )}

                  <hr className="border-2 border-foreground/10 mb-4" />

                  <p className="font-bold text-gray-700 mb-4 leading-relaxed text-lg italic bg-primary/5 p-4 border-l-4 border-primary">
                    &ldquo;{job.description}&rdquo;
                  </p>

                  {/* Skills tags */}
                  {'skills' in job && (
                    <div className="mb-6">
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Skills Required</p>
                      <div className="flex flex-wrap gap-2">
                        {((job as any).skills as string).split(', ').map((skill: string) => (
                          <span key={skill} className="bg-foreground/5 border border-foreground/20 text-foreground text-xs font-bold px-2 py-1 uppercase tracking-wide">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <a 
                  href={job.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full text-center bg-foreground text-white border-4 border-foreground py-4 text-xl font-black uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(244,63,94,1)] hover:shadow-none"
                >
                  Apply on Internshala <ExternalLink className="w-6 h-6" />
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
