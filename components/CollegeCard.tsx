import { useState } from "react";
import Link from "next/link";
import { GraduationCap, MapPin, Award, IndianRupee, Briefcase } from "lucide-react";
import { CollegeMetadata } from "@/lib/colleges";
import { BrochureModal } from "./BrochureModal";

export function CollegeCard({ college }: { college: CollegeMetadata }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <BrochureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        collegeName={college.name}
        brochureUrl={college.brochure_url}
      />
      {/* Top Banner-like Section with Logo Placeholder */}
      <div className="h-32 bg-slate-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-2 z-10">
          <GraduationCap className="w-10 h-10 text-blue-600" />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
            {college.name}
          </h3>
          <div className="flex items-center text-slate-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {college.location}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center text-slate-500 text-xs mb-1 uppercase tracking-wider font-semibold">
              <IndianRupee className="w-3 h-3 mr-1" />
              Fees
            </div>
            <div className="text-slate-900 font-bold">{college.fees}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center text-slate-500 text-xs mb-1 uppercase tracking-wider font-semibold">
              <Briefcase className="w-3 h-3 mr-1" />
              Avg. Package
            </div>
            <div className="text-green-600 font-bold">{college.avg_placement}</div>
          </div>
        </div>

        <div className="flex items-center text-slate-600 text-sm mb-6">
          <Award className="w-4 h-4 mr-2 text-yellow-500" />
          <span className="font-medium">{college.ranking}</span>
        </div>

        <div className="mt-auto flex gap-3">
          <Link
            href={`/colleges/${college.slug}`}
            className="flex-1 bg-blue-600 text-white text-center py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Full Details
          </Link>
          <button 
            className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            Brochure
          </button>
        </div>
      </div>
    </div>
  );
}
