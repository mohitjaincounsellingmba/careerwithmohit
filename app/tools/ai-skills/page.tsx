import { Metadata } from 'next';
import AiSkillsTool from '@/components/AiSkillsTool';

export const metadata: Metadata = {
  title: 'AI Skills Training & Certification | Career with Mohit',
  description: 'Learn in-demand skills like Power BI, Tableau, SQL, AWS, and more. Get AI-driven training, appear for tests, and earn certificates.',
  alternates: {
    canonical: 'https://careerwithmohit.online/tools/ai-skills'
  }
};

export default function AiSkillsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-20">
      <div className="bg-primary text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-6 text-white uppercase backdrop-blur-sm border border-white/30">
            Learn, Test, Certify
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            AI-Driven Skills <span className="text-yellow-400">Hub</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-95 font-medium">
            Master essential tools for your MBA & Engineering journey. Our AI tutor will guide you through the sessions. Pass the final test to earn your official certification.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex-grow w-full">
        <AiSkillsTool />
      </div>
    </div>
  );
}
