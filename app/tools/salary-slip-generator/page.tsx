import SalarySlipGenerator from '@/components/SalarySlipGenerator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Salary Slip Generator – Pay Slip Creator | CareerWithMohit',
  description: 'Generate, customize, and download professional salary slips online for free. Custom employee, company, earnings, and deductions fields matching Indian corporate standards.',
  keywords: [
    'salary slip generator', 'free payslip maker', 'create salary slip online',
    'salary slip template', 'salary calculator', 'pay slip creator', 'careerwithmohit tools'
  ],
  alternates: {
    canonical: '/tools/salary-slip-generator',
  },
};

export default function SalarySlipGeneratorPage() {
  return (
    <main>
      <SalarySlipGenerator />
    </main>
  );
}
