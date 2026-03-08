import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import { 
  GraduationCap, 
  Cpu, 
  LineChart, 
  Globe, 
  Target, 
  Handshake, 
  Award,
  Plane
} from 'lucide-react';

const SERVICES = [
  { title: "MBA/PGDM Admission", icon: GraduationCap, description: "Strategic guidance for top-tier management programs.", color: "bg-blue-50", accent: "text-primary" },
  { title: "B.Tech Admission", icon: Cpu, description: "Engineering admissions consulting for premier institutes.", color: "bg-emerald-50", accent: "text-secondary" },
  { title: "BBA/BCA Admission", icon: LineChart, description: "Foundation mapping for early professional degrees.", color: "bg-amber-50", accent: "text-accent" },
  { title: "Online MBA", icon: Globe, description: "Navigating flexible, global management education.", color: "bg-purple-50", accent: "text-purple-600" },
  { title: "Abroad Education", icon: Plane, description: "Comprehensive guidance for international university admissions.", color: "bg-rose-50", accent: "text-rose-600" },
  { title: "Internship Support", icon: Target, description: "Securing high-impact internships to build your profile.", color: "bg-cyan-50", accent: "text-cyan-600" },
  { title: "Placement Support", icon: Handshake, description: "End-to-end interview prep and placement strategy.", color: "bg-indigo-50", accent: "text-indigo-600" },
  { title: "Scholarship Support", icon: Award, description: "Identifying and applying for merit and need-based aid.", color: "bg-fuchsia-50", accent: "text-fuchsia-600" },
];

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-primary px-6 py-24 sm:px-12 sm:py-32 lg:py-40 border-b-8 border-foreground">
        {/* Flat Geometric Decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rotate-45 bg-white/10" />
        
        <div className="relative mx-auto max-w-7xl text-center z-10">
          <h1 className="font-display text-5xl font-extrabold tracking-tighter text-white sm:text-7xl md:text-8xl leading-none uppercase">
            Navigate Your Career <br className="hidden sm:block" />
            <span className="bg-accent text-foreground px-4 py-1 inline-block mt-4 -rotate-2 border-4 border-foreground">With Purpose</span>
          </h1>
          <p className="mx-auto mt-10 max-w-2xl text-xl font-bold leading-relaxed text-blue-50">
            Expert career counselling, interview preparation, and bold strategies to help you dominate your professional goals.
          </p>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="https://wa.me/919560020771" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto rounded-md bg-foreground px-10 py-5 text-xl font-bold text-white transition-all hover:scale-105 hover:bg-gray-800 border-4 border-foreground text-center">
              Connect on WhatsApp
            </a>
            <Link href="/services" className="w-full sm:w-auto rounded-md bg-transparent px-10 py-5 text-xl font-bold text-white transition-all hover:bg-white hover:text-primary border-4 border-white">
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="bg-white px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 md:flex md:items-end md:justify-between border-b-8 border-foreground pb-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase">
                Core Services
              </h2>
              <p className="mt-4 text-xl font-medium text-gray-600">
                Total support across your entire academic and professional journey.
              </p>
            </div>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div 
                  key={idx} 
                  className={`group relative overflow-hidden rounded-xl border-4 border-foreground ${service.color} p-8 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer`}
                >
                  <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white border-4 border-foreground transition-transform group-hover:scale-110">
                    <Icon className={`h-8 w-8 ${service.accent}`} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-base font-medium text-gray-800 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ARTICLES SECTION */}
      <section id="articles" className="bg-muted px-6 py-24 sm:px-12 border-t-8 border-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col sm:flex-row sm:items-end justify-between border-b-8 border-foreground pb-8 gap-6">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase">
              Latest Intel
            </h2>
            <Link href="/blog" className="inline-flex h-14 items-center justify-center rounded-md bg-foreground px-8 py-3 text-lg font-bold text-white transition-all hover:bg-primary hover:scale-105 border-4 border-foreground whitespace-nowrap">
              View All Articles &rarr;
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            {allPostsData.map(({ slug, title, date, description }) => (
              <Link 
                key={slug} 
                href={`/blog/${slug}`} 
                className="group flex flex-col rounded-xl border-4 border-foreground bg-white p-8 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-2 hover:bg-gray-50 h-full"
              >
                <div className="mb-6 inline-block rounded-full bg-accent px-4 py-1 text-sm font-bold uppercase tracking-widest text-foreground border-2 border-foreground self-start">
                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h3 className="font-display text-3xl font-bold tracking-tight text-foreground mb-5 group-hover:text-primary transition-colors line-clamp-3 leading-tight">
                  {title}
                </h3>
                {description && (
                  <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8 line-clamp-3">
                    {description}
                  </p>
                )}
                <div className="mt-auto flex items-center font-bold text-primary group-hover:text-foreground text-lg transition-colors">
                  Read Article 
                  <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-2">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
