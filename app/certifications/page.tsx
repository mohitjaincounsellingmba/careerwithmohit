"use client";

import { useState } from 'react';
import { Award, BookOpen, CheckCircle2, Star, Zap, GraduationCap, TrendingUp, Users, BarChart3, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Course Type Definition
type CourseType = 'free' | 'paid';

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  type: CourseType;
  price?: string;
  topics?: string[];
  features?: string[];
  description?: string;
  icon: any;
  color: string;
  externalLink?: string;
}

const CERTIFICATIONS: Course[] = [
  // --- INTERNAL FREE ---
  // --- LEARNVERN FREE ---
  {
    id: 'lv-python',
    title: "Python Tutorial",
    provider: "LearnVern",
    duration: "Self-Paced",
    type: 'free',
    topics: ["Python Syntax", "Data Types", "Object-Oriented Programming"],
    icon: Zap,
    color: "bg-yellow-500",
    externalLink: "https://www.learnvern.com/course/python-tutorial-hindi"
  },
  {
    id: 'lv-dm',
    title: "Digital Marketing",
    provider: "LearnVern",
    duration: "Self-Paced",
    type: 'free',
    topics: ["Search Engine Optimization", "PPC Advertising", "Email Marketing"],
    icon: TrendingUp,
    color: "bg-purple-500",
    externalLink: "https://www.learnvern.com/course/digital-marketing-tutorial-hindi"
  },
  {
    id: 'lv-excel',
    title: "Advance MS Excel",
    provider: "LearnVern",
    duration: "Self-Paced",
    type: 'free',
    topics: ["Macros & VBA", "Logical Functions", "Dashboard Creation"],
    icon: BarChart3,
    color: "bg-green-600",
    externalLink: "https://www.learnvern.com/course/ms-excel-tutorial"
  },
  {
    id: 'lv-java',
    title: "Core Java Tutorial",
    provider: "LearnVern",
    duration: "Self-Paced",
    type: 'free',
    topics: ["JVM Architecture", "Multithreading", "Exception Handling"],
    icon: Zap,
    color: "bg-orange-500",
    externalLink: "https://www.learnvern.com/course/java-tutorial-hindi"
  },
  {
    id: 'lv-ml',
    title: "Machine Learning with Python",
    provider: "LearnVern",
    duration: "Self-Paced",
    type: 'free',
    topics: ["Linear Regression", "Neural Networks", "Scikit-Learn"],
    icon: BarChart3,
    color: "bg-indigo-600",
    externalLink: "https://www.learnvern.com/course/machine-learning-with-python-tutorial"
  },
  // --- EXTERNAL PAID ---
  {
    id: 'stock-investing',
    title: "Stock Investing Made Easy",
    provider: "Elearn Markets",
    price: "Premium",
    duration: "Self-Paced",
    type: 'paid',
    description: "Master the art of stock market investing with this comprehensive beginner-to-pro guide.",
    features: ["Fundamental Analysis", "Technical Basics", "Portfolio Management"],
    icon: BarChart3,
    color: "bg-rose-600",
    externalLink: "https://www.elearnmarkets.com/courses/display/stock-investing-made-easy?aff_code=ELMAFF2497&utm_source=ELMAFF2497&utm_medium=affiliate"
  },
  {
    id: 'advanced-excel-paid',
    title: "Advanced Excel Tutorial",
    provider: "Elearn Markets",
    price: "Premium",
    duration: "Self-Paced",
    type: 'paid',
    description: "Go beyond the basics and master complex Excel functions, data analysis, and automation.",
    features: ["Advanced Formulas", "Data Cleaning", "Macros & Pivot Tables"],
    icon: BookOpen,
    color: "bg-emerald-600",
    externalLink: "https://www.elearnmarkets.com/courses/display/advanced-excel-tutorial?aff_code=ELMAFF2497&utm_source=ELMAFF2497&utm_medium=affiliate"
  }
];

export default function CertificationsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'free' | 'paid'>('all');

  const filteredCourses = activeFilter === 'all'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter(c => c.type === activeFilter);

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
            Browse through our curated list of high-quality free certification courses.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {['all', 'free', 'paid'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-8 py-3 text-xl font-black uppercase border-4 border-foreground transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${activeFilter === filter
                    ? 'bg-accent text-foreground'
                    : 'bg-white text-gray-500 hover:text-foreground'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section className="py-24 px-6 sm:px-12 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCourses.map((course) => {
              const Icon = course.icon;
              return (
                <div
                  key={course.id}
                  className={`bg-white border-4 border-foreground p-8 relative flex flex-col h-full transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${course.type === 'free'
                      ? 'shadow-[8px_8px_0px_0px_rgba(16,185,129,1)]'
                      : 'shadow-[8px_8px_0px_0px_rgba(244,63,94,1)]'
                    }`}
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-foreground text-white px-3 py-0.5 text-xs font-black uppercase tracking-widest">
                    {course.type === 'paid' ? course.price : 'FREE'}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 ${course.color} border-4 border-foreground flex items-center justify-center mb-6 rotate-2`}>
                    <Icon className="text-white w-8 h-8" />
                  </div>

                  {/* Header */}
                  <h3 className="text-2xl font-black text-foreground uppercase mb-2 leading-tight min-h-[3.5rem]">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-6">
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 text-xs font-bold uppercase border-2 border-foreground/10">
                      {course.duration}
                    </span>
                    <span className="text-primary font-black text-xs uppercase italic">
                      @{course.provider}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    {course.description && (
                      <p className="font-bold text-gray-600 mb-6 leading-relaxed text-sm">
                        {course.description}
                      </p>
                    )}

                    <ul className="space-y-2 mb-8">
                      {(course.topics || course.features || []).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 font-bold text-gray-700 text-sm">
                          {course.type === 'paid' ? (
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  {course.externalLink ? (
                    <a
                      href={course.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-white border-4 border-foreground py-3 text-lg font-black uppercase hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      {course.type === 'paid' ? 'Enroll on Elearn Market' : 'Enroll on LearnVern'} <ExternalLink className="w-5 h-5" />
                    </a>
                  ) : (
                    <a
                      href="/inquiry"
                      className={`block w-full text-center border-4 border-foreground py-3 text-lg font-black uppercase transition-colors ${course.type === 'paid'
                          ? 'bg-foreground text-white hover:bg-red-500'
                          : 'bg-white text-foreground hover:bg-emerald-500 hover:text-white'
                        }`}
                    >
                      {course.type === 'paid' ? 'Buy Course' : 'Enroll Now'}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-3xl font-black text-gray-400 uppercase">No courses found matching this filter.</h3>
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-foreground text-white py-20 px-6 sm:px-12 border-t-8 border-foreground">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center flex-wrap gap-8 mb-10 overflow-hidden opacity-50">
            <div className="font-black text-2xl uppercase italic whitespace-nowrap">Collaborative Learning</div>
            <div className="font-black text-2xl uppercase italic whitespace-nowrap">Industry Certified</div>
            <div className="font-black text-2xl uppercase italic whitespace-nowrap">Career Growth</div>
          </div>
          <h2 className="font-display text-3xl font-black uppercase mb-6">Need a custom learning path?</h2>
          <Link href="/inquiry" className="inline-block bg-white text-foreground border-4 border-white px-8 py-4 text-xl font-black uppercase hover:bg-primary hover:text-white transition-all transform hover:scale-110">
            Get Personal Counselling
          </Link>
        </div>
      </section>
    </div>
  );
}
