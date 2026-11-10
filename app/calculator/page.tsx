import { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, Award, Compass, GraduationCap, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Academic & Admission Calculators 2026-2027 | Free Student Tools | CareerWithMohit",
  description: "Free online academic and admission calculators: CGPA to percentage converter, CUET UG & PG score calculators, JEE Main rank estimator, and MBA percentile predictors.",
  alternates: {
    canonical: "https://careerwithmohit.online/calculator/",
  },
};

export default function CalculatorHubPage() {
  const calculators = [
    {
      title: "Academic Grade & CGPA Calculator",
      description: "Convert CBSE/University CGPA to percentage, calculate semester SGPA to CGPA with credits, and convert UGC letter grades.",
      href: "/tools/academic-calculators/",
      tag: "Academic Tool",
    },
    {
      title: "CUET UG Percentile & College Predictor 2026",
      description: "Estimate your DU, BHU, and Central University admission chances based on expected CUET UG subject scores.",
      href: "/calculator/cuet-ug-2026/",
      tag: "Undergraduate",
    },
    {
      title: "CUET PG MBA & College Predictor 2026",
      description: "Analyze TISS, DAVV, and top central university MBA cutoff percentiles using your CUET PG score.",
      href: "/calculator/cuet-pg-2026/",
      tag: "Postgraduate",
    },
    {
      title: "JEE Main Rank & College Predictor 2026",
      description: "Calculate your approximate JEE Main All India Rank (AIR) and discover eligible NITs, IIITs, and GFTIs.",
      href: "/calculator/jee-main-2026/",
      tag: "Engineering",
    },
    {
      title: "MAH MBA CET Score & Percentile Calculator 2026",
      description: "Predict your Maharashtra CET percentile and evaluate CAP round cutoff chances for JBIMS, SIMSREE, and PUMBA.",
      href: "/calculator/mhcet-mba-2026/",
      tag: "MBA Entrance",
    },
    {
      title: "Career Roadmap & Skill Assessment Calculator",
      description: "Generate a custom step-by-step career pathway based on your academic background, degree, and target industry.",
      href: "/calculator/career-roadmap/",
      tag: "Career Guidance",
    },
    {
      title: "Professional Certification ROI Calculator",
      description: "Evaluate the salary boost and career return of CFA, FRM, NISM, and Cloud certifications before investing.",
      href: "/calculator/certification/",
      tag: "Certifications",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4">
            <Calculator className="w-4 h-4" />
            <span>Student & Admissions Productivity Suite</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground mb-4">
            Academic & Admission Calculators
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            100% free, accurate calculation tools designed by Mohit Jain to help students make data-backed admission and career decisions.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculators.map((calc, idx) => (
            <Link
              key={idx}
              href={calc.href}
              className="p-6 bg-white border-4 border-foreground rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="inline-block bg-accent px-2.5 py-1 rounded text-xs font-black uppercase border border-foreground mb-3">
                  {calc.tag}
                </span>
                <h2 className="font-display text-xl font-black text-foreground group-hover:text-primary transition-colors mb-2">
                  {calc.title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {calc.description}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase text-primary group-hover:underline">
                <span>Launch Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

