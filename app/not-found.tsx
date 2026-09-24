import type { Metadata } from "next";
import Link from "next/link";
import { Compass, BookOpen, GraduationCap, Laptop, Home, Search, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | CareerWithMohit",
  description: "The page or admissions guide you are looking for might have been moved, renamed, or updated.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-20 bg-slate-50 font-body">
      <div className="max-w-3xl w-full text-center">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-2 text-sm font-black uppercase tracking-widest border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2 mb-8">
          <span>Error 404 • Page Not Found</span>
        </div>

        <h1 className="font-display text-6xl sm:text-8xl font-black uppercase tracking-tight text-foreground mb-6 leading-none">
          Lost Your <span className="text-primary underline decoration-8 underline-offset-8">Way?</span>
        </h1>

        <p className="text-xl sm:text-2xl text-slate-700 font-bold mb-12 max-w-2xl mx-auto leading-relaxed">
          The page or guide you are looking for might have been moved, renamed, or updated for the 2027 admission cycle.
        </p>

        {/* Quick Hub Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-12">
          <Link
            href="/colleges"
            className="group p-6 bg-white border-4 border-foreground rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 border-2 border-foreground flex items-center justify-center text-primary">
                <GraduationCap className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase text-foreground group-hover:text-primary transition-colors">
                  College Directory
                </h3>
                <span className="text-xs font-bold text-slate-500">770+ MBA & Engineering Colleges</span>
              </div>
            </div>
            <p className="text-sm font-bold text-slate-600">
              Explore cutoffs, verified fees, placements, and NIRF rankings.
            </p>
          </Link>

          <Link
            href="/mock-tests"
            className="group p-6 bg-white border-4 border-foreground rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border-2 border-foreground flex items-center justify-center text-amber-700">
                <Laptop className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase text-foreground group-hover:text-amber-700 transition-colors">
                  Free Mock Tests
                </h3>
                <span className="text-xs font-bold text-slate-500">CAT, XAT, NMAT, SNAP & MAT</span>
              </div>
            </div>
            <p className="text-sm font-bold text-slate-600">
              Practice full-length timed CBT entrance mocks with step-by-step solutions.
            </p>
          </Link>

          <Link
            href="/online-degree-certification"
            className="group p-6 bg-white border-4 border-foreground rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border-2 border-foreground flex items-center justify-center text-emerald-700">
                <BookOpen className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase text-foreground group-hover:text-emerald-700 transition-colors">
                  Online Degrees
                </h3>
                <span className="text-xs font-bold text-slate-500">UGC-DEB Entitled Universities</span>
              </div>
            </div>
            <p className="text-sm font-bold text-slate-600">
              Compare Online MBA, MCA, BBA, and BCA programs across 77+ universities.
            </p>
          </Link>

          <Link
            href="/blog"
            className="group p-6 bg-white border-4 border-foreground rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 border-2 border-foreground flex items-center justify-center text-purple-700">
                <Compass className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase text-foreground group-hover:text-purple-700 transition-colors">
                  Expert Career Blog
                </h3>
                <span className="text-xs font-bold text-slate-500">5,000+ Admission Articles</span>
              </div>
            </div>
            <p className="text-sm font-bold text-slate-600">
              Read comprehensive admission guides, exam strategies, and ROI analyses.
            </p>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white border-4 border-foreground px-8 py-4 text-lg font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 transition-all rounded-xl"
          >
            <Home className="w-5 h-5" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-foreground border-4 border-foreground px-8 py-4 text-lg font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:bg-accent hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 transition-all rounded-xl"
          >
            <Search className="w-5 h-5" />
            <span>Search Career Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
