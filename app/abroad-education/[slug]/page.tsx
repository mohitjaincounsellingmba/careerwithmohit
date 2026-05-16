import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ABROAD_COLLEGES } from '@/data/abroadColleges';
import { generateCollegeSlug } from '@/lib/slugify';
import { MapPin, Award, CheckCircle2, DollarSign, Clock, BookOpen, Building2 } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ABROAD_COLLEGES.map((college) => ({
    slug: generateCollegeSlug(college.name, college.location),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const college = ABROAD_COLLEGES.find(
    (c) => generateCollegeSlug(c.name, c.location) === params.slug
  );

  if (!college) {
    return { title: 'College Not Found | CareerWithMohit' };
  }

  return {
    title: `${college.name} Fees, Admissions & Programs 2026 | CareerWithMohit`,
    description: `Explore admissions, fees (${college.fee}), programs, and accreditations (${college.accreditation}) for ${college.name} located in ${college.location}. Get expert admission assistance.`,
    keywords: [
      `${college.name} admissions 2026`,
      `${college.name} fees for Indian students`,
      `study in ${college.country}`,
      `${college.name} programs`,
      `${college.name} ranking and reviews`,
    ],
    openGraph: {
      title: `${college.name} Admissions 2026`,
      description: `Complete guide on fees, accreditations, and programs at ${college.name}.`,
      images: ['/og-abroad-education.png'],
    },
  };
}

export default function CollegePage({ params }: Props) {
  const college = ABROAD_COLLEGES.find(
    (c) => generateCollegeSlug(c.name, c.location) === params.slug
  );

  if (!college) {
    notFound();
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: college.name,
    url: `https://www.careerwithmohit.online/abroad-education/${params.slug}`,
    location: {
      '@type': 'Place',
      name: college.location,
    },
    description: college.about,
    offers: {
      '@type': 'Offer',
      price: college.feeNum,
      priceCurrency: 'INR',
    },
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-body pb-20">
      <JsonLd data={jsonLdData} />
      
      {/* HERO SECTION */}
      <section className="bg-[#0f172a] py-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/abroad-education" className="text-gray-400 hover:text-white text-sm font-bold flex items-center gap-2 mb-8 transition-colors">
            ← Back to All Universities
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
              {college.country}
            </span>
            <span className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
              {college.badge}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            {college.name}
          </h1>
          <div className="flex flex-col md:flex-row gap-4 text-gray-300 font-medium">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-emerald-400" />
              {college.location}
            </div>
            <div className="hidden md:block text-gray-600">|</div>
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-blue-400" />
              {college.mode}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase mb-1 flex items-center gap-1.5"><DollarSign size={14}/> Est. Fee</p>
              <p className="font-black text-[#0f172a]">{college.fee}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase mb-1 flex items-center gap-1.5"><Clock size={14}/> Duration</p>
              <p className="font-bold text-[#0f172a]">{college.duration}</p>
            </div>
            <div className="col-span-2 md:col-span-2">
              <p className="text-gray-400 text-xs font-bold uppercase mb-1 flex items-center gap-1.5"><Award size={14}/> Approvals</p>
              <p className="font-bold text-[#0f172a]">{college.approvals}</p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-[#0f172a] mb-4">About the University</h2>
          <p className="text-gray-600 leading-relaxed mb-10 text-lg">
            {college.about}
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-black text-[#0f172a] mb-5 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500" /> Top Highlights
              </h3>
              <ul className="space-y-3">
                {college.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0f172a] mb-5 flex items-center gap-2">
                <BookOpen className="text-indigo-500" /> Popular Programs
              </h3>
              <div className="flex flex-wrap gap-2">
                {college.programs.map((p, i) => (
                  <span key={i} className="bg-indigo-50 text-indigo-700 text-sm font-bold px-3 py-1.5 rounded-lg border border-indigo-100">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 text-center">
            <h3 className="text-xl font-black text-[#0f172a] mb-3">Ready to apply to {college.name}?</h3>
            <p className="text-gray-500 mb-6 font-medium">Get a free profile evaluation and admission assistance from our experts.</p>
            <a 
              href={`https://wa.me/${college.whatsapp}?text=Hi Mohit! I'm interested in applying to ${college.name}. Please guide me.`}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-emerald-500 text-white font-black px-8 py-4 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200"
            >
              Talk to Expert on WhatsApp
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
