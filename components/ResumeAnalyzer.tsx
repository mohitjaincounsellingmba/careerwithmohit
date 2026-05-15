"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  Briefcase, 
  Award, 
  Target, 
  Zap, 
  MapPin, 
  Download, 
  RefreshCw,
  Layout,
  User,
  GraduationCap,
  Code
} from 'lucide-react';

// --- Types ---
interface AuditSection {
  title: string;
  score: number;
  feedback: string[];
  status: 'good' | 'warning' | 'critical';
}

interface AuditResult {
  score: number;
  sections: AuditSection[];
  suggestions: string[];
}

interface JobSuggestion {
  company: string;
  role: string;
  location: string;
  skills: string[];
  type: 'Freshers' | 'Experienced';
}

// --- Data ---
const TOP_COMPANIES: JobSuggestion[] = [
  { company: 'Google', role: 'Software Engineer', location: 'Bangalore, India', skills: ['React', 'Node.js', 'Cloud'], type: 'Experienced' },
  { company: 'TCS', role: 'System Engineer', location: 'Pune, India', skills: ['Java', 'SQL', 'SDLC'], type: 'Freshers' },
  { company: 'Zomato', role: 'Product Manager', location: 'Gurgaon, India', skills: ['Strategy', 'Data Analysis', 'User Research'], type: 'Experienced' },
  { company: 'Infosys', role: 'Associate Consultant', location: 'Hyderabad, India', skills: ['Communication', 'Python', 'Basic Coding'], type: 'Freshers' },
  { company: 'Microsoft', role: 'Azure Specialist', location: 'Noida, India', skills: ['Azure', 'Security', 'Architecture'], type: 'Experienced' },
  { company: 'HCLTech', role: 'Graduate Trainee', location: 'Chennai, India', skills: ['C++', 'Logic', 'English'], type: 'Freshers' },
  { company: 'Amazon', role: 'SDE-I', location: 'Bangalore, India', skills: ['DSA', 'System Design', 'Linux'], type: 'Freshers' },
  { company: 'Flipkart', role: 'Marketing Lead', location: 'Bangalore, India', skills: ['Growth', 'SEO', 'Ads'], type: 'Experienced' },
];

