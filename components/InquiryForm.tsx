'use client';

import { useState } from 'react';
import { BUDGET_OPTIONS, COURSE_OPTIONS } from '@/lib/constants';
import { submitLead } from '@/lib/leads';
import { Sparkles, CheckCircle2, MessageCircle, Send, PhoneCall, ShieldCheck } from 'lucide-react';

export interface InquiryFormProps {
  variant?: 'full' | 'compact' | 'sidebar';
  source?: string;
  className?: string;
  hideHeader?: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

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
    setStatus('submitting');

    const leadSource = source || `Direct Inquiry (${formData.course || 'MBA'}) - ${variant}`;

    const leadPayload = {
      name: formData.name,
      number: formData.number,
      email: formData.email,
      location: formData.location || 'Not Specified',
      source: leadSource,
      budget: formData.budget || 'Not Specified',
      preferredLocation: formData.preferredLocation || 'Not Specified',
      course: formData.course || 'MBA / PGDM',
      message: formData.message,
      timestamp: new Date().toISOString()
    };

    const result = await submitLead(leadPayload);

    if (result.success) {
      setStatus('success');
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
    } else {
      setStatus('error');
      alert(`Form submission failed: ${result.error || 'Please check your connection or try again later.'}`);
    }
  };

  if (status === 'success') {
    return (
      <div className={`bg-emerald-50 border-4 border-foreground p-6 rounded-xl text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-in fade-in duration-300 ${className}`}>
        <div className="w-12 h-12 bg-emerald-100 border-2 border-foreground flex items-center justify-center mx-auto mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <CheckCircle2 className="w-7 h-7 text-emerald-600" />
        </div>
        <span className="bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest px-2.5 py-1 border border-foreground inline-block mb-2">
          CALLBACK REQUESTED
        </span>
        <h3 className="text-xl font-black uppercase text-foreground mb-1">We Received Your Request!</h3>
        <p className="text-slate-600 text-xs font-bold mb-5 leading-relaxed">
          Mohit Jain&apos;s counselling team will contact you on WhatsApp / Phone within 24 business hours.
        </p>

        <div className="space-y-2 pt-4 border-t-2 border-emerald-200">
          <a
            href={`https://wa.me/919811559190?text=${encodeURIComponent('Hi Mohit, I submitted an inquiry for B-School Counselling. Please share details!')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 text-xs uppercase tracking-wider border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 transition-all block text-center"
          >
            <MessageCircle className="w-4 h-4" />
            Instant WhatsApp Chat
          </a>
          <button
            onClick={() => setStatus('idle')}
            className="w-full bg-white hover:bg-slate-100 text-foreground font-black py-2.5 px-4 text-xs uppercase tracking-wider border-2 border-foreground transition-all cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  /* ── SIDEBAR / COMPACT VARIANT ── */
  if (isSidebar) {
    return (
      <form onSubmit={handleSubmit} className={`bg-white space-y-3.5 ${className}`}>
        {!hideHeader && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-accent text-foreground text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 border border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                ⚡ FREE CONSULTATION
              </span>
              <span className="text-[10px] font-bold text-slate-500">2027-28 Intake</span>
            </div>
            <h3 className="text-lg md:text-xl font-black uppercase text-foreground tracking-tight leading-tight">
              {title || 'Request B-School Callback'}
            </h3>
            {subtitle && (
              <p className="text-xs font-bold text-slate-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Full Name */}
        <div>
          <label htmlFor="name-sb" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="name-sb"
            name="name"
            required
            aria-required="true"
            type="text"
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full h-11 bg-slate-50 border-2 border-foreground px-3.5 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="number-sb" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
            WhatsApp Number <span className="text-rose-500">*</span>
          </label>
          <input
            id="number-sb"
            name="number"
            required
            aria-required="true"
            type="tel"
            placeholder="10-digit mobile number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className="w-full h-11 bg-slate-50 border-2 border-foreground px-3.5 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email-sb" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="email-sb"
            name="email"
            required
            aria-required="true"
            type="email"
            placeholder="e.g. rahul@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-11 bg-slate-50 border-2 border-foreground px-3.5 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Course Interest & Preferred Budget Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="course-sb" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
              Course Interest
            </label>
            <select
              id="course-sb"
              name="course"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full h-11 bg-slate-50 border-2 border-foreground px-2.5 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              {COURSE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="budget-sb" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
              Budget Range
            </label>
            <select
              id="budget-sb"
              name="budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full h-11 bg-slate-50 border-2 border-foreground px-2.5 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="">Select Budget</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current / Preferred Location */}
        <div>
          <label htmlFor="location-sb" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
            Current / Preferred Location
          </label>
          <input
            id="location-sb"
            name="location"
            type="text"
            placeholder="e.g. Delhi NCR, Mumbai, Bangalore"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value, preferredLocation: e.target.value })}
            className="w-full h-11 bg-slate-50 border-2 border-foreground px-3.5 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={status === 'submitting'}
          type="submit"
          className="w-full mt-2 h-12 bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase tracking-wider border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? (
            'Submitting Request...'
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              {buttonText || 'Request B-School Callback →'}
            </>
          )}
        </button>

        <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider pt-1 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" /> 100% Free &amp; Confidential • Direct Expert Advice
        </p>
      </form>
    );
  }

  /* ── FULL / STANDALONE PAGE VARIANT ── */
  return (
    <form onSubmit={handleSubmit} className={`bg-white border-4 md:border-8 border-foreground p-6 md:p-10 rounded-xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      {!hideHeader && title && (
        <div className="mb-8 border-b-4 border-foreground pb-4">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="text-sm font-bold text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm md:text-base font-black uppercase tracking-tight text-foreground">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            aria-required="true"
            type="text"
            autoComplete="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full h-14 bg-gray-50 border-4 border-foreground px-5 text-base font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Number */}
        <div className="space-y-2">
          <label htmlFor="number" className="block text-sm md:text-base font-black uppercase tracking-tight text-foreground">
            Phone / WhatsApp Number <span className="text-rose-500">*</span>
          </label>
          <input
            id="number"
            name="number"
            required
            aria-required="true"
            type="tel"
            autoComplete="tel"
            placeholder="WhatsApp Number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className="w-full h-14 bg-gray-50 border-4 border-foreground px-5 text-base font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm md:text-base font-black uppercase tracking-tight text-foreground">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            required
            aria-required="true"
            type="email"
            autoComplete="email"
            placeholder="alex@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-14 bg-gray-50 border-4 border-foreground px-5 text-base font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm md:text-base font-black uppercase tracking-tight text-foreground">
            Current Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. New Delhi"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full h-14 bg-gray-50 border-4 border-foreground px-5 text-base font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Preferred Location */}
        <div className="space-y-2">
          <label htmlFor="preferredLocation" className="block text-sm md:text-base font-black uppercase tracking-tight text-foreground">
            Preferred Study Location
          </label>
          <input
            id="preferredLocation"
            name="preferredLocation"
            type="text"
            placeholder="e.g. Bangalore, Mumbai"
            value={formData.preferredLocation}
            onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
            className="w-full h-14 bg-gray-50 border-4 border-foreground px-5 text-base font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md"
          />
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label htmlFor="budget" className="block text-sm md:text-base font-black uppercase tracking-tight text-foreground">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full h-14 bg-gray-50 border-4 border-foreground px-5 text-base font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md cursor-pointer"
          >
            <option value="">Select Budget</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Course */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="course" className="block text-sm md:text-base font-black uppercase tracking-tight text-foreground">
            Course Interest
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="w-full h-14 bg-gray-50 border-4 border-foreground px-5 text-base font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md cursor-pointer"
          >
            {COURSE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="message" className="block text-sm md:text-base font-black uppercase tracking-tight text-foreground">
            Message / Additional Details (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Tell us more about your career goals or specific questions..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-gray-50 border-4 border-foreground p-5 text-base font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-md resize-none"
          />
        </div>
      </div>

      <button
        disabled={status === 'submitting'}
        type="submit"
        className="w-full h-16 md:h-20 bg-primary text-white border-4 md:border-8 border-foreground text-xl md:text-2xl font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none flex items-center justify-center gap-3 cursor-pointer"
      >
        {status === 'submitting' ? (
          'Processing Request...'
        ) : (
          <>
            <Send className="w-6 h-6 text-accent" />
            {buttonText || 'Submit Inquiry'}
          </>
        )}
      </button>
      <div className="mt-4 text-center">
        <span className="text-[10px] font-black uppercase text-slate-400">🔒 100% Free &amp; Confidential • Direct Guidance by Mohit Jain</span>
      </div>
    </form>
  );
}

