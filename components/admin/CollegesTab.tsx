"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  Building2,
  IndianRupee,
  TrendingUp,
  MapPin,
  Sparkles,
  RefreshCw,
  BookOpen,
  Award,
  Layers,
  Upload,
} from "lucide-react";

interface CollegeMetadata {
  slug: string;
  name: string;
  logo: string;
  location: string;
  category: "Management" | "Engineering" | "UG Courses";
  type: "College" | "University" | "Institute";
  courses: string[];
  established: number;
  ownership: string;
  ranking: string;
  fees: string;
  avg_placement: string;
  highest_placement: string;
  lowest_placement: string;
  exams: string[];
  brochure_url: string;
  website: string;
  top_recruiters?: string[];
  specialization?: string;
  cutoff?: string;
}

import { MBA_PGDM_COLLEGES_2027 } from "@/data/mbaPgdmColleges2027";

const DEFAULT_SEED_COLLEGES: CollegeMetadata[] = MBA_PGDM_COLLEGES_2027.map((item) => ({
  slug: item.slug || item.universitySlug,
  name: item.name,
  logo: "/logo.png",
  location: item.location,
  category: "Management",
  type: "Institute",
  courses: item.programs || ["PGDM", "MBA"],
  established: 1998,
  ownership: "Private Autonomous",
  ranking: item.accreditation || "AICTE Approved",
  fees: item.fee,
  avg_placement: item.avgPlacement || "₹8.50 LPA",
  highest_placement: item.highestPlacement || "₹22.00 LPA",
  lowest_placement: "₹5.50 LPA",
  exams: ["CAT", "MAT", "CMAT", "XAT"],
  brochure_url: "#",
  website: "https://www.careerwithmohit.online",
  top_recruiters: item.topRecruiters || ["Deloitte", "KPMG", "ICICI Bank", "Amazon"],
}));

interface CollegesTabProps {
  colleges?: CollegeMetadata[];
}