export default function ResumeAnalyzer() {
  const [activeTab, setActiveTab] = useState<'audit' | 'builder' | 'jobs'>('audit');
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [userLocation, setUserLocation] = useState('Delhi NCR');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  
  // --- File Upload Handler ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setUploadStatus('uploading');
      
      // Simulate reading/extracting text from PDF
      setTimeout(() => {
        setUploadStatus('success');
        // In a real app, you'd use pdf.js here. 
        // For this tool, we'll simulate extraction by setting a placeholder text 
        // that encourages the user or provides a base for the audit.
        setResumeText(`[FILE: ${file.name}]\n\nResume content extracted from PDF. (In production, this uses OCR/Text extraction). \n\nKeywords: Experience, Education, Skills, Project, Management, Leadership.`);
      }, 1500);
    } else {
      setUploadStatus('error');
      alert('Please upload a valid PDF file.');
    }
  };

  // --- Audit Logic ---
  const performAudit = () => {
    if (!resumeText.trim() && !uploadedFile) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const text = resumeText.toLowerCase();
      const sections: AuditSection[] = [];
      let totalScore = 0;

      // 1. Contact Info Check
      const hasEmail = /[\w\.-]+@[\w\.-]+\.\w+/.test(text);
      const hasPhone = /\d{10}/.test(text);
      const contactScore = (hasEmail ? 50 : 0) + (hasPhone ? 50 : 0);
      sections.push({
        title: 'Contact Information',
        score: contactScore,
        status: contactScore === 100 ? 'good' : (contactScore > 0 ? 'warning' : 'critical'),
        feedback: [
          hasEmail ? '✓ Email address found.' : '✗ Email address missing.',
          hasPhone ? '✓ Phone number found.' : '✗ Phone number missing.',
          'Tip: Include your LinkedIn profile for 15% higher callback rate.'
        ]
      });

      // 2. Section Headings Check
      const hasExp = text.includes('experience') || text.includes('work') || text.includes('employment');
      const hasEdu = text.includes('education') || text.includes('qualification');
      const hasSkills = text.includes('skills') || text.includes('expertise');
      const sectionCount = [hasExp, hasEdu, hasSkills].filter(Boolean).length;
      const sectionScore = (sectionCount / 3) * 100;
      sections.push({
        title: 'Resume Structure',
        score: Math.round(sectionScore),
        status: sectionScore === 100 ? 'good' : (sectionScore > 50 ? 'warning' : 'critical'),
        feedback: [
          hasExp ? '✓ Work Experience section detected.' : '✗ Work Experience section missing.',
          hasEdu ? '✓ Education section detected.' : '✗ Education section missing.',
          hasSkills ? '✓ Skills section detected.' : '✗ Skills section missing.'
        ]
      });

      // 3. Keywords & ATS Optimization
      const keywords = ['achieved', 'managed', 'developed', 'led', 'strategic', 'increased', 'solved', 'python', 'javascript', 'project'];
      const foundKeywords = keywords.filter(k => text.includes(k));
      const keywordScore = (foundKeywords.length / keywords.length) * 100;
      sections.push({
        title: 'ATS & Keywords',
        score: Math.round(keywordScore),
        status: keywordScore > 70 ? 'good' : (keywordScore > 40 ? 'warning' : 'critical'),
        feedback: [
          `Found ${foundKeywords.length} power words/keywords.`,
          foundKeywords.length < 5 ? 'Suggestion: Use more action verbs like "Achieved", "Spearheaded", "Optimized".' : 'Great use of impact-focused language.',
          'Avoid using images or complex graphics in your CV for better ATS scanning.'
        ]
      });

      // 4. Length Check
      const wordCount = resumeText.split(/\s+/).length;
      let lengthScore = 100;
      let lengthFeedback = 'Perfect length for a standard resume.';
      if (wordCount < 200) {
        lengthScore = 50;
        lengthFeedback = 'Your resume seems too short. Aim for at least 300-500 words.';
      } else if (wordCount > 1000) {
        lengthScore = 70;
        lengthFeedback = 'Your resume is quite long. Try to keep it within 2 pages.';
      }
      sections.push({
        title: 'Length & Readability',
        score: lengthScore,
        status: lengthScore === 100 ? 'good' : 'warning',
        feedback: [
          `Word count: ${wordCount} words.`,
          lengthFeedback
        ]
      });

      totalScore = Math.round(sections.reduce((acc, s) => acc + s.score, 0) / sections.length);

      setAuditResult({
        score: totalScore,
        sections,
        suggestions: [
          'Add a professional summary at the top to highlight your value proposition.',
          'Quantify your achievements (e.g., "Increased sales by 20%" instead of "Helped in sales").',
          'Use a clean, single-column layout for maximum ATS compatibility.'
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header section with glassmorphism */}
      <div className="relative pt-12 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-500 opacity-90"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold mb-6 animate-fade-in">
            <Zap size={16} className="text-yellow-400" />
            <span>AI-Powered Career Toolkit</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-sm">
            Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-emerald-300">Mastery</span> Hub
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Scan your resume for ATS compliance, get a professional audit, and build a high-conversion CV in minutes.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 mb-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap border-b border-slate-100 bg-slate-50/50">
            <button 
              onClick={() => setActiveTab('audit')}
              className={`flex-1 flex items-center justify-center gap-2 py-5 text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'audit' ? 'bg-white text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <FileText size={18} /> Resume Audit
            </button>
            <button 
              onClick={() => setActiveTab('builder')}
              className={`flex-1 flex items-center justify-center gap-2 py-5 text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'builder' ? 'bg-white text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Layout size={18} /> ATS Builder
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`flex-1 flex items-center justify-center gap-2 py-5 text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'jobs' ? 'bg-white text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Briefcase size={18} /> Job Matches
            </button>
          </div>

          <div className="p-8 md:p-12">
            {/* AUDIT TAB */}
            {activeTab === 'audit' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Search size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-800">Scan Your Resume</h2>
                      <p className="text-slate-500 font-medium">Paste your CV text below for a complete audit.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="relative group cursor-pointer">
                      <input 
                        type="file" 
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                      <div className={`h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${uploadStatus === 'success' ? 'bg-emerald-50 border-emerald-500' : 'bg-slate-50 border-slate-200 group-hover:bg-white group-hover:border-primary'}`}>
                        {uploadStatus === 'uploading' ? (
                          <RefreshCw className="animate-spin text-primary" size={24} />
                        ) : uploadStatus === 'success' ? (
                          <>
                            <CheckCircle className="text-emerald-500 mb-2" size={24} />
                            <span className="text-[10px] font-black uppercase text-emerald-700">{uploadedFile?.name}</span>
                          </>
                        ) : (
                          <>
                            <Download className="text-slate-400 mb-2 group-hover:text-primary transition-colors" size={24} />
                            <span className="text-[10px] font-black uppercase text-slate-500">Upload PDF</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center bg-slate-50 rounded-2xl p-4 border border-slate-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                       <p className="text-sm font-bold text-slate-700">
                         {uploadStatus === 'idle' ? 'Ready for scan' : uploadStatus === 'uploading' ? 'Extracting text...' : 'Ready for Audit'}
                       </p>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <textarea 
                      className="w-full h-64 p-6 rounded-2xl border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-slate-700 font-medium leading-relaxed bg-slate-50 group-hover:bg-white"
                      placeholder="Or paste your Resume / CV content here..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                    ></textarea>
                    {resumeText && (
                      <button 
                        onClick={() => {
                          setResumeText('');
                          setUploadedFile(null);
                          setUploadStatus('idle');
                        }}
                        className="absolute top-4 right-4 p-2 rounded-full bg-slate-200 hover:bg-red-100 hover:text-red-600 transition-colors"
                      >
                        <RefreshCw size={14} />
                      </button>
                    )}
                  </div>

                  <button 
                    onClick={performAudit}
                    disabled={isAnalyzing || !resumeText.trim()}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${isAnalyzing || !resumeText.trim() ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-primary text-white hover:scale-[1.02] shadow-xl shadow-primary/20'}`}
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="animate-spin" size={20} />
                        Analyzing Content...
                      </>
                    ) : (
                      <>
                        <Target size={20} />
                        Get Free Audit Report
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  {auditResult ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div>
                            <p className="text-primary font-black uppercase tracking-widest text-xs mb-2">Overall Quality Score</p>
                            <h3 className="text-5xl font-black mb-2">{auditResult.score}<span className="text-slate-500 text-2xl">/100</span></h3>
                            <div className="flex items-center gap-2">
                              {auditResult.score > 70 ? (
                                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-black uppercase border border-emerald-500/30">Excellent CV</span>
                              ) : auditResult.score > 40 ? (
                                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-black uppercase border border-yellow-500/30">Needs Improvement</span>
                              ) : (
                                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-black uppercase border border-red-500/30">Critical Updates</span>
                              )}
                            </div>
                          </div>
                          <div className="w-24 h-24 rounded-full border-8 border-slate-800 flex items-center justify-center relative">
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                              <circle 
                                cx="48" cy="48" r="40" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="8"
                                className="text-slate-800"
                              />
                              <circle 
                                cx="48" cy="48" r="40" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="8"
                                strokeDasharray={251}
                                strokeDashoffset={251 - (251 * auditResult.score / 100)}
                                className="text-primary"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="text-xl font-black">{auditResult.score}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {auditResult.sections.map((section, idx) => (
                          <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-primary/20 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide">{section.title}</h4>
                              {section.status === 'good' ? <CheckCircle size={18} className="text-emerald-500" /> : <AlertTriangle size={18} className={section.status === 'warning' ? 'text-yellow-500' : 'text-red-500'} />}
                            </div>
                            <div className="space-y-2">
                              {section.feedback.map((f, i) => (
                                <p key={i} className="text-xs font-medium text-slate-500 leading-relaxed">• {f}</p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                        <h4 className="font-black text-emerald-800 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                          <Award size={16} /> Top Recommendations
                        </h4>
                        <ul className="space-y-3">
                          {auditResult.suggestions.map((s, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-emerald-700">
                              <div className="mt-1 w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center shrink-0">
                                <span className="text-[10px]">{i + 1}</span>
                              </div>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 min-h-[500px]">
                      <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 transition-transform">
                        <FileText size={40} />
                      </div>
                      <h3 className="text-xl font-black text-slate-400 mb-2 uppercase tracking-widest">Audit Pending</h3>
                      <p className="text-slate-400 max-w-xs font-medium">Your detailed audit report will appear here once you scan your resume.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* BUILDER TAB */}
            {activeTab === 'builder' && (
              <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl font-black text-slate-800 mb-4 uppercase tracking-tight">ATS Friendly CV Builder</h2>
                  <p className="text-slate-500 font-medium">Create a high-impact, machine-readable resume that bypasses filters and gets you the interview.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { icon: <User />, title: 'Personal Info', desc: 'Contact, LinkedIn, Portfolio' },
                    { icon: <GraduationCap />, title: 'Education', desc: 'Degrees, Certifications, Years' },
                    { icon: <Briefcase />, title: 'Experience', desc: 'Roles, Achievements, Impact' },
                    { icon: <Code />, title: 'Tech Skills', desc: 'Tools, Languages, Frameworks' },
                    { icon: <Target />, title: 'Career Goal', desc: 'Professional Summary' },
                    { icon: <Award />, title: 'Awards', desc: 'Honors and Extra-curriculars' }
                  ].map((step, idx) => (
                    <div key={idx} className="bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-primary/30 transition-all hover:shadow-xl group cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-black text-slate-800 mb-2 uppercase tracking-wide">{step.title}</h3>
                      <p className="text-slate-500 text-sm font-medium">{step.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-900 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                  <div className="relative z-10 text-center md:text-left">
                    <h3 className="text-2xl font-black mb-4 uppercase italic">Ready to Generate?</h3>
                    <p className="text-slate-400 font-medium max-w-md">Our builder uses standardized headings and layouts preferred by Oracle, Workday, and Greenhouse ATS systems.</p>
                  </div>
                  <button className="relative z-10 px-10 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl flex items-center gap-3">
                    <Download size={20} /> Create My ATS Resume
                  </button>
                </div>
              </div>
            )}

            {/* JOBS TAB */}
            {activeTab === 'jobs' && (
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">Job Suggestions</h2>
                    <p className="text-slate-500 font-medium">Recommended companies for your profile based on current trends.</p>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200">
                    <MapPin size={20} className="text-primary" />
                    <input 
                      type="text" 
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      className="bg-transparent font-black text-slate-700 outline-none w-40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {TOP_COMPANIES.map((job, idx) => (
                    <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 hover:border-primary/20 transition-all hover:shadow-2xl shadow-lg shadow-slate-200/20 flex flex-col justify-between group">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${job.type === 'Freshers' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' : 'bg-pink-50 text-pink-600 border-pink-100'}`}>
                            {job.type}
                          </span>
                          <span className="text-slate-300 group-hover:text-primary transition-colors"><ExternalLink size={16} /></span>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-1 group-hover:text-primary transition-colors">{job.company}</h3>
                        <p className="text-slate-500 font-bold text-sm mb-4">{job.role}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {job.skills.map((skill, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-lg font-black uppercase">{skill}</span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-50 flex items-center gap-2 text-xs font-bold text-slate-400">
                        <MapPin size={12} /> {job.location}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <button className="px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all">
                    View More Opportunities
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200">
        <p className="text-center text-slate-400 font-black text-xs uppercase tracking-widest mb-10">Optimized for major ATS platforms</p>
        <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
          <span className="font-black text-xl text-slate-600">Workday</span>
          <span className="font-black text-xl text-slate-600">Taleo</span>
          <span className="font-black text-xl text-slate-600">Greenhouse</span>
          <span className="font-black text-xl text-slate-600">Lever</span>
          <span className="font-black text-xl text-slate-600">iCIMS</span>
        </div>
      </div>
    </div>
  );
}

function ExternalLink({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
