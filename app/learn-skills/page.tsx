import type { Metadata } from "next";
import Link from "next/link";
import { 
  Code2, 
  Layout, 
  Database, 
  Terminal, 
  Globe, 
  Cpu, 
  BarChart3, 
  Sparkles,
  ArrowRight,
  Play
} from "lucide-react";

export const metadata: Metadata = {
  title: "Learn Skills | Master Tech & Career Skills 2026",
  description: "Free tutorials and resources for HTML, CSS, JavaScript, Python, SQL, and AI skills. Start learning today with Mohit Jain's career hub.",
};

const SKILLS_DATA = [
  {
    title: "HTML",
    subtitle: "The language for building web pages",
    color: "bg-[#D9EEE1]",
    textColor: "text-[#282A35]",
    buttonColor: "bg-[#04AA6D]",
    icon: <Globe className="w-8 h-8" />,
    description: "Learn the foundation of the web. Perfect for beginners starting their coding journey.",
    link: "/learn-skills/html"
  },
  {
    title: "CSS",
    subtitle: "The language for styling web pages",
    color: "bg-[#FFF4A3]",
    textColor: "text-[#282A35]",
    buttonColor: "bg-[#282A35]",
    buttonTextColor: "text-white",
    icon: <Layout className="w-8 h-8" />,
    description: "Master layouts, colors, and animations to make beautiful, responsive websites.",
    link: "/learn-skills/css"
  },
  {
    title: "JavaScript",
    subtitle: "The language for programming web pages",
    color: "bg-[#282A35]",
    textColor: "text-white",
    buttonColor: "bg-[#04AA6D]",
    icon: <Code2 className="w-8 h-8" />,
    description: "Add interactivity and complex functionality to your sites with JS.",
    link: "/learn-skills/javascript"
  },
  {
    title: "Python",
    subtitle: "A popular programming language",
    color: "bg-[#F3ECEA]",
    textColor: "text-[#282A35]",
    buttonColor: "bg-[#282A35]",
    buttonTextColor: "text-white",
    icon: <Terminal className="w-8 h-8" />,
    description: "The most versatile language for Data Science, AI, and Automation.",
    link: "/learn-skills/python"
  },
  {
    title: "SQL",
    subtitle: "A language for accessing databases",
    color: "bg-[#96D4D4]",
    textColor: "text-[#282A35]",
    buttonColor: "bg-[#282A35]",
    buttonTextColor: "text-white",
    icon: <Database className="w-8 h-8" />,
    description: "Essential skill for managing data and backend development.",
    link: "/learn-skills/sql"
  },
  {
    title: "AI Skills",
    subtitle: "Master the tools of the future",
    color: "bg-[#FFC0C7]",
    textColor: "text-[#282A35]",
    buttonColor: "bg-primary",
    buttonTextColor: "text-white",
    icon: <Sparkles className="w-8 h-8" />,
    description: "Prompt engineering, LLMs, and AI automation for career growth.",
    link: "/learn-skills/ai"
  }
];

