"use client";

import React from "react";
import Link from "next/link";
import { X, Award, MapPin, IndianRupee, Briefcase, GraduationCap, Check, ArrowRight, Download, PhoneCall, ExternalLink } from "lucide-react";
import { CollegeMetadata } from "@/lib/colleges";

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  colleges: CollegeMetadata[];
  onRemove: (slug: string) => void;
  onDownloadBrochure?: (college: CollegeMetadata) => void;
}

export function CompareModal({
  isOpen,
  onClose,
  colleges,
  onRemove,
  onDownloadBrochure
}: CompareModalProps) {
  if (!isOpen || colleges.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#14103A] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Live Comparison
              </span>
              <span className="text-xs font-mono text-slate-300">
                {colleges.length} Colleges Compared
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white mt-1">
              Side-by-Side Campus Evaluation
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/colleges/compare?slugs=${colleges.map(c => c.slug).join(",")}`}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-white underline underline-offset-4"
            >
              <span>Full Page View</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content / Comparison Matrix */}
        <div className="p-4 sm:p-6 overflow-x-auto overflow-y-auto flex-1 custom-scrollbar">
          <table className="w-full border-collapse text-left min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="p-4 font-mono font-bold text-xs uppercase tracking-wider text-slate-400 w-44 bg-slate-50/80 rounded-tl-2xl">
                  Metric / Feature
                </th>
                {colleges.map((college) => (
                  <th key={college.slug} className="p-4 bg-slate-50/50 min-w-[200px] align-top relative">
                    <button
                      onClick={() => onRemove(college.slug)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-200 text-slate-600 hover:bg-rose-100 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="space-y-2 pr-6">
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                        {college.ranking || "Top Rated"}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                        {college.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {college.location}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              
              {/* Total Course Fees */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/80">
                  Total Course Fees
                </td>
                {colleges.map((college) => (
                  <td key={college.slug} className="p-4 font-mono font-extrabold text-slate-900">
                    <div className="flex items-center text-sm sm:text-base">
                      <IndianRupee className="w-4 h-4 text-slate-500 mr-0.5" />
                      {college.fees}
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">Approx complete tuition</span>
                  </td>
                ))}
              </tr>

              {/* Average Placement */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/80">
                  Average Placement
                </td>
                {colleges.map((college) => (
                  <td key={college.slug} className="p-4 font-mono font-extrabold text-emerald-700 text-sm sm:text-base">
                    {college.avg_placement || "₹8.50 LPA"}
                  </td>
                ))}
              </tr>

              {/* Highest Placement CTC */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/80">
                  Highest CTC Package
                </td>
                {colleges.map((college) => (
                  <td key={college.slug} className="p-4 font-mono font-extrabold text-violet-700 text-sm sm:text-base">
                    {college.highest_placement || "₹22.0 LPA"}
                  </td>
                ))}
              </tr>

              {/* Key Accepted Exams */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/80">
                  Accepted Entrance Tests
                </td>
                {colleges.map((college) => (
                  <td key={college.slug} className="p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {(college.exams && college.exams.length > 0) ? (
                        college.exams.map((ex, i) => (
                          <span key={i} className="bg-slate-100 text-slate-800 font-mono text-[11px] font-bold px-2 py-0.5 rounded-md">
                            {ex}
                          </span>
                        ))
                      ) : (
                        <span className="bg-emerald-50 text-emerald-800 font-mono text-[11px] font-bold px-2 py-0.5 rounded-md">
                          Direct Merit / Profile
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Programs & Degrees */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/80">
                  Offered Programs
                </td>
                {colleges.map((college) => (
                  <td key={college.slug} className="p-4">
                    <div className="flex flex-wrap gap-1 text-xs text-slate-700 font-semibold">
                      {(college.courses || []).join(", ") || "MBA / PGDM"}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Ownership & Accreditation */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/80">
                  Type &amp; Accreditation
                </td>
                {colleges.map((college) => (
                  <td key={college.slug} className="p-4 text-xs space-y-1">
                    <span className="font-bold text-slate-800 block">
                      {college.ownership || "Private Autonomous"}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px] block">
                      Est. {college.established || "2000"} · AICTE / UGC Approved
                    </span>
                  </td>
                ))}
              </tr>

              {/* Action CTAs */}
              <tr>
                <td className="p-4 font-bold text-slate-900 bg-slate-50/80 rounded-bl-2xl">
                  Next Steps
                </td>
                {colleges.map((college) => (
                  <td key={college.slug} className="p-4 space-y-2">
                    <Link
                      href={`/colleges/${college.slug}`}
                      className="block w-full text-center py-2 px-3 bg-[#14103A] hover:bg-violet-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                    >
                      View Full Details &rarr;
                    </Link>
                    <button
                      onClick={() => {
                        if (onDownloadBrochure) {
                          onDownloadBrochure(college);
                        } else {
                          window.location.href = `/inquiry?college=${college.slug}&type=brochure`;
                        }
                      }}
                      className="block w-full text-center py-2 px-3 bg-white border border-slate-200 text-slate-700 hover:border-violet-300 hover:text-violet-700 font-bold text-xs rounded-xl transition-all"
                    >
                      Get Brochure &amp; Fees
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Need help choosing? Connect directly with Mohit Jain for personalized shortlisting.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/919560020771?text=Hi%20Mohit,%20I%20am%20comparing%20colleges%20and%20need%20guidance"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl text-center shadow-xs"
            >
              WhatsApp Counselor &rarr;
            </a>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl text-center"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
