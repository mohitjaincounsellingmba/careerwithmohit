import { Metadata } from 'next';
import { GenericMockTestClient } from '@/components/GenericMockTest/GenericMockTestClient';
import { EXAM_CONFIGS, generateMockQuestions } from '@/lib/mock-test-data';
import { Clock, Target, Zap, Presentation, CheckCircle2, HelpCircle, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return EXAM_CONFIGS.map((config) => ({
    examSlug: config.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ examSlug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const config = EXAM_CONFIGS.find(c => c.slug === resolvedParams.examSlug);
  if (!config) return {};
  
  return {
    title: config.seoTitle,
    description: config.seoDescription,
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      type: 'website',
    }
  };
}

export default async function ExamMockTestPage({ params }: { params: Promise<{ examSlug: string }> }) {
  const resolvedParams = await params;
  const config = EXAM_CONFIGS.find(c => c.slug === resolvedParams.examSlug);
  
  if (!config) {
    notFound();
  }

  const questions = generateMockQuestions(config);

  const jsonLd: any = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `${config.name} Mock Test Tool`,
        "operatingSystem": "Web",
        "applicationCategory": "EducationalApplication",
        "description": config.seoDescription,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      }
    ]
  };

  if (config.faqs && config.faqs.length > 0) {
    jsonLd["@graph"].push({
      "@type": "FAQPage",
      "mainEntity": config.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  return (
    <main className="min-h-screen bg-[#f0f0f0] pt-24 pb-20 px-6 sm:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 leading-none">
            {config.name.split(' ').slice(0, -1).join(' ')} <span className="text-primary italic">{config.name.split(' ').slice(-1)}</span> Mock Test
          </h1>
          <div className="inline-block bg-accent px-6 py-2 border-4 border-foreground transform -rotate-2">
            <p className="font-bold uppercase tracking-widest text-lg">Full-Length {config.totalQuestions} Question Practice Paper</p>
          </div>
        </div>

        {/* Client Interface */}
        <GenericMockTestClient config={config} questions={questions} />

        {/* SEO CONTENT SECTION */}
        <div className="mt-24 space-y-24">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-primary w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Clock className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">{config.durationMinutes} Minutes</h3>
              <p className="font-medium text-gray-600">Simulate real-time pressure with our official exam-timed environment.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Zap className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Instant Analysis</h3>
              <p className="font-medium text-gray-600">Get your score, accuracy, and sectional breakdown the moment you finish.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-foreground w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Target className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Target Colleges</h3>
              <p className="font-medium text-gray-600">Achieve a good score to get into {config.targetColleges}</p>
            </div>
          </div>

          {/* Exam Pattern & Syllabus Table */}
          <section id="pattern">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <Presentation className="w-10 h-10 text-primary" /> {config.name} Exam Pattern
            </h2>
            <div className="overflow-x-auto border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                  <tr>
                    <th className="p-6 border-r border-white/20">Section</th>
                    <th className="p-6">Questions</th>
                  </tr>
                </thead>
                <tbody className="text-xl font-bold">
                  {config.sections.map((section, idx) => (
                    <tr key={section.id} className={`border-b-4 border-foreground hover:bg-gray-50 transition-colors ${idx % 2 !== 0 ? 'bg-slate-50' : ''}`}>
                      <td className="p-6 border-r-4 border-foreground">{section.label}</td>
                      <td className="p-6 text-center">{section.questionCount}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary text-white uppercase font-black tracking-widest text-2xl">
                    <td className="p-8 border-r-4 border-white/20">Total</td>
                    <td className="p-8 text-center">{config.totalQuestions}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 font-bold text-gray-500 italic">** Note: Exam pattern is based on standard notification guidelines.</p>
          </section>

          {/* Local Advantage section generalized */}
          <section id="local-focus" className="bg-foreground text-white p-10 transform md:-rotate-1 shadow-[12px_12px_0px_0px_rgba(var(--primary-rgb),1)]">
            <h2 className="text-3xl font-black uppercase mb-6 text-primary">Aiming for a Good Score?</h2>
            <p className="text-gray-300 font-medium mb-8 leading-relaxed">
              Target a score of at least <strong>{config.goodScore}</strong> in {config.name} to maximize your chances of getting into the top tier programs at {config.targetColleges}. Speed and accuracy are vital across all {config.sections.length} sections.
            </p>
          </section>

          {/* New SEO Features Section */}
          {config.features && config.features.length > 0 && (
            <section id="features" className="mt-16">
              <h2 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
                <CheckCircle2 className="w-10 h-10 text-primary" /> Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <CheckCircle2 className="w-8 h-8 text-secondary shrink-0 mt-1" />
                    <p className="font-bold text-lg">{feature}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* New SEO Details Section */}
          {config.examDetails && config.examDetails.length > 0 && (
            <section id="details" className="mt-16 space-y-12">
              {config.examDetails.map((detail, idx) => (
                <div key={idx} className="bg-white p-8 md:p-12 border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-3xl font-black uppercase mb-6 flex items-center gap-4">
                    <BookOpen className="w-8 h-8 text-primary" />
                    {detail.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700 font-medium">{detail.content}</p>
                </div>
              ))}
            </section>
          )}

          {/* New SEO FAQ Section */}
          {config.faqs && config.faqs.length > 0 && (
            <section id="faq" className="mt-16 border-t-8 border-foreground pt-16">
              <h2 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
                <HelpCircle className="w-10 h-10 text-primary" /> Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {config.faqs.map((faq, idx) => (
                  <details key={idx} className="group bg-white border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] open:bg-slate-50 transition-colors">
                    <summary className="p-6 text-xl font-bold uppercase cursor-pointer list-none flex justify-between items-center">
                      <span>{faq.question}</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="p-6 pt-0 text-lg text-gray-600 font-medium border-t-4 border-foreground mt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </main>
  );
}
