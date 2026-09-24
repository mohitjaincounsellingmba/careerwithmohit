'use client';

import React, { useState } from 'react';
import { submitLead } from '@/lib/leads';
import { BUDGET_OPTIONS, COURSE_OPTIONS } from '@/lib/constants';
import {
  Sparkles,
  CheckCircle2,
  Send,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  DollarSign,
  MessageSquare,
  Award,
  ArrowRight,
  Clock,
  Check,
  Star,
  Zap,
  MessageCircle,
  Video,
  FileCheck,
  BadgeCheck,
  Building2,
  TrendingUp,
  Percent
} from 'lucide-react';

interface HomeInquirySectionProps {
  initialCourse?: string;
}

export function HomeInquirySection({ initialCourse = 'MBA / PGDM' }: HomeInquirySectionProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    location: '',
    preferredLocation: '',
    budget: '',
    course: initialCourse,
    score: '',
    message: ''
  });

  const popularCourses = [
    'MBA / PGDM',
    'Executive MBA',
    'B.Tech & Engg',
    'Online MBA (UGC)',
    'BBA / BCA',
    'Study Abroad',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.number.trim() || !formData.email.trim()) {
      alert('Please fill out all required fields (Full Name, WhatsApp Number, and Email).');
      return;
    }

    const cleanPhone = formData.number.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setStatus('submitting');

    const leadPayload = {
      name: formData.name.trim(),
      number: cleanPhone,
      email: formData.email.trim(),
      location: formData.location.trim() || 'Not Specified',
      preferredLocation: formData.preferredLocation.trim() || 'Not Specified',
      source: `Home Page Dedicated Inquiry Form (${formData.course})`,
      budget: formData.budget || 'Not Specified',
      course: formData.course,
      score: formData.score.trim() || undefined,
      message: formData.message.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      const result = await submitLead(leadPayload);
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('idle');
        alert(`Form submission failed: ${result.error || 'Please try again.'}`);
      }
    } catch (err) {
      setStatus('idle');
      alert('An unexpected error occurred. Please try again or connect directly via WhatsApp.');
    }
  };

  return (
    <section id="inquiry-section" className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-slate-900 via-[#07152B] to-[#0B1E38] text-white overflow-hidden border-t border-b border-blue-900/40">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 backdrop-blur-md shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span>Direct Admissions &amp; Counseling Hub 2027</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Get Your Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-amber-300">Profile Evaluation</span> &amp; Shortlist
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-blue-100/80 leading-relaxed font-normal">
            Directly connect with <strong>Mohit Jain</strong> (IIM Bangalore &amp; FMS Delhi certified) for 1-on-1 college mapping, verified fee audits, form combo discounts, and cutoffs.
          </p>
        </div>

        {/* Two Column Layout: Left Credibility / Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Mentorship Credibility & Benefits */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-amber-500/20 ring-4 ring-white/10">
                  MJ
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl font-bold text-white">Mohit Jain</h3>
                    <BadgeCheck className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-xs text-amber-300 font-semibold">Chief Admissions Mentor &amp; Career Strategist</p>
                  <p className="text-[11px] text-blue-200/70 mt-0.5">Certified by IIM Bangalore &amp; FMS Delhi</p>
                </div>
              </div>

              {/* Mentorship Guarantee Points */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Dream / Target / Safe College Mapping</h4>
                    <p className="text-xs text-blue-100/70 mt-0.5 leading-relaxed">
                      Custom shortlisting matching your academic percentages, entrance scores (CAT/XAT/NMAT/SNAP/CET), and budget.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Save Up to ₹5,000+ on Application Forms</h4>
                    <p className="text-xs text-blue-100/70 mt-0.5 leading-relaxed">
                      Access verified institutional combo discount vouchers for 55+ premier business schools across India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">1-on-1 Google Meet &amp; GD-PI Mentoring</h4>
                    <p className="text-xs text-blue-100/70 mt-0.5 leading-relaxed">
                      Mock interviews, personal interview answer frameworks, and case study discussion strategies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">100% Genuine &amp; Non-Biased Fee Audits</h4>
                    <p className="text-xs text-blue-100/70 mt-0.5 leading-relaxed">
                      Transparent placement statistics, real median CTCs, hostel fees, and ROI payback analysis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Fast WhatsApp Connect Card */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20to%20evaluate%20my%20MBA%2FCollege%20admission%20profile%20urgently"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>Chat on WhatsApp Directly (+91 95600 20771)</span>
                </a>
              </div>
            </div>

            {/* Micro Stats Banner */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5">
                <div className="text-xl font-black text-amber-300">5,000+</div>
                <div className="text-[11px] font-medium text-blue-200/80">Students Mentored</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5">
                <div className="text-xl font-black text-emerald-400">4.9 / 5.0</div>
                <div className="text-[11px] font-medium text-blue-200/80">Student Rating</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5">
                <div className="text-xl font-black text-cyan-300">&lt; 24 Hrs</div>
                <div className="text-[11px] font-medium text-blue-200/80">Callback SLA</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Admission Inquiry Form */}
          <div className="lg:col-span-7">
            {status === 'success' ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-white via-slate-50 to-blue-50/40 p-8 sm:p-12 text-slate-900 text-center shadow-2xl border border-white/40 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30 ring-8 ring-emerald-100 animate-bounce">
                  <CheckCircle2 className="w-11 h-11 stroke-[2.5]" />
                </div>

                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-4 border border-emerald-200">
                  <Sparkles className="w-4 h-4 text-emerald-600" /> Inquiry Successfully Submitted!
                </span>

                <h3 className="font-display text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                  Thank You, {formData.name.split(' ')[0] || 'Aspirant'}!
                </h3>

                <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed font-normal">
                  Mohit Jain and our senior admissions counseling team have received your profile for <strong className="text-blue-600">{formData.course}</strong>. We will review your target colleges and connect with you shortly.
                </p>

                <div className="w-full max-w-md space-y-3">
                  <a
                    href={`https://wa.me/919560020771?text=${encodeURIComponent(`Hi Mohit Sir, I just submitted an inquiry on the portal for ${formData.course}. My name is ${formData.name}. Please review my profile!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5 fill-white/20" />
                    <span>Instant WhatsApp Connect</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        number: '',
                        email: '',
                        location: '',
                        preferredLocation: '',
                        budget: '',
                        course: 'MBA / PGDM',
                        score: '',
                        message: ''
                      });
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 sm:p-10 text-slate-900 shadow-2xl border border-white/20 relative overflow-hidden">
                {/* Top Accent Gradient Bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 to-amber-500" />

                <div className="mb-6 pt-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider border border-blue-200">
                      <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-500" /> Fast Response Priority
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Free 2027 Admissions Audit
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Submit Student Admission Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill in your details below. Our team will verify cutoffs, seat availability, and scholarships.
                  </p>
                </div>

                {/* Course Selection Chips */}
                <div className="mb-6">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    Select Target Stream / Degree <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {popularCourses.map((c) => {
                      const isSelected = formData.course === c;
                      return (
                        <button
                          type="button"
                          key={c}
                          onClick={() => setFormData({ ...formData, course: c })}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-[1.02] ring-2 ring-blue-400/40'
                              : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/80'
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      WhatsApp Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-700 text-xs font-bold">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile"
                        value={formData.number}
                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                        className="w-full h-11 px-3.5 rounded-r-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Estimated Budget Range */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Estimated Budget Range
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="">Select Budget Preference</option>
                        {BUDGET_OPTIONS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Current City */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Your Current City / State
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Delhi NCR, Pune, Jaipur"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value, preferredLocation: e.target.value })}
                        className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Entrance Score or Percentile */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Entrance Exam Score / %ile (Optional)
                    </label>
                    <div className="relative">
                      <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. CAT 88%ile, NMAT 220, or Appearing"
                        value={formData.score}
                        onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                        className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Specific Query / Target Colleges */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Specific Questions / Target Colleges (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <textarea
                        rows={2}
                        placeholder="e.g. Seeking direct admission assistance, fee discount vouchers, or best ROI B-schools in Pune/Delhi..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full h-13 sm:h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Submitting Your Profile...
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                      <span>Request Free Profile Assessment &amp; Shortlist</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Bottom Trust Indicators */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-slate-500 text-[11px] font-semibold">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Free &amp; Zero Spam Guarantee
                  </span>
                  <span>⚡ Priority Callback within 24 Hours</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
