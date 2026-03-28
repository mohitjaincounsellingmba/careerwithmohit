import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Smartphone, 
  Lock, 
  Video, 
  FileText, 
  TrendingUp, 
  Users, 
  Youtube, 
  GraduationCap, 
  Building2,
  ArrowRight,
  CheckCircle2,
  Play
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Sell Your Coaching Online | Build Branded Coaching App for Teachers & YouTubers",
  description: "Launch your own branded coaching app and website. The best platform for teachers, YouTubers, and coaching centers to sell courses online and 10x their income. Secure content, live classes, and easy payments.",
  keywords: [
    "sell coaching online", "branded coaching app", "app for teachers", "online coaching platform", 
    "LMS for coaching centers", "monetize youtube channel", "coaching app builder", 
    "digital coaching business", "10x coaching income"
  ],
  alternates: {
    canonical: "/sell-your-coaching-online",
  },
};

const TARGET_AUDIENCE = [
  {
    title: "For Teachers",
    description: "Take your local tuition classes online. Reach students across India with your own branded app.",
    icon: GraduationCap,
    color: "bg-blue-50",
    accent: "text-blue-600"
  },
  {
    title: "For YouTubers",
    description: "Convert your subscribers into paid students. Own your platform and keep 100% of your earnings.",
    icon: Youtube,
    color: "bg-rose-50",
    accent: "text-rose-600"
  },
  {
    title: "For Content Creators",
    description: "Share your expertise through structured courses. Build a recurring income stream without tech headaches.",
    icon: Users,
    color: "bg-amber-50",
    accent: "text-amber-600"
  },
  {
    title: "For Coaching Centers",
    description: "Scale your physical center to a digital empire. Manage thousands of students with ease.",
    icon: Building2,
    color: "bg-emerald-50",
    accent: "text-emerald-600"
  }
];

const FEATURES = [
  {
    title: "Branded Mobile App",
    description: "Get your own Android and iOS app with your logo and brand colors to build massive trust.",
    icon: Smartphone
  },
  {
    title: "Anti-Piracy Security",
    description: "Top-notch security with screen-recording prevention and encrypted content delivery.",
    icon: Lock
  },
  {
    title: "Live Classes & Chat",
    description: "Conduct high-quality live sessions and interact with students in real-time with integrated chat.",
    icon: Video
  },
  {
    title: "Test Series & Quizzes",
    description: "Create AI-powered mock tests, auto-grading quizzes, and detailed student performance reports.",
    icon: FileText
  },
  {
    title: "Growth Analytics",
    description: "Track your sales, student engagement, and ROI with powerful business intelligence tools.",
    icon: TrendingUp
  },
  {
    title: "Automated Payments",
    description: "Accept payments via UPI, Cards, and Netbanking with automated GST invoicing.",
    icon: CheckCircle2
  }
];

