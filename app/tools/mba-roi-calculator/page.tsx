import MbaRoiCalculator from "@/components/MbaRoiCalculator";
import type { Metadata } from 'next';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "MBA ROI Calculator 2026: Calculate Your Payback Period & Wealth Gain",
  description: "Free MBA ROI Calculator for all colleges in India (IIMs, private B-schools, etc.). Calculate total investment, loan EMIs, and compare it with avg placements to see your actual net gain.",
  keywords: ["MBA ROI Calculator", "calculate MBA payback period", "MBA loan EMI calculator", "DRCC MBA loan calculator", "top MBA colleges ROI India"],
  alternates: {
    canonical: "/tools/mba-roi-calculator",
  },
};

export default function MbaRoiPage() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "MBA ROI Calculator",
    "description": "Calculate the return on investment for MBA/PGDM programs in India by factoring in tuition fee, placement CTC, and education loans.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "url": "https://www.careerwithmohit.online/tools/mba-roi-calculator",
    "author": {
      "@type": "Person",
      "name": "Mohit Jain"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16 selection:bg-rose-500 selection:text-white">
      <JsonLd data={toolSchema} />
      
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-white border-[6px] border-[#18181b] p-12 sm:p-20 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 left-0 w-full h-4 bg-rose-500" />
             
             <div className="relative z-10 text-center">
                 <h1 className="text-5xl sm:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9] italic">
                    The Ultimate <br /><span className="text-rose-500">ROI Auditor.</span>
                 </h1>
                 <p className="max-w-3xl mx-auto text-xl font-bold text-gray-600 leading-tight border-x-4 border-foreground px-8 mb-12 italic">
                    Stop chasing names. Start chasing numbers.
                 </p>
                 <div className="inline-flex items-center gap-4 bg-foreground text-white px-8 py-3 text-sm font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(244,63,94,1)]">
                    Accredited Data Analysis • 2026 Ready
                 </div>
             </div>
        </div>
      </div>

      <section className="mb-24">
        <MbaRoiCalculator />
      </section>

      {/* Educational Content Section - SEO Optimization */}
      <section className="max-w-5xl mx-auto px-6 pb-24 prose prose-xl prose-slate">
        <h2 className="text-4xl font-black uppercase border-b-8 border-foreground pb-4 mb-12">How we calculate MBA ROI?</h2>
        <p className="font-bold text-gray-700">The ROI of an MBA is more than just "Placement divided by Fees". To give you an accurate financial map, our auditor considers:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 not-prose mt-12 mb-20">
            <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black uppercase mb-4 text-emerald-600 italic">Net Cash Outflow</h4>
                <p className="font-bold text-sm leading-relaxed">We combine Tuition Fees, Hostel charges, and "Invisible Costs" (laptop, travel, prep material) to find your absolute investment floor.</p>
            </div>
            <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black uppercase mb-4 text-rose-500 italic">Loan Burden</h4>
                <p className="font-bold text-sm leading-relaxed">Interest is the silent killer of ROI. We calculate monthly EMIs and total interest paid over 7-15 years to see how it erodes your in-hand salary.</p>
            </div>
            <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black uppercase mb-4 text-blue-600 italic">In-Hand Salary Reality</h4>
                <p className="font-bold text-sm leading-relaxed">Companies show CTC (Cost to Company), but you live on "In-Hand". We assume a 75% take-home ratio (avg. Indian corporate standard).</p>
            </div>
            <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black uppercase mb-4 text-purple-600 italic">Payback Velocity</h4>
                <p className="font-bold text-sm leading-relaxed">The time taken to reach "Net Zero". Ideally, a high-value MBA should pay for itself within 36 to 48 months.</p>
            </div>
        </div>

        <h3 className="text-2xl font-black uppercase text-primary border-l-8 border-primary pl-6 py-2 mb-8 italic">DRCC & MBA ROI</h3>
        <p className="font-bold text-gray-700">For students from Bihar using the Student Credit Card scheme, the ROI is significantly higher because of the **0% Interest Rate**. By saving on the 10-12% interest typically charged by private banks, you recover your principal amount much faster.</p>

        <div className="bg-yellow-100 p-8 border-4 border-foreground my-16 font-bold not-prose shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex items-center gap-6">
            <div className="w-16 h-16 bg-foreground text-white flex items-center justify-center shrink-0">
                <span className="text-3xl font-black italic underline decoration-yellow-400">!</span>
            </div>
            <div className="text-lg uppercase italic font-black">
                Pro Tip: Don't ignore hostels. In cities like Mumbai/Delhi, lifestyle costs can add up to 30% to your total MBA outflow.
            </div>
        </div>
      </section>
    </div>
  );
}
