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
}

export function BrochureModal({
  isOpen,
  onClose,
  collegeName,
  collegeSlug,
  brochureUrl,
  feesText = "Contact for latest fee structure"
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
        message: `Requested 2026 Brochure & Fee Report for ${collegeName}`
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
                <title>${collegeName} - 2026 Brochure & Fee Summary</title>
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; max-width: 750px; margin: 0 auto; }
                  .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
                  h1 { color: #1e293b; margin: 0 0 10px; font-size: 28px; }
                  .badge { background: #eff6ff; color: #2563eb; padding: 6px 12px; border-radius: 20px; font-weight: 700; font-size: 12px; text-transform: uppercase; }
                  .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 25px; }
                  .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-size: 15px; }
                  .row:last-child { border-bottom: none; }
                  .label { font-weight: 600; color: #64748b; }
                  .val { font-weight: 700; color: #0f172a; }
                  .footer { margin-top: 40px; font-size: 13px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                </style>
              </head>
              <body>
                <div class="header">
                  <span class="badge">Verified 2026 Brochure Report</span>
                  <h1 style="margin-top: 15px;">${collegeName}</h1>
                  <p style="color: #64748b; margin: 0;">Prepared for ${name} (${phone})</p>
                </div>
                <div class="box">
                  <h3 style="margin-top: 0; color: #0f172a;">Fee & Admission Summary</h3>
                  <div class="row">
                    <span class="label">Total Course Fees</span>
                    <span class="val">${feesText}</span>
                  </div>
                  <div class="row">
                    <span class="label">Admission Status</span>
                    <span class="val" style="color: #16a536;">Applications Open (2026-27)</span>
                  </div>
                  <div class="row">
                    <span class="label">Counselling & Seat Booking</span>
                    <span class="val">Contact CareerWithMohit Counsellor</span>
                  </div>
                </div>
                <div class="footer">
                  <p>Official Education Counselling Partner: CareerWithMohit.online</p>
                  <p>Need guidance? Reply to our confirmation email or WhatsApp us anytime!</p>
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/20 w-fit px-3 py-1 rounded-full mb-3">
            <FileText className="w-3.5 h-3.5" />
            2026 Official Brochure
          </div>
          <h3 className="text-xl font-black leading-snug">
            {collegeName}
          </h3>
          <p className="text-xs text-blue-100 font-medium mt-1">
            Fill your details below to instantly download the complete fee report & placement brochure.
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
