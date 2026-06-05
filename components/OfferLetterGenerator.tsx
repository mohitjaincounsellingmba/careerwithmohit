"use client";

import React, { useState, useRef } from 'react';
import { 
  FileText, Download, Printer, RefreshCw, Sparkles, Building, 
  User, Briefcase, Calendar, CheckCircle, ChevronRight
} from 'lucide-react';

interface OfferLetterTemplate {
  id: string;
  name: string;
  desc: string;
}

const TEMPLATES: OfferLetterTemplate[] = [
  { id: 'standard', name: 'Standard Formal', desc: 'Highly professional corporate layout' },
  { id: 'startup', name: 'Startup / Modern', desc: 'Friendly, warm, and growth-oriented' },
  { id: 'executive', name: 'Executive Level', desc: 'Detailed clauses for leadership roles' },
];

export default function OfferLetterGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState('standard');

  // Input states
  const [candidateName, setCandidateName] = useState('Jane Smith');
  const [jobTitle, setJobTitle] = useState('Product Marketing Manager');
  const [department, setDepartment] = useState('Marketing');
  const [ctc, setCtc] = useState('12,00,000');
  const [reportingManager, setReportingManager] = useState('Mohit Jain');
  const [startDate, setStartDate] = useState('2026-07-01');
  const [probationPeriod, setProbationPeriod] = useState('3');
  const [validityDate, setValidityDate] = useState('2026-06-15');
  const [location, setLocation] = useState('Bangalore (Hybrid)');

  // Company details
  const [companyName, setCompanyName] = useState('CareerWithMohit Consulting');
  const [companyAddress, setCompanyAddress] = useState('Block C, Sector 43, Gurgaon, HR - 122002');
  const [companyLogo, setCompanyLogo] = useState('CWM');
  const [hrName, setHrName] = useState('Mohit Jain (Founder)');

  const printAreaRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = printAreaRef.current?.innerHTML;
    if (printContent) {
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(`
          <html>
            <head>
              <title>Offer_Letter_${candidateName.replace(/\s+/g, '_')}</title>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
              <style>
                body {
                  font-family: 'Georgia', serif;
                  background: white;
                  color: black;
                  padding: 40px;
                  line-height: 1.6;
                }
                @media print {
                  body { padding: 0; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              <div class="max-w-4xl mx-auto">
                ${printContent}
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(function() { window.close(); }, 500);
                }
              </script>
            </body>
          </html>
        `);
        win.document.close();
      }
    }
  };

  const resetForm = () => {
    setCandidateName('Jane Smith');
    setJobTitle('Product Marketing Manager');
    setDepartment('Marketing');
    setCtc('12,00,000');
    setReportingManager('Mohit Jain');
    setStartDate('2026-07-01');
    setProbationPeriod('3');
    setValidityDate('2026-06-15');
    setLocation('Bangalore (Hybrid)');
    setCompanyName('CareerWithMohit Consulting');
    setCompanyAddress('Block C, Sector 43, Gurgaon, HR - 122002');
    setCompanyLogo('CWM');
    setHrName('Mohit Jain (Founder)');
  };

  // Date formatting helpers
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getLetterBody = () => {
    const formattedStartDate = formatDate(startDate);
    const formattedValidityDate = formatDate(validityDate);
    const currentDate = formatDate(new Date().toISOString().split('T')[0]);

    if (selectedTemplate === 'startup') {
      return (
        <div className="space-y-6 text-sm text-slate-800 font-sans leading-relaxed">
          <p>Hi {candidateName},</p>
          <p className="font-bold text-lg text-slate-900">We are absolutely thrilled to welcome you to the {companyName} team! 🎉</p>
          <p>
            Following our recent chats, we’re super excited to officially offer you the role of <strong>{jobTitle}</strong> in our <strong>{department}</strong> department. We were incredibly impressed by your skills, energy, and drive, and we believe you will be a fantastic culture add.
          </p>
          <p>
            Here are the details of your offer:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Role:</strong> {jobTitle}</li>
            <li><strong>Department:</strong> {department}</li>
            <li><strong>Target Start Date:</strong> {formattedStartDate}</li>
            <li><strong>Location:</strong> {location}</li>
            <li><strong>Compensation (Annual CTC):</strong> INR {ctc} per annum</li>
            <li><strong>Reporting Manager:</strong> {reportingManager}</li>
          </ul>
          <p>
            Your initial probation period will be <strong>{probationPeriod} months</strong>, during which we'll help you get up to speed and ensure we're a perfect match for one another.
          </p>
          <p>
            This offer is valid until <strong>{formattedValidityDate}</strong>. To accept, please sign and date this letter below and return a scanned copy.
          </p>
          <p className="pt-4">
            Let's build something epic together!
          </p>
          <p className="font-bold text-slate-900 mt-4">
            Cheers,<br />
            {hrName}<br />
            {companyName}
          </p>
        </div>
      );
    }

    if (selectedTemplate === 'executive') {
      return (
        <div className="space-y-6 text-xs text-slate-800 leading-relaxed text-justify" style={{ fontFamily: 'Georgia, serif' }}>
          <p className="text-right font-bold">{currentDate}</p>
          <p>
            <strong>To:</strong><br />
            {candidateName}<br />
            Candidate Address Details (As Provided)
          </p>
          <p className="font-bold text-center underline uppercase text-slate-900">
            Subject: Appointment Letter for Executive Position of {jobTitle}
          </p>
          <p>Dear {candidateName},</p>
          <p>
            With reference to your application and subsequent interviews with {companyName}, we are pleased to offer you the senior appointment of <strong>{jobTitle}</strong>.
          </p>
          <p>
            <strong>1. Compensation & Remuneration:</strong> Your Annual Gross Cost to Company (CTC) will be INR {ctc}. Detailed breakout will be provided in Annexure A. You will be eligible for executive benefits as per Company policy.
          </p>
          <p>
            <strong>2. Commencement & Reporting:</strong> Your employment will begin on or before <strong>{formattedStartDate}</strong> at our office in <strong>{location}</strong>. You will report to <strong>{reportingManager}</strong>.
          </p>
          <p>
            <strong>3. Probation & Confirmation:</strong> You will be on probation for a period of <strong>{probationPeriod} months</strong>. Based on performance metrics and evaluations, confirmation of services will be processed.
          </p>
          <p>
            <strong>4. Exclusivity & Confidentiality:</strong> You will devote whole-time attention to Company business. You agree not to engage in competing business activity, consulting, or freelancing during your tenure.
          </p>
          <p>
            This offer is subject to reference checks and background verification. Please return a signed copy of this letter on or before <strong>{formattedValidityDate}</strong> to express acceptance.
          </p>
          <p className="pt-8">
            Sincerely,<br />
            For <strong>{companyName}</strong>,<br />
            <span className="font-bold mt-4 block">{hrName}</span>
          </p>
        </div>
      );
    }

    // Default Standard Template
    return (
      <div className="space-y-6 text-sm text-slate-800 leading-relaxed text-justify" style={{ fontFamily: 'Georgia, serif' }}>
        <p className="text-right">{currentDate}</p>
        <p>
          <strong>To,</strong><br />
          {candidateName}<br />
          Candidate Address Details
        </p>
        <p className="font-bold text-center underline uppercase tracking-wide text-slate-900">
          Subject: Offer of Employment - {jobTitle}
        </p>
        <p>Dear {candidateName},</p>
        <p>
          We are pleased to offer you employment with <strong>{companyName}</strong> in the position of <strong>{jobTitle}</strong> under the following terms and conditions:
        </p>
        <p>
          <strong>Job Title & Location:</strong> You will join the company as <strong>{jobTitle}</strong> in the <strong>{department}</strong> department, based at our <strong>{location}</strong> location.
        </p>
        <p>
          <strong>Joining Date:</strong> Your target commencement date is <strong>{formattedStartDate}</strong>.
        </p>
        <p>
          <strong>Compensation:</strong> Your annual compensation package will be INR <strong>{ctc}</strong> (Indian Rupees). Details of the compensation structure will be outlined in your final employment agreement.
        </p>
        <p>
          <strong>Reporting:</strong> You will report directly to <strong>{reportingManager}</strong>.
        </p>
        <p>
          <strong>Probation Period:</strong> You will be on probation for a period of <strong>{probationPeriod} months</strong> from your date of joining.
        </p>
        <p>
          Please note that this offer is valid until <strong>{formattedValidityDate}</strong>. If you accept this offer, please sign and return the duplicate copy of this letter.
        </p>
        <p className="pt-6">
          Yours sincerely,<br />
          For <strong>{companyName}</strong>,<br />
          <span className="font-bold mt-4 block">{hrName}</span>
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header section with glassmorphism */}
      <div className="relative pt-12 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-500 opacity-90"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold mb-6">
            <Sparkles size={16} className="text-yellow-400" />
            <span>Interactive HR Toolkit</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-sm">
            Offer Letter <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-emerald-300">Generator</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Create professional, legally robust, and engaging job offer letters with custom startup, corporate, or executive templates.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 mb-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Input Controls Panel (Left) */}
            <div className="lg:col-span-5 p-8 border-r border-slate-100 bg-slate-50/50 max-h-[850px] overflow-y-auto">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                <h2 className="text-xl font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <FileText className="text-primary" size={20} /> Letter Configurator
                </h2>
                <button 
                  onClick={resetForm}
                  className="text-xs font-bold text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw size={12} /> Reset
                </button>
              </div>

              {/* Step 1: Select Template */}
              <div className="mb-6 space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Template Style</label>
                <div className="space-y-2">
                  {TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center justify-between ${selectedTemplate === tmpl.id ? 'border-primary bg-primary/5 shadow-md shadow-primary/5' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                      <div>
                        <h4 className="text-xs font-black uppercase text-slate-800">{tmpl.name}</h4>
                        <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{tmpl.desc}</p>
                      </div>
                      <ChevronRight size={14} className={selectedTemplate === tmpl.id ? 'text-primary' : 'text-slate-400'} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Company Info */}
              <div className="mb-6 space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Building size={14} /> Company Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-500">Company Name</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Logo Text</label>
                    <input 
                      type="text" 
                      maxLength={5}
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={companyLogo} 
                      onChange={(e) => setCompanyLogo(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Signatory HR Name</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={hrName} 
                      onChange={(e) => setHrName(e.target.value)} 
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-500">Office Address</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={companyAddress} 
                      onChange={(e) => setCompanyAddress(e.target.value)} 
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Candidate & Job Details */}
              <div className="mb-8 space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <User size={14} /> Candidate & Position
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Candidate Name</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={candidateName} 
                      onChange={(e) => setCandidateName(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Job Title</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={jobTitle} 
                      onChange={(e) => setJobTitle(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Department</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={department} 
                      onChange={(e) => setDepartment(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Compensation (CTC)</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={ctc} 
                      onChange={(e) => setCtc(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Start Date</label>
                    <input 
                      type="date" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={startDate} 
                      onChange={(e) => setStartDate(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Offer Expiry Date</label>
                    <input 
                      type="date" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={validityDate} 
                      onChange={(e) => setValidityDate(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Reporting Manager</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={reportingManager} 
                      onChange={(e) => setReportingManager(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Probation (Months)</label>
                    <input 
                      type="number" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={probationPeriod} 
                      onChange={(e) => setProbationPeriod(e.target.value)} 
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-500">Work Location & Style</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)} 
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <button 
                onClick={handlePrint}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] shadow-xl shadow-primary/20 transition-all"
              >
                <Printer size={18} /> Print / Export Letter
              </button>
            </div>

            {/* Live Preview Panel (Right) */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between bg-white relative">
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  Letter Template Preview
                </span>
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                  <CheckCircle size={14} /> Live Sync
                </span>
              </div>

              {/* Printable Letter Container */}
              <div 
                ref={printAreaRef} 
                className="border border-slate-300 p-12 md:p-16 bg-white text-slate-900 font-serif shadow-lg mx-auto w-full max-w-[800px] aspect-[1/1.414] min-h-[750px]"
              >
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-6 mb-8 font-sans">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 text-white font-black flex items-center justify-center text-sm rounded-lg shrink-0">
                      {companyLogo}
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase text-slate-900">{companyName}</h4>
                      <p className="text-[10px] font-bold text-slate-400">{companyAddress}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black uppercase tracking-widest border border-slate-800 px-2.5 py-0.5 rounded text-slate-800">
                      Private & Confidential
                    </span>
                  </div>
                </div>

                {/* Letter Body */}
                <div className="min-h-[420px]">
                  {getLetterBody()}
                </div>

                {/* Signature Acceptance Block */}
                <div className="mt-12 pt-8 border-t border-slate-100 font-sans text-xs text-slate-500">
                  <h4 className="font-black uppercase text-slate-800 mb-4">Acceptance of Offer</h4>
                  <p className="mb-6 leading-relaxed">
                    I accept the offer of employment as outlined above. My signature below indicates my agreement with the terms and my target start date.
                  </p>
                  <div className="grid grid-cols-2 gap-8 pt-4">
                    <div>
                      <div className="border-b border-slate-300 h-8"></div>
                      <p className="mt-2 font-bold text-slate-700">Candidate Signature</p>
                    </div>
                    <div>
                      <div className="border-b border-slate-300 h-8"></div>
                      <p className="mt-2 font-bold text-slate-700">Date Signed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Notice */}
              <div className="mt-8 text-center text-xs font-bold text-slate-400">
                You can adjust text alignment, styling, and margins by selecting different templates.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
