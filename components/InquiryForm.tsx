'use client';

import { useState } from 'react';
import { BUDGET_OPTIONS, COURSE_OPTIONS } from '@/lib/constants';
import { submitLead } from '@/lib/leads';
import { 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
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
  Check
} from 'lucide-react';

export interface InquiryFormProps {
  variant?: 'full' | 'compact' | 'sidebar';
  source?: string;
  className?: string;
  hideHeader?: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

const POPULAR_COURSES = [
  'MBA / PGDM',
  'Executive MBA',
  'BTech',
  'BBA',
  'BCA',
  'Online MBA',
  'Abroad Education'
];

export function InquiryForm({
  variant = 'full',
  source,
  className = '',
  hideHeader = false,
  title,
  subtitle,
  buttonText
}: InquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    location: '',
    preferredLocation: '',
    budget: '',
    course: 'MBA / PGDM',
    message: ''
  });

  const isSidebar = variant === 'sidebar' || variant === 'compact';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.number || !formData.email) {
      alert('Please fill out all required fields (Name, WhatsApp Phone, and Email).');
      return;
    }

    const cleanPhone = formData.number.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setStatus('submitting');

    const leadSource = source || `Direct Inquiry (${formData.course || 'MBA'}) - ${variant}`;

    const leadPayload = {
      name: formData.name.trim(),
      number: cleanPhone,
      email: formData.email.trim(),
      location: formData.location.trim() || 'Not Specified',
      source: leadSource,
      budget: formData.budget || 'Not Specified',
      preferredLocation: formData.preferredLocation.trim() || 'Not Specified',
      course: formData.course || 'MBA / PGDM',
      message: formData.message.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      const result = await submitLead(leadPayload);

      if (result.success) {
        setStatus('success');
      } else {
        setStatus('idle');
        alert(`Form submission failed: ${result.error || 'Please check your connection or try again later.'}`);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setStatus('idle');
      alert(`Form submission failed: ${errorMsg}`);
    }
  };

  /* ── SUCCESS STATE WITH MODERN CURVED CARDS ── */
  if (status === 'success') {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/40 border-2 border-emerald-500/30 p-6 md:p-8 rounded-3xl shadow-xl shadow-emerald-500/10 text-center animate-in fade-in zoom-in-95 duration-400 ${className}`}>
        {/* Decorative Top Accent Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-100 animate-bounce">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-2.5 border border-emerald-300/60">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Request Verified &amp; Queued
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
          We&apos;re On It, {formData.name.split(' ')[0] || 'Aspirant'}!
        </h3>
        
        <p className="text-slate-600 text-sm font-medium mb-6 max-w-md mx-auto leading-relaxed">
          Mohit Jain&apos;s senior admissions mentorship team has received your profile for <strong className="text-slate-900 font-bold">{formData.course || 'Admissions'}</strong>. We will review your best-fit colleges and connect within 24 business hours.
        </p>

        {/* Quick Highlights Pill Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm">
            <Check className="w-3.5 h-3.5 text-emerald-600" /> Free Profile Evaluation
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm">
            <Clock className="w-3.5 h-3.5 text-blue-600" /> Fast Callback
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-500" /> 100% Verified Seats
          </span>
        </div>

        <div className="space-y-3 pt-4 border-t border-emerald-100 max-w-sm mx-auto">
          <a
            href={`https://wa.me/919560020771?text=${encodeURIComponent(`Hi Mohit Sir, I just submitted an inquiry for ${formData.course || 'B-School Counselling'}. My name is ${formData.name}. Please review my profile!`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3.5 px-6 rounded-2xl text-sm shadow-md shadow-emerald-600/30 hover:shadow-lg hover:shadow-emerald-600/40 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            Chat Instantly on WhatsApp
          </a>

          <button
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
                message: ''
              });
            }}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  /* ── SIDEBAR / COMPACT VARIANT ── */
  if (isSidebar) {
    return (
      <form onSubmit={handleSubmit} className={`bg-white rounded-3xl border border-slate-200/80 p-5 md:p-6 shadow-lg shadow-slate-900/5 space-y-4 ${className}`}>
        {!hideHeader && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-500/20">
                <Sparkles className="w-3 h-3" /> 100% Free Consultation
              </span>
              <span className="text-[11px] font-bold text-slate-500">2027 Intake</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
              {title || 'Request Admissions Callback'}
            </h3>
            {subtitle && (
              <p className="text-xs font-semibold text-slate-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Quick Course Selector Pills */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
            Select Interested Course
          </label>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_COURSES.slice(0, 5).map((courseName) => {
              const isSelected = formData.course === courseName;
              return (
                <button
                  type="button"
                  key={courseName}
                  onClick={() => setFormData({ ...formData, course: courseName })}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {courseName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="name-sb" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="name-sb"
              name="name"
              required
              aria-required="true"
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="number-sb" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            WhatsApp Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex">
            <span className="inline-flex items-center px-3 rounded-l-2xl border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-xs font-bold">
              +91
            </span>
            <input
              id="number-sb"
              name="number"
              required
              aria-required="true"
              type="tel"
              placeholder="10-digit mobile number"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-r-2xl px-3.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email-sb" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="email-sb"
              name="email"
              required
              aria-required="true"
              type="email"
              placeholder="rahul@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Budget Dropdown */}
        <div>
          <label htmlFor="budget-sb" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Estimated Budget Range
          </label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              id="budget-sb"
              name="budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3.5 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 cursor-pointer"
            >
              <option value="">Select Budget Range</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location-sb" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Current / Target City
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="location-sb"
              name="location"
              type="text"
              placeholder="e.g. Delhi NCR, Pune, Mumbai"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value, preferredLocation: e.target.value })}
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={status === 'submitting'}
          type="submit"
          className="w-full mt-2 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Submitting Request...
            </span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              {buttonText || 'Request Callback Now →'}
            </>
          )}
        </button>

        <p className="text-[10px] font-semibold text-slate-500 text-center flex items-center justify-center gap-1 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" /> 100% Free &amp; Confidential • Direct Mentor Connect
        </p>
      </form>
    );
  }

  /* ── FULL / STANDALONE PAGE & MODAL VARIANT ── */
  return (
    <form onSubmit={handleSubmit} className={`relative bg-white rounded-3xl md:rounded-[2.25rem] border border-slate-200/90 p-6 md:p-10 shadow-xl shadow-slate-900/5 ${className}`}>
      {!hideHeader && (
        <div className="mb-8 border-b border-slate-100 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider border border-blue-200/70">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Priority Admission Advisory
            </span>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live 2027 Admissions Open
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {title || 'Get Personalized Career & College Guidance'}
          </h2>
          {subtitle ? (
            <p className="text-sm font-semibold text-slate-500 mt-1.5">{subtitle}</p>
          ) : (
            <p className="text-sm font-semibold text-slate-500 mt-1.5">
              Share your score/profile. Mohit Jain &amp; team will evaluate your chances for top B-Schools and Degree programs.
            </p>
          )}
        </div>
      )}

      {/* Course Quick Selector Chips */}
      <div className="mb-7">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          Select Your Target Program / Course <span className="text-rose-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {COURSE_OPTIONS.map((opt) => {
            const isSelected = formData.course === opt;
            return (
              <button
                type="button"
                key={opt}
                onClick={() => setFormData({ ...formData, course: opt })}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="name"
              name="name"
              required
              aria-required="true"
              type="text"
              autoComplete="name"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* WhatsApp Phone */}
        <div className="space-y-1.5">
          <label htmlFor="number" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            WhatsApp Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex">
            <span className="inline-flex items-center px-3.5 rounded-l-2xl border border-r-0 border-slate-200 bg-slate-100 text-slate-700 text-xs font-bold">
              +91
            </span>
            <input
              id="number"
              name="number"
              required
              aria-required="true"
              type="tel"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="w-full h-12 bg-slate-50 border border-slate-200 rounded-r-2xl px-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="email"
              name="email"
              required
              aria-required="true"
              type="email"
              autoComplete="email"
              placeholder="rahul@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Budget Range */}
        <div className="space-y-1.5">
          <label htmlFor="budget" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Estimated Budget Range
          </label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 cursor-pointer"
            >
              <option value="">Select Budget Range</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current City */}
        <div className="space-y-1.5">
          <label htmlFor="location" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Your Current City / State
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. New Delhi, Noida"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Preferred Study Location */}
        <div className="space-y-1.5">
          <label htmlFor="preferredLocation" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Preferred Study Location / Region
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="preferredLocation"
              name="preferredLocation"
              type="text"
              placeholder="e.g. Pune, Delhi NCR, Bangalore, Mumbai"
              value={formData.preferredLocation}
              onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
              className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Query / Goal Notes */}
        <div className="space-y-1.5 md:col-span-2">
          <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Specific Goal, Exam Percentile or Question (Optional)
          </label>
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <textarea
              id="message"
              name="message"
              rows={2}
              placeholder="e.g. Target CAT score, direct admission inquiries, scholarship questions..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* CTA Button with Smooth Curved Edges & Dynamic Hover */}
      <button
        disabled={status === 'submitting'}
        type="submit"
        className="w-full h-14 md:h-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-2xl md:rounded-[1.25rem] text-base md:text-lg font-black uppercase tracking-wider shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
      >
        {status === 'submitting' ? (
          <span className="flex items-center gap-2.5">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing Your Profile...
          </span>
        ) : (
          <>
            <Send className="w-5 h-5 text-amber-300" />
            {buttonText || 'Get Free Profile Evaluation & Callback'}
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Footer Trust Guarantees */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-slate-500 text-xs font-semibold">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Free &amp; Confidential
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-500" /> Mentored by IIM &amp; FMS Alumni
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-blue-600" /> Fast Response &lt; 24h
        </span>
      </div>
    </form>
  );
}