export default function LearnSkillsPage() {
  return (
    <div className="min-h-screen bg-[#282A35] text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Learn to <span className="text-[#04AA6D]">Code</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-bold mb-12 max-w-2xl mx-auto">
            With the world's largest web developer site. Start your journey with Mohit Jain's Skill Hub.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="relative group w-full max-w-md">
              <input 
                type="text" 
                placeholder="Search our tutorials, e.g. HTML" 
                className="w-full bg-white text-black py-4 px-8 rounded-full font-bold focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all shadow-xl"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#04AA6D] hover:bg-[#059862] text-white px-6 rounded-full transition-colors flex items-center gap-2">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="mt-12">
            <Link href="/inquiry" className="text-white hover:text-[#04AA6D] font-bold underline underline-offset-8 decoration-2 decoration-[#04AA6D]/50 transition-colors">
              Not sure where to start? Get Career Counselling
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SKILLS_DATA.map((skill, idx) => (
              <div 
                key={idx}
                className={`${skill.color} ${skill.textColor} p-10 rounded-[40px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 shadow-2xl group`}
              >
                <div>
                  <div className="mb-6 opacity-80">{skill.icon}</div>
                  <h2 className="text-4xl font-black mb-2">{skill.title}</h2>
                  <p className="text-lg font-bold opacity-70 mb-6">{skill.subtitle}</p>
                  <p className="text-sm font-medium mb-8 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
                
                <Link 
                  href={skill.link}
                  className={`w-full py-4 rounded-full font-black text-center uppercase tracking-wider ${skill.buttonColor} ${skill.buttonTextColor || 'text-white'} hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                >
                  Learn {skill.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mock "Try it Yourself" Section */}
      <section className="py-24 bg-white text-[#282A35]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
                HTML <span className="text-[#04AA6D]">Example:</span>
              </h2>
              <div className="bg-[#E7E9EB] p-8 rounded-2xl border-l-[10px] border-[#04AA6D] shadow-inner mb-8">
                <pre className="font-mono text-sm md:text-base overflow-x-auto">
{`<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`}
                </pre>
              </div>
              <Link 
                href="/learn-skills/html"
                className="inline-flex items-center gap-2 bg-[#04AA6D] hover:bg-[#059862] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest shadow-xl transition-all"
              >
                <Play fill="white" size={16} /> Try it Yourself
              </Link>
            </div>
            
            <div className="lg:w-1/2 space-y-12">
              <div className="bg-[#FFF4A3] p-12 rounded-[40px] shadow-2xl">
                <h3 className="text-3xl font-black mb-4">Master CSS</h3>
                <p className="font-bold mb-8 opacity-70">Styling the web is an art. Learn how to design pixel-perfect layouts.</p>
                <Link href="/learn-skills/css" className="bg-[#282A35] text-white px-8 py-3 rounded-full font-black inline-block">Learn CSS</Link>
              </div>
              <div className="bg-[#D9EEE1] p-12 rounded-[40px] shadow-2xl">
                <h3 className="text-3xl font-black mb-4">JavaScript Logic</h3>
                <p className="font-bold mb-8 opacity-70">Power your websites with logic and data. The #1 programming language.</p>
                <Link href="/learn-skills/javascript" className="bg-[#04AA6D] text-white px-8 py-3 rounded-full font-black inline-block">Learn JS</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-24 bg-[#282A35]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tight">
            Build Your <span className="text-primary italic">Career</span> with Mohit Jain
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-10 rounded-3xl border-2 border-gray-700 hover:border-primary transition-colors">
              <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-6" />
              <h3 className="text-xl font-black mb-4">Digital Marketing</h3>
              <p className="text-gray-400 font-medium mb-6">Learn SEO, SEM, and Content Strategy to grow any business.</p>
              <Link href="/services" className="text-primary font-black hover:underline">Explore Course</Link>
            </div>
            <div className="bg-gray-800/50 p-10 rounded-3xl border-2 border-gray-700 hover:border-secondary transition-colors">
              <Cpu className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
              <h3 className="text-xl font-black mb-4">AI for Business</h3>
              <p className="text-gray-400 font-medium mb-6">Leverage AI tools like ChatGPT and Midjourney for productivity.</p>
              <Link href="/services" className="text-secondary font-black hover:underline">Explore Course</Link>
            </div>
            <div className="bg-gray-800/50 p-10 rounded-3xl border-2 border-gray-700 hover:border-accent transition-colors">
              <BarChart3 className="w-12 h-12 text-pink-400 mx-auto mb-6" />
              <h3 className="text-xl font-black mb-4">Interview Mastery</h3>
              <p className="text-gray-400 font-medium mb-6">Get cracked tips for tech and MBA interviews in 2026.</p>
              <Link href="/services" className="text-accent font-black hover:underline">Get Coached</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
