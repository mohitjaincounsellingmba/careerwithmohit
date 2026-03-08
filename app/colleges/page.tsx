import { getAllColleges } from "@/lib/colleges";
import { CollegeCard } from "@/components/CollegeCard";
import { Search, SlidersHorizontal } from "lucide-react";

export const metadata = {
  title: "Top MBA Colleges & Universities in India | Fees, Placement, Cutoff",
  description: "Find the best MBA colleges in India. Compare fees, placement reports, and cutoffs to choose the right B-school for your career.",
};

export default function CollegesPage() {
  const colleges = getAllColleges();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Find Your Dream <span className="text-blue-600">B-School</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore 500+ top MBA colleges with accurate data on fees, placement records, and entrance exam requirements.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by college name, city, or course..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* College Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.map((college) => (
            <CollegeCard key={college.slug} college={college} />
          ))}
          
          {/* If no colleges found placeholder */}
          {colleges.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 inline-block">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No colleges found</h3>
                <p className="text-slate-500">Try adjusting your search or filters.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
