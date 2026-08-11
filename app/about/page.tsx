import { Award, BookOpen, CheckCircle2, Zap, Briefcase, History, TrendingUp, Users, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About Mohit Jain | Expert Career Counsellor",
  description: "Learn about Mohit Jain's professional journey, IIM & FMS certifications, and his mission to provide uncompromised career guidance for MBA & degree admissions.",
  keywords: [
    "Mohit Jain", "about Mohit Jain", "expert career counsellor India", "MBA admission consultant Delhi NCR",
    "IIM Bangalore certified", "FMS Delhi certified", "career counselling Delhi NCR", "best MBA career counsellor"
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Mohit Jain | Expert Career Counsellor",
    description: "Learn about Mohit Jain's professional journey, IIM & FMS certifications, and his mission to provide uncompromised career guidance.",
    type: "profile",
    url: "/about",
    siteName: "CareerWithMohit",
    images: [
      {
        url: "https://www.careerwithmohit.online/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Mohit Jain - Career Counsellor & MBA Admissions Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Mohit Jain | Expert Career Counsellor",
    description: "Learn about Mohit Jain's professional journey, IIM & FMS certifications, and uncompromised career guidance.",
    images: ["https://www.careerwithmohit.online/og-image.webp"],
  },
};

const CERTIFICATIONS = [
  { title: "Digital Marketing Certified", organization: "IIM Bangalore", icon: Award, color: "bg-blue-500" },
  { title: "Digital Marketing Certified", organization: "FMS Delhi", icon: Award, color: "bg-red-500" },
  { title: "Business Analytics Certified", organization: "Professional Certification", icon: Zap, color: "bg-amber-500" },
  { title: "Six Sigma Yellow Belt", organization: "Certified Professional", icon: CheckCircle2, color: "bg-emerald-500" },
  { title: "Six Sigma White Belt", organization: "Certified Professional", icon: CheckCircle2, color: "bg-emerald-400" },
  { title: "Advanced Excel", organization: "Data Expert", icon: BookOpen, color: "bg-purple-500" },
];

const WORK_EXPERIENCE = [
  {
    role: "Career Counsellor & Expert",
    company: "Counselling Domain",
    period: "6+ Years to Present",
    description: "Successfully guided thousands of students through complex MBA, PGDM, and B.Tech admission processes.",
    icon: Users,
    color: "bg-primary"
  },
  {
    role: "Digital Marketing Expert",
    company: "Freelance & Agency",
    period: "2018 - Present",
    description: "Deep expertise in performance marketing, trend analysis, and digital growth strategies for education brands.",
    icon: TrendingUp,
    color: "bg-accent"
  },
  {
    role: "Operations Analyst",
    company: "Accenture (Client: Amazon)",
    period: "Previous",
    description: "Managed complex operational workflows and data metrics for global e-commerce giant Amazon.",
    icon: Briefcase,
    color: "bg-blue-600"
  },
  {
    role: "Business Development Manager",
    company: "Doubtnut",
    period: "Previous",
    description: "Drove sales and strategic growth initiatives for one of India's leading EdTech platforms.",
    icon: History,
    color: "bg-amber-500"
  }
];

const INTERNSHIPS = [
  { role: "Portfolio Management", company: "Aditya Birla" },
  { role: "Digital Marketing", company: "Eye Wear Labs" },
  { role: "Social Media Marketing", company: "Finladder" },
  { role: "Business Development", company: "BOLO" },
  { role: "Social Media Intern", company: "Mind Rank Venture" },
  { role: "Digital Marketing Intern", company: "Thunderpod" }
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Person",
      "@id": "https://www.careerwithmohit.online/#person-mohit-jain",
      "name": "Mohit Jain",
      "image": "https://www.careerwithmohit.online/logo.webp",
      "description": "Expert career guidance, MBA admissions consulting, and CAT/XAT/NMAT strategic mentorship for premier Indian business schools.",
      "jobTitle": "Chief Career Counsellor & MBA Admissions Strategist",
      "url": "https://www.careerwithmohit.online/about",
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "IIM Bangalore" },
        { "@type": "CollegeOrUniversity", "name": "FMS Delhi" }
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Digital Marketing & Strategy Certification",
          "recognizedBy": { "@type": "EducationalOrganization", "name": "IIM Bangalore" }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Strategic Management Certification",
          "recognizedBy": { "@type": "EducationalOrganization", "name": "FMS Delhi" }
        }
      ],
      "knowsAbout": [
        "Career Counselling India",
        "MBA Admissions 2027",
        "PGDM Direct Admissions",
        "CAT 2026 Preparation",
        "XAT 2027 Exam Strategy",
        "B-School Selection & ROI Analysis",
        "GD-PI-WAT Mentorship",
        "Six Sigma Yellow Belt",
        "Business Analytics"
      ],
      "sameAs": [
        "https://wa.me/919560020771",
        "https://www.youtube.com/@careerwithmohit",
        "https://www.linkedin.com/in/mohit-jain-career-counsellor",
        "https://www.instagram.com/careerwithmohit"
      ]
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".speakable-text", "p"]
    }
  };

  return (
    <div className="w-full bg-yellow-50 min-h-screen selection:bg-foreground selection:text-white">
      <JsonLd data={aboutSchema} />
      
      {/* Typography-Driven Hero Section */}
      <section className="bg-white border-b-8 border-foreground py-20 px-6 sm:px-12 relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="mx-auto max-w-6xl relative z-10 text-center">
          <div className="inline-block bg-foreground text-white font-black uppercase tracking-widest text-sm px-6 py-2 mb-8 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] rotate-2">
            Expert Consultant • MBA Specialist
          </div>
          
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter text-foreground mb-10 leading-[0.9]">
            Meet <br />
            <span className="inline-block bg-primary text-white px-8 pb-4 pt-2 -rotate-3 border-8 border-foreground mt-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 hover:scale-105 transition-all duration-300">
              Mohit Jain
            </span>
          </h1>
          
          <p className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight max-w-4xl mx-auto mt-12 bg-yellow-300 p-6 sm:p-10 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            A mission-driven career counsellor dedicated to providing <span className="underline decoration-wavy decoration-primary underline-offset-4">uncompromised, strategic guidance</span> for the next generation of leaders.
          </p>
        </div>
      </section>

      {/* Experience & Mission */}
      <section className="py-24 px-6 sm:px-12 border-b-8 border-foreground bg-accent">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-5xl md:text-7xl font-black uppercase mb-16 text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-center">
            My Professional Mission
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white border-8 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-1">
              <p className="font-bold text-2xl text-foreground leading-relaxed mb-6">
                With a certification background from India's most prestigious institutions like IIM Bangalore and FMS Delhi, I bring a data-driven yet deeply human approach to career counselling.
              </p>
              <p className="font-bold text-xl text-gray-600 leading-relaxed">
                My experience spans across digital marketing, business analytics, and operational excellence. Every student has a unique trajectory—my role is to find your shortest, most effective path.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="bg-blue-400 border-4 border-foreground p-8 rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 transition-transform cursor-crosshair">
                <h3 className="font-black text-2xl uppercase mb-2 text-foreground">Admission Expert</h3>
                <p className="font-bold text-gray-900 text-lg">Specializing in MBA, PGDM, and B.Tech admissions for top-tier Indian and Global B-Schools.</p>
              </div>
              <div className="bg-emerald-400 border-4 border-foreground p-8 -rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 transition-transform cursor-crosshair">
                <h3 className="font-black text-2xl uppercase mb-2 text-foreground">Process Specialist</h3>
                <p className="font-bold text-gray-900 text-lg">Six Sigma certified professional focusing on optimizing your application and interview performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Journey (Timeline Alternative) */}
      <section className="py-24 px-6 sm:px-12 bg-white border-b-8 border-foreground">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-5xl md:text-7xl font-black uppercase mb-20 text-center tracking-tight">
            The <span className="bg-primary text-white px-4 border-4 border-foreground inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-2">Journey</span>
          </h2>

          <div className="flex flex-col gap-8">
            {WORK_EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="group flex flex-col md:flex-row gap-6 items-center bg-gray-50 border-4 border-foreground p-6 md:p-8 hover:bg-yellow-200 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2">
                <div className={`shrink-0 w-24 h-24 ${exp.color} border-4 border-foreground flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform`}>
                  <exp.icon className="text-white w-12 h-12" />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="inline-block bg-foreground text-white px-3 py-1 font-bold text-sm tracking-widest uppercase mb-3">
                    {exp.period}
                  </div>
                  <h3 className="text-3xl font-black text-foreground uppercase tracking-tight leading-none mb-2">
                    {exp.role}
                  </h3>
                  <p className="text-2xl font-black text-primary uppercase">
                    @ {exp.company}
                  </p>
                </div>
                <div className="md:w-1/3 text-center md:text-right border-t-4 md:border-t-0 md:border-l-4 border-foreground pt-6 md:pt-0 md:pl-6 mt-2 md:mt-0">
                  <p className="font-bold text-gray-700 text-lg leading-snug">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Section: Certifications & Internships */}
      <section className="py-24 px-6 sm:px-12 bg-blue-50 border-b-8 border-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Certifications */}
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-12 border-b-8 border-foreground pb-4 inline-block">
                Certifications
              </h2>
              <div className="flex flex-col gap-6">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="bg-white border-4 border-foreground p-6 flex items-center gap-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                    <div className={`w-16 h-16 shrink-0 ${cert.color} border-4 border-foreground flex items-center justify-center`}>
                      <cert.icon className="text-white w-8 h-8" strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase leading-tight">{cert.title}</h3>
                      <p className="text-lg font-bold text-gray-600">{cert.organization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internships */}
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-12 border-b-8 border-foreground pb-4 inline-block">
                Early Career
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {INTERNSHIPS.map((intern, idx) => (
                  <div key={idx} className="bg-accent/20 border-4 border-foreground p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-accent hover:text-white transition-colors group cursor-default">
                    <h3 className="text-xl font-black uppercase leading-tight mb-2 group-hover:text-white">{intern.role}</h3>
                    <p className="font-bold text-foreground group-hover:text-white">@ {intern.company}</p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground py-24 px-6 sm:px-12 overflow-hidden relative">
        <div className="absolute -left-20 top-10 opacity-10">
          <Award className="w-96 h-96 text-white" />
        </div>
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl font-black uppercase mb-8 leading-[0.8] text-white">
            Ready to <br />
            <span className="text-primary block mt-4">Succeed?</span>
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-gray-300 mb-12 max-w-3xl mx-auto">
            Don't just apply. Strategize with a professional who understands the metrics of success.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a href="/inquiry" className="group bg-primary border-4 border-white px-10 py-6 text-2xl font-black uppercase tracking-widest text-white hover:bg-white hover:text-primary hover:border-primary transition-all hover:scale-110 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none flex items-center gap-4">
              Let's Start
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
