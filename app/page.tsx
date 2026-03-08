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
  { title: "MBA/PGDM Admission", icon: GraduationCap, description: "Strategic guidance for top-tier management programs." },
  { title: "B.Tech Admission", icon: Cpu, description: "Engineering admissions consulting for premier institutes." },
  { title: "BBA/BCA Admission", icon: LineChart, description: "Foundation mapping for early professional degrees." },
  { title: "Online MBA", icon: Globe, description: "Navigating flexible, global management education." },
  { title: "Abroad Education", icon: Plane, description: "Comprehensive guidance for international university admissions." },
  { title: "Internship Support", icon: Target, description: "Securing high-impact internships to build your profile." },
  { title: "Placement Support", icon: Handshake, description: "End-to-end interview prep and placement strategy." },
  { title: "Scholarship Support", icon: Award, description: "Identifying and applying for merit and need-based aid." },
];

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-12 sm:py-24">
      <section className="mb-24 space-y-8 text-center max-w-3xl mx-auto relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/20 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance leading-tight drop-shadow-sm">
          Navigate Your Career with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 italic">Clarity & Purpose</span>
        </h1>
        <p className="text-lg leading-relaxed text-foreground/70 sm:text-xl text-balance">
          Expert career counselling, interview preparation, and resume building strategies to help you achieve your professional goals.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/contact" className="w-full sm:w-auto rounded-md bg-foreground px-8 py-3.5 text-sm font-medium text-background shadow-lg transition-all hover:scale-105 hover:bg-foreground/90">
            Book a Free Consultation
          </Link>
          <Link href="#services" className="w-full sm:w-auto rounded-md bg-surface backdrop-blur-md px-8 py-3.5 text-sm font-medium text-foreground border border-border-subtle shadow-sm transition-all hover:bg-white/80">
            View Our Services
          </Link>
        </div>
      </section>

      <section id="services" className="mb-32">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground mb-4">
            Our Core Services
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Comprehensive support across your entire academic and professional journey.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-3xl border border-border-subtle bg-surface backdrop-blur-xl p-8 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-accent/40 hover:bg-white/80"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="articles" className="mt-24 pt-16 border-t border-border-subtle/50">
        <div className="flex items-center justify-between mb-12 border-b border-border-subtle pb-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Latest Articles
          </h2>
          <Link href="/blog" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
            View all &rarr;
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allPostsData.map(({ slug, title, date, description }) => (
            <Link key={slug} href={`/blog/${slug}`} className="group flex flex-col rounded-3xl border border-border-subtle bg-surface backdrop-blur-xl p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-accent/30 hover:bg-white/80 h-full">
              <time className="text-xs font-medium uppercase tracking-wider text-foreground/50 mb-4 block">
                {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-3">
                {title}
              </h3>
              {description && (
                <p className="text-foreground/70 text-sm leading-relaxed mb-6 line-clamp-3">
                  {description}
                </p>
              )}
              <span className="mt-auto text-sm font-medium text-accent group-hover:text-accent/80 flex items-center gap-1">
                Read article <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
