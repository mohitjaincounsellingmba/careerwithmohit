import { Metadata } from 'next';
import AiSkillsTool from '@/components/AiSkillsTool';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'AI Skills Training & Certification 2026-2027 | Power BI, SQL, Python | CareerWithMohit',
  description: 'Learn in-demand business analytics and tech skills like Power BI, Tableau, SQL, AWS, and Python. Get AI-driven training, appear for practice tests, and earn certifications.',
  keywords: [
    'ai skills training', 'power bi certification', 'sql for mba', 'business analytics courses',
    'tableau training online', 'python for management', 'free technical skills certification'
  ],
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/ai-skills'
  },
  openGraph: {
    title: 'AI Skills Training & Certification | CareerWithMohit',
    description: 'Master in-demand tools like Power BI, SQL, and Python with AI-guided training and practice assessments.',
    url: 'https://www.careerwithmohit.online/tools/ai-skills',
    siteName: 'CareerWithMohit',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'AI Skills Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Skills Training & Certification | CareerWithMohit',
    description: 'Master in-demand tools like Power BI, SQL, and Python with AI-guided training.',
    images: ['/og-image.webp'],
  },
};

export default function AiSkillsPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Skills Training & Certification Hub",
    "url": "https://www.careerwithmohit.online/tools/ai-skills",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-20">
      <JsonLd data={softwareSchema} />
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
