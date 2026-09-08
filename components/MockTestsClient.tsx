"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  GraduationCap,
  Building2,
  Stethoscope,
  BookOpen,
  Zap,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Filter,
  LayoutGrid,
  Table as TableIcon,
  X,
  ShieldCheck,
  BarChart3,
  HelpCircle,
  MessageCircle,
  Award,
  ChevronDown,
} from "lucide-react";
import { MockTestItem, ALL_MOCK_TESTS } from "@/data/mockTests";
import { submitLead } from "@/lib/leads";

/* ── Modal: 1-on-1 Exam Strategy & Score Assessment ── */
function ExamStrategyModal({
  exam,
  onClose,
}: {
  exam: MockTestItem | null;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    targetYear: "2026-2027",
    currentScore: "",
    preparationStage: "Taking Regular Mocks",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await submitLead({
      name: form.name,
      number: form.number,
      email: form.email,
      course: `${exam?.name || "Entrance Exam"} Preparation`,
      source: `Mock Tests Hub Modal (${exam?.name || "General Strategy"})`,
      details: {
        examTarget: exam?.name || "General Entrance Exam",
        targetYear: form.targetYear,
        currentMockScoreOrPercentile: form.currentScore || "Not yet calculated",
        preparationStage: form.preparationStage,
      },
    });
    setStatus("success");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl border border-slate-200/80 shadow-2xl w-full max-w-lg p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Strategy Request Received!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto font-medium">
              Mohit Jain&apos;s academic advisory team will reach out via WhatsApp/Call within 24 hours with a personalized mock analysis and roadmap for{" "}
              <strong className="text-slate-900">{exam?.name || "your exam"}</strong>.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-slate-950 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Back to Mock Tests
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                <Sparkles className="w-3.5 h-3.5" /> Free 1-on-1 Exam Strategy
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                Personalized Prep Plan for {exam?.name || "Your Exam"}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Get an unbiased review of your current mock scores, sectional weaknesses, and college target cutoffs.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="10-digit mobile"
                    value={form.number}
                    onChange={(e) => setForm({ ...form, number: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Target Academic Intake
                  </label>
                  <select
                    value={form.targetYear}
                    onChange={(e) => setForm({ ...form, targetYear: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="2026">2026 Exam / 2027 Admission</option>
                    <option value="2027">2027 Exam / 2028 Admission</option>
                    <option value="Immediate">Next Upcoming Cycle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Current Mock Score / %ile
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 65 marks / 85 %ile"
                    value={form.currentScore}
                    onChange={(e) => setForm({ ...form, currentScore: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Current Preparation Status
                </label>
                <select
                  value={form.preparationStage}
                  onChange={(e) => setForm({ ...form, preparationStage: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <option value="Taking Regular Mocks">Taking Regular Mocks (Need Score Booster)</option>
                  <option value="Syllabus 50% Complete">Syllabus 50% Complete</option>
                  <option value="Just Starting Prep">Just Starting Prep / Need Roadmap</option>
                  <option value="Seeking College Call Advice">Targeting Specific College Cutoffs</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-xs uppercase tracking-wider disabled:opacity-50 cursor-pointer mt-2"
            >
              {status === "submitting" ? "Submitting Request..." : "Request Free Strategy Session →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function MockTestsClient({ exams = ALL_MOCK_TESTS }: { exams?: MockTestItem[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedModalExam, setSelectedModalExam] = useState<MockTestItem | null>(null);

  // Category Tabs Configuration
  const categoryFilters = [
    { id: "all", label: "All Exams", icon: Sparkles, count: exams.length },
    { id: "mba", label: "MBA & Management", icon: GraduationCap, count: exams.filter((e) => e.category === "mba").length },
    { id: "engineering", label: "Engineering (B.Tech)", icon: Building2, count: exams.filter((e) => e.category === "engineering").length },
    { id: "medical-law", label: "Medical, Law & Central", icon: Stethoscope, count: exams.filter((e) => e.category === "medical-law").length },
    { id: "abroad", label: "Study Abroad", icon: BookOpen, count: exams.filter((e) => e.category === "abroad").length },
  ];

  // Tag Quick Filters
  const tagFilters = [
    { id: "all", label: "All Tests" },
    { id: "Hot", label: "🔥 Hot Picks" },
    { id: "Speed", label: "⚡ Speed Mocks" },
    { id: "Expert", label: "🏆 Expert Level" },
    { id: "National", label: "🇮🇳 National Exams" },
    { id: "Band 7+", label: "🌐 Global / IELTS" },
  ];

  // Filtered Exam List
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      // Category match
      if (selectedCategory !== "all" && exam.category !== selectedCategory) {
        return false;
      }
      // Tag match
      if (selectedTag !== "all" && exam.tag !== selectedTag) {
        return false;
      }
      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = exam.name.toLowerCase().includes(q);
        const matchDesc = exam.desc.toLowerCase().includes(q);
        const matchColleges = exam.targetColleges.toLowerCase().includes(q);
        const matchHighlight = exam.highlight.toLowerCase().includes(q);
        const matchCategory = exam.categoryLabel.toLowerCase().includes(q);
        return matchName || matchDesc || matchColleges || matchHighlight || matchCategory;
      }
      return true;
    });
  }, [exams, selectedCategory, selectedTag, search]);

  return (
    <div id="directory" className="w-full scroll-mt-20">
      {/* ── Control Bar: Search, Filters & View Switcher ── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-lg shadow-slate-900/5 mb-10 space-y-6">
        
        {/* Search Bar & Mode Switch */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exams, courses, or colleges (e.g. CAT, JEE Main, IIM, XLRI, IELTS, BBA)..."
              className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl pl-12 pr-10 py-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl self-end md:self-auto border border-slate-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>Table</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          {categoryFilters.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-950 text-white shadow-md shadow-slate-900/10"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-slate-400"}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Quick Filter:
          </span>
          {tagFilters.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedTag === tag.id
                  ? "bg-amber-100 text-amber-900 border border-amber-300 font-bold"
                  : "bg-slate-100/70 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              {tag.label}
            </button>
          ))}
          {(selectedCategory !== "all" || selectedTag !== "all" || search) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedTag("all");
                setSearch("");
              }}
              className="text-xs text-rose-600 font-bold hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* ── Active Filters Summary Strip ── */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="text-xs sm:text-sm font-bold text-slate-600">
          Showing <span className="text-slate-900 font-black">{filteredExams.length}</span> free mock tests
          {selectedCategory !== "all" && (
            <span> in <span className="text-amber-700 font-bold">{categoryFilters.find(c => c.id === selectedCategory)?.label}</span></span>
          )}
          {search && (
            <span> matching &ldquo;<span className="text-slate-900 font-bold">{search}</span>&rdquo;</span>
          )}
        </div>
        <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
          100% Free · Instant Score &amp; Percentile
        </span>
      </div>

      {/* ── No Results State ── */}
      {filteredExams.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-8 shadow-sm">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No mock tests found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try searching for a different exam name, clearing your filters, or check our complete list of 24+ tests.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedTag("all");
              setSearch("");
            }}
            className="mt-4 bg-slate-950 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* ── CARD GRID VIEW MODE ── */}
      {viewMode === "grid" && filteredExams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Stripe on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header: Stream Badge & Custom Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    {exam.categoryLabel}
                  </span>
                  {exam.tag && (
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm ${exam.tagColor || "bg-amber-500 text-slate-950"}`}>
                      {exam.tag}
                    </span>
                  )}
                </div>

                {/* Exam Title & Description */}
                <h3 className="text-xl font-extrabold text-slate-950 group-hover:text-amber-700 transition-colors leading-snug mb-1">
                  {exam.name}
                </h3>
                <p className="text-xs text-slate-600 font-medium line-clamp-2 mb-4 leading-relaxed">
                  {exam.desc}
                </p>

                {/* Target Colleges Pill */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 mb-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Target Institutions
                  </span>
                  <p className="text-xs font-bold text-slate-800 leading-snug">
                    {exam.targetColleges}
                  </p>
                </div>

                {/* Specs Micro-Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 mb-5">
                  <div className="flex items-center gap-1.5 bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{exam.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-100">
                    <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{exam.markingScheme}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2">
                  <Link
                    href={exam.slug}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3 rounded-2xl shadow-md shadow-amber-500/10 active:scale-95 transition-all text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
                  >
                    Start Free Mock <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  </Link>
                  {exam.guideSlug && (
                    <Link
                      href={exam.guideSlug}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-3 rounded-2xl text-xs transition-colors shrink-0 flex items-center justify-center"
                      title="Read Exam Strategy Guide"
                    >
                      <BookOpen className="w-4 h-4 text-slate-700" />
                    </Link>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedModalExam(exam)}
                  className="w-full text-center text-[11px] font-bold text-slate-500 hover:text-amber-800 py-1 transition-colors cursor-pointer"
                >
                  Need Personalized Strategy? Get 1-on-1 Plan →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TABLE VIEW MODE ── */}
      {viewMode === "table" && filteredExams.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-4 border-r border-slate-800">Exam Name</th>
                  <th className="p-4 border-r border-slate-800">Category</th>
                  <th className="p-4 border-r border-slate-800">Target Institutions</th>
                  <th className="p-4 border-r border-slate-800">Duration &amp; Qs</th>
                  <th className="p-4 border-r border-slate-800">Marking Scheme</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredExams.map((exam, i) => (
                  <tr
                    key={exam.id}
                    className={`hover:bg-amber-50/50 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                    }`}
                  >
                    <td className="p-4 font-black text-slate-950 border-r border-slate-200">
                      <div className="flex items-center gap-2">
                        <span>{exam.name}</span>
                        {exam.tag && (
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${exam.tagColor || "bg-amber-500 text-slate-950"}`}>
                            {exam.tag}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 border-r border-slate-200 text-slate-600 font-semibold">
                      {exam.categoryLabel}
                    </td>
                    <td className="p-4 border-r border-slate-200 text-slate-800 font-semibold max-w-xs">
                      {exam.targetColleges}
                    </td>
                    <td className="p-4 border-r border-slate-200 text-slate-600">
                      <div className="font-bold text-slate-900">{exam.duration}</div>
                      <div className="text-[11px] text-slate-400">{exam.questionsCount}</div>
                    </td>
                    <td className="p-4 border-r border-slate-200 text-slate-600 font-medium">
                      {exam.markingScheme}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={exam.slug}
                          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all"
                        >
                          Start Test
                        </Link>
                        {exam.guideSlug && (
                          <Link
                            href={exam.guideSlug}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 rounded-xl transition-colors"
                            title="Strategy Guide"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-slate-700" />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Strategy Guidance Modal Mount */}
      {selectedModalExam && (
        <ExamStrategyModal
          exam={selectedModalExam}
          onClose={() => setSelectedModalExam(null)}
        />
      )}
    </div>
  );
}