export default function LeadGenLandingPage() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-primary px-6 py-24 sm:px-12 lg:py-40 border-b-8 border-foreground">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rotate-45 bg-white/10" />
        
        <div className="relative mx-auto max-w-7xl z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center text-center lg:text-left">
            <div>
              <span className="inline-block bg-accent text-foreground px-4 py-1 font-black uppercase text-sm border-2 border-foreground mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                #1 App Builder for Educators
              </span>
              <h1 className="font-display text-5xl font-extrabold tracking-tighter text-white sm:text-7xl md:text-8xl leading-none uppercase">
                Stop Sharing <br />
                <span className="bg-white text-primary px-4 py-1 inline-block mt-4 -rotate-1 border-4 border-foreground">Your Revenue.</span>
              </h1>
              <p className="mt-8 text-xl font-bold leading-relaxed text-blue-100 max-w-2xl">
                The all-in-one platform for Teachers, YouTubers, and Coaching Centers to sell courses online, launch branded apps, and 10x their income.
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
                <Link href="#inquiry" className="w-full sm:w-auto rounded-md bg-accent px-8 py-4 text-2xl font-black text-foreground transition-all hover:scale-105 hover:bg-white border-4 border-foreground text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3">
                  Get Your App <ArrowRight />
                </Link>
                <div className="flex items-center gap-4 text-white font-bold">
                  <div className="h-12 w-12 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
                    <Play fill="white" size={20} />
                  </div>
                  <span>Watch Demo</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-white/10 rounded-3xl -rotate-3 border-4 border-foreground translate-x-4 translate-y-4" />
              <div className="relative bg-white p-2 rounded-3xl border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <img 
                  src="/images/coaching-app-mockup.png" 
                  alt="Branded Coaching App Mockup" 
                  className="w-full h-auto rounded-2xl border-2 border-gray-100"
                />
                <div className="mt-6 px-6 pb-6 flex items-center justify-between border-t-2 border-gray-100 pt-6">
                  <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-foreground bg-gray-200" />
                    ))}
                  </div>
                  <p className="text-sm font-black text-foreground">
                    JOIN 50,000+ EDUCATORS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE SECTION */}
      <section className="bg-white px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase leading-none mb-6">
              Who is <span className="text-primary italic">this for?</span>
            </h2>
            <p className="text-xl font-bold text-gray-600 max-w-3xl mx-auto">
              Whether you are an individual teacher or a large-scale coaching institute, we have the tools to help you dominate the digital market.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {TARGET_AUDIENCE.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-2xl border-4 border-foreground ${item.color} p-8 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
                >
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-white border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Icon className={`h-8 w-8 ${item.accent}`} strokeWidth={3} />
                  </div>
                  <h3 className="font-display text-2xl font-black text-foreground mb-4 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 font-bold leading-relaxed italic">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-muted px-6 py-24 sm:px-12 border-y-8 border-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase leading-none mb-8">
                Everything <br /> You Need to <br /> <span className="text-primary tracking-tighter italic">Grow 10x</span>
              </h2>
              <p className="text-xl font-bold text-gray-600 mb-10">
                A complete ecosystem designed to automate your marketing, delivery, and sales.
              </p>
              <Link href="#inquiry" className="inline-flex h-14 items-center justify-center rounded-md bg-foreground px-8 py-3 text-lg font-bold text-white transition-all hover:bg-primary hover:scale-105 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Explore All Features &rarr;
              </Link>
            </div>
            
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {FEATURES.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="bg-white p-8 rounded-xl border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:bg-primary transition-colors duration-300">
                    <div className="h-12 w-12 rounded-lg bg-gray-50 border-2 border-foreground flex items-center justify-center mb-6 group-hover:bg-white group-hover:rotate-6 transition-all">
                      <Icon className="h-6 w-6 text-primary" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-black text-foreground mb-3 uppercase group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-bold group-hover:text-white/80 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* INQUIRY SECTION */}
      <section id="inquiry" className="bg-white px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="relative bg-white border-8 border-foreground p-8 md:p-16 rounded-3xl shadow-[12px_12px_0px_0px_rgba(59,130,246,1)] overflow-hidden">
             {/* Decorative pattern */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rotate-45 translate-x-16 -translate-y-16 border-4 border-foreground" />
             
             <div className="relative z-10 text-center mb-12">
               <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl uppercase leading-none mb-6">
                 Launch Your <br /> <span className="text-primary italic">Digital Academy</span> Today
               </h2>
               <p className="text-xl font-bold text-gray-600">
                 Fill out the form below to book a free personal demo with our experts.
               </p>
             </div>
             
             <form className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
               <div className="space-y-4">
                 <label className="block text-sm font-black uppercase tracking-widest text-foreground">Your Full Name</label>
                 <input 
                   type="text" 
                   className="w-full bg-gray-50 border-4 border-foreground px-6 py-4 rounded-xl font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all" 
                   placeholder="e.g. Mohit Jain"
                 />
               </div>
               <div className="space-y-4">
                 <label className="block text-sm font-black uppercase tracking-widest text-foreground">Phone Number</label>
                 <input 
                   type="tel" 
                   className="w-full bg-gray-50 border-4 border-foreground px-6 py-4 rounded-xl font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all" 
                   placeholder="e.g. +91 95600 20771"
                 />
               </div>
               <div className="space-y-4 sm:col-span-2">
                 <label className="block text-sm font-black uppercase tracking-widest text-foreground">Your Role</label>
                 <select className="w-full bg-gray-50 border-4 border-foreground px-6 py-4 rounded-xl font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all appearance-none cursor-pointer">
                   <option>Independent Teacher</option>
                   <option>YouTuber / Content Creator</option>
                   <option>Coaching Institute Owner</option>
                   <option>Educational Organization</option>
                 </select>
               </div>
               <div className="sm:col-span-2 mt-4 text-center">
                 <button 
                  type="button"
                  className="w-full rounded-md bg-accent px-8 py-5 text-2xl font-black text-foreground transition-all hover:scale-105 hover:bg-white border-4 border-foreground text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase"
                 >
                   Book Free Demo Now
                 </button>
                 <p className="mt-6 text-sm font-bold text-gray-500">
                   Join 5,000+ creators who joined last month. No credit card required.
                 </p>
               </div>
             </form>
          </div>
        </div>
      </section>

      {/* FOOTER SERVICE DETAILS SECTION (As requested) */}
      <section className="bg-foreground text-white px-6 py-16 sm:px-12 border-t-8 border-accent">
        <div className="mx-auto max-w-7xl border-b border-gray-800 pb-16">
          <div className="grid lg:grid-cols-4 gap-12">
            <div>
              <h4 className="text-accent font-black uppercase tracking-widest mb-6 border-b-2 border-accent inline-block">Our Mission</h4>
              <p className="text-gray-400 font-bold leading-relaxed">
                We empower the backbone of education—teachers and creators—to achieve financial independence by providing state-of-the-art technology.
              </p>
            </div>
            <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
               {[
                 { title: "For Teachers", list: ["Own App", "Live Classes", "1-on-1 Mentorship", "Easy Fees"] },
                 { title: "For YouTubers", list: ["Ad-free Learning", "Monetization", "Community", "Brand Control"] },
                 { title: "For Coaching Centers", list: ["Massive Scale", "Admin Dashboard", "ERP Integration", "Mock Tests"] },
                 { title: "Business Goal", list: ["10x Income", "Sell Courses", "Global Reach", "Content Security"] }
               ].map((group, i) => (
                 <div key={i}>
                   <h5 className="font-bold text-lg mb-4 text-white uppercase tracking-tighter">{group.title}</h5>
                   <ul className="space-y-2 text-gray-500 font-bold">
                     {group.list.map((item, j) => (
                       <li key={j} className="flex items-center gap-2">
                         <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                         {item}
                       </li>
                     ))}
                   </ul>
                 </div>
               ))}
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl pt-12 text-center text-gray-600 font-bold text-sm">
          Lead Generation Landing Page optimized for 2026 Digital Market | CareerWithMohit Business Solutions
        </div>
      </section>
    </div>
  );
}
