import Link from 'next/link';
import {
  GraduationCap,
  Cpu,
  LineChart,
  Globe,
  Target,
  Handshake,
  Award,
  Plane,
  ArrowRight
} from 'lucide-react';

import { JsonLd } from "@/components/JsonLd";

const SERVICES = [
  { 
    title: "MBA/PGDM Admission", 
    icon: GraduationCap, 
    description: "Strategic guidance for top-tier management programs.", 
    color: "bg-blue-50", 
    accent: "text-primary",
    href: "/colleges"
  },
  { 
    title: "B.Tech Admission", 
    icon: Cpu, 
    description: "Engineering admissions consulting for premier institutes.", 
    color: "bg-emerald-50", 
    accent: "text-secondary",
    href: "/colleges"
  },
  { 
    title: "BBA/BCA Admission", 
    icon: LineChart, 
    description: "Foundation mapping for early professional degrees.", 
    color: "bg-amber-50", 
    accent: "text-accent",
    href: "/colleges"
  },
  { 
    title: "Online MBA", 
    icon: Globe, 
    description: "Navigating flexible, global management education.", 
    color: "bg-purple-50", 
    accent: "text-purple-600",
    href: "/online-degree-certification"
  },
  { 
    title: "Abroad Education", 
    icon: Plane, 
    description: "Comprehensive guidance for international university admissions.", 
    color: "bg-rose-50", 
    accent: "text-rose-600",
    href: "/inquiry"
  },
  { 
    title: "Internship Support", 
    icon: Target, 
    description: "Securing high-impact internships to build your profile.", 
    color: "bg-cyan-50", 
    accent: "text-cyan-600",
    href: "/internships"
  },
  { 
    title: "Placement Support", 
    icon: Handshake, 
    description: "End-to-end interview prep and placement strategy.", 
    color: "bg-indigo-50", 
    accent: "text-indigo-600",
    href: "/jobs"
  },
  { 
    title: "Scholarship Support", 
    icon: Award, 
    description: "Identifying and applying for merit and need-based aid.", 
    color: "bg-fuchsia-50", 
    accent: "text-fuchsia-600",
    href: "/inquiry"
  },
];

export const metadata = {
  title: "Our Services | Expert Career Counselling",
  description: "Explore our range of career counselling services, from MBA admission support to interview prep.",
  keywords: ['career counselling services', 'MBA admission support', 'interview preparation', 'scholarship guidance', 'placement support', 'abroad education counselling'],
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Career Counselling & Admissions Consulting",
    "provider": {
      "@type": "LocalBusiness",
      "name": "CareerWithMohit",
      "url": "https://www.careerwithmohit.online",
      "logo": "https://www.careerwithmohit.online/logo.webp",
      "image": "https://www.careerwithmohit.online/og-image.webp",
      "telephone": "+91-9560020771",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Delhi NCR",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Career Counselling Services",
      "itemListElement": SERVICES.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        },
        "position": index + 1
      }))
    }
  };

  return (
    <div className="w-full bg-muted min-h-screen px-6 py-24 sm:px-12 sm:py-32 border-t-8 border-foreground">
      <JsonLd data={serviceSchema} />
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
              <Link
                key={idx}
                href={service.href}
                prefetch={false}
                className={`group relative overflow-hidden rounded-xl border-4 border-foreground ${service.color} p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full`}
              >
                {/* Decorative element */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rotate-45 bg-foreground/5 transition-transform group-hover:rotate-90 group-hover:bg-foreground/10" />
                
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white border-4 border-foreground transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-accent">
                  <Icon className={`h-8 w-8 ${service.accent} group-hover:text-foreground`} strokeWidth={2.5} />
                </div>
                
                <h3 className="font-display text-2xl font-black tracking-tight text-foreground mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-base font-bold text-gray-700 leading-relaxed italic mb-8">
                  {service.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t-2 border-foreground/10">
                  <span className="text-xs font-black uppercase tracking-widest text-foreground/60 group-hover:text-primary transition-colors">
                    Consult Now
                  </span>
                  <ArrowRight className="h-5 w-5 text-foreground transition-transform group-hover:translate-x-2" strokeWidth={3} />
                </div>
              </Link>
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
          <a href="/inquiry" className="inline-flex h-14 items-center justify-center bg-white border-4 border-foreground px-10 py-2 text-xl font-bold text-foreground transition-all hover:bg-gray-100 hover:scale-105 hover:-translate-y-1">
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
}
