import { InquiryForm } from '@/components/InquiryForm';
import Script from 'next/script';

export const metadata = {
  title: "Contact Mohit Jain | Free MBA & BTech Profile Evaluation 2026",
  description: "Secure your future with expert MBA admission guidance, career counselling, and direct admission support for 2026. Get a free profile evaluation from Mohit Jain today.",
  keywords: [
    "MBA admission guidance 2026", 
    "career counselling Jaipur Mumbai", 
    "direct MBA admission 2026", 
    "BTech career guidance Mohit Jain", 
    "free profile evaluation for MBA",
    "top MBA colleges admission support",
    "JBIMS NMIMS SIBM admission help"
  ],
  alternates: {
    canonical: "/inquiry",
  },
};

export default function InquiryPage() {
  const faqJsonLd = {
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
          "text": "We provide preliminary guidance and a comprehensive profile evaluation to help you understand your best-fit colleges and career paths."
        }
      },
      {
        "@type": "Question",
        "name": "Which courses do you provide admission support for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in MBA, PGDM, BTech, BBA, and BCA admissions across top-tier Indian (IIMs, JBIMS, NMIMS) and international institutions."
        }
      }
    ]
  };

  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Admission Inquiry & Profile Evaluation",
    "description": "Form to request admission guidance and profile evaluation from Mohit Jain Career Counselling.",
    "url": "https://careerwithmohit.com/inquiry",
    "mainEntity": {
      "@type": "Organization",
      "name": "CareerWithMohit",
      "url": "https://careerwithmohit.com",
      "logo": "https://careerwithmohit.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
    }
  };

  return (
    <div className="min-h-screen bg-accent/20 py-20 px-6 sm:px-12">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-foreground sm:text-7xl mb-6">
            Start Your <br className="sm:hidden" />
            <span className="bg-primary text-white px-4 py-1 -rotate-2 inline-block border-4 border-foreground">Admission Journey</span>
          </h1>
          <p className="text-xl font-bold text-gray-700 max-w-2xl mx-auto">
            Get a <span className="text-primary underline">Free Profile Evaluation</span> for the 2026-28 session. Connect with Mohit Jain to navigate top-tier MBA and BTech admissions.
          </p>
        </div>

        {/* Hidden H2 for SEO structure */}
        <h2 className="sr-only">Submit Your Admission Inquiry Form</h2>
        <InquiryForm />

        {/* SEO Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border-4 border-foreground p-6 rounded-lg text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform">
            <h3 className="font-black uppercase mb-2">Expert Admission Support</h3>
            <p className="font-medium text-gray-600">Get 1-on-1 guidance for CAT, MAH CET, and CMAT based admissions from industry veterans.</p>
          </div>
          <div className="bg-white border-4 border-foreground p-6 rounded-lg text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform">
            <h3 className="font-black uppercase mb-2">24h Response Guarantee</h3>
            <p className="font-medium text-gray-600">We prioritize your career. Expect a detailed callback or email within one business day.</p>
          </div>
          <div className="bg-white border-4 border-foreground p-6 rounded-lg text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform">
            <h3 className="font-black uppercase mb-2">Direct Admission Path</h3>
            <p className="font-medium text-gray-600">Expertise in Management Quota, NRI seats, and profile-based admissions for top B-schools.</p>
          </div>
        </div>

        {/* FAQ Section for SEO */}
        <div className="mt-24 border-t-8 border-foreground pt-16">
          <h2 className="text-4xl font-black uppercase mb-12 text-center italic">Frequently Asked <span className="text-primary">Questions</span></h2>
          <div className="space-y-8">
            <div className="bg-white border-4 border-foreground p-8 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="text-xl font-black uppercase mb-3">How does the 2026 admission guidance process work?</h4>
              <p className="text-gray-600 font-bold">Once you submit the form, we evaluate your profile (CAT/CET scores, academics, budget). We then match you with top-tier colleges like JBIMS, NMIMS, or SIBM and guide you through the GDPI and seat allotment rounds.</p>
            </div>
            <div className="bg-white border-4 border-foreground p-8 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="text-xl font-black uppercase mb-3">Can I get help with Management Quota or NRI Seats?</h4>
              <p className="text-gray-600 font-bold">Yes, we specialize in helping students navigate Institutional Quota and NRI seats for high-demand courses like MBA and BTech in Bangalore, Mumbai, and Pune.</p>
            </div>
            <div className="bg-white border-4 border-foreground p-8 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="text-xl font-black uppercase mb-3">Is my profile evaluation really free?</h4>
              <p className="text-gray-600 font-bold">Yes! Your first preliminary evaluation where we discuss your scores and potential college list is completely free of charge.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
