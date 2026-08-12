"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Star,
  Database,
  Target,
  Handshake,
  GraduationCap,
  BarChart3,
  Send,
} from "lucide-react";

type Tab = "college" | "consultant";

const BENEFITS_COLLEGE = [
  { icon: <Target size={22} />, title: "Verified Student Leads", desc: "Receive warm, pre-screened student inquiries matched to your courses and intake requirements." },
  { icon: <Database size={22} />, title: "Rich Applicant Data", desc: "Access structured profiles — scores, budget, location, and preferred specializations." },
  { icon: <TrendingUp size={22} />, title: "Increased Enrollment", desc: "Convert high-intent traffic from 1L+ monthly visitors directly into your admission funnel." },
  { icon: <BarChart3 size={22} />, title: "Analytics Dashboard", desc: "Track lead volume, conversion rates, and campaign performance in real-time." },
];

const BENEFITS_CONSULTANT = [
  { icon: <Users size={22} />, title: "Exclusive Student Leads", desc: "Get first access to students actively seeking MBA, BBA, BTech, and PGDM admissions." },
  { icon: <Handshake size={22} />, title: "Revenue Share Model", desc: "Earn commissions on every successful admission with a transparent revenue-sharing agreement." },
  { icon: <GraduationCap size={22} />, title: "Co-Branded Resources", desc: "Use our mock tests, predictors, and guides under a white-label partnership." },
  { icon: <Star size={22} />, title: "Priority Referrals", desc: "Get featured as a Preferred Consultant Partner on our platform with badge verification." },
];

function CollegeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    collegeName: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    city: "",
    courses: "",
    intake: "",
    leadType: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("https://formspree.io/f/xpwzkoqb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, partnerType: "College" }),
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-secondary/10 border-4 border-secondary rounded-2xl p-12 text-center">
        <CheckCircle size={56} className="text-secondary mx-auto mb-4" />
        <h3 className="text-3xl font-black uppercase mb-2">Application Received!</h3>
        <p className="text-gray-600 font-bold text-lg">We'll reach out to your institution within 24 business hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">College / Institute Name *</label>
          <input name="collegeName" required value={form.collegeName} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-primary focus:outline-none transition-colors"
            placeholder="e.g. NMIMS Mumbai" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Contact Person *</label>
          <input name="contactPerson" required value={form.contactPerson} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-primary focus:outline-none transition-colors"
            placeholder="Full Name" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Designation *</label>
          <input name="designation" required value={form.designation} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-primary focus:outline-none transition-colors"
            placeholder="e.g. Admission Director" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Official Email *</label>
          <input name="email" type="email" required value={form.email} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-primary focus:outline-none transition-colors"
            placeholder="admissions@college.edu" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Phone Number *</label>
          <input name="phone" type="tel" required value={form.phone} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-primary focus:outline-none transition-colors"
            placeholder="+91 98765 43210" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">City / State *</label>
          <input name="city" required value={form.city} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-primary focus:outline-none transition-colors"
            placeholder="e.g. Mumbai, Maharashtra" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Courses Offered *</label>
          <input name="courses" required value={form.courses} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-primary focus:outline-none transition-colors"
            placeholder="e.g. MBA, PGDM, BBA, BTech" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Total Annual Intake *</label>
          <select name="intake" required value={form.intake} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-primary focus:outline-none transition-colors bg-white">
            <option value="">Select Intake Size</option>
            <option>Under 60 seats</option>
            <option>60–180 seats</option>
            <option>180–360 seats</option>
            <option>360+ seats</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Lead Type Required *</label>
          <select name="leadType" required value={form.leadType} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-primary focus:outline-none transition-colors bg-white">
            <option value="">Select Lead Requirement</option>
            <option>Qualified Student Leads (Name, Score, Contact)</option>
            <option>Raw Inquiry Data Bulk Export</option>
            <option>Direct Admission Support (Counsellor-Driven)</option>
            <option>All of the Above</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Additional Requirements</label>
        <textarea name="message" rows={4} value={form.message} onChange={handleChange}
          className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-primary focus:outline-none transition-colors resize-none"
          placeholder="Tell us about your specific partnership goals, accreditation details, or any other requirements..." />
      </div>
      <button type="submit"
        className="w-full bg-primary text-white font-black uppercase tracking-widest py-4 rounded-xl border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-3px] hover:shadow-[6px_9px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 text-sm">
        <Send size={18} /> Submit College Partnership Application
      </button>
    </form>
  );
}

function ConsultantForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firmName: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
    specialization: "",
    leadsPerMonth: "",
    partnerModel: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("https://formspree.io/f/xpwzkoqb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, partnerType: "Consultant" }),
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-secondary/10 border-4 border-secondary rounded-2xl p-12 text-center">
        <CheckCircle size={56} className="text-secondary mx-auto mb-4" />
        <h3 className="text-3xl font-black uppercase mb-2">Application Received!</h3>
        <p className="text-gray-600 font-bold text-lg">Our partnership team will connect with you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Firm / Agency Name *</label>
          <input name="firmName" required value={form.firmName} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-secondary focus:outline-none transition-colors"
            placeholder="e.g. EduReach Consultants" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Contact Person *</label>
          <input name="contactPerson" required value={form.contactPerson} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-secondary focus:outline-none transition-colors"
            placeholder="Full Name" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Email Address *</label>
          <input name="email" type="email" required value={form.email} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-secondary focus:outline-none transition-colors"
            placeholder="you@firm.com" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Phone Number *</label>
          <input name="phone" type="tel" required value={form.phone} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-secondary focus:outline-none transition-colors"
            placeholder="+91 98765 43210" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">City / Base Location *</label>
          <input name="city" required value={form.city} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-secondary focus:outline-none transition-colors"
            placeholder="e.g. Delhi, Pune" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Years of Experience *</label>
          <select name="experience" required value={form.experience} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-secondary focus:outline-none transition-colors bg-white">
            <option value="">Select Experience</option>
            <option>Less than 1 Year</option>
            <option>1–3 Years</option>
            <option>3–5 Years</option>
            <option>5+ Years</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Specialization *</label>
          <input name="specialization" required value={form.specialization} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-secondary focus:outline-none transition-colors"
            placeholder="e.g. MBA, BTech, Medical, Study Abroad" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Expected Leads / Month *</label>
          <select name="leadsPerMonth" required value={form.leadsPerMonth} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-secondary focus:outline-none transition-colors bg-white">
            <option value="">Select Volume</option>
            <option>1–20 leads/month</option>
            <option>20–50 leads/month</option>
            <option>50–100 leads/month</option>
            <option>100+ leads/month</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Preferred Partnership Model *</label>
          <select name="partnerModel" required value={form.partnerModel} onChange={handleChange}
            className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-secondary focus:outline-none transition-colors bg-white">
            <option value="">Select Model</option>
            <option>Lead Sharing (Revenue Share on Conversion)</option>
            <option>Bulk Data Purchase</option>
            <option>White-Label Resource Partnership</option>
            <option>Co-Counselling (Joint Student Sessions)</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2 text-foreground">Additional Notes</label>
        <textarea name="message" rows={4} value={form.message} onChange={handleChange}
          className="w-full border-2 border-foreground rounded-lg px-4 py-3 font-bold text-sm focus:border-secondary focus:outline-none transition-colors resize-none"
          placeholder="Tell us about your current student base, college tie-ups, or specific data requirements..." />
      </div>
      <button type="submit"
        className="w-full bg-secondary text-white font-black uppercase tracking-widest py-4 rounded-xl border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-3px] hover:shadow-[6px_9px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 text-sm">
        <Send size={18} /> Submit Consultant Partnership Application
      </button>
    </form>
  );
}

