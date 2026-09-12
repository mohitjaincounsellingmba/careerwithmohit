'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowUpRight, 
  MessageCircle, 
  ShieldCheck, 
  Monitor, 
  Users, 
  Check, 
  Sparkles,
  ArrowRight,
  User,
  Phone,
  Mail,
  Loader2
} from 'lucide-react';
import { submitLead } from '@/lib/leads';

interface CalendlyBookingWidgetProps {
  url?: string;
  className?: string;
}

const COURSES = [
  { id: 'mba-pgdm', label: 'MBA / PGDM 2027-29', badge: 'Most Popular' },
  { id: 'direct-admission', label: 'Direct Admission / Management Quota', badge: 'High Intent' },
  { id: 'cat-xat-prep', label: 'CAT / XAT / CMAT Strategy & Cutoffs' },
  { id: 'online-mba', label: 'Online MBA / Executive Degree' },
  { id: 'bba-btech', label: 'BBA / B.Tech Admissions' },
  { id: 'abroad', label: 'Study Abroad Advisory' },
];

const REASONS = [
  { id: 'shortlist', label: 'Personalized College Shortlist (Dream / Target / Safe)' },
  { id: 'low-score', label: 'Low CAT/XAT/CMAT Score Backup Options' },
  { id: 'fees-roi', label: 'College Fees vs Real Placement ROI Verification' },
  { id: 'direct-quota', label: 'Direct Institutional Quota Eligibility & Costs' },
  { id: 'gd-pi', label: 'GD-PI & Interview Preparation Blueprint' },
  { id: 'profile-audit', label: 'Complete Academic Profile & Resume Evaluation' },
];

