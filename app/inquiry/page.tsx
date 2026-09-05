import { InquiryForm } from '@/components/InquiryForm';
import Script from 'next/script';
import { Sparkles, Award, ShieldCheck, Clock, CheckCircle2, MessageCircle, Phone, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Contact Mohit Jain | Free MBA & BTech Profile Evaluation 2027",
  description: "Secure your future with expert MBA admission guidance, career counselling, and direct admission support for 2027. Get a free profile evaluation from Mohit Jain today.",
  keywords: [
    "MBA admission guidance 2027", 
    "career counselling Jaipur Mumbai", 
    "direct MBA admission 2027", 
    "BTech career guidance Mohit Jain", 
    "free profile evaluation for MBA",
    "top MBA colleges admission support",
    "JBIMS NMIMS SIBM admission help",
    "mba admission 2027",
    "pgdm admission 2027",
    "degree admission 2027"
  ],
  alternates: {
    canonical: "https://www.careerwithmohit.online/inquiry",
  },
  openGraph: {
    title: "Contact Mohit Jain | Free Career & Admission Guidance | CareerWithMohit",
    description: "Get 1-on-1 career counselling, profile evaluation, and MBA admission mentoring from Mohit Jain.",
    url: "https://www.careerwithmohit.online/inquiry",
    siteName: "CareerWithMohit",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Contact CareerWithMohit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Mohit Jain | Free Career & Admission Guidance",
    description: "Get 1-on-1 career counselling and MBA admission mentoring.",
    images: ["/og-image.webp"],
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
    "url": "https://www.careerwithmohit.online/inquiry",
    "mainEntity": {
      "@type": "Organization",
      "name": "CareerWithMohit",
      "url": "https://www.careerwithmohit.online",
      "logo": "https://www.careerwithmohit.online/logo.webp",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9560020771",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
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
        {/* Hero Header with Modern Rounded Badges */}
        <div className="mb-12 md:mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Direct Mentorship • 2027 Admissions
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Start Your <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">Admission Journey</span>
          </h1>

          <p className="text-base sm:text-lg font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get a <strong className="text-blue-600 font-bold">100% Free Profile Evaluation</strong> for the 2027 intake. Connect directly with Mohit Jain (IIM &amp; FMS Alumni) to evaluate top B-Schools and Degree programs.
          </p>
        </div>

        {/* Hidden H2 for SEO structure */}
        <h2 className="sr-only">Submit Your Admission Inquiry Form</h2>
        
        {/* Main Edge-Shaped Inquiry Form */}
        <InquiryForm 
          source="Dedicated Inquiry Page"
          title="Personalized Admission & Career Evaluation"
          subtitle="Submit your details below. We will calculate your college cutoffs and connect with you directly."
        />

        {/* Feature Benefit Highlights with Curved Edge Shapes */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl text-center shadow-lg shadow-slate-900/5 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3.5 border border-blue-100">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1.5">Expert Admission Support</h3>
            <p className="font-medium text-slate-600 text-xs leading-relaxed">
              1-on-1 strategy for CAT, XAT, SNAP, NMAT, and CMAT based admissions from verified industry mentors.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl text-center shadow-lg shadow-slate-900/5 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3.5 border border-emerald-100">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1.5">24h Response Guarantee</h3>
            <p className="font-medium text-slate-600 text-xs leading-relaxed">
              We value your career roadmap. Expect a detailed call or WhatsApp message within 24 business hours.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl text-center shadow-lg shadow-slate-900/5 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3.5 border border-indigo-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1.5">Direct Admission Path</h3>
            <p className="font-medium text-slate-600 text-xs leading-relaxed">
              Expertise in Management Quota, Institutional seats, and profile-based admissions for top colleges.
            </p>
          </div>
        </div>

        {/* FAQ Section with Modern Rounded Accordion-Like Cards */}
        <div className="mt-16 border-t border-slate-200 pt-12">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
              Common Queries
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-slate-200/80 p-6 md:p-7 rounded-3xl shadow-sm">
              <h4 className="text-base md:text-lg font-black text-slate-900 mb-2">
                How does the 2027 admission guidance process work?
              </h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                Once you submit the form, our team evaluates your profile (exam percentiles, graduation/12th marks, preferred location, and budget). We then match you with top-tier colleges and guide you through GD-PI rounds and seat selection.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-6 md:p-7 rounded-3xl shadow-sm">
              <h4 className="text-base md:text-lg font-black text-slate-900 mb-2">
                Can I get help with Management Quota or Institutional Seats?
              </h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                Yes, we specialize in helping students navigate verified Institutional Quota and profile-based seats in high-demand institutions across Delhi NCR, Pune, Bangalore, and Mumbai.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-6 md:p-7 rounded-3xl shadow-sm">
              <h4 className="text-base md:text-lg font-black text-slate-900 mb-2">
                Is my preliminary profile evaluation really free?
              </h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                Yes! Your initial profile evaluation where we analyze your target colleges, eligibility, and scholarship opportunities is 100% free with zero obligations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
