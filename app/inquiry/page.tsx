import { InquiryForm } from '@/components/InquiryForm';
import Script from 'next/script';

export const metadata = {
  title: "MBA Admission Guidance & Career Counselling 2026 | Inquiry Form",
  description: "Get expert MBA admission support, career counselling, and direct admission guidance for 2026. Fill out the form to connect with Mohit Jain and navigate your academic path.",
  keywords: ["MBA admission guidance 2026", "career counselling for students", "direct MBA admission support", "BTech career guidance", "Mohit Jain counselling"],
  alternates: {
    canonical: "/inquiry",
  },
};

export default function InquiryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take to get a response after inquiring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our expert team typically reviews and responds to all career and admission inquiries within 24 business hours."
        }
      },
      {
        "@type": "Question",
        "name": "Is the initial career counselling session free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide preliminary guidance and profile evaluation to help you understand your best-fit colleges and career paths."
        }
      },
      {
        "@type": "Question",
        "name": "Which courses do you provide admission support for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in MBA, PGDM, BTech, BBA, and BCA admissions across top-tier Indian and international institutions."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-accent/20 py-20 px-6 sm:px-12">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-foreground sm:text-7xl mb-6">
            Start Your <br className="sm:hidden" />
            <span className="bg-primary text-white px-4 py-1 -rotate-2 inline-block border-4 border-foreground">Journey</span>
          </h1>
          <p className="text-xl font-bold text-gray-700 max-w-2xl mx-auto">
            Fill out the form below and let our expert consultants help you navigate your academic and professional path for the 2026 session.
          </p>
        </div>

        <InquiryForm />

        {/* SEO Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border-4 border-foreground p-6 rounded-lg text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase mb-2">Expert Advice</h3>
            <p className="font-medium text-gray-600">Get guidance from professionals with years of industry experience in MBA & BTech admissions.</p>
          </div>
          <div className="bg-white border-4 border-foreground p-6 rounded-lg text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase mb-2">Fast Response</h3>
            <p className="font-medium text-gray-600">Our team typically responds to admissions inquiries within 24 business hours.</p>
          </div>
          <div className="bg-white border-4 border-foreground p-6 rounded-lg text-center shadow-[6_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase mb-2">Personalized</h3>
            <p className="font-medium text-gray-600">Tailored admission strategies designed specifically for your 2026-28 career goals.</p>
          </div>
        </div>

        {/* FAQ Section for SEO */}
        <div className="mt-24 border-t-8 border-foreground pt-16">
          <h2 className="text-4xl font-black uppercase mb-12 text-center italic">Frequently Asked <span className="text-primary">Questions</span></h2>
          <div className="space-y-8">
            <div className="bg-white border-4 border-foreground p-8 rounded-xl">
              <h4 className="text-xl font-black uppercase mb-3">How does the admission guidance process work?</h4>
              <p className="text-gray-600 font-bold">Once you submit the form, we evaluate your profile based on scores, academics, and budget. We then match you with top-tier colleges (MBA/BTech/BBA) and guide you through the entire application and interview process.</p>
            </div>
            <div className="bg-white border-4 border-foreground p-8 rounded-xl">
              <h4 className="text-xl font-black uppercase mb-3">Can I get help with Direct Admission or NRI Quota?</h4>
              <p className="text-gray-600 font-bold">Yes, we specialize in navigating complex admission pathways, including NRI/Foreign National seats, Institutional Quota, and profile-based direct entries for colleges like MDI, IIFT, and Great Lakes.</p>
            </div>
            <div className="bg-white border-4 border-foreground p-8 rounded-xl">
              <h4 className="text-xl font-black uppercase mb-3">Is my data secure?</h4>
              <p className="text-gray-600 font-bold">Absolutely. We use your data strictly for providing personalized counselling services. Your information is never sold to third-party marketing agencies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
