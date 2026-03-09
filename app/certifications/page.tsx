import { Award, BookOpen, CheckCircle2, Star, Zap, Shield, Play, GraduationCap } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Professional Certifications | CareerWithMohit",
  description: "Boost your career with our curated selection of free and paid professional certification courses. From Digital Marketing to Business Analytics.",
  keywords: ["free certifications", "paid courses", "digital marketing certification", "business analytics course", "mohit jain certifications", "career growth courses"],
  alternates: {
    canonical: "/certifications",
  },
};

const FREE_COURSES = [
  {
    title: "Digital Marketing Foundations",
    provider: "CareerWithMohit",
    duration: "2 Weeks",
    topics: ["SEO Basics", "Social Media Strategy", "Content Marketing"],
    icon: TrendingUpIcon, // I'll use Lucide icons below
    color: "bg-blue-500"
  },
  {
    title: "Excel for Business",
    provider: "Data Academy",
    duration: "1 Week",
    topics: ["Pivot Tables", "VLOOKUP", "Data Visualization"],
    icon: BookOpen,
    color: "bg-emerald-500"
  },
  {
    title: "Counselling 101",
    provider: "CareerWithMohit",
    duration: "3 Days",
    topics: ["Profile Building", "Interview Basics", "College Selection"],
    icon: UsersIcon,
    color: "bg-purple-500"
  }
];

const PAID_COURSES = [
  {
    title: "Mastering MBA Admissions",
    price: "₹4,999",
    duration: "4 Weeks",
    description: "End-to-end guidance for Top 50 B-Schools, including GD/PI prep and SOP writing.",
    features: ["One-on-One Mentoring", "Mock Interviews", "Profile Audit"],
    icon: GraduationCap,
    color: "bg-red-500"
  },
  {
    title: "Advanced Digital Marketing",
    price: "₹7,999",
    duration: "8 Weeks",
    description: "Become a performance marketing expert with hands-on projects and tool mastery.",
    features: ["Live Campaign Setup", "Google Ads Certification", "Job Assistance"],
    icon: Zap,
    color: "bg-amber-500"
  },
  {
    title: "Business Analytics Pro",
    price: "₹6,499",
    duration: "6 Weeks",
    description: "Learn to drive business decisions using data, Python, and Tableau.",
    features: ["Real-world Datasets", "Certification", "Lifetime Access"],
    icon: BarChartIcon,
    color: "bg-indigo-500"
  }
];

// Helper components for icons that weren't imported initially
function TrendingUpIcon(props: any) {
  return <path d="M3 17l6-6 4 4 8-8" {...props} />
}

function BarChartIcon(props: any) {
  return <path d="M12 20V10M18 20V4M6 20v-4" {...props} />
}

function UsersIcon(props: any) {
  return <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" {...props} />
}

export default function CertificationsPage() {
  return (
    <div className="w-full bg-muted min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b-8 border-foreground py-20 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-foreground sm:text-7xl mb-6 leading-none">
            Level Up <br />
            <span className="bg-primary text-white px-4 py-1 -rotate-2 inline-block border-4 border-foreground mt-2">Your Skills</span>
          </h1>
          <p className="max-w-2xl mx-auto text-2xl font-bold text-gray-700 leading-tight mb-8">
            Curated certification programs designed to bridge the gap between education and employability.
          </p>
        </div>
      </section>

      {/* Free Tier */}
      <section className="py-24 px-6 sm:px-12 border-b-8 border-foreground bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-16 border-b-4 border-foreground pb-6">
            <h2 className="font-display text-4xl font-black uppercase flex items-center gap-4">
              <span className="w-12 h-12 bg-emerald-500 rounded-full border-4 border-foreground flex items-center justify-center text-white italic">F</span>
              Free Foundational Courses
            </h2>
            <span className="hidden sm:block font-black text-emerald-600 uppercase tracking-widest text-sm">No Credit Card Required</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {FREE_COURSES.map((course, idx) => {
              const Icon = course.icon;
              return (
                <div key={idx} className="bg-white border-4 border-foreground p-8 relative shadow-[8px_8px_0px_0px_rgba(16,185,129,1)] transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                  <div className={`w-14 h-14 ${course.color} border-4 border-foreground flex items-center justify-center mb-6`}>
                    {typeof Icon === 'function' ? <Icon className="text-white w-8 h-8" /> : <div className="text-white font-black">?</div>}
                  </div>
                  <h3 className="text-2xl font-black text-foreground uppercase mb-2 leading-tight">{course.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-foreground text-white px-2 py-0.5 text-xs font-bold uppercase">{course.duration}</span>
                    <span className="text-gray-500 font-bold text-xs uppercase italic">{course.provider}</span>
                  </div>
                  <ul className="space-y-2 mb-8">
                    {course.topics.map((topic, tidx) => (
                      <li key={tidx} className="flex items-center gap-2 font-bold text-gray-600 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <a href="/inquiry" className="block w-full text-center bg-white border-4 border-foreground py-3 text-lg font-black uppercase hover:bg-emerald-500 hover:text-white transition-colors">
                    Enroll Now
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Paid Tier */}
      <section className="py-24 px-6 sm:px-12 bg-accent/5">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-16 border-b-4 border-foreground pb-6">
            <h2 className="font-display text-4xl font-black uppercase flex items-center gap-4">
              <span className="w-12 h-12 bg-red-500 rounded-full border-4 border-foreground flex items-center justify-center text-white italic">P</span>
              Premium Specialized Courses
            </h2>
            <span className="hidden sm:block font-black text-red-600 uppercase tracking-widest text-sm">Expert-Led Training</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PAID_COURSES.map((course, idx) => {
              const Icon = course.icon;
              return (
                <div key={idx} className="bg-white border-4 border-foreground p-8 relative shadow-[10px_10px_0px_0px_rgba(244,63,94,1)] transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                  <div className="absolute top-8 right-8 text-3xl font-black text-foreground underline decoration-red-500 underline-offset-4 decoration-4">
                    {course.price}
                  </div>
                  <div className={`w-16 h-16 ${course.color} border-4 border-foreground flex items-center justify-center mb-8 rotate-3`}>
                    <Icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-foreground uppercase mb-4 leading-none tracking-tight">{course.title}</h3>
                  <p className="font-bold text-gray-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="space-y-3 mb-10">
                    {course.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-3 font-black text-gray-800 text-sm uppercase">
                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <a href="https://wa.me/919560020771" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-foreground text-white border-4 border-foreground py-4 text-xl font-black uppercase tracking-widest hover:bg-red-500 transition-colors">
                    Buy Course
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-foreground text-white py-20 px-6 sm:px-12 border-t-8 border-foreground">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center gap-8 mb-10 overflow-hidden opacity-50">
             <div className="font-black text-2xl uppercase italic whitespace-nowrap">IIM Certified</div>
             <div className="font-black text-2xl uppercase italic whitespace-nowrap">Industry Focused</div>
             <div className="font-black text-2xl uppercase italic whitespace-nowrap">Career Growth</div>
          </div>
          <h2 className="font-display text-3xl font-black uppercase mb-6">Unsure which course is for you?</h2>
          <a href="/inquiry" className="inline-block bg-white text-foreground border-4 border-white px-8 py-4 text-xl font-black uppercase hover:bg-primary hover:text-white transition-all transform hover:scale-110">
            Talk to an Expert
          </a>
        </div>
      </section>
    </div>
  );
}
