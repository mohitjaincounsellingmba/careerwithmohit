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
  { title: "MBA/PGDM Admission", icon: GraduationCap, description: "Strategic guidance for top-tier management programs.", color: "bg-blue-50", accent: "text-primary" },
  { title: "B.Tech Admission", icon: Cpu, description: "Engineering admissions consulting for premier institutes.", color: "bg-emerald-50", accent: "text-secondary" },
  { title: "BBA/BCA Admission", icon: LineChart, description: "Foundation mapping for early professional degrees.", color: "bg-amber-50", accent: "text-accent" },
  { title: "Online MBA", icon: Globe, description: "Navigating flexible, global management education.", color: "bg-purple-50", accent: "text-purple-600" },
  { title: "Abroad Education", icon: Plane, description: "Comprehensive guidance for international university admissions.", color: "bg-rose-50", accent: "text-rose-600" },
  { title: "Internship Support", icon: Target, description: "Securing high-impact internships to build your profile.", color: "bg-cyan-50", accent: "text-cyan-600" },
  { title: "Placement Support", icon: Handshake, description: "End-to-end interview prep and placement strategy.", color: "bg-indigo-50", accent: "text-indigo-600" },
  { title: "Scholarship Support", icon: Award, description: "Identifying and applying for merit and need-based aid.", color: "bg-fuchsia-50", accent: "text-fuchsia-600" },
];

export const metadata = {
  title: "Our Services | Mohit Jain Career Counselling",
  description: "Comprehensive support across your entire academic and professional journey.",
};

export default function ServicesPage() {
  return (
    <div className="w-full bg-muted min-h-screen px-6 py-24 sm:px-12 sm:py-32 border-t-8 border-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 md:flex md:items-end md:justify-between border-b-8 border-foreground pb-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl font-extrabold tracking-tighter text-foreground sm:text-7xl uppercase">
              Our <span className="text-accent italic hidden">Services</span><span className="bg-accent text-foreground px-4 py-1 inline-block mt-4 -rotate-2 border-4 border-foreground">Services</span>
            </h1>
            <p className="mt-8 text-2xl font-medium text-gray-600 leading-relaxed">
              Total support across your entire academic and professional journey. We provide expert, uncompromised guidance tailored to your specific career aspirations.
            </p>
          </div>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-24">
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

        <div className="border-4 border-foreground bg-secondary p-10 sm:p-16 text-center max-w-4xl mx-auto rounded-xl">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 uppercase">
            Ready to Take the Next Step?
          </h2>
          <p className="text-emerald-50 text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Book a 1-on-1 session to discuss your specific career challenges and build an actionable roadmap.
          </p>
          <a href="https://wa.me/919560020771" target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center bg-white border-4 border-foreground px-10 py-2 text-xl font-bold text-foreground transition-all hover:bg-gray-100 hover:scale-105 hover:-translate-y-1">
            Connect on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
