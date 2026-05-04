import { BacklinkRequestForm } from '@/components/BacklinkRequestForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Globe, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

export const metadata = {
  title: "Backlink Collaboration & Guest Posts | CareerWithMohit 2026",
  description: "Scale your website's authority. Collaborate with CareerWithMohit for high-quality do-follow backlinks, guest posts, and niche link exchanges in the education and career sector.",
  keywords: ["do-follow backlinks education", "guest post career blog", "link exchange mba website", "seo collaboration mohit jain"],
};

export default function BacklinkCollaborationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO SECTION */}
      <section className="bg-white border-b-[12px] border-foreground pt-32 pb-24 px-6 sm:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="mb-10">
            <Breadcrumbs />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block bg-accent text-foreground px-6 py-2 text-sm font-black uppercase tracking-widest -rotate-1 border-4 border-foreground mb-8">
                SEO POWER-UP
              </div>
              <h1 className="font-display text-6xl font-black tracking-tight text-foreground sm:text-8xl mb-8 leading-[0.9] uppercase italic">
                Dominate <br />
                <span className="text-primary underline decoration-[12px] underline-offset-8">Search Rankings</span>
              </h1>
              <p className="text-2xl font-bold text-gray-700 leading-tight max-w-2xl mb-12">
                Join our network of elite education and career platforms. Exchange high-authority do-follow backlinks and scale your organic traffic in 2026.
              </p>
              
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 flex items-center justify-center bg-foreground text-white border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
                    <TrendingUp size={28} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black uppercase leading-none">Domain Rating</p>
                    <p className="text-xl font-bold">Growing FAST</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 flex items-center justify-center bg-primary text-white border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(255,193,7,1)]">
                    <Globe size={28} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black uppercase leading-none">Monthly Traffic</p>
                    <p className="text-xl font-bold">50k+ Active</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-xl">
              <div className="bg-foreground p-8 rounded-3xl rotate-1 shadow-2xl relative">
                <div className="absolute inset-0 border-4 border-white rounded-3xl m-2 opacity-20" />
                <div className="relative z-10 text-white space-y-6">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Why Collaborate?</h3>
                  <ul className="space-y-4">
                    {[
                      "100% Manual & Organic Placements",
                      "Niche Relevant (MBA, BTech, Careers)",
                      "Fast Indexing on Search Engines",
                      "High-Engagement Audience"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-lg font-bold">
                        <ShieldCheck className="text-accent shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLABORATION TYPES */}
      <section className="py-24 px-6 sm:px-12 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-black uppercase mb-20 text-center italic tracking-tighter">
            Choose Your <span className="text-primary">Collaboration Path</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-slate-50 border-4 border-foreground p-10 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-8px] transition-transform">
              <div className="h-16 w-16 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-8 border-4 border-foreground">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">Link Exchange</h3>
              <p className="font-bold text-gray-600 mb-6">Traditional mutual value. We link to your high-quality content, and you link back to ours.</p>
              <span className="text-primary font-black uppercase text-sm tracking-widest">Available Now →</span>
            </div>

            <div className="bg-slate-50 border-4 border-foreground p-10 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-8px] transition-transform">
              <div className="h-16 w-16 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-8 border-4 border-foreground">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">Guest Posting</h3>
              <p className="font-bold text-gray-600 mb-6">Write an expert 1000+ word article for our audience and get a permanent do-follow link.</p>
              <span className="text-primary font-black uppercase text-sm tracking-widest">Available Now →</span>
            </div>

            <div className="bg-slate-50 border-4 border-foreground p-10 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-8px] transition-transform">
              <div className="h-16 w-16 bg-amber-500 text-white rounded-xl flex items-center justify-center mb-8 border-4 border-foreground">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">Brand Mention</h3>
              <p className="font-bold text-gray-600 mb-6">Get featured in our "Best Colleges" or "Career Roadmaps" lists as a recommended resource.</p>
              <span className="text-primary font-black uppercase text-sm tracking-widest">Available Now →</span>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-32 px-6 sm:px-12 bg-slate-50 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent" />
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 italic">
              Submit Your <span className="bg-primary text-white px-4 py-1 -rotate-2 inline-block border-4 border-foreground">Proposal</span>
            </h2>
            <p className="text-xl font-bold text-gray-600 max-w-xl mx-auto">
              Our SEO team reviews every request manually. Quality websites only. No spam, no PBNs.
            </p>
          </div>

          <BacklinkRequestForm />
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-foreground py-20 px-6 sm:px-12 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black uppercase mb-8 italic tracking-widest">Trusted by 100+ Career Platforms</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale invert">
             <div className="h-10 w-32 bg-white/20 rounded"></div>
             <div className="h-10 w-32 bg-white/20 rounded"></div>
             <div className="h-10 w-32 bg-white/20 rounded"></div>
             <div className="h-10 w-32 bg-white/20 rounded"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
