import { getCollegeBySlug, getAllColleges } from "@/lib/colleges";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { 
  MapPin, 
  Calendar, 
  Building2, 
  Award, 
  IndianRupee, 
  Briefcase, 
  Download, 
  ExternalLink,
  GraduationCap,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const colleges = getAllColleges();
  return colleges.map((college) => ({
    slug: college.slug,
  }));
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const college = await getCollegeBySlug(slug);

  if (!college) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Premium Hero Header */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Logo Placeholder */}
            <div className="w-24 h-24 sm:w-32 sm:sm:w-32 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center p-4 flex-shrink-0">
               <GraduationCap className="w-full h-full text-blue-600" />
            </div>

            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {college.ownership} Institute
                </span>
                <span className="flex items-center text-slate-500 text-sm">
                  <Award className="w-4 h-4 mr-1 text-yellow-500" />
                  {college.ranking}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 leading-tight">
                {college.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-600 font-medium">
                <span className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-slate-400" />
                  {college.location}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-slate-400" />
                  Estd. {college.established}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Apply Now
              </button>
              <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-8 py-3.5 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
                <Download className="w-5 h-5 mr-2" />
                Brochure
              </button>
            </div>
          </div>

          {/* Tabbed Navigation Mockup */}
          <div className="flex overflow-x-auto gap-8 mt-12 pb-1 no-scrollbar border-b border-slate-100">
            {["Overview", "Courses & Fees", "Placements", "Admissions", "Cut-off"].map((tab, idx) => (
              <button 
                key={tab}
                className={`pb-4 px-1 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${idx === 0 ? "text-blue-600 border-blue-600" : "text-slate-500 border-transparent hover:text-slate-900"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Core Data */}
        <div className="flex-grow space-y-8 lg:max-w-[calc(100%-400px)]">
          
          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-blue-500 transition-all">
              <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IndianRupee className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Fees</div>
              <div className="text-2xl font-black text-slate-900">{college.fees}</div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-green-500 transition-all">
              <div className="bg-green-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Avg Package</div>
              <div className="text-2xl font-black text-slate-900">{college.avg_placement}</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-purple-500 transition-all">
              <div className="bg-purple-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Exams</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {college.exams.map(exam => (
                  <span key={exam} className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Content from Markdown */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
            <div className="prose prose-lg prose-slate max-w-none 
              prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:border-b-4 prose-h2:border-slate-100 prose-h2:pb-4 prose-h2:mt-12
              prose-h3:text-xl prose-h3:text-blue-600 prose-h3:mt-8
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-li:text-slate-700 prose-li:font-medium
              prose-strong:text-slate-900 prose-strong:font-black">
              <ReactMarkdown>{college.content}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Actions */}
        <div className="lg:w-[360px] flex-shrink-0 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl sticky top-8">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center">
              Interested in {college.name.split(',')[0]}?
            </h3>
            <p className="text-slate-400 mb-8 font-medium">
              Get personalized counselling and 100% assistance in the admission process.
            </p>
            
            <div className="space-y-4">
              <Link 
                href="/inquiry"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center transition-all group"
              >
                Start Your Inquiry
              </Link>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-2xl border border-white/10 transition-all flex items-center justify-center">
                Contact via WhatsApp
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Expert profile evaluation
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400 font-medium mt-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Admission quota assistance
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h4 className="font-black uppercase tracking-tight text-slate-900 mb-4">Official Links</h4>
            <a 
              href={college.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 font-bold hover:underline group"
            >
              Visit Website 
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
