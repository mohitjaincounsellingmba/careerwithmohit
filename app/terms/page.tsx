import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms and Conditions | CareerWithMohit",
  description: "Read the terms and conditions for using CareerWithMohit's career counselling and consulting services.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsAndConditions() {
  return (
    <div className="w-full bg-muted min-h-screen px-6 py-24 sm:px-12 sm:py-32 border-t-8 border-foreground">
      <div className="mx-auto max-w-4xl bg-white border-8 border-foreground rounded-2xl shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-16">
        <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-foreground sm:text-7xl mb-12 border-b-8 border-foreground pb-8">
          Terms <span className="bg-primary text-white px-4 py-1 -rotate-2 inline-block border-4 border-foreground">& Conditions</span>
        </h1>

        <div className="prose prose-xl max-w-none font-bold text-gray-800 space-y-10">
          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using CareerWithMohit, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">2. Description of Services</h2>
            <p className="leading-relaxed">
              CareerWithMohit provides career counselling, MBA/PGDM admission consulting, resume building, and interview preparation services. All information provided is for educational and guidance purposes.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">3. No Guarantee of Admission</h2>
            <p className="leading-relaxed bg-accent/10 p-6 border-l-8 border-accent">
              While we provide expert guidance and strategies to improve your chances, **CareerWithMohit does NOT guarantee admission** to any specific college, university, or program. Final admission decisions are solely at the discretion of the respective institutions.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">4. User Obligations</h2>
            <p className="leading-relaxed mb-4">
              As a user of our services, you agree to:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>Provide accurate and complete information in all forms and communications.</li>
              <li>Use the guidance provided for your personal career growth only.</li>
              <li>Not engage in any activity that disrupts or interferes with our website or services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">5. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on this website, including text, graphics, logos, and strategies, is the intellectual property of Mohit Jain/CareerWithMohit. Unauthorized reproduction or distribution is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">6. Limitation of Liability</h2>
            <p className="leading-relaxed">
              CareerWithMohit shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services or for the cost of procurement of substitute services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">7. Governing Law</h2>
            <p className="leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in Delhi.
            </p>
          </section>

          <section className="bg-muted p-8 border-4 border-foreground rounded-xl">
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">8. Contact Information</h2>
            <p className="leading-relaxed">
              For any clarifications regarding these terms, please contact:
              <br />
              <strong>Mohit Jain</strong>
              <br />
              <strong>Phone:</strong> +91-9560020771
            </p>
          </section>

          <p className="text-sm text-gray-500 italic mt-12 pt-8 border-t-4 border-foreground">
            Last updated: March 8, 2026
          </p>
        </div>
      </div>
    </div>
  );
}
