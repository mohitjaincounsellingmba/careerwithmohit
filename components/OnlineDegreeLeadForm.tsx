'use client';

import { useState } from 'react';
import { COLLEGES } from '@/data/onlineColleges';
import { Send, PhoneCall, CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { submitLead } from '@/lib/leads';

export default function OnlineDegreeLeadForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    location: '',
    program: 'Online MBA',
    budget: '₹1L – ₹1.5L',
    college: 'Not Sure / Help Me Choose',
  });

  const programs = [
    'Online MBA',
    'Online BBA',
    'Online MCA',
    'Online BCA',
    'Online B.Com',
    'Online M.Com',
    'Online MA',
    'Online B.Sc',
    'Executive MBA',
    'Short-Term Certification',
  ];

  const budgets = [
    'Under ₹1L',
    '₹1L – ₹1.5L',
    '₹1.5L – ₹2L',
    'Above ₹2L',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const leadPayload = {
      name: formData.name,
      number: formData.number,
      email: formData.email,
      location: formData.location,
      source: `Online Degree Page Form (${formData.program})`,
      course: formData.program,
      budget: formData.budget,
      details: {
        preferredUniversity: formData.college,
      },
      timestamp: new Date().toISOString(),
    };

    const result = await submitLead(leadPayload);

    if (result.success) {
      setStatus('success');
      setFormData({
        name: '',
        number: '',
        email: '',
        location: '',
        program: 'Online MBA',
        budget: '₹1L – ₹1.5L',
        college: 'Not Sure / Help Me Choose',
      });
    } else {
      console.error('Lead Capture Form Error:', result.error);
      setStatus('error');
    }
  };

  return (
    <div className="rounded-[28px] sm:rounded-[40px] bg-white border-[1.5px] border-[#061124]/10 p-7 sm:p-12 shadow-[0_34px_70px_-30px_rgba(6,17,36,0.16)] max-w-4xl mx-auto my-8 relative overflow-hidden">
      {/* Background ambient glowing halos */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#0EA5E9]/15 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#F59E0B]/15 blur-[80px] pointer-events-none" />

      {status === 'success' ? (
        <div className="text-center py-10 px-4 relative z-10">
          <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 size={40} className="text-[#10B981]" />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#10B981] mb-2 block">
            Submission Successful
          </span>
          <h3 className="font-display text-3xl sm:text-4xl font-black text-[#061124] mb-3 tracking-tight">
            Comparison Request Received!
          </h3>
          <p className="text-[#475569] font-normal text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            We are compiling verified fee structures, NAAC reports, semester EMI options, and syllabus brochures of top universities matching your budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20just%20submitted%20the%20form%20for%20online%20degree%20counselling.%20Please%20share%20the%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-display font-extrabold px-8 py-3.5 rounded-full transition-all shadow-md hover:-translate-y-0.5 text-sm"
            >
              <PhoneCall size={16} />
              <span>Connect on WhatsApp Now</span>
            </a>
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#061124] border border-[#061124]/15 font-bold text-sm transition-all"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-8 sm:mb-10 relative z-10">
            <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center justify-center gap-2 mb-2">
              <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
              Free Profile Assessment &amp; Fee Compare
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#061124] tracking-tight">
              Compare Fees &amp; Eligibility (2027)
            </h2>
            <p className="text-[#475569] text-sm sm:text-base max-w-xl mx-auto font-normal mt-2 leading-relaxed">
              Fill in your details to get official fee schedules, UGC approvals, and syllabus details across 40+ UGC-DEB entitled universities.
            </p>
          </div>

          {status === 'error' && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 flex items-center gap-3 text-sm font-semibold">
              <AlertCircle size={18} className="shrink-0 text-red-500" />
              <span>Failed to submit. Please check your connection or connect with us on WhatsApp directly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#061124] block">
                  Full Name <span className="text-[#2563EB]">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#061124]/15 rounded-2xl px-4 py-3 text-sm font-semibold text-[#061124] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
                />
              </div>

              {/* Number */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#061124] block">
                  WhatsApp Number <span className="text-[#2563EB]">*</span>
                </label>
                <input
                  required
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#061124]/15 rounded-2xl px-4 py-3 text-sm font-semibold text-[#061124] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#061124] block">
                  Email Address <span className="text-[#2563EB]">*</span>
                </label>
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#061124]/15 rounded-2xl px-4 py-3 text-sm font-semibold text-[#061124] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#061124] block">
                  Your City / State <span className="text-[#2563EB]">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Delhi NCR, Bangalore, Mumbai"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#061124]/15 rounded-2xl px-4 py-3 text-sm font-semibold text-[#061124] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
                />
              </div>

              {/* Program */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#061124] block">
                  Program of Interest <span className="text-[#2563EB]">*</span>
                </label>
                <select
                  required
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#061124]/15 rounded-2xl px-4 py-3 text-sm font-semibold text-[#061124] focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10 transition-all appearance-none cursor-pointer"
                >
                  {programs.map((prog) => (
                    <option key={prog} value={prog}>
                      {prog}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#061124] block">
                  Budget (2 Years Fee) <span className="text-[#2563EB]">*</span>
                </label>
                <select
                  required
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#061124]/15 rounded-2xl px-4 py-3 text-sm font-semibold text-[#061124] focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10 transition-all appearance-none cursor-pointer"
                >
                  {budgets.map((budg) => (
                    <option key={budg} value={budg}>
                      {budg}
                    </option>
                  ))}
                </select>
              </div>

              {/* University */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#061124] block">
                  Preferred University (Optional)
                </label>
                <select
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#061124]/15 rounded-2xl px-4 py-3 text-sm font-semibold text-[#061124] focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="Not Sure / Help Me Choose">Not Sure / Help Me Choose</option>
                  {COLLEGES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} (NAAC {c.grade} · Fee {c.fee})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 px-8 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-display font-extrabold text-sm sm:text-base transition-all shadow-[0_12px_26px_-12px_rgba(37,99,235,0.85)] hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              {status === 'submitting' ? (
                'Processing Comparison...'
              ) : (
                <>
                  <Send size={16} />
                  <span>Compare Fees &amp; Get Free Counselling</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