export function CalendlyBookingWidget({
  url = 'https://calendly.com/careerwithmohit-jain/30min',
  className = '',
}: CalendlyBookingWidgetProps) {
  // Step 1 Form States
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('MBA / PGDM 2027-29');
  const [selectedReason, setSelectedReason] = useState<string>('Personalized College Shortlist (Dream / Target / Safe)');
  const [targetColleges, setTargetColleges] = useState<string>('');
  
  // Validation & Submission States
  const [formError, setFormError] = useState<string>('');
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [isStepConfirmed, setIsStepConfirmed] = useState<boolean>(false);

  // Calendly Widget States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasScriptError, setHasScriptError] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Construct embed URL with prefilled student name, email, and answers
  const buildEmbedUrl = () => {
    let base = `${url}?hide_landing_page_details=0&hide_gdpr_banner=1&primary_color=2563eb`;
    if (name.trim()) base += `&name=${encodeURIComponent(name.trim())}`;
    if (email.trim()) base += `&email=${encodeURIComponent(email.trim())}`;
    base += `&a1=${encodeURIComponent(selectedCourse)}`;
    base += `&a2=${encodeURIComponent(selectedReason + (targetColleges ? ` | Colleges: ${targetColleges}` : ''))}`;
    return base;
  };

  const [embedUrl, setEmbedUrl] = useState<string>(buildEmbedUrl());

  useEffect(() => {
    // Add Calendly CSS link if not already present
    const cssId = 'calendly-widget-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    // Add Calendly JS script if not already present
    const scriptId = 'calendly-widget-js';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const handleLoaded = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasScriptError(true);
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = handleLoaded;
      script.onerror = handleError;
      document.body.appendChild(script);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);
      return () => clearTimeout(timer);
    }

    // Listen to Calendly scheduled event postMessage
    const handleCalendlyMessage = (e: MessageEvent) => {
      if (e.data && e.data.event === 'calendly.event_scheduled') {
        // Log successful scheduled event
        submitLead({
          name: name.trim() || 'Calendly Student',
          number: phone.trim() || 'N/A',
          email: email.trim(),
          course: selectedCourse,
          message: `[Confirmed Scheduled Booking] ${selectedReason} | Colleges: ${targetColleges}`,
          source: 'Google Meet Counselling (Calendly Confirmed)',
          details: {
            status: 'Confirmed Scheduled Slot',
            course: selectedCourse,
            reason: selectedReason,
            targetColleges,
          }
        }).catch(err => console.error('Calendly scheduled event submission error:', err));
      }
    };

    window.addEventListener('message', handleCalendlyMessage);

    const failsafe = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => {
      clearTimeout(failsafe);
      window.removeEventListener('message', handleCalendlyMessage);
    };
  }, [name, phone, email, selectedCourse, selectedReason, targetColleges]);

  // Handle Step 1 Confirmation & Lead Logging
  const handleConfirmStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const cleanName = name.trim();
    const rawDigits = phone.trim().replace(/\D/g, '');
    const cleanPhone = rawDigits.length >= 10 ? rawDigits.slice(-10) : rawDigits;

    if (!cleanName) {
      setFormError('Please enter your full name');
      return;
    }

    if (!cleanPhone || cleanPhone.length !== 10) {
      setFormError('Please enter a valid 10-digit WhatsApp mobile number');
      return;
    }

    setIsSubmittingLead(true);

    try {
      // 1. Immediately log lead into Google Sheets / Activepieces webhook
      await submitLead({
        name: cleanName,
        number: cleanPhone,
        phone: cleanPhone,
        email: email.trim(),
        location: 'Online Consultation',
        preferredLocation: 'Online',
        budget: 'Not Specified',
        course: selectedCourse,
        program: selectedCourse,
        message: `Course: ${selectedCourse} | Purpose: ${selectedReason}${targetColleges ? ` | Colleges: ${targetColleges}` : ''}`,
        source: 'Inquiry - Face-to-Face Google Meet Booking',
        details: {
          targetCourse: selectedCourse,
          primaryReason: selectedReason,
          targetColleges: targetColleges.trim(),
          sessionType: '1-on-1 Google Meet (30 Mins)',
        }
      });

      // 2. Update Calendly prefill URL with the verified student details
      setEmbedUrl(buildEmbedUrl());
      setIsStepConfirmed(true);

      // 3. Smooth scroll to the Calendly slot calendar
      setTimeout(() => {
        calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err: any) {
      console.warn('Lead submission warning:', err);
      // Still allow student to proceed to Calendly calendar even if network glitched
      setIsStepConfirmed(true);
      calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      
      {/* STEP 1: Interactive Course, Purpose & Contact Information */}
      <form onSubmit={handleConfirmStep} className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#0A1E3D] text-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Step 1 of 2</span>
              <span className="text-blue-300">•</span>
              <span className="text-white font-bold">Confirm Course &amp; Contact Details</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-1 rounded-full">
              <Video className="w-3.5 h-3.5" />
              <span>1-on-1 Google Meet Video Call</span>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mt-3">
            Tell Mohit What You Need Guidance On
          </h3>
          <p className="text-xs text-blue-200/80 mt-1 leading-relaxed">
            Your selections and contact details are sent directly to Mohit Jain so he prepares your customized cutoff sheet and B-school roadmap before the call.
          </p>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Contact Details Row (Name & WhatsApp) */}
          <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center justify-between">
              <span>Your Contact Details (For Meeting Link &amp; WhatsApp Alert):</span>
              <span className="text-[11px] text-blue-600 font-semibold normal-case">Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Name Input */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* WhatsApp Number Input */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  WhatsApp Number * (For Meeting Link)
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-700 text-xs font-bold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-r-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              {/* Email Input (Optional) */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="e.g. rahul@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {formError && (
              <p className="text-xs text-red-600 font-semibold flex items-center gap-1.5 mt-1">
                <span>⚠️</span>
                <span>{formError}</span>
              </p>
            )}
          </div>

          {/* 1. Target Course Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Select Target Course / Admission Type:</span>
              <span className="text-[11px] text-blue-600 font-semibold normal-case">Required</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COURSES.map((course) => {
                const isSelected = selectedCourse === course.label;
                return (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => {
                      setSelectedCourse(course.label);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30'
                        : 'bg-slate-50/80 hover:bg-slate-100/80 text-slate-700 border-slate-200/80'
                    }`}
                  >
                    <span>{course.label}</span>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-white shrink-0 ml-2" />
                    ) : course.badge ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200 shrink-0 ml-2">
                        {course.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Primary Reason / Topic Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Primary Reason for Counselling Call:</span>
              <span className="text-[11px] text-blue-600 font-semibold normal-case">Required</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {REASONS.map((reason) => {
                const isSelected = selectedReason === reason.label;
                return (
                  <button
                    key={reason.id}
                    type="button"
                    onClick={() => {
                      setSelectedReason(reason.label);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/30'
                        : 'bg-slate-50/80 hover:bg-slate-100/80 text-slate-700 border-slate-200/80'
                    }`}
                  >
                    <span className="leading-snug">{reason.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Optional Target Colleges Note */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Target Colleges or Specific Questions (Optional):</span>
              <span className="text-[11px] text-slate-400 font-normal normal-case">Helps mentor prepare</span>
            </label>
            <input
              type="text"
              placeholder="e.g., SIBM Pune, NMIMS Mumbai, TAPMI, BIMTECH, Great Lakes, etc."
              value={targetColleges}
              onChange={(e) => setTargetColleges(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Confirmed Summary Bar & Submit Button */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left w-full sm:w-auto">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Selected Agenda:</div>
              <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{selectedCourse}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 font-medium truncate max-w-[220px] sm:max-w-[300px]">{selectedReason}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingLead}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-75"
            >
              {isSubmittingLead ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Agenda &amp; Loading Calendar...</span>
                </>
              ) : (
                <>
                  <span>Save Details &amp; Pick Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* GOOGLE MEET FACE-TO-FACE TRUST BOX */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white rounded-3xl p-5 sm:p-6 border border-slate-700/60 shadow-lg">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Why Students &amp; Parents Trust Google Meet Counselling</span>
              <span className="text-[10px] font-black bg-emerald-400 text-slate-950 px-2 py-0.2 rounded-full uppercase">
                100% Genuine
              </span>
            </h4>
            <p className="text-xs text-slate-400">Direct mentorship call without middlemen or sales agents</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Face-to-Face with Mohit</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              You talk directly with Mohit Jain (IIM-B &amp; FMS certified), not a junior telemarketer or call center agent.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="flex items-center gap-2 text-blue-300 font-bold mb-1">
              <Monitor className="w-4 h-4 shrink-0" />
              <span>Live Screen Sharing</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Verify real college cutoff sheets, actual placement records, and institutional quota fee structures live on screen.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="flex items-center gap-2 text-emerald-300 font-bold mb-1">
              <Users className="w-4 h-4 shrink-0" />
              <span>Parents Welcome</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Parents can join the Google Meet video link from phone or laptop to clear all doubts regarding budget and safety.
            </p>
          </div>
        </div>
      </div>

      {/* STEP 2: Live Calendly Scheduling Widget */}
      <div 
        id="live-calendly-picker" 
        ref={calendarRef} 
        className="relative w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden scroll-mt-20"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white">Step 2: Pick Your Preferred Date &amp; Time</span>
            <span className="text-blue-300 hidden sm:inline">•</span>
            <span className="text-blue-200 hidden sm:inline">{selectedCourse}</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              30 Mins
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              FREE
            </span>
          </div>
        </div>

        {/* Selected Context Reminder Banner */}
        <div className="bg-blue-50/90 border-b border-blue-100 px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-blue-900">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-blue-700 shrink-0">Confirmed Agenda:</span>
            <span className="font-semibold">{selectedCourse}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-700 truncate">{selectedReason}</span>
          </div>
          {name && (
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px] bg-emerald-100/80 px-2.5 py-0.5 rounded-md border border-emerald-200">
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Saved for: {name} (+91 {phone})</span>
            </div>
          )}
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-x-0 top-24 bottom-0 bg-slate-50/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 z-10 transition-opacity duration-300">
            <div className="relative flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-2xl border-2 border-blue-600 border-t-transparent animate-spin" />
              <Video className="w-6 h-6 text-blue-600 absolute" />
            </div>
            <p className="text-sm font-bold text-slate-800">Loading Mohit's Live Schedule...</p>
            <p className="text-xs text-slate-500 mt-1">Fetching open Google Meet time slots</p>
          </div>
        )}

        {/* Script blocked fallback */}
        {hasScriptError && (
          <div className="p-8 text-center bg-amber-50/70 border-b border-amber-200">
            <ShieldAlert className="w-10 h-10 text-amber-600 mx-auto mb-2" />
            <h4 className="font-bold text-slate-900 mb-1">Calendar widget blocked by browser shield</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
              You can open Mohit's live booking page directly in a new tab or reach out instantly via WhatsApp.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md"
              >
                <span>Open Google Meet Calendar on Calendly</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20want%20to%20schedule%20a%20Face-to-Face%20video%20counselling%20session%20for%20${encodeURIComponent(selectedCourse)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Book via WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Calendly Inline Embed Element */}
        <div 
          className="calendly-inline-widget w-full"
          data-url={embedUrl}
          style={{ minWidth: '320px', height: '740px' }}
        />

        {/* Post-embed Helper Notes */}
        <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Google Meet video link is generated automatically &amp; emailed with your calendar invite.</span>
          </div>
          <a
            href={`https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20need%20urgent%20Face-to-Face%20video%20counselling%20for%20${encodeURIComponent(selectedCourse)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold shrink-0 hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Urgent query today? Message on WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
}
