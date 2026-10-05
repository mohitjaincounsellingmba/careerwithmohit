"use client";

import { useState } from "react";
import { X, Download, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { submitLead } from "@/lib/leads";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  collegeName: string;
  collegeSlug: string;
  brochureUrl?: string;
  feesText?: string;
  batch?: string;
  location?: string;
  avgPlacement?: string;
  highestPlacement?: string;
  accreditation?: string;
}

export function BrochureModal({
  isOpen,
  onClose,
  collegeName,
  collegeSlug,
  brochureUrl,
  feesText = "Contact for latest fee structure",
  batch = "2027–2029",
  location,
  avgPlacement,
  highestPlacement,
  accreditation,
}: BrochureModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("MBA / PGDM");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await submitLead({
        name,
        number: phone,
        email,
        course,
        college: collegeName,
        source: `Brochure Download (${collegeSlug})`,
        message: `Requested ${batch} Brochure & Fee Report for ${collegeName}`
      });
      
      setStatus("success");

      // Trigger brochure download or generate instant summary window
      setTimeout(() => {
        if (brochureUrl && brochureUrl !== "#" && brochureUrl.startsWith("http")) {
          window.open(brochureUrl, "_blank", "noopener,noreferrer");
        } else {
          // Generate an instant HTML/PDF printable summary window
          const win = window.open("", "_blank");
          if (win) {
            win.document.write(`
              <!DOCTYPE html>
              <html>
              <head>
                <title>${collegeName} - ${batch} Brochure & Fee Summary</title>
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; max-width: 750px; margin: 0 auto; line-height: 1.5; }
                  .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 25px; }
                  h1 { color: #0f172a; margin: 10px 0 6px; font-size: 26px; }
                  .badge { background: #eff6ff; color: #2563eb; padding: 6px 14px; border-radius: 20px; font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid #bfdbfe; }
                  .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 24px; }
                  .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
                  .row:last-child { border-bottom: none; }
                  .label { font-weight: 600; color: #64748b; }
                  .val { font-weight: 800; color: #0f172a; text-align: right; }
                  .footer { margin-top: 35px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                </style>
              </head>
              <body>
                <div class="header">
                  <span class="badge">Official ${batch} Verified Brochure Report</span>
                  <h1>${collegeName}</h1>
                  <p style="color: #64748b; margin: 0; font-size: 13px;">Prepared for <strong>${name}</strong> (${phone}) • Generated on ${new Date().toLocaleDateString()}</p>
                </div>
                <div class="box">
                  <h3 style="margin-top: 0; color: #0f172a; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Program, Fee & Placement Benchmarks</h3>
                  <div class="row">
                    <span class="label">Course Program</span>
                    <span class="val">${course}</span>
                  </div>
                  <div class="row">
                    <span class="label">Total Course Fee</span>
                    <span class="val" style="color: #16a34a;">${feesText}</span>
                  </div>
                  ${location ? `
                  <div class="row">
                    <span class="label">Campus Location</span>
                    <span class="val">${location}</span>
                  </div>` : ''}
                  ${avgPlacement ? `
                  <div class="row">
                    <span class="label">Average Placement CTC</span>
                    <span class="val" style="color: #2563eb;">${avgPlacement}</span>
                  </div>` : ''}
                  ${highestPlacement ? `
                  <div class="row">
                    <span class="label">Highest Placement CTC</span>
                    <span class="val" style="color: #d97706;">${highestPlacement}</span>
                  </div>` : ''}
                  ${accreditation ? `
                  <div class="row">
                    <span class="label">Accreditations & Approvals</span>
                    <span class="val">${accreditation}</span>
                  </div>` : ''}
                  <div class="row">
                    <span class="label">Direct Admission 2027</span>
                    <span class="val" style="color: #16a34a;">Profile Assessment Open</span>
                  </div>
                </div>
                <div class="footer">
                  <p><strong>Official Education Counselling Partner:</strong> CareerWithMohit.online (Mohit Jain)</p>
                  <p>Need 1-on-1 direct admission assistance or application waivers? Call/WhatsApp: <strong>+91 95600 20771</strong></p>
                </div>
                <script>window.print();</script>
              </body>
              </html>
            `);
            win.document.close();
          }
        }
      }, 1000);
    } catch (err) {
      console.error("Error submitting brochure lead:", err);
      setStatus("success");
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/20 w-fit px-3 py-1 rounded-full mb-3">
            <FileText className="w-3.5 h-3.5" />
            {batch} Official Brochure
          </div>
          <h3 className="text-xl font-black leading-snug">
            {collegeName}
          </h3>
          <p className="text-xs text-blue-100 font-medium mt-1">
            Fill your details below to instantly download the complete fee report &amp; placement brochure.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {status === "success" ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">
                Brochure Downloaded!
              </h4>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">
                We have also sent an instant confirmation to your WhatsApp & email with verified admission details.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="9876543210"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">10-digit mobile number for WhatsApp verification</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Interested Course *
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm bg-white"
                >
                  <option value="MBA / PGDM">MBA / PGDM</option>
                  <option value="B.Tech">B.Tech / Engineering</option>
                  <option value="BBA / BBM">BBA / BBM</option>
                  <option value="BCA / MCA">BCA / MCA</option>
                  <option value="UG Courses">UG Courses</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1 text-slate-500 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Free counselling & verified brochure report</span>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === "submitting" ? (
                  "Generating Report..."
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Brochure Now
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
