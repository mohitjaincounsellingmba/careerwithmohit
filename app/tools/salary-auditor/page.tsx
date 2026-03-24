import { Metadata } from 'next';
import JobSalaryTool from '@/components/JobSalaryTool';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Salary Auditor: Check Company-wise Average Packages 2026',
  description: 'Auditing 300+ top companies across India. Check the latest average fresher packages for SDE, Data Science, Analyst, and Finance roles.',
  keywords: ['Salary Auditor', 'Fresher Salaries 2026 India', 'SDE Average Package', 'Company Wise Salary Auditor', 'Job Salary Review India'],
};

export default function SalaryAuditorPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Salary Auditor', href: '/tools/salary-auditor' }]} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter italic mb-6">
              Salary <span className="text-primary underline decoration-white underline-offset-8">Auditor.</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mb-8 leading-relaxed">
              Don't settle for less. Our Salary Auditor tool tracks and audits the real average packages offered to freshers across 300+ tech and non-tech giants in 2026.
            </p>
            
            <JobSalaryTool />
            
            <div className="mt-12 prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-primary mb-4">How it works?</h2>
              <p className="text-gray-400">
                The Salary Auditor uses a sophisticated multiplier algorithm based on role-specific market trends (SDE, PM, Data, Finance) and company tiers (MAANG, Unicorns, Big 4). Our data is updated daily based on recent candidate placements and official college reports.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-900/50 p-6 rounded-xl border border-white/5">
                  <h3 className="font-bold text-white mb-2 uppercase tracking-wide">Market Multipliers</h3>
                  <p className="text-sm text-gray-500">We adjust salaries based on technical roles. SDE typically carries a baseline multiplier of 1.0, while Data Science and High-tier Finance often see 1.1x to 1.25x premiums.</p>
                </div>
                <div className="bg-gray-900/50 p-6 rounded-xl border border-white/5">
                  <h3 className="font-bold text-white mb-2 uppercase tracking-wide">Category Audit</h3>
                  <p className="text-sm text-gray-500">Companies are audited and categorized into Tiers: Tier 1 (MAANG), Tier 2 (Top Product/Unicorns), and Tier 3 (Global Services/Big 4).</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-primary p-8 rounded-2xl text-white">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 italic">Get Hired.</h2>
              <p className="font-medium opacity-90 mb-6">Now that you know the numbers, it's time to reach them. Sign up for our career mentorship to land your dream package.</p>
              <button className="w-full bg-white text-primary py-4 font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">Start Mentorship</button>
            </div>
            
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Audit Reports</h2>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Total Companies</span>
                  <span className="text-primary font-bold">300+</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Salary Range</span>
                  <span className="text-primary font-bold">₹3.5L - ₹45L</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Updates</span>
                  <span className="text-primary font-bold italic">Real-time</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
