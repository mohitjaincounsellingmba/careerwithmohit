import { CertificationCalculator } from "@/components/CertificationCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MBA & PGDM Certification Calculator | Find Your Best Upkilling Path",
  description: "Select your MBA specialization and find the top certifications like CFA, FRM, Digital Marketing, and Lean Six Sigma with detailed Pros, Cons, and ROI analysis.",
  keywords: ["mba certifications", "pgdm certifications", "finance certifications india", "marketing certifications for mba", "cfa vs frm", "lean six sigma for mba"]
};

export default function CertificationCalculatorPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-foreground">
          Certification <span className="text-primary underline">Calculator</span>
        </h1>
        <p className="text-xl font-bold text-slate-500 max-w-2xl mx-auto uppercase tracking-wide">
          Bridge the gap between your degree and industry requirements.
        </p>
      </div>

      <CertificationCalculator />
      
      <section className="max-w-4xl mx-auto mt-24 prose prose-slate">
        <h2 className="text-2xl font-black uppercase italic border-l-8 border-primary pl-4 mb-6">Why Certifications Matter for MBA/PGDM?</h2>
        <p className="font-medium text-slate-600 leading-relaxed">
          In a competitive job market, an MBA degree provides the foundation, but certifications provide the specialized edge. Whether you're targeting Investment Banking, Brand Management, or People Analytics, having a globally recognized credential validates your skills to top recruiters.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white border-4 border-foreground p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-lg font-black uppercase mb-3">Skill Validation</h3>
                <p className="text-sm font-bold text-slate-500">Certifications like CFA or SHRM prove your technical competence beyond classroom theory.</p>
            </div>
            <div className="bg-white border-4 border-foreground p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-lg font-black uppercase mb-3">Higher ROI</h3>
                <p className="text-sm font-bold text-slate-500">Certified professionals often command 20-40% higher starting salaries in core specializations.</p>
            </div>
        </div>
      </section>
    </main>
  );
}
