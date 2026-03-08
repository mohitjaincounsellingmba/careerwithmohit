import Image from 'next/image';
import { Award, BookOpen, CheckCircle2, Star, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Mohit Jain | Expert Career Counsellor",
  description: "Learn about Mohit Jain's professional journey, IIM & FMS certifications, and his mission to provide uncompromised career guidance.",
  alternates: {
    canonical: "/about",
  },
};

const CERTIFICATIONS = [
  { title: "Digital Marketing Certified", organization: "IIM Bangalore", icon: Award, color: "bg-blue-500" },
  { title: "Digital Marketing Certified", organization: "FMS Delhi", icon: Award, color: "bg-red-500" },
  { title: "Business Analytics Certified", organization: "Professional Certification", icon: Zap, color: "bg-amber-500" },
  { title: "Six Sigma Yellow Belt", organization: "Certified Professional", icon: CheckCircle2, color: "bg-emerald-500" },
  { title: "Six Sigma White Belt", organization: "Certified Professional", icon: CheckCircle2, color: "bg-emerald-400" },
  { title: "Advanced Excel", organization: "Data Expert", icon: BookOpen, color: "bg-purple-500" },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-muted min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b-8 border-foreground py-20 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-foreground sm:text-7xl mb-8 leading-none">
                Meet <br />
                <span className="bg-primary text-white px-4 py-1 -rotate-2 inline-block border-4 border-foreground mt-2">Mohit Jain</span>
              </h1>
              <p className="text-2xl font-bold text-gray-700 leading-tight mb-8 border-l-8 border-accent pl-6">
                A mission-driven career counsellor dedicated to providing uncompromised, strategic guidance for the next generation of leaders.
              </p>
              <div className="flex gap-4">
                <div className="bg-foreground text-white p-4 font-black uppercase tracking-widest text-sm border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]">
                  Expert Consultant
                </div>
                <div className="bg-white text-foreground p-4 font-black uppercase tracking-widest text-sm border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(244,63,94,1)]">
                  MBA Specialist
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="aspect-square bg-accent border-8 border-foreground rounded-2xl shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-12 overflow-hidden">
                  <Star className="w-full h-full text-white opacity-20 absolute -top-10 -right-10 rotate-12" />
                  <div className="relative z-10 text-center">
                    <div className="w-32 h-32 bg-white border-4 border-foreground rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Award className="w-16 h-16 text-primary" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">Trust. Strategy. Growth.</h3>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Mission */}
      <section className="py-24 px-6 sm:px-12 border-b-8 border-foreground bg-white">
        <div className="mx-auto max-w-4xl">
           <h2 className="font-display text-4xl font-extrabold uppercase mb-12 flex items-center gap-4">
             <span className="w-12 h-12 bg-primary rounded-full border-4 border-foreground flex items-center justify-center text-white italic">M</span>
             My Professional Mission
           </h2>
           <div className="prose prose-xl max-w-none">
             <p className="font-bold text-gray-800 leading-relaxed mb-8">
               With a certification background from India's most prestigious institutions like IIM Bangalore and FMS Delhi, I bring a data-driven yet deeply human approach to career counselling.
             </p>
             <p className="font-medium text-gray-600 leading-relaxed mb-8">
               My experience spans across digital marketing, business analytics, and operational excellence. I believe that every student has a unique trajectory, and my role is to help you find the shortest, most effective path to your goals.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                <div className="bg-blue-50 border-4 border-foreground p-8 rounded-xl">
                   <h4 className="font-black text-xl uppercase mb-4 text-primary italic">Admission Expert</h4>
                   <p className="font-bold text-gray-700">Specializing in MBA, PGDM, and B.Tech admissions for top-tier Indian and Global B-Schools.</p>
                </div>
                <div className="bg-emerald-50 border-4 border-foreground p-8 rounded-xl">
                   <h4 className="font-black text-xl uppercase mb-4 text-emerald-600 italic">Process Specialist</h4>
                   <p className="font-bold text-gray-700">Six Sigma certified professional focusing on optimizing your application and interview performance.</p>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-24 px-6 sm:px-12 bg-accent/10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl font-black uppercase sm:text-6xl mb-6">Certifications <span className="text-primary italic">& Achievements</span></h2>
            <div className="h-2 w-48 bg-foreground mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {CERTIFICATIONS.map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <div key={idx} className="group bg-white border-4 border-foreground p-10 rounded-2xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)]">
                  <div className={`w-16 h-16 ${cert.color} border-4 border-foreground rounded-xl mb-8 flex items-center justify-center -rotate-3 group-hover:rotate-3 transition-transform`}>
                    <Icon className="text-white w-8 h-8" strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-2 leading-tight uppercase">
                    {cert.title}
                  </h3>
                  <p className="text-xl font-bold text-gray-500 italic">
                    {cert.organization}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-white py-24 px-6 sm:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase mb-10 leading-none">
              Ready to build <br /><span className="text-primary">Your success story?</span>
            </h2>
            <p className="text-2xl font-bold text-gray-300 mb-12">
              Don't just apply. Strategize with a professional who understands the metrics of success.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="https://wa.me/919560020771" className="bg-primary border-4 border-white px-10 py-5 text-xl font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-colors hover:scale-105">
                Whatsapp Mohit
              </a>
              <a href="/inquiry" className="bg-transparent border-4 border-white px-10 py-5 text-xl font-black uppercase tracking-widest hover:bg-white hover:text-foreground transition-colors hover:scale-105">
                Inquiry Form
              </a>
            </div>
          </div>
      </section>
    </div>
  );
}