export function PartnerWithUsClient() {
  const [activeTab, setActiveTab] = useState<Tab>("college");

  const stats = [
    { value: "1L+", label: "Monthly Visitors" },
    { value: "5000+", label: "Student Inquiries/Month" },
    { value: "200+", label: "College Profiles Listed" },
    { value: "98%", label: "Lead Accuracy Rate" },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* HERO */}
      <section className="bg-foreground text-white py-20 px-6 sm:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="partner-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#partner-grid)" />
          </svg>
        </div>
        <div className="mx-auto max-w-5xl relative z-10 text-center">
          <span className="inline-block bg-primary/20 border border-primary/40 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            Strategic Partnership Program
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tighter mb-6">
            Partner{" "}
            <span className="bg-primary text-white px-4 py-1 -rotate-1 inline-block border-4 border-primary/50">
              With Us
            </span>
          </h1>
          <p className="text-xl font-bold text-gray-300 max-w-2xl mx-auto mb-10">
            Join India&apos;s fastest-growing career platform. Get verified student leads, rich admission data, and direct enrollment partnerships — built for colleges and consultants.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#partner-form"
              onClick={() => setActiveTab("college")}
              className="bg-primary text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all border-2 border-primary/50 flex items-center gap-2">
              For Colleges <Building2 size={18} />
            </a>
            <a href="#partner-form"
              onClick={() => setActiveTab("consultant")}
              className="bg-white/10 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white/20 transition-all border-2 border-white/20 flex items-center gap-2">
              For Consultants <Users size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-primary py-8 px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-black">{s.value}</div>
              <div className="text-sm font-bold text-white/80 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="py-20 px-6 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
              Why Partner With <span className="text-primary">CareerWithMohit?</span>
            </h2>
            <p className="text-gray-600 font-bold text-lg max-w-2xl mx-auto">
              We bridge the gap between aspiring students and quality institutions — creating a win-win ecosystem for admissions.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white border-4 border-foreground rounded-2xl p-2 flex gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <button
                onClick={() => setActiveTab("college")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase text-sm tracking-wider transition-all ${activeTab === "college" ? "bg-primary text-white" : "text-gray-500 hover:text-foreground"}`}>
                <Building2 size={18} /> For Colleges
              </button>
              <button
                onClick={() => setActiveTab("consultant")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase text-sm tracking-wider transition-all ${activeTab === "consultant" ? "bg-secondary text-white" : "text-gray-500 hover:text-foreground"}`}>
                <Users size={18} /> For Consultants
              </button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeTab === "college" ? BENEFITS_COLLEGE : BENEFITS_CONSULTANT).map((b, i) => (
              <div key={i}
                className={`bg-white border-4 border-foreground rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[6px_10px_0px_0px_rgba(0,0,0,1)] transition-all`}>
                <div className={`${activeTab === "college" ? "text-primary bg-primary/10" : "text-secondary bg-secondary/10"} w-12 h-12 rounded-xl flex items-center justify-center mb-4 border-2 border-foreground`}>
                  {b.icon}
                </div>
                <h3 className="font-black uppercase text-base mb-2">{b.title}</h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="partner-form" className="py-20 px-6 sm:px-12 bg-white border-t-4 border-foreground">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
              Apply for Partnership
            </h2>
            <p className="text-gray-600 font-bold text-lg">
              Fill in the relevant form below. Our team reviews all applications within 24 business hours.
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex gap-2 mb-10 border-b-4 border-foreground pb-0">
            <button
              onClick={() => setActiveTab("college")}
              className={`flex items-center gap-2 px-6 py-4 font-black uppercase text-sm tracking-wider transition-all border-t-4 border-x-4 rounded-t-xl ${activeTab === "college" ? "border-foreground bg-primary text-white -mb-1 pb-5" : "border-transparent text-gray-500 hover:text-foreground"}`}>
              <Building2 size={16} /> College / Institute
            </button>
            <button
              onClick={() => setActiveTab("consultant")}
              className={`flex items-center gap-2 px-6 py-4 font-black uppercase text-sm tracking-wider transition-all border-t-4 border-x-4 rounded-t-xl ${activeTab === "consultant" ? "border-foreground bg-secondary text-white -mb-1 pb-5" : "border-transparent text-gray-500 hover:text-foreground"}`}>
              <Users size={16} /> Consultant / Agency
            </button>
          </div>

          <div className="bg-muted border-4 border-foreground rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {activeTab === "college" ? <CollegeForm /> : <ConsultantForm />}
          </div>

          {/* Direct Contact */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919560020771"
              className="flex items-center gap-3 bg-foreground text-white px-6 py-3 rounded-xl font-black uppercase text-sm tracking-wider hover:bg-primary transition-colors">
              <Phone size={16} /> +91 95600 20771
            </a>
            <a href="mailto:info@careerwithmohit.online"
              className="flex items-center gap-3 bg-foreground text-white px-6 py-3 rounded-xl font-black uppercase text-sm tracking-wider hover:bg-secondary transition-colors">
              <Mail size={16} /> info@careerwithmohit.online
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 sm:px-12 bg-muted">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-14">
            How the <span className="text-primary">Process Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Apply", desc: "Fill the partnership form above with your institution or firm details." },
              { step: "02", title: "Review", desc: "Our team verifies your profile and assesses partnership fit within 24 hours." },
              { step: "03", title: "Agreement", desc: "We share a transparent MOU outlining lead volumes, data fields, and revenue terms." },
              { step: "04", title: "Go Live", desc: "Start receiving verified student leads and data directly to your dashboard or CRM." },
            ].map((item, i) => (
              <div key={i} className="bg-white border-4 border-foreground rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                <span className="absolute -top-4 -left-2 bg-primary text-white font-black text-lg px-3 py-1 rounded-lg border-2 border-foreground">{item.step}</span>
                <h3 className="font-black uppercase text-lg mt-4 mb-2">{item.title}</h3>
                <p className="text-gray-600 font-medium text-sm">{item.desc}</p>
                {i < 3 && <ArrowRight size={20} className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-primary z-10" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 px-6 bg-foreground text-white text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
            Ready to Grow Together?
          </h2>
          <p className="text-gray-300 font-bold mb-8 text-lg">
            Join 200+ colleges and 50+ consultant partners already leveraging CareerWithMohit for admissions growth.
          </p>
          <Link href="#partner-form"
            className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all text-sm">
            Apply Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
