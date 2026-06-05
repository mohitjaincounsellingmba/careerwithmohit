"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, Download, Printer, RefreshCw, Sparkles, Building, 
  User, DollarSign, ShieldAlert, Plus, Trash2, CheckCircle
} from 'lucide-react';

// Utility to convert numbers to words in Indian Rupees (INR)
const numberToWords = (num: number): string => {
  if (num === 0) return 'Zero Rupees Only';
  
  const singleDigits = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const doubleDigits = ['', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tensMultiple = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const hundredPlus = ['Hundred', 'Thousand', 'Lakh', 'Crore'];

  let words = '';

  const helper = (n: number): string => {
    let str = '';
    if (n > 99) {
      str += singleDigits[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n > 19) {
      str += tensMultiple[Math.floor(n / 10)] + ' ' + singleDigits[n % 10];
    } else if (n > 9) {
      str += doubleDigits[n - 10 + 1];
    } else if (n > 0) {
      str += singleDigits[n];
    }
    return str.trim();
  };

  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const remaining = num;

  if (crore > 0) {
    words += helper(crore) + ' Crore ';
  }
  if (lakh > 0) {
    words += helper(lakh) + ' Lakh ';
  }
  if (thousand > 0) {
    words += helper(thousand) + ' Thousand ';
  }
  if (remaining > 0) {
    words += helper(remaining);
  }

  return (words.trim() + ' Rupees Only').replace(/\s+/g, ' ');
};

interface EarningItem {
  name: string;
  amount: number;
}

interface DeductionItem {
  name: string;
  amount: number;
}

export default function SalarySlipGenerator() {
  // Company Info State
  const [companyName, setCompanyName] = useState('Acme Technologies Private Limited');
  const [companyAddress, setCompanyAddress] = useState('123 Cyber City, Phase 2, Gurgaon, Haryana, India');
  const [companyLogo, setCompanyLogo] = useState('ACME');

  // Employee Info State
  const [empName, setEmpName] = useState('John Doe');
  const [empId, setEmpId] = useState('EMP-2026-0042');
  const [designation, setDesignation] = useState('Senior Software Engineer');
  const [department, setDepartment] = useState('Technology');
  const [doj, setDoj] = useState('2024-03-15');
  const [monthYear, setMonthYear] = useState('June 2026');
  const [uan, setUan] = useState('100987654321');
  const [bankName, setBankName] = useState('HDFC Bank');
  const [bankAcc, setBankAcc] = useState('50100482938493');
  const [paidDays, setPaidDays] = useState(30);
  const [lopDays, setLopDays] = useState(0);

  // Financials State
  const [earnings, setEarnings] = useState<EarningItem[]>([
    { name: 'Basic Salary', amount: 50000 },
    { name: 'House Rent Allowance (HRA)', amount: 20000 },
    { name: 'Medical Allowance', amount: 1250 },
    { name: 'Conveyance Allowance', amount: 1600 },
    { name: 'Special Allowance', amount: 15000 },
    { name: 'Performance Bonus', amount: 5000 },
  ]);

  const [deductions, setDeductions] = useState<DeductionItem[]>([
    { name: 'Provident Fund (PF)', amount: 6000 },
    { name: 'Professional Tax (PT)', amount: 200 },
    { name: 'TDS (Income Tax)', amount: 4500 },
    { name: 'Other Deductions', amount: 0 },
  ]);

  const [newEarningName, setNewEarningName] = useState('');
  const [newEarningAmount, setNewEarningAmount] = useState('');
  const [newDeductionName, setNewDeductionName] = useState('');
  const [newDeductionAmount, setNewDeductionAmount] = useState('');

  // Calculations
  const totalEarnings = earnings.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDeductions = deductions.reduce((acc, curr) => acc + curr.amount, 0);
  const netSalary = Math.max(0, totalEarnings - totalDeductions);

  // References for print
  const printAreaRef = useRef<HTMLDivElement>(null);

  const handleAddEarning = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEarningName.trim() || !newEarningAmount) return;
    setEarnings([...earnings, { name: newEarningName, amount: parseFloat(newEarningAmount) || 0 }]);
    setNewEarningName('');
    setNewEarningAmount('');
  };

  const handleAddDeduction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeductionName.trim() || !newDeductionAmount) return;
    setDeductions([...deductions, { name: newDeductionName, amount: parseFloat(newDeductionAmount) || 0 }]);
    setNewDeductionName('');
    setNewDeductionAmount('');
  };

  const handleRemoveEarning = (index: number) => {
    setEarnings(earnings.filter((_, i) => i !== index));
  };

  const handleRemoveDeduction = (index: number) => {
    setDeductions(deductions.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    const printContent = printAreaRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;
    if (printContent) {
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(`
          <html>
            <head>
              <title>Salary_Slip_${empId || 'Employee'}</title>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
              <style>
                body {
                  font-family: system-ui, -apple-system, sans-serif;
                  background: white;
                  color: black;
                  padding: 20px;
                }
                @media print {
                  body { padding: 0; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              <div class="max-w-4xl mx-auto p-4 border border-gray-300">
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
    setCompanyName('Acme Technologies Private Limited');
    setCompanyAddress('123 Cyber City, Phase 2, Gurgaon, Haryana, India');
    setCompanyLogo('ACME');
    setEmpName('John Doe');
    setEmpId('EMP-2026-0042');
    setDesignation('Senior Software Engineer');
    setDepartment('Technology');
    setDoj('2024-03-15');
    setMonthYear('June 2026');
    setUan('100987654321');
    setBankName('HDFC Bank');
    setBankAcc('50100482938493');
    setPaidDays(30);
    setLopDays(0);
    setEarnings([
      { name: 'Basic Salary', amount: 50000 },
      { name: 'House Rent Allowance (HRA)', amount: 20000 },
      { name: 'Medical Allowance', amount: 1250 },
      { name: 'Conveyance Allowance', amount: 1600 },
      { name: 'Special Allowance', amount: 15000 },
      { name: 'Performance Bonus', amount: 5000 },
    ]);
    setDeductions([
      { name: 'Provident Fund (PF)', amount: 6000 },
      { name: 'Professional Tax (PT)', amount: 200 },
      { name: 'TDS (Income Tax)', amount: 4500 },
      { name: 'Other Deductions', amount: 0 },
    ]);
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
            Salary Slip <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-emerald-300">Generator</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Generate and customize professional, print-ready salary slips in seconds. Fully compliant with standard corporate structures.
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
                  <FileText className="text-primary" size={20} /> Configure Data
                </h2>
                <button 
                  onClick={resetForm}
                  className="text-xs font-bold text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw size={12} /> Reset
                </button>
              </div>

              {/* Step 1: Company Details */}
              <div className="mb-8 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Building size={14} /> 1. Company Information
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Company Name</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">Logo Initial</label>
                      <input 
                        type="text" 
                        maxLength={5}
                        className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                        value={companyLogo} 
                        onChange={(e) => setCompanyLogo(e.target.value)} 
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-500">Address / Location</label>
                      <input 
                        type="text" 
                        className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                        value={companyAddress} 
                        onChange={(e) => setCompanyAddress(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Employee Details */}
              <div className="mb-8 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <User size={14} /> 2. Employee Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Employee Name</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={empName} 
                      onChange={(e) => setEmpName(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Employee ID</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={empId} 
                      onChange={(e) => setEmpId(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Designation</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={designation} 
                      onChange={(e) => setDesignation(e.target.value)} 
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
                    <label className="text-[10px] font-black uppercase text-slate-500">Date of Joining</label>
                    <input 
                      type="date" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={doj} 
                      onChange={(e) => setDoj(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Pay Period Month/Year</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={monthYear} 
                      onChange={(e) => setMonthYear(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Bank Name</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={bankName} 
                      onChange={(e) => setBankName(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Account Number</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={bankAcc} 
                      onChange={(e) => setBankAcc(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Paid Days</label>
                    <input 
                      type="number" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={paidDays} 
                      onChange={(e) => setPaidDays(parseInt(e.target.value) || 0)} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">LOP Days</label>
                    <input 
                      type="number" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={lopDays} 
                      onChange={(e) => setLopDays(parseInt(e.target.value) || 0)} 
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-500">UAN Number</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none focus:border-primary"
                      value={uan} 
                      onChange={(e) => setUan(e.target.value)} 
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Earnings Setup */}
              <div className="mb-8 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <DollarSign size={14} /> 3. Earnings (₹)
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-100 p-2 rounded-xl">
                  {earnings.map((earning, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white px-3 py-2 border border-slate-100 rounded-lg">
                      <div className="flex-1 pr-2">
                        <p className="text-xs font-bold text-slate-700">{earning.name}</p>
                      </div>
                      <input 
                        type="number"
                        className="w-20 px-2 py-1 text-xs text-right font-black border rounded focus:border-primary outline-none"
                        value={earning.amount}
                        onChange={(e) => {
                          const updated = [...earnings];
                          updated[idx].amount = parseFloat(e.target.value) || 0;
                          setEarnings(updated);
                        }}
                      />
                      <button 
                        onClick={() => handleRemoveEarning(idx)}
                        className="ml-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleAddEarning} className="grid grid-cols-12 gap-2 mt-2">
                  <input 
                    type="text" 
                    placeholder="New Earning Name"
                    className="col-span-7 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:border-primary"
                    value={newEarningName}
                    onChange={(e) => setNewEarningName(e.target.value)}
                  />
                  <input 
                    type="number" 
                    placeholder="Amount"
                    className="col-span-3 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:border-primary"
                    value={newEarningAmount}
                    onChange={(e) => setNewEarningAmount(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="col-span-2 bg-primary text-white flex items-center justify-center rounded-lg hover:scale-105 transition-transform"
                  >
                    <Plus size={16} />
                  </button>
                </form>
              </div>

              {/* Step 4: Deductions Setup */}
              <div className="mb-8 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <ShieldAlert size={14} /> 4. Deductions (₹)
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-100 p-2 rounded-xl">
                  {deductions.map((deductionsItem, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white px-3 py-2 border border-slate-100 rounded-lg">
                      <div className="flex-1 pr-2">
                        <p className="text-xs font-bold text-slate-700">{deductionsItem.name}</p>
                      </div>
                      <input 
                        type="number"
                        className="w-20 px-2 py-1 text-xs text-right font-black border rounded focus:border-primary outline-none"
                        value={deductionsItem.amount}
                        onChange={(e) => {
                          const updated = [...deductions];
                          updated[idx].amount = parseFloat(e.target.value) || 0;
                          setDeductions(updated);
                        }}
                      />
                      <button 
                        onClick={() => handleRemoveDeduction(idx)}
                        className="ml-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleAddDeduction} className="grid grid-cols-12 gap-2 mt-2">
                  <input 
                    type="text" 
                    placeholder="New Deduction Name"
                    className="col-span-7 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:border-primary"
                    value={newDeductionName}
                    onChange={(e) => setNewDeductionName(e.target.value)}
                  />
                  <input 
                    type="number" 
                    placeholder="Amount"
                    className="col-span-3 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:border-primary"
                    value={newDeductionAmount}
                    onChange={(e) => setNewDeductionAmount(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="col-span-2 bg-secondary text-white flex items-center justify-center rounded-lg hover:scale-105 transition-transform"
                  >
                    <Plus size={16} />
                  </button>
                </form>
              </div>

              {/* Action Buttons */}
              <button 
                onClick={handlePrint}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] shadow-xl shadow-primary/20 transition-all"
              >
                <Printer size={18} /> Print / Download PDF
              </button>
            </div>

            {/* Live Preview Panel (Right) */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between bg-white relative">
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  Live Document Preview
                </span>
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                  <CheckCircle size={14} /> Auto-calculated
                </span>
              </div>

              {/* Printable Slip Container */}
              <div 
                ref={printAreaRef} 
                className="border-2 border-slate-800 p-8 md:p-12 bg-white text-slate-900 font-sans shadow-lg mx-auto w-full max-w-[800px] aspect-[1/1.414]"
              >
                {/* Logo & Company Header */}
                <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 text-white font-black flex items-center justify-center text-lg rounded-xl border border-slate-800 shrink-0">
                      {companyLogo}
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tight text-slate-900">{companyName}</h4>
                      <p className="text-xs font-semibold text-slate-500">{companyAddress}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-3 py-1 rounded">Pay Slip</span>
                    <p className="text-xs font-black text-slate-800 mt-2">{monthYear}</p>
                  </div>
                </div>

                {/* Employee Details Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-xs mb-8 bg-slate-50/50 p-4 border border-slate-200 rounded-xl">
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Employee Name</span>
                    <span className="font-black text-slate-800">{empName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Employee ID</span>
                    <span className="font-black text-slate-800">{empId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Designation</span>
                    <span className="font-black text-slate-800">{designation}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Department</span>
                    <span className="font-black text-slate-800">{department}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Bank Name</span>
                    <span className="font-black text-slate-800">{bankName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Account Number</span>
                    <span className="font-black text-slate-800">{bankAcc}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Date of Joining</span>
                    <span className="font-black text-slate-800">{doj}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">UAN</span>
                    <span className="font-black text-slate-800">{uan || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Paid Days / LOP</span>
                    <span className="font-black text-slate-800">{paidDays} Days / {lopDays} Days</span>
                  </div>
                </div>

                {/* Earnings & Deductions Table */}
                <div className="grid grid-cols-2 border border-slate-800 rounded-xl overflow-hidden mb-6">
                  {/* Earnings Column */}
                  <div className="border-r border-slate-800">
                    <div className="bg-slate-900 text-white font-black uppercase text-[10px] tracking-wider px-4 py-2 border-b border-slate-800">
                      Earnings
                    </div>
                    <div className="divide-y divide-slate-100 min-h-[220px]">
                      {earnings.map((earning, idx) => (
                        <div key={idx} className="flex justify-between px-4 py-2.5 text-xs font-semibold">
                          <span className="text-slate-600">{earning.name}</span>
                          <span className="font-black text-slate-800">₹{earning.amount.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-50 border-t border-slate-800 flex justify-between px-4 py-3 text-xs font-black uppercase">
                      <span>Total Earnings</span>
                      <span className="text-slate-900">₹{totalEarnings.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Deductions Column */}
                  <div>
                    <div className="bg-slate-900 text-white font-black uppercase text-[10px] tracking-wider px-4 py-2 border-b border-slate-800">
                      Deductions
                    </div>
                    <div className="divide-y divide-slate-100 min-h-[220px]">
                      {deductions.map((deductionsItem, idx) => (
                        <div key={idx} className="flex justify-between px-4 py-2.5 text-xs font-semibold">
                          <span className="text-slate-600">{deductionsItem.name}</span>
                          <span className="font-black text-slate-800">₹{deductionsItem.amount.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-50 border-t border-slate-800 flex justify-between px-4 py-3 text-xs font-black uppercase">
                      <span>Total Deductions</span>
                      <span className="text-slate-900">₹{totalDeductions.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Net Salary Summary Block */}
                <div className="bg-slate-900 text-white rounded-xl p-6 flex justify-between items-center mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Net Salary Paid</span>
                    <span className="text-2xl font-black">₹{netSalary.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Amount in Words</span>
                    <span className="text-xs font-black text-yellow-300 italic">{numberToWords(netSalary)}</span>
                  </div>
                </div>

                {/* Signature Block */}
                <div className="flex justify-between items-end mt-12 pt-8 border-t border-slate-200">
                  <div className="text-center">
                    <div className="w-32 border-b border-slate-300 mb-2"></div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Employee Signature</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 border-b border-slate-300 mb-2"></div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Director / HR Manager</p>
                  </div>
                </div>
              </div>

              {/* Support Notice */}
              <div className="mt-8 text-center text-xs font-bold text-slate-400">
                This is a computer-generated salary slip and does not require physical signatures in most settings.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
