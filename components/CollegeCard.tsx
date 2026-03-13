import Link from "next/link";
import Image from "next/image";
import { GraduationCap, MapPin, Award, IndianRupee, Briefcase } from "lucide-react";
import { CollegeMetadata } from "@/lib/colleges";

export function CollegeCard({ college }: { college: CollegeMetadata }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Top Banner-like Section with Logo Placeholder */}
      <div className="h-32 bg-slate-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-2 z-10">
          {college.logo ? (
            <Image 
              src={college.logo} 
              alt={`${college.name} Logo`}
              width={64}
              height={64}
              className="object-contain"
            />
          ) : (
            <GraduationCap className="w-10 h-10 text-blue-600" />
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-blue-200">
            {college.category}
          </span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-slate-200">
            {college.type}
          </span>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
            {college.name}
          </h3>
          <div className="flex items-center text-slate-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {college.location}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {college.courses.map(course => (
            <span key={course} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
              {course}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center text-slate-500 text-xs mb-1 uppercase tracking-wider font-semibold">
              <IndianRupee className="w-3 h-3 mr-1" />
              Fees
            </div>
            <div className="text-slate-900 font-bold leading-tight">{college.fees}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center text-slate-500 text-xs mb-1 uppercase tracking-wider font-semibold">
              <Briefcase className="w-3 h-3 mr-1" />
              Avg. Package
            </div>
            <div className="text-green-600 font-bold leading-tight">{college.avg_placement}</div>
          </div>
        </div>

        <div className="flex items-center text-slate-600 text-sm mb-6">
          <Award className="w-4 h-4 mr-2 text-yellow-500 shrink-0" />
          <span className="font-medium truncate">{college.ranking}</span>
        </div>

        <div className="mt-auto flex gap-3">
          <Link
            href={`/colleges/${college.slug}`}
            className="flex-grow bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
