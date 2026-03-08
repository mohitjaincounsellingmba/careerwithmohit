import { InquiryForm } from '@/components/InquiryForm';

export const metadata = {
  title: "Inquiry Form | Get Personalized Career Guidance",
  description: "Fill out our inquiry form to connect with Mohit Jain for expert career counselling and MBA admissions support.",
  alternates: {
    canonical: "/inquiry",
  },
};

export default function InquiryPage() {
  return (
    <div className="min-h-screen bg-accent/20 py-20 px-6 sm:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-foreground sm:text-7xl mb-6">
            Start Your <br className="sm:hidden" />
            <span className="bg-primary text-white px-4 py-1 -rotate-2 inline-block border-4 border-foreground">Journey</span>
          </h1>
          <p className="text-xl font-bold text-gray-700 max-w-2xl mx-auto">
            Fill out the form below and let our expert consultants help you navigate your academic and professional path.
          </p>
        </div>

        <InquiryForm />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border-4 border-foreground p-6 rounded-lg text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase mb-2">Expert Advice</h3>
            <p className="font-medium text-gray-600">Get guidance from professionals with years of industry experience.</p>
          </div>
          <div className="bg-white border-4 border-foreground p-6 rounded-lg text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase mb-2">Fast Response</h3>
            <p className="font-medium text-gray-600">Our team typically responds to inquiries within 24 business hours.</p>
          </div>
          <div className="bg-white border-4 border-foreground p-6 rounded-lg text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase mb-2">Personalized</h3>
            <p className="font-medium text-gray-600">Tailored strategies designed specifically for your career goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