export function CollegesTab({ colleges: initialColleges = [] }: CollegesTabProps) {
  const [colleges, setColleges] = useState<CollegeMetadata[]>(
    initialColleges.length > 0 ? initialColleges : DEFAULT_SEED_COLLEGES
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "Management" as "Management" | "Engineering" | "UG Courses",
    type: "Institute" as "College" | "University" | "Institute",
    location: "",
    state: "",
    established: 2000,
    ownership: "Private",
    ranking: "AICTE Approved",
    fees: "₹8.5 Lakhs",
    avg_placement: "₹8.5 LPA",
    highest_placement: "₹22.0 LPA",
    lowest_placement: "₹5.5 LPA",
    courses: "MBA, PGDM",
    specialization: "Marketing Management, Financial Management, Human Resource (HRM), Business Analytics",
    exams: "CAT, MAT, CMAT, XAT",
    website: "https://www.careerwithmohit.online",
    brochure_url: "#",
    top_recruiters: "Deloitte, KPMG, ICICI Bank, Amazon, Accenture",
    logo: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const applyLocalStorageOverrides = (baseList: CollegeMetadata[]) => {
    let finalColleges = baseList.length > 0 ? baseList : DEFAULT_SEED_COLLEGES;
    try {
      const customCollegesStr = localStorage.getItem("cwm_custom_colleges_v2");
      if (customCollegesStr) {
        const customColleges: CollegeMetadata[] = JSON.parse(customCollegesStr);
        const customSlugs = new Set(customColleges.map((c) => c.slug));
        const baseFiltered = finalColleges.filter((c) => !customSlugs.has(c.slug));
        finalColleges = [...customColleges, ...baseFiltered];
      }

      const deletedSlugsStr = localStorage.getItem("cwm_deleted_colleges_v2");
      if (deletedSlugsStr) {
        const deletedSlugs: string[] = JSON.parse(deletedSlugsStr);
        const delSet = new Set(deletedSlugs);
        finalColleges = finalColleges.filter((c) => !delSet.has(c.slug));
      }
    } catch (e) {}

    setColleges(finalColleges);
    setIsLoading(false);
  };

  // Fetch colleges list with fast static export fallback & localStorage persistence
  const fetchColleges = async () => {
    let loadedColleges: CollegeMetadata[] = initialColleges || [];

    if (loadedColleges.length > 0) {
      applyLocalStorageOverrides(loadedColleges);
      return;
    }

    try {
      // 1. Try API route (dev server)
      const res = await fetch(`/api/admin/colleges?t=${Date.now()}`).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.colleges && data.colleges.length > 0) {
          loadedColleges = data.colleges;
        }
      }

      // 2. Try fast lightweight /colleges-data.json (387 KB)
      if (loadedColleges.length === 0) {
        const colRes = await fetch(`/colleges-data.json?t=${Date.now()}`).catch(() => null);
        if (colRes && colRes.ok) {
          const colData = await colRes.json();
          if (colData.colleges && colData.colleges.length > 0) {
            loadedColleges = colData.colleges;
          }
        }
      }

      // 3. Fallback to /admin-data.json
      if (loadedColleges.length === 0) {
        const fallbackRes = await fetch(`/admin-data.json?t=${Date.now()}`).catch(() => null);
        if (fallbackRes && fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          if (fallbackData.colleges && fallbackData.colleges.length > 0) {
            loadedColleges = fallbackData.colleges;
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch colleges:", err);
    }

    if (loadedColleges.length === 0) {
      loadedColleges = DEFAULT_SEED_COLLEGES;
    }

    applyLocalStorageOverrides(loadedColleges);
  };

  useEffect(() => {
    if (initialColleges && initialColleges.length > 0) {
      applyLocalStorageOverrides(initialColleges);
    } else {
      fetchColleges();
    }
  }, [initialColleges]);

  const filteredColleges = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return colleges.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.courses.some((cr) => cr.toLowerCase().includes(q));
      const matchesCategory =
        selectedCategoryFilter === "All" || c.category === selectedCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [colleges, searchQuery, selectedCategoryFilter]);

  const handleOpenAddModal = () => {
    setEditingSlug(null);
    setFormData({
      name: "",
      slug: "",
      category: "Management",
      type: "Institute",
      location: "",
      state: "",
      established: 2000,
      ownership: "Private",
      ranking: "AICTE Approved",
      fees: "₹8.5 Lakhs",
      avg_placement: "₹8.5 LPA",
      highest_placement: "₹22.0 LPA",
      lowest_placement: "₹5.5 LPA",
      courses: "MBA, PGDM",
      specialization: "Marketing Management, Financial Management, Human Resource (HRM), Business Analytics",
      exams: "CAT, MAT, CMAT, XAT",
      website: "https://www.careerwithmohit.online",
      brochure_url: "#",
      top_recruiters: "Deloitte, KPMG, ICICI Bank, Amazon, Accenture",
      logo: "",
      description: "",
    });
    setImagePreview(null);
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = async (college: CollegeMetadata) => {
    setEditingSlug(college.slug);
    setFormData({
      name: college.name,
      slug: college.slug,
      category: college.category,
      type: college.type,
      location: college.location,
      state: "",
      established: college.established || 2000,
      ownership: college.ownership || "Private",
      ranking: college.ranking || "Top Rated",
      fees: college.fees || "",
      avg_placement: college.avg_placement || "",
      highest_placement: college.highest_placement || "",
      lowest_placement: college.lowest_placement || "",
      courses: Array.isArray(college.courses) ? college.courses.join(", ") : college.courses || "",
      specialization: college.specialization || "Marketing Management, Financial Management, Human Resource (HRM)",
      exams: Array.isArray(college.exams) ? college.exams.join(", ") : college.exams || "",
      website: college.website || "",
      brochure_url: college.brochure_url || "",
      top_recruiters: Array.isArray(college.top_recruiters) ? college.top_recruiters.join(", ") : college.top_recruiters || "",
      logo: college.logo || "",
      description: `${college.name} is a premier educational institution situated in ${college.location}, offering industry-integrated coursework and placement assistance.`,
    });
    setImagePreview(college.logo || null);
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit. Please upload a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData((prev) => ({ ...prev, logo: result }));
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setStatusMessage({ type: "error", text: "Please enter College Name." });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newCollegeObj: CollegeMetadata = {
      slug,
      name: formData.name,
      logo: formData.logo || "/logo.png",
      location: formData.location || "India",
      category: formData.category,
      type: formData.type,
      courses: formData.courses.split(",").map(c => c.trim()).filter(Boolean),
      established: Number(formData.established) || 2000,
      ownership: formData.ownership,
      ranking: formData.ranking,
      fees: formData.fees,
      avg_placement: formData.avg_placement,
      highest_placement: formData.highest_placement,
      lowest_placement: formData.lowest_placement,
      exams: formData.exams.split(",").map(e => e.trim()).filter(Boolean),
      website: formData.website,
      brochure_url: formData.brochure_url,
      top_recruiters: formData.top_recruiters.split(",").map(r => r.trim()).filter(Boolean),
      specialization: formData.specialization,
    };

    try {
      await fetch("/api/admin/colleges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => null);
    } catch (e) {}

    // Save locally to localStorage so changes persist instantly in static export mode
    try {
      const customCollegesStr = localStorage.getItem("cwm_custom_colleges_v2") || "[]";
      const customColleges: CollegeMetadata[] = JSON.parse(customCollegesStr);
      const filtered = customColleges.filter(c => c.slug !== slug);
      const updatedCustom = [newCollegeObj, ...filtered];
      localStorage.setItem("cwm_custom_colleges_v2", JSON.stringify(updatedCustom));
    } catch (e) {}

    setStatusMessage({
      type: "success",
      text: `College "${formData.name}" saved successfully!`,
    });

    await fetchColleges();
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1200);
    setIsSubmitting(false);
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await fetch(`/api/admin/colleges?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      }).catch(() => null);
    } catch (err) {}

    try {
      const deletedSlugsStr = localStorage.getItem("cwm_deleted_colleges_v2") || "[]";
      const deletedSlugs: string[] = JSON.parse(deletedSlugsStr);
      if (!deletedSlugs.includes(slug)) {
        deletedSlugs.push(slug);
        localStorage.setItem("cwm_deleted_colleges_v2", JSON.stringify(deletedSlugs));
      }
    } catch (e) {}

    await fetchColleges();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Colleges Directory Management</h2>
              <p className="text-xs text-slate-400">
                Add, update, or remove colleges. Newly added colleges immediately appear on `/colleges` page.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchColleges}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh List</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New College</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search colleges by name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          {["All", "Management", "Engineering", "UG Courses"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategoryFilter === cat
                  ? "bg-amber-500/20 border border-amber-500/40 text-amber-400"
                  : "bg-slate-800/60 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Colleges Data Table */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-400 space-y-3">
          <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">Loading college directory database...</p>
        </div>
      ) : filteredColleges.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">No colleges found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            No college matches your current search or category filter. Try clearing filters or add a new college.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add College
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">College Name</th>
                  <th className="py-3.5 px-4">Category & Location</th>
                  <th className="py-3.5 px-4">Programs</th>
                  <th className="py-3.5 px-4">Fees</th>
                  <th className="py-3.5 px-4">Avg Package</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredColleges.map((c) => (
                  <tr key={c.slug} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-amber-400 shrink-0 overflow-hidden">
                          {c.logo && !c.logo.includes("default") ? (
                            <img src={c.logo} alt={c.name} className="w-full h-full object-contain p-1" />
                          ) : (
                            c.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <Link
                            href={`/colleges/${c.slug}`}
                            target="_blank"
                            className="hover:text-amber-400 transition-colors flex items-center gap-1 font-bold"
                          >
                            <span>{c.name}</span>
                            <ExternalLink className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <span className="text-[10px] text-slate-400 font-mono block">/colleges/{c.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-[10px] font-bold uppercase mr-2">
                        {c.category}
                      </span>
                      <span className="text-slate-300 font-medium">{c.location}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      {(c.courses || []).slice(0, 3).join(", ")}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-bold">{c.fees}</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-bold">{c.avg_placement}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/colleges/${c.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="View College Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEditModal(c)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-slate-700 transition-colors cursor-pointer"
                          title="Edit College"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.slug, c.name)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                          title="Delete College"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit College Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl my-8">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    {editingSlug ? "Edit College Listing" : "Add New College to Directory"}
                  </h3>
                  <p className="text-xs text-slate-400">Fill in the details below to add or update college metadata.</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {statusMessage && (
                <div
                  className={`p-4 rounded-2xl border flex items-center gap-3 text-xs font-bold ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* 1. Basic Information */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Building2 className="w-4 h-4" /> 1. Basic Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">
                      College Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ABBS School of Management"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">
                      Custom URL Slug (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="auto-generated-if-empty"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Management">Management (MBA / PGDM)</option>
                      <option value="Engineering">Engineering (B.Tech)</option>
                      <option value="UG Courses">UG Courses (BBA / BCA)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as any,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Institute">Institute</option>
                      <option value="University">University</option>
                      <option value="College">College</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Ownership</label>
                    <select
                      value={formData.ownership}
                      onChange={(e) => setFormData({ ...formData, ownership: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Private">Private</option>
                      <option value="Public">Public (Government)</option>
                      <option value="Private Autonomous">Private Autonomous</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Location (City)</label>
                    <input
                      type="text"
                      placeholder="e.g. Bangalore, Noida, Pune"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">State (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Karnataka, Uttar Pradesh"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Established Year</label>
                    <input
                      type="number"
                      placeholder="e.g. 1998"
                      value={formData.established}
                      onChange={(e) => setFormData({ ...formData, established: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Programs, Fees, Specializations & Cutoff */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Layers className="w-4 h-4" /> 2. Programs, Fees, Specializations & Cut Off
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">
                      Programs Offered <span className="text-slate-400 font-normal">(Comma separated)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MBA, PGDM, Executive MBA"
                      value={formData.courses}
                      onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Course Fee Structure</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹9.5 - 11.5 Lakhs"
                      value={formData.fees}
                      onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Specializations Offered</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Marketing Management, Financial Management, Human Resource (HRM), Business Analytics"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Cut Off & Accepted Exams</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. CAT (75+ Percentile), MAT (600+), CMAT, XAT"
                      value={formData.exams}
                      onChange={(e) => setFormData({ ...formData, exams: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Placement Data */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                  <TrendingUp className="w-4 h-4" /> 3. Placement Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Average Placement Package</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹8.50 LPA"
                      value={formData.avg_placement}
                      onChange={(e) => setFormData({ ...formData, avg_placement: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-bold text-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Highest Placement Package</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹22.00 LPA"
                      value={formData.highest_placement}
                      onChange={(e) => setFormData({ ...formData, highest_placement: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-bold text-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Lowest Placement Package</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹5.50 LPA"
                      value={formData.lowest_placement}
                      onChange={(e) => setFormData({ ...formData, lowest_placement: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1.5">
                    Top Recruiters <span className="text-slate-400 font-normal">(Comma separated)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Deloitte, KPMG, ICICI Bank, Amazon, Accenture, Wipro"
                    value={formData.top_recruiters}
                    onChange={(e) => setFormData({ ...formData, top_recruiters: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* 4. Cover Image & Logo */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                  <ImageIcon className="w-4 h-4" /> 4. Cover Image / Logo
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">
                      Upload Logo / Cover Image File
                    </label>
                    <label className="flex items-center gap-2 px-4 py-3 bg-slate-950 border border-dashed border-slate-700 hover:border-amber-400 rounded-2xl cursor-pointer transition-colors text-xs text-slate-400 hover:text-white">
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>Choose file to upload...</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Or Image URL</label>
                    <input
                      type="text"
                      placeholder="https://example.com/logo.png or /images/college.png"
                      value={formData.logo}
                      onChange={(e) => {
                        setFormData({ ...formData, logo: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {imagePreview && (
                  <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex items-center justify-center p-1">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-400 block">Image Preview Loaded</span>
                      <span className="text-[10px] text-slate-400 font-mono truncate block max-w-xs">
                        {formData.logo.startsWith("data:") ? "Base64 Image Upload" : formData.logo}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Detailed Overview / Description */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                  <BookOpen className="w-4 h-4" /> 5. College Description / Overview
                </h4>

                <div>
                  <textarea
                    rows={4}
                    placeholder="Provide a detailed overview of the college, campus facilities, infrastructure, admission guidelines, and rankings..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Saving College...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{editingSlug ? "Update College" : "Save & Publish College"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
