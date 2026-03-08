import Link from 'next/link';
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

export const metadata = {
  title: "Our Services | Mohit Jain Career Counselling",
  description: "Comprehensive support across your entire academic and professional journey.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-12 sm:py-24">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl mb-6">
          Our Core <span className="text-accent italic">Services</span>
        </h1>
        <p className="text-foreground/70 text-lg leading-relaxed">
          Comprehensive support across your entire academic and professional journey. We provide expert guidance tailored to your specific career aspirations.
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-20">
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

      <div className="rounded-3xl bg-surface backdrop-blur-xl border border-border-subtle p-8 sm:p-12 text-center max-w-3xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-4">
          Ready to take the next step?
        </h2>
        <p className="text-foreground/70 mb-8 max-w-md mx-auto">
          Book a 1-on-1 session to discuss your specific career challenges and build an actionable roadmap.
        </p>
        <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-accent/90">
          Schedule a Free Consultation
        </Link>
      </div>
    </div>
  );
}
