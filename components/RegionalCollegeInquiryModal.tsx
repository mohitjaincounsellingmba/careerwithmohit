'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Building2, MapPin, Sparkles, Phone, ShieldCheck, GraduationCap } from 'lucide-react';
import { submitLead } from '@/lib/leads';

export interface RegionalInquiryTarget {
  name: string;
  slug?: string;
  location?: string;
  fees?: string;
  avg_placement?: string;
  hubCity?: string;
}

interface RegionalCollegeInquiryModalProps {
  target: RegionalInquiryTarget | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RegionalCollegeInquiryModal({
  target,
  isOpen,
  onClose,
}: RegionalCollegeInquiryModalProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    exam: 'CAT 2026 / XAT 2027',
    workEx: 'Fresher / Final Year Graduate',
    specialization: 'PGDM General / Dual Specialization',
    budget: 'Flexible / As per college fee',
    message: '',
  });

  if (!isOpen || !target) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const leadPayload = {
      name: formData.name,
      number: formData.phone,
      phone: formData.phone,
      email: formData.email,
      location: formData.city,
      city: formData.city,
      college: target.name,
      preferredUniversity: target.name,
      collegeSlug: target.slug || '',
      course: formData.specialization,
      specialization: formData.specialization,
      exam: formData.exam,
      workExperience: formData.workEx,
      budget: target.fees || formData.budget,
      source: `Regional Hub Apply - ${target.name} (${target.hubCity || target.location || 'Pan India'})`,
      message: formData.message || `Student requested admission details & fee brochure for ${target.name}.`,
      timestamp: new Date().toISOString(),
    };

    const result = await submitLead(leadPayload);

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      alert(`Submission error: ${result.error || 'Please check your connection or contact us via WhatsApp.'}`);
    }
  };

  const handleResetAndClose = () => {
    setStatus('idle');
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      exam: 'CAT 2026 / XAT 2027',
      workEx: 'Fresher / Final Year Graduate',
      specialization: 'PGDM General / Dual Specialization',
      budget: 'Flexible / As per college fee',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl text-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Strip */}
        <div className="relative bg-gradient-to-r from-amber-500/20 via-indigo-600/20 to-purple-600/20 border-b border-slate-800 p-6 md:p-8">
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles size={14} />
            Direct Admission &amp; Fee Inquiry 2027
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
            Apply to <span className="text-amber-400">{target.name}</span>
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            {target.location && (
              <span className="inline-flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
                <MapPin size={12} className="text-amber-400" />
                {target.location}
              </span>
            )}
            {target.fees && (
              <span className="inline-flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800 text-slate-200">
                💰 Fees: <strong className="text-white">{target.fees}</strong>
              </span>
            )}
            {target.avg_placement && (
              <span className="inline-flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800 text-emerald-400 font-bold">
                📈 Avg CTC: {target.avg_placement}
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto">
          {status === 'success' ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h4 className="text-2xl font-black text-white">Application Received!</h4>
                <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
                  Your inquiry for <strong className="text-amber-400">{target.name}</strong> has been submitted. Mohit Jain and our admissions advisory team will evaluate your profile and reach out via WhatsApp/Call.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Target College:</span>
                  <span className="font-bold text-white">{target.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Student Name:</span>
                  <span className="font-bold text-white">{formData.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>WhatsApp Contact:</span>
                  <span className="font-bold text-emerald-400">{formData.phone}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <a
                  href={`https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20just%20submitted%20my%20inquiry%20for%20${encodeURIComponent(
                    target.name
                  )}.%20Can%20you%20guide%20me%20on%20cutoffs%20and%20fee%20structure%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20"
                >
                  <Send size={15} />
                  Chat on WhatsApp with Mohit
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm px-6 py-3 rounded-xl transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@gmail.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                    Current City / State *
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Delhi NCR, Jaipur, Patna"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                    Entrance Exam Score / Target
                  </label>
                  <select
                    name="exam"
                    value={formData.exam}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-all cursor-pointer"
                  >
                    <option value="CAT 2026 / XAT 2027">CAT 2026 / XAT 2027</option>
                    <option value="MAT (Dec 2026 / Feb 2027)">MAT (Dec 2026 / Feb 2027)</option>
                    <option value="CMAT 2027 / ATMA">CMAT 2027 / ATMA</option>
                    <option value="SNAP / NMAT by GMAC">SNAP / NMAT by GMAC</option>
                    <option value="MAH MBA CET 2027">MAH MBA CET 2027</option>
                    <option value="No Exam Yet / Direct Profile Evaluation">No Exam Yet / Direct Profile Evaluation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                    Preferred Specialization
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-all cursor-pointer"
                  >
                    <option value="PGDM General / Dual Specialization">PGDM General / Dual Specialization</option>
                    <option value="PGDM Marketing & Digital Media">PGDM Marketing & Digital Media</option>
                    <option value="PGDM Finance & FinTech">PGDM Finance & FinTech</option>
                    <option value="PGDM Business Analytics & Big Data">PGDM Business Analytics & Big Data</option>
                    <option value="PGDM Human Resource Management">PGDM Human Resource Management</option>
                    <option value="PGDM Operations & Supply Chain">PGDM Operations & Supply Chain</option>
                    <option value="PGDM International Business">PGDM International Business</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                  Work Experience / Graduation Status
                </label>
                <select
                  name="workEx"
                  value={formData.workEx}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-all cursor-pointer"
                >
                  <option value="Fresher / Final Year Graduate">Fresher / Final Year Graduate</option>
                  <option value="1 - 2 Years Corporate Experience">1 - 2 Years Corporate Experience</option>
                  <option value="2 - 4 Years Experience">2 - 4 Years Experience</option>
                  <option value="4+ Years (Executive MBA / PGDM)">4+ Years (Executive MBA / PGDM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                  Specific Query / Requirements (Optional)
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={`e.g. Please send cutoff details, GDPI interview dates, and scholarship options for ${target.name}.`}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base py-4 rounded-xl shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <span>Submitting Application to {target.name}...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Inquiry for {target.name} →</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-1">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>100% Privacy Guaranteed · Free 1-on-1 Mentoring by Mohit Jain</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
