import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | CareerWithMohit",
  description: "Learn how we collect, use, and protect your personal information at CareerWithMohit.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-muted min-h-screen px-6 py-24 sm:px-12 sm:py-32 border-t-8 border-foreground">
      <div className="mx-auto max-w-4xl bg-white border-8 border-foreground rounded-2xl shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-16">
        <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-foreground sm:text-7xl mb-12 border-b-8 border-foreground pb-8">
          Privacy <span className="bg-primary text-white px-4 py-1 -rotate-2 inline-block border-4 border-foreground">Policy</span>
        </h1>

        <div className="prose prose-xl max-w-none font-bold text-gray-800 space-y-10">
          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to CareerWithMohit. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">2. Information We Collect</h2>
            <p className="leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>Fill out our Inquiry Form.</li>
              <li>Connect with us via WhatsApp.</li>
              <li>Contact us through the website.</li>
            </ul>
            <p className="mt-4">
              This information may include your name, email address, phone number, location, and academic/professional background.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>Provide personalized career counselling and admission support.</li>
              <li>Respond to your inquiries and support needs.</li>
              <li>Send updates regarding your application or admissions news.</li>
              <li>Improve our services and website user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">4. Data Protection</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">5. Third-Party Services</h2>
            <p className="leading-relaxed">
              Our website links to third-party services such as WhatsApp. We do not have control over these services and are not responsible for their privacy practices. We encourage you to review their policies separately.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">6. Your Rights</h2>
            <p className="leading-relaxed">
              You have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request a review or deletion, please contact us at the details provided below.
            </p>
          </section>

          <section className="bg-muted p-8 border-4 border-foreground rounded-xl">
            <h2 className="text-3xl font-black uppercase text-primary italic mb-4">7. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact Mohit Jain at:
              <br />
              <strong>Phone:</strong> +91-9560020771
              <br />
              <strong>WhatsApp:</strong> 9560020771
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
